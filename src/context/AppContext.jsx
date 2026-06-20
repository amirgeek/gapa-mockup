import { useEffect, useMemo, useState } from 'react'
import { AppContext } from './appContextObject.js'
import { loadState, STORAGE_KEY } from './appState.js'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

const dbResourceTypeToUi = {
  guide: 'Guia',
  audio: 'Audio',
  video: 'Video',
  template: 'Plantilla',
}

const uiResourceTypeToDb = {
  Guia: 'guide',
  Audio: 'audio',
  Video: 'video',
  Plantilla: 'template',
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function parseDurationMinutes(value) {
  const numericValue = Number.parseInt(String(value).replace(/[^\d]/g, ''), 10)
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 60
}

function estimateReadTimeMinutes(content) {
  const text = Array.isArray(content) ? content.join(' ') : String(content ?? '')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

function extractBodyParts(body) {
  if (Array.isArray(body)) {
    return {
      content: body.filter((item) => typeof item === 'string' && item.trim()),
      takeaways: [],
    }
  }

  if (body && typeof body === 'object') {
    return {
      content: Array.isArray(body.content)
        ? body.content.filter((item) => typeof item === 'string' && item.trim())
        : [],
      takeaways: Array.isArray(body.takeaways)
        ? body.takeaways.filter((item) => typeof item === 'string' && item.trim())
        : [],
    }
  }

  return { content: [], takeaways: [] }
}

function buildLocalSessionFromRow(row, enrolledUserIds = []) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    professional: row.professional_name,
    datetime: row.starts_at,
    duration: `${row.duration_minutes} min`,
    description: row.description,
    meetLink: row.meet_url,
    capacity: row.capacity,
    enrolledUserIds,
    featured: row.is_featured ?? false,
  }
}

function buildLocalCampusItemFromRow(row, categoryName) {
  const { content, takeaways } = extractBodyParts(row.body)

  return {
    id: row.id,
    title: row.title,
    category: categoryName ?? row.category_name ?? 'Campus',
    author: row.author_name,
    type: dbResourceTypeToUi[row.resource_type] ?? 'Guia',
    readTime: `${row.read_time_minutes ?? estimateReadTimeMinutes(content)} min`,
    audienceProfiles: row.target_profiles?.length ? row.target_profiles : [],
    excerpt: row.excerpt,
    content,
    takeaways,
  }
}

function mergeProfilesIntoUsers(currentUsers, profiles) {
  const normalizedProfiles = Array.isArray(profiles) ? profiles : [profiles]
  const nextUsers = [...currentUsers]

  normalizedProfiles.forEach((profile) => {
    if (!profile) {
      return
    }

    const existingUser =
      nextUsers.find((user) => user.id === profile.id) ??
      nextUsers.find((user) => user.email.toLowerCase() === profile.email.toLowerCase())

    const nextUser = buildLocalUserFromProfile(profile, existingUser)
    const previousIndex = nextUsers.findIndex(
      (user) => user.id === profile.id || user.email.toLowerCase() === profile.email.toLowerCase(),
    )

    if (previousIndex >= 0) {
      nextUsers[previousIndex] = nextUser
      return
    }

    nextUsers.push(nextUser)
  })

  return nextUsers
}

async function syncSupabaseUsers({ profileId, includeAllProfiles = false, setState }) {
  if (!supabase) {
    return { ok: false, message: 'Supabase no está configurado.' }
  }

  if (includeAllProfiles) {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })

    if (error || !profiles?.length) {
      return { ok: false, message: 'No pudimos recuperar los perfiles en Supabase.' }
    }

    let signedInUser = null

    setState((current) => {
      const mergedUsers = mergeProfilesIntoUsers(current.users, profiles)
      signedInUser = mergedUsers.find((user) => user.id === profileId) ?? null

      return {
        ...current,
        currentUserId: profileId,
        users: mergedUsers,
      }
    })

    return { ok: true, user: signedInUser, profiles }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (error || !profile) {
    return { ok: false, message: 'No pudimos recuperar el perfil en Supabase.' }
  }

  let nextUser = null

  setState((current) => {
    const mergedUsers = mergeProfilesIntoUsers(current.users, [profile])
    nextUser = mergedUsers.find((user) => user.id === profile.id) ?? null

    return {
      ...current,
      currentUserId: profile.id,
      users: mergedUsers,
    }
  })

  return { ok: true, user: nextUser, profiles: [profile] }
}

async function syncSupabaseContent({ setState }) {
  if (!supabase) {
    return { ok: false, message: 'Supabase no está configurado.' }
  }

  const [
    sessionsResult,
    enrollmentsResult,
    categoriesResult,
    resourcesResult,
  ] = await Promise.all([
    supabase.from('sessions').select('*').order('starts_at', { ascending: true }),
    supabase.from('session_enrollments').select('session_id, profile_id'),
    supabase.from('campus_categories').select('id, name, slug'),
    supabase
      .from('campus_resources')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false }),
  ])

  if (sessionsResult.error || categoriesResult.error || resourcesResult.error) {
    return { ok: false, message: 'No pudimos sincronizar sesiones o campus desde Supabase.' }
  }

  const enrollments = enrollmentsResult.error ? [] : enrollmentsResult.data ?? []
  const sessions = sessionsResult.data ?? []
  const categories = categoriesResult.data ?? []
  const resources = resourcesResult.data ?? []

  const sessionUsersMap = new Map()
  enrollments.forEach((enrollment) => {
    const existing = sessionUsersMap.get(enrollment.session_id) ?? []
    sessionUsersMap.set(enrollment.session_id, [...existing, enrollment.profile_id])
  })

  const categoryMap = new Map(categories.map((category) => [category.id, category.name]))
  const nextSessions = sessions.map((session) =>
    buildLocalSessionFromRow(session, sessionUsersMap.get(session.id) ?? []),
  )
  const nextCampusItems = resources.map((resource) =>
    buildLocalCampusItemFromRow(resource, categoryMap.get(resource.category_id)),
  )

  setState((current) => {
    const sessionIdsByUser = new Map()

    enrollments.forEach((enrollment) => {
      const existing = sessionIdsByUser.get(enrollment.profile_id) ?? []
      sessionIdsByUser.set(enrollment.profile_id, [...existing, enrollment.session_id])
    })

    return {
      ...current,
      sessions: nextSessions.length ? nextSessions : current.sessions,
      campusItems: nextCampusItems.length ? nextCampusItems : current.campusItems,
      users: current.users.map((user) => ({
        ...user,
        joinedSessionIds: sessionIdsByUser.get(user.id) ?? user.joinedSessionIds ?? [],
      })),
    }
  })

  return { ok: true, sessions: nextSessions, campusItems: nextCampusItems }
}

async function ensureCampusCategory(name) {
  if (!supabase) {
    return null
  }

  const slug = slugify(name)
  const { data: existing } = await supabase
    .from('campus_categories')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing?.id) {
    return existing.id
  }

  const { data: created, error } = await supabase
    .from('campus_categories')
    .insert({
      name,
      slug,
      description: `Contenido de campus para ${name}.`,
    })
    .select('id')
    .single()

  if (error) {
    return null
  }

  return created.id
}

function buildLocalUserFromProfile(profile, existingUser) {
  return {
    id: profile.id,
    name: profile.full_name,
    email: profile.email,
    password: existingUser?.password ?? '',
    role: profile.role,
    membershipStatus: profile.membership_status,
    membershipProvider: profile.membership_provider ?? existingUser?.membershipProvider ?? null,
    membershipPlan: profile.membership_plan ?? existingUser?.membershipPlan ?? null,
    profileCategory: profile.profile_category ?? existingUser?.profileCategory ?? null,
    onboardingAnswers:
      profile.onboarding_answers && Object.keys(profile.onboarding_answers).length
        ? profile.onboarding_answers
        : existingUser?.onboardingAnswers ?? {},
    onboardingSummary: profile.onboarding_summary ?? existingUser?.onboardingSummary ?? null,
    joinedSessionIds: existingUser?.joinedSessionIds ?? [],
    dailyCheckIns: profile.daily_check_ins ?? existingUser?.dailyCheckIns ?? [],
    processGoals: profile.process_goals ?? existingUser?.processGoals ?? [],
    processEntries: profile.process_entries ?? existingUser?.processEntries ?? [],
    exposureSteps: profile.exposure_steps ?? existingUser?.exposureSteps ?? [],
    sosHistory: profile.sos_history ?? existingUser?.sosHistory ?? [],
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(() => loadState())
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const currentUser = state.users.find((user) => user.id === state.currentUserId) ?? null

  const value = useMemo(() => {
    function persistCurrentUserFields(patch) {
      if (!isSupabaseConfigured || !supabase || !currentUser) {
        return
      }

      supabase.from('profiles').update(patch).eq('id', currentUser.id).then(() => {})
    }

    async function syncSupabaseProfile(profileId) {
      const profileResult = await syncSupabaseUsers({
        profileId,
        includeAllProfiles: currentUser?.role === 'admin',
        setState,
      })

      if (!profileResult.ok) {
        return profileResult
      }

      await syncSupabaseContent({ setState })

      return { ok: true, user: profileResult.user }
    }

    async function login(email, password) {
      if (isSupabaseConfigured && supabase) {
        const normalizedEmail = email.trim().toLowerCase()
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        })

        if (error || !data.user) {
          return { ok: false, message: 'Credenciales incorrectas o cuenta no habilitada todavía.' }
        }

        const profileResult = await syncSupabaseProfile(data.user.id)

        if (!profileResult.ok) {
          return profileResult
        }

        return profileResult
      }

      const normalizedEmail = email.trim().toLowerCase()
      const user = state.users.find(
        (candidate) =>
          candidate.email.toLowerCase() === normalizedEmail && candidate.password === password,
      )

      if (!user) {
        return { ok: false, message: 'Credenciales incorrectas.' }
      }

      setState((current) => ({ ...current, currentUserId: user.id }))

      return { ok: true, user }
    }

    async function logout() {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut()
      }

      setState((current) => ({ ...current, currentUserId: null }))
    }

    async function registerWithMembership(formData) {
      if (isSupabaseConfigured && supabase) {
        const email = formData.email.trim().toLowerCase()
        const { data, error } = await supabase.auth.signUp({
          email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name.trim(),
              role: 'user',
              membership_status: 'active',
            },
          },
        })

        if (error || !data.user) {
          return { ok: false, message: error?.message ?? 'No pudimos crear la cuenta en Supabase.' }
        }

        if (!data.session) {
          return {
            ok: false,
            message:
              'Supabase creó la cuenta, pero quedó pendiente de confirmación por email. Para la demo conviene desactivar la confirmación de correo en Auth > Providers > Email.',
          }
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            membership_status: 'active',
            membership_provider: 'mercado_pago',
            membership_plan: formData.plan,
            profile_category: formData.profileCategory,
            onboarding_answers: formData.onboardingAnswers,
            onboarding_summary: formData.onboardingSummary ?? null,
          })
          .eq('id', data.user.id)

        if (updateError) {
          return {
            ok: false,
            message: 'La cuenta se creó, pero no pudimos completar el perfil en Supabase.',
          }
        }

        const profileResult = await syncSupabaseProfile(data.user.id)

        if (!profileResult.ok) {
          return profileResult
        }

        setState((current) => ({
          ...current,
          users: current.users.map((user) =>
            user.id === data.user.id
              ? {
                  ...user,
                  onboardingSummary: formData.onboardingSummary ?? null,
                }
              : user,
          ),
        }))

        return { ok: true, user: profileResult.user }
      }

      const email = formData.email.trim().toLowerCase()
      const alreadyExists = state.users.some((user) => user.email.toLowerCase() === email)

      if (alreadyExists) {
        return { ok: false, message: 'Ya existe un usuario con ese email.' }
      }

      const newUser = {
        id: `user-${crypto.randomUUID()}`,
        name: formData.name.trim(),
        email,
        password: formData.password,
        role: 'user',
        membershipStatus: 'active',
        joinedSessionIds: [],
        membershipProvider: formData.paymentProvider,
        membershipPlan: formData.plan,
        profileCategory: formData.profileCategory,
        onboardingAnswers: formData.onboardingAnswers,
        onboardingSummary: formData.onboardingSummary ?? null,
      }

      setState((current) => ({
        ...current,
        currentUserId: newUser.id,
        users: [...current.users, newUser],
      }))

      return { ok: true, user: newUser }
    }

    async function enrollInSession(sessionId) {
      if (!currentUser) {
        return { ok: false, message: 'No hay usuario activo.' }
      }

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('session_enrollments').insert({
          session_id: sessionId,
          profile_id: currentUser.id,
        })

        if (error && !String(error.message).toLowerCase().includes('duplicate')) {
          return { ok: false, message: 'No pudimos reservar tu lugar en esta sesión.' }
        }

        await syncSupabaseContent({ setState })
        return { ok: true }
      }

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id && !user.joinedSessionIds.includes(sessionId)
            ? { ...user, joinedSessionIds: [...user.joinedSessionIds, sessionId] }
            : user,
        ),
        sessions: current.sessions.map((session) =>
          session.id === sessionId && !session.enrolledUserIds.includes(currentUser.id)
            ? { ...session, enrolledUserIds: [...session.enrolledUserIds, currentUser.id] }
            : session,
        ),
      }))

      return { ok: true }
    }

    function saveDailyCheckIn(level) {
      if (!currentUser) {
        return
      }

      const today = new Date().toISOString().slice(0, 10)
      let nextCheckIns = []

      setState((current) => ({
        ...current,
        users: current.users.map((user) => {
          if (user.id !== currentUser.id) {
            return user
          }

          const existing = user.dailyCheckIns ?? []
          nextCheckIns = existing.some((entry) => entry.date === today)
            ? existing.map((entry) => (entry.date === today ? { ...entry, level } : entry))
            : [...existing, { date: today, level }]

          return {
            ...user,
            dailyCheckIns: nextCheckIns,
          }
        }),
      }))

      persistCurrentUserFields({ daily_check_ins: nextCheckIns })
    }

    function saveProcessGoals(goals) {
      if (!currentUser) {
        return { ok: false, message: 'No hay usuario activo.' }
      }

      const cleanedGoals = goals.map((goal) => goal.trim()).filter(Boolean)

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id ? { ...user, processGoals: cleanedGoals } : user,
        ),
      }))

      persistCurrentUserFields({ process_goals: cleanedGoals })

      return { ok: true }
    }

    function saveProcessEntry(entryData) {
      if (!currentUser) {
        return { ok: false, message: 'No hay usuario activo.' }
      }

      const nextEntry = {
        id: `entry-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        ...entryData,
      }
      let nextEntries = []

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                processEntries: (nextEntries = [nextEntry, ...(user.processEntries ?? [])].slice(
                  0,
                  12,
                )),
              }
            : user,
        ),
      }))

      persistCurrentUserFields({ process_entries: nextEntries })

      return { ok: true }
    }

    function addExposureStep(step) {
      if (!currentUser) {
        return { ok: false, message: 'No hay usuario activo.' }
      }

      const cleanedStep = step.trim()

      if (!cleanedStep) {
        return { ok: false, message: 'Escribí un desafío primero.' }
      }

      const nextStep = {
        id: `exposure-${crypto.randomUUID()}`,
        text: cleanedStep,
        status: 'pendiente',
        createdAt: new Date().toISOString(),
      }
      let nextExposureSteps = []

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                exposureSteps: (nextExposureSteps = [...(user.exposureSteps ?? []), nextStep].slice(
                  -8,
                )),
              }
            : user,
        ),
      }))

      persistCurrentUserFields({ exposure_steps: nextExposureSteps })

      return { ok: true }
    }

    function logSosUse(tool) {
      if (!currentUser) {
        return { ok: false, message: 'No hay usuario activo.' }
      }

      const nextUse = {
        id: `sos-${crypto.randomUUID()}`,
        tool,
        usedAt: new Date().toISOString(),
      }
      let nextSosHistory = []

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                sosHistory: (nextSosHistory = [nextUse, ...(user.sosHistory ?? [])].slice(0, 10)),
              }
            : user,
        ),
      }))

      persistCurrentUserFields({ sos_history: nextSosHistory })

      return { ok: true }
    }

    async function createSession(sessionData) {
      if (isSupabaseConfigured && supabase && currentUser) {
        const sessionSlug = `${slugify(sessionData.title)}-${Date.now()}`
        const { error } = await supabase.from('sessions').insert({
          title: sessionData.title,
          slug: sessionSlug,
          category: sessionData.category,
          description: sessionData.description,
          professional_name: sessionData.professional,
          meet_url: sessionData.meetLink,
          starts_at: new Date(sessionData.datetime).toISOString(),
          duration_minutes: parseDurationMinutes(sessionData.duration),
          capacity: Number(sessionData.capacity) || 12,
          created_by: currentUser.id,
        })

        if (error) {
          return { ok: false, message: 'No pudimos guardar la sesión en Supabase.' }
        }

        await syncSupabaseContent({ setState })
        return { ok: true }
      }

      const newSession = {
        id: `session-${crypto.randomUUID()}`,
        enrolledUserIds: [],
        featured: false,
        ...sessionData,
      }

      setState((current) => ({
        ...current,
        sessions: [newSession, ...current.sessions],
      }))

      return { ok: true }
    }

    async function createCampusItem(itemData) {
      if (isSupabaseConfigured && supabase && currentUser) {
        const categoryId = await ensureCampusCategory(itemData.category)
        const resourceSlug = `${slugify(itemData.title)}-${Date.now()}`
        const content = Array.isArray(itemData.content) ? itemData.content : []
        const { error } = await supabase.from('campus_resources').insert({
          category_id: categoryId,
          title: itemData.title,
          slug: resourceSlug,
          excerpt: itemData.excerpt,
          body: content,
          author_id: currentUser.id,
          author_name: itemData.author,
          resource_type: uiResourceTypeToDb[itemData.type] ?? 'guide',
          read_time_minutes: estimateReadTimeMinutes(content),
          target_profiles: itemData.audienceProfiles?.length ? itemData.audienceProfiles : [],
          is_published: true,
        })

        if (error) {
          return { ok: false, message: 'No pudimos publicar el recurso en Supabase.' }
        }

        await syncSupabaseContent({ setState })
        return { ok: true }
      }

      const newItem = {
        id: `campus-${crypto.randomUUID()}`,
        audienceProfiles: itemData.audienceProfiles?.length ? itemData.audienceProfiles : ['Habitos y bienestar'],
        ...itemData,
      }

      setState((current) => ({
        ...current,
        campusItems: [newItem, ...current.campusItems],
      }))

      return { ok: true }
    }

    return {
      state,
      currentUser,
      authReady,
      isUsingSupabaseAuth: isSupabaseConfigured,
      login,
      logout,
      registerWithMembership,
      enrollInSession,
      saveDailyCheckIn,
      saveProcessGoals,
      saveProcessEntry,
      addExposureStep,
      logSosUse,
      createSession,
      createCampusItem,
    }
  }, [authReady, currentUser, state])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return undefined
    }

    let cancelled = false

    async function bootstrapAuth() {
      const { data } = await supabase.auth.getSession()
      const sessionUser = data.session?.user

      if (!sessionUser) {
        if (!cancelled) {
          setState((current) => ({ ...current, currentUserId: null }))
          setAuthReady(true)
        }
        return
      }

      const profileResult = await syncSupabaseUsers({
        profileId: sessionUser.id,
        setState,
      })

      const signedInRole = profileResult.user?.role

      if (!cancelled && signedInRole === 'admin') {
        await syncSupabaseUsers({
          profileId: sessionUser.id,
          includeAllProfiles: true,
          setState,
        })
      }

      if (!cancelled) {
        await syncSupabaseContent({ setState })
      }

      if (!cancelled) {
        setAuthReady(true)
      }
    }

    bootstrapAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setState((current) => ({ ...current, currentUserId: null }))
        setAuthReady(true)
        return
      }

      const profileResult = await syncSupabaseUsers({
        profileId: session.user.id,
        setState,
      })

      if (profileResult.ok && profileResult.user?.role === 'admin') {
        await syncSupabaseUsers({
          profileId: session.user.id,
          includeAllProfiles: true,
          setState,
        })
      }

      await syncSupabaseContent({ setState })

      setAuthReady(true)
    })

    return () => {
      cancelled = true
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

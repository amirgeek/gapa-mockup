import { useEffect, useMemo, useState } from 'react'
import { AppContext } from './appContextObject.js'
import { loadState, STORAGE_KEY } from './appState.js'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

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
    onboardingSummary: existingUser?.onboardingSummary ?? null,
    joinedSessionIds: existingUser?.joinedSessionIds ?? [],
    dailyCheckIns: existingUser?.dailyCheckIns ?? [],
    processGoals: existingUser?.processGoals ?? [],
    processEntries: existingUser?.processEntries ?? [],
    exposureSteps: existingUser?.exposureSteps ?? [],
    sosHistory: existingUser?.sosHistory ?? [],
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
    async function syncSupabaseProfile(profileId) {
      if (!supabase) {
        return { ok: false, message: 'Supabase no está configurado.' }
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single()

      if (error) {
        return { ok: false, message: 'No pudimos recuperar el perfil en Supabase.' }
      }

      let nextUser = null

      setState((current) => {
        const existingUser =
          current.users.find((user) => user.id === profile.id) ??
          current.users.find((user) => user.email.toLowerCase() === profile.email.toLowerCase())

        nextUser = buildLocalUserFromProfile(profile, existingUser)

        const usersWithoutPrevious = current.users.filter(
          (user) => user.id !== profile.id && user.email.toLowerCase() !== profile.email.toLowerCase(),
        )

        return {
          ...current,
          currentUserId: profile.id,
          users: [...usersWithoutPrevious, nextUser],
        }
      })

      return { ok: true, user: nextUser }
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
            membership_provider:
              formData.paymentProvider === 'Mercado Pago' ? 'mercado_pago' : 'talio_pay',
            membership_plan: formData.plan,
            profile_category: formData.profileCategory,
            onboarding_answers: formData.onboardingAnswers,
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

    function enrollInSession(sessionId) {
      if (!currentUser) {
        return
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
    }

    function saveDailyCheckIn(level) {
      if (!currentUser) {
        return
      }

      const today = new Date().toISOString().slice(0, 10)

      setState((current) => ({
        ...current,
        users: current.users.map((user) => {
          if (user.id !== currentUser.id) {
            return user
          }

          const existing = user.dailyCheckIns ?? []
          const nextCheckIns = existing.some((entry) => entry.date === today)
            ? existing.map((entry) => (entry.date === today ? { ...entry, level } : entry))
            : [...existing, { date: today, level }]

          return {
            ...user,
            dailyCheckIns: nextCheckIns,
          }
        }),
      }))
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

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                processEntries: [nextEntry, ...(user.processEntries ?? [])].slice(0, 12),
              }
            : user,
        ),
      }))

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

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                exposureSteps: [...(user.exposureSteps ?? []), nextStep].slice(-8),
              }
            : user,
        ),
      }))

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

      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                sosHistory: [nextUse, ...(user.sosHistory ?? [])].slice(0, 10),
              }
            : user,
        ),
      }))

      return { ok: true }
    }

    function createSession(sessionData) {
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
    }

    function createCampusItem(itemData) {
      const newItem = {
        id: `campus-${crypto.randomUUID()}`,
        audienceProfiles: itemData.audienceProfiles?.length ? itemData.audienceProfiles : ['Habitos y bienestar'],
        ...itemData,
      }

      setState((current) => ({
        ...current,
        campusItems: [newItem, ...current.campusItems],
      }))
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single()

      if (!cancelled && profile) {
        setState((current) => {
          const existingUser =
            current.users.find((user) => user.id === profile.id) ??
            current.users.find((user) => user.email.toLowerCase() === profile.email.toLowerCase())
          const nextUser = buildLocalUserFromProfile(profile, existingUser)
          const usersWithoutPrevious = current.users.filter(
            (user) =>
              user.id !== profile.id && user.email.toLowerCase() !== profile.email.toLowerCase(),
          )

          return {
            ...current,
            currentUserId: profile.id,
            users: [...usersWithoutPrevious, nextUser],
          }
        })
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        setState((current) => {
          const existingUser =
            current.users.find((user) => user.id === profile.id) ??
            current.users.find((user) => user.email.toLowerCase() === profile.email.toLowerCase())
          const nextUser = buildLocalUserFromProfile(profile, existingUser)
          const usersWithoutPrevious = current.users.filter(
            (user) =>
              user.id !== profile.id && user.email.toLowerCase() !== profile.email.toLowerCase(),
          )

          return {
            ...current,
            currentUserId: profile.id,
            users: [...usersWithoutPrevious, nextUser],
          }
        })
      }

      setAuthReady(true)
    })

    return () => {
      cancelled = true
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

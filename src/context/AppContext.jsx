import { useEffect, useMemo, useState } from 'react'
import { AppContext } from './appContextObject.js'
import { loadState, STORAGE_KEY } from './appState.js'

export function AppProvider({ children }) {
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const currentUser = state.users.find((user) => user.id === state.currentUserId) ?? null

  const value = useMemo(() => {
    function login(email, password) {
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

    function logout() {
      setState((current) => ({ ...current, currentUserId: null }))
    }

    function registerWithMembership(formData) {
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
  }, [currentUser, state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

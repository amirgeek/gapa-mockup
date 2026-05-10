import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import {
  calculateProfileCategory,
  onboardingQuestions,
  profileCategories,
} from '../data/onboardingProfile.js'

const initialState = {
  name: '',
  email: '',
  password: '',
  plan: 'Mensual',
  paymentProvider: 'Mercado Pago',
  onboardingAnswers: {},
}

const STEPS = ['intro', 'profile', 'account', 'membership']

const objectives = [
  {
    icon: 'psychology',
    title: 'Manejo de ansiedad',
    body: 'Ejercicios de respiración y calma inmediata.',
  },
  {
    icon: 'groups',
    title: 'Comunidad de apoyo',
    body: 'Conecta con personas que entienden tu camino.',
    selected: true,
  },
  {
    icon: 'verified_user',
    title: 'Guía profesional',
    body: 'Acceso directo a especialistas y recursos validados.',
  },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const { registerWithMembership } = useAppContext()
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const answeredCount = Object.keys(formData.onboardingAnswers).length
  const profileCategory =
    answeredCount === onboardingQuestions.length
      ? calculateProfileCategory(formData.onboardingAnswers)
      : null
  const currentQuestion = onboardingQuestions[activeQuestionIndex]
  const progressPercentage = ((activeQuestionIndex + 1) / onboardingQuestions.length) * 100

  function updateField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function handleAnswer(category) {
    setError('')
    setFormData((current) => ({
      ...current,
      onboardingAnswers: {
        ...current.onboardingAnswers,
        [currentQuestion.id]: category,
      },
    }))
  }

  function goToNextQuestion() {
    if (!formData.onboardingAnswers[currentQuestion.id]) {
      setError('Elegí una opción para seguir.')
      return
    }
    setError('')
    if (activeQuestionIndex < onboardingQuestions.length - 1) {
      setActiveQuestionIndex((current) => current + 1)
      return
    }
    setStep(2)
  }

  function goToMembershipStep() {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Completá nombre, email y contraseña para continuar.')
      return
    }
    setError('')
    setStep(3)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (answeredCount !== onboardingQuestions.length) {
      setError('Completá las preguntas para generar tu perfil recomendado.')
      return
    }
    const result = registerWithMembership({ ...formData, profileCategory })
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate('/app')
  }

  const stepDots = [
    { active: step >= 0 },
    { active: step >= 1 },
    { active: step >= 2 },
  ]

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Step 0: Intro */}
      {step === 0 && (
        <>
          <header className="fixed top-0 w-full z-50 bg-[#f6faf7]/80 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">diversity_1</span>
                <span className="font-headline italic text-2xl text-primary">GAPA</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-medium tracking-widest uppercase text-on-surface-variant/60">
                  Paso 1 de 3
                </span>
                <div className="flex gap-1 mt-1">
                  <div className="h-1 w-8 rounded-full bg-primary"></div>
                  <div className="h-1 w-4 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1 w-4 rounded-full bg-surface-container-highest"></div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex flex-col items-center justify-center px-6 pt-24 pb-32 min-h-screen">
            <div className="max-w-md w-full">
              <div className="relative mb-12 aspect-square rounded-[2.5rem] overflow-hidden bg-surface-container-low shadow-lg">
                <img
                  alt="Comunidad"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-medium text-sm">
                  ¿Qué es GAPA?
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-on-surface leading-tight pr-8 font-headline">
                  Somos una red de apoyo para transformar la{' '}
                  <span className="italic text-primary">ansiedad</span> en{' '}
                  <span className="text-secondary">fortaleza</span>
                </h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-[90%]">
                  Un espacio seguro diseñado para el bienestar emocional, donde la comunidad y la
                  ciencia se encuentran.
                </p>
              </div>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 w-full p-8 flex flex-col items-center bg-gradient-to-t from-surface via-surface to-transparent">
            <div className="max-w-md w-full">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-primary text-on-primary py-5 px-8 rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 transition-all flex justify-between items-center"
              >
                <span>Siguiente</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <Link to="/" className="mt-4 w-full text-center text-on-surface-variant/50 text-xs block">
                Volver al inicio
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Step 1: Objectives / Questions */}
      {step === 1 && (
        <main className="flex flex-col px-6 pt-12 pb-24 max-w-2xl mx-auto w-full min-h-screen">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-on-surface-variant">Paso 2 de 3</span>
              <span className="text-sm font-bold text-primary">
                {activeQuestionIndex + 1}/{onboardingQuestions.length}
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-container rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <header className="mb-10 ml-2">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface leading-tight mb-4">
              {currentQuestion.prompt}
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xs">
              Selecciona la opción que mejor describe tu momento.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 mb-12">
            {currentQuestion.options.map((option) => {
              const isSelected = formData.onboardingAnswers[currentQuestion.id] === option.category
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option.category)}
                  className={`flex items-center p-6 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-primary/40 bg-primary-container/10 shadow-sm'
                      : 'border-outline-variant/15 bg-surface-container-low hover:border-primary/30'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mr-5 ${
                      isSelected ? 'bg-primary-container' : 'bg-primary-container/10'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        isSelected ? 'text-white' : 'text-primary'
                      }`}
                    >
                      psychology
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline text-lg font-bold">{option.label}</h3>
                    <p className="text-sm text-on-surface-variant">{option.category}</p>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-primary ml-2">check_circle</span>
                  )}
                </button>
              )
            })}
          </div>

          {error ? <p className="text-sm font-bold text-error mb-4">{error}</p> : null}

          <footer className="mt-auto flex flex-col gap-4">
            <button
              type="button"
              onClick={goToNextQuestion}
              className="w-full bg-secondary text-white py-5 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              {activeQuestionIndex === onboardingQuestions.length - 1
                ? 'Continuar'
                : 'Siguiente'}{' '}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeQuestionIndex > 0) {
                  setActiveQuestionIndex((c) => c - 1)
                } else {
                  setStep(0)
                }
              }}
              className="w-full py-4 text-on-surface-variant font-medium hover:bg-surface-container-low rounded-xl transition-colors"
            >
              Volver
            </button>
          </footer>
        </main>
      )}

      {/* Step 2: Account */}
      {step === 2 && (
        <main className="flex flex-col px-6 pt-12 pb-24 max-w-2xl mx-auto w-full min-h-screen">
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-on-surface-variant text-sm hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver
            </button>
          </div>

          <header className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-on-surface-variant">Paso 3 de 3</span>
              <span className="text-sm font-bold text-secondary">90%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mb-6">
              <div className="h-full bg-secondary rounded-full" style={{ width: '90%' }}></div>
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface leading-tight mb-4">
              Guardamos tu recorrido
            </h1>
            <p className="text-on-surface-variant text-lg">
              Personalizamos la experiencia con tus datos.
            </p>
          </header>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
                Nombre y apellido
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </div>

          {profileCategory && (
            <div className="bg-primary-container/10 border border-primary/20 rounded-xl p-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                Categoría detectada
              </span>
              <strong className="font-headline text-xl">{profileCategory}</strong>
              <p className="text-sm text-on-surface-variant mt-1">
                La sección &ldquo;Recomendado para vos&rdquo; priorizará recursos para este perfil.
              </p>
            </div>
          )}

          {error ? <p className="text-sm font-bold text-error mb-4">{error}</p> : null}

          <button
            type="button"
            onClick={goToMembershipStep}
            className="w-full bg-secondary text-white py-5 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            Continuar a membresía <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </main>
      )}

      {/* Step 3: Membership / Payment */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <main className="flex items-center justify-center px-6 pt-12 pb-24 min-h-screen">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 space-y-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-on-surface-variant text-sm hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Volver
                </button>
                <h1 className="font-headline text-5xl font-bold text-on-surface leading-[1.1]">
                  Elegí tu plan de bienestar
                </h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-sm">
                  Estás a un paso de comenzar tu transformación.
                </p>
              </div>

              <div className="md:col-span-7">
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-lg border border-outline-variant/15">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider mb-3">
                        Acceso Total
                      </span>
                      <h2 className="text-2xl font-bold">Membresía GAPA</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-primary">
                        $XX<span className="text-lg font-normal text-on-surface-variant">/mes</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
                        Plan
                      </label>
                      <select
                        value={formData.plan}
                        onChange={(e) => updateField('plan', e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      >
                        <option>Mensual</option>
                        <option>Trimestral</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
                        Medio de pago
                      </label>
                      <select
                        value={formData.paymentProvider}
                        onChange={(e) => updateField('paymentProvider', e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      >
                        <option>Mercado Pago</option>
                        <option>Talio Pay</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { title: 'Sesiones ilimitadas', body: 'Encuentros guiados por profesionales.' },
                      { title: 'Acceso al foro', body: 'Conectá con una comunidad que entiende tu camino.' },
                      { title: 'Recursos del campus', body: 'Biblioteca completa de ejercicios y meditaciones.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="material-symbols-outlined text-secondary text-sm">check</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-on-surface-variant">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {error ? <p className="text-sm font-bold text-error mb-4">{error}</p> : null}

                  <button
                    type="submit"
                    className="w-full py-5 bg-tertiary text-on-tertiary rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 shadow-lg"
                  >
                    Suscribirme y Comenzar{' '}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p className="mt-4 text-center text-xs text-on-surface-variant/60">
                    Al suscribirte, aceptás nuestros términos de servicio.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </form>
      )}
    </div>
  )
}

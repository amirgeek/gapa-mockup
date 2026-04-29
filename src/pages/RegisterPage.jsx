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

const steps = [
  { id: 'profile', label: 'Perfil' },
  { id: 'account', label: 'Cuenta' },
  { id: 'membership', label: 'Membresia' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const { registerWithMembership } = useAppContext()
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [activeStep, setActiveStep] = useState(0)
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
      setError('Elegi una opcion para seguir.')
      return
    }

    setError('')

    if (activeQuestionIndex < onboardingQuestions.length - 1) {
      setActiveQuestionIndex((current) => current + 1)
      return
    }

    setActiveStep(1)
  }

  function goToPrevious() {
    setError('')

    if (activeStep === 0) {
      if (activeQuestionIndex > 0) {
        setActiveQuestionIndex((current) => current - 1)
      }
      return
    }

    if (activeStep === 1) {
      setActiveStep(0)
      setActiveQuestionIndex(onboardingQuestions.length - 1)
      return
    }

    setActiveStep(1)
  }

  function goToMembershipStep() {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Completa nombre, email y contrasena para continuar.')
      return
    }

    setError('')
    setActiveStep(2)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (answeredCount !== onboardingQuestions.length) {
      setError('Completa las 10 preguntas para generar tu perfil recomendado.')
      return
    }

    const result = registerWithMembership({
      ...formData,
      profileCategory,
    })

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/app')
  }

  return (
    <div className="auth-shell">
      <form className="auth-card auth-card-wide" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Onboarding GAPA</p>
          <h1>Activa tu membresia con un recorrido claro y contenido</h1>
          <p className="muted-copy">
            Primero entendemos tu momento actual, despues guardamos tu cuenta y por ultimo activamos
            la membresia.
          </p>
        </div>

        <div className="stepper-row">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={index <= activeStep ? 'step-pill step-pill-active' : 'step-pill'}
            >
              <span>{index + 1}</span>
              <strong>{step.label}</strong>
            </div>
          ))}
        </div>

        {activeStep === 0 ? (
          <div className="membership-card form-stack">
            <div className="session-header">
              <div>
                <p className="eyebrow">Cuestionario de perfil</p>
                <h3>Te guiamos hacia el contenido que hoy mas puede ayudarte</h3>
              </div>
              <span className="status-badge status-badge-active">
                {activeQuestionIndex + 1}/{onboardingQuestions.length}
              </span>
            </div>

            <p className="muted-copy">
              Responde estas preguntas cortas. Con eso armamos tu categoria interna y personalizamos
              la seccion `Recomendado para vos`.
            </p>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>

            <section className="question-card question-card-featured">
              <p className="question-number">Pregunta {activeQuestionIndex + 1}</p>
              <h4>{currentQuestion.prompt}</h4>
              <div className="option-grid option-grid-single">
                {currentQuestion.options.map((option) => {
                  const isSelected = formData.onboardingAnswers[currentQuestion.id] === option.category

                  return (
                    <button
                      key={option.label}
                      type="button"
                      className={isSelected ? 'option-chip option-chip-active' : 'option-chip'}
                      onClick={() => handleAnswer(option.category)}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <div className="onboarding-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={goToPrevious}
                disabled={activeQuestionIndex === 0}
              >
                Volver
              </button>
              <button type="button" className="primary-button" onClick={goToNextQuestion}>
                {activeQuestionIndex === onboardingQuestions.length - 1
                  ? 'Continuar con tu cuenta'
                  : 'Siguiente pregunta'}
              </button>
            </div>

            <div className="profile-preview">
              <span className="eyebrow">Perfil sugerido</span>
              <strong>{profileCategory ?? 'Se calcula al completar las 10 preguntas'}</strong>
              <div className="tag-row">
                {profileCategories.map((category) => (
                  <span
                    key={category}
                    className={category === profileCategory ? 'tag tag-active' : 'tag'}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeStep === 1 ? (
          <div className="membership-card form-stack">
            <div className="session-header">
              <div>
                <p className="eyebrow">Tu cuenta</p>
                <h3>Guardamos tu recorrido para personalizar la experiencia</h3>
              </div>
              <span className="status-badge">Paso 2 de 3</span>
            </div>

            <div className="grid-two">
              <label className="field">
                <span>Nombre y apellido</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Tu nombre"
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="tu@email.com"
                />
              </label>
            </div>

            <label className="field">
              <span>Contrasena</span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="Minimo para demo"
              />
            </label>

            <div className="profile-banner">
              <span className="eyebrow">Categoria detectada</span>
              <strong>{profileCategory}</strong>
              <p>
                Cuando entres al campus, la seccion `Recomendado para vos` va a priorizar recursos
                relacionados con este perfil.
              </p>
            </div>

            <div className="onboarding-actions">
              <button type="button" className="ghost-button" onClick={goToPrevious}>
                Volver
              </button>
              <button type="button" className="primary-button" onClick={goToMembershipStep}>
                Continuar a membresia
              </button>
            </div>
          </div>
        ) : null}

        {activeStep === 2 ? (
          <>
            <div className="payment-grid">
              <label className="choice-card">
                <span>Plan</span>
                <select value={formData.plan} onChange={(event) => updateField('plan', event.target.value)}>
                  <option>Mensual</option>
                  <option>Trimestral</option>
                </select>
              </label>

              <label className="choice-card">
                <span>Medio de pago</span>
                <select
                  value={formData.paymentProvider}
                  onChange={(event) => updateField('paymentProvider', event.target.value)}
                >
                  <option>Mercado Pago</option>
                  <option>Talio Pay</option>
                </select>
              </label>
            </div>

            <div className="membership-card membership-card-strong form-stack">
              <p className="eyebrow">Membresia GAPA</p>
              <h3>$XX / mes</h3>
              <p className="muted-copy">
                En la version final este paso se integrara con Mercado Pago y Talio Pay. En esta
                demo, simulamos el alta completa solo despues del pago.
              </p>
              <ul className="feature-list">
                <li>Sin membresia no se crea el usuario</li>
                <li>Acceso al campus y sesiones</li>
                <li>Recomendaciones segun tu categoria interna</li>
              </ul>
              <div className="onboarding-actions">
                <button type="button" className="ghost-button" onClick={goToPrevious}>
                  Volver
                </button>
                <button className="primary-button" type="submit">
                  Pagar y crear cuenta
                </button>
              </div>
            </div>
          </>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <div className="auth-footer">
          <Link to="/">Volver al inicio</Link>
          <Link to="/login">Ya tengo cuenta</Link>
        </div>
      </form>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'
import { BrandLogo } from '../components/BrandLogo.jsx'
import { calculateProfileCategory, onboardingQuestions } from '../data/onboardingProfile.js'

const initialState = {
  name: '',
  email: '',
  password: '',
  plan: 'Mensual',
  paymentProvider: 'Mercado Pago',
  onboardingAnswers: {},
}

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
  const currentAnswer = formData.onboardingAnswers[currentQuestion?.id]

  function updateField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function pickAnswer(category) {
    setError('')
    setFormData((current) => ({
      ...current,
      onboardingAnswers: {
        ...current.onboardingAnswers,
        [currentQuestion.id]: category,
      },
    }))
  }

  function nextQuestion() {
    if (!currentAnswer) {
      setError('Elegí una opción para seguir.')
      return
    }

    setError('')
    if (activeQuestionIndex < onboardingQuestions.length - 1) {
      setActiveQuestionIndex((current) => current + 1)
      return
    }
    setStep(1)
  }

  function backQuestion() {
    setError('')
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((current) => current - 1)
      return
    }
    navigate('/')
  }

  function goToMembership() {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Completá nombre, email y contraseña para continuar.')
      return
    }
    setError('')
    setStep(2)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (answeredCount !== onboardingQuestions.length) {
      setError('Completá el cuestionario para generar tu perfil recomendado.')
      return
    }

    const result = registerWithMembership({ ...formData, profileCategory })

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/app')
  }

  return (
    <div className="auth-page">
      <div className="auth-art">
        <img
          src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1400&q=80"
          alt="Ambiente cálido de acompañamiento"
        />
        <div className="auth-art-content">
          <BrandLogo to="/" inverted />
          <div className="auth-art-quote">
            <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
              Onboarding · 3 pasos · 10 min
            </p>
            <p className="quote" style={{ color: '#FBFBFA' }}>
              “El onboarding no es un trámite. Es la primera vez que te vamos a escuchar.”
            </p>
            <p className="attr">Equipo clínico GAPA</p>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form">
          <div className="step-bar">
            <div className={step === 0 ? 'current' : 'done'} />
            <div className={step === 1 ? 'current' : step > 1 ? 'done' : ''} />
            <div className={step === 2 ? 'current' : ''} />
          </div>

          {step === 0 ? (
            <>
              <div className="stack-sm">
                <p className="eyebrow">Paso 1 de 3</p>
                <h2 className="h2">{currentQuestion.prompt}</h2>
                <p className="body-sm">
                  Seleccioná la opción que mejor describa tu momento actual. Esto define lo que
                  vas a ver recomendado dentro del campus.
                </p>
                <p className="body-sm" style={{ color: 'var(--green)' }}>
                  Pregunta {activeQuestionIndex + 1} de {onboardingQuestions.length}
                </p>
              </div>

              <div className="stack" style={{ gap: 12 }}>
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`choice ${currentAnswer === option.category ? 'selected' : ''}`}
                    onClick={() => pickAnswer(option.category)}
                  >
                    <div className="choice-dot" />
                    <div>
                      <strong>{option.label}</strong>
                      <span>{option.category}</span>
                    </div>
                  </button>
                ))}
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between">
                <button type="button" className="btn btn-ghost" onClick={backQuestion}>
                  {activeQuestionIndex === 0 ? 'Volver al inicio' : 'Atrás'}
                </button>
                <button type="button" className="btn btn-primary" onClick={nextQuestion}>
                  {activeQuestionIndex === onboardingQuestions.length - 1 ? 'Continuar' : 'Siguiente'}
                  <AppIcon name="arrow" size={16} />
                </button>
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="stack-sm">
                <p className="eyebrow">Paso 2 de 3</p>
                <h2 className="h2">Guardamos tu cuenta.</h2>
                <p className="body-sm">
                  Ya detectamos tu recorrido recomendado:
                  <strong style={{ color: 'var(--green-deep)' }}> {profileCategory}</strong>.
                </p>
              </div>

              <div className="field">
                <label htmlFor="register-name">Nombre y apellido</label>
                <input
                  id="register-name"
                  value={formData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Camila Rivero"
                  required
                />
              </div>

              <div className="grid-two">
                <div className="field">
                  <label htmlFor="register-email">Correo</label>
                  <input
                    id="register-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="register-password">Contraseña</label>
                  <input
                    id="register-password"
                    type="password"
                    value={formData.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    placeholder="Mínimo para demo"
                    required
                  />
                </div>
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>
                  Atrás
                </button>
                <button type="button" className="btn btn-primary" onClick={goToMembership}>
                  Continuar
                  <AppIcon name="arrow" size={16} />
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <form className="stack" onSubmit={handleSubmit}>
              <div className="stack-sm">
                <p className="eyebrow">Paso 3 de 3</p>
                <h2 className="h2">Activás la membresía.</h2>
                <p className="body-sm">
                  En esta demo simulamos el alta completa después del pago para respetar el flujo
                  real que le contaste al cliente.
                </p>
              </div>

              <div className="grid-two">
                <div className="choice selected" style={{ cursor: 'default' }}>
                  <div className="choice-dot" />
                  <div>
                    <strong>Mensual</strong>
                    <span>$14.900 por mes, cancelable cuando quieras</span>
                  </div>
                </div>
                <div className="choice" onClick={() => updateField('plan', 'Trimestral')}>
                  <div className="choice-dot" />
                  <div>
                    <strong>Trimestral</strong>
                    <span>$11.900 por mes, mejor continuidad</span>
                  </div>
                </div>
              </div>

              <div className="grid-two">
                <div className="field">
                  <label htmlFor="register-plan">Plan</label>
                  <select
                    id="register-plan"
                    value={formData.plan}
                    onChange={(event) => updateField('plan', event.target.value)}
                  >
                    <option>Mensual</option>
                    <option>Trimestral</option>
                    <option>Anual</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="register-provider">Pago</label>
                  <select
                    id="register-provider"
                    value={formData.paymentProvider}
                    onChange={(event) => updateField('paymentProvider', event.target.value)}
                  >
                    <option>Mercado Pago</option>
                    <option>Talio Pay</option>
                  </select>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <p className="eyebrow no-rule">Perfil detectado</p>
                <h3 className="h3" style={{ marginTop: 8 }}>
                  {profileCategory}
                </h3>
                <p className="body-sm" style={{ marginTop: 8 }}>
                  Al entrar al campus vas a ver una categoría “Recomendado para vos” con recursos
                  filtrados según este perfil.
                </p>
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  Atrás
                </button>
                <button type="submit" className="btn btn-primary">
                  Activar membresía
                  <AppIcon name="arrow" size={16} />
                </button>
              </div>

              <p className="body-sm" style={{ textAlign: 'center' }}>
                ¿Ya tenés cuenta? <Link to="/login" style={{ color: 'var(--green-deep)', fontWeight: 700 }}>Iniciar sesión</Link>
              </p>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}

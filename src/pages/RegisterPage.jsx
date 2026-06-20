import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'
import { BrandLogo } from '../components/BrandLogo.jsx'
import { createMercadoPagoSubscription } from '../lib/mercadoPago.js'
import {
  getOnboardingSummary,
  onboardingQuestions,
} from '../data/onboardingProfile.js'

const initialState = {
  name: '',
  email: '',
  password: '',
  plan: 'Mensual',
  paymentProvider: 'Mercado Pago',
  onboardingAnswers: {},
}

const mercadoPagoLogoUrl =
  'https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-navigation/7.4.4/mercadopago/logo-footer-v3.svg'

const planOptions = [
  {
    name: 'Mensual',
    summary: 'ARS 24.999 por mes',
    detail: 'Acceso completo a campus, sesiones y seguimiento personal.',
  },
  {
    name: 'Trimestral',
    summary: 'ARS 69.900 cada 3 meses',
    detail: 'Equivale a ARS 23.300 por mes y te da más continuidad en el proceso.',
  },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const { registerWithMembership } = useAppContext()
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [paymentMessage, setPaymentMessage] = useState('')
  const [creatingPreference, setCreatingPreference] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const answeredCount = Object.keys(formData.onboardingAnswers).length
  const onboardingSummary =
    answeredCount === onboardingQuestions.length
      ? getOnboardingSummary(formData.onboardingAnswers)
      : null
  const profileCategory = onboardingSummary?.profileCategory ?? null
  const currentQuestion = onboardingQuestions[activeQuestionIndex]
  const currentAnswer = formData.onboardingAnswers[currentQuestion?.id]

  function updateField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function pickAnswer(value) {
    setError('')
    setFormData((current) => ({
      ...current,
      onboardingAnswers: {
        ...current.onboardingAnswers,
        [currentQuestion.id]: value,
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

  async function handleMercadoPagoCheckout() {
    setError('')
    setPaymentMessage('')
    setCreatingPreference(true)

    try {
      const subscription = await createMercadoPagoSubscription({
        plan: formData.plan,
        email: formData.email,
        fullName: formData.name,
      })

      const checkoutUrl = subscription.initPoint

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
        setPaymentMessage(
          'Ya dejamos la suscripción lista en otra pestaña. Si aprobás el alta, Mercado Pago debería continuar con el flujo recurrente.',
        )
      } else {
        setPaymentMessage('La suscripción se creó, pero no recibimos un link de checkout.')
      }
    } catch (checkoutError) {
      setPaymentMessage(checkoutError.message)
    } finally {
      setCreatingPreference(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (answeredCount !== onboardingQuestions.length) {
      setError('Completá el cuestionario para generar tu perfil recomendado.')
      return
    }

    setSubmitting(true)

    const result = await registerWithMembership({
      ...formData,
      profileCategory,
      onboardingSummary,
    })

    setSubmitting(false)

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
                <p className="eyebrow">Entrevista inicial · Paso 1 de 3</p>
                <h2 className="h2">{currentQuestion.prompt}</h2>
                <p className="body-sm">{currentQuestion.helper}</p>
                <p className="body-sm" style={{ color: 'var(--green)' }}>
                  {currentQuestion.section} · Pregunta {activeQuestionIndex + 1} de{' '}
                  {onboardingQuestions.length}
                </p>
              </div>

              <div className="stack" style={{ gap: 12 }}>
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`choice ${currentAnswer === option.value ? 'selected' : ''}`}
                    onClick={() => pickAnswer(option.value)}
                  >
                    <div className="choice-dot" />
                    <div>
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between auth-actions">
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
                <p className="eyebrow">Datos de acceso · Paso 2 de 3</p>
                <h2 className="h2">Creá tu acceso a la plataforma.</h2>
                <p className="body-sm">
                  Ya detectamos un perfil interno predominante:
                  <strong style={{ color: 'var(--green-deep)' }}> {profileCategory}</strong>.
                </p>
              </div>

              {onboardingSummary?.supportMessage ? (
                <div
                  className="card"
                  style={{
                    padding: 20,
                    borderColor:
                      onboardingSummary.riskLevel === 'frecuentemente'
                        ? 'rgba(185, 28, 28, 0.3)'
                        : 'rgba(47, 107, 62, 0.22)',
                  }}
                >
                  <p className="eyebrow no-rule" style={{ color: 'var(--red)' }}>
                    Contención recomendada
                  </p>
                  <p className="body-sm" style={{ marginTop: 8 }}>
                    {onboardingSummary.supportMessage}
                  </p>
                </div>
              ) : null}

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
                    placeholder="Creá una contraseña segura"
                    required
                  />
                  <span className="body-sm" style={{ color: 'var(--muted)' }}>
                    La vas a usar para entrar a GAPA una vez activada tu membresía.
                  </span>
                </div>
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between auth-actions">
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
                <p className="eyebrow">Membresía · Paso 3 de 3</p>
                <h2 className="h2">Activás la membresía.</h2>
                <p className="body-sm">
                  El acceso completo a la plataforma queda asociado a una membresía activa.
                  Desde acá definís plan, medio de pago y el alta de tu suscripción.
                </p>
              </div>

              <div className="stack" style={{ gap: 12 }}>
                {planOptions.map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    className={`choice ${formData.plan === plan.name ? 'selected' : ''}`}
                    onClick={() => updateField('plan', plan.name)}
                  >
                    <div className="choice-dot" />
                    <div>
                      <strong>{plan.name}</strong>
                      <span>{plan.summary}</span>
                      <span style={{ display: 'block', marginTop: 6 }}>{plan.detail}</span>
                    </div>
                  </button>
                ))}
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
                  </select>
                </div>
                <div className="field">
                  <label>Medio de pago</label>
                  <div
                    className="choice selected"
                    style={{ cursor: 'default', minHeight: '100%', padding: 16 }}
                  >
                    <div className="choice-dot" />
                    <div>
                      <strong>Mercado Pago</strong>
                      <span>Suscripción recurrente con checkout seguro.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <p className="eyebrow no-rule">Perfil detectado</p>
                <h3 className="h3" style={{ marginTop: 8 }}>
                  {profileCategory}
                </h3>
                <p className="body-sm" style={{ marginTop: 8 }}>
                  Al entrar al campus vas a ver “Recomendado para vos” filtrado según este patrón
                  interno y tu nivel actual de malestar.
                </p>
                {onboardingSummary ? (
                  <div className="grid-two" style={{ marginTop: 18 }}>
                    <div>
                      <p className="eyebrow muted no-rule">Ansiedad hoy</p>
                      <strong
                        style={{
                          fontFamily: 'Georgia, Times New Roman, serif',
                          fontSize: 18,
                          fontWeight: 400,
                          color: 'var(--green-deep)',
                        }}
                      >
                        {onboardingSummary.intensityNow}/10
                      </strong>
                    </div>
                    <div>
                      <p className="eyebrow muted no-rule">Bienestar afectado</p>
                      <strong
                        style={{
                          fontFamily: 'Georgia, Times New Roman, serif',
                          fontSize: 18,
                          fontWeight: 400,
                          color: 'var(--green-deep)',
                        }}
                      >
                        {onboardingSummary.wellbeingLevel}/10
                      </strong>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="card" style={{ padding: 20 }}>
                <p className="eyebrow no-rule">Pago e integración</p>
                <div
                  className="mercadopago-checkout"
                  style={{ marginTop: 12 }}
                >
                  <div className="mercadopago-checkout-brand">
                    <div className="mercadopago-logo-badge">
                      <img
                        src={mercadoPagoLogoUrl}
                        alt="Mercado Pago"
                        style={{ width: 122, height: 32, objectFit: 'contain' }}
                      />
                    </div>
                    <span className="tag neutral">Suscripción recurrente</span>
                    <span className="tag neutral">Checkout seguro</span>
                  </div>
                  <div className="mercadopago-checkout-copy">
                    <strong>
                      {formData.plan === 'Trimestral'
                        ? 'Pagás ARS 69.900 cada 3 meses'
                        : 'Pagás ARS 24.999 por mes'}
                    </strong>
                    <span>
                      {formData.plan === 'Trimestral'
                        ? 'Plan pensado para sostener continuidad, con equivalente de ARS 23.300 por mes.'
                        : 'Acceso completo al campus, sesiones grupales y herramientas de seguimiento.'}
                    </span>
                  </div>
                </div>
                <h3 className="h3" style={{ marginTop: 8 }}>
                  La membresía se activa con suscripción recurrente
                </h3>
                <p className="body-sm" style={{ marginTop: 8 }}>
                  El alta se prepara para que la cuota se renueve de forma mensual y el acceso a
                  la plataforma quede asociado a una membresía activa. Todo el cobro se canaliza
                  a través de Mercado Pago.
                </p>
                <div className="row-wrap" style={{ marginTop: 16 }}>
                  <span className="chip active">
                    {formData.plan === 'Trimestral' ? 'ARS 69.900 / trimestre' : 'ARS 24.999 / mes'}
                  </span>
                  <span className="chip">
                    {formData.plan === 'Trimestral' ? 'Equivale a ARS 23.300 / mes' : 'Renovación mensual'}
                  </span>
                  <span className="chip">Cancelación desde tu cuenta</span>
                </div>
                <div className="row-wrap" style={{ marginTop: 18 }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleMercadoPagoCheckout}
                    disabled={creatingPreference}
                    style={{ opacity: creatingPreference ? 0.6 : 1 }}
                  >
                    {creatingPreference ? 'Preparando suscripción...' : 'Continuar en Mercado Pago'}
                  </button>
                  <span className="tag neutral">Mercado Pago</span>
                </div>
                {paymentMessage ? (
                  <p className="body-sm" style={{ marginTop: 12 }}>
                    {paymentMessage}
                  </p>
                ) : null}
              </div>

              {onboardingSummary?.supportMessage ? (
                <div
                  className="card"
                  style={{
                    padding: 20,
                    borderColor:
                      onboardingSummary.riskLevel === 'frecuentemente'
                        ? 'rgba(185, 28, 28, 0.3)'
                        : 'rgba(47, 107, 62, 0.22)',
                  }}
                >
                  <p className="eyebrow no-rule" style={{ color: 'var(--red)' }}>
                    Prioridad de acompañamiento
                  </p>
                  <p className="body-sm" style={{ marginTop: 8 }}>
                    {onboardingSummary.supportMessage}
                  </p>
                </div>
              ) : null}

              {error ? <p className="form-error">{error}</p> : null}

              <div className="row-between auth-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  Atrás
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Activando...' : 'Activar membresía'}
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

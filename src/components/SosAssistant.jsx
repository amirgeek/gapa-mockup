import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { getSosTopicsForProfile } from '../data/sosResources.js'
import { AppIcon } from './AppIcon.jsx'

let messageIdCounter = 0
function nextId() {
  messageIdCounter += 1
  return `sos-msg-${messageIdCounter}`
}

export function SosAssistant() {
  const { currentUser, logSosUse } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [pendingOptions, setPendingOptions] = useState(null)
  const timeoutsRef = useRef([])
  const scrollRef = useRef(null)

  const profilePack = useMemo(
    () => getSosTopicsForProfile(currentUser?.profileCategory),
    [currentUser?.profileCategory],
  )
  const riskLevel = currentUser?.onboardingSummary?.riskLevel ?? 'nunca'

  function clearTimers() {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []
  }

  function queueBotMessage(content, { delay = 650, options = null } = {}) {
    setIsTyping(true)
    setPendingOptions(null)
    const timeoutId = window.setTimeout(() => {
      setIsTyping(false)
      setMessages((current) => [...current, { id: nextId(), from: 'bot', content }])
      if (options) {
        setPendingOptions(options)
      }
    }, delay)
    timeoutsRef.current.push(timeoutId)
  }

  function queueBotSequence(items, { startDelay = 500, step = 1500 } = {}) {
    setIsTyping(true)
    setPendingOptions(null)
    items.forEach((content, index) => {
      const isLast = index === items.length - 1
      const timeoutId = window.setTimeout(() => {
        setMessages((current) => [...current, { id: nextId(), from: 'bot', content }])
        if (isLast) {
          setIsTyping(false)
        }
      }, startDelay + index * step)
      timeoutsRef.current.push(timeoutId)
    })
  }

  function pushUserMessage(content) {
    setMessages((current) => [...current, { id: nextId(), from: 'user', content }])
  }

  function buildTopicOptions() {
    return profilePack.topics.map((topic) => ({
      id: topic.id,
      label: topic.title,
      onSelect: () => handleTopicSelect(topic),
    }))
  }

  function buildFollowUpOptions(topic) {
    return [
      { id: 'audio', label: '🔊 Escuchar guía en audio', onSelect: () => handleAudioGuide(topic) },
      { id: 'video', label: '🧭 Ver guía paso a paso', onSelect: () => handleStepGuide(topic) },
      { id: 'other', label: '↩ Elegir otro tema', onSelect: () => handleShowTopics() },
      { id: 'done', label: '✅ Ya estoy mejor', onSelect: () => handleFinish() },
    ]
  }

  function handleShowTopics() {
    pushUserMessage('Quiero elegir otro tema')
    queueBotMessage('Dale. ¿Con cuál de estos te ayudo ahora?', { options: buildTopicOptions() })
  }

  function handleTopicSelect(topic) {
    pushUserMessage(topic.title)
    logSosUse(`SOS · ${topic.id}`)
    queueBotMessage(topic.text, { delay: 700, options: buildFollowUpOptions(topic) })
  }

  function handleAudioGuide(topic) {
    pushUserMessage('Escuchar guía en audio')
    logSosUse(`SOS audio · ${topic.title}`)

    if (!('speechSynthesis' in window)) {
      queueBotMessage('Tu navegador no soporta audio guiado en este momento, pero podés seguir el texto de arriba.', {
        options: buildFollowUpOptions(topic),
      })
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(topic.audioScript)
    utterance.lang = 'es-AR'
    utterance.rate = 0.95
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)

    queueBotMessage('Reproduciendo guía hablada. Escuchá con calma, no hace falta hacer nada más ahora.', {
      delay: 500,
      options: [
        {
          id: 'stop',
          label: '⏹ Detener audio',
          onSelect: () => {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
            pushUserMessage('Detener audio')
            queueBotMessage('Listo, corté el audio.', { options: buildFollowUpOptions(topic) })
          },
        },
        ...buildFollowUpOptions(topic),
      ],
    })
  }

  function handleStepGuide(topic) {
    pushUserMessage('Ver guía paso a paso')
    logSosUse(`SOS video · ${topic.title}`)
    setPendingOptions(null)

    const steps = topic.videoFrames.map(
      (frame, index) => `Paso ${index + 1} de ${topic.videoFrames.length} · ${frame}`,
    )
    queueBotSequence(steps, { startDelay: 500, step: 1600 })

    const totalDelay = 500 + steps.length * 1600 + 300
    const timeoutId = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: nextId(), from: 'bot', content: '¿Cómo seguimos?' },
      ])
      setPendingOptions(buildFollowUpOptions(topic))
    }, totalDelay)
    timeoutsRef.current.push(timeoutId)
  }

  function handleFinish() {
    pushUserMessage('Ya estoy mejor')
    logSosUse('SOS · cierre')
    queueBotMessage(
      'Me alegra leer eso. Guardé este uso en tu seguimiento. Podés volver a abrir el SOS cuando lo necesites.',
      { delay: 600 },
    )
  }

  function startConversation() {
    clearTimers()
    setMessages([])
    setPendingOptions(null)
    messageIdCounter = 0

    const greetingName = currentUser?.name?.split(' ')[0] ?? ''
    const greeting = greetingName
      ? `Hola ${greetingName}, activaste el modo SOS.`
      : 'Hola, activaste el modo SOS.'

    if (riskLevel === 'frecuentemente') {
      queueBotMessage(
        'Antes de seguir: contanos que en tu onboarding marcaste que esto te viene pasando frecuentemente. Eso merece ayuda humana prioritaria, no solo esta herramienta.',
        { delay: 300 },
      )
      queueBotMessage(
        'Si sentís que estás en riesgo o podrías lastimarte, comunicate ya con tu profesional de referencia, con alguien de tu confianza o con el servicio de emergencias de tu zona (en Argentina: 911).',
        { delay: 1700 },
      )
      queueBotMessage(`${greeting} Mientras buscás esa ayuda, puedo acompañarte con algo puntual ahora.`, {
        delay: 2600,
      })
      queueBotMessage(
        `Detecté tu perfil como "${currentUser?.profileCategory ?? 'general'}". ¿Con qué necesitás ayuda ahora mismo?`,
        { delay: 3300, options: buildTopicOptions() },
      )
      return
    }

    queueBotMessage(`${greeting} Vi que tu perfil es "${currentUser?.profileCategory ?? 'general'}".`, {
      delay: 300,
    })
    queueBotMessage('Estoy acá para ayudarte a bajar esto ahora, paso a paso. ¿Con qué necesitás ayuda?', {
      delay: 1200,
      options: buildTopicOptions(),
    })
  }

  function openAssistant() {
    setIsOpen(true)
  }

  function closeAssistant() {
    setIsOpen(false)
    clearTimers()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  useEffect(() => {
    if (isOpen) {
      startConversation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeAssistant()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping, pendingOptions])

  useEffect(() => {
    return () => {
      clearTimers()
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <>
      <button type="button" className="sos-trigger" onClick={openAssistant}>
        SOS
      </button>

      {isOpen ? (
        <div
          className="sos-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Asistente SOS"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeAssistant()
            }
          }}
        >
          <div className="sos-chat-panel">
            <div className="sos-chat-header">
              <div>
                <p className="eyebrow no-rule" style={{ color: '#ffd7d7' }}>
                  Respuesta inmediata · Asistente algorítmico
                </p>
                <h3 className="h3" style={{ color: '#fbfbfa', marginTop: 4 }}>
                  SOS GAPA
                </h3>
              </div>
              <button
                type="button"
                className="sos-chat-close"
                onClick={closeAssistant}
                aria-label="Cerrar asistente SOS"
              >
                <AppIcon name="close" size={18} />
              </button>
            </div>

            <div className="sos-chat-body" ref={scrollRef}>
              {messages.map((message) => (
                <div key={message.id} className={`sos-bubble-row ${message.from}`}>
                  <div className={`sos-bubble ${message.from}`}>{message.content}</div>
                </div>
              ))}

              {isTyping ? (
                <div className="sos-bubble-row bot">
                  <div className="sos-bubble bot sos-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}

              {!isTyping && pendingOptions ? (
                <div className="sos-options">
                  {pendingOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="sos-option-button"
                      onClick={option.onSelect}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="sos-chat-footer">
              {isSpeaking ? <span className="tag neutral">Reproduciendo audio…</span> : null}
              <span className="body-sm" style={{ color: 'var(--muted)' }}>
                Este asistente no reemplaza atención profesional de emergencia.
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

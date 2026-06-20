import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { getSosTopicsForProfile } from '../data/sosResources.js'
import { AppIcon } from './AppIcon.jsx'

export function SosAssistant() {
  const { currentUser, logSosUse } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [videoStepIndex, setVideoStepIndex] = useState(0)
  const profilePack = useMemo(
    () => getSosTopicsForProfile(currentUser?.profileCategory),
    [currentUser?.profileCategory],
  )
  const [activeTopicId, setActiveTopicId] = useState(profilePack.topics[0]?.id ?? '')

  useEffect(() => {
    if (!isPlayingVideo) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setVideoStepIndex((current) => {
        const next = current + 1
        if (next >= activeTopic.videoFrames.length) {
          setIsPlayingVideo(false)
          return current
        }
        return next
      })
    }, 2400)

    return () => window.clearInterval(interval)
  }, [isPlayingVideo, activeTopicId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const activeTopic =
    profilePack.topics.find((topic) => topic.id === activeTopicId) ?? profilePack.topics[0]
  const safeVideoIndex = Math.min(videoStepIndex, activeTopic.videoFrames.length - 1)

  function handleTopicSelect(topicId) {
    setActiveTopicId(topicId)
    setVideoStepIndex(0)
    setIsPlayingVideo(false)
    logSosUse(`SOS · ${topicId}`)
  }

  function handleSpeak() {
    if (!('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(activeTopic.audioScript)
    utterance.lang = 'es-AR'
    utterance.rate = 0.95
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    setIsSpeaking(true)
    logSosUse(`SOS audio · ${activeTopic.title}`)
    window.speechSynthesis.speak(utterance)
  }

  function handleStopAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  function handlePlayVideo() {
    setVideoStepIndex(0)
    setIsPlayingVideo(true)
    logSosUse(`SOS video · ${activeTopic.title}`)
  }

  return (
    <>
      <button type="button" className="sos-trigger" onClick={() => setIsOpen(true)}>
        SOS
      </button>

      {isOpen ? (
        <div className="sos-overlay" role="dialog" aria-modal="true" aria-label="Asistente SOS">
          <div className="sos-panel">
            <div className="sos-panel-header">
              <div>
                <p className="eyebrow no-rule" style={{ color: '#ffd7d7' }}>
                  Respuesta inmediata
                </p>
                <h3 className="h3" style={{ color: '#fbfbfa', marginTop: 8 }}>
                  SOS para {currentUser?.profileCategory ?? 'tu perfil'}
                </h3>
                <p className="body-sm" style={{ color: 'rgba(255,255,255,0.82)', marginTop: 8 }}>
                  {profilePack.intro}
                </p>
              </div>
              <button type="button" className="sos-close" onClick={() => setIsOpen(false)}>
                Cerrar
              </button>
            </div>

            <div className="sos-panel-body">
              <aside className="sos-topic-list">
                {profilePack.topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`sos-topic-button ${activeTopic.id === topic.id ? 'active' : ''}`}
                    onClick={() => handleTopicSelect(topic.id)}
                  >
                    <span>{topic.title}</span>
                    <AppIcon name="arrow" size={14} />
                  </button>
                ))}
              </aside>

              <div className="sos-topic-content">
                <section className="sos-resource-block">
                  <div className="row-between">
                    <div>
                      <p className="eyebrow no-rule">Texto</p>
                      <h4 className="h4" style={{ marginTop: 6 }}>
                        {activeTopic.title}
                      </h4>
                    </div>
                    <span className="tag neutral">Lectura breve</span>
                  </div>
                  <p className="body" style={{ marginTop: 14 }}>
                    {activeTopic.text}
                  </p>
                </section>

                <section className="sos-resource-block">
                  <div className="row-between">
                    <div>
                      <p className="eyebrow no-rule">Audio</p>
                      <h4 className="h4" style={{ marginTop: 6 }}>
                        Guía hablada rápida
                      </h4>
                    </div>
                    <span className="tag neutral">Navegador</span>
                  </div>
                  <p className="body-sm" style={{ marginTop: 12 }}>
                    Reproduce una lectura guiada del recurso usando la voz del dispositivo.
                  </p>
                  <div className="row-wrap" style={{ marginTop: 16 }}>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSpeak}>
                      Escuchar guía
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={handleStopAudio}
                      disabled={!isSpeaking}
                    >
                      Detener audio
                    </button>
                  </div>
                </section>

                <section className="sos-resource-block">
                  <div className="row-between">
                    <div>
                      <p className="eyebrow no-rule">Video</p>
                      <h4 className="h4" style={{ marginTop: 6 }}>
                        {activeTopic.videoTitle}
                      </h4>
                    </div>
                    <span className="tag neutral">Guía secuencial</span>
                  </div>
                  <div className="sos-video-shell" style={{ marginTop: 16 }}>
                    <div className="sos-video-stage">
                      <span className="sos-video-kicker">
                        Paso {safeVideoIndex + 1} de {activeTopic.videoFrames.length}
                      </span>
                      <p className="sos-video-copy">{activeTopic.videoFrames[safeVideoIndex]}</p>
                    </div>
                    <div className="sos-video-progress">
                      {activeTopic.videoFrames.map((frame) => (
                        <span
                          key={frame}
                          className={
                            activeTopic.videoFrames[safeVideoIndex] === frame
                              ? 'active'
                              : ''
                          }
                        />
                      ))}
                    </div>
                    <div className="row-wrap" style={{ marginTop: 14 }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handlePlayVideo}
                      >
                        Ver guía
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          setIsPlayingVideo(false)
                          setVideoStepIndex(0)
                        }}
                      >
                        Reiniciar
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

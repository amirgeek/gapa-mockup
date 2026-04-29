import { useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

const sessionInitialState = {
  title: '',
  category: '',
  professional: '',
  datetime: '',
  duration: '',
  description: '',
  meetLink: '',
  capacity: 12,
}

const campusInitialState = {
  title: '',
  category: '',
  author: '',
  type: 'Guia',
  audienceProfile: 'Habitos y bienestar',
  excerpt: '',
  content: '',
}

export function AdminPage() {
  const { state, createSession, createCampusItem } = useAppContext()
  const [sessionForm, setSessionForm] = useState(sessionInitialState)
  const [campusForm, setCampusForm] = useState(campusInitialState)

  function handleSessionSubmit(event) {
    event.preventDefault()
    createSession({
      ...sessionForm,
      capacity: Number(sessionForm.capacity),
    })
    setSessionForm(sessionInitialState)
  }

  function handleCampusSubmit(event) {
    event.preventDefault()
    createCampusItem({
      ...campusForm,
      audienceProfiles: [campusForm.audienceProfile],
    })
    setCampusForm(campusInitialState)
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Administracion</p>
          <h1>Panel para operar toda la plataforma demo</h1>
          <p>
            Desde aca se ordena la operacion de usuarios, sesiones y contenidos. La idea es validar
            el modelo completo antes de conectar backend y pagos reales.
          </p>
        </div>
      </section>

      <section className="cards-grid">
        <article className="surface-card">
          <p className="eyebrow">Usuarios</p>
          <h2>{state.users.length} registrados</h2>
          <div className="table-list">
            {state.users.map((user) => (
              <div key={user.id} className="table-row">
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <div>
                  <strong>{user.role}</strong>
                  <span>{user.membershipStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card">
          <p className="eyebrow">Resumen operativo</p>
          <h2>Todo en un solo lugar</h2>
          <div className="stats-grid">
            <article className="stat-card">
              <strong>{state.sessions.length}</strong>
              <span>Sesiones cargadas</span>
            </article>
            <article className="stat-card">
              <strong>{state.campusItems.length}</strong>
              <span>Recursos publicados</span>
            </article>
          </div>
        </article>
      </section>

      <section className="cards-grid">
        <form className="surface-card form-stack" onSubmit={handleSessionSubmit}>
          <p className="eyebrow">Nueva sesion</p>
          <h2>Cargar encuentro con Meet</h2>
          <div className="grid-two">
            <label className="field">
              <span>Titulo</span>
              <input
                value={sessionForm.title}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, title: event.target.value }))
                }
                required
              />
            </label>
            <label className="field">
              <span>Categoria</span>
              <input
                value={sessionForm.category}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, category: event.target.value }))
                }
                required
              />
            </label>
          </div>
          <div className="grid-two">
            <label className="field">
              <span>Profesional</span>
              <input
                value={sessionForm.professional}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, professional: event.target.value }))
                }
                required
              />
            </label>
            <label className="field">
              <span>Fecha y hora</span>
              <input
                type="datetime-local"
                value={sessionForm.datetime}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, datetime: event.target.value }))
                }
                required
              />
            </label>
          </div>
          <div className="grid-two">
            <label className="field">
              <span>Duracion</span>
              <input
                value={sessionForm.duration}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, duration: event.target.value }))
                }
                placeholder="60 min"
                required
              />
            </label>
            <label className="field">
              <span>Cupos</span>
              <input
                type="number"
                min="1"
                value={sessionForm.capacity}
                onChange={(event) =>
                  setSessionForm((current) => ({ ...current, capacity: event.target.value }))
                }
                required
              />
            </label>
          </div>
          <label className="field">
            <span>Link de Meet</span>
            <input
              value={sessionForm.meetLink}
              onChange={(event) =>
                setSessionForm((current) => ({ ...current, meetLink: event.target.value }))
              }
              placeholder="https://meet.google.com/..."
              required
            />
          </label>
          <label className="field">
            <span>Descripcion</span>
            <textarea
              value={sessionForm.description}
              onChange={(event) =>
                setSessionForm((current) => ({ ...current, description: event.target.value }))
              }
              rows="4"
              required
            />
          </label>
          <button className="primary-button" type="submit">
            Guardar sesion
          </button>
        </form>

        <form className="surface-card form-stack" onSubmit={handleCampusSubmit}>
          <p className="eyebrow">Nuevo contenido</p>
          <h2>Publicar recurso en campus</h2>
          <div className="grid-two">
            <label className="field">
              <span>Titulo</span>
              <input
                value={campusForm.title}
                onChange={(event) =>
                  setCampusForm((current) => ({ ...current, title: event.target.value }))
                }
                required
              />
            </label>
            <label className="field">
              <span>Categoria</span>
              <input
                value={campusForm.category}
                onChange={(event) =>
                  setCampusForm((current) => ({ ...current, category: event.target.value }))
                }
                required
              />
            </label>
          </div>
          <div className="grid-two">
            <label className="field">
              <span>Autor</span>
              <input
                value={campusForm.author}
                onChange={(event) =>
                  setCampusForm((current) => ({ ...current, author: event.target.value }))
                }
                required
              />
            </label>
            <label className="field">
              <span>Tipo</span>
              <select
                value={campusForm.type}
                onChange={(event) =>
                  setCampusForm((current) => ({ ...current, type: event.target.value }))
                }
              >
                <option>Guia</option>
                <option>Audio</option>
                <option>Video</option>
                <option>Plantilla</option>
              </select>
            </label>
          </div>
          <label className="field">
            <span>Perfil recomendado</span>
            <select
              value={campusForm.audienceProfile}
              onChange={(event) =>
                setCampusForm((current) => ({ ...current, audienceProfile: event.target.value }))
              }
            >
              <option>Ansiedad y regulacion</option>
              <option>Descanso y estres</option>
              <option>Vinculos y autoestima</option>
              <option>Habitos y bienestar</option>
            </select>
          </label>
          <label className="field">
            <span>Bajada</span>
            <input
              value={campusForm.excerpt}
              onChange={(event) =>
                setCampusForm((current) => ({ ...current, excerpt: event.target.value }))
              }
              required
            />
          </label>
          <label className="field">
            <span>Contenido</span>
            <textarea
              value={campusForm.content}
              onChange={(event) =>
                setCampusForm((current) => ({ ...current, content: event.target.value }))
              }
              rows="6"
              required
            />
          </label>
          <button className="primary-button" type="submit">
            Publicar contenido
          </button>
        </form>
      </section>
    </div>
  )
}

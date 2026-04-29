import { useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

export function CampusPage() {
  const { state, currentUser } = useAppContext()
  const categories = useMemo(
    () => ['Recomendado para vos', 'Todas', ...new Set(state.campusItems.map((item) => item.category))],
    [state.campusItems],
  )
  const [selectedCategory, setSelectedCategory] = useState('Recomendado para vos')

  const filteredItems =
    selectedCategory === 'Recomendado para vos'
      ? state.campusItems.filter((item) =>
          item.audienceProfiles?.includes(currentUser?.profileCategory),
        )
      : selectedCategory === 'Todas'
        ? state.campusItems
        : state.campusItems.filter((item) => item.category === selectedCategory)

  const [selectedItemId, setSelectedItemId] = useState(state.campusItems[0]?.id ?? null)

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0] ?? null

  function handleCategoryChange(category) {
    setSelectedCategory(category)

    const nextItems =
      category === 'Recomendado para vos'
        ? state.campusItems.filter((item) =>
            item.audienceProfiles?.includes(currentUser?.profileCategory),
          )
        : category === 'Todas'
          ? state.campusItems
          : state.campusItems.filter((item) => item.category === category)

    setSelectedItemId(nextItems[0]?.id ?? null)
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Campus</p>
          <h1>Biblioteca de contenidos profesionales</h1>
          <p>
            Los profesionales pueden subir recursos y organizarlos por categoria para que el usuario
            encuentre rapido lo que necesita.
          </p>
          {currentUser?.profileCategory ? (
            <div className="profile-banner">
              <span className="eyebrow">Tu categoria interna</span>
              <strong>{currentUser.profileCategory}</strong>
              <p>
                La seccion `Recomendado para vos` prioriza recursos asociados a este perfil.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <div className="tag-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === selectedCategory ? 'tag tag-active' : 'tag'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="campus-layout">
        <section className="campus-library">
          {filteredItems.map((item) => {
            const isActive = item.id === selectedItem?.id

            return (
              <button
                key={item.id}
                type="button"
                className={isActive ? 'campus-card campus-card-active' : 'campus-card'}
                onClick={() => setSelectedItemId(item.id)}
              >
                <div className="session-header">
                  <div>
                    <p className="eyebrow">
                      {item.category} · {item.type}
                    </p>
                    <h2>{item.title}</h2>
                  </div>
                  <span className={isActive ? 'status-badge status-badge-active' : 'status-badge'}>
                    {item.readTime}
                  </span>
                </div>
                <p>{item.excerpt}</p>
                <div className="meta-list">
                  <span>{item.author}</span>
                  <span>{item.audienceProfiles?.join(' · ')}</span>
                  <span>Ver recurso</span>
                </div>
              </button>
            )
          })}
        </section>

        <aside className="surface-card campus-detail">
          {selectedItem ? (
            <>
              <div className="campus-detail-header">
                <div>
                  <p className="eyebrow">
                    {selectedItem.category} · {selectedItem.type}
                  </p>
                  <h2>{selectedItem.title}</h2>
                </div>
                <span className="status-badge status-badge-active">{selectedItem.readTime}</span>
              </div>

              <div className="meta-list">
                <span>{selectedItem.author}</span>
                <span>{selectedItem.audienceProfiles?.join(' · ')}</span>
                <span>Contenido desbloqueado por membresia</span>
              </div>

              {currentUser?.profileCategory &&
              selectedItem.audienceProfiles?.includes(currentUser.profileCategory) ? (
                <div className="profile-banner">
                  <span className="eyebrow">Por que aparece aca</span>
                  <strong>Coincide con tu categoria: {currentUser.profileCategory}</strong>
                  <p>
                    Este recurso forma parte de la seleccion inicial pensada para tu recorrido
                    dentro de GAPA.
                  </p>
                </div>
              ) : null}

              <div className="campus-prose">
                {selectedItem.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="content-box">
                <p className="eyebrow">Ideas clave</p>
                <ul className="feature-list compact-list">
                  {selectedItem.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">Campus</p>
              <h2>No hay contenidos en esta categoria</h2>
              <p>Cambia el filtro o publica nuevos recursos desde el panel admin.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

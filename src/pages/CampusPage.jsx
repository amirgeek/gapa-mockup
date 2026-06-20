import { useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

const images = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
]

export function CampusPage() {
  const { state, currentUser } = useAppContext()
  const categories = useMemo(
    () => ['Todos', 'Recomendado para vos', ...new Set(state.campusItems.map((item) => item.category))],
    [state.campusItems],
  )
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedItemId, setSelectedItemId] = useState(state.campusItems[0]?.id ?? null)

  const filteredItems =
    selectedCategory === 'Recomendado para vos'
      ? state.campusItems.filter((item) =>
          item.audienceProfiles?.includes(currentUser?.profileCategory),
        )
      : selectedCategory === 'Todos'
        ? state.campusItems
        : state.campusItems.filter((item) => item.category === selectedCategory)

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0] ?? null

  function chooseCategory(category) {
    setSelectedCategory(category)
    const nextItems =
      category === 'Recomendado para vos'
        ? state.campusItems.filter((item) =>
            item.audienceProfiles?.includes(currentUser?.profileCategory),
          )
        : category === 'Todos'
          ? state.campusItems
          : state.campusItems.filter((item) => item.category === category)
    setSelectedItemId(nextItems[0]?.id ?? null)
  }

  return (
    <div className="page-stack">
      <section className="page-cover">
        <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
          Campus
        </p>
        <h1 style={{ color: '#FBFBFA', marginTop: 10 }}>Biblioteca curada para sostener tu proceso.</h1>
        <p className="lead" style={{ marginTop: 16, maxWidth: '56ch' }}>
          Recursos divididos por categorías, con una capa de recomendación según el perfil que surgió
          en tu onboarding.
        </p>
      </section>

      <section className="capsule-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => chooseCategory(category)}
            className={`chip ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </section>

      {filteredItems.length === 0 ? (
        <section className="card">
          <h3 className="h3">Todavía no hay contenido para este filtro.</h3>
          <p className="body-sm" style={{ marginTop: 8 }}>
            Probá con otra categoría o publicá nuevos recursos desde el panel admin.
          </p>
        </section>
      ) : (
        <section className="campus-layout">
          <div className="stack">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="resource-card"
                style={{
                  cursor: 'pointer',
                  borderColor: selectedItem?.id === item.id ? 'rgba(47,107,62,0.35)' : undefined,
                }}
                onClick={() => setSelectedItemId(item.id)}
              >
                <div className="resource-cover" style={{ height: index === 0 ? 260 : 180 }}>
                  <img src={images[index % images.length]} alt={item.title} />
                  <span className="cover-tag">
                    {item.type} · {item.readTime}
                  </span>
                </div>
                <div className="body">
                  <p className="eyebrow no-rule">{item.category}</p>
                  <h3 className="h3" style={{ marginTop: 8 }}>
                    {item.title}
                  </h3>
                  <p className="body-sm" style={{ marginTop: 10 }}>
                    {item.excerpt}
                  </p>
                  <div className="resource-meta" style={{ marginTop: 12 }}>
                    <strong>{item.author}</strong>
                    <span>
                      {selectedCategory === 'Recomendado para vos' ? 'Sugerido por tu perfil' : item.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {selectedItem ? (
            <div className="stack">
              <article className="card">
                <p className="eyebrow">{selectedItem.category}</p>
                <h2 className="h2" style={{ marginTop: 10 }}>
                  {selectedItem.title}
                </h2>
                <div className="resource-meta" style={{ marginTop: 16 }}>
                  <strong>{selectedItem.author}</strong>
                  <span>{selectedItem.type}</span>
                  <span>{selectedItem.readTime}</span>
                </div>
                <p className="body-sm" style={{ marginTop: 16 }}>
                  {selectedCategory === 'Recomendado para vos'
                    ? `Este recurso aparece acá porque encaja con tu perfil interno: ${currentUser?.profileCategory}.`
                    : selectedItem.excerpt}
                </p>
              </article>

              <article className="content-box">
                {selectedItem.content?.map((paragraph) => (
                  <p key={paragraph} className="body">
                    {paragraph}
                  </p>
                ))}
              </article>

              {selectedItem.takeaways?.length ? (
                <article className="card">
                  <p className="eyebrow no-rule">Ideas clave</p>
                  <ul className="takeaways-list" style={{ marginTop: 14 }}>
                    {selectedItem.takeaways.map((takeaway) => (
                      <li key={takeaway}>
                        <span style={{ color: 'var(--green)' }}>•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}
            </div>
          ) : null}
        </section>
      )}
    </div>
  )
}

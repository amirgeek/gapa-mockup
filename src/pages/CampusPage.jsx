import { useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

const campusImages = [
  'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80',
]

export function CampusPage() {
  const { state, currentUser } = useAppContext()
  const categories = useMemo(
    () => ['Todos', 'Recomendados', ...new Set(state.campusItems.map((item) => item.category))],
    [state.campusItems],
  )
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedItemId, setSelectedItemId] = useState(state.campusItems[0]?.id ?? null)

  const filteredItems =
    selectedCategory === 'Recomendados'
      ? state.campusItems.filter((item) =>
          item.audienceProfiles?.includes(currentUser?.profileCategory),
        )
      : selectedCategory === 'Todos'
        ? state.campusItems
        : state.campusItems.filter((item) => item.category === selectedCategory)

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0] ?? null

  function handleCategoryChange(category) {
    setSelectedCategory(category)
    const nextItems =
      category === 'Recomendados'
        ? state.campusItems.filter((item) =>
            item.audienceProfiles?.includes(currentUser?.profileCategory),
          )
        : category === 'Todos'
          ? state.campusItems
          : state.campusItems.filter((item) => item.category === category)
    setSelectedItemId(nextItems[0]?.id ?? null)
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/* Hero Banner */}
      <section className="mb-12 px-6">
        <div className="relative overflow-hidden rounded-xl bg-primary-container p-8 text-on-primary-container flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight leading-tight font-headline">
              Elevando el Cuidado Profesional
            </h1>
            <p className="text-lg opacity-90">
              Bienvenido a GAPA Campus, tu centro de formación continua y recursos especializados.
            </p>
            {currentUser?.profileCategory && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-sm">verified</span>
                Perfil: {currentUser.profileCategory}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 w-32 h-32 rounded-full border-4 border-primary-fixed-dim/30 flex items-center justify-center bg-surface/10">
            <span className="material-symbols-outlined text-7xl">school</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-10 overflow-x-auto hide-scrollbar px-6">
        <div className="flex items-center gap-3 py-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                category === selectedCategory
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6">
        {filteredItems.length === 0 ? (
          <div className="md:col-span-12 text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
              menu_book
            </span>
            <h3 className="font-headline text-2xl mb-2">Sin contenido en esta categoría</h3>
            <p className="text-on-surface-variant">
              Cambiá el filtro o publicá nuevos recursos desde el panel admin.
            </p>
          </div>
        ) : (
          <>
            {/* Featured (first item) */}
            {filteredItems[0] && (
              <div
                className="md:col-span-8 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedItemId(filteredItems[0].id)}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 overflow-hidden h-64 md:h-full">
                    <img
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={campusImages[0]}
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-secondary font-semibold text-xs tracking-widest uppercase mb-2">
                      Destacado · {filteredItems[0].type}
                    </span>
                    <h2 className="text-2xl font-bold mb-4 leading-snug font-headline">
                      {filteredItems[0].title}
                    </h2>
                    <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                      {filteredItems[0].excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-6">
                      <span>{filteredItems[0].author}</span>
                      <span>·</span>
                      <span>{filteredItems[0].readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                      Leer más{' '}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Second item */}
            {filteredItems[1] && (
              <div
                className="md:col-span-4 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedItemId(filteredItems[1].id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={campusImages[1]}
                  />
                </div>
                <div className="p-6">
                  <span className="text-secondary font-semibold text-xs tracking-widest uppercase mb-2 block">
                    {filteredItems[1].type} · {filteredItems[1].readTime}
                  </span>
                  <h3 className="text-lg font-bold mb-3 font-headline">{filteredItems[1].title}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{filteredItems[1].excerpt}</p>
                  <button className="text-primary font-bold text-sm hover:underline">
                    Leer más
                  </button>
                </div>
              </div>
            )}

            {/* Remaining items */}
            {filteredItems.slice(2).map((item, index) => (
              <div
                key={item.id}
                className="md:col-span-4 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedItemId(item.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={campusImages[(index + 2) % campusImages.length]}
                  />
                </div>
                <div className="p-6">
                  <span className="text-secondary font-semibold text-xs tracking-widest uppercase mb-2 block">
                    {item.type} · {item.readTime}
                  </span>
                  <h3 className="text-lg font-bold mb-3 font-headline">{item.title}</h3>
                  <button className="text-primary font-bold text-sm hover:underline">
                    Leer más
                  </button>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div className="md:col-span-4 flex flex-col justify-center bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
              <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed-variant">
                  auto_awesome
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-headline">¿Buscás algo específico?</h3>
              <p className="text-on-surface-variant mb-6 text-sm">
                Nuestro equipo académico puede ayudarte a encontrar el material que necesitás.
              </p>
              <button className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-medium self-start shadow-sm hover:opacity-90">
                Consultar Tutor
              </button>
            </div>
          </>
        )}
      </section>

      {/* Selected Item Detail */}
      {selectedItem && (
        <section className="mt-12 px-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">
                  {selectedItem.category} · {selectedItem.type}
                </span>
                <h2 className="font-headline text-3xl font-bold mb-2">{selectedItem.title}</h2>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span>{selectedItem.author}</span>
                  <span>·</span>
                  <span>{selectedItem.readTime}</span>
                  <span>·</span>
                  <span>Membresía activa</span>
                </div>
              </div>
              {currentUser?.profileCategory &&
                selectedItem.audienceProfiles?.includes(currentUser.profileCategory) && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container/10 text-primary rounded-full text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Recomendado para vos
                  </div>
                )}
            </div>
            <div className="space-y-4 mb-8">
              {selectedItem.content.map((paragraph) => (
                <p key={paragraph} className="text-on-surface leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {selectedItem.takeaways?.length > 0 && (
              <div className="bg-surface-container-low rounded-xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  Ideas clave
                </p>
                <ul className="space-y-2">
                  {selectedItem.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-3 text-sm">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                        check_circle
                      </span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

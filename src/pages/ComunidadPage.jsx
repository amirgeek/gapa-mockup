import { useState } from 'react'

const posts = [
  {
    id: 1,
    type: 'featured',
    author: 'Dr. Ricardo Salinas',
    role: 'Profesional verificado',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    title: 'La importancia de la respiración rítmica en episodios de ansiedad',
    body: 'En la práctica clínica, observamos que la sincronización del ritmo cardíaco a través de la respiración diafragmática no es solo una técnica: también funciona como ancla biológica.',
    category: 'Técnicas',
  },
  {
    id: 2,
    type: 'testimony',
    author: 'Elena V.',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    title: 'Mi primer mes sin ataques de pánico',
    body: 'Gracias a las técnicas de GAPA y el apoyo del grupo, recuperé espacios de mi vida que creía perdidos.',
    category: 'Testimonios',
  },
  {
    id: 3,
    type: 'question',
    author: 'Marcos Torres',
    initials: 'M',
    title: '¿Cómo manejan la ansiedad social en el trabajo?',
    body: 'Tengo una presentación importante y siento que el pecho se me cierra solo de pensarlo. ¿Qué les sirvió a ustedes?',
    category: 'General',
  },
  {
    id: 4,
    type: 'tip',
    author: 'Dra. Sofía Méndez',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    title: 'Técnica 5-4-3-2-1 para grounding',
    body: 'Cuando sientas que te desconectás, buscá cinco cosas que veas, cuatro que toques, tres que escuches, dos que huelas y una que pruebes.',
    category: 'Técnicas',
  },
]

const categories = ['General', 'Técnicas', 'Testimonios', 'Expertos']

export function ComunidadPage() {
  const [activeCategory, setActiveCategory] = useState('General')

  const filtered =
    activeCategory === 'General'
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <div className="page-stack">
      <section className="page-cover">
        <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
          Comunidad
        </p>
        <h1 style={{ color: '#FBFBFA', marginTop: 10 }}>Un espacio humano para compartir sin sobrecarga.</h1>
        <p className="lead" style={{ marginTop: 16, maxWidth: '54ch' }}>
          Testimonios, preguntas y aportes profesionales dentro de una comunidad que acompaña en
          lugar de presionar.
        </p>
      </section>

      <section className="capsule-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`chip ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="community-grid">
        {filtered.map((post) => {
          const featuredClass = post.type === 'featured' ? 'community-card featured' : 'community-card'

          return (
            <article key={post.id} className={featuredClass}>
              <div className="community-author">
                <div className="community-avatar">
                  {post.avatar ? <img src={post.avatar} alt={post.author} /> : <span>{post.initials}</span>}
                </div>
                <div>
                  <strong>{post.author}</strong>
                  <div className="body-sm">
                    {post.role ?? post.category}
                  </div>
                </div>
              </div>
              <div className="stack-sm">
                <span className="tag neutral">{post.category}</span>
                <h3 className="h3">{post.title}</h3>
                <p className="body">{post.body}</p>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

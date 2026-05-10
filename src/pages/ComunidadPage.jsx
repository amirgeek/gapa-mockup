import { useState } from 'react'

const posts = [
  {
    id: 1,
    type: 'professional',
    author: 'Dr. Ricardo Salinas',
    role: 'Profesional Verificado',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    title: 'La importancia de la respiración rítmica en episodios de ansiedad',
    body: 'En la práctica clínica, observamos que la sincronización del ritmo cardíaco a través de la respiración diafragmática no es solo una técnica, sino un ancla biológica...',
    likes: 124,
    comments: 42,
    featured: true,
    category: 'Técnicas',
  },
  {
    id: 2,
    type: 'testimony',
    author: 'Elena V.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    title: 'Mi primer mes sin ataques de pánico',
    body: '"Gracias a las técnicas de GAPA y el apoyo de este foro, he recuperado espacios de mi vida que creía perdidos..."',
    category: 'Testimonios',
  },
  {
    id: 3,
    type: 'question',
    author: 'Marcos Torres',
    initials: 'M',
    timeAgo: 'Hace 2 horas',
    title: '¿Cómo manejan la ansiedad social en el trabajo?',
    body: 'Pronto tengo una presentación importante y siento que el pecho se me cierra solo de pensarlo. ¿Algún consejo?',
    likes: 18,
    comments: 56,
    category: 'General',
  },
  {
    id: 4,
    type: 'tip',
    author: 'Dra. Sofia Mendez',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    role: 'Profesional',
    title: 'Técnica 5-4-3-2-1 para el Grounding',
    body: 'Cuando sientas que te desconectas, busca: 5 cosas que veas, 4 que toques, 3 que escuches, 2 que huelas y 1 que pruebes...',
    likes: 342,
    shares: 12,
    category: 'Técnicas',
  },
]

const categories = ['General', 'Técnicas', 'Testimonios', 'Expertos']

export function ComunidadPage() {
  const [activeCategory, setActiveCategory] = useState('General')

  const filtered =
    activeCategory === 'General'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <div className="px-6 max-w-5xl mx-auto py-6">
      <div className="mb-12 ml-2">
        <h2 className="font-headline text-5xl font-bold tracking-tight mb-2">Comunidad</h2>
        <p className="text-on-surface-variant text-lg max-w-md italic">
          Un santuario digital para compartir, aprender y sanar en conjunto.
        </p>
      </div>

      {/* Category Filter */}
      <section className="flex gap-3 overflow-x-auto pb-8 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {filtered.map((post) => {
          if (post.type === 'professional' && post.featured) {
            return (
              <article
                key={post.id}
                className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm border-l-4 border-primary"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt=""
                    className="w-12 h-12 rounded-full"
                    src={post.avatar}
                  />
                  <div>
                    <p className="text-sm font-bold">{post.author}</p>
                    <p className="text-xs text-primary font-medium">{post.role}</p>
                  </div>
                </div>
                <h3 className="font-headline text-3xl font-bold mb-4 leading-tight">{post.title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">{post.body}</p>
                <div className="flex items-center justify-between pt-6 border-t border-surface-container-high">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xl">chat_bubble</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{post.comments}</span>
                    </div>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-primary-container cursor-pointer hover:underline">
                    Leer más
                  </button>
                </div>
              </article>
            )
          }

          if (post.type === 'testimony') {
            return (
              <article
                key={post.id}
                className="md:col-span-4 bg-secondary-container/10 rounded-xl p-6 border-t-4 border-secondary flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded">
                    Testimonio
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-sm text-on-surface-variant italic mb-6">{post.body}</p>
                </div>
                <div className="flex items-center gap-3">
                  <img alt="" className="w-8 h-8 rounded-full" src={post.avatar} />
                  <p className="text-xs font-semibold">{post.author}</p>
                </div>
              </article>
            )
          }

          if (post.type === 'question') {
            return (
              <article
                key={post.id}
                className="md:col-span-6 bg-surface-container-low rounded-xl p-8 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold">
                    {post.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{post.author}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {post.timeAgo}
                    </p>
                  </div>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">{post.title}</h3>
                <p className="text-on-surface-variant mb-6 text-sm">{post.body}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">forum</span>
                    <span className="text-xs font-bold">{post.comments}</span>
                  </div>
                </div>
              </article>
            )
          }

          if (post.type === 'tip') {
            return (
              <article
                key={post.id}
                className="md:col-span-6 bg-surface-container-low rounded-xl p-8 hover:shadow-lg transition-all cursor-pointer border-t-4 border-primary-container"
              >
                <div className="flex items-center gap-3 mb-6">
                  <img alt="" className="w-10 h-10 rounded-full" src={post.avatar} />
                  <div>
                    <p className="text-sm font-bold">{post.author}</p>
                    <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest">
                      {post.role}
                    </p>
                  </div>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">{post.title}</h3>
                <p className="text-on-surface-variant mb-6 text-sm">{post.body}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">share</span>
                    <span className="text-xs font-bold">{post.shares}</span>
                  </div>
                </div>
              </article>
            )
          }

          return null
        })}
      </div>

      {/* FAB */}
      <button className="fixed bottom-28 right-8 w-16 h-16 bg-tertiary text-on-tertiary rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  )
}

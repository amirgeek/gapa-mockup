import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  HeartHandshake,
  Home,
  LayoutGrid,
  MessageSquareHeart,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

const goals = [
  { id: "anxiety", label: "Manejo de ansiedad", icon: ShieldCheck },
  { id: "community", label: "Comunidad", icon: Users },
  { id: "guidance", label: "Guía profesional", icon: HeartHandshake },
];

const sessions = [
  {
    id: 1,
    title: "Ansiedad social y exposición gradual",
    therapist: "Lic. Camila Ortega",
    date: "Jueves · 19:00",
    group: "Grupo inicial",
    meet: "https://meet.google.com/gapa-sesion-01",
    tone: "blue",
  },
  {
    id: 2,
    title: "Regulación emocional para momentos de crisis",
    therapist: "Lic. Martín Bassi",
    date: "Sábado · 10:30",
    group: "Grupo intermedio",
    meet: "https://meet.google.com/gapa-sesion-02",
    tone: "green",
  },
  {
    id: 3,
    title: "Rutinas seguras para bajar activación",
    therapist: "Lic. Paula Sosa",
    date: "Lunes · 18:15",
    group: "Grupo abierto",
    meet: "https://meet.google.com/gapa-sesion-03",
    tone: "blue",
  },
];

const posts = [
  {
    id: 1,
    author: "Lic. Camila Ortega",
    role: "Profesional GAPA",
    category: "Herramientas",
    body: "Recordatorio de hoy: no hace falta que la ansiedad desaparezca para empezar a moverte. A veces alcanza con bajar un punto la intensidad y dar un paso chiquito.",
    replies: 12,
    likes: 41,
  },
  {
    id: 2,
    author: "Valentina R.",
    role: "Miembro",
    category: "Experiencias",
    body: "Probé la técnica de respiración antes de entrar a una reunión y me ayudó a no irme al peor escenario mental. No fue perfecto, pero sí distinto.",
    replies: 8,
    likes: 27,
  },
  {
    id: 3,
    author: "Lic. Martín Bassi",
    role: "Profesional GAPA",
    category: "Psicoeducación",
    body: "La evitación alivia rápido, pero suele agrandar el problema después. En terapia grupal trabajamos mucho esa trampa para salir con acompañamiento.",
    replies: 15,
    likes: 55,
  },
];

const resources = [
  {
    id: 1,
    title: "Qué hacer cuando sentís que se viene una crisis",
    tag: "Crisis",
    kind: "Artículo",
  },
  {
    id: 2,
    title: "Guía práctica para bajar activación en 5 minutos",
    tag: "Regulación",
    kind: "Recurso descargable",
  },
  {
    id: 3,
    title: "Ansiedad anticipatoria: cómo reconocerla",
    tag: "Psicoeducación",
    kind: "Video breve",
  },
  {
    id: 4,
    title: "Volver a salir: exposición gradual acompañada",
    tag: "Hábitos",
    kind: "Clase campus",
  },
  {
    id: 5,
    title: "Dormir con ansiedad: checklist nocturno",
    tag: "Sueño",
    kind: "Plantilla",
  },
  {
    id: 6,
    title: "Cómo pedir ayuda sin sentir culpa",
    tag: "Comunidad",
    kind: "Artículo",
  },
];

const navItems = [
  { id: "dashboard", label: "Inicio", icon: Home },
  { id: "sessions", label: "Sesiones", icon: CalendarDays },
  { id: "community", label: "Comunidad", icon: MessageSquareHeart },
  { id: "campus", label: "Campus", icon: LayoutGrid },
  { id: "profile", label: "Perfil", icon: CircleUserRound },
];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState(["anxiety", "community"]);
  const [plan, setPlan] = useState("mensual");
  const [resourceFilter, setResourceFilter] = useState("Todos");

  const filteredResources = useMemo(() => {
    if (resourceFilter === "Todos") return resources;
    return resources.filter((resource) => resource.tag === resourceFilter);
  }, [resourceFilter]);

  const goToApp = (target = "dashboard") => setScreen(target);

  return (
    <div className="app-shell">
      <div className="ambient ambient-green" />
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-soft" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${screen}-${onboardingStep}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="app-frame"
        >
          {screen === "landing" && <Landing setScreen={setScreen} />}
          {screen === "login" && <AuthCard type="login" onContinue={() => goToApp()} onBack={() => setScreen("landing")} />}
          {screen === "register" && (
            <AuthCard type="register" onContinue={() => setScreen("onboarding")} onBack={() => setScreen("landing")} />
          )}
          {screen === "onboarding" && (
            <Onboarding
              step={onboardingStep}
              setStep={setOnboardingStep}
              selectedGoals={selectedGoals}
              setSelectedGoals={setSelectedGoals}
              plan={plan}
              setPlan={setPlan}
              onFinish={() => goToApp()}
            />
          )}
          {screen !== "landing" && screen !== "login" && screen !== "register" && screen !== "onboarding" && (
            <PlatformLayout current={screen} setScreen={setScreen}>
              {screen === "dashboard" && <DashboardHome setScreen={setScreen} />}
              {screen === "sessions" && <SessionsScreen />}
              {screen === "community" && <CommunityScreen />}
              {screen === "campus" && (
                <CampusScreen
                  filter={resourceFilter}
                  setFilter={setResourceFilter}
                  items={filteredResources}
                />
              )}
              {screen === "profile" && <ProfileScreen plan={plan} selectedGoals={selectedGoals} />}
            </PlatformLayout>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Landing({ setScreen }) {
  return (
    <div className="landing-layout">
      <section className="hero-panel">
        <TopLogo />
        <div className="hero-copy">
          <div className="eyebrow">Membresía de salud mental · terapia grupal</div>
          <h1>
            Acompañamiento real para <span>afrontar la ansiedad en comunidad.</span>
          </h1>
          <p>
            GAPA reúne grupos terapéuticos, guía profesional y recursos prácticos para que no atravieses la ansiedad en soledad.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => setScreen("register")}>
            Empezar ahora <ArrowRight size={16} />
          </button>
          <button className="secondary-button" onClick={() => setScreen("login")}>
            Ya tengo cuenta
          </button>
        </div>
        <div className="trust-row">
          <TrustChip icon={Users} label="Grupos guiados por profesionales" />
          <TrustChip icon={Compass} label="Recursos prácticos para el día a día" />
          <TrustChip icon={HeartHandshake} label="Comunidad con respeto y empatía" />
        </div>
      </section>

      <section className="hero-sidecard">
        <div className="eyebrow soft">Valores GAPA</div>
        <ul className="value-list">
          <li><Check size={16} /> Empatía y acompañamiento</li>
          <li><Check size={16} /> Intervenciones basadas en evidencia</li>
          <li><Check size={16} /> Espacios seguros y respetuosos</li>
          <li><Check size={16} /> Esperanza sostenida en comunidad</li>
        </ul>
        <div className="mini-stat-card">
          <div className="mini-stat-label">Próxima apertura de grupos</div>
          <div className="mini-stat-value">Esta semana</div>
        </div>
      </section>
    </div>
  );
}

function AuthCard({ type, onContinue, onBack }) {
  const isRegister = type === "register";
  return (
    <div className="centered-card-wrap">
      <section className="auth-card">
        <TopLogo compact />
        <div className="auth-copy">
          <div className="eyebrow">{isRegister ? "Registro" : "Ingreso"}</div>
          <h2>{isRegister ? "Sumate a GAPA" : "Volvé a tu espacio"}</h2>
          <p>{isRegister ? "Creamos un recorrido simple para acompañarte desde el primer día." : "Entrá a tus sesiones, comunidad y campus en segundos."}</p>
        </div>
        <div className="form-stack">
          <input className="ui-input" placeholder="Nombre y apellido" />
          <input className="ui-input" placeholder="Email" />
          <input className="ui-input" placeholder="Contraseña" type="password" />
        </div>
        <div className="button-row stretch">
          <button className="secondary-button" onClick={onBack}>Volver</button>
          <button className="primary-button" onClick={onContinue}>{isRegister ? "Continuar" : "Entrar"}</button>
        </div>
      </section>
    </div>
  );
}

function Onboarding({ step, setStep, selectedGoals, setSelectedGoals, plan, setPlan, onFinish }) {
  const toggleGoal = (goalId) => {
    setSelectedGoals((current) =>
      current.includes(goalId) ? current.filter((id) => id !== goalId) : [...current, goalId],
    );
  };

  return (
    <div className="centered-card-wrap">
      <section className="onboarding-card">
        <TopLogo compact />
        <div className="progress-row">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`progress-pill ${step >= item ? "active" : ""}`} />
          ))}
        </div>

        {step === 1 && (
          <>
            <div className="eyebrow">Paso 1</div>
            <h2>Bienvenido a GAPA</h2>
            <p className="section-copy">
              Somos un grupo de afrontamiento para personas con ansiedad que buscan apoyo profesional, herramientas prácticas y comunidad.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="eyebrow">Paso 2</div>
            <h2>¿Qué te gustaría encontrar acá?</h2>
            <div className="goal-grid">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const active = selectedGoals.includes(goal.id);
                return (
                  <button key={goal.id} className={`goal-card ${active ? "active" : ""}`} onClick={() => toggleGoal(goal.id)}>
                    <Icon size={18} />
                    <span>{goal.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="eyebrow">Paso 3</div>
            <h2>Elegí tu plan</h2>
            <div className="plan-card selected">
              <div>
                <strong>Plan mensual</strong>
                <p>Acceso a sesiones grupales, foro y campus.</p>
              </div>
              <div className="plan-price">$24.900/mes</div>
            </div>
            <div className="button-row stretch top-space">
              <button className={`secondary-button ${plan === "mensual" ? "selected-outline" : ""}`} onClick={() => setPlan("mensual")}>
                Suscripción mensual
              </button>
            </div>
          </>
        )}

        <div className="button-row stretch top-space">
          {step > 1 ? <button className="secondary-button" onClick={() => setStep(step - 1)}>Atrás</button> : <span />}
          {step < 3 ? (
            <button className="primary-button" onClick={() => setStep(step + 1)}>
              Siguiente <ChevronRight size={16} />
            </button>
          ) : (
            <button className="primary-button" onClick={onFinish}>Ir al inicio</button>
          )}
        </div>
      </section>
    </div>
  );
}

function PlatformLayout({ current, setScreen, children }) {
  return (
    <div className="platform-shell">
      <aside className="sidebar desktop-only">
        <TopLogo compact />
        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={`nav-button ${current === item.id ? "active" : ""}`} onClick={() => setScreen(item.id)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="content-shell">
        {children}
        <nav className="bottom-nav mobile-only">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={`bottom-nav-item ${current === item.id ? "active" : ""}`} onClick={() => setScreen(item.id)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </section>
    </div>
  );
}

function DashboardHome({ setScreen }) {
  return (
    <div className="page-stack">
      <section className="hero-dashboard">
        <div>
          <div className="eyebrow">Inicio</div>
          <h2>Hola, Martina. Tu próxima sesión grupal es mañana.</h2>
          <p>Te dejamos a mano lo más importante para que entres rápido, te organices y te sientas acompañada.</p>
        </div>
        <button className="primary-button" onClick={() => setScreen("sessions")}>Ver sesiones</button>
      </section>

      <section className="dashboard-grid">
        <Card title="Próxima sesión grupal" icon={Video}>
          <strong>Jueves · 19:00</strong>
          <p>Ansiedad social y exposición gradual con Lic. Camila Ortega.</p>
        </Card>
        <Card title="Acceso rápido al foro" icon={MessageSquareHeart} actionLabel="Ir a comunidad" onAction={() => setScreen("community")}>
          <p>Encontrá experiencias, preguntas y respuestas moderadas por profesionales.</p>
        </Card>
        <Card title="Campus" icon={BookOpen} actionLabel="Abrir campus" onAction={() => setScreen("campus")}>
          <p>Artículos, guías y materiales para sostener el proceso entre sesiones.</p>
        </Card>
      </section>
    </div>
  );
}

function SessionsScreen() {
  return (
    <div className="page-stack">
      <SectionHeader title="Sesiones grupales" subtitle="Encuentros programados con profesionales GAPA" />
      <div className="list-stack">
        {sessions.map((session) => (
          <article key={session.id} className={`session-card ${session.tone}`}>
            <div className="session-topline">
              <span className="eyebrow soft">{session.group}</span>
              <span className="tiny-label">{session.date}</span>
            </div>
            <h3>{session.title}</h3>
            <p>{session.therapist}</p>
            <div className="meet-block">
              <label>Link Google Meet</label>
              <input className="ui-input" value={session.meet} readOnly />
            </div>
            <button className="primary-button full">Unirme a la sesión</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function CommunityScreen() {
  return (
    <div className="page-stack">
      <SectionHeader title="Comunidad" subtitle="Conversaciones cuidadas entre miembros y profesionales" />
      <div className="tag-row">
        {['Todas', 'Herramientas', 'Experiencias', 'Psicoeducación'].map((tag) => (
          <button key={tag} className={`tag-chip ${tag === 'Todas' ? 'active' : ''}`}>{tag}</button>
        ))}
      </div>
      <div className="list-stack">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-head">
              <div>
                <strong>{post.author}</strong>
                <div className="tiny-label">{post.role}</div>
              </div>
              <span className="category-chip">{post.category}</span>
            </div>
            <p>{post.body}</p>
            <div className="engagement-row">
              <span>{post.likes} apoyos</span>
              <span>{post.replies} respuestas</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CampusScreen({ filter, setFilter, items }) {
  const filters = ["Todos", "Crisis", "Regulación", "Psicoeducación", "Hábitos", "Sueño", "Comunidad"];
  return (
    <div className="page-stack">
      <SectionHeader title="Campus" subtitle="Recursos subidos por profesionales para trabajar entre sesiones" />
      <div className="tag-row wrap">
        {filters.map((tag) => (
          <button key={tag} className={`tag-chip ${filter === tag ? "active" : ""}`} onClick={() => setFilter(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <div className="resource-grid">
        {items.map((resource) => (
          <article key={resource.id} className="resource-card">
            <div className="resource-meta">
              <span className="category-chip">{resource.kind}</span>
              <span className="tiny-label">{resource.tag}</span>
            </div>
            <h3>{resource.title}</h3>
            <button className="secondary-button full">Abrir recurso</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ plan, selectedGoals }) {
  const goalNames = goals.filter((goal) => selectedGoals.includes(goal.id)).map((goal) => goal.label);
  return (
    <div className="page-stack">
      <SectionHeader title="Perfil y configuración" subtitle="Tu estado de membresía y datos personales" />
      <div className="profile-grid">
        <article className="profile-card strong">
          <div className="eyebrow">Suscripción</div>
          <h3>{plan === "mensual" ? "Plan mensual activo" : "Sin plan"}</h3>
          <p>Próximo cobro: 12 de mayo · Acceso completo a sesiones, foro y campus.</p>
        </article>
        <article className="profile-card">
          <div className="eyebrow">Información personal</div>
          <ul className="detail-list">
            <li><span>Nombre</span><strong>Martina Gómez</strong></li>
            <li><span>Email</span><strong>martina@gapa.app</strong></li>
            <li><span>Miembro desde</span><strong>Marzo 2026</strong></li>
          </ul>
        </article>
        <article className="profile-card full-span">
          <div className="eyebrow">Objetivos elegidos</div>
          <div className="tag-row wrap top-space-sm">
            {goalNames.map((goal) => <span key={goal} className="tag-chip active static">{goal}</span>)}
          </div>
        </article>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children, actionLabel, onAction }) {
  return (
    <article className="dashboard-card">
      <div className="card-title"><Icon size={18} /> {title}</div>
      <div className="card-content">{children}</div>
      {actionLabel ? <button className="secondary-button top-space-sm" onClick={onAction}>{actionLabel}</button> : null}
    </article>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <header className="section-header">
      <div className="eyebrow">Plataforma</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
}

function TrustChip({ icon: Icon, label }) {
  return (
    <div className="trust-chip"><Icon size={15} /> <span>{label}</span></div>
  );
}

function TopLogo({ compact = false }) {
  return (
    <div className={`logo-wrap ${compact ? "compact" : ""}`}>
      <div className="heart-logo" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div>
        <div className="logo-title">GAPA</div>
        <div className="logo-subtitle">Grupo de Afrontamiento contra Problemas de Ansiedad</div>
      </div>
    </div>
  );
}

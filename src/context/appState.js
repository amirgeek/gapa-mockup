export const STORAGE_KEY = 'gapa-app-state'

export const seedState = {
  currentUserId: null,
  users: [
    {
      id: 'admin-1',
      name: 'Admin GAPA',
      email: 'admin@gapa.app',
      password: 'admin123',
      role: 'admin',
      membershipStatus: 'active',
      joinedSessionIds: [],
    },
    {
      id: 'user-1',
      name: 'Elena Vargas',
      email: 'elena@gapa.app',
      password: 'demo123',
      role: 'user',
      membershipStatus: 'active',
      joinedSessionIds: ['session-1'],
      profileCategory: 'Ansiedad y regulacion',
    },
  ],
  sessions: [
    {
      id: 'session-1',
      title: 'Respiracion Consciente',
      category: 'Mindfulness',
      professional: 'Dr. Marcos Soler',
      datetime: '2026-05-02T18:00:00',
      duration: '60 min',
      description: 'Practica grupal para bajar activacion, regular la respiracion y sumar herramientas de calma.',
      meetLink: 'https://meet.google.com/gapa-respiracion',
      capacity: 18,
      enrolledUserIds: ['user-1'],
      featured: true,
    },
    {
      id: 'session-2',
      title: 'Gestion del Estres Diario',
      category: 'Ansiedad',
      professional: 'Lic. Lucia Mendez',
      datetime: '2026-05-03T10:30:00',
      duration: '75 min',
      description: 'Encuentro guiado para identificar detonantes y sostener rutinas de autocuidado.',
      meetLink: 'https://meet.google.com/gapa-estres',
      capacity: 24,
      enrolledUserIds: [],
      featured: false,
    },
    {
      id: 'session-3',
      title: 'Grupo de Apoyo para Duelo',
      category: 'Comunidad',
      professional: 'Lic. Marta Aranda',
      datetime: '2026-05-04T19:30:00',
      duration: '90 min',
      description: 'Espacio cuidado para transitar procesos de perdida en compania y con guia profesional.',
      meetLink: 'https://meet.google.com/gapa-duelo',
      capacity: 16,
      enrolledUserIds: [],
      featured: false,
    },
  ],
  campusItems: [
    {
      id: 'campus-1',
      title: 'Tecnica 5-4-3-2-1',
      category: 'Herramientas practicas',
      author: 'Dra. Sofia Mendez',
      type: 'Guia',
      readTime: '6 min',
      audienceProfiles: ['Ansiedad y regulacion', 'Habitos y bienestar'],
      excerpt: 'Ejercicio rapido para volver al presente cuando la ansiedad sube.',
      content: [
        'La tecnica 5-4-3-2-1 es una herramienta de grounding pensada para esos momentos en los que la ansiedad acelera el cuerpo y parece llevarse toda tu atencion. No intenta pelearse con lo que sentis: busca devolverte referencia, peso y presencia.',
        'Empeza mirando a tu alrededor y nombra cinco cosas que ves. Despues identifica cuatro cosas que puedas tocar, tres sonidos, dos olores y un sabor o una sensacion en la boca. Lo importante no es hacerlo perfecto, sino recuperar contacto con el aqui y ahora.',
        'Esta tecnica funciona mejor si la repetis varias veces cuando no estas en crisis, porque asi el cuerpo la reconoce mas rapido cuando realmente la necesitas.',
      ],
      takeaways: [
        'Te baja del pensamiento catastrofico al cuerpo.',
        'Sirve en espacios publicos, trabajo o antes de dormir.',
        'Cuanto mas la practiques en calma, mejor responde en momentos intensos.',
      ],
    },
    {
      id: 'campus-2',
      title: 'Meditacion para antes de dormir',
      category: 'Meditaciones',
      author: 'Dr. Ricardo Salinas',
      type: 'Audio',
      readTime: '9 min',
      audienceProfiles: ['Descanso y estres', 'Ansiedad y regulacion'],
      excerpt: 'Rutina corta para bajar revoluciones y preparar el descanso.',
      content: [
        'Este recurso propone una secuencia breve para usar todas las noches: respiracion lenta, escaneo corporal y una transicion suave hacia el descanso. La idea es cortar la hiperactivacion que suele aparecer cuando por fin frenamos.',
        'Primero regula la exhalacion: inhala en cuatro tiempos y exhala en seis. Despues recorre mentalmente desde la frente hasta los pies, aflojando donde notes tension. Si aparecen pensamientos, no intentes resolverlos; anotalos mentalmente para manana y volve al cuerpo.',
        'La consistencia pesa mas que la perfeccion. Aunque lo hagas cinco minutos, repetir este ritual le enseña al sistema nervioso que ya es momento de bajar.',
      ],
      takeaways: [
        'La exhalacion mas larga ayuda a desacelerar.',
        'El escaneo corporal mejora la conciencia de tension acumulada.',
        'Conviene usarla como rutina, no solo cuando dormis mal.',
      ],
    },
    {
      id: 'campus-3',
      title: 'Rutina de autocuidado semanal',
      category: 'Habitos',
      author: 'Lic. Julia Ferreyra',
      type: 'Plantilla',
      readTime: '4 min',
      audienceProfiles: ['Habitos y bienestar', 'Vinculos y autoestima'],
      excerpt: 'Plantilla simple para sostener pequenas acciones de bienestar.',
      content: [
        'Esta plantilla no busca exigirte mas, sino ayudarte a sostener pequenas acciones que suelen caerse cuando la semana se complica. El objetivo es ver tu autocuidado como sistema y no como actos aislados.',
        'La propuesta es revisar cinco ejes: descanso, movimiento, hidratacion, registro emocional y red de apoyo. En cada uno elegi una accion minima viable para cumplir aunque tengas una semana pesada.',
        'Al final de la semana marca que pudiste sostener, que costo y que habria que simplificar. El plan ideal no es el mas completo: es el que realmente podes repetir.',
      ],
      takeaways: [
        'Trabaja con minimos sostenibles en vez de objetivos perfectos.',
        'Hace visible que area se cae primero cuando aparece estres.',
        'Te ayuda a ajustar la rutina sin culpa.',
      ],
    },
    {
      id: 'campus-4',
      title: 'Limites sin culpa',
      category: 'Vinculos',
      author: 'Lic. Mariana Costa',
      type: 'Guia',
      readTime: '8 min',
      audienceProfiles: ['Vinculos y autoestima'],
      excerpt: 'Claves para empezar a poner limites sin sentir que estas fallando.',
      content: [
        'Poner limites no es alejarte de los demas: es cuidar la relacion para no entrar desde el agotamiento, el resentimiento o la culpa. Muchas veces el problema no es no saber lo que necesitas, sino sentir que expresarlo va a generar conflicto.',
        'Una forma simple de empezar es identificar situaciones que repetidamente te dejan drenado. Ahi suele haber una necesidad desatendida. Poner un limite sano no exige dureza; muchas veces alcanza con ser claro, concreto y consistente.',
        'Practicar limites pequenos primero ayuda a ganar seguridad. No tenes que cambiar toda tu forma de vincularte de golpe para notar alivio.',
      ],
      takeaways: [
        'Un limite claro protege el vinculo y tu energia.',
        'Empezar por situaciones chicas reduce la culpa.',
        'La consistencia vale mas que la intensidad.',
      ],
    },
  ],
}

export function loadState() {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return seedState
  }

  try {
    return JSON.parse(raw)
  } catch {
    return seedState
  }
}

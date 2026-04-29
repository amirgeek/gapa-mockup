export const profileCategories = [
  'Ansiedad y regulacion',
  'Descanso y estres',
  'Vinculos y autoestima',
  'Habitos y bienestar',
]

export const onboardingQuestions = [
  {
    id: 'q1',
    prompt: 'Cuando te sentis sobrepasado, que suele pasar primero?',
    options: [
      { label: 'Se acelera mi cuerpo y me cuesta bajar', category: 'Ansiedad y regulacion' },
      { label: 'Me cuesta frenar la cabeza y descansar', category: 'Descanso y estres' },
      { label: 'Me afecta mucho lo vincular o la aprobacion ajena', category: 'Vinculos y autoestima' },
      { label: 'Pierdo rutina y me cuesta sostenerme', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Que te gustaria mejorar primero?',
    options: [
      { label: 'Aprender a regular ataques o picos de ansiedad', category: 'Ansiedad y regulacion' },
      { label: 'Dormir mejor y bajar el estres diario', category: 'Descanso y estres' },
      { label: 'Sentirme mas seguro en mis relaciones', category: 'Vinculos y autoestima' },
      { label: 'Crear habitos de bienestar sostenibles', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Que situacion te cuesta mas hoy?',
    options: [
      { label: 'Quedarme atrapado en sensaciones fisicas intensas', category: 'Ansiedad y regulacion' },
      { label: 'Sostener el ritmo sin agotarme', category: 'Descanso y estres' },
      { label: 'Poner limites o expresar lo que necesito', category: 'Vinculos y autoestima' },
      { label: 'Organizarme y ser constante', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q4',
    prompt: 'En que momento del dia necesitas mas apoyo?',
    options: [
      { label: 'Cuando aparece una crisis o sensacion de desborde', category: 'Ansiedad y regulacion' },
      { label: 'Al final del dia, cuando no puedo apagarme', category: 'Descanso y estres' },
      { label: 'Despues de un conflicto o una situacion social', category: 'Vinculos y autoestima' },
      { label: 'Al empezar o cerrar mi rutina diaria', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Que tipo de recursos te imaginás usando mas?',
    options: [
      { label: 'Tecnicas cortas para volver a regularme', category: 'Ansiedad y regulacion' },
      { label: 'Meditaciones y recursos para descanso', category: 'Descanso y estres' },
      { label: 'Contenido sobre autoestima, limites y relaciones', category: 'Vinculos y autoestima' },
      { label: 'Plantillas y rutinas practicas', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q6',
    prompt: 'Que te frustra mas de tu situacion actual?',
    options: [
      { label: 'No poder anticipar cuando me voy a sentir mal', category: 'Ansiedad y regulacion' },
      { label: 'Vivir cansado o en alerta', category: 'Descanso y estres' },
      { label: 'Sentirme inseguro o demasiado pendiente de otros', category: 'Vinculos y autoestima' },
      { label: 'Saber que me haria bien algo y no sostenerlo', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q7',
    prompt: 'Que objetivo te haria sentir un gran avance?',
    options: [
      { label: 'Poder volver a la calma mas rapido', category: 'Ansiedad y regulacion' },
      { label: 'Dormir y descansar de verdad', category: 'Descanso y estres' },
      { label: 'Relacionarme con mas seguridad y menos culpa', category: 'Vinculos y autoestima' },
      { label: 'Tener una base de autocuidado estable', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q8',
    prompt: 'Que senal sentis mas fuerte en tu cuerpo o en tu dia a dia?',
    options: [
      { label: 'Palpitaciones, tension, respiracion corta', category: 'Ansiedad y regulacion' },
      { label: 'Cansancio, insomnio o mente acelerada', category: 'Descanso y estres' },
      { label: 'Comparacion, culpa o miedo al rechazo', category: 'Vinculos y autoestima' },
      { label: 'Desorden, postergacion o poca constancia', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q9',
    prompt: 'Que tipo de acompanamiento valoras mas hoy?',
    options: [
      { label: 'Herramientas para regularme en el momento', category: 'Ansiedad y regulacion' },
      { label: 'Espacios para bajar carga mental y recuperar descanso', category: 'Descanso y estres' },
      { label: 'Guias para mejorar autoestima y vinculos', category: 'Vinculos y autoestima' },
      { label: 'Ayuda para ordenar habitos y sostener cambios', category: 'Habitos y bienestar' },
    ],
  },
  {
    id: 'q10',
    prompt: 'Con que frase te identificas mas?',
    options: [
      { label: 'Necesito herramientas para volver a tierra cuando me disparo', category: 'Ansiedad y regulacion' },
      { label: 'Necesito aflojar y recuperar energia', category: 'Descanso y estres' },
      { label: 'Necesito relacionarme mejor conmigo y con otros', category: 'Vinculos y autoestima' },
      { label: 'Necesito estructura simple para sostenerme mejor', category: 'Habitos y bienestar' },
    ],
  },
]

export function calculateProfileCategory(answers) {
  const scores = Object.fromEntries(profileCategories.map((category) => [category, 0]))

  onboardingQuestions.forEach((question) => {
    const answer = answers[question.id]

    if (answer && scores[answer] !== undefined) {
      scores[answer] += 1
    }
  })

  return profileCategories.reduce((bestCategory, currentCategory) =>
    scores[currentCategory] > scores[bestCategory] ? currentCategory : bestCategory,
  profileCategories[0])
}

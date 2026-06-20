const defaultAudio =
  'Si estás leyendo esto en un momento de ansiedad, primero frená. No estás en peligro inmediato. Vamos a ir paso por paso, sin apuro, para recuperar referencia y elegir una respuesta concreta.'

export const sosResourceMap = {
  'Ansiedad generalizada': {
    intro:
      'Tu perfil suele cargar anticipación, preocupación y sobreanálisis. Acá priorizamos recursos breves para bajar activación y ordenar la cabeza antes de seguir.',
    topics: [
      {
        id: 'rumiacion',
        title: 'Rumiación y cabeza acelerada',
        text:
          'La meta ahora no es resolver todo. Es salir del bucle. Nombrá el pensamiento principal, anotalo si hace falta y volvé a una acción pequeña del presente: agua, respiración o una tarea simple de dos minutos.',
        audioScript:
          'Tu mente puede estar acelerada, pero no hace falta seguir cada pensamiento. Elegí uno, nombralo, escribilo si lo necesitás y volvamos al presente. Inhalá en cuatro. Exhalá en seis. Ahora elegí una acción mínima y concreta.',
        videoTitle: 'Video breve para cortar el bucle',
        videoFrames: [
          'Identificá el pensamiento que más se repite.',
          'No discutas con él, solo nombralo.',
          'Apoyá ambos pies en el piso.',
          'Elegí una tarea pequeña para los próximos diez minutos.',
        ],
      },
      {
        id: 'anticipacion',
        title: 'Ansiedad anticipatoria',
        text:
          'Cuando aparece la película de todo lo que podría salir mal, conviene volver al criterio de hoy: qué depende de vos ahora y qué no. Trabajá sobre la parte accionable, no sobre todos los escenarios posibles.',
        audioScript:
          'Tu mente se fue al futuro. Vamos a traerla de nuevo. Preguntate qué depende de vos hoy. Lo demás no se resuelve ahora. Inhalá en cuatro. Exhalá en seis. Volvé a una decisión concreta del presente.',
        videoTitle: 'Video breve para volver al presente',
        videoFrames: [
          'Detectá si tu cabeza está en mañana o en la semana que viene.',
          'Separá lo que depende de vos hoy.',
          'Dejá afuera lo que no podés resolver ahora.',
          'Elegí un próximo paso simple y realista.',
        ],
      },
    ],
  },
  Pánico: {
    intro:
      'Tu perfil necesita bajar alarma rápido y recordar que el cuerpo está activado, pero no roto. Acá priorizamos recursos para recuperar control sin pelearte con la sensación.',
    topics: [
      {
        id: 'ataque_panico',
        title: 'Siento que me está por dar un ataque de pánico',
        text:
          'Si la sensación sube de golpe, no intentes frenarla por la fuerza. Recordá: esto es un pico de ansiedad. Buscá apoyo físico en el entorno, aflojá mandíbula y exhalá más largo de lo que inhalás.',
        audioScript:
          'Esto puede sentirse muy intenso, pero sigue siendo ansiedad. No estás perdiendo el control. Mirá un punto fijo. Aflojá hombros y mandíbula. Inhalá en cuatro. Exhalá en seis. Repetilo conmigo. El pico va a bajar.',
        videoTitle: 'Video breve para atravesar el pico',
        videoFrames: [
          'Nombrá: esto es ansiedad, no peligro.',
          'Mirá un punto fijo frente a vos.',
          'Exhalá más largo que la inhalación.',
          'Esperá el descenso del pico sin salir corriendo.',
        ],
      },
      {
        id: 'miedo_desmayo',
        title: 'Miedo a desmayarme o perder el control',
        text:
          'La sensación corporal puede ser muy fuerte, pero eso no significa que te vas a desmayar. Lo central es no escalar la alarma con chequeos compulsivos. Apoyate, regulá el aire y esperá unos minutos.',
        audioScript:
          'Tu cuerpo está activado. Eso no significa que te vas a desmayar. No hace falta chequearte una y otra vez. Apoyate donde estés, soltá el aire despacio y esperemos juntos un minuto más.',
        videoTitle: 'Video breve para recuperar referencia corporal',
        videoFrames: [
          'Apoyá espalda o manos en una superficie.',
          'Dejá de chequear síntomas por unos minutos.',
          'Tomá aire sin forzar y soltalo más lento.',
          'Esperá que el cuerpo recupere ritmo.',
        ],
      },
    ],
  },
  'Ansiedad social': {
    intro:
      'Tu perfil suele activarse frente al juicio, la exposición o el miedo a quedar mal. Acá conviene bajar exigencia y volver a una respuesta más funcional.',
    topics: [
      {
        id: 'miedo_juicio',
        title: 'Miedo a ser juzgado',
        text:
          'Cuando la mente te dice que todos te están mirando, bajá la exigencia. No necesitás gustarle a todo el mundo ni verte perfecto. Necesitás atravesar la situación con una conducta simple y suficiente.',
        audioScript:
          'No hace falta rendir examen social. Tu tarea ahora es sostenerte en la situación. Mirá alrededor. Soltá hombros. Elegí una respuesta breve y clara. Lo suficiente alcanza.',
        videoTitle: 'Video breve para sostener la exposición',
        videoFrames: [
          'Bajá la meta: no es hacerlo perfecto.',
          'Elegí una frase simple para responder.',
          'Sostené la presencia en vez de escapar.',
          'Evaluá después, no durante.',
        ],
      },
      {
        id: 'antes_reunion',
        title: 'Antes de hablar o entrar a una reunión',
        text:
          'La activación previa no significa que no vas a poder. Significa que tu sistema se preparó de más. Antes de entrar, organizá tu cuerpo y elegí una intención simple: escuchar, hablar una vez, o quedarte hasta el final.',
        audioScript:
          'La ansiedad previa no define cómo te va a ir. Elegí una intención simple para esta situación. Respiración lenta. Hombros sueltos. Entrá con una meta mínima y alcanzable.',
        videoTitle: 'Video breve para entrar con más claridad',
        videoFrames: [
          'Respirá más lento antes de entrar.',
          'Elegí una intención simple y concreta.',
          'No midas todo por sensaciones corporales.',
          'Quedate un poco más de lo que tu evitación te pediría.',
        ],
      },
    ],
  },
  default: {
    intro:
      'Acá tenés recursos rápidos para bajar activación y recuperar claridad antes de seguir dentro de la plataforma.',
    topics: [
      {
        id: 'regular_cuerpo',
        title: 'Bajar activación ahora',
        text:
          'No hace falta resolver todo ya. Primero bajemos el cuerpo: apoyá pies, soltá mandíbula y exhalá largo. Después elegí una acción concreta para los próximos diez minutos.',
        audioScript: defaultAudio,
        videoTitle: 'Video breve para regular el cuerpo',
        videoFrames: [
          'Apoyá pies y espalda.',
          'Aflojá mandíbula y hombros.',
          'Exhalá más lento de lo que inhalás.',
          'Elegí una acción simple para sostenerte.',
        ],
      },
    ],
  },
}

export function getSosTopicsForProfile(profileCategory) {
  return sosResourceMap[profileCategory] ?? sosResourceMap.default
}

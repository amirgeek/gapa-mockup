export const profileCategories = [
  'Ansiedad generalizada',
  'Pánico',
  'Ansiedad social',
  'Fobia específica',
  'TOC',
  'Somatización',
  'Ánimo depresivo',
  'Desregulación emocional',
  'Pensamiento desorganizado',
]

export const riskSupportMessages = {
  algunas_veces:
    'Gracias por contarlo. En GAPA queremos priorizar contención real: te recomendamos hablar con un profesional de confianza y, si sentís que empeora, pedir ayuda humana cuanto antes.',
  frecuentemente:
    'Lo que contás necesita acompañamiento humano prioritario. Si sentís que estás en riesgo o podrías lastimarte, buscá ayuda inmediata en tu red cercana, tu servicio de salud o las líneas de emergencia de tu zona.',
}

export const onboardingQuestions = [
  {
    id: 'symptom_pattern',
    section: 'Filtro inicial',
    prompt: 'Cuando aparece la ansiedad, ¿qué suele pasar primero?',
    helper: 'Queremos ubicar el patrón predominante: cuerpo, pensamientos, evitación o conductas de alivio.',
    type: 'single-choice',
    options: [
      {
        value: 'body_alarm',
        label: 'Siento un golpe físico fuerte',
        description: 'Palpitaciones, aire corto, mareo o sensación de perder el control.',
        profiles: { Pánico: 3, Somatización: 1 },
      },
      {
        value: 'mind_loop',
        label: 'Se me dispara la cabeza',
        description: 'Empiezo a anticipar problemas y no puedo cortar la preocupación.',
        profiles: { 'Ansiedad generalizada': 3, 'Ánimo depresivo': 1 },
      },
      {
        value: 'social_alert',
        label: 'Pienso en cómo me van a ver los demás',
        description: 'Miedo a quedar expuesto, hacer el ridículo o equivocarme.',
        profiles: { 'Ansiedad social': 3 },
      },
      {
        value: 'ritual_relief',
        label: 'Necesito hacer algo para quedarme tranquilo',
        description: 'Revisar, chequear, pedir seguridad, contar o repetir algo.',
        profiles: { TOC: 3 },
      },
    ],
  },
  {
    id: 'onset_context',
    section: 'Filtro inicial',
    prompt: '¿Cuándo empezó a sentirse como un problema real?',
    helper: 'No define el diagnóstico, pero nos da contexto sobre el inicio.',
    type: 'single-choice',
    options: [
      {
        value: 'after_stress',
        label: 'Después de una etapa de mucho estrés o cambio',
        description: 'Trabajo, mudanza, pérdida, ruptura o sobrecarga.',
        profiles: { 'Ansiedad generalizada': 1, 'Ánimo depresivo': 1 },
      },
      {
        value: 'after_attack',
        label: 'Desde un episodio físico muy intenso',
        description: 'Un ataque fuerte o una sensación corporal que me asustó mucho.',
        profiles: { Pánico: 2, Somatización: 1 },
      },
      {
        value: 'since_social',
        label: 'Desde situaciones sociales o de exposición',
        description: 'Hablar, mostrarme o quedar en evidencia me empezó a limitar.',
        profiles: { 'Ansiedad social': 2 },
      },
      {
        value: 'long_time',
        label: 'Hace bastante, no ubico un momento puntual',
        description: 'Es algo que vengo arrastrando y se fue haciendo cada vez más grande.',
        profiles: { 'Ansiedad generalizada': 1, TOC: 1, 'Ánimo depresivo': 1 },
      },
    ],
  },
  {
    id: 'intensity_now',
    section: 'Malestar actual',
    prompt: 'Si 0 es nada de ansiedad y 10 es insoportable, ¿cómo está hoy?',
    helper: 'Esto nos orienta sobre el nivel subjetivo de malestar actual.',
    type: 'scale',
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index + 1),
      label: String(index + 1),
      description: index >= 6 ? 'Malestar alto' : index >= 3 ? 'Malestar medio' : 'Malestar bajo',
    })),
  },
  {
    id: 'intensity_peak',
    section: 'Malestar actual',
    prompt: '¿Y cuál es el pico máximo que puede alcanzar?',
    helper: 'Nos ayuda a distinguir entre malestar sostenido y picos intensos.',
    type: 'scale',
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index + 1),
      label: String(index + 1),
      description: index >= 7 ? 'Pico muy alto' : index >= 4 ? 'Pico moderado' : 'Pico bajo',
    })),
  },
  {
    id: 'safe_context',
    section: 'Filtro inicial',
    prompt: '¿Dónde sentís que casi nunca aparece?',
    helper: 'Ver dónde baja suele mostrar qué la dispara y qué te regula.',
    type: 'single-choice',
    options: [
      {
        value: 'alone_safe',
        label: 'Cuando estoy solo o en casa',
        description: 'Baja cuando no tengo que exponerme frente a otros.',
        profiles: { 'Ansiedad social': 2 },
      },
      {
        value: 'occupied',
        label: 'Cuando estoy muy ocupado o distraído',
        description: 'Si tengo la mente tomada, casi desaparece.',
        profiles: { Somatización: 2, 'Ansiedad generalizada': 1 },
      },
      {
        value: 'with_company',
        label: 'Cuando estoy acompañado o contenido',
        description: 'Con alguien de confianza me siento bastante más seguro.',
        profiles: { Pánico: 1, 'Desregulación emocional': 1 },
      },
      {
        value: 'almost_nowhere',
        label: 'Me cuesta encontrar momentos donde no aparezca',
        description: 'Siento que ya se metió en casi todo.',
        profiles: { 'Ansiedad generalizada': 2, 'Ánimo depresivo': 2 },
      },
    ],
  },
  {
    id: 'avoidance',
    section: 'Evitación',
    prompt: '¿Qué tendés a evitar por miedo?',
    helper: 'La evitación es una de las señales que más limita la vida diaria.',
    type: 'single-choice',
    options: [
      {
        value: 'social_spaces',
        label: 'Situaciones sociales o de exposición',
        description: 'Reuniones, hablar en público, conocer gente, comer con otros.',
        profiles: { 'Ansiedad social': 3 },
      },
      {
        value: 'places_escape',
        label: 'Lugares donde siento que no podría salir fácil',
        description: 'Transporte, filas, lugares cerrados o donde me daría un ataque.',
        profiles: { Pánico: 3 },
      },
      {
        value: 'specific_trigger',
        label: 'Objetos o situaciones muy específicas',
        description: 'Alturas, sangre, aviones, animales, inyecciones u otras fobias claras.',
        profiles: { 'Fobia específica': 4 },
      },
      {
        value: 'daily_responsibilities',
        label: 'Tareas de la vida diaria',
        description: 'Trabajo, estudio, decisiones o cosas que antes resolvía sin tanto esfuerzo.',
        profiles: { 'Ánimo depresivo': 2, 'Ansiedad generalizada': 1 },
      },
    ],
  },
  {
    id: 'coping_response',
    section: 'Conducta de alivio',
    prompt: '¿Qué hacés más seguido cuando sentís ansiedad?',
    helper: 'Nos importa entender la conducta automática que aparece para calmar.',
    type: 'single-choice',
    options: [
      {
        value: 'seek_exit',
        label: 'Busco salir, controlar el cuerpo o ir a urgencias',
        description: 'Chequeo el pulso, busco aire, agua, puerta o ayuda médica.',
        profiles: { Pánico: 3, Somatización: 1 },
      },
      {
        value: 'reassurance',
        label: 'Chequeo o pido seguridad',
        description: 'Reviso, pregunto, busco certeza o hago rituales para calmar.',
        profiles: { TOC: 3 },
      },
      {
        value: 'isolate_or_bed',
        label: 'Me aíslo o me apago',
        description: 'Me encierro, me acuesto o dejo de hacer cosas.',
        profiles: { 'Ánimo depresivo': 2, 'Ansiedad social': 1 },
      },
      {
        value: 'consume_or_impulsive',
        label: 'Como, consumo o hago algo impulsivo para bajar',
        description: 'Uso conductas inmediatas para apagar lo que siento.',
        profiles: { 'Desregulación emocional': 3, Somatización: 1 },
      },
    ],
  },
  {
    id: 'catastrophic_prediction',
    section: 'Pensamiento asociado',
    prompt: '¿Qué sentís que pasaría si no hicieras eso?',
    helper: 'Buscamos la amenaza principal que la ansiedad está intentando prevenir.',
    type: 'single-choice',
    options: [
      {
        value: 'lose_control',
        label: 'Que me voy a descontrolar o me puede pasar algo grave',
        description: 'Desmayarme, morir, volverme loco o no poder salir.',
        profiles: { Pánico: 3, Somatización: 1 },
      },
      {
        value: 'be_judged',
        label: 'Que me van a juzgar, humillar o notar demasiado',
        description: 'Quedar mal, pasar vergüenza o decepcionar a otros.',
        profiles: { 'Ansiedad social': 3 },
      },
      {
        value: 'something_bad',
        label: 'Que algo malo va a pasar si no lo controlo',
        description: 'Mi cabeza sigue con el “y si pasa esto”.',
        profiles: { 'Ansiedad generalizada': 3, TOC: 1 },
      },
      {
        value: 'feel_unbearable',
        label: 'Que lo que siento me va a desbordar',
        description: 'Me asusta no poder tolerar la emoción o quedar solo con eso.',
        profiles: { 'Desregulación emocional': 2, 'Ánimo depresivo': 1 },
      },
    ],
  },
  {
    id: 'life_impact',
    section: 'Impacto',
    prompt: '¿Dónde sentís que ya te está limitando más?',
    helper: 'Queremos medir el costo real en tu vida cotidiana.',
    type: 'single-choice',
    options: [
      {
        value: 'work_study',
        label: 'Trabajo, estudio y organización diaria',
        description: 'Me cuesta sostener foco, decisiones o rutina.',
        profiles: { 'Ansiedad generalizada': 2, 'Ánimo depresivo': 1 },
      },
      {
        value: 'relationships',
        label: 'Pareja, familia, amigos o exposición social',
        description: 'Me retraigo, discuto más o dejo de vincularme.',
        profiles: { 'Ansiedad social': 2, 'Desregulación emocional': 2 },
      },
      {
        value: 'sleep_health',
        label: 'Sueño y salud física',
        description: 'Me cuesta dormir, descansar o vivir tranquilo con el cuerpo.',
        profiles: { Somatización: 2, Pánico: 1, 'Ánimo depresivo': 1 },
      },
      {
        value: 'everything',
        label: 'Ya me toca casi todas las áreas',
        description: 'Siento que me achicó bastante la vida.',
        profiles: { 'Ansiedad generalizada': 2, 'Ánimo depresivo': 2 },
      },
    ],
  },
  {
    id: 'worry_scope',
    section: 'TAG',
    prompt: 'Cuando te preocupás, ¿es por muchas cosas distintas o por un tema muy puntual?',
    helper: 'Esto ayuda a diferenciar preocupación difusa de miedo específico.',
    type: 'single-choice',
    options: [
      {
        value: 'many_topics',
        label: 'Por muchas cosas al mismo tiempo',
        description: 'Trabajo, salud, familia, dinero o todo a la vez.',
        profiles: { 'Ansiedad generalizada': 4 },
      },
      {
        value: 'one_topic',
        label: 'Más bien por un tema central',
        description: 'Suele girar alrededor de un foco bastante claro.',
        profiles: { TOC: 1, 'Fobia específica': 1, 'Ansiedad social': 1 },
      },
      {
        value: 'social_theme',
        label: 'Casi siempre por exposición o vínculo',
        description: 'Me preocupa cómo me ven o cómo voy a quedar.',
        profiles: { 'Ansiedad social': 3 },
      },
      {
        value: 'body_theme',
        label: 'Casi siempre por síntomas del cuerpo o salud',
        description: 'Me engancho mucho con lo físico.',
        profiles: { Somatización: 3, Pánico: 1 },
      },
    ],
  },
  {
    id: 'worry_duration',
    section: 'TAG',
    prompt: '¿Cuánto tiempo del día sentís que pasás preocupado o con la cabeza en bucle?',
    helper: 'Nos importa si es algo puntual o si ocupa varias horas del día.',
    type: 'single-choice',
    options: [
      {
        value: 'most_day',
        label: 'Varias horas, casi todos los días',
        description: 'A veces más de 3 o 4 horas.',
        profiles: { 'Ansiedad generalizada': 4 },
      },
      {
        value: 'peaks_only',
        label: 'Solo en picos concretos',
        description: 'Me agarra por momentos, no todo el día.',
        profiles: { Pánico: 1, 'Fobia específica': 1 },
      },
      {
        value: 'social_before',
        label: 'Sobre todo antes o después de situaciones sociales',
        description: 'Me engancho cuando tengo que exponerme o recordar lo que pasó.',
        profiles: { 'Ansiedad social': 2 },
      },
      {
        value: 'ritual_after',
        label: 'Hasta que reviso o hago algo para calmarme',
        description: 'La cabeza no afloja hasta hacer cierta conducta.',
        profiles: { TOC: 3 },
      },
    ],
  },
  {
    id: 'panic_attacks',
    section: 'Pánico',
    prompt: '¿Te pasó tener ataques que aparecen de golpe, suben al pico en minutos y te hacen sentir que podrías morir, desmayarte o perder el control?',
    helper: 'Buscamos diferenciar picos abruptos de ansiedad sostenida.',
    type: 'single-choice',
    options: [
      {
        value: 'yes_repeated',
        label: 'Sí, varias veces',
        description: 'Después incluso quedé con miedo a que vuelva a pasar.',
        profiles: { Pánico: 5 },
      },
      {
        value: 'yes_once',
        label: 'Sí, alguna vez',
        description: 'No tan seguido, pero me dejó muy marcado.',
        profiles: { Pánico: 3 },
      },
      {
        value: 'not_sudden',
        label: 'No así de brusco, más bien sube de a poco',
        description: 'La ansiedad aparece, pero no en forma de ataque tan repentino.',
        profiles: { 'Ansiedad generalizada': 1, 'Ánimo depresivo': 1 },
      },
      {
        value: 'mostly_social',
        label: 'Solo en situaciones sociales o de exposición',
        description: 'Se dispara si tengo que hablar, mostrarme o quedar observado.',
        profiles: { 'Ansiedad social': 2, Pánico: 1 },
      },
    ],
  },
  {
    id: 'social_fear',
    section: 'Ansiedad social',
    prompt: 'En situaciones sociales, ¿qué es lo que más te asusta?',
    helper: 'Queremos mapear si hay miedo a juicio, humillación o exposición de síntomas.',
    type: 'single-choice',
    options: [
      {
        value: 'judged',
        label: 'Ser juzgado o humillado',
        description: 'Que piensen mal de mí o que me vea torpe.',
        profiles: { 'Ansiedad social': 4 },
      },
      {
        value: 'show_symptoms',
        label: 'Que se note mi ansiedad',
        description: 'Temo ruborizarme, temblar, trabarme o quedar expuesto.',
        profiles: { 'Ansiedad social': 4, Pánico: 1 },
      },
      {
        value: 'mistake',
        label: 'Cometer errores o decepcionar',
        description: 'Me obsesiona hacerlo perfecto para no quedar mal.',
        profiles: { 'Ansiedad social': 3, TOC: 1 },
      },
      {
        value: 'not_social_main',
        label: 'No es lo principal en mi caso',
        description: 'Mi ansiedad va más por otro lado.',
        profiles: {},
      },
    ],
  },
  {
    id: 'specific_phobia',
    section: 'Fobia específica',
    prompt: '¿Hay un objeto o situación muy específica que te da un miedo desproporcionado?',
    helper: 'Por ejemplo animales, alturas, aviones, sangre o inyecciones.',
    type: 'single-choice',
    options: [
      {
        value: 'yes_clear',
        label: 'Sí, clarísimo',
        description: 'Con solo pensarlo ya se me activa bastante.',
        profiles: { 'Fobia específica': 5 },
      },
      {
        value: 'yes_some',
        label: 'Sí, pero no siempre',
        description: 'Hay ciertos disparadores específicos que me superan.',
        profiles: { 'Fobia específica': 3 },
      },
      {
        value: 'body_health',
        label: 'Más bien me asustan mis síntomas o la salud',
        description: 'Lo específico está más puesto en el cuerpo.',
        profiles: { Somatización: 2, Pánico: 1 },
      },
      {
        value: 'no_specific',
        label: 'No, no hay un disparador puntual',
        description: 'Es una ansiedad más general o más social.',
        profiles: {},
      },
    ],
  },
  {
    id: 'obsessions_compulsions',
    section: 'TOC',
    prompt: '¿Tenés pensamientos que aparecen contra tu voluntad y hacés algo repetitivo, mental o físico, para bajar la ansiedad?',
    helper: 'Por ejemplo revisar, lavar, contar, rezar, chequear o pedir seguridad.',
    type: 'single-choice',
    options: [
      {
        value: 'yes_clear',
        label: 'Sí, me pasa seguido',
        description: 'Si intento no hacerlo, la ansiedad sube bastante.',
        profiles: { TOC: 5 },
      },
      {
        value: 'safety_behaviors',
        label: 'No siempre rituales, pero sí muchas conductas de seguridad',
        description: 'Chequeos, reaseguro, llevar cosas o evitar quedarme sin control.',
        profiles: { TOC: 3, Pánico: 1 },
      },
      {
        value: 'intrusive_only',
        label: 'Tengo pensamientos intrusivos, pero no tanta conducta repetitiva',
        description: 'Me generan malestar aunque no siempre hago algo para bajarlo.',
        profiles: { TOC: 2, 'Ánimo depresivo': 1 },
      },
      {
        value: 'not_main',
        label: 'No es un patrón principal en mi caso',
        description: 'Mi ansiedad se organiza de otra forma.',
        profiles: {},
      },
    ],
  },
  {
    id: 'somatic_focus',
    section: 'Somatización',
    prompt: '¿Cuánto peso tienen hoy los síntomas físicos y la preocupación por la salud?',
    helper: 'Nos sirve para ver si lo corporal quedó muy en primer plano.',
    type: 'single-choice',
    options: [
      {
        value: 'medical_loop',
        label: 'Muchísimo, me hice estudios o sigo buscando respuestas',
        description: 'Siento que algo no cierra aunque me digan que está bien.',
        profiles: { Somatización: 5 },
      },
      {
        value: 'body_when_focus',
        label: 'Aparece fuerte cuando me enfoco en el cuerpo',
        description: 'Si me distraigo o estoy ocupado, baja bastante.',
        profiles: { Somatización: 4 },
      },
      {
        value: 'panic_body',
        label: 'Lo físico aparece más en ataques o picos',
        description: 'No es constante, pero en los picos se siente muy real.',
        profiles: { Pánico: 2, Somatización: 1 },
      },
      {
        value: 'not_body_main',
        label: 'No es el foco principal',
        description: 'Lo mío va más por pensamientos, ánimo o vínculos.',
        profiles: {},
      },
    ],
  },
  {
    id: 'mood_state',
    section: 'Ánimo',
    prompt: 'Además de la ansiedad, ¿cómo describirías tu ánimo hoy?',
    helper: 'Buscamos ver si también hay tristeza, vacío o pérdida de interés.',
    type: 'single-choice',
    options: [
      {
        value: 'sad_empty',
        label: 'Me siento triste, vacío o sin ganas bastante seguido',
        description: 'También me cuesta disfrutar cosas que antes sí.',
        profiles: { 'Ánimo depresivo': 5 },
      },
      {
        value: 'negative_future',
        label: 'Estoy muy negativo conmigo o con el futuro',
        description: 'Me cuesta imaginar mejora o confiar en mí.',
        profiles: { 'Ánimo depresivo': 4 },
      },
      {
        value: 'mostly_anxious',
        label: 'Lo central es la ansiedad, no tanto la tristeza',
        description: 'Mi ánimo cae más como consecuencia del estrés.',
        profiles: { 'Ansiedad generalizada': 1, Pánico: 1 },
      },
      {
        value: 'rapid_emotions',
        label: 'No es tristeza estable, sino cambios emocionales intensos',
        description: 'Paso de un estado a otro con mucha fuerza.',
        profiles: { 'Desregulación emocional': 3 },
      },
    ],
  },
  {
    id: 'emotion_regulation',
    section: 'Regulación emocional',
    prompt: '¿Tus emociones cambian de forma muy intensa y rápida, y a veces actuás impulsivamente para calmarlas?',
    helper: 'También queremos saber si hay miedo fuerte al abandono o vínculos muy inestables.',
    type: 'single-choice',
    options: [
      {
        value: 'yes_strong',
        label: 'Sí, me pasa bastante',
        description: 'A veces hago algo impulsivo y mis vínculos se vuelven intensos o conflictivos.',
        profiles: { 'Desregulación emocional': 5 },
      },
      {
        value: 'some_abandonment',
        label: 'Me pasa sobre todo con miedo al abandono o al rechazo',
        description: 'Mis relaciones se vuelven el centro del malestar.',
        profiles: { 'Desregulación emocional': 4, 'Ansiedad social': 1 },
      },
      {
        value: 'anxious_not_impulsive',
        label: 'Me altero, pero no me reconozco tan impulsivo',
        description: 'La ansiedad sube, aunque no tanto por cambios bruscos emocionales.',
        profiles: { 'Ansiedad generalizada': 1, 'Ánimo depresivo': 1 },
      },
      {
        value: 'not_main',
        label: 'No es una característica principal',
        description: 'Mi dificultad principal está más en otra área.',
        profiles: {},
      },
    ],
  },
  {
    id: 'thought_disorganization',
    section: 'Pensamiento',
    prompt: '¿Alguna vez sentiste que tus pensamientos estaban muy confusos, o percibiste cosas que otros no perciben?',
    helper: 'Esta pregunta existe para priorizar seguimiento humano si hace falta.',
    type: 'single-choice',
    options: [
      {
        value: 'yes_clear',
        label: 'Sí, me pasó y me preocupa',
        description: 'Voces, percepciones extrañas, sensación de control o mucha confusión mental.',
        profiles: { 'Pensamiento desorganizado': 6 },
      },
      {
        value: 'some_confusion',
        label: 'A veces me siento muy desordenado mentalmente',
        description: 'No sé si es eso, pero me cuesta mucho ordenar la cabeza.',
        profiles: { 'Pensamiento desorganizado': 3, 'Ánimo depresivo': 1 },
      },
      {
        value: 'panic_confusion',
        label: 'Solo en picos de ansiedad me siento así',
        description: 'Cuando sube mucho la activación, siento confusión o irrealidad.',
        profiles: { Pánico: 1, 'Pensamiento desorganizado': 1 },
      },
      {
        value: 'never',
        label: 'No, nunca me pasó algo así',
        description: 'No es algo con lo que me identifique.',
        profiles: {},
      },
    ],
  },
  {
    id: 'goal_main',
    section: 'Objetivo',
    prompt: '¿Qué estás buscando principalmente en GAPA?',
    helper: 'Esto nos sirve para personalizar tono, recursos y foco dentro del campus.',
    type: 'single-choice',
    options: [
      {
        value: 'reduce_anxiety',
        label: 'Reducir ansiedad',
        description: 'Necesito bajar intensidad y recuperar calma.',
        profiles: { 'Ansiedad generalizada': 1, Pánico: 1 },
      },
      {
        value: 'learn_tools',
        label: 'Aprender herramientas concretas',
        description: 'Quiero técnicas prácticas para usar en el día a día.',
        profiles: { TOC: 1, 'Ansiedad generalizada': 1, Pánico: 1 },
      },
      {
        value: 'understand_me',
        label: 'Entender mejor lo que me pasa',
        description: 'Necesito claridad antes de ordenar otras cosas.',
        profiles: { Somatización: 1, 'Ánimo depresivo': 1 },
      },
      {
        value: 'mood_selfworth',
        label: 'Mejorar ánimo, autoestima o vínculo conmigo',
        description: 'Necesito trabajar cómo me siento conmigo y con otros.',
        profiles: { 'Ánimo depresivo': 1, 'Desregulación emocional': 1, 'Ansiedad social': 1 },
      },
    ],
  },
  {
    id: 'current_phrase',
    section: 'Estado actual',
    prompt: '¿Qué frase describe mejor cómo te sentís hoy?',
    helper: 'Nos da una fotografía emocional rápida del punto de partida.',
    type: 'single-choice',
    options: [
      {
        value: 'surviving',
        label: 'Estoy sobreviviendo el día a día',
        description: 'La siento bastante cuesta arriba.',
        profiles: { 'Ánimo depresivo': 2, 'Ansiedad generalizada': 1 },
      },
      {
        value: 'lost',
        label: 'Me siento perdido o desordenado',
        description: 'Necesito orientación para ubicarme.',
        profiles: { 'Ansiedad generalizada': 1, Somatización: 1, 'Pensamiento desorganizado': 1 },
      },
      {
        value: 'need_tools',
        label: 'Necesito herramientas concretas',
        description: 'No quiero solo entender, quiero empezar a hacer algo.',
        profiles: { Pánico: 1, TOC: 1, 'Ansiedad generalizada': 1 },
      },
      {
        value: 'enjoy_less',
        label: 'Me cuesta disfrutar y sostenerme',
        description: 'No me siento bien ni conmigo ni con mi rutina.',
        profiles: { 'Ánimo depresivo': 2, 'Desregulación emocional': 1 },
      },
    ],
  },
  {
    id: 'wellbeing_level',
    section: 'Bienestar',
    prompt: 'Del 1 al 10, ¿cuánto sentís que tu bienestar emocional está afectado actualmente?',
    helper: 'Esto complementa el nivel subjetivo de malestar.',
    type: 'scale',
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index + 1),
      label: String(index + 1),
      description: index >= 7 ? 'Muy afectado' : index >= 4 ? 'Afectado' : 'Leve',
    })),
  },
  {
    id: 'three_month_goal',
    section: 'Objetivo',
    prompt: 'En los próximos 3 meses, ¿qué te gustaría lograr primero?',
    helper: 'Usamos esta prioridad para ordenar recursos y seguimiento.',
    type: 'single-choice',
    options: [
      {
        value: 'more_calm',
        label: 'Poder bajar más rápido cuando me disparo',
        description: 'Recuperar regulación y sentir más control.',
        profiles: { Pánico: 1, 'Ansiedad generalizada': 1 },
      },
      {
        value: 'sleep_focus',
        label: 'Dormir mejor y recuperar energía',
        description: 'Sentirme menos agotado y más estable.',
        profiles: { Somatización: 1, 'Ánimo depresivo': 1, 'Ansiedad generalizada': 1 },
      },
      {
        value: 'social_security',
        label: 'Moverme con más seguridad frente a otros',
        description: 'Hablar, vincularme y mostrarme con menos miedo.',
        profiles: { 'Ansiedad social': 2, 'Desregulación emocional': 1 },
      },
      {
        value: 'order_life',
        label: 'Ordenar mi vida y sostener hábitos emocionales',
        description: 'Quiero continuidad, estructura y un plan.',
        profiles: { 'Ansiedad generalizada': 1, 'Ánimo depresivo': 1 },
      },
    ],
  },
  {
    id: 'risk_screen',
    section: 'Contención',
    prompt: 'En las últimas semanas, ¿tuviste pensamientos de hacerte daño o sentiste que no querías seguir?',
    helper: 'Esta respuesta activa una recomendación de contención y priorización humana.',
    type: 'single-choice',
    options: [
      {
        value: 'nunca',
        label: 'Nunca',
        description: 'No me identifiqué con eso en estas semanas.',
        profiles: {},
      },
      {
        value: 'algunas_veces',
        label: 'Algunas veces',
        description: 'Me pasó y creo que necesito más contención.',
        profiles: { 'Ánimo depresivo': 2, 'Desregulación emocional': 1 },
      },
      {
        value: 'frecuentemente',
        label: 'Frecuentemente',
        description: 'Me viene pasando bastante y necesito ayuda humana rápida.',
        profiles: { 'Ánimo depresivo': 4, 'Desregulación emocional': 2, 'Pensamiento desorganizado': 1 },
      },
    ],
  },
]

export function getQuestionOption(question, answerValue) {
  return question.options.find((option) => option.value === answerValue) ?? null
}

export function calculateProfileCategory(answers) {
  return getOnboardingSummary(answers).profileCategory
}

export function getOnboardingSummary(answers) {
  const scores = Object.fromEntries(profileCategories.map((category) => [category, 0]))

  onboardingQuestions.forEach((question) => {
    const answerValue = answers[question.id]
    const option = getQuestionOption(question, answerValue)

    if (!option?.profiles) {
      return
    }

    Object.entries(option.profiles).forEach(([profile, value]) => {
      if (scores[profile] !== undefined) {
        scores[profile] += value
      }
    })
  })

  const profileCategory = profileCategories.reduce((bestCategory, currentCategory) =>
    scores[currentCategory] > scores[bestCategory] ? currentCategory : bestCategory,
  profileCategories[0])

  const wellbeingLevel = Number(answers.wellbeing_level ?? 0)
  const intensityNow = Number(answers.intensity_now ?? 0)
  const intensityPeak = Number(answers.intensity_peak ?? 0)
  const riskLevel = answers.risk_screen ?? 'nunca'

  return {
    profileCategory,
    scores,
    wellbeingLevel,
    intensityNow,
    intensityPeak,
    goal: answers.goal_main ?? null,
    currentPhrase: answers.current_phrase ?? null,
    threeMonthGoal: answers.three_month_goal ?? null,
    riskLevel,
    supportMessage: riskSupportMessages[riskLevel] ?? null,
  }
}

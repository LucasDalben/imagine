export type StoryTheme =
  | 'adventure'
  | 'fantasy'
  | 'science'
  | 'nature'
  | 'mystery'
  | 'fables';

export type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';

export interface StoryChoice {
  id: string;
  text: string;
  textEs: string;
  textPtBR: string;
  nextPage: number | null;
  endingType?: 'good' | 'bad';
  conditions?: Array<{ if: string; nextPage: number }>;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  textEs: string;
  textPtBR: string;
  backgroundImage?: string;
  image_url?: string;
  emoji?: string;
  choices: StoryChoice[];
  /** 'narrative' = single tap Continue, 'choice' = 2-3 branching options */
  type?: 'narrative' | 'choice';
  /** present on ending pages (choices: []) */
  isEnding?: boolean;
}

export interface Story {
  id: string;
  title: string;
  titleEs: string;
  titlePtBR: string;
  description: string;
  descriptionEs: string;
  descriptionPtBR: string;
  theme: StoryTheme;
  characters: string[];
  ageMin: number;
  ageMax: number;
  totalPages: number;
  readingLevel: ReadingLevel;
  coverImage: string;
  emoji: string;
  isNew?: boolean;
  isFeatured?: boolean;
  downloadSizeMB: number;
  pages: StoryPage[];
}

export const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Brave Little Dragon',
    titleEs: 'El Pequeño Dragón Valiente',
    titlePtBR: 'O Pequeno Dragão Corajoso',
    description:
      'Drago, a young dragon who is afraid of fire, must find courage to save his village from an eternal winter.',
    descriptionEs:
      'Drago, un joven dragón que teme al fuego, debe encontrar valentía para salvar a su aldea de un invierno eterno.',
    descriptionPtBR:
      'Drago, um jovem dragão com medo de fogo, deve encontrar coragem para salvar sua aldeia de um inverno eterno.',
    theme: 'adventure',
    characters: ['Drago', 'Princess Lily', 'Elder Thorn'],
    ageMin: 7,
    ageMax: 9,
    totalPages: 60,
    readingLevel: 'beginner',
    coverImage: 'https://picsum.photos/seed/dragon-adventure/400/600',
    emoji: '🐉',
    isFeatured: true,
    downloadSizeMB: 12,
    pages: [
      {
        pageNumber: 1,
        text: 'Drago was the only dragon who could not breathe fire. Every day the other dragons would practice, but Drago only blew cold blue smoke.',
        textEs:
          'Drago era el único dragón que no podía escupir fuego. Cada día los otros dragones practicaban, pero Drago solo soplaba humo azul frío.',
        textPtBR:
          'Drago era o único dragão que não conseguia cuspir fogo. Todo dia os outros dragões praticavam, mas Drago só soprava fumaça azul fria.',
        backgroundImage: 'https://picsum.photos/seed/s1p1/800/1200',
        emoji: '💨',
        choices: [
          {
            id: '1a',
            text: 'Practice breathing fire in secret',
            textEs: 'Practicar escupir fuego en secreto',
            textPtBR: 'Praticar cuspir fogo em segredo',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Ask Elder Thorn for advice',
            textEs: 'Pedir consejo al Anciano Thorn',
            textPtBR: 'Pedir conselho ao Ancião Thorn',
            nextPage: 15,
          },
          {
            id: '1c',
            text: 'Go explore the Frozen Valley',
            textEs: 'Explorar el Valle Helado',
            textPtBR: 'Explorar o Vale Gelado',
            nextPage: 30,
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'Drago tried and tried in the hidden cave. Suddenly, a warm glow appeared in his chest — not fire, but something even more powerful: a spark of pure courage!',
        textEs:
          'Drago intentó e intentó en la cueva escondida. De repente, un resplandor cálido apareció en su pecho — no era fuego, sino algo aún más poderoso: ¡una chispa de puro coraje!',
        textPtBR:
          'Drago tentou e tentou na caverna escondida. De repente, um brilho quente apareceu em seu peito — não era fogo, mas algo ainda mais poderoso: uma faísca de pura coragem!',
        backgroundImage: 'https://picsum.photos/seed/s1p2/800/1200',
        emoji: '✨',
        choices: [
          {
            id: '2a',
            text: 'Use the spark to light the village torches',
            textEs: 'Usar la chispa para encender las antorchas del pueblo',
            textPtBR: 'Usar a faísca para acender as tochas da aldeia',
            nextPage: 45,
          },
          {
            id: '2b',
            text: 'Share the secret with Princess Lily',
            textEs: 'Compartir el secreto con la Princesa Lily',
            textPtBR: 'Compartilhar o segredo com a Princesa Lily',
            nextPage: 55,
          },
          {
            id: '2c',
            text: 'Keep the power secret and go home',
            textEs: 'Guardar el poder en secreto y regresar a casa',
            textPtBR: 'Guardar o poder em segredo e ir para casa',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 15,
        text: 'Elder Thorn smiled wisely. "True fire, young one, burns in your heart. You must believe before you can breathe." He pointed toward the Ancient Flame Mountain.',
        textEs:
          'El Anciano Thorn sonrió con sabiduría. "El verdadero fuego, joven, arde en tu corazón. Debes creer antes de poder soplar." Señaló hacia la Antigua Montaña de Fuego.',
        textPtBR:
          'O Ancião Thorn sorriu com sabedoria. "O verdadeiro fogo, jovem, queima em seu coração. Você deve acreditar antes de respirar." Ele apontou para a Antiga Montanha das Chamas.',
        backgroundImage: 'https://picsum.photos/seed/s1p15/800/1200',
        emoji: '🏔️',
        choices: [
          {
            id: '15a',
            text: 'Climb the Ancient Flame Mountain',
            textEs: 'Escalar la Antigua Montaña de Fuego',
            textPtBR: 'Escalar a Antiga Montanha das Chamas',
            nextPage: 45,
          },
          {
            id: '15b',
            text: 'Thank Elder Thorn and try again',
            textEs: 'Agradecer al Anciano Thorn e intentar de nuevo',
            textPtBR: 'Agradecer ao Ancião Thorn e tentar de novo',
            nextPage: 2,
          },
          {
            id: '15c',
            text: 'Return home discouraged',
            textEs: 'Regresar a casa desanimado',
            textPtBR: 'Voltar para casa desanimado',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 30,
        text: 'In the Frozen Valley, Drago found a baby ice phoenix trapped under a glacier. Its eyes sparkled with hope. This was his chance to be a true hero!',
        textEs:
          'En el Valle Helado, Drago encontró un pequeño fénix de hielo atrapado bajo un glaciar. Sus ojos brillaban con esperanza. ¡Esta era su oportunidad de ser un verdadero héroe!',
        textPtBR:
          'No Vale Gelado, Drago encontrou um filhote de fênix de gelo preso sob uma geleira. Seus olhos brilhavam com esperança. Esta era sua chance de ser um verdadeiro herói!',
        backgroundImage: 'https://picsum.photos/seed/s1p30/800/1200',
        emoji: '🦅',
        choices: [
          {
            id: '30a',
            text: 'Try to free the ice phoenix',
            textEs: 'Intentar liberar al fénix de hielo',
            textPtBR: 'Tentar libertar o fênix de gelo',
            nextPage: 45,
          },
          {
            id: '30b',
            text: 'Go back to get help first',
            textEs: 'Regresar a buscar ayuda primero',
            textPtBR: 'Voltar para buscar ajuda primeiro',
            nextPage: 55,
          },
          {
            id: '30c',
            text: 'Leave the valley quickly',
            textEs: 'Salir del valle rápidamente',
            textPtBR: 'Sair do vale rapidamente',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 45,
        text: 'Drago took a deep breath. Every act of bravery he had done filled his heart with warmth. Then — WHOOSH! A magnificent golden flame erupted from his mouth! The village was saved!',
        textEs:
          'Drago respiró profundo. Cada acto de valentía que había realizado llenó su corazón de calor. ¡Entonces — WHOOSH! ¡Una magnífica llama dorada brotó de su boca! ¡El pueblo estaba salvado!',
        textPtBR:
          'Drago respirou fundo. Cada ato de coragem que havia realizado encheu seu coração de calor. Então — WHOOSH! Uma magnífica chama dourada irrompeu de sua boca! A aldeia estava salva!',
        backgroundImage: 'https://picsum.photos/seed/s1p45/800/1200',
        emoji: '🔥',
        choices: [
          {
            id: '45a',
            text: 'Celebrate with the whole village!',
            textEs: '¡Celebrar con todo el pueblo!',
            textPtBR: 'Comemorar com toda a aldeia!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '45b',
            text: 'Share the glory with Elder Thorn',
            textEs: 'Compartir la gloria con el Anciano Thorn',
            textPtBR: 'Compartilhar a glória com o Ancião Thorn',
            nextPage: 55,
          },
          {
            id: '45c',
            text: 'Quietly return to your cave',
            textEs: 'Regresar tranquilamente a tu cueva',
            textPtBR: 'Voltar silenciosamente para sua caverna',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 55,
        text: 'Princess Lily hugged Drago tight. "You were never different," she said. "You just had a different kind of fire — the fire of kindness!" The whole kingdom cheered for the brave little dragon.',
        textEs:
          'La Princesa Lily abrazó a Drago fuerte. "Nunca fuiste diferente", dijo. "¡Solo tenías un tipo diferente de fuego — el fuego de la bondad!" Todo el reino vitoreó al pequeño dragón valiente.',
        textPtBR:
          'A Princesa Lily abraçou Drago com força. "Você nunca foi diferente", ela disse. "Você só tinha um tipo diferente de fogo — o fogo da bondade!" Todo o reino aplaudiu o pequeno dragão corajoso.',
        backgroundImage: 'https://picsum.photos/seed/s1p55/800/1200',
        emoji: '👑',
        choices: [
          {
            id: '55a',
            text: 'The End — A Hero is Born!',
            textEs: 'Fin — ¡Un Héroe ha Nacido!',
            textPtBR: 'Fim — Um Herói Nasce!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '55b',
            text: 'Continue the adventure in Book 2',
            textEs: 'Continuar la aventura en el Libro 2',
            textPtBR: 'Continuar a aventura no Livro 2',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '55c',
            text: 'Go back and change your choices',
            textEs: 'Regresar y cambiar tus decisiones',
            textPtBR: 'Voltar e mudar suas escolhas',
            nextPage: 1,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Luna and the Starlight Forest',
    titleEs: 'Luna y el Bosque de Estrellas',
    titlePtBR: 'Luna e a Floresta de Luz das Estrelas',
    description:
      'Luna discovers a magical forest that glows at night, where every tree holds an ancient secret.',
    descriptionEs:
      'Luna descubre un bosque mágico que brilla de noche, donde cada árbol guarda un antiguo secreto.',
    descriptionPtBR:
      'Luna descobre uma floresta mágica que brilha à noite, onde cada árvore guarda um antigo segredo.',
    theme: 'fantasy',
    characters: ['Luna', 'Milo the Owl', 'The Forest Spirit'],
    ageMin: 7,
    ageMax: 10,
    totalPages: 48,
    readingLevel: 'intermediate',
    coverImage: 'https://picsum.photos/seed/luna-forest/400/600',
    emoji: '🌙',
    isNew: true,
    downloadSizeMB: 9,
    pages: [
      {
        pageNumber: 1,
        text: 'Every night, Luna looked out her window at the dark forest. One evening, she saw tiny lights dancing between the trees. Was it fireflies? Or something magical?',
        textEs:
          'Cada noche, Luna miraba por su ventana hacia el oscuro bosque. Una tarde, vio pequeñas luces danzando entre los árboles. ¿Eran luciérnagas? ¿O algo mágico?',
        textPtBR:
          'Toda noite, Luna olhava pela janela para a floresta escura. Certa noite, ela viu pequenas luzes dançando entre as árvores. Eram vaga-lumes? Ou algo mágico?',
        backgroundImage: 'https://picsum.photos/seed/s2p1/800/1200',
        emoji: '✨',
        choices: [
          {
            id: '1a',
            text: 'Sneak out to explore the forest',
            textEs: 'Escaparse para explorar el bosque',
            textPtBR: 'Sair escondida para explorar a floresta',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Call out to the lights from the window',
            textEs: 'Llamar a las luces desde la ventana',
            textPtBR: 'Chamar as luzes da janela',
            nextPage: 15,
          },
          {
            id: '1c',
            text: 'Go to sleep — it must be a dream',
            textEs: 'Ir a dormir — debe ser un sueño',
            textPtBR: 'Ir dormir — deve ser um sonho',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'Luna tiptoed into the Starlight Forest. Every step made the flowers glow brighter. A wise old owl landed on a branch. "Welcome," he hooted. "I am Milo. I have been waiting for you."',
        textEs:
          'Luna caminó de puntillas hacia el Bosque de Estrellas. Cada paso hacía que las flores brillaran más. Un sabio búho viejo aterrizó en una rama. "Bienvenida", ululó. "Soy Milo. Te he estado esperando."',
        textPtBR:
          'Luna foi na ponta dos pés para a Floresta de Luz das Estrelas. Cada passo fazia as flores brilharem mais. Uma coruja velha e sábia pousou em um galho. "Bem-vinda", ela piou. "Sou Milo. Estava esperando por você."',
        backgroundImage: 'https://picsum.photos/seed/s2p2/800/1200',
        emoji: '🦉',
        choices: [
          {
            id: '2a',
            text: 'Follow Milo deeper into the forest',
            textEs: 'Seguir a Milo más adentro del bosque',
            textPtBR: 'Seguir Milo mais fundo na floresta',
            nextPage: 30,
          },
          {
            id: '2b',
            text: 'Ask Milo why he was waiting',
            textEs: 'Preguntar a Milo por qué estaba esperando',
            textPtBR: 'Perguntar a Milo por que estava esperando',
            nextPage: 40,
          },
          {
            id: '2c',
            text: 'Run back home, scared',
            textEs: 'Correr a casa, asustada',
            textPtBR: 'Correr para casa com medo',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 30,
        text: 'At the heart of the forest stood an ancient tree as tall as a castle. Its roots formed a doorway that shimmered like starlight. "The Forest Spirit awaits," whispered Milo.',
        textEs:
          'En el corazón del bosque había un árbol antiguo tan alto como un castillo. Sus raíces formaban una puerta que brillaba como luz de estrellas. "El Espíritu del Bosque te espera", susurró Milo.',
        textPtBR:
          'No coração da floresta havia uma árvore antiga tão alta quanto um castelo. Suas raízes formavam uma porta que brilhava como luz das estrelas. "O Espírito da Floresta aguarda", sussurrou Milo.',
        backgroundImage: 'https://picsum.photos/seed/s2p30/800/1200',
        emoji: '🌳',
        choices: [
          {
            id: '30a',
            text: 'Enter the magical doorway',
            textEs: 'Entrar por la puerta mágica',
            textPtBR: 'Entrar pela porta mágica',
            nextPage: 45,
          },
          {
            id: '30b',
            text: 'Ask Milo what is inside',
            textEs: 'Preguntar a Milo qué hay adentro',
            textPtBR: 'Perguntar a Milo o que há dentro',
            nextPage: 40,
          },
          {
            id: '30c',
            text: 'Stay outside and watch',
            textEs: 'Quedarse afuera y observar',
            textPtBR: 'Ficar do lado de fora e observar',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 40,
        text: '"Every hundred years," said Milo, "a child pure of heart can speak to the Forest Spirit and make one wish for all living things." Luna felt a warm glow in her chest.',
        textEs:
          '"Cada cien años", dijo Milo, "un niño puro de corazón puede hablar con el Espíritu del Bosque y hacer un deseo para todos los seres vivos." Luna sintió un cálido resplandor en su pecho.',
        textPtBR:
          '"A cada cem anos", disse Milo, "uma criança de coração puro pode falar com o Espírito da Floresta e fazer um desejo para todos os seres vivos." Luna sentiu um brilho quente em seu peito.',
        backgroundImage: 'https://picsum.photos/seed/s2p40/800/1200',
        emoji: '💫',
        choices: [
          {
            id: '40a',
            text: 'Enter the tree and make a wish',
            textEs: 'Entrar al árbol y pedir un deseo',
            textPtBR: 'Entrar na árvore e fazer um desejo',
            nextPage: 45,
          },
          {
            id: '40b',
            text: 'Ask if you can wish for a friend',
            textEs: 'Preguntar si puedes desear un amigo',
            textPtBR: 'Perguntar se pode desejar um amigo',
            nextPage: 45,
          },
          {
            id: '40c',
            text: 'Feel too small to make such a big wish',
            textEs: 'Sentirse demasiado pequeña para hacer tal deseo',
            textPtBR: 'Sentir-se pequena demais para fazer tal desejo',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 45,
        text: 'Luna stepped through the doorway. A gentle spirit made of moonlight and starshine appeared. "What do you wish for, Luna?" Luna smiled. "I wish for all children to always have stories to dream about!"',
        textEs:
          'Luna cruzó la puerta. Un espíritu gentil hecho de luz de luna y estrellas apareció. "¿Qué deseas, Luna?" Luna sonrió. "¡Deseo que todos los niños siempre tengan historias para soñar!"',
        textPtBR:
          'Luna atravessou a porta. Um espírito gentil feito de luar e luz das estrelas apareceu. "O que você deseja, Luna?" Luna sorriu. "Desejo que todas as crianças sempre tenham histórias para sonhar!"',
        backgroundImage: 'https://picsum.photos/seed/s2p45/800/1200',
        emoji: '🌟',
        choices: [
          {
            id: '45a',
            text: 'The End — A Magical Wish Granted!',
            textEs: 'Fin — ¡Un Deseo Mágico Concedido!',
            textPtBR: 'Fim — Um Desejo Mágico Realizado!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '45b',
            text: 'Explore more of the forest first',
            textEs: 'Explorar más del bosque primero',
            textPtBR: 'Explorar mais da floresta primeiro',
            nextPage: 30,
          },
          {
            id: '45c',
            text: 'Ask for a different wish',
            textEs: 'Pedir un deseo diferente',
            textPtBR: 'Pedir um desejo diferente',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Captain Comet and the Space Potato',
    titleEs: 'El Capitán Cometa y la Papa Espacial',
    titlePtBR: 'Capitão Cometa e a Batata Espacial',
    description:
      'Captain Comet and her robot friend BEEP-7 must solve the mystery of a giant dancing potato that appeared near Jupiter.',
    descriptionEs:
      'La Capitán Cometa y su amigo robot BEEP-7 deben resolver el misterio de una papa gigante bailando cerca de Júpiter.',
    descriptionPtBR:
      'Capitão Cometa e seu amigo robô BEEP-7 devem resolver o mistério de uma batata gigante dançando perto de Júpiter.',
    theme: 'science',
    characters: ['Captain Comet', 'BEEP-7', 'Professor Nebula'],
    ageMin: 7,
    ageMax: 11,
    totalPages: 52,
    readingLevel: 'intermediate',
    coverImage: 'https://picsum.photos/seed/space-potato/400/600',
    emoji: '🚀',
    isNew: true,
    downloadSizeMB: 10,
    pages: [
      {
        pageNumber: 1,
        text: 'Captain Comet was zooming past Saturn when BEEP-7 beeped urgently. On the radar: a giant potato-shaped asteroid — and it was DANCING. "That is scientifically impossible!" said Comet.',
        textEs:
          'La Capitán Cometa estaba zumbando más allá de Saturno cuando BEEP-7 pitó urgentemente. En el radar: un asteroide gigante con forma de papa — ¡y estaba BAILANDO! "¡Eso es científicamente imposible!", dijo Comet.',
        textPtBR:
          'Capitão Cometa estava passando por Saturno quando BEEP-7 apitou urgentemente. No radar: um asteroide gigante em forma de batata — e estava DANÇANDO. "Isso é cientificamente impossível!", disse Comet.',
        backgroundImage: 'https://picsum.photos/seed/s3p1/800/1200',
        emoji: '🥔',
        choices: [
          {
            id: '1a',
            text: 'Fly closer to investigate',
            textEs: 'Volar más cerca para investigar',
            textPtBR: 'Voar mais perto para investigar',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Call Professor Nebula for advice',
            textEs: 'Llamar al Profesor Nebulosa para pedir consejo',
            textPtBR: 'Ligar para o Professor Nebula para pedir conselho',
            nextPage: 15,
          },
          {
            id: '1c',
            text: 'Report it and continue your mission',
            textEs: 'Reportarlo y continuar tu misión',
            textPtBR: 'Reportar e continuar sua missão',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'Up close, the potato was enormous — bigger than a school bus! Tiny aliens with purple hair were bouncing on its surface, making it wiggle. They waved at Captain Comet!',
        textEs:
          'De cerca, la papa era enorme — ¡más grande que un autobús escolar! Pequeños alienígenas con pelo morado rebotaban en su superficie, haciéndola moverse. ¡Le saludaron a la Capitán Cometa!',
        textPtBR:
          'De perto, a batata era enorme — maior que um ônibus escolar! Pequenos alienígenas de cabelo roxo estavam saltando em sua superfície, fazendo-a balançar. Eles acenaram para Capitão Comet!',
        backgroundImage: 'https://picsum.photos/seed/s3p2/800/1200',
        emoji: '👽',
        choices: [
          {
            id: '2a',
            text: 'Wave back and try to communicate',
            textEs: 'Saludar de vuelta e intentar comunicarse',
            textPtBR: 'Acenar de volta e tentar se comunicar',
            nextPage: 30,
          },
          {
            id: '2b',
            text: 'Scan the potato with BEEP-7',
            textEs: 'Escanear la papa con BEEP-7',
            textPtBR: 'Escanear a batata com BEEP-7',
            nextPage: 40,
          },
          {
            id: '2c',
            text: 'Fly away — aliens are scary!',
            textEs: '¡Salir volando — los aliens dan miedo!',
            textPtBR: 'Voar para longe — aliens dão medo!',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 30,
        text: 'The aliens\' translator beeped on: "We lost our home planet\'s gravity recipe! Without it, everything floats and dances. Can you help us find it?" BEEP-7 pulled up the math: it was a gravity formula problem!',
        textEs:
          'El traductor de los alienígenas pitó: "¡Perdimos la receta de gravedad de nuestro planeta! Sin ella, todo flota y baila. ¿Puedes ayudarnos a encontrarla?" BEEP-7 sacó las matemáticas: ¡era un problema de fórmula de gravedad!',
        textPtBR:
          'O tradutor dos alienígenas apitou: "Perdemos a receita de gravidade do nosso planeta! Sem ela, tudo flutua e dança. Você pode nos ajudar a encontrá-la?" BEEP-7 puxou a matemática: era um problema de fórmula de gravidade!',
        backgroundImage: 'https://picsum.photos/seed/s3p30/800/1200',
        emoji: '🔬',
        choices: [
          {
            id: '30a',
            text: 'Help solve the gravity formula',
            textEs: 'Ayudar a resolver la fórmula de gravedad',
            textPtBR: 'Ajudar a resolver a fórmula de gravidade',
            nextPage: 45,
          },
          {
            id: '30b',
            text: 'Ask Professor Nebula to help',
            textEs: 'Pedir al Profesor Nebulosa que ayude',
            textPtBR: 'Pedir ao Professor Nebula que ajude',
            nextPage: 40,
          },
          {
            id: '30c',
            text: 'Tell them you are not good at math',
            textEs: 'Decirles que no eres bueno en matemáticas',
            textPtBR: 'Dizer que não é bom em matemática',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 40,
        text: 'Professor Nebula appeared on screen, adjusting his enormous glasses. "Fascinating! A displaced gravitational constant! The solution is right here — multiply the mass by the wobble factor!" BEEP-7 calculated instantly.',
        textEs:
          'El Profesor Nebulosa apareció en pantalla, ajustando sus enormes gafas. "¡Fascinante! ¡Una constante gravitacional desplazada! ¡La solución está aquí — multiplica la masa por el factor de tambaleo!" BEEP-7 calculó instantáneamente.',
        textPtBR:
          'O Professor Nebula apareceu na tela, ajustando seus enormes óculos. "Fascinante! Uma constante gravitacional deslocada! A solução está aqui — multiplique a massa pelo fator de balançamento!" BEEP-7 calculou instantaneamente.',
        backgroundImage: 'https://picsum.photos/seed/s3p40/800/1200',
        emoji: '🧮',
        choices: [
          {
            id: '40a',
            text: 'Input the solution into the alien machine',
            textEs: 'Ingresar la solución en la máquina alienígena',
            textPtBR: 'Inserir a solução na máquina alienígena',
            nextPage: 45,
          },
          {
            id: '40b',
            text: 'Double-check the math first',
            textEs: 'Verificar las matemáticas primero',
            textPtBR: 'Verificar a matemática primeiro',
            nextPage: 45,
          },
          {
            id: '40c',
            text: 'Worry the solution might not work',
            textEs: 'Preocuparse de que la solución no funcione',
            textPtBR: 'Preocupar-se que a solução pode não funcionar',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 45,
        text: 'BEEP-7 beamed the formula to the alien device. There was a deep BOOM — and suddenly everything stopped floating! The aliens cheered, the potato settled, and gravity was restored. "You saved our world!" they said.',
        textEs:
          'BEEP-7 envió la fórmula al dispositivo alienígena. Hubo un BOOM profundo — ¡y de repente todo dejó de flotar! Los alienígenas vitorearon, la papa se asentó y la gravedad fue restaurada. "¡Salvaron nuestro mundo!", dijeron.',
        textPtBR:
          'BEEP-7 transmitiu a fórmula para o dispositivo alienígena. Houve um BOOM profundo — e de repente tudo parou de flutuar! Os alienígenas vibraram, a batata se assentou e a gravidade foi restaurada. "Vocês salvaram nosso mundo!", disseram.',
        backgroundImage: 'https://picsum.photos/seed/s3p45/800/1200',
        emoji: '🎉',
        choices: [
          {
            id: '45a',
            text: 'The End — Science Saves the Day!',
            textEs: '¡Fin — La Ciencia Salva el Día!',
            textPtBR: 'Fim — A Ciência Salva o Dia!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '45b',
            text: 'Accept an invitation to visit the alien planet',
            textEs: 'Aceptar una invitación para visitar el planeta alienígena',
            textPtBR: 'Aceitar um convite para visitar o planeta alienígena',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '45c',
            text: 'Go back and explore the potato more',
            textEs: 'Regresar y explorar más la papa',
            textPtBR: 'Voltar e explorar mais a batata',
            nextPage: 2,
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'The Turtle Who Forgot to Be Slow',
    titleEs: 'La Tortuga Que Olvidó Ser Lenta',
    titlePtBR: 'A Tartaruga Que Esqueceu de Ser Devagar',
    description:
      'Tessa the turtle wakes up one day running faster than a cheetah! But is being the fastest really what she wanted?',
    descriptionEs:
      'Tessa la tortuga se despierta un día corriendo más rápido que un guepardo. ¡Pero ser la más rápida es realmente lo que quería?',
    descriptionPtBR:
      'Tessa a tartaruga acorda um dia correndo mais rápido que um guepardo! Mas ser a mais rápida é realmente o que ela queria?',
    theme: 'nature',
    characters: ['Tessa', 'Cheetah Charlie', 'Wise Elephant'],
    ageMin: 7,
    ageMax: 7,
    totalPages: 36,
    readingLevel: 'beginner',
    coverImage: 'https://picsum.photos/seed/turtle-race/400/600',
    emoji: '🐢',
    downloadSizeMB: 7,
    pages: [
      {
        pageNumber: 1,
        text: 'Tessa the turtle always wished she could run faster. One morning she woke up and — ZOOM! She was faster than the wind! All the animals stared in amazement.',
        textEs:
          'Tessa la tortuga siempre quiso correr más rápido. Una mañana se despertó y — ¡ZOOM! ¡Era más rápida que el viento! Todos los animales la miraron asombrados.',
        textPtBR:
          'Tessa a tartaruga sempre quis correr mais rápido. Uma manhã ela acordou e — ZOOM! Ela era mais rápida que o vento! Todos os animais olharam em espanto.',
        backgroundImage: 'https://picsum.photos/seed/s4p1/800/1200',
        emoji: '💨',
        choices: [
          {
            id: '1a',
            text: 'Challenge Cheetah Charlie to a race',
            textEs: 'Desafiar a Cheetah Charlie a una carrera',
            textPtBR: 'Desafiar Guepardo Charlie para uma corrida',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Ask Wise Elephant what happened',
            textEs: 'Preguntarle al Sabio Elefante qué pasó',
            textPtBR: 'Perguntar ao Elefante Sábio o que aconteceu',
            nextPage: 20,
          },
          {
            id: '1c',
            text: 'Enjoy being fast and forget about it',
            textEs: 'Disfrutar siendo rápida y olvidarse de todo',
            textPtBR: 'Aproveitar ser rápida e esquecer tudo',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'Tessa beat Cheetah Charlie easily! But Charlie looked sad. "I used to love running because I was the best," he said. "Now I feel like I lost my gift." Tessa felt a lump in her throat.',
        textEs:
          'Tessa venció fácilmente a Cheetah Charlie. Pero Charlie parecía triste. "Antes amaba correr porque era el mejor", dijo. "Ahora siento que perdí mi don." Tessa sintió un nudo en la garganta.',
        textPtBR:
          'Tessa venceu Guepardo Charlie facilmente! Mas Charlie parecia triste. "Eu costumava amar correr porque era o melhor", disse ele. "Agora sinto que perdi meu dom." Tessa sentiu um nó na garganta.',
        backgroundImage: 'https://picsum.photos/seed/s4p2/800/1200',
        emoji: '😢',
        choices: [
          {
            id: '2a',
            text: 'Apologize and give the speed back',
            textEs: 'Disculparse y devolver la velocidad',
            textPtBR: 'Pedir desculpas e devolver a velocidade',
            nextPage: 30,
          },
          {
            id: '2b',
            text: 'Ask Wise Elephant for help',
            textEs: 'Pedir ayuda al Sabio Elefante',
            textPtBR: 'Pedir ajuda ao Elefante Sábio',
            nextPage: 20,
          },
          {
            id: '2c',
            text: 'Keep the speed — it feels great!',
            textEs: '¡Quedarse con la velocidad — se siente genial!',
            textPtBR: 'Ficar com a velocidade — parece ótimo!',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 20,
        text: 'Wise Elephant remembered: "Last night a falling star landed in your shell! It granted your deepest wish. But remember, Tessa — a gift shared is twice the gift." Tessa thought hard.',
        textEs:
          'El Sabio Elefante recordó: "¡Anoche una estrella fugaz aterrizó en tu caparazón! Concedió tu deseo más profundo. Pero recuerda, Tessa — un don compartido vale el doble." Tessa pensó mucho.',
        textPtBR:
          'O Elefante Sábio se lembrou: "Ontem à noite uma estrela cadente pousou em seu casco! Ela concedeu seu desejo mais profundo. Mas lembre-se, Tessa — um dom compartilhado vale o dobro." Tessa pensou muito.',
        backgroundImage: 'https://picsum.photos/seed/s4p20/800/1200',
        emoji: '⭐',
        choices: [
          {
            id: '20a',
            text: 'Share the star\'s gift with Charlie',
            textEs: 'Compartir el don de la estrella con Charlie',
            textPtBR: 'Compartilhar o dom da estrela com Charlie',
            nextPage: 30,
          },
          {
            id: '20b',
            text: 'Keep the gift and teach others to be fast',
            textEs: 'Guardar el don y enseñar a otros a ser rápidos',
            textPtBR: 'Guardar o dom e ensinar outros a ser rápidos',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '20c',
            text: 'Ask the star to take the gift back',
            textEs: 'Pedirle a la estrella que tome el don de vuelta',
            textPtBR: 'Pedir à estrella que tire o dom de volta',
            nextPage: 30,
          },
        ],
      },
      {
        pageNumber: 30,
        text: 'Tessa held the star shard toward the sky. "I want to share this with my friend," she said. The star glowed and split into two — one for Tessa and one for Charlie. Now both could run fast, but they chose to take turns!',
        textEs:
          'Tessa sostuvo el fragmento de estrella hacia el cielo. "Quiero compartir esto con mi amigo", dijo. La estrella brilló y se dividió en dos — uno para Tessa y otro para Charlie. ¡Ahora ambos podían correr rápido, pero eligieron turnarse!',
        textPtBR:
          'Tessa segurou o fragmento de estrela em direção ao céu. "Quero compartilhar isso com meu amigo", disse ela. A estrela brilhou e se dividiu em dois — um para Tessa e um para Charlie. Agora ambos podiam correr rápido, mas escolheram se revezar!',
        backgroundImage: 'https://picsum.photos/seed/s4p30/800/1200',
        emoji: '🌟',
        choices: [
          {
            id: '30a',
            text: 'The End — Friendship Wins!',
            textEs: 'Fin — ¡La Amistad Gana!',
            textPtBR: 'Fim — A Amizade Vence!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '30b',
            text: 'Organize a forest race for everyone',
            textEs: 'Organizar una carrera en el bosque para todos',
            textPtBR: 'Organizar uma corrida na floresta para todos',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '30c',
            text: 'Go back and try different choices',
            textEs: 'Regresar e intentar diferentes opciones',
            textPtBR: 'Voltar e tentar escolhas diferentes',
            nextPage: 1,
          },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'The Invisible Detective',
    titleEs: 'El Detective Invisible',
    titlePtBR: 'O Detetive Invisível',
    description:
      'Max wakes up one day to find he has turned invisible. He must solve who stole the school\'s trophy before anyone finds out his secret.',
    descriptionEs:
      'Max se despierta un día y descubre que se ha vuelto invisible. Debe resolver quién robó el trofeo de la escuela antes de que alguien descubra su secreto.',
    descriptionPtBR:
      'Max acorda um dia e descobre que ficou invisível. Ele deve descobrir quem roubou o troféu da escola antes que alguém descubra seu segredo.',
    theme: 'mystery',
    characters: ['Max', 'Detective Rosa', 'Principal Webb'],
    ageMin: 7,
    ageMax: 12,
    totalPages: 55,
    readingLevel: 'advanced',
    coverImage: 'https://picsum.photos/seed/invisible-detective/400/600',
    emoji: '🔍',
    downloadSizeMB: 11,
    pages: [
      {
        pageNumber: 1,
        text: 'Max looked in the mirror — and saw nothing! He was completely invisible. At school, he found the trophy case shattered and the championship cup gone. "Only I can solve this without being seen," he thought.',
        textEs:
          'Max miró al espejo — ¡y no vio nada! Era completamente invisible. En la escuela, encontró la vitrina del trofeo destrozada y la copa del campeonato desaparecida. "Solo yo puedo resolver esto sin ser visto", pensó.',
        textPtBR:
          'Max olhou no espelho — e não viu nada! Ele estava completamente invisível. Na escola, encontrou a vitrine do troféu destruída e a taça do campeonato desaparecida. "Só eu posso resolver isso sem ser visto", pensou.',
        backgroundImage: 'https://picsum.photos/seed/s5p1/800/1200',
        emoji: '👻',
        choices: [
          {
            id: '1a',
            text: 'Sneak into the principal\'s office for clues',
            textEs: 'Infiltrarse en la oficina del director en busca de pistas',
            textPtBR: 'Entrar furtivamente no escritório do diretor em busca de pistas',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Follow the suspicious janitor',
            textEs: 'Seguir al sospechoso conserje',
            textPtBR: 'Seguir o zelador suspeito',
            nextPage: 20,
          },
          {
            id: '1c',
            text: 'Tell Detective Rosa about the trophy',
            textEs: 'Contarle a la Detctive Rosa sobre el trofeo',
            textPtBR: 'Contar à Detetive Rosa sobre o troféu',
            nextPage: 35,
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'In Principal Webb\'s office, Max found a sticky note: "Meet me at the gym storage at 3pm — bring the trophy." The handwriting matched the substitute teacher\'s. Max had his first lead!',
        textEs:
          'En la oficina del Director Webb, Max encontró una nota adhesiva: "Encuéntrame en el almacén del gimnasio a las 3pm — trae el trofeo." La caligrafía coincidía con la del maestro suplente. ¡Max tenía su primera pista!',
        textPtBR:
          'No escritório do Diretor Webb, Max encontrou um bilhete: "Me encontre no depósito da academia às 15h — traga o troféu." A caligrafia combinava com a do professor substituto. Max tinha sua primeira pista!',
        backgroundImage: 'https://picsum.photos/seed/s5p2/800/1200',
        emoji: '📝',
        choices: [
          {
            id: '2a',
            text: 'Stake out the gym storage room',
            textEs: 'Vigilar el almacén del gimnasio',
            textPtBR: 'Vigiar o depósito da academia',
            nextPage: 40,
          },
          {
            id: '2b',
            text: 'Find the substitute teacher now',
            textEs: 'Encontrar al maestro suplente ahora',
            textPtBR: 'Encontrar o professor substituto agora',
            nextPage: 35,
          },
          {
            id: '2c',
            text: 'Leave the note and think more',
            textEs: 'Dejar la nota y pensar más',
            textPtBR: 'Deixar o bilhete e pensar mais',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 35,
        text: 'Detective Rosa was suspicious of the new art teacher who had been asking questions about the trophy. "Her name is on the trophy list — from 20 years ago," Rosa explained. "She thinks the trophy was stolen from her school!"',
        textEs:
          'La Detective Rosa sospechaba del nuevo maestro de arte que hacía preguntas sobre el trofeo. "Su nombre está en la lista del trofeo — de hace 20 años", explicó Rosa. "¡Ella cree que el trofeo fue robado de su escuela!"',
        textPtBR:
          'A Detetive Rosa suspeitava da nova professora de arte que estava fazendo perguntas sobre o troféu. "O nome dela está na lista do troféu — de 20 anos atrás", Rosa explicou. "Ela acha que o troféu foi roubado da escola dela!"',
        backgroundImage: 'https://picsum.photos/seed/s5p35/800/1200',
        emoji: '🎨',
        choices: [
          {
            id: '35a',
            text: 'Find the art teacher and ask the truth',
            textEs: 'Encontrar a la maestra de arte y pedir la verdad',
            textPtBR: 'Encontrar a professora de arte e pedir a verdade',
            nextPage: 40,
          },
          {
            id: '35b',
            text: 'Check the school records with Rosa',
            textEs: 'Revisar los registros de la escuela con Rosa',
            textPtBR: 'Verificar os registros da escola com Rosa',
            nextPage: 40,
          },
          {
            id: '35c',
            text: 'This is too complicated — give up',
            textEs: 'Esto es demasiado complicado — rendirse',
            textPtBR: 'Isso é complicado demais — desistir',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
      {
        pageNumber: 40,
        text: 'The records showed the trophy was won fairly — but by both schools! It was supposed to be shared but got lost in a move 20 years ago. The art teacher just wanted it back for her school\'s display. It was a misunderstanding!',
        textEs:
          'Los registros mostraban que el trofeo fue ganado justamente — ¡pero por ambas escuelas! Se suponía que debían compartirlo, pero se perdió en una mudanza hace 20 años. La maestra de arte solo quería recuperarlo para la exhibición de su escuela. ¡Fue un malentendido!',
        textPtBR:
          'Os registros mostraram que o troféu foi ganho justamente — mas por ambas as escolas! Deveria ser compartilhado, mas se perdeu em uma mudança 20 anos atrás. A professora de arte só queria recuperá-lo para a exposição de sua escola. Foi um mal-entendido!',
        backgroundImage: 'https://picsum.photos/seed/s5p40/800/1200',
        emoji: '🤝',
        choices: [
          {
            id: '40a',
            text: 'Help both schools share the trophy',
            textEs: 'Ayudar a ambas escuelas a compartir el trofeo',
            textPtBR: 'Ajudar ambas as escolas a compartilhar o troféu',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '40b',
            text: 'Ask Principal Webb to make a copy',
            textEs: 'Pedirle al Director Webb que haga una copia',
            textPtBR: 'Pedir ao Diretor Webb que faça uma cópia',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '40c',
            text: 'Let the adults figure it out',
            textEs: 'Dejar que los adultos lo resuelvan',
            textPtBR: 'Deixar os adultos resolverem',
            nextPage: null,
            endingType: 'bad',
          },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'The Fox and the Lost Song',
    titleEs: 'El Zorro y la Canción Perdida',
    titlePtBR: 'A Raposa e a Música Perdida',
    description:
      'A clever fox must recover the magical song stolen by a mischievous crow before the forest loses its music forever.',
    descriptionEs:
      'Una astuta zorra debe recuperar la canción mágica robada por un cuervo travieso antes de que el bosque pierda su música para siempre.',
    descriptionPtBR:
      'Uma raposa esperta deve recuperar a música mágica roubada por um corvo travesso antes que a floresta perca sua música para sempre.',
    theme: 'fables',
    characters: ['Fox', 'Crow', 'The Forest Orchestra'],
    ageMin: 7,
    ageMax: 9,
    totalPages: 40,
    readingLevel: 'beginner',
    coverImage: 'https://picsum.photos/seed/fox-song/400/600',
    emoji: '🦊',
    downloadSizeMB: 8,
    pages: [
      {
        pageNumber: 1,
        text: 'Every morning the forest rang with the magical First Song. But one day — silence. Crow had stolen the notes and hidden them in his nest at the top of the Tall Oak. "I want all the music for myself!" he cawed.',
        textEs:
          'Cada mañana el bosque resonaba con la mágica Primera Canción. Pero un día — silencio. El Cuervo había robado las notas y las había escondido en su nido en lo alto del Gran Roble. "¡Quiero toda la música para mí!" graznó.',
        textPtBR:
          'Toda manhã a floresta ecoava com a mágica Primeira Música. Mas um dia — silêncio. O Corvo tinha roubado as notas e as escondido em seu ninho no topo do Grande Carvalho. "Quero toda a música para mim!" ele grasnou.',
        backgroundImage: 'https://picsum.photos/seed/s6p1/800/1200',
        emoji: '🎵',
        choices: [
          {
            id: '1a',
            text: 'Trick Crow with a clever riddle',
            textEs: 'Engañar al Cuervo con un acertijo inteligente',
            textPtBR: 'Enganar o Corvo com um enigma esperto',
            nextPage: 2,
          },
          {
            id: '1b',
            text: 'Climb the Tall Oak and take back the notes',
            textEs: 'Escalar el Gran Roble y recuperar las notas',
            textPtBR: 'Escalar o Grande Carvalho e recuperar as notas',
            nextPage: 20,
          },
          {
            id: '1c',
            text: 'Ask Crow to share the music',
            textEs: 'Pedirle al Cuervo que comparta la música',
            textPtBR: 'Pedir ao Corvo que compartilhe a música',
            nextPage: 30,
          },
        ],
      },
      {
        pageNumber: 2,
        text: 'Fox approached Crow with a glittering stone. "I have found something even more valuable than music," said Fox. "A stone that grants three wishes!" Crow\'s eyes lit up — he dropped one note to grab the stone!',
        textEs:
          'El Zorro se acercó al Cuervo con una piedra brillante. "Encontré algo aún más valioso que la música", dijo el Zorro. "¡Una piedra que concede tres deseos!" Los ojos del Cuervo se iluminaron — ¡soltó una nota para agarrar la piedra!',
        textPtBR:
          'A Raposa se aproximou do Corvo com uma pedra brilhante. "Encontrei algo ainda mais valioso que música", disse a Raposa. "Uma pedra que concede três desejos!" Os olhos do Corvo brilharam — ele soltou uma nota para pegar a pedra!',
        backgroundImage: 'https://picsum.photos/seed/s6p2/800/1200',
        emoji: '💎',
        choices: [
          {
            id: '2a',
            text: 'Use a bigger trick to get all the notes',
            textEs: 'Usar un truco más grande para obtener todas las notas',
            textPtBR: 'Usar um truque maior para pegar todas as notas',
            nextPage: 30,
          },
          {
            id: '2b',
            text: 'Grab the fallen note and run',
            textEs: 'Agarrar la nota caída y correr',
            textPtBR: 'Pegar a nota caída e correr',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '2c',
            text: 'Tell the truth to Crow',
            textEs: 'Decirle la verdad al Cuervo',
            textPtBR: 'Dizer a verdade ao Corvo',
            nextPage: 30,
          },
        ],
      },
      {
        pageNumber: 20,
        text: 'Fox climbed and climbed. Near the top she found a note caught on a branch — but Crow was watching. "What are you doing?" he cawed. "The music belongs to everyone," Fox said firmly. Crow paused, thinking.',
        textEs:
          'La Zorra escaló y escaló. Cerca de la cima encontró una nota atrapada en una rama — pero el Cuervo estaba observando. "¿Qué estás haciendo?" graznó. "La música pertenece a todos", dijo el Zorro firmemente. El Cuervo se detuvo, pensando.',
        textPtBR:
          'A Raposa subiu e subiu. Perto do topo encontrou uma nota presa em um galho — mas o Corvo estava observando. "O que você está fazendo?" ele grasnou. "A música pertence a todos", disse a Raposa firmemente. O Corvo pausou, pensando.',
        backgroundImage: 'https://picsum.photos/seed/s6p20/800/1200',
        emoji: '🌿',
        choices: [
          {
            id: '20a',
            text: 'Convince Crow to give back the notes',
            textEs: 'Convencer al Cuervo de devolver las notas',
            textPtBR: 'Convencer o Corvo a devolver as notas',
            nextPage: 35,
          },
          {
            id: '20b',
            text: 'Grab all notes you can reach',
            textEs: 'Agarrar todas las notas que puedas alcanzar',
            textPtBR: 'Pegar todas as notas que você conseguir alcançar',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '20c',
            text: 'Let go and fall safely',
            textEs: 'Soltarse y caer de manera segura',
            textPtBR: 'Soltar e cair com segurança',
            nextPage: 30,
          },
        ],
      },
      {
        pageNumber: 30,
        text: '"What if," Fox said gently, "you could be the conductor of the music instead of hiding it? Every bird would play YOUR song." Crow\'s eyes widened. Being the conductor sounded much better than hoarding notes alone!',
        textEs:
          '"¿Qué tal", dijo el Zorro gentilmente, "si pudieras ser el director de la música en lugar de esconderla? Cada pájaro tocaría TU canción." Los ojos del Cuervo se abrieron. ¡Ser director sonaba mucho mejor que acumular notas solo!',
        textPtBR:
          '"E se", disse a Raposa gentilmente, "você pudesse ser o maestro da música em vez de escondê-la? Cada pássaro tocaria SUA música." Os olhos do Corvo se arregalaram. Ser maestro soava muito melhor do que guardar as notas sozinho!',
        backgroundImage: 'https://picsum.photos/seed/s6p30/800/1200',
        emoji: '🎶',
        choices: [
          {
            id: '30a',
            text: 'Crow returns the notes and becomes conductor',
            textEs: 'El Cuervo devuelve las notas y se convierte en director',
            textPtBR: 'O Corvo devolve as notas e vira maestro',
            nextPage: 35,
          },
          {
            id: '30b',
            text: 'Crow keeps the notes after all',
            textEs: 'El Cuervo se queda con las notas de todas formas',
            textPtBR: 'O Corvo fica com as notas mesmo assim',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '30c',
            text: 'Fox sings the first note herself',
            textEs: 'El Zorro canta la primera nota ella misma',
            textPtBR: 'A Raposa canta a primeira nota ela mesma',
            nextPage: 35,
          },
        ],
      },
      {
        pageNumber: 35,
        text: 'Crow descended from the tree and spread his wings. All the forest animals gathered. He raised a wing — and the most beautiful music filled the forest. From that day on, Crow was the happiest, most celebrated conductor in the land.',
        textEs:
          'El Cuervo descendió del árbol y extendió sus alas. Todos los animales del bosque se reunieron. Levantó un ala — y la música más bella llenó el bosque. Desde ese día, el Cuervo fue el director más feliz y celebrado del país.',
        textPtBR:
          'O Corvo desceu da árvore e abriu suas asas. Todos os animais da floresta se reuniram. Ele levantou uma asa — e a música mais bela encheu a floresta. Desde aquele dia, o Corvo foi o maestro mais feliz e celebrado da terra.',
        backgroundImage: 'https://picsum.photos/seed/s6p35/800/1200',
        emoji: '🎼',
        choices: [
          {
            id: '35a',
            text: 'The End — The Music Lives On!',
            textEs: 'Fin — ¡La Música Vive!',
            textPtBR: 'Fim — A Música Continua!',
            nextPage: null,
            endingType: 'good',
          },
          {
            id: '35b',
            text: 'Join the orchestra as a flute player',
            textEs: 'Unirse a la orquesta como flautista',
            textPtBR: 'Juntar-se à orquestra como flautista',
            nextPage: null,
            endingType: 'bad',
          },
          {
            id: '35c',
            text: 'Go back and try a different approach',
            textEs: 'Regresar e intentar un enfoque diferente',
            textPtBR: 'Voltar e tentar uma abordagem diferente',
            nextPage: 1,
          },
        ],
      },
    ],
  },
];

export const getStoriesByTheme = (theme: StoryTheme) =>
  MOCK_STORIES.filter((s) => s.theme === theme);

export const getFeaturedStory = () =>
  MOCK_STORIES.find((s) => s.isFeatured) ?? MOCK_STORIES[0];

export const getRecommendedStories = () => MOCK_STORIES.slice(0, 4);

export const getNewStories = () => MOCK_STORIES.filter((s) => s.isNew);

export const getStoryById = (id: string) =>
  MOCK_STORIES.find((s) => s.id === id);

export const STORY_THEMES: StoryTheme[] = [
  'adventure',
  'fantasy',
  'science',
  'nature',
  'mystery',
  'fables',
];

export const THEME_EMOJIS: Record<StoryTheme, string> = {
  adventure: '⚔️',
  fantasy: '🧙',
  science: '🔬',
  nature: '🌿',
  mystery: '🔍',
  fables: '📖',
};

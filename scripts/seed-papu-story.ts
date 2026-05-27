import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../apps/mobile/.env') });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY in apps/mobile/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Story data — "O Despertar na Oca"
// Page numbering:
//   Intermediate pages : 1–10
//   Ending pages       : 101–110  (isEnding: true, choices: [])
// ---------------------------------------------------------------------------

const story = {
  slug: 'o-despertar-na-oca',
  title: 'The Awakening in the Hut',
  title_es: 'El Despertar en la Cabaña',
  title_pt_br: 'O Despertar na Oca',
  description:
    'Papu the yellow caiman wakes up in a strange place — an indigenous hut in the Amazon. A new adventure with 10 possible endings awaits.',
  description_es:
    'Papu, el caimán amarillo, despierta en un lugar extraño: una cabaña indígena en el Amazonas. Una nueva aventura con 10 finales posibles lo espera.',
  description_pt_br:
    'Papu, o jacaré amarelo, acorda em um lugar estranho — uma oca indígena na Amazônia. Uma nova aventura com 10 finais possíveis o espera.',
  theme: 'adventure',
  characters: ['Papu', 'Família Indígena', 'Boto Rosa', 'Capivara', 'Anaconda'],
  age_min: 7,
  age_max: 10,
  total_pages: 20,
  reading_level: 'beginner',
  cover_image: null,
  emoji: '🐊',
  is_new: true,
  is_featured: false,
  download_size_mb: 0,
  pages: [
    // -------------------------------------------------------------------------
    // INTERMEDIATE PAGES
    // -------------------------------------------------------------------------
    {
      pageNumber: 1,
      text: "Papu opened his eyes. A thatched roof, colorful hammocks, feathers on the wall. This wasn't his Amazon. Or was it?",
      textEs: 'Papu abrió los ojos. Techo de paja, hamacas coloridas, plumas en la pared. Eso no era su Amazonia. ¿O sí?',
      textPtBR: 'Papu abriu os olhos. Teto de palha, redes coloridas, penas na parede. Isso não era a Amazônia dele. Ou era?',
      emoji: '😴',
      choices: [
        {
          id: '1a',
          text: 'Close your eyes and sleep again',
          textEs: 'Cerrar los ojos y dormir de nuevo',
          textPtBR: 'Fechar os olhos e dormir de novo',
          nextPage: 105,

        },
        {
          id: '1b',
          text: 'Explore slowly',
          textEs: 'Explorar despacio',
          textPtBR: 'Explorar devagar',
          nextPage: 2,

        },
        {
          id: '1c',
          text: "Shout: 'Is anyone there?!'",
          textEs: '¡Gritar: "¡Hay alguien ahí?!"',
          textPtBR: "Gritar: 'Tem alguém aí?!'",
          nextPage: 2,

        },
      ],
    },
    {
      pageNumber: 2,
      text: '"AHHH! A YELLOW CAIMAN!" The child screamed. Dad. Mom. Grandma. Everyone staring. Papu gulped.',
      textEs: '"¡UN CAIMÁN AMARILLO!" El niño gritó. El papá. La mamá. La abuela. Todos mirando. Papu tragó saliva.',
      textPtBR: '"AI! UM JACARÉ AMARELO!" A criança gritou. O pai. A mãe. A avó. Todos ali, de boca aberta. Papu engoliu seco.',
      emoji: '😱',
      choices: [
        {
          id: '2a',
          text: "Smile and say: 'Hi! I'm Papu!'",
          textEs: "Sonreír y decir: '¡Hola! Soy Papu'",
          textPtBR: "Sorrir e dizer: 'Oi! Sou o Papu!'",
          nextPage: 3,

        },
        {
          id: '2b',
          text: 'Start dancing',
          textEs: 'Ponerse a bailar',
          textPtBR: 'Começar a dançar',
          nextPage: 4,

        },
        {
          id: '2c',
          text: 'Run to the forest!',
          textEs: '¡Correr al bosque!',
          textPtBR: 'Correr pra floresta!',
          nextPage: 5,

        },
      ],
    },
    {
      pageNumber: 3,
      text: "The child giggled. Grandma spoke in Tupi. Dad lowered his bow. Mom pointed at the pot. It was an invitation.",
      textEs: 'El niño se rió. La abuela habló en tupí. El papá bajó el arco. La mamá señaló la olla. Era una invitación.',
      textPtBR: 'A criança riu. A avó falou em tupi. O pai abaixou o arco. A mãe apontou pra panela. Era um convite.',
      emoji: '🤝',
      choices: [
        {
          id: '3a',
          text: 'Help in the kitchen',
          textEs: 'Ayudar en la cocina',
          textPtBR: 'Ajudar na cozinha',
          nextPage: 6,

        },
        {
          id: '3b',
          text: 'Eat A LOT and take a nap',
          textEs: 'Comer MUCHO y echar una siesta',
          textPtBR: 'Comer MUITO e tirar uma soneca',
          nextPage: 109,
          endingType: 'good',
        },
        {
          id: '3c',
          text: 'Sit down and tell stories',
          textEs: 'Sentarse y contar historias',
          textPtBR: 'Sentar e contar histórias',
          nextPage: 7,

        },
      ],
    },
    {
      pageNumber: 4,
      text: 'Tail capoeira. Toucan impression. Golden spins. In seconds, the whole tribe was there applauding.',
      textEs: 'Capoeira con la cola. Imitación de tucán. Giros dorados. En segundos, toda la tribu estaba aplaudiendo.',
      textPtBR: 'Capoeira com a cauda. Imitação de tucano. Rodopios de ouro. Em segundos, a tribo inteira estava ali aplaudindo.',
      emoji: '🕺',
      choices: [
        {
          id: '4a',
          text: "The shaman stood up: 'You are our chief!'",
          textEs: "El chamán se levantó: '¡Eres nuestro jefe!'",
          textPtBR: "O pajé se levantou: 'Você é nosso chefe!'",
          nextPage: 108,
          endingType: 'good',
        },
        {
          id: '4b',
          text: 'The video went viral. A film producer called.',
          textEs: 'El video se viralizó. Un productor de cine llamó.',
          textPtBR: 'O vídeo viralizou. Um produtor de cinema ligou.',
          nextPage: 103,
          endingType: 'good',
        },
        {
          id: '4c',
          text: 'Go find inspiration in the forest',
          textEs: 'Ir a buscar inspiración al bosque',
          textPtBR: 'Ir buscar inspiração na floresta',
          nextPage: 5,

        },
      ],
    },
    {
      pageNumber: 5,
      text: 'Living forest. Three paths. River to the left. Dense jungle ahead. Mossy trail to the right.',
      textEs: 'Bosque vivo. Tres caminos. Río a la izquierda. Selva cerrada al frente. Sendero de musgo a la derecha.',
      textPtBR: 'Floresta viva. Três caminhos. Rio à esquerda. Mata fechada ao centro. Trilha de musgo à direita.',
      emoji: '🌿',
      choices: [
        {
          id: '5a',
          text: 'Go to the river',
          textEs: 'Ir al río',
          textPtBR: 'Ir para o rio',
          nextPage: 8,

        },
        {
          id: '5b',
          text: 'Enter the jungle',
          textEs: 'Entrar a la selva',
          textPtBR: 'Entrar na mata',
          nextPage: 9,

        },
        {
          id: '5c',
          text: 'Follow the mossy trail',
          textEs: 'Seguir el sendero de musgo',
          textPtBR: 'Seguir a trilha de musgo',
          nextPage: 10,

        },
      ],
    },
    {
      pageNumber: 6,
      text: 'Grandma taught Papu to stir the porridge. He leaned in to smell it... and lost his balance. The pot was right there.',
      textEs: 'La abuela enseñó a Papu a revolver el mingau. Se inclinó para olerlo... y perdió el equilibrio. La olla estaba justo ahí.',
      textPtBR: 'A avó ensinou Papu a mexer o mingau. Ele se inclinou pra sentir o cheiro... e perdeu o equilíbrio. A panela estava bem ali.',
      emoji: '🍲',
      choices: [
        {
          id: '6a',
          text: 'SPLASH! Papu fell in!',
          textEs: '¡SPLASH! ¡Papu cayó adentro!',
          textPtBR: 'SPLASH! Papu caiu dentro!',
          nextPage: 104,
          endingType: 'good',
        },
        {
          id: '6b',
          text: "Grandma caught him! 'You're family now.'",
          textEs: "¡La abuela lo agarró! 'Ya eres de la familia.'",
          textPtBR: "A avó o segurou! 'Você é da família agora.'",
          nextPage: 101,
          endingType: 'good',
        },
        {
          id: '6c',
          text: "The shaman saw it: 'He who serves, leads'",
          textEs: "El chamán vio: 'Quien sirve, lidera'",
          textPtBR: "O pajé viu: 'Quem serve, lidera'",
          nextPage: 108,
          endingType: 'good',
        },
      ],
    },
    {
      pageNumber: 7,
      text: 'Papu told of the Negro River, piranhas, starry nights. Grandma told of the curupira. Night arrived without warning.',
      textEs: 'Papu contó del río Negro, de las pirañas, de noches estrelladas. La abuela contó del curupira. La noche llegó sin avisar.',
      textPtBR: 'Papu contou do rio Negro, das piranhas, das noites estreladas. A avó contou do curupira. A noite chegou sem avisar.',
      emoji: '🌙',
      choices: [
        {
          id: '7a',
          text: "'Come visit us always, Papu!'",
          textEs: "'¡Ven a visitarnos siempre, Papu!'",
          textPtBR: "'Venha nos visitar sempre, Papu!'",
          nextPage: 101,
          endingType: 'good',
        },
        {
          id: '7b',
          text: "Shaman: 'Keeper of stories is our chief'",
          textEs: "Chamán: 'El guardián de historias es nuestro jefe'",
          textPtBR: "O pajé: 'Guardião das histórias é nosso chefe'",
          nextPage: 108,
          endingType: 'good',
        },
        {
          id: '7c',
          text: 'Eat more and sleep to the sound of the forest',
          textEs: 'Comer más y dormir con el sonido del bosque',
          textPtBR: 'Comer mais e dormir com o som da floresta',
          nextPage: 109,
          endingType: 'good',
        },
      ],
    },
    {
      pageNumber: 8,
      text: 'At the river, something pink leapt from the water. The Pink Dolphin! "Hey! Wanna explore?" Across the bank, a capybara waved.',
      textEs: 'En el río, algo rosado saltó del agua. ¡El Delfín Rosado! "¡Hola! ¿Quieres explorar?" Al otro lado, un carpincho saludó.',
      textPtBR: 'No rio, algo rosado saltou das águas. O Boto Rosa! "Oi! Quer explorar comigo?" Na outra margem, uma capivara acenou.',
      emoji: '🐬',
      choices: [
        {
          id: '8a',
          text: 'Swim with the Dolphin AND the Capybara',
          textEs: 'Nadar con el Delfín Y el Carpincho',
          textPtBR: 'Nadar com o Boto E a Capivara',
          nextPage: 102,
          endingType: 'good',
        },
        {
          id: '8b',
          text: 'Go only with the Pink Dolphin',
          textEs: 'Seguir solo con el Delfín Rosado',
          textPtBR: 'Seguir só com o Boto Rosa',
          nextPage: 106,
          endingType: 'good',
        },
        {
          id: '8c',
          text: 'Return to the hut with new friends',
          textEs: 'Volver a la cabaña con nuevos amigos',
          textPtBR: 'Voltar pra oca com novos amigos',
          nextPage: 101,
          endingType: 'good',
        },
      ],
    },
    {
      pageNumber: 9,
      text: 'A huge capybara opened one eye. "Yellow caiman. That\'s uncommon." Pause. "Want to see the real forest?"',
      textEs: 'Un inmenso carpincho abrió un ojo. "Caimán amarillo. Eso no es común." Pausa. "¿Quieres ver el bosque de verdad?"',
      textPtBR: 'Uma capivara enorme abriu um olho. "Jacaré amarelo. Isso não é comum." Pausa. "Quer ver a floresta de verdade?"',
      emoji: '🦫',
      choices: [
        {
          id: '9a',
          text: 'Call the Dolphin too!',
          textEs: '¡Llamar al Delfín también!',
          textPtBR: 'Chamar o Boto também!',
          nextPage: 102,
          endingType: 'good',
        },
        {
          id: '9b',
          text: 'Go only with the Capybara',
          textEs: 'Ir solo con el Carpincho',
          textPtBR: 'Ir só com a Capivara',
          nextPage: 107,
          endingType: 'good',
        },
        {
          id: '9c',
          text: 'Return to the hut',
          textEs: 'Volver a la cabaña',
          textPtBR: 'Voltar pra oca',
          nextPage: 101,
          endingType: 'good',
        },
      ],
    },
    {
      pageNumber: 10,
      text: 'A huge anaconda, golden patterns. She stared at Papu. "I knew you\'d come. I know this forest\'s secrets."',
      textEs: 'Una enorme anaconda, patrones dorados. Lo miró fijo. "Sabía que vendrías. Conozco los secretos de este bosque."',
      textPtBR: 'Uma anaconda enorme, padrões dourados. Ela encarou o Papu. "Eu sabia que você viria. Conheço os segredos dessa floresta."',
      emoji: '🐍',
      choices: [
        {
          id: '10a',
          text: 'Set off on an adventure with the Anaconda!',
          textEs: '¡Partir en aventura con la Anaconda!',
          textPtBR: 'Partir em aventura com a Anaconda!',
          nextPage: 110,
          endingType: 'good',
        },
        {
          id: '10b',
          text: 'Call the Dolphin and the Capybara too',
          textEs: 'Llamar al Delfín y al Carpincho también',
          textPtBR: 'Chamar o Boto e a Capivara também',
          nextPage: 102,
          endingType: 'good',
        },
        {
          id: '10c',
          text: 'Retreat... better go back to the hut',
          textEs: 'Retroceder... mejor volver a la cabaña',
          textPtBR: 'Recuar... melhor voltar pra oca',
          nextPage: 101,
          endingType: 'good',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // ENDING PAGES (101–110)
    // -------------------------------------------------------------------------
    {
      pageNumber: 101,
      text: 'Every week Papu returned. Grandma saved a yellow hammock just for him. The child waited at the door. Papu had a second family.',
      textEs: 'Cada semana Papu volvía. La abuela le guardaba una hamaca amarilla. El niño lo esperaba en la puerta. Papu tenía una segunda familia.',
      textPtBR: 'Toda semana Papu voltava. A avó já guardava uma rede amarela só pra ele. A criança o esperava na porta. Papu tinha uma segunda família.',
      emoji: '🏡',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 102,
      text: 'The three set off with no destination. The Dolphin jumped. The Capybara guided. Papu wrote in an imaginary notebook. The greatest adventure was beginning.',
      textEs: 'Los tres partieron sin destino. El Delfín saltaba. El Carpincho guiaba. Papu anotaba en un cuaderno imaginario. La gran aventura comenzaba.',
      textPtBR: 'Os três partiram sem destino. O Boto saltava. A Capivara guiava. O Papu anotava tudo em um caderninho imaginário. A maior aventura começava.',
      emoji: '🌊',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 103,
      text: '50 million views in three days. The producer arrived by helicopter. Papu signed the contract. Every Friday he returned to the hut. Roots are everything.',
      textEs: '50 millones de views en tres días. El productor llegó en helicóptero. Papu firmó el contrato. Cada viernes volvía a la cabaña. Las raíces lo son todo.',
      textPtBR: '50 milhões de views em três dias. O produtor chegou de helicóptero. Papu assinou contrato. Toda sexta, ele voltava pra oca. Raízes são tudo.',
      emoji: '🎬',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 104,
      text: "Warm. Smelly. Papu blinked — he was in his hammock at home. A dream! But next to him, a note: 'We came to get you. — Dolphin & Capybara.'",
      textEs: "Cálido. Oloroso. Papu parpadeó — estaba en su hamaca, en casa. ¡Un sueño! Pero al lado, una nota: 'Venimos a buscarte. — Delfín y Carpincho.'",
      textPtBR: "Quente. Cheiroso. Papu piscou — estava na rede, em casa. Era sonho! Mas havia um bilhete: 'Viemos te buscar. — Boto e Capivara.'",
      emoji: '💭',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 105,
      text: 'Papu closed his eyes. The forest sang. When he woke, it was night. There was a plate of food next to the hammock. The family had understood.',
      textEs: 'Papu cerró los ojos. El bosque cantaba. Cuando despertó, era de noche. Había un plato de comida junto a la hamaca. La familia había entendido.',
      textPtBR: 'Papu fechou os olhos. A floresta cantava. Quando acordou, era noite. Havia um prato de comida ao lado da rede. A família tinha entendido.',
      emoji: '😴',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 106,
      text: 'Dolphin and Papu vanished into the river. Papu learned to swim on his back. The Dolphin learned yellow caimans exist — and are great company.',
      textEs: 'Delfín y Papu desaparecieron río adentro. Papu aprendió a nadar de espaldas. El Delfín aprendió que los caimanes amarillos existen — y son buena compañía.',
      textPtBR: 'Boto e Papu sumiram rio adentro. Papu aprendeu a nadar de costas. O Boto aprendeu que jacarés amarelos existem — e são ótima companhia.',
      emoji: '🐬',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 107,
      text: "The Capybara didn't talk much, but knew everything. Invisible trails. The oldest tree in the forest. Sunset over the river. Sometimes silence is the best adventure.",
      textEs: 'El Carpincho no hablaba mucho, pero sabía todo. Senderos invisibles. El árbol más viejo del bosque. El atardecer sobre el río. A veces el silencio es la mejor aventura.',
      textPtBR: 'A Capivara não falava muito, mas sabia tudo. Trilhas invisíveis. A árvore mais antiga da floresta. Às vezes o silêncio é a melhor aventura.',
      emoji: '🦫',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 108,
      text: "The shaman placed a yellow-feathered headdress on Papu's head. The tribe beat drums. Papu looked at the horizon. This was a win a dreamy caiman deserved.",
      textEs: 'El chamán colocó un tocado de plumas amarillas en la cabeza de Papu. La tribu tocó tambores. Papu miró al horizonte. Este era un logro que un caimán soñador merecía.',
      textPtBR: 'O pajé colocou um cocar de penas amarelas na cabeça do Papu. A tribo bateu tambores. Papu olhou pro horizonte. Essa conquista ele merecia.',
      emoji: '👑',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 109,
      text: 'Grilled fish. Cassava. Fruit. More fish. Papu ate it all. Found a hammock. The birds lowered the volume out of respect.',
      textEs: 'Pescado a la brasa. Mandioca. Fruta. Más pescado. Papu se lo comió todo. Encontró una hamaca. Los pájaros bajaron el volumen por respeto.',
      textPtBR: 'Peixe grelhado. Mandioca. Fruta. Mais peixe. Papu comeu tudo. Encontrou uma rede. Os pássaros baixaram o volume por respeito.',
      emoji: '🍽️',
      isEnding: true,
      choices: [],
    },
    {
      pageNumber: 110,
      text: 'The Anaconda slid through the forest. Papu followed her golden patterns. A moss temple. Singing crystals. A rainbow lake. It was worth it.',
      textEs: 'La Anaconda se deslizó por el bosque. Papu siguió sus patrones dorados. Un templo de musgo. Cristales que cantaban. Un lago de todos los colores. Valió la pena.',
      textPtBR: 'A Anaconda deslizou pela floresta. Papu seguiu seus padrões dourados. Templo de musgo. Cristais que cantavam. Lago de todas as cores. Valeu.',
      emoji: '🐍',
      isEnding: true,
      choices: [],
    },
  ],
};

// ---------------------------------------------------------------------------
// Insert
// ---------------------------------------------------------------------------

async function seed() {
  console.log('Inserting story:', story.slug);

  const { data, error } = await supabase
    .from('stories')
    .upsert(story, { onConflict: 'slug' })
    .select('id, slug');

  if (error) {
    console.error('Error inserting story:', error.message);
    process.exit(1);
  }

  console.log('Story inserted successfully:', data);
}

seed();

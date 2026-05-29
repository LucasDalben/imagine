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
// Story: "O Grande Dia do Caju"
//
// State is tracked via page-number tracks (no extra DB columns needed):
//   FULL   (✅✅ pack backpack → breakfast): P1→P2→P5→P8→P11→P14→P15
//   BF_ONLY(❌✅ breakfast first, forgot item):   P1→P3→P6→P9→P12→P21
//   NONE   (❌❌ lazy, mom wakes, no prep):        P1→P4→P7→P10→P13→P27
//
// Intermediate pages: 1–14
// Placeholder marathon entries (to be expanded): 15, 21, 27
// ---------------------------------------------------------------------------

const story = {
  slug: 'o-grande-dia-do-caju',
  title: 'The Great Day of Caju',
  title_es: 'El Gran Día de Caju',
  title_pt_br: 'O Grande Dia do Caju',
  description:
    'Caju wakes up on the most important school day of the year — the Mega Marathon! Chess, physical activity, and arts: how he prepares in the morning changes everything.',
  description_es:
    'Caju se despierta en el día escolar más importante del año — ¡la Mega Maratón! Ajedrez, actividad física y artes: cómo se prepare por la mañana lo cambia todo.',
  description_pt_br:
    'Caju acorda no dia escolar mais importante do ano, a Mega Maratona! Desafio da Mente: Xadrez, Desafio Físico: Corrida e Luta, e o Desafio de Artes: Pintura em tela, como ele se prepara de manhã muda tudo.',
  theme: 'adventure',
  characters: ['Caju', 'Estrela', 'Beto'],
  age_min: 7,
  age_max: 99,
  total_pages: 44,
  reading_level: 'beginner',
  cover_image: null,
  emoji: '🎒',
  is_new: true,
  is_featured: true,
  download_size_mb: 0,
  pages: [
    // =========================================================================
    // INTERMEDIATE PAGES (1–14)  —  Morning phase → School arrival → Marathon
    // =========================================================================

    // ─── P1: O Despertar ─────────────────────────────────────────────────────
    {
      pageNumber: 1,
      text: "Beeep! The alarm went off at 7am. Caju opened one eye. Then the other. Still tucked under his warm blanket. But then he remembered: today was the day of the Mega Marathon! Chess, physical activity, and arts — all on the same day. Caju took a deep breath. Alright, time to get moving.",
      textEs: "¡Bip! La alarma sonó a las 7 de la mañana. Caju abrió un ojo. Luego el otro. Todavía bajo la cobija calientita. Pero entonces recordó: ¡hoy era el día de la Mega Maratón! Ajedrez, actividad física y artes — todo en el mismo día. Caju respiró hondo. Bueno, era hora de actuar.",
      textPtBR: "Beeep! O despertador disparou às 7h da manhã. Morreeendo de preguiça, Caju abriu os olhos, ainda estava debaixo do cobertor quentinho. 'Mas então lembrou: hoje era o dia da Mega Maratona!' Desafio da Mente: Xadrez, Desafio Físico: Corrida e Luta, e o Desafio de Artes: Pintura em tela. Caju respirou fundo. Tá bom, era hora de agir.",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-1.webp',
      choices: [
        {
          id: '1a',
          text: 'Pack my backpack first!',
          textEs: '¡Primero empacar mi mochila!',
          textPtBR: 'Arrumar a mochila primeiro!',
          nextPage: 2,
        },
        {
          id: '1b',
          text: "Breakfast first — I'm hungry!",
          textEs: '¡Primero el desayuno, tengo hambre!',
          textPtBR: 'Esquece a mochila, QUERO CAFÉÉÉÉ, bora que tô com fome!',
          nextPage: 3,
        },
        {
          id: '1c',
          text: 'Just five more minutes...',
          textEs: 'Solo cinco minutitos más...',
          textPtBR: 'Só mais cinco minutinhos...',
          nextPage: 4,
        },
      ],
    },

    // ─── P2: A Mochila do Campeão (FULL track start, narrative) ──────────────
    {
      pageNumber: 2,
      text: "Caju knelt on the floor and carefully packed his backpack. Notebook? In. Colored pencils? In. Then he picked up Grandpa's wooden ruler — the old one, with every millimeter marked — and wrapped it gently in a cloth. His special item for the arts challenge. Everything in the right place. Caju smiled. 'Now I can have breakfast in peace.'",
      textEs: "Caju se arrodilló y abrió su mochila con cuidado. ¿Cuaderno? Adentro. ¿Lápices? Adentro. Luego tomó la regla de madera del abuelo — la vieja, con todos los milímetros marcados — y la envolvió en una tela. Su ítem especial para artes. Todo en su lugar. Caju sonrió. 'Ahora sí puedo desayunar tranquilo.'",
      textPtBR: "Caju sacou a mochila e começou a conferir os itens. Caneta azul? Dentro. Kimono? Dentro. Aí pegou o Pincel Especial preferido que gastou várias mesadas para comprar, embrulhou com carinho num pano. Era o item especial pras artes. Tudo no lugar certo, ninguem me segura hoje! 'Agora sim... partiu café pretinho quentinho!'",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-2.webp',
      choices: [
        {
          id: '2a',
          text: 'Go have breakfast now',
          textEs: 'Ir a desayunar ahora',
          textPtBR: 'Ir tomar café agora',
          nextPage: 37,
        },
      ],
    },

    // ─── P3: Café Primeiro, Esqueceu o Pincel principal (BF_ONLY track start, narrative) ─
    {
      pageNumber: 3,
      text: "The table was set: warm bread with butter, orange juice, and scrambled eggs. Caju dug in without hesitating. When he finished, he glanced at the clock. 'Whoa!' He ran to his room and threw a bunch of stuff into his backpack in a rush. Only later, already at school, would he realize: Grandpa's wooden ruler had been left sitting on the table.",
      textEs: "La mesa estaba puesta: pan calientito con mantequilla, jugo de naranja y huevos revueltos. Caju se lanzó sin dudar. Cuando terminó, miró el reloj. '¡Uy!' Corrió a su cuarto y metió cosas a la mochila apurado. Solo después, ya en la escuela, se daría cuenta: la regla de madera del abuelo había quedado sobre la mesa.",
      textPtBR: "A mesa estava T-O-P: pão quentinho com manteiga, pão de queijo, suco de laranja e ovos mexidos. Caju atacou sem hesitar. Se perdeu nos vídeos das redes sociais e olhou pro relógio. 'Opa!' Correu pro quarto e jogou um monte de coisa na mochila às pressas. Só mais tarde, já na escola, é que percebeu: 'Nãããão, meu Pincel Especial ficou em cima da mesa.'",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-3.webp',
      choices: [
        {
          id: '3a',
          text: "Run to school!",
          textEs: "¡Correr a la escuela!",
          textPtBR: "Correr pra escola!",
          nextPage: 6,
        },
      ],
    },

    // ─── P4: Só Mais Cinco Minutinhos... (NONE track start, narrative) ────────
    {
      pageNumber: 4,
      text: "'LUCAS!' His mom's voice boomed like thunder. Caju leapt out of bed and nearly fell. 'Time to go, hon! You're going to be late!' She'd already picked out some clothes. Caju brushed his teeth on the fly, jammed his feet into sneakers without tying them, and threw his backpack on without checking anything. He flew out the door. No breakfast. Nothing organized. Just the rush.",
      textEs: "'¡LUCAS!' La voz de su mamá retumbó como un trueno. Caju saltó de la cama y casi se cayó. '¡Es la hora, hijo! ¡Vas a llegar tarde!' Ya le había preparado ropa. Caju se cepilló los dientes volando, metió los pies en los tenis sin atarlos y se echó la mochila sin revisar nada. Salió corriendo por la puerta. Sin desayuno. Sin organizar nada. Solo el apuro.",
      textPtBR: "'LUCAS!' A voz da mãe veio como um trovão. Caju pulou da cama num susto e quase caiu. 'Tá na hora moleque! Você vai se atrasar!' Ela já tinha separado uma roupa qualquer. Caju escovou os dentes voando, enfiou os pés no tênis sem amarrar e jogou a mochila nas costas sem checar nada. Saiu pela porta correndo. Sem café. Sem organizar nada. Só a correria.",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-4.webp',
      choices: [
        {
          id: '4a',
          text: "Off to school — no time to lose!",
          textEs: "¡A la escuela, no hay tiempo que perder!",
          textPtBR: "Pra escola, pra escola, corre corre!",
          nextPage: 7,
        },
      ],
    },

    // ─── P5: Café da Manhã do Campeão (FULL confirmed, narrative) ─────────────
    {
      pageNumber: 5,
      text: "The table was set: bread with butter, juice, and a banana. Caju ate slowly, no rush at all. The backpack was already ready at the door — with Grandpa's ruler wrapped safely in its spot. 'Today I'm really prepared,' he thought. It was a good feeling. Like armor on the inside.",
      textEs: "La mesa estaba puesta: pan con mantequilla, jugo y un plátano. Caju comió despacio, sin ningún apuro. La mochila ya estaba lista en la puerta — con la regla del abuelo bien guardada en su lugar. 'Hoy estoy realmente preparado', pensó. Era una sensación buena. Como una armadura por dentro.",
      textPtBR: "A mesa estava posta: pão com manteiga, pão de queijo, suco de laranja e ovos mexidos. Caju comeu sossegado, a mochila já estava pronta. 'Hoje minha aura já começou com mais de 8000!'",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-5.webp',
      choices: [
        {
          id: '5a',
          text: "Let's go! I'm ready.",
          textEs: '¡Vamos! Estoy listo.',
          textPtBR: 'Bora! Tô pronto.',
          nextPage: 8,
        },
      ],
    },

    // ─── P6: Caminho da Escola — BF_ONLY track (narrative) ───────────────────
    {
      pageNumber: 6,
      text: "Caju was walking to school when that uneasy feeling hit. 'Grandpa's ruler!' He stopped in the middle of the sidewalk and dug into his backpack. Nothing. He looked back down the street, as if it would magically appear. It didn't. He let out a long sigh and kept walking. Maybe he could manage without it. Maybe.",
      textEs: "Caju caminaba hacia la escuela cuando esa sensación incómoda lo golpeó. '¡La regla del abuelo!' Se detuvo en medio de la acera y metió la mano en la mochila. Nada. Miró calle abajo, como si fuera a aparecer de la nada. No apareció. Soltó un suspiro largo y siguió. Quizás podría arreglárselas sin ella. Quizás.",
      textPtBR: "Caju andava em direção à escola quando aquela sensação ruim bateu. 'Meu Super Pinceeeeel!' Ele parou no meio da calçada e enfiou a mão na mochila <<< Nada >>> Soltou um suspiro comprido e continuou andando. Talvez desse pra se virar sem ela. 'Minha aura se foi'",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-6.webp',
      choices: [
        {
          id: '6a',
          text: "Keep walking — I'll figure it out",
          textEs: "Seguir caminando — ya lo resolveré",
          textPtBR: "Vamos lá né, fazer o que...",
          nextPage: 9,
        },
      ],
    },

    // ─── P7: Caminho da Escola — NONE track (narrative) ──────────────────────
    {
      pageNumber: 7,
      text: "Caju arrived at school with his hair still a mess and his sneakers untied. Empty stomach, backpack unchecked. At the gate, security guard Seu Zé raised an eyebrow. 'Last one in, huh, Caju?' He flashed a nervous smile. 'Yeah... rough morning.' Inside, you could already hear the excited buzz of the whole school. The Marathon was about to start.",
      textEs: "Caju llegó a la escuela con el cabello revuelto y los tenis desatados. Estómago vacío, mochila sin revisar. En la entrada, el guardia Seu Zé levantó una ceja. '¿Llegaste el último, eh, Caju?' Él esbozó una sonrisa nerviosa. 'Sí... mañana difícil.' Adentro, ya se escuchaba el murmullo emocionado de toda la escuela. La Maratón estaba a punto de comenzar.",
      textPtBR: "Caju chegou na escola com o cabelo ainda bagunçado e o tênis desamarrado. Barriga vazia, mochila sem conferir. Na portaria, o vigia Seu Zé ergueu uma sobrancelha. 'Chegou por último, hein, Caju?' Ele abriu um sorriso nervoso. 'É... não é fácil trabalhar como Batman na madrugada.' Lá dentro, já dava pra ouvir o burburinho animado de toda a escola. A Maratona ia começar.",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-7.webp',
      choices: [
        {
          id: '7a',
          text: "Into the school — head held high!",
          textEs: "¡Adentro, con la cabeza en alto!",
          textPtBR: "Acelerandooo, vamos lá!!!",
          nextPage: 9,
        },
      ],
    },

    // ─── P8: Caminho da Escola — FULL track (narrative) ──────────────────────
    {
      pageNumber: 8,
      text: "Caju left home with plenty of time. As he walked, he mentally checked everything off: 'Grandpa's ruler... check. Colored pencils... check. Water bottle... check.' He felt the sun on his face and breathed in that fresh morning air. A pigeon landed right in front of him. He stepped aside without rushing, smiling. It was the kind of morning that starts right.",
      textEs: "Caju salió de casa con tiempo de sobra. Mientras caminaba, repasó todo mentalmente: 'Regla del abuelo... sí. Lápices... sí. Botella de agua... sí.' Sintió el sol en la cara y respiró el aire fresco de la mañana. Una paloma aterrizó justo frente a él. Se hizo a un lado sin apuro, sonriendo. Era el tipo de mañana que empieza bien.",
      textPtBR: "Caju saiu de casa confiante, farmando aura, enquanto andava, foi conferindo mentalmente: 'Pincel... sim. Kimono... sim. Garrafa d'água... sim.' Sentiu o sol no rosto, mesmo sem brilhar igual um 'vampiro', estava se achando incrível naquele dia.",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-8.webp',
      choices: [
        {
          id: '8a',
          text: "Heading to school, feeling great",
          textEs: "Rumbo a la escuela, sintiéndome genial",
          textPtBR: "Seguindo confiante",
          nextPage: 9,
        },
      ],
    },

    // ─── P9: Pátio da Escola — BF_ONLY (friends give hints, uneasy) ──────────
    {
      pageNumber: 9,
      text: "In the schoolyard, Estrela came running. 'Caju! In chess, don't underestimate the Knight — it moves in L and can catch anyone off guard!' Beto arrived right behind her: 'In the physical challenge, posture and balance. Stay calm before you move.' Isabela gave him a pat on the shoulder: 'And in arts, always mix your colors on the palette before applying them — makes all the difference.' Caju took it all in, but one thought kept coming back: Grandpa's ruler was sitting at home.",
      textEs: "En el patio, Estrela llegó corriendo. '¡Caju! En ajedrez, no subestimes al Caballo — se mueve en L y agarra a todos desprevenidos!' Beto llegó justo detrás: 'En la actividad física, postura y equilibrio. Cálmate antes de moverte.' Isabela le dio una palmadita en el hombro: 'Y en artes, siempre mezcla los colores en la paleta antes de usarlos — hace toda la diferencia.' Caju absorbió todo, pero un pensamiento seguía regresando: la regla del abuelo estaba en casa.",
      textPtBR: "No pátio, Estrela apareceu correndo. 'Caju! Tudo bem com você? Eu perdi várias partidas no Xadrez ontem a noite enquanto praticava, não subestime o Cavalo, ele se move em L e pega todo mundo de surpresa!' Beto Betinha chegou logo atrás: 'Cara! Já assisti todas as temporadas de Dragon Ball, confia em mim, no Desafio Físico: Postura, calma e equilíbrio. Pense antes de agir, não se empolgue!'",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-9.webp',
      choices: [
        {
          id: '9a',
          text: "I'll manage with what I have",
          textEs: "Me las arreglaré con lo que tengo",
          textPtBR: "Obrigado amigos, darei o meu melhor!",
          nextPage: 11,
        },
      ],
    },

    // ─── P10: Pátio da Escola — Ouvindo a tia  ─────────────────
    {
      pageNumber: 10,
      text: "Caju had barely stopped running when Estrela appeared out of nowhere. 'Knight does L in chess — don't forget!' Beto ran past shouting: 'Balance in the physical challenge! Think before you act!' And Isabela last: 'Mix the colors before painting, Caju!' He tried to lock it all in, but his head was racing and his stomach was growling so loud that Beto actually snickered. It was going to be quite a day.",
      textEs: "Caju apenas había parado de correr cuando Estrela apareció de la nada. '¡El Caballo hace L en ajedrez, no te olvides!' Beto pasó gritando: '¡Equilibrio en la prueba! ¡Piensa antes de actuar!' Y por último Isabela: '¡Mezcla los colores antes de pintar, Caju!' Intentó grabarlo todo, pero su cabeza estaba acelerada y el estómago rugía tan fuerte que Beto se rió. Iba a ser todo un día.",
      textPtBR: "Caju ouviu uma conversa ao longe, era da Professora Julia de Artes, foi se escondendo atrás das muretas e tentou ouvir o que ela falava para outra professora, ela desabafou que estava cansada de alunos tentando fazer desenhos realistas, ela sentia falta da alma nas pinturas, o que mais importava era a emoção!",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-10.webp',
      choices: [
        {
          id: '10a',
          text: "Breathe... let's do this",
          textEs: "Respirar... a esto voy",
          textPtBR: "Eu sei bem o que você quer dizer... vamos lá",
          nextPage: 13,
        },
      ],
    },

    // ─── P12: A Maratona Começa — BF_ONLY ────────────────────────────────────
    {
      pageNumber: 11,
      text: "Professor Almeida stepped onto the stage with a megaphone. 'WELCOME TO THE MEGA MARATHON!' Everyone cheered. Caju clapped along, but felt a different kind of chill in his stomach. Without Grandpa's ruler, the arts section was going to be harder. 'But I'm here,' he said to himself. 'And I'll give it everything I've got.'",
      textEs: "El Profesor Almeida subió al escenario con un megáfono. '¡BIENVENIDOS A LA MEGA MARATÓN!' Todos gritaron. Caju aplaudió junto a ellos, pero sintió un frío diferente en el estómago. Sin la regla del abuelo, la parte de artes iba a ser más difícil. 'Pero aquí estoy', se dijo. 'Y daré todo lo que tengo.'",
      textPtBR: "O Diretor Aparicio subiu no palco com um megafone. 'BEM-VINDOS À MEGA MARATONA! O MELHOR EVENTO DO ANO, IIIIIIT'S TIME! QUE VENÇA O MELHOR!' Todo mundo gritou. Caju bateu palma junto, sentia que algo diferente e especial estava para acontecer'",
       image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-11.webp',
      choices: [
        {
          id: '12a',
          text: "Into the Marathon!",
          textEs: "¡A la Maratón!",
          textPtBR: "Pra dentro da Maratona!",
          nextPage: 38,
        },
      ],
    },

    // =========================================================================
    // MARATHON PLACEHOLDER PAGES (15, 21, 27)
    // These will be replaced with the full chess/physical/arts challenges.
    // Each page signals a different preparation level entering the marathon.
    // =========================================================================

    // ─── P15: Desafio da Mente: Xadrez — Trilha FULL ────────────────────────────────────────────
    {
      pageNumber: 12,
      text: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'Rodada um... COMECEM!'",
      textEs: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'Rodada um... COMECEM!'",
      textPtBR: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto, nerdola, e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'COMECEM!'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-12.webp`,
      emoji: '♟️',
      choices: [
        {
          id: '15a',
          text: 'Começar a partida',
          textEs: 'Começar a partida',
          textPtBR: 'Começar a partida',
          nextPage: 14,
        },
      ],
    },

    // ─── P27: Desafio da Mente: Xadrez — Trilha NONE ──────────────────────────────────────────────
    {
      pageNumber: 13,
      text: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro. Barriga vazia, mochila sem conferir. Mas o tabuleiro não sabia disso. As peças eram iguais pros dois lados. Caju encarou cada uma delas, soltou um fôlego devagar e tentou deixar tudo mais desaparecer.",
      textEs: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro. Barriga vazia, mochila sem conferir. Mas o tabuleiro não sabia disso. As peças eram iguais pros dois lados. Caju encarou cada uma delas, soltou um fôlego devagar e tentou deixar tudo mais desaparecer.",
      textPtBR: "Primeiro desafio: Desafio da Mente: Xadrez! Caju sentou diante do tabuleiro. As peças eram iguais pros dois lados. Caju encarou cada uma delas, como não tinha comido no café da manhã, esqueceu a melhor maneira de começar a partida.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-13.webp`,
      emoji: '♟️',
      choices: [
        {
          id: '27a',
          text: 'Começar a partida',
          textEs: 'Começar a partida',
          textPtBR: 'Começar a partida',
          nextPage: 14,
        },
      ],
    },

    // =========================================================================
    // PARTIDA DE Desafio da Mente: Xadrez (P16–P19)  —  Os três caminhos convergem aqui
    // P16 → P17 (momento decisivo) → P18 (sacrifício certo) ou P19 (recuo seguro)
    // =========================================================================

    // ─── P16: A Partida Começa ────────────────────────────────────────────────
    {
      pageNumber: 14,
      text: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      textEs: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      textPtBR: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-14.webp`,
      emoji: '♟️',
      choices: [
        {
          id: '16a',
          text: 'Continuar a partida',
          textEs: 'Continuar a partida',
          textPtBR: 'Continuar a partida',
          nextPage: 39,
        },
      ],
    },

    // ─── P17: O Momento Decisivo ──────────────────────────────────────────────
    {
      pageNumber: 15,
      text: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo. Caju olhou pro tabuleiro e a voz da Estrela voltou na cabeça dele: 'O Cavalo faz o L e pode virar o jogo inteiro.' Ele viu a oportunidade. Se o Cavalo sobrevivesse mais dois lances, dava pra saltar em L direto entre o Rei e a Rainha de Rodrigo ao mesmo tempo. Um garfo perfeito. Mas pra isso, a Torre de Caju teria que ficar no caminho da ameaça.",
      textEs: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo. Caju olhou pro tabuleiro e a voz da Estrela voltou na cabeça dele: 'O Cavalo faz o L e pode virar o jogo inteiro.' Ele viu a oportunidade. Se o Cavalo sobrevivesse mais dois lances, dava pra saltar em L direto entre o Rei e a Rainha de Rodrigo ao mesmo tempo. Um garfo perfeito. Mas pra isso, a Torre de Caju teria que ficar no caminho da ameaça.",
      textPtBR: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo, mas a única peça que poderia salvar o Cavalo era a sua própria Torre, que em um momento normal é mais valiosa que o Cavalo.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-15.webp`,
      emoji: '🤔',
      choices: [
        {
          id: '17a',
          text: 'Sacrificar a Torre para salvar o Cavalo',
          textEs: 'Sacrificar a Torre para salvar o Cavalo',
          textPtBR: 'Perder a Torre para salvar o Cavalo',
          nextPage: 16,
        },
        {
          id: '17b',
          text: 'Recuar o Cavalo para lugar seguro',
          textEs: 'Recuar o Cavalo para lugar seguro',
          textPtBR: 'Recuar o Cavalo para lugar seguro',
          nextPage: 17,
        },
      ],
    },

    // ─── P18: O Salto do Cavalo ───────────────────────────────────────────────
    {
      pageNumber: 16,
      text: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      textEs: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      textPtBR: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-16.webp`,
      emoji: '🏆',
      choices: [
        {
          id: '18a',
          text: 'Próxima etapa: Desafio Físico: Corrida e Luta!',
          textEs: 'Próxima etapa: Desafio Físico: Corrida e Luta!',
          textPtBR: '"EU VENCI O NERD, NÃO ACREDITO!" Próxima etapa: Desafio Físico: Corrida e Luta!',
          nextPage: 40,
        },
      ],
    },

    // ─── P19: O Cavalo Recuou ─────────────────────────────────────────────────
    {
      pageNumber: 17,
      text: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A janela do garfo se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      textEs: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A janela do garfo se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      textPtBR: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A chance de vitória se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-17.webp`,
      emoji: '😔',
      isFalseEnding: true,
      choices: [
        {
          id: '19a',
          text: 'Próxima etapa: Desafio Físico: Corrida e Luta!',
          textEs: 'Próxima etapa: Desafio Físico: Corrida e Luta!',
          textPtBR: '"Não acredito, devia ter pensado por mais tempo!"',
          nextPage: 41,
        },
      ],
    },

    // =========================================================================
    // Desafio Físico: Corrida e Luta (P20–P26)
    // P20 → P22 (gincana) → P24 (êxito) ou P23 (fome aparece) → P25/P26
    // =========================================================================

    // ─── P20: A Prova Física ──────────────────────────────────────────────────
    {
      pageNumber: 18,
      text: "O Professor Almeida soou o apito. 'Segunda etapa... Desafio Físico: Corrida e Luta!' A turma toda correu pro pátio externo. Beto já estava no centro, saltando no lugar pra esquentar. 'Caju! Postura e equilíbrio, lembra?' Era uma sequência de saltos laterais, agachamentos e corrida entre cones. Simples no papel, pesado na prática. Caju respirou fundo e olhou pras próprias pernas. O corpo sabia exatamente o que tinha recebido de manhã.",
      textEs: "O Professor Almeida soou o apito. 'Segunda etapa... Desafio Físico: Corrida e Luta!' A turma toda correu pro pátio externo. Beto já estava no centro, saltando no lugar pra esquentar. 'Caju! Postura e equilíbrio, lembra?' Era uma sequência de saltos laterais, agachamentos e corrida entre cones. Simples no papel, pesado na prática. Caju respirou fundo e olhou pras próprias pernas. O corpo sabia exatamente o que tinha recebido de manhã.",
      textPtBR: "O Professor Almeida soou o apito. 'Segunda etapa... Desafio Físico: Corrida e Luta!' A turma toda correu pro pátio externo. Beto betinha já estava no centro, saltando no lugar pra esquentar. Caju respirou fundo e olhou pras próprias pernas, começou a imaginar os pés pegando fogo como se fossem um foguete!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-18.webp`,
      emoji: '🏃',
      choices: [
        {
          id: '20a',
          text: 'Pra pista!',
          textEs: 'Pra pista!',
          textPtBR: 'Pra pista!',
          nextPage: 19,
        },
      ],
    },

    // ─── P22: Gincana — Sequência de Saltos ──────────────────────────────────
    {
      pageNumber: 19,
      text: "O apito soou. Caju saiu da linha. Três saltos laterais, dois agachamentos, sprint até o cone. Nos primeiros saltos, tudo certo. Mas no segundo agachamento a barriga fez um ronco alto, o tipo que todo mundo ao redor consegue ouvir. O menino da faixa do lado olhou. Caju não olhou de volta. Sentiu as pernas tremerem levinho. Era hora de decidir como encarar o que estava chegando.",
      textEs: "O apito soou. Caju saiu da linha. Três saltos laterais, dois agachamentos, sprint até o cone. Nos primeiros saltos, tudo certo. Mas no segundo agachamento a barriga fez um ronco alto, o tipo que todo mundo ao redor consegue ouvir. O menino da faixa do lado olhou. Caju não olhou de volta. Sentiu as pernas tremerem levinho. Era hora de decidir como encarar o que estava chegando.",
      textPtBR: "O apito soou. Caju saiu da linha, e avistou a primeira etapa: 'corrida de 200 metros', o que ele deveria fazer?",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-19.webp`,
      emoji: '🏅',
      choices: [
        {
          id: '22a',
          text: 'Respirar fundo e terminar no ritmo',
          textEs: 'Respirar fundo e terminar no ritmo',
          textPtBR: 'Respirar fundo e manter o ritmo até o final',
          nextPage: 22,
        },
        {
          id: '22b',
          text: 'A barriga está falando mais alto que as pernas',
          textEs: 'A barriga está falando mais alto que as pernas',
          textPtBR: 'Correr o mais rápido possível, assim ficaria na frente já no início!',
          nextPage: 21,
        },
      ],
    },

    // ─── P23: A Fome Aparece ──────────────────────────────────────────────────
    {
      pageNumber: 20,
      text: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textEs: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textPtBR: "Caju foi bem, manteve o ritmo, mas a sua barriga começou a roncar alto, o que fez com que ele perdesse o foco e começasse a sentir tontura, tropeçou no final e caiu no chão, perdendo a corrida e a prova física.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-20.webp`,
      emoji: '😵',
      choices: [
        {
          id: '23b',
          text: 'Ser honesto: pedir uma pausa ao Professor',
          textEs: 'Ser honesto: pedir uma pausa ao Professor',
          textPtBR: 'Droga, por que não me preparei melhor no café da manhã?',
          nextPage: 27,
        },
      ],
    },

        // ─── P23: COrreu muito rápido──────────────────────────────────────────────────
    {
      pageNumber: 21,
      text: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textEs: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textPtBR: "Ele correu o mais rápido que pôde, sentiu o gosto da vitória, viu os competidores ficando para tras, mas começou a sentir o cansaço batendo, e antes da corrida acabar, ele não aguentou o ritmo e acabou ficando em terceiro lugar.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-21.webp`,
      emoji: '😵',
      choices: [
        {
          id: '23b',
          text: 'Ser honesto: pedir uma pausa ao Professor',
          textEs: 'Ser honesto: pedir uma pausa ao Professor',
          textPtBR: 'Droga, achei que eu era o protagonista, mas a vida não é um filme...',
          nextPage: 26,
        },
      ],
    },

    // ─── P24: Prova Física Concluída ──────────────────────────────────────────
    {
      pageNumber: 22,
      text: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textEs: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textPtBR: '"1, 2, 3... estou indo bem, mantenha o ritmo Caju, força", pensou Caju, e assim dando muito de si, ele conseguiu vencer a etapa da corrida! Agora era o Desafio da luta, preparar o Kimono, vamos lutar Judô!',
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-22.webp`,
      emoji: '🌟',
      choices: [
        {
          id: '24a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Já assisti todos os episódios de Dragon Ball, isso será fácil, OSS!',
          nextPage: 42,
        },
      ],
    },

    {
      pageNumber: 23,
      text: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textEs: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textPtBR: 'O seu oponente era maior e mais forte que ele, mas Caju sabia que força não vence a técnica!',
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-23.webp`,
      emoji: '🌟',
      choices: [
        {
          id: '24a',
          text: 'Ir com tudo!',
          textEs: 'Ir com tudo!',
          textPtBR: 'Ir com tudo, não tenho nada a perder! Seguro forte o kimono e começo a empurrar ele para fora do tatame!',
          nextPage: 24,
        },
        {
          id: '24b',
          text: 'Usar a técnica!',
          textEs: 'Usar a técnica!',
          textPtBR: 'Faço a pegada no kimono, olhos atentos, e tento desequilibrar ele para o lado, mesmo ele sendo mais forte e vindo para cima de mim.',
          nextPage: 25,
        },
      ],
    },


    // ─── P25: A Queda ────────────────────────────────────────────────────────
    {
      pageNumber: 24,
      text: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textEs: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textPtBR: "Caju empurrou, empurrou e o oponente aproveitou isso para aplicar um forte golpe, como Caju estava fazendo muita força e o oponente usou isso a seu favor para desequilibrar Caju, ele acabou caindo no chão, perdendo a prova física.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-24.webp`,
      emoji: '😞',
      isFalseEnding: true,
      choices: [
        {
          id: '25a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'É... eu acho esqueci os princípios das artes marciais!',
          nextPage: 26,
        },
      ],
    },

        {
      pageNumber: 25,
      text: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textEs: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textPtBR: "O oponente estava quase vencendo, mas Caju não desistiu, e usou o peso do oponente contra ele, e conseguiu derrubá-lo, vencendo a prova física!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-25.webp`,
      emoji: '😞',
      choices: [
        {
          id: '25a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Huhuw! Eu venci! Não acredito!',
          nextPage: 26,
        },
      ],
    },

    // =========================================================================
    // ARTES (P28–P30)  —  O pincel faz toda a diferença
    // P28 → P29 (com pincel, vence) ou P30 (sem pincel, perde)
    // =========================================================================

    // ─── P28: A Prova de Artes ────────────────────────────────────────────────
    {
      pageNumber: 26,
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "O Diretor Aparicio anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis simples. O tema era livre' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-26.webp`,
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Tirar o Pincel especial da mochila',
          nextPage: 43,
        },
      ],
    },

    {
      pageNumber: 27,
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "Nããão! Esqueci o meu Pincel Especial em casa, eu... eu... esqueci de arrumar a mochila! Droga, o que eu faço agora?",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-27.webp`,
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Pegar os itens básicos e improvisar.',
          nextPage: 29,
        },
      ],
    },

    {
      pageNumber: 28,
      text: "Alright — the Special Brush was right there in the bag, wrapped up carefully. This was the last challenge. Caju held it for a second before opening the paint jars. He had prepared for this. He knew he could win.",
      textEs: "Bien — el Pincel Especial estaba ahí en la mochila, bien envuelto. Era el último desafío. Caju lo sostuvo un segundo antes de abrir los frascos de pintura. Se había preparado para esto. Sabía que podía ganar.",
      textPtBR: "Certo, eu tenho o Pincel Especial aqui na mochila, essa é a última etapa, eu preciso conseguir! Eu me preparei pra isso, eu sei que posso vencer!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-28.webp`,
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Arte realista',
          textEs: 'Arte realista',
          textPtBR: 'Fazer um retrato realista com muitos detalhes incríveis.',
          nextPage: 29,
        },
        {
          id: '28b',
          text: 'Arte criativa',
          textEs: 'Arte criativa',
          textPtBR: 'Deixar o seu coração falar pelo pincel, e entregar uma arte cheia de sentimento.',
          nextPage: 30,
        },
      ],
    },

    {
      pageNumber: 29,
      text: "Mestre Mago Kashew stood before Caju's canvas for a long moment. 'Your work is beautiful,' he said quietly, 'but it didn't move me enough to give you first place.' Caju nodded slowly. He had painted carefully, precisely. Maybe too precisely.",
      textEs: "El Mestre Mago Kashew se quedó frente al cuadro de Caju por un buen momento. 'Tu trabajo es hermoso', dijo en voz baja, 'pero no me llegó al corazón como para darte el primer lugar.' Caju asintió despacio. Había pintado con cuidado, con precisión. Quizás demasiada.",
      textPtBR: "Muito bem, o seu quadro ficou lindo, mas eu esperava mais, não me tocou ao ponto de te dar o Primeiro Lugar.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-29.webp`,
      emoji: '🎨',
      isFalseEnding: true,
      choices: [
        {
          id: '29a',
          text: 'Continuar',
          textEs: 'Continuar',
          textPtBR: 'Cheguei tão perto, preciso me mudar para a Alemanha...',
          nextPage: 31,
        },
      ],
    },

        {
      pageNumber: 30,
      text: "Mestre Mago Kashew stopped in front of Caju's canvas and didn't move for a full minute. The whole room went quiet. Then he turned around slowly. 'This one. This is the one that reached me.' He pointed at Caju. 'First place in Arts.' The class erupted.",
      textEs: "El Mestre Mago Kashew se detuvo frente al cuadro de Caju y no se movió por un minuto entero. Toda la sala se quedó en silencio. Luego giró despacio. 'Este. Este es el que me llegó.' Señaló a Caju. 'Primer lugar en Artes.' La clase estalló.",
      textPtBR: "É isso! A sua arte é a mais criativa, a mais original, a que mais se destacou e me tocou, meus parabéns Caju, te dou o Primeiro Lugar em Artes!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-30.webp`,
      emoji: '🎨',
      choices: [
        {
          id: '30a',
          text: 'Celebrar!',
          textEs: 'Celebrar!',
          textPtBR: 'Eu sabia que era disso que a arte se tratava, não é só técnica, é sentimento, é expressão, obrigado professora!',
          nextPage: 31,
        },
      ],
    },


    // ─── P29: O Pincel Especial ───────────────────────────────────────────────
    {
      pageNumber: 31,
      text: "Everyone gathered in the main hall. The principal took the stage and announced the overall champion of the Mega Marathon. The crowd went wild. Friends lifted him up, medals flashed under the lights, and for a moment Caju forgot he was even tired.",
      textEs: "Todos se reunieron en el gran salón. El director subió al escenario y anunció al campeón general de la Mega Maratón. La multitud enloqueció. Los amigos lo levantaron en brazos, las medallas brillaron bajo las luces y por un momento Caju olvidó que estaba cansado.",
      textPtBR: "Todos se reuniram no grande salão, e então o Diretor Aparicio anunciou Juca como o grande vencedor da Maratona! Todos aplaudiram, entregaram a medalha e o troféu, os amigos levantaram Juca e celebraram como se tivessem vencido uma Copa do Mundo de Futebol!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-31.webp`,
      emoji: '🖌️',
      choices: [
               {
          id: '31a',
          text: 'Continuar',
          textEs: 'Continuar',
          textPtBR: 'Esse é o melhor dia da minha vida!',
          nextPage: 44,
        },
      ],
    },

    // ─── P30: Criativo, Mas Sem o Pincel ─────────────────────────────────────
    {
      pageNumber: 32,
      text: "Most students had already left. Caju was heading for the gate when the principal called out: 'Caju! Wait! There's someone who wants to see you — follow me to my office. He doesn't want to be seen by the others.'",
      textEs: "La mayoría de los alumnos ya se habían ido. Caju se dirigía a la salida cuando el director lo llamó: '¡Caju! ¡Espera! Hay alguien que quiere verte — sígueme a mi oficina. No quiere que los demás lo vean.'",
      textPtBR: "O Diretor Aparicio gritou de longe para Juca 'Juca! Espere! Tem alguem que gostaria de falar com você sobre um assunto sério, me siga até a minha sala, e terá que vir sozinho... 'ele' não quer ser visto pelos outros.'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-32.webp`,
      emoji: '😔',
      choices: [
        {
          id: '32a',
          text: 'Seguir o diretor',
          textEs: 'Seguir o diretor',
          textPtBR: 'Seguir o diretor para a sala dele.',
          nextPage: 34,
        },
        {
          id: '32b',
          text: 'Ir para casa',
          textEs: 'Ir para casa',
          textPtBR: 'Ir embora com os amigos',
          nextPage: 33,
        },
      ],
    },

    {
      pageNumber: 33,
      text: "Caju arrived home and laid the medal on the kitchen table. His parents' eyes lit up. Dinner was warm and the stories flowed — the chess fork, the judo throw, the painting. But that night, as he lay in bed, a quiet thought surfaced: had he taken the right path?",
      textEs: "Caju llegó a casa y puso la medalla sobre la mesa de la cocina. Los ojos de sus padres brillaron. La cena fue cálida y las historias fluyeron — el tenedor en el ajedrez, el derribo en el judo, la pintura. Pero esa noche, mientras estaba acostado, un pensamiento silencioso apareció: ¿había tomado el camino correcto?",
      textPtBR: "Juca chegou em casa com os amigos, mostrou para seus pais a medalha e o troféu, e contou tudo o que aconteceu na Maratona, ele estava tão feliz que não conseguia parar de falar, e seus pais ficaram muito orgulhosos dele, e disseram que ele tinha se saído muito bem, comeram várias pizzas e tiveram um noite muito feliz juntos!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-33.webp`,
      emoji: '😔',
      isFalseEnding: true,
      choices: [
        {
          id: '33a',
          text: 'Fim',
          textEs: 'Fim',
          textPtBR: 'Indo dormir, Juca sentiu que algo estava faltando, e se perguntou se realmente escolheu o caminho certo.',
          nextPage: 33,
        }
      ],
    },

    
    {
      pageNumber: 34,
      text: "Inside the office, Mestre Mago Kashew was seated behind the principal's desk. He rose slowly. 'Caju, I wanted to congratulate you on your victory. You showed great courage, determination, and talent. You've reached a point in life where you can help me.' Caju was speechless for a moment.",
      textEs: "Dentro de la oficina, el Mestre Mago Kashew estaba sentado detrás del escritorio del director. Se levantó despacio. 'Caju, quería felicitarte por tu victoria. Mostraste mucho coraje, determinación y talento. Has llegado a un punto de la vida en que puedes ayudarme.' Caju se quedó sin palabras un momento.",
      textPtBR: "Entrando na sala, Juca viu o Mestre Mago Kashew sentado atrás da mesa do diretor, ele se levantou e disse 'Juca, eu queria te parabenizar pela sua vitória na Maratona, você mostrou muita coragem, determinação e talento, você enfim chegou em uma fase da vida em que pode me ajudar!' Juca ficou sem palavras por um segundo, mas conseguiu agradecer, ficou curioso e com um certo receio sobre esse pedido.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-34.webp`,
      emoji: '😔',
      choices: [
             {
          id: '34a',
          text: 'Continuar',
          textEs: 'Continuar',
          textPtBR: 'Sente-se, irei te contar o que você precisa saber por enquanto.',
          nextPage: 35,
        }
      ],
    },

        {
      pageNumber: 35,
      text: "Mestre Mago Kashew leaned forward. 'Caju, the world is heading in a very dangerous direction. So many wars, hunger, fear and hatred — things that aren't normal. Someone is bending the paths of stories. And my heart tells me you have a part to play. A spark of magic lives in you.'",
      textEs: "El Mestre Mago Kashew se inclinó hacia adelante. 'Caju, el mundo está tomando un camino muy peligroso. Tantas guerras, hambre, miedo y odio — cosas que no son normales. Alguien está torciendo los caminos de las historias. Y mi corazón me dice que tú tienes un papel que cumplir. Hay una chispa de magia en ti.'",
      textPtBR: "Então Mestre Mago Kashew começou a falar, 'Juca, o mundo esta tomando um caminho muito perigoso, não é normal existirem tantas guerras, fome, medo e ódio, alguem está alterando os rumos das histórias, e meu coração diz que você tem um papel importante, que você tem um toque da magia e isso será capaz de te tornar um grande herói!'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-35.webp`,
      emoji: '😔',
      choices: [
             {
          id: '35a',
          text: 'Continuar',
          textEs: 'Continuar',
          textPtBR: 'Juca fica com os olhos arregalados, e diz \'Meu Deus será que serei super poderoso?! AAA QUE SONHO!\'',
          nextPage: 36,
        }
      ],
    },

    {
      pageNumber: 36,
      text: "Mestre Mago Kashew continued: 'You will enter many moments in history and make the right choices. If you are truly who I believe you to be, you will bring peace to the world and we will live the story we've always dreamed of. Are you ready?'",
      textEs: "El Mestre Mago Kashew continuó: 'Tendrás que entrar en muchos momentos de la historia y tomar las decisiones correctas. Si eres realmente quien creo que eres, traerás la paz al mundo y viviremos la historia que siempre soñamos. ¿Estás listo?'",
      textPtBR: "Então Mestre Mago Kashew continuou: Você terá que entrar em vários momentos da historia, e em cada um deles, terá que tomar as decisões certas, pois se você é realmente quem eu imagino que seja, irá trazer a paz para o Mundo, e viveremos a história que sempre sonhamos! Você está pronto para isso?!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-36.webp`,
      emoji: '😔',
      isEnding: true,
      choices: [
        {
          id: '36a',
          text: 'Sim! Vamos nessa!',
          textEs: 'Sim! Vamos nessa!',
          textPtBR: 'Sim! Vamos nessa!',
          nextPage: 1,
        }
      ],
    },

    // =========================================================================
    // PÁGINAS NOVAS (37–44)
    // Expansão de diálogos e momentos emocionais ao longo de toda a história
    // =========================================================================

    // ─── P37: A Foto do Avô (FULL track — entre P2 e P5) ────────────────────
    {
      pageNumber: 37,
      text: "Caju was about to zip up his backpack when the Special Brush slipped slightly from its cloth. He caught it carefully — and that's when he noticed something stuck to the inside of the bag's lid: a small photo. Him and Grandpa on the porch, both holding brushes, both covered in paint. Grandpa was laughing with his whole face. Caju stared at it for a moment. 'Today I'm representing us, Grandpa,' he whispered. He wrapped the brush back up and closed the bag with a different kind of certainty.",
      textEs: "Caju estaba a punto de cerrar la mochila cuando el Pincel Especial se escapó un poco de su tela. Lo atrapó con cuidado — y fue entonces que notó algo pegado en la tapa interior: una foto pequeña. Él y el abuelo en el porche, los dos con pinceles, los dos manchados de pintura. El abuelo reía con toda la cara. Caju lo miró un momento. 'Hoy te represento, abuelo', susurró. Envolvió el pincel de nuevo y cerró la mochila con una firmeza diferente.",
      textPtBR: "Caju estava prestes a fechar a mochila quando o Pincel Especial escorregou. Ele pegou com cuidado, e foi aí que notou algo colado na tampa interna da mochila: uma foto pequena. Ele e o vô Fernando, os dois com pincéis novos que tinham acabado de comprar, era um sonho do avô, poder pintar algo profissional, com uma qualidade fora do comum, uma obra obra de arte, pelo menos uma vez, e acabou virando o sonho do neto também. Caju ficou olhando por um segundo. Sentiu um calorzinho no peito. 'Hoje eu te represento, vô', murmurou. Embrulhou o pincel de volta e fechou a mochila com um sorriso no rosto.",
      image_url: 'https://zqrgrvfjpqnjrqztatrk.supabase.co/storage/v1/object/public/stories/o-grande-dia-do-caju/page-37.webp',
      choices: [
        {
          id: '37a',
          text: 'Go have breakfast',
          textEs: 'Ir a desayunar',
          textPtBR: 'Ir tomar o café da manhã',
          nextPage: 5,
        },
      ],
    },

    // ─── P38: As Regras do Jogo (abertura da Maratona — entre P11 e P12) ────
    {
      pageNumber: 38,
      text: "Professor Almeida raised the megaphone again. 'Attention! Each stage is worth points. Chess — 30 points for a win. Physical activity — time and technique, another 30. Arts — creativity and execution judged by Master Mage Kashew himself — 40 points.' The crowd roared. 'The overall champion goes on the school Honor Wall AND gets a private meeting with Master Mage Kashew!' Caju's jaw dropped. He hadn't known that was on the line. His heart picked up speed.",
      textEs: "El Profesor Almeida volvió a levantar el megáfono. '¡Atención! Cada etapa vale puntos. Ajedrez — 30 puntos por ganar. Actividad física — tiempo y técnica, otros 30. Artes — creatividad y ejecución juzgadas por el Mestre Mago Kashew en persona — 40 puntos.' La multitud rugió. '¡El campeón general irá al Muro de Honor de la escuela Y tendrá una reunión privada con el Mestre Mago Kashew!' La mandíbula de Caju se descolgó. No sabía que eso estaba en juego.",
      textPtBR: "O Diretor Aparicio ergueu o megafone de novo. 'Atenção! Não terão chance de se recuperar, perdeu um desafio, está fora!' A galera pirou. 'O campeão geral vai pro Mural de Honra da escola!' Caju ficou de boca aberta, o coração disparou.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-38.webp`,
      emoji: '📢',
      choices: [
        {
          id: '38a',
          text: "Let's go — Chess first!",
          textEs: '¡Vamos — primero Ajedrez!',
          textPtBR: 'Bora! Primeiro desafio: Desafio da Mente: Xadrez!',
          nextPage: 12,
        },
      ],
    },

    // ─── P39: A Pressão do Centro (meio da partida — entre P14 e P15) ───────
    {
      pageNumber: 39,
      text: "Eight moves in, the board was balanced. Rodrigo was good — really good. His two Bishops were developed and he was building pressure down the center column. Caju recognized the strategy: control the center, then attack the king's side. 'If I let him advance one more move, this gets very hard to defend,' Caju thought. 'But if I act now, I risk losing material.' The clock ticked on. Every other board in the room had already finished. It was just the two of them.",
      textEs: "Ocho movimientos después, el tablero estaba equilibrado. Rodrigo era bueno — muy bueno. Sus dos Alfiles estaban desarrollados y ejercía presión en la columna central. Caju reconoció la estrategia: controlar el centro y luego atacar. 'Si lo dejo avanzar un movimiento más, esto se pone muy difícil de defender', pensó Caju. 'Pero si actúo ahora, arriesgo perder material.' El reloj corría. Todos los demás tableros ya habían terminado. Solo eran ellos dos.",
      textPtBR: "Oito lances depois, o tabuleiro estava equilibrado. Rodrigo era bom. Os dois Bispos dele estavam desenvolvidos e ele aplicava pressão na coluna central, construindo um domínio lento. Caju reconheceu a estratégia: controlar o centro e depois atacar o lado do rei. 'Se eu deixar ele avançar mais um lance, fica muito difícil de defender', pensou Caju. 'Mas se eu agir agora, arrisco perder material.' O relógio corria. Preciso ir com tudo!",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-39.webp`,
      emoji: '🧠',
      choices: [
        {
          id: '39a',
          text: 'The decisive moment arrives...',
          textEs: 'Llega el momento decisivo...',
          textPtBR: 'O momento decisivo chegou...',
          nextPage: 15,
        },
      ],
    },

    // ─── P40: O Aperto de Mão da Vitória (após P16 — antes da ativ. física) ──
    {
      pageNumber: 40,
      text: "Rodrigo stared at the board for a few more seconds. Then he looked up and smiled sideways. 'That was a good trap. I didn't see the fork coming.' They shook hands with respect. Outside the room, Estrela exploded: 'I KNEW IT! THE KNIGHT! I TOLD YOU ABOUT THE KNIGHT!' Beto laughed and nudged her. Isabela just smiled quietly, like she'd always known. Caju took a deep breath. Thirty points in the bank. But the Marathon had barely started.",
      textEs: "Rodrigo miró el tablero unos segundos más. Luego levantó la cabeza y sonrió de lado. 'Fue una buena trampa. No vi venir el tenedor.' Se dieron la mano con respeto. Afuera, Estrela explotó: '¡LO SABÍA! ¡EL CABALLO! ¡TE HABLÉ DEL CABALLO!' Beto rio y la empujó suavemente. Isabela solo sonrió en silencio, como si siempre lo hubiera sabido. Caju respiró hondo. Treinta puntos en el bolsillo. Pero la Maratón apenas había comenzado.",
      textPtBR: "Rodrigo ficou olhando pro tabuleiro por mais alguns segundos. Depois levantou a cabeça e sorriu de lado. 'Foi uma boa armadilha. Não vi o garfo chegando.' Deram as mãos com respeito. Lá fora, Estrela explodiu: 'EU SABIA! AQUELE CAVALO SEM VERGONHA! EU FALEI DO CAVALO!'. Caju respirou fundo 'Comecei bem!'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-40.webp`,
      emoji: '🤝',
      choices: [
        {
          id: '40a',
          text: 'Next up: physical activity!',
          textEs: '¡Siguiente: actividad física!',
          textPtBR: 'Próxima etapa: Desafio Físico: Corrida e Luta!',
          nextPage: 18,
        },
      ],
    },

    // ─── P41: Processando a Derrota (após P17 — antes da ativ. física) ───────
    {
      pageNumber: 41,
      text: "Rodrigo extended his hand. Caju shook it. 'Good game.' Short, but not bitter. Outside, Estrela was waiting and saw Caju's face. No words needed. 'The Knight...' she started. 'I know,' he cut in — not sharply, just quietly. Beto put a hand on his shoulder: 'You still have physical and arts. This isn't over.' Caju nodded. Zero from chess. But his mind was already on the next challenge.",
      textEs: "Rodrigo extendió la mano. Caju se la estrechó. 'Buen juego.' Corto, pero sin amargura. Afuera, Estrela esperaba y vio la cara de Caju. No hacían falta palabras. 'El Caballo...' empezó. 'Ya sé', la cortó — sin brusquedad, solo en voz baja. Beto puso una mano en su hombro: 'Todavía tienes física y artes. Esto no terminó.' Caju asintió. Cero del ajedrez. Pero su mente ya estaba en el siguiente desafío.",
      textPtBR: "Rodrigo estendeu a mão. Caju apertou. 'Boa partida.' Seco, mas sem raiva. Lá fora, Estrela estava esperando e viu o rosto de Caju. Não precisou de palavras. 'Nem sempre manter as peças em jogo te levam para a vitória...' ela começou. 'Eu sei', ele cortou, sem rispidez, só quieto.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-41.webp`,
      emoji: '💪',
      isFalseEnding: true,
      choices: [
        {
          id: '41a',
          text: 'Next up: physical activity!',
          textEs: '¡Siguiente: actividad física!',
          textPtBR: 'Droga...',
          nextPage: 18,
        },
      ],
    },

    // ─── P42: O Adversário do Judô (entre P22 e P23) ─────────────────────────
    {
      pageNumber: 42,
      text: "At the center of the mat, Caju finally saw his opponent up close: Guilherme from sixth grade. A full head taller, broad shoulders, yellow belt. Guilherme wasn't nervous at all — he stood with his arms crossed, staring calmly at the mat. Beto appeared behind Caju and whispered: 'Raw strength won't work against him. You need a cool head.' Caju adjusted his kimono. The judo instructor raised his hand. They faced each other on the mat.",
      textEs: "En el centro del tatami, Caju vio a su adversario de cerca por primera vez: Guilherme, del sexto grado. Una cabeza más alto, hombros anchos, cinturón amarillo. Guilherme no estaba nervioso — estaba parado con los brazos cruzados, mirando el tatami con total calma. Beto apareció detrás de Caju y susurró: 'La fuerza bruta no va a funcionar contra él. Necesitas la cabeza fría.' Caju acomodó su kimono. El instructor de judo levantó la mano. Se miraron en el tatami.",
      textPtBR: "No centro do tatame, Caju viu seu adversário de perto pela primeira vez: Guilherme. Um palmo mais alto, muito mais monstrão. Guilherme não estava nervoso, parado de braços cruzados, se achando o Kobra Kai. Beto betinha apareceu atrás de Caju e sussurrou: 'Força bruta não vai funcionar contra ele, o bicho é uma muralha' Caju ajeitou o kimono. O professor de judô ergueu a mão. Eles se encararam.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-42.webp`,
      emoji: '🥋',
      choices: [
        {
          id: '42a',
          text: 'Face the opponent!',
          textEs: '¡Enfrentar al adversario!',
          textPtBR: 'Encarar o adversário de frente!',
          nextPage: 23,
        },
      ],
    },

    // ─── P43: A Primeira Pincelada (entre P26 e P28 — FULL track artes) ──────
    {
      pageNumber: 43,
      text: "Caju unwrapped the Special Brush and held it for a moment — the same one packed so carefully that morning. He opened the paint jars: red, blue, yellow, black, white. Mixed on the palette the way Isabela had taught him: orange first, a warm blend of red and yellow. Then a deep blue, almost the colour of night. The blank canvas was a little intimidating. 'How do I paint a whole day on one canvas?' he thought. He closed his eyes for a second. He saw the 7am alarm. The packed backpack. The chessboard. The judo mat. Then he opened his eyes and began. No more fear.",
      textEs: "Caju desenvolvió el Pincel Especial y lo sostuvo un momento — el mismo que había empacado con tanto cuidado esa mañana. Abrió los frascos de pintura: rojo, azul, amarillo, negro, blanco. Mezcló en la paleta como Isabela le había enseñado: primero el naranja, una mezcla cálida de rojo y amarillo. Luego un azul profundo, casi color noche. El lienzo en blanco era un poco intimidante. '¿Cómo pinto todo un día en un solo lienzo?', pensó. Cerró los ojos un segundo. Vio el despertador a las 7am. La mochila preparada. El tablero. El tatami. Luego abrió los ojos y empezó. Ya no había miedo.",
      textPtBR: "Caju desenrolou o Pincel Especial e ficou segurando por um momento. A tela em branco intimidava um pouco. 'Como eu me expresso nesse espaço imenso em branco?', ele pensou. Fechou os olhos por um segundo, lembrou de seu avô, imaginou algo na tela de forma meio realista, meio abstrata, e começou a pincelar.",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-43.webp`,
      emoji: '🖌️',
      choices: [
        {
          id: '43a',
          text: 'Paint realistically — every detail',
          textEs: 'Pintar realisticamente — cada detalle',
          textPtBR: 'Fazer um retrato realista com muitos detalhes incríveis.',
          nextPage: 29,
        },
        {
          id: '43b',
          text: 'Paint from the heart — feeling over technique',
          textEs: 'Pintar con el corazón — emoción sobre técnica',
          textPtBR: 'Deixar o coração falar pelo pincel, arte cheia de sentimento.',
          nextPage: 30,
        },
      ],
    },

    // ─── P44: A Despedida no Portão (entre P31 e P32) ────────────────────────
    {
      pageNumber: 44,
      text: "At the school gate, Estrela, Beto, and Isabela were waiting. Nobody spoke for a moment. Then Estrela broke the silence: 'You were incredible today.' Beto: 'That chess fork, man.' Isabela: 'Your painting had soul.' Caju looked at each of them. The medal was in his pocket. The Special Brush, wrapped back in its cloth, was safe in his backpack. The sun was already low — late afternoon golden light. 'Thanks for believing in me before I believed in myself,' he said.",
      textEs: "En la puerta de la escuela, Estrela, Beto e Isabela estaban esperando. Nadie habló por un momento. Luego Estrela rompió el silencio: 'Fuiste increíble hoy.' Beto: 'Ese tenedor en el ajedrez, compadre.' Isabela: 'Tu pintura tenía alma.' Caju los miró a cada uno. La medalla estaba en su bolsillo. El Pincel Especial, envuelto en su tela, estaba de vuelta en la mochila. El sol ya estaba bajo — luz dorada de tarde. 'Gracias por creer en mí antes de que yo creyera en mí mismo', dijo.",
      textPtBR: "Na saída da escola, Estrela, Beto betinha estavam esperando no portão. Ninguém falou nada por um segundo. Então Estrela quebrou o silêncio: 'Fiquei feliz que o pesadelo do cavalo não foi só comigo, você jogou muito bem' Beto: 'CAAARA eu senti uma aura, uma energia, foi tipo karatê kid, você conseguiu vencer o mal, você é BRABO!'. Caju olhou pra cada um deles. A medalha estava no pesoço. Levantou a cabeça e disse... 'Bora comer pizza pra comemorar!'",
      image_url: `${process.env.PATH_IMAGE_SUPABASE}o-grande-dia-do-caju/page-44.webp`,
      emoji: '🌅',
      choices: [
        {
          id: '44a',
          text: 'Head home — but the adventure is just beginning...',
          textEs: 'Camino a casa — pero la aventura apenas comienza...',
          textPtBR: 'A Maratona acabou, mas a aventura está apenas começando...',
          nextPage: 32,
        },
      ],
    },
  ],
};

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

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
    'Caju acorda no dia escolar mais importante do ano — a Mega Maratona! Xadrez, atividade física e artes: como ele se prepara de manhã muda tudo.',
  theme: 'adventure',
  characters: ['Caju', 'Estrela', 'Beto', 'Isabela', 'Professor Almeida', 'Mestre Mago Kashew'],
  age_min: 7,
  age_max: 99,
  total_pages: 30,
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
      textPtBR: "Beeep! O despertador disparou às 7h da manhã. Caju abriu um olho. Depois o outro. Ainda estava debaixo do cobertor quentinho. Mas então lembrou: hoje era o dia da Mega Maratona! Xadrez, atividade física e artes — tudo no mesmo dia. Caju respirou fundo. Tá bom, era hora de agir.",
      emoji: '😴',
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
          textPtBR: 'Café da manhã antes, bora que tô com fome!',
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
      textPtBR: "Caju ajoelhou no chão e abriu a mochila com cuidado. Caneta azul? Dentro. Lápis de cor? Dentro. Aí pegou o pincel preferido que gastou várias mesadas para comprar, embrulhou com carinho num pano. Era o item especial pras artes. Tudo no lugar certo. Caju sorriu. 'Agora sim... partiu café pretinho quentinho!'",
      emoji: '🎒',
      choices: [
        {
          id: '2a',
          text: 'Go have breakfast now',
          textEs: 'Ir a desayunar ahora',
          textPtBR: 'Ir tomar café agora',
          nextPage: 5,
        },
      ],
    },

    // ─── P3: Café Primeiro, Esqueceu o Pincel principal (BF_ONLY track start, narrative) ─
    {
      pageNumber: 3,
      text: "The table was set: warm bread with butter, orange juice, and scrambled eggs. Caju dug in without hesitating. When he finished, he glanced at the clock. 'Whoa!' He ran to his room and threw a bunch of stuff into his backpack in a rush. Only later, already at school, would he realize: Grandpa's wooden ruler had been left sitting on the table.",
      textEs: "La mesa estaba puesta: pan calientito con mantequilla, jugo de naranja y huevos revueltos. Caju se lanzó sin dudar. Cuando terminó, miró el reloj. '¡Uy!' Corrió a su cuarto y metió cosas a la mochila apurado. Solo después, ya en la escuela, se daría cuenta: la regla de madera del abuelo había quedado sobre la mesa.",
      textPtBR: "A mesa estava posta: pão quentinho com manteiga, suco de laranja e ovos mexidos. Caju atacou sem hesitar. Quando terminou, olhou pro relógio. 'Opa!' Correu pro quarto e jogou um monte de coisa na mochila às pressas. Só mais tarde, já na escola, é que ia perceber: O Pincel preferido tinha ficado em cima da mesa.",
      emoji: '🥐',
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
      textPtBR: "'LUCAS!' A voz da mãe veio como um trovão. Caju pulou da cama num susto e quase caiu. 'Tá na hora, meu filho! Você vai se atrasar!' Ela já tinha separado uma roupa qualquer. Caju escovou os dentes voando, enfiou os pés no tênis sem amarrar e jogou a mochila nas costas sem checar nada. Saiu pela porta correndo. Sem café. Sem organizar nada. Só a correria.",
      emoji: '😅',
      choices: [
        {
          id: '4a',
          text: "Off to school — no time to lose!",
          textEs: "¡A la escuela, no hay tiempo que perder!",
          textPtBR: "Pra escola, sem tempo a perder!",
          nextPage: 7,
        },
      ],
    },

    // ─── P5: Café da Manhã do Campeão (FULL confirmed, narrative) ─────────────
    {
      pageNumber: 5,
      text: "The table was set: bread with butter, juice, and a banana. Caju ate slowly, no rush at all. The backpack was already ready at the door — with Grandpa's ruler wrapped safely in its spot. 'Today I'm really prepared,' he thought. It was a good feeling. Like armor on the inside.",
      textEs: "La mesa estaba puesta: pan con mantequilla, jugo y un plátano. Caju comió despacio, sin ningún apuro. La mochila ya estaba lista en la puerta — con la regla del abuelo bien guardada en su lugar. 'Hoy estoy realmente preparado', pensó. Era una sensación buena. Como una armadura por dentro.",
      textPtBR: "A mesa estava posta: pão com manteiga, suco e uma banana. Caju comeu devagar, sem pressa nenhuma. A mochila já estava pronta na entrada — com Pincel embrulhado no lugarzinho certo. 'Hoje eu tô preparado de verdade', ele pensou. Era uma sensação boa. Tipo armadura por dentro.",
      emoji: '☕',
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
      textPtBR: "Caju andava em direção à escola quando aquela sensação ruim bateu. 'Meu Super Pinceeeeel!' Ele parou no meio da calçada e enfiou a mão na mochila. Nada. Olhou rua abaixo, como se ela fosse aparecer do nada. Não apareceu. Soltou um suspiro comprido e continuou andando. Talvez desse pra se virar sem ela. Talvez.",
      emoji: '😬',
      choices: [
        {
          id: '6a',
          text: "Keep walking — I'll figure it out",
          textEs: "Seguir caminando — ya lo resolveré",
          textPtBR: "Continuar — vai dar certo",
          nextPage: 9,
        },
      ],
    },

    // ─── P7: Caminho da Escola — NONE track (narrative) ──────────────────────
    {
      pageNumber: 7,
      text: "Caju arrived at school with his hair still a mess and his sneakers untied. Empty stomach, backpack unchecked. At the gate, security guard Seu Zé raised an eyebrow. 'Last one in, huh, Caju?' He flashed a nervous smile. 'Yeah... rough morning.' Inside, you could already hear the excited buzz of the whole school. The Marathon was about to start.",
      textEs: "Caju llegó a la escuela con el cabello revuelto y los tenis desatados. Estómago vacío, mochila sin revisar. En la entrada, el guardia Seu Zé levantó una ceja. '¿Llegaste el último, eh, Caju?' Él esbozó una sonrisa nerviosa. 'Sí... mañana difícil.' Adentro, ya se escuchaba el murmullo emocionado de toda la escuela. La Maratón estaba a punto de comenzar.",
      textPtBR: "Caju chegou na escola com o cabelo ainda bagunçado e o tênis desamarrado. Barriga vazia, mochila sem conferir. Na portaria, o vigia Seu Zé ergueu uma sobrancelha. 'Chegou por último, hein, Caju?' Ele abriu um sorriso nervoso. 'É... passei um aperto.' Lá dentro, já dava pra ouvir o burburinho animado de toda a escola. A Maratona ia começar.",
      emoji: '🏃',
      choices: [
        {
          id: '7a',
          text: "Into the school — head held high!",
          textEs: "¡Adentro, con la cabeza en alto!",
          textPtBR: "Pra dentro, de cabeça erguida!",
          nextPage: 10,
        },
      ],
    },

    // ─── P8: Caminho da Escola — FULL track (narrative) ──────────────────────
    {
      pageNumber: 8,
      text: "Caju left home with plenty of time. As he walked, he mentally checked everything off: 'Grandpa's ruler... check. Colored pencils... check. Water bottle... check.' He felt the sun on his face and breathed in that fresh morning air. A pigeon landed right in front of him. He stepped aside without rushing, smiling. It was the kind of morning that starts right.",
      textEs: "Caju salió de casa con tiempo de sobra. Mientras caminaba, repasó todo mentalmente: 'Regla del abuelo... sí. Lápices... sí. Botella de agua... sí.' Sintió el sol en la cara y respiró el aire fresco de la mañana. Una paloma aterrizó justo frente a él. Se hizo a un lado sin apuro, sonriendo. Era el tipo de mañana que empieza bien.",
      textPtBR: "Caju saiu de casa com tempo de sobra. Enquanto andava, foi conferindo mentalmente: 'Pincel... sim. Lápis de cor... sim. Garrafa d'água... sim.' Sentiu o sol no rosto e respirou fundo o ar fresco da manhã. Uma pomba pousou bem na frente dele. Ele desviou sem pressa, sorrindo. Era o tipo de manhã que começa certa.",
      emoji: '☀️',
      choices: [
        {
          id: '8a',
          text: "Heading to school, feeling great",
          textEs: "Rumbo a la escuela, sintiéndome genial",
          textPtBR: "Indo pra escola com tudo certo",
          nextPage: 11,
        },
      ],
    },

    // ─── P9: Pátio da Escola — BF_ONLY (friends give hints, uneasy) ──────────
    {
      pageNumber: 9,
      text: "In the schoolyard, Estrela came running. 'Caju! In chess, don't underestimate the Knight — it moves in L and can catch anyone off guard!' Beto arrived right behind her: 'In the physical challenge, posture and balance. Stay calm before you move.' Isabela gave him a pat on the shoulder: 'And in arts, always mix your colors on the palette before applying them — makes all the difference.' Caju took it all in, but one thought kept coming back: Grandpa's ruler was sitting at home.",
      textEs: "En el patio, Estrela llegó corriendo. '¡Caju! En ajedrez, no subestimes al Caballo — se mueve en L y agarra a todos desprevenidos!' Beto llegó justo detrás: 'En la actividad física, postura y equilibrio. Cálmate antes de moverte.' Isabela le dio una palmadita en el hombro: 'Y en artes, siempre mezcla los colores en la paleta antes de usarlos — hace toda la diferencia.' Caju absorbió todo, pero un pensamiento seguía regresando: la regla del abuelo estaba en casa.",
      textPtBR: "No pátio, Estrela apareceu correndo. 'Caju! No xadrez, não subestime o Cavalo, ele se move em L e pega todo mundo de surpresa!' Beto chegou logo atrás: 'Na atividade física, postura e equilíbrio. Calma antes de agir.'",
      emoji: '😬',
      choices: [
        {
          id: '9a',
          text: "I'll manage with what I have",
          textEs: "Me las arreglaré con lo que tengo",
          textPtBR: "Obrigado amigos, darei o meu melhor!",
          nextPage: 12,
        },
      ],
    },

    // ─── P10: Pátio da Escola — Ouvindo a tia  ─────────────────
    {
      pageNumber: 10,
      text: "Caju had barely stopped running when Estrela appeared out of nowhere. 'Knight does L in chess — don't forget!' Beto ran past shouting: 'Balance in the physical challenge! Think before you act!' And Isabela last: 'Mix the colors before painting, Caju!' He tried to lock it all in, but his head was racing and his stomach was growling so loud that Beto actually snickered. It was going to be quite a day.",
      textEs: "Caju apenas había parado de correr cuando Estrela apareció de la nada. '¡El Caballo hace L en ajedrez, no te olvides!' Beto pasó gritando: '¡Equilibrio en la prueba! ¡Piensa antes de actuar!' Y por último Isabela: '¡Mezcla los colores antes de pintar, Caju!' Intentó grabarlo todo, pero su cabeza estaba acelerada y el estómago rugía tan fuerte que Beto se rió. Iba a ser todo un día.",
      textPtBR: "Caju ouviu uma conversa ao longe, era da Professora Julia de Artes, foi se escondendo atrás das muretas e tentou ouvir o que ela falava para outra professora, ela desabafou que estava cansada de alunos tentando fazer desenhos realistas, ela sentia falta da alma nas pinturas, o que mais importava era a emoção!",
      emoji: '😰',
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
      textPtBR: "O Professor Almeida subiu no palco com um megafone. 'BEM-VINDOS À MEGA MARATONA!' Todo mundo gritou. Caju bateu palma junto, sentia que algo diferente e especial estava para acontecer'",
      emoji: '🏁',
      choices: [
        {
          id: '12a',
          text: "Into the Marathon!",
          textEs: "¡A la Maratón!",
          textPtBR: "Pra dentro da Maratona!",
          nextPage: 21,
        },
      ],
    },

    // =========================================================================
    // MARATHON PLACEHOLDER PAGES (15, 21, 27)
    // These will be replaced with the full chess/physical/arts challenges.
    // Each page signals a different preparation level entering the marathon.
    // =========================================================================

    // ─── P15: Xadrez — Trilha FULL ────────────────────────────────────────────
    {
      pageNumber: 12,
      text: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'Rodada um... COMECEM!'",
      textEs: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'Rodada um... COMECEM!'",
      textPtBR: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro, mochila embaixo da cadeira, mente afiada e tranquila. Seu adversário era um menino quieto e focado chamado Rodrigo, que fez um aceno respeitoso antes de começar. O Professor Almeida ergueu a mão. 'Rodada um... COMECEM!'",
      emoji: '♟️',
      choices: [
        {
          id: '15a',
          text: 'Começar a partida',
          textEs: 'Começar a partida',
          textPtBR: 'Começar a partida',
          nextPage: 16,
        },
      ],
    },

    // ─── P27: Xadrez — Trilha NONE ──────────────────────────────────────────────
    {
      pageNumber: 13,
      text: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro. Barriga vazia, mochila sem conferir. Mas o tabuleiro não sabia disso. As peças eram iguais pros dois lados. Caju encarou cada uma delas, soltou um fôlego devagar e tentou deixar tudo mais desaparecer.",
      textEs: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro. Barriga vazia, mochila sem conferir. Mas o tabuleiro não sabia disso. As peças eram iguais pros dois lados. Caju encarou cada uma delas, soltou um fôlego devagar e tentou deixar tudo mais desaparecer.",
      textPtBR: "Primeiro desafio: XADREZ! Caju sentou diante do tabuleiro. Barriga vazia, pois não teve tempo para tomar o café da manhã. Mas o tabuleiro não sabia disso. As peças eram iguais pros dois lados. Caju encarou cada uma delas, soltou um fôlego devagar e por causa da fome, esqueceu a melhor maneira de começar a partida.",
      emoji: '♟️',
      choices: [
        {
          id: '27a',
          text: 'Começar a partida',
          textEs: 'Começar a partida',
          textPtBR: 'Começar a partida',
          nextPage: 16,
        },
      ],
    },

    // =========================================================================
    // PARTIDA DE XADREZ (P16–P19)  —  Os três caminhos convergem aqui
    // P16 → P17 (momento decisivo) → P18 (sacrifício certo) ou P19 (recuo seguro)
    // =========================================================================

    // ─── P16: A Partida Começa ────────────────────────────────────────────────
    {
      pageNumber: 14,
      text: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      textEs: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      textPtBR: "Caju e Rodrigo se olharam por cima do tabuleiro. As peças estavam alinhadas, brancas de um lado, pretas do outro. Rodrigo pegou o Peão central e avançou dois espaços. Caju reconheceu a abertura e respondeu com o próprio Peão. Poucos lances depois, ficou claro que Rodrigo não era iniciante. Ele movia com cuidado, construindo uma posição sólida peça por peça. Mas Caju estava concentrado. Cada jogada tinha um motivo.",
      emoji: '♟️',
      choices: [
        {
          id: '16a',
          text: 'Continuar a partida',
          textEs: 'Continuar a partida',
          textPtBR: 'Continuar a partida',
          nextPage: 17,
        },
      ],
    },

    // ─── P17: O Momento Decisivo ──────────────────────────────────────────────
    {
      pageNumber: 15,
      text: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo. Caju olhou pro tabuleiro e a voz da Estrela voltou na cabeça dele: 'O Cavalo faz o L e pode virar o jogo inteiro.' Ele viu a oportunidade. Se o Cavalo sobrevivesse mais dois lances, dava pra saltar em L direto entre o Rei e a Rainha de Rodrigo ao mesmo tempo. Um garfo perfeito. Mas pra isso, a Torre de Caju teria que ficar no caminho da ameaça.",
      textEs: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo. Caju olhou pro tabuleiro e a voz da Estrela voltou na cabeça dele: 'O Cavalo faz o L e pode virar o jogo inteiro.' Ele viu a oportunidade. Se o Cavalo sobrevivesse mais dois lances, dava pra saltar em L direto entre o Rei e a Rainha de Rodrigo ao mesmo tempo. Um garfo perfeito. Mas pra isso, a Torre de Caju teria que ficar no caminho da ameaça.",
      textPtBR: "De repente, Rodrigo moveu a Torre para a coluna do Cavalo de Caju. Uma ameaça direta. O Cavalo estava em perigo, mas a única peça que poderia salvar o Cavalo era a sua própria Torre, que em um momento normal é mais valiosa que o Cavalo.",
      emoji: '🤔',
      choices: [
        {
          id: '17a',
          text: 'Sacrificar a Torre para salvar o Cavalo',
          textEs: 'Sacrificar a Torre para salvar o Cavalo',
          textPtBR: 'Perder a Torre para salvar o Cavalo',
          nextPage: 18,
        },
        {
          id: '17b',
          text: 'Recuar o Cavalo para lugar seguro',
          textEs: 'Recuar o Cavalo para lugar seguro',
          textPtBR: 'Recuar o Cavalo para lugar seguro',
          nextPage: 19,
        },
      ],
    },

    // ─── P18: O Salto do Cavalo ───────────────────────────────────────────────
    {
      pageNumber: 16,
      text: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      textEs: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      textPtBR: "Caju respirou fundo e avançou a Torre de propósito para frente da ameaça. Rodrigo franziu a testa. Era uma jogada estranha. Depois de um segundo, ele aceitou a troca. A Torre de Caju caiu. Mas o Cavalo ficou vivo. No lance seguinte, Caju viu a janela aberta. Cavalo para d4: um salto em L perfeito. Rei e Rainha de Rodrigo ameaçados ao mesmo tempo. Garfo. Rodrigo olhou pro tabuleiro. Olhou de novo. Fechou os olhos por um segundo e então estendeu a mão. 'Boa partida.'",
      emoji: '🏆',
      choices: [
        {
          id: '18a',
          text: 'Próxima etapa: atividade física!',
          textEs: 'Próxima etapa: atividade física!',
          textPtBR: 'Próxima etapa: atividade física!',
          nextPage: 20,
        },
      ],
    },

    // ─── P19: O Cavalo Recuou ─────────────────────────────────────────────────
    {
      pageNumber: 17,
      text: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A janela do garfo se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      textEs: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A janela do garfo se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      textPtBR: "Caju recuou o Cavalo para fora do perigo. Era a jogada sensata, a mais segura. O Cavalo estava salvo. Mas o momento havia passado. Rodrigo avançou a Torre com confiança e tomou o centro do tabuleiro. A chance de vitória se fechou para sempre. A partida continuou por mais alguns lances, mas a vantagem tinha ido embora. Quando o Professor Almeida anotou o resultado, Caju bateu a mão na testa. A dica da Estrela estava ali na memória o tempo todo. Ele só não tinha confiado nela.",
      emoji: '😔',
      choices: [
        {
          id: '19a',
          text: 'Próxima etapa: atividade física!',
          textEs: 'Próxima etapa: atividade física!',
          textPtBR: 'Próxima etapa: atividade física!',
          nextPage: 20,
        },
      ],
    },

    // =========================================================================
    // ATIVIDADE FÍSICA (P20–P26)
    // P20 → P22 (gincana) → P24 (êxito) ou P23 (fome aparece) → P25/P26
    // =========================================================================

    // ─── P20: A Prova Física ──────────────────────────────────────────────────
    {
      pageNumber: 18,
      text: "O Professor Almeida soou o apito. 'Segunda etapa... ATIVIDADE FÍSICA!' A turma toda correu pro pátio externo. Beto já estava no centro, saltando no lugar pra esquentar. 'Caju! Postura e equilíbrio, lembra?' Era uma sequência de saltos laterais, agachamentos e corrida entre cones. Simples no papel, pesado na prática. Caju respirou fundo e olhou pras próprias pernas. O corpo sabia exatamente o que tinha recebido de manhã.",
      textEs: "O Professor Almeida soou o apito. 'Segunda etapa... ATIVIDADE FÍSICA!' A turma toda correu pro pátio externo. Beto já estava no centro, saltando no lugar pra esquentar. 'Caju! Postura e equilíbrio, lembra?' Era uma sequência de saltos laterais, agachamentos e corrida entre cones. Simples no papel, pesado na prática. Caju respirou fundo e olhou pras próprias pernas. O corpo sabia exatamente o que tinha recebido de manhã.",
      textPtBR: "O Professor Almeida soou o apito. 'Segunda etapa... ATIVIDADE FÍSICA!' A turma toda correu pro pátio externo. Beto já estava no centro, saltando no lugar pra esquentar. Caju respirou fundo e olhou pras próprias pernas. O corpo estava estava saudavel e a mente forte!",
      emoji: '🏃',
      choices: [
        {
          id: '20a',
          text: 'Pra pista!',
          textEs: 'Pra pista!',
          textPtBR: 'Pra pista!',
          nextPage: 22,
        },
      ],
    },

    // ─── P22: Gincana — Sequência de Saltos ──────────────────────────────────
    {
      pageNumber: 19,
      text: "O apito soou. Caju saiu da linha. Três saltos laterais, dois agachamentos, sprint até o cone. Nos primeiros saltos, tudo certo. Mas no segundo agachamento a barriga fez um ronco alto, o tipo que todo mundo ao redor consegue ouvir. O menino da faixa do lado olhou. Caju não olhou de volta. Sentiu as pernas tremerem levinho. Era hora de decidir como encarar o que estava chegando.",
      textEs: "O apito soou. Caju saiu da linha. Três saltos laterais, dois agachamentos, sprint até o cone. Nos primeiros saltos, tudo certo. Mas no segundo agachamento a barriga fez um ronco alto, o tipo que todo mundo ao redor consegue ouvir. O menino da faixa do lado olhou. Caju não olhou de volta. Sentiu as pernas tremerem levinho. Era hora de decidir como encarar o que estava chegando.",
      textPtBR: "O apito soou. Caju saiu da linha, e avistou a primeira etapa: 'corrida de 200 metros', o que ele deveria fazer?",
      emoji: '🏅',
      choices: [
        {
          id: '22a',
          text: 'Respirar fundo e terminar no ritmo',
          textEs: 'Respirar fundo e terminar no ritmo',
          textPtBR: 'Respirar fundo e manter o ritmo até o final',
          nextPage: 24,
        },
        {
          id: '22b',
          text: 'A barriga está falando mais alto que as pernas',
          textEs: 'A barriga está falando mais alto que as pernas',
          textPtBR: 'Correr o mais rápido possível, assim ficaria na frente no início!',
          nextPage: 23,
        },
      ],
    },

    // ─── P23: A Fome Aparece ──────────────────────────────────────────────────
    {
      pageNumber: 20,
      text: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textEs: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textPtBR: "Caju foi bem, manteve o ritmo, mas a sua barriga começou a roncar alto, o que fez com que ele perdesse o foco e começasse a sen tir tontura, tropeçou no final e caiu no chão, perdendo a corrida e a prova física.",
      emoji: '😵',
      choices: [
        {
          id: '23b',
          text: 'Ser honesto: pedir uma pausa ao Professor',
          textEs: 'Ser honesto: pedir uma pausa ao Professor',
          textPtBR: 'Droga, por que não me preparei melhor no café da manhã?',
          nextPage: 26,
        },
      ],
    },

        // ─── P23: COrreu muito rápido──────────────────────────────────────────────────
    {
      pageNumber: 21,
      text: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textEs: "No terceiro agachamento a cabeça rodou. Não muito, mas o suficiente pra Caju parar, segurar o joelho e respirar. Beto veio correndo. 'Ei, tá bem?' Caju olhou pro cronômetro ainda rodando. Ainda dava pra tentar. A barriga vazia estava cobrando tudo que ele não tinha colocado nela de manhã. Faltava uma última decisão.",
      textPtBR: "Ele correu o mais rápido que pôde, sentiu o gosto da vitória, viu os competidores ficando para tras, mas começou a sentir o cansaço batendo, e antes da corrida acabar, ele não aguentou o ritmo e acabou ficando em terceiro lugar.",
      emoji: '😵',
      isEnding: true,
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
      textPtBR: '"1, 2, 3... estou indo bem, mantenha o ritmo Caju, força", pensou Caju, e assim dando muito de si, ele conseguiu vencer a etapa da corrida! Agora era a etapa da luta, preparar o Kimono, vamos lutar Judô!',
      emoji: '🌟',
      choices: [
        {
          id: '24a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Já assisti todos os episódios de Dragon Ball, isso será fácil, OSS!',
          nextPage: 28,
        },
      ],
    },

    {
      pageNumber: 23,
      text: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textEs: "Caju terminou a sequência limpa. Postura, ritmo, sprint. O cronômetro parou. Beto socou o ar. 'Isso sim!' Alguém no fundo começou a bater palma e mais três ou quatro pegaram junto. Caju dobrou levemente, mãos nos joelhos, respiração pesada, mas sorrindo. O café da manhã tinha feito o seu trabalho silenciosamente.",
      textPtBR: 'O seu oponente era maior e mais forte que ele, mas Caju sabia que força não vence a tecnica!',
      emoji: '🌟',
      choices: [
        {
          id: '24a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Ir com tudo, não tenho nada a perder! Seguro forte o kimino e começo a empurrar ele para fora do tatame!',
          nextPage: 28,
        },
        {
          id: '24a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Faço a pegada no kimono, olhos atentos, e tento desequilibrar ele para o lado, mesmo ele sendo mais forte e vindo para cima de mim.',
          nextPage: 28,
        },
      ],
    },


    // ─── P25: A Queda ────────────────────────────────────────────────────────
    {
      pageNumber: 24,
      text: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textEs: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textPtBR: "Caju empurrou, empurrou e o oponente aproveitou isso para aplicar um forte golpe, como Caju estava fazendo muita força e o oponente usou isso a seu favor para desequilibrar Caju, ele acabou caindo no chão, perdendo a prova física.",
      emoji: '😞',
      isEnding: true,
      choices: [
        {
          id: '25a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'É... eu acho esqueci os princípios das artes marciais!',
          nextPage: 28,
        },
      ],
    },

        {
      pageNumber: 25,
      text: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textEs: "Caju empurrou. No último agachamento as pernas simplesmente pararam no meio do movimento. Ele não caiu de vez, mas o joelho tocou o chão e ficou ali por um segundo, cabeça baixa, pátio em silêncio. O Professor Almeida se aproximou devagar. 'Descansa, Caju. A Maratona é longa e você ainda tem as artes.' Derrota na prova física. Mas havia uma etapa pela frente, e ela não dependia de perna.",
      textPtBR: "O oponente estava quase vencendo, mas Caju não desistiu, e usou o peso do oponente contra ele, e conseguiu derrubá-lo, vencendo a prova física!",
      emoji: '😞',
      choices: [
        {
          id: '25a',
          text: 'Última etapa: artes!',
          textEs: 'Última etapa: artes!',
          textPtBR: 'Huhuw! Eu venci! Não acredito!',
          nextPage: 28,
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
      textPtBR: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Tirar o Pincel especial da mochila',
          nextPage: 29,
        },
      ],
    },

    {
      pageNumber: 27,
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "Nããão! Esqueci o meu Pincel Especial em casa, eu... eu... esqueci de arrumar a mochila! Droga, o que eu faço agora?",
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
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "Certo, eu tenho o Pincel Especial aqui na mochila, essa é a última etapa, eu preciso conseguir! Eu me preparei pra isso, eu sei que posso vencer!",
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Fazer um retrato realista com muitos detalhes incríveis.',
          nextPage: 29,
        },
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Deixar o seu coração falar pelo pincel, e entregar uma arte cheia de sentimento.',
          nextPage: 29,
        },
      ],
    },

    {
      pageNumber: 29,
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "Muito bem, o seu quadro ficou lindo, mas não me tocou ao ponto de te dar o Primeiro Lugar.",
      emoji: '🎨',
      isEnding: true,
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Cheguei tão perto...',
          nextPage: 29,
        },
      ],
    },

        {
      pageNumber: 30,
      text: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textEs: "O Professor Almeida anunciou a última etapa: 'ARTES!' A turma seguiu pro corredor da sala de arte. Isabela apareceu do lado de Caju. 'Misturou as cores na paleta primeiro, né?' Ele assentiu. Dentro, cada aluno recebeu uma tela em branco, tintas e pincéis. O tema era 'Seu dia até agora.' Caju olhou pros pincéis que estavam na mesa. Depois olhou pra mochila.",
      textPtBR: "É isso! A sua arte é a mais criativa, a mais original, a que mais se destacou e me tocou, meus parabéns Caju, te dou o Primeiro Lugar em Artes!",
      emoji: '🎨',
      choices: [
        {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Eu sabia que era disso que a arte se tratava, não é só técnica, é sentimento, é expressão, obrigado professora!',
          nextPage: 29,
        },
      ],
    },


    // ─── P29: O Pincel Especial ───────────────────────────────────────────────
    {
      pageNumber: 31,
      text: "Caju desenrolou o pano devagar e tirou o Pincel. O mesmo que tinha guardado com tanto cuidado de manhã. Ficou segurando por um segundo antes de abrir os potes de tinta. Misturou as cores na paleta como a Isabela tinha ensinado. A primeira pincelada foi com confiança. A segunda também. O que apareceu na tela surpreendeu até ele mesmo. O Mestre Mago Kashew passou pela sala devagar, olhando os trabalhos. Quando chegou na tela de Caju, parou. Ficou ali por um tempo bom. Depois virou, olhou pra ele e sorriu.",
      textEs: "Caju desenrolou o pano devagar e tirou o Pincel. O mesmo que tinha guardado com tanto cuidado de manhã. Ficou segurando por um segundo antes de abrir os potes de tinta. Misturou as cores na paleta como a Isabela tinha ensinado. A primeira pincelada foi com confiança. A segunda também. O que apareceu na tela surpreendeu até ele mesmo. O Mestre Mago Kashew passou pela sala devagar, olhando os trabalhos. Quando chegou na tela de Caju, parou. Ficou ali por um tempo bom. Depois virou, olhou pra ele e sorriu.",
      textPtBR: "Todos se reuniram no grande salão, e então anunciaram Juca como o grande vencedor da Maratona! Todos aplaudiram, o diretor entregou a medalha e o troféu, os amigos levantaram Juca e celebraram como se tivessem vencido uma Copa do Mundo de Futebol!",
      emoji: '🖌️',
      choices: [
               {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Esse é o melhor dia da minha vida!',
          nextPage: 29,
        },
      ],
    },

    // ─── P30: Criativo, Mas Sem o Pincel ─────────────────────────────────────
    {
      pageNumber: 32,
      text: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textEs: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textPtBR: "A maioria dos alunos e funcionários já tinham ido embora, Juca terminou de se despedir de seus amigos e começou a seguir para a saída, quando o diretor o chamou 'Juca! Espere! Tem alguem que gostaria de ve-lo, me siga até a minha sala, pois ele não quer ser visto pelos outros.'",
      emoji: '😔',
      choices: [
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Seguir o diretor para a sala dele.',
          nextPage: 29,
        },
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Ir embora para a casa',
          nextPage: 29,
        },
      ],
    },

    {
      pageNumber: 33,
      text: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textEs: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textPtBR: "Juca chegou em casa, mostrou para seus pais a medalha e o troféu, e contou tudo o que aconteceu na Maratona, ele estava tão feliz que não conseguia parar de falar, e seus pais ficaram muito orgulhosos dele, e disseram que ele tinha se saído muito bem, comeram uma bela parmegiana e tiveram uma noite muito feliz juntos!",
      emoji: '😔',
      isEnding: true,
      choices: [
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Indo dormir, Juca sentiu que algo estava faltando, e se perguntou se realmente escolheu o caminho certo.',
          nextPage: 29,
        }
      ],
    },

    
    {
      pageNumber: 34,
      text: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textEs: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textPtBR: "Entrando na sala, Juca viu o Mestre Mago Kashew sentado atrás da mesa do diretor, ele se levantou e disse 'Juca, eu queria te parabenizar pela sua vitória na Maratona, você mostrou muita coragem, determinação e talento, você enfim chegou em uma fase da vida em que pode me ajudar!' Juca ficou sem palavras por um segundo, mas conseguiu agradecer, ficou curioso e com um certo receio sobre esse pedido.",
      emoji: '😔',
      choices: [
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Sente-se, irei te contar o que você precisa saber por enquanto.',
          nextPage: 29,
        }
      ],
    },

        {
      pageNumber: 35,
      text: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textEs: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textPtBR: "Então Mestre Mago Kashew começou a falar, 'Juca, o mundo esta tomando um caminho muito perigoso, não é normal existirem tantas guerras, fome, medo e ódio, alguem está alterando os rumos das histórias, e meu coração diz que você tem um papel importante, que você tem um toque da magia e isso será capaz de te tornar um grande herói!'",
      emoji: '😔',
      choices: [
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Juca fica com os olhos arregalados, e diz \'Meu Deus será que serei super poderoso?! AAA QUE SONHO!\'',
          nextPage: 29,
        }
      ],
    },

           {
      pageNumber: 36,
      text: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textEs: "Caju enfiou a mão na mochila. Nada. Só os pincéis genéricos da mesa, iguais aos de todos. Ele fechou os olhos por um segundo. Tinha esquecido. Escolheu o melhor dos disponíveis, misturou as cores na paleta como a Isabela tinha dito, e a ideia que apareceu na cabeça era boa, talvez até ótima. Mas na hora de executar, a falta do Pincel especial apareceu em cada traço. O Mestre Mago Kashew parou em frente ao trabalho de Caju, assentiu devagar e disse com calma: 'Boa ideia. Da próxima vez, traga suas ferramentas.'",
      textPtBR: "Então Mestre Mago Kashew continuou: Você terá que entrar em vários momentos da historia, e em cada um deles, terá que tomar as decisões certas, pois se você é realmente quem eu imagino que seja, irá trazer a paz para o Mundo, e viveremos a história que sempre sonhamos! Você está pronto para isso?!",
      emoji: '😔',
      choices: [
             {
          id: '28a',
          text: 'Tirar o Pincel especial da mochila',
          textEs: 'Tirar o Pincel especial da mochila',
          textPtBR: 'Sim! Vamos nessa!',
          nextPage: 29,
        }
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

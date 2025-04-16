const moviesList = [
  {
    id: 1,
    title: "A Origem",
    year: 2010,
    description:
      "Dom Cobb é um especialista em 'extração', uma técnica de roubo de informações valiosas que são obtidas através da invasão dos sonhos de uma pessoa. Quando ele é abordado para realizar o oposto – 'inserção' de uma ideia na mente de um alvo – ele vê uma chance de finalmente limpar seu nome e retornar para sua família. Porém, à medida que se aprofunda em sua missão, ele começa a ser assombrado por lembranças do seu passado que ameaçam o sucesso de sua missão.",
  },
  {
    id: 2,
    title: "Matrix",
    year: 1999,
    description:
      "Neo é um hacker comum que leva uma vida monótona até começar a ser perseguido por agentes misteriosos. Quando é abordado por Morpheus, um líder de um movimento revolucionário, Neo descobre que a realidade que conhece é, na verdade, uma simulação criada por máquinas para subjugar a humanidade. Agora, com a ajuda de outros rebeldes, Neo precisa enfrentar um sistema de controle imensurável e descobrir qual é o seu papel em uma guerra para libertar a humanidade.",
  },
  {
    id: 3,
    title: "Interestelar",
    year: 2014,
    description:
      "Em um futuro não muito distante, a Terra está à beira do colapso devido a uma crise ambiental que ameaça a sobrevivência humana. Um grupo de exploradores, liderado pelo piloto e engenheiro Cooper, é enviado através de um buraco de minhoca em busca de um novo planeta habitável. A jornada os leva a um cenário deslumbrante e arriscado, onde as leis da física são desafiadas, e as relações humanas são postas à prova em nome da sobrevivência da espécie.",
  },
  {
    id: 4,
    title: "O Cavaleiro das Trevas",
    year: 2008,
    description:
      "Em Gotham City, Batman precisa enfrentar seu maior inimigo até agora: o Coringa, um criminoso imprevisível e anárquico que quer destruir a cidade. Com uma estratégia baseada no caos, o Coringa desafia Batman e toda a ordem estabelecida, levando o herói a questionar seus próprios métodos e limites. O filme aborda questões como moralidade, lealdade e os sacrifícios feitos em nome da justiça.",
  },
  {
    id: 5,
    title: "Forrest Gump: O Contador de Histórias",
    year: 1994,
    description:
      "Forrest Gump é um homem simples com um QI abaixo da média, mas com uma série de experiências extraordinárias ao longo de sua vida. Desde sua infância na década de 1950 até sua jornada como herói de guerra, empresário e ícone cultural, Forrest nos leva através de momentos marcantes da história dos Estados Unidos, sempre com sua visão única e positiva da vida. O filme explora temas de destino, amor e superação, com um toque de humor e emoção.",
  },
  {
    id: 6,
    title: "Um Sonho de Liberdade",
    year: 1994,
    description:
      "Andy Dufresne é condenado a duas penas de prisão perpétua por um crime que não cometeu. Ao longo de sua vida na prisão de Shawshank, ele desenvolve uma amizade com Ellis Boyd 'Red' Redding, um prisioneiro veterano, e gradualmente se torna uma figura central na instituição. Enquanto Andy tenta encontrar uma maneira de escapar, o filme explora temas como esperança, amizade, e a luta pela liberdade em um ambiente opressor.",
  },
  {
    id: 7,
    title: "Pulp Fiction: Tempo de Violência",
    year: 1994,
    description:
      "Em Los Angeles, histórias interligadas de violência, redenção e lealdade se desenrolam de maneira não linear. O filme segue os destinos de vários personagens, como um casal de criminosos em fuga, dois assassinos que tentam encontrar um novo propósito e um boxeador em uma luta contra seu destino. 'Pulp Fiction' é uma obra que mistura humor e violência, com diálogos afiados e personagens memoráveis que questionam a moralidade e o acaso.",
  },
  {
    id: 8,
    title: "O Poderoso Chefão",
    year: 1972,
    description:
      "A história da família Corleone, uma das mais poderosas e influentes famílias mafiosas da América, é contada através de Michael Corleone, o filho mais novo do chefe da família, Vito Corleone. Enquanto o pai tenta proteger sua família e seu império do crime, Michael é relutante em se envolver, mas a violência e os eventos imprevistos acabam forçando-o a assumir o controle. O filme explora temas de poder, lealdade, e o custo pessoal das escolhas feitas em nome da família.",
  },
  {
    id: 9,
    title: "Clube da Luta",
    year: 1999,
    description:
      "O protagonista do filme é um homem desiludido e insatisfeito com sua vida, que sofre de insônia e busca um propósito no consumo e no materialismo. Sua vida dá uma reviravolta quando ele conhece Tyler Durden, um carismático e radical líder que funda o 'Clube da Luta', um grupo de homens que buscam libertar-se das normas sociais através de lutas brutais. O filme explora temas como identidade, consumismo, e o que significa ser homem na sociedade contemporânea.",
  },
  {
    id: 10,
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    year: 2001,
    description:
      "Frodo Bolseiro, um hobbit, é encarregado de uma missão vital: destruir o Um Anel, um artefato poderoso e maligno que pode trazer destruição ao mundo. Acompanhado por seus amigos e por uma sociedade de heróis, Frodo inicia uma jornada épica que o leva através de terras misteriosas, perigosas e repletas de inimigos, incluindo o sombrio Sauron, que quer controlar o anel. A história aborda temas de coragem, sacrifício e amizade, com um mundo rico e detalhado.",
  },
  {
    id: 11,
    title: "Bastardos Inglórios",
    year: 2009,
    description:
      "Durante a Segunda Guerra Mundial, um grupo de soldados judeus-americanos conhecidos como 'Bastardos Inglórios' têm como missão caçar e matar nazistas. Paralelamente, uma jovem judia, Shosanna, que perdeu sua família para os nazistas, planeja sua própria vingança. As histórias desses personagens se entrelaçam até um clímax explosivo. O filme mistura elementos de comédia, drama e ação, explorando a vingança, a violência e os horrores da guerra.",
  },
  {
    id: 12,
    title: "Gladiador",
    year: 2000,
    description:
      "Maximus, um general romano, vê sua vida virar de cabeça para baixo quando o imperador, Marcus Aurelius, é morto e seu filho, Commodus, assume o poder. Traído e forçado a lutar como escravo, Maximus busca vingança contra o novo imperador enquanto se envolve em batalhas sangrentas na arena, desafiando seu destino. O filme trata de temas como honra, lealdade e a busca pela justiça, ambientado na grandiosidade do Império Romano.",
  },
  {
    id: 13,
    title: "O Regresso",
    year: 2015,
    description:
      "Em uma época selvagem e inexplorada, Hugh Glass, um caçador de peles, é deixado para morrer após ser gravemente ferido por um urso. Sua sobrevivência se torna uma luta implacável pela vingança e pela vida, enquanto ele tenta retornar ao seu grupo e confrontar os homens que o traíram. O filme é uma reflexão sobre a resistência humana, a natureza selvagem e o instinto de sobrevivência, com uma cinematografia impressionante.",
  },
  {
    id: 14,
    title: "Blade Runner 2049",
    year: 2017,
    description:
      "Em um futuro distópico, K, um novo blade runner, descobre um segredo que poderia mudar o curso da humanidade. Sua busca por respostas o leva a encontrar Rick Deckard, o blade runner desaparecido. O filme lida com questões de identidade, humanidade e a relação entre homem e máquina, enquanto explora um mundo sombrio e visualmente deslumbrante.",
  },
  {
    id: 15,
    title: "A Rede Social",
    year: 2010,
    description:
      "Baseado na verdadeira história de Mark Zuckerberg e a criação do Facebook, o filme mostra os conflitos legais e pessoais que surgiram enquanto a rede social se tornava um fenômeno global. Em meio a acusações de traição e roubo de ideias, a história explora os limites da amizade, da ambição e do poder na era digital.",
  },
  {
    id: 16,
    title: "O Rei Leão",
    year: 1994,
    description:
      "Simba é um jovem leão destinado a ser rei de Pride Rock, mas após a morte de seu pai, Mufasa, ele foge do reino, acreditando ser responsável pela tragédia. Ao crescer, ele retorna para enfrentar seu destino, com a ajuda de seus amigos Timão e Pumba. O filme explora temas de coragem, responsabilidade e redenção.",
  },
  {
    id: 17,
    title: "Cidadão Kane",
    year: 1941,
    description:
      "Charles Foster Kane, um magnata da mídia, morre misteriosamente, deixando atrás de si um legado de poder e solidão. Um repórter investiga as últimas palavras de Kane, 'Rosebud', tentando descobrir o significado de sua vida. O filme é uma exploração profunda da corrupção do poder e do vazio das conquistas materiais.",
  },
  {
    id: 18,
    title: "Psicose",
    year: 1960,
    description:
      "Marion Crane, uma mulher em fuga após roubar uma grande quantia de dinheiro, encontra refúgio no motel Bates, administrado por Norman Bates. Mas o que começa como uma estadia inocente logo se transforma em um pesadelo psicológico, onde nada é o que parece ser.",
  },
  {
    id: 19,
    title: "O Silêncio dos Inocentes",
    year: 1991,
    description:
      "Clarice Starling, uma jovem agente do FBI, é designada para entrevistar Hannibal Lecter, um brilhante, mas perigoso, psiquiatra canibal preso, na esperança de obter pistas sobre um serial killer à solta. O filme explora os limites da mente humana e o confronto com o mal.",
  },
  {
    id: 20,
    title: "Titanic",
    year: 1997,
    description:
      "Rose, uma jovem da alta sociedade, e Jack, um artista pobre, se apaixonam a bordo do RMS Titanic. O romance se desenrola enquanto o navio encontra seu trágico destino. O filme mistura um épico romance com a dramática história do naufrágio mais famoso da história.",
  },
  {
    id: 21,
    title: "A Lista de Schindler",
    year: 1993,
    description:
      "Oskar Schindler, um empresário alemão, salva a vida de mais de mil judeus durante o Holocausto, empregando-os em sua fábrica. O filme aborda a importância da humanidade em tempos de crueldade e a capacidade de uma pessoa mudar o destino de muitos.",
  },
  {
    id: 22,
    title: "Donnie Brasco",
    year: 1997,
    description:
      "Joseph D. Pistone, um agente do FBI, se infiltra na máfia de Nova York sob o disfarce de Donnie Brasco. Ao longo de sua missão, ele se envolve emocionalmente com os membros da máfia, o que o coloca em um dilema moral sobre sua lealdade e identidade.",
  },
  {
    id: 23,
    title: "O Exorcista",
    year: 1973,
    description:
      "A jovem Regan começa a mostrar sinais de possessão demoníaca, o que leva sua mãe a buscar ajuda de dois padres. Eles enfrentam um exorcismo para salvar a alma de Regan. O filme é um dos maiores clássicos do terror, explorando a luta entre o bem e o mal de maneira intensa e perturbadora.",
  },
  {
    id: 24,
    title: "O Grande Lebowski",
    year: 1998,
    description:
      "Jeffrey 'The Dude' Lebowski é um homem preguiçoso e entusiasta do boliche que se vê envolvido em um caso de identidade trocada. Com seu estilo irreverente e amigos excêntricos, ele se vê em situações absurdas e hilárias, enquanto tenta resolver o mistério que o envolve.",
  },
  {
    id: 25,
    title: "O Iluminado",
    year: 1980,
    description:
      "Jack Torrance, um escritor, aceita um emprego como zelador de inverno no isolado hotel Overlook. Ao lado de sua família, ele começa a perder a sanidade devido às forças sobrenaturais do hotel. O filme, baseado em Stephen King, é uma das maiores obras de terror psicológico.",
  },
  {
    id: 26,
    title: "O Pianista",
    year: 2002,
    description:
      "Władysław Szpilman, um talentoso pianista judeu, sobrevive ao cerco de Varsóvia durante a Segunda Guerra Mundial e às atrocidades do Holocausto. O filme é uma poderosa narrativa sobre sobrevivência, resistência e a busca pela arte em tempos de desespero.",
  },
  {
    id: 27,
    title: "Her",
    year: 2013,
    description:
      "Theodore Twombly, um homem solitário que trabalha escrevendo cartas pessoais para outras pessoas, começa a desenvolver um relacionamento romântico com seu sistema operacional, que possui inteligência artificial. O filme explora as questões emocionais e filosóficas da tecnologia na era moderna.",
  },
  {
    id: 28,
    title: "O Labirinto do Fauno",
    year: 2006,
    description:
      "Em meio à guerra civil espanhola, Ofelia, uma jovem garota, descobre um misterioso labirinto onde encontra um fauno que a guia em uma jornada para cumprir três tarefas. O filme mistura fantasia e realidade de forma magistral, abordando temas como o escapismo e o poder da imaginação diante do sofrimento.",
  },
  {
    id: 29,
    title: "A Vida é Bela",
    year: 1997,
    description:
      "Guido, um judeu italiano, usa sua imaginação e bom humor para proteger seu filho dos horrores de um campo de concentração nazista. O filme é uma emocionante mistura de comédia e drama, celebrando a capacidade humana de encontrar beleza e esperança, mesmo nas situações mais desesperadoras.",
  },
  {
    id: 30,
    title: "Fargo",
    year: 1996,
    description:
      "Jerry Lundegaard, um vendedor de carros, organiza um sequestro de sua esposa para conseguir dinheiro. O plano sai completamente errado, levando a uma série de eventos violentos e absurdos em uma cidade rural de Minnesota. O filme mistura humor negro, mistério e crime.",
  },
  {
    id: 31,
    title: "A Vida Secreta de Walter Mitty",
    year: 2013,
    description:
      "Walter Mitty, um homem comum que vive uma vida monótona, começa a viver suas fantasias e aventuras quando seu emprego está em risco. O filme é uma reflexão sobre o desejo de escapar da rotina e encontrar significado na vida, repleta de momentos visuais e emocionais inspiradores.",
  },
  {
    id: 32,
    title: "Mad Max: Estrada da Fúria",
    year: 2015,
    description:
      "Em um futuro pós-apocalíptico, Max, um homem que perdeu sua família, se une a Furiosa, uma mulher em busca de liberdade, enquanto fogem de um tirano. O filme é uma impressionante jornada de ação e sobrevivência, com cenas de perseguição intensas e uma forte mensagem sobre a luta pela liberdade.",
  },
  {
    id: 33,
    title: "O Lobo de Wall Street",
    year: 2013,
    description:
      "Jordan Belfort, um corretor de ações, sobe ao topo do mundo financeiro através de fraudes e corrupção. O filme segue sua jornada de excessos e decadência, explorando temas como ganância, vícios e o custo de uma vida de excessos.",
  },
  {
    id: 34,
    title: "O Curioso Caso de Benjamin Button",
    year: 2008,
    description:
      "Benjamin Button nasce com a aparência de um homem idoso e, ao longo da vida, rejuvenesce. O filme segue sua jornada incomum enquanto ele vive a vida ao contrário, e explora temas como o tempo, a mortalidade e o amor.",
  },
  {
    id: 35,
    title: "E.T. - O Extraterrestre",
    year: 1982,
    description:
      "Quando um extraterrestre chamado E.T. é acidentalmente deixado na Terra, ele forma uma amizade com um jovem garoto chamado Elliott. Juntos, eles tentam esconder E.T. das autoridades e ajudá-lo a voltar para casa. O filme é um clássico da ficção científica, repleto de emoção e imaginação.",
  },
  {
    id: 36,
    title: "Star Wars: Episódio IV - Uma Nova Esperança",
    year: 1977,
    description:
      "Luke Skywalker, um jovem fazendeiro, é recrutado por um grupo rebelde para ajudar a destruir a Estrela da Morte, uma arma imperial capaz de destruir planetas. O filme é uma aventura épica de ficção científica que estabelece os fundamentos de uma das franquias mais icônicas da história do cinema.",
  },
  {
    id: 37,
    title: "Vingadores: Ultimato",
    year: 2019,
    description:
      "Os Vingadores restantes tentam reverter os danos causados por Thanos, após ele ter eliminado metade da população do universo. O filme é a culminação de mais de uma década de histórias, trazendo uma batalha épica entre heróis e vilões.",
  },
  {
    id: 38,
    title: "O Fabuloso Destino de Amélie Poulain",
    year: 2001,
    description:
      "Amélie é uma jovem mulher introvertida que decide mudar a vida das pessoas ao seu redor para melhor, enquanto descobre o amor e a felicidade para si mesma. O filme é uma celebração da vida simples, com uma visão otimista e encantadora.",
  },
  {
    id: 39,
    title: "Os Incríveis",
    year: 2004,
    description:
      "A família Parr tem superpoderes, mas vive escondida devido a leis que proíbem heróis. Quando o vilão Syndrome ameaça a cidade, os membros da família precisam usar seus poderes para salvar o mundo. O filme é uma divertida e emocionante animação que mistura ação com temas sobre família e identidade.",
  },
  {
    id: 40,
    title: "Requiem for a Dream",
    year: 2000,
    description:
      "Quatro indivíduos se veem consumidos pelo vício e pela busca de seus sonhos, com consequências devastadoras. O filme é uma exploração brutal da dependência química e das ilusões da felicidade, utilizando uma narrativa perturbadora e uma cinematografia única.",
  },
];

module.exports = moviesList
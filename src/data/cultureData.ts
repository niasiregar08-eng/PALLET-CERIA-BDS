export interface ZoneData {
  id: string;
  title: string;
  areas: string;
  culture: string;
  color: string;
  borderColor: string;
  shadowColor: string;
  bgLight: string;
  badge: string;
  desc: string;
  facts: string[];
}

export interface FamilyTerm {
  title: string;
  term: string;
  note: string;
}

export interface GreetingPhrase {
  id: number;
  phrase: string;
  local: string;
  meaning: string;
}

export interface CultureDictionary {
  cultureName: string;
  icon: string;
  color: string;
  family: FamilyTerm[];
  greetings: GreetingPhrase[];
}

export interface EncyclopediaItem {
  id: string;
  category: 'kuliner' | 'alat_musik' | 'pakaian_adat' | 'tradisi';
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  shortDesc: string;
  origin: string;
  story: string;
}

export interface MatchingItem {
  id: number;
  greeting: string;
  correctSuku: 'Melayu' | 'Karo' | 'Simalungun';
}

export interface CostumeItem {
  name: string;
  wornBy: 'Pria' | 'Wanita' | 'Pria & Wanita';
  desc: string;
  icon: string;
}

export interface ArtItem {
  name: string;
  type: 'Alat Musik' | 'Seni Teater/Sastra' | 'Seni Kerajinan';
  desc: string;
  icon: string;
}

export interface DanceCultureItem {
  id: string;
  suku: 'Melayu' | 'Karo' | 'Simalungun';
  danceName: string;
  tagline: string;
  badge: string;
  icon: string;
  historyOrigin: string;
  philosophy: string;
  movements: { title: string; desc: string }[];
  musicAccompaniment: string;
  attireName: string;
  attireDetails: CostumeItem[];
  kesenianTradisi: ArtItem[];
  funFact: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface DiceTile {
  id: number;
  title: string;
  question: string;
  options: string[];
  ans: number;
}

export interface FolkSongItem {
  id: string;
  suku: 'Melayu' | 'Karo' | 'Simalungun';
  title: string;
  composer?: string;
  origin: string;
  tempo: string;
  badge: string;
  icon: string;
  meaning: string;
  story: string;
  lyrics: { original: string; indonesian: string }[];
  audioMelodyNotes?: string;
}

export interface SentenceScrambleItem {
  id: string;
  suku: 'Melayu' | 'Karo' | 'Simalungun';
  title: string;
  meaning: string;
  scrambledWords: string[];
  correctSentence: string;
  hint: string;
}

export interface CrosswordClue {
  id: number;
  direction: 'across' | 'down';
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export interface ExpeditionCheckpoint {
  id: number;
  name: string;
  location: string;
  challenge: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  artifactFound: string;
  artifactIcon: string;
}

export interface ExpeditionZoneItem {
  zoneId: string;
  zoneTitle: string;
  color: string;
  borderColor: string;
  badge: string;
  icon: string;
  lore: string;
  checkpoints: ExpeditionCheckpoint[];
}

export const ZONES_DATA: ZoneData[] = [
  {
    id: 'pesisir',
    title: 'Zona 1: Pesisir & Bahari',
    areas: 'Pantai Cermin, Hamparan Perak, Percut Sei Tuan',
    culture: 'Kebudayaan Melayu Deli & Serdang',
    color: 'bg-cyan-400',
    borderColor: 'border-cyan-800',
    shadowColor: 'shadow-[0_8px_0_#0e7490]',
    bgLight: 'bg-cyan-50',
    badge: '🌊 Pesisir Pantai',
    desc: 'Wilayah pesisir kaya dengan tradisi nelayan Melayu, tarian Zapin/Serampang Duabelas, pantun, dan keindahan perairan Selat Malaka.',
    facts: [
      'Pusat bersejarah Kedatuan Melayu dan Muara Sungai Percut.',
      'Dikenal dengan hasil laut seperti kepiting bakau, udang galah, dan ikan terubuk.',
      'Tradisi Jamu Laut diselenggarakan sebagai rasa syukur nelayan pesisir.'
    ]
  },
  {
    id: 'perkotaan',
    title: 'Zona 2: Perkotaan & Dataran Rendah',
    areas: 'Lubuk Pakam (Ibu Kota), Deli Tua, Tanjung Morawa',
    culture: 'Pusat Pemerintahan & Akulturasi Budaya',
    color: 'bg-emerald-400',
    borderColor: 'border-emerald-800',
    shadowColor: 'shadow-[0_8px_0_#047857]',
    bgLight: 'bg-emerald-50',
    badge: '🏙️ Perkotaan Ceria',
    desc: 'Pusat denyut ekonomi dan administratif Kabupaten Deli Serdang. Rumah bagi keanekaragaman suku yang hidup rukun berpadu.',
    facts: [
      'Lubuk Pakam adalah ibu kota kabupaten yang asri dan meraih berbagai penghargaan kebersihan Adipura.',
      'Situs bersejarah Benteng Putri Hijau terdapat di area Deli Tua.',
      'Sentra kerajinan Anyaman Pandan dan sentra kuliner khas daerah multikultural.'
    ]
  },
  {
    id: 'dataran_tinggi',
    title: 'Zona 3: Dataran Tinggi & Pegunungan',
    areas: 'Sibolangit, Gunung Meriah, STM Upper',
    culture: 'Kebudayaan Karo & Simalungun',
    color: 'bg-amber-400',
    borderColor: 'border-amber-800',
    shadowColor: 'shadow-[0_8px_0_#b45309]',
    bgLight: 'bg-amber-50',
    badge: '⛰️ Dataran Tinggi',
    desc: 'Wilayah pegunungan sejuk yang kaya akan flora cagar alam, air terjun dua warna, serta tradisi adat Karo dan Simalungun.',
    facts: [
      'Cagar Alam Sibolangit didirikan sejak era Sumatera Timur sebagai kawasan konservasi megah.',
      'Rumah adat Siwaluh Jabu Karo dan Rumah Bolon Simalungun bernilai arsitektur tinggi.',
      'Penghasil buah segar, sayuran hijau, dan kopi khas tanah tinggi Sumatera Utara.'
    ]
  }
];

export const DICTIONARY_DATA: Record<'melayu' | 'karo' | 'simalungun', CultureDictionary> = {
  melayu: {
    cultureName: 'Melayu Deli & Serdang',
    icon: '🌴',
    color: 'bg-amber-100 border-amber-500',
    family: [
      { title: 'Ayah / Bapak', term: 'Ayah / Abah', note: 'Penghormatan untuk orang tua laki-laki' },
      { title: 'Ibu / Mamak', term: 'Mak / Mak Wo', note: 'Penghormatan untuk ibu/mak tua' },
      { title: 'Kakak / Abang', term: 'Abang / Kakak', note: 'Sapaan saudara tua laki-laki atau perempuan' },
      { title: 'Adik', term: 'Adik / Yong', note: 'Saudara kandung yang lebih muda' },
      { title: 'Paman', term: 'Pak Long / Pak Cik', note: 'Saudara laki-laki dari orang tua' },
      { title: 'Bibi', term: 'Mak Long / Mak Cik', note: 'Saudara perempuan dari orang tua' }
    ],
    greetings: [
      { id: 1, phrase: 'Selamat Pagi', local: 'Selamat Pagi, Apo Kabar?', meaning: 'Selamat pagi, apa kabar sahabat?' },
      { id: 2, phrase: 'Terima Kasih', local: 'Terima Kasih Banyak-banyak', meaning: 'Ungkapan rasa syukur dan terima kasih mendalam' },
      { id: 3, phrase: 'Sama-sama', local: 'Sama-sama, Selesa Selalu', meaning: 'Jawaban santun atas ucapan terima kasih' },
      { id: 4, phrase: 'Silakan Masuk', local: 'Jemput Masuk Kak/Abang', meaning: 'Menjemput dan menyambut tamu dengan ramah' },
      { id: 5, phrase: 'Permisi / Maaf', local: 'Minta Maaf, Tumpang Tanya', meaning: 'Sapaan santun dan berbudi saat bertanya arah' },
      { id: 6, phrase: 'Sampai Jumpa', local: 'Jumpa Lagi Besok Ya', meaning: 'Perpisahan hangat penuh persaudaraan' }
    ]
  },
  karo: {
    cultureName: 'Suku Karo (Sibolangit)',
    icon: '🏔️',
    color: 'bg-rose-100 border-rose-500',
    family: [
      { title: 'Ayah', term: 'Bapa', note: 'Sebutan penuh kasih untuk ayah kandung' },
      { title: 'Ibu', term: 'Nande', note: 'Sebutan mulia untuk ibu tercinta' },
      { title: 'Saudara Laki-laki', term: 'Senina / Impal', note: 'Panggilan kekerabatan erat sesama marga / sepupu' },
      { title: 'Saudara Perempuan', term: 'Turang', note: 'Sebutan hormat saudara wanita dalam adat Karo' },
      { title: 'Paman (Dari Ibu)', term: 'Kalimbubu / Mama', note: 'Pihak pemberi dara yang sangat dihormati' },
      { title: 'Bibi', term: 'Bibi / Mami', note: 'Istri dari mama atau saudara perempuan ayah' }
    ],
    greetings: [
      { id: 1, phrase: 'Hallo / Salam', local: 'Mejuah-juah kita kerina!', meaning: 'Salam sejahtera, sehat, dan berkah untuk kita semua' },
      { id: 2, phrase: 'Terima Kasih', local: 'Bujur Melala', meaning: 'Terima kasih banyak atas segala kebaikannya' },
      { id: 3, phrase: 'Apa Kabar?', local: 'Kuga Berita?', meaning: 'Menanyakan kabar kondisi kerabat / kawan' },
      { id: 4, phrase: 'Kabar Baik', local: 'Bujur, Sehat-sehat Mejuah-juah', meaning: 'Kabar sangat baik dan senantiasa sehat' },
      { id: 5, phrase: 'Silakan Duduk', local: 'Mari Kundul Kita', meaning: 'Ajakan duduk bersama secara bersahabat' },
      { id: 6, phrase: 'Mari Makan', local: 'Mari Kita Man', meaning: 'Ajakan santap bersama khas kekeluargaan Karo' }
    ]
  },
  simalungun: {
    cultureName: 'Suku Simalungun (Gunung Meriah)',
    icon: '🌾',
    color: 'bg-emerald-100 border-emerald-500',
    family: [
      { title: 'Ayah', term: 'Bapa / Bapa Tua', note: 'Panggilan penghormatan untuk ayah tercinta' },
      { title: 'Ibu', term: 'Inang / Inang Soripada', note: 'Panggilan mulia untuk ibu panutan' },
      { title: 'Saudara Laki-laki', term: 'Sanina', note: 'Saudara laki-laki satu garis keturunan' },
      { title: 'Saudara Perempuan', term: 'Botou', note: 'Panggilan akrab dan kasih saudara perempuan' },
      { title: 'Paman', term: 'Tulang', note: 'Saudara laki-laki ibu (marga tulang)' },
      { title: 'Bibi', term: 'Antua', note: 'Saudara perempuan ayah atau istri tulang' }
    ],
    greetings: [
      { id: 1, phrase: 'Salam Khas', local: 'Horas Habonaron Do Bona!', meaning: 'Salam kejayaan, kebenaran, dan ketulusan hati' },
      { id: 2, phrase: 'Terima Kasih', local: 'Diatei Tupa', meaning: 'Terima kasih yang tulus dan mendalam' },
      { id: 3, phrase: 'Apa Kabar?', local: 'Aha Barita?', meaning: 'Menanyakan kabar sanak saudara' },
      { id: 4, phrase: 'Kabar Baik', local: 'Barita Madear / Sehat', meaning: 'Kabar sangat baik dan penuh kesehatan' },
      { id: 5, phrase: 'Silakan Singgah', local: 'Singgah Min Rumahta', meaning: 'Mengundang masuk ke rumah dengan senang hati' },
      { id: 6, phrase: 'Mari Makan', local: 'Riap Kita Mangan', meaning: 'Ajakan makan bersama dalam kebersamaan' }
    ]
  }
};

export const ENCYCLOPEDIA_DATA: EncyclopediaItem[] = [
  {
    id: 'anyang-melayu',
    category: 'kuliner',
    title: 'Anyang Melayu Deli',
    subtitle: 'Kuliner Khas Pesisir',
    badge: '🥗 Urap Segar Khas',
    image: '🥗',
    shortDesc: 'Makanan mirip urap berbahan daun pakis, tauge, dan parutan kelapa sangrai berempah khas Melayu.',
    origin: 'Melayu Deli & Serdang',
    story: 'Anyang Melayu merupakan hidangan istimewa yang wajib ada saat kenduri dan acara adat Melayu di pesisir Deli Serdang. Dibuat dari pakis liar rebus yang dicampur parutan kelapa gongseng harum dengan perasan jeruk nipis, irisan bawang merah, serai, dan cabai rawit.'
  },
  {
    id: 'cimpa-karo',
    category: 'kuliner',
    title: 'Cimpa Unung-Unung',
    subtitle: 'Kue Adat Suku Karo',
    badge: '🍃 Berbungkus Daun Singkut',
    image: '🍌',
    shortDesc: 'Kue dari tepung ketan berisi gula merah dan kelapa parut, dibungkus daun singkut aromatik.',
    origin: 'Karo (Sibolangit)',
    story: 'Cimpa adalah makanan sakral pada pesta adat Kerja Tahun atau Merdang Merdem di Sibolangit. Kehadiran kue Cimpa melambangkan kebersamaan, kehangatan persaudaraan, dan lambang perekat silaturahmi seluruh keluarga Karo.'
  },
  {
    id: 'dayok-nabinatur',
    category: 'kuliner',
    title: 'Dayok Nabinatur',
    subtitle: 'Olahan Ayam Ritual Simalungun',
    badge: '🍗 Keharmonisan Hidup',
    image: '🍲',
    shortDesc: 'Ayam yang dimasak dengan bumbu khas dan diatur rapi sesuai susunan anatomi tubuhnya.',
    origin: 'Suku Simalungun',
    story: 'Dayok Nabinatur memiliki makna mendalam: "Nabinatur" berarti diatur secara teratur dan selaras. Kuliner ini disajikan dalam upacara adat untuk mendoakan agar kehidupan penerimanya senantiasa teratur, berhasil, dan penuh berkah Yang Maha Kuasa.'
  },
  {
    id: 'gambus-melayu',
    category: 'alat_musik',
    title: 'Gambus Melayu',
    subtitle: 'Alat Musik Petik Pesisir',
    badge: '🪕 Melodi Pesisir',
    image: '🪕',
    shortDesc: 'Alat musik petik dawai khas Melayu yang mengiringi tarian Zapin dan nyanyian Ghazal pesisir.',
    origin: 'Melayu Deli',
    story: 'Gambus dimainkan dengan irama mendayu-dayu nan rancak. Dahulu sering dimainkan oleh para pedagang dan nelayan pesisir untuk hiburan sore hari setelah berlayar di muara Selat Malaka sambil berpantun ria.'
  },
  {
    id: 'kulcapi-karo',
    category: 'alat_musik',
    title: 'Kulcapi Karo',
    subtitle: 'Kecapi Dua Tali',
    badge: '🎵 Alat Musik Petik',
    image: '🎸',
    shortDesc: 'Alat musik petik tradisional Karo berbahan kayu keras berukir dengan dua dawai bersuara nyaring.',
    origin: 'Suku Karo',
    story: 'Kulcapi merupakan instrumen utama dalam Ansambel Gendang Karo untuk mengiringi tarian Landek. Bentuknya ramping dengan ukiran kepala burung atau manusia di ujung stang, menghasilkan nada pentatonik khas dataran tinggi.'
  },
  {
    id: 'teluk-belanga',
    category: 'pakaian_adat',
    title: 'Baju Teluk Belanga & Tanjak',
    subtitle: 'Pakaian Adat Melayu',
    badge: '👑 Elegansi Pesisir',
    image: '🥋',
    shortDesc: 'Setelan baju kurung dengan samping kain songket tenun dan mahkota Tanjak di kepala.',
    origin: 'Melayu Deli & Serdang',
    story: 'Warna kuning keemasan melambangkan keagungan dan kejayaan Kesultanan Deli dan Serdang. Tanjak di kepala melambangkan kewibawaan, keberanian, dan kesantunan budi pekerti pria Melayu.'
  },
  {
    id: 'kerja-tahun',
    category: 'tradisi',
    title: 'Pesta Adat Kerja Tahun',
    subtitle: 'Syukuran Panen Raya Karo',
    badge: '🌾 Pesta Budaya',
    image: '🎉',
    shortDesc: 'Pesta adat rasa syukur atas hasil panen melimpah di wilayah Sibolangit dan sekitarnya.',
    origin: 'Suku Karo',
    story: 'Kerja Tahun dirayakan bersama seluruh keluarga besar dengan menyajikan kue Cimpa, menari Landek bersama sanak keluarga (anak beru dan kalimbubu), serta mempererat tali persaudaraan antar desa.'
  }
];

export const LKPD_MATCHING: MatchingItem[] = [
  { id: 1, greeting: 'Mejuah-juah kita kerina!', correctSuku: 'Karo' },
  { id: 2, greeting: 'Horas Habonaron Do Bona!', correctSuku: 'Simalungun' },
  { id: 3, greeting: 'Selamat Pagi, Apo Kabar?', correctSuku: 'Melayu' },
  { id: 4, greeting: 'Bujur Melala!', correctSuku: 'Karo' },
  { id: 5, greeting: 'Diatei Tupa!', correctSuku: 'Simalungun' }
];

export const LKPD_QUIZ: QuizQuestion[] = [
  {
    q: '1. Ibu kota Kabupaten Deli Serdang berada di daerah...',
    options: ['Sibolangit', 'Lubuk Pakam', 'Pantai Cermin', 'Gunung Meriah'],
    answer: 1,
    explain: 'Lubuk Pakam adalah pusat pemerintahan dan ibu kota resmi Kabupaten Deli Serdang.'
  },
  {
    q: '2. Makanan khas Melayu Deli berbentuk urap daun pakis dengan kelapa sangrai adalah...',
    options: ['Cimpa', 'Anyang Melayu', 'Dayok Nabinatur', 'Lemang'],
    answer: 1,
    explain: 'Anyang Melayu adalah kuliner mirip urap khas Melayu Deli yang terbuat dari pakis liar dan kelapa gongseng.'
  },
  {
    q: '3. Salam hangat masyarakat Suku Karo yang bermakna kesehatan dan keselamatan adalah...',
    options: ['Horas', 'Mejuah-juah', 'Apo Kabar', 'Diatei Tupa'],
    answer: 1,
    explain: 'Mejuah-juah merupakan salam khas Suku Karo yang mengandung doa keselamatan dan keberkahan bersama.'
  },
  {
    q: '4. Alat musik petik dua dawai khas masyarakat Suku Karo disebut...',
    options: ['Kulcapi', 'Gambus', 'Gendang', 'Seruling'],
    answer: 0,
    explain: 'Kulcapi adalah alat musik petik tradisional khas Karo dengan dua utas dawai.'
  },
  {
    q: '5. Penutup kepala khas laki-laki Melayu Deli yang melambangkan kewibawaan adalah...',
    options: ['Sertali', 'Tanjak', 'Uis Gara', 'Kopiah'],
    answer: 1,
    explain: 'Tanjak adalah hiasan mahkota kain ikat kepala berwibawa pria Melayu Deli & Serdang.'
  }
];

export const WORD_SEARCH_GRID = [
  ['M', 'E', 'L', 'A', 'Y', 'U', 'X', 'B'],
  ['K', 'A', 'R', 'O', 'P', 'Q', 'W', 'U'],
  ['S', 'O', 'N', 'G', 'K', 'E', 'T', 'D'],
  ['S', 'E', 'R', 'D', 'A', 'N', 'G', 'A'],
  ['C', 'I', 'M', 'P', 'A', 'Y', 'A', 'Y'],
  ['G', 'A', 'M', 'B', 'U', 'S', 'D', 'A'],
  ['P', 'A', 'K', 'A', 'M', 'O', 'G', 'K'],
  ['S', 'I', 'B', 'O', 'L', 'A', 'N', 'G']
];

export const TARGET_WORDS = ['MELAYU', 'KARO', 'SERDANG', 'GAMBUS', 'CIMPA', 'SONGKET'];

export const DICE_GAME_TILES_10: DiceTile[] = [
  { id: 1, title: 'Petak 1: Muara Pesisir', question: 'Pantai Cermin terletak di Zona mana?', options: ['Pesisir & Bahari', 'Dataran Tinggi'], ans: 0 },
  { id: 2, title: 'Petak 2: Tanjak Melayu', question: 'Tanjak dipakai di bagian tubuh mana?', options: ['Kepala', 'Kaki'], ans: 0 },
  { id: 3, title: 'Petak 3: Musik Gambus', question: 'Gambus dimainkan dengan cara apa?', options: ['Dipetik', 'Ditiup'], ans: 0 },
  { id: 4, title: 'Petak 4: Ibu Kota', question: 'Apa nama ibu kota Kabupaten Deli Serdang?', options: ['Lubuk Pakam', 'Medan'], ans: 0 },
  { id: 5, title: 'Petak 5: Taman Sibolangit', question: 'Sibolangit memiliki udara yang...?', options: ['Sejuk & Segar', 'Panas Terik'], ans: 0 },
  { id: 6, title: 'Petak 6: Kue Cimpa', question: 'Kue Cimpa dibungkus dengan daun apa?', options: ['Daun Singkut', 'Daun Jati'], ans: 0 },
  { id: 7, title: 'Petak 7: Dayok Nabinatur', question: 'Dayok Nabinatur berasal dari tradisi suku...?', options: ['Simalungun', 'Melayu'], ans: 0 },
  { id: 8, title: 'Petak 8: Benteng Putri Hijau', question: 'Situs Benteng Putri Hijau terletak di daerah mana?', options: ['Deli Tua', 'Pantai Cermin'], ans: 0 },
  { id: 9, title: 'Petak 9: Tarian Zapin', question: 'Tari Serampang Duabelas ditarikan secara apa?', options: ['Berpasangan', 'Sendirian'], ans: 0 },
  { id: 10, title: 'Petak 10: Puncak Duta Budaya', question: 'Semboyan kebanggaan Deli Serdang adalah apa?', options: ['Bhinneka Perkasa Jaya', 'Tut Wuri Handayani'], ans: 0 }
];

export const LIRIK_MARS: string[] = [
  "Bersatu kita raih cita-cita",
  "Membangun Deli Serdang tercinta",
  "Kuatkan semangat berjaya",
  "Demi menggapai asa mulia",
  "",
  "Deli Serdang maju dan sejahtera",
  "Itulah visi kabupaten kita",
  "Dengan Bhinneka Perkasa Jaya",
  "Membangun semangat berkarya",
  "",
  "[Reff]",
  "Beragam agama, etnis dan budaya",
  "Bersatu padu bergandengan tangan",
  "Masyarakat religius dan bertakwa",
  "Rukun damai dalam kebhinekaan",
  "",
  "Majulah majulah maju, wahai Deli Serdangku",
  "Ayo maju bersama kita bersatu",
  "Majulah majulah maju, Deli Serdang tercinta",
  "Masyarakat yang berakhlak mulia",
  "",
  "Semoga Deli Serdang tetap jaya",
  "Dalam ridho dan rahmat Tuhan Yang Maha Esa"
];

export const DANCE_CULTURE_DATA: DanceCultureItem[] = [
  {
    id: 'serampang-duabelas',
    suku: 'Melayu',
    danceName: 'Tari Serampang Dua Belas',
    tagline: 'Karya Agung Mahakarya Pergaulan Melayu Serdang',
    badge: '👑 Tari Pergaulan Legendaris',
    icon: '💃🏽',
    historyOrigin:
      'Diciptakan pada tahun 1940-an oleh maestro tari asal Perbaungan (Kesultanan Serdang), Sauti. Dahulu dinamai Tari Pulau Sari, tarian ini lahir di tanah Deli Serdang dan kini menjadi warisan budaya takbenda Indonesia yang mendunia.',
    philosophy:
      'Menggambarkan siklus suci perjalanan asmara pemuda-pemudi Melayu yang beradab dan santun, mulai dari pertemuan pertama, proses merisik (mencari tahu), mengikat janji, hingga melangkah ke pelaminan yang sakral dan penuh berkah.',
    movements: [
      { title: '1. Ragam Permulaan (Tatap Muka)', desc: 'Gerak langkah berputar santun melambangkan pertemuan pandang pertama yang penuh kesopanan.' },
      { title: '2. Ragam Merisik & Meminang', desc: 'Gerak tangan lemah gemulai menggambarkan proses bertanya kabar dan restu keluarga.' },
      { title: '3. Ragam Mengikat Janji & Saputangan', desc: 'Penggunaan sapu tangan putih sebagai simbol ikatan janji suci lahir dan batin yang tak terpisahkan.' }
    ],
    musicAccompaniment: 'Irama lagu Melayu bertempo cepat (Lagu Serampang Dua Belas / Pulau Sari) diiringi alunan Akordeon, Biola, Gambus, dan tepukan ritmis Gendang Ronggeng.',
    attireName: 'Busana Adat Melayu Deli & Serdang',
    attireDetails: [
      { name: 'Baju Teluk Belanga', wornBy: 'Pria', desc: 'Baju kurung pria berleher bulat berkancing satu atau tiga, terbuat dari satin halus warna keemasan atau hijau zamrud.', icon: '🥋' },
      { name: 'Tanjak Melayu', wornBy: 'Pria', desc: 'Mahkota lipatan kain songket tenun khas Deli Serdang (motif Elang Menyongsong Angin) yang melambangkan kewibawaan dan budi pekerti luhur.', icon: '👑' },
      { name: 'Kain Samping Songket', wornBy: 'Pria', desc: 'Kain songket tenun benang emas khas Deli yang dililitkan di pinggang sebatas lutut, melambangkan pria yang telah dewasa dan siap berumah tangga.', icon: '🧵' },
      { name: 'Baju Kurung Tulang Belut', wornBy: 'Wanita', desc: 'Busana kurung panjang longgar yang santun dengan jahitan benang emas halus di bagian leher menyerupai tulang belut.', icon: '👗' },
      { name: 'Selendang Songket & Sanggul Lintang', wornBy: 'Wanita', desc: 'Selendang tersampir di bahu dan mahkota kembang goyang di atas sanggul melambangkan keanggunan putri Melayu Deli.', icon: '🧕' },
      { name: 'Pending & Kerongsang Emas', wornBy: 'Pria & Wanita', desc: 'Sabuk berkepala ukir pending emas pada pria dan tiga set kerongsang semat pada dada wanita.', icon: '✨' }
    ],
    kesenianTradisi: [
      { name: 'Ansambel Musik Ronggeng Melayu', type: 'Alat Musik', desc: 'Perpaduan merdu antara Akordeon Melayu, Biola, Gambus duku, Marwas gesik, dan Rebana Kompang.', icon: '🎻' },
      { name: 'Seni Berbalas Pantun Adat', type: 'Seni Teater/Sastra', desc: 'Tradisi lisan berpantun spontan sarat nasehat moral yang wajib disajikan saat meminang dan membuka pintu pagar kenduri.', icon: '📜' },
      { name: 'Seni Anyaman Pandan Pesisir', type: 'Seni Kerajinan', desc: 'Kerajinan tangan menganyam daun pandan berduri menjadi tikar bertingkat dan tudung saji di pesisir Pantai Cermin dan Percut.', icon: '🧺' }
    ],
    funFact: 'Tari Serampang Dua Belas terdiri tepat dari 12 ragam gerak berurutan, dan setiap ragam memiliki makna doa bagi keselamatan rumah tangga!'
  },
  {
    id: 'zapin-melayu',
    suku: 'Melayu',
    danceName: 'Tari Zapin Tembung & Deli',
    tagline: 'Langkah Kaki Berirama Harmoni Pesisir',
    badge: '🌊 Warisan Pesisir Bahari',
    icon: '🪕',
    historyOrigin:
      'Berkembang subur di pesisir Deli Serdang seperti kawasan Tembung, Percut Sei Tuan, dan Hamparan Perak sebagai perpaduan budaya Melayu pesisir dan pengaruh saudagar Selat Malaka sejak era Kesultanan Deli.',
    philosophy:
      'Melambangkan keteguhan iman, persaudaraan yang kokoh, dan ketangkasan gerak langkah pemuda Melayu dalam menghadapi gelombang kehidupan bahari.',
    movements: [
      { title: '1. Gerak Alif & Langkah Siku', desc: 'Gerak awal membentuk garis lurus keteguhan hati dengan langkah kaki menyilang lincah.' },
      { title: '2. Gerak Anak Ayam & Titi Batang', desc: 'Langkah kaki berjingkat cepat nan seimbang meniru kelincahan burung camar di pesisir muara.' },
      { title: '3. Gerak Tahto & Sembah Penutup', desc: 'Gerak duduk merendah sambil menyatukan tangan ke dada sebagai ungkapan rasa syukur kepada Sang Pencipta.' }
    ],
    musicAccompaniment: 'Petikan Gambus dawai Arab-Melayu yang mendayu-dayu berpadu rampak dengan pukulan puk-puk Marwas kecil.',
    attireName: 'Baju Kurung Cekak Musang & Tanjak',
    attireDetails: [
      { name: 'Baju Cekak Musang', wornBy: 'Pria', desc: 'Baju kurung dengan kerah tegak berdiri dilengkapi lima kancing permata yang melambangkan rukun Islam.', icon: '👔' },
      { name: 'Tanjak Tebing Runtuh', wornBy: 'Pria', desc: 'Ikat kepala songket dengan pucuk miring kokoh melambangkan kesiapan membela kampung halaman.', icon: '👒' },
      { name: 'Kain Pelekat / Songket Samping', wornBy: 'Pria', desc: 'Kain sarung sutra motif kotak Deli yang diikat kuat dengan tali pending perak.', icon: '🧣' },
      { name: 'Baju Kebaya Labuh', wornBy: 'Wanita', desc: 'Kebaya panjang sutra berpadu kain songket bercorak pucuk rebung.', icon: '👘' }
    ],
    kesenianTradisi: [
      { name: 'Petikan Gambus Melayu', type: 'Alat Musik', desc: 'Instrumen petik dawai berduri akustik yang menyuarakan nada khas pesisir Deli.', icon: '🪕' },
      { name: 'Seni Pukul Marwas', type: 'Alat Musik', desc: 'Gendang kecil bermuka ganda yang dipukul serentak menghasilkan ritme poliritmik yang rancak.', icon: '🥁' },
      { name: 'Seni Musik Ghazal Pesisir', type: 'Seni Teater/Sastra', desc: 'Nyanyian puitis bertutur syair kisah kebajikan dan cinta tanah air yang diiringi harmonium dan tabla.', icon: '🎶' }
    ],
    funFact: 'Kata Zapin berasal dari bahasa Arab "Zafn" yang berarti gerak kaki cepat mengikuti hentakan ketukan gendang marwas.'
  },
  {
    id: 'lima-serangkai',
    suku: 'Karo',
    danceName: 'Tari Lima Serangkai',
    tagline: 'Harmoni Lima Ragam Tarian Adat Karo di Sibolangit',
    badge: '🏔️ Tarian Sakral & Adat',
    icon: '🦅',
    historyOrigin:
      'Tarian tradisional yang paling populer dan sakral di kalangan masyarakat Karo di dataran tinggi Sibolangit, Gunung Meriah, dan Deli Serdang hulu. Selalu ditampilkan dalam perayaan pesta panen raya Kerja Tahun (Merdang Merdem) dan perhelatan adat gundala.',
    philosophy:
      'Merupakan cerminan pergaulan kekerabatan masyarakat Karo yang terikat dalam tatanan adat "Rakut Sitelu" (tiga tali persaudaraan: Kalimbubu, Senina, dan Anak Beru). Gerakannya meniru kelincahan burung dan hembusan angin sejuk pegunungan.',
    movements: [
      { title: '1. Ragam Morah-Morah', desc: 'Gerak lemah gemulai ayunan jemari tangan yang menyapa dan menghormati para tetua adat dengan senyuman tulus.' },
      { title: '2. Ragam Perak-Perak & Cipa Jok', desc: 'Hentakan tumit dan gerak silang kaki dinamis melambangkan keceriaan pemuda-pemudi desa.' },
      { title: '3. Ragam Patam-Patam Kabang & Biring', desc: 'Kedua tangan dibentangkan meliuk menyerupai elang yang melayang gagah di atas lembah pegunungan Sibolangit.' }
    ],
    musicAccompaniment: 'Iringan Ansambel Gendang Lima Sedalanen: tiupan Sarune bersuara melengking magis, gesekan Kulcapi petik, Gendang Singindungi, Singanaki, serta dentuman Gung dan Panganak.',
    attireName: 'Busana Adat Uis Gara Suku Karo',
    attireDetails: [
      { name: 'Kain Uis Gara', wornBy: 'Pria & Wanita', desc: 'Kain tenun sakral warna merah marun cerah yang disulam benang emas dan perak rumit, melambangkan keberanian, kemuliaan, dan kehangatan keluarga.', icon: '🧶' },
      { name: 'Uis Beka Buluh', wornBy: 'Pria', desc: 'Kain tenun motif segitiga runcing yang dilipat di atas pundak pria Karo, menandakan kebesaran hati dan jiwa ksatria pelindung adat.', icon: '🧣' },
      { name: 'Tudung Beraspati', wornBy: 'Wanita', desc: 'Penutup kepala wanita Karo berukuran megah berbentuk lipatan anggun dari kain Uis Nipes yang menjulang bak mahkota permaisuri.', icon: '👑' },
      { name: 'Kampuh & Uis Julu', wornBy: 'Pria', desc: 'Kain sarung tenun ikat gelap dengan lis keemasan yang dililitkan di pinggang pria.', icon: '🥻' },
      { name: 'Padung-Padung & Gelang Sarung', wornBy: 'Wanita', desc: 'Aksesoris anting perak besar melingkar di telinga dan gelang kuningan bertingkat pembawa keselamatan.', icon: '💍' }
    ],
    kesenianTradisi: [
      { name: 'Ansambel Gendang Lima Sedalanen', type: 'Alat Musik', desc: 'Formasi lima instrumen sakral Karo (Sarune, Kulcapi, Gendang Singindungi, Singanaki, Gung/Panganak) yang mengiringi upacara adat.', icon: '🎺' },
      { name: 'Seni Musik Petik Kulcapi', type: 'Alat Musik', desc: 'Kecapi dua dawai khas Karo berukir kepala manusia yang mampu melantunkan nada-nada rindu tanah karo.', icon: '🎸' },
      { name: 'Pesta Budaya Kerja Tahun (Merdang Merdem)', type: 'Seni Teater/Sastra', desc: 'Pesta rakyat tahunan di Sibolangit dengan pertunjukan tari landek massal dan sajian kue tradisi Cimpa.', icon: '🌾' }
    ],
    funFact: 'Nama "Lima Serangkai" merujuk pada lima lagu dan tempo berurutan yang dirangkai tanpa henti dalam satu sajian tarian utuh!'
  },
  {
    id: 'gundala-gundala',
    suku: 'Karo',
    danceName: 'Tari Gundala-Gundala (Tari Topeng Gurda-Gurdi)',
    tagline: 'Seni Drama Tari Topeng Legenda Pemanggil Hujan',
    badge: '🎭 Teater Tari Topeng Tradisi',
    icon: '👺',
    historyOrigin:
      'Kesenian drama tari topeng kuno khas masyarakat Karo yang hidup di kawasan perbukitan Deli Serdang hulu. Dahulu dimainkan sebagai upacara ritual "Ndilo Wari Udan" (memohon turunnya hujan) ketika musim kemarau panjang mengancam ladang padi.',
    philosophy:
      'Menceritakan kisah legenda Raja Sibayak dan Burung Raksasa Gurda-Gurdi yang setia namun berakhir dalam kesalahpahaman. Mengajarkan nilai kesetiaan, kejujuran, dan keharmonisan manusia dengan alam semesta.',
    movements: [
      { title: '1. Gerak Pencarian Raja & Panglima', desc: 'Langkah gagah hentakan kaki mengenakan topeng raja bermahkota memantau ketentraman negeri.' },
      { title: '2. Gerak Kepakan Sayap Burung Gurda-Gurdi', desc: 'Penari berkostum burung raksasa melompat lincah sambil mengepakkan selendang sayap lebar.' },
      { title: '3. Gerak Ratapan & Doa Hujan', desc: 'Gerak bersujud bersama menghadap empat penjuru mata angin memohon keberkahan tetesan air langit.' }
    ],
    musicAccompaniment: 'Hentakan dramatis Gung Panganak berpadu dengan jeritan magis tiupan Sarune Bolon Karo tempo lambat ke cepat.',
    attireName: 'Kostum Topeng Kayu Gundala-Gundala',
    attireDetails: [
      { name: 'Topeng Kayu Pohon Johar', wornBy: 'Pria', desc: 'Topeng kayu berukir wajah raksasa, raja bijak, putri cantik, dan paruh burung yang diwarnai pigmen alami putih, merah, dan hitam.', icon: '🎭' },
      { name: 'Jubah Jubah Hitam & Putih', wornBy: 'Pria', desc: 'Jubah panjang longgar berbahan kain katun tebal atau rami yang menyamarkan seluruh tubuh penari.', icon: '🧥' },
      { name: 'Sayap Ijuk & Daun Kering', wornBy: 'Pria', desc: 'Sayap tiruan burung raksasa yang dirangkai dari serat ijuk enau dan dedaunan hutan Sibolangit.', icon: '🪶' }
    ],
    kesenianTradisi: [
      { name: 'Ritual Ndilo Wari Udan', type: 'Seni Teater/Sastra', desc: 'Upacara adat sakral memohon hujan melalui pementasan teater topeng di tanah lapang desa.', icon: '🌧️' },
      { name: 'Seni Ukir Topeng Kayu Karo', type: 'Seni Kerajinan', desc: 'Kerajinan pahat kayu tradisional menghasilkan karakter ekspresi wajah leluhur yang berkarakter kuat.', icon: '🪵' }
    ],
    funFact: 'Konon para tetua adat mempercayai bahwa tidak lama setelah tarian Gundala-Gundala selesai ditarikan dengan tulus, awan mendung akan berkumpul dan hujan turun membasahi bumi!'
  },
  {
    id: 'tortor-sombah',
    suku: 'Simalungun',
    danceName: 'Tari Tortor Sombah',
    tagline: 'Tarian Penghormatan Tertinggi Tanah Habonaron Do Bona',
    badge: '👑 Tari Sembah Kebesaran',
    icon: '🙏🏽',
    historyOrigin:
      'Berasal dari tradisi istana kerajaan-kerajaan Simalungun yang wilayah adatnya mencakup lereng pegunungan Deli Serdang tenggara (Gunung Meriah, Bangun Purba, dan sekitarnya). Dipersembahkan khusus untuk menyambut raja, tamu agung kehormatan, dan upacara adat besar.',
    philosophy:
      'Berakar dari falsafah hidup luhur Simalungun: "Habonaron Do Bona" (Kebenaran dan Ketulusan adalah Pangkal Kehidupan). Gerak sembah melambangkan kerendahan hati manusia di hadapan Sang Maha Kuasa dan ketakziman menyambut saudara sesama ciptaan.',
    movements: [
      { title: '1. Gerak Manombah (Sembah Takzim)', desc: 'Kedua telapak tangan ditangkupkan rapat di depan dada dan diangkat perlahan hingga ke kening dengan kepala menunduk hormat.' },
      { title: '2. Gerak Mambur Boras Kuning', desc: 'Gerak menabur beras kuning harum di hadapan para tamu sebagai lambang doa limpahan rezeki dan kemakmuran.' },
      { title: '3. Gerak Menjunjung Talam Sirih', desc: 'Penari putri membawa talam keemasan berisi daun sirih lengkap kapur dan pinang sebagai pembuka silaturahmi.' }
    ],
    musicAccompaniment: 'Alunan sakral Ansambel Gonrang Sipitu-pitu (tujuh tabung gendang berlaras nada megah) dipadu tiupan Sarune Bolon dan denting Gong Ogung.',
    attireName: 'Busana Kebesaran Adat Simalungun (Kain Hiou)',
    attireDetails: [
      { name: 'Kain Hiou Suri-Suri', wornBy: 'Wanita', desc: 'Kain tenun khas Simalungun dengan motif garis-garis bergelombang indah yang disematkan di bahu sebagai tanda kehormatan.', icon: '🧣' },
      { name: 'Kain Hiou Ragi Pane', wornBy: 'Pria', desc: 'Tenunan sakral berdasar gelap bergaris merah marun dan putih yang melambangkan keteduhan dan kepemimpinan bijaksana.', icon: '🧵' },
      { name: 'Gotong Simalungun', wornBy: 'Pria', desc: 'Tutup kepala pria khas Simalungun berbentuk destar lipat dengan hiasan dorpi (ukiran lempeng emas/perak) dan bulu burung di puncaknya.', icon: '🎩' },
      { name: 'Bulang Bertingkat', wornBy: 'Wanita', desc: 'Hiasan kepala wanita berlipat tinggi megah dari kain tenun merah keemasan yang mencerminkan kemuliaan ibu rumah tangga.', icon: '👑' },
      { name: 'Ponding (Ikat Pinggang Emas)', wornBy: 'Pria & Wanita', desc: 'Ikat pinggang dari lempengan kuningan atau perak berlapis emas penyemat busana tenun.', icon: '✨' },
      { name: 'Golang & Kalung Suri-Suri', wornBy: 'Wanita', desc: 'Perhiasan gelang emas berukir kepala naga dan kalung permata pembawa aura keanggunan putri Simalungun.', icon: '💍' }
    ],
    kesenianTradisi: [
      { name: 'Ansambel Gonrang Sipitu-pitu', type: 'Alat Musik', desc: 'Instrumen 7 gendang bernada ritmis magis yang menjadi simbol kemegahan tradisi musik Simalungun.', icon: '🥁' },
      { name: 'Tiupan Sarune Bolon Simalungun', type: 'Alat Musik', desc: 'Alat musik tiup bambu dengan lidah ganda berukir tanduk kerbau yang mengalunkan melodi meliuk takzim.', icon: '🎷' },
      { name: 'Seni Pantun Taur-Taur', type: 'Seni Teater/Sastra', desc: 'Seni bertutur pantun berlagu yang berisi doa restu dan ungkapan kerinduan mendalam sanak saudara.', icon: '📜' }
    ],
    funFact: 'Saat menari Tortor Sombah, penari tidak boleh mengangkat kaki terlalu tinggi; langkah kaki harus tetap merapat ke lantai bumi sebagai simbol kerendahan hati!'
  },
  {
    id: 'tortor-dihar',
    suku: 'Simalungun',
    danceName: 'Tari Tor-Tor Dihar',
    tagline: 'Seni Tari Ketangkasan Silat Pendekar Simalungun',
    badge: '⚔️ Tari Bela Diri Tradisional',
    icon: '🥋',
    historyOrigin:
      'Diciptakan dari seni bela diri silat kuno "Dihar" yang dikuasai para kesatria pengawal kerajaan Simalungun di wilayah perbukitan Gunung Meriah Deli Serdang. Ditampilkan saat penyambutan prajurit dan pesta adat keperkasaan pemuda.',
    philosophy:
      'Melambangkan kewaspadaan diri, jiwa ksatria pantang menyerah, dan kesiapan melindungi tanah leluhur serta kehormatan keluarga dari segala marabahaya.',
    movements: [
      { title: '1. Kuda-Kuda Tapak Suci', desc: 'Posisi kaki merendah kokoh mencengkeram tanah dengan kedua tangan bersiap di dada menangkis serangan.' },
      { title: '2. Gerak Elang Menyambar', desc: 'Lompatan tangkas berputar di udara sambil memperagakan jurus elang penjaga gunung.' },
      { title: '3. Gerak Salaman Persaudaraan', desc: 'Mengakhiri gerakan silat dengan saling menyatukan telapak tangan sebagai tanda bahwa ilmu bela diri hanya untuk perdamaian.' }
    ],
    musicAccompaniment: 'Tabuhan cepat Gonrang Sidua-dua dipadu pukulan Ogung bertubi-tubi yang memacu adrenalin dan semangat bertarung.',
    attireName: 'Pakaian Pendekar Silat Dihar',
    attireDetails: [
      { name: 'Baju Silat Hitam Berlis Emas', wornBy: 'Pria', desc: 'Baju hitam longgar berlengan pendek yang memudahkan manuver jurus silat gesit.', icon: '🥋' },
      { name: 'Destar Gotong Pendekar', wornBy: 'Pria', desc: 'Ikat kepala Gotong yang dililitkan rapat tanpa rumbai untuk menjaga pandangan mata tetap tajam.', icon: '🧢' },
      { name: 'Hiou Samping Pendek', wornBy: 'Pria', desc: 'Kain tenun Hiou yang dililitkan ketat di atas lutut diikat kencang dengan selendang merah.', icon: '🧣' }
    ],
    kesenianTradisi: [
      { name: 'Seni Bela Diri Dihar Simalungun', type: 'Seni Teater/Sastra', desc: 'Sistem pencak silat warisan leluhur yang meniru gerak alam, hewan harimau, dan burung elang.', icon: '🥋' },
      { name: 'Gonrang Sidua-dua', type: 'Alat Musik', desc: 'Dua buah gendang ritmis berlaras tinggi yang mengiringi atraksi ketangkasan fisik.', icon: '🥁' }
    ],
    funFact: 'Dalam tradisi silat Dihar, sebelum bertanding para pendekar wajib menarikan salam hormat terlebih dahulu kepada wasit dan penonton!'
  }
];

export const FOLK_SONGS_DATA: FolkSongItem[] = [
  {
    id: 'tanjung-katung',
    suku: 'Melayu',
    title: 'Tanjung Katung',
    origin: 'Melayu Deli & Pesisir Selat Malaka',
    tempo: 'Rancak Melayu (Inang & Joget)',
    badge: '🌴 Pantun Klasik Pesisir',
    icon: '🪕',
    meaning: 'Menggambarkan kerinduan anak rantau terhadap kampung halaman di pesisir Deli Serdang dengan petuah hidup penuh kesabaran.',
    story: 'Lagu legendaris yang sarat dengan pantun Melayu bersajak a-b-a-b. Dahulu dinyanyikan oleh nelayan pesisir saat pulang melaut diiringi petikan gambus dan gesekan biola.',
    audioMelodyNotes: 'Do-Re-Mi-Fa-Sol-La berirama ceria khas Melayu Deli',
    lyrics: [
      { original: 'Tanjung Katung airnya biru', indonesian: 'Tanjung Katung airnya begitu biru jernih' },
      { original: 'Tempat mandi dara jelita', indonesian: 'Tempat berhias gadis elok jelita' },
      { original: 'Bila rindu katakan rindu', indonesian: 'Bila ada rindu katakanlah rindu' },
      { original: 'Jangan disimpan di dalam dada', indonesian: 'Jangan kau pendam di dalam dada' },
      { original: 'Deli Serdang tanah pusaka', indonesian: 'Deli Serdang tanah leluhur pusaka' },
      { original: 'Rukun damai suku bangsanya', indonesian: 'Rukun dan damai seluruh masyarakatnya' }
    ]
  },
  {
    id: 'kuala-deli',
    suku: 'Melayu',
    title: 'Kuala Deli',
    origin: 'Pesisir Muara Deli Serdang & Percut',
    tempo: 'Syahdu & Mengalun',
    badge: '🌊 Kidung Kejayaan Bahari',
    icon: '⛵',
    meaning: 'Mengagungkan keindahan muara sungai Deli dan sejarah pelayaran para leluhur Melayu yang ramah menyambut tamu sedunia.',
    story: 'Kuala Deli menjadi saksi bandar niaga tersohor pada abad ke-19, tempat bertemunya para saudagar rempah dan nelayan perahu layar berlabuh.',
    audioMelodyNotes: 'Melodi mendayu-dayu penuh rasa syukur dan keteduhan',
    lyrics: [
      { original: 'Di Kuala Deli ombak beralun', indonesian: 'Di muara Kuala Deli ombak berayun mengalun' },
      { original: 'Perahu nelayan pulang berteduh', indonesian: 'Perahu nelayan berlabuh pulang berteduh' },
      { original: 'Adat dijunjung budi disanjung', indonesian: 'Adat mulia dijunjung, budi pekerti disanjung' },
      { original: 'Negeri Deli makmur dan teguh', indonesian: 'Negeri Deli Serdang senantiasa makmur dan kokoh' }
    ]
  },
  {
    id: 'selayang-pandang',
    suku: 'Melayu',
    title: 'Selayang Pandang',
    origin: 'Melayu Serdang & Deli',
    tempo: 'Cepat, Ceria & Mengajak Menari',
    badge: '💃🏽 Lagu Pergaulan Ceria',
    icon: '🎻',
    meaning: 'Ungkapan salam hangat dan keterbukaan persaudaraan masyarakat Melayu kepada siapa saja yang berkunjung.',
    story: 'Lagu pengiring tari zapin dan joget ronggeng yang sangat digemari siswa sekolah di seluruh penjuru Deli Serdang.',
    audioMelodyNotes: 'Ketukan cepat bersahut-sahutan kompang dan akordeon',
    lyrics: [
      { original: 'Lama sudah tidak ke ladang', indonesian: 'Sudah lama tidak bertandang ke ladang' },
      { original: 'Tinggi rumput daripada padi', indonesian: 'Rumput tumbuh lebih tinggi dari padi' },
      { original: 'Lama sudah tidak kupandang', indonesian: 'Sudah lama tidak memandang sahabat tercinta' },
      { original: 'Rasa rindu di dalam hati', indonesian: 'Terbit rasa rindu mendalam di lubuk hati' }
    ]
  },
  {
    id: 'piso-surit',
    suku: 'Karo',
    title: 'Piso Surit',
    composer: 'Djaga Depari',
    origin: 'Dataran Tinggi Sibolangit Karo',
    tempo: 'Melankolis & Emosional',
    badge: '🏔️ Mahakarya Maestro Karo',
    icon: '🕊️',
    meaning: 'Mengisahkan kesetiaan cinta dan kerinduan seorang gadis yang menantikan kekasihnya pulang melintasi perbukitan Sibolangit.',
    story: 'Piso Surit diambil dari suara burung kecil pemalu di hutan pegunungan Karo yang suaranya terdengar seperti ratapan rindu "pi-so su-rit".',
    audioMelodyNotes: 'Nada pentatonik minor khas sarune dan kulcapi',
    lyrics: [
      { original: 'Piso surit... piso surit...', indonesian: 'Wahai burung piso surit bersuara merdu...' },
      { original: 'Tading ma ate nande biring...', indonesian: 'Tertinggal hatiku bersama kekasih tersayang...' },
      { original: 'Kekelengen si la terlupaken...', indonesian: 'Kasih sayang tulus yang tak terlupakan...' },
      { original: 'Mejuah-juah man banta kerina', indonesian: 'Sejahtera dan selamatlah untuk kita semua' }
    ]
  },
  {
    id: 'mejuah-juah',
    suku: 'Karo',
    title: 'Mejuah-Juah',
    origin: 'Suku Karo Deli Serdang',
    tempo: 'Rancak Bersemangat',
    badge: '🌾 Lagu Doa Keselamatan',
    icon: '🤝',
    meaning: 'Doa agung agar seluruh keluarga, sahabat, dan alam semesta senantiasa diberkahi kesehatan, keselamatan, dan rezeki melimpah.',
    story: 'Dinyanyikan serentak saat membuka pesta adat Kerja Tahun di desa-desa lereng Sibolangit sambil bersalam-salaman.',
    audioMelodyNotes: 'Irama riang hentakan gendang singindungi dan gung',
    lyrics: [
      { original: 'Mejuah-juah kita kerina...', indonesian: 'Sehat dan selamatlah kita semua...' },
      { original: 'Ersada arih kita rumahta...', indonesian: 'Satu mufakat kita di tanah leluhur kita...' },
      { original: 'Dalanken adat tutus ateta...', indonesian: 'Jalankan adat dengan hati tulus ikhlas...' },
      { original: 'Rejeki lit lit mejuah-juah!', indonesian: 'Rezeki melimpah ruah dalam keberkahan!' }
    ]
  },
  {
    id: 'pos-ni-uhur',
    suku: 'Simalungun',
    title: 'Pos Ni Uhur',
    origin: 'Suku Simalungun (Gunung Meriah)',
    tempo: 'Syahdu & Khidmat',
    badge: '🌾 Janji Kesetiaan Hati',
    icon: '❤️',
    meaning: 'Tentang keteguhan janji hati, kejujuran batin (*Habonaron Do Bona*), dan harapan agar tidak saling melupakan meski dipisahkan jarak.',
    story: 'Lagu pusaka rakyat Simalungun yang paling masyhur, sering diperdengarkan saat perpisahan anak rantau menuju tanah perantauan.',
    audioMelodyNotes: 'Alunan tiupan sarune bolon berpadu tabuhan gonrang',
    lyrics: [
      { original: 'Pos ni uhur mai da botou...', indonesian: 'Teguhkanlah hatimu wahai saudara tercinta...' },
      { original: 'Ulang ham mandolei...', indonesian: 'Janganlah engkau bersedih dan putus asa...' },
      { original: 'Tongtong do ham huingat...', indonesian: 'Selalu engkau kuingat dalam doa...' },
      { original: 'Habonaron do bona dingat ma...', indonesian: 'Ingatlah kebenaran dan ketulusan adalah pegangan...' }
    ]
  },
  {
    id: 'deideng',
    suku: 'Simalungun',
    title: 'Deideng',
    origin: 'Gunung Meriah & Bangun Purba',
    tempo: 'Lembut & Bernutrisi Jiwa',
    badge: '👑 Kidung Kasih Ibu Simalungun',
    icon: '🧕',
    meaning: 'Nasehat luhur seorang ibu kepada generasi muda Simalungun agar rajin belajar, berbudi pekerti, dan cinta tanah kelahirannya.',
    story: 'Lagu nina-bobo tradisional bertabur syair petuah moral yang telah diajarkan turun-temurun sejak era kerajaan-kerajaan Simalungun.',
    audioMelodyNotes: 'Irama lembut menyejukkan hati pendengar',
    lyrics: [
      { original: 'Deideng... anakku na poso...', indonesian: 'Tidurlah buah hatiku yang kucintai...' },
      { original: 'Gabe jolma na denggan boi...', indonesian: 'Jadilah kelak manusia yang berbudi luhur...' },
      { original: 'Pasangap rumahta Deli Serdang...', indonesian: 'Harumkanlah nama daerah kita Deli Serdang...' },
      { original: 'Diatei tupa ma bani Tuhan...', indonesian: 'Rasa syukur terima kasih selalu bagi Tuhan...' }
    ]
  }
];

export const SENTENCE_SCRAMBLE_DATA: SentenceScrambleItem[] = [
  {
    id: 'scramble-melayu-1',
    suku: 'Melayu',
    title: 'Sapaan Pagi Melayu Deli',
    meaning: 'Selamat pagi kawan, apa kabar hari ini?',
    scrambledWords: ['kawan', 'Selamat', 'kabar', 'pagi', 'apo'],
    correctSentence: 'Selamat pagi apo kabar kawan',
    hint: 'Dimulai dengan kata penghormatan "Selamat" lalu tanyakan kabar kawan.'
  },
  {
    id: 'scramble-melayu-2',
    suku: 'Melayu',
    title: 'Menyambut Tamu Kenduri Melayu',
    meaning: 'Silakan masuk ke rumah teratak kami dengan ramah.',
    scrambledWords: ['teratak', 'Jemput', 'kami', 'ke', 'masuk'],
    correctSentence: 'Jemput masuk ke teratak kami',
    hint: 'Suku Melayu menggunakan kata "Jemput" untuk mengundang tamu masuk dengan santun.'
  },
  {
    id: 'scramble-karo-1',
    suku: 'Karo',
    title: 'Salam Sejahtera Suku Karo',
    meaning: 'Sehat dan sejahtera untuk kita semua wahai saudara.',
    scrambledWords: ['kerina', 'Mejuah-juah', 'senina', 'banta', 'man'],
    correctSentence: 'Mejuah-juah man banta kerina senina',
    hint: 'Gunakan salam khas Karo "Mejuah-juah" di awal kalimat.'
  },
  {
    id: 'scramble-karo-2',
    suku: 'Karo',
    title: 'Rasa Syukur Pesta Panen Karo',
    meaning: 'Terima kasih banyak atas keberkahan panen raya.',
    scrambledWords: ['melala', 'Bujur', 'man', 'Dibata', 'kerina'],
    correctSentence: 'Bujur melala man Dibata kerina',
    hint: 'Ungkapan terima kasih mendalam dalam bahasa Karo adalah "Bujur melala".'
  },
  {
    id: 'scramble-simalungun-1',
    suku: 'Simalungun',
    title: 'Falsafah Kebenaran Simalungun',
    meaning: 'Salam kemuliaan, kebenaran adalah pangkal utama di rumah kita.',
    scrambledWords: ['bona', 'Horas', 'do', 'habonaron', 'rumahta', 'i'],
    correctSentence: 'Horas habonaron do bona i rumahta',
    hint: 'Semboyan agung Simalungun diawali kata "Horas" diikuti "habonaron do bona".'
  },
  {
    id: 'scramble-simalungun-2',
    suku: 'Simalungun',
    title: 'Ungkapan Terima Kasih Simalungun',
    meaning: 'Terima kasih yang tulus atas semua kebaikan saudaraku.',
    scrambledWords: ['Diatei', 'botou', 'tupa', 'huan', 'bani'],
    correctSentence: 'Diatei tupa bani huan botou',
    hint: '"Diatei tupa" adalah ungkapan terima kasih khas Simalungun.'
  }
];

export const CROSSWORD_DATA: CrosswordClue[] = [
  { id: 1, direction: 'across', number: 1, row: 1, col: 1, clue: 'Ikat kepala songket tenun khas pria Melayu Deli Serdang', answer: 'TANJAK' },
  { id: 2, direction: 'across', number: 2, row: 3, col: 1, clue: 'Kue pulut adat Karo dibungkus daun singkut isi kelapa gula merah', answer: 'CIMPA' },
  { id: 3, direction: 'across', number: 3, row: 5, col: 2, clue: 'Ibu kota Kabupaten Deli Serdang yang asri meraih Adipura (Lubuk ...)', answer: 'PAKAM' },
  { id: 4, direction: 'across', number: 4, row: 7, col: 1, clue: 'Kain tenun kebanggaan masyarakat adat Suku Simalungun', answer: 'HIOU' },
  { id: 5, direction: 'down', number: 1, row: 1, col: 1, clue: 'Tarian langkah kaki berirama rancak khas pesisir Deli Serdang', answer: 'ZAPIN' },
  { id: 6, direction: 'down', number: 2, row: 1, col: 4, clue: 'Guru pencipta Tari Serampang Dua Belas asal Kesultanan Serdang', answer: 'SAUTI' },
  { id: 7, direction: 'down', number: 3, row: 3, col: 5, clue: 'Suku asli yang mendiami dataran tinggi Sibolangit Deli Serdang', answer: 'KARO' },
  { id: 8, direction: 'down', number: 4, row: 4, col: 3, clue: 'Salam kehormatan suku Simalungun: "... Habonaron Do Bona"', answer: 'HORAS' }
];

export const EXPEDITION_ZONES_DATA: ExpeditionZoneItem[] = [
  {
    zoneId: 'zona-1',
    zoneTitle: 'Zona 1: Ekspedisi Pesisir & Muara Bahari',
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-800',
    badge: '🌊 Penjelajah Bahari',
    icon: '⛵',
    lore: 'Wilayah pesisir Selat Malaka kaya dengan muara sungai bersejarah, perkampungan nelayan Melayu Deli, serta tradisi pantun dan tari zapin.',
    checkpoints: [
      {
        id: 1,
        name: 'Pos Muara Sungai Percut',
        location: 'Percut Sei Tuan',
        challenge: 'Mengenal Tradisi Bahari',
        question: 'Ritual syukuran tahunan para nelayan pesisir Deli Serdang memohon keselamatan melaut disebut tradisi...?',
        options: ['Jamu Laut', 'Merdang Merdem', 'Gundala-Gundala', 'Kerja Tahun'],
        correctAnswer: 0,
        explanation: 'Tradisi Jamu Laut adalah upacara adat sedekah laut nelayan pesisir Melayu Deli Serdang sebagai ungkapan rasa syukur.',
        artifactFound: 'Dayung Perahu Pusaka Nelayan',
        artifactIcon: '🛶'
      },
      {
        id: 2,
        name: 'Sentra Songket & Anyaman Pandan',
        location: 'Pantai Cermin & Hamparan Perak',
        challenge: 'Ketelitian Seni Kerajinan',
        question: 'Pakaian adat pria Melayu Deli dilengkapi dengan mahkota ikat kepala songket berlipat yang dinamakan...?',
        options: ['Gotong', 'Tanjak', 'Bulang', 'Uis Gara'],
        correctAnswer: 1,
        explanation: 'Tanjak Melayu adalah hiasan mahkota kepala berbahan kain songket yang melambangkan kewibawaan dan kesantunan budi pekerti.',
        artifactFound: 'Tanjak Emas Elang Menyongsong Angin',
        artifactIcon: '👑'
      },
      {
        id: 3,
        name: 'Dermaga Tarian Serampang Dua Belas',
        location: 'Kawasan Pesisir Perbaungan & Batang Kuis',
        challenge: 'Irama Langkah Tari',
        question: 'Berapakah jumlah ragam gerak berurutan dalam Tari Serampang Dua Belas ciptaan Guru Sauti?',
        options: ['6 Ragam', '8 Ragam', '12 Ragam', '10 Ragam'],
        correctAnswer: 2,
        explanation: 'Sesuai namanya, tarian ini terdiri dari tepat 12 ragam gerak dari perkenalan tatap muka hingga pelaminan suci.',
        artifactFound: 'Sapu Tangan Sutra Putih Pergaulan',
        artifactIcon: '🕊️'
      }
    ]
  },
  {
    zoneId: 'zona-2',
    zoneTitle: 'Zona 2: Ekspedisi Perkotaan & Dataran Rendah',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-800',
    badge: '🏙️ Penjelajah Perkotaan',
    icon: '🏛️',
    lore: 'Jantung administratif dan denyut ekonomi Deli Serdang tempat bertemunya peradaban sejarah dan kerukunan suku-suku Nusantara.',
    checkpoints: [
      {
        id: 1,
        name: 'Ibu Kota Lubuk Pakam',
        location: 'Lubuk Pakam',
        challenge: 'Wawasan Ibu Kota',
        question: 'Ibu kota Kabupaten Deli Serdang yang asri dan meraih banyak penghargaan Adipura adalah daerah...?',
        options: ['Tanjung Morawa', 'Lubuk Pakam', 'Sibolangit', 'Percut'],
        correctAnswer: 1,
        explanation: 'Lubuk Pakam merupakan pusat pemerintahan dan ibu kota resmi Kabupaten Deli Serdang.',
        artifactFound: 'Piala Kebersihan Kota Adipura',
        artifactIcon: '🏆'
      },
      {
        id: 2,
        name: 'Situs Bersejarah Benteng Putri Hijau',
        location: 'Deli Tua (Kecamatan Namorambe)',
        challenge: 'Penjelajahan Jejak Masa Lalu',
        question: 'Situs benteng tanah bersejarah peninggalan legenda Putri Hijau dan Meriam Puntung berada di kawasan...?',
        options: ['Deli Tua', 'Pantai Cermin', 'Gunung Meriah', 'Hamparan Perak'],
        correctAnswer: 0,
        explanation: 'Situs Benteng Putri Hijau di Deli Tua adalah benteng pertahanan kuno masa Kesultanan Aru dan Deli abad ke-16.',
        artifactFound: 'Prasasti Batu Bata Benteng Kuno',
        artifactIcon: '📜'
      },
      {
        id: 3,
        name: 'Sentra Kuliner Anyang Melayu',
        location: 'Tanjung Morawa',
        challenge: 'Cita Rasa Tradisional',
        question: 'Makanan khas Melayu Deli berupa urap pakis segar yang ditaburi kelapa gongseng sangrai berempah adalah...?',
        options: ['Cimpa', 'Anyang Melayu', 'Dayok Nabinatur', 'Lemang'],
        correctAnswer: 1,
        explanation: 'Anyang Melayu adalah kuliner kebanggaan pesisir dan dataran rendah Deli Serdang yang kaya rempah.',
        artifactFound: 'Cobek Rempah Anyang Melayu',
        artifactIcon: '🥗'
      }
    ]
  },
  {
    zoneId: 'zona-3',
    zoneTitle: 'Zona 3: Ekspedisi Dataran Tinggi & Pegunungan',
    color: 'bg-amber-500',
    borderColor: 'border-amber-800',
    badge: '⛰️ Penjelajah Pegunungan',
    icon: '🏔️',
    lore: 'Dataran tinggi sejuk berhutan lindung cagar alam Sibolangit dan Gunung Meriah yang kaya dengan kearifan adat suku Karo dan Simalungun.',
    checkpoints: [
      {
        id: 1,
        name: 'Cagar Alam Sibolangit',
        location: 'Sibolangit',
        challenge: 'Konservasi Alam Flora',
        question: 'Kawasan konservasi alam hutan tropis tertua di Deli Serdang yang terkenal sejak era kolonial adalah...?',
        options: ['Taman Sibolangit', 'Pantai Percut', 'Benteng Deli', 'Hutan Mangrove'],
        correctAnswer: 0,
        explanation: 'Cagar Alam Sibolangit didirikan sejak 1914 sebagai salah satu kawasan konservasi tertua di Indonesia.',
        artifactFound: 'Bunga Eksotis Hutan Sibolangit',
        artifactIcon: '🌺'
      },
      {
        id: 2,
        name: 'Desa Adat Siwaluh Jabu Karo',
        location: 'Sibolangit & STM Hulu',
        challenge: 'Arsitektur & Pakaian Adat',
        question: 'Kain tenun sakral adat Karo warna merah marun berhias benang emas yang disematkan di pundak pria disebut...?',
        options: ['Hiou', 'Uis Beka Buluh', 'Songket', 'Batik'],
        correctAnswer: 1,
        explanation: 'Uis Beka Buluh adalah tenunan adat ksatria Karo yang melambangkan kebesaran jiwa dan perlindungan adat.',
        artifactFound: 'Uis Gara Tenun Benang Emas',
        artifactIcon: '🧣'
      },
      {
        id: 3,
        name: 'Puncak Adat Simalungun Gunung Meriah',
        location: 'Gunung Meriah',
        challenge: 'Falsafah Luhur Simalungun',
        question: 'Falsafah luhur Suku Simalungun yang bermakna "Kebenaran dan Ketulusan Adalah Pangkal Kehidupan" berbunyi...?',
        options: ['Mejuah-juah', 'Habonaron Do Bona', 'Bhinneka Tunggal Ika', 'Tut Wuri Handayani'],
        correctAnswer: 1,
        explanation: '"Habonaron Do Bona" adalah pedoman moral tertinggi suku Simalungun dalam berbuat kebajikan dan kejujuran hidup.',
        artifactFound: 'Destar Gotong Permata Simalungun',
        artifactIcon: '🎩'
      }
    ]
  }
];

export const HOTS_LKPD_QUIZ: QuizQuestion[] = [
  {
    q: '1. Mengapa Kabupaten Deli Serdang disebut sebagai wilayah "Tiga Dimensi Geografis"?',
    options: [
      'Karena memiliki 3 zona alam: pesisir bahari, perkotaan dataran rendah, dan dataran tinggi pegunungan',
      'Karena hanya memiliki 3 kecamatan saja',
      'Karena hanya dikelilingi oleh 3 buah sungai kecil',
      'Karena bentuk peta daerahnya segitiga sama sisi'
    ],
    answer: 0,
    explain: 'Deli Serdang memiliki topografi unik yang membentang dari garis pesisir Selat Malaka, dataran rendah subur perkotaan, hingga pegunungan sejuk Sibolangit.'
  },
  {
    q: '2. Semboyan kebanggaan lambang daerah Kabupaten Deli Serdang adalah...',
    options: [
      'Bhinneka Perkasa Jaya',
      'Habonaron Do Bona',
      'Mejuah-Juah Man Banta',
      'Tut Wuri Handayani'
    ],
    answer: 0,
    explain: '"Bhinneka Perkasa Jaya" mencerminkan persatuan dalam keanekaragaman suku dan agama yang tangguh menuju kejayaan.'
  },
  {
    q: '3. Di daerah Perbaungan (Kesultanan Serdang), maestro Guru Sauti menciptakan tarian pergaulan Melayu legendaris yaitu...',
    options: [
      'Tari Piring',
      'Tari Serampang Dua Belas',
      'Tari Gundala-Gundala',
      'Tari Tortor Sombah'
    ],
    answer: 1,
    explain: 'Guru Sauti menciptakan Tari Serampang Dua Belas pada tahun 1940-an yang kini menjadi warisan budaya takbenda dunia.'
  },
  {
    q: '4. Dalam tradisi suku Karo di Sibolangit, sistem kekerabatan adat yang mengikat tiga unsur persaudaraan disebut...',
    options: [
      'Rakut Sitelu (Kalimbubu, Senina, Anak Beru)',
      'Dalihan Na Tolu',
      'Sumpah Pemuda',
      'Rukun Tetangga'
    ],
    answer: 0,
    explain: 'Rakut Sitelu adalah pilar adat suku Karo yang menjamin kerukunan musyawarah dan tolong-menolong antar keluarga.'
  },
  {
    q: '5. Apa makna filosofis di balik penataan kuliner ritual Simalungun "Dayok Nabinatur"?',
    options: [
      'Agar susunan hidup penerimanya senantiasa teratur, sukses, dan penuh keberkahan',
      'Agar ayam cepat dingin saat dihidangkan',
      'Sebagai tanda bahwa ayam berukuran sangat besar',
      'Hanya sebagai hiasan meja makan semata'
    ],
    answer: 0,
    explain: '"Nabinatur" bermakna diatur dengan rapi sesuai susunan anatomi, mendoakan jalan hidup yang teratur dan diridhai Tuhan.'
  },
  {
    q: '6. Aksesoris penutup kepala pria Melayu Deli dari lipatan kain songket bermotif "Elang Menyongsong Angin" adalah...',
    options: [
      'Kopiah Beludru',
      'Tanjak Melayu Deli',
      'Bulang Bertingkat',
      'Gotong Bertatah Emas'
    ],
    answer: 1,
    explain: 'Tanjak Melayu melambangkan kewibawaan, keberanian melindungi marwah keluarga, dan kesantunan budi pekerti.'
  },
  {
    q: '7. Kesenian drama tari topeng sakral suku Karo di Sibolangit untuk memohon hujan (Ndilo Wari Udan) menceritakan kisah legenda burung...',
    options: [
      'Burung Gurda-Gurdi',
      'Burung Merpati Putih',
      'Burung Cendrawasih',
      'Burung Garuda Pancasila'
    ],
    answer: 0,
    explain: 'Tari Gundala-Gundala mengisahkan kesetiaan Burung Raksasa Gurda-Gurdi kepada Raja Sibayak dalam mendatangkan hujan berkah.'
  },
  {
    q: '8. Alunan instrumen musik sakral suku Simalungun yang terdiri atas 7 buah tabung gendang berlaras nada megah dinamakan...',
    options: [
      'Gonrang Sipitu-pitu',
      'Gendang Ronggeng',
      'Gendang Lima Sedalanen',
      'Angklung Bambu'
    ],
    answer: 0,
    explain: 'Gonrang Sipitu-pitu (tujuh gendang) adalah instrumen musik kebesaran raja dan upacara adat sakral masyarakat Simalungun.'
  },
  {
    q: '9. Mengapa kue Cimpa Unung-unung wajib dibungkus dengan "Daun Singkut" pada pesta adat Kerja Tahun di Sibolangit?',
    options: [
      'Karena daun singkut mengeluarkan aroma wangi khas yang melezatkan dan melambangkan ikatan persaudaraan',
      'Karena tidak ada daun pisang di pegunungan',
      'Hanya agar warnanya menjadi hijau tua',
      'Karena daun singkut beracun bagi serangga'
    ],
    answer: 0,
    explain: 'Daun singkut hutan memberikan aroma harum aromatik alami yang menjadi ciri khas kehangatan tradisi kue Cimpa Karo.'
  },
  {
    q: '10. Bagaimana sikap terbaik seorang Duta Budaya Cilik Deli Serdang saat berinteraksi dengan teman yang berbeda suku dan budaya?',
    options: [
      'Saling menghormati, mempelajari bahasa daerah bersama, dan hidup rukun dalam Bhinneka Perkasa Jaya',
      'Hanya mau berteman dengan teman yang satu suku saja',
      'Mengejek logat dan pakaian adat teman yang berbeda',
      'Menganggap budayanya sendiri paling hebat tanpa menghargai suku lain'
    ],
    answer: 0,
    explain: 'Duta Budaya sejati mengamalkan nilai luhur toleransi, rukun damai, dan bangga melestarikan keberagaman Deli Serdang.'
  }
];



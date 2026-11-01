import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Music,
  Compass,
  Smile,
  Layers,
  ShieldCheck,
  Gamepad2,
  Award,
  Volume2,
  VolumeX,
  Printer,
  User,
  GraduationCap,
  Star,
  Search,
  XCircle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  School,
  PlayCircle,
  QrCode,
  Copy,
  Download,
  ExternalLink,
  Shirt,
  Music2,
  ChevronRight,
  ChevronLeft,
  Info,
  Flame,
  Check,
  MapPin,
  Trophy,
  CheckCheck,
  FileText,
  Lightbulb,
  Radio,
  Bookmark
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  ZONES_DATA,
  DICTIONARY_DATA,
  ENCYCLOPEDIA_DATA,
  LKPD_MATCHING,
  LKPD_QUIZ,
  WORD_SEARCH_GRID,
  TARGET_WORDS,
  DICE_GAME_TILES_10,
  LIRIK_MARS,
  DANCE_CULTURE_DATA,
  FOLK_SONGS_DATA,
  SENTENCE_SCRAMBLE_DATA,
  CROSSWORD_DATA,
  EXPEDITION_ZONES_DATA,
  HOTS_LKPD_QUIZ,
  ZoneData,
  EncyclopediaItem,
  MatchingItem,
  DiceTile,
  DanceCultureItem,
  CostumeItem,
  FolkSongItem,
  SentenceScrambleItem,
  CrosswordClue,
  ExpeditionZoneItem
} from './data/cultureData';
import { playSound, speakText, stopSpeech, getAudioContext, playMelody, stopMelody } from './utils/audio';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [studentName, setStudentName] = useState<string>('Aditya Pratama');
  const [studentClass, setStudentClass] = useState<string>('Kelas IV-A');
  const [schoolName, setSchoolName] = useState<string>('SD Negeri 101 Lubuk Pakam');
  const [score, setScore] = useState<number>(100);

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [mascotSpeech, setMascotSpeech] = useState<string>(
    'Halo Teman Cilik! Aku Si Deli dan Si Serdang. Mari jelajahi lagu daerah, ekspedisi peta 3 zona, dan LKPD menantang!'
  );

  const [selectedCulture, setSelectedCulture] = useState<'melayu' | 'karo' | 'simalungun'>('melayu');
  const [selectedZone, setSelectedZone] = useState<ZoneData>(ZONES_DATA[0]);
  const [selectedEncyclopedia, setSelectedEncyclopedia] = useState<EncyclopediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [encCategoryFilter, setEncCategoryFilter] = useState<string>('semua');

  // LKPD Sub-Tab & States
  const [lkpdSubTab, setLkpdSubTab] = useState<'hots' | 'susun' | 'tts' | 'jodohkan' | 'cari_kata'>('hots');
  const [selectedMatchingItem, setSelectedMatchingItem] = useState<MatchingItem | null>(null);
  const [matchingAnswers, setMatchingAnswers] = useState<Record<number, string>>({});
  const [matchingFeedback, setMatchingFeedback] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // HOTS Quiz State (10 Soal Menantang)
  const [hotsAnswers, setHotsAnswers] = useState<Record<number, number>>({});
  const [hotsScore, setHotsScore] = useState<number | null>(null);
  const [showHotsReview, setShowHotsReview] = useState<boolean>(false);

  // Susun Balok Kalimat 3 Bahasa (Karo, Melayu, Simalungun)
  const [activeScrambleIdx, setActiveScrambleIdx] = useState<number>(0);
  const [userScrambledWords, setUserScrambledWords] = useState<string[]>([]);
  const [scrambleFeedback, setScrambleFeedback] = useState<{ type: 'success' | 'error' | 'hint'; msg: string } | null>(null);
  const [completedScrambles, setCompletedScrambles] = useState<string[]>([]);

  // Teka-Teki Silang (TTS)
  const [ttsUserInputs, setTtsUserInputs] = useState<Record<number, string>>({});
  const [ttsVerified, setTtsVerified] = useState<Record<number, boolean>>({});
  const [ttsShowAnswer, setTtsShowAnswer] = useState<Record<number, boolean>>({});

  // Lagu Khas Daerah 3 Suku
  const [songSukuFilter, setSongSukuFilter] = useState<'semua' | 'Melayu' | 'Karo' | 'Simalungun'>('semua');
  const [activeSongId, setActiveSongId] = useState<string>(FOLK_SONGS_DATA[0].id);
  const [showLyricsTrans, setShowLyricsTrans] = useState<boolean>(true);
  const [isPlayingSongMelody, setIsPlayingSongMelody] = useState<boolean>(false);

  // Games Jelajah Peta 3 Zona
  const [expeditionZoneIdx, setExpeditionZoneIdx] = useState<number>(0);
  const [expeditionActiveCheckpoint, setExpeditionActiveCheckpoint] = useState<number>(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>({});
  const [collectedArtifacts, setCollectedArtifacts] = useState<Array<{ name: string; icon: string; zone: string }>>([]);
  const [expeditionSelectedOption, setExpeditionSelectedOption] = useState<number | null>(null);
  const [expeditionFeedback, setExpeditionFeedback] = useState<{ correct: boolean; msg: string; explanation: string } | null>(null);

  // Dadu Game State (10-Petak)
  const [dicePos, setDicePos] = useState<number>(1);
  const [diceVal, setDiceVal] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [activeTrivia, setActiveTrivia] = useState<DiceTile | null>(null);

  // Snake Ladder State (2 Players)
  const [p1Pos, setP1Pos] = useState<number>(1);
  const [p2Pos, setP2Pos] = useState<number>(1);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [snakeLog, setSnakeLog] = useState<string>('Permainan Ular Tangga Siap Dimulai! Giliran Si Deli.');

  // QR Code States
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [qrType, setQrType] = useState<'app' | 'apk'>('app');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Dance, Attire & Traditional Arts States
  const [danceSukuFilter, setDanceSukuFilter] = useState<'semua' | 'Melayu' | 'Karo' | 'Simalungun'>('semua');
  const [selectedDanceModal, setSelectedDanceModal] = useState<DanceCultureItem | null>(null);
  const [selectedCostumeModal, setSelectedCostumeModal] = useState<CostumeItem | null>(null);
  const [danceQuizAnswers, setDanceQuizAnswers] = useState<Record<number, number>>({});
  const [danceQuizScore, setDanceQuizScore] = useState<number | null>(null);

  const APP_URL =
    typeof window !== 'undefined' && window.location.origin.startsWith('http')
      ? window.location.origin
      : 'https://ais-pre-6ogi4b6fp6hcqr3xfetm2u-468333157665.asia-east1.run.app';

  const APK_DOWNLOAD_URL = 'https://tmpfiles.org/dl/wvAAMtUf0uoJ/smartbook-deliserdang-apk-ready.zip';


  const activeTargetUrl = qrType === 'app' ? APP_URL : APK_DOWNLOAD_URL;

  useEffect(() => {
    QRCode.toDataURL(activeTargetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Gen error:', err));
  }, [activeTargetUrl]);

  const handleCopyLink = () => {
    playSound('click');
    navigator.clipboard.writeText(activeTargetUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleDownloadQRImage = () => {
    playSound('click');
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-SmartBook-DeliSerdang-${qrType}.png`;
    a.click();
  };

  // Unlock AudioContext on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      getAudioContext();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleSpeech = (text: string) => {
    setMascotSpeech(text);
    speakText(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleTabChange = (tabId: string) => {
    playSound('tab');
    setActiveTab(tabId);
    let speech = '';
    if (tabId === 'home') speech = 'Halaman Beranda Smart Book Budaya Deli Serdang.';
    if (tabId === 'mars') speech = 'Pemutar Video Musik & Lirik Mars Deli Serdang.';
    if (tabId === 'peta') speech = 'Peta 3 Zona Geografis Deli Serdang.';
    if (tabId === 'tarian') speech = 'Seni Tari Tradisional, Busana Adat, dan Kesenian 3 Suku Deli Serdang!';
    if (tabId === 'kamus') speech = 'Kamus Sapaan 3 Suku Kebanggaan: Melayu, Karo, dan Simalungun.';
    if (tabId === 'ensiklopedia') speech = 'Ensiklopedia Budaya Lokal Deli Serdang.';
    if (tabId === 'lkpd') speech = 'Lembar Kerja Siswa Interaktif. Selesaikan tugasmu!';
    if (tabId === 'games') speech = 'Arena Games Budaya Ceria. Putar dadu dan mainkan ular tangga!';
    if (tabId === 'rapor') {
      speech = 'Selamat! Ini Sertifikat Resmi Duta Budaya Cilik kamu.';
      triggerConfetti();
    }
    handleSpeech(speech);
  };

  // --- GAME LOGIC: DADU TRIVIA (10 PETAK) ---
  const handleRollDice = () => {
    if (isRolling) return;
    playSound('dice');
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 4) + 1;
      setDiceVal(rand);
      count++;
      if (count >= 7) {
        clearInterval(interval);
        setIsRolling(false);
        const newPos = Math.min(10, dicePos + rand);
        setDicePos(newPos);
        playSound('correct');
        const tileData = DICE_GAME_TILES_10.find((t) => t.id === newPos);
        if (tileData) {
          setActiveTrivia(tileData);
          handleSpeech(`Petak ${newPos}: ${tileData.question}`);
        }
      }
    }, 90);
  };

  const handleAnswerTrivia = (optionIdx: number) => {
    if (!activeTrivia) return;
    if (optionIdx === activeTrivia.ans) {
      playSound('correct');
      setScore((prev) => prev + 10);
      handleSpeech('Jawabanmu tepat sekali! Kamu mendapatkan bonus 10 poin!');
      triggerConfetti();
    } else {
      playSound('wrong');
      handleSpeech('Aduh, jawaban belum tepat. Tetap semangat mencoba!');
    }
    setActiveTrivia(null);
  };

  // --- GAME LOGIC: ULAR TANGGA (2 PEMAIN) ---
  const handleRollSnake = () => {
    playSound('dice');
    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPos = turn === 1 ? p1Pos : p2Pos;
    let nextPos = Math.min(25, currentPos + roll);

    const playerName = turn === 1 ? 'Si Deli (Biru)' : 'Si Serdang (Kuning)';
    let eventText = `${playerName} mendapat angka dadu ${roll}.`;

    if (nextPos === 3) {
      nextPos = 11;
      playSound('ladder');
      eventText += ' 🪜 Naik Tangga Pengetahuan Pesisir ke petak 11!';
    } else if (nextPos === 8) {
      nextPos = 16;
      playSound('ladder');
      eventText += ' 🪜 Naik Tangga Budaya Karo ke petak 16!';
    } else if (nextPos === 15) {
      nextPos = 22;
      playSound('ladder');
      eventText += ' 🪜 Naik Tangga Tradisi Simalungun ke petak 22!';
    } else if (nextPos === 14) {
      nextPos = 6;
      playSound('snake');
      eventText += ' 🐍 Terpeleset Ular Lupa Salam, turun ke petak 6!';
    } else if (nextPos === 19) {
      nextPos = 9;
      playSound('snake');
      eventText += ' 🐍 Terpeleset Ular Merusak Situs, turun ke petak 9!';
    } else if (nextPos === 24) {
      nextPos = 12;
      playSound('snake');
      eventText += ' 🐍 Terpeleset Ular Kurang Sopan, turun ke petak 12!';
    }

    if (turn === 1) {
      setP1Pos(nextPos);
      if (nextPos >= 25) {
        playSound('fanfare');
        setSnakeLog('🎉 Hore! Si Deli (Pemain 1) Mencapai Garis Akhir!');
        handleSpeech('Selamat Si Deli memenangkan permainan Ular Tangga Budaya!');
        triggerConfetti();
        return;
      }
      setTurn(2);
    } else {
      setP2Pos(nextPos);
      if (nextPos >= 25) {
        playSound('fanfare');
        setSnakeLog('🎉 Hore! Si Serdang (Pemain 2) Mencapai Garis Akhir!');
        handleSpeech('Selamat Si Serdang memenangkan permainan Ular Tangga Budaya!');
        triggerConfetti();
        return;
      }
      setTurn(1);
    }

    setSnakeLog(eventText);
    handleSpeech(eventText);
  };

  const resetSnakeGame = () => {
    playSound('click');
    setP1Pos(1);
    setP2Pos(1);
    setTurn(1);
    setSnakeLog('Permainan diulang dari petak awal. Giliran Si Deli memulai!');
  };

  // --- LKPD WORD SEARCH HANDLER ---
  const handleCellClick = (r: number, c: number) => {
    playSound('click');
    const cellKey = `${r}-${c}`;
    let newSelected: string[];

    if (selectedCells.includes(cellKey)) {
      newSelected = selectedCells.filter((k) => k !== cellKey);
    } else {
      newSelected = [...selectedCells, cellKey];
    }
    setSelectedCells(newSelected);

    const spelledWord = newSelected
      .map((k) => {
        const [row, col] = k.split('-').map(Number);
        return WORD_SEARCH_GRID[row][col];
      })
      .join('');

    TARGET_WORDS.forEach((target) => {
      if (
        !foundWords.includes(target) &&
        (spelledWord === target || spelledWord === target.split('').reverse().join(''))
      ) {
        playSound('correct');
        setFoundWords([...foundWords, target]);
        setScore((prev) => prev + 15);
        handleSpeech(`Luar biasa! Kamu berhasil menemukan kata ${target}!`);
        triggerConfetti();
      }
    });
  };

  // --- LKPD MATCHING HANDLER ---
  const handleMatchingSelect = (item: MatchingItem) => {
    playSound('click');
    setSelectedMatchingItem(item);
  };

  const handleMatchingTarget = (suku: 'Melayu' | 'Karo' | 'Simalungun') => {
    if (!selectedMatchingItem) return;
    const isCorrect = selectedMatchingItem.correctSuku === suku;
    if (isCorrect) {
      playSound('correct');
      setMatchingAnswers({ ...matchingAnswers, [selectedMatchingItem.id]: suku });
      setMatchingFeedback(`Jawaban Tepat! "${selectedMatchingItem.greeting}" adalah salam Suku ${suku}.`);
      setScore((prev) => prev + 10);
    } else {
      playSound('wrong');
      setMatchingFeedback('Belum tepat, silakan coba lagi atau cek kamus sapaan!');
    }
    setSelectedMatchingItem(null);
  };

  // --- LKPD QUIZ SUBMIT ---
  const handleQuizSubmit = () => {
    let correctCount = 0;
    LKPD_QUIZ.forEach((item, idx) => {
      if (quizAnswers[idx] === item.answer) {
        correctCount++;
      }
    });
    const finalCalculatedScore = Math.round((correctCount / LKPD_QUIZ.length) * 100);
    setQuizScore(finalCalculatedScore);
    if (finalCalculatedScore >= 80) {
      playSound('fanfare');
      handleSpeech(`Hebat sekali! Nilai Quiz LKPD kamu adalah ${finalCalculatedScore}!`);
      triggerConfetti();
    } else {
      playSound('wrong');
      handleSpeech(`Nilai evaluasi kamu adalah ${finalCalculatedScore}. Coba pelajari materi kembali ya!`);
    }
  };

  // Filtered Encyclopedia
  const filteredEncyclopedia = ENCYCLOPEDIA_DATA.filter((item) => {
    const matchesCategory = encCategoryFilter === 'semua' || item.category === encCategoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- LAGU KHAS DAERAH HELPERS ---
  const activeSong = useMemo(() => {
    return FOLK_SONGS_DATA.find((s) => s.id === activeSongId) || FOLK_SONGS_DATA[0];
  }, [activeSongId]);

  const filteredSongs = useMemo(() => {
    if (songSukuFilter === 'semua') return FOLK_SONGS_DATA;
    return FOLK_SONGS_DATA.filter((s) => s.suku === songSukuFilter);
  }, [songSukuFilter]);

  const handlePlaySongAudio = (song: FolkSongItem) => {
    stopMelody();
    stopSpeech();
    setIsPlayingSongMelody(true);
    playSound('correct');
    const melodyKey = (song.suku.toLowerCase() === 'melayu' ? 'melayu' : song.suku.toLowerCase() === 'karo' ? 'karo' : 'simalungun') as 'melayu' | 'karo' | 'simalungun';
    playMelody(melodyKey);
    const introText = `Lagu daerah ${song.suku}: ${song.title}. Irama tempo ${song.tempo}. Makna lagu: ${song.meaning}.`;
    handleSpeech(introText);
  };

  const handleReadLyrics = (song: FolkSongItem) => {
    stopMelody();
    stopSpeech();
    const lyricsToRead = song.lyrics.map((l) => l.original).join('. ');
    handleSpeech(`Membacakan bait lirik lagu daerah ${song.title}: ${lyricsToRead}`);
  };


  // --- SUSUN BALOK KALIMAT HELPERS ---
  const activeScramble = SENTENCE_SCRAMBLE_DATA[activeScrambleIdx];

  const handlePickScrambleWord = (word: string) => {
    playSound('click');
    setUserScrambledWords([...userScrambledWords, word]);
  };

  const handleRemoveScrambleWord = (removeIdx: number) => {
    playSound('click');
    const updated = [...userScrambledWords];
    updated.splice(removeIdx, 1);
    setUserScrambledWords(updated);
  };

  const handleCheckScrambleSentence = () => {
    const constructed = userScrambledWords.join(' ');
    if (constructed.trim().toLowerCase() === activeScramble.correctSentence.trim().toLowerCase()) {
      playSound('fanfare');
      setScrambleFeedback({
        type: 'success',
        msg: `🎉 Luar Biasa! Kalimat tersusun tepat: "${activeScramble.correctSentence}"`
      });
      if (!completedScrambles.includes(activeScramble.id)) {
        setCompletedScrambles([...completedScrambles, activeScramble.id]);
        setScore((prev) => prev + 20);
      }
      handleSpeech(`Hebat sekali! Kamu berhasil menyusun kalimat bahasa ${activeScramble.suku}: ${activeScramble.correctSentence}`);
      triggerConfetti();
    } else {
      playSound('wrong');
      setScrambleFeedback({
        type: 'error',
        msg: `Susunan belum tepat. Perhatikan petunjuk dan terjemahan: "${activeScramble.meaning}"`
      });
    }
  };

  const handleResetCurrentScramble = () => {
    playSound('click');
    setUserScrambledWords([]);
    setScrambleFeedback(null);
  };

  // --- TTS (CROSSWORD) HELPERS ---
  const handleTtsInputChange = (id: number, val: string) => {
    const upper = val.toUpperCase().replace(/[^A-Z]/g, '');
    setTtsUserInputs({ ...ttsUserInputs, [id]: upper });
  };

  const handleVerifyTtsWord = (clue: CrosswordClue) => {
    const userVal = (ttsUserInputs[clue.id] || '').trim();
    if (userVal === clue.answer) {
      playSound('correct');
      setTtsVerified({ ...ttsVerified, [clue.id]: true });
      setScore((prev) => prev + 15);
      triggerConfetti();
      handleSpeech(`Tepat sekali! Kata ${clue.answer} terpecahkan!`);
    } else {
      playSound('wrong');
      handleSpeech(`Jawaban untuk nomor ${clue.number} belum tepat. Silakan coba lagi!`);
    }
  };

  const handleRevealTtsWord = (id: number) => {
    const clue = CROSSWORD_DATA.find((c) => c.id === id);
    if (!clue) return;
    playSound('card');
    setTtsShowAnswer({ ...ttsShowAnswer, [id]: true });
    setTtsUserInputs({ ...ttsUserInputs, [id]: clue.answer });
  };

  // --- HOTS LKPD QUIZ HELPERS ---
  const handleHotsSubmit = () => {
    let count = 0;
    HOTS_LKPD_QUIZ.forEach((q, idx) => {
      if (hotsAnswers[idx] === q.answer) {
        count++;
      }
    });
    const calculated = Math.round((count / HOTS_LKPD_QUIZ.length) * 100);
    setHotsScore(calculated);
    setShowHotsReview(true);
    if (calculated >= 70) {
      playSound('fanfare');
      setScore((prev) => prev + calculated);
      handleSpeech(`Selamat! Nilai LKPD HOTS kamu adalah ${calculated}! Kamu menguasai wawasan budaya dengan sangat cerdas!`);
      triggerConfetti();
    } else {
      playSound('wrong');
      handleSpeech(`Nilai LKPD kamu ${calculated}. Simak pembahasan konsep di bawah untuk memperdalam pemahaman!`);
    }
  };

  // --- EKSPEDISI JELAJAH PETA 3 ZONA HELPERS ---
  const currentExpeditionZone = EXPEDITION_ZONES_DATA[expeditionZoneIdx];
  const currentCheckpoint = currentExpeditionZone.checkpoints[expeditionActiveCheckpoint];

  const handleAnswerExpeditionCheckpoint = (optionIdx: number) => {
    playSound('click');
    setExpeditionSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentCheckpoint.correctAnswer;
    const checkpointKey = `${currentExpeditionZone.zoneId}-${currentCheckpoint.id}`;

    if (isCorrect) {
      playSound('correct');
      setCompletedCheckpoints({ ...completedCheckpoints, [checkpointKey]: true });
      if (!collectedArtifacts.some((a) => a.name === currentCheckpoint.artifactFound)) {
        setCollectedArtifacts([
          ...collectedArtifacts,
          {
            name: currentCheckpoint.artifactFound,
            icon: currentCheckpoint.artifactIcon,
            zone: currentExpeditionZone.zoneTitle
          }
        ]);
        setScore((prev) => prev + 25);
      }
      setExpeditionFeedback({
        correct: true,
        msg: `🎉 Benar! Kamu menemukan artefak pusaka: ${currentCheckpoint.artifactFound}!`,
        explanation: currentCheckpoint.explanation
      });
      triggerConfetti();
      handleSpeech(`Luar biasa! Pos ${currentCheckpoint.name} berhasil kamu taklukkan!`);
    } else {
      playSound('wrong');
      setExpeditionFeedback({
        correct: false,
        msg: 'Jawabanmu masih belum tepat. Pelajari penjelasan berikut:',
        explanation: currentCheckpoint.explanation
      });
    }
  };

  // --- SERTIFIKAT DUTA BUDAYA RESMI PREDIKAT & REGISTRASI ---
  const certificateData = useMemo(() => {
    let tierTitle = 'DUTA BUDAYA MUDA';
    let category = 'Kategori Harapan (Perunggu / Bronze)';
    let badgeColor = 'bg-amber-600 text-white';
    let borderTheme = 'border-amber-700';
    let gradient = 'from-amber-100 via-orange-50 to-yellow-100';

    if (score >= 250) {
      tierTitle = 'DUTA BUDAYA UTAMA';
      category = 'Kategori Kehormatan Adipradana (Emas / Gold)';
      badgeColor = 'bg-amber-400 text-slate-900 shadow-md';
      borderTheme = 'border-amber-500';
      gradient = 'from-amber-100 via-yellow-50 to-amber-200';
    } else if (score >= 180) {
      tierTitle = 'DUTA BUDAYA MADYA';
      category = 'Kategori Prestasi Unggul (Perak / Silver)';
      badgeColor = 'bg-slate-300 text-slate-900 shadow-md';
      borderTheme = 'border-slate-400';
      gradient = 'from-slate-100 via-sky-50 to-slate-200';
    }

    const nameHash = (studentName || 'Siswa')
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 101);
    const regNo = `DS/DPK-DBD/2026/04/${Math.abs(nameHash).toString(16).toUpperCase().padStart(4, '0')}`;

    return {
      tierTitle,
      category,
      badgeColor,
      borderTheme,
      gradient,
      regNo,
      dateString: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  }, [score, studentName]);


  return (
    <div className="min-h-screen bg-amber-50/70 text-slate-800 font-sans pb-12 print:bg-white print:pb-0">
      {/* HEADER UTAMA & PROFIL SISWA */}
      <header className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-4 md:p-6 border-b-4 border-slate-800 shadow-md print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-amber-400 rounded-2xl border-3 border-slate-800 shadow-[0_4px_0_#1e293b] flex items-center justify-center text-3xl font-black text-slate-800 transform -rotate-3 shrink-0">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-slate-900 text-[10px] md:text-xs font-extrabold px-2.5 py-0.5 rounded-full border-2 border-slate-800 uppercase tracking-wide">
                  Palette Ceria 04
                </span>
                <span className="bg-cyan-200 text-cyan-900 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full border border-slate-800">
                  SD Kelas IV
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-slate-900 drop-shadow-sm mt-1">
                Smart Book Budaya Lokal Deli Serdang
              </h1>
            </div>
          </div>

          {/* Profil & Aksi Download / QR Panel */}
          <div className="flex flex-wrap items-center gap-2 bg-white/95 text-slate-800 p-2 md:p-2.5 rounded-2xl border-3 border-slate-800 shadow-[0_4px_0_#1e293b]">
            <button
              onClick={() => {
                playSound('card');
                setShowQRModal(true);
                handleSpeech('Arahkan kamera HP ke QR Code ini untuk membuka langsung Smart Book!');
              }}
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs shadow-xs transition-transform active:scale-95"
              title="Tampilkan QR Code untuk Buka Langsung di HP"
            >
              <QrCode className="w-4 h-4 text-slate-900" />
              <span>Scan QR HP</span>
            </button>
            <a
              href="https://tmpfiles.org/dl/wvAAMtUf0uoJ/smartbook-deliserdang-apk-ready.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-rose-400 hover:bg-rose-500 text-slate-900 px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs shadow-xs transition-transform active:scale-95"
              title="Unduh Paket Offline / APK Siap Pakai dari tmpfiles.org"
            >
              <span>📦</span>
              <span className="hidden sm:inline">Paket APK</span>
            </a>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="font-bold text-xs md:text-sm bg-slate-100 px-2 py-1 rounded-lg border-2 border-slate-400 w-28 md:w-36 focus:outline-none focus:border-emerald-600"
                placeholder="Nama Siswa"
                title="Ketik Nama Siswa"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-cyan-600 shrink-0" />
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="font-bold text-xs md:text-sm bg-slate-100 px-2 py-1 rounded-lg border-2 border-slate-400 w-20 md:w-24 focus:outline-none focus:border-cyan-600"
                placeholder="Kelas"
                title="Ketik Kelas"
              />
            </div>
            <div className="flex items-center gap-1 bg-amber-300 px-3 py-1 rounded-xl border-2 border-slate-800 font-black text-xs md:text-sm text-slate-900 shadow-xs">
              <Star className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
              <span>{score} Poin</span>
            </div>
          </div>
        </div>
      </header>

      {/* MASKOT SI DELI & SI SERDANG */}
      <div className="max-w-6xl mx-auto px-4 mt-4 print:hidden">
        <div className="bg-white border-4 border-slate-800 rounded-3xl p-4 shadow-[0_6px_0_#1e293b] flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-12 h-12 bg-rose-400 rounded-full border-3 border-slate-800 flex items-center justify-center text-2xl shadow-sm">
              👦🏻
            </div>
            <div className="w-12 h-12 bg-cyan-400 rounded-full border-3 border-slate-800 flex items-center justify-center text-2xl shadow-sm">
              👧🏽
            </div>
            <div className="text-left">
              <p className="font-black text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
                Sahabat Edukasi
              </p>
              <p className="font-extrabold text-sm text-slate-800">Si Deli & Si Serdang</p>
            </div>
          </div>

          <div className="flex-1 bg-amber-50 border-2 border-slate-800 rounded-2xl p-3 relative flex items-center justify-between gap-3 w-full">
            <p className="text-xs md:text-sm font-bold text-slate-700 italic">
              "{mascotSpeech}"
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleSpeech(mascotSpeech)}
                className={`p-2 rounded-xl border-2 border-slate-800 text-slate-900 font-bold transition-transform active:scale-95 flex items-center gap-1 ${
                  isSpeaking ? 'bg-rose-400 animate-pulse' : 'bg-amber-300 hover:bg-amber-400'
                }`}
                title="Putar Suara Sintesis"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">{isSpeaking ? 'Berbicara...' : 'Ulang Suara'}</span>
              </button>
              {isSpeaking && (
                <button
                  onClick={stopSpeech}
                  className="p-2 rounded-xl border-2 border-slate-800 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold"
                  title="Hentikan Suara"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGASI MENU UTAMA INTERAKTIF LENGKAP */}
      <nav className="max-w-6xl mx-auto px-4 mt-4 print:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'home', label: 'Beranda', icon: BookOpen, color: 'bg-emerald-400' },
            { id: 'mars', label: 'Mars Deli', icon: Music, color: 'bg-rose-400' },
            { id: 'lagu', label: 'Lagu 3 Suku', icon: Radio, color: 'bg-amber-400' },
            { id: 'peta', label: 'Peta 3 Zona', icon: Compass, color: 'bg-cyan-400' },
            { id: 'jelajah', label: 'Jelajah 3 Zona', icon: Trophy, color: 'bg-lime-400' },
            { id: 'tarian', label: 'Tari & Adat', icon: Sparkles, color: 'bg-pink-400' },
            { id: 'kamus', label: 'Kamus 3 Suku', icon: Smile, color: 'bg-yellow-400' },
            { id: 'ensiklopedia', label: 'Ensiklopedia', icon: Layers, color: 'bg-purple-400' },
            { id: 'lkpd', label: 'LKPD Siswa', icon: ShieldCheck, color: 'bg-orange-400' },
            { id: 'games', label: 'Arena Games', icon: Gamepad2, color: 'bg-indigo-400' },
            { id: 'rapor', label: 'Sertifikat', icon: Award, color: 'bg-amber-300' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}

                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap border-3 border-slate-800 transition-all ${
                  isActive
                    ? `${tab.color} text-slate-900 shadow-[0_4px_0_#1e293b] -translate-y-1`
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* CONTENT REGION CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 mt-4">
        {/* TAB 1: BERANDA */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300 border-4 border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_8px_0_#1e293b] relative overflow-hidden">
              <div className="max-w-2xl">
                <span className="bg-white border-2 border-slate-800 font-extrabold text-xs px-3 py-1 rounded-full text-slate-900 uppercase">
                  ✨ Selamat Datang Duta Budaya Cilik
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-2 leading-tight">
                  Jelajahi Kekayaan Tradisi & Budaya Lokal Kabupaten Deli Serdang
                </h2>
                <p className="mt-3 text-sm md:text-base font-bold text-slate-800 leading-relaxed">
                  Buku digital interaktif berbasis kearifan lokal. Mari belajar sapaan adat 3 suku usul (Melayu, Karo, Simalungun), kenali 3 zona geografis, nyanyikan Mars kebanggaan, telusuri kuliner & alat musik, serta uji kecakapanmu di LKPD dan arena permainan ceria!
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleTabChange('peta')}
                    className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 border-3 border-slate-800 px-5 py-3 rounded-2xl font-black text-sm shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none flex items-center gap-2"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Mulai Jelajah Peta 3 Zona</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('tarian')}
                    className="bg-pink-400 hover:bg-pink-500 text-slate-900 border-3 border-slate-800 px-5 py-3 rounded-2xl font-black text-sm shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Tarian & Busana Adat</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('games')}
                    className="bg-indigo-400 hover:bg-indigo-500 text-slate-900 border-3 border-slate-800 px-5 py-3 rounded-2xl font-black text-sm shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none flex items-center gap-2"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>Main Games Ular Tangga</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK STATS & FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => handleTabChange('peta')}
                className="bg-cyan-100 hover:bg-cyan-200 border-4 border-slate-800 p-5 rounded-3xl shadow-[0_6px_0_#1e293b] cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-cyan-400 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 shadow-xs">
                  🗺️
                </div>
                <h3 className="font-black text-lg text-slate-900">3 Zona Geografis</h3>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  Pesisir Bahari (Pantai Cermin & Percut), Perkotaan Dataran Rendah (Lubuk Pakam & Deli Tua), dan Dataran Tinggi Pegunungan (Sibolangit & Gunung Meriah).
                </p>
              </div>

              <div
                onClick={() => handleTabChange('tarian')}
                className="bg-pink-100 hover:bg-pink-200 border-4 border-slate-800 p-5 rounded-3xl shadow-[0_6px_0_#1e293b] cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-pink-400 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 shadow-xs">
                  💃🏽
                </div>
                <h3 className="font-black text-lg text-slate-900">Tarian & Busana Adat</h3>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  Tari Serampang 12, Zapin, Lima Serangkai, Gundala-Gundala, Tortor Sombah & Silat Dihar lengkap busana Tanjak, Uis Gara & Hiou.
                </p>
              </div>

              <div
                onClick={() => handleTabChange('kamus')}
                className="bg-amber-100 hover:bg-amber-200 border-4 border-slate-800 p-5 rounded-3xl shadow-[0_6px_0_#1e293b] cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-amber-400 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 shadow-xs">
                  🗣️
                </div>
                <h3 className="font-black text-lg text-slate-900">Kamus 3 Suku Usul</h3>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  Kekerabatan keluarga dan sapaan sehari-hari Melayu Deli, Suku Karo, dan Simalungun lengkap dengan audio suara interaktif.
                </p>
              </div>

              <div
                onClick={() => handleTabChange('lkpd')}
                className="bg-rose-100 hover:bg-rose-200 border-4 border-slate-800 p-5 rounded-3xl shadow-[0_6px_0_#1e293b] cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-rose-400 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 shadow-xs">
                  📝
                </div>
                <h3 className="font-black text-lg text-slate-900">LKPD & Sertifikat Siswa</h3>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  Tiga tugas seru: Menjodohkan Salam, Word Search 8x8, Quiz Pilihan Ganda, serta sertifikat Duta Budaya Cilik yang siap dicetak!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MARS DELI SERDANG */}
        {activeTab === 'mars' && (
          <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b-4 border-slate-800 pb-4">
              <div>
                <span className="bg-rose-300 text-slate-900 border-2 border-slate-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                  Lagu Kebanggaan Daerah
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Mars Kabupaten Deli Serdang</h2>
              </div>
              <button
                onClick={() => handleSpeech(LIRIK_MARS.filter((l) => l && !l.startsWith('[')).join('. '))}
                className="bg-rose-400 hover:bg-rose-500 border-3 border-slate-800 px-4 py-2 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bacakan Semua Lirik</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* VIDEO EMBED PLAYER */}
              <div className="space-y-3">
                <p className="font-black text-sm text-slate-800 flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-rose-500" /> Video Musik Mars Deli Serdang:
                </p>
                <div className="aspect-video w-full rounded-2xl border-4 border-slate-800 overflow-hidden shadow-[0_4px_0_#1e293b] bg-slate-900">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/GGJjr2YsTv4"
                    title="Mars Deli Serdang"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-xs font-bold text-slate-500 italic bg-amber-50 p-2.5 rounded-xl border border-slate-300">
                  💡 Tips Belajar: Nyanyikan bersama dengan penuh semangat cinta tanah air dan persaudaraan Bhinneka Perkasa Jaya!
                </p>
              </div>

              {/* LIRIK READER INTERAKTIF */}
              <div className="bg-amber-50 border-3 border-slate-800 rounded-2xl p-4 max-h-[420px] overflow-y-auto space-y-2">
                <p className="font-black text-sm text-slate-900 mb-2 border-b-2 border-slate-400 pb-1 flex items-center justify-between">
                  <span>🎼 Lirik Lengkap Mars Deli Serdang:</span>
                  <span className="text-[10px] font-bold text-slate-500">Klik baris untuk dengar suara</span>
                </p>
                {LIRIK_MARS.map((line, idx) => (
                  <div
                    key={idx}
                    onClick={() => line && !line.startsWith('[') && handleSpeech(line)}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      line.startsWith('[')
                        ? 'bg-rose-200 border-rose-600 font-black text-rose-900 text-center my-2 cursor-default'
                        : line === ''
                        ? 'py-1 border-transparent'
                        : 'bg-white hover:bg-amber-200 border-slate-700 font-bold text-xs md:text-sm text-slate-800 flex items-center justify-between cursor-pointer'
                    }`}
                  >
                    <span>{line}</span>
                    {line && !line.startsWith('[') && (
                      <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB: LAGU KHAS DAERAH 3 SUKU DELI SERDANG */}
        {activeTab === 'lagu' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-amber-400 border-3 border-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xs transform -rotate-2 shrink-0">
                    🎵
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-300 text-slate-900 border-2 border-slate-800 font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Warisan Nada Nusantara
                      </span>
                      <span className="bg-rose-200 text-rose-900 border border-slate-800 font-black text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                        Melayu • Karo • Simalungun
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                      Lagu Khas Daerah Deli Serdang
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePlaySongAudio(activeSong)}
                    className="bg-amber-300 hover:bg-amber-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Music className="w-4 h-4 text-slate-900" />
                    <span>Dengar Irama Melodi</span>
                  </button>
                  <button
                    onClick={() => handleReadLyrics(activeSong)}
                    className="bg-cyan-300 hover:bg-cyan-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 text-slate-900" />
                    <span>Lantunkan Bait Lirik</span>
                  </button>
                </div>
              </div>

              <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
                Nyanyikan dan hayati senandung warisan lagu daerah dari 3 suku pembentuk kebudayaan Deli Serdang. Dilengkapi lirik asli bahasa daerah, terjemahan bahasa Indonesia, instrumen pengiring, serta latar belakang filosofi setiap lagu.
              </p>

              {/* Suku Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {[
                  { id: 'semua', label: '🎼 Semua Lagu Daerah', color: 'bg-slate-200' },
                  { id: 'Melayu', label: '🌴 Lagu Melayu Deli & Serdang', color: 'bg-amber-300' },
                  { id: 'Karo', label: '🏔️ Lagu Suku Karo (Sibolangit)', color: 'bg-rose-300' },
                  { id: 'Simalungun', label: '🌾 Lagu Simalungun (Gunung Meriah)', color: 'bg-emerald-300' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      playSound('click');
                      setSongSukuFilter(f.id as any);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 border-slate-800 transition-all ${
                      songSukuFilter === f.id
                        ? `${f.color} text-slate-900 shadow-sm -translate-y-0.5`
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Song Grid & Active Song Player */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Song Selector Column */}
              <div className="lg:col-span-5 space-y-3">
                <p className="font-black text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Lagu ({filteredSongs.length} Lagu):</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Pilih untuk memutar</span>
                </p>

                <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                  {filteredSongs.map((song) => {
                    const isSelected = activeSongId === song.id;
                    const sukuColor =
                      song.suku === 'Melayu'
                        ? 'border-amber-400 bg-amber-50'
                        : song.suku === 'Karo'
                        ? 'border-rose-400 bg-rose-50'
                        : 'border-emerald-400 bg-emerald-50';

                    return (
                      <div
                        key={song.id}
                        onClick={() => {
                          playSound('card');
                          setActiveSongId(song.id);
                          handleSpeech(`Memilih lagu ${song.title} dari tradisi Suku ${song.suku}`);
                        }}
                        className={`p-4 rounded-2xl border-3 border-slate-800 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-amber-200 shadow-[0_6px_0_#1e293b] -translate-y-1'
                            : `bg-white hover:bg-slate-50 shadow-xs`
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-slate-800 bg-white">
                                {song.suku === 'Melayu' ? '🌴 Melayu' : song.suku === 'Karo' ? '🏔️ Karo' : '🌾 Simalungun'}
                              </span>
                              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                                {song.tempo}
                              </span>
                            </div>
                            <h4 className="text-base font-black text-slate-900 mt-1">{song.title}</h4>
                            <p className="text-xs font-semibold text-slate-600 line-clamp-1">{song.meaning}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlaySongAudio(song);
                            }}
                            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-500 border-2 border-slate-800 flex items-center justify-center shrink-0 shadow-xs"
                            title="Putar Irama"
                          >
                            <PlayCircle className="w-5 h-5 text-slate-900" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 pt-1 border-t border-slate-200">
                          <span className="truncate">📍 {song.origin}</span>
                          <span className="text-slate-800 font-extrabold flex items-center gap-1">
                            Buka Lirik <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Song Lyrics & Cultural Lore Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-300 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-lg border-2 border-slate-800 uppercase">
                          Suku {activeSong.suku}
                        </span>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                          Tempo: {activeSong.tempo}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">{activeSong.title}</h3>
                      <p className="text-xs font-bold text-slate-600">{activeSong.meaning}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePlaySongAudio(activeSong)}
                        className="bg-emerald-400 hover:bg-emerald-500 border-2 border-slate-800 px-3 py-1.5 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-xs"
                        title="Dengar Nada Melodi"
                      >
                        <Music className="w-4 h-4" /> Melodi
                      </button>
                      <button
                        onClick={() => handleReadLyrics(activeSong)}
                        className="bg-amber-300 hover:bg-amber-400 border-2 border-slate-800 px-3 py-1.5 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-xs"
                        title="Bacakan Lirik Lagu"
                      >
                        <Volume2 className="w-4 h-4" /> Bacakan
                      </button>
                      <button
                        onClick={() => {
                          stopMelody();
                          stopSpeech();
                        }}
                        className="bg-rose-300 hover:bg-rose-400 border-2 border-slate-800 p-1.5 rounded-xl text-slate-900"
                        title="Hentikan Audio"
                      >
                        <VolumeX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Instrument Badge & Translation Toggle */}
                  <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-100 p-2.5 rounded-2xl border-2 border-slate-300 text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Music2 className="w-4 h-4 text-purple-600" />
                      <span><strong>Asal & Laras Daerah:</strong> {activeSong.origin}</span>
                    </span>
                    <button
                      onClick={() => setShowLyricsTrans(!showLyricsTrans)}
                      className={`px-2.5 py-1 rounded-lg border border-slate-800 font-extrabold text-[11px] transition-all ${
                        showLyricsTrans ? 'bg-amber-300 text-slate-900' : 'bg-white text-slate-600'
                      }`}
                    >
                      {showLyricsTrans ? '✓ Terjemahan Aktif' : '+ Tampilkan Terjemahan'}
                    </button>
                  </div>

                  {/* Latar Belakang & Filosofi Budaya */}
                  <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1.5">
                    <p className="font-black text-xs text-amber-950 flex items-center gap-1.5 uppercase tracking-wider">
                      <Bookmark className="w-3.5 h-3.5 text-amber-700" /> Latar Belakang & Nilai Luhur Budaya:
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                      {activeSong.story}
                    </p>
                  </div>

                  {/* Karaoke Lirik Box */}
                  <div className="space-y-2">
                    <p className="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span>Bait Lirik & Karaoke Siswa:</span>
                      <span className="text-[10px] text-slate-500 font-bold">Klik speaker untuk dengar lafal per baris</span>
                    </p>

                    <div className="bg-slate-50 border-3 border-slate-800 rounded-2xl p-4 space-y-2.5 max-h-[340px] overflow-y-auto">
                      {activeSong.lyrics.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className="bg-white p-3 rounded-xl border-2 border-slate-700 flex items-start justify-between gap-3 shadow-xs hover:border-amber-500 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <p className="font-black text-sm md:text-base text-slate-900 font-serif">
                              "{line.original}"
                            </p>
                            {showLyricsTrans && (
                              <p className="text-xs font-bold text-amber-800 italic">
                                Artinya: {line.indonesian}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              playSound('click');
                              handleSpeech(`${line.original}. Artinya: ${line.indonesian}`);
                            }}
                            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 border border-slate-800 text-slate-900 shrink-0 mt-0.5"
                            title="Lafalkan baris ini"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}


        {/* TAB 3: PETA 3 ZONA GEOGRAFIS */}
        {activeTab === 'peta' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
              <h2 className="text-2xl font-black text-slate-900">Peta 3 Zona Geografis Deli Serdang</h2>
              <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">
                Kabupaten Deli Serdang terbagi menjadi 3 zona geografis dengan karakteristik alam dan budaya yang khas. Klik zona di bawah untuk mendengarkan penjelasannya!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {ZONES_DATA.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      playSound('card');
                      setSelectedZone(z);
                      handleSpeech(`${z.title}. ${z.desc}`);
                    }}
                    className={`p-4 rounded-2xl border-3 border-slate-800 font-black text-left transition-all ${
                      selectedZone.id === z.id
                        ? `${z.color} text-slate-900 ${z.shadowColor} -translate-y-1`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                    }`}
                  >
                    <span className="text-xs bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-800 uppercase block w-fit mb-1">
                      {z.badge}
                    </span>
                    <p className="text-base font-extrabold">{z.title}</p>
                    <p className="text-xs font-semibold mt-1 opacity-90">{z.areas}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedZone && (
              <div className={`${selectedZone.bgLight} border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4`}>
                <div className="flex items-center justify-between flex-wrap gap-2 border-b-3 border-slate-800 pb-3">
                  <div>
                    <span className="bg-white border-2 border-slate-800 font-black text-xs px-3 py-1 rounded-full text-slate-900">
                      {selectedZone.badge}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2">{selectedZone.title}</h3>
                    <p className="text-xs font-bold text-slate-700">Wilayah Cakupan: {selectedZone.areas}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleSpeech(`${selectedZone.title}. ${selectedZone.desc}. ${selectedZone.facts.join('. ')}`)
                    }
                    className="bg-amber-300 hover:bg-amber-400 border-3 border-slate-800 px-4 py-2 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengarkan Deskripsi Zona</span>
                  </button>
                </div>

                <p className="font-extrabold text-slate-800 text-sm md:text-base leading-relaxed bg-white/80 p-4 rounded-2xl border-2 border-slate-800">
                  {selectedZone.desc}
                </p>

                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-sm">📌 Fakta Menarik & Sejarah Zona:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedZone.facts.map((fact, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-2xl border-2 border-slate-800 font-bold text-xs text-slate-800 shadow-sm flex items-start gap-2"
                      >
                        <span className="bg-amber-300 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-slate-800 text-xs font-black">
                          {i + 1}
                        </span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* TAB: GAMES JELAJAH PETA 3 ZONA */}
        {activeTab === 'jelajah' && (
          <div className="space-y-6">
            {/* Header Ekspedisi */}
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-lime-400 border-3 border-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xs transform -rotate-3 shrink-0">
                    🧭
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-lime-300 text-slate-900 border-2 border-slate-800 font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Petualangan Interaktif Siswa
                      </span>
                      <span className="bg-amber-300 text-slate-900 border border-slate-800 font-black text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                        {collectedArtifacts.length} / 9 Artefak Pusaka
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                      Games Jelajah Peta 3 Zona Deli Serdang
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSpeech(
                        'Selamat datang di petualangan Jelajah Peta 3 Zona! Arungi Pos Pesisir, Perkotaan, dan Pegunungan untuk mengumpulkan 9 artefak budaya pusaka Deli Serdang!'
                      )
                    }
                    className="bg-lime-300 hover:bg-lime-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Panduan Ekspedisi</span>
                  </button>
                </div>
              </div>

              <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
                Ayo bertualang bersama Si Deli dan Si Serdang! Selesaikan setiap tantangan kuis di setiap pos checkpoint untuk membuka artefak sakral dari Zona Pesisir, Zona Perkotaan, hingga Zona Pegunungan. Setiap artefak memberi kamu <span className="text-emerald-800 font-black">+25 Bintang Prestasi</span>!
              </p>

              {/* Pemilihan 3 Zona Ekspedisi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {EXPEDITION_ZONES_DATA.map((zone, zIdx) => {
                  const isZoneActive = expeditionZoneIdx === zIdx;
                  const completedInZone = zone.checkpoints.filter(
                    (cp) => completedCheckpoints[`${zone.zoneId}-${cp.id}`]
                  ).length;

                  return (
                    <button
                      key={zone.zoneId}
                      onClick={() => {
                        playSound('card');
                        setExpeditionZoneIdx(zIdx);
                        setExpeditionActiveCheckpoint(0);
                        setExpeditionSelectedOption(null);
                        setExpeditionFeedback(null);
                        handleSpeech(`Memasuki ${zone.zoneTitle}`);
                      }}
                      className={`p-4 rounded-2xl border-3 border-slate-800 text-left transition-all flex flex-col justify-between ${
                        isZoneActive
                          ? `${zone.color} text-slate-900 shadow-[0_6px_0_#1e293b] -translate-y-1`
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{zone.icon}</span>
                          <span className="text-[10px] font-black uppercase bg-white/90 px-2 py-0.5 rounded-md border border-slate-800">
                            {completedInZone} / 3 Pos Selesai
                          </span>
                        </div>
                        <h4 className="font-black text-sm md:text-base mt-2">{zone.zoneTitle}</h4>
                      </div>
                      <p className="text-[11px] font-semibold mt-1 opacity-90 line-clamp-2">
                        {zone.lore}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Area Main Ekspedisi: Checkpoint Mission */}
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-6">
              {/* Stepper Pos Checkpoint di Zona Terpilih */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentExpeditionZone.icon}</span>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">
                      {currentExpeditionZone.zoneTitle}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      Pilih pos tantangan untuk menemukan artefak:
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentExpeditionZone.checkpoints.map((cp, cpIdx) => {
                    const isDone = !!completedCheckpoints[`${currentExpeditionZone.zoneId}-${cp.id}`];
                    const isCurrent = expeditionActiveCheckpoint === cpIdx;

                    return (
                      <button
                        key={cp.id}
                        onClick={() => {
                          playSound('click');
                          setExpeditionActiveCheckpoint(cpIdx);
                          setExpeditionSelectedOption(null);
                          setExpeditionFeedback(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs flex items-center gap-1.5 transition-all ${
                          isCurrent
                            ? 'bg-amber-300 text-slate-900 shadow-xs scale-105'
                            : isDone
                            ? 'bg-emerald-300 text-slate-900'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <span>{isDone ? '✓' : cp.id}</span>
                        <span>Pos {cp.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pos Card Details & Challenge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Info Pos & Target Artefak */}
                <div className="lg:col-span-5 bg-amber-50 border-3 border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase bg-amber-300 px-2.5 py-0.5 rounded-md border border-slate-800 text-slate-900">
                      Pos {currentCheckpoint.id} dari 3
                    </span>
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {currentCheckpoint.location}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-slate-900">{currentCheckpoint.name}</h4>

                  <div className="bg-white p-3 rounded-xl border-2 border-slate-800 space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      🎯 Misi Kebudayaan:
                    </p>
                    <p className="text-xs font-bold text-slate-800">{currentCheckpoint.challenge}</p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-200 to-yellow-300 p-3.5 rounded-xl border-2 border-slate-800 flex items-center gap-3">
                    <div className="text-3xl bg-white p-2 rounded-xl border-2 border-slate-800 shadow-xs">
                      {currentCheckpoint.artifactIcon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-amber-900">Hadiah Artefak Pusaka:</p>
                      <p className="text-sm font-black text-slate-900">{currentCheckpoint.artifactFound}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Challenge Question & Answers */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-50 border-3 border-slate-800 rounded-2xl p-5 space-y-3">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-lime-600" /> Pertanyaan Pos Ekspedisi:
                    </p>
                    <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                      "{currentCheckpoint.question}"
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {currentCheckpoint.options.map((option, optIdx) => {
                        const isSelected = expeditionSelectedOption === optIdx;
                        const isAnswered = expeditionFeedback !== null;
                        const isCorrectOption = optIdx === currentCheckpoint.correctAnswer;

                        let btnBg = 'bg-white hover:bg-slate-100 text-slate-800';
                        if (isAnswered) {
                          if (isCorrectOption) {
                            btnBg = 'bg-emerald-300 border-emerald-800 text-slate-900 font-black';
                          } else if (isSelected && !isCorrectOption) {
                            btnBg = 'bg-rose-200 border-rose-800 text-slate-900';
                          }
                        } else if (isSelected) {
                          btnBg = 'bg-amber-300 text-slate-900 shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerExpeditionCheckpoint(optIdx)}
                            className={`p-3 rounded-xl border-2 border-slate-800 text-xs font-bold text-left transition-all flex items-start gap-2 ${btnBg}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-200 border border-slate-800 flex items-center justify-center text-[10px] font-black shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="mt-0.5">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Banner */}
                  {expeditionFeedback && (
                    <div
                      className={`p-4 rounded-2xl border-3 border-slate-800 space-y-2 animate-in fade-in ${
                        expeditionFeedback.correct
                          ? 'bg-emerald-100 border-emerald-800'
                          : 'bg-rose-100 border-rose-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-sm">
                        <span>{expeditionFeedback.correct ? '🏆' : '⚠️'}</span>
                        <span>{expeditionFeedback.msg}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-300">
                        💡 <strong>Penjelasan Budaya:</strong> {expeditionFeedback.explanation}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            if (expeditionActiveCheckpoint < currentExpeditionZone.checkpoints.length - 1) {
                              setExpeditionActiveCheckpoint(expeditionActiveCheckpoint + 1);
                              setExpeditionSelectedOption(null);
                              setExpeditionFeedback(null);
                            } else if (expeditionZoneIdx < EXPEDITION_ZONES_DATA.length - 1) {
                              setExpeditionZoneIdx(expeditionZoneIdx + 1);
                              setExpeditionActiveCheckpoint(0);
                              setExpeditionSelectedOption(null);
                              setExpeditionFeedback(null);
                            }
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Lanjut ke Pos Berikutnya</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Kotak Koleksi Artefak Pusaka (Trophy Cabinet) */}
            <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-amber-300 pb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-700" />
                  <h3 className="font-black text-lg text-slate-900">
                    Koleksi Artefak Pusaka Deli Serdang ({collectedArtifacts.length} / 9)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-800">
                  Total Bonus: +{collectedArtifacts.length * 25} Poin
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2.5">
                {EXPEDITION_ZONES_DATA.flatMap((z) => z.checkpoints).map((cp) => {
                  const isFound = collectedArtifacts.some((a) => a.name === cp.artifactFound);

                  return (
                    <div
                      key={cp.artifactFound}
                      className={`p-3 rounded-2xl border-2 border-slate-800 text-center flex flex-col items-center justify-between min-h-[110px] transition-all ${
                        isFound
                          ? 'bg-amber-300 shadow-sm -translate-y-0.5'
                          : 'bg-white/60 opacity-50 grayscale'
                      }`}
                    >
                      <span className="text-2xl">{cp.artifactIcon}</span>
                      <p className="text-[10px] font-black text-slate-900 mt-1 leading-tight line-clamp-2">
                        {cp.artifactFound}
                      </p>
                      <span className="text-[9px] font-extrabold text-slate-600 mt-1">
                        {isFound ? '✓ Ditemukan' : 'Terkunci'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SENI TARI, PAKAIAN ADAT & KESENIAN 3 SUKU DELI SERDANG */}
        {activeTab === 'tarian' && (

          <div className="space-y-6">
            {/* Header Pengantar Tari & Adat */}
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-pink-400 border-3 border-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xs transform -rotate-3 shrink-0">
                    💃🏽
                  </div>
                  <div>
                    <span className="bg-pink-300 text-slate-900 border-2 border-slate-800 font-extrabold text-xs px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Warisan Seni & Busana Tradisional
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                      Seni Tari, Pakaian Adat & Kesenian Deli Serdang
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleSpeech(
                      'Selamat datang di ruang Seni Tari dan Busana Adat Deli Serdang! Mari jelajahi tarian Melayu, Karo, dan Simalungun beserta pakaian adat kebanggaan daerah kita.'
                    )
                  }
                  className="bg-pink-300 hover:bg-pink-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 self-start md:self-auto transition-transform active:scale-95 shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Pengantar</span>
                </button>
              </div>

              <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
                Kabupaten Deli Serdang memiliki kekayaan seni tari yang berakar dari 3 suku asli: <span className="font-extrabold text-amber-800">Melayu Deli & Serdang</span> di pesisir, <span className="font-extrabold text-rose-800">Suku Karo</span> di dataran tinggi Sibolangit, serta <span className="font-extrabold text-emerald-800">Suku Simalungun</span> di Gunung Meriah. Setiap tarian dilengkapi pakaian adat bermotif filosofis dan instrumen kesenian yang khas.
              </p>

              {/* Filter Suku Budaya */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {[
                  { id: 'semua', label: '🌟 Semua Tarian & Seni', color: 'bg-slate-200' },
                  { id: 'Melayu', label: '🌴 Suku Melayu (Pesisir & Dataran Rendah)', color: 'bg-amber-300' },
                  { id: 'Karo', label: '🏔️ Suku Karo (Dataran Tinggi Sibolangit)', color: 'bg-rose-300' },
                  { id: 'Simalungun', label: '🌾 Suku Simalungun (Gunung Meriah)', color: 'bg-emerald-300' }
                ].map((f) => {
                  const isSelected = danceSukuFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        playSound('click');
                        setDanceSukuFilter(f.id as 'semua' | 'Melayu' | 'Karo' | 'Simalungun');
                      }}
                      className={`px-3.5 py-2 rounded-2xl font-black text-xs border-3 border-slate-800 transition-all ${
                        isSelected
                          ? `${f.color} text-slate-900 shadow-[0_4px_0_#1e293b] -translate-y-1`
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid Daftar Tarian & Busana Adat */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {DANCE_CULTURE_DATA.filter((d) => danceSukuFilter === 'semua' || d.suku === danceSukuFilter).map(
                (dance) => {
                  const themeColor =
                    dance.suku === 'Melayu'
                      ? 'border-amber-800 bg-amber-50'
                      : dance.suku === 'Karo'
                      ? 'border-rose-800 bg-rose-50'
                      : 'border-emerald-800 bg-emerald-50';

                  const badgeColor =
                    dance.suku === 'Melayu'
                      ? 'bg-amber-300 text-amber-950'
                      : dance.suku === 'Karo'
                      ? 'bg-rose-300 text-rose-950'
                      : 'bg-emerald-300 text-emerald-950';

                  return (
                    <div
                      key={dance.id}
                      className={`border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] flex flex-col justify-between space-y-5 bg-white relative overflow-hidden`}
                    >
                      {/* Top Info Banner */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl p-2.5 bg-amber-100 rounded-2xl border-2 border-slate-800 shadow-xs">
                              {dance.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-slate-800 ${badgeColor}`}>
                                  Suku {dance.suku}
                                </span>
                                <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-400">
                                  {dance.badge}
                                </span>
                              </div>
                              <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                                {dance.danceName}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs font-black text-pink-700 italic">"{dance.tagline}"</p>

                        {/* Sejarah & Asal Usul di Deli Serdang */}
                        <div className="bg-slate-50 border-2 border-slate-700 p-3 rounded-2xl space-y-1">
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                            <span>🏛️ Sejarah & Asal Usul di Deli Serdang:</span>
                          </p>
                          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                            {dance.historyOrigin}
                          </p>
                        </div>

                        {/* Filosofi & Makna Tarian */}
                        <div className="bg-amber-50/80 border-2 border-amber-800/40 p-3 rounded-2xl space-y-1">
                          <p className="text-[11px] font-black text-amber-900 flex items-center gap-1">
                            <span>💡 Makna & Filosofi Tarian:</span>
                          </p>
                          <p className="text-xs font-bold text-slate-800 leading-relaxed">
                            {dance.philosophy}
                          </p>
                        </div>

                        {/* 3 Ragam Gerakan Utama */}
                        <div className="space-y-1.5">
                          <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                            <span>🕺 Ragam Gerakan Khas:</span>
                          </p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {dance.movements.map((move, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  playSound('click');
                                  handleSpeech(`${dance.danceName}, ${move.title}: ${move.desc}`);
                                }}
                                className="bg-white hover:bg-pink-100 border-2 border-slate-700 p-2.5 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.01] flex items-start gap-2 shadow-xs"
                              >
                                <span className="w-5 h-5 bg-pink-300 text-slate-900 rounded-full flex items-center justify-center text-[10px] font-black border border-slate-800 shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <div className="flex-1">
                                  <p className="text-xs font-black text-slate-900">{move.title}</p>
                                  <p className="text-[11px] font-semibold text-slate-600">{move.desc}</p>
                                </div>
                                <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-1" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pakaian & Busana Adat Pelengkap */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                              <Shirt className="w-3.5 h-3.5 text-pink-600" />
                              <span>Pakaian Adat & Aksesoris:</span>
                            </p>
                            <span className="text-[10px] font-bold text-slate-500">
                              (Klik aksesoris untuk dengar suara)
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {dance.attireDetails.map((attire, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => {
                                  playSound('click');
                                  setSelectedCostumeModal(attire);
                                  handleSpeech(
                                    `${attire.name}, busana adat suku ${dance.suku} untuk ${attire.wornBy}. ${attire.desc}`
                                  );
                                }}
                                className="flex items-center gap-1.5 bg-white hover:bg-amber-200 border-2 border-slate-800 px-2.5 py-1.5 rounded-xl font-black text-[11px] text-slate-800 shadow-xs transition-transform active:scale-95"
                              >
                                <span>{attire.icon}</span>
                                <span>{attire.name}</span>
                                <span className="text-[9px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded border border-slate-300">
                                  {attire.wornBy}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Kesenian & Musik Pengiring */}
                        <div className="space-y-1.5">
                          <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                            <Music2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Kesenian Tradisi & Musik Pengiring:</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {dance.kesenianTradisi.map((art, artIdx) => (
                              <div
                                key={artIdx}
                                onClick={() => {
                                  playSound('click');
                                  handleSpeech(`${art.name}, kesenian tradisional kategori ${art.type}. ${art.desc}`);
                                }}
                                className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-400 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-800 cursor-pointer shadow-xs"
                              >
                                <span>{art.icon}</span>
                                <span className="font-extrabold">{art.name}</span>
                                <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1 py-0.2 rounded border border-indigo-400">
                                  {art.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tahukah Kamu (Fun Fact) */}
                        <div className="bg-yellow-100 border-2 border-yellow-500 p-2.5 rounded-2xl flex items-start gap-2">
                          <span className="text-lg">✨</span>
                          <p className="text-[11px] font-extrabold text-yellow-950 leading-relaxed">
                            <span className="font-black">Tahukah Kamu?</span> {dance.funFact}
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi di Bawah Card */}
                      <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            playSound('click');
                            handleSpeech(
                              `${dance.danceName}, tarian khas suku ${dance.suku} Deli Serdang. ${dance.historyOrigin} ${dance.philosophy}`
                            );
                          }}
                          className="p-2.5 bg-pink-300 hover:bg-pink-400 border-2 border-slate-800 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Putar Narasi Tari</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('card');
                            setSelectedDanceModal(dance);
                          }}
                          className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 border-2 border-slate-800 rounded-xl font-black text-xs text-slate-900 shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
                        >
                          <span>Panduan Gerak Lengkap</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* MINI EVALUASI INTERAKTIF: TANTANGAN KUIS TARI & BUSANA ADAT */}
            <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-pink-300 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Tantangan Kuis Cerdas: Seni Tari & Busana Adat
                    </h3>
                    <p className="text-xs font-bold text-slate-600">
                      Uji wawasanmu seputar tarian, pakaian adat, dan alat musik kesenian Deli Serdang!
                    </p>
                  </div>
                </div>
                {danceQuizScore !== null && (
                  <span className="bg-amber-300 border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black text-slate-900">
                    Nilai Kuis: {danceQuizScore} / 100
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: '1. Tari Serampang Dua Belas diciptakan di daerah Perbaungan (Kesultanan Serdang) oleh maestro...',
                    options: ['Guru Sauti', 'Putri Hijau', 'Raja Sibayak', 'Sisingamangaraja'],
                    answer: 0,
                    explain: 'Guru Sauti menciptakan Tari Serampang Dua Belas pada era 1940-an di Perbaungan, Deli Serdang.'
                  },
                  {
                    q: '2. Mahkota lipatan kain songket tenun khas pria Melayu Deli Serdang disebut...',
                    options: ['Bulang', 'Tanjak Melayu', 'Gotong', 'Beka Buluh'],
                    answer: 1,
                    explain: 'Tanjak adalah mahkota ikat kepala songket berlipat khas pria Melayu Deli yang melambangkan kewibawaan.'
                  },
                  {
                    q: '3. Kain tenun sakral adat Karo berwarna merah marun berhias benang emas dan perak adalah...',
                    options: ['Kain Hiou', 'Uis Gara', 'Kain Pelekat', 'Songket Deli'],
                    answer: 1,
                    explain: 'Uis Gara (artinya kain merah) adalah kain tenun adat kebanggaan suku Karo.'
                  },
                  {
                    q: '4. Tarian sembah penghormatan tertinggi suku Simalungun dengan merapatkan kedua telapak tangan di dada adalah...',
                    options: ['Tari Zapin', 'Tari Lima Serangkai', 'Tari Tortor Sombah', 'Tari Gundala-Gundala'],
                    answer: 2,
                    explain: 'Tortor Sombah adalah tarian penghormatan tertinggi dalam adat Simalungun berlandaskan Habonaron Do Bona.'
                  },
                  {
                    q: '5. Kesenian drama tari topeng sakral suku Karo di Sibolangit untuk memohon hujan (Ndilo Wari Udan) disebut...',
                    options: ['Tari Ronggeng', 'Tari Gundala-Gundala', 'Tari Dihar', 'Tari Piring'],
                    answer: 1,
                    explain: 'Tari Gundala-Gundala mengenakan topeng kayu raksasa untuk mementaskan legenda Burung Gurda-Gurdi pemanggil hujan.'
                  }
                ].map((item, qIdx) => (
                  <div key={qIdx} className="bg-white p-4 rounded-2xl border-3 border-slate-800 space-y-2 shadow-xs">
                    <p className="font-black text-sm text-slate-900">{item.q}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.options.map((opt, oIdx) => {
                        const isSelected = danceQuizAnswers[qIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              playSound('click');
                              setDanceQuizAnswers({ ...danceQuizAnswers, [qIdx]: oIdx });
                            }}
                            className={`p-2.5 rounded-xl border-2 border-slate-800 font-extrabold text-xs text-left transition-all ${
                              isSelected
                                ? 'bg-pink-300 text-slate-900 shadow-sm -translate-y-0.5'
                                : 'bg-slate-50 hover:bg-pink-100 text-slate-800'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {danceQuizScore !== null && (
                      <p className="text-[11px] font-bold text-slate-600 bg-amber-50 p-2 rounded-xl border border-slate-300 mt-2">
                        💡 Penjelasan: {item.explain}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => {
                    const quizQuestions = [
                      { answer: 0 },
                      { answer: 1 },
                      { answer: 1 },
                      { answer: 2 },
                      { answer: 1 }
                    ];
                    let count = 0;
                    quizQuestions.forEach((q, idx) => {
                      if (danceQuizAnswers[idx] === q.answer) count++;
                    });
                    const finalScore = Math.round((count / quizQuestions.length) * 100);
                    setDanceQuizScore(finalScore);
                    setScore((prev) => prev + count * 10);
                    if (finalScore >= 80) {
                      playSound('fanfare');
                      triggerConfetti();
                      handleSpeech(`Hebat sekali! Nilai kuis seni tari dan busana adat kamu adalah ${finalScore}. Poin bertambah!`);
                    } else {
                      playSound('wrong');
                      handleSpeech(`Nilai kuis tari kamu adalah ${finalScore}. Silakan baca kembali materinya ya!`);
                    }
                  }}
                  className="w-full bg-pink-400 hover:bg-pink-500 border-3 border-slate-800 py-3 rounded-2xl font-black text-sm text-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-slate-900" />
                  <span>Koreksi & Hitung Nilai Kuis Tari</span>
                </button>
              </div>
            </div>

            {/* MODAL DETAIL TARIAN LENGKAP */}
            {selectedDanceModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white border-4 border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-[0_16px_0_#1e293b] space-y-5 relative animate-in fade-in zoom-in-95 my-8">
                  <button
                    onClick={() => setSelectedDanceModal(null)}
                    className="absolute top-4 right-4 bg-rose-300 hover:bg-rose-400 border-2 border-slate-800 p-1.5 rounded-xl font-black text-slate-900"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="text-5xl p-2 bg-pink-100 rounded-2xl border-2 border-slate-800">
                      {selectedDanceModal.icon}
                    </span>
                    <div>
                      <span className="bg-pink-200 text-pink-900 text-xs font-black px-3 py-0.5 rounded-full border border-pink-500">
                        Suku {selectedDanceModal.suku} • {selectedDanceModal.badge}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                        {selectedDanceModal.danceName}
                      </h3>
                      <p className="text-xs font-bold text-slate-600">{selectedDanceModal.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-3 bg-amber-50 p-4 rounded-2xl border-2 border-slate-800 text-xs md:text-sm font-bold text-slate-800 leading-relaxed">
                    <p>
                      <span className="font-black text-amber-900">Sejarah di Deli Serdang:</span>{' '}
                      {selectedDanceModal.historyOrigin}
                    </p>
                    <p>
                      <span className="font-black text-amber-900">Filosofi & Nilai Adat:</span>{' '}
                      {selectedDanceModal.philosophy}
                    </p>
                    <p>
                      <span className="font-black text-amber-900">Iringan Musik:</span>{' '}
                      {selectedDanceModal.musicAccompaniment}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-black text-sm text-slate-900">📌 Panduan Ragam Gerakan Utama:</h4>
                    <div className="space-y-2">
                      {selectedDanceModal.movements.map((move, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-xl border-2 border-slate-700 flex items-start gap-2">
                          <span className="bg-pink-300 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-slate-800">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-black text-xs text-slate-900">{move.title}</p>
                            <p className="text-[11px] font-semibold text-slate-600">{move.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t-2 border-slate-200">
                    <button
                      onClick={() =>
                        handleSpeech(
                          `${selectedDanceModal.danceName}. ${selectedDanceModal.historyOrigin} ${selectedDanceModal.philosophy}`
                        )
                      }
                      className="bg-amber-300 hover:bg-amber-400 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" /> Putar Narasi
                    </button>
                    <button
                      onClick={() => setSelectedDanceModal(null)}
                      className="bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL DETAIL BUSANA ADAT SPESIFIK */}
            {selectedCostumeModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white border-4 border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-[0_12px_0_#1e293b] space-y-4 relative animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => setSelectedCostumeModal(null)}
                    className="absolute top-4 right-4 bg-rose-300 hover:bg-rose-400 border-2 border-slate-800 p-1.5 rounded-xl font-black text-slate-900"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedCostumeModal.icon}</span>
                    <div>
                      <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-500 uppercase">
                        Busana {selectedCostumeModal.wornBy}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                        {selectedCostumeModal.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm font-bold text-slate-700 bg-amber-50 p-4 rounded-2xl border-2 border-slate-800 leading-relaxed">
                    {selectedCostumeModal.desc}
                  </p>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() =>
                        handleSpeech(`${selectedCostumeModal.name}. ${selectedCostumeModal.desc}`)
                      }
                      className="bg-amber-300 hover:bg-amber-400 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" /> Dengarkan
                    </button>
                    <button
                      onClick={() => setSelectedCostumeModal(null)}
                      className="bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: KAMUS 3 SUKU */}
        {activeTab === 'kamus' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
              <h2 className="text-2xl font-black text-slate-900">Kamus Sapaan 3 Suku Usul</h2>
              <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">
                Kenali dan latih sebutan keluarga serta sapaan santun Suku Melayu Deli, Karo, dan Simalungun. Klik kartu mana pun untuk mendengarkan pelafalan suaranya!
              </p>

              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {[
                  { id: 'melayu', name: 'Melayu Deli & Serdang', icon: '🌴', color: 'bg-amber-300' },
                  { id: 'karo', name: 'Suku Karo (Sibolangit)', icon: '🏔️', color: 'bg-rose-300' },
                  { id: 'simalungun', name: 'Suku Simalungun (Gunung Meriah)', icon: '🌾', color: 'bg-emerald-300' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedCulture(c.id as 'melayu' | 'karo' | 'simalungun');
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm border-3 border-slate-800 transition-all ${
                      selectedCulture === c.id
                        ? `${c.color} text-slate-900 shadow-[0_4px_0_#1e293b] -translate-y-1`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {DICTIONARY_DATA[selectedCulture] && (
              <div className="space-y-6">
                {/* CATEGORY 1: SEBUTAN KEKERABATAN KELUARGA */}
                <div className="bg-amber-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
                  <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <span>👨‍👩‍👧‍👦 Sebutan Kekerabatan / Keluarga ({DICTIONARY_DATA[selectedCulture].cultureName})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DICTIONARY_DATA[selectedCulture].family.map((fam, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          playSound('click');
                          handleSpeech(`${fam.title} dalam bahasa daerah dipanggil ${fam.term}`);
                        }}
                        className="bg-white hover:bg-amber-200 border-3 border-slate-800 p-4 rounded-2xl shadow-sm cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                            {fam.title}
                          </span>
                          <p className="text-lg font-black text-slate-900 mt-1">{fam.term}</p>
                          <p className="text-xs font-semibold text-slate-600 mt-1">{fam.note}</p>
                        </div>
                        <div className="mt-3 text-right">
                          <span className="text-xs font-bold text-amber-700 flex items-center justify-end gap-1">
                            <Volume2 className="w-3.5 h-3.5" /> Putar Suara
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CATEGORY 2: SAPAAN RAMAH SEHARI-HARI */}
                <div className="bg-emerald-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
                  <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <span>💬 Sapaan Ramah Sehari-hari</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DICTIONARY_DATA[selectedCulture].greetings.map((greet) => (
                      <div
                        key={greet.id}
                        onClick={() => {
                          playSound('click');
                          handleSpeech(greet.local);
                        }}
                        className="bg-white hover:bg-emerald-200 border-3 border-slate-800 p-4 rounded-2xl shadow-sm cursor-pointer transition-all hover:-translate-y-0.5"
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                          {greet.phrase}
                        </span>
                        <p className="text-base font-black text-slate-900 mt-2">"{greet.local}"</p>
                        <p className="text-xs font-bold text-slate-600 mt-1">Artinya: {greet.meaning}</p>
                        <div className="mt-3 text-right">
                          <span className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                            <Volume2 className="w-3.5 h-3.5" /> Bunyikan
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ENSIKLOPEDIA BUDAYA */}
        {activeTab === 'ensiklopedia' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
              <div className="flex flex-col md:flex-row items-md-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Ensiklopedia Budaya Lokal</h2>
                  <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">
                    Koleksi warisan kuliner, alat musik, pakaian adat, dan tradisi khas Deli Serdang.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 border-2 border-slate-800 px-3 py-2 rounded-2xl w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari budaya lokal..."
                    className="bg-transparent font-bold text-xs w-full focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <XCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'semua', label: 'Semua Kategori' },
                  { id: 'kuliner', label: '🍲 Kuliner Tradisional' },
                  { id: 'alat_musik', label: '🎵 Alat Musik' },
                  { id: 'pakaian_adat', label: '🥋 Pakaian Adat' },
                  { id: 'tradisi', label: '🎉 Pesta & Tradisi' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      playSound('click');
                      setEncCategoryFilter(f.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs border-2 border-slate-800 whitespace-nowrap transition-all ${
                      encCategoryFilter === f.id
                        ? 'bg-purple-300 text-slate-900 shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEncyclopedia.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-4 border-slate-800 rounded-3xl p-5 shadow-[0_6px_0_#1e293b] flex flex-col justify-between space-y-3 transition-transform hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl p-2 bg-amber-100 rounded-2xl border border-amber-300">
                        {item.image}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full border border-purple-400">
                        {item.origin}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mt-3">{item.title}</h3>
                    <p className="text-xs font-black text-purple-700">{item.subtitle}</p>
                    <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">{item.shortDesc}</p>
                  </div>

                  <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleSpeech(`${item.title}. ${item.story}`)}
                      className="p-2 bg-amber-200 hover:bg-amber-300 border-2 border-slate-800 rounded-xl text-slate-900 font-bold text-xs flex items-center gap-1 shadow-xs"
                      title="Dengar Penjelasan"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Audio</span>
                    </button>
                    <button
                      onClick={() => {
                        playSound('card');
                        setSelectedEncyclopedia(item);
                      }}
                      className="px-3 py-2 bg-purple-300 hover:bg-purple-400 border-2 border-slate-800 rounded-xl font-black text-xs text-slate-900 shadow-sm"
                    >
                      Baca Cerita Lengkap
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DETAIL MODAL */}
            {selectedEncyclopedia && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white border-4 border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-[0_12px_0_#1e293b] space-y-4 relative animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => setSelectedEncyclopedia(null)}
                    className="absolute top-4 right-4 bg-rose-300 hover:bg-rose-400 border-2 border-slate-800 p-1.5 rounded-xl font-black text-slate-900"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedEncyclopedia.image}</span>
                    <div>
                      <span className="bg-purple-200 text-purple-900 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-purple-500">
                        {selectedEncyclopedia.origin}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">{selectedEncyclopedia.title}</h3>
                      <p className="text-xs font-bold text-slate-500">{selectedEncyclopedia.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm font-bold text-slate-700 bg-amber-50 p-4 rounded-2xl border-2 border-slate-800 leading-relaxed">
                    {selectedEncyclopedia.story}
                  </p>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleSpeech(selectedEncyclopedia.story)}
                      className="bg-amber-300 hover:bg-amber-400 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900 flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" /> Putar Narasi
                    </button>
                    <button
                      onClick={() => setSelectedEncyclopedia(null)}
                      className="bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 px-4 py-2 rounded-xl font-black text-xs text-slate-900"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: LKPD SISWA INTERAKTIF LENGKAP */}
        {activeTab === 'lkpd' && (
          <div className="space-y-6">
            {/* Header LKPD */}
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-orange-400 border-3 border-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xs transform -rotate-2 shrink-0">
                    📝
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-300 text-slate-900 border-2 border-slate-800 font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Lembar Kerja Peserta Didik (LKPD)
                      </span>
                      <span className="bg-emerald-300 text-slate-900 border border-slate-800 font-black text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                        Kurikulum Merdeka • Kelas IV
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                      Aktivitas Pembelajaran Budaya Menantang
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSpeech(
                        'Selamat datang di Lembar Kerja Peserta Didik! Kerjakan Pilihan Ganda HOTS yang menantang, susun balok kalimat tiga bahasa daerah, isi teka-teki silang budaya, dan kumpulkan skor kelulusan tertinggimu!'
                      )
                    }
                    className="bg-orange-300 hover:bg-orange-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Panduan LKPD</span>
                  </button>
                </div>
              </div>

              {/* Sub-nav Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                {[
                  { id: 'hots', label: '🎯 Pilihan Ganda HOTS (10 Soal)', color: 'bg-emerald-400' },
                  { id: 'susun', label: '🧩 Susun Kalimat 3 Bahasa', color: 'bg-amber-400' },
                  { id: 'tts', label: '🔠 Teka-Teki Silang (TTS)', color: 'bg-purple-400' },
                  { id: 'jodohkan', label: '🤝 Menjodohkan Salam', color: 'bg-orange-400' },
                  { id: 'cari_kata', label: '🔍 Cari Kata Word Search', color: 'bg-cyan-400' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      playSound('tab');
                      setLkpdSubTab(st.id as any);
                    }}
                    className={`px-4 py-2 rounded-2xl font-black text-xs md:text-sm border-3 border-slate-800 whitespace-nowrap transition-all ${
                      lkpdSubTab === st.id
                        ? `${st.color} text-slate-900 shadow-[0_4px_0_#1e293b] -translate-y-0.5`
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SUB-TAB 1: PILIHAN GANDA HOTS 10 SOAL */}
            {lkpdSubTab === 'hots' && (
              <div className="bg-emerald-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-emerald-300 pb-3">
                  <div>
                    <span className="bg-emerald-300 text-slate-900 border border-slate-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Tugas 1: Penalaran Tingkat Tinggi (HOTS)
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      Evaluasi Kritis Kebudayaan Deli Serdang (10 Soal)
                    </h3>
                  </div>
                  {hotsScore !== null && (
                    <div className="bg-amber-300 border-3 border-slate-800 px-4 py-2 rounded-2xl font-black text-sm text-slate-900 shadow-xs flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-700" />
                      <span>Nilai HOTS: {hotsScore} / 100</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {HOTS_LKPD_QUIZ.map((q, qIdx) => {
                    const selectedOpt = hotsAnswers[qIdx];
                    const isEvaluated = hotsScore !== null;
                    const isCorrect = selectedOpt === q.answer;

                    return (
                      <div
                        key={qIdx}
                        className={`bg-white p-5 rounded-2xl border-3 border-slate-800 space-y-3 transition-all ${
                          isEvaluated
                            ? isCorrect
                              ? 'border-emerald-600 bg-emerald-50/50'
                              : 'border-rose-600 bg-rose-50/50'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-black text-sm md:text-base text-slate-900 leading-snug">
                            {q.q}
                          </p>
                          {isEvaluated && (
                            <span className="text-xl shrink-0">
                              {isCorrect ? '✅' : '❌'}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, oIdx) => {
                            const isThisSelected = selectedOpt === oIdx;
                            const isThisTheCorrectAnswer = oIdx === q.answer;

                            let optStyle = 'bg-slate-50 hover:bg-emerald-100 text-slate-800';
                            if (isEvaluated) {
                              if (isThisTheCorrectAnswer) {
                                optStyle = 'bg-emerald-300 text-slate-900 border-emerald-800 font-black';
                              } else if (isThisSelected && !isThisTheCorrectAnswer) {
                                optStyle = 'bg-rose-200 text-slate-900 border-rose-800 font-bold';
                              }
                            } else if (isThisSelected) {
                              optStyle = 'bg-amber-300 text-slate-900 shadow-xs -translate-y-0.5';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  playSound('click');
                                  setHotsAnswers({ ...hotsAnswers, [qIdx]: oIdx });
                                }}
                                className={`p-3 rounded-xl border-2 border-slate-800 font-extrabold text-xs text-left transition-all flex items-start gap-2 ${optStyle}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-200 border border-slate-800 flex items-center justify-center text-[10px] font-black shrink-0">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="mt-0.5">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {showHotsReview && (
                          <div className="bg-amber-50 p-3 rounded-xl border-2 border-amber-300 text-xs font-semibold text-slate-800 space-y-1">
                            <p className="font-black text-amber-950 flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4 text-amber-600" />
                              <span>Pembahasan Konseptual:</span>
                            </p>
                            <p>{q.explain}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleHotsSubmit}
                      className="flex-1 w-full bg-emerald-400 hover:bg-emerald-500 border-3 border-slate-800 py-3.5 rounded-2xl font-black text-sm text-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none transition-all"
                    >
                      Periksa & Hitung Skor LKPD HOTS 🚀
                    </button>
                    {hotsScore !== null && (
                      <button
                        onClick={() => {
                          playSound('click');
                          setHotsAnswers({});
                          setHotsScore(null);
                          setShowHotsReview(false);
                        }}
                        className="bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 px-5 py-3.5 rounded-2xl font-black text-xs text-slate-900 flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" /> Ulangi Kuis
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: SUSUN BALOK KALIMAT 3 BAHASA */}
            {lkpdSubTab === 'susun' && (
              <div className="bg-amber-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-amber-300 pb-3">
                  <div>
                    <span className="bg-amber-300 text-slate-900 border border-slate-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Tugas 2: Logika Tata Bahasa Daerah
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      Susun Balok Kalimat Bahasa Karo, Melayu & Simalungun
                    </h3>
                  </div>
                  <span className="bg-white border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black text-slate-900">
                    Diselesaikan: {completedScrambles.length} / {SENTENCE_SCRAMBLE_DATA.length} Kalimat
                  </span>
                </div>

                {/* Sentence Selector Carousel */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {SENTENCE_SCRAMBLE_DATA.map((sc, scIdx) => {
                    const isDone = completedScrambles.includes(sc.id);
                    const isCurrent = activeScrambleIdx === scIdx;
                    return (
                      <button
                        key={sc.id}
                        onClick={() => {
                          playSound('click');
                          setActiveScrambleIdx(scIdx);
                          setUserScrambledWords([]);
                          setScrambleFeedback(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs whitespace-nowrap transition-all ${
                          isCurrent
                            ? 'bg-amber-300 text-slate-900 shadow-xs scale-105'
                            : isDone
                            ? 'bg-emerald-300 text-slate-900'
                            : 'bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isDone ? '✓ ' : ''}</span>
                        <span>{sc.suku}: Kalimat {scIdx + 1}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Scramble Workspace Card */}
                <div className="bg-white border-3 border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase bg-amber-300 px-2 py-0.5 rounded-md border border-slate-800">
                          {activeScramble.suku}
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          {activeScramble.title}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-1 italic">
                        Arti Kalimat: "{activeScramble.meaning}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playSound('click');
                          handleSpeech(activeScramble.correctSentence);
                        }}
                        className="bg-cyan-200 hover:bg-cyan-300 border-2 border-slate-800 px-3 py-1.5 rounded-xl text-xs font-black text-slate-900 flex items-center gap-1 shadow-xs"
                        title="Dengarkan pelafalan kalimat asli"
                      >
                        <Volume2 className="w-4 h-4" /> Lafalkan
                      </button>
                      <button
                        onClick={() =>
                          setScrambleFeedback({
                            type: 'hint',
                            msg: `💡 Petunjuk Budaya: ${activeScramble.hint}`
                          })
                        }
                        className="bg-amber-200 hover:bg-amber-300 border-2 border-slate-800 px-3 py-1.5 rounded-xl text-xs font-black text-slate-900 flex items-center gap-1 shadow-xs"
                      >
                        <HelpCircle className="w-4 h-4" /> Petunjuk
                      </button>
                    </div>
                  </div>

                  {/* Feedback Message */}
                  {scrambleFeedback && (
                    <div
                      className={`p-3 rounded-xl border-2 border-slate-800 font-extrabold text-xs animate-in fade-in ${
                        scrambleFeedback.type === 'success'
                          ? 'bg-emerald-200 text-emerald-950 border-emerald-800'
                          : scrambleFeedback.type === 'error'
                          ? 'bg-rose-200 text-rose-950 border-rose-800'
                          : 'bg-amber-200 text-amber-950 border-amber-800'
                      }`}
                    >
                      {scrambleFeedback.msg}
                    </div>
                  )}

                  {/* Slot Susunan Siswa */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Kotak Susunan Kalimat Siswa (Klik kata untuk menghapus urutan):
                    </p>
                    <div className="min-h-[70px] bg-slate-50 border-3 border-dashed border-slate-400 rounded-2xl p-3 flex flex-wrap items-center gap-2">
                      {userScrambledWords.length === 0 ? (
                        <p className="text-xs font-bold text-slate-400 italic mx-auto">
                          Klik balok kata di bawah untuk menyusun kalimat...
                        </p>
                      ) : (
                        userScrambledWords.map((word, wIdx) => (
                          <button
                            key={wIdx}
                            onClick={() => handleRemoveScrambleWord(wIdx)}
                            className="bg-amber-300 hover:bg-rose-300 text-slate-900 border-2 border-slate-800 px-3.5 py-2 rounded-xl font-black text-sm shadow-xs transition-transform hover:scale-95 flex items-center gap-1.5"
                            title="Klik untuk menghapus kata ini"
                          >
                            <span>{word}</span>
                            <span className="text-[10px] text-slate-600 font-extrabold">✕</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Balok Pilihan Kata (Word Pool) */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Pilihan Balok Kata Tersedia:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {activeScramble.scrambledWords.map((word, wIdx) => {
                        // Count occurrences in original vs used
                        const countInPool = activeScramble.scrambledWords.filter((w) => w === word).length;
                        const countUsed = userScrambledWords.filter((w) => w === word).length;
                        const isExhausted = countUsed >= countInPool;

                        return (
                          <button
                            key={wIdx}
                            onClick={() => !isExhausted && handlePickScrambleWord(word)}
                            disabled={isExhausted}
                            className={`px-4 py-2.5 rounded-2xl border-2 border-slate-800 font-black text-sm transition-all ${
                              isExhausted
                                ? 'bg-slate-200 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed line-through'
                                : 'bg-white hover:bg-amber-200 text-slate-900 shadow-xs hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
                    <button
                      onClick={handleResetCurrentScramble}
                      className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Bersihkan Susunan
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCheckScrambleSentence}
                        className="bg-emerald-400 hover:bg-emerald-500 border-3 border-slate-800 px-6 py-2.5 rounded-xl text-xs md:text-sm font-black text-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-0.5 active:shadow-none flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Periksa Susunan Kalimat
                      </button>

                      {activeScrambleIdx < SENTENCE_SCRAMBLE_DATA.length - 1 && (
                        <button
                          onClick={() => {
                            setActiveScrambleIdx(activeScrambleIdx + 1);
                            setUserScrambledWords([]);
                            setScrambleFeedback(null);
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-800 px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1"
                        >
                          <span>Kalimat Berikutnya</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: TEKA-TEKI SILANG (TTS) */}
            {lkpdSubTab === 'tts' && (
              <div className="bg-purple-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-purple-300 pb-3">
                  <div>
                    <span className="bg-purple-300 text-slate-900 border border-slate-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Tugas 3: Asah Kosakata Budaya
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      Teka-Teki Silang (TTS) Budaya Deli Serdang
                    </h3>
                  </div>
                  <span className="bg-white border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black text-slate-900">
                    Terpecahkan: {Object.values(ttsVerified).filter(Boolean).length} / {CROSSWORD_DATA.length} Kata
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Clues Mendatar */}
                  <div className="space-y-3">
                    <p className="font-black text-sm text-purple-950 uppercase tracking-wider flex items-center gap-1.5 border-b-2 border-purple-200 pb-1">
                      <span>➡️ Pertanyaan Mendatar (Across):</span>
                    </p>

                    <div className="space-y-3">
                      {CROSSWORD_DATA.filter((c) => c.direction === 'across').map((clue) => {
                        const isCorrect = ttsVerified[clue.id];
                        const userVal = ttsUserInputs[clue.id] || '';

                        return (
                          <div
                            key={clue.id}
                            className={`bg-white p-4 rounded-2xl border-3 border-slate-800 space-y-2 shadow-xs transition-all ${
                              isCorrect ? 'border-emerald-700 bg-emerald-50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="w-6 h-6 rounded-lg bg-purple-300 border border-slate-800 font-black text-xs flex items-center justify-center shrink-0">
                                {clue.number}
                              </span>
                              <p className="text-xs font-bold text-slate-800 flex-1 leading-snug">
                                {clue.clue}
                              </p>
                              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300 shrink-0">
                                {clue.answer.length} Huruf
                              </span>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                maxLength={clue.answer.length}
                                value={userVal}
                                onChange={(e) => handleTtsInputChange(clue.id, e.target.value)}
                                placeholder={`${clue.answer.length} huruf kapital...`}
                                className="flex-1 bg-slate-50 border-2 border-slate-800 px-3 py-1.5 rounded-xl font-mono font-black text-xs uppercase tracking-widest focus:outline-none focus:bg-amber-100"
                              />
                              <button
                                onClick={() => handleVerifyTtsWord(clue)}
                                className={`px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs ${
                                  isCorrect
                                    ? 'bg-emerald-400 text-slate-900 cursor-default'
                                    : 'bg-amber-300 hover:bg-amber-400 text-slate-900'
                                }`}
                              >
                                {isCorrect ? '✓ Benar' : 'Cek'}
                              </button>
                              <button
                                onClick={() => handleRevealTtsWord(clue.id)}
                                className="bg-slate-100 hover:bg-slate-200 border border-slate-800 p-1.5 rounded-xl text-slate-600"
                                title="Buka Kunci Jawaban"
                              >
                                <HelpCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clues Menurun */}
                  <div className="space-y-3">
                    <p className="font-black text-sm text-purple-950 uppercase tracking-wider flex items-center gap-1.5 border-b-2 border-purple-200 pb-1">
                      <span>⬇️ Pertanyaan Menurun (Down):</span>
                    </p>

                    <div className="space-y-3">
                      {CROSSWORD_DATA.filter((c) => c.direction === 'down').map((clue) => {
                        const isCorrect = ttsVerified[clue.id];
                        const userVal = ttsUserInputs[clue.id] || '';

                        return (
                          <div
                            key={clue.id}
                            className={`bg-white p-4 rounded-2xl border-3 border-slate-800 space-y-2 shadow-xs transition-all ${
                              isCorrect ? 'border-emerald-700 bg-emerald-50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="w-6 h-6 rounded-lg bg-pink-300 border border-slate-800 font-black text-xs flex items-center justify-center shrink-0">
                                {clue.number}
                              </span>
                              <p className="text-xs font-bold text-slate-800 flex-1 leading-snug">
                                {clue.clue}
                              </p>
                              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300 shrink-0">
                                {clue.answer.length} Huruf
                              </span>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                maxLength={clue.answer.length}
                                value={userVal}
                                onChange={(e) => handleTtsInputChange(clue.id, e.target.value)}
                                placeholder={`${clue.answer.length} huruf kapital...`}
                                className="flex-1 bg-slate-50 border-2 border-slate-800 px-3 py-1.5 rounded-xl font-mono font-black text-xs uppercase tracking-widest focus:outline-none focus:bg-amber-100"
                              />
                              <button
                                onClick={() => handleVerifyTtsWord(clue)}
                                className={`px-3 py-1.5 rounded-xl border-2 border-slate-800 font-black text-xs ${
                                  isCorrect
                                    ? 'bg-emerald-400 text-slate-900 cursor-default'
                                    : 'bg-amber-300 hover:bg-amber-400 text-slate-900'
                                }`}
                              >
                                {isCorrect ? '✓ Benar' : 'Cek'}
                              </button>
                              <button
                                onClick={() => handleRevealTtsWord(clue.id)}
                                className="bg-slate-100 hover:bg-slate-200 border border-slate-800 p-1.5 rounded-xl text-slate-600"
                                title="Buka Kunci Jawaban"
                              >
                                <HelpCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: MENJODOHKAN SALAM DENGAN SUKU (DIPERTAHANKAN) */}
            {lkpdSubTab === 'jodohkan' && (
              <div className="bg-orange-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
                <h3 className="text-lg font-black text-slate-900 border-b-2 border-orange-300 pb-2">
                  Tugas 4: Menjodohkan Salam dengan Suku Asal
                </h3>
                <p className="text-xs font-bold text-slate-700">
                  Pilih salah satu ucapan salam di kolom kiri, lalu klik pilihan Suku yang sesuai di kolom kanan!
                </p>

                {matchingFeedback && (
                  <div className="bg-amber-200 border-2 border-slate-800 p-2.5 rounded-xl font-black text-xs text-slate-900 text-center flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>{matchingFeedback}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="font-black text-xs text-slate-800 uppercase">1. Pilihan Ucapan Salam:</p>
                    {LKPD_MATCHING.map((item) => {
                      const isSelected = selectedMatchingItem?.id === item.id;
                      const isMatched = matchingAnswers[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMatchingSelect(item)}
                          disabled={!!isMatched}
                          className={`w-full p-3 rounded-2xl border-3 border-slate-800 font-extrabold text-xs text-left transition-all flex items-center justify-between ${
                            isMatched
                              ? 'bg-emerald-300 text-slate-900 opacity-90 cursor-default'
                              : isSelected
                              ? 'bg-amber-300 shadow-[0_4px_0_#1e293b] -translate-y-0.5'
                              : 'bg-white hover:bg-orange-200'
                          }`}
                        >
                          <span>"{item.greeting}"</span>
                          {isMatched ? (
                            <span className="bg-emerald-800 text-white px-2 py-0.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {isMatched}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                              Pilih Ini
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <p className="font-black text-xs text-slate-800 uppercase">2. Target Suku Asal:</p>
                    {(['Melayu', 'Karo', 'Simalungun'] as const).map((suku) => (
                      <button
                        key={suku}
                        onClick={() => handleMatchingTarget(suku)}
                        disabled={!selectedMatchingItem}
                        className="w-full p-4 rounded-2xl border-3 border-slate-800 font-black text-sm bg-white hover:bg-orange-300 active:bg-orange-400 text-slate-900 shadow-[0_4px_0_#1e293b] disabled:opacity-50 transition-all text-center"
                      >
                        Suku {suku}
                      </button>
                    ))}
                    <p className="text-[11px] font-bold text-slate-600 italic text-center mt-2">
                      {selectedMatchingItem
                        ? `Sedang memilih jawaban untuk: "${selectedMatchingItem.greeting}"`
                        : 'Pilih salam di kolom kiri terlebih dahulu.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: CARI KATA WORD SEARCH 8x8 (DIPERTAHANKAN) */}
            {lkpdSubTab === 'cari_kata' && (
              <div className="bg-cyan-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-cyan-300 pb-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Tugas 5: Cari Kata Budaya (Word Search 8x8)
                  </h3>
                  <span className="bg-white border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black text-slate-900">
                    Ditemukan: {foundWords.length} / {TARGET_WORDS.length} Kata
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="bg-white p-3 rounded-2xl border-3 border-slate-800 shadow-md max-w-xs mx-auto">
                    <div className="grid grid-cols-8 gap-1">
                      {WORD_SEARCH_GRID.map((row, rIdx) =>
                        row.map((char, cIdx) => {
                          const cellKey = `${rIdx}-${cIdx}`;
                          const isSelected = selectedCells.includes(cellKey);
                          return (
                            <button
                              key={cellKey}
                              onClick={() => handleCellClick(rIdx, cIdx)}
                              className={`w-7 h-7 md:w-8 md:h-8 rounded-lg font-black text-xs md:text-sm border-2 border-slate-800 transition-all flex items-center justify-center ${
                                isSelected
                                  ? 'bg-amber-300 text-slate-900 scale-105 shadow-xs'
                                  : 'bg-slate-100 hover:bg-cyan-200 text-slate-800'
                              }`}
                            >
                              {char}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-black text-xs text-slate-800">Daftar Kata Yang Harus Ditemukan:</p>
                    <div className="flex flex-wrap gap-2">
                      {TARGET_WORDS.map((word) => {
                        const isFound = foundWords.includes(word);
                        return (
                          <span
                            key={word}
                            className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 border-slate-800 transition-all ${
                              isFound
                                ? 'bg-emerald-400 text-slate-900 line-through shadow-xs'
                                : 'bg-white text-slate-700'
                            }`}
                          >
                            {word} {isFound && '✓'}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCells([])}
                        className="bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 px-3 py-1.5 rounded-xl font-extrabold text-xs text-slate-800"
                      >
                        Bersihkan Pilihan Huruf
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* TAB 7: ARENA GAMES */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b]">
              <h2 className="text-2xl font-black text-slate-900">Arena Games Budaya Ceria</h2>
              <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">
                Pilih gim interaktif favoritmu dan kumpulkan poin prestasi!
              </p>
            </div>

            {/* GIM 1: PETUALANGAN DADU TRIVIA 10-PETAK */}
            <div className="bg-indigo-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-indigo-300 pb-2">
                <div>
                  <span className="bg-indigo-300 text-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                    Game Mode 1
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">🎲 Petualangan Dadu 10-Petak</h3>
                </div>
                <button
                  onClick={handleRollDice}
                  disabled={isRolling}
                  className="bg-indigo-400 hover:bg-indigo-500 border-3 border-slate-800 px-5 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none disabled:opacity-50"
                >
                  {isRolling ? 'Kocok Dadu...' : `Putar Dadu (Angka: ${diceVal})`}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DICE_GAME_TILES_10.map((tile) => {
                  const isPlayerHere = dicePos === tile.id;
                  return (
                    <div
                      key={tile.id}
                      className={`p-3 rounded-2xl border-3 border-slate-800 text-center transition-all flex flex-col justify-between ${
                        isPlayerHere
                          ? 'bg-amber-300 shadow-[0_4px_0_#1e293b] -translate-y-1'
                          : 'bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-black text-xs text-slate-900">Petak {tile.id}</p>
                        <p className="text-[10px] font-bold text-slate-600 mt-0.5 truncate">
                          {tile.title.split(':')[1] || tile.title}
                        </p>
                      </div>
                      {isPlayerHere && <div className="mt-2 text-xl animate-bounce">🏃🏻‍♂️</div>}
                    </div>
                  );
                })}
              </div>

              {activeTrivia && (
                <div className="bg-white p-4 rounded-2xl border-3 border-slate-800 space-y-3 animate-in fade-in">
                  <p className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>{activeTrivia.question}</span>
                  </p>
                  <div className="flex gap-2">
                    {activeTrivia.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerTrivia(idx)}
                        className="flex-1 bg-amber-200 hover:bg-amber-300 border-2 border-slate-800 py-2.5 rounded-xl font-black text-xs text-slate-900 shadow-xs"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* GIM 2: ULAR TANGGA BUDAYA 2-PEMAIN (25 PETAK) */}
            <div className="bg-amber-100 border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-amber-300 pb-2">
                <div>
                  <span className="bg-amber-300 text-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                    Game Mode 2
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    🐍 Ular Tangga Budaya (Si Deli vs Si Serdang)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRollSnake}
                    className="bg-emerald-400 hover:bg-emerald-500 border-3 border-slate-800 px-4 py-2 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-none"
                  >
                    Kocok Dadu (Giliran: Pemain {turn})
                  </button>
                  <button
                    onClick={resetSnakeGame}
                    className="p-2 bg-slate-200 hover:bg-slate-300 border-2 border-slate-800 rounded-xl"
                    title="Reset Permainan"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-800" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-slate-800 font-bold text-xs text-slate-800 text-center">
                📢 {snakeLog}
              </div>

              <div className="bg-white p-3 rounded-2xl border-3 border-slate-800 max-w-md mx-auto">
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 25 }, (_, i) => 25 - i).map((tileNum) => {
                    const hasP1 = p1Pos === tileNum;
                    const hasP2 = p2Pos === tileNum;

                    const isLadder = tileNum === 3 || tileNum === 8 || tileNum === 15;
                    const isSnake = tileNum === 14 || tileNum === 19 || tileNum === 24;

                    return (
                      <div
                        key={tileNum}
                        className={`aspect-square rounded-xl border-2 border-slate-800 p-1 flex flex-col justify-between items-center relative text-center ${
                          tileNum === 25
                            ? 'bg-amber-300 font-black'
                            : isLadder
                            ? 'bg-emerald-200'
                            : isSnake
                            ? 'bg-rose-200'
                            : 'bg-slate-50'
                        }`}
                      >
                        <span className="text-[10px] font-black text-slate-600 self-start">{tileNum}</span>

                        {isLadder && <span className="text-xs" title="Tangga Naik">🪜</span>}
                        {isSnake && <span className="text-xs" title="Ular Turun">🐍</span>}

                        <div className="flex items-center justify-center gap-0.5 my-auto">
                          {hasP1 && (
                            <span className="text-sm bg-cyan-300 border border-slate-800 rounded-full px-1" title="Si Deli">
                              👦🏻
                            </span>
                          )}
                          {hasP2 && (
                            <span className="text-sm bg-amber-300 border border-slate-800 rounded-full px-1" title="Si Serdang">
                              👧🏽
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SERTIFIKAT RESMI DUTA BUDAYA DELI SERDANG (READY PRINT) */}
        {activeTab === 'rapor' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[0_8px_0_#1e293b] flex items-center justify-between flex-wrap gap-3 print:hidden">
              <div>
                <span className="bg-amber-300 text-slate-900 border border-slate-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Dokumen Prestasi Resmi
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Sertifikat Duta Budaya Deli Serdang
                </h2>
                <p className="text-xs md:text-sm font-bold text-slate-600 mt-0.5">
                  Bukti pengukuhan resmi kelulusan pembelajaran kebudayaan lokal Deli Serdang.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playSound('click');
                    handleSpeech(
                      `Selamat kepada ${studentName}! Anda telah resmi dikukuhkan sebagai ${certificateData.tierTitle} Kabupaten Deli Serdang dengan total perolehan ${score} poin prestasi!`
                    );
                  }}
                  className="bg-cyan-300 hover:bg-cyan-400 border-3 border-slate-800 px-4 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 active:translate-y-1 active:shadow-none"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Bacakan Piagam</span>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    window.print();
                  }}
                  className="bg-amber-400 hover:bg-amber-500 border-3 border-slate-800 px-5 py-2.5 rounded-2xl font-black text-xs text-slate-900 shadow-[0_4px_0_#1e293b] flex items-center gap-2 active:translate-y-1 active:shadow-none"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Piagam Resmi (Print)</span>
                </button>
              </div>
            </div>

            {/* PRESTIGIOUS PRINTABLE CERTIFICATE CARD */}
            <div
              className={`bg-gradient-to-br ${certificateData.gradient} border-8 ${certificateData.borderTheme} p-8 md:p-14 rounded-3xl shadow-2xl max-w-4xl mx-auto text-center space-y-6 relative overflow-hidden print:border-4 print:p-8 print:shadow-none print:m-0 print:max-w-none print:rounded-none`}
            >
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-14 h-14 border-t-4 border-l-4 border-amber-900"></div>
              <div className="absolute top-4 right-4 w-14 h-14 border-t-4 border-r-4 border-amber-900"></div>
              <div className="absolute bottom-4 left-4 w-14 h-14 border-b-4 border-l-4 border-amber-900"></div>
              <div className="absolute bottom-4 right-4 w-14 h-14 border-b-4 border-r-4 border-amber-900"></div>

              {/* Header Lembaga Resmi */}
              <div className="space-y-1 border-b-2 border-amber-800/40 pb-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl font-black shadow-xs">
                    🏛️
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-black tracking-widest text-slate-900 uppercase">
                      Pemerintah Kabupaten Deli Serdang
                    </h4>
                    <h3 className="text-base md:text-xl font-black tracking-wider text-amber-950 uppercase font-serif">
                      Dinas Pendidikan dan Kebudayaan
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl font-black shadow-xs">
                    📜
                  </div>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-slate-600">
                  Kompleks Perkantoran Pemerintah Kabupaten Deli Serdang, Lubuk Pakam • Semboyan: Bhinneka Perkasa Jaya
                </p>
                <p className="text-[11px] font-mono font-bold text-slate-800 pt-1">
                  {certificateData.regNo}
                </p>
              </div>

              {/* Judul Piagam Penghargaan */}
              <div className="space-y-1">
                <div className="inline-block bg-slate-900 text-amber-300 px-5 py-1 rounded-full border-2 border-slate-800 font-black text-xs uppercase tracking-widest shadow-xs">
                  Piagam Penghargaan Resmi
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-serif tracking-tight mt-2">
                  {certificateData.tierTitle}
                </h2>
                <p className="text-xs md:text-sm font-extrabold text-amber-900 uppercase tracking-wide">
                  {certificateData.category}
                </p>
              </div>

              <p className="text-xs md:text-sm font-bold text-slate-700">
                Diberikan dengan penuh kehormatan dan apresiasi kepada peserta didik berprestasi:
              </p>

              {/* Nama Siswa yang Ditonjolkan */}
              <div className="py-2 border-b-4 border-slate-900 inline-block px-10">
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 font-serif underline decoration-amber-500 decoration-wavy">
                  {studentName || 'Nama Siswa'}
                </h3>
              </div>

              {/* Rincian Pencapaian */}
              <p className="text-xs md:text-sm font-bold text-slate-800 max-w-2xl mx-auto leading-relaxed">
                Telah berhasil menyelesaikan seluruh rangkaian pembelajaran kebudayaan daerah pada <span className="font-extrabold text-amber-950">Smart Book Budaya Lokal Deli Serdang</span>, menguasai Peta 3 Zona, Seni Tari & Adat 3 Suku (Melayu, Karo, Simalungun), Kamus Daerah, Lagu Tradisional, Ekspedisi 3 Zona, serta Evaluasi Penalaran Kritis LKPD HOTS.
              </p>

              {/* Detail Sekolah, Kelas & Skor */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto bg-white/90 p-4 rounded-2xl border-2 border-slate-800 text-left">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-emerald-600" /> Sekolah / Asal:
                  </p>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="font-extrabold text-xs text-slate-900 bg-transparent border-b border-slate-400 w-full focus:outline-none focus:border-amber-600"
                    placeholder="Nama Sekolah"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-600" /> Kelas & Tingkat:
                  </p>
                  <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="font-extrabold text-xs text-slate-900 bg-transparent border-b border-slate-400 w-full focus:outline-none focus:border-cyan-600"
                    placeholder="Kelas Siswa"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" /> Total Skor Prestasi:
                  </p>
                  <p className="font-black text-sm text-slate-900 mt-0.5">
                    {score} Bintang Prestasi
                  </p>
                </div>
              </div>

              {/* Digital Seal & Signatures Grid */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-400/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Signatory 1: Guru / Wali Kelas */}
                <div className="flex flex-col items-center justify-between h-32 text-center">
                  <p className="text-xs font-bold text-slate-700">
                    Mengetahui,<br />Guru Pembimbing / Wali Kelas
                  </p>
                  <div className="w-40 border-b-2 border-slate-800 pb-1"></div>
                  <p className="text-xs font-black text-slate-900">( .................................... )</p>
                  <p className="text-[10px] text-slate-500 font-semibold">NIP. ....................................</p>
                </div>

                {/* Stempel Emas Digital (Golden Medallion Seal) */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-1.5 shadow-lg border-2 border-amber-900 flex items-center justify-center transform hover:rotate-6 transition-transform">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900 flex flex-col items-center justify-center bg-yellow-200/90 text-amber-950 p-1 text-center">
                      <span className="text-base">👑</span>
                      <span className="text-[8px] font-black uppercase tracking-tighter leading-none">
                        Duta Budaya
                      </span>
                      <span className="text-[7px] font-extrabold uppercase leading-none mt-0.5">
                        Deli Serdang
                      </span>
                      <span className="text-[7px] text-amber-800 font-bold">★ 2026 ★</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-900 mt-1">
                    Cap Sah Kehormatan
                  </span>
                </div>

                {/* Signatory 2: Kepala Dinas / Pembina */}
                <div className="flex flex-col items-center justify-between h-32 text-center">
                  <p className="text-xs font-bold text-slate-700">
                    Lubuk Pakam, {certificateData.dateString}<br />Kepala Dinas Pendidikan & Kebudayaan
                  </p>
                  <div className="w-40 border-b-2 border-slate-800 pb-1"></div>
                  <p className="text-xs font-black text-slate-900">( Dr. H. M. Deliansyah, M.Pd )</p>
                  <p className="text-[10px] text-slate-500 font-semibold">NIP. 19750817 200003 1 004</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL QR CODE AKSES CEPAT (HP & CETAK LEMBAR KELAS) */}
      {showQRModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
          <div className="bg-white border-4 border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-[0_16px_0_#1e293b] space-y-4 relative animate-in fade-in zoom-in-95 my-8 print:border-4 print:shadow-none print:m-0">
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 bg-rose-300 hover:bg-rose-400 border-2 border-slate-800 p-1.5 rounded-xl font-black text-slate-900 print:hidden transition-transform active:scale-95"
              title="Tutup Modal"
            >
              <XCircle className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
              <div className="w-12 h-12 bg-amber-400 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xs shrink-0">
                📱
              </div>
              <div>
                <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500 uppercase tracking-wide">
                  Akses Cepat Smartphone
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                  Scan QR Code Smart Book
                </h3>
              </div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-800 print:hidden">
              <button
                onClick={() => {
                  playSound('click');
                  setQrType('app');
                }}
                className={`py-2 px-3 rounded-xl font-black text-xs transition-all ${
                  qrType === 'app'
                    ? 'bg-emerald-400 text-slate-900 shadow-sm border-2 border-slate-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌐 Buka Langsung di HP
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setQrType('apk');
                }}
                className={`py-2 px-3 rounded-xl font-black text-xs transition-all ${
                  qrType === 'apk'
                    ? 'bg-rose-400 text-slate-900 shadow-sm border-2 border-slate-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📦 Unduh Paket APK
              </button>
            </div>

            {/* QR Code Card Frame */}
            <div className="bg-amber-50 p-6 rounded-3xl border-3 border-slate-800 text-center space-y-3 relative overflow-hidden">
              <div className="relative inline-block p-4 bg-white rounded-3xl border-3 border-slate-800 shadow-[0_6px_0_#1e293b]">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code Smart Book Deli Serdang"
                    className="w-56 h-56 mx-auto rounded-xl"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center font-bold text-xs text-slate-400">
                    Membuat QR Code...
                  </div>
                )}
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-black text-slate-800">
                  <span>👦🏻 Si Deli</span>
                  <span>•</span>
                  <span>👧🏽 Si Serdang</span>
                </div>
              </div>

              {/* Status explanation */}
              <div className="text-left bg-white p-3 rounded-2xl border-2 border-slate-800 space-y-1">
                <p className="font-black text-xs text-slate-900 flex items-center gap-1">
                  <span>🎯 Target URL:</span>
                  {qrType === 'app' ? (
                    <span className="text-emerald-700 font-bold text-[11px] truncate">
                      Buka Web App Interaktif
                    </span>
                  ) : (
                    <span className="text-rose-700 font-bold text-[11px] truncate">
                      Unduh dari tmpfiles.org
                    </span>
                  )}
                </p>
                <p className="text-[11px] font-mono font-bold text-slate-600 break-all bg-slate-100 p-1.5 rounded-lg border border-slate-300">
                  {activeTargetUrl}
                </p>
              </div>

              {/* Step instructions */}
              <div className="bg-white/80 p-3 rounded-2xl border border-slate-300 text-left space-y-1 text-xs font-bold text-slate-700">
                <p className="font-black text-slate-900">📖 Panduan Scan Siswa & Guru:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
                  <li>Buka aplikasi <strong>Kamera</strong> atau <strong>Google Lens</strong> di HP.</li>
                  <li>Arahkan lensa ke gambar QR Code di atas.</li>
                  <li>Ketuk tautan pop-up yang muncul di layar HP untuk membuka!</li>
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-slate-200 print:hidden">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-800 py-2.5 px-3 rounded-xl font-black text-xs text-slate-900 transition-transform active:scale-95"
              >
                <Copy className="w-4 h-4 text-slate-700" />
                <span>{copiedLink ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
              </button>

              <button
                onClick={handleDownloadQRImage}
                className="flex items-center justify-center gap-1.5 bg-cyan-300 hover:bg-cyan-400 border-2 border-slate-800 py-2.5 px-3 rounded-xl font-black text-xs text-slate-900 transition-transform active:scale-95"
                title="Unduh file gambar QR Code"
              >
                <Download className="w-4 h-4 text-slate-900" />
                <span>Unduh Gambar .PNG</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  window.print();
                }}
                className="flex items-center justify-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 border-2 border-slate-800 py-2.5 px-3 rounded-xl font-black text-xs text-slate-900 transition-transform active:scale-95"
                title="Cetak lembar scan untuk dipajang di kelas"
              >
                <Printer className="w-4 h-4 text-slate-900" />
                <span>Cetak Lembar QR</span>
              </button>

              <a
                href={activeTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-400 hover:bg-emerald-500 border-2 border-slate-800 rounded-xl text-slate-900 font-bold"
                title="Buka Tautan di Tab Baru"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

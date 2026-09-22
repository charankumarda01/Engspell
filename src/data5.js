/* =====================================================================
   data5.js — Indian Accent Studio Content Packs (M20 ACCENT-UP)
   ES5 only — zero dependencies, fully offline
   Research-backed Indian-English contrast pairs, stress, and rhythm
   ===================================================================== */

var ACCENT_PACKS = [
  {
    id: 'ax-vw',
    title: 'V vs W Friction & Rounding',
    ipa: '/v/ vs /w/',
    desiTrap: 'Indian tongues switch /v/ and /w/ as allophones (interchangeable), biting the lower lip for "w" or rounding lips for "v", turning "very well" into "wery vell".',
    fix: 'For /v/: gently rest your top front teeth against the inner edge of your lower lip, vibrate vocal cords, and exhale smoothly. For /w/: shape both lips into a tight small circle with zero teeth contact, then glide open.',
    pairs: [
      { a: { w: 'wine', ipa: '/waɪn/', tag: 'desi' }, b: { w: 'vine', ipa: '/vaɪn/', tag: 'target' } },
      { a: { w: 'wet', ipa: '/wɛt/', tag: 'desi' }, b: { w: 'vet', ipa: '/vɛt/', tag: 'target' } },
      { a: { w: 'west', ipa: '/wɛst/', tag: 'desi' }, b: { w: 'vest', ipa: '/vɛst/', tag: 'target' } },
      { a: { w: 'wiper', ipa: '/ˈwaɪpər/', tag: 'desi' }, b: { w: 'viper', ipa: '/ˈvaɪpər/', tag: 'target' } },
      { a: { w: 'whale', ipa: '/weɪl/', tag: 'desi' }, b: { w: 'vale', ipa: '/veɪl/', tag: 'target' } },
      { a: { w: 'worse', ipa: '/wɜːrs/', tag: 'desi' }, b: { w: 'verse', ipa: '/vɜːrs/', tag: 'target' } },
      { a: { w: 'wheel', ipa: '/wiːl/', tag: 'desi' }, b: { w: 'veal', ipa: '/viːl/', tag: 'target' } },
      { a: { w: 'wary', ipa: '/ˈwɛəri/', tag: 'desi' }, b: { w: 'vary', ipa: '/ˈvɛəri/', tag: 'target' } },
      { a: { w: 'wane', ipa: '/weɪn/', tag: 'desi' }, b: { w: 'vane', ipa: '/veɪn/', tag: 'target' } },
      { a: { w: 'went', ipa: '/wɛnt/', tag: 'desi' }, b: { w: 'vent', ipa: '/vɛnt/', tag: 'target' } },
      { a: { w: 'waltz', ipa: '/wɔːlts/', tag: 'desi' }, b: { w: 'vault', ipa: '/vɔːlt/', tag: 'target' } },
      { a: { w: 'wow', ipa: '/waʊ/', tag: 'desi' }, b: { w: 'vow', ipa: '/vaʊ/', tag: 'target' } }
    ],
    sentences: [
      'We viewed the vast valley with wonder and awe.',
      'Victor works very well with various software tools.',
      'Wear a warm winter vest when visiting the west.',
      'The volunteer wanted whatever wine was available.',
      'Validate every web workflow with vigilance.',
      'We visualised the world with vivid wonder.',
      'Vikas waited while Wendy verified the wire.',
      'Water valves will work whenever waterflows waver.',
      'Never waver while verifying vital work vectors.',
      'We welcome valuable volunteers with warm wishes.',
      'Various widgets were well verified without warnings.',
      'William voted with vigor whenever winners were welcomed.'
    ]
  },
  {
    id: 'ax-th',
    title: 'Dental TH vs T/D Stops',
    ipa: '/θ, ð/ vs /t, d/',
    desiTrap: 'Indian languages replace English dental fricatives /θ/ and /ð/ with hard dental plosives /t̪ʰ/ and /d̪/, turning "think" into "tink", "three" into "tree", and "this" into "dis".',
    fix: 'Place the tip of your tongue gently between your front teeth with open airflow. For voiceless /θ/ (think, thank), blow soft air without voice. For voiced /ð/ (this, they), hum with your vocal cords. Never block airflow completely.',
    pairs: [
      { a: { w: 'tink', ipa: '/tɪŋk/', tag: 'desi' }, b: { w: 'think', ipa: '/θɪŋk/', tag: 'target' } },
      { a: { w: 'tank', ipa: '/tæŋk/', tag: 'desi' }, b: { w: 'thank', ipa: '/θæŋk/', tag: 'target' } },
      { a: { w: 'teem', ipa: '/tiːm/', tag: 'desi' }, b: { w: 'theme', ipa: '/θiːm/', tag: 'target' } },
      { a: { w: 'tick', ipa: '/tɪk/', tag: 'desi' }, b: { w: 'thick', ipa: '/θɪk/', tag: 'target' } },
      { a: { w: 'tie', ipa: '/taɪ/', tag: 'desi' }, b: { w: 'thigh', ipa: '/θaɪ/', tag: 'target' } },
      { a: { w: 'tin', ipa: '/tɪn/', tag: 'desi' }, b: { w: 'thin', ipa: '/θɪn/', tag: 'target' } },
      { a: { w: 'tree', ipa: '/triː/', tag: 'desi' }, b: { w: 'three', ipa: '/θriː/', tag: 'target' } },
      { a: { w: 'dare', ipa: '/dɛər/', tag: 'desi' }, b: { w: 'there', ipa: '/ðɛər/', tag: 'target' } },
      { a: { w: 'den', ipa: '/dɛn/', tag: 'desi' }, b: { w: 'then', ipa: '/ðɛn/', tag: 'target' } },
      { a: { w: 'day', ipa: '/deɪ/', tag: 'desi' }, b: { w: 'they', ipa: '/ðeɪ/', tag: 'target' } },
      { a: { w: 'breed', ipa: '/briːd/', tag: 'desi' }, b: { w: 'breathe', ipa: '/briːð/', tag: 'target' } },
      { a: { w: 'clode', ipa: '/kloʊd/', tag: 'desi' }, b: { w: 'clothe', ipa: '/kloʊð/', tag: 'target' } }
    ],
    sentences: [
      'I think three thrilling themes through thoroughly.',
      'They think that this rhythm suits their method.',
      'Thank them for their thoughtful advice together.',
      'Both brothers breathe beneath the southern weather.',
      'There are thirty thousand things they need today.',
      'The theory was thought through with empathy.',
      'Neither father nor mother noticed that threat.',
      'These three thousand brothers gather together there.',
      'Breathe smoothly through the mouth without tension.',
      'Whether the weather is warm, they think together.',
      'Thirty-three thieves thought that they thrilled the throne.',
      'Nothing is worth more than their truthful empathy.'
    ]
  },
  {
    id: 'ax-r',
    title: 'Smooth Rhotic R vs Tap/Roll',
    ipa: '/r/ [ɹ]',
    desiTrap: 'Indian English often uses a tapped [ɾ] or alveolar trill [r], flapping the tongue sharply against the alveolar ridge or retroflexing excessively on post-vocalic "r" in "car", "world", and "bird".',
    fix: 'Pull the body of your tongue back slightly toward the centre of your mouth. Curl the sides against your upper molars, but ensure the tip NEVER touches your gum ridge. Keep airflow continuous and smooth.',
    pairs: [
      { a: { w: 'ka', ipa: '/kɑː/', tag: 'desi' }, b: { w: 'car', ipa: '/kɑːr/', tag: 'target' } },
      { a: { w: 'wurld', ipa: '/wɜːld/', tag: 'desi' }, b: { w: 'world', ipa: '/wɜːrld/', tag: 'target' } },
      { a: { w: 'burd', ipa: '/bɜːd/', tag: 'desi' }, b: { w: 'bird', ipa: '/bɜːrd/', tag: 'target' } },
      { a: { w: 'gurl', ipa: '/ɡɜːl/', tag: 'desi' }, b: { w: 'girl', ipa: '/ɡɜːrl/', tag: 'target' } },
      { a: { w: 'pahk', ipa: '/pɑːk/', tag: 'desi' }, b: { w: 'park', ipa: '/pɑːrk/', tag: 'target' } },
      { a: { w: 'dahk', ipa: '/dɑːk/', tag: 'desi' }, b: { w: 'dark', ipa: '/dɑːrk/', tag: 'target' } },
      { a: { w: 'hahd', ipa: '/hɑːd/', tag: 'desi' }, b: { w: 'hard', ipa: '/hɑːrd/', tag: 'target' } },
      { a: { w: 'tun', ipa: '/tɜːn/', tag: 'desi' }, b: { w: 'turn', ipa: '/tɜːrn/', tag: 'target' } },
      { a: { w: 'wahm', ipa: '/wɔːm/', tag: 'desi' }, b: { w: 'warm', ipa: '/wɔːrm/', tag: 'target' } },
      { a: { w: 'fust', ipa: '/fɜːst/', tag: 'desi' }, b: { w: 'first', ipa: '/fɜːrst/', tag: 'target' } },
      { a: { w: 'poht', ipa: '/pɔːt/', tag: 'desi' }, b: { w: 'port', ipa: '/pɔːrt/', tag: 'target' } },
      { a: { w: 'stah', ipa: '/stɑː/', tag: 'desi' }, b: { w: 'star', ipa: '/stɑːr/', tag: 'target' } }
    ],
    sentences: [
      'The red car turned around the dark rural park.',
      'Robert reached the river after a regular run.',
      'Her career required remarkable research records.',
      'Our world requires creative workers every year.',
      'Remember to read every report rather carefully.',
      'The green bird carried warm straw for her nest.',
      'Real research results require rare perseverance.',
      'Rain returned rapidly across the northern prairie.',
      'Four brilliant doctors reviewed the career records.',
      'Try running around the track before every race.',
      'Rural roads require sharper curves and clear mirrors.',
      'Every morning worker recorded great performance.'
    ]
  },
  {
    id: 'ax-td',
    title: 'Alveolar T/D vs Retroflex',
    ipa: '/t, d/ [tʰ, d]',
    desiTrap: 'Indian languages replace English alveolar /t/ and /d/ with retroflex plosives /ʈ/ and /ɖ/ by curling the tongue tip backwards to touch the hard palate, resulting in a heavy percussive acoustic quality.',
    fix: 'Tap the tip of your tongue strictly against the bumpy alveolar ridge directly behind your upper front teeth (never touch the roof of your mouth). Release initial /t/ with a noticeable puff of air (aspiration).',
    pairs: [
      { a: { w: 'thime', ipa: '/ʈʰaɪm/', tag: 'desi' }, b: { w: 'time', ipa: '/taɪm/', tag: 'target' } },
      { a: { w: 'teem', ipa: '/ʈiːm/', tag: 'desi' }, b: { w: 'team', ipa: '/tiːm/', tag: 'target' } },
      { a: { w: 'tayk', ipa: '/ʈeɪk/', tag: 'desi' }, b: { w: 'take', ipa: '/teɪk/', tag: 'target' } },
      { a: { w: 'thop', ipa: '/ʈɒp/', tag: 'desi' }, b: { w: 'top', ipa: '/tɒp/', tag: 'target' } },
      { a: { w: 'tai', ipa: '/ʈaɪ/', tag: 'desi' }, b: { w: 'tie', ipa: '/taɪ/', tag: 'target' } },
      { a: { w: 'thest', ipa: '/ʈɛst/', tag: 'desi' }, b: { w: 'test', ipa: '/tɛst/', tag: 'target' } },
      { a: { w: 'dhaak', ipa: '/ɖɑːk/', tag: 'desi' }, b: { w: 'dark', ipa: '/dɑːrk/', tag: 'target' } },
      { a: { w: 'dhoor', ipa: '/ɖʊər/', tag: 'desi' }, b: { w: 'door', ipa: '/dɔːr/', tag: 'target' } },
      { a: { w: 'dheep', ipa: '/ɖiːp/', tag: 'desi' }, b: { w: 'deep', ipa: '/diːp/', tag: 'target' } },
      { a: { w: 'dhate', ipa: '/ɖeɪt/', tag: 'desi' }, b: { w: 'date', ipa: '/deɪt/', tag: 'target' } },
      { a: { w: 'dhown', ipa: '/ɖaʊn/', tag: 'desi' }, b: { w: 'down', ipa: '/daʊn/', tag: 'target' } },
      { a: { w: 'dhay', ipa: '/ɖeɪ/', tag: 'desi' }, b: { w: 'day', ipa: '/deɪ/', tag: 'target' } }
    ],
    sentences: [
      'Take two tickets to the downtown theater today.',
      'David decided to deliver the data directly.',
      'Tell the team to test the database today.',
      'Tom touched the top table twice this morning.',
      'The director delivered dynamic details during dinner.',
      'Twenty talented dancers toured thirty diverse towns.',
      'Deep down David doubted that draft decision.',
      'Touch the tip of the dental tooth with technique.',
      'Daily tasks demand true dedication and detail.',
      'Total test data demonstrates dependable duration.',
      'Tell Ted to download the technical directory today.',
      'David delivered twenty distinct technical documents.'
    ]
  },
  {
    id: 'ax-stress',
    title: 'Word Stress & Syllable Timing',
    ipa: '/ˈ/ stress mark',
    desiTrap: 'Because Indian languages are syllable-timed (giving equal length to all syllables), speakers often stress the first syllable or root incorrectly ("DE-ve-lop" instead of "de-VEL-op", "COM-for-ta-ble" into 4 syllables).',
    fix: 'Make the stressed syllable louder, higher in pitch, and noticeably longer. Reduce unstressed vowels to a tiny, quiet schwa (/ə/). Compress "comfortable" to 3 syllables: COM-fer-t\'bl.',
    words: [
      { w: 'develop', ipa: '/dɪˈvɛləp/', stressMarked: 'deVELop' },
      { w: 'comfortable', ipa: '/ˈkʌmftərbəl/', stressMarked: 'COMfortable' },
      { w: 'photographer', ipa: '/fəˈtɒɡrəfər/', stressMarked: 'phoTOgrapher' },
      { w: 'photography', ipa: '/fəˈtɒɡrəfi/', stressMarked: 'phoTOGraphy' },
      { w: 'definitely', ipa: '/ˈdɛfɪnɪtli/', stressMarked: 'DEFinitely' },
      { w: 'vegetable', ipa: '/ˈvɛdʒtəbəl/', stressMarked: 'VEGetable' },
      { w: 'chocolate', ipa: '/ˈtʃɒklɪt/', stressMarked: 'CHOC-late' },
      { w: 'police', ipa: '/pəˈliːs/', stressMarked: 'poLICE' },
      { w: 'hotel', ipa: '/hoʊˈtɛl/', stressMarked: 'hoTEL' },
      { w: 'career', ipa: '/kəˈrɪər/', stressMarked: 'caREER' },
      { w: 'certificate', ipa: '/sərˈtɪfɪkət/', stressMarked: 'cerTIFicate' },
      { w: 'technology', ipa: '/tɛkˈnɒlədʒi/', stressMarked: 'techNOLogy' },
      { w: 'economy', ipa: '/ɪˈkɒnəmi/', stressMarked: 'eCONomy' },
      { w: 'economic', ipa: '/ˌiːkəˈnɒmɪk/', stressMarked: 'ecoNOMic' },
      { w: 'decision', ipa: '/dɪˈsɪʒən/', stressMarked: 'deCISion' },
      { w: 'management', ipa: '/ˈmænɪdʒmənt/', stressMarked: 'MANagement' },
      { w: 'important', ipa: '/ɪmˈpɔːrtənt/', stressMarked: 'imPORtant' },
      { w: 'presentation', ipa: '/ˌprɛzənˈteɪʃən/', stressMarked: 'presenTAtion' },
      { w: 'particular', ipa: '/pərˈtɪkjələr/', stressMarked: 'parTICular' },
      { w: 'opportunity', ipa: '/ˌɒpərˈtjuːnɪti/', stressMarked: 'opporTUNity' }
    ],
    sentences: [
      'We need to deVELop a COMfortable techNOLogy for our caREER.',
      'The phoTOgrapher made an imPORtant deCISion on the ecoNOMic plan.',
      'Our MANagement definitely welcomed this opporTUNity with enthuSIasm.',
      'She reCEIVED her offiCIAL cerTIFicate at the hoTEL reCEPtion.',
      'Fresh VEGetables and dark CHOC-late make a deLIcious snack.',
      'The poLICE conDUCted an exTENsive inVES-tigation yes-terday.',
      'Global eCONomy depends upon innoVAtive techNOLogy soLUtions.',
      'This parTICular presenTAtion highLIGHTS our straTEGic diREC-tion.',
      'His caREER opporTUNity reQUIRED conTINuous proFES-sional training.',
      'We def-initely apPREciate your reMARKable deCISion today.',
      'The COMfortable hoTEL proVI-ded exCELlent conDI-tions for work.',
      'phoTOGraphy reQUIRES paTIENCE and deTAILED ob-serVAtion.'
    ]
  },
  {
    id: 'ax-diph',
    title: 'Pure Diphthongs & Vowel Length',
    ipa: '/eɪ, əʊ, ɪ, iː/',
    desiTrap: 'Indian speakers often flatten gliding diphthongs (/eɪ/ in "say", /əʊ/ in "go") into monotone long vowels [eː] and [oː], and fail to distinguish short lax /ɪ/ (ship) from long tense /iː/ (sheep).',
    fix: 'Let diphthongs glide actively from starting tongue shape to ending shape: for /eɪ/ glide from "eh" up toward "ee"; for /əʊ/ glide from a neutral vowel to rounded lips. For /iː/ (sheep), smile and tense; for /ɪ/ (ship), relax and drop your jaw.',
    pairs: [
      { a: { w: 'ship', ipa: '/ʃɪp/', tag: 'desi' }, b: { w: 'sheep', ipa: '/ʃiːp/', tag: 'target' } },
      { a: { w: 'fit', ipa: '/fɪt/', tag: 'desi' }, b: { w: 'feet', ipa: '/fiːt/', tag: 'target' } },
      { a: { w: 'slip', ipa: '/slɪp/', tag: 'desi' }, b: { w: 'sleep', ipa: '/sliːp/', tag: 'target' } },
      { a: { w: 'bit', ipa: '/bɪt/', tag: 'desi' }, b: { w: 'beat', ipa: '/biːt/', tag: 'target' } },
      { a: { w: 'fill', ipa: '/fɪl/', tag: 'desi' }, b: { w: 'feel', ipa: '/fiːl/', tag: 'target' } },
      { a: { w: 'chip', ipa: '/tʃɪp/', tag: 'desi' }, b: { w: 'cheap', ipa: '/tʃiːp/', tag: 'target' } },
      { a: { w: 'court', ipa: '/kɔːrt/', tag: 'desi' }, b: { w: 'coat', ipa: '/koʊt/', tag: 'target' } },
      { a: { w: 'nought', ipa: '/nɔːt/', tag: 'desi' }, b: { w: 'note', ipa: '/noʊt/', tag: 'target' } },
      { a: { w: 'saw', ipa: '/sɔː/', tag: 'desi' }, b: { w: 'so', ipa: '/soʊ/', tag: 'target' } },
      { a: { w: 'get', ipa: '/ɡɛt/', tag: 'desi' }, b: { w: 'gate', ipa: '/ɡeɪt/', tag: 'target' } },
      { a: { w: 'let', ipa: '/lɛt/', tag: 'desi' }, b: { w: 'late', ipa: '/leɪt/', tag: 'target' } },
      { a: { w: 'men', ipa: '/mɛn/', tag: 'desi' }, b: { w: 'main', ipa: '/meɪn/', tag: 'target' } }
    ],
    sentences: [
      'Take the late train through the main gate today.',
      'We hope to show both notes to those folks.',
      'She sees six sleek sheep sleeping on the hill.',
      'Fill this dish with crisp fish and green chips.',
      'Go home slowly and close the old yellow coat.',
      'Say what they say on this rainy day in May.',
      'Please leave these three clean keys near the beach.',
      'The big ship will carry sixty brisk sailors.',
      'No one knows how cold the snow will grow.',
      'Stay away from the lake and wait for the train.',
      'He feels great relief seeing clean green fields.',
      'It is difficult to fix this quick little glitch.'
    ]
  },
  {
    id: 'ax-rhythm',
    title: 'Sentence Rhythm & Connected Speech',
    ipa: '/ə/ rhythm & chunking',
    desiTrap: 'Indian languages pronounce every word with nearly equal syllable duration (machine-gun effect). English is stress-timed: function words (to, a, the, of, can) reduce to schwa (/ə/), creating an elastic musical rhythm.',
    fix: 'Group thoughts into chunks. Whisper and compress grammatical helper words ("can you", "to the", "of a"), then land firmly and slowly on nouns, verbs, and adjectives.',
    sentences: [
      { text: 'I want to go to the market on Friday.', stressMark: 'I WANT to GO to the MARket on FRIday.' },
      { text: 'Could you send me the report by five o\'clock?', stressMark: 'Could you SEND me the rePORT by FIVE o\'CLOCK?' },
      { text: 'We need to discuss the architecture proposal.', stressMark: 'We NEED to disCUSS the ARchiTECture proPOsal.' },
      { text: 'She works at an engineering company in Mumbai.', stressMark: 'She WORKS at an ENgiNEERing COMpany in MumBAI.' },
      { text: 'It was one of the best decisions we made.', stressMark: 'It was ONE of the BEST deCISions we MADE.' },
      { text: 'Can I talk to you for a couple of minutes?', stressMark: 'Can I TALK to you for a COUPle of MINutes?' },
      { text: 'The train will arrive at platform number four.', stressMark: 'The TRAIN will arRIVE at PLATform NUMber FOUR.' },
      { text: 'He told me that he would call back later.', stressMark: 'He TOLD me that he would CALL back LAter.' },
      { text: 'We are planning to launch the feature next month.', stressMark: 'We are PLANning to LAUNCH the FEAture next MONTH.' },
      { text: 'I would like to schedule a quick meeting today.', stressMark: 'I would LIKE to SCHEDule a QUICK MEEting toDAY.' },
      { text: 'Please let me know if you have any questions.', stressMark: 'Please LET me KNOW if you HAVE any QUEStions.' },
      { text: 'They have already completed the first milestone.', stressMark: 'They have alREA-dy comPLE-ted the FIRST MILEstone.' }
    ]
  }
];

if (typeof window !== 'undefined') { window.ACCENT_PACKS = ACCENT_PACKS; }
if (typeof global !== 'undefined') { global.ACCENT_PACKS = ACCENT_PACKS; }

/* =====================================================================
   data6.js — Indian Accent Studio Content Packs Cycle 2 (M21 ACCENT CYCLE 2)
   ES5 only — zero dependencies, fully offline
   Research-backed Indian-English contrast pairs: s/z, p/f, cot/caught,
   aspiration, dropped endings, and interview storm sentences.
   ===================================================================== */

var ACCENT_PACKS_2 = [
  {
    id: 'ax-zs',
    title: 'S vs Z Devoicing & Buzz',
    ipa: '/s/ vs /z/',
    desiTrap: 'Indian tongues frequently devoice /z/ into /s/ (saying "is" as "iss", "zero" as "sero", "buzz" as "buss", "raise" as "race"), eliminating the vibrant vocal cord buzz.',
    fix: 'Both /s/ and /z/ share the exact same mouth position (tongue tip near alveolar ridge behind upper front teeth). For /s/, exhale unvoiced hissing air. For /z/, activate your vocal cords — touch your throat to feel the strong electrical buzz.',
    pairs: [
      { a: { w: 'ice', ipa: '/aɪs/', tag: 'desi' }, b: { w: 'eyes', ipa: '/aɪz/', tag: 'target' } },
      { a: { w: 'race', ipa: '/reɪs/', tag: 'desi' }, b: { w: 'raise', ipa: '/reɪz/', tag: 'target' } },
      { a: { w: 'cease', ipa: '/siːs/', tag: 'desi' }, b: { w: 'seize', ipa: '/siːz/', tag: 'target' } },
      { a: { w: 'loose', ipa: '/luːs/', tag: 'desi' }, b: { w: 'lose', ipa: '/luːz/', tag: 'target' } },
      { a: { w: 'price', ipa: '/praɪs/', tag: 'desi' }, b: { w: 'prize', ipa: '/praɪz/', tag: 'target' } },
      { a: { w: 'peace', ipa: '/piːs/', tag: 'desi' }, b: { w: 'peas', ipa: '/piːz/', tag: 'target' } },
      { a: { w: 'bus', ipa: '/bʌs/', tag: 'desi' }, b: { w: 'buzz', ipa: '/bʌz/', tag: 'target' } },
      { a: { w: 'hiss', ipa: '/hɪs/', tag: 'desi' }, b: { w: 'his', ipa: '/hɪz/', tag: 'target' } },
      { a: { w: 'place', ipa: '/pleɪs/', tag: 'desi' }, b: { w: 'plays', ipa: '/pleɪz/', tag: 'target' } },
      { a: { w: 'niece', ipa: '/niːs/', tag: 'desi' }, b: { w: 'knees', ipa: '/niːz/', tag: 'target' } },
      { a: { w: 'grace', ipa: '/greɪs/', tag: 'desi' }, b: { w: 'graze', ipa: '/greɪz/', tag: 'target' } },
      { a: { w: 'device', ipa: '/dɪˈvaɪs/', tag: 'desi' }, b: { w: 'devise', ipa: '/dɪˈvaɪz/', tag: 'target' } }
    ],
    sentences: [
      'He closes his eyes and listens to the music.',
      'These zero-emission prizes will raise public awareness.',
      'His business advisors always organise wise solutions.',
      'Please realise that his ideas deserve sincere praise.',
      'The buzzing bees flew across those sunny rose fields.',
      'We must devise a reliable device for this exercise.',
      'She always chooses comfortable shoes for long walks.',
      'The jazz music plays as the sun sets in the west.',
      'Notice the surprise on their faces when they hear the news.',
      'Reason and wisdom will help resolve these issues.',
      'The noise rises as thousand bees buzz nearby.',
      'Exercise causes your muscles to relax and grow.'
    ]
  },
  {
    id: 'ax-pf',
    title: 'P vs F Bilabial vs Labiodental',
    ipa: '/p/ vs /f/',
    desiTrap: 'In several Indian languages, the letter "f" is replaced by a bilabial aspirated stop /pʰ/ using both lips, turning "coffee" into "coppee", "photo" into "poto", and "fan" into "pan".',
    fix: 'For /p/: press both lips firmly together, build air pressure behind them, and pop them open. For /f/: rest your top front teeth gently against the inner edge of your lower lip and blow smooth unvoiced air — lips must NOT meet.',
    pairs: [
      { a: { w: 'copy', ipa: '/ˈkɒpi/', tag: 'desi' }, b: { w: 'coffee', ipa: '/ˈkɒfi/', tag: 'target' } },
      { a: { w: 'pan', ipa: '/pæn/', tag: 'desi' }, b: { w: 'fan', ipa: '/fæn/', tag: 'target' } },
      { a: { w: 'pull', ipa: '/pʊl/', tag: 'desi' }, b: { w: 'full', ipa: '/fʊl/', tag: 'target' } },
      { a: { w: 'pine', ipa: '/paɪn/', tag: 'desi' }, b: { w: 'fine', ipa: '/faɪn/', tag: 'target' } },
      { a: { w: 'peel', ipa: '/piːl/', tag: 'desi' }, b: { w: 'feel', ipa: '/fiːl/', tag: 'target' } },
      { a: { w: 'pact', ipa: '/pækt/', tag: 'desi' }, b: { w: 'fact', ipa: '/fækt/', tag: 'target' } },
      { a: { w: 'pool', ipa: '/puːl/', tag: 'desi' }, b: { w: 'fool', ipa: '/fuːl/', tag: 'target' } },
      { a: { w: 'pair', ipa: '/pɛər/', tag: 'desi' }, b: { w: 'fair', ipa: '/fɛər/', tag: 'target' } },
      { a: { w: 'leap', ipa: '/liːp/', tag: 'desi' }, b: { w: 'leaf', ipa: '/liːf/', tag: 'target' } },
      { a: { w: 'cup', ipa: '/kʌp/', tag: 'desi' }, b: { w: 'cuff', ipa: '/kʌf/', tag: 'target' } },
      { a: { w: 'supper', ipa: '/ˈsʌpər/', tag: 'desi' }, b: { w: 'suffer', ipa: '/ˈsʌfər/', tag: 'target' } },
      { a: { w: 'cheap', ipa: '/tʃiːp/', tag: 'desi' }, b: { w: 'chief', ipa: '/tʃiːf/', tag: 'target' } }
    ],
    sentences: [
      'Pour fresh coffee from the pot for every guest.',
      'The financial chief prepared a perfect proposal for us.',
      'Four friendly professionals offered positive feedback.',
      'He prefers fresh fruit and pure filtered water.',
      'The fast airplane flew past four peaceful islands.',
      'Peter praised the performance of the founding team.',
      'Feel free to print a copy of the official file.',
      'We hope for fair profits from this patent portfolio.',
      'Philip found five fine photographs in the file.',
      'Please focus on following practical flight procedures.',
      'Her deep passion for poetry formed firm friendships.',
      'Professional athletes perform with powerful focus.'
    ]
  },
  {
    id: 'ax-oc',
    title: 'Cot vs Caught Vowel Contrast',
    ipa: '/ɒ/ vs /ɔː/',
    desiTrap: 'Indian English often lacks the distinction between the short open back vowel /ɒ/ (cot, nod, stock) and the long rounded back vowel /ɔː/ (caught, gnawed, stalk), collapsing them into a single vowel sound.',
    fix: 'For /ɒ/ (cot, not, spot): drop your lower jaw wide, keep lips unrounded and relaxed with tongue low. For /ɔː/ (caught, call, dawn): round lips forward into an open circle, pull tongue slightly back, and hold the vowel longer.',
    pairs: [
      { a: { w: 'cot', ipa: '/kɒt/', tag: 'desi' }, b: { w: 'caught', ipa: '/kɔːt/', tag: 'target' } },
      { a: { w: 'not', ipa: '/nɒt/', tag: 'desi' }, b: { w: 'naught', ipa: '/nɔːt/', tag: 'target' } },
      { a: { w: 'don', ipa: '/dɒn/', tag: 'desi' }, b: { w: 'dawn', ipa: '/dɔːn/', tag: 'target' } },
      { a: { w: 'coll', ipa: '/kɒl/', tag: 'desi' }, b: { w: 'call', ipa: '/kɔːl/', tag: 'target' } },
      { a: { w: 'stock', ipa: '/stɒk/', tag: 'desi' }, b: { w: 'stalk', ipa: '/stɔːk/', tag: 'target' } },
      { a: { w: 'spot', ipa: '/spɒt/', tag: 'desi' }, b: { w: 'sport', ipa: '/spɔːt/', tag: 'target' } },
      { a: { w: 'box', ipa: '/bɒks/', tag: 'desi' }, b: { w: 'balks', ipa: '/bɔːks/', tag: 'target' } },
      { a: { w: 'shot', ipa: '/ʃɒt/', tag: 'desi' }, b: { w: 'short', ipa: '/ʃɔːt/', tag: 'target' } },
      { a: { w: 'fox', ipa: '/fɒks/', tag: 'desi' }, b: { w: 'forks', ipa: '/fɔːks/', tag: 'target' } },
      { a: { w: 'pod', ipa: '/pɒd/', tag: 'desi' }, b: { w: 'pawed', ipa: '/pɔːd/', tag: 'target' } },
      { a: { w: 'knot', ipa: '/nɒt/', tag: 'desi' }, b: { w: 'nought', ipa: '/nɔːt/', tag: 'target' } },
      { a: { w: 'wok', ipa: '/wɒk/', tag: 'desi' }, b: { w: 'walk', ipa: '/wɔːk/', tag: 'target' } }
    ],
    sentences: [
      'She bought a small cot and caught a late flight.',
      'Call the office at dawn before stocks begin falling.',
      'Paul walked along the broad lawn in the morning.',
      'He thought that the hot coffee was not too strong.',
      'All four authors talked about law and modern thought.',
      'Watch your step as you walk toward the water fountain.',
      'The doctor taught forty college students all autumn.',
      'Tom dropped the box of chalk on the soft lawn.',
      'A small fox was caught near the broad corn field.',
      'The audience applauded after the short acoustic song.',
      'Always wash your hands before you touch warm food.',
      'They fought for what they thought was fair and lawful.'
    ]
  },
  {
    id: 'ax-asp',
    title: 'Initial Stop Aspiration',
    ipa: '/pʰ, tʰ, kʰ/ vs /sp, st, sk/',
    desiTrap: 'Indian speakers articulate initial voiceless plosives (p, t, k) with zero breath aspiration, sounding to global listeners like unaspirated /b, d, g/ or consonant clusters (e.g. "pin" sounds like "bin" or "spin").',
    fix: 'Hold a tissue or sheet of paper 2 inches from your mouth. When pronouncing initial p, t, or k in words like "pin", "top", "cool", release a sharp puff of air so the paper kicks outward. In "spin" or "stop", the paper should barely move.',
    pairs: [
      { a: { w: 'spin', ipa: '/spɪn/', tag: 'desi' }, b: { w: 'pin', ipa: '/pʰɪn/', tag: 'target' } },
      { a: { w: 'stop', ipa: '/stɒp/', tag: 'desi' }, b: { w: 'top', ipa: '/tʰɒp/', tag: 'target' } },
      { a: { w: 'skin', ipa: '/skɪn/', tag: 'desi' }, b: { w: 'kin', ipa: '/kʰɪn/', tag: 'target' } },
      { a: { w: 'school', ipa: '/skuːl/', tag: 'desi' }, b: { w: 'cool', ipa: '/kʰuːl/', tag: 'target' } },
      { a: { w: 'stake', ipa: '/steɪk/', tag: 'desi' }, b: { w: 'take', ipa: '/tʰeɪk/', tag: 'target' } },
      { a: { w: 'spear', ipa: '/spɪər/', tag: 'desi' }, b: { w: 'pier', ipa: '/pʰɪər/', tag: 'target' } },
      { a: { w: 'spot', ipa: '/spɒt/', tag: 'desi' }, b: { w: 'pot', ipa: '/pʰɒt/', tag: 'target' } },
      { a: { w: 'star', ipa: '/stɑːr/', tag: 'desi' }, b: { w: 'tar', ipa: '/tʰɑːr/', tag: 'target' } },
      { a: { w: 'stick', ipa: '/stɪk/', tag: 'desi' }, b: { w: 'tick', ipa: '/tʰɪk/', tag: 'target' } },
      { a: { w: 'ski', ipa: '/skiː/', tag: 'desi' }, b: { w: 'key', ipa: '/kʰiː/', tag: 'target' } },
      { a: { w: 'space', ipa: '/speɪs/', tag: 'desi' }, b: { w: 'pace', ipa: '/pʰeɪs/', tag: 'target' } },
      { a: { w: 'stone', ipa: '/stoʊn/', tag: 'desi' }, b: { w: 'tone', ipa: '/tʰoʊn/', tag: 'target' } }
    ],
    sentences: [
      'Take two tickets to the top of the tower.',
      'Peter poured pure water into the silver cup.',
      'Karen kept a cool head during the key discussion.',
      'Tell the team to test the code on Tuesday.',
      'Please place paper cups on every conference table.',
      'Tom took twenty minutes to complete the task.',
      'Clean computers keep customer accounts secure.',
      'The painter prepared three canvases before twilight.',
      'Careful planning prevents problems during product launch.',
      'Pat tested ten types of tea in Taiwan.',
      'The pilot picked a peaceful path past the storm.',
      'Keep your keys in a safe place until tomorrow.'
    ]
  },
  {
    id: 'ax-final',
    title: 'Final Consonants & Past Tense Endings',
    ipa: '-ed, -t, -d final clusters',
    desiTrap: 'Indian languages tend towards open syllables ending in vowels. In English, speakers routinely drop past-tense "-ed", final "t", or final "d", saying "play" for "played" or "work" for "worked", confusing tense and grammar.',
    fix: 'Never swallow the ending consonant. Pronounce past-tense "-ed" as /t/ after voiceless sounds (worked, looked), as /d/ after voiced sounds (played, lived), and as a distinct syllable /ɪd/ after t or d (wanted, needed).',
    pairs: [
      { a: { w: 'play', ipa: '/pleɪ/', tag: 'desi' }, b: { w: 'played', ipa: '/pleɪd/', tag: 'target' } },
      { a: { w: 'work', ipa: '/wɜːrk/', tag: 'desi' }, b: { w: 'worked', ipa: '/wɜːrkt/', tag: 'target' } },
      { a: { w: 'want', ipa: '/wɒnt/', tag: 'desi' }, b: { w: 'wanted', ipa: '/ˈwɒntɪd/', tag: 'target' } },
      { a: { w: 'look', ipa: '/lʊk/', tag: 'desi' }, b: { w: 'looked', ipa: '/lʊkt/', tag: 'target' } },
      { a: { w: 'call', ipa: '/kɔːl/', tag: 'desi' }, b: { w: 'called', ipa: '/kɔːld/', tag: 'target' } },
      { a: { w: 'ask', ipa: '/æsk/', tag: 'desi' }, b: { w: 'asked', ipa: '/æskt/', tag: 'target' } },
      { a: { w: 'start', ipa: '/stɑːrt/', tag: 'desi' }, b: { w: 'started', ipa: '/ˈstɑːrtɪd/', tag: 'target' } },
      { a: { w: 'help', ipa: '/hɛlp/', tag: 'desi' }, b: { w: 'helped', ipa: '/hɛlpt/', tag: 'target' } },
      { a: { w: 'talk', ipa: '/tɔːk/', tag: 'desi' }, b: { w: 'talked', ipa: '/tɔːkt/', tag: 'target' } },
      { a: { w: 'live', ipa: '/lɪv/', tag: 'desi' }, b: { w: 'lived', ipa: '/lɪvd/', tag: 'target' } },
      { a: { w: 'need', ipa: '/niːd/', tag: 'desi' }, b: { w: 'needed', ipa: '/ˈniːdɪd/', tag: 'target' } },
      { a: { w: 'pass', ipa: '/pæs/', tag: 'desi' }, b: { w: 'passed', ipa: '/pæst/', tag: 'target' } }
    ],
    sentences: [
      'We worked hard and helped our clients succeed.',
      'She asked several thoughtful questions during the interview.',
      'They started the project and delivered on time.',
      'He lived in London and called his family frequently.',
      'The engineer checked every detail and fixed the bug.',
      'We discussed the roadmap and agreed on the priorities.',
      'She walked to the station and reached before sunset.',
      'The team completed the sprint and tested the deployment.',
      'He explained the architecture and answered every question.',
      'They needed more information before they decided.',
      'I reviewed your pull request and merged the changes.',
      'She passed the examination with outstanding marks.'
    ]
  },
  {
    id: 'ax-storm',
    title: 'Interview Storm (Advanced Fluency)',
    ipa: 'Executive clarity & rhythm',
    desiTrap: 'In high-pressure job interviews and boardroom presentations, Indian professionals often rush their tempo, blurring word boundaries, dropping consonant clusters, and flattening stress rhythm.',
    fix: 'Take a measured breath before responding. Chunk your ideas into rhythmic phrase units. Crisp the /v/ and /z/ sounds, deliver puff-of-air aspiration on initial stops, and enunciate all past-tense endings.',
    modes: ['sentence'],
    sentences: [
      { text: 'I value innovative ventures where diverse teams thrive.', stressMark: 'I VALue INnovative VENtures where diVERSE TEAMS THRIVE.' },
      { text: 'We developed robust solutions that reduced latency by thirty percent.', stressMark: 'We deVELoped roBUST soLUtions that reDUCED LAtency by THIRty perCENT.' },
      { text: 'Could you clarify the strategic priorities for the upcoming quarter?', stressMark: 'Could you CLARify the straTEGic priORities for the UPcoming QUARter?' },
      { text: 'I managed cross-functional projects and delivered every milestone on schedule.', stressMark: 'I MANaged cross-FUNC-tional PROJects and deLIVered EVery MILEstone on SCHEDule.' },
      { text: 'Our team analyzed complex datasets to devise profitable customer experiences.', stressMark: 'Our TEAM ANalyzed COMplex DA-tasets to deVISE PROFitable CUStomer exPERiences.' },
      { text: 'Effective communication requires both empathy and uncompromising clarity.', stressMark: 'efFECtive comMUniCAtion reQUIRES both EMpathy and unCOMpromising CLARity.' },
      { text: 'We faced unexpected challenges but adapted quickly to achieve our targets.', stressMark: 'We FACED unexPECted CHALlenges but aDAPted QUICKly to aCHIEVE our TARgets.' },
      { text: 'I frequently collaborate with global stakeholders across different time zones.', stressMark: 'I FREquently colLABorate with GLObal STAKEholders aCROSS DIFferent TIME ZONES.' },
      { text: 'Prioritizing core engineering principles helped us scale without technical debt.', stressMark: 'priORitizing CORE engiNEERing PRINciples HELPED us SCALE without TECHnical DEBT.' },
      { text: 'I believe transparency and psychological safety empower engineers to innovate.', stressMark: 'I beLIEVE transPARency and psychoLOGical SAFEty emPOWer engiNEERS to INnovate.' },
      { text: 'We systematically verified all edge cases before deploying to production.', stressMark: 'We systemATically VERified all EDGE CA-ses beFORE dePLOYing to proDUC-tion.' },
      { text: 'My goal is to lead high-impact initiatives that create lasting enterprise value.', stressMark: 'My GOAL is to LEAD HIGH-IMPACT iNItiatives that creATE LASTing ENterprise VALue.' }
    ]
  }
];

if (typeof window !== 'undefined') { window.ACCENT_PACKS_2 = ACCENT_PACKS_2; }
if (typeof global !== 'undefined') { global.ACCENT_PACKS_2 = ACCENT_PACKS_2; }

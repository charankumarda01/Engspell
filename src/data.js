/* =====================================================================
   data.js — ES5 ONLY
   LETTERS, SOUNDS (44), WORDS (130+), PAIRS (18), TWISTERS, SPELLING (60),
   SCENARIOS, QUIZ_BANK, COACH_RULES, COACH_INTENTS, COACH_UPGRADES,
   COACH_INTERVIEW
   ===================================================================== */

var LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

var SOUNDS = [
  // Vowels (20)
  {id:'s1', sym:'/iː/', eg:'see', type:'vowel'},
  {id:'s2', sym:'/ɪ/', eg:'sit', type:'vowel'},
  {id:'s3', sym:'/e/', eg:'bed', type:'vowel'},
  {id:'s4', sym:'/æ/', eg:'cat', type:'vowel'},
  {id:'s5', sym:'/ɑː/', eg:'car', type:'vowel'},
  {id:'s6', sym:'/ɒ/', eg:'hot', type:'vowel'},
  {id:'s7', sym:'/ɔː/', eg:'law', type:'vowel'},
  {id:'s8', sym:'/ʊ/', eg:'put', type:'vowel'},
  {id:'s9', sym:'/uː/', eg:'blue', type:'vowel'},
  {id:'s10', sym:'/ʌ/', eg:'cup', type:'vowel'},
  {id:'s11', sym:'/ɜː/', eg:'her', type:'vowel'},
  {id:'s12', sym:'/ə/', eg:'ago', type:'vowel'},
  {id:'s13', sym:'/eɪ/', eg:'day', type:'vowel'},
  {id:'s14', sym:'/aɪ/', eg:'my', type:'vowel'},
  {id:'s15', sym:'/ɔɪ/', eg:'boy', type:'vowel'},
  {id:'s16', sym:'/aʊ/', eg:'now', type:'vowel'},
  {id:'s17', sym:'/əʊ/', eg:'go', type:'vowel'},
  {id:'s18', sym:'/ɪə/', eg:'near', type:'vowel'},
  {id:'s19', sym:'/eə/', eg:'hair', type:'vowel'},
  {id:'s20', sym:'/ʊə/', eg:'tour', type:'vowel'},
  // Consonants (24)
  {id:'s21', sym:'/p/', eg:'pen', type:'consonant'},
  {id:'s22', sym:'/b/', eg:'bad', type:'consonant'},
  {id:'s23', sym:'/t/', eg:'tea', type:'consonant'},
  {id:'s24', sym:'/d/', eg:'did', type:'consonant'},
  {id:'s25', sym:'/k/', eg:'cat', type:'consonant'},
  {id:'s26', sym:'/g/', eg:'got', type:'consonant'},
  {id:'s27', sym:'/tʃ/', eg:'chin', type:'consonant'},
  {id:'s28', sym:'/dʒ/', eg:'June', type:'consonant'},
  {id:'s29', sym:'/f/', eg:'fall', type:'consonant'},
  {id:'s30', sym:'/v/', eg:'van', type:'consonant'},
  {id:'s31', sym:'/θ/', eg:'thin', type:'consonant'},
  {id:'s32', sym:'/ð/', eg:'then', type:'consonant'},
  {id:'s33', sym:'/s/', eg:'so', type:'consonant'},
  {id:'s34', sym:'/z/', eg:'zoo', type:'consonant'},
  {id:'s35', sym:'/ʃ/', eg:'she', type:'consonant'},
  {id:'s36', sym:'/ʒ/', eg:'vision', type:'consonant'},
  {id:'s37', sym:'/h/', eg:'how', type:'consonant'},
  {id:'s38', sym:'/m/', eg:'man', type:'consonant'},
  {id:'s39', sym:'/n/', eg:'no', type:'consonant'},
  {id:'s40', sym:'/ŋ/', eg:'sing', type:'consonant'},
  {id:'s41', sym:'/l/', eg:'leg', type:'consonant'},
  {id:'s42', sym:'/r/', eg:'red', type:'consonant'},
  {id:'s43', sym:'/j/', eg:'yes', type:'consonant'},
  {id:'s44', sym:'/w/', eg:'wet', type:'consonant'}
];

var WORDS = [
  {w:'about',ipa:'/əˈbaʊt/',lvl:'A1'},{w:'accept',ipa:'/əkˈsɛpt/',lvl:'B1'},
  {w:'accommodate',ipa:'/əˈkɒmədeɪt/',lvl:'C1'},{w:'achieve',ipa:'/əˈtʃiːv/',lvl:'B1'},
  {w:'acknowledge',ipa:'/əkˈnɒlɪdʒ/',lvl:'B2'},{w:'acquire',ipa:'/əˈkwaɪər/',lvl:'B2'},
  {w:'actually',ipa:'/ˈæktʃuəli/',lvl:'A2'},{w:'adequate',ipa:'/ˈædɪkwət/',lvl:'B2'},
  {w:'admire',ipa:'/ədˈmaɪər/',lvl:'B1'},{w:'admit',ipa:'/ədˈmɪt/',lvl:'B1'},
  {w:'affect',ipa:'/əˈfɛkt/',lvl:'B1'},{w:'afford',ipa:'/əˈfɔːd/',lvl:'A2'},
  {w:'although',ipa:'/ɔːlˈðəʊ/',lvl:'B1'},{w:'ambiguous',ipa:'/æmˈbɪɡjuəs/',lvl:'C1'},
  {w:'ambition',ipa:'/æmˈbɪʃən/',lvl:'B1'},{w:'analyse',ipa:'/ˈænəlaɪz/',lvl:'B2'},
  {w:'appropriate',ipa:'/əˈprəʊpriət/',lvl:'B2'},{w:'approximately',ipa:'/əˈprɒksɪmətli/',lvl:'B2'},
  {w:'argue',ipa:'/ˈɑːɡjuː/',lvl:'B1'},{w:'assess',ipa:'/əˈsɛs/',lvl:'B2'},
  {w:'assume',ipa:'/əˈsjuːm/',lvl:'B2'},{w:'available',ipa:'/əˈveɪləbl/',lvl:'A2'},
  {w:'because',ipa:'/bɪˈkɒz/',lvl:'A1'},{w:'behaviour',ipa:'/bɪˈheɪvjər/',lvl:'B1'},
  {w:'believe',ipa:'/bɪˈliːv/',lvl:'A2'},{w:'benefit',ipa:'/ˈbɛnɪfɪt/',lvl:'B1'},
  {w:'business',ipa:'/ˈbɪznɪs/',lvl:'A2'},{w:'calendar',ipa:'/ˈkælɪndər/',lvl:'A2'},
  {w:'careful',ipa:'/ˈkeəfʊl/',lvl:'A1'},{w:'category',ipa:'/ˈkætɪɡəri/',lvl:'B2'},
  {w:'cause',ipa:'/kɔːz/',lvl:'A2'},{w:'certain',ipa:'/ˈsɜːtən/',lvl:'A2'},
  {w:'challenge',ipa:'/ˈtʃælɪndʒ/',lvl:'B1'},{w:'character',ipa:'/ˈkærəktər/',lvl:'A2'},
  {w:'colleague',ipa:'/ˈkɒliːɡ/',lvl:'B1'},{w:'commitment',ipa:'/kəˈmɪtmənt/',lvl:'B2'},
  {w:'communicate',ipa:'/kəˈmjuːnɪkeɪt/',lvl:'B1'},{w:'community',ipa:'/kəˈmjuːnɪti/',lvl:'B1'},
  {w:'complex',ipa:'/ˈkɒmplɛks/',lvl:'B2'},{w:'concentrate',ipa:'/ˈkɒnsəntreɪt/',lvl:'B1'},
  {w:'confident',ipa:'/ˈkɒnfɪdənt/',lvl:'B1'},{w:'consequence',ipa:'/ˈkɒnsɪkwəns/',lvl:'B2'},
  {w:'consider',ipa:'/kənˈsɪdər/',lvl:'B1'},{w:'consistent',ipa:'/kənˈsɪstənt/',lvl:'B2'},
  {w:'convenient',ipa:'/kənˈviːniənt/',lvl:'B2'},{w:'correct',ipa:'/kəˈrɛkt/',lvl:'A1'},
  {w:'creative',ipa:'/kriˈeɪtɪv/',lvl:'B1'},{w:'critical',ipa:'/ˈkrɪtɪkəl/',lvl:'B2'},
  {w:'curious',ipa:'/ˈkjʊəriəs/',lvl:'B1'},{w:'decision',ipa:'/dɪˈsɪʒən/',lvl:'B1'},
  {w:'describe',ipa:'/dɪˈskraɪb/',lvl:'A2'},{w:'develop',ipa:'/dɪˈvɛləp/',lvl:'A2'},
  {w:'difficult',ipa:'/ˈdɪfɪkəlt/',lvl:'A1'},{w:'discuss',ipa:'/dɪˈskʌs/',lvl:'A2'},
  {w:'effective',ipa:'/ɪˈfɛktɪv/',lvl:'B2'},{w:'efficient',ipa:'/ɪˈfɪʃənt/',lvl:'B2'},
  {w:'embarrass',ipa:'/ɪmˈbærəs/',lvl:'B1'},{w:'emphasise',ipa:'/ˈɛmfəsaɪz/',lvl:'B2'},
  {w:'encourage',ipa:'/ɪnˈkʌrɪdʒ/',lvl:'B1'},{w:'enormous',ipa:'/ɪˈnɔːməs/',lvl:'B1'},
  {w:'environment',ipa:'/ɪnˈvaɪrənmənt/',lvl:'B1'},{w:'essential',ipa:'/ɪˈsɛnʃəl/',lvl:'B2'},
  {w:'evaluate',ipa:'/ɪˈvæljueɪt/',lvl:'B2'},{w:'eventually',ipa:'/ɪˈvɛntʃuəli/',lvl:'B1'},
  {w:'evidence',ipa:'/ˈɛvɪdəns/',lvl:'B2'},{w:'exact',ipa:'/ɪɡˈzækt/',lvl:'A2'},
  {w:'excellent',ipa:'/ˈɛksələnt/',lvl:'A2'},{w:'experience',ipa:'/ɪkˈspɪəriəns/',lvl:'A2'},
  {w:'explain',ipa:'/ɪkˈspleɪn/',lvl:'A2'},{w:'familiar',ipa:'/fəˈmɪliər/',lvl:'B1'},
  {w:'fascinating',ipa:'/ˈfæsɪneɪtɪŋ/',lvl:'B2'},{w:'favourite',ipa:'/ˈfeɪvərɪt/',lvl:'A1'},
  {w:'flexible',ipa:'/ˈflɛksɪbl/',lvl:'B2'},{w:'fluent',ipa:'/ˈfluːənt/',lvl:'B2'},
  {w:'focus',ipa:'/ˈfəʊkəs/',lvl:'B1'},{w:'foreign',ipa:'/ˈfɒrɪn/',lvl:'A2'},
  {w:'frequently',ipa:'/ˈfriːkwəntli/',lvl:'B2'},{w:'frustrated',ipa:'/frʌˈstreɪtɪd/',lvl:'B1'},
  {w:'genuine',ipa:'/ˈdʒɛnjuɪn/',lvl:'B2'},{w:'gradually',ipa:'/ˈɡrædʒuəli/',lvl:'B2'},
  {w:'grateful',ipa:'/ˈɡreɪtfʊl/',lvl:'B1'},{w:'guarantee',ipa:'/ˌɡærənˈtiː/',lvl:'B2'},
  {w:'guidance',ipa:'/ˈɡaɪdəns/',lvl:'B2'},{w:'hesitate',ipa:'/ˈhɛzɪteɪt/',lvl:'B2'},
  {w:'highlight',ipa:'/ˈhaɪlaɪt/',lvl:'B2'},{w:'immediately',ipa:'/ɪˈmiːdiətli/',lvl:'B1'},
  {w:'improve',ipa:'/ɪmˈpruːv/',lvl:'A2'},{w:'independent',ipa:'/ˌɪndɪˈpɛndənt/',lvl:'B1'},
  {w:'influence',ipa:'/ˈɪnfluəns/',lvl:'B2'},{w:'information',ipa:'/ˌɪnfəˈmeɪʃən/',lvl:'A1'},
  {w:'intelligent',ipa:'/ɪnˈtɛlɪdʒənt/',lvl:'B1'},{w:'interested',ipa:'/ˈɪntrɪstɪd/',lvl:'A1'},
  {w:'introduce',ipa:'/ˌɪntrəˈdjuːs/',lvl:'A2'},{w:'investigate',ipa:'/ɪnˈvɛstɪɡeɪt/',lvl:'B2'},
  {w:'knowledge',ipa:'/ˈnɒlɪdʒ/',lvl:'B1'},{w:'language',ipa:'/ˈlæŋɡwɪdʒ/',lvl:'A1'},
  {w:'leadership',ipa:'/ˈliːdəʃɪp/',lvl:'B2'},{w:'magnificent',ipa:'/mæɡˈnɪfɪsənt/',lvl:'C1'},
  {w:'maintain',ipa:'/meɪnˈteɪn/',lvl:'B2'},{w:'manage',ipa:'/ˈmænɪdʒ/',lvl:'A2'},
  {w:'necessary',ipa:'/ˈnɛsəsəri/',lvl:'A2'},{w:'negotiate',ipa:'/nɪˈɡəʊʃieɪt/',lvl:'C1'},
  {w:'nervous',ipa:'/ˈnɜːvəs/',lvl:'A2'},{w:'notice',ipa:'/ˈnəʊtɪs/',lvl:'A2'},
  {w:'obviously',ipa:'/ˈɒbviəsli/',lvl:'B1'},{w:'occasion',ipa:'/əˈkeɪʒən/',lvl:'B1'},
  {w:'opportunity',ipa:'/ˌɒpəˈtjuːnɪti/',lvl:'B1'},{w:'participate',ipa:'/pɑːˈtɪsɪpeɪt/',lvl:'B2'},
  {w:'patience',ipa:'/ˈpeɪʃəns/',lvl:'B1'},{w:'perhaps',ipa:'/pəˈhæps/',lvl:'A2'},
  {w:'persistence',ipa:'/pəˈsɪstəns/',lvl:'C1'},{w:'persuade',ipa:'/pəˈsweɪd/',lvl:'B2'},
  {w:'polite',ipa:'/pəˈlaɪt/',lvl:'A2'},{w:'possible',ipa:'/ˈpɒsɪbl/',lvl:'A1'},
  {w:'practically',ipa:'/ˈpræktɪkli/',lvl:'B2'},{w:'prepare',ipa:'/prɪˈpeə/',lvl:'A2'},
  {w:'previous',ipa:'/ˈpriːviəs/',lvl:'B1'},{w:'probably',ipa:'/ˈprɒbəbli/',lvl:'A2'},
  {w:'progress',ipa:'/ˈprəʊɡrɛs/',lvl:'A2'},{w:'proper',ipa:'/ˈprɒpər/',lvl:'A2'},
  {w:'purpose',ipa:'/ˈpɜːpəs/',lvl:'B1'},{w:'quality',ipa:'/ˈkwɒlɪti/',lvl:'A2'},
  {w:'realistic',ipa:'/ˌrɪəˈlɪstɪk/',lvl:'B2'},{w:'recognise',ipa:'/ˈrɛkəɡnaɪz/',lvl:'B1'},
  {w:'relationship',ipa:'/rɪˈleɪʃənʃɪp/',lvl:'B1'},{w:'relevant',ipa:'/ˈrɛlɪvənt/',lvl:'B2'},
  {w:'remarkable',ipa:'/rɪˈmɑːkəbl/',lvl:'B2'},{w:'responsible',ipa:'/rɪˈspɒnsɪbl/',lvl:'B1'},
  {w:'sensitive',ipa:'/ˈsɛnsɪtɪv/',lvl:'B2'},{w:'significant',ipa:'/sɪɡˈnɪfɪkənt/',lvl:'B2'},
  {w:'situation',ipa:'/ˌsɪtʃuˈeɪʃən/',lvl:'A2'},{w:'solution',ipa:'/səˈluːʃən/',lvl:'B1'},
  {w:'specific',ipa:'/spɪˈsɪfɪk/',lvl:'B2'},{w:'strengthen',ipa:'/ˈstrɛŋθən/',lvl:'B2'},
  {w:'suggest',ipa:'/səˈdʒɛst/',lvl:'B1'},{w:'support',ipa:'/səˈpɔːt/',lvl:'A2'},
  {w:'surprise',ipa:'/səˈpraɪz/',lvl:'A2'},{w:'thorough',ipa:'/ˈθʌrə/',lvl:'C1'},
  {w:'throughout',ipa:'/θruːˈaʊt/',lvl:'B2'},{w:'typical',ipa:'/ˈtɪpɪkəl/',lvl:'B1'},
  {w:'understand',ipa:'/ˌʌndəˈstænd/',lvl:'A1'},{w:'unfortunately',ipa:'/ʌnˈfɔːtʃənətli/',lvl:'B1'},
  {w:'unique',ipa:'/juːˈniːk/',lvl:'B1'},{w:'usually',ipa:'/ˈjuːʒuəli/',lvl:'A1'},
  {w:'valuable',ipa:'/ˈvæljuəbl/',lvl:'B2'},{w:'various',ipa:'/ˈveəriəs/',lvl:'B1'},
  {w:'vocabulary',ipa:'/vəˈkæbjʊləri/',lvl:'B1'},{w:'volunteer',ipa:'/ˌvɒlənˈtɪər/',lvl:'B1'},
  {w:'whether',ipa:'/ˈwɛðər/',lvl:'B1'},{w:'wonderful',ipa:'/ˈwʌndərfʊl/',lvl:'A2'}
];

var PAIRS = [
  {a:'ship',b:'sheep',tip:'short /ɪ/ vs long /iː/'},
  {a:'live',b:'leave',tip:'short /ɪ/ vs long /iː/'},
  {a:'full',b:'fool',tip:'short /ʊ/ vs long /uː/'},
  {a:'pull',b:'pool',tip:'short /ʊ/ vs long /uː/'},
  {a:'pen',b:'pan',tip:'/e/ vs /æ/'},
  {a:'bed',b:'bad',tip:'/e/ vs /æ/'},
  {a:'cat',b:'cut',tip:'/æ/ vs /ʌ/'},
  {a:'hat',b:'hut',tip:'/æ/ vs /ʌ/'},
  {a:'think',b:'thing',tip:'/θɪŋk/ vs /θɪŋ/ — final /k/'},
  {a:'thin',b:'tin',tip:'/θ/ vs /t/'},
  {a:'this',b:'dis',tip:'/ð/ vs /d/ — voiced'},
  {a:'vine',b:'wine',tip:'/v/ vs /w/'},
  {a:'best',b:'vest',tip:'/b/ vs /v/'},
  {a:'rice',b:'lice',tip:'/r/ vs /l/'},
  {a:'right',b:'light',tip:'/r/ vs /l/'},
  {a:'seat',b:'sheet',tip:'/s/ vs /ʃ/'},
  {a:'sin',b:'shin',tip:'/s/ vs /ʃ/'},
  {a:'chip',b:'ship',tip:'/tʃ/ vs /ʃ/'}
];

var TWISTERS = [
  'She sells seashells by the seashore.',
  'Peter Piper picked a peck of pickled peppers.',
  'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
  'Red lorry, yellow lorry.',
  'Unique New York, unique New York, you know you need unique New York.',
  'The sixth sick sheikh\'s sixth sheep\'s sick.',
  'Rubber baby buggy bumpers.',
  'I scream, you scream, we all scream for ice cream.',
  'Fresh French fried fish, fresh French fried fish.',
  'Betty Botter bought some butter but the butter was bitter.',
  'Which witch switched the Swiss wristwatch?',
  'A proper copper coffee pot.',
  'Lesser leather never weathered wetter weather.',
  'Six sleek swans swam swiftly southward.',
  'Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair.',
  'Whether the weather is fine, I\'ll weather the weather.',
  'Black background, brown background.',
  'Three free throws.',
  'A skunk sat on a stump and thunk the stump stunk.',
  'Near an ear, a nearer ear, a nearly eerie ear.'
];

var SPELLING = [
  // Level 1
  {w:'receive',lvl:1},{w:'believe',lvl:1},{w:'achieve',lvl:1},{w:'friend',lvl:1},
  {w:'because',lvl:1},{w:'different',lvl:1},{w:'people',lvl:1},{w:'every',lvl:1},
  {w:'really',lvl:1},{w:'again',lvl:1},{w:'always',lvl:1},{w:'another',lvl:1},
  {w:'before',lvl:1},{w:'coming',lvl:1},{w:'doesn\'t',lvl:1},{w:'enough',lvl:1},
  {w:'especially',lvl:1},{w:'finally',lvl:1},{w:'government',lvl:1},{w:'happened',lvl:1},
  // Level 2
  {w:'necessary',lvl:2},{w:'occurrence',lvl:2},{w:'accommodation',lvl:2},{w:'separate',lvl:2},
  {w:'embarrass',lvl:2},{w:'definitely',lvl:2},{w:'immediately',lvl:2},{w:'successful',lvl:2},
  {w:'experience',lvl:2},{w:'beautiful',lvl:2},{w:'knowledge',lvl:2},{w:'environment',lvl:2},
  {w:'opportunity',lvl:2},{w:'communication',lvl:2},{w:'unfortunately',lvl:2},{w:'behaviour',lvl:2},
  {w:'interesting',lvl:2},{w:'development',lvl:2},{w:'information',lvl:2},{w:'professional',lvl:2},
  // Level 3
  {w:'conscientious',lvl:3},{w:'bureaucracy',lvl:3},{w:'reconnaissance',lvl:3},{w:'lieutenant',lvl:3},
  {w:'onomatopoeia',lvl:3},{w:'entrepreneurial',lvl:3},{w:'unequivocally',lvl:3},{w:'pseudonym',lvl:3},
  {w:'pneumonia',lvl:3},{w:'phlegm',lvl:3},{w:'colonel',lvl:3},{w:'miscellaneous',lvl:3},
  {w:'mediterranean',lvl:3},{w:'perseverance',lvl:3},{w:'conscientiously',lvl:3},{w:'entrepreneur',lvl:3},
  {w:'acquaintance',lvl:3},{w:'questionnaire',lvl:3},{w:'unnecessary',lvl:3},{w:'sophisticated',lvl:3}
];

var SCENARIOS = [
  {
    id:'sc1', title:'Job Interview', level:'B1',
    context:'You are interviewing for a customer service role.',
    keyPhrases:['I have experience in...', 'My strongest skill is...', 'I would handle that by...'],
    turns:[
      {speaker:'i', text:'Tell me about yourself.'},
      {speaker:'u', prompt:'Introduce yourself briefly — name, background, one strength.'},
      {speaker:'i', text:'Why do you want this role?'},
      {speaker:'u', prompt:'Explain your motivation honestly.'},
      {speaker:'i', text:'How do you handle difficult customers?'},
      {speaker:'u', prompt:'Give a short example using past tense.'}
    ]
  },
  {
    id:'sc2', title:'Doctor\'s Appointment', level:'A2',
    context:'You are visiting a doctor with a complaint.',
    keyPhrases:['I have been feeling...', 'It started about...', 'The pain is...'],
    turns:[
      {speaker:'i', text:'How can I help you today?'},
      {speaker:'u', prompt:'Describe your main symptom.'},
      {speaker:'i', text:'How long have you had this problem?'},
      {speaker:'u', prompt:'Give a time reference — days, weeks.'},
      {speaker:'i', text:'On a scale of 1 to 10, how severe is the pain?'},
      {speaker:'u', prompt:'Describe severity and location.'}
    ]
  },
  {
    id:'sc3', title:'Hotel Check-In', level:'A2',
    context:'You arrive at a hotel to check in.',
    keyPhrases:['I have a reservation under...', 'Could I have...', 'Is there...'],
    turns:[
      {speaker:'i', text:'Good evening, welcome. Do you have a reservation?'},
      {speaker:'u', prompt:'Confirm your booking with your name.'},
      {speaker:'i', text:'May I see your ID and a payment method?'},
      {speaker:'u', prompt:'Politely provide the documents.'},
      {speaker:'i', text:'Would you like a room on a higher floor with a view?'},
      {speaker:'u', prompt:'Make a preference or request an upgrade.'}
    ]
  },
  {
    id:'sc4', title:'Requesting a Promotion', level:'B2',
    context:'You are talking to your manager about a promotion.',
    keyPhrases:['I feel I\'ve demonstrated...', 'Over the past year I have...', 'I would appreciate...'],
    turns:[
      {speaker:'i', text:'You wanted to speak with me?'},
      {speaker:'u', prompt:'Open the conversation professionally.'},
      {speaker:'i', text:'What achievements are you most proud of this year?'},
      {speaker:'u', prompt:'Give two specific accomplishments with results.'},
      {speaker:'i', text:'What salary range are you expecting?'},
      {speaker:'u', prompt:'Negotiate confidently with a clear number.'}
    ]
  },
  {
    id:'sc5', title:'Making a Complaint', level:'B1',
    context:'Your internet service has been down for three days.',
    keyPhrases:['I\'m calling about...', 'This has been going on for...', 'I expect...'],
    turns:[
      {speaker:'i', text:'Thank you for calling support. How can I help?'},
      {speaker:'u', prompt:'State the problem clearly and calmly.'},
      {speaker:'i', text:'I apologise for the inconvenience. When did it start?'},
      {speaker:'u', prompt:'Give the timeline and impact.'},
      {speaker:'i', text:'We can offer you a credit on your next bill.'},
      {speaker:'u', prompt:'Accept or push for a better resolution.'}
    ]
  },
  {
    id:'sc6', title:'University Enquiry', level:'B1',
    context:'You call a university admissions office.',
    keyPhrases:['I\'m interested in applying for...', 'Could you tell me...', 'What are the entry requirements for...'],
    turns:[
      {speaker:'i', text:'Admissions, good morning. How can I assist?'},
      {speaker:'u', prompt:'Ask about a specific course.'},
      {speaker:'i', text:'We require a minimum of 60% in your undergraduate degree.'},
      {speaker:'u', prompt:'Clarify what counts and whether your grades qualify.'},
      {speaker:'i', text:'The deadline is 31st January. Shall I email you the form?'},
      {speaker:'u', prompt:'Confirm and ask one more relevant question.'}
    ]
  },
  {
    id:'sc7', title:'Networking Event', level:'B2',
    context:'You meet a potential business contact at a conference.',
    keyPhrases:['It\'s great to meet you.', 'I work in...', 'I\'d love to connect and...'],
    turns:[
      {speaker:'i', text:'Hi! I don\'t think we\'ve met. I\'m Priya from FinTech Solutions.'},
      {speaker:'u', prompt:'Introduce yourself and your role.'},
      {speaker:'i', text:'Interesting! What brings you to this conference?'},
      {speaker:'u', prompt:'Share your purpose naturally and ask them back.'},
      {speaker:'i', text:'We should definitely keep in touch. Do you have a card?'},
      {speaker:'u', prompt:'Exchange contact details and suggest a follow-up.'}
    ]
  },
  {
    id:'sc8', title:'Renting a Flat', level:'B1',
    context:'You are viewing a flat and negotiating with the landlord.',
    keyPhrases:['Is the rent negotiable?', 'What\'s included in...', 'I\'d like to move in...'],
    turns:[
      {speaker:'i', text:'Welcome! This is a two-bedroom flat, fully furnished.'},
      {speaker:'u', prompt:'Ask about the monthly rent and what is included.'},
      {speaker:'i', text:'It\'s £1,200 per month, utilities not included.'},
      {speaker:'u', prompt:'Negotiate politely or ask about a discount.'},
      {speaker:'i', text:'I could consider £1,150 if you sign a 12-month lease.'},
      {speaker:'u', prompt:'Accept, counter, or ask for time to decide.'}
    ]
  },
  {
    id:'sc9', title:'Tech Support Call', level:'B1',
    context:'You are calling IT support to report a critical software crash before a client demo.',
    keyPhrases:['The system keeps crashing when...', 'Could you guide me through...', 'Is there a temporary workaround?'],
    turns:[
      {speaker:'i', text:'Helpdesk support, this is Alex speaking. How can I assist you today?'},
      {speaker:'u', prompt:'Describe the error you are encountering and state your urgent deadline.'},
      {speaker:'i', text:'I see. Have you tried clearing the application cache and restarting your machine?'},
      {speaker:'u', prompt:'Confirm you did that already and ask what else can be done right now.'},
      {speaker:'i', text:'Let me remote in and check the error logs. I can restore the backup version in five minutes.'},
      {speaker:'u', prompt:'Express gratitude, confirm you are ready, and ask how to avoid this in the future.'}
    ]
  },
  {
    id:'sc10', title:'Salary & Appraisal Discussion', level:'B2',
    context:'You are having a formal annual performance and compensation review with your director.',
    keyPhrases:['Over the past year, I have delivered...', 'Based on market benchmarks...', 'I would welcome an adjustment to reflect...'],
    turns:[
      {speaker:'i', text:'Thanks for meeting today. You\'ve had an impactful year leading our migration project.'},
      {speaker:'u', prompt:'Acknowledge the feedback and highlight two specific outcomes you delivered.'},
      {speaker:'i', text:'Your contributions are evident. Moving forward, what are your career and growth expectations?'},
      {speaker:'u', prompt:'State your ambition for senior responsibilities and present a reasoned case for salary review.'},
      {speaker:'i', text:'We have strict band constraints this quarter, but I can offer an 8% raise now and a performance bonus in June.'},
      {speaker:'u', prompt:'Accept constructively, clarify bonus metrics, and thank them for their advocacy.'}
    ]
  },
  {
    id:'sc11', title:'Doctor\'s Appointment', level:'A2',
    context:'You are visiting a clinic because you have had persistent headaches and fatigue.',
    keyPhrases:['I have been feeling...', 'The pain started about...', 'Does this medicine have side effects?'],
    turns:[
      {speaker:'i', text:'Good morning. What symptoms are you experiencing today?'},
      {speaker:'u', prompt:'Explain that you have had bad headaches and felt dizzy for three days.'},
      {speaker:'i', text:'Are you currently taking any regular medications or do you have any allergies?'},
      {speaker:'u', prompt:'Answer clearly and describe when the headache usually gets worse.'},
      {speaker:'i', text:'Your blood pressure looks normal. I\'ll write a prescription for mild relief and order a routine blood test.'},
      {speaker:'u', prompt:'Ask how many times a day to take the pills and whether you should rest from work.'}
    ]
  },
  {
    id:'sc12', title:'Hotel Check-in & Room Issue', level:'B1',
    context:'You arrive late at a hotel and discover the air conditioning in your room is malfunctioning.',
    keyPhrases:['I have a reservation under...', 'There seems to be an issue with...', 'Could we please be moved to another room?'],
    turns:[
      {speaker:'i', text:'Good evening, welcome to the Grand Plaza. May I have your surname and booking reference?'},
      {speaker:'u', prompt:'Provide your details and mention you requested a quiet, high-floor room.'},
      {speaker:'i', text:'Here are your keys for room 412 on the fourth floor. Elevators are to your right.'},
      {speaker:'u', prompt:'Call the front desk ten minutes later explaining the AC is making loud noise and blowing hot air.'},
      {speaker:'i', text:'I apologize sincerely for the inconvenience. Let me upgrade you to a suite on the seventh floor right away.'},
      {speaker:'u', prompt:'Thank the receptionist politely and ask someone to assist with moving your luggage.'}
    ]
  },
  {
    id:'sc13', title:'Client Project Pitch', level:'C1',
    context:'You are presenting a digital transformation proposal to a cautious executive steering committee.',
    keyPhrases:['Our primary value proposition centres on...', 'To mitigate implementation risk...', 'Let us look at the projected return on investment.'],
    turns:[
      {speaker:'i', text:'Your architecture looks modern, but our existing legacy systems are delicate. How do you guarantee zero downtime?'},
      {speaker:'u', prompt:'Reassure the committee with a phased blue-green deployment strategy and automated rollback mechanisms.'},
      {speaker:'i', text:'Understood. What about the operational overhead for our in-house engineering team during the rollout?'},
      {speaker:'u', prompt:'Detail your dedicated enablement workshops, paired programming sessions, and SLA commitments.'},
      {speaker:'i', text:'If we greenlight this initiative today, what is the earliest realistic milestone for Phase One delivery?'},
      {speaker:'u', prompt:'Provide a confident 90-day timeline with key discovery checkpoints and summarize the strategic upside.'}
    ]
  },
  {
    id:'sc14', title:'Returning an Item at a Store', level:'A2',
    context:'You bought a jacket yesterday, but when you got home you found a torn seam inside the lining.',
    keyPhrases:['I would like to return this...', 'Here is my receipt.', 'Can I exchange this for a new one?'],
    turns:[
      {speaker:'i', text:'Hello there, how can I help you at customer service today?'},
      {speaker:'u', prompt:'Explain that you bought this yesterday and noticed a defect in the jacket.'},
      {speaker:'i', text:'I am sorry about that. Do you have the original store receipt with you?'},
      {speaker:'u', prompt:'Hand over the receipt and say you would prefer an exchange in size Medium if available.'},
      {speaker:'i', text:'We have that exact model in stock in our stockroom. Would you like me to fetch it?'},
      {speaker:'u', prompt:'Say yes please, inspect it when brought out, and thank the cashier warmly.'}
    ]
  }
];

var QUIZ_BANK = [
  // Grammar
  {q:'Which sentence is correct?', opts:['She don\'t like tea.','She doesn\'t like tea.','She not like tea.','She isn\'t like tea.'], ans:1, skill:'grammar'},
  {q:'Choose the correct form: "If I ___ you, I would study harder."', opts:['am','was','were','be'], ans:2, skill:'grammar'},
  {q:'Which is the present perfect of "go"?', opts:['went','gone','have gone','has go'], ans:2, skill:'grammar'},
  {q:'Select the correct passive voice: "The book ___ by millions."', opts:['read','is read','reads','reading'], ans:1, skill:'grammar'},
  {q:'Choose the correct form: "Neither of them ___ coming."', opts:['are','is','were','have'], ans:1, skill:'grammar'},
  {q:'Which sentence uses the correct article?', opts:['She is honest woman.','She is a honest woman.','She is an honest woman.','She is the honest woman.'], ans:2, skill:'grammar'},
  {q:'Pick the correct question tag: "You\'ve been there, ___?"', opts:['have you','haven\'t you','did you','didn\'t you'], ans:1, skill:'grammar'},
  {q:'Which sentence is in the future perfect?', opts:['I will go.','I will have gone.','I am going.','I went.'], ans:1, skill:'grammar'},
  // Vocabulary
  {q:'What does "meticulous" mean?', opts:['careless','showing great attention to detail','slow','generous'], ans:1, skill:'vocab'},
  {q:'Choose the word closest to "eloquent":', opts:['silent','well-spoken','angry','confused'], ans:1, skill:'vocab'},
  {q:'Which word means "to make something clearer"?', opts:['obscure','complicate','clarify','confuse'], ans:2, skill:'vocab'},
  {q:'"Ubiquitous" means:', opts:['rare','found everywhere','expensive','ancient'], ans:1, skill:'vocab'},
  {q:'What does "persevere" mean?', opts:['give up','try harder','stop immediately','wait quietly'], ans:1, skill:'vocab'},
  {q:'"Concise" writing is:', opts:['long and detailed','brief and clear','confusing','repetitive'], ans:1, skill:'vocab'},
  // Pronunciation / spelling
  {q:'Which word is spelled correctly?', opts:['accomodate','accommodate','acommodate','acomodate'], ans:1, skill:'spelling'},
  {q:'Which word has the stress on the first syllable?', opts:['believe','attract','manage','arrange'], ans:2, skill:'pronunciation'},
  {q:'Which is spelled correctly?', opts:['occurance','occurence','occurrence','ocurrence'], ans:2, skill:'spelling'},
  {q:'The silent letter in "knight" is:', opts:['k','n','g','t'], ans:0, skill:'pronunciation'},
  // Idioms
  {q:'"Hit the nail on the head" means:', opts:['do a repair','say something exactly right','cause pain','miss the point'], ans:1, skill:'vocab'},
  {q:'"Under the weather" means:', opts:['it is raining','feeling unwell','outdoors','confused'], ans:1, skill:'vocab'},
  // CEFR level check
  {q:'Which sentence shows B2-level grammar?', opts:[
    'She go to school.',
    'She goes to school every day.',
    'She has been attending the same school since she was six.',
    'She school.'
  ], ans:2, skill:'grammar'},
  {q:'Which is a correct conditional sentence?', opts:[
    'If he will study, he passes.',
    'If he studied, he will pass.',
    'If he studies, he will pass.',
    'If he study, he pass.'
  ], ans:2, skill:'grammar'},
  {q:'Choose the correct reported speech: She said "I am tired."', opts:[
    'She said she is tired.',
    'She said she was tired.',
    'She said I was tired.',
    'She said she tired.'
  ], ans:1, skill:'grammar'},
  {q:'The plural of "criterion" is:', opts:['criterions','criteria','criterias','criterion'], ans:1, skill:'vocab'},
  {q:'"Notwithstanding" means:', opts:['because of','despite','alongside','therefore'], ans:1, skill:'vocab'},
  {q:'Which sentence is most formal?', opts:[
    'We need to talk about this.',
    'I would like to discuss this matter with you.',
    'Let\'s chat.',
    'Can we talk?'
  ], ans:1, skill:'grammar'},
  {q:'Which phrase correctly uses "whom"?', opts:[
    'Whom is calling?',
    'To whom should I address the letter?',
    'Whom called yesterday?',
    'I know whom did it.'
  ], ans:1, skill:'grammar'},
  {q:'"Panacea" means:', opts:['a solution to all problems','a type of food','a medical procedure','a long journey'], ans:0, skill:'vocab'},
  {q:'Which is spelled correctly?', opts:['recieve','receive','receve','receeve'], ans:1, skill:'spelling'}
];

var COACH_RULES = [
  {pat:/\b(he|she|it)\s+(go|come|eat|play|work|make|do|have)\b/i, fix:'Use -s: "he goes", "she comes", "it works".'},
  {pat:/\b(i|we|you|they)\s+(goes|comes|eats|plays|works|makes|does)\b/i, fix:'"I go", "we come", "they work" — no -s with I/we/you/they.'},
  {pat:/\bI\s+am\s+(agree|disagree|think|know)\b/i, fix:'"I agree" (not "I am agree") — state verbs don\'t use "be".'},
  {pat:/\bdid\s+(not\s+)?(went|came|ate|played|worked|made|did|had)\b/i, fix:'After "did", use base form: "didn\'t go" (not "didn\'t went").'},
  {pat:/\b(a)\s+([aeiou])/i, fix:'Use "an" before vowel sounds: "an apple", "an hour".'},
  {pat:/\bmore\s+(bigger|smaller|faster|slower|better|worse|higher|lower)\b/i, fix:'Don\'t double-compare: "better" (not "more better"), "bigger" (not "more bigger").'},
  {pat:/\bvery\s+unique\b/i, fix:'"Unique" already means one-of-a-kind. Say "truly unique" or just "unique".'},
  {pat:/\bsince\s+\d+\s+(days?|weeks?|months?|years?)\b/i, fix:'Use "for" with a duration: "for 3 days". Use "since" with a point in time: "since Monday".'},
  {pat:/\b(we\s+are|they\s+are|you\s+are)\s+\w+ing\s+to\b/i, fix:'Check: "We are going to" (future plan) is correct. "We are wanting to" — use "want to" instead.'},
  {pat:/\bmake\s+(a\s+)?homework\b/i, fix:'"Do homework" — not "make homework". Use "do" for tasks: do homework, do the dishes.'},
  {pat:/\bhave\s+doubt[s]?\b/i, fix:'Say "I have a doubt" → better: "I have a question" or "I\'m not sure about...".'},
  {pat:/\bI\s+am\s+having\s+(a\s+)?(doubt|question|problem)\b/i, fix:'"I have a question" — "have" for possession doesn\'t use -ing form.'},
  {pat:/\bpreponed\b/i, fix:'"Preponed" is not standard English. Say "moved earlier" or "rescheduled to an earlier time".'},
  {pat:/\bkindly\s+(do|please|note|revert|confirm)\b/i, fix:'"Kindly revert" (desi usage) → prefer "Please reply" or "Could you confirm?".'},
  {pat:/\bI\s+will\s+revert\s+back\b/i, fix:'"Revert" already means "go back". Say "I will reply" or "I will get back to you".'},
  {pat:/\b(myself|yourself|himself|herself)\s+is\b/i, fix:'Reflexive pronouns aren\'t subjects. Say "I am", not "Myself is".'},
  {pat:/\bpassout\b/i, fix:'"Passed out" (fainted) or "graduated" — not "passout" as a noun for graduate.'},
  {pat:/\bdo\s+the\s+needful\b/i, fix:'"Do the needful" is very dated. Say "Please take care of this" or "Please handle this".'},
  {pat:/\bon\s+the\s+other\s+hand\s*,?\s+on\s+the\s+other\s+hand\b/i, fix:'Use "on one hand... on the other hand" — not the same phrase twice.'},
  {pat:/\b(could\s+you|can\s+you)\s+revert\b/i, fix:'"Could you reply?" or "Could you get back to me?" — "revert" in this sense is Indian English.'}
];

var COACH_INTENTS = [
  {k:'hello|hi|hey|good morning|good evening', r:'Hello! Great to see you practising today. What shall we work on — grammar, pronunciation, vocabulary, or a mock interview?'},
  {k:'interview|mock|practice interview', r:'Let\'s do a mock interview! I\'ll be the interviewer. Ready? Tell me about yourself in 2–3 sentences.'},
  {k:'grammar|mistake|correct me|fix my', r:'Of course! Just write a sentence or two and I\'ll check it for grammar, word choice, and natural phrasing.'},
  {k:'spell|spelling', r:'Say a word and I\'ll spell it for you, give IPA, and explain any tricky parts.'},
  {k:'mean|meaning|define|what is|what does', r:'Ask me to define any word and I\'ll give you the meaning, an example sentence, and a B2-level synonym.'},
  {k:'pronounce|pronunciation|how to say', r:'Tell me the word or phrase you want to practise and I\'ll guide you through the sounds with IPA tips.'},
  {k:'idiom|phrase|phrasal verb', r:'Great choice! Here\'s one: "burn the midnight oil" = work late into the night. Use it in a sentence to practise?'},
  {k:'vocabulary|word|synonym|upgrade', r:'Let\'s level up your vocabulary! Share a sentence and I\'ll suggest more sophisticated word choices.'},
  {k:'confidence|nervous|shy|scared', r:'Confidence in English comes from daily speaking — even 5 minutes a day works. Let\'s do a quick role-play right now. Ready?'},
  {k:'job|career|work|professional', r:'Professional English is about being clear and polite. Shall we practise formal emails, calls, or interview questions?'},
  {k:'thank|thanks|thank you', r:'You\'re very welcome! Keep practising — consistency beats intensity every time. 💪'},
  {k:'bye|goodbye|see you|cya', r:'Goodbye! Come back tomorrow for your daily dose. Every day counts. 🌟'},
  {k:'help|what can you do|features', r:'I can: check your grammar, run a mock interview, explain words/idioms, drill pronunciation, or just chat. What do you need?'},
  {k:'score|level|cefr|my level', r:'Check My Trainer for your current skill radar and CEFR estimate. Complete the Level Test for a fresh placement!'},
  {k:'accent|sound like|native', r:'A neutral, clear accent comes from mastering vowel length and stress. The Clarity Studio and Pronunciation Lab are great places to start.'},
  {k:'writing|email|formal|letter', r:'For formal writing: short sentences, active voice, specific nouns. Want to share a draft for me to review?'},
  {k:'tense|past|present|future|perfect', r:'Tenses are patterns, not rules. Which one trips you up? I\'ll give you the formula + three spoken examples.'},
  {k:'article|a|an|the', r:'"A/An" for first mention or non-specific. "The" for specific, known things. No article for general plurals: "Dogs are loyal."'},
  {k:'repeat|again|say again', r:'Of course — let me repeat that for you. Just ask for any word or phrase and I\'ll say it slowly.'},
  {k:'joke|fun|game', r:'Let\'s play "Finish the sentence"! I start: "If I could speak English perfectly, I would..." — now you finish it!'}
];

var COACH_UPGRADES = [
  {basic:'I think that', better:'In my view,', adv:'From my perspective,'},
  {basic:'very good', better:'excellent', adv:'exceptional'},
  {basic:'very bad', better:'terrible', adv:'dreadful'},
  {basic:'very big', better:'enormous', adv:'colossal'},
  {basic:'very small', better:'tiny', adv:'minuscule'},
  {basic:'very happy', better:'delighted', adv:'elated'},
  {basic:'very sad', better:'miserable', adv:'despondent'},
  {basic:'very tired', better:'exhausted', adv:'drained'},
  {basic:'very surprised', better:'astonished', adv:'flabbergasted'},
  {basic:'very angry', better:'furious', adv:'incensed'},
  {basic:'very scared', better:'terrified', adv:'petrified'},
  {basic:'very funny', better:'hilarious', adv:'side-splitting'},
  {basic:'get', better:'obtain', adv:'acquire'},
  {basic:'make sure', better:'ensure', adv:'ascertain'},
  {basic:'find out', better:'discover', adv:'ascertain'},
  {basic:'look at', better:'examine', adv:'scrutinise'},
  {basic:'go up', better:'increase', adv:'escalate'},
  {basic:'go down', better:'decrease', adv:'plummet'},
  {basic:'show', better:'demonstrate', adv:'illustrate'},
  {basic:'start', better:'commence', adv:'initiate'}
];

var COACH_INTERVIEW = [
  'Tell me about yourself and your background.',
  'What is your greatest professional strength?',
  'Describe a challenge you faced and how you overcame it.',
  'Where do you see yourself in five years?',
  'Why are you interested in this position?',
  'How do you handle working under pressure?',
  'Give me an example of when you showed leadership.',
  'What is your biggest weakness and how are you working on it?',
  'How do you prioritise when you have multiple deadlines?',
  'Do you have any questions for me?'
];

/* =====================================================================
   data2.js — ES5 ONLY
   COURSE (44 lessons · 4 stages), CLARITY_DATA, IDIOMS (48), PVS (48),
   QUOTES, DAILY_SEEDS, POWER_WORDS (60)
   ===================================================================== */

/* ── 44 LESSONS ─────────────────────────────────────────────────────── */
var COURSE = [
  /* ══ STAGE 1 — SURVIVOR (lessons 1–11) ═════════════════════════════ */
  {
    id:'L01', stage:1, title:'Simple Present — Be',
    goal:'Use am/is/are confidently in statements, negatives, and questions.',
    pattern:[
      {eng:'I am a student.', note:'am → only with I'},
      {eng:'She is friendly.', note:'is → he/she/it'},
      {eng:'They are from India.', note:'are → we/you/they'},
      {eng:'Are you tired?', note:'Invert for questions'},
      {eng:'He isn\'t here.', note:'is + not = isn\'t'}
    ],
    warn:'Desi trap: "I am having a doubt." → Say "I have a question."',
    missions:[
      {prompt:'Say: "My name is [your name] and I am from [your city]."', expected:'my name is and i am from'},
      {prompt:'Say: "She is not available right now."', expected:'she is not available right now'}
    ]
  },
  {
    id:'L02', stage:1, title:'Simple Present — Action Verbs',
    goal:'Form correct simple present for regular verbs across all persons.',
    pattern:[
      {eng:'I work every day.', note:'base form with I/we/you/they'},
      {eng:'She works late.', note:'add -s with he/she/it'},
      {eng:'He doesn\'t like spicy food.', note:'doesn\'t = does + not'},
      {eng:'Do they speak English?', note:'Do for questions'},
      {eng:'Does she travel often?', note:'Does for he/she/it'}
    ],
    warn:'Desi trap: "He don\'t know." → "He doesn\'t know."',
    missions:[
      {prompt:'Say: "My friend works in a software company."', expected:'my friend works in a software company'},
      {prompt:'Say: "Does she speak Hindi?"', expected:'does she speak hindi'}
    ]
  },
  {
    id:'L03', stage:1, title:'Simple Past',
    goal:'Talk about completed events using regular and key irregular past forms.',
    pattern:[
      {eng:'I walked to the office.', note:'regular: add -ed'},
      {eng:'She went to the market.', note:'irregular: go → went'},
      {eng:'He didn\'t eat breakfast.', note:'didn\'t + base form'},
      {eng:'Did you call her?', note:'Did + subject + base'},
      {eng:'They arrived late yesterday.', note:'time words confirm past'}
    ],
    warn:'Desi trap: "He didn\'t went." → "He didn\'t go." (base form after did)',
    missions:[
      {prompt:'Say: "Yesterday I woke up at six and went for a walk."', expected:'yesterday i woke up at six and went for a walk'},
      {prompt:'Say: "She didn\'t attend the meeting."', expected:'she did not attend the meeting'}
    ]
  },
  {
    id:'L04', stage:1, title:'Present Continuous',
    goal:'Describe ongoing actions and future plans using is/are + -ing.',
    pattern:[
      {eng:'I am reading a book.', note:'am + -ing = right now'},
      {eng:'She is studying for exams.', note:'is + -ing'},
      {eng:'They are not coming today.', note:'are + not + -ing'},
      {eng:'What are you doing?', note:'question: what + are + -ing'},
      {eng:'He is meeting the client tomorrow.', note:'-ing for arranged future'}
    ],
    warn:'Desi trap: "I am knowing the answer." → "I know the answer." (stative verbs don\'t use -ing)',
    missions:[
      {prompt:'Say: "I am currently working on a very important project."', expected:'i am currently working on a very important project'},
      {prompt:'Say: "What are you planning to do this weekend?"', expected:'what are you planning to do this weekend'}
    ]
  },
  {
    id:'L05', stage:1, title:'Articles — A, An, The',
    goal:'Use a/an/the correctly with first/second mention and specific nouns.',
    pattern:[
      {eng:'I saw a dog.', note:'a = first mention, non-specific'},
      {eng:'The dog was black.', note:'the = second mention, specific'},
      {eng:'She is an engineer.', note:'an before vowel sounds'},
      {eng:'He is an honest person.', note:'silent h → "an hour"'},
      {eng:'Dogs are loyal. (no article)', note:'no article for general plurals'}
    ],
    warn:'Desi trap: "She is honest woman." → "She is an honest woman."',
    missions:[
      {prompt:'Say: "I have a cat. The cat is very playful."', expected:'i have a cat the cat is very playful'},
      {prompt:'Say: "She is an honest and hardworking employee."', expected:'she is an honest and hardworking employee'}
    ]
  },
  {
    id:'L06', stage:1, title:'Questions & Negatives',
    goal:'Form yes/no questions, wh-questions, and negatives naturally.',
    pattern:[
      {eng:'Do you like coffee?', note:'Do + subject + base verb'},
      {eng:'Where does she live?', note:'Wh + does + subject + base'},
      {eng:'I don\'t understand.', note:'don\'t = do + not'},
      {eng:'Why didn\'t you call me?', note:'Why + didn\'t + subject + base'},
      {eng:'Who did you meet?', note:'Who is the object here'}
    ],
    warn:'Desi trap: "Where she lives?" → "Where does she live?"',
    missions:[
      {prompt:'Say: "Why didn\'t you come to the party yesterday?"', expected:'why did not you come to the party yesterday'},
      {prompt:'Say: "I don\'t know what time the meeting starts."', expected:'i do not know what time the meeting starts'}
    ]
  },
  {
    id:'L07', stage:1, title:'Prepositions of Time & Place',
    goal:'Use in/on/at for time and place without guessing.',
    pattern:[
      {eng:'I was born in 1998.', note:'in: years, months, decades'},
      {eng:'The meeting is on Monday.', note:'on: days, specific dates'},
      {eng:'It starts at 9 o\'clock.', note:'at: clock times'},
      {eng:'She lives in Mumbai.', note:'in: cities, countries'},
      {eng:'Meet me at the gate.', note:'at: specific points'}
    ],
    warn:'Desi trap: "at morning" → "in the morning"; "at Tuesday" → "on Tuesday"',
    missions:[
      {prompt:'Say: "The conference is on Friday at three in the afternoon."', expected:'the conference is on friday at three in the afternoon'},
      {prompt:'Say: "She has lived in London since 2019."', expected:'she has lived in london since two thousand nineteen'}
    ]
  },
  {
    id:'L08', stage:1, title:'Plurals & Countable/Uncountable',
    goal:'Apply correct plural rules and avoid uncountable noun errors.',
    pattern:[
      {eng:'There are three chairs.', note:'countable → plural'},
      {eng:'I need some water.', note:'water = uncountable, no plural'},
      {eng:'She gave me useful advice.', note:'advice = uncountable (never "advices")'},
      {eng:'We have a lot of work.', note:'"a lot of" works for both'},
      {eng:'How much time do we have?', note:'much for uncountable'}
    ],
    warn:'Desi trap: "Give me some informations." → "Give me some information."',
    missions:[
      {prompt:'Say: "She gave me very useful advice about the interview."', expected:'she gave me very useful advice about the interview'},
      {prompt:'Say: "How much time do we have before the meeting?"', expected:'how much time do we have before the meeting'}
    ]
  },
  {
    id:'L09', stage:1, title:'There Is & There Are',
    goal:'Describe the existence and quantity of things accurately in statements and questions.',
    pattern:[
      {eng:'There is a mistake in this invoice.', note:'there is + singular countable noun'},
      {eng:'There are several options available.', note:'there are + plural noun'},
      {eng:'There isn\'t any milk left in the fridge.', note:'negative with uncountable noun'},
      {eng:'Are there any questions before we proceed?', note:'inverted for questions'},
      {eng:'There was a productive meeting yesterday.', note:'past form: there was/were'}
    ],
    warn:'Desi trap: "There is three people." → "There are three people." (match verb to plural subject)',
    missions:[
      {prompt:'Say: "There are several important points we need to discuss today."', expected:'there are several important points we need to discuss today'},
      {prompt:'Say: "Is there any coffee left in the break room?"', expected:'is there any coffee left in the break room'}
    ]
  },
  {
    id:'L10', stage:1, title:'Comparatives & Superlatives',
    goal:'Compare people, objects, and performance using regular and irregular comparative structures.',
    pattern:[
      {eng:'This new laptop is faster than mine.', note:'short adjectives: add -er + than'},
      {eng:'This design is more practical than the old one.', note:'long adjectives: more + adjective + than'},
      {eng:'She is the best speaker on our team.', note:'the + superlative form (good → best)'},
      {eng:'It is not as expensive as I thought.', note:'as ... as for equal comparison'},
      {eng:'Things are getting better and better.', note:'double comparative for continuous progress'}
    ],
    warn:'Desi trap: "more better" or "most fastest" → never combine more/most with -er/-est.',
    missions:[
      {prompt:'Say: "This solution is much more effective than our previous approach."', expected:'this solution is much more effective than our previous approach'},
      {prompt:'Say: "Public transport here is not as convenient as it is back home."', expected:'public transport here is not as convenient as it is back home'}
    ]
  },
  {
    id:'L11', stage:1, title:'Pronouns & Possessives',
    goal:'Master subject, object, possessive adjectives, and possessive pronouns without confusion.',
    pattern:[
      {eng:'This notebook is mine, not yours.', note:'possessive pronouns: mine, yours, hers, theirs'},
      {eng:'She told him about our project.', note:'subject pronoun (she) + object pronoun (him)'},
      {eng:'Everyone brought their own laptop.', note:'singular "everyone" with gender-neutral "their"'},
      {eng:'Whose jacket is this on the chair?', note:'whose = possessive question word (not "who\'s")'},
      {eng:'Between you and me, the decision was fair.', note:'preposition + object pronoun (between you and me)'}
    ],
    warn:'Desi trap: "Between you and I..." → "Between you and me." (prepositions govern object pronouns)',
    missions:[
      {prompt:'Say: "Between you and me, I think this is a fantastic opportunity."', expected:'between you and me i think this is a fantastic opportunity'},
      {prompt:'Say: "Whose laptop is this on the conference table?"', expected:'whose laptop is this on the conference table'}
    ]
  },
  /* ══ STAGE 2 — BUILDER (lessons 12–22) ═════════════════════════════ */
  {
    id:'L12', stage:2, title:'Present Perfect',
    goal:'Connect past experience and recent events to the present moment.',
    pattern:[
      {eng:'I have visited three countries.', note:'have + past participle: life experience'},
      {eng:'She has just called you.', note:'just = very recently'},
      {eng:'Have you ever eaten sushi?', note:'ever = at any time in life'},
      {eng:'He hasn\'t finished yet.', note:'yet = expectation not met'},
      {eng:'They have been friends for years.', note:'for + duration'}
    ],
    warn:'Desi trap: "I did that before." (when no time is given) → "I have done that before."',
    missions:[
      {prompt:'Say: "I have never eaten sushi but I have tried many other cuisines."', expected:'i have never eaten sushi but i have tried many other cuisines'},
      {prompt:'Say: "She hasn\'t finished the report yet."', expected:'she has not finished the report yet'}
    ]
  },
  {
    id:'L13', stage:2, title:'Modal Verbs — Can, Could, Should',
    goal:'Express ability, possibility, and advice using modal verbs correctly.',
    pattern:[
      {eng:'I can speak three languages.', note:'can = present ability'},
      {eng:'Could you help me please?', note:'could = polite request'},
      {eng:'You should drink more water.', note:'should = advice'},
      {eng:'She should have called earlier.', note:'should have + past participle: missed obligation'},
      {eng:'Can I take a message?', note:'can for informal permission'}
    ],
    warn:'Desi trap: "I can able to do it." → "I can do it." (never "can able")',
    missions:[
      {prompt:'Say: "You should have prepared for the presentation more carefully."', expected:'you should have prepared for the presentation more carefully'},
      {prompt:'Say: "Could you please send me the report by Friday?"', expected:'could you please send me the report by friday'}
    ]
  },
  {
    id:'L14', stage:2, title:'Future Forms',
    goal:'Choose between will, going to, and present continuous for future.',
    pattern:[
      {eng:'I will help you.', note:'will: spontaneous offer or promise'},
      {eng:'I\'m going to study tonight.', note:'going to: plan already decided'},
      {eng:'She\'s meeting him at 5.', note:'present continuous: arranged future'},
      {eng:'It will probably rain.', note:'will for prediction with evidence'},
      {eng:'By next year, I will have graduated.', note:'future perfect'}
    ],
    warn:'Desi trap: "I will come there tomorrow" for an arranged plan → prefer "I\'m coming there tomorrow."',
    missions:[
      {prompt:'Say: "I\'m going to apply for a new job next month."', expected:'i am going to apply for a new job next month'},
      {prompt:'Say: "Don\'t worry, I\'ll handle it right away."', expected:'do not worry i will handle it right away'}
    ]
  },
  {
    id:'L15', stage:2, title:'Conditional Sentences — Zero & First',
    goal:'Construct zero and first conditional sentences with natural phrasing.',
    pattern:[
      {eng:'If you heat water, it boils.', note:'zero: always true facts'},
      {eng:'If I study, I will pass.', note:'first: realistic future condition'},
      {eng:'If she calls, I\'ll pick up.', note:'contracted form sounds natural'},
      {eng:'Unless you hurry, you\'ll be late.', note:'unless = if not'},
      {eng:'What will you do if you miss the flight?', note:'wh + will for first conditional question'}
    ],
    warn:'Desi trap: "If he will come, I will tell him." → "If he comes, I will tell him." (no will in if-clause)',
    missions:[
      {prompt:'Say: "If you work hard, you will achieve your goals."', expected:'if you work hard you will achieve your goals'},
      {prompt:'Say: "Unless she apologises, I won\'t speak to her."', expected:'unless she apologises i will not speak to her'}
    ]
  },
  {
    id:'L16', stage:2, title:'Passive Voice',
    goal:'Form passive sentences in present, past, and future tenses.',
    pattern:[
      {eng:'The report is written by the team.', note:'present passive: is + past participle'},
      {eng:'The window was broken.', note:'past passive: was + past participle'},
      {eng:'The results will be announced soon.', note:'future passive: will be + past participle'},
      {eng:'English is spoken worldwide.', note:'by-agent often omitted'},
      {eng:'She has been promoted.', note:'perfect passive: has/have been + past participle'}
    ],
    warn:'Desi trap: Overusing passive in spoken English. In conversation, active voice sounds more natural.',
    missions:[
      {prompt:'Say: "The project was completed ahead of schedule by the team."', expected:'the project was completed ahead of schedule by the team'},
      {prompt:'Say: "The new policy will be implemented from next month."', expected:'the new policy will be implemented from next month'}
    ]
  },
  {
    id:'L17', stage:2, title:'Relative Clauses',
    goal:'Add information to nouns using who, which, that, where correctly.',
    pattern:[
      {eng:'The man who called you is my boss.', note:'who = for people'},
      {eng:'The book which I read was brilliant.', note:'which = for things'},
      {eng:'That\'s the office where I used to work.', note:'where = for places'},
      {eng:'She\'s the person that I told you about.', note:'that: informal relative'},
      {eng:'The meeting, which lasted an hour, was useful.', note:'non-defining: commas required'}
    ],
    warn:'Desi trap: "The man, who is my friend, he helped me." → remove "he" — the clause replaces it.',
    missions:[
      {prompt:'Say: "The colleague who helped me with the project has been promoted."', expected:'the colleague who helped me with the project has been promoted'},
      {prompt:'Say: "This is the city where I grew up and went to school."', expected:'this is the city where i grew up and went to school'}
    ]
  },
  {
    id:'L18', stage:2, title:'Reported Speech',
    goal:'Shift direct speech into reported speech with correct tense backshift.',
    pattern:[
      {eng:'She said she was tired.', note:'am → was (backshift)'},
      {eng:'He told me he had finished.', note:'has → had (backshift)'},
      {eng:'She asked if I was ready.', note:'if-clause for yes/no questions'},
      {eng:'He asked where I lived.', note:'wh-word for wh-questions'},
      {eng:'She told me to be careful.', note:'tell + to infinitive for commands'}
    ],
    warn:'Desi trap: "She said that she is tired." → use "was" for past reporting.',
    missions:[
      {prompt:'Say: "He told me that he had already submitted the application."', expected:'he told me that he had already submitted the application'},
      {prompt:'Say: "She asked me whether I was available on Friday."', expected:'she asked me whether i was available on friday'}
    ]
  },
  {
    id:'L19', stage:2, title:'Gerunds & Infinitives',
    goal:'Know which verbs take -ing and which take to + infinitive.',
    pattern:[
      {eng:'I enjoy reading novels.', note:'enjoy + gerund (-ing)'},
      {eng:'She wants to travel abroad.', note:'want + infinitive (to + base)'},
      {eng:'He stopped smoking last year.', note:'stop + gerund'},
      {eng:'I\'d like to speak to the manager.', note:'would like + infinitive'},
      {eng:'Practising daily is the key.', note:'gerund as subject'}
    ],
    warn:'Desi trap: "I am enjoy doing it." → "I enjoy doing it." No "am" with enjoy.',
    missions:[
      {prompt:'Say: "She decided to stop procrastinating and start working immediately."', expected:'she decided to stop procrastinating and start working immediately'},
      {prompt:'Say: "I enjoy meeting new people and learning about different cultures."', expected:'i enjoy meeting new people and learning about different cultures'}
    ]
  },
  {
    id:'L20', stage:2, title:'Used to & Would (Past Habits)',
    goal:'Describe discontinued past habits, repeated actions, and past states naturally.',
    pattern:[
      {eng:'I used to live in Hyderabad.', note:'used to + base verb: past state no longer true'},
      {eng:'Every summer, we would visit our grandparents.', note:'would + base verb: repeated past action (not states)'},
      {eng:'I didn\'t use to drink coffee.', note:'negative: didn\'t use to (no "d")'},
      {eng:'Did you use to play football in school?', note:'question: did you use to...'},
      {eng:'I am used to waking up early now.', note:'be used to + -ing: accustomed to (different meaning)'}
    ],
    warn:'Desi trap: "I am used to wake up early." → "I am used to waking up early." (be used to + gerund)',
    missions:[
      {prompt:'Say: "I used to live in Chennai, but now I work in Bengaluru."', expected:'i used to live in chennai but now i work in bengaluru'},
      {prompt:'Say: "Every weekend, we would play cricket in the local park."', expected:'every weekend we would play cricket in the local park'}
    ]
  },
  {
    id:'L21', stage:2, title:'Quantifiers — Much, Many, Few, Little',
    goal:'Express quantities accurately with countable and uncountable nouns.',
    pattern:[
      {eng:'We don\'t have much time before the flight.', note:'much + uncountable (negatives/questions)'},
      {eng:'How many attendees registered for the webinar?', note:'many + plural countable'},
      {eng:'I have a few questions about the proposal.', note:'a few = some (positive connotation)'},
      {eng:'There is little hope of recovering the file.', note:'little = almost none (negative connotation)'},
      {eng:'A little patience will solve this problem.', note:'a little = a small amount (positive)'}
    ],
    warn:'Desi trap: "few" vs "a few" — "few people came" (disappointment); "a few people came" (satisfaction).',
    missions:[
      {prompt:'Say: "We have a few questions before we make a final decision."', expected:'we have a few questions before we make a final decision'},
      {prompt:'Say: "There is little doubt that renewable energy is the future."', expected:'there is little doubt that renewable energy is the future'}
    ]
  },
  {
    id:'L22', stage:2, title:'Past Continuous & Interrupted Past',
    goal:'Set past narrative scenes and describe actions interrupted by another event.',
    pattern:[
      {eng:'I was writing an email when the power went out.', note:'was/were + -ing interrupted by past simple'},
      {eng:'While she was speaking, everyone listened intently.', note:'while + past continuous for background activity'},
      {eng:'Were you working when I phoned you?', note:'inverted question in past continuous'},
      {eng:'It was raining heavily when we left the venue.', note:'setting the descriptive scene'},
      {eng:'They were discussing the budget all afternoon.', note:'continuous duration across past period'}
    ],
    warn:'Desi trap: "When I was reaching there..." → "When I reached there..." (reaching is momentary, not continuous).',
    missions:[
      {prompt:'Say: "I was reviewing the document when the client called me."', expected:'i was reviewing the document when the client called me'},
      {prompt:'Say: "While she was presenting, the audience listened with great interest."', expected:'while she was presenting the audience listened with great interest'}
    ]
  },
  /* ══ STAGE 3 — SPEAKER (lessons 23–33) ═════════════════════════════ */
  {
    id:'L23', stage:3, title:'Second & Third Conditionals',
    goal:'Talk about hypothetical and regretted situations with confidence.',
    pattern:[
      {eng:'If I were you, I would apologise.', note:'second: unreal present/future'},
      {eng:'If she had studied, she would have passed.', note:'third: unreal past'},
      {eng:'I wish I had more time.', note:'wish + past for present regret'},
      {eng:'I wish I had called earlier.', note:'wish + past perfect for past regret'},
      {eng:'If only I had listened!', note:'if only: strong regret'}
    ],
    warn:'Desi trap: "If I would have known, I would have come." → "If I had known, I would have come."',
    missions:[
      {prompt:'Say: "If I had known about the problem, I would have fixed it immediately."', expected:'if i had known about the problem i would have fixed it immediately'},
      {prompt:'Say: "I wish I had taken that opportunity when I had the chance."', expected:'i wish i had taken that opportunity when i had the chance'}
    ]
  },
  {
    id:'L24', stage:3, title:'Discourse Markers & Cohesion',
    goal:'Connect ideas fluently using linking words and discourse markers.',
    pattern:[
      {eng:'However, the results were surprising.', note:'however: contrast'},
      {eng:'Furthermore, we need to reduce costs.', note:'furthermore: addition (formal)'},
      {eng:'As a result, the project was delayed.', note:'as a result: consequence'},
      {eng:'In other words, it wasn\'t working.', note:'in other words: clarifying'},
      {eng:'Despite the challenges, she succeeded.', note:'despite + noun/gerund'}
    ],
    warn:'Desi trap: Starting every sentence with "So" or "Actually" — vary your connectors.',
    missions:[
      {prompt:'Say: "The project was challenging. However, the team delivered excellent results."', expected:'the project was challenging however the team delivered excellent results'},
      {prompt:'Say: "Despite the rain, the event was a huge success."', expected:'despite the rain the event was a huge success'}
    ]
  },
  {
    id:'L25', stage:3, title:'Advanced Questions',
    goal:'Use indirect questions and question tags naturally in conversation.',
    pattern:[
      {eng:'Could you tell me where the office is?', note:'indirect: no inversion after wh-word'},
      {eng:'Do you know if she\'s coming?', note:'if clause in indirect question'},
      {eng:'It\'s a lovely day, isn\'t it?', note:'question tag: positive → negative'},
      {eng:'You haven\'t called, have you?', note:'negative → positive tag'},
      {eng:'I wonder what time it is.', note:'wonder + indirect question'}
    ],
    warn:'Desi trap: "Could you tell me where is the office?" → no inversion in embedded questions.',
    missions:[
      {prompt:'Say: "Could you tell me when the next meeting is scheduled?"', expected:'could you tell me when the next meeting is scheduled'},
      {prompt:'Say: "You\'ve been to London before, haven\'t you?"', expected:'you have been to london before have not you'}
    ]
  },
  {
    id:'L26', stage:3, title:'Emphatic Structures',
    goal:'Use cleft sentences, inversion, and stress for emphasis and clarity.',
    pattern:[
      {eng:'It was the training that made the difference.', note:'it-cleft: emphasise subject'},
      {eng:'What I need is more practice.', note:'what-cleft: emphasise object'},
      {eng:'Never have I felt so motivated.', note:'inversion after negative adverb'},
      {eng:'Not only did she pass, she excelled.', note:'not only inversion'},
      {eng:'Do sit down.', note:'"do" adds emphasis to imperative'}
    ],
    warn:'Advanced tip: Only use inversion in formal/written contexts. In conversation, stress does the same job.',
    missions:[
      {prompt:'Say: "It was the feedback from my manager that really helped me improve."', expected:'it was the feedback from my manager that really helped me improve'},
      {prompt:'Say: "Not only did she finish first, she also helped her colleagues."', expected:'not only did she finish first she also helped her colleagues'}
    ]
  },
  {
    id:'L27', stage:3, title:'Concession & Contrast',
    goal:'Present balanced arguments and acknowledge opposing views.',
    pattern:[
      {eng:'Although the deadline was tight, we managed.', note:'although: concession before main clause'},
      {eng:'While I understand your point, I disagree.', note:'while: simultaneous contrast'},
      {eng:'Admittedly, it\'s not perfect.', note:'admittedly: concession adverb'},
      {eng:'Even though she was tired, she stayed.', note:'even though: stronger than although'},
      {eng:'He is experienced. That said, he made mistakes.', note:'that said: pivot after concession'}
    ],
    warn:'Desi trap: "Although, but..." → never combine although with but in the same sentence.',
    missions:[
      {prompt:'Say: "Although the work was difficult, I managed to complete it on time."', expected:'although the work was difficult i managed to complete it on time'},
      {prompt:'Say: "Even though I was nervous, I delivered the presentation confidently."', expected:'even though i was nervous i delivered the presentation confidently'}
    ]
  },
  {
    id:'L28', stage:3, title:'Phrasal Verbs in Context',
    goal:'Use high-frequency phrasal verbs naturally in professional and daily speech.',
    pattern:[
      {eng:'I need to follow up on that email.', note:'follow up: take further action'},
      {eng:'She brought up an interesting point.', note:'bring up: mention in conversation'},
      {eng:'We had to put off the meeting.', note:'put off: postpone'},
      {eng:'I\'ll look into the issue right away.', note:'look into: investigate'},
      {eng:'He came across as very confident.', note:'come across: give impression'}
    ],
    warn:'Desi trap: "I will revert back." → "I will follow up" or "I will get back to you."',
    missions:[
      {prompt:'Say: "I will look into the matter and follow up with you by tomorrow."', expected:'i will look into the matter and follow up with you by tomorrow'},
      {prompt:'Say: "She brought up some really useful points during the discussion."', expected:'she brought up some really useful points during the discussion'}
    ]
  },
  {
    id:'L29', stage:3, title:'Hedging & Tentative Language',
    goal:'Sound professional and measured using hedging expressions.',
    pattern:[
      {eng:'It seems like there might be an issue.', note:'seems + might: double hedge'},
      {eng:'I would suggest perhaps revising the plan.', note:'would + perhaps: polite suggestion'},
      {eng:'Broadly speaking, the results are positive.', note:'broadly speaking: general statement'},
      {eng:'There\'s a tendency for this to happen.', note:'tendency: soften claims'},
      {eng:'It could be argued that we need more data.', note:'passive hedge: distance from claim'}
    ],
    warn:'Over-hedging sounds weak. Hedge for genuine uncertainty, not to avoid commitment.',
    missions:[
      {prompt:'Say: "It seems like there might be a slight issue with the calculations."', expected:'it seems like there might be a slight issue with the calculations'},
      {prompt:'Say: "I would suggest perhaps taking a different approach to this problem."', expected:'i would suggest perhaps taking a different approach to this problem'}
    ]
  },
  {
    id:'L30', stage:3, title:'Formal vs. Informal Register',
    goal:'Switch register appropriately between formal and conversational English.',
    pattern:[
      {eng:'I\'m writing to enquire about... (formal)', note:'formal: full words, polite distance'},
      {eng:'Just checking — when\'s the meeting? (informal)', note:'informal: contractions, ellipsis'},
      {eng:'I would be grateful if you could... (formal)', note:'conditional + modal for formality'},
      {eng:'Could you get back to me? (neutral)', note:'neutral: polite but not stiff'},
      {eng:'Regarding your query... (formal)', note:'"regarding" lifts formality'}
    ],
    warn:'Desi trap: Mixing "kindly do the needful" (archaic formal) into modern professional writing.',
    missions:[
      {prompt:'Say: "I am writing to enquire about the status of my application."', expected:'i am writing to enquire about the status of my application'},
      {prompt:'Say: "I would be grateful if you could send me the details by end of day."', expected:'i would be grateful if you could send me the details by end of day'}
    ]
  },
  {
    id:'L31', stage:3, title:'Mixed Conditionals',
    goal:'Express how hypothetical past actions shape present circumstances, and vice-versa.',
    pattern:[
      {eng:'If I had accepted that offer, I would be living in London now.', note:'past condition → present result'},
      {eng:'If she were more patient, she wouldn\'t have lost her temper.', note:'present trait → past result'},
      {eng:'Had you warned us earlier, we wouldn\'t be in this crisis.', note:'inverted formal past condition'},
      {eng:'If I hadn\'t taken this course, my English wouldn\'t be this fluent.', note:'unreal past action → present competence'},
      {eng:'If he spoke fluent German, he would have secured the Munich assignment.', note:'present competence → past outcome'}
    ],
    warn:'Desi trap: Mixing up tenses haphazardly — always identify whether the cause or the effect is in the past vs present.',
    missions:[
      {prompt:'Say: "If I had taken that opportunity, I would be much happier today."', expected:'if i had taken that opportunity i would be much happier today'},
      {prompt:'Say: "If we had left ten minutes earlier, we wouldn\'t be stuck in traffic."', expected:'if we had left ten minutes earlier we would not be stuck in traffic'}
    ]
  },
  {
    id:'L32', stage:3, title:'Participle Clauses',
    goal:'Synthesise complex sentences concisely using present, past, and perfect participle clauses.',
    pattern:[
      {eng:'Having reviewed the data, the committee approved the budget.', note:'having + past participle: completed prior action'},
      {eng:'Walking into the auditorium, she felt a surge of excitement.', note:'-ing participle: simultaneous background action'},
      {eng:'Built in the sixteenth century, the palace remains immaculate.', note:'past participle: passive background description'},
      {eng:'Not knowing the answer, he wisely asked for clarification.', note:'negative participle clause'},
      {eng:'Viewed from this angle, the problem is straightforward.', note:'conditional/perspectival participle'}
    ],
    warn:'Dangling participle trap: Ensure the implied subject of the participle matches the subject of the main clause.',
    missions:[
      {prompt:'Say: "Having completed the analysis, she presented the findings to the executive team."', expected:'having completed the analysis she presented the findings to the executive team'},
      {prompt:'Say: "Recognising the urgency, we immediately dispatched an engineering specialist."', expected:'recognising the urgency we immediately dispatched an engineering specialist'}
    ]
  },
  {
    id:'L33', stage:3, title:'Cleft Sentences for Focus',
    goal:'Emphasise critical information and guide listener attention with it-clefts and wh-clefts.',
    pattern:[
      {eng:'What we need most right now is reliable customer feedback.', note:'wh-cleft: what + clause + is/was + focus'},
      {eng:'It was Sarah who first identified the discrepancy in the ledger.', note:'it-cleft: it + is/was + focus + who/that'},
      {eng:'All I am asking for is twenty-four hours to verify the numbers.', note:'all-cleft: all + clause + is + focus'},
      {eng:'What surprised everyone was the speed of the recovery.', note:'wh-cleft highlighting reaction'},
      {eng:'It was because of your guidance that the project succeeded.', note:'it-cleft highlighting cause'}
    ],
    warn:'Cleft sentences are powerful rhetorical tools. Use them to highlight pivotal points, not in every sentence.',
    missions:[
      {prompt:'Say: "What we really need to focus on is improving user satisfaction."', expected:'what we really need to focus on is improving user satisfaction'},
      {prompt:'Say: "It was the dedication of the entire team that ensured our success."', expected:'it was the dedication of the entire team that ensured our success'}
    ]
  },
  /* ══ STAGE 4 — MASTER (lessons 34–44) ═════════════════════════════ */
  {
    id:'L34', stage:4, title:'Perfect Tenses Mastery',
    goal:'Distinguish and use all four perfect tenses accurately.',
    pattern:[
      {eng:'I have lived here for ten years.', note:'present perfect: ongoing'},
      {eng:'She had left before I arrived.', note:'past perfect: earlier of two pasts'},
      {eng:'By 2030, I will have retired.', note:'future perfect: before a future point'},
      {eng:'She has been working all day.', note:'present perfect continuous: duration focus'},
      {eng:'I had been waiting for an hour.', note:'past perfect continuous: duration before past event'}
    ],
    warn:'Desi trap: "I am working here since 2020." → "I have been working here since 2020."',
    missions:[
      {prompt:'Say: "By the time she arrived, I had already been waiting for two hours."', expected:'by the time she arrived i had already been waiting for two hours'},
      {prompt:'Say: "I have been studying English seriously for the past six months."', expected:'i have been studying english seriously for the past six months'}
    ]
  },
  {
    id:'L35', stage:4, title:'Advanced Modals',
    goal:'Express deduction, obligation, permission, and criticism with advanced modals.',
    pattern:[
      {eng:'She must be exhausted.', note:'must: logical deduction (present)'},
      {eng:'He can\'t have done it.', note:'can\'t have: strong impossibility (past)'},
      {eng:'They may have missed the train.', note:'may have: past possibility'},
      {eng:'You ought to apologise.', note:'ought to: duty (≈ should, more formal)'},
      {eng:'You needn\'t have worried.', note:'needn\'t have: unnecessary past action'}
    ],
    warn:'Desi trap: "He is must to come." → "He must come." (no "is" before modal)',
    missions:[
      {prompt:'Say: "She must have been working incredibly hard to achieve those results."', expected:'she must have been working incredibly hard to achieve those results'},
      {prompt:'Say: "You needn\'t have prepared so many slides — five would have been enough."', expected:'you need not have prepared so many slides five would have been enough'}
    ]
  },
  {
    id:'L36', stage:4, title:'Nominalisations & Academic Style',
    goal:'Convert verbs to noun phrases for formal and academic writing.',
    pattern:[
      {eng:'The discovery of new evidence changed everything.', note:'discover → discovery'},
      {eng:'Her refusal to cooperate surprised us.', note:'refuse → refusal'},
      {eng:'There was significant improvement in scores.', note:'improve → improvement'},
      {eng:'The implementation of the plan was delayed.', note:'implement → implementation'},
      {eng:'His contribution to the field is enormous.', note:'contribute → contribution'}
    ],
    warn:'Nominalisation is a formality tool. Don\'t overuse in speech — it sounds unnatural.',
    missions:[
      {prompt:'Say: "The implementation of the new strategy led to a significant improvement in results."', expected:'the implementation of the new strategy led to a significant improvement in results'},
      {prompt:'Say: "Her contribution to the project deserves formal recognition."', expected:'her contribution to the project deserves formal recognition'}
    ]
  },
  {
    id:'L37', stage:4, title:'Inversion & Fronting',
    goal:'Use fronting and inversion for dramatic emphasis in formal English.',
    pattern:[
      {eng:'Rarely do we see such dedication.', note:'rarely + inversion for emphasis'},
      {eng:'Only then did she understand.', note:'only then: dramatic pivot'},
      {eng:'Under no circumstances will I agree.', note:'under no circumstances: formal refusal'},
      {eng:'So well did he speak that everyone applauded.', note:'so + adjective → inversion'},
      {eng:'Had I known earlier, I would have acted.', note:'had for inversion in 3rd conditional'}
    ],
    warn:'Use inversion sparingly in speech — it\'s mainly a written and formal device.',
    missions:[
      {prompt:'Say: "Under no circumstances will I compromise on quality."', expected:'under no circumstances will i compromise on quality'},
      {prompt:'Say: "Had I realised the importance earlier, I would have prepared better."', expected:'had i realised the importance earlier i would have prepared better'}
    ]
  },
  {
    id:'L38', stage:4, title:'Discourse & Argumentation',
    goal:'Structure a coherent argument with evidence, concession, and conclusion.',
    pattern:[
      {eng:'The primary argument is that education reduces poverty.', note:'primary argument: introduce thesis'},
      {eng:'This is evidenced by the fact that...', note:'evidenced by: introduce data'},
      {eng:'While critics argue that..., the data suggests...', note:'while: acknowledge and counter'},
      {eng:'On balance, the benefits outweigh the drawbacks.', note:'on balance: weighed conclusion'},
      {eng:'It is therefore clear that... requires urgent action.', note:'therefore: logical conclusion'}
    ],
    warn:'Avoid filler arguments: "I think it is very important because it is very important."',
    missions:[
      {prompt:'Say: "On balance, the advantages of learning English far outweigh the challenges."', expected:'on balance the advantages of learning english far outweigh the challenges'},
      {prompt:'Say: "While some argue that technology replaces jobs, the evidence suggests it creates new ones."', expected:'while some argue that technology replaces jobs the evidence suggests it creates new ones'}
    ]
  },
  {
    id:'L39', stage:4, title:'Spoken Fluency Strategies',
    goal:'Maintain flow using fillers, reformulations, and clarification strategies.',
    pattern:[
      {eng:'What I mean is — it\'s complicated.', note:'reformulation: buy time and clarify'},
      {eng:'Let me put it another way.', note:'explicit reformulation marker'},
      {eng:'That\'s a really good question.', note:'buy time while thinking'},
      {eng:'If I understand you correctly...', note:'comprehension check before answering'},
      {eng:'Could you expand on that?', note:'ask for more to organise your answer'}
    ],
    warn:'Avoid "umm/aah" as fillers. Replace with a short pause or "That\'s interesting..."',
    missions:[
      {prompt:'Say: "That\'s a really good question. Let me think about it for a moment."', expected:'that is a really good question let me think about it for a moment'},
      {prompt:'Say: "If I understand you correctly, you\'re asking about the deadline?"', expected:'if i understand you correctly you are asking about the deadline'}
    ]
  },
  {
    id:'L40', stage:4, title:'Nuanced Vocabulary — Connotations',
    goal:'Choose words with the right connotation: positive, negative, or neutral.',
    pattern:[
      {eng:'She is determined. (positive) / stubborn. (negative)', note:'same trait, different spin'},
      {eng:'He is slim. (neutral) / skinny. (slightly negative)', note:'degree changes connotation'},
      {eng:'It\'s a compact flat. (positive) / tiny flat. (negative)', note:'choose the frame you want'},
      {eng:'She smiled. / She smirked. / She grinned.', note:'smile type = attitude shift'},
      {eng:'He said. / He snapped. / He murmured.', note:'verb choice = emotional tone'}
    ],
    warn:'Desi trap: Literal translation from mother tongue ignores connotations entirely.',
    missions:[
      {prompt:'Say: "She is determined to achieve her goals despite all the obstacles."', expected:'she is determined to achieve her goals despite all the obstacles'},
      {prompt:'Say: "He smiled warmly and welcomed everyone to the conference."', expected:'he smiled warmly and welcomed everyone to the conference'}
    ]
  },
  {
    id:'L41', stage:4, title:'Master Class — Full Fluency Review',
    goal:'Synthesise all 31 lessons in a free-speaking demonstration.',
    pattern:[
      {eng:'I\'ve been working on my English for six months, and it\'s paying off.', note:'present perfect continuous + result'},
      {eng:'Had I not started this course, I wouldn\'t speak this well.', note:'third conditional inversion'},
      {eng:'What I\'ve learnt is that consistency beats intensity.', note:'what-cleft + present perfect'},
      {eng:'On balance, my pronunciation has improved significantly.', note:'discourse marker + result'},
      {eng:'Not only have I gained confidence — I\'ve found my voice.', note:'not only + inversion + metaphor'}
    ],
    warn:'Master tip: Record yourself once a week. Compare month-on-month. Hearing your own progress is the best motivator.',
    missions:[
      {prompt:'Say: "Over the past few months, my English has improved enormously and I now feel confident speaking in any situation."', expected:'over the past few months my english has improved enormously and i now feel confident speaking in any situation'},
      {prompt:'Say: "Had I not dedicated time every day to practice, I would never have reached this level."', expected:'had i not dedicated time every day to practice i would never have reached this level'}
    ]
  },
  {
    id:'L42', stage:4, title:'Negotiation & Tactical Concessions',
    goal:'Frame proposals, propose conditional trades, and navigate pushback diplomatically.',
    pattern:[
      {eng:'If you can commit to a two-year contract, we can offer a ten percent reduction.', note:'conditional trade: never give without getting'},
      {eng:'From our perspective, the delivery schedule is non-negotiable.', note:'firm anchor on core priorities'},
      {eng:'What would it take for you to reconsider that point?', note:'diagnostic enquiry to uncover flexibility'},
      {eng:'We are prepared to meet you halfway on the maintenance fee.', note:'signalling constructive concession'},
      {eng:'Let us put that clause aside for now and revisit it later.', note:'parking difficult issues to build momentum'}
    ],
    warn:'Desi trap: Apologising before asking for fair terms ("Sorry, but can you discount?"). Negotiate with poise.',
    missions:[
      {prompt:'Say: "If you can expedite the delivery, we are happy to agree to the terms."', expected:'if you can expedite the delivery we are happy to agree to the terms'},
      {prompt:'Say: "We are prepared to make a concession, provided you guarantee the deadline."', expected:'we are prepared to make a concession provided you guarantee the deadline'}
    ]
  },
  {
    id:'L43', stage:4, title:'Crisis Communication & De-escalation',
    goal:'Address grievances, take accountability, and defuse tense interpersonal conflict with poise.',
    pattern:[
      {eng:'I hear your frustration, and I understand why this is unacceptable.', note:'validation before explanation'},
      {eng:'Let me take full ownership of resolving this discrepancy.', note:'clear individual accountability'},
      {eng:'Here is the immediate corrective action we are implementing.', note:'action-oriented reassurance'},
      {eng:'I appreciate your patience while our engineers stabilise the service.', note:'thanking rather than apologizing repeatedly'},
      {eng:'We will conduct a thorough post-mortem to prevent any recurrence.', note:'long-term prevention commitment'}
    ],
    warn:'Defensiveness fuels escalation. Say "Thank you for bringing this to my attention" instead of making excuses.',
    missions:[
      {prompt:'Say: "I completely understand your concern and will personally oversee the resolution."', expected:'i completely understand your concern and will personally oversee the resolution'},
      {prompt:'Say: "We have contained the incident and will provide an hourly update until fixed."', expected:'we have contained the incident and will provide an hourly update until fixed'}
    ]
  },
  {
    id:'L44', stage:4, title:'High-Stakes Storytelling & Executive Pitching',
    goal:'Deploy structured narrative frameworks (Hook, Context, Challenge, Resolution, Impact).',
    pattern:[
      {eng:'Picture this: two years ago, our team was losing forty hours each week.', note:'vivid sensory hook'},
      {eng:'The turning point came when we completely rethought our workflow.', note:'dramatic pivot'},
      {eng:'By automating the manual verification, we cut processing time by eighty percent.', note:'quantifiable operational resolution'},
      {eng:'This is not just about cost reduction — it is about empowering our staff.', note:'elevating the strategic impact'},
      {eng:'The question before us today is whether we scale this across the entire enterprise.', note:'compelling call to action'}
    ],
    warn:'Don\'t drown executives in technical minutiae. Lead with the business impact, then provide supporting details.',
    missions:[
      {prompt:'Say: "By redesigning our onboarding, we increased new user retention by thirty percent."', expected:'by redesigning our onboarding we increased new user retention by thirty percent'},
      {prompt:'Say: "This initiative represents a pivotal opportunity to lead our industry."', expected:'this initiative represents a pivotal opportunity to lead our industry'}
    ]
  }
];

/* ── CLARITY DATA ───────────────────────────────────────────────────── */
var CLARITY_DATA = {
  stress: [
    {word:'present', noun:0, verb:1, note:'PREsent (noun) vs. preSENT (verb)'},
    {word:'record', noun:0, verb:1, note:'REcord vs. reCORD'},
    {word:'import', noun:0, verb:1, note:'IMport vs. imPORT'},
    {word:'export', noun:0, verb:1, note:'EXport vs. exPORT'},
    {word:'permit', noun:0, verb:1, note:'PERmit vs. perMIT'},
    {word:'progress', noun:0, verb:1, note:'PROgress vs. proGRESS'},
    {word:'project', noun:0, verb:1, note:'PROject vs. proJECT'},
    {word:'protest', noun:0, verb:1, note:'PROtest vs. proTEST'},
    {word:'rebel', noun:0, verb:1, note:'REbel vs. reBEL'},
    {word:'survey', noun:0, verb:1, note:'SURvey vs. surVEY'}
  ],
  rhythm: [
    {sent:'I WANT to GO to the SHOP.', stressed:['want','go','shop'], note:'Content words carry stress'},
    {sent:'She\'s BEEN WORKING all DAY.', stressed:['been','working','day'], note:'Main verbs and nouns stressed'},
    {sent:'Can you HELP me with THIS?', stressed:['help','this'], note:'Function words (can, you, me) reduced'},
    {sent:'He\'s the BEST in the TEAM.', stressed:['best','team'], note:'Adjectives and nouns carry meaning'},
    {sent:'I\'d LOVE to, but I CAN\'T.', stressed:['love','can\'t'], note:'Negative auxiliaries always stressed'}
  ],
  connected: [
    {normal:'want to', natural:'wanna', note:'Informal speech only'},
    {normal:'going to', natural:'gonna', note:'Informal speech only'},
    {normal:'have to', natural:'hafta', note:'Informal speech only'},
    {normal:'got to', natural:'gotta', note:'Informal speech only'},
    {normal:'them', natural:'\'em', note:'Unstressed position: "give \'em"'},
    {normal:'and', natural:'n\'', note:'rock \'n\' roll, bread \'n\' butter'},
    {normal:'did you', natural:'didja', note:'Very informal: "Didja eat?"'},
    {normal:'what are you', natural:'whatcha', note:'Very informal: "Whatcha doing?"'}
  ]
};

/* ── IDIOMS (48) ───────────────────────────────────────────────────── */
var IDIOMS = [
  {id:'i1', text:'Hit the nail on the head', meaning:'Say or do exactly the right thing', eg:'You hit the nail on the head with that suggestion.'},
  {id:'i2', text:'Under the weather', meaning:'Feeling slightly ill', eg:'She\'s under the weather today, so she\'s working from home.'},
  {id:'i3', text:'Bite the bullet', meaning:'Endure something painful or difficult', eg:'I had to bite the bullet and apologise.'},
  {id:'i4', text:'Break the ice', meaning:'Do something to ease tension at the start', eg:'He told a joke to break the ice at the meeting.'},
  {id:'i5', text:'Burn the midnight oil', meaning:'Work very late into the night', eg:'She burned the midnight oil to finish the report.'},
  {id:'i6', text:'Cut corners', meaning:'Do something the easy way, at the expense of quality', eg:'We can\'t cut corners on safety.'},
  {id:'i7', text:'Get out of hand', meaning:'Lose control', eg:'The argument got out of hand quickly.'},
  {id:'i8', text:'Hit the ground running', meaning:'Start something energetically without preparation time', eg:'She hit the ground running on her first day.'},
  {id:'i9', text:'In the same boat', meaning:'In the same difficult situation', eg:'We\'re all in the same boat — nobody knows the answer.'},
  {id:'i10', text:'Jump on the bandwagon', meaning:'Follow a trend because others are doing it', eg:'Everyone jumped on the bandwagon when smartphones launched.'},
  {id:'i11', text:'Keep something at bay', meaning:'Prevent something from getting closer', eg:'Exercise helps keep stress at bay.'},
  {id:'i12', text:'Let the cat out of the bag', meaning:'Reveal a secret accidentally', eg:'He let the cat out of the bag about the surprise party.'},
  {id:'i13', text:'Miss the boat', meaning:'Miss an opportunity', eg:'I missed the boat on that investment.'},
  {id:'i14', text:'Once in a blue moon', meaning:'Very rarely', eg:'We visit that restaurant once in a blue moon.'},
  {id:'i15', text:'On the ball', meaning:'Alert, efficient, and ready to act', eg:'Our project manager is really on the ball.'},
  {id:'i16', text:'On thin ice', meaning:'In a risky or dangerous situation', eg:'After two warnings, she\'s on thin ice.'},
  {id:'i17', text:'Pull someone\'s leg', meaning:'Tease or joke with someone', eg:'Don\'t worry, I\'m just pulling your leg.'},
  {id:'i18', text:'Spill the beans', meaning:'Reveal secret information', eg:'She spilled the beans about the merger.'},
  {id:'i19', text:'The ball is in your court', meaning:'It is now your decision or responsibility', eg:'I\'ve made my offer. The ball is in your court.'},
  {id:'i20', text:'Through thick and thin', meaning:'Under all circumstances, good and bad', eg:'They stayed friends through thick and thin.'},
  {id:'i21', text:'Bite off more than you can chew', meaning:'Take on more responsibility than you can handle', eg:'He bit off more than he could chew with three projects.'},
  {id:'i22', text:'Cost an arm and a leg', meaning:'Be extremely expensive', eg:'That handbag costs an arm and a leg.'},
  {id:'i23', text:'Every cloud has a silver lining', meaning:'Every negative has a positive aspect', eg:'I lost the job, but every cloud has a silver lining — now I freelance.'},
  {id:'i24', text:'Give someone the cold shoulder', meaning:'Ignore someone deliberately', eg:'She gave him the cold shoulder after the argument.'},
  {id:'i25', text:'Hit the sack', meaning:'Go to bed', eg:'I\'m exhausted — I\'m going to hit the sack.'},
  {id:'i26', text:'It takes two to tango', meaning:'Both parties are responsible', eg:'You can\'t blame only her — it takes two to tango.'},
  {id:'i27', text:'Kill two birds with one stone', meaning:'Accomplish two things with one action', eg:'I went to the bank and the post office — killed two birds with one stone.'},
  {id:'i28', text:'Let sleeping dogs lie', meaning:'Avoid reviving a past conflict', eg:'Don\'t mention that argument — let sleeping dogs lie.'},
  {id:'i29', text:'Lose track of time', meaning:'Fail to notice how much time has passed', eg:'I lost track of time and missed the meeting.'},
  {id:'i30', text:'Make ends meet', meaning:'Have just enough money to survive', eg:'With rising costs, many families struggle to make ends meet.'},
  {id:'i31', text:'No pain, no gain', meaning:'You must work hard to achieve results', eg:'She trains every day — no pain, no gain.'},
  {id:'i32', text:'Off the top of your head', meaning:'From memory, without thinking deeply', eg:'Off the top of my head, I\'d say about fifty people attended.'},
  {id:'i33', text:'On the fence', meaning:'Undecided, neutral', eg:'I\'m still on the fence about whether to accept the offer.'},
  {id:'i34', text:'Once bitten, twice shy', meaning:'Cautious due to a past bad experience', eg:'I won\'t invest there again — once bitten, twice shy.'},
  {id:'i35', text:'Piece of cake', meaning:'Very easy', eg:'The exam was a piece of cake.'},
  {id:'i36', text:'Pull yourself together', meaning:'Calm down and behave normally', eg:'Pull yourself together — it\'s just a job interview.'},
  {id:'i37', text:'Put your foot in it', meaning:'Say something embarrassing or wrong', eg:'I put my foot in it when I asked if she was pregnant.'},
  {id:'i38', text:'Read between the lines', meaning:'Find the hidden meaning', eg:'His email sounded polite, but reading between the lines, he was angry.'},
  {id:'i39', text:'See eye to eye', meaning:'Agree on something', eg:'We don\'t always see eye to eye, but we respect each other.'},
  {id:'i40', text:'Sit on the fence', meaning:'Avoid taking a side', eg:'Stop sitting on the fence and tell us what you think.'},
  {id:'i41', text:'Speak of the devil', meaning:'Said when someone appears just after being mentioned', eg:'Speak of the devil — there\'s Ravi now!'},
  {id:'i42', text:'Steal someone\'s thunder', meaning:'Take attention or credit from someone', eg:'She stole his thunder by announcing it first.'},
  {id:'i43', text:'Take it with a pinch of salt', meaning:'Don\'t believe it completely', eg:'Take his predictions with a pinch of salt.'},
  {id:'i44', text:'The tip of the iceberg', meaning:'A small visible part of a larger problem', eg:'The complaints we received are just the tip of the iceberg.'},
  {id:'i45', text:'Turn over a new leaf', meaning:'Change behaviour for the better', eg:'He turned over a new leaf after his health scare.'},
  {id:'i46', text:'Under someone\'s thumb', meaning:'Controlled by someone', eg:'He\'s completely under his boss\'s thumb.'},
  {id:'i47', text:'Up in the air', meaning:'Uncertain, undecided', eg:'The project timeline is still up in the air.'},
  {id:'i48', text:'Wrap your head around', meaning:'Understand something complex', eg:'I can\'t wrap my head around quantum physics.'}
];

/* ── PHRASAL VERBS (48) ─────────────────────────────────────────────── */
var PVS = [
  {id:'pv1', text:'back down', meaning:'Stop insisting on something', eg:'He finally backed down after the argument.'},
  {id:'pv2', text:'break down', meaning:'Stop working; lose emotional control', eg:'My car broke down on the highway.'},
  {id:'pv3', text:'break up', meaning:'End a relationship; separate', eg:'They broke up after five years.'},
  {id:'pv4', text:'bring up', meaning:'Raise a child; mention a topic', eg:'She brought up a good point in the meeting.'},
  {id:'pv5', text:'call off', meaning:'Cancel', eg:'The match was called off due to rain.'},
  {id:'pv6', text:'carry on', meaning:'Continue', eg:'Carry on with your work, I\'ll be back soon.'},
  {id:'pv7', text:'catch up', meaning:'Reach the same level; meet after a gap', eg:'I need to catch up on my reading.'},
  {id:'pv8', text:'check in', meaning:'Register at a hotel or airport', eg:'We checked in at the hotel at noon.'},
  {id:'pv9', text:'check out', meaning:'Leave a hotel; look at something', eg:'Check out this amazing view!'},
  {id:'pv10', text:'come across', meaning:'Find by accident; give an impression', eg:'He comes across as very confident.'},
  {id:'pv11', text:'come up with', meaning:'Think of an idea', eg:'She came up with a brilliant solution.'},
  {id:'pv12', text:'deal with', meaning:'Handle; manage', eg:'How do you deal with stress?'},
  {id:'pv13', text:'drop off', meaning:'Fall asleep; deliver someone', eg:'I dropped off the documents this morning.'},
  {id:'pv14', text:'end up', meaning:'Finally be in a situation', eg:'We ended up staying until midnight.'},
  {id:'pv15', text:'fall behind', meaning:'Progress more slowly than expected', eg:'Don\'t fall behind on your assignments.'},
  {id:'pv16', text:'figure out', meaning:'Understand or solve', eg:'I finally figured out how to use the software.'},
  {id:'pv17', text:'fill in', meaning:'Complete a form; substitute for someone', eg:'Could you fill in for me tomorrow?'},
  {id:'pv18', text:'find out', meaning:'Discover information', eg:'I found out she had already left.'},
  {id:'pv19', text:'get along', meaning:'Have a good relationship', eg:'Do you get along with your colleagues?'},
  {id:'pv20', text:'get away with', meaning:'Avoid punishment', eg:'He got away with arriving late every day.'},
  {id:'pv21', text:'get over', meaning:'Recover from', eg:'It took me months to get over the illness.'},
  {id:'pv22', text:'give up', meaning:'Stop trying; quit', eg:'Never give up on your dreams.'},
  {id:'pv23', text:'go ahead', meaning:'Proceed', eg:'Please go ahead with the presentation.'},
  {id:'pv24', text:'grow up', meaning:'Become adult; mature', eg:'She grew up in a small village.'},
  {id:'pv25', text:'hang on', meaning:'Wait; hold tightly', eg:'Hang on, I\'ll be with you in a second.'},
  {id:'pv26', text:'hold on', meaning:'Wait; not let go', eg:'Hold on — let me check the schedule.'},
  {id:'pv27', text:'keep up', meaning:'Maintain the same pace or level', eg:'Keep up the good work!'},
  {id:'pv28', text:'let down', meaning:'Disappoint', eg:'I don\'t want to let the team down.'},
  {id:'pv29', text:'look after', meaning:'Take care of', eg:'Could you look after my plants?'},
  {id:'pv30', text:'look forward to', meaning:'Anticipate with pleasure', eg:'I look forward to meeting you.'},
  {id:'pv31', text:'look into', meaning:'Investigate', eg:'I\'ll look into the problem right away.'},
  {id:'pv32', text:'look up', meaning:'Search for information; improve', eg:'Look it up in the dictionary.'},
  {id:'pv33', text:'make up', meaning:'Invent; reconcile', eg:'They had a fight but later made up.'},
  {id:'pv34', text:'move on', meaning:'Stop dwelling on the past; change activity', eg:'It\'s time to move on.'},
  {id:'pv35', text:'pick up', meaning:'Collect; learn informally', eg:'She picked up Spanish very quickly.'},
  {id:'pv36', text:'point out', meaning:'Draw attention to', eg:'He pointed out the mistake in the report.'},
  {id:'pv37', text:'put off', meaning:'Postpone; disgust', eg:'We had to put off the launch.'},
  {id:'pv38', text:'put up with', meaning:'Tolerate', eg:'I can\'t put up with this noise.'},
  {id:'pv39', text:'run out of', meaning:'Have no more of something', eg:'We\'ve run out of time.'},
  {id:'pv40', text:'set up', meaning:'Establish; arrange', eg:'She set up her own company.'},
  {id:'pv41', text:'show off', meaning:'Display proudly; boast', eg:'He was just showing off his new car.'},
  {id:'pv42', text:'sort out', meaning:'Resolve; organise', eg:'Can you sort out this confusion?'},
  {id:'pv43', text:'stand out', meaning:'Be noticeably different', eg:'Her performance really stood out.'},
  {id:'pv44', text:'take off', meaning:'Plane departs; remove; become successful', eg:'The business really took off last year.'},
  {id:'pv45', text:'take on', meaning:'Accept responsibility; hire', eg:'We took on three new clients.'},
  {id:'pv46', text:'turn down', meaning:'Refuse; reduce volume', eg:'She turned down the promotion offer.'},
  {id:'pv47', text:'work out', meaning:'Exercise; solve; develop well', eg:'It all worked out in the end.'},
  {id:'pv48', text:'wrap up', meaning:'Finish; dress warmly', eg:'Let\'s wrap up the meeting.'}
];

/* ── QUOTES (for daily rotation) ────────────────────────────────────── */
var QUOTES = [
  {text:'The limits of my language mean the limits of my world.', by:'Ludwig Wittgenstein'},
  {text:'A different language is a different vision of life.', by:'Federico Fellini'},
  {text:'Language is the road map of a culture.', by:'Rita Mae Brown'},
  {text:'One language sets you in a corridor for life. Two languages open every door along the way.', by:'Frank Smith'},
  {text:'Learning is not attained by chance. It must be sought with ardour and attended to with diligence.', by:'Abigail Adams'},
  {text:'The more that you read, the more things you will know.', by:'Dr. Seuss'},
  {text:'To have another language is to possess a second soul.', by:'Charlemagne'},
  {text:'Language is the blood of the soul into which thoughts run and out of which they grow.', by:'Oliver Wendell Holmes'},
  {text:'It\'s not that I\'m so smart, it\'s just that I stay with problems longer.', by:'Albert Einstein'},
  {text:'Success is not final, failure is not fatal: It is the courage to continue that counts.', by:'Winston Churchill'},
  {text:'The secret of getting ahead is getting started.', by:'Mark Twain'},
  {text:'In three words I can sum up everything I\'ve learned about life: it goes on.', by:'Robert Frost'},
  {text:'You only live once, but if you do it right, once is enough.', by:'Mae West'},
  {text:'The best time to plant a tree was 20 years ago. The second best time is now.', by:'Chinese Proverb'},
  {text:'An investment in knowledge pays the best interest.', by:'Benjamin Franklin'},
  {text:'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', by:'Malcolm X'},
  {text:'The beautiful thing about learning is that nobody can take it away from you.', by:'B.B. King'},
  {text:'Live as if you were to die tomorrow. Learn as if you were to live forever.', by:'Mahatma Gandhi'},
  {text:'It does not matter how slowly you go as long as you do not stop.', by:'Confucius'},
  {text:'Quality is not an act, it is a habit.', by:'Aristotle'}
];

/* ── DAILY SEEDS — note: views access TWISTERS/QUOTES/IDIOMS/POWER_WORDS directly ── */
/* DAILY_SEEDS removed: cross-file references handled at runtime via global scope */

/* ── POWER WORDS (30) ──────────────────────────────────────────────── */
var POWER_WORDS = [
  {w:'articulate', ipa:'/ɑːˈtɪkjʊlət/', meaning:'Able to express ideas clearly and effectively', eg:'She gave an articulate explanation of the problem.'},
  {w:'brevity', ipa:'/ˈbrɛvɪti/', meaning:'Conciseness of expression', eg:'Good writing requires brevity.'},
  {w:'candid', ipa:'/ˈkændɪd/', meaning:'Truthful and straightforward', eg:'I appreciate your candid feedback.'},
  {w:'diligent', ipa:'/ˈdɪlɪdʒənt/', meaning:'Having or showing care and effort', eg:'She is a diligent worker.'},
  {w:'eloquence', ipa:'/ˈɛləkwəns/', meaning:'Fluent and persuasive speaking or writing', eg:'His eloquence won the crowd over.'},
  {w:'foresight', ipa:'/ˈfɔːsaɪt/', meaning:'The ability to predict future needs', eg:'Her foresight saved the company millions.'},
  {w:'hone', ipa:'/həʊn/', meaning:'Refine or perfect over time', eg:'Practise daily to hone your skills.'},
  {w:'impeccable', ipa:'/ɪmˈpɛkəbl/', meaning:'In accordance with the highest standards', eg:'Her English is impeccable.'},
  {w:'judicious', ipa:'/dʒuːˈdɪʃəs/', meaning:'Having or showing good judgment', eg:'A judicious use of resources.'},
  {w:'keen', ipa:'/kiːn/', meaning:'Eager and enthusiastic; mentally sharp', eg:'She has a keen interest in linguistics.'},
  {w:'lucid', ipa:'/ˈluːsɪd/', meaning:'Easy to understand; clear', eg:'Please give a lucid explanation.'},
  {w:'mentor', ipa:'/ˈmɛntɔː/', meaning:'An experienced person who advises', eg:'Find a mentor in your field.'},
  {w:'nuanced', ipa:'/ˈnjuːɑːnst/', meaning:'Showing subtle differences', eg:'A nuanced understanding of grammar.'},
  {w:'optimise', ipa:'/ˈɒptɪmaɪz/', meaning:'Make the most effective use of', eg:'Optimise your study time.'},
  {w:'pragmatic', ipa:'/præɡˈmætɪk/', meaning:'Dealing with things sensibly and realistically', eg:'We need a pragmatic solution.'},
  {w:'resilient', ipa:'/rɪˈzɪliənt/', meaning:'Able to recover quickly from difficulties', eg:'Be resilient in the face of setbacks.'},
  {w:'succinct', ipa:'/səkˈsɪŋkt/', meaning:'Briefly and clearly expressed', eg:'Give a succinct summary.'},
  {w:'tenacity', ipa:'/tɪˈnæsɪti/', meaning:'The quality of being persistent', eg:'Her tenacity is admirable.'},
  {w:'unwavering', ipa:'/ʌnˈweɪvərɪŋ/', meaning:'Steady and resolute', eg:'Her commitment is unwavering.'},
  {w:'versatile', ipa:'/ˈvɜːsətaɪl/', meaning:'Able to adapt to many functions', eg:'English is a versatile language.'},
  {w:'astute', ipa:'/əˈstjuːt/', meaning:'Showing clever judgment', eg:'An astute observation.'},
  {w:'benchmark', ipa:'/ˈbɛntʃmɑːk/', meaning:'A standard point of reference', eg:'Set a benchmark for your progress.'},
  {w:'cogent', ipa:'/ˈkəʊdʒənt/', meaning:'Clear, logical and convincing', eg:'A cogent argument.'},
  {w:'deliberate', ipa:'/dɪˈlɪbərət/', meaning:'Done consciously and intentionally', eg:'Make a deliberate effort daily.'},
  {w:'emulate', ipa:'/ˈɛmjʊleɪt/', meaning:'Match or surpass by imitation', eg:'Emulate great speakers you admire.'},
  {w:'formidable', ipa:'/ˈfɔːmɪdəbl/', meaning:'Inspiring fear or respect through size or capability', eg:'She is a formidable debater.'},
  {w:'grounded', ipa:'/ˈɡraʊndɪd/', meaning:'Sensible and with realistic values', eg:'Stay grounded despite your success.'},
  {w:'incisive', ipa:'/ɪnˈsaɪsɪv/', meaning:'Intelligently analytical and clear-thinking', eg:'An incisive mind cuts through confusion.'},
  {w:'prolific', ipa:'/prəˈlɪfɪk/', meaning:'Producing much work or output', eg:'She is a prolific writer.'},
  {w:'salient', ipa:'/ˈseɪliənt/', meaning:'Most noticeable or important', eg:'Highlight the salient points.'},
  {w:'acumen', ipa:'/ˈækjʊmən/', meaning:'The ability to make good judgments and quick decisions', eg:'He has sharp financial acumen.'},
  {w:'adept', ipa:'/əˈdɛpt/', meaning:'Very skilled or proficient at something', eg:'She is adept at resolving conflicts.'},
  {w:'alacrity', ipa:'/əˈlækrɪti/', meaning:'Brisk and cheerful readiness', eg:'He accepted the invitation with alacrity.'},
  {w:'ameliorate', ipa:'/əˈmiːliəreɪt/', meaning:'Make something bad or unsatisfactory better', eg:'Steps were taken to ameliorate working conditions.'},
  {w:'anomalous', ipa:'/əˈnɒmələs/', meaning:'Deviating from what is standard or normal', eg:'We noticed an anomalous spike in traffic.'},
  {w:'appraise', ipa:'/əˈpreɪz/', meaning:'Assess the value, quality, or performance of', eg:'The manager will appraise each team member.'},
  {w:'audacious', ipa:'/ɔːˈdeɪʃəs/', meaning:'Showing a willingness to take bold risks', eg:'She presented an audacious plan for expansion.'},
  {w:'bolster', ipa:'/ˈbəʊlstə/', meaning:'Support or strengthen', eg:'More practice will bolster your confidence.'},
  {w:'catalyst', ipa:'/ˈkætəlɪst/', meaning:'A person or thing that precipitates an event or change', eg:'Her speech acted as a catalyst for reform.'},
  {w:'circumspect', ipa:'/ˈsɜːkəmspɛkt/', meaning:'Wary and unwilling to take risks', eg:'He gave a circumspect response to the sensitive question.'},
  {w:'concur', ipa:'/kənˈkɜː/', meaning:'Be of the same opinion; agree', eg:'I strongly concur with your assessment.'},
  {w:'deference', ipa:'/ˈdɛfərəns/', meaning:'Polite submission and respect', eg:'He treated his elders with great deference.'},
  {w:'discreet', ipa:'/dɪˈskriːt/', meaning:'Careful and prudent in speech and action', eg:'Please keep this discussion discreet.'},
  {w:'disseminate', ipa:'/dɪˈsɛmɪneɪt/', meaning:'Spread information or knowledge widely', eg:'The findings were disseminated across the company.'},
  {w:'empathy', ipa:'/ˈɛmpəθi/', meaning:'The ability to understand and share the feelings of another', eg:'Empathetic leaders listen before deciding.'},
  {w:'equivocal', ipa:'/ɪˈkwɪvəkl/', meaning:'Open to more than one interpretation; ambiguous', eg:'His equivocal answer left us confused.'},
  {w:'exemplary', ipa:'/ɪɡˈzɛmpləri/', meaning:'Serving as a desirable model; representing the best', eg:'She received an award for exemplary performance.'},
  {w:'expedite', ipa:'/ˈɛkspɪdaɪt/', meaning:'Make an action or process happen sooner', eg:'We will expedite your application immediately.'},
  {w:'foster', ipa:'/ˈfɒstə/', meaning:'Encourage the development of something desirable', eg:'Our team fosters a culture of innovation.'},
  {w:'galvanise', ipa:'/ˈɡælvənaɪz/', meaning:'Shock or excite someone into taking action', eg:'The urgent deadline galvanised the entire team.'},
  {w:'imperative', ipa:'/ɪmˈpɛrətɪv/', meaning:'Of vital importance; crucial', eg:'Clear communication is imperative for success.'},
  {w:'indispensable', ipa:'/ˌɪndɪˈspɛnsəbl/', meaning:'Absolutely necessary', eg:'Her contribution was indispensable to our launch.'},
  {w:'judiciously', ipa:'/dʒuːˈdɪʃəsli/', meaning:'With good judgment or sense', eg:'Allocate your study time judiciously.'},
  {w:'lucidity', ipa:'/luːˈsɪdɪti/', meaning:'Clarity of expression; intelligibility', eg:'He wrote the report with remarkable lucidity.'},
  {w:'paragon', ipa:'/ˈpærəɡən/', meaning:'A person or thing regarded as a perfect example of a quality', eg:'She is a paragon of dedication.'},
  {w:'pivotal', ipa:'/ˈpɪvətl/', meaning:'Of crucial importance in relation to the development of something', eg:'This decision marked a pivotal moment in his career.'},
  {w:'reiterate', ipa:'/riːˈɪtəreɪt/', meaning:'Say something again for emphasis or clarity', eg:'Let me reiterate the importance of daily practice.'},
  {w:'scrutinise', ipa:'/ˈskruːtɪnaɪz/', meaning:'Examine or inspect closely and thoroughly', eg:'We must scrutinise every detail before signing.'},
  {w:'tangible', ipa:'/ˈtændʒəbl/', meaning:'Perceptible by touch; clear and definite', eg:'Daily speaking yields tangible results.'},
  {w:'zeal', ipa:'/ziːl/', meaning:'Great energy or enthusiasm in pursuit of a cause or objective', eg:'She approaches language learning with real zeal.'}
];

if (typeof window !== 'undefined') {
  window.COURSE = COURSE;
  window.CLARITY_DATA = CLARITY_DATA;
  window.IDIOMS = IDIOMS;
  window.PVS = PVS;
  window.QUOTES = QUOTES;
  window.POWER_WORDS = POWER_WORDS;
}
if (typeof global !== 'undefined') {
  global.COURSE = COURSE;
  global.CLARITY_DATA = CLARITY_DATA;
  global.IDIOMS = IDIOMS;
  global.PVS = PVS;
  global.QUOTES = QUOTES;
  global.POWER_WORDS = POWER_WORDS;
}


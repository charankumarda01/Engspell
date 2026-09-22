/* =====================================================================
   data3.js — ES5 ONLY
   ATLAS (12 tenses), PASSAGES (12 listening), ASSESSMENT_POOLS, SKILL_META
   ===================================================================== */

/* ── GRAMMAR ATLAS — 12 TENSES ─────────────────────────────────────── */
var ATLAS = [
  {
    id:'t1', name:'Simple Present',
    formula:'Subject + base verb (he/she/it: +s)',
    when:'Habits, routines, facts, schedules',
    signals:['always','usually','every day','often','sometimes','never'],
    examples:['I work from home.','She studies every morning.','The sun rises in the east.'],
    desiTrap:'"He work there." → "He works there."',
    detectiveClue:'Look for: always, every, usually, often, sometimes, never'
  },
  {
    id:'t2', name:'Present Continuous',
    formula:'am/is/are + verb-ing',
    when:'Actions happening now; future arrangements',
    signals:['now','right now','at the moment','currently','this week'],
    examples:['She is talking on the phone.','We are meeting at 5.','I am currently working on a report.'],
    desiTrap:'"I am knowing the answer." → "I know the answer." (no -ing for stative verbs)',
    detectiveClue:'Look for: now, at the moment, currently, this week'
  },
  {
    id:'t3', name:'Simple Past',
    formula:'Subject + past form (regular: -ed; irregular: learn them)',
    when:'Completed actions at a specific past time',
    signals:['yesterday','last week','in 2020','ago','then','just now'],
    examples:['She called me yesterday.','I went to Mumbai last month.','He didn\'t reply.'],
    desiTrap:'"She didn\'t went." → "She didn\'t go." (base after did)',
    detectiveClue:'Look for: yesterday, ago, last, in [year]'
  },
  {
    id:'t4', name:'Past Continuous',
    formula:'was/were + verb-ing',
    when:'Action in progress at a specific past time; interrupted past action',
    signals:['while','when','at that time','all morning','still'],
    examples:['I was sleeping when she called.','They were discussing the plan.','What were you doing at 6?'],
    desiTrap:'"I was study." → "I was studying."',
    detectiveClue:'Look for: while, when + another action, at [time] yesterday'
  },
  {
    id:'t5', name:'Present Perfect',
    formula:'have/has + past participle',
    when:'Life experience; recent events; actions with present result',
    signals:['ever','never','just','already','yet','since','for','recently'],
    examples:['I have visited London twice.','She has just left.','Have you ever tried sushi?'],
    desiTrap:'"I did this many times." (no time) → "I have done this many times."',
    detectiveClue:'Look for: ever, never, just, already, yet, since, for, recently'
  },
  {
    id:'t6', name:'Present Perfect Continuous',
    formula:'have/has + been + verb-ing',
    when:'Actions continuing from past to now; emphasise duration',
    signals:['for','since','all day','how long','lately'],
    examples:['I have been working here for five years.','She has been studying all morning.','How long have you been waiting?'],
    desiTrap:'"I am working here since 2020." → "I have been working here since 2020."',
    detectiveClue:'Look for: for [duration], since [point], how long, all day'
  },
  {
    id:'t7', name:'Past Perfect',
    formula:'had + past participle',
    when:'Action completed before another past action',
    signals:['before','after','by the time','already','by then'],
    examples:['She had left before I arrived.','I had already eaten when she called.','By 2015, he had written three books.'],
    desiTrap:'"She left before I arrived." is acceptable, but "She had left" is more precise.',
    detectiveClue:'Look for: before, by the time, already [+ another past event]'
  },
  {
    id:'t8', name:'Past Perfect Continuous',
    formula:'had + been + verb-ing',
    when:'Continuous action before a specific past moment',
    signals:['for','since','all morning','how long','before'],
    examples:['I had been waiting for an hour when she arrived.','They had been arguing all night.','How long had you been working there?'],
    desiTrap:'Only use when the duration before a past event matters. Otherwise, use simple past perfect.',
    detectiveClue:'Look for: for [time] + by/when + past event'
  },
  {
    id:'t9', name:'Simple Future (will)',
    formula:'will + base verb',
    when:'Spontaneous decisions, predictions, promises, offers',
    signals:['tomorrow','soon','next year','one day','I think','probably'],
    examples:['I\'ll call you tomorrow.','She will probably pass.','Don\'t worry, I\'ll handle it.'],
    desiTrap:'"If he will come" → "If he comes" (no will in if-clause)',
    detectiveClue:'Look for: spontaneous offers, predictions with "I think", promises'
  },
  {
    id:'t10', name:'Future with Going To',
    formula:'am/is/are + going to + base verb',
    when:'Plans already decided; predictions based on evidence',
    signals:['I\'ve decided','I\'ve planned','look at those clouds','already booked'],
    examples:['I\'m going to apply for that job.','Look at those clouds — it\'s going to rain.','She\'s going to take a year off.'],
    desiTrap:'"I will go there" for a pre-planned trip → prefer "I\'m going to go" or "I\'m going."',
    detectiveClue:'Look for: pre-planned action, visible evidence of future'
  },
  {
    id:'t11', name:'Future Perfect',
    formula:'will + have + past participle',
    when:'Action that will be completed before a future point',
    signals:['by then','by next year','by the time','before'],
    examples:['I will have finished by Friday.','By 2030, she will have retired.','He will have left before you arrive.'],
    desiTrap:'Often confused with simple future. Add "by [time]" to check if future perfect is needed.',
    detectiveClue:'Look for: by [future time], before [future event]'
  },
  {
    id:'t12', name:'Future Continuous',
    formula:'will + be + verb-ing',
    when:'Actions in progress at a future moment; polite enquiries about plans',
    signals:['this time tomorrow','at 5 pm next Friday','while'],
    examples:['This time tomorrow I\'ll be flying to London.','She will be working on the report all day.','Will you be needing the car later?'],
    desiTrap:'Rare in everyday speech — most speakers use present continuous for future arrangements.',
    detectiveClue:'Look for: this time [tomorrow/next week], at [time] on [future day]'
  }
];

/* ── LISTENING PASSAGES (12) ────────────────────────────────────────── */
var PASSAGES = [
  {
    id:'p1', title:'A Morning Routine', level:'A1',
    text:'My name is Priya. Every morning I wake up at six o\'clock. First, I brush my teeth and wash my face. Then I make breakfast. I usually have toast and tea. After breakfast, I walk to the bus stop. The bus comes at seven thirty. I go to work and I start at eight o\'clock. I like my job. My colleagues are friendly.',
    questions:[
      {q:'What time does Priya wake up?', opts:['Five o\'clock','Six o\'clock','Seven o\'clock','Eight o\'clock'], ans:1},
      {q:'What does Priya have for breakfast?', opts:['Eggs and coffee','Rice and juice','Toast and tea','Biscuits and milk'], ans:2},
      {q:'How does Priya get to work?', opts:['By car','By bicycle','On foot','By bus'], ans:3}
    ],
    dictation:'I wake up at six and walk to the bus stop.'
  },
  {
    id:'p2', title:'Planning a Holiday', level:'A2',
    text:'Emma and Tom are planning their holiday. They want to visit Italy in the summer. Emma would like to see Rome and the Colosseum. Tom prefers the beach, so he wants to go to Sicily. They are looking at flights and hotels online. The flights are expensive in July, but cheaper in September. They decide to go in September and spend four days in Rome and three days in Sicily.',
    questions:[
      {q:'Where do they want to go?', opts:['Spain','France','Italy','Greece'], ans:2},
      {q:'Why do they choose September?', opts:['It\'s warmer','Flights are cheaper','Hotels are better','It\'s less crowded'], ans:1},
      {q:'How many days will they spend in Rome?', opts:['Three','Four','Five','Seven'], ans:1}
    ],
    dictation:'The flights are cheaper in September than in July.'
  },
  {
    id:'p3', title:'A Job Interview', level:'A2',
    text:'Marco is applying for a job at a marketing company. He has three years of experience in digital marketing. In the interview, the manager asks him about his strengths. Marco says he is creative, hardworking, and good at solving problems. He is also a team player. The manager asks why he wants to leave his current job. Marco explains that he wants new challenges and more responsibility. The manager seems impressed.',
    questions:[
      {q:'How many years of experience does Marco have?', opts:['One','Two','Three','Five'], ans:2},
      {q:'Which of these is a strength Marco mentions?', opts:['Patience','Creativity','Punctuality','Flexibility'], ans:1},
      {q:'Why does Marco want to leave?', opts:['Better salary','New challenges','Shorter commute','Better colleagues'], ans:1}
    ],
    dictation:'He wants new challenges and more responsibility.'
  },
  {
    id:'p4', title:'Climate Change', level:'B1',
    text:'Climate change is one of the most serious challenges facing the world today. Scientists agree that the Earth\'s temperature has risen by about one degree Celsius over the past century, mainly because of human activity. Burning fossil fuels releases carbon dioxide into the atmosphere, which traps heat. As a result, sea levels are rising, extreme weather events are becoming more frequent, and ecosystems are under threat. Governments around the world are trying to reduce emissions by investing in renewable energy such as solar and wind power. However, many experts argue that change is not happening fast enough.',
    questions:[
      {q:'By how much has the Earth\'s temperature risen?', opts:['0.5°C','1°C','2°C','3°C'], ans:1},
      {q:'What traps heat in the atmosphere?', opts:['Oxygen','Carbon dioxide','Nitrogen','Methane'], ans:1},
      {q:'What do governments invest in to reduce emissions?', opts:['Nuclear energy','Oil refineries','Renewable energy','Coal plants'], ans:2}
    ],
    dictation:'Burning fossil fuels releases carbon dioxide into the atmosphere.'
  },
  {
    id:'p5', title:'The Science of Sleep', level:'B1',
    text:'Most adults need between seven and nine hours of sleep each night, but many people regularly get much less. Sleep is essential for brain function, emotional wellbeing, and physical health. During sleep, the brain consolidates memories, repairs cells, and regulates hormones. Lack of sleep can lead to poor concentration, mood swings, and a weakened immune system. In the long term, chronic sleep deprivation is linked to serious conditions such as diabetes, heart disease, and depression. Sleep experts recommend maintaining a consistent sleep schedule, avoiding screens before bed, and keeping the bedroom cool and dark.',
    questions:[
      {q:'How many hours of sleep do most adults need?', opts:['5–6','7–9','10–12','4–6'], ans:1},
      {q:'What does the brain do during sleep?', opts:['Grows new cells','Consolidates memories','Increases heart rate','Produces adrenaline'], ans:1},
      {q:'What do experts NOT recommend for better sleep?', opts:['A cool room','A consistent schedule','Screens before bed','A dark bedroom'], ans:2}
    ],
    dictation:'Sleep is essential for brain function and physical health.'
  },
  {
    id:'p6', title:'Artificial Intelligence', level:'B2',
    text:'Artificial intelligence — or AI — is transforming industries at an unprecedented pace. From healthcare to finance to entertainment, machine learning algorithms are now performing tasks that once required human intelligence. Proponents argue that AI will boost productivity, eliminate repetitive jobs, and solve complex problems beyond human capability. Critics, however, warn of significant risks: algorithmic bias, mass unemployment, and the erosion of privacy. Perhaps the greatest concern is the lack of transparency in AI decision-making — when algorithms influence hiring, lending, or criminal sentencing, it is crucial that their reasoning can be audited and challenged. Regulation is still struggling to keep pace with the technology.',
    questions:[
      {q:'What concern about AI is described as "greatest"?', opts:['Mass unemployment','Algorithmic bias','Lack of transparency','Privacy erosion'], ans:2},
      {q:'What is true about AI regulation, according to the passage?', opts:['It is ahead of technology','It keeps perfect pace','It is struggling to keep up','It does not exist'], ans:2},
      {q:'What do AI proponents claim?', opts:['AI will cause unemployment','AI will boost productivity','AI is dangerous','AI is overrated'], ans:1}
    ],
    dictation:'Regulation is still struggling to keep pace with the technology.'
  },
  {
    id:'p7', title:'The Gig Economy', level:'B2',
    text:'The gig economy refers to a labour market characterised by short-term contracts and freelance work rather than permanent employment. Platforms like Uber, Deliveroo, and Upwork have enabled millions of people to earn income on their own terms. Advocates emphasise the flexibility and autonomy it offers workers. However, critics point out that gig workers typically lack employment rights, paid leave, sick pay, and pension contributions. The line between "independent contractor" and "employee" has become fiercely contested in courts worldwide. Some jurisdictions have already ruled that gig workers deserve certain protections, while others maintain a strict distinction. The debate reflects broader tensions between innovation and worker security.',
    questions:[
      {q:'What characterises the gig economy?', opts:['Permanent contracts','Short-term contracts','Government employment','Unionised labour'], ans:1},
      {q:'What do critics say gig workers lack?', opts:['Clients','Flexibility','Employment rights','Income'], ans:2},
      {q:'What is "fiercely contested in courts"?', opts:['Platform fees','Worker classification','Tax regulations','Minimum wage'], ans:1}
    ],
    dictation:'Gig workers typically lack paid leave, sick pay, and pension contributions.'
  },
  {
    id:'p8', title:'Cognitive Biases', level:'B2',
    text:'Cognitive biases are systematic errors in thinking that affect the judgments and decisions we make every day. Confirmation bias leads us to seek information that supports our existing beliefs while ignoring contradictory evidence. Availability bias causes us to overestimate the likelihood of events that come easily to mind, such as plane crashes after seeing one in the news. The Dunning-Kruger effect describes how people with limited knowledge tend to overestimate their own competence. Awareness of these biases is the first step toward more rational decision-making, though research suggests that simply knowing about them does not make us immune to their influence.',
    questions:[
      {q:'What is confirmation bias?', opts:['Overestimating risk','Seeking supporting information only','Underestimating skill','Remembering recent events'], ans:1},
      {q:'The Dunning-Kruger effect involves:', opts:['Experts underestimating themselves','Novices overestimating themselves','Experts overestimating novices','Novices underestimating experts'], ans:1},
      {q:'What does the passage say about knowing biases?', opts:['It makes you immune','It has no effect','It doesn\'t make you immune','It is pointless'], ans:2}
    ],
    dictation:'Cognitive biases are systematic errors in thinking that affect our decisions.'
  },
  {
    id:'p9', title:'Urban Farming', level:'B1',
    text:'Urban farming is the practice of growing food in cities, on rooftops, in community gardens, and even in vertical indoor farms. As populations grow and climate change threatens traditional agriculture, urban farming is gaining attention as a sustainable alternative. It reduces food miles, provides fresh produce to city dwellers, and can transform unused spaces. In cities like Singapore, urban farms already supply a significant portion of leafy vegetables. Critics note that urban farming requires substantial investment and cannot yet replace large-scale agricultural production. Nevertheless, it represents a promising contribution to food security and community wellbeing.',
    questions:[
      {q:'What is "reducing food miles"?', opts:['Growing more food','Reducing the distance food travels','Eating less','Buying imported food'], ans:1},
      {q:'Where does urban farming already supply vegetables?', opts:['Tokyo','London','Singapore','Mumbai'], ans:2},
      {q:'What do critics say about urban farming?', opts:['It\'s too cheap','It requires big investment','It\'s fully replacing farms','It is useless'], ans:1}
    ],
    dictation:'Urban farming reduces food miles and provides fresh produce to city dwellers.'
  },
  {
    id:'p10', title:'The Psychology of Habits', level:'B1',
    text:'According to psychologists, habits are formed through a cycle of cue, routine, and reward. A cue triggers the behaviour — for example, seeing your running shoes by the door. The routine is the behaviour itself — going for a run. The reward reinforces it — the sense of achievement or rush of endorphins. To build a new habit, experts recommend attaching it to an existing one, a technique called "habit stacking." To break a bad habit, the key is to identify the cue and substitute a different routine for the same reward. Most research suggests it takes between 21 and 66 days for a new habit to become automatic.',
    questions:[
      {q:'What are the three parts of the habit cycle?', opts:['Plan, action, result','Cue, routine, reward','Goal, practice, success','Trigger, thought, action'], ans:1},
      {q:'What is "habit stacking"?', opts:['Breaking two habits','Attaching a new habit to an existing one','Stacking books as a cue','Rewarding yourself twice'], ans:1},
      {q:'How long does research say habits take to become automatic?', opts:['7 days','14 days','21–66 days','6 months'], ans:2}
    ],
    dictation:'Habits are formed through a cycle of cue, routine, and reward.'
  },
  {
    id:'p11', title:'Emotional Intelligence', level:'C1',
    text:'Emotional intelligence — the capacity to recognise, understand, and manage our own emotions and those of others — has been identified as a critical predictor of professional success and interpersonal effectiveness, often more so than cognitive ability alone. Daniel Goleman, who popularised the concept, identified five core components: self-awareness, self-regulation, motivation, empathy, and social skills. High emotional intelligence enables individuals to navigate conflict, inspire teams, and maintain resilience under pressure. In contrast, its absence is often correlated with poor leadership, communication breakdowns, and burnout. Organisations increasingly assess emotional intelligence during recruitment, recognising that technical skills can be taught, whereas emotional intelligence is harder to develop in adulthood.',
    questions:[
      {q:'According to Goleman, how many components does emotional intelligence have?', opts:['Three','Four','Five','Six'], ans:2},
      {q:'What does high emotional intelligence help with?', opts:['Technical tasks','Conflict navigation','Mathematical reasoning','Data analysis'], ans:1},
      {q:'Why do organisations assess emotional intelligence in recruitment?', opts:['It\'s legally required','It\'s easy to measure','Technical skills can be taught','It predicts IQ'], ans:2}
    ],
    dictation:'Technical skills can be taught, whereas emotional intelligence is harder to develop.'
  },
  {
    id:'p12', title:'The Future of Education', level:'C1',
    text:'The traditional model of education — fixed curricula, standardised examinations, and age-grouped classes — is being challenged by rapid technological change and evolving labour markets. Proponents of educational reform argue that rote learning and examination pressure stifle creativity and critical thinking, the very competencies most valued by employers of the future. Personalised learning platforms, powered by artificial intelligence, now adapt content to individual learners\' pace and style, offering what some describe as the long-awaited democratisation of education. Sceptics, however, caution against over-reliance on technology, arguing that the human relationships between teachers and students remain irreplaceable for motivation, mentorship, and moral development. The challenge for policymakers is to harness innovation without sacrificing educational equity.',
    questions:[
      {q:'What does "rote learning" stifle, according to reformers?', opts:['Examinations','Creativity and critical thinking','Technology use','Curriculum planning'], ans:1},
      {q:'What do AI-powered learning platforms offer?', opts:['Standardised content','Personalised learning','Group examinations','Teacher replacement'], ans:1},
      {q:'What do sceptics argue remains irreplaceable?', opts:['Standardised tests','AI systems','Human teacher-student relationships','Traditional curricula'], ans:2}
    ],
    dictation:'The human relationship between teacher and student remains irreplaceable for motivation.'
  },
  {
    id:'p13', title:'The Rise of Remote Work', level:'B1',
    text:'Remote work has transitioned from a rare corporate perk to a mainstream way of life for millions across the globe. Employees praise flexible working hours and the elimination of daily commutes, which often saves two hours each day. This extra time allows individuals to exercise, cook fresh meals, and spend quality moments with family. However, remote working also introduces real obstacles, such as feelings of isolation and difficulties in separating professional duties from domestic life. Companies are now implementing hybrid models that balance home working with focused office collaboration.',
    questions:[
      {q:'What do remote workers praise the most?', opts:['Higher bonuses','Flexible hours and no commute','Free equipment','Fewer meetings'], ans:1},
      {q:'How much time does eliminating the commute often save daily?', opts:['30 minutes','One hour','Two hours','Four hours'], ans:2},
      {q:'What hybrid approach are companies now implementing?', opts:['Full-time office work','Permanently closing offices','Balancing home work with office collaboration','Eliminating weekends'], ans:2}
    ],
    dictation:'Remote work allows individuals to balance professional duties with personal life.'
  },
  {
    id:'p14', title:'Artificial Intelligence in Healthcare', level:'B2',
    text:'Artificial intelligence is transforming contemporary medicine by enhancing diagnostic precision and accelerating drug discovery. Machine learning algorithms can examine medical scans in seconds, detecting early abnormalities in X-rays and MRI scans that human radiologists might easily overlook during long shifts. Furthermore, predictive models help hospitals forecast patient admission rates and allocate ICU beds efficiently. Despite these extraordinary advantages, physicians stress that algorithms cannot replace clinical intuition and compassionate patient care. AI serves as a powerful diagnostic copilot rather than an autonomous medical authority.',
    questions:[
      {q:'How does AI primarily assist in medical diagnostics?', opts:['By replacing all surgeons','By detecting abnormalities in scans within seconds','By eliminating hospitals','By prescribing drugs without doctors'], ans:1},
      {q:'What do predictive models help hospitals forecast?', opts:['Hospitality budgets','Patient admission rates and ICU allocation','Electricity costs','Weather disruptions'], ans:1},
      {q:'How do doctors view AI in modern healthcare?', opts:['As an autonomous authority','As a dangerous hindrance','As a diagnostic copilot','As an unnecessary cost'], ans:2}
    ],
    dictation:'Machine learning algorithms examine medical scans and detect early abnormalities in seconds.'
  },
  {
    id:'p15', title:'The History of the English Language', level:'B2',
    text:'The English language boasts a vibrant, complex history spanning over fifteen hundred years. Originating from Germanic dialects brought to Britain by Anglo-Saxon invaders in the fifth century, Old English sounded remarkably different from the language spoken today. The Norman Conquest of 1066 introduced thousands of French words, enriching vocabulary related to governance, cuisine, law, and culture. Later, during the Renaissance, scholars borrowed heavily from Latin and Classical Greek to coin scientific and philosophical terms. Today, English incorporates words from hundreds of languages worldwide, reflecting its role as a global lingua franca.',
    questions:[
      {q:'When did Old English begin developing in Britain?', opts:['In the fifth century','In 1066','During the Renaissance','In the twentieth century'], ans:0},
      {q:'What linguistic influence did the Norman Conquest introduce?', opts:['Celtic poetry','Thousands of French words','Arabic mathematics','Greek theatre terms'], ans:1},
      {q:'Why does modern English incorporate words from hundreds of languages?', opts:['It has no native grammar','It is legally enforced','Because of its role as a global lingua franca','Due to strict academy rules'], ans:2}
    ],
    dictation:'The Norman Conquest introduced thousands of French words into the English language.'
  },
  {
    id:'p16', title:'Urban Gardening and Sustainability', level:'A2',
    text:'Urban gardening is becoming popular in crowded cities where green spaces are limited. People transform concrete balconies, sunny windowsills, and building rooftops into vibrant vegetable gardens. Growing herbs like basil, coriander, and mint requires only small pots and minimal water. Enthusiasts also grow tomatoes, peppers, and green beans in vertical hanging containers. Besides producing fresh, healthy organic food, urban gardens cool down concrete rooftops and attract beneficial pollinating insects. Community gardens help neighbours connect, share tools, and build strong community friendships.',
    questions:[
      {q:'Where do urban gardeners plant vegetables in crowded cities?', opts:['In deep basements','On balconies, windowsills, and rooftops','Under bridges','Inside parking garages'], ans:1},
      {q:'Which herbs are mentioned as easy to grow in small pots?', opts:['Vanilla and saffron','Basil, coriander, and mint','Cinnamon and pepper','Rosemary and nutmeg'], ans:1},
      {q:'What environmental benefit do urban rooftop gardens provide?', opts:['They cool down concrete rooftops','They reduce air pressure','They stop rainfall','They eliminate all insects'], ans:0}
    ],
    dictation:'Urban gardening transforms sunny balconies and rooftops into fresh vegetable gardens.'
  },
  {
    id:'p17', title:'Negotiation and Empathy', level:'B2',
    text:'Master negotiators recognise that successful agreements are built on empathy and perspective-taking rather than aggressive demands. Entering discussions with an adversarial mindset creates defensive resistance, whereas actively listening to the counterparty\'s priorities uncovers unexpected mutual gain. By asking open-ended clarifying questions, a negotiator signals genuine respect while discovering underlying constraints such as budget cycles or internal accountability. When both sides feel heard and respected, negotiations shift from rigid zero-sum bargaining toward collaborative value creation, establishing durable partnerships rather than temporary compromises.',
    questions:[
      {q:'What foundation is essential for successful agreements?', opts:['Aggressive intimidation','Empathy and perspective-taking','Uncompromising demands','Rigid deadlines'], ans:1},
      {q:'What happens when negotiations enter with an adversarial mindset?', opts:['Instant agreement occurs','Defensive resistance is created','Costs drop rapidly','Trust increases'], ans:1},
      {q:'How do open-ended clarifying questions assist the process?', opts:['They reveal underlying constraints and priorities','They trap the counterparty','They prolong meetings unnecessarily','They guarantee zero concessions'], ans:0}
    ],
    dictation:'Actively listening to counterparty priorities uncovers unexpected opportunities for mutual gain.'
  },
  {
    id:'p18', title:'The Psychology of Decision Making', level:'C1',
    text:'Human decision-making is rarely purely rational; it is governed by an intricate interplay between deliberate cognitive processing and unconscious heuristics. Cognitive psychologists Daniel Kahneman and Amos Tversky demonstrated that individuals routinely rely on mental shortcuts that, while evolutionarily adaptive for quick survival judgements, systematically introduce predictable biases. Confirmation bias leads decision-makers to overweight corroborating evidence while discounting contradictory data. Similarly, loss aversion dictates that the psychological pain of losing an asset is twice as intense as the pleasure of gaining an identical asset. Awareness of these systematic cognitive distortions is essential for sound strategic leadership.',
    questions:[
      {q:'What mental shortcuts govern unconscious decision-making?', opts:['Strict syllogisms','Heuristics','Legal statutes','Algorithmic computations'], ans:1},
      {q:'What is confirmation bias?', opts:['Overweighting corroborating evidence while ignoring contradictions','Seeking opposing viewpoints','Remembering only past dates','Accepting all opinions equally'], ans:0},
      {q:'According to loss aversion research, how intense is the pain of loss compared to gain?', opts:['Half as intense','Twice as intense','Identical','Ten times as intense'], ans:1}
    ],
    dictation:'Loss aversion dictates that the psychological pain of losing is twice as intense as gaining.'
  },
  {
    id:'p19', title:'A Trip to the Local Market', level:'A1',
    text:'Every Saturday morning, Anita walks to the lively market near her home. The market is full of colourful stalls selling fresh fruits, crisp vegetables, and sweet flowers. Anita visits Mr. Sharma\'s fruit stand first. She buys six red apples, four ripe bananas, and a sweet pineapple. The prices are fair and the sellers are always welcoming. After buying her produce, Anita enjoys a hot cup of spicy chai at a small tea stall. She loves the cheerful sounds and happy greetings of the weekend market.',
    questions:[
      {q:'When does Anita visit the local market?', opts:['Sunday afternoon','Saturday morning','Monday evening','Friday night'], ans:1},
      {q:'What fruits does Anita buy at Mr. Sharma\'s stand?', opts:['Apples, bananas, and a pineapple','Oranges, grapes, and mangoes','Lemons, berries, and melon','Papaya, plums, and figs'], ans:0},
      {q:'What does Anita do after buying her produce?', opts:['Takes a long taxi ride','Drinks a hot cup of spicy chai','Buys clothes','Goes to the library'], ans:1}
    ],
    dictation:'Anita visits the colourful fruit stalls every Saturday morning.'
  },
  {
    id:'p20', title:'Deep Sea Exploration', level:'B1',
    text:'The deep ocean remains one of the most enigmatic frontiers on our planet, with over eighty percent of the seafloor still unmapped by high-resolution sensors. Extreme water pressure, complete darkness, and near-freezing temperatures make deep ocean exploration extraordinarily demanding. Scientists deploy robotic submersibles fitted with powerful LED lights and high-definition cameras to inspect underwater trenches. In these hostile environments, researchers have discovered bioluminescent fish, giant squid, and hydrothermal vents teeming with unique bacterial ecosystems that survive without sunlight. These deep-sea discoveries expand our understanding of how life thrives in extreme planetary conditions.',
    questions:[
      {q:'How much of the seafloor remains unmapped with high-resolution sensors?', opts:['Twenty percent','Fifty percent','Over eighty percent','One hundred percent'], ans:2},
      {q:'What technology do scientists deploy to explore hostile underwater trenches?', opts:['Simple wooden boats','Robotic submersibles with LED lights and cameras','Glass observation balloons','Helicopters with sonar'], ans:1},
      {q:'What energy source supports life around hydrothermal vents instead of sunlight?', opts:['Solar radiation','Geothermal volcanic gases and chemical bacteria','Nuclear waste','Wind currents'], ans:1}
    ],
    dictation:'Robotic submersibles with high-definition cameras inspect deep underwater ocean trenches.'
  },
  {
    id:'p21', title:'Renewable Energy Innovations', level:'C1',
    text:'The transition toward zero-carbon energy grids has accelerated due to groundbreaking innovations in battery storage chemistry and grid-scale decentralisation. Historically, renewable power suffered from intermittency: solar arrays generated no power overnight, while wind turbines stalled during atmospheric lulls. Contemporary utility-scale lithium iron phosphate batteries, alongside emerging solid-state alternatives, now capture surplus energy generated during peak hours and discharge it smoothly into the municipal grid during evening demand spikes. Coupled with artificial intelligence forecasting models that predict regional demand fluctuations with microsecond accuracy, modern renewables increasingly displace legacy fossil fuel baseload plants with robust commercial viability.',
    questions:[
      {q:'What fundamental challenge historically hindered renewable power adoption?', opts:['Excessive cost of silicon','Intermittency of sunlight and wind','Lack of municipal cables','Excessive copper mining'], ans:1},
      {q:'What role do modern utility-scale batteries play?', opts:['They eliminate power lines','They store surplus power and discharge during demand spikes','They generate wind directly','They cool solar panels'], ans:1},
      {q:'How does AI integration assist renewable energy grids?', opts:['By predicting regional demand fluctuations with microsecond accuracy','By manufacturing lithium cells','By controlling consumer appliances','By eliminating solar cells'], ans:0}
    ],
    dictation:'Utility-scale batteries capture surplus peak energy and discharge it during evening demand spikes.'
  },
  {
    id:'p22', title:'Cross-Cultural Communication', level:'B2',
    text:'In an interconnected international economy, cross-cultural competence is as vital as professional technical expertise. Communication styles diverge significantly between high-context cultures, where meaning is conveyed through subtleties, relationships, and unstated context, and low-context cultures, where precision, directness, and explicit verbal instructions are valued. Misunderstandings frequently arise when international teams collaborate without recognizing these communicative norms. Effective global leaders cultivate adaptive communication habits: they actively reframe ambiguity, encourage open feedback loops, and clarify shared expectations without passing judgment on different cultural working conventions.',
    questions:[
      {q:'How is meaning primarily conveyed in high-context cultures?', opts:['Through legal contracts only','Through subtleties, relationships, and context','Through blunt, loud statements','Exclusively via written email'], ans:1},
      {q:'What distinguishes low-context communication styles?', opts:['Precision, directness, and explicit verbal instructions','Relying on silence','Avoiding eye contact','Speaking only through intermediaries'], ans:0},
      {q:'What adaptive habit characterizes effective global leaders?', opts:['Enforcing one native language strictly','Reframing ambiguity and clarifying shared expectations','Avoiding international partnerships','Ignoring cultural differences'], ans:1}
    ],
    dictation:'Cross-cultural competence requires actively reframing ambiguity and clarifying shared expectations.'
  }
];

/* ── ASSESSMENT POOLS ───────────────────────────────────────────────── */
var ASSESSMENT_POOLS = {
  topics: [
    'Describe a memorable experience from your childhood.',
    'Talk about a person who has influenced your life significantly.',
    'Describe your ideal job and explain why it appeals to you.',
    'Talk about a skill you would like to learn and why.',
    'Describe the city or town where you grew up.',
    'Talk about a challenge you faced and how you overcame it.',
    'Describe a book, film, or TV show that has impressed you.',
    'Talk about your daily routine and how you manage your time.',
    'Describe a tradition or festival that is important to you.',
    'Talk about the role of technology in your life.'
  ],
  scenes: [
    {role:'You are presenting quarterly results to your manager. Speak for 30 seconds about your team\'s performance.', prompt:'Describe key achievements and one challenge.'},
    {role:'You are being interviewed for your dream job. Introduce yourself in 30 seconds.', prompt:'Name, background, key strength, motivation.'},
    {role:'You are giving a short speech at a colleague\'s farewell. Speak for 30 seconds.', prompt:'One positive memory, one quality you admire, a warm goodbye.'},
    {role:'You are explaining a problem to a customer service agent.', prompt:'State the issue, timeline, and what you expect.'},
    {role:'You are pitching an idea to investors in 30 seconds.', prompt:'Problem, solution, why you, call to action.'}
  ],
  cefr: {
    A2: {minWpm:60, maxWpm:90, maxFillerRate:0.10, maxGrammarSlips:5},
    B1: {minWpm:90, maxWpm:120, maxFillerRate:0.06, maxGrammarSlips:3},
    B2: {minWpm:110, maxWpm:145, maxFillerRate:0.04, maxGrammarSlips:1},
    C1: {minWpm:130, maxWpm:170, maxFillerRate:0.02, maxGrammarSlips:0},
    C2: {minWpm:150, maxWpm:200, maxFillerRate:0.01, maxGrammarSlips:0}
  }
};

function bandOf(wpm, fillerRate) {
  var table = ASSESSMENT_POOLS.cefr;
  var bands = ['C2', 'C1', 'B2', 'B1', 'A2'];
  for (var i = 0; i < bands.length; i++) {
    var lvl = bands[i];
    var b = table[lvl];
    if (b && wpm >= b.minWpm && (fillerRate === undefined || fillerRate === null || fillerRate <= b.maxFillerRate)) {
      return lvl;
    }
  }
  return 'A1';
}

/* ── SKILL META ─────────────────────────────────────────────────────── */
var SKILL_META = {
  pronunciation: {label:'Pronunciation', color:'#7c3aed', icon:'🗣️'},
  grammar:       {label:'Grammar',       color:'#2563eb', icon:'📝'},
  vocab:         {label:'Vocabulary',    color:'#059669', icon:'📚'},
  spelling:      {label:'Spelling',      color:'#d97706', icon:'🔤'},
  fluency:       {label:'Fluency',       color:'#dc2626', icon:'💬'},
  listening:     {label:'Listening',     color:'#0891b2', icon:'👂'},
  reading:       {label:'Reading',       color:'#7c3aed', icon:'📖'},
  writing:       {label:'Writing',       color:'#be185d', icon:'✍️'}
};

if (typeof window !== 'undefined') {
  window.ATLAS = ATLAS;
  window.PASSAGES = PASSAGES;
  window.ASSESSMENT_POOLS = ASSESSMENT_POOLS;
  window.SKILL_META = SKILL_META;
  window.bandOf = bandOf;
}
if (typeof global !== 'undefined') {
  global.ATLAS = ATLAS;
  global.PASSAGES = PASSAGES;
  global.ASSESSMENT_POOLS = ASSESSMENT_POOLS;
  global.SKILL_META = SKILL_META;
  global.bandOf = bandOf;
}



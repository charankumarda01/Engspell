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
  {
    w: "about",
    ipa: "/əˈbaʊt/",
    lvl: "A1",
    def: "On the subject of, or approximately.",
    sit: "Giving an estimate or introducing a topic in casual or business talk.",
    how: "Use before a topic (\"talk about\") or before a number (\"about 10 minutes\").",
    eg: "\"What is the meeting about?\" — \"It's about the new client project.\"",
    tag: "daily"
  },
  {
    w: "accept",
    ipa: "/əkˈsɛpt/",
    lvl: "B1",
    def: "To agree to take something or say yes to an offer.",
    sit: "Responding to job offers, invitations, or agreeing to terms in meetings.",
    how: "Use with an offer or apology: \"accept an offer\" or \"accept responsibility\".",
    eg: "\"Did you accept the job offer?\" — \"Yes, I accepted it yesterday.\"",
    tag: "workplace"
  },
  {
    w: "accommodate",
    ipa: "/əˈkɒmədeɪt/",
    lvl: "C1",
    def: "To adjust to meet someone's needs, or to provide enough space.",
    sit: "Rescheduling meetings to suit busy clients, or booking hotel/conference rooms.",
    how: "Use with a person or request: \"accommodate your schedule / accommodate 50 people\".",
    eg: "\"Can we shift the call to 4 PM?\" — \"Sure, we can accommodate that.\"",
    tag: "workplace"
  },
  {
    w: "achieve",
    ipa: "/əˈtʃiːv/",
    lvl: "B1",
    def: "To successfully reach a goal after hard work.",
    sit: "Performance reviews, quarterly presentations, and resume discussions.",
    how: "Follow with a goal or target: \"achieve our goals / achieve success\".",
    eg: "\"Did the team achieve the monthly target?\" — \"Yes, we exceeded it by 10%.\"",
    tag: "professional"
  },
  {
    w: "acknowledge",
    ipa: "/əkˈnɒlɪdʒ/",
    lvl: "B2",
    def: "To openly accept that something is true, or confirm receiving something.",
    sit: "Email replies confirming receipt, or validating someone's contribution in a meeting.",
    how: "Use at the start of emails: \"I acknowledge receipt of...\" or \"We acknowledge your effort\".",
    eg: "\"Please acknowledge this email once received.\" — \"Acknowledged, thank you.\"",
    tag: "workplace"
  },
  {
    w: "acquire",
    ipa: "/əˈkwaɪər/",
    lvl: "B2",
    def: "To get, gain, or learn something over time.",
    sit: "Discussing skills learned in interviews, or business company acquisitions.",
    how: "Use with skills, habits, or assets: \"acquire new skills / acquire knowledge\".",
    eg: "\"How did you learn Python?\" — \"I acquired the skill during my last internship.\"",
    tag: "professional"
  },
  {
    w: "actually",
    ipa: "/ˈæktʃuəli/",
    lvl: "A2",
    def: "Used to emphasize what is really true, or to politely correct someone.",
    sit: "Politely correcting a misunderstanding without sounding confrontational.",
    how: "Place at the start of a sentence or before the verb: \"Actually, that's at 3 PM\".",
    eg: "\"Is the flight tomorrow?\" — \"Actually, it leaves tonight at 11 PM.\"",
    tag: "social"
  },
  {
    w: "adequate",
    ipa: "/ˈædɪkwət/",
    lvl: "B2",
    def: "Good enough or sufficient in quantity for a particular need.",
    sit: "Assessing project resources, budget sufficiency, or candidate qualifications.",
    how: "Follow with \"for\": \"adequate for the task\" or \"an adequate explanation\".",
    eg: "\"Is the budget adequate for this sprint?\" — \"It is adequate, but tight.\"",
    tag: "workplace"
  },
  {
    w: "admire",
    ipa: "/ədˈmaɪər/",
    lvl: "B1",
    def: "To respect and appreciate someone for their qualities or achievements.",
    sit: "Giving genuine compliments to mentors, colleagues, or leaders.",
    how: "Use directly with a person or quality: \"I admire your dedication / work ethic\".",
    eg: "\"I really admire how calmly you handled that difficult client call.\"",
    tag: "social"
  },
  {
    w: "admit",
    ipa: "/ədˈmɪt/",
    lvl: "B1",
    def: "To honestly agree that you did something wrong or that something is true.",
    sit: "Taking accountability for a mistake during a post-mortem or 1:1 sync.",
    how: "Follow with \"that\" or \"to\": \"I admit that I made an oversight\".",
    eg: "\"I have to admit, I didn't double-check the deployment script before pushing.\"",
    tag: "workplace"
  },
  {
    w: "affect",
    ipa: "/əˈfɛkt/",
    lvl: "B1",
    def: "To cause a change in someone or something (verb).",
    sit: "Discussing system downtime, policy changes, or market impacts.",
    how: "Use as a verb (contrast with effect, which is usually a noun): \"will affect our timeline\".",
    eg: "\"Will the server maintenance affect our users?\" — \"Only for about 15 minutes.\"",
    tag: "professional"
  },
  {
    w: "afford",
    ipa: "/əˈfɔːd/",
    lvl: "A2",
    def: "To have enough money or time to be able to do something.",
    sit: "Budget discussions, purchasing decisions, or schedule prioritisation.",
    how: "Usually follows \"can\" or \"can't\": \"We can't afford to delay this release\".",
    eg: "\"Can we afford a two-week delay?\" — \"No, the client needs it by Friday.\"",
    tag: "workplace"
  },
  {
    w: "although",
    ipa: "/ɔːlˈðəʊ/",
    lvl: "B1",
    def: "Despite the fact that; used to connect two contrasting facts.",
    sit: "Presenting balanced arguments where pros and cons exist.",
    how: "Do NOT pair with \"but\" in the same sentence: \"Although it rained, we played\".",
    eg: "\"Although the initial tests failed, the team quickly fixed the bug.\"",
    tag: "academic"
  },
  {
    w: "ambiguous",
    ipa: "/æmˈbɪɡjuəs/",
    lvl: "C1",
    def: "Having more than one possible meaning, unclear or vague.",
    sit: "Code reviews, contract negotiations, or requirement clarification meetings.",
    how: "Describe statements or requirements: \"The requirement is ambiguous; please clarify\".",
    eg: "\"This clause in the contract is ambiguous. Let's ask legal to rephrase it.\"",
    tag: "workplace"
  },
  {
    w: "ambition",
    ipa: "/æmˈbɪʃən/",
    lvl: "B1",
    def: "A strong desire and drive to achieve something great.",
    sit: "Job interviews when answering \"Where do you see yourself in five years?\".",
    how: "Pair with \"to\" or possessive: \"My ambition is to lead engineering teams\".",
    eg: "\"What is your career ambition?\" — \"My ambition is to build scalable AI products.\"",
    tag: "professional"
  },
  {
    w: "analyse",
    ipa: "/ˈænəlaɪz/",
    lvl: "B2",
    def: "To examine something in detail in order to understand or explain it.",
    sit: "Data analytics, troubleshooting errors, or evaluating quarterly reports.",
    how: "Follow with the object of study: \"analyse the logs / data / trends\".",
    eg: "\"We need to analyse user feedback before releasing the update.\"",
    tag: "academic"
  },
  {
    w: "appropriate",
    ipa: "/əˈprəʊpriət/",
    lvl: "B2",
    def: "Suitable, fitting, or proper for a particular situation or person.",
    sit: "Deciding workplace etiquette, dress code, or professional tone in messages.",
    how: "Pair with \"for\": \"Is this tone appropriate for an executive email?\"",
    eg: "\"Make sure your message uses an appropriate tone for external clients.\"",
    tag: "workplace"
  },
  {
    w: "approximately",
    ipa: "/əˈprɒksɪmətli/",
    lvl: "B2",
    def: "Close to a particular number or time, but not completely accurate.",
    sit: "Giving estimates for project completion, budgets, or travel times.",
    how: "Place before a number or duration: \"approximately 45 minutes / $5,000\".",
    eg: "\"How long will the migration take?\" — \"Approximately three hours.\"",
    tag: "workplace"
  },
  {
    w: "argue",
    ipa: "/ˈɑːɡjuː/",
    lvl: "B1",
    def: "To present reasons for or against something, or to disagree verbally.",
    sit: "Debates, essay writing, or presenting a technical justification.",
    how: "Use \"argue that\" to state a view, or \"argue with\" someone.",
    eg: "\"Some engineers argue that microservices add unnecessary complexity.\"",
    tag: "academic"
  },
  {
    w: "assess",
    ipa: "/əˈsɛs/",
    lvl: "B2",
    def: "To carefully judge or evaluate the quality, importance, or value of something.",
    sit: "Risk assessments, candidate evaluation, or appraising project progress.",
    how: "Follow with the target: \"assess the risks / assess candidate skills\".",
    eg: "\"Let's assess the damage before restarting the production database.\"",
    tag: "professional"
  },
  {
    w: "assume",
    ipa: "/əˈsjuːm/",
    lvl: "B2",
    def: "To accept something as true without verification or proof.",
    sit: "Clarifying misunderstandings: \"Never assume, always verify with data\".",
    how: "Pair with \"that\": \"I assumed that you had already deployed the fix\".",
    eg: "\"Don't assume the user has a fast internet connection — optimize for mobile.\"",
    tag: "workplace"
  },
  {
    w: "available",
    ipa: "/əˈveɪləbl/",
    lvl: "A2",
    def: "Free to be used, bought, or ready to talk/help.",
    sit: "Scheduling calendar invites or asking a coworker for assistance.",
    how: "Ask \"Are you available at [time]?\" or \"Is the report available?\"",
    eg: "\"Are you available for a quick sync at 2 PM?\" — \"Yes, my calendar is free.\"",
    tag: "workplace"
  },
  {
    w: "because",
    ipa: "/bɪˈkɒz/",
    lvl: "A1",
    def: "For the reason that; introducing the cause of something.",
    sit: "Explaining why an action was taken or why an incident occurred.",
    how: "Connects a result to its cause: \"I called you because the build broke\".",
    eg: "\"Why was the release postponed?\" — \"Because we found a critical bug in staging.\"",
    tag: "daily"
  },
  {
    w: "behaviour",
    ipa: "/bɪˈheɪvjər/",
    lvl: "B1",
    def: "The way in which one acts or conducts oneself.",
    sit: "Discussing workplace conduct, user interaction patterns, or software anomalies.",
    how: "Use with adjectives: \"professional behaviour / unexpected software behaviour\".",
    eg: "\"The unexpected crash was caused by abnormal network behaviour.\"",
    tag: "workplace"
  },
  {
    w: "believe",
    ipa: "/bɪˈliːv/",
    lvl: "A2",
    def: "To think that something is true, or have faith in someone's ability.",
    sit: "Expressing a personal view politely or expressing confidence in a teammate.",
    how: "Say \"I believe that...\" to soften strong opinions in business settings.",
    eg: "\"I believe this design will improve our conversion rate significantly.\"",
    tag: "social"
  },
  {
    w: "benefit",
    ipa: "/ˈbɛnɪfɪt/",
    lvl: "B1",
    def: "An advantage or profit gained from something.",
    sit: "Pitching a product feature to a client or discussing company perks.",
    how: "Use as noun (\"the main benefit is...\") or verb (\"users will benefit from...\")",
    eg: "\"The biggest benefit of this tool is that it works completely offline.\"",
    tag: "professional"
  },
  {
    w: "business",
    ipa: "/ˈbɪznɪs/",
    lvl: "A2",
    def: "Commercial activity, a company, or matters that concern you.",
    sit: "Formal discussions, commercial trade, or meeting agendas (\"let's get down to business\").",
    how: "Pronounce with two syllables /ˈbɪznɪs/ (never \"busy-ness\").",
    eg: "\"Good morning everyone, let's get straight down to business.\"",
    tag: "workplace"
  },
  {
    w: "calendar",
    ipa: "/ˈkælɪndər/",
    lvl: "A2",
    def: "A chart or schedule showing days, weeks, and scheduled appointments.",
    sit: "Setting up meetings, checking availability, or booking holidays.",
    how: "Say \"Check your calendar\" or \"I'll send a calendar invite\".",
    eg: "\"I've put an invite on your calendar for tomorrow's sprint retrospective.\"",
    tag: "workplace"
  },
  {
    w: "careful",
    ipa: "/ˈkeəfʊl/",
    lvl: "A1",
    def: "Taking care to avoid mistakes, damage, or danger.",
    sit: "Warning colleagues during production deployments or data handling.",
    how: "Use with \"with\" or \"to\": \"Be careful with sensitive customer data\".",
    eg: "\"Please be very careful when running migration scripts on production.\"",
    tag: "daily"
  },
  {
    w: "category",
    ipa: "/ˈkætɪɡəri/",
    lvl: "B2",
    def: "A class or division of people or things having particular characteristics.",
    sit: "Organizing database entries, product catalogs, or filing expenses.",
    how: "Pair with \"into\": \"We divided the feedback into three distinct categories\".",
    eg: "\"Which category does this user complaint fall under?\"",
    tag: "academic"
  },
  {
    w: "cause",
    ipa: "/kɔːz/",
    lvl: "A2",
    def: "A person, thing, or event that gives rise to an action or condition.",
    sit: "Root cause analysis, debugging system outages, or discussing reasons.",
    how: "Noun: \"the root cause\". Verb: \"this caused the latency spike\".",
    eg: "\"What was the root cause of the server failure?\" — \"A memory leak in worker 3.\"",
    tag: "professional"
  },
  {
    w: "certain",
    ipa: "/ˈsɜːtən/",
    lvl: "A2",
    def: "Completely sure and having no doubt, or referring to a specific item.",
    sit: "Expressing high confidence in an answer during meetings or presentations.",
    how: "Say \"I am certain that...\" or \"Under certain conditions...\".",
    eg: "\"Are you certain the backup completed?\" — \"Yes, I verified the checksums.\"",
    tag: "workplace"
  },
  {
    w: "challenge",
    ipa: "/ˈtʃælɪndʒ/",
    lvl: "B1",
    def: "A difficult task or situation that tests someone's ability.",
    sit: "Interview discussions about problems solved, or framing roadblocks positively.",
    how: "Use instead of \"problem\" to sound proactive: \"This presents a welcome challenge\".",
    eg: "\"Our biggest challenge was scaling the database to handle peak traffic.\"",
    tag: "professional"
  },
  {
    w: "character",
    ipa: "/ˈkærəktər/",
    lvl: "A2",
    def: "The mental and moral qualities of a person, or a letter/symbol.",
    sit: "Describing a colleague's integrity, or talking about password lengths and fonts.",
    how: "Pronounce starting with /k/ (not /tʃ/): \"a person of strong character\".",
    eg: "\"Her calmness under pressure reveals a lot about her character.\"",
    tag: "social"
  },
  {
    w: "colleague",
    ipa: "/ˈkɒliːɡ/",
    lvl: "B1",
    def: "A person with whom one works in a profession or business.",
    sit: "Introducing coworkers to clients, or referring to team members respectfully.",
    how: "Two syllables /ˈkɒliːɡ/ (the \"-gue\" is pronounced /ɡ/, not \"colleeg-you\").",
    eg: "\"Let me introduce my colleague, Priya, who leads the frontend team.\"",
    tag: "workplace"
  },
  {
    w: "commitment",
    ipa: "/kəˈmɪtmənt/",
    lvl: "B2",
    def: "A promise or firm pledge to do something, or dedication to a cause.",
    sit: "Sprint planning, project scope agreements, and client contracts.",
    how: "Pair with \"make\" or \"honour\": \"We made a commitment to deliver on Monday\".",
    eg: "\"The team showed incredible commitment to meet the aggressive deadline.\"",
    tag: "workplace"
  },
  {
    w: "communicate",
    ipa: "/kəˈmjuːnɪkeɪt/",
    lvl: "B1",
    def: "To share or exchange information, ideas, or feelings clearly.",
    sit: "Highlighting interpersonal skills or discussing team alignment.",
    how: "Pair with \"with\" or \"to\": \"communicate effectively with stakeholders\".",
    eg: "\"It is vital to communicate changes promptly to all affected teams.\"",
    tag: "workplace"
  },
  {
    w: "community",
    ipa: "/kəˈmjuːnɪti/",
    lvl: "B1",
    def: "A group of people living in the same place or having a particular interest in common.",
    sit: "Open-source projects, developer forums, or neighbourhood initiatives.",
    how: "Use with adjectives: \"the developer community / local community\".",
    eg: "\"EngSpell has a vibrant open-source developer community.\"",
    tag: "social"
  },
  {
    w: "complex",
    ipa: "/ˈkɒmplɛks/",
    lvl: "B2",
    def: "Consisting of many different and connected parts; not simple.",
    sit: "Describing software architecture, legal documents, or mathematical algorithms.",
    how: "Stress the first syllable /ˈkɒmplɛks/ when used as an adjective.",
    eg: "\"Let's break down this complex problem into smaller, manageable tasks.\"",
    tag: "academic"
  },
  {
    w: "concentrate",
    ipa: "/ˈkɒnsəntreɪt/",
    lvl: "B1",
    def: "To focus all one's attention or effort on a particular activity.",
    sit: "Focus time, studying for exams, or silencing notifications to work deeply.",
    how: "Always pair with \"on\" (never \"in\"): \"concentrate on writing code\".",
    eg: "\"Please put your phone on silent so we can concentrate on this workshop.\"",
    tag: "daily"
  },
  {
    w: "confident",
    ipa: "/ˈkɒnfɪdənt/",
    lvl: "B1",
    def: "Feeling or showing certainty about something or trust in oneself.",
    sit: "Pitching ideas, speaking in front of leadership, or job interviews.",
    how: "Pair with \"that\" or \"about\": \"I am confident that we will deliver on time\".",
    eg: "\"You should feel confident speaking up in the architecture review.\"",
    tag: "professional"
  },
  {
    w: "consequence",
    ipa: "/ˈkɒnsɪkwəns/",
    lvl: "B2",
    def: "A result or effect of an action or condition.",
    sit: "Risk analysis, compliance warnings, or explaining cause-and-effect.",
    how: "Say \"as a consequence of...\" or \"face the consequences\".",
    eg: "\"Delaying the code freeze will have serious consequences for testing.\"",
    tag: "workplace"
  },
  {
    w: "consider",
    ipa: "/kənˈsɪdər/",
    lvl: "B1",
    def: "To think carefully about something, typically before making a decision.",
    sit: "Brainstorming solutions, reviewing proposals, or weighing job offers.",
    how: "Follow with a noun or gerund (-ing): \"consider migrating to the cloud\".",
    eg: "\"Please consider my proposal and let me know your thoughts tomorrow.\"",
    tag: "workplace"
  },
  {
    w: "consistent",
    ipa: "/kənˈsɪstənt/",
    lvl: "B2",
    def: "Acting or done in the same way over time, showing steady reliability.",
    sit: "Habit formation, brand voice guidelines, or performance reviews.",
    how: "Pair with \"with\": \"consistent with our company values\".",
    eg: "\"Consistent daily practice of fifteen minutes beats weekend cramming.\"",
    tag: "professional"
  },
  {
    w: "convenient",
    ipa: "/kənˈviːniənt/",
    lvl: "B2",
    def: "Fitting in well with a person's needs, activities, or plans; easy to use.",
    sit: "Proposing meeting times or discussing app ergonomics.",
    how: "Say \"Is 3 PM convenient for you?\" or \"a convenient location\".",
    eg: "\"Would Tuesday afternoon be convenient for our quarterly review?\"",
    tag: "workplace"
  },
  {
    w: "correct",
    ipa: "/kəˈrɛkt/",
    lvl: "A1",
    def: "Free from error; in accordance with fact or truth.",
    sit: "Validating answers, approving PRs, or confirming details on a ticket.",
    how: "Use as adjective (\"That is correct\") or verb (\"Let me correct that typo\").",
    eg: "\"Is this the correct email address for billing inquiries?\" — \"Yes, that's it.\"",
    tag: "daily"
  },
  {
    w: "creative",
    ipa: "/kriˈeɪtɪv/",
    lvl: "B1",
    def: "Relating to or involving the use of the imagination or original ideas.",
    sit: "Design sprints, marketing campaigns, or innovative engineering solutions.",
    how: "Describe solutions or people: \"a creative approach / creative thinker\".",
    eg: "\"She came up with a very creative workaround for the browser audio limit.\"",
    tag: "professional"
  },
  {
    w: "critical",
    ipa: "/ˈkrɪtɪkəl/",
    lvl: "B2",
    def: "Extremely important, or expressing adverse or disapproving comments.",
    sit: "Bug triage (P0 critical bugs), mission-critical deadlines, or analytical reviews.",
    how: "Use for urgency: \"This security patch is critical for our infrastructure\".",
    eg: "\"It is critical that we patch this vulnerability before Monday morning.\"",
    tag: "professional"
  },
  {
    w: "curious",
    ipa: "/ˈkjʊəriəs/",
    lvl: "B1",
    def: "Eager to know or learn something, or strange and unusual.",
    sit: "Expressing willingness to learn in interviews or investigating weird bugs.",
    how: "Pair with \"about\" or \"to know\": \"I am curious to learn how this works\".",
    eg: "\"I was curious about your approach to state management in vanilla JS.\"",
    tag: "social"
  },
  {
    w: "decision",
    ipa: "/dɪˈsɪʒən/",
    lvl: "B1",
    def: "A conclusion or resolution reached after consideration.",
    sit: "Closing meetings with action items, leadership announcements.",
    how: "Use with \"make\" (never \"take a decision\" in standard British/American English).",
    eg: "\"We need to make a firm decision on the database architecture today.\"",
    tag: "workplace"
  },
  {
    w: "describe",
    ipa: "/dɪˈskraɪb/",
    lvl: "A2",
    def: "To give a detailed account in words of someone or something.",
    sit: "Job interview prompts (\"Describe a time you solved a conflict\"), or bug reports.",
    how: "Follow directly with the object: \"describe the issue / describe the workflow\".",
    eg: "\"Could you please describe the steps to reproduce this UI glitch?\"",
    tag: "workplace"
  },
  {
    w: "develop",
    ipa: "/dɪˈvɛləp/",
    lvl: "A2",
    def: "To grow or cause to grow and become more mature, advanced, or elaborate.",
    sit: "Software engineering, career growth, or building new product features.",
    how: "Pronounce with stress on the second syllable /dɪˈvɛləp/.",
    eg: "\"Our team is developing a new speech recognition feature for the app.\"",
    tag: "professional"
  },
  {
    w: "difficult",
    ipa: "/ˈdɪfɪkəlt/",
    lvl: "A1",
    def: "Needing much effort or skill to accomplish, deal with, or understand.",
    sit: "Highlighting hurdles solved, or setting realistic project expectations.",
    how: "Use with \"for\" or \"to\": \"This concept is difficult to grasp at first\".",
    eg: "\"Pronouncing English diphthongs can be difficult for non-native speakers.\"",
    tag: "daily"
  },
  {
    w: "discuss",
    ipa: "/dɪˈskʌs/",
    lvl: "A2",
    def: "To talk about something with another person or in a group.",
    sit: "Meeting agendas, collaborative syncs, and planning sessions.",
    how: "Do NOT use \"about\" after discuss: say \"discuss the proposal\" (not \"discuss about\").",
    eg: "\"Let's discuss the quarterly roadmap during our afternoon standup.\"",
    tag: "workplace"
  },
  {
    w: "effective",
    ipa: "/ɪˈfɛktɪv/",
    lvl: "B2",
    def: "Successful in producing a desired or intended result.",
    sit: "Measuring campaign outcomes, testing study routines, or evaluating tools.",
    how: "Use for outcomes: \"an effective communication strategy / effective solution\".",
    eg: "\"Spaced repetition is the most effective method for long-term vocabulary retention.\"",
    tag: "academic"
  },
  {
    w: "efficient",
    ipa: "/ɪˈfɪʃənt/",
    lvl: "B2",
    def: "Achieving maximum productivity with minimum wasted effort or expense.",
    sit: "Optimizing algorithms, time management, or lean operational processes.",
    how: "Focus on speed/waste: \"an efficient algorithm saves memory and battery\".",
    eg: "\"Writing clean modular code makes debugging much faster and more efficient.\"",
    tag: "professional"
  },
  {
    w: "embarrass",
    ipa: "/ɪmˈbærəs/",
    lvl: "B1",
    def: "To cause someone to feel awkward, self-conscious, or ashamed.",
    sit: "Encouraging language learners to speak without fear of making mistakes.",
    how: "Commonly used in passive: \"Don't feel embarrassed if you mispronounce a word\".",
    eg: "\"Never feel embarrassed by mistakes; they are the fastest way to learn.\"",
    tag: "social"
  },
  {
    w: "emphasise",
    ipa: "/ˈɛmfəsaɪz/",
    lvl: "B2",
    def: "To give special importance or prominence to something in speaking or writing.",
    sit: "Keynote presentations, executive summaries, or highlighting priorities.",
    how: "Follow directly with the point: \"I want to emphasise that quality comes first\".",
    eg: "\"The director emphasised the need for rigorous offline security testing.\"",
    tag: "workplace"
  },
  {
    w: "encourage",
    ipa: "/ɪnˈkʌrɪdʒ/",
    lvl: "B1",
    def: "To give support, confidence, or hope to someone.",
    sit: "Mentorship sessions, motivating team members, or peer code reviews.",
    how: "Follow with person + \"to\": \"I encourage everyone to try the new live coach\".",
    eg: "\"Great managers encourage their teams to experiment and learn from failures.\"",
    tag: "social"
  },
  {
    w: "enormous",
    ipa: "/ɪˈnɔːməs/",
    lvl: "B1",
    def: "Very large in size, quantity, or extent.",
    sit: "Describing massive growth, huge datasets, or monumental achievements.",
    how: "Use instead of \"very big\": \"an enormous amount of data / enormous progress\".",
    eg: "\"She has made enormous progress in her English pronunciation this month.\"",
    tag: "daily"
  },
  {
    w: "environment",
    ipa: "/ɪnˈvaɪrənmənt/",
    lvl: "B1",
    def: "The surroundings or conditions in which a person, animal, or software operates.",
    sit: "Staging vs production servers, office culture, or climate topics.",
    how: "Pronounce the \"n\" after \"r\": /ɪnˈvaɪrənmənt/.",
    eg: "\"We tested the release thoroughly in the staging environment before launch.\"",
    tag: "workplace"
  },
  {
    w: "essential",
    ipa: "/ɪˈsɛnʃəl/",
    lvl: "B2",
    def: "Absolutely necessary; extremely important.",
    sit: "Defining non-negotiable requirements, core values, or critical skills.",
    how: "Pair with \"for\" or \"to\": \"Clear pronunciation is essential for global interviews\".",
    eg: "\"Consistent daily practice is essential if you want to reach C1 fluency.\"",
    tag: "professional"
  },
  {
    w: "evaluate",
    ipa: "/ɪˈvæljueɪt/",
    lvl: "B2",
    def: "To form an idea of the amount, number, or value of something carefully.",
    sit: "Performance reviews, choosing vendors, or grading assessments.",
    how: "Follow with the object: \"evaluate the options / evaluate employee performance\".",
    eg: "\"We will evaluate both cloud and offline LLM options before deciding.\"",
    tag: "academic"
  },
  {
    w: "eventually",
    ipa: "/ɪˈvɛntʃuəli/",
    lvl: "B1",
    def: "In the end, especially after a long time or a lot of effort.",
    sit: "Sharing success stories of overcoming prolonged technical hurdles.",
    how: "Place at the start of a clause or between subject and verb.",
    eg: "\"It took four days to isolate the memory bug, but we eventually fixed it.\"",
    tag: "daily"
  },
  {
    w: "evidence",
    ipa: "/ˈɛvɪdəns/",
    lvl: "B2",
    def: "The available facts or information indicating whether a belief is true.",
    sit: "Backing up design decisions with data, or courtroom arguments.",
    how: "Uncountable noun (never say \"evidences\"): \"There is clear evidence that...\".",
    eg: "\"User analytics provided clear evidence that the new checkout flow works better.\"",
    tag: "academic"
  },
  {
    w: "exact",
    ipa: "/ɪɡˈzækt/",
    lvl: "A2",
    def: "Not approximated in any way; fully precise and correct.",
    sit: "Asking for specific error codes, exact meeting times, or pinpoint locations.",
    how: "Pair with nouns: \"the exact wording / the exact time\".",
    eg: "\"Could you tell me the exact error message that appeared on screen?\"",
    tag: "workplace"
  },
  {
    w: "excellent",
    ipa: "/ˈɛksələnt/",
    lvl: "A2",
    def: "Extremely good; of outstanding quality.",
    sit: "Praising a colleague's presentation, client feedback, or high test scores.",
    how: "Great formal compliment: \"An excellent presentation / excellent work\".",
    eg: "\"That was an excellent explanation of our system architecture, well done!\"",
    tag: "workplace"
  },
  {
    w: "experience",
    ipa: "/ɪkˈspɪəriəns/",
    lvl: "A2",
    def: "Practical contact with and observation of facts or events over time.",
    sit: "Interview discussions about career history, or discussing user experience.",
    how: "Noun: \"five years of experience\". Verb: \"We experienced downtime\".",
    eg: "\"Do you have experience managing distributed engineering teams?\"",
    tag: "professional"
  },
  {
    w: "explain",
    ipa: "/ɪkˈspleɪn/",
    lvl: "A2",
    def: "To make an idea or situation clear to someone by describing it in detail.",
    sit: "Teaching a junior colleague, explaining a bug to QA, or customer support.",
    how: "Say \"explain [something] to [someone]\" (never \"explain me this\").",
    eg: "\"Could you please explain this architecture diagram to the new team members?\"",
    tag: "workplace"
  },
  {
    w: "familiar",
    ipa: "/fəˈmɪliər/",
    lvl: "B1",
    def: "Well known from long or close association; easily recognized.",
    sit: "Assessing technical skill levels in candidate interviews or code onboarding.",
    how: "Pair with \"with\": \"Are you familiar with React and TypeScript?\"",
    eg: "\"I am quite familiar with Docker, but I am still learning Kubernetes.\"",
    tag: "professional"
  },
  {
    w: "fascinating",
    ipa: "/ˈfæsɪneɪtɪŋ/",
    lvl: "B2",
    def: "Extremely interesting and captivating.",
    sit: "Networking events, discussing innovative tech breakthroughs or research papers.",
    how: "Use instead of \"very interesting\" to elevate your spoken expression.",
    eg: "\"His keynote talk on neural network compression was absolutely fascinating.\"",
    tag: "social"
  },
  {
    w: "favourite",
    ipa: "/ˈfeɪvərɪt/",
    lvl: "A1",
    def: "Preferred before all others of the same kind.",
    sit: "Icebreaker questions in team meetings (\"What's your favourite podcast?\").",
    how: "Place directly before the noun: \"my favourite coding language\".",
    eg: "\"What is your favourite feature in the new EngSpell release?\"",
    tag: "social"
  },
  {
    w: "flexible",
    ipa: "/ˈflɛksɪbl/",
    lvl: "B2",
    def: "Able to adapt to new, different, or changing requirements.",
    sit: "Negotiating working hours, project deadlines, or describing modular code.",
    how: "Highlighting adaptability: \"I am flexible on the starting date\".",
    eg: "\"Our working hours are flexible as long as you attend the morning standup.\"",
    tag: "workplace"
  },
  {
    w: "fluent",
    ipa: "/ˈfluːənt/",
    lvl: "B2",
    def: "Able to express oneself easily and articulately in a language.",
    sit: "Language goals, job requirements, and resume qualifications.",
    how: "Pair with \"in\": \"She is fluent in both English and Hindi\".",
    eg: "\"With thirty minutes of daily practice, you will become fluent within a year.\"",
    tag: "professional"
  },
  {
    w: "focus",
    ipa: "/ˈfəʊkəs/",
    lvl: "B1",
    def: "The center of interest or activity, or to direct one's attention.",
    sit: "Sprint goals, strategy alignment meetings, or deep work routines.",
    how: "Always pair with \"on\" (never \"in\"): \"Let's focus on the critical user journey\".",
    eg: "\"Today our primary focus is eliminating audio latency on mobile browsers.\"",
    tag: "workplace"
  },
  {
    w: "foreign",
    ipa: "/ˈfɒrɪn/",
    lvl: "A2",
    def: "From, in, or characteristic of a country or language other than one's own.",
    sit: "Discussing international trade, travel, or foreign language learning.",
    how: "Silent \"g\": pronounce /ˈfɒrɪn/.",
    eg: "\"Learning a foreign language broadens your worldview and career opportunities.\"",
    tag: "daily"
  },
  {
    w: "frequently",
    ipa: "/ˈfriːkwəntli/",
    lvl: "B2",
    def: "Regularly or habitually; often.",
    sit: "Reporting recurring bugs, habit discussions, or frequency analysis.",
    how: "Use instead of \"often\" for a more professional and precise tone.",
    eg: "\"This error occurs frequently when users switch tabs while recording.\"",
    tag: "professional"
  },
  {
    w: "frustrated",
    ipa: "/frʌˈstreɪtɪd/",
    lvl: "B1",
    def: "Feeling annoyed or upset because you cannot achieve what you want.",
    sit: "Customer empathy during service outages, or discussing learning bottlenecks.",
    how: "Pair with \"with\" or \"by\": \"Users get frustrated by slow page loads\".",
    eg: "\"I felt frustrated when the microphone wasn't picking up my voice properly.\"",
    tag: "social"
  },
  {
    w: "genuine",
    ipa: "/ˈdʒɛnjuɪn/",
    lvl: "B2",
    def: "Truly what something is said to be; authentic, sincere, and honest.",
    sit: "Building trust with clients, complimenting coworkers, or detecting fake reviews.",
    how: "Three syllables: /ˈdʒɛnjuɪn/ (rhymes with \"tin\", not \"wine\").",
    eg: "\"He expressed a genuine desire to help the junior engineers grow.\"",
    tag: "social"
  },
  {
    w: "gradually",
    ipa: "/ˈɡrædʒuəli/",
    lvl: "B2",
    def: "Taking place or progressing slowly in small stages over time.",
    sit: "Describing learning progress, system rollouts, or market adoption.",
    how: "Place before the verb: \"Your accent will gradually neutralize with practice\".",
    eg: "\"We are gradually rolling out the new UI to 10% of users first.\"",
    tag: "daily"
  },
  {
    w: "grateful",
    ipa: "/ˈɡreɪtfʊl/",
    lvl: "B1",
    def: "Feeling or showing an appreciation of kindness; thankful.",
    sit: "Writing formal thank-you notes, acknowledging help from a coworker or mentor.",
    how: "Spell \"grateful\" (not \"greatful\")! Pair with \"for\": \"I am grateful for your help\".",
    eg: "\"I would be deeply grateful if you could review my draft presentation.\"",
    tag: "workplace"
  },
  {
    w: "guarantee",
    ipa: "/ˌɡærənˈtiː/",
    lvl: "B2",
    def: "A formal promise that certain conditions will be fulfilled; to promise with certainty.",
    sit: "SLA commitments, software reliability assurances, or product warranties.",
    how: "Verb: \"We guarantee 99.9% uptime\". Noun: \"There is no guarantee\".",
    eg: "\"We can guarantee that your API key stays strictly on your local device.\"",
    tag: "professional"
  },
  {
    w: "guidance",
    ipa: "/ˈɡaɪdəns/",
    lvl: "B2",
    def: "Advice or information aimed at resolving a problem or difficulty.",
    sit: "Asking a senior lead or manager for strategic direction on a tricky project.",
    how: "Pair with \"provide\" or \"seek\": \"I would appreciate your guidance on this proposal\".",
    eg: "\"Under her experienced guidance, the team delivered the project ahead of schedule.\"",
    tag: "workplace"
  },
  {
    w: "hesitate",
    ipa: "/ˈhɛzɪteɪt/",
    lvl: "B2",
    def: "To pause before saying or doing something through uncertainty.",
    sit: "Closing emails politely: \"Do not hesitate to reach out if you have questions\".",
    how: "Very common formal sign-off: \"Please don't hesitate to contact me\".",
    eg: "\"If you need any assistance setting up your mic, please don't hesitate to ask.\"",
    tag: "workplace"
  },
  {
    w: "highlight",
    ipa: "/ˈhaɪlaɪt/",
    lvl: "B2",
    def: "To draw special attention to an important fact, feature, or achievement.",
    sit: "Summarising key points in presentations, executive meetings, or release notes.",
    how: "Follow with the key message: \"I want to highlight three major achievements\".",
    eg: "\"In today's demo, I will highlight the offline accent neutralization drills.\"",
    tag: "workplace"
  },
  {
    w: "immediately",
    ipa: "/ɪˈmiːdiətli/",
    lvl: "B1",
    def: "At once; instantly and without any delay.",
    sit: "Critical incident response, urgent customer requests, or quick actions.",
    how: "Place at start or end of sentence: \"Please restart the server immediately\".",
    eg: "\"When a critical bug is detected, the on-call engineer is notified immediately.\"",
    tag: "daily"
  },
  {
    w: "improve",
    ipa: "/ɪmˈpruːv/",
    lvl: "A2",
    def: "To make or become better in quality, performance, or capability.",
    sit: "Career progression talks, code refactoring, or language learning goals.",
    how: "Pair with skills or metrics: \"improve your spoken English / improve conversion\".",
    eg: "\"Practising minimal pairs daily will rapidly improve your vowel clarity.\"",
    tag: "daily"
  },
  {
    w: "independent",
    ipa: "/ˌɪndɪˈpɛndənt/",
    lvl: "B1",
    def: "Free from outside control; not depending on another's authority or support.",
    sit: "Describing work ethic in interviews (\"I am an independent problem-solver\").",
    how: "Follow with \"of\": \"independent of external servers\".",
    eg: "\"Our application is completely offline-first and independent of remote servers.\"",
    tag: "professional"
  },
  {
    w: "influence",
    ipa: "/ˈɪnfluəns/",
    lvl: "B2",
    def: "The capacity to have an effect on the character, development, or behaviour of someone.",
    sit: "Leadership evaluations, discussing key factors in market trends.",
    how: "Noun: \"a strong influence\". Verb: \"His advice influenced my career path\".",
    eg: "\"Clear articulation has a massive influence on how executive leadership perceives you.\"",
    tag: "professional"
  },
  {
    w: "information",
    ipa: "/ˌɪnfəˈmeɪʃən/",
    lvl: "A1",
    def: "Facts provided or learned about something or someone.",
    sit: "Sharing documentation, onboarding new employees, or user data privacy.",
    how: "Uncountable noun (never say \"informations\"): \"Can you share that information?\"",
    eg: "\"Could you please forward the meeting information to the engineering leads?\"",
    tag: "daily"
  },
  {
    w: "intelligent",
    ipa: "/ɪnˈtɛlɪdʒənt/",
    lvl: "B1",
    def: "Having or showing intelligence, especially of a high level.",
    sit: "Complimenting smart architecture, analytical thinking, or AI systems.",
    how: "Describe people, systems, or questions: \"an intelligent design / question\".",
    eg: "\"She asked an intelligent question that made us rethink our entire database schema.\"",
    tag: "social"
  },
  {
    w: "interested",
    ipa: "/ˈɪntrɪstɪd/",
    lvl: "A1",
    def: "Showing curiosity or concern about something or someone.",
    sit: "Networking discussions, exploring collaboration, or customer intent.",
    how: "Always pair with \"in\" (never \"on\"): \"I am interested in learning AI\".",
    eg: "\"Are you interested in joining our beta testing group for the speech coach?\"",
    tag: "social"
  },
  {
    w: "introduce",
    ipa: "/ˌɪntrəˈdjuːs/",
    lvl: "A2",
    def: "To bring a person, product, or idea into use or acquaintance for the first time.",
    sit: "Opening client meetings with intros, or launching a new product feature.",
    how: "Say \"introduce [person] to [group]\" or \"introduce a new feature\".",
    eg: "\"Allow me to introduce our lead data architect, Vikram.\"",
    tag: "workplace"
  },
  {
    w: "investigate",
    ipa: "/ɪnˈvɛstɪɡeɪt/",
    lvl: "B2",
    def: "To carry out a systematic or formal inquiry to discover the truth.",
    sit: "Debugging intermittent crashes, investigating security alerts or fraud.",
    how: "Follow with the issue: \"investigate the root cause of the slowdown\".",
    eg: "\"Our security team will investigate the suspicious API requests immediately.\"",
    tag: "workplace"
  },
  {
    w: "knowledge",
    ipa: "/ˈnɒlɪdʒ/",
    lvl: "B1",
    def: "Facts, information, and skills acquired through experience or education.",
    sit: "Knowledge sharing within teams, documentation, or technical assessments.",
    how: "Uncountable: \"broaden your knowledge\" (silent 'k': /ˈnɒlɪdʒ/).",
    eg: "\"Sharing technical knowledge across departments makes the whole company stronger.\"",
    tag: "academic"
  },
  {
    w: "language",
    ipa: "/ˈlæŋɡwɪdʒ/",
    lvl: "A1",
    def: "A system of communication used by a particular community or country.",
    sit: "Discussing multilingual skills, body language, or programming languages.",
    how: "Pair with adjectives: \"spoken language / programming language / body language\".",
    eg: "\"English is the global language of business and technology.\"",
    tag: "daily"
  },
  {
    w: "leadership",
    ipa: "/ˈliːdəʃɪp/",
    lvl: "B2",
    def: "The action of leading a group of people or an organization, or the leaders themselves.",
    sit: "Management discussions, promotions, and strategic vision meetings.",
    how: "Pair with \"skills\" or \"team\": \"demonstrate strong leadership skills\".",
    eg: "\"Her thoughtful leadership guided the team through a difficult product transition.\"",
    tag: "professional"
  },
  {
    w: "magnificent",
    ipa: "/mæɡˈnɪfɪsənt/",
    lvl: "C1",
    def: "Extremely beautiful, elaborate, or impressive; splendid.",
    sit: "Describing extraordinary achievements, architecture, or landscapes.",
    how: "Use to express high praise: \"a magnificent effort / magnificent view\".",
    eg: "\"The engineering team pulled off a magnificent performance under extreme pressure.\"",
    tag: "social"
  },
  {
    w: "maintain",
    ipa: "/meɪnˈteɪn/",
    lvl: "B2",
    def: "To cause or enable a condition or state of affairs to continue.",
    sit: "Code maintenance, keeping healthy habits, or managing client relationships.",
    how: "Follow with state or system: \"maintain code quality / maintain standards\".",
    eg: "\"It is much cheaper to write clean tests now than to maintain buggy code later.\"",
    tag: "professional"
  },
  {
    w: "manage",
    ipa: "/ˈmænɪdʒ/",
    lvl: "A2",
    def: "To be in charge of, or to succeed in doing something despite difficulty.",
    sit: "Leadership roles, budget oversight, or handling tight schedules.",
    how: "Verb: \"manage a team\" or \"manage to finish on time\".",
    eg: "\"Did you manage to complete the performance benchmarking before the meeting?\"",
    tag: "workplace"
  },
  {
    w: "necessary",
    ipa: "/ˈnɛsəsəri/",
    lvl: "A2",
    def: "Required to be done, achieved, or present; needed; essential.",
    sit: "Listing prerequisites for a role, or justifying changes in a project plan.",
    how: "Memory trick for spelling: one Collar (c), two Sleeves (ss).",
    eg: "\"It is necessary to run the automated test suite before opening a pull request.\"",
    tag: "workplace"
  },
  {
    w: "negotiate",
    ipa: "/nɪˈɡəʊʃieɪt/",
    lvl: "C1",
    def: "To discuss something in order to reach an agreement or compromise.",
    sit: "Salary talks, vendor contracts, or finding common ground with stakeholders.",
    how: "Pair with \"with\" or \"for\": \"negotiate for higher compensation / negotiate terms\".",
    eg: "\"We were able to negotiate a 20% discount by committing to an annual contract.\"",
    tag: "professional"
  },
  {
    w: "nervous",
    ipa: "/ˈnɜːvəs/",
    lvl: "A2",
    def: "Easily agitated or alarmed; feeling anxious or apprehensive.",
    sit: "Before giving public talks, entering interviews, or meeting leadership.",
    how: "Pair with \"about\": \"feeling nervous about the interview\".",
    eg: "\"It is completely normal to feel nervous before your first big client presentation.\"",
    tag: "social"
  },
  {
    w: "notice",
    ipa: "/ˈnəʊtɪs/",
    lvl: "A2",
    def: "To become aware of something by seeing or hearing it; formal warning.",
    sit: "Spotting regression bugs, giving resignation notice, or observing tone.",
    how: "Verb: \"Did you notice the latency drop?\" Noun: \"two weeks' notice\".",
    eg: "\"Did you notice any audio clipping when testing on Safari?\"",
    tag: "daily"
  },
  {
    w: "obviously",
    ipa: "/ˈɒbviəsli/",
    lvl: "B1",
    def: "In a way that is easily perceived or understood; clearly.",
    sit: "Stating an evident truth or shared fact among team members.",
    how: "Use gently so you do not sound condescending to junior coworkers.",
    eg: "\"Obviously, we need to verify all inputs to prevent injection attacks.\"",
    tag: "social"
  },
  {
    w: "occasion",
    ipa: "/əˈkeɪʒən/",
    lvl: "B1",
    def: "A particular time, especially when something important happens.",
    sit: "Milestone celebrations, award ceremonies, or special team dinners.",
    how: "Pair with \"on\": \"on this special occasion / on several occasions\".",
    eg: "\"The launch of version 2.0 was a memorable occasion for the whole company.\"",
    tag: "social"
  },
  {
    w: "opportunity",
    ipa: "/ˌɒpəˈtjuːnɪti/",
    lvl: "B1",
    def: "A set of circumstances that makes it possible to do something desirable.",
    sit: "Discussing promotions, career transitions, or exploring new markets.",
    how: "Pair with \"to\" or \"for\": \"an incredible opportunity to lead a global team\".",
    eg: "\"This project provides a tremendous opportunity to hone your leadership skills.\"",
    tag: "professional"
  },
  {
    w: "participate",
    ipa: "/pɑːˈtɪsɪpeɪt/",
    lvl: "B2",
    def: "To be involved in an activity; to take part.",
    sit: "Encouraging team input in hackathons, meetings, or training workshops.",
    how: "Always pair with \"in\" (never \"at\"): \"participate in the discussion\".",
    eg: "\"We encourage all junior developers to actively participate in code reviews.\"",
    tag: "workplace"
  },
  {
    w: "patience",
    ipa: "/ˈpeɪʃəns/",
    lvl: "B1",
    def: "The capacity to accept or tolerate delay, difficulty, or suffering calmly.",
    sit: "Customer support, mentoring interns, or mastering tricky pronunciation.",
    how: "Pair with \"have\" or \"require\": \"Accent neutralization requires daily patience\".",
    eg: "\"Thank you for your patience while we investigated the database downtime.\"",
    tag: "social"
  },
  {
    w: "perhaps",
    ipa: "/pəˈhæps/",
    lvl: "A2",
    def: "Used to express uncertainty or to make a polite suggestion.",
    sit: "Politely proposing an alternative idea without sounding bossy or arrogant.",
    how: "Use at the start of a suggestion: \"Perhaps we could try caching this query\".",
    eg: "\"Perhaps we should schedule a follow-up call once the logs are analyzed.\"",
    tag: "workplace"
  },
  {
    w: "persistence",
    ipa: "/pəˈsɪstəns/",
    lvl: "C1",
    def: "Firm or obstinate continuance in a course of action in spite of difficulty.",
    sit: "Reflecting on overcoming tough technical challenges or startup journeys.",
    how: "Noun: \"Her persistence paid off when she finally solved the concurrency deadlock\".",
    eg: "\"Mastering any language comes down to daily persistence rather than raw talent.\"",
    tag: "professional"
  },
  {
    w: "persuade",
    ipa: "/pəˈsweɪd/",
    lvl: "B2",
    def: "To cause someone to do or believe something through reasoning or argument.",
    sit: "Sales pitches, convincing leadership to adopt a new tool or architecture.",
    how: "Say \"persuade [someone] to [do something]\".",
    eg: "\"She managed to persuade the executive board to fund the open-source initiative.\"",
    tag: "professional"
  },
  {
    w: "polite",
    ipa: "/pəˈlaɪt/",
    lvl: "A2",
    def: "Having or showing behaviour that is respectful and considerate of others.",
    sit: "Writing sensitive emails, customer communications, or workplace etiquette.",
    how: "Adjective: \"a polite response / remain polite under pressure\".",
    eg: "\"Even when the client became agitated, our support lead remained calm and polite.\"",
    tag: "social"
  },
  {
    w: "possible",
    ipa: "/ˈpɒsɪbl/",
    lvl: "A1",
    def: "Able to be done or achieved; that may exist or happen.",
    sit: "Feasibility studies, scoping features, or asking about timelines.",
    how: "Pair with \"as... as\": \"Please reply as soon as possible (ASAP)\".",
    eg: "\"Is it possible to complete this feature before the sprint ends?\"",
    tag: "daily"
  },
  {
    w: "practically",
    ipa: "/ˈpræktɪkli/",
    lvl: "B2",
    def: "Almost; or in a realistic and practical manner.",
    sit: "Giving realistic status updates or pragmatic engineering advice.",
    how: "Can mean \"virtually\": \"It's practically done, just running tests now\".",
    eg: "\"The new caching layer has practically eliminated server latency.\"",
    tag: "workplace"
  },
  {
    w: "prepare",
    ipa: "/prɪˈpeə/",
    lvl: "A2",
    def: "To make something ready for use or consideration; get ready.",
    sit: "Sprint prep, presentation drafting, or preparing for job interviews.",
    how: "Pair with \"for\": \"prepare for the upcoming audit / prepare the release notes\".",
    eg: "\"Take twenty minutes every evening to prepare your agenda for tomorrow.\"",
    tag: "daily"
  },
  {
    w: "previous",
    ipa: "/ˈpriːviəs/",
    lvl: "B1",
    def: "Existing or occurring before in time or order.",
    sit: "Referencing past sprints, previous employers, or earlier meeting decisions.",
    how: "Pair with nouns: \"in our previous discussion / at my previous company\".",
    eg: "\"As we mentioned in our previous email, the release date is moving up.\"",
    tag: "workplace"
  },
  {
    w: "probably",
    ipa: "/ˈprɒbəbli/",
    lvl: "A2",
    def: "Almost certainly; as far as one can tell or expect.",
    sit: "Giving reasonable forecasts when exact data isn't yet finalized.",
    how: "Pronounce /ˈprɒbəbli/ (three syllables, don't swallow the 'ba').",
    eg: "\"We will probably finish the security audit by Thursday afternoon.\"",
    tag: "daily"
  },
  {
    w: "progress",
    ipa: "/ˈprəʊɡrɛs/",
    lvl: "A2",
    def: "Forward movement toward a destination or a goal (noun).",
    sit: "Daily standups, weekly status rollups, or tracking learning gains.",
    how: "Noun has stress on first syllable: PRO-gress. Verb has stress on second: pro-GRESS.",
    eg: "\"We have made tremendous progress on our offline speech engine this sprint.\"",
    tag: "workplace"
  },
  {
    w: "proper",
    ipa: "/ˈprɒpər/",
    lvl: "A2",
    def: "Truly what something is said to be; suitable, appropriate, or correct.",
    sit: "Insisting on best practices, correct posture, or professional etiquette.",
    how: "Use before nouns: \"proper indentation / proper error handling\".",
    eg: "\"Make sure you include proper unit tests before submitting the pull request.\"",
    tag: "daily"
  },
  {
    w: "purpose",
    ipa: "/ˈpɜːpəs/",
    lvl: "B1",
    def: "The reason for which something is done or created or for which something exists.",
    sit: "Defining meeting objectives, mission statements, or software intent.",
    how: "Pair with \"of\": \"The main purpose of this meeting is to align on deadlines\".",
    eg: "\"What is the primary purpose of this architectural redesign?\"",
    tag: "workplace"
  },
  {
    w: "quality",
    ipa: "/ˈkwɒlɪti/",
    lvl: "A2",
    def: "The standard of something as measured against other things of a similar kind.",
    sit: "Quality assurance (QA), code reviews, or evaluating learning outcomes.",
    how: "Pair with adjectives: \"high quality / code quality / audio quality\".",
    eg: "\"Our commitment to high software quality means zero regressions pass CI.\"",
    tag: "workplace"
  },
  {
    w: "realistic",
    ipa: "/ˌrɪəˈlɪstɪk/",
    lvl: "B2",
    def: "Having or showing a sensible and practical idea of what can be achieved.",
    sit: "Setting sprint goals, estimating delivery dates, or career milestones.",
    how: "Pair with goals: \"a realistic timeline / realistic expectations\".",
    eg: "\"Let's set a realistic release target so the team doesn't burn out.\"",
    tag: "professional"
  },
  {
    w: "recognise",
    ipa: "/ˈrɛkəɡnaɪz/",
    lvl: "B1",
    def: "To identify someone or something from previous encounter or knowledge.",
    sit: "Speech recognition, acknowledging someone's contribution, or spotting patterns.",
    how: "Follow with the person or fact: \"I recognise your hard work on this launch\".",
    eg: "\"The browser engine failed to recognise the spoken phrase due to background noise.\"",
    tag: "workplace"
  },
  {
    w: "relationship",
    ipa: "/rɪˈleɪʃənʃɪp/",
    lvl: "B1",
    def: "The way in which two or more people, groups, or things are connected.",
    sit: "Client relationship management, cross-team collaboration, or networking.",
    how: "Pair with \"with\": \"build a strong relationship with international stakeholders\".",
    eg: "\"Building a trusting relationship with your engineering team takes time and empathy.\"",
    tag: "social"
  },
  {
    w: "relevant",
    ipa: "/ˈrɛlɪvənt/",
    lvl: "B2",
    def: "Closely connected or appropriate to what is being done or considered.",
    sit: "Filtering resume bullet points, staying on topic during meetings.",
    how: "Pair with \"to\": \"relevant to this discussion / relevant experience\".",
    eg: "\"Please keep your comments relevant to the architecture ticket under review.\"",
    tag: "workplace"
  },
  {
    w: "remarkable",
    ipa: "/rɪˈmɑːkəbl/",
    lvl: "B2",
    def: "Worthy of attention; striking or extraordinary.",
    sit: "Celebrating breakthroughs, glowing recommendations, or impressive metrics.",
    how: "Use instead of \"very good\" to give strong professional praise.",
    eg: "\"She achieved a remarkable 95% accuracy score on the Indian accent quiz.\"",
    tag: "professional"
  },
  {
    w: "responsible",
    ipa: "/rɪˈspɒnsɪbl/",
    lvl: "B1",
    def: "Having an obligation to do something, or having control over something.",
    sit: "Defining roles in project kickoff meetings or assigning ownership.",
    how: "Pair with \"for\": \"Who is responsible for deploying the patch?\"",
    eg: "\"Priya is responsible for the mobile responsive layout and accessibility.\"",
    tag: "workplace"
  },
  {
    w: "sensitive",
    ipa: "/ˈsɛnsɪtɪv/",
    lvl: "B2",
    def: "Quick to detect or respond to slight changes; needing careful handling.",
    sit: "Handling user passwords, discussing salary, or conflict resolution.",
    how: "Pair with data or topics: \"sensitive customer data / a sensitive topic\".",
    eg: "\"Please treat all user encryption keys as strictly sensitive information.\"",
    tag: "workplace"
  },
  {
    w: "significant",
    ipa: "/sɪɡˈnɪfɪkənt/",
    lvl: "B2",
    def: "Sufficiently great or important to be worthy of attention; noteworthy.",
    sit: "Reporting quarterly KPI growth, latency drops, or notable changes.",
    how: "Use for meaningful size: \"a significant improvement / significant reduction\".",
    eg: "\"We observed a significant reduction in memory usage after the rewrite.\"",
    tag: "professional"
  },
  {
    w: "situation",
    ipa: "/ˌsɪtʃuˈeɪʃən/",
    lvl: "A2",
    def: "A set of circumstances in which one finds oneself; state of affairs.",
    sit: "Navigating workplace dilemmas, crisis handling, or role-playing exercises.",
    how: "Pair with adjectives: \"a difficult situation / the current situation\".",
    eg: "\"Let's evaluate the situation calmly before notifying the executive team.\"",
    tag: "daily"
  },
  {
    w: "solution",
    ipa: "/səˈluːʃən/",
    lvl: "B1",
    def: "A means of solving a problem or dealing with a difficult situation.",
    sit: "Pitching technical proposals, resolving customer complaints, or brainstorming.",
    how: "Always pair with \"to\" (not \"for\"): \"the solution to this performance problem\".",
    eg: "\"We explored three different approaches before finding an elegant solution.\"",
    tag: "workplace"
  },
  {
    w: "specific",
    ipa: "/spɪˈsɪfɪk/",
    lvl: "B2",
    def: "Clearly defined or identified; precise and detailed.",
    sit: "Asking for exact bug reports, requirement specifications, or instructions.",
    how: "Pronounce starting with /sp/ (never add an \"e\" sound at the start like \"es-pacific\").",
    eg: "\"Could you give me a specific example of when this error occurred?\"",
    tag: "academic"
  },
  {
    w: "strengthen",
    ipa: "/ˈstrɛŋθən/",
    lvl: "B2",
    def: "To make or become stronger in power, vigor, or durability.",
    sit: "Team building, reinforcing security protocols, or deepening language skills.",
    how: "Follow with the object: \"strengthen our defenses / strengthen your vocabulary\".",
    eg: "\"Daily spaced review will strengthen your memory retention over time.\"",
    tag: "professional"
  },
  {
    w: "suggest",
    ipa: "/səˈdʒɛst/",
    lvl: "B1",
    def: "To put forward for consideration as a proposal or course of action.",
    sit: "Diplomatically offering alternative ideas during design reviews.",
    how: "Say \"I suggest that we...\" or \"suggest doing\" (never \"suggest you to do\").",
    eg: "\"I suggest we run load tests before opening the beta to the public.\"",
    tag: "workplace"
  },
  {
    w: "support",
    ipa: "/səˈpɔːt/",
    lvl: "A2",
    def: "To give assistance to, or to hold up and maintain.",
    sit: "Customer support, cross-browser compatibility, or standing behind a colleague.",
    how: "Verb or noun: \"support older devices / provide technical support\".",
    eg: "\"Our application supports all modern browsers on both desktop and mobile.\"",
    tag: "workplace"
  },
  {
    w: "surprise",
    ipa: "/səˈpraɪz/",
    lvl: "A2",
    def: "An unexpected or astonishing event, fact, or thing.",
    sit: "Delighting customers with quick service, or avoiding sudden unexpected bugs.",
    how: "Notice the spelling: two 'r's (sur-prise). \"It comes as no surprise that...\".",
    eg: "\"We wanted to surprise the team with an early Friday release celebration.\"",
    tag: "daily"
  },
  {
    w: "thorough",
    ipa: "/ˈθʌrə/",
    lvl: "C1",
    def: "Complete with regard to every detail; not superficial or partial.",
    sit: "Conducting deep code reviews, QA sweeps, or security audits.",
    how: "British pronunciation: /ˈθʌrə/ (rhymes with borough).",
    eg: "\"The QA engineer performed a thorough review of the edge cases.\"",
    tag: "professional"
  },
  {
    w: "throughout",
    ipa: "/θruːˈaʊt/",
    lvl: "B2",
    def: "In every part of a place, or from beginning to end of an event/period.",
    sit: "Describing company-wide rollouts, or sustained focus across a sprint.",
    how: "Place before a noun of place or time: \"throughout the year / throughout the app\".",
    eg: "\"Consistent design tokens are maintained throughout the application.\"",
    tag: "academic"
  },
  {
    w: "typical",
    ipa: "/ˈtɪpɪkəl/",
    lvl: "B1",
    def: "Having the distinctive qualities of a particular type of person or thing.",
    sit: "Explaining standard daily routines or common user personas.",
    how: "Pair with \"of\": \"It is typical of new learners to struggle with stress timing\".",
    eg: "\"A typical daily dose takes less than five minutes to complete.\"",
    tag: "daily"
  },
  {
    w: "understand",
    ipa: "/ˌʌndəˈstænd/",
    lvl: "A1",
    def: "To perceive the intended meaning of words, a language, or a person.",
    sit: "Confirming requirements, acknowledging feedback, or empathising.",
    how: "Say \"I completely understand\" to show professional alignment.",
    eg: "\"I understand your concerns regarding privacy, so all storage is strictly local.\"",
    tag: "daily"
  },
  {
    w: "unfortunately",
    ipa: "/ʌnˈfɔːtʃənətli/",
    lvl: "B1",
    def: "It is marked by or producing misfortune; regrettably.",
    sit: "Delivering difficult news, declining requests politely in business emails.",
    how: "Great professional buffer at the start of a sentence: \"Unfortunately, we cannot...\".",
    eg: "\"Unfortunately, the senior architect is out of office until Monday.\"",
    tag: "workplace"
  },
  {
    w: "unique",
    ipa: "/juːˈniːk/",
    lvl: "B1",
    def: "Being the only one of its kind; unlike anything else.",
    sit: "Pitching your app's product moat, or identifying distinct user IDs.",
    how: "Do NOT say \"very unique\" (unique is absolute): \"This feature is unique\".",
    eg: "\"EngSpell's Indian accent neutralization drills are a unique moat.\"",
    tag: "professional"
  },
  {
    w: "usually",
    ipa: "/ˈjuːʒuəli/",
    lvl: "A1",
    def: "Under normal conditions; generally or typically.",
    sit: "Describing regular routines, default configurations, or typical behavior.",
    how: "Pronounce with the /ʒ/ sound: /ˈjuːʒuəli/.",
    eg: "\"We usually deploy updates to staging every Tuesday afternoon.\"",
    tag: "daily"
  },
  {
    w: "valuable",
    ipa: "/ˈvæljuəbl/",
    lvl: "B2",
    def: "Worth a great deal of money, or extremely useful and important.",
    sit: "Thanking someone for their input, reviewing business assets.",
    how: "Describe advice or contributions: \"valuable feedback / valuable insights\".",
    eg: "\"Your feedback during our beta testing was incredibly valuable to the team.\"",
    tag: "workplace"
  },
  {
    w: "various",
    ipa: "/ˈveəriəs/",
    lvl: "B1",
    def: "More than one; several different types.",
    sit: "Describing multiple approaches, test platforms, or design options.",
    how: "Use before plural nouns: \"various methods / various viewpoints\".",
    eg: "\"We tested the microphone input on various mobile browsers.\"",
    tag: "daily"
  },
  {
    w: "vocabulary",
    ipa: "/vəˈkæbjʊləri/",
    lvl: "B1",
    def: "The body of words used in a particular language or by a specific person.",
    sit: "Discussing language learning milestones or domain-specific terminology.",
    how: "Pronounce /vəˈkæbjʊləri/ with primary stress on 'cab'.",
    eg: "\"Expanding your workplace vocabulary helps you communicate ideas persuasively.\"",
    tag: "academic"
  },
  {
    w: "volunteer",
    ipa: "/ˌvɒlənˈtɪər/",
    lvl: "B1",
    def: "To freely offer to do something, or a person who does unpaid work.",
    sit: "Stepping up to take ownership of a tough task in team meetings.",
    how: "Pair with \"to\": \"I volunteer to lead the migration effort\".",
    eg: "\"Would anyone like to volunteer to document the new API endpoints?\"",
    tag: "workplace"
  },
  {
    w: "whether",
    ipa: "/ˈwɛðər/",
    lvl: "B1",
    def: "Expressing a doubt or choice between alternatives.",
    sit: "Conditionals in discussions: \"We need to check whether the client agrees\".",
    how: "Pair with \"or not\": \"whether we launch today or tomorrow\".",
    eg: "\"Please check whether the user has granted microphone permissions.\"",
    tag: "academic"
  },
  {
    w: "wonderful",
    ipa: "/ˈwʌndərfʊl/",
    lvl: "A2",
    def: "Inspiring delight, pleasure, or admiration; extremely good; marvelous.",
    sit: "Giving warm personal compliments, celebrating team milestones.",
    how: "Warm and positive: \"a wonderful job / a wonderful milestone\".",
    eg: "\"You did a wonderful job explaining the complex machine learning model today.\"",
    tag: "social"
  }
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
  {w:'receive', lvl:1, def:"To get or accept something sent or given.", rule:"i before e except after c (r-e-c-e-i-v-e)."},
  {w:'believe', lvl:1, def:"To accept as true or feel sure about.", rule:"Never be-lie-ve a lie — there is a \"lie\" in believe."},
  {w:'achieve', lvl:1, def:"To successfully reach a desired objective or goal.", rule:"i before e: a-c-h-i-e-v-e."},
  {w:'friend', lvl:1, def:"A person you know well and regard with affection.", rule:"A fri-end to the end — ends in e-n-d."},
  {w:'because', lvl:1, def:"For the reason that; since.", rule:"Mnemonic: Big Elephants Can Always Understand Small Elephants."},
  {w:'different', lvl:1, def:"Not the same as another; distinct.", rule:"Double f, ends in -ent (d-i-f-f-e-r-e-n-t)."},
  {w:'people', lvl:1, def:"Human beings in general or collectively.", rule:"Mnemonic: People Eat Omelettes People Like Eggs."},
  {w:'every', lvl:1, def:"All the individual items or members in a group.", rule:"Starts with e-v-e-r (not evry)."},
  {w:'really', lvl:1, def:"In actual fact; genuinely or truly.", rule:"real + ly = double l (r-e-a-l-l-y)."},
  {w:'again', lvl:1, def:"Another time; once more.", rule:"a + gain: a-g-a-i-n (not agen)."},
  {w:'always', lvl:1, def:"At all times; on every occasion.", rule:"Single l: al-ways (never allways)."},
  {w:'another', lvl:1, def:"One more in addition to what exists.", rule:"an + other = single word (a-n-o-t-h-e-r)."},
  {w:'before', lvl:1, def:"During the period preceding a time or event.", rule:"be + fore (ends in silent e)."},
  {w:'coming', lvl:1, def:"Moving or travelling toward a destination.", rule:"Drop the silent e from \"come\" before adding -ing."},
  {w:"doesn't", lvl:1, def:"Contraction of \"does not\".", rule:"does + n't (apostrophe replaces the missing o)."},
  {w:'enough', lvl:1, def:"As much or as many as required.", rule:"Ends in -ough sounding like \"uff\" (e-n-o-u-g-h)."},
  {w:'especially', lvl:1, def:"Used to single out one person or thing above all.", rule:"e + specially (starts with e, not ex)."},
  {w:'finally', lvl:1, def:"After a long time, typically involving difficulty.", rule:"final + ly = double l (f-i-n-a-l-l-y)."},
  {w:'government', lvl:1, def:"The group of people with authority to govern.", rule:"Remember the silent n: govern + ment."},
  {w:'happened', lvl:1, def:"Took place or came about by chance.", rule:"Double p, regular past tense ends in -ed."},
  // Level 2
  {w:'necessary', lvl:2, def:"Required to be done, achieved, or present; essential.", rule:"1 Collar, 2 Sleeves: 1 c and 2 s's (n-e-c-e-s-s-a-r-y)."},
  {w:'occurrence', lvl:2, def:"An incident or event that happens.", rule:"Double c and double r: o-c-c-u-r-r-e-n-c-e."},
  {w:'accommodation', lvl:2, def:"A room or building in which someone may stay.", rule:"2 Cats, 2 Mice: 2 c's and 2 m's (a-c-c-o-m-m-o-d-a-t-i-o-n)."},
  {w:'separate', lvl:2, def:"Forming or viewed as a unit by itself; not joined.", rule:"There is \"a rat\" in sep-a-rat-e."},
  {w:'embarrass', lvl:2, def:"Cause someone to feel awkward or ashamed.", rule:"2 Red roses, 2 Sweet kisses: 2 r's and 2 s's."},
  {w:'definitely', lvl:2, def:"Without doubt; clearly and unambiguously.", rule:"Contains the word \"finite\": de-finite-ly (no \"a\")."},
  {w:'immediately', lvl:2, def:"At once; instantly without delay.", rule:"Double m, ends in -ately (i-m-m-e-d-i-a-t-e-l-y)."},
  {w:'successful', lvl:2, def:"Accomplishing an aim or desired result.", rule:"Double c, double s, single l at the end."},
  {w:'experience', lvl:2, def:"Practical contact with and observation of facts.", rule:"Starts with ex-, ends with -ience (e-x-p-e-r-i-e-n-c-e)."},
  {w:'beautiful', lvl:2, def:"Pleasing the senses or mind aesthetically.", rule:"Mnemonic: Big Elephants Are Under The Tree (B-E-A-U-tiful)."},
  {w:'knowledge', lvl:2, def:"Facts, information, and skills acquired through learning.", rule:"Silent k, ends with d-g-e (k-n-o-w-l-e-d-g-e)."},
  {w:'environment', lvl:2, def:"The surroundings or conditions in which one lives.", rule:"Remember the middle n: envi-ron-ment."},
  {w:'opportunity', lvl:2, def:"A set of circumstances making it possible to do something.", rule:"Double p, single t (o-p-p-o-r-t-u-n-i-t-y)."},
  {w:'communication', lvl:2, def:"Imparting or exchanging information by speaking or writing.", rule:"Double m: com-mu-ni-ca-tion."},
  {w:'unfortunately', lvl:2, def:"Regrettably or unluckily.", rule:"un + fortune + ate + ly (u-n-f-o-r-t-u-n-a-t-e-l-y)."},
  {w:'behaviour', lvl:2, def:"The way in which one acts or conducts oneself.", rule:"International/British spelling keeps the -our ending."},
  {w:'interesting', lvl:2, def:"Arousing curiosity or holding attention.", rule:"Four syllables: in-ter-est-ing (don't drop the first e)."},
  {w:'development', lvl:2, def:"The process of developing, growing, or maturing.", rule:"No \"e\" after p: de-vel-op-ment (not developement)."},
  {w:'information', lvl:2, def:"Facts provided or learned about something.", rule:"in-for-ma-tion (always uncountable; no -s)."},
  {w:'professional', lvl:2, def:"Relating to or connected with a profession.", rule:"Single f, double s (p-r-o-f-e-s-s-i-o-n-a-l)."},
  // Level 3
  {w:'conscientious', lvl:3, def:"Wishing to do one's work thoroughly and well.", rule:"sci (science) + ent + ious: con-sci-en-tious."},
  {w:'bureaucracy', lvl:3, def:"System of government with many non-elected officials.", rule:"French root bureau (desk) + cracy: b-u-r-e-a-u-c-r-a-c-y."},
  {w:'reconnaissance', lvl:3, def:"Military observation of a region to locate an enemy.", rule:"Double n, double s: r-e-c-o-n-n-a-i-s-s-a-n-c-e."},
  {w:'lieutenant', lvl:3, def:"A deputy or military officer holding commission.", rule:"French \"lieu\" (place) + tenant: l-i-e-u-t-e-n-a-n-t."},
  {w:'onomatopoeia', lvl:3, def:"The naming of a thing by a vocal imitation of its sound.", rule:"o-n-o-m-a-t-o-p-o-e-i-a (ends in -oeia)."},
  {w:'entrepreneurial', lvl:3, def:"Characterized by taking financial risks with initiative.", rule:"entre + pre + neur + i + al."},
  {w:'unequivocally', lvl:3, def:"In a way that leaves no doubt; unambiguously.", rule:"un + equi + vocal + ly (u-n-e-q-u-i-v-o-c-a-l-l-y)."},
  {w:'pseudonym', lvl:3, def:"A fictitious name, especially one used by an author.", rule:"Silent p: pseudo (false) + nym (name)."},
  {w:'pneumonia', lvl:3, def:"Lung inflammation caused by bacterial or viral infection.", rule:"Silent p: p-n-e-u-m-o-n-i-a."},
  {w:'phlegm', lvl:3, def:"Thick mucus secreted in the respiratory passages.", rule:"Silent g before m: p-h-l-e-g-m."},
  {w:'colonel', lvl:3, def:"An officer of high rank in the armed forces.", rule:"Pronounced \"kernel\", spelled c-o-l-o-n-e-l."},
  {w:'miscellaneous', lvl:3, def:"Composed of members or elements of different kinds.", rule:"Double l, ends in -eous: m-i-s-c-e-l-l-a-n-e-o-u-s."},
  {w:'mediterranean', lvl:3, def:"The sea between southern Europe and northern Africa.", rule:"medi + terr (earth) + anean: double r, single n."},
  {w:'perseverance', lvl:3, def:"Persistence in doing something despite difficulty or delay.", rule:"per-se-ver-ance (ends in -ance, not -ence)."},
  {w:'conscientiously', lvl:3, def:"In a thorough, vigilant, and careful manner.", rule:"conscientious + ly (c-o-n-s-c-i-e-n-t-i-o-u-s-l-y)."},
  {w:'entrepreneur', lvl:3, def:"A person who sets up a business, taking financial risks.", rule:"French ending -neur: e-n-t-r-e-p-r-e-n-e-u-r."},
  {w:'acquaintance', lvl:3, def:"A person one knows slightly, but who is not a close friend.", rule:"c before qu: a-c-q-u-a-i-n-t-a-n-c-e."},
  {w:'questionnaire', lvl:3, def:"A written set of questions formulated to obtain information.", rule:"question + n + aire: double n (q-u-e-s-t-i-o-n-n-a-i-r-e)."},
  {w:'unnecessary', lvl:3, def:"Not needed; more than is required.", rule:"un + necessary: double n, 1 c, 2 s (u-n-n-e-c-e-s-s-a-r-y)."},
  {w:'sophisticated', lvl:3, def:"Having worldly experience and knowledge of fashion or culture.", rule:"ph produces the f sound: s-o-p-h-i-s-t-i-c-a-t-e-d."}
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

if (typeof window !== 'undefined') {
  window.LETTERS = LETTERS;
  window.SOUNDS = SOUNDS;
  window.WORDS = WORDS;
  window.PAIRS = PAIRS;
  window.TWISTERS = TWISTERS;
  window.SPELLING = SPELLING;
  window.SCENARIOS = SCENARIOS;
  window.QUIZ_BANK = QUIZ_BANK;
  window.COACH_RULES = COACH_RULES;
  window.COACH_INTENTS = COACH_INTENTS;
  window.COACH_UPGRADES = COACH_UPGRADES;
  window.COACH_VOCAB = (typeof COACH_VOCAB !== 'undefined') ? COACH_VOCAB : COACH_UPGRADES;
  window.COACH_INTERVIEW = COACH_INTERVIEW;
}
if (typeof global !== 'undefined') {
  global.LETTERS = LETTERS;
  global.SOUNDS = SOUNDS;
  global.WORDS = WORDS;
  global.PAIRS = PAIRS;
  global.TWISTERS = TWISTERS;
  global.SPELLING = SPELLING;
  global.SCENARIOS = SCENARIOS;
  global.QUIZ_BANK = QUIZ_BANK;
  global.COACH_RULES = COACH_RULES;
  global.COACH_INTENTS = COACH_INTENTS;
  global.COACH_UPGRADES = COACH_UPGRADES;
  global.COACH_VOCAB = (typeof COACH_VOCAB !== 'undefined') ? COACH_VOCAB : COACH_UPGRADES;
  global.COACH_INTERVIEW = COACH_INTERVIEW;
}


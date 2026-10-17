/* learning/shared/content/psychology.js
   Psychology domain for Kelly's Learning Studio. Schema: docs/content-schema.md */
(function (g) {
  g.KLS_DATA = g.KLS_DATA || {};
  var N = [];

  /* ---------------------------------------------------------------- Schools */
  N.push(
  {
    id: "psy.structuralism", kind: "school", title: "Structuralism",
    line: "The first school: break conscious experience into its smallest elements, as chemists break down compounds.",
    facets: { field: ["perception", "cognitive"], lens: ["cognitive"], era: ["founding"] },
    people: ["psy.wundt"],
    body: [
      "Structuralism was the first organised attempt to make psychology a laboratory science. Its leading figure was Edward Titchener, an Englishman who studied with Wilhelm Wundt in Leipzig and then built a large laboratory at Cornell. The aim was to describe the structure of the mind by analysing experience into basic elements: sensations, images and feelings, each with qualities such as intensity and duration.",
      "The method was trained introspection. Observers practised for many hours to report raw experience without naming the object. You were not to say “I see an apple” but to describe patches of red, a sense of roundness, a faint pleasure. This was harder and stranger than it sounds, and different laboratories trained observers who reported different things.",
      "That was the weakness. When two labs disagreed, for example over whether thinking can happen without images, there was no way to settle it, because each observer had private access only to his own mind. Structuralism faded after Titchener died in 1927. Its legacy is the conviction that the mind can be measured, and a lesson every later school absorbed: private reports need public checks."
    ],
    links: [
      { to: "psy.functionalism", type: "contrasts", why: "Structuralists asked what the mind is made of; functionalists asked what it is for, and found that the more useful question." },
      { to: "psy.gestalt", type: "responds-to", why: "Gestalt psychologists argued that breaking experience into elements destroys it, since we perceive wholes first." },
      { to: "psy.behaviourism", type: "leads-to", why: "The failure of introspection to settle disputes pushed Watson to drop inner experience and study only behaviour." },
      { to: "psy.perception", type: "links-to", why: "Structuralists treated perception as sensations added together, the view later research overturned." },
      { to: "phil.empiricism", type: "links-to", why: "The idea that complex ideas are built from simple sensations came straight from British empiricists such as Locke and Hume." }
    ],
    prompts: ["Try describing a cup of tea as raw sensation, without naming it. What becomes hard, and what does that suggest about how quickly the mind interprets?"],
    recall: [ { q: "What method did structuralists use?", a: "Trained introspection: careful reports of raw conscious experience." }, { q: "Why did structuralism fade?", a: "Introspective reports could not be checked publicly, so disagreements between laboratories could not be settled." } ],
    further: ["Morton Hunt, The Story of Psychology (1993)"]
  },
  {
    id: "psy.functionalism", kind: "school", title: "Functionalism",
    line: "Ask what the mind is for: how thinking, feeling and habit help a creature adapt to its world.",
    facets: { field: ["cognitive", "learning"], lens: ["evolutionary", "cognitive"], era: ["founding", "early"] },
    people: ["psy.william-james"],
    body: [
      "Functionalism grew up in America in the 1890s, shaped by Darwin. If the mind evolved, then like the eye or the hand it must do something. So the functionalists asked not what consciousness is made of but what it is for: how attention, habit, memory and emotion help a living creature cope with a changing environment.",
      "William James gave the school its spirit, and John Dewey and James Angell at the University of Chicago gave it a programme. Dewey's 1896 paper on the reflex arc argued that perception and action form a continuous loop rather than a chain of separate steps. Functionalists happily used any method that worked: introspection, animal studies, mental tests, observation of children.",
      "Functionalism never became a tight doctrine, which is partly why it vanished as a named school. But it won the argument. Almost all later psychology, from behaviourism to evolutionary psychology to applied work in schools and workplaces, assumes that mental processes should be understood by what they do."
    ],
    links: [
      { to: "psy.evolutionary", type: "leads-to", why: "Asking what a mental process is for is the founding question of evolutionary psychology a century later." },
      { to: "psy.behaviourism", type: "leads-to", why: "Functionalism's interest in adaptation and learning, and its openness to animal studies, prepared the ground for behaviourism." },
      { to: "psy.memory", type: "links-to", why: "Functionalists studied memory and habit as tools for living rather than as contents of consciousness." },
      { to: "phil.pragmatism", type: "links-to", why: "James and Dewey were also founders of pragmatism, which judges ideas by what they do in practice; functionalism applies that test to the mind." }
    ],
    prompts: ["Pick a habit you have, good or bad. What job does it do for you? Functionalists would start there rather than with what it feels like."],
    recall: [ { q: "What question defines functionalism?", a: "What is the mind for: how do mental processes help us adapt?" } ]
  },
  {
    id: "psy.psychoanalysis", kind: "school", title: "Psychoanalysis",
    line: "Freud's theory and therapy of the unconscious: hidden wishes and conflicts shape what we do and feel.",
    facets: { field: ["clinical", "personality"], lens: ["psychodynamic"], era: ["founding", "early"] },
    people: ["psy.freud", "psy.jung"],
    body: [
      "Psychoanalysis began in Vienna in the 1890s, when Sigmund Freud, a neurologist, found that patients with unexplained physical symptoms improved when they talked freely about painful memories. From this he built a theory: much of mental life is unconscious, driven by wishes we cannot admit, kept out of awareness by repression and other defences, and leaking out in dreams, slips of the tongue and symptoms.",
      "The therapy was free association on the couch, with the analyst interpreting resistance and transference, the patient's tendency to relate to the analyst as to important figures from childhood. Freud later divided the mind into id, ego and superego, and placed great weight on childhood sexuality, the most controversial part of his account.",
      "As science, classic psychoanalysis fares poorly. Karl Popper used it as his example of a theory that explains everything and so risks nothing, and many specific claims, such as the Oedipus complex, have little support. Yet some broad ideas survive in modified form: that much mental processing is unconscious, that early relationships matter, and that people defend themselves against painful truths. Modern psychodynamic therapy has a modest evidence base of its own."
    ],
    links: [
      { to: "psy.behaviourism", type: "contrasts", why: "Behaviourists rejected talk of hidden inner forces and studied only what could be observed." },
      { to: "psy.psychosocial-stages", type: "leads-to", why: "Erikson trained as a psychoanalyst and rebuilt Freud's childhood stages into a lifelong, social sequence." },
      { to: "phil.falsification", type: "links-to", why: "Popper used psychoanalysis as his key example of a theory that cannot be falsified because every outcome can be explained." },
      { to: "eng.from-ideas", type: "links-to", why: "Everyday English is full of psychoanalysis: being in denial, repressing feelings, ego, a Freudian slip." }
    ],
    prompts: ["When you notice yourself irritated by a trait in someone else, is it ever a trait you would rather not see in yourself? Notice how hard that question is to test."],
    recall: [ { q: "What was Popper's main criticism of psychoanalysis?", a: "It could explain any outcome, so no observation could ever count against it." }, { q: "Which psychoanalytic ideas survive in modified form?", a: "That much processing is unconscious, that early relationships matter, and that people defend against painful truths." } ],
    further: ["Sigmund Freud, The Interpretation of Dreams (1900)", "Frederick Crews, Freud: The Making of an Illusion (2017)"]
  },
  {
    id: "psy.behaviourism", kind: "school", title: "Behaviourism",
    line: "Study only what can be observed: stimuli, responses and the consequences that shape behaviour.",
    facets: { field: ["learning"], lens: ["behavioural"], era: ["early", "cognitive-revolution"] },
    people: ["psy.watson", "psy.skinner", "psy.pavlov"],
    body: [
      "Behaviourism was a rebellion. In 1913 John B. Watson declared that psychology should stop trying to study consciousness, which no one else could see, and become an objective science of behaviour. The goal was the prediction and control of what organisms do, explained by their history of learning rather than by inner thoughts or instincts.",
      "Its tools were conditioning. From Pavlov came classical conditioning, learning that one event signals another. From Thorndike and later B. F. Skinner came operant conditioning, learning from consequences. Skinner's radical behaviourism went further, treating thoughts themselves as behaviour shaped by reinforcement, and he believed a society could be redesigned by arranging its rewards.",
      "Behaviourism dominated American psychology for about forty years. It lost its grip when Noam Chomsky argued in 1959 that children learn language far too quickly and creatively for reinforcement to explain, and when computers offered a respectable way to talk about inner processing. Yet its findings are among the most solid in psychology, and they live on in animal training, in classroom management, in exposure therapy for phobias, and in the behavioural half of CBT."
    ],
    links: [
      { to: "psy.classical-conditioning", type: "links-to", why: "Pavlov's conditioning gave behaviourism its first precise, measurable form of learning." },
      { to: "psy.cognitive-revolution", type: "leads-to", why: "Dissatisfaction with behaviourism's silence about the mind fuelled the cognitive revolution of the 1950s." },
      { to: "psy.cbt", type: "leads-to", why: "Behaviour therapy, built on conditioning, supplied half of cognitive behavioural therapy." },
      { to: "phil.empiricism", type: "links-to", why: "Behaviourism is empiricism taken to its limit: the mind as a blank slate written on entirely by experience." }
    ],
    prompts: ["Think of a routine at home that runs smoothly. What small rewards or signals keep it going, whether anyone designed them or not?"],
    recall: [ { q: "What did Watson say psychology should study?", a: "Observable behaviour only, not consciousness." }, { q: "What argument helped end behaviourism's dominance?", a: "Chomsky's 1959 argument that reinforcement cannot explain how children learn language so fast and creatively." } ],
    further: ["B. F. Skinner, Beyond Freedom and Dignity (1971)"]
  },
  {
    id: "psy.gestalt", kind: "school", title: "Gestalt psychology",
    line: "We perceive organised wholes, not heaps of sensations; the whole is something other than its parts.",
    facets: { field: ["perception", "cognitive"], lens: ["cognitive"], era: ["early"] },
    body: [
      "Gestalt psychology began in Germany in 1912, when Max Wertheimer studied apparent motion: two lights flashed in quick succession look like one light moving. No element in the sequence moves, yet movement is what we see. Wertheimer, Wolfgang Köhler and Kurt Koffka concluded that perception is organised from the start. The German word Gestalt means form or shape.",
      "They described principles by which the mind groups things: nearness, similarity, closure (we complete broken outlines), good continuation and the separation of figure from ground. Köhler, studying chimpanzees on Tenerife, described insight, the sudden reorganisation of a problem, as when an ape stacks boxes to reach a banana, rather than slow trial and error.",
      "The group scattered when the Nazis came to power; Wertheimer, Köhler and Koffka all ended up in the United States. Their grouping principles are standard in perception science and in graphic design, and their emphasis on structure fed into cognitive psychology. Gestalt therapy, developed later by Fritz Perls, borrowed the name but is a separate tradition."
    ],
    links: [
      { to: "psy.perception", type: "influenced", why: "Gestalt principles of grouping remain part of how perception scientists describe what the visual system does." },
      { to: "psy.cognitive-revolution", type: "leads-to", why: "Gestalt interest in structure and insight kept the study of thinking alive through the behaviourist years." },
      { to: "psy.predictive-processing", type: "links-to", why: "Both treat perception as the mind imposing organisation on input rather than passively receiving it." },
      { to: "phil.phenomenology", type: "links-to", why: "Gestalt psychology and Husserl's phenomenology shared a respect for experience as it is actually lived, as meaningful wholes." }
    ],
    prompts: ["Look at a cluttered shelf or a page of text. What groups jump out at you before you decide to look for them?"],
    recall: [ { q: "Name three Gestalt grouping principles.", a: "Any of: proximity, similarity, closure, good continuation, figure and ground." } ]
  },
  {
    id: "psy.humanistic", kind: "school", title: "Humanistic psychology",
    line: "The third force: people as growing, choosing persons, not bundles of drives or conditioned responses.",
    facets: { field: ["personality", "clinical", "positive"], lens: ["humanistic"], era: ["cognitive-revolution"] },
    people: ["psy.maslow", "psy.rogers"],
    body: [
      "By the 1950s American psychology had two big frames: psychoanalysis, which saw people driven by hidden conflicts, and behaviourism, which saw them shaped by rewards. Abraham Maslow, Carl Rogers and others proposed a third force. They put the whole person at the centre, with a capacity for growth, choice and meaning, and they took subjective experience seriously again.",
      "Key ideas include self actualisation, the tendency to become more fully what one can be; the importance of being accepted rather than judged; and a person centred therapy in which the therapist offers empathy, genuineness and unconditional positive regard rather than interpretation or instruction.",
      "Critics found humanistic ideas warm but vague, hard to measure and sometimes close to self help. That is fair. Yet the movement left real traces. Research on psychotherapy consistently finds that the quality of the relationship between client and therapist predicts outcomes across many approaches, which is close to what Rogers claimed. And positive psychology is, in part, an attempt to give humanistic questions a more rigorous footing."
    ],
    links: [
      { to: "psy.psychoanalysis", type: "responds-to", why: "Humanists rejected the picture of people as driven by unconscious conflict." },
      { to: "psy.hierarchy-of-needs", type: "leads-to", why: "Maslow's hierarchy is the best known product of humanistic psychology." },
      { to: "psy.positive-psychology", type: "leads-to", why: "Positive psychology took up humanistic questions about flourishing while insisting on stronger evidence." },
      { to: "phil.existentialism", type: "links-to", why: "Humanistic psychologists drew on existentialist themes of freedom, choice and authentic living." },
      { to: "phil.phenomenology", type: "links-to", why: "Rogers built therapy around the client's own experience of the world, a phenomenological starting point." }
    ],
    prompts: ["Think of someone who listened to you without judging. What did that make possible that advice could not?"],
    recall: [ { q: "Why was humanistic psychology called the third force?", a: "It offered an alternative to the two dominant frames, psychoanalysis and behaviourism." } ]
  },
  {
    id: "psy.cognitive-revolution", kind: "school", title: "The cognitive revolution",
    line: "The 1950s turn that brought the mind back: thinking as information processing, studied with experiments.",
    facets: { field: ["cognitive"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    people: ["psy.miller"],
    body: [
      "In the 1950s several fields converged on a new idea: the mind processes information, and that processing can be studied scientifically. A symposium at MIT in September 1956 is often treated as the moment of birth. George Miller presented work on the limits of memory, Noam Chomsky outlined a new theory of grammar, and Allen Newell and Herbert Simon described a computer program that proved logical theorems.",
      "The computer gave psychologists a respectable vocabulary for inner states: input, storage, retrieval, capacity, rules. Chomsky's 1959 review of Skinner's book on language argued that behaviourism could not explain how children produce endless new sentences. Ulric Neisser's textbook Cognitive Psychology (1967) gave the field its name.",
      "The revolution reshaped psychology. Memory, attention, language, reasoning and decision making became central again, now studied with reaction times and careful experiments rather than introspection. Later critics noted that the computer metaphor neglects emotion, the body and culture, and cognitive science has since broadened. But most of what this site says about thinking, from heuristics to working memory, comes from the tradition this revolution began."
    ],
    links: [
      { to: "psy.working-memory", type: "leads-to", why: "Miller's work on the limits of short term memory led directly to models of working memory." },
      { to: "psy.heuristics", type: "leads-to", why: "Treating judgement as information processing set up the study of mental shortcuts and their errors." },
      { to: "psy.neuroscience", type: "leads-to", why: "Cognitive psychology later joined brain science to become cognitive neuroscience." },
      { to: "phil.rationalism", type: "links-to", why: "Chomsky revived the rationalist idea that some structure of mind is innate, not written by experience." }
    ],
    prompts: ["Computers were the metaphor of the 1950s. What metaphor do people reach for today when they describe the mind, and what might it hide?"],
    recall: [ { q: "What metaphor powered the cognitive revolution?", a: "The mind as a computer that processes information." } ],
    further: ["George Miller, “The cognitive revolution: a historical perspective”, Trends in Cognitive Sciences (2003)"]
  },
  {
    id: "psy.evolutionary", kind: "school", title: "Evolutionary psychology",
    line: "Explain the mind as a set of adaptations shaped by natural selection in our ancestral past.",
    facets: { field: ["social", "biological"], lens: ["evolutionary"], era: ["modern"] },
    body: [
      "Evolutionary psychology asks why the mind has the design it has. If our bodies were shaped by natural selection, so were the brain's tendencies: fear of snakes and heights, attachment between infant and carer, interest in status and fairness, preferences in choosing partners. Leda Cosmides and John Tooby gave the field its modern form in the late 1980s and 1990s.",
      "A well known example is cheater detection. People are poor at an abstract logic puzzle, the Wason selection task, but far better when the same logic is framed as checking whether someone has broken a social rule. Cosmides argued this reveals a mental tool built for social exchange. Other work, such as David Buss's survey of partner preferences across 37 cultures, looks for patterns that recur across very different societies.",
      "Critics raise real concerns. It is easy to invent a plausible evolutionary story for almost any trait, and hard to test claims about an ancestral past we cannot observe. Some claims about sex differences have been overstated. The fairest view is that evolution is an essential lens for asking why, and that each specific claim needs evidence like any other."
    ],
    links: [
      { to: "psy.attachment", type: "links-to", why: "Bowlby explained attachment as an evolved system that kept infants close to protection." },
      { to: "psy.anxiety", type: "links-to", why: "Fear and anxiety are often explained as alarm systems that protected ancestors, even when they misfire today." },
      { to: "psy.sociocultural", type: "contrasts", why: "Sociocultural psychology stresses how much minds are shaped by culture rather than by an evolved common design." }
    ],
    prompts: ["Which of your strongest reactions, a jolt of fear or a rush of protectiveness, feels older than you are? How would you test an evolutionary story about it?"],
    recall: [ { q: "What is the main criticism of evolutionary psychology?", a: "Plausible stories are easy to invent and hard to test against an ancestral past we cannot observe." } ],
    further: ["Steven Pinker, How the Mind Works (1997)"]
  },
  {
    id: "psy.positive-psychology", kind: "school", title: "Positive psychology",
    line: "The scientific study of what goes right: strengths, meaning, engagement and flourishing.",
    facets: { field: ["positive"], lens: ["humanistic", "cognitive"], era: ["modern"] },
    people: ["psy.seligman", "psy.csikszentmihalyi"],
    body: [
      "In 1998, as president of the American Psychological Association, Martin Seligman argued that psychology had learned a great deal about repairing damage but little about what makes life worth living. With Mihaly Csikszentmihalyi he launched positive psychology: the study of positive emotion, engagement, good relationships, meaning and accomplishment, and of the character strengths that support them.",
      "The field has produced useful work, including research on flow, on gratitude and kindness exercises, and on a classification of character strengths drawn from many moral traditions. It overlaps with humanistic psychology in its questions but aims to answer them with measurement and experiments.",
      "It has also had embarrassments. A famous claim that flourishing requires a precise ratio of positive to negative emotions, about 2.9 to 1, was shown in 2013 to rest on mathematics that did not apply, and was partly withdrawn. Effects of many happiness exercises are real but small. Critics also warn against turning flourishing into a duty to be cheerful. Read at its best, positive psychology is a reminder that a good life is a proper subject for science."
    ],
    links: [
      { to: "psy.learned-helplessness", type: "contrasts", why: "Seligman moved from studying how organisms give up to studying how people flourish." },
      { to: "phil.aristotle", type: "links-to", why: "Positive psychologists often cite Aristotle's eudaimonia, flourishing as a life of activity in accordance with virtue." },
      { to: "phil.virtue-ethics", type: "links-to", why: "The catalogue of character strengths is an empirical cousin of virtue ethics." }
    ],
    prompts: ["What would you count as a flourishing week for you, as opposed to a merely pleasant one?"],
    recall: [ { q: "Who launched positive psychology, and when?", a: "Martin Seligman, with Mihaly Csikszentmihalyi, around 1998." }, { q: "What happened to the positivity ratio?", a: "Its mathematics was shown in 2013 not to apply, and the claim was partly withdrawn." } ],
    further: ["Martin Seligman, Flourish (2011)", "Jonathan Haidt, The Happiness Hypothesis (2006)"]
  },
  {
    id: "psy.behavioural-economics", kind: "school", title: "Behavioural economics",
    line: "Economics with real humans in it: predictable departures from perfect rationality, and nudges.",
    facets: { field: ["behavioural-economics", "cognitive"], lens: ["cognitive"], era: ["modern"] },
    people: ["psy.kahneman", "psy.tversky"],
    body: [
      "Classical economics assumed people who weigh costs and benefits consistently. Behavioural economics brings psychology in and asks how actual people decide. Herbert Simon had argued in the 1950s that our rationality is bounded by limited time and attention. Kahneman and Tversky showed specific, predictable departures from rational choice, and the economist Richard Thaler built them into economics, winning the Nobel prize in 2017.",
      "Core findings include loss aversion, framing effects, the endowment effect (we value a thing more once it is ours), present bias and mental accounting. Thaler and Cass Sunstein's book Nudge (2008) proposed designing choices so that the easy option is the good one, for example making pension saving the default. Automatic enrolment raised saving rates substantially in several countries.",
      "The field has had to face its own evidence problems. Large reviews find that many nudges work far less well at scale than in the original academic trials. A famous study showing that signing an honesty pledge at the top of a form reduced cheating was retracted in 2021 after analysts showed that some of its data had been fabricated. The core insights stand; the claims for easy fixes have shrunk."
    ],
    links: [
      { to: "psy.prospect-theory", type: "links-to", why: "Prospect theory is the founding theory of behavioural economics." },
      { to: "psy.heuristics", type: "links-to", why: "The heuristics and biases programme supplied the catalogue of predictable errors economists began to model." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Behavioural economics has been shaken by the same replication and integrity problems as social psychology." },
      { to: "phil.utilitarianism", type: "links-to", why: "Kahneman revived Bentham's idea of measuring experienced pleasure and pain, in a 1997 paper titled “Back to Bentham?”." }
    ],
    prompts: ["Which defaults run your household: what happens automatically unless someone actively changes it? Who chose those defaults?"],
    recall: [ { q: "What is a nudge?", a: "A change in how choices are presented that steers behaviour without forbidding options or changing incentives much, such as a default." } ],
    further: ["Richard Thaler, Misbehaving (2015)", "Richard Thaler and Cass Sunstein, Nudge (2008)"]
  },
  {
    id: "psy.sociocultural", kind: "school", title: "Sociocultural psychology",
    line: "Minds are made in company: language, culture and relationships shape how we think.",
    facets: { field: ["social", "developmental"], lens: ["sociocultural"], era: ["early", "modern"] },
    people: ["psy.vygotsky"],
    body: [
      "Sociocultural psychology holds that you cannot understand a mind apart from the people, tools and language around it. Wundt himself wrote ten volumes on folk psychology, the study of language, myth and custom. Lev Vygotsky made the idea central: higher thinking first happens between people, in conversation and shared activity, and only later becomes an inner ability.",
      "A modern strand, cultural psychology, compares how people think and feel across societies. Hazel Markus and Shinobu Kitayama argued in 1991 that many East Asian cultures encourage an interdependent self, defined by relationships and roles, while many Western cultures encourage an independent self, defined by personal attributes. These are tendencies, not boxes, and the evidence for some specific differences is mixed.",
      "A sharp challenge came in 2010, when Joseph Henrich and colleagues pointed out that most psychology studies use people from Western, educated, industrialised, rich and democratic societies, which they called WEIRD, and that such people are often unusual on measures from visual illusions to fairness. Findings presented as human nature may be local customs."
    ],
    links: [
      { to: "psy.self", type: "links-to", why: "Cultural psychology suggests the very shape of the self differs with the society one grows up in." },
      { to: "psy.attribution-error", type: "links-to", why: "The tendency to explain behaviour by character rather than circumstance appears weaker in some East Asian samples." },
      { to: "psy.cognitive-development", type: "contrasts", why: "Piaget pictured the child as a lone scientist; Vygotsky pictured a child learning alongside others." }
    ],
    prompts: ["Which of your habits of thought did you learn from your family's way of talking, rather than working out alone?"],
    recall: [ { q: "What does WEIRD stand for?", a: "Western, educated, industrialised, rich and democratic: the populations most psychology studies use." } ]
  },
  {
    id: "psy.neuroscience", kind: "school", title: "Cognitive neuroscience",
    line: "Link mind to brain: which circuits support memory, emotion, attention and choice, and how.",
    facets: { field: ["biological", "cognitive"], lens: ["biological"], era: ["modern"] },
    body: [
      "The biological lens is old. In 1848 an iron rod passed through the front of railway worker Phineas Gage's head; he survived, and accounts reported his personality changed, though how much has been exaggerated in retelling. In 1861 Paul Broca linked a patch of the left frontal lobe to producing speech. Such cases suggested that particular brain regions support particular functions.",
      "Cognitive neuroscience, named in the late 1970s, joined this tradition to cognitive psychology. Brain imaging from the 1990s, especially functional MRI, let researchers watch blood flow change as healthy people think. Studies of patients such as Henry Molaison, of single neurons, and of brain plasticity have transformed what we know about memory, vision and emotion.",
      "It also invites overreach. A famous 2009 poster showed apparent brain activity in a dead salmon shown photographs, a joke with a point: run enough statistical tests without correction and something will light up. Another trap is reverse inference: activity in a region linked to fear does not prove that a person feels afraid. A good rule: a brain picture describes where and when, which is not the same as explaining why."
    ],
    links: [
      { to: "psy.patient-hm", type: "links-to", why: "Henry Molaison's case is a founding example of linking a specific brain structure to a specific kind of memory." },
      { to: "psy.consciousness", type: "links-to", why: "Searching for the neural correlates of consciousness is one of neuroscience's most ambitious programmes." },
      { to: "phil.mind-body", type: "links-to", why: "Every finding about brain and mind raises the old question of how the two relate: identity, emergence or something else." }
    ],
    prompts: ["When you read that a part of the brain “lights up” for something, what question would you want answered before believing the headline?"],
    recall: [ { q: "What point did the dead salmon study make?", a: "Without correcting for many comparisons, brain scans can show apparent activity by chance." } ]
  }
  );

  /* ----------------------------------------------------------- Psychologists */
  N.push(
  {
    id: "psy.wundt", kind: "psychologist", title: "Wilhelm Wundt",
    line: "Founded the first psychology laboratory, in Leipzig in 1879, and with it psychology as a science.",
    facets: { field: ["perception", "cognitive"], lens: ["cognitive", "sociocultural"], era: ["founding"] },
    life: "1832 to 1920", place: "Leipzig, Germany",
    say: { text: "Wundt", respell: "VOONT", ipa: "vʊnt" },
    body: [
      "Wundt trained as a physician and physiologist and asked a bold question: could the mind be studied with the same care as the body? In 1879 he set aside rooms at the University of Leipzig for experiments on reaction times, sensation and attention, and that date is usually given for the birth of psychology as a laboratory science. Students came from across the world, and many went home to found departments of their own.",
      "He is often remembered only as the father of introspection, but his range was wider. He insisted that laboratory methods suit only simpler processes, and that language, myth and custom need a different, historical approach, which he pursued in ten volumes of Völkerpsychologie, folk or cultural psychology. Both the experimental and the cultural strands of modern psychology can trace a line back to him."
    ],
    links: [
      { to: "psy.structuralism", type: "influenced", why: "His student Titchener turned Wundt's experimental introspection into the school of structuralism." },
      { to: "psy.sociocultural", type: "influenced", why: "Wundt's folk psychology was an early case for studying minds through language and culture." },
      { to: "psy.william-james", type: "contrasts", why: "James admired Wundt's industry but preferred a broader, more practical psychology of the whole person." }
    ],
    recall: [ { q: "What happened in Leipzig in 1879?", a: "Wundt opened the first laboratory dedicated to experimental psychology." } ]
  },
  {
    id: "psy.william-james", kind: "psychologist", title: "William James",
    line: "Psychologist and philosopher: the stream of consciousness, habit, emotion, pragmatism and free will.",
    facets: { field: ["cognitive", "personality"], lens: ["cognitive", "biological"], era: ["founding"] },
    life: "1842 to 1910", place: "New York and Cambridge, Massachusetts",
    quote: { text: "It is nothing jointed; it flows.", source: "William James, The Principles of Psychology (1890), chapter 9, on consciousness" },
    body: [
      "William James belongs to two domains at once. As a psychologist he wrote The Principles of Psychology (1890), still one of the most readable books in the field, with chapters on habit, attention, memory, the self and emotion. He described consciousness as a stream rather than a chain of separate ideas, divided the self into the knowing I and the known me, and proposed that emotions follow bodily changes rather than cause them.",
      "As a philosopher he was a founder of pragmatism, which judges an idea by the difference it makes in practice, and he wrote on religious experience and on free will. As a young man he passed through a long depression; in his diary for 1870 he resolved that his first act of free will would be to believe in free will. That mix of rigour and personal stake runs through his work.",
      "James set the tone for American functionalism and remains a bridge between the two disciplines. Many questions on this site, about the self, attention, habit and the will, were first sharply posed by him."
    ],
    links: [
      { to: "psy.functionalism", type: "influenced", why: "James's focus on what mental life is for became the spirit of the functionalist school." },
      { to: "psy.james-lange", type: "influenced", why: "James proposed that we feel afraid because our body reacts, not the other way around." },
      { to: "psy.self", type: "influenced", why: "His distinction between the I and the me still organises research on the self." },
      { to: "phil.pragmatism", type: "links-to", why: "James is a founder of pragmatism; the same practical test of ideas runs through his psychology." },
      { to: "phil.consciousness", type: "links-to", why: "His stream of consciousness is a description philosophers of mind still start from." },
      { to: "phil.free-will", type: "links-to", why: "James argued that free will could be rationally believed and lived by, even if it cannot be proved." }
    ],
    recall: [ { q: "What did William James call the flow of conscious experience?", a: "The stream of consciousness." } ],
    further: ["William James, The Principles of Psychology (1890)", "William James, The Varieties of Religious Experience (1902)"]
  },
  {
    id: "psy.ebbinghaus", kind: "psychologist", title: "Hermann Ebbinghaus",
    line: "Measured memory on himself with nonsense syllables, and drew the first forgetting curve.",
    facets: { field: ["cognitive", "learning"], lens: ["cognitive"], era: ["founding"] },
    life: "1850 to 1909", place: "Berlin, Breslau and Halle, Germany",
    say: { text: "Ebbinghaus", respell: "EBB ing howss", ipa: "ˈɛbɪŋhaʊs" },
    quote: { text: "Psychology has a long past, but only a short history.", source: "Hermann Ebbinghaus, Abriss der Psychologie (1908), opening line, in its English translation" },
    body: [
      "Ebbinghaus asked whether something as private as memory could be measured exactly. Working alone, he invented about two thousand nonsense syllables, such as DAX and BOK, so that meaning would not help him, then learned lists of them to a strict standard and tested himself after delays from minutes to a month.",
      "His book On Memory (1885) reported the forgetting curve, the spacing effect (learning spread over time lasts longer than cramming) and the learning curve. His results have held up remarkably well, including in a careful modern replication. He showed that the higher mental processes could be studied experimentally, which Wundt had doubted."
    ],
    links: [
      { to: "psy.forgetting-curve", type: "influenced", why: "Ebbinghaus discovered and plotted the forgetting curve in his own experiments." },
      { to: "psy.memory", type: "influenced", why: "He founded the experimental study of memory." },
      { to: "psy.wundt", type: "responds-to", why: "Wundt doubted higher processes like memory could be studied experimentally; Ebbinghaus showed otherwise." }
    ],
    recall: [ { q: "Why did Ebbinghaus use nonsense syllables?", a: "So that meaning and prior knowledge would not help him remember, keeping the material uniform." } ],
    further: ["Hermann Ebbinghaus, Memory: A Contribution to Experimental Psychology (1885, English 1913)"]
  },
  {
    id: "psy.freud", kind: "psychologist", title: "Sigmund Freud",
    line: "Founder of psychoanalysis; put the unconscious, dreams and childhood at the centre of the mind.",
    facets: { field: ["clinical", "personality"], lens: ["psychodynamic"], era: ["founding", "early"] },
    life: "1856 to 1939", place: "Vienna, Austria; died in London",
    say: { text: "Freud", respell: "FROYD", ipa: "frɔɪt" },
    quote: { text: "The interpretation of dreams is the royal road to a knowledge of the unconscious activities of the mind.", source: "Sigmund Freud, The Interpretation of Dreams (1900), chapter 7, Strachey translation" },
    body: [
      "Freud was a Viennese neurologist who asked why people suffer from symptoms with no physical cause, and why they dream, forget, joke and slip the way they do. His answer was the unconscious: wishes and memories pushed out of awareness that still shape thought and action. He developed psychoanalysis as both a theory of mind and a method of treatment, and kept revising it for forty years.",
      "His specific theories, about childhood sexuality, the Oedipus complex and the meaning of dreams, have not fared well as science, and his case reports have been criticised as selective. Yet few thinkers have shaped twentieth century culture more. Literature, film, art and ordinary speech absorbed his vocabulary, and the idea that we do not fully know our own minds, now supported in very different forms by cognitive science, became common sense. He fled the Nazis in 1938 and died in London the following year."
    ],
    links: [
      { to: "psy.psychoanalysis", type: "influenced", why: "Freud founded psychoanalysis as both a theory and a therapy." },
      { to: "psy.defence-mechanisms", type: "influenced", why: "He described repression and other defences; his daughter Anna systematised them." },
      { to: "psy.jung", type: "influenced", why: "Jung was Freud's chosen heir until their break in 1913." },
      { to: "eng.from-ideas", type: "links-to", why: "A Freudian slip, a slip of the tongue thought to reveal a hidden wish, is named after him." }
    ],
    recall: [ { q: "What did Freud call the royal road to the unconscious?", a: "The interpretation of dreams." } ],
    further: ["Sigmund Freud, The Interpretation of Dreams (1900)", "Peter Gay, Freud: A Life for Our Time (1988)"]
  },
  {
    id: "psy.jung", kind: "psychologist", title: "Carl Jung",
    line: "Swiss psychiatrist who broke with Freud; gave us introversion, extraversion, archetypes and complexes.",
    facets: { field: ["personality", "clinical"], lens: ["psychodynamic"], era: ["early"] },
    life: "1875 to 1961", place: "Zurich and Küsnacht, Switzerland",
    say: { text: "Jung", respell: "YOONG", ipa: "jʊŋ" },
    body: [
      "Carl Gustav Jung worked as a psychiatrist in Zurich and was for some years Freud's closest ally. They split in 1913, largely because Jung rejected Freud's emphasis on sexuality. Jung asked broader questions: why myths and symbols recur across cultures, and how a person becomes whole over a lifetime, a process he called individuation.",
      "His answers included the collective unconscious, a deep layer of mind shared by all humans and expressed in archetypes such as the mother, the trickster and the shadow. These ideas are rich for literature and religion but very hard to test, and most research psychologists treat them as interpretive rather than scientific. His book Psychological Types (1921) introduced introversion and extraversion as attitudes, and that idea, reworked through decades of measurement, survives as one of the best supported dimensions of personality."
    ],
    links: [
      { to: "psy.introversion", type: "influenced", why: "Jung popularised introversion and extraversion, later measured as a core personality trait." },
      { to: "psy.psychoanalysis", type: "responds-to", why: "Jung's analytical psychology began as a revision of, and break with, Freud's psychoanalysis." },
      { to: "eng.from-ideas", type: "links-to", why: "Introvert, extravert and complex entered everyday English through Jung." }
    ],
    recall: [ { q: "Which of Jung's ideas has the strongest scientific afterlife?", a: "Introversion and extraversion, now a measured personality dimension." } ],
    further: ["Anthony Stevens, Jung: A Very Short Introduction (1994)"]
  },
  {
    id: "psy.pavlov", kind: "psychologist", title: "Ivan Pavlov",
    line: "Russian physiologist whose salivating dogs revealed classical conditioning.",
    facets: { field: ["learning", "biological"], lens: ["behavioural", "biological"], era: ["founding", "early"] },
    life: "1849 to 1936", place: "St Petersburg, Russia",
    say: { text: "Pavlov", respell: "PAV lov", ipa: "ˈpævlɒv" },
    body: [
      "Pavlov won the Nobel prize in 1904 for work on digestion, not psychology. While measuring dogs' saliva, his team noticed that the animals began to salivate before food arrived, at the sight of the assistant or the sound of footsteps. Pavlov saw that these psychic secretions were a window onto learning, and spent the rest of his career studying them with great precision.",
      "He showed that a neutral signal paired with food comes to produce salivation by itself, and mapped extinction, generalisation and discrimination. Popular retellings feature a bell, though his laboratory used metronomes, buzzers and other signals too. His careful, physiological approach gave behaviourism its model of what a science of learning should look like."
    ],
    links: [
      { to: "psy.classical-conditioning", type: "influenced", why: "Pavlov discovered and systematically mapped classical conditioning." },
      { to: "psy.behaviourism", type: "influenced", why: "Watson took Pavlov's conditioning as the foundation of a science of behaviour." },
      { to: "eng.from-ideas", type: "links-to", why: "A Pavlovian response, an automatic reaction to a cue, carries his name into everyday English." }
    ],
    recall: [ { q: "What was Pavlov originally studying?", a: "Digestion, for which he won a Nobel prize in 1904." } ],
    further: ["Daniel Todes, Ivan Pavlov: A Russian Life in Science (2014)"]
  },
  {
    id: "psy.watson", kind: "psychologist", title: "John B. Watson",
    line: "Launched behaviourism in 1913 and ran the Little Albert experiment before leaving for advertising.",
    facets: { field: ["learning"], lens: ["behavioural"], era: ["early"] },
    life: "1878 to 1958", place: "Johns Hopkins University, Baltimore; later New York",
    body: [
      "Watson asked whether psychology could become as objective as chemistry. His 1913 article, often called the behaviourist manifesto, said yes, if it gave up consciousness and studied only behaviour. He was confident that environment was almost everything, and boasted that given a dozen healthy infants he could train any one of them to become any type of specialist; in the same passage he admitted he was going beyond his facts.",
      "With Rosalie Rayner he conducted the Little Albert study in 1920. After a scandal over their affair he left Johns Hopkins and became a successful advertising executive, applying conditioning to selling. His child rearing advice, which warned parents against too much affection, now reads as a cautionary tale about confident science running ahead of evidence."
    ],
    links: [
      { to: "psy.behaviourism", type: "influenced", why: "Watson founded behaviourism with his 1913 manifesto." },
      { to: "psy.little-albert", type: "influenced", why: "He conducted the Little Albert conditioning study with Rosalie Rayner." },
      { to: "psy.pavlov", type: "links-to", why: "Watson adopted Pavlov's conditioning as the core mechanism of learning." }
    ],
    recall: [ { q: "What did Watson propose psychology should give up?", a: "The study of consciousness, in favour of observable behaviour." } ]
  },
  {
    id: "psy.skinner", kind: "psychologist", title: "B. F. Skinner",
    line: "Radical behaviourist: behaviour is shaped by its consequences, and so, he argued, is freedom.",
    facets: { field: ["learning"], lens: ["behavioural"], era: ["early", "cognitive-revolution"] },
    life: "1904 to 1990", place: "Harvard University, Cambridge, Massachusetts",
    body: [
      "Burrhus Frederic Skinner asked how far consequences alone could explain behaviour. In the operant chamber, often called a Skinner box, a rat or pigeon pressed a lever or pecked a key and received food on precise schedules. He discovered that the pattern of reinforcement matters as much as the reward: unpredictable rewards produce persistent, hard to extinguish behaviour.",
      "Skinner applied his ideas widely: teaching machines, a utopian novel, Walden Two (1948), and a provocative book, Beyond Freedom and Dignity (1971), which argued that free will is an illusion and that society should design its reinforcements deliberately. Chomsky's attack on his account of language helped end behaviourism's reign, but operant principles remain among the most reliable findings in psychology."
    ],
    links: [
      { to: "psy.operant-conditioning", type: "influenced", why: "Skinner turned learning from consequences into a precise experimental science." },
      { to: "psy.behaviourism", type: "influenced", why: "His radical behaviourism was the movement's most ambitious form." },
      { to: "phil.free-will", type: "links-to", why: "Skinner argued that behaviour is fully shaped by its history of consequences, leaving no room for free will in the traditional sense." }
    ],
    recall: [ { q: "What did Skinner find about unpredictable rewards?", a: "Variable schedules of reinforcement produce persistent behaviour that is hard to extinguish." } ],
    further: ["B. F. Skinner, Beyond Freedom and Dignity (1971)"]
  },
  {
    id: "psy.piaget", kind: "psychologist", title: "Jean Piaget",
    line: "Watched children reason and found that they think differently from adults, not just less well.",
    facets: { field: ["developmental"], lens: ["cognitive"], era: ["early", "cognitive-revolution"] },
    life: "1896 to 1980", place: "Neuchâtel and Geneva, Switzerland",
    say: { text: "Piaget", respell: "pee ah ZHAY", ipa: "pjaˈʒɛ" },
    body: [
      "Piaget began as a biologist studying molluscs and became fascinated by children's wrong answers on intelligence tests. The mistakes were not random; children of the same age made the same kind of error. He asked how knowledge itself develops, a project he called genetic epistemology, and watched his own three children and many others closely.",
      "His answer was that children actively build their understanding, assimilating new experience to existing schemes and accommodating those schemes when they fail, passing through stages of reasoning. Later research showed children are often more capable earlier than his tasks revealed, but his picture of the child as an active thinker transformed education and developmental psychology."
    ],
    links: [
      { to: "psy.cognitive-development", type: "influenced", why: "Piaget proposed the best known stage theory of how children's thinking develops." },
      { to: "psy.vygotsky", type: "contrasts", why: "Vygotsky, born the same year, stressed social learning where Piaget stressed the child's own discovery." },
      { to: "phil.kant", type: "links-to", why: "Piaget's genetic epistemology asks Kant's question about the structures of knowledge, but tracks how they develop in children." }
    ],
    recall: [ { q: "What did Piaget find interesting about children's wrong answers?", a: "They were systematic: children of the same age made the same kinds of error, revealing different ways of reasoning." } ]
  },
  {
    id: "psy.vygotsky", kind: "psychologist", title: "Lev Vygotsky",
    line: "Soviet psychologist who argued that thinking is learned socially, through language and guidance.",
    facets: { field: ["developmental", "learning"], lens: ["sociocultural"], era: ["early"] },
    life: "1896 to 1934", place: "Moscow, Soviet Union",
    say: { text: "Vygotsky", respell: "vih GOT skee", ipa: "vɨˈɡotskʲɪj" },
    body: [
      "Vygotsky had a short life; he died of tuberculosis at 37, and much of his work was suppressed in the Soviet Union for years. He asked how uniquely human forms of thinking arise, and answered that they are borrowed from culture: language, counting systems and ways of reasoning are first used with other people and then turned inward.",
      "He noticed children talking aloud to themselves while solving problems and saw this private speech as thought in the making. His zone of proximal development, the space between what a learner can do alone and with help, became one of the most influential ideas in education after his work was translated into English from the 1960s onward."
    ],
    links: [
      { to: "psy.zpd", type: "influenced", why: "Vygotsky introduced the zone of proximal development." },
      { to: "psy.sociocultural", type: "influenced", why: "He is the founding figure of the sociocultural approach to mind." }
    ],
    recall: [ { q: "What was private speech for Vygotsky?", a: "Children talking to themselves while working: social speech on its way to becoming inner thought." } ],
    further: ["Lev Vygotsky, Mind in Society (1978)"]
  },
  {
    id: "psy.bowlby", kind: "psychologist", title: "John Bowlby",
    line: "British psychiatrist who argued that infants need a secure attachment as surely as they need food.",
    facets: { field: ["developmental", "clinical"], lens: ["evolutionary", "psychodynamic"], era: ["early", "cognitive-revolution"] },
    life: "1907 to 1990", place: "London, England",
    body: [
      "Bowlby trained in psychoanalysis but grew impatient with its focus on fantasy over real events. Working with troubled children in London, he asked what happens when a child is separated from those who care for it. His 1951 report for the World Health Organization argued that loving, continuous care is essential to mental health, and helped change hospital rules that kept parents away from sick children.",
      "Drawing on ethology and evolution, he proposed attachment theory: an infant is born with a system that keeps it close to a protective carer, and early relationships shape expectations about others. His trilogy Attachment and Loss (1969 to 1980) remains foundational, though some early claims about permanent damage from separation proved too strong."
    ],
    links: [
      { to: "psy.attachment", type: "influenced", why: "Bowlby founded attachment theory." },
      { to: "psy.ainsworth", type: "influenced", why: "Ainsworth worked with Bowlby and gave his theory a way to be measured." },
      { to: "psy.harlow-monkeys", type: "links-to", why: "Harlow's monkeys supported Bowlby's claim that comfort, not just food, binds infant to carer." }
    ],
    recall: [ { q: "What did Bowlby's work change in hospitals?", a: "It helped end rules that kept parents away from their sick children." } ],
    further: ["John Bowlby, A Secure Base (1988)"]
  },
  {
    id: "psy.ainsworth", kind: "psychologist", title: "Mary Ainsworth",
    line: "Measured attachment with the Strange Situation and linked it to how sensitively carers respond.",
    facets: { field: ["developmental"], lens: ["evolutionary", "cognitive"], era: ["cognitive-revolution"] },
    life: "1913 to 1999", place: "Toronto, Kampala and Baltimore",
    body: [
      "Ainsworth asked how attachment differs between children and why. She observed mothers and infants in Uganda in the 1950s and then in Baltimore homes, noting how quickly and appropriately mothers responded to their babies' signals. She called this sensitivity and argued it shaped the security of the bond.",
      "Her Strange Situation procedure, a short sequence of separations and reunions, made attachment measurable and launched thousands of studies. Its categories are now applied cautiously, with awareness of cultural differences, but her combination of patient home observation and structured testing remains a model."
    ],
    links: [
      { to: "psy.strange-situation", type: "influenced", why: "Ainsworth designed the Strange Situation procedure." },
      { to: "psy.attachment", type: "influenced", why: "She turned Bowlby's attachment theory into a research programme with measurable categories." }
    ],
    recall: [ { q: "What did Ainsworth mean by sensitivity?", a: "How promptly and appropriately a carer responds to an infant's signals." } ]
  },
  {
    id: "psy.maslow", kind: "psychologist", title: "Abraham Maslow",
    line: "Humanistic psychologist of motivation, self actualisation and peak experiences.",
    facets: { field: ["personality", "positive"], lens: ["humanistic"], era: ["early", "cognitive-revolution"] },
    life: "1908 to 1970", place: "Brooklyn, New York; Brandeis University, Massachusetts",
    quote: { text: "I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail.", source: "Abraham Maslow, The Psychology of Science (1966)" },
    body: [
      "Maslow started in behaviourist animal research, then turned to a question that psychology had neglected: what are the healthiest, most fulfilled people like? Rather than studying illness, he studied people he admired, including Abraham Lincoln and Eleanor Roosevelt, and described their qualities: acceptance, spontaneity, a sense of purpose, deep relationships and peak experiences of wonder.",
      "His 1943 theory of motivation arranged human needs from physiological ones up to self actualisation. Near the end of his life he added self transcendence, devotion to something beyond oneself. His methods were informal and his famous hierarchy has weak empirical support, but he helped found humanistic psychology and asked questions positive psychology still pursues."
    ],
    links: [
      { to: "psy.hierarchy-of-needs", type: "influenced", why: "Maslow proposed the hierarchy of needs in 1943." },
      { to: "psy.humanistic", type: "influenced", why: "He was a founder of humanistic psychology, the third force." },
      { to: "psy.positive-psychology", type: "influenced", why: "Maslow used the phrase positive psychology decades before Seligman's movement." },
      { to: "phil.existentialism", type: "links-to", why: "His ideas of self actualisation and authentic living echo existentialist themes of becoming who one is." }
    ],
    recall: [ { q: "Whom did Maslow study to understand self actualisation?", a: "People he judged unusually healthy and fulfilled, including historical figures such as Lincoln and Eleanor Roosevelt." } ],
    further: ["Abraham Maslow, Motivation and Personality (1954)"]
  },
  {
    id: "psy.rogers", kind: "psychologist", title: "Carl Rogers",
    line: "Founded person centred therapy: empathy, genuineness and unconditional positive regard.",
    facets: { field: ["clinical", "personality"], lens: ["humanistic"], era: ["cognitive-revolution"] },
    life: "1902 to 1987", place: "Chicago, Wisconsin and La Jolla, California",
    quote: { text: "The curious paradox is that when I accept myself just as I am, then I can change.", source: "Carl Rogers, On Becoming a Person (1961)" },
    body: [
      "Rogers asked what actually helps people change in therapy. His answer was that the relationship matters more than the technique: a therapist who is genuine, who understands the client's world with accurate empathy, and who offers unconditional positive regard creates conditions in which a person's own tendency toward growth can work.",
      "He was also a pioneer of psychotherapy research, recording sessions so that they could be studied, which was unusual at the time. Later research supports a modest version of his view: the quality of the working alliance predicts outcomes across many therapies. His influence runs through counselling, teaching and any conversation where listening matters more than advice."
    ],
    links: [
      { to: "psy.humanistic", type: "influenced", why: "Rogers was, with Maslow, the leading figure of humanistic psychology." },
      { to: "psy.self", type: "influenced", why: "He placed the self concept, and the gap between real and ideal self, at the heart of his theory." }
    ],
    recall: [ { q: "What three conditions did Rogers think a therapist should offer?", a: "Genuineness, accurate empathy and unconditional positive regard." } ],
    further: ["Carl Rogers, On Becoming a Person (1961)"]
  },
  {
    id: "psy.festinger", kind: "psychologist", title: "Leon Festinger",
    line: "Social psychologist of cognitive dissonance and social comparison; studied a doomsday group from inside.",
    facets: { field: ["social"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    life: "1919 to 1989", place: "New York; Stanford University, California",
    say: { text: "Festinger", respell: "FEST in jer", ipa: "ˈfɛstɪndʒər" },
    body: [
      "Festinger asked how people handle the friction between what they believe and what they do or see. In 1954 he and colleagues joined a small group expecting the world to end on a set date. When the prophecy failed, many members did not give up their belief but began to spread it more eagerly. The study, published as When Prophecy Fails (1956), had its own methodological problems, since the observers were part of a tiny group, but it sharpened his theory.",
      "In A Theory of Cognitive Dissonance (1957) he argued that inconsistency creates discomfort that we reduce, often by changing beliefs rather than behaviour. He also proposed social comparison theory: we judge our abilities and opinions by comparing ourselves with others. Later in life he turned to archaeology and the history of technology."
    ],
    links: [
      { to: "psy.cognitive-dissonance", type: "influenced", why: "Festinger proposed the theory of cognitive dissonance." },
      { to: "psy.festinger-carlsmith", type: "influenced", why: "He designed the classic one dollar experiment with James Carlsmith." }
    ],
    recall: [ { q: "What happened when the doomsday prophecy failed?", a: "Many members held on to the belief and began spreading it more actively." } ],
    further: ["Leon Festinger, Henry Riecken and Stanley Schachter, When Prophecy Fails (1956)"]
  },
  {
    id: "psy.bandura", kind: "psychologist", title: "Albert Bandura",
    line: "Showed that we learn by watching others, and that belief in our own capability shapes what we attempt.",
    facets: { field: ["learning", "social", "personality"], lens: ["cognitive", "behavioural"], era: ["cognitive-revolution", "modern"] },
    life: "1925 to 2021", place: "Mundare, Alberta; Stanford University, California",
    body: [
      "Bandura grew up in a small Canadian town where, as he told it, the school had few resources and students had to teach themselves. He asked a question behaviourism could not answer well: how do people learn things they have never been rewarded for doing? His answer was observation. We watch others, notice what happens to them, and copy selectively.",
      "His Bobo doll studies made the point vividly. He then developed social cognitive theory, which treats people as agents who set goals and regulate themselves, and introduced self efficacy, the belief that one can carry out a task. Surveys of psychologists have ranked him among the most cited figures in the field's history."
    ],
    links: [
      { to: "psy.social-learning", type: "influenced", why: "Bandura developed social learning theory and later social cognitive theory." },
      { to: "psy.bobo-doll", type: "influenced", why: "He ran the Bobo doll experiments on imitation." },
      { to: "psy.self-efficacy", type: "influenced", why: "He introduced self efficacy in 1977." }
    ],
    recall: [ { q: "What question did Bandura ask that behaviourism struggled with?", a: "How people learn behaviour they have never been rewarded for, which he answered with observational learning." } ],
    further: ["Albert Bandura, Self Efficacy: The Exercise of Control (1997)"]
  },
  {
    id: "psy.beck", kind: "psychologist", title: "Aaron T. Beck",
    line: "Psychiatrist who founded cognitive therapy after noticing the automatic thoughts of depressed patients.",
    facets: { field: ["clinical"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    life: "1921 to 2021", place: "University of Pennsylvania, Philadelphia",
    body: [
      "Beck trained as a psychoanalyst and set out to test psychoanalytic ideas about depression. The results did not fit. Instead he noticed that his patients had quick, automatic negative thoughts about themselves, their world and their future, a pattern he called the cognitive triad, and that these thoughts were often distorted in predictable ways.",
      "From this he built cognitive therapy in the 1960s: patients learn to catch automatic thoughts, test them against evidence and form more balanced views. He insisted on measuring outcomes, developed widely used questionnaires, and ran early controlled trials. Cognitive therapy merged with behaviour therapy into CBT, one of the most researched psychological treatments. He kept working into his late nineties."
    ],
    links: [
      { to: "psy.cbt", type: "influenced", why: "Beck founded cognitive therapy, the cognitive half of CBT." },
      { to: "psy.depression", type: "influenced", why: "His cognitive model of depression reshaped how the condition is understood and treated." },
      { to: "phil.stoicism", type: "links-to", why: "Beck acknowledged the Stoic insight that our interpretations of events, not events alone, shape our distress." }
    ],
    recall: [ { q: "What is Beck's cognitive triad?", a: "Negative automatic views of the self, the world and the future." } ],
    further: ["Aaron T. Beck, Cognitive Therapy and the Emotional Disorders (1976)"]
  },
  {
    id: "psy.ellis", kind: "psychologist", title: "Albert Ellis",
    line: "Founder of rational emotive behaviour therapy, the first of the cognitive therapies.",
    facets: { field: ["clinical"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    life: "1913 to 2007", place: "New York",
    body: [
      "Ellis, like Beck, began in psychoanalysis and found it slow and unconvincing. In 1955 he launched what became rational emotive behaviour therapy. His ABC model holds that an activating event (A) does not directly cause an emotional consequence (C); a belief (B) about the event sits between them. Rigid demands such as “I must be approved of” turn disappointment into misery.",
      "Ellis was blunt, funny and combative, and he openly credited the Stoic philosopher Epictetus for the central idea. His work, alongside Beck's, laid the foundation for the cognitive approaches that now dominate evidence based psychotherapy."
    ],
    links: [
      { to: "psy.cbt", type: "influenced", why: "Ellis's rational emotive behaviour therapy was the first cognitive therapy and a direct ancestor of CBT." },
      { to: "phil.stoicism", type: "links-to", why: "Ellis repeatedly cited Epictetus: we are disturbed not by things but by our views of things." }
    ],
    recall: [ { q: "What do A, B and C stand for in Ellis's model?", a: "Activating event, Belief about it, emotional Consequence." } ]
  },
  {
    id: "psy.kahneman", kind: "psychologist", title: "Daniel Kahneman",
    line: "Psychologist who won the Nobel prize in economics for showing how judgement departs from rationality.",
    facets: { field: ["cognitive", "behavioural-economics"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    life: "1934 to 2024", place: "Tel Aviv, Paris and Jerusalem; Princeton University",
    say: { text: "Kahneman", respell: "KAH nuh mun", ipa: "ˈkɑːnəmən" },
    quote: { text: "Nothing in life is as important as you think it is, while you are thinking about it.", source: "Daniel Kahneman, Thinking, Fast and Slow (2011), chapter 38" },
    body: [
      "Kahneman spent part of his childhood hiding in Nazi occupied France, and later served as a psychologist in the Israeli army. With Amos Tversky, from the late 1960s, he asked how people actually judge probabilities and make choices under uncertainty. Their answer, a catalogue of heuristics and biases and the prospect theory of choice, earned him the Nobel prize in economics in 2002; Tversky had died in 1996.",
      "Later he studied wellbeing, separating the experiencing self from the remembering self, and summarised his life's work for general readers in Thinking, Fast and Slow (2011). He was notably candid when some research he had cited in that book, on behavioural priming, failed to replicate; in 2012 he warned the field of a coming train wreck and urged replication. That honesty is part of his legacy."
    ],
    links: [
      { to: "psy.heuristics", type: "influenced", why: "With Tversky, Kahneman founded the heuristics and biases programme." },
      { to: "psy.prospect-theory", type: "influenced", why: "Prospect theory, with Tversky, was the work cited for his Nobel prize." },
      { to: "psy.dual-process", type: "influenced", why: "Kahneman popularised the System 1 and System 2 framework." },
      { to: "psy.tversky", type: "links-to", why: "Their partnership is one of the most productive collaborations in the history of psychology." }
    ],
    recall: [ { q: "What did Kahneman say about the priming studies in his book?", a: "He acknowledged they had failed to replicate and urged the field to replicate its findings." } ],
    further: ["Daniel Kahneman, Thinking, Fast and Slow (2011)", "Michael Lewis, The Undoing Project (2016)"]
  },
  {
    id: "psy.tversky", kind: "psychologist", title: "Amos Tversky",
    line: "Mathematical psychologist and Kahneman's partner in heuristics, biases and prospect theory.",
    facets: { field: ["cognitive", "behavioural-economics"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    life: "1937 to 1996", place: "Haifa, Israel; Stanford University, California",
    say: { text: "Tversky", respell: "TVER skee", ipa: "ˈtvɛrski" },
    body: [
      "Tversky brought mathematical rigour and a quick, playful mind to the study of choice. He asked where formal theories of rational decision break down, and with Kahneman designed simple, memorable problems that revealed systematic errors in ordinary reasoning, such as the Linda problem, in which people judge a specific combination of events more likely than one of its parts.",
      "Their work reshaped economics, law, medicine and public policy. Tversky died of cancer in 1996 at 59. Nobel prizes are not awarded posthumously, and Kahneman made clear that the prize he received in 2002 was for joint work."
    ],
    links: [
      { to: "psy.heuristics", type: "influenced", why: "Tversky cofounded the study of heuristics and biases." },
      { to: "psy.prospect-theory", type: "influenced", why: "Prospect theory was a joint creation with Kahneman." },
      { to: "psy.asian-disease", type: "influenced", why: "Tversky and Kahneman designed the classic framing problem." }
    ],
    recall: [ { q: "Why did Tversky not share the 2002 Nobel prize?", a: "He had died in 1996, and the prize is not awarded posthumously." } ],
    further: ["Michael Lewis, The Undoing Project (2016)"]
  },
  {
    id: "psy.csikszentmihalyi", kind: "psychologist", title: "Mihaly Csikszentmihalyi",
    line: "Hungarian American psychologist who named and studied flow, the state of total absorption.",
    facets: { field: ["positive"], lens: ["humanistic", "cognitive"], era: ["cognitive-revolution", "modern"] },
    life: "1934 to 2021", place: "Born in Fiume (now Rijeka, Croatia); University of Chicago",
    say: { text: "Csikszentmihalyi", respell: "CHEEK sent me high ee", ipa: "ˈtʃiːksɛntmihaːji" },
    body: [
      "As a boy in wartime Europe, Csikszentmihalyi saw many adults lose their sense of purpose. He asked what makes life worth living, and was struck by artists who painted for hours, forgetting food and time, with little interest in the finished canvas. He went on to study rock climbers, chess players, surgeons and ordinary workers.",
      "To capture experience as it happened, he and colleagues developed the experience sampling method: participants carried pagers and recorded what they were doing and feeling at random moments. From this came the concept of flow and the book Flow (1990). With Seligman he co founded positive psychology."
    ],
    links: [
      { to: "psy.flow", type: "influenced", why: "Csikszentmihalyi named and studied flow." },
      { to: "psy.positive-psychology", type: "influenced", why: "He co founded positive psychology with Martin Seligman." }
    ],
    recall: [ { q: "What is the experience sampling method?", a: "Asking people at random moments, signalled by a pager or phone, what they are doing and feeling." } ],
    further: ["Mihaly Csikszentmihalyi, Flow: The Psychology of Optimal Experience (1990)"]
  },
  {
    id: "psy.seligman", kind: "psychologist", title: "Martin Seligman",
    line: "Studied learned helplessness, then turned psychology toward wellbeing with positive psychology.",
    facets: { field: ["clinical", "positive"], lens: ["cognitive", "behavioural"], era: ["cognitive-revolution", "modern"] },
    life: "born 1942", place: "University of Pennsylvania, Philadelphia",
    body: [
      "Seligman's career has two halves. In the 1960s, with Steven Maier and Bruce Overmier, he found that dogs exposed to shocks they could not control later failed to escape shocks they could. Learned helplessness became a model for depression, later refined into a theory about explanatory style: how people explain bad events to themselves.",
      "As president of the American Psychological Association in 1998 he called for a positive psychology, the study of what makes life go well. He proposed the PERMA model of wellbeing (positive emotion, engagement, relationships, meaning, accomplishment). His large scale resilience programmes, including one for the US Army, have drawn criticism for limited evidence, a reminder that the field's ambitions can outrun its data."
    ],
    links: [
      { to: "psy.learned-helplessness", type: "influenced", why: "Seligman co discovered learned helplessness." },
      { to: "psy.positive-psychology", type: "influenced", why: "He launched positive psychology as a movement in 1998." }
    ],
    recall: [ { q: "What does PERMA stand for?", a: "Positive emotion, engagement, relationships, meaning and accomplishment." } ],
    further: ["Martin Seligman, Learned Optimism (1990)"]
  },
  {
    id: "psy.dweck", kind: "psychologist", title: "Carol Dweck",
    line: "Stanford psychologist behind the idea of growth and fixed mindsets.",
    facets: { field: ["learning", "developmental", "personality"], lens: ["cognitive"], era: ["modern", "replication"] },
    life: "born 1946", place: "New York; Stanford University, California",
    body: [
      "Dweck asked why some children cope with failure by trying harder while equally able children give up. Over decades of research she traced the difference to beliefs about ability: whether it is seen as fixed or as something that grows with effort and good strategy.",
      "Her book Mindset (2006) made the idea famous in schools and businesses. Large later studies found the average effects of mindset interventions to be small, and Dweck has warned against a false growth mindset that simply praises effort. The debate over her work is a good case study in how a real but modest effect can become a cultural slogan."
    ],
    links: [
      { to: "psy.growth-mindset", type: "influenced", why: "Dweck developed the theory of growth and fixed mindsets." },
      { to: "psy.self-efficacy", type: "links-to", why: "Both research traditions study how beliefs about one's abilities shape effort and persistence." }
    ],
    recall: [ { q: "What is a false growth mindset, in Dweck's terms?", a: "Praising effort alone, without attention to strategy, learning and progress." } ],
    further: ["Carol Dweck, Mindset (2006)"]
  },
  {
    id: "psy.loftus", kind: "psychologist", title: "Elizabeth Loftus",
    line: "Showed that memory is reconstructive and can be altered by leading questions and suggestion.",
    facets: { field: ["cognitive"], lens: ["cognitive"], era: ["modern"] },
    life: "born 1944", place: "University of Washington; University of California, Irvine",
    body: [
      "Loftus asked how reliable eyewitness memory really is. Her experiments from the 1970s showed that the wording of a question, or misleading information encountered after an event, can change what people remember. In the 1990s she showed that some people can come to remember entire childhood events that never happened, such as being lost in a shopping mall.",
      "She has testified as an expert in hundreds of legal cases and was a central figure in the so called memory wars over recovered memories of abuse, where her work drew fierce criticism as well as praise. Her research changed police procedures for interviewing witnesses in many countries."
    ],
    links: [
      { to: "psy.misinformation", type: "influenced", why: "Loftus's car crash experiments demonstrated the misinformation effect." },
      { to: "psy.memory", type: "influenced", why: "She established that memory is reconstructive and open to suggestion." }
    ],
    recall: [ { q: "What did Loftus show could be implanted in memory?", a: "Whole false events, such as being lost in a mall as a child, in some participants." } ],
    further: ["Elizabeth Loftus and Katherine Ketcham, The Myth of Repressed Memory (1994)"]
  },
  {
    id: "psy.miller", kind: "psychologist", title: "George A. Miller",
    line: "Cognitive pioneer famous for the magical number seven, the limit on what we hold in mind.",
    facets: { field: ["cognitive"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    life: "1920 to 2012", place: "Harvard and Princeton universities",
    body: [
      "Miller asked how much information the mind can handle at once. His witty 1956 paper, The Magical Number Seven, Plus or Minus Two, noted that people can hold roughly seven items in immediate memory, but that we stretch this by grouping items into meaningful chunks, as when a phone number becomes three groups.",
      "He co founded the Harvard Center for Cognitive Studies in 1960 with Jerome Bruner, helped bring Chomsky's linguistics into psychology, and later built WordNet, a large database of English word meanings. He is one of the central figures of the cognitive revolution."
    ],
    links: [
      { to: "psy.working-memory", type: "influenced", why: "Miller's work on the limits of immediate memory led to modern models of working memory." },
      { to: "psy.cognitive-revolution", type: "influenced", why: "He was a central organiser of the cognitive revolution." }
    ],
    recall: [ { q: "What is chunking?", a: "Grouping items into meaningful units so more can be held in mind." } ]
  }
  );

  /* -------------------------------------------------------- Constructs (1) */
  N.push(
  {
    id: "psy.consciousness", kind: "construct", title: "Consciousness",
    line: "The fact that there is something it is like to be you: experience, awareness, a point of view.",
    facets: { field: ["cognitive", "biological"], lens: ["biological", "cognitive"], era: ["founding", "modern", "replication"] },
    evidence: "contested",
    evidenceNote: "Experience itself is not in doubt and its brain correlates are studied rigorously, but no theory of how it arises commands agreement.",
    body: [
      "Psychology began as the science of consciousness, then behaviourism banished the word for half a century. It returned in the 1990s, when researchers such as Francis Crick and Christof Koch argued that the neural correlates of consciousness could be studied like anything else: compare brain activity when a stimulus is seen with when the same stimulus is present but not seen.",
      "This has taught a great deal. Patients with blindsight, after damage to visual cortex, deny seeing objects yet can point to them well above chance, which shows that much visual processing happens without awareness. Masking and attention experiments reveal the limits of what reaches awareness. Leading theories include global workspace theory, in which consciousness is information broadcast widely across the brain, and integrated information theory, which ties it to how unified a system's causal structure is.",
      "But a deeper puzzle remains, which the philosopher David Chalmers called the hard problem: why any of this processing is accompanied by experience at all. In 2023 a large adversarial collaboration tested predictions of the two leading theories against each other, and the results challenged both. Consciousness is where psychology, neuroscience and philosophy meet most directly, and where honest uncertainty is greatest."
    ],
    links: [
      { to: "psy.attention", type: "links-to", why: "Attention and awareness are closely linked, though experiments show they can come apart." },
      { to: "psy.libet", type: "links-to", why: "Libet's experiment asked when we become conscious of a decision, and whether awareness comes too late to cause it." },
      { to: "psy.predictive-processing", type: "links-to", why: "Predictive processing proposes that conscious experience is the brain's best guess about its inputs." },
      { to: "phil.consciousness", type: "links-to", why: "The science of consciousness and the philosophy of consciousness share one question from two sides." },
      { to: "phil.mind-body", type: "links-to", why: "Every theory of consciousness is also an answer, often unstated, to the mind body problem." },
      { to: "phys.measurement-problem", type: "links-to", why: "Some popular accounts say consciousness collapses quantum states; this is a minority view in physics, and the measurement problem does not require a conscious observer." }
    ],
    prompts: ["Think of a drive home you cannot remember making. What was conscious during it, and what was not?", "Is there anything you are sure you know about consciousness that no experiment could ever test?"],
    recall: [ { q: "What is blindsight?", a: "After damage to visual cortex, patients deny seeing objects yet respond to them above chance, showing processing without awareness." }, { q: "What is the hard problem of consciousness?", a: "Why physical processing is accompanied by subjective experience at all." } ],
    further: ["Anil Seth, Being You (2021)", "Susan Blackmore, Consciousness: A Very Short Introduction (2005)"]
  },
  {
    id: "psy.self", kind: "construct", title: "The self",
    line: "Your sense of being one continuing person, with a story, a body and a view of who you are.",
    facets: { field: ["personality", "social", "cognitive"], lens: ["cognitive", "sociocultural"], era: ["founding", "modern"] },
    people: ["psy.william-james"],
    evidence: "moderate",
    evidenceNote: "Self concept and self knowledge are well studied, but many popular claims, especially about boosting self esteem, have weak support.",
    body: [
      "William James split the self into the I, the subject that knows, and the me, everything a person counts as theirs: body, family, reputation, possessions, roles. Psychology has mostly studied the me: the self concept, self esteem, the stories people tell about their lives, and how these shift across situations and cultures.",
      "Some findings are solid. Information related to yourself is remembered better, known as the self reference effect. People maintain a flattering but not wildly distorted view of themselves. Narrative identity, the internal story of how you became who you are, tends to grow more coherent through adulthood. Cultural psychology suggests the self is defined more by relationships in some societies and more by personal traits in others.",
      "Other claims have weakened. A major review in 2003 found that raising self esteem does little to improve school performance or behaviour; it seems more a result of doing well than a cause. And neuroscience finds no single place where the self lives, which fits the view, held by Hume and by Buddhist thought, that the self is a process or a construction rather than a thing."
    ],
    links: [
      { to: "psy.memory", type: "links-to", why: "Autobiographical memory supplies the story that gives the self its continuity." },
      { to: "psy.big-five", type: "links-to", why: "Personality traits are part of how people describe their selves, and how others describe them." },
      { to: "phil.personal-identity", type: "links-to", why: "Philosophers ask what makes you the same person over time; psychology studies how people actually build that sense." },
      { to: "phil.no-self", type: "links-to", why: "The Buddhist teaching of no self finds a surprising echo in research showing the self is constructed, not found." },
      { to: "phil.hume", type: "links-to", why: "Hume looked inward and found only a bundle of perceptions, never a self; modern psychology has some sympathy." }
    ],
    prompts: ["Which roles feel most like you: daughter, mother, sister, wife, friend, worker? Does the list change depending on the day?", "Is the story you tell about your life the same story your family would tell about it?"],
    recall: [ { q: "What is the difference between James's I and me?", a: "The I is the knowing subject; the me is everything one counts as oneself, such as body, roles and reputation." }, { q: "Does raising self esteem improve school performance?", a: "A major 2003 review found little evidence that it does; high self esteem seems more a result than a cause." } ],
    further: ["Bruce Hood, The Self Illusion (2012)"]
  },
  {
    id: "psy.cognitive-dissonance", kind: "construct", title: "Cognitive dissonance",
    line: "The discomfort of holding beliefs and actions that clash, and the mental moves we make to ease it.",
    facets: { field: ["social"], lens: ["cognitive"], era: ["cognitive-revolution", "replication"] },
    people: ["psy.festinger"],
    evidence: "mixed",
    evidenceNote: "Discomfort with inconsistency is widely observed, but a large 2024 replication of the classic induced compliance paradigm found no reliable attitude change.",
    body: [
      "Leon Festinger proposed in 1957 that holding two inconsistent cognitions, such as “I smoke” and “smoking kills”, creates an unpleasant tension that people are motivated to reduce. Often the easiest move is not to change behaviour but to adjust a belief: the risks are exaggerated, my grandfather smoked and lived to ninety.",
      "The theory generated a famous family of findings. After a hard choice between two good options, people rate the chosen one more highly. People who endure an unpleasant initiation value the group more. And in the classic experiment by Festinger and Carlsmith, people paid little to tell a lie came to believe it more than people paid well.",
      "The idea feels true to experience, and it has entered everyday speech. But the evidence is less tidy than textbooks suggest. Some effects may reflect self presentation rather than inner tension, and in 2024 a replication run across dozens of laboratories in many countries failed to find the attitude change predicted by the induced compliance procedure. The concept remains useful; the strongest laboratory claims need caution."
    ],
    links: [
      { to: "psy.festinger-carlsmith", type: "links-to", why: "The one dollar experiment is the most famous test of dissonance theory." },
      { to: "psy.confirmation-bias", type: "links-to", why: "Seeking evidence that supports what we already believe is one way to avoid dissonance in the first place." },
      { to: "psy.self", type: "links-to", why: "Later versions of the theory argue dissonance bites hardest when it threatens our view of ourselves as good and competent." },
      { to: "eng.from-ideas", type: "links-to", why: "Cognitive dissonance has passed from a technical term into everyday English." }
    ],
    prompts: ["Think of a purchase or decision you defended more strongly after making it. What did the defending do for you?"],
    recall: [ { q: "What is the easiest way to reduce dissonance, according to the theory?", a: "Often to change a belief rather than the behaviour." } ],
    further: ["Carol Tavris and Elliot Aronson, Mistakes Were Made (But Not by Me) (2007)"]
  },
  {
    id: "psy.heuristics", kind: "construct", title: "Heuristics and biases",
    line: "Mental shortcuts that usually serve us well but produce predictable errors in judgement.",
    facets: { field: ["cognitive", "behavioural-economics"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    people: ["psy.kahneman", "psy.tversky"],
    evidence: "strong",
    evidenceNote: "The core heuristics replicate robustly across labs and countries; how irrational they make us is debated.",
    body: [
      "In 1974 Tversky and Kahneman described three shortcuts people use to judge uncertain things. Availability: we judge how common something is by how easily examples come to mind, so vivid plane crashes feel more likely than they are. Representativeness: we judge probability by resemblance to a type, and neglect base rates. Anchoring: we start from a number, even an irrelevant one, and adjust too little.",
      "Their demonstrations were simple and hard to forget. In the Linda problem, people read about a woman concerned with social justice and judge it more likely that she is a bank teller and active in the feminist movement than simply a bank teller, which is logically impossible. Such errors are systematic, not random, and they appear in experts as well as novices.",
      "The German psychologist Gerd Gigerenzer has argued that heuristics are often smart, fitted to real environments, and that many errors shrink when problems are given as natural frequencies rather than probabilities. Both views can be true: shortcuts are efficient, and their failures are predictable enough to design around. Herbert Simon's older idea of bounded rationality is the common ground."
    ],
    links: [
      { to: "psy.anchoring", type: "example-of", why: "Anchoring is one of the three original heuristics Tversky and Kahneman described." },
      { to: "psy.dual-process", type: "links-to", why: "Heuristics are often described as the work of fast, intuitive System 1 thinking." },
      { to: "phil.rationalism", type: "contrasts", why: "Rationalists trusted reason as the surest guide; heuristics research maps where everyday reasoning reliably goes wrong." }
    ],
    prompts: ["After you hear about a burglary in your area, does it feel more likely to happen to you? That shift is availability at work."],
    recall: [ { q: "What is the availability heuristic?", a: "Judging how common something is by how easily examples come to mind." }, { q: "What does the Linda problem show?", a: "People judge a conjunction of two things as more likely than one of them alone, which is logically impossible." } ],
    further: ["Daniel Kahneman, Thinking, Fast and Slow (2011)", "Gerd Gigerenzer, Gut Feelings (2007)"]
  },
  {
    id: "psy.confirmation-bias", kind: "construct", title: "Confirmation bias",
    line: "Seeking, noticing and remembering evidence that supports what we already believe.",
    facets: { field: ["cognitive", "social"], lens: ["cognitive"], era: ["cognitive-revolution"] },
    evidence: "strong",
    evidenceNote: "Shown in many paradigms over six decades, from rule discovery tasks to how people weigh political evidence.",
    body: [
      "In 1960 Peter Wason gave people the number sequence 2, 4, 6 and asked them to find the rule behind it by proposing new sequences. Most guessed something like “even numbers rising by two” and tested only sequences that fitted their guess, such as 8, 10, 12. The real rule was simply any rising numbers. Few people tried a sequence that could prove them wrong.",
      "Confirmation bias covers several tendencies: searching for supporting evidence, interpreting ambiguous evidence in our favour, and remembering hits better than misses. In a classic 1979 study, supporters and opponents of the death penalty read the same mixed research; both sides ended up more convinced of their original view.",
      "Hugo Mercier and Dan Sperber suggest that reasoning evolved partly to argue and persuade, which would explain why we are good at finding reasons for our own side and good at spotting flaws in others'. That suggests a remedy: we reason better in groups that disagree constructively than alone."
    ],
    links: [
      { to: "psy.heuristics", type: "part-of", why: "Confirmation bias sits within the wider catalogue of systematic biases in judgement." },
      { to: "psy.memory", type: "links-to", why: "We tend to remember the cases that fit our beliefs and forget the ones that do not." },
      { to: "phil.falsification", type: "contrasts", why: "Popper urged scientists to seek evidence that could refute a theory, the exact opposite of our natural tendency." },
      { to: "phil.induction", type: "links-to", why: "Piling up confirming cases is the weakness of induction that Hume and Popper identified." }
    ],
    prompts: ["Think of an opinion you hold strongly. What evidence would change your mind, and have you ever gone looking for it?"],
    recall: [ { q: "What did Wason's 2, 4, 6 task reveal?", a: "People test only cases that fit their hypothesis instead of trying cases that could disprove it." } ]
  },
  {
    id: "psy.anchoring", kind: "construct", title: "Anchoring",
    line: "A first number, even an irrelevant one, pulls later estimates toward it.",
    facets: { field: ["cognitive", "behavioural-economics"], lens: ["cognitive"], era: ["cognitive-revolution", "replication"] },
    evidence: "strong",
    evidenceNote: "Anchoring replicated robustly in large multi site projects; effects of obviously random anchors are smaller and less reliable.",
    body: [
      "In a 1974 study, Tversky and Kahneman spun a wheel rigged to stop at 10 or 65, then asked people what percentage of African countries were members of the United Nations. Those who saw 10 gave a median estimate of 25 percent; those who saw 65 gave 45 percent. A number they knew to be random pulled their answers.",
      "Anchoring shows up in house prices, salary negotiations, legal damages and charity donations. Asking prices, suggested donation amounts and the first offer in a negotiation all serve as anchors. Even experts are affected, and warning people about anchoring helps only a little.",
      "The basic effect is one of the most reliable in psychology and was replicated in the large Many Labs project in 2014. Some striking versions, such as prices influenced by the last digits of a person's social security number, have produced much smaller effects in recent replications. The safe summary: relevant anchors pull strongly, wholly arbitrary ones pull less."
    ],
    links: [
      { to: "psy.prospect-theory", type: "links-to", why: "Prospect theory's reference point is a kind of anchor: outcomes are judged relative to where you start." },
      { to: "psy.behavioural-economics", type: "links-to", why: "Anchoring is a staple of behavioural economics, from pricing to negotiation." },
      { to: "psy.priming", type: "contrasts", why: "Anchoring survived replication tests that many social priming effects did not." }
    ],
    prompts: ["Next time you see a price marked down from a higher one, ask what the crossed out number is doing to your judgement."],
    recall: [ { q: "What did the rigged wheel of fortune show?", a: "A random number shifted people's estimates of an unrelated quantity toward it." } ]
  },
  {
    id: "psy.loss-aversion", kind: "construct", title: "Loss aversion",
    line: "Losses loom larger than equal gains: losing 50 hurts more than winning 50 pleases.",
    facets: { field: ["behavioural-economics", "cognitive"], lens: ["cognitive", "evolutionary"], era: ["cognitive-revolution", "modern"] },
    evidence: "moderate",
    evidenceNote: "Supported by many studies and a large 2024 meta analysis, but its size varies with stakes and context and some researchers dispute its generality.",
    body: [
      "Kahneman and Tversky noticed that most people refuse a coin flip that loses 100 on tails unless heads wins about 200. Losses seem to weigh roughly twice as much as gains of the same size. They built this asymmetry into prospect theory in 1979.",
      "Loss aversion helps explain the endowment effect: in a famous experiment, students given a coffee mug demanded about twice as much to sell it as other students would pay to buy it. It may explain why people hold falling shares too long, why framing a charge as a lost discount works better than calling it a surcharge, and why change feels risky even when it is likely to help.",
      "Since about 2018 some researchers have argued that loss aversion is overstated: with small stakes, or when losses are not salient, the asymmetry can shrink or vanish. A 2024 meta analysis of hundreds of estimates still found losses weighted about twice as heavily on average, with wide variation. A fair label: real and important, but not a fixed law of nature."
    ],
    links: [
      { to: "psy.prospect-theory", type: "part-of", why: "Loss aversion is one of the three core features of prospect theory." },
      { to: "psy.asian-disease", type: "links-to", why: "Framing outcomes as lives lost rather than lives saved changes choices, partly because losses feel heavier." },
      { to: "psy.behavioural-economics", type: "links-to", why: "Loss aversion is one of behavioural economics' most widely applied ideas." }
    ],
    prompts: ["Is there something at home you would not buy today at its price, yet would not sell for that price either?"],
    recall: [ { q: "Roughly how much heavier do losses feel than gains?", a: "About twice as heavy on average, though it varies." }, { q: "What is the endowment effect?", a: "Valuing something more once you own it." } ]
  },
  {
    id: "psy.mindfulness", kind: "construct", title: "Mindfulness",
    line: "Paying attention to present experience on purpose, with curiosity rather than judgement.",
    facets: { field: ["clinical", "positive"], lens: ["cognitive", "biological"], era: ["modern", "replication"] },
    evidence: "moderate",
    evidenceNote: "Trials show small to moderate benefits for stress, anxiety and preventing depressive relapse; many studies are small and claims often outrun the data.",
    body: [
      "Mindfulness comes from Buddhist meditation, where sati means remembering to attend. In 1979 Jon Kabat Zinn adapted it into an eight week secular course for patients with chronic pain and stress at the University of Massachusetts. In the 1990s Zindel Segal, Mark Williams and John Teasdale combined it with cognitive therapy to create mindfulness based cognitive therapy, aimed at people who had recovered from repeated depression.",
      "The evidence is real but more modest than the publicity. Reviews of randomised trials find small to moderate improvements in anxiety, depression and pain, roughly comparable to other active treatments rather than superior to them. Mindfulness based cognitive therapy reduces the risk of relapse for people with several past episodes of depression. A large UK trial in schools, published in 2022, found that a mindfulness curriculum did no better than usual lessons for teenagers' wellbeing.",
      "Researchers have also warned against hype: definitions vary, many studies are small, and a minority of meditators report unpleasant experiences. Understood in its own terms, mindfulness is a skill of noticing thoughts as events in the mind, which links it closely to cognitive therapy and to ancient contemplative traditions."
    ],
    links: [
      { to: "psy.cbt", type: "links-to", why: "Mindfulness based cognitive therapy combines meditation with CBT to help people relate differently to thoughts." },
      { to: "psy.attention", type: "links-to", why: "Mindfulness practice is in large part training in where and how to place attention." },
      { to: "psy.flow", type: "contrasts", why: "Flow is absorption in which self awareness fades; mindfulness cultivates a gentle awareness of experience itself." },
      { to: "phil.buddha", type: "links-to", why: "Mindfulness is drawn directly from Buddhist meditation, though its secular form leaves much of that context behind." },
      { to: "phil.no-self", type: "links-to", why: "In Buddhist practice, watching thoughts come and go is meant to loosen the sense of a fixed self." }
    ],
    prompts: ["During an ordinary task today, such as washing up or folding laundry, notice how often your mind leaves and how it comes back."],
    recall: [ { q: "Who adapted mindfulness into a secular programme, and for whom?", a: "Jon Kabat Zinn, in 1979, for patients with chronic pain and stress." }, { q: "What does the evidence most clearly support?", a: "Small to moderate benefits for stress, anxiety and depression, and reduced relapse risk after repeated depression." } ],
    further: ["Daniel Goleman and Richard Davidson, Altered Traits (2017)", "Robert Wright, Why Buddhism Is True (2017)"]
  },
  {
    id: "psy.flow", kind: "construct", title: "Flow",
    line: "Total absorption in a task that stretches you just enough: time bends and self consciousness fades.",
    facets: { field: ["positive"], lens: ["humanistic", "cognitive"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.csikszentmihalyi"],
    evidence: "moderate",
    evidenceNote: "Well described across many activities and cultures with experience sampling; claims that flow causes better performance or happiness are less firmly tested.",
    quote: { text: "The best moments usually occur when a person's body or mind is stretched to its limits in a voluntary effort to accomplish something difficult and worthwhile.", source: "Mihaly Csikszentmihalyi, Flow: The Psychology of Optimal Experience (1990), chapter 1" },
    body: [
      "Csikszentmihalyi found that rock climbers, surgeons, chess players, dancers and factory workers described the same state: complete absorption, clear goals, immediate feedback, a sense of control, loss of self consciousness and an altered sense of time. He called it flow, after the word many of them used.",
      "Flow arises when challenge and skill are both high and roughly matched. Too much challenge brings anxiety; too little brings boredom or apathy. Using experience sampling, his team found that people reported flow more often at work than in leisure, yet still said they would rather be at leisure. Passive leisure, like television, rarely produced it.",
      "Flow is a descriptive construct with good support. Claims that it reliably causes better performance or long term happiness are harder to test, since flow is hard to induce on demand. As an idea it helps explain why demanding hobbies, craft and good work can be among the most satisfying parts of life."
    ],
    links: [
      { to: "psy.positive-psychology", type: "part-of", why: "Flow is one of the central constructs of positive psychology, often the E for engagement." },
      { to: "psy.self-determination", type: "links-to", why: "Flow fits self determination theory: activities that build competence, freely chosen, feel intrinsically rewarding." },
      { to: "psy.attention", type: "links-to", why: "Flow is attention fully captured by a task, leaving none for self monitoring." },
      { to: "phil.laozi", type: "links-to", why: "The Daoist ideal of wu wei, effortless action, describes something close to flow." }
    ],
    prompts: ["When did you last lose track of time doing something hard? What made the challenge feel just right?"],
    recall: [ { q: "When does flow arise?", a: "When challenge and skill are both high and well matched, with clear goals and immediate feedback." } ],
    further: ["Mihaly Csikszentmihalyi, Flow: The Psychology of Optimal Experience (1990)"]
  },
  {
    id: "psy.attachment", kind: "construct", title: "Attachment",
    line: "The bond that keeps a child close to a trusted carer, and the patterns it leaves for later relationships.",
    facets: { field: ["developmental", "social"], lens: ["evolutionary", "psychodynamic"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.bowlby", "psy.ainsworth"],
    evidence: "strong",
    evidenceNote: "That infants form attachment bonds and use carers as a secure base is very well supported; how strongly early patterns predict adult life is more modest.",
    body: [
      "John Bowlby argued that infants are born with a system that keeps them close to a protective adult, especially when frightened, tired or ill. The carer is a secure base from which to explore and a safe haven to return to. This was a break with the older view that babies love whoever feeds them; Harlow's monkeys helped make the case.",
      "From repeated experience, children are thought to form internal working models: expectations about whether others will respond and whether they themselves are worth responding to. Mary Ainsworth's Strange Situation sorted infants into secure, avoidant and resistant patterns, and a disorganised pattern was later added. In 1987 Cindy Hazan and Phillip Shaver extended the idea to adult romantic relationships.",
      "The core idea is one of developmental psychology's best supported. Long term predictions are more modest: attachment security in infancy shows moderate stability into adulthood, and later relationships and circumstances can change it. Security is not a grade on parenting; temperament, stress and culture all play parts, and the patterns describe relationships rather than fixed traits of a child."
    ],
    links: [
      { to: "psy.strange-situation", type: "links-to", why: "The Strange Situation is the standard way of measuring infant attachment." },
      { to: "psy.harlow-monkeys", type: "links-to", why: "Harlow's monkeys showed that comfort, not food, is the basis of the bond." },
      { to: "psy.psychosocial-stages", type: "links-to", why: "Erikson's first stage, trust versus mistrust, describes a similar foundation from a different tradition." }
    ],
    prompts: ["What did a secure base look like for you as a child, and what does it look like in your family now?"],
    recall: [ { q: "What are the secure base and the safe haven?", a: "The carer as a base from which to explore, and a place to return to when distressed." } ],
    further: ["John Bowlby, A Secure Base (1988)"]
  },
  {
    id: "psy.growth-mindset", kind: "construct", title: "Growth mindset",
    line: "Believing that ability can grow with effort and good strategy, rather than being fixed.",
    facets: { field: ["learning", "developmental"], lens: ["cognitive"], era: ["modern", "replication"] },
    people: ["psy.dweck"],
    evidence: "contested",
    evidenceNote: "Large studies and meta analyses find small average effects, larger for some struggling students; researchers disagree about how much they matter.",
    body: [
      "Carol Dweck found that children who believe intelligence is fixed tend to avoid challenges and give up after failure, while those who believe it can grow treat failure as information. In a 1998 study, children praised for being clever chose easier tasks afterwards than children praised for effort.",
      "The idea spread rapidly into schools and workplaces. Then larger tests arrived. Two meta analyses in 2018 found a weak link between mindset and achievement and very small average effects of mindset interventions. A national US study in 2019, with about twelve thousand teenagers, found a short online intervention modestly raised grades for lower achieving students in supportive schools. Critics argue that after correcting for weak studies the effects are close to zero; supporters reply that small, cheap effects can matter at scale and that effects depend on context.",
      "Dweck herself has warned against a false growth mindset that just praises effort or treats mindset as a slogan. A reasonable reading: beliefs about ability matter somewhat, but a poster on the wall is not a cure for anything."
    ],
    links: [
      { to: "psy.self-efficacy", type: "links-to", why: "Both concern beliefs about ability; self efficacy is about specific tasks, mindset about whether ability can change." },
      { to: "psy.learned-helplessness", type: "contrasts", why: "A fixed mindset after failure can resemble helplessness; a growth mindset treats failure as something to work on." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Mindset research shows how effects shrink when tested in larger, preregistered studies." }
    ],
    prompts: ["How do you praise effort and progress in the people around you, and how did others praise you growing up?"],
    recall: [ { q: "What did large studies find about mindset interventions?", a: "Small average effects, somewhat larger for lower achieving students in supportive contexts." } ],
    further: ["Carol Dweck, Mindset (2006)"]
  },
  {
    id: "psy.perception", kind: "construct", title: "Perception",
    line: "How the brain turns signals from the senses into an organised, meaningful world.",
    facets: { field: ["perception"], lens: ["cognitive", "biological"], era: ["founding", "modern"] },
    evidence: "strong",
    evidenceNote: "That perception is constructive, combining input with expectation, is supported by over a century of experiments on illusions, constancy and attention.",
    body: [
      "It feels as if we simply open our eyes and see. In fact the light reaching the retina is ambiguous: a small object nearby and a large object far away can cast the same image. The brain resolves this by using context and past experience. In the nineteenth century Hermann von Helmholtz called this unconscious inference.",
      "Illusions reveal the method. In one classic, two lines of equal length look different because of the arrowheads at their ends. Colour constancy lets us see a white shirt as white under yellow lamplight or blue shade, which is why the 2015 photograph of a dress split viewers into those who saw blue and black and those who saw white and gold: people made different assumptions about the lighting.",
      "Perception is also selective. We notice what we attend to and what we expect, and miss much of the rest. The modern view is that perception is an active best guess, constrained by the senses but built by the brain, which is why two people can honestly see the same scene differently."
    ],
    links: [
      { to: "psy.predictive-processing", type: "leads-to", why: "Predictive processing develops Helmholtz's unconscious inference into a general theory of the brain." },
      { to: "psy.invisible-gorilla", type: "links-to", why: "The invisible gorilla shows how much of a scene we fail to perceive when attention is elsewhere." },
      { to: "phil.kant", type: "links-to", why: "Kant argued that the mind structures experience, so we know things as they appear, not as they are in themselves." }
    ],
    prompts: ["Have you and someone close to you remembered the same event very differently? How much might have been perception rather than memory?"],
    recall: [ { q: "What did Helmholtz mean by unconscious inference?", a: "The brain automatically uses context and experience to interpret ambiguous sensory input." }, { q: "Why did people see the dress differently?", a: "They made different unconscious assumptions about the lighting." } ]
  },
  {
    id: "psy.memory", kind: "construct", title: "Memory",
    line: "Not a recording but a reconstruction: how we encode, store and rebuild the past.",
    facets: { field: ["cognitive", "learning"], lens: ["cognitive", "biological"], era: ["founding", "modern"] },
    people: ["psy.ebbinghaus", "psy.loftus"],
    evidence: "strong",
    evidenceNote: "Reconstructive memory, the testing effect and the spacing effect are among the best replicated findings in psychology.",
    body: [
      "Psychologists divide memory into kinds. Episodic memory holds events from your own life; semantic memory holds facts; procedural memory holds skills such as riding a bicycle. Working memory holds what you are thinking about right now. These systems can come apart, as the case of Henry Molaison dramatically showed.",
      "Memory is reconstructive. In 1932 Frederic Bartlett asked English students to retell a Native American folk tale and found they reshaped it to fit their own culture's expectations. Each time we recall something we rebuild it, and the rebuilt version can absorb new information, which is why confident memories can still be wrong.",
      "Two findings are especially useful. The spacing effect: study spread over time lasts longer than the same amount crammed. The testing effect: trying to recall something strengthens it more than rereading. Both run against intuition, because rereading feels fluent and cramming feels productive. This site's review feature is built on them."
    ],
    links: [
      { to: "psy.forgetting-curve", type: "links-to", why: "The forgetting curve was the first precise measurement of how memory fades." },
      { to: "psy.patient-hm", type: "links-to", why: "Henry Molaison's case showed that forming new long term memories depends on the hippocampus." },
      { to: "phil.personal-identity", type: "links-to", why: "Locke argued that memory makes us the same person over time; psychology shows how unstable that memory can be." }
    ],
    prompts: ["Pick a family story that gets retold. Has it changed over the years, and who changed it?"],
    recall: [ { q: "Name three kinds of long term memory.", a: "Episodic, semantic and procedural." }, { q: "What is the testing effect?", a: "Retrieving information strengthens memory more than rereading it." } ],
    further: ["Daniel Schacter, The Seven Sins of Memory (2001)", "Julia Shaw, The Memory Illusion (2016)"]
  },
  {
    id: "psy.working-memory", kind: "construct", title: "Working memory",
    line: "The small mental workspace that holds a few things in mind while you think with them.",
    facets: { field: ["cognitive"], lens: ["cognitive", "biological"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.miller"],
    evidence: "strong",
    evidenceNote: "Capacity limits are robust; claims that brain training games raise general intelligence by improving working memory have failed in large reviews.",
    body: [
      "Working memory is where you hold a phone number while dialling, keep track of a conversation, or juggle the steps of a recipe. George Miller suggested in 1956 that it holds about seven items; later work by Nelson Cowan put the true limit nearer four chunks, once rehearsal and grouping are controlled.",
      "In 1974 Alan Baddeley and Graham Hitch proposed a model with parts: a phonological loop for words and sounds, a visuospatial sketchpad for images and positions, and a central executive that directs attention. An episodic buffer was added in 2000. The model explains why you can listen to speech while picturing a route, but struggle to follow two conversations at once.",
      "Working memory capacity predicts performance in reading, maths and reasoning. That inspired commercial brain training. Large reviews found that people get better at the trained games but that the gains do not transfer to general intelligence or school achievement. The practical lesson is the reverse: reduce load by writing things down, chunking information and doing one thing at a time."
    ],
    links: [
      { to: "psy.memory", type: "part-of", why: "Working memory is the active front end of the memory system." },
      { to: "psy.attention", type: "links-to", why: "The central executive is essentially attention directing what working memory holds." },
      { to: "psy.dual-process", type: "links-to", why: "Slow, deliberate System 2 thinking depends heavily on working memory, which is why it tires." },
    ],
    prompts: ["Where in your day does working memory overflow, and what do you already do to offload it?"],
    recall: [ { q: "What are the parts of Baddeley and Hitch's model?", a: "Phonological loop, visuospatial sketchpad, central executive, and later an episodic buffer." }, { q: "Does brain training raise general intelligence?", a: "Large reviews found no reliable transfer beyond the trained tasks." } ],
    further: ["Alan Baddeley, Working Memory, Thought, and Action (2007)"]
  },
  {
    id: "psy.placebo", kind: "construct", title: "The placebo effect",
    line: "Improvement that comes from expectation and the context of care, not from the active treatment.",
    facets: { field: ["clinical", "biological"], lens: ["biological", "cognitive"], era: ["cognitive-revolution", "modern", "replication"] },
    evidence: "moderate",
    evidenceNote: "Placebo effects on pain, nausea and other subjective symptoms are real and partly understood; effects on objective disease are small or absent, and the size is often overstated.",
    body: [
      "In 1955 the anaesthetist Henry Beecher claimed that about a third of patients improve on placebo alone. That figure was overstated. Much apparent placebo response is regression to the mean (people often seek help at their worst and would improve anyway) and the natural course of illness. A 2001 review comparing placebo with no treatment found little evidence of powerful effects on objective outcomes, with possible exceptions such as pain.",
      "Yet placebo effects are real where they appear. Placebo pain relief can be partly blocked by naloxone, which blocks the body's own opioids, showing a biological pathway. Expectation shapes symptoms, and so does the warmth and attention of care. The reverse, the nocebo effect, is also real: being told about side effects can make people experience them.",
      "Most intriguing is open label placebo. In a 2010 trial, people with irritable bowel syndrome told plainly that they were taking sugar pills still reported more improvement than those given nothing. Studies since are encouraging but mostly small. The fair summary: placebo shows how mind and body interact in symptoms, without being a cure for disease."
    ],
    links: [
      { to: "psy.predictive-processing", type: "links-to", why: "Predictive processing explains placebo as expectations shaping how the brain interprets bodily signals." },
      { to: "psy.hawthorne", type: "links-to", why: "Both are effects of being studied or cared for, rather than of the intervention itself." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Overstated placebo figures show how statistical artefacts such as regression to the mean can masquerade as effects." },
      { to: "phil.mind-body", type: "links-to", why: "Placebo is a vivid everyday case of beliefs changing bodily experience, a puzzle for any theory of mind and body." }
    ],
    prompts: ["Have you noticed a headache easing as soon as you took a tablet, before it could have worked? What might be going on?"],
    recall: [ { q: "What is regression to the mean, and why does it matter for placebo?", a: "Extreme states tend to move back toward average; people seek help at their worst and would often improve anyway." }, { q: "What is an open label placebo?", a: "A placebo given while telling the patient honestly that it is inactive." } ],
    further: ["Ben Goldacre, Bad Science (2008)"]
  },
  {
    id: "psy.learned-helplessness", kind: "construct", title: "Learned helplessness",
    line: "Giving up after uncontrollable bad events; later research reversed the story of what is learned.",
    facets: { field: ["clinical", "learning"], lens: ["behavioural", "cognitive", "biological"], era: ["cognitive-revolution", "replication"] },
    people: ["psy.seligman"],
    evidence: "moderate",
    evidenceNote: "The behavioural effect is robust in animals and partly in humans, but in 2016 Maier and Seligman concluded that the original mechanism was backwards.",
    body: [
      "In 1967 Martin Seligman, Steven Maier and Bruce Overmier found that dogs given electric shocks they could not escape later failed to escape shocks they easily could, while dogs that had been able to stop the shocks learned to escape normally. The experiments were distressing for the animals and are ethically troubling today. They concluded that the dogs had learned that their actions did not matter.",
      "The idea became an influential model of depression, later refined to focus on explanatory style: people who explain bad events as permanent, pervasive and personal are more vulnerable. Similar giving up appeared in humans exposed to unsolvable problems or uncontrollable noise, though effects in humans are weaker and more variable.",
      "Fifty years on, Maier and Seligman revisited the neuroscience. In 2016 they argued that passivity is the brain's default, unlearned response to prolonged bad events. What is learned is control: when an animal discovers its actions matter, a region of the prefrontal cortex detects this and switches off the default. In short, what can be learned is hope, not helplessness."
    ],
    links: [
      { to: "psy.depression", type: "links-to", why: "Learned helplessness was one of the first experimental models of depression." },
      { to: "psy.operant-conditioning", type: "links-to", why: "The experiments grew out of conditioning research on how animals learn from consequences." },
      { to: "psy.self-efficacy", type: "contrasts", why: "Self efficacy is the belief that actions matter, the opposite of perceived helplessness." },
      { to: "phil.stoicism", type: "links-to", why: "The Stoics taught attention to what is in our control; this research studies what happens when control seems absent." }
    ],
    prompts: ["When a problem has felt impossible, what small sign that your actions mattered helped you start again?"],
    recall: [ { q: "What did Maier and Seligman conclude in 2016?", a: "Passivity is the default response to prolonged bad events; what is learned is control, which switches the default off." } ]
  }
  );

  /* -------------------------------------------------------- Constructs (2) */
  N.push(
  {
    id: "psy.self-efficacy", kind: "construct", title: "Self efficacy",
    line: "Your belief that you can carry out a particular task, which shapes whether you try and persist.",
    facets: { field: ["learning", "personality", "social"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.bandura"],
    evidence: "moderate",
    evidenceNote: "Self efficacy reliably predicts effort and performance; how much it causes performance, rather than reflecting it, is debated.",
    body: [
      "Albert Bandura introduced self efficacy in 1977: not general confidence, but belief in your capability for a specific task, such as giving a talk, managing a budget or calming a crying baby. Someone can have high self efficacy for cooking and low self efficacy for maths.",
      "Bandura named four sources. Mastery experiences, actually succeeding, are the strongest. Vicarious experience, seeing someone like you succeed, comes next. Verbal persuasion helps a little, and physical and emotional states matter: a racing heart can be read as dread or as readiness.",
      "People with higher self efficacy set harder goals, try longer and recover faster from setbacks, and self efficacy predicts outcomes in health, work and study. Some researchers argue that the relationship runs both ways and that overconfidence can reduce effort in the short term. The practical core holds up well: small, real successes build the belief that bigger ones are possible."
    ],
    links: [
      { to: "psy.social-learning", type: "part-of", why: "Self efficacy is a central concept in Bandura's social cognitive theory." },
      { to: "psy.self-determination", type: "links-to", why: "Self determination theory's need for competence is closely related to self efficacy." },
      { to: "psy.bobo-doll", type: "links-to", why: "Learning from models, shown in the Bobo doll study, is also one of the four sources of self efficacy." }
    ],
    prompts: ["What is one task you now handle confidently that once felt beyond you? Which of Bandura's four sources built that confidence?"],
    recall: [ { q: "What is the strongest source of self efficacy?", a: "Mastery experiences: actually succeeding at the task." } ]
  },
  {
    id: "psy.classical-conditioning", kind: "construct", title: "Classical conditioning",
    line: "Learning that one thing signals another, so the signal alone comes to trigger a response.",
    facets: { field: ["learning", "biological"], lens: ["behavioural", "biological"], era: ["founding", "early"] },
    people: ["psy.pavlov"],
    evidence: "strong",
    evidenceNote: "Demonstrated across species from sea slugs to humans, with well understood laws and neural mechanisms.",
    body: [
      "Food makes a dog salivate without any learning; that is an unconditioned response. Pavlov paired a neutral signal with food, and after repetitions the signal alone produced salivation, now a conditioned response. If the signal keeps appearing without food, the response fades, which is called extinction, though it can return later, which shows it was suppressed rather than erased.",
      "Later research refined the picture. In 1966 John Garcia showed that rats learn to avoid a taste after a single bout of sickness, even hours later, but do not readily link sickness to lights or sounds. Some associations are biologically prepared. Robert Rescorla showed that what matters is not mere pairing but prediction: the signal must tell the animal something it does not already know.",
      "Classical conditioning helps explain why the smell of a hospital can bring back anxiety, why advertisers pair products with pleasant music, and how phobias can form. Exposure therapy works partly by extinction: the feared cue is met repeatedly without the feared outcome."
    ],
    links: [
      { to: "psy.operant-conditioning", type: "contrasts", why: "Classical conditioning links two events; operant conditioning links an action to its consequences." },
      { to: "psy.little-albert", type: "links-to", why: "Little Albert was an attempt to show that fears in humans can be classically conditioned." },
      { to: "psy.anxiety", type: "links-to", why: "Conditioning helps explain how particular cues can come to trigger anxiety." },
      { to: "psy.predictive-processing", type: "links-to", why: "Rescorla's insight that conditioning is about prediction anticipates the predictive brain." }
    ],
    prompts: ["Is there a song, smell or place that instantly changes your mood? What was it paired with?"],
    recall: [ { q: "What is extinction in classical conditioning?", a: "The fading of a conditioned response when the signal repeatedly appears without the outcome." }, { q: "What did Garcia's taste aversion studies show?", a: "Some associations are learned in one trial and some pairings are learned far more readily than others." } ]
  },
  {
    id: "psy.operant-conditioning", kind: "construct", title: "Operant conditioning",
    line: "Learning from consequences: behaviour followed by reward becomes more likely, by punishment less.",
    facets: { field: ["learning"], lens: ["behavioural"], era: ["early", "cognitive-revolution"] },
    people: ["psy.skinner"],
    evidence: "strong",
    evidenceNote: "Among the most reliable findings in psychology, used daily in animal training, education and behaviour therapy.",
    body: [
      "Edward Thorndike put cats in puzzle boxes around 1898 and found that actions leading to escape were gradually stamped in. He called it the law of effect. B. F. Skinner made it precise. Reinforcement makes a behaviour more likely: positive reinforcement adds something good, negative reinforcement removes something unpleasant. Punishment makes it less likely.",
      "Skinner found that schedules matter. Reinforcing every response builds behaviour quickly but it fades quickly when rewards stop. Reinforcing unpredictably, on a variable schedule, produces steady, persistent behaviour that is very hard to extinguish. This is the logic of slot machines, and of apps that deliver likes and notifications at unpredictable moments.",
      "Operant principles work. They underlie shaping (rewarding steps toward a goal), much effective classroom management and parts of behaviour therapy. They are also easily misused, which is why this site avoids streaks and variable rewards."
    ],
    links: [
      { to: "psy.behaviourism", type: "part-of", why: "Operant conditioning was the central mechanism of Skinner's radical behaviourism." },
      { to: "psy.self-determination", type: "contrasts", why: "Self determination theory warns that external rewards can undermine the intrinsic motivation operant schedules ignore." },
      { to: "psy.social-learning", type: "leads-to", why: "Bandura extended operant ideas: we also learn from consequences we see happen to others." }
    ],
    prompts: ["Which of your phone apps rewards you unpredictably? What does that do to how often you check it?"],
    recall: [ { q: "What is the difference between negative reinforcement and punishment?", a: "Negative reinforcement removes something unpleasant to make behaviour more likely; punishment makes behaviour less likely." }, { q: "Which schedule produces the most persistent behaviour?", a: "A variable schedule, where rewards come unpredictably." } ]
  },
  {
    id: "psy.conformity", kind: "construct", title: "Conformity",
    line: "Changing what we say, do or even believe to match the people around us.",
    facets: { field: ["social"], lens: ["sociocultural", "cognitive"], era: ["early", "cognitive-revolution"] },
    evidence: "strong",
    evidenceNote: "Conformity pressures replicate widely, though their strength varies with culture, era, group size and whether anyone dissents.",
    body: [
      "In 1935 Muzafer Sherif showed people a dot of light in a dark room. Because of a visual illusion it seems to move, and individuals gave very different estimates of how far. In groups, estimates converged on a shared norm that persisted when people were later tested alone. When reality is uncertain, others are information.",
      "Solomon Asch then asked what happens when reality is clear. In his line studies of the 1950s, people sometimes gave obviously wrong answers to match a unanimous group. Researchers distinguish informational influence, accepting others' views as evidence, from normative influence, going along to fit in.",
      "Conformity is not simply a weakness. Following others is often sensible, and social norms make cooperation possible. Serge Moscovici showed that a consistent minority can shift a majority over time. Conformity is strongest when a group is unanimous, important to us and judging something ambiguous, and a single ally sharply reduces it."
    ],
    links: [
      { to: "psy.asch", type: "links-to", why: "Asch's line experiments are the classic demonstration of normative conformity." },
      { to: "psy.milgram", type: "contrasts", why: "Conformity follows peers; obedience follows an authority's commands." },
      { to: "psy.bystander", type: "links-to", why: "In emergencies, people look to others' calm as a cue, a form of informational conformity." },
      { to: "psy.sociocultural", type: "links-to", why: "How much people conform, and how it is valued, differs across cultures." }
    ],
    prompts: ["In a meeting or family discussion, have you held back a view because everyone else seemed to agree? What would one ally have changed?"],
    recall: [ { q: "What is the difference between informational and normative influence?", a: "Informational: accepting others as evidence of what is right. Normative: going along to be accepted." } ]
  },
  {
    id: "psy.attribution-error", kind: "construct", title: "The fundamental attribution error",
    line: "Explaining others' behaviour by their character while underrating the pressure of their situation.",
    facets: { field: ["social"], lens: ["cognitive", "sociocultural"], era: ["cognitive-revolution", "modern"] },
    evidence: "moderate",
    evidenceNote: "Robust in many Western lab studies, but weaker in some cultures, and related claims such as the actor observer difference proved small.",
    body: [
      "In 1967 Edward Jones and Victor Harris had students read essays praising or criticising Fidel Castro. Even when told the writers had been assigned their side, readers still judged that the pro Castro writers liked Castro. Lee Ross named the tendency the fundamental attribution error in 1977: we see behaviour and infer character, neglecting the situation.",
      "The bias helps explain why we judge the driver who cuts us off as rude while excusing ourselves as late. Situations like Milgram's laboratory show how powerfully circumstances drive behaviour that observers attribute to personality.",
      "The error is not universal. Studies comparing American and Chinese newspaper accounts of the same crimes found the American reports emphasised the individual's traits and the Chinese reports the circumstances. A related idea, that we explain our own behaviour by situations and others' by character, turned out in a 2006 meta analysis to be much weaker than assumed."
    ],
    links: [
      { to: "psy.milgram", type: "links-to", why: "Milgram showed how situations can drive behaviour that observers would attribute to character." },
      { to: "psy.stanford-prison", type: "links-to", why: "The Stanford Prison Experiment was presented as proof of situational power, though its methods are now heavily criticised." },
      { to: "phil.virtue-ethics", type: "links-to", why: "Philosophers including Gilbert Harman and John Doris used this research to question whether stable virtues of character exist." }
    ],
    prompts: ["Think of the last time someone at work or home annoyed you. What situation might they have been in that you could not see?"],
    recall: [ { q: "What did the Castro essay study show?", a: "Readers attributed views to essay writers even when told the writers had no choice of side." } ]
  },
  {
    id: "psy.priming", kind: "construct", title: "Priming",
    line: "Exposure to one thing changes how we respond to the next; solid for words, shaky for behaviour.",
    facets: { field: ["cognitive", "social"], lens: ["cognitive"], era: ["cognitive-revolution", "replication"] },
    evidence: "mixed",
    evidenceNote: "Semantic priming is very robust; many famous behavioural priming effects failed to replicate.",
    body: [
      "Semantic priming is one of the most reliable effects in psychology. In the early 1970s David Meyer and Roger Schvaneveldt found that people recognise the word nurse faster just after seeing doctor than after seeing an unrelated word. Related ideas are linked in memory, and activating one partly activates its neighbours.",
      "From the 1990s some social psychologists claimed much bigger effects: that reading words about old age made people walk more slowly down a corridor, or that images of money made people more selfish. These findings were vivid and popular, and Kahneman featured several in Thinking, Fast and Slow.",
      "When independent teams tried to repeat them, many failed. A 2012 study found that the slow walking effect appeared only when experimenters expected it. Money priming effects did not hold up in large replications. Kahneman wrote an open letter that year warning of a train wreck looming and later acknowledged he had relied on underpowered studies. Priming is a clear case where one word covers both a solid finding and a crumbled one."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "Behavioural priming became an emblem of the replication crisis." },
      { to: "psy.memory", type: "links-to", why: "Semantic priming reflects how ideas are linked in memory." },
      { to: "psy.ego-depletion", type: "links-to", why: "Both were celebrated, widely taught findings that large replications failed to support." },
      { to: "psy.dual-process", type: "links-to", why: "Priming was presented as evidence for an automatic System 1 shaping behaviour outside awareness." }
    ],
    prompts: ["Why do you think the behavioural priming studies were so easy to believe? What made them feel true?"],
    recall: [ { q: "Which kind of priming is robust?", a: "Semantic priming, such as faster recognition of nurse after doctor." }, { q: "What happened to the slow walking study?", a: "Replications failed; one found the effect only when experimenters expected it." } ]
  },
  {
    id: "psy.stereotype-threat", kind: "construct", title: "Stereotype threat",
    line: "The idea that worry about confirming a negative stereotype can itself drag down performance.",
    facets: { field: ["social"], lens: ["sociocultural", "cognitive"], era: ["modern", "replication"] },
    evidence: "mixed",
    evidenceNote: "Hundreds of lab studies report it, but large preregistered replications found small or null effects and meta analyses show signs of publication bias.",
    body: [
      "In 1995 Claude Steele and Joshua Aronson found that Black students at Stanford did worse on a hard verbal test when it was described as a test of ability than when it was described as a laboratory exercise. They proposed that the fear of confirming a stereotype adds pressure and distraction. The idea was extended to women in maths, older adults and memory, and many other groups.",
      "The idea mattered because it suggested that some measured group differences reflect testing situations rather than ability, and it shaped educational policy. But when the claims were tested more rigorously the picture blurred. A large preregistered study in 2018 with over two thousand Dutch secondary school students found no effect of stereotype threat on girls' maths performance. Meta analyses suggest that the published literature overstates the effect because null results went unpublished.",
      "The underlying concern, that people under evaluative pressure from stereotypes may perform below their ability, remains plausible. The size and reliability of the laboratory effect is now uncertain."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "Stereotype threat is one of several prominent effects reassessed during the replication crisis." },
      { to: "psy.anxiety", type: "links-to", why: "The proposed mechanism is evaluative anxiety taking up mental resources." },
      { to: "psy.working-memory", type: "links-to", why: "One explanation was that worry consumes working memory needed for the task." }
    ],
    prompts: ["Have you ever felt watched as a representative of a group rather than as yourself? Did it change how you performed?"],
    recall: [ { q: "What did the 2018 Dutch replication find?", a: "No effect of stereotype threat on girls' maths performance." } ]
  },
  {
    id: "psy.emotion", kind: "construct", title: "Emotion",
    line: "Fast, whole body responses that tell us what matters and ready us to act.",
    facets: { field: ["biological", "social", "clinical"], lens: ["biological", "cognitive", "evolutionary"], era: ["founding", "modern"] },
    evidence: "moderate",
    evidenceNote: "Emotions' effects on attention, memory and choice are well supported; whether a few basic emotions are universal is actively debated.",
    body: [
      "Emotions combine feeling, bodily change, expression and readiness to act. Fear sharpens attention and readies the body to flee; sadness slows us and draws care from others; anger mobilises us against obstacles. Charles Darwin wrote about emotional expression in animals and humans in 1872.",
      "Paul Ekman argued from the 1960s that a small set of basic emotions, such as happiness, sadness, fear, anger, disgust and surprise, have universal facial expressions. Lisa Feldman Barrett and others challenge this, arguing that emotions are constructed by the brain from bodily sensations and learned concepts, and that recognition of expressions varies more across cultures than the classic studies suggested. The debate is live and productive.",
      "Appraisal theories, associated with Richard Lazarus, stress that how we interpret a situation shapes the emotion we feel, the same insight behind cognitive therapy. Emotion regulation research finds that reappraising a situation often works better in the long run than suppressing feelings."
    ],
    links: [
      { to: "psy.james-lange", type: "links-to", why: "The James Lange theory proposed that emotion is the feeling of bodily change." },
      { to: "psy.anxiety", type: "links-to", why: "Anxiety is an emotion of anticipation that can become a problem when persistent." },
      { to: "psy.cbt", type: "links-to", why: "CBT builds on appraisal: changing interpretation changes emotion." }
    ],
    prompts: ["Notice the next strong feeling you have. What was the body doing, and what were you telling yourself about the situation?"],
    recall: [ { q: "What is the main disagreement between basic emotion and constructed emotion theories?", a: "Whether a few emotions are universal and hardwired, or built by the brain from bodily states and learned concepts." } ],
    further: ["Lisa Feldman Barrett, How Emotions Are Made (2017)"]
  },
  {
    id: "psy.attention", kind: "construct", title: "Attention",
    line: "The spotlight of the mind: selecting a little from the flood of information and ignoring the rest.",
    facets: { field: ["cognitive", "perception"], lens: ["cognitive", "biological"], era: ["founding", "cognitive-revolution", "modern"] },
    evidence: "strong",
    evidenceNote: "Selective attention, inattentional blindness and the costs of switching tasks are robustly replicated.",
    body: [
      "William James wrote that everyone knows what attention is: the mind taking possession of one out of several possible trains of thought. In 1953 Colin Cherry studied the cocktail party problem: how we follow one voice among many, yet still notice our own name spoken across the room.",
      "Donald Broadbent proposed in 1958 that attention filters information early; Anne Treisman showed the filter is leaky, letting meaningful information through in weakened form. Later work showed how much we miss when attention is engaged elsewhere, from a gorilla walking through a ball game to large changes in a scene between glances.",
      "Multitasking research is consistent: what feels like doing two things at once is usually switching rapidly between them, and every switch has a cost in time and errors. Attention is limited, trainable to a degree, and pulled hard by novelty, which is why the design of phones and apps matters so much for it."
    ],
    links: [
      { to: "psy.invisible-gorilla", type: "links-to", why: "The invisible gorilla is the vivid demonstration of inattentional blindness." },
      { to: "psy.stroop", type: "links-to", why: "The Stroop effect shows attention struggling against an automatic process, reading." },
      { to: "psy.perception", type: "links-to", why: "Attention selects what perception fully processes." }
    ],
    prompts: ["What pulls your attention most often when you are trying to focus? Is it inside you or outside?"],
    recall: [ { q: "What is the cocktail party effect?", a: "Following one conversation among many while still noticing important information, such as your name, from others." } ]
  },
  {
    id: "psy.zpd", kind: "construct", title: "Zone of proximal development",
    line: "The gap between what a learner can do alone and what they can do with skilled help.",
    facets: { field: ["developmental", "learning"], lens: ["sociocultural"], era: ["early", "modern"] },
    people: ["psy.vygotsky"],
    evidence: "moderate",
    evidenceNote: "Influential and supported by research on guided learning and scaffolding, though hard to measure precisely as a single zone.",
    body: [
      "Vygotsky argued that testing what a child can do alone measures only yesterday's development. More revealing is what the child can do with guidance: the zone of proximal development. Learning that targets this zone pulls development forward.",
      "In 1976 David Wood, Jerome Bruner and Gail Ross introduced the word scaffolding for the support a skilled helper gives: simplifying the task, keeping attention on the goal, marking critical features, and withdrawing help as competence grows. Good scaffolding is temporary by design.",
      "The idea fits the evidence on tutoring and guided practice, and resembles flow's matching of challenge to skill. It is harder to measure as a precise zone, and critics note it can be used loosely. As a lens it is useful for any adult helping a child, colleague or friend learn: neither do it for them nor leave them alone with it."
    ],
    links: [
      { to: "psy.sociocultural", type: "part-of", why: "The zone of proximal development is the central idea of Vygotsky's sociocultural theory of learning." },
      { to: "psy.cognitive-development", type: "contrasts", why: "Piaget emphasised readiness unfolding from within; Vygotsky emphasised learning leading development with help." },
      { to: "psy.flow", type: "links-to", why: "Both locate the best learning just beyond current ability." }
    ],
    prompts: ["When you help someone learn something, how do you judge when to step in and when to step back?"],
    recall: [ { q: "What is scaffolding?", a: "Temporary support from a skilled helper, withdrawn as the learner becomes competent." } ],
    further: ["Lev Vygotsky, Mind in Society (1978)"]
  },
  {
    id: "psy.theory-of-mind", kind: "construct", title: "Theory of mind",
    line: "Understanding that other people have beliefs, desires and knowledge that differ from your own.",
    facets: { field: ["developmental", "social", "cognitive"], lens: ["cognitive", "evolutionary"], era: ["modern", "replication"] },
    evidence: "moderate",
    evidenceNote: "Explicit false belief understanding around age four is robust across cultures; claims of earlier implicit understanding in infants have replicated inconsistently.",
    body: [
      "The term came from a 1978 paper asking whether chimpanzees understand others' minds. In 1983 Heinz Wimmer and Josef Perner devised the false belief test: a character puts an object in one place and leaves; it is moved; where will the character look? Most three year olds say the new location, where it really is. Most children of four or five correctly say the old one, where the character believes it is.",
      "A large 2001 meta analysis found this shift around age four in many countries, though its timing varies with language and family conversation. Children with siblings and parents who talk about thoughts and feelings tend to pass earlier.",
      "In 2005 researchers reported that infants of fifteen months looked longer when a character searched in the wrong place, suggesting an implicit grasp of false belief. Later replication attempts gave mixed results, and the question of how early theory of mind begins is open. In adults, theory of mind is fallible: we routinely assume others know what we know."
    ],
    links: [
      { to: "psy.cognitive-development", type: "links-to", why: "Theory of mind research challenged and extended Piaget's account of how children's thinking develops." },
      { to: "psy.attribution-error", type: "links-to", why: "Even adults misjudge other minds, often by neglecting what others know and face." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Infant false belief findings are a developmental example of uneven replication." }
    ],
    prompts: ["When did you last realise someone simply did not know something you assumed they knew? How did that change the conversation?"],
    recall: [ { q: "What does a false belief test ask?", a: "Where a person will look for an object that was moved without their knowledge, testing whether the child separates belief from reality." } ]
  },
  {
    id: "psy.defence-mechanisms", kind: "construct", title: "Defence mechanisms",
    line: "Unconscious ways the mind protects itself from painful truths: denial, projection, rationalising.",
    facets: { field: ["clinical", "personality"], lens: ["psychodynamic", "cognitive"], era: ["early", "modern"] },
    people: ["psy.freud"],
    evidence: "mixed",
    evidenceNote: "Social psychology supports some defences, such as denial and reaction formation, in modified form; others, such as sublimation, have little support.",
    body: [
      "Freud described repression, keeping painful material out of awareness, and his daughter Anna Freud catalogued many more in 1936: denial, projection (seeing one's own unwanted traits in others), reaction formation (showing the opposite of what one feels), displacement, rationalisation and sublimation (turning impulses into socially valued activity).",
      "In 1998 Roy Baumeister and colleagues asked whether modern social psychology supported these ideas. They found reasonable evidence for several, such as denial, reaction formation and isolating threatening thoughts, generally serving to protect self esteem rather than to manage sexual or aggressive drives. Evidence for displacement and sublimation was weak.",
      "George Vaillant's long study of Harvard men ranked defences from immature to mature, with humour, anticipation and altruism among the mature, and linked mature defences to better adjustment in later life. Repression of traumatic memories remains controversial and is challenged by memory research."
    ],
    links: [
      { to: "psy.psychoanalysis", type: "part-of", why: "Defence mechanisms are a core psychoanalytic concept." },
      { to: "psy.cognitive-dissonance", type: "links-to", why: "Rationalisation looks very like dissonance reduction, described in a different vocabulary." },
      { to: "psy.misinformation", type: "contrasts", why: "Memory research challenges claims that traumatic memories are repressed and later recovered intact." },
      { to: "eng.from-ideas", type: "links-to", why: "Being in denial, projecting and rationalising are psychoanalytic terms that became ordinary speech." }
    ],
    prompts: ["Which defence do you catch yourself using most, perhaps humour or rationalising? Is it serving you well?"],
    recall: [ { q: "What is reaction formation?", a: "Showing the opposite of what one feels, such as excessive friendliness toward someone resented." } ]
  },
  {
    id: "psy.introversion", kind: "construct", title: "Introversion and extraversion",
    line: "Where you sit on the scale from seeking stimulation and company to preferring quiet and depth.",
    facets: { field: ["personality", "biological"], lens: ["biological", "psychodynamic"], era: ["early", "modern"] },
    people: ["psy.jung"],
    evidence: "strong",
    evidenceNote: "Extraversion is one of the most robust personality dimensions; type based tests that sort people into two boxes have poor reliability.",
    body: [
      "Carl Jung introduced introversion and extraversion in 1921 as orientations of psychic energy, inward toward ideas or outward toward people and things. Hans Eysenck later proposed a biological basis: introverts are more easily aroused and so prefer less stimulation.",
      "In modern trait psychology extraversion is a dimension, not a type. Most people are near the middle. Extraverts tend to be more sociable, talkative, assertive and responsive to rewards, and report more positive emotion on average. Introversion is not shyness: shyness involves anxiety about social judgement, while many introverts are socially confident and simply prefer depth to breadth.",
      "Popular tests that sort people into introvert or extravert types, such as the MBTI built on Jung's ideas, are poor measures: many people get a different type when retested weeks later. Measured as a continuous trait, extraversion predicts social behaviour and wellbeing modestly and consistently."
    ],
    links: [
      { to: "psy.big-five", type: "part-of", why: "Extraversion is one of the five broad dimensions of personality." },
      { to: "psy.flow", type: "links-to", why: "People across the range find flow, though often in different activities." },
      { to: "eng.from-ideas", type: "links-to", why: "Introvert and extravert came into English through Jung's psychology." }
    ],
    prompts: ["After a busy family gathering, do you feel charged or drained? What does that suggest about where you sit on the scale?"],
    recall: [ { q: "Is introversion the same as shyness?", a: "No. Shyness involves social anxiety; introversion is a preference for less stimulation." } ],
    further: ["Susan Cain, Quiet (2012)"]
  },
  {
    id: "psy.depression", kind: "construct", title: "Depression",
    line: "A common, treatable condition of persistent low mood and loss of interest, with many interacting causes.",
    facets: { field: ["clinical", "biological"], lens: ["biological", "cognitive", "sociocultural"], era: ["modern", "replication"] },
    evidence: "strong",
    evidenceNote: "That depression is real, common and treatable is well established; simple single cause stories such as a chemical imbalance are not supported.",
    body: [
      "Clinical depression is more than sadness. It involves persistent low mood or loss of interest, usually with changes in sleep, appetite, energy, concentration and self worth, lasting at least two weeks and affecting daily life. It is one of the most common health conditions worldwide. This node explains the science; it is not a way to assess anyone.",
      "Causes interact: genes, stressful life events, loss, loneliness, physical illness, patterns of thinking such as rumination, and features of the social world. Aaron Beck described a cognitive triad of negative views about self, world and future. The popular idea that depression is simply low serotonin is not supported by current evidence, although antidepressant medicines show modest benefits on average.",
      "Psychological therapies such as CBT and behavioural activation have good evidence, as do medicines, and the best choice differs between people. Depression is a field where honest science says much is known and much is still uncertain. Anyone affected deserves care from a qualified professional, not a label from a website."
    ],
    links: [
      { to: "psy.cbt", type: "links-to", why: "CBT was developed largely through Beck's work on depression." },
      { to: "psy.anxiety", type: "links-to", why: "Depression and anxiety often occur together and share some causes." },
      { to: "psy.mindfulness", type: "links-to", why: "Mindfulness based cognitive therapy reduces relapse risk after repeated depression." }
    ],
    prompts: ["How has public talk about depression changed in your lifetime, and what difference has that made to how people speak about it?"],
    recall: [ { q: "Is the simple low serotonin explanation of depression supported?", a: "No; depression is understood as arising from many interacting biological, psychological and social factors." } ],
    further: ["Andrew Solomon, The Noonday Demon (2001)"]
  },
  {
    id: "psy.anxiety", kind: "construct", title: "Anxiety",
    line: "The mind's alarm for future threat: useful in measure, a burden when it will not switch off.",
    facets: { field: ["clinical", "biological"], lens: ["biological", "cognitive", "evolutionary"], era: ["modern"] },
    evidence: "strong",
    evidenceNote: "The biology and psychology of fear and anxiety are well studied, and treatments for anxiety disorders have good evidence.",
    body: [
      "Fear responds to a present threat; anxiety anticipates a possible one. Both prepare body and mind: the heart quickens, attention narrows toward danger, and we become ready to act. In moderate amounts anxiety improves performance and keeps us safe. It is an emotion, not a fault.",
      "Anxiety disorders are diagnosed when anxiety is persistent, out of proportion and interferes with life. They are among the most common mental health conditions. Research points to a mix of temperament, learning (including conditioning), patterns of thinking such as overestimating threat and underestimating coping, and avoidance, which brings short term relief but keeps fears alive by preventing new learning.",
      "Treatments with good evidence include CBT, especially exposure, and some medicines. Some research suggests that viewing a racing heart as the body getting ready, rather than as danger, can help under pressure, though these reappraisal studies are mostly small. Again, this is science, not advice: persistent worry is worth talking through with a doctor or someone trusted."
    ],
    links: [
      { to: "psy.cbt", type: "links-to", why: "CBT, and exposure in particular, is a well tested treatment for anxiety disorders." },
      { to: "psy.mindfulness", type: "links-to", why: "Mindfulness programmes show modest effects on anxiety in trials." },
      { to: "phil.existentialism", type: "links-to", why: "Kierkegaard wrote of anxiety as the dizziness of freedom, an existential rather than clinical sense of the word." }
    ],
    prompts: ["When does a little anxiety help you, perhaps before a presentation or a family event, and when does it stop helping?"],
    recall: [ { q: "How does avoidance keep anxiety going?", a: "It brings relief but prevents learning that the feared thing is manageable." } ],
    further: ["Scott Stossel, My Age of Anxiety (2014)"]
  }
  );

  /* ---------------------------------------------------------------- Theories */
  N.push(
  {
    id: "psy.dual-process", kind: "theory", title: "Dual process theory",
    line: "Two modes of thought: fast, automatic intuition and slow, effortful reasoning.",
    facets: { field: ["cognitive", "behavioural-economics"], lens: ["cognitive"], era: ["modern"] },
    people: ["psy.kahneman"],
    evidence: "moderate",
    evidenceNote: "Differences between fast intuitive and slow deliberate thinking are well documented; whether they form two distinct systems is debated.",
    body: [
      "Try this: a bat and a ball cost 1.10 in total, and the bat costs 1.00 more than the ball. How much is the ball? Most people's first answer is 10 cents. The right answer is 5 cents. The quick answer arrives unbidden; checking it takes effort. Shane Frederick used such puzzles in 2005 to measure the tendency to override a first intuition.",
      "Dual process theories describe two kinds of thinking. Keith Stanovich and Richard West called them System 1 and System 2 in 2000, and Kahneman made the terms famous. System 1 is fast, automatic, associative and effortless; it reads faces, completes familiar phrases and drives on an empty road. System 2 is slow, deliberate, effortful and limited by working memory; it does long division and checks System 1's suggestions, when it bothers.",
      "Critics argue that the two system picture is too neat: processes vary continuously in speed and effort, and intuition can be highly skilled, as in an experienced nurse or chess player. Kahneman himself described the systems as useful fictions, characters in a story about the mind rather than places in the brain. Used that way, the framework is a helpful guide to when to slow down."
    ],
    links: [
      { to: "psy.cognitive-revolution", type: "links-to", why: "Dual process theory grew from cognitive psychology's study of automatic and controlled processing." },
      { to: "psy.stroop", type: "links-to", why: "The Stroop effect is a classic clash between an automatic process and a controlled one." },
      { to: "phil.plato", type: "links-to", why: "Plato pictured the soul as a charioteer of reason steering spirited and appetitive horses, an ancient two systems image." }
    ],
    prompts: ["Where in your week do you rely on fast judgement that has earned your trust, and where should you slow down?"],
    recall: [ { q: "What is the answer to the bat and ball problem, and why do people get it wrong?", a: "5 cents; the intuitive answer of 10 cents comes quickly and most people do not check it." } ],
    further: ["Daniel Kahneman, Thinking, Fast and Slow (2011)"]
  },
  {
    id: "psy.self-determination", kind: "theory", title: "Self determination theory",
    line: "Motivation thrives when three needs are met: autonomy, competence and relatedness.",
    facets: { field: ["positive", "social", "learning"], lens: ["humanistic", "cognitive"], era: ["modern"] },
    evidence: "moderate",
    evidenceNote: "Supported by a large body of research across cultures; some findings, such as rewards undermining motivation, depend heavily on conditions.",
    body: [
      "Edward Deci and Richard Ryan developed self determination theory from the 1970s. Its central claim is that people have three basic psychological needs: autonomy (acting from one's own will), competence (feeling effective) and relatedness (feeling connected to others). When these are supported, motivation becomes more intrinsic and wellbeing rises; when they are thwarted, motivation becomes pressured or collapses.",
      "A famous early finding was the overjustification effect. In a 1973 study, nursery children who had been promised a reward for drawing later drew less in free time than children who had not. A 1999 meta analysis found that expected, tangible rewards for interesting tasks tend to reduce intrinsic motivation, while unexpected rewards and informative praise do not. Some researchers dispute how general the effect is.",
      "The theory distinguishes kinds of extrinsic motivation, from doing something to avoid guilt to doing it because one values it. It has been applied in schools, healthcare, workplaces and parenting, and it offers a clear alternative to managing people purely through incentives."
    ],
    links: [
      { to: "psy.hierarchy-of-needs", type: "contrasts", why: "Both name basic needs, but self determination theory makes no claim of a fixed order and is far better tested." },
      { to: "psy.humanistic", type: "responds-to", why: "It gives humanistic ideas about growth and autonomy a rigorous experimental footing." },
      { to: "psy.positive-psychology", type: "links-to", why: "Self determination theory is one of the most empirically grounded frameworks for wellbeing." }
    ],
    prompts: ["Which of the three needs, autonomy, competence or relatedness, is best met in your week right now, and which least?"],
    recall: [ { q: "What are the three needs in self determination theory?", a: "Autonomy, competence and relatedness." }, { q: "What is the overjustification effect?", a: "Expected tangible rewards for an interesting task can reduce intrinsic motivation to do it." } ],
    further: ["Edward Deci, Why We Do What We Do (1995)"]
  },
  {
    id: "psy.prospect-theory", kind: "theory", title: "Prospect theory",
    line: "How people really choose under risk: from a reference point, hating losses, misweighting odds.",
    facets: { field: ["behavioural-economics", "cognitive"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.kahneman", "psy.tversky"],
    evidence: "strong",
    evidenceNote: "Its core patterns replicated in a 2020 study across 19 countries and underpin much of behavioural economics.",
    body: [
      "Expected utility theory, the standard economic model, says rational people weigh outcomes by their probabilities and choose the best total. In 1979 Kahneman and Tversky published prospect theory, a description of how people actually choose, and it became one of the most cited papers in economics.",
      "It has three main features. Reference dependence: outcomes are judged as gains or losses from a starting point, not as final wealth. Loss aversion: losses hurt more than equal gains please. Diminishing sensitivity: the difference between 0 and 100 feels bigger than between 1,000 and 1,100. It also says people overweight small probabilities, which helps explain why the same person buys lottery tickets and insurance.",
      "Together these produce a fourfold pattern: people take risks to avoid sure losses and avoid risks to lock in sure gains, except when probabilities are tiny. A large 2020 replication in 19 countries found the classic patterns held up very well, making this one of the sturdier foundations in the psychology of decision."
    ],
    links: [
      { to: "psy.heuristics", type: "links-to", why: "Prospect theory and the heuristics programme are the two pillars of Kahneman and Tversky's work." },
      { to: "psy.asian-disease", type: "links-to", why: "The framing problem tests prospect theory's prediction that gains and losses are treated differently." },
      { to: "psy.dual-process", type: "links-to", why: "Kahneman later described the biases prospect theory captures as typical of fast, intuitive thinking." }
    ],
    prompts: ["Why might the same person buy both a lottery ticket and travel insurance? Which feature of prospect theory explains each?"],
    recall: [ { q: "Name the three main features of prospect theory.", a: "Reference dependence, loss aversion and diminishing sensitivity, plus overweighting of small probabilities." } ]
  },
  {
    id: "psy.hierarchy-of-needs", kind: "theory", title: "Maslow's hierarchy of needs",
    line: "Needs from food and safety up to self actualisation; famous, intuitive and weakly supported as a ladder.",
    facets: { field: ["personality", "positive"], lens: ["humanistic"], era: ["early", "cognitive-revolution"] },
    people: ["psy.maslow"],
    evidence: "weak",
    evidenceNote: "Research finds the needs real and widely shared but not satisfied in a fixed order; the pyramid diagram was not Maslow's own.",
    body: [
      "In 1943 Abraham Maslow proposed that human needs form a hierarchy: physiological needs, then safety, then love and belonging, then esteem, then self actualisation, becoming all one can be. Broadly, lower needs had to be reasonably met before higher ones gained force. He described it as flexible, with many exceptions.",
      "The famous pyramid was drawn later by management writers, not by Maslow, and it made the theory look more rigid than he intended. Tests from the 1970s found little support for a strict order. A 2011 study of over sixty thousand people in 123 countries found that the needs Maslow named are linked to wellbeing almost everywhere, but that people gain from relationships and respect even when basic needs are unmet. Many families living in hardship find deep meaning in love and duty.",
      "The hierarchy survives because it is a memorable first map of human motivation. As science it is a starting point that later theories, such as self determination theory, have replaced."
    ],
    links: [
      { to: "psy.positive-psychology", type: "leads-to", why: "Maslow's interest in healthy, fulfilled people prefigured positive psychology." },
      { to: "psy.flow", type: "links-to", why: "Maslow's peak experiences resemble the absorbed states later studied as flow." },
      { to: "psy.reproducibility-project", type: "links-to", why: "The pyramid is a reminder that a theory can become famous without ever being well tested." }
    ],
    prompts: ["Have you seen people find meaning and connection even when basic security was missing? What does that say about the ladder?"],
    recall: [ { q: "Did Maslow draw the pyramid?", a: "No; it was popularised later by management writers." }, { q: "What did the 2011 study across 123 countries find?", a: "The needs matter almost everywhere, but they are not satisfied in a strict order." } ]
  },
  {
    id: "psy.cognitive-development", kind: "theory", title: "Piaget's stages of development",
    line: "Children build understanding in stages, from sensing and acting to abstract reasoning.",
    facets: { field: ["developmental"], lens: ["cognitive"], era: ["early", "cognitive-revolution"] },
    people: ["psy.piaget"],
    evidence: "mixed",
    evidenceNote: "The broad sequence holds up, but children show many abilities earlier than Piaget's tasks suggested, and stages are less sharp than he proposed.",
    body: [
      "Piaget described four stages. In the sensorimotor stage, from birth to about two, infants learn through action and come to understand that objects exist when hidden, called object permanence. In the preoperational stage, to about seven, children use symbols and language but reason from appearances. In the concrete operational stage they reason logically about real things, and from about eleven or twelve, in the formal operational stage, about abstract possibilities.",
      "His conservation tasks became famous: pour water from a short wide glass into a tall thin one and a young child says there is now more. Children are not passive receivers; they assimilate experience into existing schemes and accommodate when schemes fail.",
      "Later research found that his tasks underestimated young children. When questions were made more natural, or when looking time was measured in infants, competence appeared earlier. Formal operational thinking turned out not to be universal, even in adults. Piaget's grand stages are now seen as too neat, but his view of children as active builders of knowledge reshaped education."
    ],
    links: [
      { to: "psy.psychosocial-stages", type: "contrasts", why: "Piaget's stages concern how thinking develops; Erikson's concern social and emotional challenges across life." },
      { to: "psy.cognitive-revolution", type: "links-to", why: "Piaget's work on mental structures became influential in the English speaking world as the cognitive revolution took hold." },
      { to: "psy.attachment", type: "links-to", why: "Children's thinking develops within relationships; secure attachment supports confident exploration." }
    ],
    prompts: ["Have you watched a young child insist that a tall glass holds more? What did it feel like to see the world through their logic?"],
    recall: [ { q: "Name Piaget's four stages in order.", a: "Sensorimotor, preoperational, concrete operational, formal operational." }, { q: "What does a conservation task test?", a: "Whether a child understands that quantity stays the same when appearance changes." } ]
  },
  {
    id: "psy.social-learning", kind: "theory", title: "Social learning theory",
    line: "We learn by watching others and noting what happens to them, not only from our own rewards.",
    facets: { field: ["learning", "social"], lens: ["cognitive", "behavioural"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.bandura"],
    evidence: "strong",
    evidenceNote: "Observational learning is robustly demonstrated in children, adults and other animals.",
    body: [
      "Albert Bandura argued that most human learning is observational. We watch a model, attend to what they do, retain it, reproduce it when able, and are more likely to do so if we see the model rewarded. He called the last part vicarious reinforcement. Learning can happen without any reward to the learner and without any visible change in behaviour until much later.",
      "In 1986 he renamed the approach social cognitive theory to stress thinking: people interpret what they see, set goals and regulate themselves. He described reciprocal determinism, a loop in which person, behaviour and environment each shape the others.",
      "The theory influenced debates about violence in media, health campaigns that use relatable models, and the design of training. The basic process is among the best supported in psychology; claims about how much particular media cause real world aggression are more contested."
    ],
    links: [
      { to: "psy.bobo-doll", type: "links-to", why: "The Bobo doll studies were the founding demonstration of social learning." },
      { to: "psy.behaviourism", type: "responds-to", why: "Bandura kept behaviourism's interest in consequences but added observation and thought." },
      { to: "psy.sociocultural", type: "links-to", why: "Both treat learning as fundamentally social." }
    ],
    prompts: ["What have the children or young people around you picked up from watching rather than being told?"],
    recall: [ { q: "What is vicarious reinforcement?", a: "Becoming more likely to copy a behaviour after seeing someone else rewarded for it." } ]
  },
  {
    id: "psy.big-five", kind: "theory", title: "The Big Five personality traits",
    line: "Openness, conscientiousness, extraversion, agreeableness and neuroticism: the best tested map of personality.",
    facets: { field: ["personality"], lens: ["biological", "cognitive"], era: ["modern"] },
    evidence: "strong",
    evidenceNote: "Replicated across many languages and methods, moderately heritable and predictive of life outcomes; less clean in some small scale societies.",
    body: [
      "The Big Five came from a simple idea, the lexical hypothesis: important differences between people will be encoded in everyday language. Researchers collected thousands of trait words and used statistics to find which clustered together. Five broad dimensions kept appearing: openness to experience, conscientiousness, extraversion, agreeableness and neuroticism, sometimes remembered as OCEAN.",
      "Each is a continuum, and people are mixtures. Twin studies suggest roughly forty to fifty percent of variation is heritable. Traits are fairly stable but change through life; on average people become more conscientious and agreeable and less neurotic as they mature. Conscientiousness predicts job performance and health; neuroticism predicts vulnerability to anxiety and low mood.",
      "The model is descriptive rather than explanatory: it says how people differ, not why. Studies in some small scale societies have found the five factors less clearly. It remains psychology's best tested account of personality and a useful corrective to popular type tests."
    ],
    links: [
      { to: "psy.psychosocial-stages", type: "contrasts", why: "Trait theory describes stable differences between people; stage theories describe changes everyone passes through." },
      { to: "psy.marshmallow", type: "links-to", why: "Self control in childhood relates to conscientiousness, the trait most linked to long term outcomes." },
      { to: "psy.anxiety", type: "links-to", why: "High neuroticism is associated with greater vulnerability to anxiety." }
    ],
    prompts: ["How would you rate yourself on the five traits, and how might someone who knows you well rate you differently?"],
    recall: [ { q: "What do the letters OCEAN stand for?", a: "Openness, conscientiousness, extraversion, agreeableness, neuroticism." }, { q: "What is the lexical hypothesis?", a: "Important personality differences will be encoded in everyday language." } ],
    further: ["Daniel Nettle, Personality (2007)"]
  },
  {
    id: "psy.cbt", kind: "theory", title: "Cognitive behavioural therapy",
    line: "Changing how we interpret events and what we do in response, to change how we feel.",
    facets: { field: ["clinical"], lens: ["cognitive", "behavioural"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.beck", "psy.ellis"],
    evidence: "strong",
    evidenceNote: "One of the most researched psychological therapies, with good evidence for anxiety and depression; effects are smaller in the highest quality trials.",
    quote: { text: "Men are disturbed not by things, but by the principles and notions which they form concerning things.", source: "Epictetus, Enchiridion 5, translated by Elizabeth Carter (1758)" },
    body: [
      "Cognitive behavioural therapy grew from two roots. Behaviour therapy, from the 1950s, used conditioning principles such as gradual exposure to feared situations. Cognitive therapy, from Albert Ellis and Aaron Beck, held that emotional distress is maintained by patterns of interpretation. By the 1980s the two had merged.",
      "The core model links situations, thoughts, feelings, bodily sensations and behaviour. A person learns to notice automatic thoughts, test them against evidence, and try new behaviours as experiments. Common thinking traps include catastrophising, all or nothing thinking and mind reading. Therapy is structured, time limited and collaborative.",
      "CBT has strong evidence for anxiety disorders and depression and is recommended in many national guidelines. Careful reviews find effects smaller in the best designed trials than in early ones, and it is not better than every alternative for everyone. Its philosophical root is old: both Ellis and Beck acknowledged the Stoic idea that we are troubled less by events than by our judgements about them."
    ],
    links: [
      { to: "psy.cognitive-revolution", type: "links-to", why: "Cognitive therapy brought the cognitive revolution's interest in thinking into the clinic." },
      { to: "psy.learned-helplessness", type: "links-to", why: "Explanatory style research fed into cognitive approaches to depression." },
      { to: "psy.classical-conditioning", type: "links-to", why: "Exposure therapy, a core CBT tool, works partly through extinction of conditioned fear." },
      { to: "phil.stoicism", type: "links-to", why: "Ellis and Beck credited Epictetus: it is our judgements about events that disturb us." }
    ],
    prompts: ["Recall a moment of frustration this week. What was the thought in between the event and the feeling?"],
    recall: [ { q: "What are the two roots of CBT?", a: "Behaviour therapy based on conditioning, and cognitive therapy from Ellis and Beck." }, { q: "Which ancient philosophy anticipated CBT's central idea?", a: "Stoicism, especially Epictetus." } ],
    further: ["Donald Robertson, The Philosophy of Cognitive Behavioural Therapy (2010)", "Aaron T. Beck, Cognitive Therapy and the Emotional Disorders (1976)"]
  },
  {
    id: "psy.james-lange", kind: "theory", title: "The James Lange theory of emotion",
    line: "We do not tremble because we are afraid; we are afraid because we tremble.",
    facets: { field: ["biological"], lens: ["biological"], era: ["founding", "modern"] },
    people: ["psy.william-james"],
    evidence: "mixed",
    evidenceNote: "Bodily feedback clearly contributes to emotion, but it is not the whole story, and the strong version has been revised many times.",
    quote: { text: "We feel sorry because we cry, angry because we strike, afraid because we tremble.", source: "William James, “What is an Emotion?”, Mind (1884)" },
    body: [
      "Common sense says we see a bear, feel afraid and then run. In 1884 William James, and independently the Danish physician Carl Lange, proposed the reverse order: we see the bear, the body reacts, and the feeling of fear is our perception of that bodily change. Take away the racing heart and trembling, James argued, and nothing would remain but a cold judgement of danger.",
      "Walter Cannon objected in 1927 that bodily changes are too slow and too similar across emotions to explain their variety. In 1962 Stanley Schachter and Jerome Singer proposed a two factor theory: arousal plus a label drawn from context. A famous 1974 study found men who met an attractive interviewer on a swaying suspension bridge were more likely to call her later, perhaps attributing their arousal to attraction.",
      "Modern research on interoception, the sensing of the body's internal state, has revived a version of James's idea: emotional experience is closely tied to how the brain reads the body. The strong claim that feeling is nothing but bodily perception remains disputed."
    ],
    links: [
      { to: "psy.facial-feedback", type: "leads-to", why: "If feelings follow bodily changes, then changing the face might change the feeling: the facial feedback hypothesis." },
      { to: "psy.predictive-processing", type: "links-to", why: "Predictive accounts of emotion treat feelings as the brain's interpretation of bodily signals, a modern descendant of James." },
      { to: "phil.mind-body", type: "links-to", why: "The theory places the body inside emotion, a concrete case for thinking about how mind and body relate." }
    ],
    prompts: ["Next time your heart races, notice whether you first feel it in the body or in a thought. Which came first?"],
    recall: [ { q: "What did James and Lange claim about emotion?", a: "That emotion is the perception of bodily changes, which come first." } ]
  },
  {
    id: "psy.predictive-processing", kind: "theory", title: "Predictive processing",
    line: "The brain as a prediction machine: perception is a best guess, corrected by error signals.",
    facets: { field: ["perception", "cognitive", "biological"], lens: ["biological", "cognitive"], era: ["modern", "replication"] },
    evidence: "contested",
    evidenceNote: "Specific predictions are supported in perception research, but as a theory of the whole brain it is broad, influential and hard to falsify.",
    body: [
      "Predictive processing says the brain does not wait passively for input. It constantly predicts what the senses will report and uses incoming signals mainly to correct its predictions. What reaches deeper processing is the prediction error, the difference between guess and data. The idea descends from Helmholtz's unconscious inference and was developed in neuroscience by Rajesh Rao, Dana Ballard and Karl Friston, and in philosophy by Andy Clark.",
      "It explains a lot elegantly. The hollow mask illusion: a mask seen from behind still looks convex, because faces are almost always convex. Placebo: expectations shape how bodily signals are experienced. Why we cannot tickle ourselves: the brain predicts the touch and dampens it. Anil Seth has described conscious perception as a controlled hallucination.",
      "Critics say the framework is so flexible that it can accommodate nearly any result, which makes it hard to test as a whole. Supporters reply that specific models make specific, testable predictions. It is best treated as a powerful research programme rather than a settled theory."
    ],
    links: [
      { to: "psy.neuroscience", type: "links-to", why: "Predictive processing is one of the most ambitious unifying theories in cognitive neuroscience." },
      { to: "psy.emotion", type: "links-to", why: "Constructed emotion theories apply predictive ideas to feelings built from bodily signals." },
      { to: "phil.realism", type: "links-to", why: "If perception is the brain's best guess, the question of how far we see the world as it really is returns with force." }
    ],
    prompts: ["Have you ever misheard a word because you were expecting another? What did your brain predict?"],
    recall: [ { q: "What is a prediction error?", a: "The difference between what the brain predicted and what the senses report, used to update the prediction." } ],
    further: ["Andy Clark, Surfing Uncertainty (2016)", "Anil Seth, Being You (2021)"]
  },
  {
    id: "psy.psychosocial-stages", kind: "theory", title: "Erikson's psychosocial stages",
    line: "Eight life stages, each with a central tension, from trust in infancy to integrity in old age.",
    facets: { field: ["developmental", "personality"], lens: ["psychodynamic", "sociocultural"], era: ["early", "cognitive-revolution"] },
    evidence: "weak",
    evidenceNote: "Widely taught and descriptively rich, but rarely tested rigorously; research on identity in adolescence gives partial support.",
    body: [
      "Erik Erikson, a German born psychoanalyst who settled in the United States, set out eight stages in Childhood and Society (1950). Unlike Freud, he placed development in a social world and extended it across the whole life. Each stage centres on a tension: trust versus mistrust in infancy, autonomy versus shame, initiative versus guilt, industry versus inferiority, identity versus role confusion in adolescence, intimacy versus isolation in young adulthood, generativity versus stagnation in midlife, and integrity versus despair in old age.",
      "Generativity, concern for guiding the next generation through parenting, teaching, mentoring or creative work, has become a research topic in its own right, and Erikson coined the phrase identity crisis. James Marcia's research on identity statuses in adolescence developed his ideas empirically.",
      "The stages are better read as a humane map of life's recurring questions than as a tested scientific sequence. Many people revisit earlier tensions later, and the order is not fixed."
    ],
    links: [
      { to: "psy.self", type: "links-to", why: "Erikson's account of identity is one of the most influential pictures of how the self forms." },
      { to: "psy.humanistic", type: "links-to", why: "Like the humanists, Erikson saw development as lifelong growth rather than early fixation." },
      { to: "eng.from-ideas", type: "links-to", why: "Identity crisis, now everyday English, was coined by Erikson." }
    ],
    prompts: ["Generativity means caring for what outlasts you. Where does that show up in your life, at home or beyond it?"],
    recall: [ { q: "What is the central tension of midlife in Erikson's scheme?", a: "Generativity versus stagnation." } ],
    further: ["Erik Erikson, Childhood and Society (1950)"]
  }
  );

  /* ------------------------------------------------------------------ Studies */
  N.push(
  {
    id: "psy.milgram", kind: "study", title: "Milgram's obedience studies",
    line: "Ordinary people told to give a stranger electric shocks; most kept going when an authority insisted.",
    facets: { field: ["social"], lens: ["sociocultural"], era: ["cognitive-revolution", "replication"] },
    evidence: "moderate",
    evidenceNote: "High obedience was partly replicated in 2009 under safer limits, but archive research shows inconsistent procedures and many participants doubting the set up.",
    body: [
      "At Yale in 1961 and 1962, Stanley Milgram recruited men through newspaper adverts for a study of memory. Each was assigned to be the teacher and told to give increasing electric shocks to a learner, actually an actor, for each mistake. The shocks were fake. In the best known version, 26 of 40 men continued to the maximum of 450 volts while the learner protested, then fell silent, prompted only by an experimenter in a grey coat saying such things as “the experiment requires that you continue”.",
      "Milgram ran many variations. Obedience fell when the learner was in the same room, when the teacher had to press the learner's hand onto a plate, when the experimenter gave orders by phone, and when other teachers refused. He linked his results to how ordinary people took part in atrocities such as the Holocaust.",
      "The study has held up only in part. In 2009 Jerry Burger repeated it, stopping at 150 volts for ethical reasons, and found rates similar to Milgram's at that point. But Gina Perry's study of the archives showed that the experimenter often improvised beyond the script, that many participants said they suspected the shocks were fake, and that debriefing was patchy. Alex Haslam and Stephen Reicher argue the results show engaged followership, people continuing because they identified with the scientific project, since the most direct order, “you have no other choice”, was the least effective."
    ],
    links: [
      { to: "psy.stanford-prison", type: "links-to", why: "Both studies are cited as proof of situational power and both have been reexamined from their archives." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Milgram is an example of a classic partly replicated but reinterpreted after archival scrutiny." },
      { to: "phil.virtue-ethics", type: "links-to", why: "Situationist philosophers cite Milgram to question whether people have stable virtues of character." },
      { to: "phil.free-will", type: "links-to", why: "Participants who continued felt they had no choice; the study asks how responsibility survives obedience." }
    ],
    prompts: ["Have you ever done something at work or school because someone in charge said to, against your own judgement? What made it hard to refuse?"],
    recall: [ { q: "In the baseline Milgram study, how many of 40 men went to 450 volts?", a: "26, about 65 percent." }, { q: "What did Perry's archive research reveal?", a: "Inconsistent procedures, many participants suspecting the shocks were fake, and patchy debriefing." } ],
    further: ["Stanley Milgram, Obedience to Authority (1974)", "Gina Perry, Behind the Shock Machine (2012)"]
  },
  {
    id: "psy.stanford-prison", kind: "study", title: "The Stanford Prison Experiment",
    line: "Students role playing guards and prisoners in 1971; famous, unrepeated and heavily criticised.",
    facets: { field: ["social"], lens: ["sociocultural"], era: ["cognitive-revolution", "replication"] },
    evidence: "contested",
    evidenceNote: "Never properly replicated; recordings and archives show guards were coached and some behaviour was performed, raising serious doubts about the conclusions.",
    body: [
      "In August 1971 Philip Zimbardo turned a basement at Stanford University into a mock prison. Young men were randomly assigned as guards or prisoners. Planned to run for two weeks, it was stopped after six days, as some guards became abusive and several prisoners showed distress. Zimbardo concluded that a toxic situation can turn ordinary people cruel, and he later applied the lesson to the abuses at Abu Ghraib.",
      "From the start critics noted demand characteristics: participants knew what a prison study was supposed to show. A 2007 study found that an advert mentioning “prison life” attracted volunteers who scored higher on aggression. Thibault Le Texier's 2018 archival research showed that guards were briefed and encouraged to be tough, and one prisoner later said his dramatic breakdown was partly put on. Zimbardo himself acted as prison superintendent, not a neutral observer.",
      "The BBC Prison Study in 2002, by Stephen Reicher and Alex Haslam, found that guards did not spontaneously become tyrannical and that group identity and leadership shaped what happened. The Stanford study remains important as a story about situations and as a cautionary tale about how a vivid demonstration can outrun its evidence."
    ],
    links: [
      { to: "psy.conformity", type: "links-to", why: "The study was read as showing people conforming to roles; critics say they conformed to what the researchers wanted." },
      { to: "psy.hawthorne", type: "links-to", why: "Both raise the problem of participants behaving as they think the study expects." },
      { to: "psy.reproducibility-project", type: "links-to", why: "The study became a central example in public debates about psychology's reliability." }
    ],
    prompts: ["When you take on a role, such as manager, parent or host, how much does the role change how you act?"],
    recall: [ { q: "What did Le Texier's archive work show?", a: "Guards were briefed and encouraged to be tough, and some behaviour was performed, undermining the claim that cruelty emerged spontaneously." } ],
    further: ["Thibault Le Texier, Histoire d'un mensonge (2018)", "Rutger Bregman, Humankind (2019)"]
  },
  {
    id: "psy.asch", kind: "study", title: "Asch's line experiments",
    line: "Asked which line matched, people sometimes gave obviously wrong answers to agree with a group.",
    facets: { field: ["social"], lens: ["sociocultural"], era: ["cognitive-revolution"] },
    evidence: "moderate",
    evidenceNote: "Conformity in this task replicates, but rates vary by culture and era, and most answers in the original were in fact independent.",
    body: [
      "In the early 1950s Solomon Asch seated a participant with several others who, unknown to him, were working with the experimenter. They were shown a line and asked which of three comparison lines matched it. The answer was obvious. On certain trials the others all gave the same wrong answer before the participant spoke.",
      "On those trials, about a third of answers went along with the group. Around three quarters of participants conformed at least once, but about a quarter never did. A single ally who gave the correct answer cut conformity sharply. Asch himself emphasised the independence he saw, though textbooks usually tell the story as one of conformity.",
      "A 1996 meta analysis of over a hundred Asch style studies in seventeen countries found that conformity had declined in the United States since the 1950s and was higher in more collectivist cultures. Participants often reported doubt and distress, which suggests a real conflict between seeing and belonging."
    ],
    links: [
      { to: "psy.milgram", type: "links-to", why: "Milgram, Asch's student, moved from pressure by peers to pressure from an authority." },
      { to: "psy.sociocultural", type: "links-to", why: "Conformity rates in Asch style studies vary with culture." },
      { to: "psy.perception", type: "links-to", why: "Some participants said they began to doubt their own eyes, showing how social pressure reaches into perception." }
    ],
    prompts: ["What would it take for you to say “I see it differently” when a whole room agrees?"],
    recall: [ { q: "What sharply reduced conformity in Asch's studies?", a: "A single ally who gave the correct answer." } ]
  },
  {
    id: "psy.marshmallow", kind: "study", title: "The marshmallow test",
    line: "Children who waited for two treats seemed to do better later; much less so once background is counted.",
    facets: { field: ["developmental", "personality"], lens: ["cognitive", "sociocultural"], era: ["cognitive-revolution", "replication"] },
    evidence: "mixed",
    evidenceNote: "Delay of gratification is real, but a 2018 study found its link to later achievement much smaller once family background and early ability were controlled.",
    body: [
      "Around 1970 Walter Mischel offered preschool children at Stanford's nursery a choice: one treat now, or two if they could wait alone for up to about fifteen minutes. The original aim was to study the strategies children used, such as covering their eyes or singing. Follow ups years later found that children who waited longer had higher test scores and other good outcomes as teenagers.",
      "The finding became a symbol of willpower as destiny. Then in 2018 Tyler Watts, Greg Duncan and Haonan Quan tested it with about nine hundred children from a much more diverse sample. The link between waiting and achievement at fifteen was about half the original size, and after accounting for family background and early cognitive ability it largely disappeared.",
      "A 2013 study added a twist: children waited much longer if the adult had previously kept a promise than if the adult had broken one. Not waiting can be a rational response to an unreliable world. The modern reading is that self control matters, and so do trust and circumstance."
    ],
    links: [
      { to: "psy.ego-depletion", type: "links-to", why: "Both studies shaped popular ideas about willpower that later research complicated." },
      { to: "psy.reproducibility-project", type: "links-to", why: "The marshmallow test shows how conclusions can shrink when a finding is retested in larger, more representative samples." },
      { to: "psy.sociocultural", type: "links-to", why: "Whether waiting makes sense depends on whether the world a child lives in keeps its promises." }
    ],
    prompts: ["When do you wait for the bigger reward and when do you take what is in front of you? How much depends on who made the promise?"],
    recall: [ { q: "What did the 2018 replication find?", a: "The link to later achievement was about half as big and largely disappeared after controlling for background and early ability." }, { q: "What did the 2013 reliability study show?", a: "Children waited longer when the adult had kept an earlier promise." } ],
    further: ["Walter Mischel, The Marshmallow Test (2014)"]
  },
  {
    id: "psy.little-albert", kind: "study", title: "Little Albert",
    line: "In 1920 Watson and Rayner conditioned an infant to fear a white rat; a single, poorly controlled case.",
    facets: { field: ["learning", "clinical"], lens: ["behavioural"], era: ["early"] },
    people: ["psy.watson"],
    evidence: "weak",
    evidenceNote: "A single infant, inconsistent procedures and no proper controls; attempts to repeat it in the following years had mixed results.",
    body: [
      "John Watson and Rosalie Rayner showed a nine month old boy, called Albert B., a white rat, which he reached for happily. Later, each time he touched the rat, they struck a steel bar loudly behind his head. After several pairings Albert cried at the sight of the rat alone, and seemed to react to a rabbit, a dog, a fur coat and a Santa Claus mask too.",
      "The study was meant to show that fears are learned by conditioning rather than inborn. Its evidence is thin. There was one child, the measures were informal, the fear was not always consistent, and Albert left before any attempt to remove it, which was itself an ethical failure. Researchers who tried similar procedures in following years did not reliably repeat the result.",
      "Who Albert was is still debated: researchers have proposed two different children, with very different life stories. The study is better remembered as a historical landmark and an ethical warning than as evidence. The broader idea that fears can be conditioned is supported by much better research since."
    ],
    links: [
      { to: "psy.behaviourism", type: "example-of", why: "Little Albert was Watson's showcase for a behaviourist account of emotion." },
      { to: "psy.anxiety", type: "links-to", why: "It was offered as a model of how phobias form through conditioning." },
      { to: "psy.reproducibility-project", type: "links-to", why: "A single uncontrolled case became a textbook fixture, an example of how weak evidence can become famous." }
    ],
    prompts: ["Is there a fear in your family that seems to have been learned rather than inborn? How might it have been learned?"],
    recall: [ { q: "Why is Little Albert weak evidence?", a: "A single infant, informal measures, inconsistent responses and no controls." } ]
  },
  {
    id: "psy.harlow-monkeys", kind: "study", title: "Harlow's monkeys",
    line: "Infant monkeys clung to a soft cloth mother rather than a wire one that gave milk.",
    facets: { field: ["developmental", "biological"], lens: ["biological", "evolutionary"], era: ["cognitive-revolution"] },
    evidence: "strong",
    evidenceNote: "The preference for contact comfort was robust in rhesus monkeys; its application to humans rests on converging human evidence, and the later isolation studies are ethically troubling.",
    body: [
      "In the 1950s at the University of Wisconsin, Harry Harlow separated infant rhesus monkeys from their mothers and gave them two substitutes: a bare wire figure with a feeding bottle and a figure covered in soft cloth without one. The infants fed from the wire mother but spent most of their time clinging to the cloth one, and ran to it when frightened.",
      "The prevailing view, from both behaviourism and psychoanalysis, was that infants love whoever feeds them. Harlow's 1958 lecture, The Nature of Love, argued that contact comfort mattered more. His findings supported Bowlby's attachment theory.",
      "Harlow's later work raised monkeys in total isolation, causing severe and lasting harm. These experiments are now widely seen as cruel, and they helped spur the movement for stronger protections for laboratory animals. The findings and the ethics belong together in any honest account."
    ],
    links: [
      { to: "psy.behaviourism", type: "responds-to", why: "The finding challenged the behaviourist view that love is a conditioned response to being fed." },
      { to: "psy.evolutionary", type: "links-to", why: "Contact comfort fits the view that attachment is an evolved system for protection." },
      { to: "psy.strange-situation", type: "links-to", why: "Like infants in the Strange Situation, Harlow's monkeys used the cloth mother as a secure base when frightened." }
    ],
    prompts: ["How do comfort and care show up physically in your family, apart from feeding and providing?"],
    recall: [ { q: "Which substitute mother did the infant monkeys prefer?", a: "The soft cloth one, even though the wire one gave milk." } ],
    further: ["Deborah Blum, Love at Goon Park (2002)"]
  },
  {
    id: "psy.strange-situation", kind: "study", title: "The Strange Situation",
    line: "A twenty minute sequence of separations and reunions that classifies infant attachment.",
    facets: { field: ["developmental"], lens: ["evolutionary", "cognitive"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.ainsworth"],
    evidence: "moderate",
    evidenceNote: "A reliable, widely used procedure; the distribution of categories varies across cultures and its meaning outside Western settings is debated.",
    body: [
      "Mary Ainsworth designed the procedure around 1970. An infant of about a year and its parent enter a playroom. A stranger joins; the parent leaves briefly and returns; later the infant is left completely alone, then with the stranger, then the parent returns again. Observers focus less on the crying at separation than on the reunion.",
      "Securely attached infants may be upset but are comforted quickly on reunion and return to play. Avoidant infants show little distress and ignore the parent on return. Resistant or ambivalent infants are very distressed and hard to comfort. Later, Mary Main and Judith Solomon added a disorganised category for infants who show contradictory or frozen behaviour.",
      "In many samples about two thirds of infants are classed as secure. But proportions vary: some German samples showed more avoidance, some Japanese samples more resistance, perhaps because infants there were rarely left with strangers. Caregiver sensitivity predicts security only moderately. The categories describe a relationship at one moment, not a fixed fate."
    ],
    links: [
      { to: "psy.sociocultural", type: "links-to", why: "Cultural differences in category distributions raise questions about what the procedure measures across societies." },
      { to: "psy.evolutionary", type: "links-to", why: "The procedure tests a system thought to have evolved to keep infants close to protection." },
      { to: "psy.theory-of-mind", type: "links-to", why: "Secure attachment and conversation about feelings are associated with earlier understanding of other minds." }
    ],
    prompts: ["Why might reunion, rather than separation, reveal more about a relationship?"],
    recall: [ { q: "What are the main attachment categories in the Strange Situation?", a: "Secure, avoidant, resistant or ambivalent, and later disorganised." } ]
  },
  {
    id: "psy.bobo-doll", kind: "study", title: "The Bobo doll experiment",
    line: "Children who watched an adult attack an inflatable doll copied the attack, blow for blow.",
    facets: { field: ["learning", "developmental", "social"], lens: ["cognitive", "behavioural"], era: ["cognitive-revolution"] },
    people: ["psy.bandura"],
    evidence: "moderate",
    evidenceNote: "Imitation of modelled actions is robust, but whether hitting a doll designed to be hit shows real aggression, and how far it generalises, is debated.",
    body: [
      "In 1961 Albert Bandura, Dorothea Ross and Sheila Ross showed preschool children at Stanford an adult playing with a large inflatable clown. Some saw the adult punch it, kick it, hit it with a mallet and shout specific phrases; others saw the adult play quietly. Left alone with toys including the doll, children who had seen aggression were much more likely to copy it, often reproducing the exact actions and words.",
      "Later versions used filmed models and showed that children were more likely to copy an adult who was rewarded than one who was punished, though all had learned the behaviour. Learning and performance could be separated.",
      "Critics note that a Bobo doll is built to be knocked over, so hitting it may be play rather than aggression, and that the effects were measured over minutes, not years. As a demonstration of observational learning, the study is solid. As evidence about real world violence, it was one piece in a larger and still contested debate."
    ],
    links: [
      { to: "psy.behaviourism", type: "responds-to", why: "Children learned without being rewarded themselves, which strict behaviourism could not easily explain." },
      { to: "psy.sociocultural", type: "links-to", why: "The study shows learning as something that happens between people." },
      { to: "psy.little-albert", type: "contrasts", why: "Little Albert showed learning by direct pairing; the Bobo doll study showed learning by watching." }
    ],
    prompts: ["What have you seen a child copy, word for word, from an adult? Was it something you would have chosen to teach?"],
    recall: [ { q: "What did the later Bobo studies show about learning and performance?", a: "Children learned the behaviour whether the model was rewarded or punished, but were more likely to perform it if the model was rewarded." } ]
  },
  {
    id: "psy.libet", kind: "study", title: "Libet's experiment on the will",
    line: "Brain activity seemed to begin before people felt they had decided to move; what that means is disputed.",
    facets: { field: ["biological", "cognitive"], lens: ["biological"], era: ["modern", "replication"] },
    evidence: "contested",
    evidenceNote: "The timing findings are reproducible, but the interpretation is contested; newer models suggest the early signal may be background noise, not a decision.",
    body: [
      "In 1983 Benjamin Libet asked people to flex a wrist whenever they felt like it, while watching a fast clock and noting the moment they first felt the urge. Electrodes recorded a slow build up of brain activity, the readiness potential. It began roughly half a second before the movement, and around a third of a second before people reported the urge.",
      "Many read this as showing that the brain decides before we know it, so conscious will is an afterthought. Libet himself suggested we might keep a veto, a power to stop an action already in motion. Later brain imaging studies reported that choices could be predicted somewhat above chance seconds in advance.",
      "The interpretation has weakened. In 2012 Aaron Schurger and colleagues showed that the readiness potential can arise from random fluctuations in brain activity that tip over a threshold, so it may not reflect a decision at all. A 2019 study found the signal absent when people made deliberate, meaningful choices, such as which charity to support. Libet's experiment is a famous case of a small, artificial task carrying a very large philosophical claim."
    ],
    links: [
      { to: "psy.neuroscience", type: "links-to", why: "Libet's work is a landmark of cognitive neuroscience applied to the will." },
      { to: "psy.dual-process", type: "links-to", why: "The question of how much happens before conscious deliberation is also at the heart of dual process theory." },
      { to: "phil.free-will", type: "links-to", why: "Libet's results are the most cited scientific challenge to free will, though their bearing on it is disputed." },
      { to: "phil.determinism", type: "links-to", why: "Some read the readiness potential as neural causes fixing our actions before we choose; others reply that this confuses spontaneous twitches with decisions." }
    ],
    prompts: ["Can a study of spontaneous wrist flicks tell us much about choosing a school for a child? What would a better test need?"],
    recall: [ { q: "What is the readiness potential?", a: "A slow build up of brain activity that begins before a voluntary movement." }, { q: "What did Schurger's 2012 model suggest?", a: "The readiness potential may reflect random fluctuations crossing a threshold, not a prior decision." } ],
    further: ["Daniel Wegner, The Illusion of Conscious Will (2002)"]
  },
  {
    id: "psy.hawthorne", kind: "study", title: "The Hawthorne studies",
    line: "Factory experiments said to show that being watched improves work; the original story has not held up.",
    facets: { field: ["social"], lens: ["sociocultural"], era: ["early", "replication"] },
    evidence: "contested",
    evidenceNote: "Reanalyses of the original data found little support for the famous effect, though research participation can change behaviour in some conditions.",
    body: [
      "Between 1924 and 1932, at the Western Electric Hawthorne Works near Chicago, researchers varied lighting, breaks and working hours to see what raised productivity. The legend is that output rose whatever was changed, even when lights were dimmed, because the workers knew they were being studied. The phrase Hawthorne effect was coined in 1958.",
      "The original illumination studies were never properly published. When economists Steven Levitt and John List analysed recovered data in 2011, they found little evidence of the famous effect. Other reanalyses pointed to changes in pay, feedback and the replacement of workers as explanations for the rising output in later phases.",
      "A 2014 systematic review found that taking part in research can change behaviour, but the effects vary and their mechanisms are unclear, so the term is used too loosely. The real lesson is sound: studies must control for the effects of attention and expectation, which is why good trials use comparison groups who are watched just as closely."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "The Hawthorne effect is a classic example of a story repeated in textbooks long after its evidence was questioned." },
      { to: "psy.self-determination", type: "links-to", why: "One reading of the studies is that attention and autonomy for the workers mattered more than lighting." },
      { to: "phys.observer", type: "links-to", why: "People sometimes compare the Hawthorne effect to the quantum observer effect, but the analogy is loose: in physics, measurement is a physical interaction, not awareness of being watched." }
    ],
    prompts: ["Do you work or parent differently when someone is watching? Is that always worse?"],
    recall: [ { q: "What did Levitt and List find in 2011?", a: "Recovered data from the illumination experiments gave little support to the famous Hawthorne effect." } ]
  },
  {
    id: "psy.misinformation", kind: "study", title: "Loftus and Palmer's car crash study",
    line: "Asking how fast cars smashed rather than hit raised speed estimates and planted false broken glass.",
    facets: { field: ["cognitive"], lens: ["cognitive"], era: ["cognitive-revolution", "modern"] },
    people: ["psy.loftus"],
    evidence: "strong",
    evidenceNote: "The misinformation effect has been replicated many times across materials and settings, though its size varies.",
    body: [
      "In 1974 Elizabeth Loftus and John Palmer showed students films of car accidents and asked how fast the cars were going when they hit each other. Other groups heard smashed, collided, bumped or contacted instead of hit. With smashed, average estimates were about 41 miles per hour; with contacted, about 32.",
      "In a second experiment, a week later, participants were asked whether they had seen broken glass. There was none. About a third of those who had heard smashed said yes, compared with about one in seven who had heard hit. A single word had changed the memory itself, not just the answer.",
      "This became the misinformation effect: information encountered after an event can be absorbed into memory of it. Loftus went on to show that whole false childhood events could be implanted in some people. The research reshaped how police question witnesses and how courts treat confident eyewitness testimony."
    ],
    links: [
      { to: "psy.memory", type: "example-of", why: "The study is a clear demonstration that memory is reconstructive." },
      { to: "psy.priming", type: "links-to", why: "A single word activated associations that shaped both estimates and memory." },
      { to: "psy.confirmation-bias", type: "links-to", why: "Leading questions supply an expectation that memory then fills in to match." }
    ],
    prompts: ["How might the way someone asks you about an argument at home change what you remember of it?"],
    recall: [ { q: "What did the word smashed do in Loftus and Palmer's study?", a: "It raised speed estimates and led more people to falsely remember broken glass." } ],
    further: ["Elizabeth Loftus, Eyewitness Testimony (1979)"]
  },
  {
    id: "psy.rosenhan", kind: "study", title: "Rosenhan's “On being sane in insane places”",
    line: "Healthy people faked one symptom and were admitted to psychiatric hospitals; the study itself is now in doubt.",
    facets: { field: ["clinical", "social"], lens: ["sociocultural"], era: ["cognitive-revolution", "replication"] },
    evidence: "weak",
    evidenceNote: "Archival research by Susannah Cahalan found major discrepancies and could verify few of the pseudopatients, casting serious doubt on the published account.",
    body: [
      "In 1973 David Rosenhan published a study in Science describing eight healthy people, himself included, who went to psychiatric hospitals saying they heard voices saying words like empty, hollow and thud. All were admitted, almost all with a diagnosis of schizophrenia, and once inside they behaved normally. Stays averaged about nineteen days. The paper argued that psychiatric diagnosis could not tell the sane from the insane.",
      "The study had enormous influence. It fuelled criticism of psychiatry and contributed to the push for more explicit diagnostic criteria in the 1980 edition of the American diagnostic manual.",
      "In 2019 the journalist Susannah Cahalan published years of research into Rosenhan's papers. She found that his own medical records described more severe symptoms than the paper reported, that she could identify only one or two other pseudopatients, and that one participant whose positive hospital experience did not fit the argument had been left out. The questions the study raised about diagnosis are fair; the study itself cannot be relied on."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "Rosenhan is a case of a landmark study whose foundations crumbled under scrutiny." },
      { to: "psy.stanford-prison", type: "links-to", why: "Both are famous studies from the early 1970s whose archives revealed far messier realities than the published accounts." },
      { to: "psy.attribution-error", type: "links-to", why: "Rosenhan argued staff interpreted normal behaviour through the label, a version of judging the person rather than the situation." }
    ],
    prompts: ["Why do you think this study was so widely believed for so long? What did it confirm for people?"],
    recall: [ { q: "What did Cahalan's research find?", a: "Discrepancies between Rosenhan's records and the paper, few verifiable pseudopatients, and an excluded participant whose experience did not fit." } ],
    further: ["Susannah Cahalan, The Great Pretender (2019)"]
  },
  {
    id: "psy.ego-depletion", kind: "study", title: "Ego depletion",
    line: "The claim that willpower is a fuel that runs down with use; large replications found almost nothing.",
    facets: { field: ["social", "personality"], lens: ["cognitive", "biological"], era: ["modern", "replication"] },
    evidence: "failed",
    evidenceNote: "Two large preregistered replications across many laboratories, in 2016 and 2021, found effects close to zero.",
    body: [
      "In a 1998 study by Roy Baumeister and colleagues, hungry students sat in a room smelling of fresh cookies. Some were allowed to eat them; others had to eat radishes instead. Then all tried to solve an impossible puzzle. The radish eaters gave up sooner. The idea of ego depletion was that self control draws on a limited resource that gets used up, like a muscle tiring.",
      "Hundreds of studies followed, and a 2010 meta analysis reported a sizeable effect. A later proposal that the resource was blood glucose drew attention too. The idea fitted everyday experience and spread through self help books.",
      "Then came stringent tests. A 2016 registered replication across 23 laboratories, with over two thousand participants, found an effect near zero. A second, designed with Baumeister's input and run across 36 laboratories, reported in 2021 an effect so small it was barely distinguishable from zero. The glucose account also failed. Tiredness and motivation are real; the specific claim of a depletable willpower resource has not survived."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "Ego depletion is one of the clearest failed replications of the crisis." },
      { to: "psy.self-efficacy", type: "contrasts", why: "Some research suggests that people who believe willpower is limited show more depletion, pointing to belief rather than fuel." },
      { to: "psy.big-five", type: "links-to", why: "Stable differences in conscientiousness predict self control better than momentary depletion does." }
    ],
    prompts: ["At the end of a long day, is it really that your willpower is used up, or that your priorities have changed? How could you tell?"],
    recall: [ { q: "What did the large replications of ego depletion find?", a: "Effects close to zero, in 2016 across 23 laboratories and in 2021 across 36." } ]
  },
  {
    id: "psy.power-posing", kind: "study", title: "Power posing",
    line: "The claim that standing like a superhero changes hormones and risk taking; the hormone effects failed.",
    facets: { field: ["social", "biological"], lens: ["biological", "cognitive"], era: ["modern", "replication"] },
    evidence: "failed",
    evidenceNote: "Hormonal and behavioural effects failed to replicate; a small effect on feeling powerful may remain, and one original author publicly withdrew support.",
    body: [
      "In 2010 Dana Carney, Amy Cuddy and Andy Yap reported that 42 people who held expansive poses for two minutes, standing tall with hands on hips, showed higher testosterone, lower cortisol and more willingness to take risks than people who held contracted poses. Cuddy's 2012 talk on the idea became one of the most watched talks of its kind online.",
      "In 2015 Eva Ranehill and colleagues tested the idea with about two hundred people and found no effect on hormones or risk taking, only a small increase in reported feelings of power. In 2016 Carney, the first author, posted a statement that she no longer believed the effects were real, and described weaknesses in how the original data had been analysed.",
      "Cuddy and colleagues later argued that posture does affect how powerful people feel. Even that more modest claim is debated. The case shows how a vivid, simple fix can spread far faster than the evidence and how much it matters when an author is willing to say publicly that a finding did not hold."
    ],
    links: [
      { to: "psy.facial-feedback", type: "links-to", why: "Both propose that changing the body changes feelings, and both faced large replication tests." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Power posing became one of the best known examples of the replication crisis." },
      { to: "psy.james-lange", type: "links-to", why: "The idea is a distant descendant of James's claim that bodily states shape emotional states." }
    ],
    prompts: ["What makes a quick fix so appealing, and how could you check one before passing it on?"],
    recall: [ { q: "Which parts of power posing failed to replicate?", a: "The effects on hormones and risk taking; only a small effect on feeling powerful may remain." } ]
  },
  {
    id: "psy.facial-feedback", kind: "study", title: "The facial feedback hypothesis",
    line: "Does smiling make you happier? A famous pen study failed; a smaller effect may survive.",
    facets: { field: ["social", "biological"], lens: ["biological"], era: ["modern", "replication"] },
    evidence: "mixed",
    evidenceNote: "A 17 lab replication of the pen study failed in 2016, but a 2022 global collaboration found small effects of deliberate smiling.",
    body: [
      "In 1988 Fritz Strack, Leonard Martin and Sabine Stepper asked people to hold a pen in their teeth, which forces a smile, or between their lips, which prevents one, while rating cartoons. Those whose faces were smiling rated the cartoons funnier. It seemed an elegant test of the idea that facial expressions feed back into feelings.",
      "In 2016 a registered replication across 17 laboratories found no effect. Strack pointed out that the replications filmed participants, which might change how they felt, and a 2018 study found the effect returned when no camera was present, though this too needs confirming.",
      "In 2022 the Many Smiles Collaboration tested several methods with nearly four thousand people in 19 countries. Deliberately smiling and copying smiling faces slightly increased reported happiness; the pen method did not. The current picture: a small real effect is likely, far from the large claims of popular psychology."
    ],
    links: [
      { to: "psy.reproducibility-project", type: "links-to", why: "The facial feedback story shows replication science improving: a failed test followed by a better designed one." },
      { to: "psy.emotion", type: "part-of", why: "Facial feedback is one proposed route by which the body shapes emotional experience." },
      { to: "psy.hawthorne", type: "links-to", why: "The possible role of cameras shows how being observed can change the results of a study." }
    ],
    prompts: ["Try a gentle, deliberate smile for a minute. Notice whether anything shifts, and how much you would trust a single try."],
    recall: [ { q: "What did the Many Smiles Collaboration find?", a: "Small increases in happiness from deliberate smiling and mimicry, but not from the pen method." } ]
  },
  {
    id: "psy.asian-disease", kind: "study", title: "The disease framing problem",
    line: "The same choice about saving lives flips when outcomes are described as deaths instead of survivals.",
    facets: { field: ["behavioural-economics", "cognitive"], lens: ["cognitive"], era: ["modern"] },
    people: ["psy.tversky", "psy.kahneman"],
    evidence: "strong",
    evidenceNote: "The framing effect replicated robustly, including in the large Many Labs project in 2014.",
    body: [
      "In 1981 Tversky and Kahneman described an imagined outbreak of an unusual disease, then labelled the Asian disease in the style of the time, expected to kill 600 people. One group chose between a programme that would save 200 people for certain and one with a one third chance of saving all 600 and two thirds chance of saving none. Most chose the sure thing.",
      "A second group read the same options framed as deaths: with one programme 400 people will die for certain; with the other there is a one third chance nobody dies and two thirds chance all 600 die. Most now chose the gamble. The outcomes are identical; only the description changed.",
      "Framing gains makes people cautious; framing losses makes them take risks, as prospect theory predicts. The effect has been replicated many times. It matters wherever risks are communicated, from doctors describing survival rates to governments explaining policies."
    ],
    links: [
      { to: "psy.heuristics", type: "links-to", why: "Framing is part of the broader research on systematic departures from rational choice." },
      { to: "psy.behavioural-economics", type: "links-to", why: "Framing effects are a cornerstone of behavioural economics and of nudge design." },
      { to: "psy.dual-process", type: "links-to", why: "Framing effects are often attributed to fast, intuitive reactions to words like die and save." }
    ],
    prompts: ["Would you feel differently about a medical treatment with a 90 percent survival rate and one with a 10 percent mortality rate? Why?"],
    recall: [ { q: "What does the framing problem show?", a: "Identical outcomes described as gains lead people to avoid risk, described as losses to seek it." } ]
  },
  {
    id: "psy.festinger-carlsmith", kind: "study", title: "Festinger and Carlsmith's one dollar experiment",
    line: "People paid one dollar to call a dull task fun later rated it more enjoyable than people paid twenty.",
    facets: { field: ["social"], lens: ["cognitive"], era: ["cognitive-revolution", "replication"] },
    people: ["psy.festinger"],
    evidence: "mixed",
    evidenceNote: "The classic finding inspired hundreds of studies, but a large 2024 replication of the induced compliance paradigm it founded found no reliable attitude change.",
    body: [
      "In 1959 Leon Festinger and James Carlsmith had Stanford students spend an hour on tediously dull tasks, such as turning pegs a quarter turn. Then each was asked to tell the next participant that the task was enjoyable, and was paid either one dollar or twenty dollars to do so.",
      "Afterwards, those paid one dollar rated the task as more enjoyable than those paid twenty, and than a control group. Festinger's explanation: twenty dollars was ample reason to lie, but one dollar was not, so the poorly paid students eased their dissonance by persuading themselves the task had been fun.",
      "The study became a textbook classic and launched the induced compliance paradigm, in which people who freely argue against their views shift towards what they argued. Alternative explanations, such as self perception, were proposed early. In 2024 a replication across dozens of laboratories in many countries, using an essay writing version of the paradigm, found no reliable effect. The original remains historically important; its general claim is now uncertain."
    ],
    links: [
      { to: "psy.self-determination", type: "links-to", why: "The study hints that small external reasons leave room for internal ones, a theme later central to motivation research." },
      { to: "psy.reproducibility-project", type: "links-to", why: "The 2024 failure to replicate the paradigm is a recent chapter of the replication story." },
      { to: "psy.operant-conditioning", type: "contrasts", why: "Reinforcement predicts that a bigger reward produces more change; the study claimed the smaller reward did." }
    ],
    prompts: ["Have you ever convinced yourself that something was better than it was because you had already said so out loud?"],
    recall: [ { q: "Who rated the dull task more enjoyable, the one dollar or twenty dollar group?", a: "The one dollar group." } ]
  },
  {
    id: "psy.stroop", kind: "study", title: "The Stroop effect",
    line: "Naming the ink colour of a word is slow when the word names a different colour.",
    facets: { field: ["cognitive", "perception"], lens: ["cognitive"], era: ["early"] },
    evidence: "strong",
    evidenceNote: "One of the most replicated effects in experimental psychology since 1935.",
    body: [
      "In 1935 John Ridley Stroop asked people to name the colour of ink in which words were printed. When the word RED was printed in blue ink, people were slower and made more errors than when naming the colour of neutral marks. For skilled readers, reading is automatic and hard to suppress, so it interferes with the slower, deliberate task.",
      "The effect has been reproduced thousands of times and used in hundreds of variations: with emotional words, with numbers, in children learning to read and in people with brain injuries. It became a standard measure of selective attention and cognitive control.",
      "The Stroop task shows that skills we have practised enough become automatic, and that automatic processes run whether we want them to or not. That is a useful insight for anyone trying to change a habit."
    ],
    links: [
      { to: "psy.working-memory", type: "links-to", why: "Overriding the automatic response draws on executive control, closely tied to working memory." },
      { to: "psy.perception", type: "links-to", why: "The Stroop effect shows meaning intruding on what should be a simple perceptual judgement." },
      { to: "psy.priming", type: "links-to", why: "Like semantic priming, the Stroop effect shows word meanings activating automatically, whether we want them or not." }
    ],
    prompts: ["What skill has become so automatic for you that you cannot switch it off, the way a reader cannot stop reading?"],
    recall: [ { q: "Why is naming the ink colour of RED printed in blue slow?", a: "Reading is automatic and interferes with the slower, deliberate task of naming the colour." } ]
  },
  {
    id: "psy.forgetting-curve", kind: "study", title: "Ebbinghaus's forgetting curve",
    line: "Memory fades fast at first, then more slowly; spaced reviews flatten the curve.",
    facets: { field: ["cognitive", "learning"], lens: ["cognitive"], era: ["founding"] },
    people: ["psy.ebbinghaus"],
    evidence: "strong",
    evidenceNote: "Replicated in a careful 2015 single participant study and consistent with many later studies of forgetting and spacing.",
    body: [
      "Ebbinghaus learned lists of nonsense syllables until he could recite them perfectly, then measured how much time he saved relearning them after delays from twenty minutes to thirty one days. The savings fell steeply in the first hour and day, then levelled off. Forgetting is fast at first and slow later.",
      "He also found that spreading repetitions over several days produced longer lasting memory than massing them on one day, the first experimental evidence for the spacing effect. In 2015 Jaap Murre and Joeri Dros repeated his procedure with one dedicated participant over many hours and obtained a very similar curve.",
      "Meaningful material is forgotten more slowly than nonsense, and the exact shape depends on what is learned. The practical lesson has held for over a century: review soon, then at widening intervals. This site's review scheduler follows that pattern."
    ],
    links: [
      { to: "psy.working-memory", type: "contrasts", why: "Working memory loses information in seconds; the forgetting curve tracks long term memory over days." },
      { to: "psy.cognitive-revolution", type: "leads-to", why: "Ebbinghaus's experimental approach to memory was revived and extended by cognitive psychologists." },
      { to: "psy.structuralism", type: "contrasts", why: "Ebbinghaus measured what he could recall rather than introspecting on its contents, a method that outlasted structuralism." }
    ],
    prompts: ["Think of something you learned and lost. Would a few well timed reviews have kept it?"],
    recall: [ { q: "What shape does the forgetting curve have?", a: "A steep early drop that levels off over time." }, { q: "What is the spacing effect?", a: "Repetitions spread over time produce longer lasting memory than massed repetitions." } ]
  },
  {
    id: "psy.bystander", kind: "study", title: "The bystander effect",
    line: "In the laboratory, more onlookers meant less helping; real world footage tells a more hopeful story.",
    facets: { field: ["social"], lens: ["sociocultural", "cognitive"], era: ["cognitive-revolution", "replication"] },
    evidence: "moderate",
    evidenceNote: "Robust in laboratory studies and weaker in dangerous emergencies; CCTV studies show someone usually helps in real public conflicts.",
    body: [
      "In 1964 the New York Times reported that 38 neighbours watched Kitty Genovese being murdered without helping. That account was later shown to be badly exaggerated: few people saw the attack, some called the police, and one woman went to her. But the story inspired John Darley and Bibb Latané to study why people fail to help.",
      "In their 1968 study, students talking over an intercom heard another participant apparently having a seizure. Alone, most went for help before the seizure ended; when they thought four others could hear, fewer than a third did. Darley and Latané proposed diffusion of responsibility and pluralistic ignorance: everyone looks to others, sees calm, and concludes nothing is wrong.",
      "A 2011 meta analysis confirmed the effect but found it weaker in clearly dangerous emergencies. A 2020 study of CCTV footage of public conflicts in three countries found that someone intervened in about nine out of ten cases, and that more bystanders made it more likely that at least one would help. Each individual may be less likely to act, but crowds often contain a helper."
    ],
    links: [
      { to: "psy.attribution-error", type: "links-to", why: "We blame unhelpful bystanders' character, but the research points to features of the situation." },
      { to: "psy.reproducibility-project", type: "links-to", why: "The Genovese story shows how a misreported event can shape a research field for decades." },
      { to: "psy.milgram", type: "links-to", why: "Both studies ask why decent people fail to act on conscience when others are present or in charge." }
    ],
    prompts: ["In a group emergency, what would help you move from wondering to acting? Naming a specific person to call an ambulance is one known remedy."],
    recall: [ { q: "What is diffusion of responsibility?", a: "When many people are present, each feels less personally responsible for acting." }, { q: "What did the 2020 CCTV study find?", a: "Someone intervened in about nine of ten public conflicts, and more bystanders increased that chance." } ],
    further: ["Kevin Cook, Kitty Genovese (2014)"]
  },
  {
    id: "psy.invisible-gorilla", kind: "study", title: "The invisible gorilla",
    line: "Counting basketball passes, about half of viewers failed to see a person in a gorilla suit walk by.",
    facets: { field: ["perception", "cognitive"], lens: ["cognitive"], era: ["modern"] },
    evidence: "strong",
    evidenceNote: "Inattentional blindness has been replicated widely with many variations since 1999.",
    body: [
      "In 1999 Daniel Simons and Christopher Chabris asked people to watch a short video of players passing basketballs and count the passes made by the team in white. Midway, a person in a gorilla suit walked into the middle of the scene, thumped their chest and walked off. About half the viewers did not notice.",
      "This is inattentional blindness: when attention is fully engaged, unexpected things can go unseen even when we look right at them. Related work on change blindness shows that people often miss large changes in a scene, including a change in the person they are talking to, if the change happens during a brief interruption.",
      "The striking part is not that we miss things but that we are confident we would not. That overconfidence matters for drivers using phones, for eyewitness testimony and for experts scanning images, such as radiologists, who in one study missed a gorilla drawn into a lung scan."
    ],
    links: [
      { to: "psy.misinformation", type: "links-to", why: "If we can miss a gorilla, what eyewitnesses report seeing may be more reconstruction than observation." },
      { to: "psy.consciousness", type: "links-to", why: "The study shows that what reaches awareness is a small, selected part of what reaches the eyes." },
      { to: "psy.stroop", type: "links-to", why: "Both are standard demonstrations of the limits and costs of attention." }
    ],
    prompts: ["What might you be missing at home or work because your attention is fully on something else?"],
    recall: [ { q: "What is inattentional blindness?", a: "Failing to notice an unexpected object when attention is engaged elsewhere." } ],
    further: ["Christopher Chabris and Daniel Simons, The Invisible Gorilla (2010)"]
  },
  {
    id: "psy.patient-hm", kind: "study", title: "Patient H.M.",
    line: "Henry Molaison lost the ability to form new long term memories, yet could still learn new skills.",
    facets: { field: ["biological", "cognitive"], lens: ["biological"], era: ["cognitive-revolution", "modern"] },
    evidence: "strong",
    evidenceNote: "A single case, but exceptionally well documented over decades and confirmed by later patient and animal research.",
    body: [
      "In 1953, to treat severe epilepsy, the surgeon William Scoville removed parts of both medial temporal lobes from 27 year old Henry Molaison, including much of the hippocampus. The seizures lessened. But from then on Henry could not form new lasting memories of events or facts. He could hold a conversation, then forget it within minutes.",
      "Brenda Milner, and later Suzanne Corkin, studied him for over fifty years. Milner found he could improve day by day at a mirror drawing task while having no memory of having done it before. Memory is not one thing: forming new episodic and semantic memories depends on the hippocampus, while learning skills uses other systems.",
      "Known to the world only as H.M. until his death in 2008, Henry was a gentle, cooperative man who contributed more to the science of memory than perhaps anyone else. His case also raises questions about consent and dignity for people who cannot remember agreeing to be studied."
    ],
    links: [
      { to: "psy.working-memory", type: "links-to", why: "Henry's working memory was intact, which helped show that working and long term memory are distinct." },
      { to: "psy.self", type: "links-to", why: "Henry kept his personality and sense of who he was, though his life story stopped growing after 1953." },
      { to: "phil.personal-identity", type: "links-to", why: "Henry's case tests the theory that memory makes us the same person over time." }
    ],
    prompts: ["What would remain of your sense of self if you could not form new memories? What would not?"],
    recall: [ { q: "What could Henry Molaison still learn after his surgery?", a: "New motor skills, such as mirror drawing, without remembering the practice." } ],
    further: ["Suzanne Corkin, Permanent Present Tense (2013)"]
  },
  {
    id: "psy.robbers-cave", kind: "study", title: "The Robbers Cave experiment",
    line: "Two groups of boys at a summer camp turned hostile in competition and reconciled through shared goals.",
    facets: { field: ["social"], lens: ["sociocultural", "evolutionary"], era: ["cognitive-revolution", "replication"] },
    evidence: "contested",
    evidenceNote: "Archival research shows a failed earlier version and active staff manipulation, so the clean story told in textbooks is in doubt.",
    body: [
      "In 1954 Muzafer Sherif and colleagues took about two dozen eleven year old boys to a summer camp at Robbers Cave State Park in Oklahoma. They were split into two groups, who named themselves the Rattlers and the Eagles. Competitions for prizes led to name calling, flag burning and raids. The conflict eased when the groups had to work together on shared problems, such as restoring the camp's water supply. Sherif called these superordinate goals.",
      "The study became a textbook account of how competition for scarce resources creates prejudice, and how cooperation can heal it. Gina Perry's archival research told a messier story. In an earlier 1953 attempt the boys refused to turn on each other and suspected they were being manipulated, and the study was abandoned. At Robbers Cave, staff did much to provoke the conflict.",
      "The core idea, that shared goals can reduce hostility between groups, is supported by other research on contact between groups. The single study is less clean than its reputation."
    ],
    links: [
      { to: "psy.conformity", type: "links-to", why: "Group norms within each camp group shaped how far boys went in the conflict." },
      { to: "psy.stanford-prison", type: "links-to", why: "Both studies relied on staff behaviour that later archival work showed to be far from neutral." },
      { to: "psy.reproducibility-project", type: "links-to", why: "Robbers Cave shows how much the published version of a study can leave out." }
    ],
    prompts: ["Where have you seen a shared task bring two quarrelling sides together, perhaps siblings or colleagues?"],
    recall: [ { q: "What are superordinate goals?", a: "Goals both groups need and can achieve only together." } ],
    further: ["Gina Perry, The Lost Boys (2018)"]
  },
  {
    id: "psy.reproducibility-project", kind: "study", title: "The Reproducibility Project and the replication crisis",
    line: "When a hundred psychology studies were repeated in 2015, only about a third gave clearly the same result.",
    facets: { field: ["social", "cognitive"], lens: ["cognitive"], era: ["replication"] },
    evidence: "moderate",
    evidenceNote: "Several large projects agree that many published findings are weaker than reported, though the exact replication rate is debated.",
    body: [
      "In 2015 the Open Science Collaboration, about 270 researchers led by Brian Nosek, repeated 100 studies published in three leading psychology journals in 2008. Almost all the originals had reported significant results. Only about 36 percent of the repetitions did, and the average effect was about half the original size. Cognitive psychology fared better than social psychology.",
      "Critics argued that some repetitions differed from the originals and that a single repetition is itself noisy. But other projects, such as the Many Labs studies and a 2018 attempt to replicate social science papers in Nature and Science, found similar patterns. Causes include small samples, publishing mainly positive results, and flexible analysis, sometimes called p hacking, where researchers try many analyses until one crosses the threshold for significance.",
      "Reforms followed: preregistering hypotheses and analyses before collecting data, registered reports that journals accept before results are known, larger samples, shared data and multi site collaborations. Psychology is now one of the fields most open about its own weaknesses. The evidence labels on this site exist because of this history."
    ],
    links: [
      { to: "psy.heuristics", type: "links-to", why: "Researchers are human too: confirmation bias and motivated reasoning help explain how weak findings got published." },
      { to: "phil.falsification", type: "links-to", why: "Preregistration puts Popper's demand into practice: state in advance what result would count against you." },
      { to: "phil.paradigm", type: "links-to", why: "Some describe the replication crisis as a Kuhnian crisis in which accumulated anomalies force a change in how science is done." }
    ],
    prompts: ["How do you decide whether to trust a striking claim you read online about the mind? What would you check first?"],
    recall: [ { q: "About what share of the 100 studies replicated in 2015?", a: "About 36 percent gave clearly significant results again." }, { q: "What is preregistration?", a: "Publicly stating hypotheses and analysis plans before collecting data." } ],
    further: ["Stuart Ritchie, Science Fictions (2020)"]
  }
  );

  /* ------------------------------------------------------------------ Modules */
  var MODULES = [
    { id: "mod.psy.memory", title: "How memory works", kind: "field",
      blurb: "From Ebbinghaus's nonsense syllables to false memories: why remembering is rebuilding, and how to make learning last.",
      path: ["psy.memory", "psy.ebbinghaus", "psy.forgetting-curve", "psy.working-memory", "psy.patient-hm", "psy.misinformation", "psy.loftus"] },
    { id: "mod.psy.fast-slow", title: "Thinking fast and slow", kind: "field",
      blurb: "The shortcuts and biases of everyday judgement, and the theory of choice that won a psychologist the Nobel prize in economics.",
      path: ["psy.dual-process", "psy.heuristics", "psy.anchoring", "psy.confirmation-bias", "psy.asian-disease", "psy.prospect-theory", "psy.loss-aversion", "psy.kahneman", "psy.tversky"] },
    { id: "mod.psy.social", title: "The social animal", kind: "field",
      blurb: "How other people shape what we do and believe, through classic studies read with modern scepticism.",
      path: ["psy.conformity", "psy.asch", "psy.milgram", "psy.stanford-prison", "psy.attribution-error", "psy.bystander", "psy.robbers-cave", "psy.cognitive-dissonance", "psy.festinger-carlsmith"] },
    { id: "mod.psy.growing-up", title: "Growing up", kind: "field",
      blurb: "Attachment, thinking and understanding other minds: how children develop, and what the evidence actually says.",
      path: ["psy.attachment", "psy.bowlby", "psy.harlow-monkeys", "psy.strange-situation", "psy.cognitive-development", "psy.piaget", "psy.zpd", "psy.vygotsky", "psy.theory-of-mind"] },
    { id: "mod.psy.personality", title: "Personality", kind: "field",
      blurb: "From Jung's types to the Big Five: how people differ, how we change across life, and which tests to trust.",
      path: ["psy.big-five", "psy.introversion", "psy.jung", "psy.self", "psy.psychosocial-stages", "psy.defence-mechanisms", "psy.self-efficacy"] },
    { id: "mod.psy.learning", title: "How we learn", kind: "field",
      blurb: "Conditioning, consequences, copying and belief in ourselves: the main routes by which behaviour is learned.",
      path: ["psy.classical-conditioning", "psy.pavlov", "psy.little-albert", "psy.operant-conditioning", "psy.skinner", "psy.social-learning", "psy.bobo-doll", "psy.self-efficacy", "psy.growth-mindset"] },
    { id: "mod.psy.seeing", title: "Seeing and attending", kind: "field",
      blurb: "Perception as the brain's best guess, and attention as the narrow spotlight that decides what we notice.",
      path: ["psy.perception", "psy.gestalt", "psy.attention", "psy.invisible-gorilla", "psy.stroop", "psy.predictive-processing", "psy.consciousness"] },
    { id: "mod.psy.motivation", title: "What moves us", kind: "construct",
      blurb: "Needs, autonomy, absorption and the pull of rewards: what research says about motivation.",
      path: ["psy.hierarchy-of-needs", "psy.maslow", "psy.self-determination", "psy.operant-conditioning", "psy.flow", "psy.csikszentmihalyi", "psy.marshmallow"] },
    { id: "mod.psy.schools", title: "The great schools", kind: "school",
      blurb: "Seven frames that shaped psychology from 1879 to the 1960s, each a reaction to the one before.",
      path: ["psy.structuralism", "psy.functionalism", "psy.psychoanalysis", "psy.behaviourism", "psy.gestalt", "psy.humanistic", "psy.cognitive-revolution"] },
    { id: "mod.psy.lenses", title: "Newer lenses", kind: "school",
      blurb: "The brain, evolution, culture, economics and flourishing: the frames most psychologists look through today.",
      path: ["psy.neuroscience", "psy.evolutionary", "psy.sociocultural", "psy.behavioural-economics", "psy.positive-psychology", "psy.predictive-processing"] },
    { id: "mod.psy.founders", title: "The founders", kind: "thinker",
      blurb: "The people who turned questions about the mind into a science, between Leipzig in 1879 and the First World War.",
      path: ["psy.wundt", "psy.william-james", "psy.ebbinghaus", "psy.freud", "psy.pavlov", "psy.jung", "psy.watson"] },
    { id: "mod.psy.twentieth", title: "Twentieth century minds", kind: "thinker",
      blurb: "Nine psychologists whose ideas reached far beyond the laboratory, into classrooms, clinics and boardrooms.",
      path: ["psy.skinner", "psy.piaget", "psy.vygotsky", "psy.maslow", "psy.rogers", "psy.festinger", "psy.bandura", "psy.beck", "psy.kahneman"] },
    { id: "mod.psy.eras", title: "Psychology through time", kind: "era",
      blurb: "One landmark from each era, from the first laboratory to the replication era, to see how the questions and methods changed.",
      path: ["psy.structuralism", "psy.forgetting-curve", "psy.psychoanalysis", "psy.little-albert", "psy.cognitive-revolution", "psy.milgram", "psy.prospect-theory", "psy.positive-psychology", "psy.reproducibility-project"] },
    { id: "mod.psy.replication", title: "The replication crisis", kind: "journey",
      blurb: "A walk through famous findings that failed, shrank or were reinterpreted, and what good evidence looks like now.",
      path: ["psy.reproducibility-project", "psy.priming", "psy.ego-depletion", "psy.power-posing", "psy.facial-feedback", "psy.stanford-prison", "psy.rosenhan", "psy.marshmallow", "psy.growth-mindset"] },
    { id: "mod.psy.philosophy", title: "Psychology meets philosophy", kind: "journey",
      blurb: "Where experiments meet old questions: consciousness, the self, free will, Stoic calm and how we know anything at all.",
      path: ["psy.william-james", "psy.consciousness", "psy.libet", "psy.self", "psy.mindfulness", "psy.cbt", "psy.confirmation-bias", "psy.perception", "psy.behaviourism"] },
    { id: "mod.psy.wellbeing", title: "Emotions and wellbeing", kind: "field",
      blurb: "The science of feelings, low mood, worry and flourishing, explained with care. Educational only; if something weighs on you, talk to someone you trust or a doctor.",
      path: ["psy.emotion", "psy.james-lange", "psy.anxiety", "psy.depression", "psy.learned-helplessness", "psy.cbt", "psy.mindfulness", "psy.flow", "psy.self-determination"] }
  ];

  /* ------------------------------------------------------------------ Domain */
  g.KLS_DATA.psychology = {
    domain: {
      id: "psychology", name: "Psychology",
      tagline: "How minds work, with an honest label on what we actually know.",
      intro: [
        "Psychology is the science of mind and behaviour: how we perceive, remember, feel, decide, grow up and live with one another. Here it is laid out as a web of constructs, theories, schools of thought, psychologists and landmark studies. Every empirical idea carries an evidence label. Strong means replicated many times by independent teams. Moderate means good support with real caveats. Mixed means some solid results and some failures. Contested means experts disagree about what the evidence shows, or the method is seriously questioned. Weak means thin evidence, such as a single case or small samples. Failed means large, careful replications did not find the effect. A label describes the evidence, not the importance: some of the most instructive studies here are the ones that failed.",
        "Use the filters to narrow the web by kind, by field, by lens (the frame of explanation, from biological to sociocultural) or by era. Modules are short routes through the ideas in a sensible order; The replication crisis and Psychology meets philosophy are good places to start. The Mind Web clusters ideas by field, and dashed lines lead across to philosophy, physics and the English words that psychology gave us. This is a place for understanding, not diagnosis: the clinical ideas are explained as science, never as advice."
      ]
    },
    kinds: [
      { id: "construct", label: "Construct", plural: "Constructs" },
      { id: "theory", label: "Theory", plural: "Theories" },
      { id: "school", label: "School", plural: "Schools" },
      { id: "psychologist", label: "Psychologist", plural: "Psychologists" },
      { id: "study", label: "Study", plural: "Studies" }
    ],
    facets: [
      { id: "field", label: "Field", values: [
        { id: "cognitive", label: "Cognitive", blurb: "Memory, attention, reasoning, language and decision making." },
        { id: "social", label: "Social", blurb: "How other people shape what we think, feel and do." },
        { id: "developmental", label: "Developmental", blurb: "How minds change from infancy through old age." },
        { id: "personality", label: "Personality", blurb: "Stable differences between people, and the self." },
        { id: "clinical", label: "Clinical", blurb: "The science of mental distress and its treatment, explained without diagnosis." },
        { id: "biological", label: "Biological", blurb: "Brain, body, hormones and genes in mental life." },
        { id: "behavioural-economics", label: "Behavioural economics", blurb: "How real people make choices about money, risk and time." },
        { id: "positive", label: "Positive", blurb: "Flourishing, motivation, engagement and meaning." },
        { id: "perception", label: "Perception", blurb: "How the senses and brain build a picture of the world." },
        { id: "learning", label: "Learning", blurb: "Conditioning, observation, practice and the beliefs that help us learn." }
      ] },
      { id: "lens", label: "Lens", values: [
        { id: "biological", label: "Biological", blurb: "Explain the mind through brain, body and genes." },
        { id: "behavioural", label: "Behavioural", blurb: "Explain behaviour through learning and its consequences." },
        { id: "cognitive", label: "Cognitive", blurb: "Explain the mind as information processing: representations and rules." },
        { id: "psychodynamic", label: "Psychodynamic", blurb: "Explain the mind through unconscious conflict and early relationships." },
        { id: "humanistic", label: "Humanistic", blurb: "Understand people as whole persons seeking growth and meaning." },
        { id: "evolutionary", label: "Evolutionary", blurb: "Ask what a mental trait was for in our ancestral past." },
        { id: "sociocultural", label: "Sociocultural", blurb: "Explain the mind through culture, language and relationships." }
      ] },
      { id: "era", label: "Era", values: [
        { id: "founding", label: "Founding (to 1900)", blurb: "Laboratories, introspection and the first experiments on memory." },
        { id: "early", label: "Early (1900 to 1950)", blurb: "The great schools: psychoanalysis, behaviourism, Gestalt." },
        { id: "cognitive-revolution", label: "Cognitive revolution (1950 to 1980)", blurb: "The mind returns as information processing; classic social experiments." },
        { id: "modern", label: "Modern (1980 to 2010)", blurb: "Neuroscience, behavioural economics and positive psychology." },
        { id: "replication", label: "Replication era (2010 onward)", blurb: "Large replications test the classics; open science reforms." }
      ] }
    ],
    groupBy: "field",
    nodes: N,
    modules: MODULES
  };
})(typeof window !== 'undefined' ? window : globalThis);

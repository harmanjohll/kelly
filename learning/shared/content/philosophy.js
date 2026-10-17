/* learning/shared/content/philosophy.js
   Philosophy domain for Kelly's Learning Studio.
   Schema: learning/docs/content-schema.md. Validate with: node learning/docs/validate.js philosophy */
(function (g) {
  g.KLS_DATA = g.KLS_DATA || {};
  g.KLS_DATA.philosophy = {
    domain: {
      id: 'philosophy',
      name: 'Philosophy',
      tagline: "Old questions, many traditions, and the threads that tie them together.",
      intro: [
        "Philosophy is what happens when a question refuses to go away. What can I know? Who am I? How should I live? Is anything free? Thinkers in Athens, Lu, Varanasi, Baghdad, Kyoto, Accra and Paris have pressed on these questions for two and a half thousand years, often reaching surprisingly similar places by very different roads. This domain gathers their ideas as cards you can wander through at your own pace. Each idea comes with its strongest objection, because a position you have only seen defended is a position you do not yet understand.",
        "There are three ways in. Filters let you narrow by kind (ideas, thinkers, schools), by branch, by era and by tradition, so you can ask for, say, ethics from China in the ancient world. Modules are short guided routes of four to nine cards in a sensible teaching order, built around a question, a period, a tradition or a group of thinkers. The Mind Web shows every card as a point and every connection as a line; tap a card to bring it to the centre and see what it touches, including dashed lines out to physics, psychology and English. Read the reason given for each connection. That is usually where the understanding lives."
      ]
    },
    kinds: [
      { id: 'idea', label: 'Idea', plural: 'Ideas' },
      { id: 'thinker', label: 'Thinker', plural: 'Thinkers' },
      { id: 'school', label: 'School', plural: 'Schools' }
    ],
    facets: [
      { id: 'branch', label: 'Branch', values: [
        { id: 'metaphysics', label: 'Metaphysics', blurb: "What exists, and what is it ultimately like?" },
        { id: 'epistemology', label: 'Knowledge', blurb: "What can we know, and how do we know that we know it?" },
        { id: 'mind', label: 'Mind and self', blurb: "What is a mind, what is consciousness, and what is a person?" },
        { id: 'ethics', label: 'Ethics', blurb: "How should we live, and what makes an action right or wrong?" },
        { id: 'political', label: 'Political philosophy', blurb: "What makes power legitimate and a society just?" },
        { id: 'logic-language', label: 'Logic and language', blurb: "How do reasoning and words work, and how do they hook onto the world?" },
        { id: 'science', label: 'Philosophy of science', blurb: "What makes science science, and what does a theory tell us about reality?" },
        { id: 'religion', label: 'Philosophy of religion', blurb: "Is there a God or an ultimate reality, and what follows if there is or is not?" },
        { id: 'aesthetics', label: 'Aesthetics', blurb: "What is beauty, and why does art move us?" },
        { id: 'meaning', label: 'Meaning and existence', blurb: "Freedom, death, absurdity and what could make a life worth living." }
      ] },
      { id: 'era', label: 'Era', values: [
        { id: 'ancient', label: 'Ancient', blurb: "Before about 500 CE: the Greeks, the Hundred Schools of China, the Buddha and the Upanishads." },
        { id: 'medieval', label: 'Medieval', blurb: "About 500 to 1500: Islamic, Christian, Jewish, Indian and Japanese thinkers working inside great religions." },
        { id: 'early-modern', label: 'Early modern', blurb: "About 1500 to 1800: the scientific revolution and the Enlightenment." },
        { id: 'modern', label: 'Nineteenth century', blurb: "After Kant: Hegel, Marx, Mill, Kierkegaard and Nietzsche." },
        { id: 'contemporary', label: 'Twentieth century on', blurb: "From phenomenology and analytic philosophy to today." }
      ] },
      { id: 'tradition', label: 'Tradition', values: [
        { id: 'western', label: 'Western', blurb: "From the Greeks through Europe and the Americas." },
        { id: 'chinese', label: 'Chinese', blurb: "Confucian, Daoist, Mohist and later Neo Confucian thought." },
        { id: 'indian', label: 'Indian', blurb: "The Upanishads, Vedanta and the Buddhist schools that began in India." },
        { id: 'islamic', label: 'Islamic', blurb: "Philosophy in the Islamic world, in Arabic and Persian, from Baghdad to Cordoba." },
        { id: 'african', label: 'African', blurb: "Ubuntu and modern African philosophy." },
        { id: 'japanese', label: 'Japanese', blurb: "Zen thought and the Kyoto School." }
      ] }
    ],
    groupBy: 'branch',
    nodes: [

      /* ===== Ideas: metaphysics and mind ===== */
      {
        id: 'phil.being', kind: 'idea', title: 'Being and substance',
        line: "What does it mean for something to exist, and what are things ultimately made of?",
        facets: { branch: ['metaphysics'], era: ['ancient', 'early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "The oldest question in philosophy may also be the plainest: what is there? Parmenides, writing in the fifth century BCE, argued that what is, is, and what is not cannot even be thought; change and plurality, he concluded, must be illusions. Almost everyone since has tried to find a way out of his argument without losing its rigour.",
          "Aristotle's way out was the idea of substance (<em>ousia</em>). Some things, like colours, sizes and moods, exist only as features of something else. Substances are the things that have those features without themselves belonging to anything: this horse, this person. A substance can change, gaining and losing qualities, while remaining the same thing. For nearly two thousand years this was the default picture of reality.",
          "Spinoza pushed the idea to its limit. If a substance is what depends on nothing else, there can be only one, which he called God or Nature. Heidegger later complained that the whole tradition had asked what kinds of beings there are while forgetting to ask what it means to be at all."
        ],
        people: ['phil.aristotle', 'phil.spinoza', 'phil.heidegger'],
        links: [
          { to: 'phil.emptiness', type: 'contrasts', why: "Nagarjuna's emptiness denies precisely what substance asserts: that anything exists through its own nature, independently of everything else." },
          { to: 'phil.ship-of-theseus', type: 'links-to', why: "If a substance is a thing that survives change, the ship puzzle asks how much change it can survive." },
          { to: 'phil.realism', type: 'links-to', why: "Asking what there is leads straight to asking whether it is there independently of our minds." }
        ],
        objection: "Process thinkers, from Heraclitus and the Buddhists to Alfred North Whitehead, argue that there are no enduring substances at all, only events and processes; the thing that seems to persist through change is a convenient fiction.",
        prompts: ["Pick an object near you. Is it a thing that undergoes changes, or a pattern of changes that we have agreed to call a thing?"],
        recall: [
          { q: "What did Aristotle mean by a substance?", a: "Something that exists in its own right and bears qualities, such as this horse or this person, rather than existing only as a feature of something else." },
          { q: "How many substances did Spinoza think there are?", a: "Exactly one, which he called God or Nature; everything else is a way that one substance exists." }
        ],
        further: ['Aristotle, Metaphysics, Book VII', 'Martin Heidegger, Being and Time (1927)']
      },
      {
        id: 'phil.forms', kind: 'idea', title: 'Universals and the Forms',
        line: "Two red things share redness. Is that shared thing real, and where does it live?",
        facets: { branch: ['metaphysics'], era: ['ancient', 'medieval'], tradition: ['western'] },
        body: [
          "A ripe tomato and a fire engine are different objects, yet both are red. Two triangles of different sizes are both triangles. Philosophers call these shared features universals, and ask a deceptively simple question: does redness, or triangularity, exist in its own right, or only as a word we apply to similar things?",
          "Plato's answer was bold. Beyond the changing world of particular things there are Forms: perfect, unchanging, eternal patterns such as Justice, Beauty, Equality and the Good. Particular things are what they are by participating in the Forms, always imperfectly. We never see a perfect circle, but we understand one, and Plato took that understanding as a sign that the mind can reach a reality the senses cannot.",
          "Aristotle kept universals but brought them down to earth: redness exists, but only in red things. Medieval nominalists such as William of Ockham went further and said that only particulars exist and universals are names. The debate is still alive in the philosophy of mathematics, where many mathematicians feel they discover their results rather than invent them."
        ],
        people: ['phil.plato', 'phil.aristotle'],
        links: [
          { to: 'phil.being', type: 'part-of', why: "The question of universals is one part of the larger question of what exists." },
          { to: 'phil.rationalism', type: 'leads-to', why: "If the deepest truths concern Forms the senses cannot reach, then reason, not observation, must be the road to knowledge." },
          { to: 'phil.beauty', type: 'links-to', why: "Plato's Form of Beauty is the summit of the ladder of love in the Symposium, the source of every lesser beauty." },
          { to: 'phil.realism', type: 'links-to', why: "Belief in real universals is one of the oldest kinds of realism, the view that what we think about exists independently of our thinking." }
        ],
        objection: "Plato saw it himself in his dialogue Parmenides. If large things are large by sharing in the Form of Largeness, then the large things and the Form together seem to need a further Form to explain what they share, and so on without end. This is known as the Third Man argument.",
        prompts: ["When you recognise that a chihuahua and a wolfhound are both dogs, what exactly are you recognising?"],
        recall: [
          { q: "What are Plato's Forms?", a: "Perfect, unchanging, eternal patterns such as Beauty or Equality, in which particular things imperfectly share." },
          { q: "What does a nominalist say about universals?", a: "Only particular things exist; universals are just names for groups of similar things." }
        ],
        further: ['Plato, Phaedo', 'Plato, Republic, Books VI and VII']
      },
      {
        id: 'phil.causation', kind: 'idea', title: 'Causation',
        line: "We see one thing follow another. What, if anything, makes the first produce the second?",
        facets: { branch: ['metaphysics', 'science'], era: ['ancient', 'medieval', 'early-modern', 'contemporary'], tradition: ['western', 'islamic'] },
        body: [
          "Nothing seems more obvious than causes. The match causes the flame; the cue ball causes the red ball to move. Aristotle distinguished four kinds of explanation, which he called causes: what a thing is made of, its form, what set it in motion, and what it is for. Modern science kept mainly the third, the efficient cause, and that is what most of us now mean by the word.",
          "In the eleventh century Al Ghazali noticed something unsettling. When cotton touches fire we observe the burning follow the contact, but we never observe the fire making the cotton burn. For him the connection was God's habitual creation, which God could suspend. Seven centuries later David Hume made the same observation without the theology: all we ever see is one kind of event regularly followed by another, and the felt necessity is a habit of our own minds.",
          "Philosophers since have tried to say what bare regularity leaves out: counterfactual dependence (had the match not been struck, there would have been no flame), mechanisms, the results of intervening. Quantum physics adds a twist. Entangled particles show correlations that no local causal story can explain, yet they cannot be used to send a signal, which strains our everyday picture of causes pushing effects."
        ],
        people: ['phil.aristotle', 'phil.ghazali', 'phil.hume'],
        links: [
          { to: 'phil.determinism', type: 'leads-to', why: "If every event has a sufficient cause, the result is determinism: the whole future follows from the past." },
          { to: 'phil.induction', type: 'links-to', why: "Hume's doubts about necessary connection are the same doubts that create the problem of induction." },
          { to: 'phys.bell', type: 'links-to', why: "Bell's theorem shows that quantum correlations cannot be explained by any local causes, forcing a rethink of what a causal connection can be." },
          { to: 'phys.entanglement', type: 'links-to', why: "Entangled particles are correlated more strongly than any local cause allows, yet neither measurement can be used to influence the other, a case that fits neither 'cause' nor 'coincidence' comfortably." }
        ],
        objection: "Regularity is not enough for causation. Night is always followed by day, yet night does not cause day; both are produced by the turning Earth. Any account in Hume's spirit must explain how real causes differ from mere regular succession.",
        prompts: ["Think of the last time you blamed something for causing a problem. What did you actually observe, and what did your mind add?"],
        recall: [
          { q: "What did Hume say we actually observe when one event causes another?", a: "Only that events of one kind are regularly followed by events of another; the necessity is a habit of expectation in us." },
          { q: "Which earlier thinker made a similar point using cotton and fire?", a: "Al Ghazali, in The Incoherence of the Philosophers." }
        ],
        further: ['David Hume, An Enquiry Concerning Human Understanding (1748), Section VII', 'Al Ghazali, The Incoherence of the Philosophers, Seventeenth Discussion']
      },
      {
        id: 'phil.determinism', kind: 'idea', title: 'Determinism',
        line: "Every event is fixed by what came before it, together with the laws of nature.",
        facets: { branch: ['metaphysics', 'science'], era: ['ancient', 'early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Determinism is the view that the state of the world at any moment, together with the laws of nature, fixes every later state. Nothing could have happened otherwise than it did unless the past or the laws had been different. The Stoics held a version of it as fate; Spinoza built it into the foundations of his system.",
          "Its most famous image comes from Pierre Simon Laplace in 1814: an intellect that knew the position of every particle and every force acting on it would see the future as clearly as the past. Newtonian physics made this seem not only possible but likely.",
          "Quantum mechanics complicated the picture. On the standard reading, some events, such as the moment a particular atom decays, have no prior cause that fixes them; only their probabilities are determined. But the interpretation matters. Bohm's pilot wave theory and the Everett many worlds view are both fully deterministic, so physics alone has not settled the question.",
          "Determinism is not the same as predictability. A chaotic system like the weather may be strictly deterministic and still impossible to forecast far ahead."
        ],
        people: ['phil.spinoza'],
        links: [
          { to: 'phil.free-will', type: 'contrasts', why: "If everything is fixed in advance, it is hard to see where a free choice could enter." },
          { to: 'phil.compatibilism', type: 'leads-to', why: "Compatibilism is the attempt to accept determinism and keep freedom and responsibility anyway." },
          { to: 'phys.randomness', type: 'contrasts', why: "If quantum randomness is genuine, some events are fixed by nothing before them, which is exactly what determinism denies." },
          { to: 'phys.many-worlds', type: 'links-to', why: "The many worlds interpretation restores strict determinism to quantum theory, at the price of every possible outcome happening in some branch." },
          { to: 'phys.pilot-wave', type: 'links-to', why: "Bohm's pilot wave theory is a deterministic version of quantum mechanics: particles have definite positions guided by a wave, and the apparent randomness reflects our ignorance." }
        ],
        objection: "On the most widely taught reading of quantum mechanics, determinism is simply false at the fundamental level: identical situations can have different outcomes. Defenders must rely on deterministic interpretations that remain contested.",
        prompts: ["If physics turned out to be fully deterministic tomorrow, would anything about how you live actually change?"],
        recall: [
          { q: "What is Laplace's demon?", a: "An imagined intellect that, knowing every particle and force at one moment, could calculate the entire future and past." },
          { q: "Is determinism the same as predictability?", a: "No. A chaotic system can be deterministic yet unpredictable in practice." }
        ],
        further: ['Pierre Simon Laplace, A Philosophical Essay on Probabilities (1814)']
      },
      {
        id: 'phil.free-will', kind: 'idea', title: 'Free will',
        line: "Could you have chosen otherwise, and does praise or blame depend on it?",
        facets: { branch: ['metaphysics', 'ethics'], era: ['ancient', 'medieval', 'early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "When you chose this card over another, it felt as if you could have done otherwise. The problem of free will asks whether that feeling is accurate, and whether anything important hangs on it. Most people think something does: praise, blame, punishment and gratitude all seem to assume that we are the authors of what we do.",
          "There are three broad positions. Libertarians (no relation to the political term) say we are free, and that freedom requires our choices not to be fixed by prior causes. Hard determinists say our choices are fixed, so we are not free in the way we assume. Compatibilists say freedom never required an undetermined choice, only acting from your own reasons without compulsion.",
          "The libertarian faces a dilemma. If a choice is not settled by my character and reasons, what does settle it? If nothing does, the choice looks random, and randomness is no more mine than determinism is. Quantum indeterminacy does not obviously help: a coin toss in the brain is not self control.",
          "Neuroscience entered the debate with Benjamin Libet's experiments on the timing of decisions in 1983. They are often cited as disproving free will; what they actually show is far more modest, and still disputed."
        ],
        people: ['phil.augustine', 'phil.kant', 'phil.sartre'],
        links: [
          { to: 'psy.libet', type: 'links-to', why: "Libet found brain activity building before people reported deciding to move, a result often claimed against free will but open to several readings." },
          { to: 'phys.randomness', type: 'links-to', why: "If quantum events are truly random the world is not deterministic, yet randomness in the brain would not obviously make a choice yours." },
          { to: 'psy.william-james', type: 'links-to', why: "William James, troubled by determinism, wrote in his diary in 1870 that his first act of free will would be to believe in free will." }
        ],
        objection: "The luck objection, aimed at libertarian freedom: if nothing about you settles an undetermined choice, it is a matter of chance, and chance gives you no more control than determinism does.",
        prompts: ["Recall a decision you are proud of. What would have to be true for it not to have been yours?"],
        recall: [
          { q: "What are the three main positions on free will?", a: "Libertarianism (we are free and our choices are undetermined), hard determinism (choices are determined, so we are not free) and compatibilism (freedom is compatible with determinism)." },
          { q: "What is the luck objection?", a: "An undetermined choice seems to be settled by chance, and chance is no more under your control than determinism." }
        ],
        further: ['Daniel Dennett, Freedom Evolves (2003)', 'Thomas Nagel, What Does It All Mean? (1987), chapter 6']
      },
      {
        id: 'phil.compatibilism', kind: 'idea', title: 'Compatibilism',
        line: "Freedom means acting from your own reasons, not escaping cause and effect.",
        facets: { branch: ['metaphysics', 'ethics'], era: ['ancient', 'early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Compatibilism holds that free will and determinism can both be true. Everything turns on what we mean by freedom. If freedom means an uncaused choice, determinism rules it out. But perhaps that was never what mattered. What matters, compatibilists say, is that your action flows from your own desires and reasoning, and not from a gun at your head, a compulsion or a manipulator.",
          "The idea is old. The Stoic Chrysippus, as Cicero reports, compared a person to a cylinder pushed down a slope: the push starts it moving, but how it rolls depends on its own shape. Hobbes and Hume gave modern versions, and surveys suggest most professional philosophers today are compatibilists of some kind.",
          "Harry Frankfurt added two refinements. Free persons, he argued, can step back and want the desires they act on; an addict who hates his craving acts less freely than someone who endorses her desires. He also described cases in which a person could not have done otherwise and yet seems fully responsible, suggesting that the ability to do otherwise was never the key."
        ],
        people: ['phil.hume'],
        links: [
          { to: 'phil.free-will', type: 'part-of', why: "Compatibilism is one of the three main answers to the problem of free will." },
          { to: 'phil.kant', type: 'contrasts', why: "Kant dismissed compatibilism as a wretched subterfuge, insisting that moral responsibility needs a freedom outside the chain of natural causes." },
          { to: 'psy.libet', type: 'links-to', why: "For a compatibilist, Libet's finding that brain processes precede awareness is no threat: a choice can be caused by brain activity and still be yours." }
        ],
        objection: "The consequence argument, set out by Peter van Inwagen: if determinism is true, our acts follow from the remote past and the laws of nature, neither of which is up to us, so our acts are not up to us either.",
        prompts: ["Is a person who acts from a character shaped by their upbringing acting freely? What would a freer version of them look like?"],
        recall: [
          { q: "According to compatibilism, what does freedom consist in?", a: "Acting from your own desires and reasons without compulsion, even if those desires were themselves caused." },
          { q: "What is the consequence argument?", a: "If our acts follow from the past and the laws of nature, and neither is up to us, then our acts are not up to us." }
        ],
        further: ["Harry Frankfurt, 'Freedom of the Will and the Concept of a Person' (1971)", 'Peter van Inwagen, An Essay on Free Will (1983)']
      },
      {
        id: 'phil.realism', kind: 'idea', title: 'Realism and antirealism',
        line: "Is there a world out there, fixed whether or not we look, that our best theories describe?",
        facets: { branch: ['metaphysics', 'science'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Realism, in its general form, is the view that the world exists and has the features it has independently of our minds, our language and our observations. The Moon is there when nobody looks. Most of us are realists by default.",
          "The hard questions arise in particular areas. A scientific realist says our best theories are approximately true, including what they say about things we cannot see, such as electrons and fields. Antirealists disagree. Instrumentalists treat theories as tools for prediction; Bas van Fraassen's constructive empiricism says science aims only to get the observable parts right. The strongest argument for realism, put by Hilary Putnam, is that it is the only view that does not make the success of science a miracle.",
          "Quantum physics put realism under unusual pressure. Einstein insisted that physics should describe reality as it is, independent of observation; Bohr was more cautious about what a quantum description says apart from measurement. In 1964 John Bell showed that any theory in which measurement results are fixed in advance by local causes must disagree with quantum mechanics in certain experiments. The experiments, recognised by the 2022 Nobel Prize in Physics, sided with quantum mechanics. Something in our everyday picture has to give, though physicists still argue about what."
        ],
        people: ['phys.einstein', 'phys.bohr'],
        links: [
          { to: 'phys.measurement-problem', type: 'links-to', why: "The measurement problem asks what is real before a measurement, which is the realism question in its sharpest physical form." },
          { to: 'phys.bell', type: 'links-to', why: "Bell's theorem and its experimental tests rule out any theory where outcomes are fixed in advance by local causes, so a simple realism cannot survive unchanged." },
          { to: 'phys.copenhagen', type: 'contrasts', why: "The Copenhagen view, in many of its forms, declines to say what exists between measurements, a stance often read as antirealist." },
          { to: 'phys.qbism', type: 'contrasts', why: "QBism treats the quantum state as an agent's personal degrees of belief rather than a description of the world, so it is antirealist about the wavefunction while still holding that there is a world." }
        ],
        objection: "The pessimistic induction, pressed by Larry Laudan: many successful scientific theories of the past, from the luminiferous ether to caloric fluid, turned out to be false, so we should expect our current ones to be false too.",
        prompts: ["Do you believe in electrons the way you believe in your kitchen table? If not, what is the difference?"],
        recall: [
          { q: "What is scientific realism?", a: "The view that our best scientific theories are approximately true, including about unobservable things like electrons." },
          { q: "What is the 'no miracles' argument?", a: "Realism is the only view that does not make the predictive success of science a miracle." }
        ],
        further: ['Adam Becker, What Is Real? (2018)', 'Bas van Fraassen, The Scientific Image (1980)']
      },
      {
        id: 'phil.ship-of-theseus', kind: 'idea', title: 'The ship of Theseus',
        line: "Replace every plank of a ship, one by one. Is it still the same ship?",
        facets: { branch: ['metaphysics', 'mind'], era: ['ancient', 'early-modern'], tradition: ['western'] },
        body: [
          "Plutarch reports that the Athenians preserved the ship in which Theseus returned from Crete, replacing its timbers as they rotted, until philosophers argued over whether it was still the same ship. Thomas Hobbes later sharpened the puzzle: suppose someone kept every discarded plank and reassembled them. Now there are two ships. Which one is Theseus's?",
          "Each answer has a cost. If the continuously repaired ship is the original, identity follows continuity of form and use, and the reassembled ship is a mere copy even though it is made of the very same timber. If the reassembled ship is the original, then the ship the Athenians cared for every day stopped being Theseus's at some unmarked moment.",
          "The puzzle matters because you are in a similar position. The cells of your body are replaced at different rates, and most of the atoms in you now are not the ones you were born with. Whatever keeps you the same person over time, it is probably not the stuff."
        ],
        links: [
          { to: 'phil.personal-identity', type: 'links-to', why: "The ship is a warm up for the harder case of persons: what keeps you the same you while your body and mind change?" },
          { to: 'phil.presocratics', type: 'links-to', why: "Heraclitus's river makes a similar point: the river stays the river while the water in it is always new." },
          { to: 'phil.no-self', type: 'links-to', why: "Buddhist thinkers used a related image, the chariot, to argue that a person is a name for parts in flux rather than a lasting thing." }
        ],
        objection: "Perhaps there is no deep fact to discover. On a conventionalist view, 'same ship' depends on how we choose to use words, and when our usual criteria come apart the question has no determinate answer; we simply decide.",
        prompts: ["Which is the real ship, in your view? Does your answer change if the ship is your own body?"],
        recall: [
          { q: "What twist did Hobbes add to the ship of Theseus?", a: "The discarded planks are reassembled into a second ship, so two ships have a claim to be the original." }
        ],
        further: ['Plutarch, Life of Theseus, 23', 'Thomas Hobbes, De Corpore (1655), Part II, chapter 11']
      },
      {
        id: 'phil.dao', kind: 'idea', title: 'The Dao and wu wei',
        line: "The way of things cannot be captured in words, but it can be followed by not forcing.",
        facets: { branch: ['metaphysics', 'ethics'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'Dao, wu wei', respell: 'DOW, woo WAY', ipa: 'daʊ, uː weɪ' },
        body: [
          "Dao means 'way' or 'path', and every Chinese school used the word for its own ideal of how to live. In the <em>Daodejing</em>, traditionally attributed to Laozi, it becomes something larger: the nameless source and pattern of all things, which gives rise to the world without striving and cannot be captured in words. The text opens by warning that the Dao that can be spoken of is not the constant Dao.",
          "Its human counterpart is wu wei, literally 'non action', better understood as effortless or unforced action. Water is the favourite image: it is soft, takes the lowest place, and yet wears away stone. The sage governs, and lives, the way water moves, responding to things as they are instead of imposing plans on them.",
          "Zhuangzi gives the most vivid picture in his story of Cook Ding, whose knife never dulls because, after years of practice, he no longer sees the ox but follows its natural joints. Wu wei is not laziness; it is skill so complete that the effort disappears. That is why the idea resonates with modern accounts of flow and expert performance."
        ],
        people: ['phil.laozi', 'phil.zhuangzi'],
        quote: { text: 'The way that can be spoken of is not the constant way.', source: 'Laozi, Daodejing, chapter 1 (translation after D. C. Lau)' },
        links: [
          { to: 'phil.ren-li', type: 'contrasts', why: "Confucians sought harmony through cultivated ritual and deliberate effort; Daoists thought such striving was part of the problem." },
          { to: 'psy.flow', type: 'links-to', why: "Flow, the absorbed state where skill meets challenge and self consciousness falls away, is the closest modern psychological description of wu wei." },
          { to: 'phys.complementarity', type: 'links-to', why: "Niels Bohr put the yin yang symbol on his coat of arms with the Latin motto 'opposites are complementary', seeing in Chinese thought an echo of his complementarity." },
          { to: 'phil.emptiness', type: 'links-to', why: "When Buddhism reached China, translators borrowed Daoist vocabulary, and Daoist ideas helped shape Chan, the school later known in Japan as Zen." }
        ],
        objection: "Advice to stop striving and follow the natural course needs an account of which course is natural. Confucian critics argued that, without cultivated standards, 'naturalness' can excuse whatever one already wanted to do.",
        prompts: ["When did something you do last feel effortless because you had practised it for years? What changed in how you saw the task?"],
        recall: [
          { q: "What does wu wei mean?", a: "Literally 'non action'; in practice, effortless or unforced action that goes along with the grain of things." },
          { q: "What is the story of Cook Ding meant to show?", a: "That perfected skill follows the natural structure of things without force, so effort seems to disappear." }
        ],
        further: ['Laozi, Tao Te Ching, translated by D. C. Lau (1963)', 'Edward Slingerland, Trying Not to Try (2014)']
      },
      {
        id: 'phil.emptiness', kind: 'idea', title: 'Emptiness (sunyata)',
        line: "Nothing exists by itself; everything is what it is only in relation to everything else.",
        facets: { branch: ['metaphysics', 'religion'], era: ['ancient'], tradition: ['indian', 'japanese'] },
        say: { text: 'sunyata', respell: 'SHOON yuh tah', ipa: 'ˈʃuːnjətɑː' },
        body: [
          "Emptiness is the central idea of Madhyamaka, the Middle Way school of Buddhist philosophy associated with Nagarjuna in the second century CE. To say that something is empty is not to say it does not exist. It is to say that it is empty of intrinsic nature (svabhava): it has no existence of its own, independent of causes, parts and the minds that pick it out.",
          "A table depends on wood, a carpenter, legs and a top, and on our concept 'table'. Look for the table apart from all that and you find nothing. Nagarjuna's claim is that this holds of everything, including the self, time, causation and even the Buddha. Emptiness, he says, simply is dependent origination.",
          "This is why the school is called the Middle Way. It avoids eternalism, the belief that things have fixed essences, and nihilism, the belief that nothing exists at all. Things exist conventionally, in relation, and that is enough for ordinary life and for ethics. Nagarjuna even insists that emptiness is itself empty: it is not a hidden absolute behind appearances.",
          "The idea travelled through China into Zen, and has found modern admirers among physicists such as Carlo Rovelli, who see a resemblance to relational readings of quantum theory."
        ],
        people: ['phil.nagarjuna'],
        links: [
          { to: 'phil.no-self', type: 'links-to', why: "Emptiness generalises the Buddha's teaching of no self: not only persons but all things lack a fixed core." },
          { to: 'phys.observer', type: 'links-to', why: "Carlo Rovelli's relational interpretation, in which a system's properties exist only relative to other systems, is one he himself compares to Nagarjuna's emptiness." },
          { to: 'phil.brahman-atman', type: 'contrasts', why: "Advaita says one true self underlies everything; Madhyamaka says nothing, not even an ultimate reality, has a self nature." }
        ],
        objection: "Critics from the Nyaya school pressed a charge of self refutation: if every statement lacks intrinsic nature, so does the statement that all things are empty, and it cannot establish anything. Nagarjuna replied in his Dispeller of Disputes, but whether the reply succeeds is still debated.",
        prompts: ["Pick something that feels solid, like your name or your home. What does it depend on to be what it is?"],
        recall: [
          { q: "In Madhyamaka, what does it mean to say a thing is empty?", a: "That it lacks intrinsic nature: it exists only in dependence on causes, parts and conceptual designation." },
          { q: "Why is Madhyamaka called the Middle Way?", a: "It steers between eternalism (things have fixed essences) and nihilism (nothing exists at all)." }
        ],
        further: ['Jay L. Garfield, The Fundamental Wisdom of the Middle Way (1995)']
      },
      {
        id: 'phil.brahman-atman', kind: 'idea', title: 'Brahman and atman',
        line: "The deepest self in you is one with the ground of all reality.",
        facets: { branch: ['metaphysics', 'religion', 'mind'], era: ['ancient', 'medieval'], tradition: ['indian'] },
        say: { text: 'Brahman, atman', respell: 'BRAH mun, AHT mun', ipa: 'ˈbrɑːmən, ˈɑːtmən' },
        body: [
          "The Upanishads, composed in India from roughly the eighth century BCE onward, ask two questions. What is the ultimate reality behind the changing world? They call it Brahman. What is the true self behind the changing body and mind? They call it atman. Their most famous answer is that the two are one.",
          "In the Chandogya Upanishad a father, Uddalaka, teaches his son Shvetaketu by dissolving salt in water: the salt cannot be seen, yet every sip tastes of it. So it is, he says, with the subtle essence of all things, and he ends each lesson with the phrase tat tvam asi, 'you are that'.",
          "Shankara's Advaita Vedanta, in the eighth century CE, drew the strictest conclusion. Only Brahman is ultimately real. The world of many separate things is maya, an appearance produced by ignorance, as a coiled rope in dim light is mistaken for a snake. Liberation is not going anywhere; it is recognising what you already are.",
          "Other Vedanta schools disagreed. Ramanuja held that selves are real parts of Brahman, and Madhva that they are eternally distinct from it. Buddhists rejected the atman altogether."
        ],
        people: ['phil.shankara'],
        links: [
          { to: 'phil.no-self', type: 'contrasts', why: "The Buddha's teaching of anatta, no self, was in large part a denial of the Upanishadic atman." },
          { to: 'phys.schrodinger', type: 'links-to', why: "Erwin Schrödinger was drawn to Vedanta and closed his book What Is Life? with the thought that atman equals Brahman." },
          { to: 'phil.consciousness', type: 'links-to', why: "Advaita identifies ultimate reality with pure consciousness, a radical answer to the question of where consciousness fits in the world." }
        ],
        objection: "Ramanuja's challenge: if only Brahman is real, and Brahman is pure knowledge, where does the ignorance that produces the illusory world reside? It cannot be in Brahman, and there is nothing else for it to be in.",
        prompts: ["When you say 'I', what are you pointing at? Could it be something much larger than your personal history?"],
        recall: [
          { q: "What does tat tvam asi mean, and where does it come from?", a: "'You are that'. It is the refrain of Uddalaka's teaching to his son in the Chandogya Upanishad, identifying the self with ultimate reality." },
          { q: "What is maya in Advaita Vedanta?", a: "The appearance of a world of many separate things, produced by ignorance, like a rope mistaken for a snake." }
        ],
        further: ['The Upanishads, translated by Patrick Olivelle (1996)', 'Eliot Deutsch, Advaita Vedanta: A Philosophical Reconstruction (1969)']
      },
      {
        id: 'phil.mind-body', kind: 'idea', title: 'Mind and body',
        line: "How can thoughts and feelings belong to the same world as neurons and atoms?",
        facets: { branch: ['mind', 'metaphysics'], era: ['medieval', 'early-modern', 'contemporary'], tradition: ['western', 'islamic'] },
        body: [
          "You decide to raise your hand, and it rises. A pin pricks your finger, and you feel pain. Mind and body clearly affect each other. The puzzle is how, given how different they seem: thoughts have meaning and feel like something; neurons have mass and fire electrically.",
          "Descartes gave the classic dualist answer. The mind is a thinking thing, the body an extended thing: two different substances. In 1643 Princess Elisabeth of Bohemia put the decisive question to him. How can something with no extension and no location push a body? He never gave a satisfying reply, and this interaction problem has haunted dualism ever since.",
          "Most philosophers today are physicalists of some kind: the mind is what the brain does. Identity theorists say mental states are brain states; functionalists say they are defined by their role, so the same mind could in principle run on silicon. Gilbert Ryle mocked Cartesian dualism as the dogma of 'the ghost in the machine'. Yet physicalism has its own stubborn problem, which is consciousness itself."
        ],
        people: ['phil.descartes', 'phil.avicenna'],
        links: [
          { to: 'phil.consciousness', type: 'leads-to', why: "Even if every mental function is a brain function, we can still ask why any of it is felt: that is the hard problem of consciousness." },
          { to: 'psy.consciousness', type: 'links-to', why: "Psychology studies consciousness empirically, mapping which brain processes accompany awareness, without by itself settling the philosophical question." },
          { to: 'psy.placebo', type: 'links-to', why: "Placebo effects show beliefs and expectations producing measurable bodily changes, an everyday case of mind and body intertwined." }
        ],
        objection: "Against the dominant physicalist view: a complete physical description of a brain seems to leave out what experience is like from the inside. Frank Jackson's Mary knows every physical fact about colour but has only ever seen black and white; when she first sees red, she seems to learn something new.",
        prompts: ["Imagine a perfect silicon copy of your brain. Would it be you, someone else, or no one at all?"],
        recall: [
          { q: "What is the interaction problem for dualism?", a: "If the mind is non physical and has no location, it is unclear how it could move the body, as Princess Elisabeth asked Descartes." },
          { q: "What does functionalism say a mental state is?", a: "A state defined by its causal role: what causes it, what it causes, and how it relates to other states." }
        ],
        further: ['René Descartes, Meditations on First Philosophy (1641)', 'Gilbert Ryle, The Concept of Mind (1949)']
      },
      {
        id: 'phil.consciousness', kind: 'idea', title: 'Consciousness and the hard problem',
        line: "Why is there something it is like to be you, rather than all processing in the dark?",
        facets: { branch: ['mind'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "Your brain processes light, sound and touch, but you also experience them: the redness of red, the ache of a headache. In 1974 Thomas Nagel captured this with a question: what is it like to be a bat? A bat navigates by echolocation; we could study every detail of its brain and still not know how that feels from the inside.",
          "In the mid 1990s David Chalmers drew a line between the easy problems of consciousness and the hard problem. The easy problems, though scientifically difficult, are about functions: how we discriminate stimuli, focus attention and report what we see. The hard problem is why performing those functions is accompanied by experience at all. Chalmers argued that we can conceive of a philosophical zombie, a being physically identical to you with no inner life, which suggests that experience is something extra.",
          "Responses range widely. Some expect the gap to close as neuroscience matures. Illusionists such as Daniel Dennett and Keith Frankish say the sense of an extra ingredient is itself a trick the brain plays on itself. Panpsychists suggest experience is a basic feature of matter. No view commands agreement; this remains one of the most open questions in philosophy."
        ],
        people: ['phil.nagel'],
        quote: { text: 'An organism has conscious mental states if and only if there is something that it is like to be that organism.', source: "Thomas Nagel, 'What Is It Like to Be a Bat?', The Philosophical Review (1974)" },
        links: [
          { to: 'psy.consciousness', type: 'links-to', why: "Psychology and neuroscience search for the correlates of consciousness, which addresses the easy problems directly and the hard problem only indirectly." },
          { to: 'phys.observer', type: 'links-to', why: "A minority reading of quantum mechanics, championed for a time by Eugene Wigner, gave consciousness a role in measurement; most physicists now reject it, but it shows how often the two mysteries get tied together." },
          { to: 'phil.no-self', type: 'links-to', why: "Buddhist meditative traditions approach consciousness from the inside and report that close attention finds experiences but no separate experiencer." }
        ],
        objection: "Illusionists argue that the hard problem rests on intuitions, such as the conceivability of zombies, that a brain would produce whether or not any extra ingredient exists, so those intuitions prove nothing about reality.",
        prompts: ["Is there something it is like to be a bee, an octopus, a chatbot? What would count as evidence either way?"],
        recall: [
          { q: "What is the hard problem of consciousness?", a: "Explaining why physical processing in the brain is accompanied by subjective experience at all." },
          { q: "What is a philosophical zombie?", a: "An imagined being physically identical to a person but with no inner experience." }
        ],
        further: ["Thomas Nagel, 'What Is It Like to Be a Bat?' (1974)", 'David Chalmers, The Conscious Mind (1996)']
      },
      {
        id: 'phil.personal-identity', kind: 'idea', title: 'Personal identity',
        line: "What makes you the same person as the child in your old photographs?",
        facets: { branch: ['mind', 'metaphysics'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "You share almost nothing physical with the toddler in your family photographs, and surprisingly little psychologically. Yet you say without hesitation, 'that was me'. What makes it true?",
          "John Locke proposed the first great modern answer in 1694. A person is a thinking being that can consider itself as itself in different times and places, and personal identity reaches as far back as consciousness, chiefly memory, can reach. Thomas Reid replied with a brave officer who remembers being flogged as a boy, and an old general who remembers the officer's exploits but not the flogging. By Locke's test the general is the officer and the officer is the boy, yet the general is not the boy, which is absurd.",
          "Modern versions speak of psychological continuity: overlapping chains of memory, intention and character. Derek Parfit tested them with thought experiments, such as a teletransporter that destroys you here and builds an exact copy on Mars, or a brain divided between two bodies. His conclusion was startling. Identity is not what matters; what matters is the continuity itself, and that can come in degrees.",
          "Animalists offer a simpler view: you are a human organism, and you last as long as it does."
        ],
        people: ['phil.locke', 'phil.hume', 'phil.parfit'],
        links: [
          { to: 'phil.no-self', type: 'contrasts', why: "The Buddhist answer is that there is no enduring self to identify, only a stream of linked events, a view Parfit said was close to his own." },
          { to: 'psy.memory', type: 'links-to', why: "Locke tied identity to memory, and psychology shows memory to be reconstructive and fallible, which makes his criterion shakier than it looks." },
          { to: 'psy.self', type: 'links-to', why: "Psychology's self is the self concept and life story we build, which may be what matters to us even if metaphysical identity is elusive." },
          { to: 'phys.many-worlds', type: 'links-to', why: "On the many worlds view you branch into many successors at every quantum measurement, turning Parfit's imaginary fission cases into a claim about physics." }
        ],
        objection: "Animalists such as Eric Olson point out that you were once a foetus with no psychology at all. If you are essentially a psychological being, you were never a foetus, which seems wrong.",
        prompts: ["Would you step into Parfit's teletransporter? What exactly would you be afraid of losing?"],
        recall: [
          { q: "What was Locke's criterion of personal identity?", a: "Continuity of consciousness, chiefly memory: you are the same person as anyone whose experiences you can remember as your own." },
          { q: "What is Reid's brave officer objection?", a: "The general remembers being the officer, who remembers being the flogged boy, but the general cannot remember being the boy, so memory identity breaks down." },
          { q: "What did Parfit conclude from his thought experiments?", a: "That identity is not what matters; psychological continuity is, and it can hold in degrees." }
        ],
        further: ['John Locke, An Essay Concerning Human Understanding, Book II, chapter 27 (second edition, 1694)', 'Derek Parfit, Reasons and Persons (1984)']
      },
      {
        id: 'phil.no-self', kind: 'idea', title: 'No self (anatta)',
        line: "Look closely for the self behind your experiences and you find only experiences.",
        facets: { branch: ['mind', 'metaphysics', 'religion'], era: ['ancient', 'early-modern'], tradition: ['indian', 'western'] },
        say: { text: 'anatta', respell: 'uh NUT tah', ipa: 'əˈnʌtɑː' },
        body: [
          "The Buddha taught that all conditioned things share three marks: they are impermanent, unsatisfactory, and without self (anatta in Pali, anatman in Sanskrit). When we look for the self, he said, we find five kinds of process, the aggregates: body, feeling, perception, mental formations and consciousness. None of them is permanent, none is fully under our control, and so none can be the lasting, independent self we assume we are.",
          "A later text, the Questions of King Milinda, uses a chariot. The monk Nagasena asks the king whether the chariot is the axle, the wheels, the frame or the reins. It is none of them, and nothing apart from them; 'chariot' is a convenient name for parts in the right arrangement. So, he says, is 'Nagasena'.",
          "The point is not merely intellectual. Clinging to a self that does not exist is, for Buddhism, a root of suffering, and seeing through it is liberation. David Hume, two thousand years later and without meditation, made a strikingly similar report: whenever he looked inward he stumbled on some particular perception, never on a self."
        ],
        people: ['phil.buddha', 'phil.hume'],
        links: [
          { to: 'psy.self', type: 'links-to', why: "Psychology often treats the self as a model the brain constructs and maintains, a modern echo of the Buddhist claim that the self is a process, not a thing." },
          { to: 'psy.mindfulness', type: 'links-to', why: "Mindfulness practice, drawn from Buddhist meditation, trains exactly the close observation that was meant to reveal the absence of a fixed self." },
          { to: 'phil.death', type: 'links-to', why: "If there is no enduring self, death loses some of its sting: there is less of a 'me' to lose than I feared." }
        ],
        objection: "If there is no self, who suffers, who practises, and who is liberated? Some early Buddhist schools, the Pudgalavadins, were troubled enough to posit a 'person' that is neither identical to the aggregates nor separate from them.",
        prompts: ["Spend one minute trying to find the one who is reading this. What do you actually find?"],
        recall: [
          { q: "What are the three marks of existence in Buddhism?", a: "Impermanence (anicca), unsatisfactoriness or suffering (dukkha) and no self (anatta)." },
          { q: "What does Nagasena's chariot show?", a: "That 'chariot', like a personal name, is a convenient label for parts in the right arrangement, not a further thing." }
        ],
        further: ['Steven Collins, Selfless Persons (1982)', 'Evan Thompson, Why I Am Not a Buddhist (2020)']
      },

      /* ===== Ideas: knowledge, science, language ===== */
      {
        id: 'phil.knowledge', kind: 'idea', title: 'Knowledge',
        line: "Believing something true is not enough. What turns a true belief into knowledge?",
        facets: { branch: ['epistemology'], era: ['ancient', 'medieval', 'contemporary'], tradition: ['western', 'indian'] },
        body: [
          "Suppose you believe your train leaves at nine, and it does. Do you know it? Not if you were guessing. In the <em>Theaetetus</em> and the <em>Meno</em>, Plato suggested that knowledge is true belief plus something more, an account or reason that ties it down. This became the standard analysis: knowledge is justified true belief.",
          "In 1963 Edmund Gettier published a three page paper that broke it. His cases share a shape, captured well by an example Bertrand Russell had given: you glance at a station clock that reads nine, you believe it is nine, and it is nine. But the clock stopped exactly twelve hours earlier. Your belief is true and justified, yet you got lucky, and most people judge that you do not know.",
          "Philosophers in India had met such cases centuries earlier. The Buddhist thinker Dharmottara, in the eighth century, described a traveller who sees a mirage and infers water, and there happens to be water at that very spot.",
          "Decades of attempts to add a fourth condition have produced no agreed fix. Some philosophers conclude that knowledge cannot be broken into parts and should be treated as basic."
        ],
        people: ['phil.plato'],
        links: [
          { to: 'phil.scepticism', type: 'contrasts', why: "Scepticism asks whether any of our beliefs meet the standard for knowledge at all." },
          { to: 'phil.empiricism', type: 'links-to', why: "Empiricism and rationalism are rival answers to where justification ultimately comes from." },
          { to: 'phys.uncertainty', type: 'links-to', why: "Heisenberg's uncertainty principle raises a question epistemology cares about: is it a limit on what we can know, or on what there is to be known?" }
        ],
        objection: "Timothy Williamson argues that the whole project of defining knowledge as belief plus extra conditions is backwards: knowledge is the more basic notion, and belief is best understood as a kind of attempt at it.",
        prompts: ["Name something you are sure you know. What would have to be true of the world for you to be right only by luck?"],
        recall: [
          { q: "What is the traditional analysis of knowledge?", a: "Justified true belief." },
          { q: "What does a Gettier case show?", a: "That a belief can be justified and true yet only luckily true, and so seem not to be knowledge." }
        ],
        further: ["Edmund Gettier, 'Is Justified True Belief Knowledge?' (1963)", 'Jennifer Nagel, Knowledge: A Very Short Introduction (2014)']
      },
      {
        id: 'phil.scepticism', kind: 'idea', title: 'Scepticism',
        line: "Can you be sure you are not dreaming right now? If not, what can you know?",
        facets: { branch: ['epistemology'], era: ['ancient', 'early-modern', 'contemporary'], tradition: ['western', 'chinese'] },
        body: [
          "Philosophical scepticism is not ordinary doubt. It is the challenge that we may not know things we feel certain of: that there is a world outside our minds, that the past happened, that other people have inner lives.",
          "The ancient Pyrrhonists, whose arguments survive in Sextus Empiricus, set opposing arguments against each other until they balanced, then suspended judgement. The surprise, they reported, was peace of mind. In China, Zhuangzi dreamed he was a butterfly and woke unsure whether he was a man who had dreamed of being a butterfly or a butterfly now dreaming of being a man.",
          "Descartes used doubt as a tool. If an all powerful demon could be deceiving me about everything, what survives? His answer was his own thinking. The modern version is the brain in a vat: a brain kept alive and fed perfectly simulated signals would have exactly the experiences you are having now. How could you tell the difference?",
          "Replies include G. E. Moore's insistence that he knows he has hands more surely than he knows any premise of a sceptical argument, and the late Wittgenstein's view that some certainties are the hinges on which doubt itself turns."
        ],
        people: ['phil.descartes', 'phil.zhuangzi'],
        links: [
          { to: 'psy.perception', type: 'links-to', why: "Perceptual illusions are the sceptic's oldest evidence: the senses do sometimes deceive, and psychology shows how systematically." },
          { to: 'phil.cave', type: 'links-to', why: "Plato's prisoners take shadows for reality, the ancestor of every story in which our whole world might be an illusion." },
          { to: 'phil.rationalism', type: 'leads-to', why: "Descartes raised sceptical doubt in order to defeat it, using reason to rebuild knowledge on a foundation nothing could shake." }
        ],
        objection: "Moore's reply: I am more certain that I have hands than I could ever be of the premises of an argument that I do not, so it is the sceptical argument that should be rejected.",
        prompts: ["What is one thing you believe that you could not prove to a determined sceptic? Does that bother you?"],
        recall: [
          { q: "What did the Pyrrhonist sceptics find when they suspended judgement?", a: "Tranquillity: peace of mind followed once they stopped needing to be right." },
          { q: "What is the brain in a vat scenario?", a: "A brain kept alive and fed simulated experiences identical to yours; the question is how you could know you are not one." }
        ],
        further: ['Sextus Empiricus, Outlines of Pyrrhonism', 'Barry Stroud, The Significance of Philosophical Scepticism (1984)']
      },
      {
        id: 'phil.empiricism', kind: 'idea', title: 'Empiricism',
        line: "All our ideas and knowledge come, in the end, from experience.",
        facets: { branch: ['epistemology', 'science'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Empiricism is the view that experience is the source of our ideas and the final court of appeal for knowledge. John Locke, in his <em>Essay</em> of 1689, attacked the doctrine of innate ideas and pictured the newborn mind as white paper, waiting for experience to write on it. George Berkeley and David Hume followed the principle further than Locke had, with unsettling results: Berkeley concluded that matter is nothing beyond perceptions, and Hume that causation and the self are not things we ever actually perceive.",
          "Empiricism became the working philosophy of modern science: test ideas against observation. In the twentieth century the logical empiricists of the Vienna Circle went so far as to say that a statement which could not in principle be checked by experience was not false but meaningless.",
          "A lovely test case is Molyneux's problem, which William Molyneux put to Locke. Would a person born blind, given sight, recognise by sight alone a cube and a sphere they know by touch? Locke said no. In 2011 a study of children in India who gained sight through surgery found that, at first, they could not."
        ],
        people: ['phil.locke', 'phil.hume'],
        links: [
          { to: 'phil.rationalism', type: 'contrasts', why: "Rationalists hold that some knowledge comes from reason alone; the dispute over the source of knowledge shaped early modern philosophy." },
          { to: 'phil.induction', type: 'leads-to', why: "If all knowledge comes from experience, knowledge of the future rests on generalising from the past, which is exactly what Hume's problem of induction questions." },
          { to: 'psy.behaviourism', type: 'links-to', why: "Behaviourism carried the empiricist picture of a mind shaped entirely by experience into psychology, explaining behaviour through learning and conditioning." },
          { to: 'psy.perception', type: 'links-to', why: "Molyneux's armchair question was finally tested by perception scientists, a neat case of philosophy handing a problem to experiment." }
        ],
        objection: "Kant argued that experience could not even get started without structures the mind brings to it, such as space, time and cause, and linguists such as Noam Chomsky argue that children learn language from far too little evidence for experience alone to explain it.",
        prompts: ["Can you think of anything you know that did not come, in some way, from experience?"],
        recall: [
          { q: "What image did Locke use for the mind at birth?", a: "White paper, blank until experience writes on it, often called a tabula rasa." },
          { q: "What is Molyneux's problem?", a: "Whether a person born blind, suddenly given sight, could recognise by sight alone shapes they already know by touch." }
        ],
        further: ['John Locke, An Essay Concerning Human Understanding (1689)']
      },
      {
        id: 'phil.rationalism', kind: 'idea', title: 'Rationalism',
        line: "Reason alone, without the senses, can reach some of the most important truths.",
        facets: { branch: ['epistemology', 'metaphysics'], era: ['ancient', 'early-modern'], tradition: ['western'] },
        body: [
          "Rationalists hold that reason is a source of knowledge in its own right, and that some truths can be known a priori, without relying on experience. Mathematics is the model. You do not survey triangles to learn that their angles add up to two right angles; you prove it.",
          "Plato is the ancestor. In the <em>Meno</em> Socrates leads an untutored slave boy, by questions alone, to a geometrical truth, and Plato concludes that learning is a kind of recollection. The great early modern rationalists were Descartes, Spinoza and Leibniz. Descartes doubted everything the senses tell him and rebuilt knowledge from the one thing he could not doubt, his own thinking, and then from clear and distinct ideas guaranteed by God.",
          "Leibniz added the principle of sufficient reason: nothing happens without a reason why it is so and not otherwise. Kant tried to settle the long quarrel with empiricism by arguing that the mind supplies the form of experience and the senses its content."
        ],
        people: ['phil.plato', 'phil.descartes', 'phil.spinoza', 'phil.leibniz'],
        links: [
          { to: 'phil.knowledge', type: 'links-to', why: "Rationalism is one answer to what justifies knowledge: rational insight rather than observation." },
          { to: 'phys.einstein', type: 'links-to', why: "Einstein, in a 1933 lecture, said he held it true that pure thought can grasp reality, as the ancients dreamed, a rationalist streak in the most empirical of sciences." },
          { to: 'phil.induction', type: 'contrasts', why: "Rationalists hoped to rest knowledge on necessary truths rather than on generalisations from experience, sidestepping the problem of induction." }
        ],
        objection: "Rationalists reasoning from first principles reached flatly incompatible systems: Descartes found two kinds of substance, Spinoza one, Leibniz infinitely many. And the discovery of non Euclidean geometries showed that even geometry, the rationalist's showpiece, does not tell us a priori what physical space is like.",
        prompts: ["Is 'every event has a cause' something you learned from experience, or something you bring to experience?"],
        recall: [
          { q: "What does it mean to know something a priori?", a: "To know it independently of experience, by reason alone, as in a mathematical proof." },
          { q: "Name the three great early modern rationalists.", a: "Descartes, Spinoza and Leibniz." }
        ],
        further: ['René Descartes, Meditations on First Philosophy (1641)', 'Plato, Meno']
      },
      {
        id: 'phil.cave', kind: 'idea', title: "Plato's cave",
        line: "Prisoners mistake shadows for reality. What would it take to turn around?",
        facets: { branch: ['epistemology', 'metaphysics', 'political'], era: ['ancient'], tradition: ['western'] },
        body: [
          "In Book VII of the <em>Republic</em>, Plato asks us to imagine prisoners chained since childhood in a cave, facing a wall. Behind them a fire burns, and people carry objects past it, casting shadows. The prisoners have only ever seen shadows, so they take the shadows for the whole of reality, and compete in naming them.",
          "One prisoner is freed. Turning toward the fire hurts his eyes; dragged up into daylight he is dazzled, and only slowly can he look at things themselves, and at last at the sun that makes them visible. The sun stands for the Form of the Good, the source of truth and being. Education, Plato says, is not putting sight into blind eyes but turning the whole soul around.",
          "Then comes the sting. The freed man returns to tell the others. His eyes, used to light, stumble in the dark; the prisoners laugh at him, and if they could, Plato says, they would kill him. Every reader in Athens would have thought of Socrates."
        ],
        people: ['phil.plato', 'phil.socrates'],
        links: [
          { to: 'phil.forms', type: 'part-of', why: "The cave is Plato's picture of his theory of Forms: shadows are to things as things are to the Forms." },
          { to: 'psy.perception', type: 'links-to', why: "Psychology suggests we perceive a model the brain constructs rather than the world itself, a scientific cousin of the shadows on the wall." },
          { to: 'phil.justice', type: 'links-to', why: "The allegory sits inside the Republic's argument about justice: only those who have seen the Good, Plato thought, are fit to rule." }
        ],
        objection: "Karl Popper argued that the allegory licenses rule by those who claim to have seen the sun. Who certifies that the philosopher, rather than the prisoners, has left the cave, and what stops a self appointed elite from dismissing every disagreement as shadow watching?",
        prompts: ["What shadows might you be taking for the whole of reality? Whom would you need to listen to, to find out?"],
        recall: [
          { q: "In the allegory of the cave, what does the sun represent?", a: "The Form of the Good, the source of truth and of the reality of everything else." },
          { q: "What happens when the freed prisoner returns?", a: "He cannot see well in the dark, the others mock him, and Plato says they would kill him if they could, an allusion to Socrates." }
        ],
        further: ['Plato, Republic, Book VII, 514a to 520a']
      },
      {
        id: 'phil.induction', kind: 'idea', title: 'The problem of induction',
        line: "The sun has always risen. What, exactly, justifies expecting it to rise tomorrow?",
        facets: { branch: ['epistemology', 'science'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Most of what we believe about the world goes beyond what we have observed. Bread nourished us yesterday, so we expect it to nourish us today. Reasoning from observed cases to unobserved ones is called induction, and science runs on it.",
          "David Hume asked what justifies it. Not logic: there is no contradiction in supposing the future will be unlike the past. Not experience: arguing that induction has worked before, so it will work again, uses induction to justify itself. Hume concluded that our expectation rests on custom or habit, not reason. We cannot help reasoning this way, but we cannot prove it is right.",
          "Bertrand Russell gave the point a dark twist: a chicken fed every morning of its life grows ever more confident, until the morning the farmer wrings its neck. Nelson Goodman added a new riddle. The evidence that all emeralds are green equally supports the hypothesis that they are 'grue', meaning green if examined before some future date and blue otherwise. Which patterns, then, should we project?"
        ],
        people: ['phil.hume'],
        links: [
          { to: 'phil.falsification', type: 'leads-to', why: "Popper's falsificationism was designed as a way of doing science without relying on induction at all." },
          { to: 'psy.confirmation-bias', type: 'links-to', why: "Confirmation bias is induction gone wrong in practice: we notice the cases that fit our expectations and overlook the ones that do not." },
          { to: 'phil.pragmatism', type: 'links-to', why: "Peirce answered Hume not with a proof but with a method: induction, persisted in, corrects its own errors in the long run." }
        ],
        objection: "P. F. Strawson replied that asking for a justification of induction is confused: being guided by inductive evidence is part of what we mean by being reasonable, so demanding a deeper proof is like asking whether the law itself is legal.",
        prompts: ["What do you rely on every day that you have only ever justified by 'it has always been so'?"],
        recall: [
          { q: "Why can't induction be justified by its past success?", a: "Because arguing that it worked before so it will work again is itself an inductive argument, so the justification is circular." },
          { q: "What is Russell's chicken?", a: "A chicken fed every day grows confident it will be fed tomorrow, until the farmer wrings its neck: past regularity guarantees nothing." }
        ],
        further: ['David Hume, An Enquiry Concerning Human Understanding (1748), Section IV', 'Bertrand Russell, The Problems of Philosophy (1912), chapter 6']
      },
      {
        id: 'phil.falsification', kind: 'idea', title: 'Falsification',
        line: "A theory is scientific if it sticks its neck out: it must say what would prove it wrong.",
        facets: { branch: ['science', 'epistemology'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "As a young man in Vienna after the First World War, Karl Popper was struck by a contrast. Einstein's general relativity predicted that starlight passing the Sun would bend by a definite amount, and the 1919 eclipse observations could have shown it false. The psychoanalytic theories of Freud and Adler, by contrast, seemed able to explain any behaviour at all. Their admirers saw confirmation everywhere. Popper came to see that as a weakness.",
          "His criterion of demarcation, published in 1934, was falsifiability. A theory is scientific if it forbids some possible observations, so that experience could refute it. No number of white swans proves that all swans are white, but one black swan refutes it. Science, on this picture, advances by bold conjectures and serious attempts at refutation, not by piling up confirmations.",
          "The idea has shaped how scientists talk about their work, and it gives a usable test for pseudoscience. But it has a famous difficulty. A theory is never tested alone; it comes with assumptions about instruments and conditions, and a failed prediction can always be blamed on one of those instead."
        ],
        people: ['phil.popper'],
        links: [
          { to: 'psy.confirmation-bias', type: 'links-to', why: "Popper's advice to seek refutation rather than confirmation is a direct antidote to confirmation bias." },
          { to: 'psy.psychoanalysis', type: 'responds-to', why: "Popper developed falsifiability partly against psychoanalysis, which he thought could explain any possible behaviour and so risked nothing." },
          { to: 'phil.paradigm', type: 'contrasts', why: "Kuhn replied that working scientists rarely abandon a theory at the first anomaly, and that this stubbornness is often productive." },
          { to: 'phys.einstein', type: 'links-to', why: "Einstein's prediction of light bending, tested at the 1919 eclipse, was Popper's model of a theory that risks refutation." }
        ],
        objection: "When Uranus strayed from its predicted orbit, astronomers did not reject Newton; Urbain Le Verrier blamed an unseen planet, and in 1846 Neptune was found close to where he predicted. As Pierre Duhem and later W. V. O. Quine argued, a failed prediction never tells you which assumption to give up, so strict falsification does not describe how good science works.",
        prompts: ["Pick a belief you hold strongly. What evidence would make you give it up? If nothing could, what kind of belief is it?"],
        recall: [
          { q: "What is Popper's criterion for a theory being scientific?", a: "It must be falsifiable: it must forbid some possible observations, so that experience could show it false." },
          { q: "What is the main difficulty for strict falsificationism?", a: "Theories are tested together with auxiliary assumptions, so a failed prediction does not show which assumption is at fault." }
        ],
        further: ['Karl Popper, Conjectures and Refutations (1963)', 'Karl Popper, The Logic of Scientific Discovery (1959)']
      },
      {
        id: 'phil.paradigm', kind: 'idea', title: 'Paradigm shifts',
        line: "Science moves through long calm stretches and sudden revolutions in how the world is seen.",
        facets: { branch: ['science'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "In <em>The Structure of Scientific Revolutions</em> (1962) the physicist turned historian Thomas Kuhn argued that science does not grow by steady accumulation. Most of the time scientists do normal science: puzzle solving within a paradigm, a shared framework of theory, methods, model experiments and assumptions about which questions are worth asking.",
          "Anomalies, results that will not fit, are at first set aside. When they pile up a crisis follows, and eventually a revolution: Copernicus over Ptolemy, Lavoisier's oxygen over phlogiston, Einstein over Newton, quantum mechanics over classical physics. Kuhn compared the change to a gestalt switch, like the drawing that is first a duck and then a rabbit. After a revolution, he said, scientists in a sense work in a different world.",
          "Kuhn added a provocative claim, incommensurability: rival paradigms may define their terms so differently that there is no neutral standpoint from which to compare them. 'Paradigm shift' has since escaped into everyday language, usually meaning little more than a big change. Kuhn himself was criticised for using 'paradigm' loosely; one reader, Margaret Masterman, counted some twenty one senses in his book."
        ],
        links: [
          { to: 'phys.copenhagen', type: 'links-to', why: "The birth of quantum mechanics in the 1920s, settled for a generation by the Copenhagen view, is one of Kuhn's central cases of revolution; Kuhn first trained as a physicist." },
          { to: 'psy.behaviourism', type: 'links-to', why: "The cognitive revolution that displaced behaviourism in the 1950s and 1960s is often described as a Kuhnian paradigm shift, though historians debate how sudden it was." },
          { to: 'psy.confirmation-bias', type: 'links-to', why: "Kuhn's normal scientists, setting anomalies aside, show something like confirmation bias at the scale of a whole community, sometimes usefully." },
          { to: 'phil.realism', type: 'links-to', why: "If each paradigm sees a different world, it is harder to say that science converges on a single reality that exists independently of us." }
        ],
        objection: "If paradigms are incommensurable and theory choice is partly persuasion, it is hard to see how science makes rational progress at all. Imre Lakatos accused Kuhn of reducing scientific change to mob psychology; Kuhn replied that later paradigms really do solve more puzzles.",
        prompts: ["Have you lived through a change in how you see something that felt less like learning a fact and more like a duck becoming a rabbit?"],
        recall: [
          { q: "What is normal science, for Kuhn?", a: "Puzzle solving within an accepted paradigm, without questioning its basic assumptions." },
          { q: "What does incommensurability mean?", a: "That rival paradigms may lack a common measure, defining terms so differently that no neutral comparison is possible." }
        ],
        further: ['Thomas Kuhn, The Structure of Scientific Revolutions (1962)']
      },
      {
        id: 'phil.language-games', kind: 'idea', title: 'Language games',
        line: "The meaning of a word is not a thing it names but the way it is used.",
        facets: { branch: ['logic-language'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "Ludwig Wittgenstein's early work pictured language as a mirror of the world: sentences picture possible facts. His later <em>Philosophical Investigations</em>, published in 1953 after his death, turned against that picture. It opens with a passage from Augustine describing how he learned words as names of objects pointed out to him, and treats it as a seductive but narrow theory of meaning.",
          "Think instead, Wittgenstein suggests, of language as a collection of games: giving orders, telling jokes, praying, reporting an event, making a promise. Each has its own rules and point, woven into a form of life. And 'game' itself shows how concepts work: there is no single feature all games share, only a network of overlapping similarities, which he called family resemblances.",
          "Many philosophical problems, on this view, arise when language goes on holiday: when a word like 'know' or 'mind' is lifted out of the game where it does its work and asked to name some hidden essence. The cure is to look at how the word is actually used. Philosophy, he wrote, leaves everything as it is."
        ],
        people: ['phil.wittgenstein', 'phil.augustine'],
        quote: { text: "For a large class of cases, though not for all, in which we employ the word 'meaning' it can be defined thus: the meaning of a word is its use in the language.", source: 'Ludwig Wittgenstein, Philosophical Investigations (1953), section 43, translated by G. E. M. Anscombe' },
        links: [
          { to: 'phil.pragmatism', type: 'links-to', why: "Like the pragmatists, the later Wittgenstein looks for meaning in practice and consequence rather than in a private mental picture." },
          { to: 'phil.consciousness', type: 'links-to', why: "His private language argument questions whether words for inner sensations could get their meaning from a purely private act of naming, which bears on how we talk about consciousness." },
          { to: 'phil.ren-li', type: 'links-to', why: "Confucius taught that order depends on the rectification of names, a far older recognition that words live inside social practices." }
        ],
        objection: "Philosophers in the tradition of Gottlob Frege and Donald Davidson argue that use alone cannot explain how we understand endlessly many sentences we have never met; that needs a systematic account of how the meanings of parts combine to fix what a sentence says.",
        prompts: ["Try to define 'game' so that it covers chess, patience, football and peekaboo but nothing else. What happens?"],
        recall: [
          { q: "What did Wittgenstein mean by a language game?", a: "A rule governed activity in which words are used, such as giving orders or telling jokes, embedded in a wider form of life." },
          { q: "What are family resemblances?", a: "Overlapping similarities among the things one word covers, like games, with no single feature they all share." }
        ],
        further: ['Ludwig Wittgenstein, Philosophical Investigations (1953)', 'Ray Monk, Ludwig Wittgenstein: The Duty of Genius (1990)']
      },

      /* ===== Ideas: ethics, politics, religion, meaning, beauty ===== */
      {
        id: 'phil.good-life', kind: 'idea', title: 'The good life',
        line: "What makes a human life go well for the one living it?",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient', 'contemporary'], tradition: ['western', 'chinese', 'indian'] },
        say: { text: 'eudaimonia', respell: 'yoo dy MOH nee uh', ipa: 'juːdaɪˈməʊniə' },
        body: [
          "Ancient philosophers in Greece, China and India shared a question even when they disagreed on the answer: what is the best life for a human being? The Greek word was eudaimonia, often translated as happiness but closer to flourishing, a life that goes well as a whole rather than a passing mood.",
          "Aristotle argued that a thing's good lies in doing well what is distinctive of it, and that what is distinctive of humans is reason. So the good life is activity in accordance with virtue, over a complete life, with friends and enough external goods. Epicurus said it was pleasure, understood as freedom from pain and anxiety. The Stoics said virtue alone was enough. The Buddha located it in release from craving; Confucius in becoming humane within good relationships.",
          "Modern philosophers sort theories into three families. Hedonism says only pleasure is good for you. Desire theories say getting what you want is. Objective list theories name several goods, such as knowledge, friendship and achievement, that make a life better whether or not you want them. Robert Nozick's experience machine, which would give you any experiences you like while you float in a tank, is the classic test: most people would not plug in, which suggests something beyond pleasure matters."
        ],
        people: ['phil.aristotle', 'phil.epicurus', 'phil.buddha'],
        links: [
          { to: 'phil.virtue-ethics', type: 'leads-to', why: "Aristotle's account of flourishing as virtuous activity is the foundation of virtue ethics." },
          { to: 'psy.flow', type: 'links-to', why: "Research on flow, absorbed activity at the edge of one's skill, echoes Aristotle's claim that happiness lies in excellent activity rather than passive pleasure." },
          { to: 'psy.kahneman', type: 'links-to', why: "Daniel Kahneman's distinction between the experiencing self and the remembering self shows that 'how is your life going?' can have two different answers." },
          { to: 'phil.meaning', type: 'links-to', why: "A life can be pleasant without feeling meaningful; many philosophers now treat meaning as a separate dimension of a good life." }
        ],
        objection: "Each family has a hard case. Objective list theories risk paternalism, telling people what is good for them whatever they think; desire theories must accept that Rawls's imagined man who wants only to count blades of grass, and does so all his life, is flourishing.",
        prompts: ["Would you plug into the experience machine for the rest of your life? What would you miss that it could not give you?"],
        recall: [
          { q: "What does eudaimonia mean?", a: "Flourishing: a life that goes well as a whole, often translated as happiness." },
          { q: "What is Nozick's experience machine meant to show?", a: "That most of us would not trade real life for any set of pleasant experiences, so something besides pleasure matters." }
        ],
        further: ['Aristotle, Nicomachean Ethics, Books I and X', 'Robert Nozick, Anarchy, State, and Utopia (1974), pages 42 to 45']
      },
      {
        id: 'phil.virtue-ethics', kind: 'idea', title: 'Virtue ethics',
        line: "Ask not only 'what should I do?' but 'what kind of person should I become?'",
        facets: { branch: ['ethics'], era: ['ancient', 'contemporary'], tradition: ['western', 'chinese'] },
        body: [
          "Virtue ethics puts character at the centre of morality. A virtue is a settled disposition to see, feel and act well: courage, honesty, generosity, justice, practical wisdom. Right action is what a person of good character would characteristically do in the circumstances.",
          "Aristotle is its founder in the West. Each virtue, he argued, is a mean between two vices: courage lies between cowardice and recklessness, generosity between meanness and extravagance. The mean is not a mathematical midpoint but what is right for this person, here, now, and finding it takes phronesis, practical wisdom, which only experience brings. We become just by doing just acts, as builders become builders by building.",
          "Confucian ethics is often compared with it: the exemplary person cultivates ren through practice in relationships, and Mencius spoke of moral sprouts that must be nourished. In 1958 Elizabeth Anscombe's essay 'Modern Moral Philosophy' sparked a revival in the West, and philosophers such as Philippa Foot, Alasdair MacIntyre and Martha Nussbaum developed it into a serious rival to rule based ethics."
        ],
        people: ['phil.aristotle', 'phil.mencius', 'phil.nussbaum', 'phil.murdoch'],
        links: [
          { to: 'phil.utilitarianism', type: 'contrasts', why: "Utilitarianism judges acts by outcomes; virtue ethics asks what a good person would do and why, putting motive and character first." },
          { to: 'phil.deontology', type: 'contrasts', why: "Kantian ethics looks for a rule any rational agent must follow; virtue ethics doubts that any rule can replace practical wisdom in a particular case." },
          { to: 'phil.ren-li', type: 'links-to', why: "Confucian ren is a virtue cultivated through ritual practice, making Confucian ethics one of the oldest forms of virtue ethics." },
          { to: 'psy.milgram', type: 'links-to', why: "Milgram's obedience studies are a favourite exhibit for critics who say situations, not stable virtues, drive much of what people do." }
        ],
        objection: "Situationist critics such as John Doris and Gilbert Harman cite experiments in which small features of a situation, such as being in a hurry, predicted whether people helped a stranger better than character did, suggesting that robust character traits are rarer than virtue ethics assumes.",
        prompts: ["Think of someone whose character you admire. Which of their virtues would you most like to grow, and what daily practice would grow it?"],
        recall: [
          { q: "What is Aristotle's doctrine of the mean?", a: "Each virtue lies between two vices of excess and deficiency, as courage lies between recklessness and cowardice." },
          { q: "What is phronesis?", a: "Practical wisdom: the ability to see what a situation requires and how to act well in it." }
        ],
        further: ['Aristotle, Nicomachean Ethics', "Elizabeth Anscombe, 'Modern Moral Philosophy' (1958)", 'Alasdair MacIntyre, After Virtue (1981)']
      },
      {
        id: 'phil.utilitarianism', kind: 'idea', title: 'Utilitarianism',
        line: "The right act is the one that produces the greatest wellbeing overall.",
        facets: { branch: ['ethics', 'political'], era: ['modern', 'contemporary'], tradition: ['western', 'chinese'] },
        body: [
          "Utilitarianism judges actions by their consequences, and counts consequences in a single currency: wellbeing. Jeremy Bentham, in 1789, proposed that the right act is the one producing the greatest happiness, with each person's pleasure and pain counting equally, whoever they are. It was a radical, reforming idea, used against cruel punishments and for wider voting rights, and Bentham extended moral concern to animals.",
          "John Stuart Mill refined it in <em>Utilitarianism</em> (1863), arguing that some pleasures, like those of the intellect, are higher than others. Henry Sidgwick gave it its most careful statement. Today Peter Singer is its best known defender, applying it to global poverty and the treatment of animals.",
          "Philosophers distinguish act utilitarianism, which judges each act directly, from rule utilitarianism, which judges rules by the consequences of everyone following them. China had a precursor more than two thousand years earlier: Mozi judged every practice by whether it benefited the people."
        ],
        people: ['phil.mill', 'phil.singer'],
        quote: { text: 'The question is not, Can they reason? nor, Can they talk? but, Can they suffer?', source: 'Jeremy Bentham, An Introduction to the Principles of Morals and Legislation (1789), chapter XVII, footnote' },
        links: [
          { to: 'phil.deontology', type: 'contrasts', why: "Kantian ethics holds that some things may not be done to a person whatever the payoff, which is exactly what utilitarianism denies." },
          { to: 'phil.trolley-problem', type: 'links-to', why: "The trolley problem was built to probe where outcome based reasoning feels right and where it feels wrong." },
          { to: 'psy.kahneman', type: 'links-to', why: "Kahneman's research on experienced versus remembered wellbeing complicates the task of measuring happiness, a project he and colleagues titled 'Back to Bentham?'." }
        ],
        objection: "The transplant case: a surgeon could save five patients by killing one healthy visitor and sharing out his organs. If only total wellbeing counts, it seems the surgeon should, yet almost everyone thinks this would be monstrous. Rawls put the deeper point: utilitarianism does not take seriously the separateness of persons.",
        prompts: ["Is there anything you would refuse to do even if it produced more happiness overall? What does that refusal rest on?"],
        recall: [
          { q: "What is the principle of utility?", a: "The right act is the one that produces the greatest overall wellbeing, with everyone's counting equally." },
          { q: "What is the difference between act and rule utilitarianism?", a: "Act utilitarianism judges each act by its consequences; rule utilitarianism judges acts by rules whose general observance has the best consequences." }
        ],
        further: ['John Stuart Mill, Utilitarianism (1863)', 'Peter Singer, Practical Ethics (1979)']
      },
      {
        id: 'phil.deontology', kind: 'idea', title: 'Duty and the categorical imperative',
        line: "Some things are wrong whatever the consequences, because persons are never mere tools.",
        facets: { branch: ['ethics'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Deontology, from the Greek for duty, holds that the rightness of an act depends on the kind of act it is, not only on its results. Promises bind, lies wrong people, and some things may not be done to anyone, even to produce a better outcome. Its great architect is Immanuel Kant.",
          "Kant argued that morality must rest on reason alone, so it must take the form of a categorical imperative: a command that holds for every rational being, whatever they happen to want. His first formulation asks you to act only on a principle you could will to become a universal law. Try universalising 'I will make false promises when it suits me': in such a world promises would mean nothing, so the policy defeats itself.",
          "His second formulation is the one most people find moving: treat humanity, in yourself and in others, always as an end and never merely as a means. You may use the baker to get bread, but you may not treat him as a mere instrument, deceiving or coercing him, because he is a rational agent with ends of his own. This idea of dignity underlies much modern thinking about human rights and consent."
        ],
        people: ['phil.kant'],
        quote: { text: 'Act only in accordance with that maxim through which you can at the same time will that it become a universal law.', source: 'Immanuel Kant, Groundwork of the Metaphysics of Morals (1785), 4:421, translated by Mary Gregor' },
        links: [
          { to: 'phil.trolley-problem', type: 'links-to', why: "The footbridge case, where pushing one person saves five, tests whether using someone as a means is the line Kant said it is." },
          { to: 'phil.free-will', type: 'links-to', why: "Kant held that moral duty presupposes freedom: if I ought to do something, I must be able to choose it." },
          { to: 'phil.justice', type: 'leads-to', why: "Kant's claim that persons have dignity rather than a price underlies modern theories of rights and justice, including Rawls's." }
        ],
        objection: "Benjamin Constant pressed the case of the murderer at the door: if a killer asks where your friend is hiding, may you lie? Kant answered, in a 1797 essay, that you may not, which strikes most readers as absurd and suggests that rigid duties must sometimes yield to consequences.",
        prompts: ["When did you last treat someone merely as a means, even in a small way? What would treating them as an end have looked like?"],
        recall: [
          { q: "What is the universal law formulation of the categorical imperative?", a: "Act only on a maxim that you could at the same time will to become a universal law." },
          { q: "What is the humanity formulation?", a: "Always treat humanity, in yourself and others, as an end and never merely as a means." }
        ],
        further: ['Immanuel Kant, Groundwork of the Metaphysics of Morals (1785)', 'Christine Korsgaard, Creating the Kingdom of Ends (1996)']
      },
      {
        id: 'phil.trolley-problem', kind: 'idea', title: 'The trolley problem',
        line: "Divert a runaway trolley to kill one instead of five? Would you push someone to stop it?",
        facets: { branch: ['ethics'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "A runaway trolley will kill five people on the track ahead. You can pull a lever to switch it onto a side track, where it will kill one. Most people say you may pull the lever. Philippa Foot introduced a version of this case in 1967, and Judith Jarvis Thomson named it the trolley problem in 1976.",
          "Thomson then changed the scene. You are on a footbridge above the track beside a large stranger. Pushing him off would stop the trolley and save the five. The numbers are the same, yet most people say you must not push. Why is it permissible to kill one in the first case but not in the second?",
          "One candidate answer is the doctrine of double effect, which goes back to Thomas Aquinas: it can be permissible to cause a harm you foresee but do not intend, as a side effect, but not to use a harm as your means. In the footbridge case the man's death is the means. The psychologist Joshua Greene found that the footbridge case engages emotional brain responses more strongly, and the Moral Machine experiment gathered some forty million decisions on self driving car dilemmas from people in over two hundred countries and territories, finding both shared and culturally varied intuitions."
        ],
        people: ['phil.aquinas'],
        links: [
          { to: 'psy.heuristics', type: 'links-to', why: "Some psychologists and philosophers argue that our footbridge reactions are moral heuristics, fast rules of thumb that usually serve us well but misfire in odd cases." },
          { to: 'psy.kahneman', type: 'links-to', why: "Greene's dual process account of the trolley cases borrows the contrast between fast intuitive and slow deliberate thinking that Kahneman made famous." },
          { to: 'phil.virtue-ethics', type: 'links-to', why: "Virtue ethicists ask a different question of the footbridge: what kind of person would be willing to push?" }
        ],
        objection: "Critics call the whole enterprise 'trolleyology' and argue that the cases are so artificial, with certain outcomes and no other options, that our intuitions about them may tell us little about real moral life.",
        prompts: ["Would you pull the lever? Would you push? State the principle that explains both answers, then test it on a third case of your own."],
        recall: [
          { q: "What is the key difference between the switch case and the footbridge case?", a: "In both one dies to save five, but in the footbridge case you use the person's body as the means, and most people judge it wrong." },
          { q: "What is the doctrine of double effect?", a: "It can be permissible to cause a foreseen harm as a side effect of a good act, but not to intend the harm as a means." }
        ],
        further: ["Philippa Foot, 'The Problem of Abortion and the Doctrine of the Double Effect' (1967)", "Judith Jarvis Thomson, 'The Trolley Problem', Yale Law Journal (1985)", 'David Edmonds, Would You Kill the Fat Man? (2013)']
      },
      {
        id: 'phil.ren-li', kind: 'idea', title: 'Ren and li',
        line: "Humaneness grows through ritual: the small courtesies that make us more fully human.",
        facets: { branch: ['ethics', 'political'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'ren, li', respell: 'RUN, LEE', ipa: 'ʐən, li' },
        body: [
          "Two ideas sit at the heart of Confucius's teaching in the <em>Analects</em>. Ren, variously translated as humaneness, benevolence or goodness, is the complete virtue of a person who cares for others; asked about it, Confucius once answered simply, 'love people'. Li originally meant sacred ritual, but Confucius widened it to the whole fabric of propriety: ceremonies, manners, the right way to greet, mourn, give and receive.",
          "The two are bound together. To overcome the self and return to li is ren, Confucius says. Ritual is not empty form; it is how feeling is trained and expressed, the way a bow or a handshake turns a bare encounter into a meeting of persons. The philosopher Herbert Fingarette called this 'the secular as sacred'.",
          "Relationships matter more than abstract rules. Ren begins in the family, with xiao, filial devotion, and extends outward. Confucius also taught the rectification of names: when a ruler does not act as a ruler, or a father as a father, words and roles come apart and society decays."
        ],
        people: ['phil.confucius', 'phil.mencius'],
        quote: { text: 'What you do not wish for yourself, do not impose on others.', source: 'Confucius, Analects 15.24 (also 12.2)' },
        links: [
          { to: 'phil.confucianism', type: 'part-of', why: "Ren and li are the core vocabulary of the Confucian tradition." },
          { to: 'phil.ubuntu', type: 'links-to', why: "Like ubuntu, Confucian ethics locates personhood in relationships, so that you become more fully human through how you treat others." },
          { to: 'phil.good-life', type: 'links-to', why: "For Confucius the good life is lived in relationships, becoming humane through the roles of child, parent, friend and citizen." }
        ],
        objection: "Ritual can harden into hierarchy. Critics from Mozi to the reformers of China's May Fourth Movement in 1919 argued that li entrenched the authority of rulers over subjects, fathers over sons and husbands over wives, and that love graded by closeness breeds favouritism.",
        prompts: ["Which small ritual in your own family, a greeting, a meal, a farewell, does real moral work? What would be lost without it?"],
        recall: [
          { q: "What do ren and li mean?", a: "Ren is humaneness or benevolence, the complete virtue; li is ritual propriety, the whole fabric of courtesy and ceremony." },
          { q: "What is the rectification of names?", a: "The Confucian teaching that roles and words must match, so that a ruler acts as a ruler and a father as a father." }
        ],
        further: ['Confucius, The Analects, translated by D. C. Lau (1979)', 'Herbert Fingarette, Confucius: The Secular as Sacred (1972)']
      },
      {
        id: 'phil.social-contract', kind: 'idea', title: 'The social contract',
        line: "Political authority is legitimate because, in some sense, we have agreed to it.",
        facets: { branch: ['political'], era: ['early-modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Why should anyone obey the state? Social contract theorists answer by imagining people without one, in a state of nature, and asking what they would agree to. Thomas Hobbes, writing in the shadow of the English Civil War, thought life there would be a war of all against all, and rational people would hand almost unlimited power to a sovereign in exchange for peace.",
          "John Locke was more hopeful. People in a state of nature already have natural rights to life, liberty and property; they create government only to protect those rights better, and if a government violates them, the people may resist and replace it. His ideas echo in the American Declaration of Independence. Jean Jacques Rousseau opened <em>The Social Contract</em> (1762) with the line 'Man is born free, and everywhere he is in chains', and sought a society in which, by obeying the general will, each person obeys only himself.",
          "In the twentieth century John Rawls revived the tradition with an agreement made behind a veil of ignorance. Critics such as Carole Pateman and Charles Mills have asked who was left out of the original contracts, and on what terms."
        ],
        people: ['phil.locke'],
        quote: { text: 'No arts; no letters; no society; and which is worst of all, continual fear, and danger of violent death; and the life of man, solitary, poor, nasty, brutish, and short.', source: 'Thomas Hobbes, Leviathan (1651), chapter 13' },
        links: [
          { to: 'phil.veil-of-ignorance', type: 'leads-to', why: "Rawls's veil of ignorance is a modern social contract: the principles of justice are those we would agree to without knowing our place." },
          { to: 'phil.justice', type: 'links-to', why: "Contract theories ground justice in agreement, against theories that ground it in natural law, utility or a shared idea of the good." },
          { to: 'phil.ubuntu', type: 'contrasts', why: "Social contract theory starts from separate individuals who choose to join together; ubuntu starts from persons already made by their community." }
        ],
        objection: "David Hume's reply: nobody actually agreed. To say a poor peasant consents to the government by staying in his country is like saying a man consents to the captain's rule because he stays aboard a ship he was carried onto while asleep, when leaving means leaping into the ocean.",
        prompts: ["What have you actually agreed to as a citizen? If you never agreed, why do you still think you should obey most laws?"],
        recall: [
          { q: "How did Hobbes describe life in the state of nature?", a: "A war of all against all, in which life is solitary, poor, nasty, brutish and short." },
          { q: "What was Hume's objection to the social contract?", a: "No one actually consented; staying in a country you cannot afford to leave is no more consent than staying on a ship you were carried onto asleep." }
        ],
        further: ['Thomas Hobbes, Leviathan (1651)', 'John Locke, Second Treatise of Government (1689)', 'Jean Jacques Rousseau, The Social Contract (1762)']
      },
      {
        id: 'phil.justice', kind: 'idea', title: 'Justice',
        line: "What do we owe one another, and how should a society share its benefits and burdens?",
        facets: { branch: ['political', 'ethics'], era: ['ancient', 'contemporary'], tradition: ['western'] },
        body: [
          "Justice is the virtue of giving each their due, and the argument is about what is due. Plato's <em>Republic</em>, the first great book on the subject, argues that justice in a city, as in a soul, is each part doing its proper work in harmony. Aristotle distinguished distributive justice, sharing out goods fairly, from corrective justice, repairing wrongs between people.",
          "Modern debates centre on distribution. John Rawls argued in <em>A Theory of Justice</em> (1971) that social and economic inequalities are justified only if they benefit the least advantaged. Robert Nozick replied in 1974 that justice concerns how holdings arose, not their overall pattern: whatever comes about through fair acquisition and free exchange is just, however unequal.",
          "Amartya Sen and Martha Nussbaum shifted the question from what people have to what they are able to do and be. Their capabilities approach asks whether each person can live a life of normal length, be healthy, be educated, take part in politics, play and love. It helped shape the United Nations Human Development Index."
        ],
        people: ['phil.plato', 'phil.aristotle', 'phil.rawls', 'phil.nussbaum'],
        quote: { text: 'Justice is the first virtue of social institutions, as truth is of systems of thought.', source: 'John Rawls, A Theory of Justice (1971), section 1' },
        links: [
          { to: 'phil.utilitarianism', type: 'contrasts', why: "Utilitarians judge a distribution by total wellbeing; most theories of justice insist that how it is shared among separate persons matters in itself." },
          { to: 'phil.ubuntu', type: 'links-to', why: "Ubuntu informed South Africa's Truth and Reconciliation Commission, which pursued restorative rather than purely retributive justice." },
          { to: 'phil.virtue-ethics', type: 'links-to', why: "For Plato and Aristotle justice is first a virtue of persons, and only then a property of cities and laws." }
        ],
        objection: "Nozick's Wilt Chamberlain argument against patterned theories such as Rawls's: start from any distribution you consider just, then let a million fans each freely pay a star basketball player twenty five cents to watch him. The result is unequal, yet every step was voluntary, so preserving any fixed pattern requires continual interference in people's free choices.",
        prompts: ["Is it unjust that some people are born with talents others lack? If so, what, if anything, follows?"],
        recall: [
          { q: "What is Rawls's difference principle?", a: "Social and economic inequalities are justified only if they benefit the least advantaged members of society." },
          { q: "What does the capabilities approach measure?", a: "What people are actually able to do and be, such as be healthy, educated and politically active, rather than only their income or resources." }
        ],
        further: ['John Rawls, A Theory of Justice (1971)', 'Robert Nozick, Anarchy, State, and Utopia (1974)', "Michael Sandel, Justice: What's the Right Thing to Do? (2009)"]
      },
      {
        id: 'phil.veil-of-ignorance', kind: 'idea', title: 'The veil of ignorance',
        line: "Design a fair society without knowing who you will be in it.",
        facets: { branch: ['political', 'ethics'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "Imagine you are choosing the basic rules of a society, but behind a veil of ignorance: you do not know whether you will be rich or poor, male or female, talented or not, religious or not, healthy or disabled. John Rawls called this the original position. Its point is to strip away the knowledge that lets us tilt the rules in our own favour, so that what remains is a fair procedure.",
          "Rawls argued that people choosing behind the veil would agree on two principles. First, each person has an equal right to the most extensive basic liberties compatible with the same liberties for all. Second, inequalities must be attached to positions open to all under fair equality of opportunity, and must work to the greatest benefit of the least advantaged. With your whole life at stake, you would protect yourself against the worst outcome.",
          "The device is easy to use at home. Try it on a school admissions policy, a tax rule or the division of household chores: which arrangement would you accept if you did not know which person you would turn out to be?"
        ],
        people: ['phil.rawls'],
        links: [
          { to: 'phil.justice', type: 'part-of', why: "The veil is Rawls's method for deriving principles of justice." },
          { to: 'phil.utilitarianism', type: 'responds-to', why: "Rawls designed the original position partly to show that people choosing fairly would reject utilitarianism, which could sacrifice some for a greater total." },
          { to: 'phil.deontology', type: 'links-to', why: "Rawls called his theory Kantian: the veil models persons as free and equal, choosing principles that each of them could accept." },
          { to: 'psy.kahneman', type: 'links-to', why: "Whether people behind the veil would play safe is partly a question about attitudes to risk, which Kahneman and Tversky showed differ from what classical economics assumed." }
        ],
        objection: "John Harsanyi, who used a similar device before Rawls, argued that rational people behind the veil would maximise their expected wellbeing and so choose average utilitarianism, not Rawls's cautious protection of the worst off. Communitarians such as Michael Sandel add that no real person is the unattached chooser the veil imagines.",
        prompts: ["Apply the veil to an arrangement in your own household. Does the fair version differ from the current one?"],
        recall: [
          { q: "What does the veil of ignorance hide?", a: "Your place in society: wealth, sex, talents, health, beliefs and so on." },
          { q: "Which two principles did Rawls think would be chosen?", a: "Equal basic liberties for all; and inequalities allowed only with fair equality of opportunity and only if they most benefit the least advantaged." }
        ],
        further: ['John Rawls, A Theory of Justice (1971), chapter III', 'John Rawls, Justice as Fairness: A Restatement (2001)']
      },
      {
        id: 'phil.god-evil', kind: 'idea', title: 'God and the problem of evil',
        line: "If God is all good and all powerful, why is there so much suffering?",
        facets: { branch: ['religion', 'metaphysics'], era: ['ancient', 'medieval', 'early-modern', 'contemporary'], tradition: ['western', 'islamic'] },
        body: [
          "Philosophers have offered three classic kinds of argument for God. The ontological argument, from Anselm in the eleventh century, claims that God, as that than which nothing greater can be conceived, must exist, since existing is greater than not existing. Cosmological arguments, developed by Avicenna, Al Ghazali and Aquinas, argue that the chain of causes or of contingent things needs a first cause or a necessary being. Design arguments, made famous by William Paley's watch found on a heath, reason from the order of nature to a designer; Darwin later offered another explanation of that order.",
          "Against all of them stands the problem of evil. If God is all powerful, God could prevent suffering; if all good, God would want to; yet suffering exists. Hume voiced it in his <em>Dialogues Concerning Natural Religion</em>.",
          "Theodicies try to answer. Augustine held that evil is not a thing but a privation of good, which entered through the misuse of free will. Irenaeus, and John Hick after him, saw the world as a place of soul making, where virtue requires real challenge. Leibniz argued this is the best of all possible worlds, a claim Voltaire mocked in <em>Candide</em> after the Lisbon earthquake of 1755."
        ],
        people: ['phil.augustine', 'phil.aquinas', 'phil.leibniz', 'phil.avicenna', 'phil.ghazali'],
        quote: { text: "Epicurus's old questions are yet unanswered. Is he willing to prevent evil, but not able? then is he impotent. Is he able, but not willing? then is he malevolent. Is he both able and willing? whence then is evil?", source: 'David Hume, Dialogues Concerning Natural Religion (1779), Part X' },
        links: [
          { to: 'phil.free-will', type: 'links-to', why: "The free will defence rests on the claim that a world of genuinely free creatures, who can choose evil, is better than a world of puppets." },
          { to: 'phil.epicureanism', type: 'links-to', why: "The trilemma is traditionally credited to Epicurus, though the attribution comes from the later Christian writer Lactantius and is uncertain." },
          { to: 'phil.meaning', type: 'links-to', why: "Whether life can have meaning without God is one of the questions the debate over God's existence carries with it." }
        ],
        objection: "Natural evil is the hardest case for any theodicy. William Rowe described a fawn burned in a forest fire, dying slowly, unseen by anyone; no free choice causes it and no one's soul is made by it, so it is hard to see what greater good could require it.",
        prompts: ["Which kind of suffering seems hardest to fit into any good purpose? Why that kind?"],
        recall: [
          { q: "State the problem of evil in one sentence.", a: "If God is all powerful and all good, God could and would prevent suffering, yet suffering exists." },
          { q: "What is Augustine's account of evil?", a: "Evil is not a substance but a privation, an absence of good, introduced through the misuse of free will." }
        ],
        further: ['David Hume, Dialogues Concerning Natural Religion (1779)', 'John Hick, Evil and the God of Love (1966)', 'J. L. Mackie, The Miracle of Theism (1982)']
      },
      {
        id: 'phil.absurd', kind: 'idea', title: 'The absurd',
        line: "We demand meaning; the universe answers with silence. The clash is the absurd.",
        facets: { branch: ['meaning'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "For Albert Camus the absurd is not a feature of the world, nor of us, but of the relationship between them. Human beings long for clarity, unity and meaning; the world offers none, only what he called its unreasonable silence. The absurd is born of that confrontation.",
          "In <em>The Myth of Sisyphus</em> (1942) Camus asks whether this makes life not worth living. He rejects two escapes: physical suicide, which surrenders to the absurd, and what he called philosophical suicide, a leap into religious or metaphysical hope that the evidence does not support; he counted Kierkegaard's faith as one such leap. Instead he recommends revolt, freedom and passion: living fully and lucidly, without appeal.",
          "His emblem is Sisyphus, condemned by the gods to roll a rock up a hill forever, only to watch it roll down again. Camus pictures him walking back down, fully aware, and concludes that the struggle itself is enough to fill a heart. In 1971 Thomas Nagel offered a cooler diagnosis: absurdity comes from our ability to step back and see our serious concerns as arbitrary, while being unable to stop taking them seriously."
        ],
        people: ['phil.nagel', 'phil.kierkegaard'],
        quote: { text: 'One must imagine Sisyphus happy.', source: "Albert Camus, The Myth of Sisyphus (1942), final sentence, translated by Justin O'Brien" },
        links: [
          { to: 'phil.existentialism', type: 'links-to', why: "Camus is usually grouped with the existentialists, though he rejected the label; both start from a world without given meaning." },
          { to: 'phil.meaning', type: 'links-to', why: "The absurd is one answer to the question of life's meaning: none is given, and we must live without appeal." },
          { to: 'phil.death', type: 'links-to', why: "Camus opened his book by calling suicide the one truly serious philosophical problem, tying the absurd directly to whether to go on living." }
        ],
        objection: "Why should the universe's silence matter? Critics such as Susan Wolf argue that meaning need not be cosmic: a life given to loving people and worthwhile projects is meaningful on a human scale, so the clash Camus describes depends on an inflated demand.",
        prompts: ["What is your own rock? Picture walking back down to it. What would make that walk bearable, or even good?"],
        recall: [
          { q: "For Camus, where does the absurd arise?", a: "In the confrontation between the human longing for meaning and the silent, indifferent world." },
          { q: "What did Camus mean by philosophical suicide?", a: "Escaping the absurd by a leap into religious or metaphysical hope that reason does not support." }
        ],
        further: ['Albert Camus, The Myth of Sisyphus (1942)', "Thomas Nagel, 'The Absurd' (1971), in Mortal Questions (1979)"]
      },
      {
        id: 'phil.meaning', kind: 'idea', title: 'The meaning of life',
        line: "Not 'what is life for?' in the abstract, but what could make your life worth living?",
        facets: { branch: ['meaning', 'ethics'], era: ['modern', 'contemporary'], tradition: ['western'] },
        body: [
          "The question 'what is the meaning of life?' became pressing in the nineteenth century, as traditional religious answers lost their hold on many people. Leo Tolstoy, at the height of his fame, described in <em>A Confession</em> (1882) being unable to answer a simple question: what will come of everything I do? He found his way back through the faith of ordinary working people.",
          "Philosophers now distinguish three families of answer. Supernaturalists hold that meaning requires God or a soul. Subjectivists hold that meaning comes from what you care about: if you find your life meaningful, it is. Objectivists hold that some activities are more worthwhile than others regardless of feeling, so that counting grains of sand is not meaningful however keen you are.",
          "Susan Wolf's influential hybrid says meaning arises when subjective attraction meets objective attractiveness: when you love something, and it is worth loving. On that view meaning is distinct from both happiness and morality. A life can be happy without being meaningful, and meaning often comes with struggle, care and sacrifice."
        ],
        links: [
          { to: 'psy.maslow', type: 'links-to', why: "Maslow placed self actualisation at the top of his hierarchy of needs, a psychological answer to what a fulfilled life looks like, though the hierarchy's evidence is weak." },
          { to: 'phil.existentialism', type: 'links-to', why: "Existentialists hold that meaning is not given but made, through what we choose and commit ourselves to." },
          { to: 'phil.death', type: 'links-to', why: "Some argue that mortality gives our choices their weight; others, that it threatens to make them pointless." }
        ],
        objection: "Who decides what is objectively worth loving? Critics worry that views like Wolf's smuggle in the tastes of academics, ranking philosophy above, say, watching football with friends, and that subjectivism is more respectful of how people actually find meaning.",
        prompts: ["List three things that make your life feel meaningful. Would each still count if no one ever knew about it?"],
        recall: [
          { q: "What are the three main families of view on the meaning of life?", a: "Supernaturalism (meaning requires God or a soul), subjectivism (meaning comes from what you care about) and objectivism (some activities are worthwhile regardless of feeling)." },
          { q: "What is Susan Wolf's view?", a: "Meaning arises when subjective attraction meets objective attractiveness: loving something that is worth loving." }
        ],
        further: ['Leo Tolstoy, A Confession (1882)', 'Susan Wolf, Meaning in Life and Why It Matters (2010)']
      },
      {
        id: 'phil.death', kind: 'idea', title: 'Death',
        line: "Should we fear death, and is it bad for the one who dies?",
        facets: { branch: ['meaning', 'metaphysics'], era: ['ancient', 'contemporary'], tradition: ['western', 'chinese', 'indian'] },
        body: [
          "Epicurus offered the most famous argument that death should not frighten us. Good and bad consist in sensation, and death is the end of sensation. When we exist, death is not present; when death is present, we do not exist. So death is nothing to us. His follower Lucretius added the symmetry argument: we feel no horror at the eternity before our birth, so why fear the eternity after our death?",
          "Thomas Nagel replied in 1970 that something can be bad for us without being experienced, as a betrayal behind your back is bad for you even if you never learn of it. Death is bad because it deprives us of the goods that more life would have brought.",
          "Other traditions treat death as a teacher. The Stoics practised imagining loss in advance so as to value what they had. Heidegger argued that authentic existence means facing our own death as ours alone. Zhuangzi, found drumming on a basin and singing after his wife died, explained that her life and death were like the turning of the seasons, and that to go on weeping would show he did not understand fate. Buddhism treats death as one more mark of impermanence."
        ],
        people: ['phil.epicurus', 'phil.nagel', 'phil.heidegger', 'phil.zhuangzi'],
        quote: { text: 'Death is nothing to us.', source: 'Epicurus, Letter to Menoeceus, 124 to 125' },
        links: [
          { to: 'phil.existentialism', type: 'links-to', why: "Existentialists from Kierkegaard to Heidegger and Sartre treat awareness of death as the background against which a life is chosen." },
          { to: 'phil.personal-identity', type: 'links-to', why: "Whether death must be the end depends partly on what you are: an organism, a soul or a psychological pattern." },
          { to: 'phil.stoicism', type: 'links-to', why: "The Stoics rehearsed death and loss in advance, so that mortality would sharpen rather than spoil their appreciation of life." }
        ],
        objection: "Against Epicurus: Nagel's deprivation account. Death need not be felt to be bad; it is bad as losing a future is bad. And the symmetry argument fails, Nagel suggests, because the future we lose is one we would otherwise have had, while we could not have been born much earlier and still been ourselves.",
        prompts: ["Do you feel differently about the time before you were born and the time after you will die? Should you?"],
        recall: [
          { q: "What is Epicurus's argument that death is nothing to us?", a: "Good and bad require sensation; death is the end of sensation; so when death is here we are not, and it cannot harm us." },
          { q: "What is the deprivation account of death's badness?", a: "Death is bad because it deprives us of the goods we would have had if we had lived longer." }
        ],
        further: ['Epicurus, Letter to Menoeceus', "Thomas Nagel, 'Death' (1970), in Mortal Questions (1979)"]
      },
      {
        id: 'phil.beauty', kind: 'idea', title: 'Beauty',
        line: "Is beauty in the object, in the eye of the beholder, or in the meeting of the two?",
        facets: { branch: ['aesthetics'], era: ['ancient', 'early-modern', 'contemporary'], tradition: ['western', 'japanese'] },
        body: [
          "For Plato, beauty was a ladder. In the <em>Symposium</em> the priestess Diotima teaches Socrates that love begins with one beautiful body, rises to beauty in all bodies, then to beautiful souls, laws and knowledge, and finally to Beauty itself, eternal and unchanging. Beauty, on this view, is a real feature of things that draws us upward.",
          "Eighteenth century thinkers turned to the observer. Hume, in 'Of the Standard of Taste' (1757), granted that beauty is a sentiment in the mind, yet argued that some judges, practised, delicate and free of prejudice, are better than others, and that their joint verdict sets a standard. Kant said a judgement of beauty is disinterested, free of any desire to possess or use the object, and that although it rests on feeling, it claims everyone's agreement, as if beauty were a property of the thing.",
          "Japanese aesthetics offers a contrasting sensibility. Mono no aware, a phrase made central by the scholar Motoori Norinaga in the eighteenth century, names a gentle sorrow at the passing of things, like cherry blossom, whose beauty is bound up with its brevity. Wabi sabi finds beauty in the rough, worn and imperfect."
        ],
        people: ['phil.plato', 'phil.hume', 'phil.kant'],
        links: [
          { to: 'phil.death', type: 'links-to', why: "Mono no aware ties beauty to transience, so that awareness of endings deepens appreciation rather than spoiling it." },
          { to: 'psy.perception', type: 'links-to', why: "Empirical aesthetics studies which features of faces, music and images people find beautiful, testing how far beauty depends on how perception works." },
          { to: 'phil.emptiness', type: 'links-to', why: "Japanese aesthetics of impermanence and imperfection grew partly from the Buddhist teaching that nothing has a fixed, lasting nature." }
        ],
        objection: "If beauty were an objective property we would expect far more agreement than we find. Judgements vary across cultures, eras and individuals, and are swayed by familiarity, so 'objective beauty' may be one group's preferences dressed up as universal.",
        prompts: ["Think of something you find beautiful that a friend does not. Is one of you wrong, or is something else going on?"],
        recall: [
          { q: "What did Kant mean by calling judgements of beauty disinterested?", a: "They involve pleasure without any desire to possess or use the object, yet they claim everyone's agreement." },
          { q: "What is mono no aware?", a: "A Japanese aesthetic of gentle sorrow at the passing of things, in which beauty is heightened by transience." }
        ],
        further: ['Plato, Symposium', 'Immanuel Kant, Critique of Judgement (1790)', 'Roger Scruton, Beauty (2009)']
      },
      {
        id: 'phil.ubuntu', kind: 'idea', title: 'Ubuntu',
        line: "A person is a person through other persons.",
        facets: { branch: ['ethics', 'political', 'mind'], era: ['contemporary'], tradition: ['african'] },
        say: { text: 'ubuntu', respell: 'oo BOON too', ipa: 'ʊˈbʊntuː' },
        body: [
          "Ubuntu is a word from the Nguni languages of southern Africa, such as isiZulu and isiXhosa, and it is often explained through a proverb: umuntu ngumuntu ngabantu, a person is a person through other persons. It names both a picture of what a person is and an ideal of how to live: humaneness, shown in hospitality, generosity, respect and concern for the community.",
          "The picture of personhood is relational. You are not first a self contained individual who then decides to join others; you become a person through relationships, and personhood is something you can realise more or less fully. The Nigerian philosopher Ifeanyi Menkiti argued that in much African thought personhood is achieved through moral growth within a community.",
          "Ubuntu became widely known through Archbishop Desmond Tutu, who drew on it to explain the work of South Africa's Truth and Reconciliation Commission after apartheid: justice there aimed to restore broken relationships, not only to punish. Contemporary philosophers such as Thaddeus Metz have tried to state it as a precise moral theory, on which an act is right insofar as it honours our capacity for harmonious relationships."
        ],
        quote: { text: 'Umuntu ngumuntu ngabantu: a person is a person through other persons.', source: 'Nguni proverb, in isiZulu' },
        links: [
          { to: 'psy.attachment', type: 'links-to', why: "Attachment research finds that a secure sense of self is built through early relationships, an empirical cousin of the claim that we become persons through others." },
          { to: 'phil.personal-identity', type: 'contrasts', why: "Most Western theories of personal identity look inside the individual; ubuntu locates personhood partly in relations with others." },
          { to: 'phil.virtue-ethics', type: 'links-to', why: "Like virtue ethics, ubuntu treats morality as becoming a certain kind of person, but it puts relationships rather than individual character at the centre." }
        ],
        objection: "Critics worry that an ethics of harmony and community can press individuals to conform, silencing dissenters and minorities for the sake of consensus, and that the concept is so broad it can be invoked to support almost anything.",
        prompts: ["Which relationships have made you more fully yourself? What would it mean to return the favour?"],
        recall: [
          { q: "What does the proverb umuntu ngumuntu ngabantu mean?", a: "A person is a person through other persons." },
          { q: "How did ubuntu shape South Africa's Truth and Reconciliation Commission?", a: "Desmond Tutu used it to explain a restorative idea of justice aimed at healing relationships rather than only punishing." }
        ],
        further: ['Desmond Tutu, No Future Without Forgiveness (1999)', 'Thaddeus Metz, A Relational Moral Theory: African Ethics in and beyond the Continent (2022)']
      },

      /* ===== Schools and traditions ===== */
      {
        id: 'phil.presocratics', kind: 'school', title: 'The Presocratics',
        line: "The first Greek philosophers asked what everything is made of, and answered with arguments, not myths.",
        facets: { branch: ['metaphysics', 'science'], era: ['ancient'], tradition: ['western'] },
        body: [
          "In the sixth century BCE, in the Greek city of Miletus on the coast of what is now Turkey, Thales is said to have proposed that everything is water. The answer was wrong, but the question was new: what is the single underlying stuff of all things, and how can we explain the world without stories about the gods? Anaximander suggested something boundless; Anaximenes, air.",
          "Others went in startling directions. Heraclitus taught that everything flows, held together by an ordering logos. Parmenides argued, against all appearances, that change is impossible, because what is not cannot be. His pupil Zeno defended him with paradoxes, such as swift Achilles never catching the tortoise. Pythagoras and his followers found number at the root of things; Leucippus and Democritus proposed that everything is atoms moving in the void.",
          "Their writings survive only in fragments quoted by later authors. 'Presocratic' is a label of convenience, since some, like Democritus, were Socrates's contemporaries. Yet nearly every later debate about change, permanence, matter and mind begins here."
        ],
        quote: { text: 'You cannot step twice into the same river.', source: 'Heraclitus, as reported by Plato, Cratylus 402a' },
        links: [
          { to: 'phil.being', type: 'influenced', why: "Parmenides's argument about what is and what is not set the question of being for all later metaphysics." },
          { to: 'phil.plato', type: 'influenced', why: "Plato built his theory of Forms partly to reconcile Heraclitus's world of flux with Parmenides's demand for something unchanging." },
          { to: 'phil.determinism', type: 'influenced', why: "The atomists pictured a world of atoms moving by necessity, one of the earliest forms of determinism." }
        ],
        objection: "Aristotle, our main early source, read them through his own theory of causes, so we may see them through his eyes. And their bold single principles, everything is water, everything is number, were speculations that no observation of the time could test.",
        prompts: ["If you had to name one underlying stuff of everything, without modern science, what would you choose, and why?"],
        recall: [
          { q: "What did Thales say everything is made of?", a: "Water." },
          { q: "How did Heraclitus and Parmenides disagree about change?", a: "Heraclitus said everything flows and change is constant; Parmenides argued that change is impossible and only unchanging being is real." }
        ],
        further: ['Jonathan Barnes, Early Greek Philosophy (1987)', 'Catherine Osborne, Presocratic Philosophy: A Very Short Introduction (2004)']
      },
      {
        id: 'phil.stoicism', kind: 'school', title: 'Stoicism',
        line: "Some things are up to us and some are not; peace lies in knowing the difference.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        body: [
          "Stoicism began around 300 BCE, when Zeno of Citium taught at the Stoa Poikile, a painted porch in Athens. Under Cleanthes and Chrysippus it became a complete system of logic, physics and ethics, and in Rome it found its most widely read voices: Seneca, a statesman; Epictetus, a former slave; and Marcus Aurelius, an emperor.",
          "The ethical core is simple to state and hard to live. Virtue, meaning wisdom, justice, courage and self control, is the only true good. Health, wealth and reputation are 'indifferents': naturally preferred, but not needed for a good life. Our distress comes not from events but from our judgements about them. So Epictetus begins his handbook by dividing the world into what is up to us, our judgements, intentions and desires, and what is not, which is almost everything else.",
          "Stoicism is not the suppression of feeling. The Stoics aimed to replace destructive passions with well founded emotions, and believed every human being is a citizen of the world, bound to others by a shared reason. They also held a form of determinism and argued that it is compatible with responsibility. The modern word 'stoic' keeps only a fragment of all this."
        ],
        people: ['phil.epictetus', 'phil.seneca', 'phil.marcus-aurelius'],
        links: [
          { to: 'psy.cbt', type: 'influenced', why: "Albert Ellis and Aaron Beck both acknowledged the Stoics, especially the claim that we are disturbed by our judgements about things, as forerunners of cognitive therapy." },
          { to: 'eng.from-ideas', type: 'links-to', why: "The English word 'stoic' comes from the Stoa, though in everyday use it has shrunk to mean enduring hardship without complaint." },
          { to: 'phil.compatibilism', type: 'influenced', why: "Chrysippus's rolling cylinder was one of the first attempts to square fate with responsibility." },
          { to: 'phil.virtue-ethics', type: 'links-to', why: "Stoic ethics is a strict virtue ethics: virtue is not just the main good but the only one." },
          { to: 'phil.good-life', type: 'links-to', why: "For the Stoics the good life is living in agreement with nature and reason, which virtue alone secures." }
        ],
        objection: "Epictetus advised that when you kiss your child you should remind yourself you are kissing a mortal, so that you will not be disturbed if the child dies. Critics, ancient and modern, ask whether such protection against grief is bought by loving less.",
        prompts: ["Think of something worrying you today. Which part of it is up to you, and which is not?"],
        recall: [
          { q: "What is the Stoic dichotomy of control?", a: "Some things are up to us (our judgements, intentions and desires) and some are not (body, property, reputation, events); we should attend to the first." },
          { q: "What did the Stoics mean by 'indifferents'?", a: "Things like health and wealth that are naturally preferred but neither good nor bad in themselves, because only virtue is good." }
        ],
        further: ['Epictetus, Handbook (Enchiridion)', 'Seneca, Letters to Lucilius', 'A. A. Long, Epictetus: A Stoic and Socratic Guide to Life (2002)']
      },
      {
        id: 'phil.epicureanism', kind: 'school', title: 'Epicureanism',
        line: "Pleasure is the goal of life, but the deepest pleasure is a calm mind among friends.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        body: [
          "Epicurus founded his school around 306 BCE in a garden on the edge of Athens, where, unusually, women and slaves were among the members. He taught that pleasure is the beginning and end of a happy life. But he meant something quieter than feasting: the highest pleasures are ataraxia, freedom from mental disturbance, and aponia, freedom from bodily pain.",
          "The method is to sort desires. Some are natural and necessary, like food, shelter and friendship, and easy to satisfy. Some are natural but unnecessary, like luxurious food. Others, like fame and power, are empty and endless. Bread, water, good friends and conversation are enough; Epicurus is reported to have asked for a little pot of cheese when he wanted to feast.",
          "Behind the ethics stood a physics borrowed from Democritus: everything is atoms and void, the gods exist but take no interest in us, and the soul disperses at death. Both lessons were meant to remove fear. Lucretius set out the whole system in his Latin poem <em>On the Nature of Things</em>, whose rediscovery in 1417 fed the Renaissance. The word 'epicure', for someone devoted to fine food, would have puzzled Epicurus."
        ],
        people: ['phil.epicurus'],
        links: [
          { to: 'eng.from-ideas', type: 'links-to', why: "The English 'epicure', a lover of fine food, comes from Epicurus, ironically, since he praised bread and water." },
          { to: 'phil.good-life', type: 'links-to', why: "Epicureanism is the classic hedonist account of the good life, with pleasure understood as tranquillity." },
          { to: 'phil.death', type: 'links-to', why: "Epicurus's argument that death is nothing to us was meant to free his followers from the greatest fear of all." },
          { to: 'phil.determinism', type: 'contrasts', why: "To leave room for freedom, the Epicureans said atoms occasionally swerve unpredictably, one of the first attempts to break a deterministic chain." },
          { to: 'phil.stoicism', type: 'contrasts', why: "Stoics and Epicureans were the great rival schools of the Hellenistic world: virtue against pleasure, providence against chance." }
        ],
        objection: "If the highest good is the absence of pain and disturbance, then an untroubled life withdrawn from risk, love and politics looks ideal. Critics from Cicero on argued that this sells short the active goods of justice, achievement and deep attachment, which bring disturbance with them.",
        prompts: ["Sort three things you want this year into natural and necessary, natural but unnecessary, and empty. Any surprises?"],
        recall: [
          { q: "What did Epicurus mean by pleasure?", a: "Chiefly ataraxia and aponia: freedom from mental disturbance and from bodily pain, not indulgence." },
          { q: "What are 'empty' desires, for Epicurus?", a: "Desires that are neither natural nor necessary, such as for fame or power, which can never be satisfied." }
        ],
        further: ['Epicurus, Letter to Menoeceus', 'Lucretius, On the Nature of Things', 'Stephen Greenblatt, The Swerve (2011)']
      },
      {
        id: 'phil.cynicism', kind: 'school', title: 'Cynicism',
        line: "Live by nature, own nothing, and shame the world into seeing its conventions.",
        facets: { branch: ['ethics'], era: ['ancient'], tradition: ['western'] },
        body: [
          "The Cynics were the performance artists of ancient philosophy. Diogenes of Sinope, active in the fourth century BCE, is said to have lived in a large storage jar in Athens, begged for food, and walked through the market in daylight with a lamp, looking for an honest human being. Their name comes from the Greek for 'doglike', an insult they wore with pride: dogs live naturally and without shame.",
          "Behind the stunts was a serious ethics descending from Socrates through his follower Antisthenes. Happiness comes from virtue, virtue from living according to nature, and most conventions, wealth, status and manners, are obstacles. Asked where he came from, Diogenes called himself a citizen of the world. The best known story has Alexander the Great offering him anything he wanted; Diogenes asked him to stand out of his sunlight.",
          "Crates, a Cynic, taught Zeno of Citium, who went on to found Stoicism, keeping the Cynic core of virtue and nature while softening the shamelessness. Today 'cynical' means distrustful of other people's motives, a long way from the original, though the Cynics' scorn for pretence survives in it."
        ],
        people: ['phil.socrates'],
        links: [
          { to: 'eng.from-ideas', type: 'links-to', why: "English 'cynical' comes from the Cynics, though its meaning has drifted from shameless naturalness to suspicion of other people's motives." },
          { to: 'phil.stoicism', type: 'influenced', why: "Zeno, the founder of Stoicism, studied with the Cynic Crates and kept the Cynic conviction that virtue alone suffices for happiness." },
          { to: 'phil.socrates', type: 'links-to', why: "The Cynics took Socrates's indifference to wealth and comfort to its extreme." },
          { to: 'phil.good-life', type: 'links-to', why: "The Cynics offered the most radical ancient answer to how to live well: own nothing and follow nature." }
        ],
        objection: "The Cynics rejected society while depending on its charity and tolerance, and their shamelessness could shade into cruelty and contempt. A way of life that only works if most people do not adopt it is hard to recommend as the good life.",
        prompts: ["Which convention in your own life would a Cynic mock most mercilessly? Would they be right?"],
        recall: [
          { q: "Where does the name 'Cynic' come from?", a: "From the Greek for 'doglike', an insult the Cynics adopted because dogs live naturally and without shame." },
          { q: "How is Cynicism connected to Stoicism?", a: "Zeno, founder of Stoicism, studied with the Cynic Crates and kept the idea that virtue alone suffices for happiness." }
        ],
        further: ['Diogenes Laertius, Lives of the Eminent Philosophers, Book VI']
      },
      {
        id: 'phil.confucianism', kind: 'school', title: 'Confucianism',
        line: "Two and a half thousand years of thinking about how to become humane, in families and states.",
        facets: { branch: ['ethics', 'political'], era: ['ancient', 'medieval', 'early-modern', 'contemporary'], tradition: ['chinese'] },
        body: [
          "Confucianism grows from the teachings of Confucius, collected by his disciples in the <em>Analects</em> and developed by Mencius and Xunzi. Its concern is how ordinary people can become humane, and how a society can be ordered by virtue and ritual rather than by force and punishment. The ideal ruler leads by example; the virtue of the exemplary person, the <em>Analects</em> says, is like the wind, and the grass bends where the wind blows.",
          "After suppression under the Qin, Confucianism became state orthodoxy under the Han dynasty in the second century BCE. In the Song dynasty, Neo Confucian thinkers such as Zhu Xi, answering the challenge of Buddhism, added a metaphysics of principle (li, a different word from ritual) and vital energy (qi). Zhu Xi's commentaries became the basis of the imperial examinations, which lasted until 1905. Wang Yangming later stressed the unity of knowing and acting.",
          "Confucian values of education, family, ritual and service shaped Korea, Japan, Vietnam and Singapore as well as China. Modern New Confucians have argued that the tradition can support democracy and human rights, while critics see in it a defence of hierarchy."
        ],
        people: ['phil.confucius', 'phil.mencius'],
        links: [
          { to: 'phil.virtue-ethics', type: 'links-to', why: "Confucian ethics, with its cultivation of character through practice, is often studied alongside Aristotle as a kind of virtue ethics." },
          { to: 'phil.dao', type: 'contrasts', why: "Daoists mocked Confucian effort and ritual as unnatural; the two traditions have argued with, and borrowed from, each other ever since." },
          { to: 'phil.social-contract', type: 'contrasts', why: "Confucian political thought grounds authority in the ruler's virtue and the people's welfare, not in an agreement among individuals." }
        ],
        objection: "Critics, from the Mohists in ancient China to modern liberals, argue that Confucianism's graded love, deference to elders and rulers, and traditional roles for women entrench inequality and discourage dissent.",
        prompts: ["Which Confucian value is most alive in the culture you grew up in, and which have you quietly let go?"],
        recall: [
          { q: "Which dynasty made Confucianism state orthodoxy?", a: "The Han dynasty, in the second century BCE." },
          { q: "Who was Zhu Xi?", a: "The leading Neo Confucian philosopher of the Song dynasty, whose commentaries became the basis of the imperial examinations." }
        ],
        further: ['Confucius, The Analects', 'Bryan W. Van Norden, Introduction to Classical Chinese Philosophy (2011)']
      },
      {
        id: 'phil.existentialism', kind: 'school', title: 'Existentialism',
        line: "There is no human nature given in advance; we make ourselves through what we choose.",
        facets: { branch: ['meaning', 'ethics'], era: ['modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Existentialism names a family of thinkers who start from the concrete situation of an individual human being, thrown into a world without given meaning, who must choose and act and will die. Kierkegaard and Nietzsche in the nineteenth century are its forerunners. Sartre, de Beauvoir and Camus made it famous in France in the 1940s, though Camus rejected the label, as did Heidegger, from whom much of its vocabulary came.",
          "Sartre's slogan was that existence precedes essence. A paper knife is designed for a purpose before it is made; a human being, if there is no God to design us, exists first and defines themselves afterwards. We are 'condemned to be free'. This freedom brings anguish, and we flee it through bad faith, pretending we have no choice, like Sartre's café waiter who plays at being a waiter as if that role were all he could be.",
          "Authenticity means owning your choices and the responsibility that comes with them. De Beauvoir insisted that freedom is always situated, shaped by body, sex, class and history, and that my freedom requires the freedom of others."
        ],
        people: ['phil.sartre', 'phil.beauvoir', 'phil.kierkegaard', 'phil.nietzsche', 'phil.heidegger'],
        quote: { text: 'Existence precedes essence.', source: 'Jean Paul Sartre, Existentialism Is a Humanism (lecture 1945, published 1946)' },
        links: [
          { to: 'psy.maslow', type: 'influenced', why: "Humanistic psychology, including Maslow's self actualisation and Rollo May's existential therapy, drew directly on existentialist themes of choice and authenticity." },
          { to: 'phil.free-will', type: 'links-to', why: "Existentialism treats radical freedom as a basic fact of experience: we cannot not choose." },
          { to: 'phil.god-evil', type: 'links-to', why: "Sartre's argument starts from atheism: with no designer, there is no human essence laid down in advance." }
        ],
        objection: "Radical freedom seems to ignore how much of a life is shaped by circumstance. Marxists, and in part de Beauvoir and Merleau Ponty, argued that Sartre's early picture of absolute freedom underestimates poverty, oppression, embodiment and habit.",
        prompts: ["Where in your life do you most often say 'I have no choice'? Is that true, or is it bad faith?"],
        recall: [
          { q: "What does 'existence precedes essence' mean?", a: "Humans are not made to a prior design; we exist first and define ourselves through our choices." },
          { q: "What is bad faith?", a: "Self deception in which we deny our own freedom, pretending we are fixed by a role, a nature or circumstances." }
        ],
        further: ['Sarah Bakewell, At the Existentialist Café (2016)', 'Jean Paul Sartre, Existentialism Is a Humanism (1946)']
      },
      {
        id: 'phil.phenomenology', kind: 'school', title: 'Phenomenology',
        line: "Before theorising about the world, describe carefully how it shows up in experience.",
        facets: { branch: ['mind', 'epistemology'], era: ['contemporary'], tradition: ['western'] },
        body: [
          "Phenomenology, founded by Edmund Husserl around 1900, begins with a call to go back 'to the things themselves'. Instead of starting from scientific theories about light waves and neurons, it asks us to describe experience exactly as it is lived: how a melody unfolds in time, how a cup appears with a hidden back that we nonetheless expect, how other people show up as minds rather than objects.",
          "Its key idea, taken from Husserl's teacher Franz Brentano, is intentionality: consciousness is always consciousness of something. To study it, Husserl proposed the epoché, bracketing the question of whether the world exists so as to attend to how it is given. Later he emphasised the lifeworld, the shared everyday world from which science itself grows.",
          "His students and readers took it in new directions. Heidegger turned it toward being in the world and practical engagement: a hammer shows up first as something to hammer with, not as an object with properties. Merleau Ponty made the lived body central. Sartre and de Beauvoir built existentialism on it, and today it informs cognitive science through the study of embodied minds."
        ],
        people: ['phil.husserl', 'phil.heidegger', 'phil.beauvoir'],
        links: [
          { to: 'phil.existentialism', type: 'leads-to', why: "Sartre and de Beauvoir built their existentialism on phenomenological descriptions of freedom, anxiety and the gaze of others." },
          { to: 'psy.perception', type: 'links-to', why: "Phenomenological descriptions of objects showing up with hidden sides we expect anticipate psychological accounts of perception as active prediction." },
          { to: 'phil.consciousness', type: 'links-to', why: "Phenomenology offers a method for describing consciousness precisely, which some hope can bridge first person experience and brain science." }
        ],
        objection: "Description is never neutral. Critics such as Daniel Dennett argue that careful first person reports are less reliable than phenomenologists assume, so experience must also be studied from the outside, treating what people say they experience as data to be explained.",
        prompts: ["Describe your next cup of tea or coffee only as it appears to you, with no theory at all. What did you notice that you usually miss?"],
        recall: [
          { q: "What is intentionality?", a: "The 'aboutness' of consciousness: every experience is an experience of something." },
          { q: "What is the epoché?", a: "Husserl's method of bracketing belief in the world's existence in order to attend to how things are given in experience." }
        ],
        further: ['Dan Zahavi, Phenomenology: The Basics (2018)', 'Sarah Bakewell, At the Existentialist Café (2016)']
      },
      {
        id: 'phil.pragmatism', kind: 'school', title: 'Pragmatism',
        line: "To understand an idea, ask what difference it would make in practice.",
        facets: { branch: ['epistemology', 'science'], era: ['modern', 'contemporary'], tradition: ['western'] },
        body: [
          "Pragmatism is the distinctively American contribution to philosophy. Charles Sanders Peirce proposed in 1878 that the meaning of a concept lies in its conceivable practical effects: to call something hard is to say, among other things, that it will not be scratched by many other substances. If two ideas make no possible difference in experience, they do not really differ.",
          "William James popularised the movement and extended it to truth. True ideas, he wrote in <em>Pragmatism</em> (1907), are those we can assimilate, validate and verify; truth is what works in the long run of experience, the 'cash value' of an idea. He applied this to religion, arguing that we may have a right to believe where evidence cannot decide and much is at stake. John Dewey applied it to education and democracy: thinking is a tool for solving problems, and schools should teach by doing.",
          "Richard Rorty revived pragmatism late in the twentieth century, urging philosophers to give up the hope of mirroring reality and ask instead which ways of talking serve us best."
        ],
        people: ['psy.william-james'],
        links: [
          { to: 'psy.william-james', type: 'links-to', why: "William James was both a founder of scientific psychology and the most influential pragmatist, and his psychology of habit and attention shaped his philosophy." },
          { to: 'phys.qbism', type: 'links-to', why: "QBism's founders cite James and Dewey: the quantum state is a tool an agent uses to guide action and expectation, not a mirror of reality." },
          { to: 'phil.realism', type: 'contrasts', why: "Pragmatists reject the picture of truth as a mirror of a reality independent of us, which puts them at odds with traditional realism." },
          { to: 'phil.knowledge', type: 'links-to', why: "Pragmatists treat knowledge as fallible and practical, a tool tested by its consequences rather than a certainty grounded once and for all." }
        ],
        objection: "Bertrand Russell objected that 'true' cannot mean 'useful' or 'works': it may be useful to believe a comforting falsehood, and whether a belief works is itself a factual question we can be right or wrong about.",
        prompts: ["Pick a debate you have heard many times. What practical difference would it make if one side were right?"],
        recall: [
          { q: "What is Peirce's pragmatic maxim?", a: "The meaning of a concept lies in the conceivable practical effects of its object." },
          { q: "How did William James characterise truth?", a: "As what works: ideas we can assimilate, validate and verify, the 'cash value' of an idea in experience." }
        ],
        further: ['William James, Pragmatism (1907)', 'Louis Menand, The Metaphysical Club (2001)']
      },

      /* ===== Thinkers: China, India, the Islamic world, Africa, Japan ===== */
      {
        id: 'phil.confucius', kind: 'thinker', title: 'Confucius',
        line: "A teacher of ritual and humaneness whose sayings shaped East Asian life for two millennia.",
        facets: { branch: ['ethics', 'political'], era: ['ancient'], tradition: ['chinese'] },
        life: '551 to 479 BCE (traditional dates)', place: 'State of Lu, in present day Shandong, China',
        body: [
          "Kong Qiu, known as Kongzi or Master Kong and latinised by Jesuit missionaries as Confucius, lived through an age of political breakdown. He held minor office, travelled for years in search of a ruler who would put his ideas into practice, and found none. He became instead China's first great private teacher, taking students whatever their background.",
          "His question was how to restore a humane social order. His answer was not new laws or harsher punishments but the cultivation of people: through ritual, study, music and reflection, anyone could become a junzi, an exemplary person, whose example would spread like wind over grass. He described himself as a transmitter rather than an innovator, yet he transformed the meaning of the traditions he inherited.",
          "He wrote nothing we can be sure of. The <em>Analects</em>, compiled by later generations of disciples, is a collection of short sayings and conversations, which is why it rewards slow reading."
        ],
        links: [
          { to: 'phil.ren-li', type: 'influenced', why: "Ren and li are the two pillars of Confucius's teaching on how to become humane." },
          { to: 'phil.confucianism', type: 'influenced', why: "Confucius is the founding figure of the tradition that bears his name." },
          { to: 'phil.mencius', type: 'influenced', why: "Mencius, born about a century later, saw himself as Confucius's follower and developed his ideas into a theory of human nature." },
          { to: 'phil.socrates', type: 'links-to', why: "Like Socrates, his near contemporary, Confucius wrote nothing, taught through conversation, and is known through his students' records." }
        ],
        prompts: ["Confucius thought example changes people more than rules do. Whose example has changed you most?"],
        recall: [
          { q: "What is a junzi?", a: "An exemplary or noble person, made so by cultivation of character rather than by birth." },
          { q: "Who compiled the Analects?", a: "Later generations of Confucius's disciples, not Confucius himself." }
        ],
        further: ['Confucius, The Analects, translated by D. C. Lau (1979)', 'Annping Chin, The Authentic Confucius (2007)']
      },
      {
        id: 'phil.laozi', kind: 'thinker', title: 'Laozi',
        line: "The legendary sage of the Daodejing, who taught the power of yielding.",
        facets: { branch: ['metaphysics', 'ethics', 'political'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'Laozi', respell: 'LAU dzuh (LAU rhymes with how)', ipa: 'ˈlaʊ dzə' },
        life: 'Traditionally sixth century BCE; whether he existed is uncertain', place: 'Traditionally the state of Chu, China',
        body: [
          "Laozi means simply 'Old Master'. Tradition, recorded by the historian Sima Qian around 100 BCE, makes him a keeper of archives at the Zhou court and an older contemporary of Confucius, who left China riding westward and, at a border pass, wrote down the <em>Daodejing</em> at the gatekeeper's request. Sima Qian himself was unsure of the details, and most scholars now think the text grew over time; the oldest surviving version, on bamboo slips found at Guodian, dates from around 300 BCE.",
          "Whoever wrote it, the book is one of the most translated in the world. Its eighty one short chapters praise the soft over the hard, the empty over the full, the uncarved block over the finished vessel. Its political advice is startling: the best ruler is one the people barely know exists, so that when the work is done they say it happened naturally."
        ],
        links: [
          { to: 'phil.dao', type: 'influenced', why: "The Daodejing is the founding text of the Dao and wu wei." },
          { to: 'phil.confucius', type: 'contrasts', why: "Where Confucius taught cultivation through ritual, the Daodejing says that benevolence and rectitude appear only when the great Way has already been lost." }
        ],
        prompts: ["The Daodejing says the best leader is barely noticed. Have you known a leader like that?"],
        recall: [
          { q: "What does the name Laozi mean?", a: "'Old Master'." },
          { q: "What is the earliest surviving version of the Daodejing?", a: "Bamboo slips found at Guodian, from around 300 BCE." }
        ],
        further: ['Laozi, Tao Te Ching, translated by D. C. Lau (1963)']
      },
      {
        id: 'phil.zhuangzi', kind: 'thinker', title: 'Zhuangzi',
        line: "The playful Daoist who dreamed he was a butterfly and laughed at fixed points of view.",
        facets: { branch: ['metaphysics', 'epistemology', 'meaning'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'Zhuangzi', respell: 'JWAHNG dzuh', ipa: 'ˈdʒwɑːŋ dzə' },
        life: 'About 369 to 286 BCE', place: 'Meng, in the state of Song, China',
        body: [
          "Zhuang Zhou is known through the book that bears his name, of which the first seven 'inner chapters' are thought closest to his own hand. It is unlike any other classic of philosophy: full of talking trees, giant birds, disfigured sages and butchers who teach princes. Behind the play is a serious scepticism about fixed perspectives. What looks useless from one angle is precious from another; what is 'this' from here is 'that' from there.",
          "Famous passages include the butterfly dream, Cook Ding carving the ox, and his debate with his friend the logician Huizi on a bridge over the Hao river about how Zhuangzi could know the fish were happy. When his wife died, Huizi found him drumming on a basin and singing; Zhuangzi explained that after his first grief he had come to see her death as part of the same transformations as the seasons.",
          "Offered high office, the story goes, he declined: he would rather drag his tail in the mud like a living turtle than be a dead one venerated in a temple. His freedom from ambition and his comic, humane wisdom have made him a favourite of artists and of anyone tired of being certain."
        ],
        links: [
          { to: 'phil.dao', type: 'influenced', why: "Zhuangzi's stories, above all Cook Ding, give the Dao and wu wei their most vivid form." },
          { to: 'phil.scepticism', type: 'influenced', why: "The butterfly dream is one of the earliest and most charming statements of the problem of telling dream from waking." },
          { to: 'psy.flow', type: 'links-to', why: "Cook Ding, whose knife glides through the ox without effort after years of practice, is often cited as an ancient portrait of flow." },
          { to: 'phil.laozi', type: 'links-to', why: "Zhuangzi and Laozi are paired as the founders of Daoism, though Zhuangzi cares less about government and more about personal freedom." }
        ],
        prompts: ["Think of something you consider useless. From what point of view might it be precious?"],
        recall: [
          { q: "What is the butterfly dream?", a: "Zhuangzi dreamed he was a butterfly and on waking could not tell whether he was a man who had dreamed of being a butterfly or a butterfly dreaming of being a man." },
          { q: "Why did Zhuangzi drum and sing after his wife died?", a: "He had come to see her death as part of the natural transformations, like the turning of the seasons." }
        ],
        further: ['Zhuangzi, The Complete Works of Chuang Tzu, translated by Burton Watson (1968)']
      },
      {
        id: 'phil.mencius', kind: 'thinker', title: 'Mencius',
        line: "Confucius's great successor, who argued that human nature is good.",
        facets: { branch: ['ethics', 'political', 'mind'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'Mencius', respell: 'MEN shee us', ipa: 'ˈmɛnʃiəs' },
        life: 'About 372 to 289 BCE', place: 'State of Zou, near Lu, China',
        body: [
          "Meng Ke, latinised as Mencius, is the second sage of Confucianism. Like Confucius he travelled between courts urging rulers to govern humanely, and he went further in one respect: a ruler who brutalises the people has lost the mandate of Heaven, and removing him is no crime.",
          "His most famous claim is that human nature is good. Anyone who suddenly saw a child about to fall into a well, he said, would feel alarm and compassion, not to win favour with the parents or praise from the neighbours, but spontaneously. Such feelings are sprouts of the four virtues: compassion of humaneness, shame of rightness, deference of propriety, and the sense of right and wrong of wisdom. They need nourishing, as a farmer tends seedlings, neither neglecting them nor tugging at them to make them grow faster.",
          "His later rival Xunzi answered that human nature is bad, and that goodness is the product of deliberate effort, ritual and teaching, as warped wood must be steamed and pressed straight. Their debate is one of the great arguments of Chinese philosophy, and it anticipates modern questions about how much morality is innate."
        ],
        links: [
          { to: 'phil.virtue-ethics', type: 'links-to', why: "Mencius's sprouts that need cultivating make his ethics a close cousin of Aristotle's virtue ethics, though the two never knew of each other." },
          { to: 'phil.mozi', type: 'responds-to', why: "Mencius attacked Mozi's impartial care for denying the special love a person owes to their own father." },
          { to: 'phil.confucianism', type: 'influenced', why: "Neo Confucians made the Mencius one of the Four Books at the heart of the tradition's education." }
        ],
        prompts: ["Is your first impulse, before thinking, usually kind? What would Mencius and Xunzi each make of your answer?"],
        recall: [
          { q: "What is Mencius's child at the well example meant to show?", a: "That anyone would feel spontaneous alarm and compassion, revealing a natural sprout of goodness in human nature." },
          { q: "How did Xunzi disagree with Mencius?", a: "He held that human nature is bad and that goodness comes from deliberate effort, ritual and teaching." }
        ],
        further: ['Mencius, translated by D. C. Lau (1970)']
      },
      {
        id: 'phil.mozi', kind: 'thinker', title: 'Mozi',
        line: "The first great critic of Confucius, who preached impartial care and opposed aggressive war.",
        facets: { branch: ['ethics', 'political', 'logic-language'], era: ['ancient'], tradition: ['chinese'] },
        say: { text: 'Mozi', respell: 'MWAW dzuh', ipa: 'ˈmwɔː dzə' },
        life: 'About 470 to 391 BCE', place: 'Probably the state of Lu or Song, China',
        body: [
          "Mo Di, known as Mozi, may have been a craftsman, and he founded a disciplined movement whose members lived frugally and offered their services as experts in defending cities under siege. For two centuries the Mohists rivalled the Confucians as the most influential school in China.",
          "His central teaching was jian ai, often translated as universal love but better as impartial care: treat other people's families and states as your own. The world's disorder, he argued, comes from partiality. He judged every institution by a single test, whether it benefits the people, and on that test condemned aggressive war, lavish funerals, long mourning and expensive court music, all of which the Confucians defended. This makes him an early consequentialist, more than two thousand years before Bentham.",
          "Later Mohists produced sophisticated work on logic, argument and even optics. After China's unification under the Qin the school disappeared almost entirely, and it was rediscovered by scholars only in the last few centuries."
        ],
        links: [
          { to: 'phil.confucius', type: 'responds-to', why: "Mozi criticised Confucian ritual, music and elaborate funerals as wasteful of the people's resources." },
          { to: 'phil.utilitarianism', type: 'links-to', why: "By judging every practice by its benefit to the people, Mozi anticipated utilitarian reasoning by two millennia." },
          { to: 'phil.ren-li', type: 'contrasts', why: "Confucian love is graded, strongest for family; Mohist care is impartial, the same for strangers." }
        ],
        prompts: ["Should you care for a stranger's child as much as your own? If not, how much less, and why?"],
        recall: [
          { q: "What is jian ai?", a: "Impartial care, often translated universal love: caring for others' families and states as for your own." },
          { q: "What single test did Mozi apply to every practice?", a: "Whether it benefits the people." }
        ],
        further: ['Mozi: Basic Writings, translated by Burton Watson (2003)']
      },
      {
        id: 'phil.buddha', kind: 'thinker', title: 'The Buddha',
        line: "The awakened one, who diagnosed suffering and prescribed a path out of it.",
        facets: { branch: ['ethics', 'mind', 'religion'], era: ['ancient'], tradition: ['indian'] },
        life: 'Fifth century BCE (dates debated; about 480 to 400 BCE is a common estimate)', place: 'Born at Lumbini, in present day Nepal; taught in the Ganges plain of northern India',
        body: [
          "Siddhartha Gautama was born into the Shakya clan in the foothills of the Himalayas. According to tradition he left a comfortable life at twenty nine after encountering old age, sickness and death, tried extreme asceticism and found it useless, and at Bodh Gaya, meditating beneath a tree, attained awakening. 'Buddha' is a title meaning 'awakened one'. He taught for some forty five years.",
          "His teaching is often compared to a medical diagnosis, set out in the Four Noble Truths: there is suffering, or dissatisfaction (dukkha); it arises from craving; it can cease; and the way to its cessation is the Noble Eightfold Path of right view, intention, speech, action, livelihood, effort, mindfulness and concentration. He called this a middle way between indulgence and self punishment.",
          "Philosophically, his most radical claims are impermanence, dependent origination (everything arises from conditions) and no self. He was famously reluctant to answer speculative questions, such as whether the world is eternal, comparing someone who insists on such answers to a man shot with a poisoned arrow who refuses treatment until he knows who fired it."
        ],
        links: [
          { to: 'phil.no-self', type: 'influenced', why: "The teaching of anatta, no self, is one of the Buddha's three marks of existence." },
          { to: 'psy.mindfulness', type: 'influenced', why: "Modern mindfulness programmes adapt meditation practices traced to the Buddha's teaching, usually without their religious setting." },
          { to: 'phil.good-life', type: 'links-to', why: "For the Buddha, the best life is one freed from craving, a striking alternative to Greek ideas of flourishing." }
        ],
        prompts: ["What do you crave most this week? Notice what happens to the craving when you look at it closely."],
        recall: [
          { q: "What are the Four Noble Truths?", a: "There is suffering; it arises from craving; it can cease; and the Eightfold Path leads to its cessation." },
          { q: "What does 'Buddha' mean?", a: "'Awakened one'; it is a title, not a personal name." }
        ],
        further: ['Walpola Rahula, What the Buddha Taught (1959)', 'Rupert Gethin, The Foundations of Buddhism (1998)']
      },
      {
        id: 'phil.nagarjuna', kind: 'thinker', title: 'Nagarjuna',
        line: "The Buddhist dialectician who argued that everything, even emptiness, is empty.",
        facets: { branch: ['metaphysics', 'epistemology', 'religion'], era: ['ancient'], tradition: ['indian'] },
        say: { text: 'Nagarjuna', respell: 'nah GAR joo nuh', ipa: 'nɑːˈɡɑːdʒʊnə' },
        life: 'About 150 to 250 CE', place: 'South India, probably the Andhra region',
        body: [
          "Almost nothing reliable is known about Nagarjuna's life, but his <em>Fundamental Verses on the Middle Way</em> (Mulamadhyamakakarika) is one of the most influential works of Buddhist philosophy. In some four hundred and fifty terse verses he takes up concept after concept, causation, motion, time, the self, even the Buddha, and shows that if we assume it has an intrinsic nature it collapses into contradiction.",
          "His conclusion is that all things are empty: they exist only dependently. Crucially, this is not nihilism. He distinguishes two truths: conventional truth, in which tables, persons and ethics are perfectly real, and ultimate truth, which is that nothing has a nature of its own. And he warns that those who turn emptiness itself into a doctrine to cling to are incurable.",
          "His school, Madhyamaka, shaped Tibetan, Chinese and Japanese Buddhism, and his method of reducing every position to absurdity has invited comparison with Greek scepticism and with Wittgenstein."
        ],
        links: [
          { to: 'phil.emptiness', type: 'influenced', why: "Nagarjuna gave the doctrine of emptiness its classic philosophical form." },
          { to: 'phil.buddha', type: 'links-to', why: "Nagarjuna presented his work as a faithful reading of the Buddha's middle way and of dependent origination." },
          { to: 'phil.scepticism', type: 'links-to', why: "Like the Pyrrhonists, Nagarjuna dismantles every view without offering a new doctrine in its place." }
        ],
        prompts: ["Can something be real without being real all by itself? Try to name one thing that is."],
        recall: [
          { q: "What are Nagarjuna's two truths?", a: "Conventional truth, in which ordinary things and ethics are real, and ultimate truth, that nothing has an intrinsic nature." }
        ],
        further: ['Jay L. Garfield, The Fundamental Wisdom of the Middle Way (1995)']
      },
      {
        id: 'phil.shankara', kind: 'thinker', title: 'Shankara',
        line: "The great teacher of Advaita Vedanta: only Brahman is real, and you are that.",
        facets: { branch: ['metaphysics', 'religion', 'mind'], era: ['medieval'], tradition: ['indian'] },
        say: { text: 'Shankara', respell: 'SHUNG kuh ruh', ipa: 'ˈʃʌŋkərə' },
        life: 'Eighth century CE (traditionally 788 to 820)', place: 'Kerala, according to tradition; travelled across India',
        body: [
          "Adi Shankara is the most influential philosopher of Advaita, or nondual, Vedanta. Tradition says he renounced the world as a boy, walked the length of India debating rival schools, founded monastic centres that still exist, and died young. Historians accept little of the legend in detail, but his commentaries on the Upanishads, the Bhagavad Gita and the Brahma Sutras remain central texts of Hindu thought.",
          "His thesis is radical. Brahman, pure consciousness without qualities, is the only reality, and your innermost self, atman, is identical with it. The world of separate things and persons is real enough for practical life but, ultimately, an appearance superimposed on Brahman through ignorance, as a snake is seen in a rope at dusk. Knowledge, not ritual or good works, brings liberation, because there is nowhere to go, only something to see.",
          "Rival Vedantins accused him of being a Buddhist in disguise, since his illusory world sounded close to Buddhist teaching; he in turn argued fiercely against the Buddhists. The irony points to a real question about how different emptiness and nondual consciousness are."
        ],
        links: [
          { to: 'phil.brahman-atman', type: 'influenced', why: "Shankara gave the identity of atman and Brahman its most rigorous philosophical defence." },
          { to: 'phil.buddha', type: 'contrasts', why: "Shankara argued against the Buddhist schools, insisting on a single eternal self where the Buddha taught no self." },
          { to: 'phil.realism', type: 'contrasts', why: "Shankara's world is real for practice but not ultimately, a two level view that sits uneasily with plain realism." }
        ],
        prompts: ["Have you ever seen something that was not there, a face in a cloud, a figure in a coat on a door? What changed when you saw clearly?"],
        recall: [
          { q: "What does Advaita mean?", a: "Nondual: the self and ultimate reality, atman and Brahman, are not two." },
          { q: "What does Shankara's rope and snake image illustrate?", a: "How the world of many things is superimposed on Brahman through ignorance, as a snake is mistaken for a rope in dim light." }
        ],
        further: ['Shankara, A Thousand Teachings (Upadesasahasri), translated by Sengaku Mayeda (1979)']
      },
      {
        id: 'phil.avicenna', kind: 'thinker', title: 'Avicenna (Ibn Sina)',
        line: "Physician and philosopher whose 'floating man' asked what we know of ourselves without the senses.",
        facets: { branch: ['metaphysics', 'mind', 'religion'], era: ['medieval'], tradition: ['islamic'] },
        say: { text: 'Avicenna, Ibn Sina', respell: 'av ih SEN uh, IB un SEE nuh', ipa: 'ˌævɪˈsɛnə, ˈɪbən ˈsiːnə' },
        life: 'About 980 to 1037', place: 'Born near Bukhara (now Uzbekistan); died in Hamadan, Persia',
        body: [
          "Abu Ali ibn Sina, known in Europe as Avicenna, was a prodigy who by his own account had mastered medicine by eighteen. His <em>Canon of Medicine</em> was a standard textbook in Europe and the Islamic world for some six centuries. He wrote in Arabic and Persian, often while serving rulers, fleeing them, or in prison.",
          "His <em>Book of the Cure</em> is a vast encyclopaedia of Aristotelian philosophy reworked into something new. He distinguished a thing's essence, what it is, from its existence, that it is: nothing in the essence of a horse guarantees that any horse exists. Whatever exists only possibly must receive its existence from something else, and the chain ends in a Necessary Existent, whose essence is to exist: God.",
          "His most famous thought experiment is the floating man. Imagine yourself created fully formed in the air, blindfolded, limbs apart so they touch nothing, with no sensation at all. Would you know that you exist? Avicenna says yes, which shows that the self is known directly and is not the body. Six centuries later Descartes made a strikingly similar move."
        ],
        links: [
          { to: 'phil.mind-body', type: 'influenced', why: "The floating man argues that the self can know itself without any awareness of the body, an early case for dualism." },
          { to: 'phil.descartes', type: 'links-to', why: "The floating man anticipates Descartes's argument that he can be certain he exists while doubting he has a body." },
          { to: 'phil.aristotle', type: 'responds-to', why: "Avicenna absorbed Aristotle, whom Islamic philosophers called the First Teacher, and rebuilt his metaphysics around essence and existence." },
          { to: 'phil.being', type: 'influenced', why: "His distinction between essence and existence became a fixture of medieval metaphysics, Christian as well as Islamic." }
        ],
        prompts: ["Try the floating man for a moment: what do you know about yourself if you set aside every sensation?"],
        recall: [
          { q: "What is the floating man thought experiment?", a: "A person created in the air with no sensation of anything, even of their own body, would still know they exist, so the self is not known through the body." },
          { q: "What is the Necessary Existent?", a: "Avicenna's term for God: a being whose essence is to exist, on which all merely possible beings depend." }
        ],
        further: ['Peter Adamson, Philosophy in the Islamic World (2016)']
      },
      {
        id: 'phil.ghazali', kind: 'thinker', title: 'Al Ghazali',
        line: "The theologian who turned philosophy's tools on the philosophers, and doubted causation itself.",
        facets: { branch: ['religion', 'epistemology', 'metaphysics'], era: ['medieval'], tradition: ['islamic'] },
        say: { text: 'Al Ghazali', respell: 'al guh ZAH lee', ipa: 'æl ɡəˈzɑːli' },
        life: 'About 1058 to 1111', place: 'Tus, in Khorasan, Persia; taught in Baghdad',
        body: [
          "Abu Hamid al Ghazali was the most celebrated scholar of his day, a star professor at the Nizamiyya college in Baghdad, when in 1095 a crisis of doubt left him, by his own account, unable to speak or teach. He gave up his post, lived for years as a wandering Sufi, and later described his search for certainty in <em>Deliverance from Error</em>, a work often compared with Descartes's <em>Meditations</em>.",
          "In <em>The Incoherence of the Philosophers</em> he mastered the arguments of Avicenna and the Aristotelians and turned them back on their authors. On twenty points he argued that they had failed to prove what they claimed, and on three, that the world is eternal, that God knows only universals and that there is no bodily resurrection, he judged them to have left Islam.",
          "Along the way he denied that there is any necessary connection between what we call cause and effect. Fire does not of itself burn cotton; God creates the burning when the two meet, by custom, and could do otherwise. This view anticipated Hume's critique of causation by more than six centuries, though for very different reasons."
        ],
        links: [
          { to: 'phil.causation', type: 'influenced', why: "His cotton and fire argument is one of the most famous challenges to necessary causal connection." },
          { to: 'phil.avicenna', type: 'responds-to', why: "The Incoherence of the Philosophers is above all a critique of Avicenna's philosophy." },
          { to: 'phil.god-evil', type: 'links-to', why: "His remark that there is nothing in possibility more wonderful than what is provoked centuries of argument over whether this is the best possible world." },
          { to: 'phil.scepticism', type: 'links-to', why: "Deliverance from Error records a period of radical doubt about the senses and reason, resolved, he said, by a light God cast into his heart." }
        ],
        prompts: ["Have you ever had a crisis of confidence in something you thought you knew well? What brought you back?"],
        recall: [
          { q: "What did Al Ghazali argue about cause and effect?", a: "That there is no necessary connection between them; God creates the effect when the cause is present, by custom." },
          { q: "What is The Incoherence of the Philosophers?", a: "Al Ghazali's critique of Avicenna and the Aristotelians, arguing they failed to prove their key claims." }
        ],
        further: ['Al Ghazali, The Incoherence of the Philosophers, translated by Michael E. Marmura (1997)', "Frank Griffel, Al Ghazali's Philosophical Theology (2009)"]
      },
      {
        id: 'phil.averroes', kind: 'thinker', title: 'Averroes (Ibn Rushd)',
        line: "Judge, physician and great commentator on Aristotle, who defended philosophy before the faithful.",
        facets: { branch: ['religion', 'epistemology', 'metaphysics'], era: ['medieval'], tradition: ['islamic'] },
        say: { text: 'Averroes, Ibn Rushd', respell: 'uh VERR oh eez, IB un RUSHD', ipa: 'əˈvɛrəʊiːz, ˈɪbən ˈrʊʃd' },
        life: '1126 to 1198', place: 'Córdoba, Al Andalus; died in Marrakesh',
        body: [
          "Ibn Rushd came from a family of judges in Córdoba, served as a judge himself in Seville and Córdoba, and was court physician to the caliph. Commissioned to explain Aristotle, he wrote commentaries at three levels of detail on almost all of his works. In Latin Europe he became simply 'the Commentator', as Aristotle was 'the Philosopher'.",
          "He answered Al Ghazali in <em>The Incoherence of the Incoherence</em>, defending natural causation: to deny that things have real causal powers, he argued, is to deny that they have natures, and so to destroy knowledge itself. In the <em>Decisive Treatise</em> he argued that the Quran commands reflection, so philosophy is obligatory for those capable of it, and that where scripture seems to conflict with demonstrated truth, scripture should be interpreted.",
          "Late in life he fell from favour, his books were burned and he was briefly exiled, before being restored shortly before his death. His influence in the Islamic world waned, but in Europe the 'Latin Averroists' pushed his ideas further than the Church would allow. The 'double truth' doctrine, that something can be true in philosophy and false in religion, was pinned on them; it was never his own view."
        ],
        links: [
          { to: 'phil.ghazali', type: 'responds-to', why: "The Incoherence of the Incoherence is a point by point reply to Al Ghazali's attack on the philosophers." },
          { to: 'phil.aristotle', type: 'links-to', why: "His commentaries on nearly all of Aristotle's works carried Aristotle's thought into Latin Europe." },
          { to: 'phil.causation', type: 'links-to', why: "He argued that denying real causes would make the natures of things, and so knowledge, impossible." }
        ],
        prompts: ["When a trusted tradition seems to conflict with a careful argument, how do you decide which to reinterpret?"],
        recall: [
          { q: "Why was Averroes called 'the Commentator' in Latin Europe?", a: "Because of his detailed commentaries on almost all of Aristotle's works." },
          { q: "What did the Decisive Treatise argue?", a: "That the Quran commands reflection, so philosophy is obligatory for those able to pursue it, and apparent conflicts should be resolved by interpreting scripture." }
        ],
        further: ['Averroes, The Book of the Decisive Treatise, translated by Charles E. Butterworth (2001)']
      },
      {
        id: 'phil.wiredu', kind: 'thinker', title: 'Kwasi Wiredu',
        line: "Ghanaian philosopher who asked which philosophical problems survive translation into an African language.",
        facets: { branch: ['logic-language', 'political', 'epistemology'], era: ['contemporary'], tradition: ['african'] },
        life: '1931 to 2022', place: 'Born in Kumasi, Ghana; taught at the University of Ghana and the University of South Florida',
        body: [
          "Kwasi Wiredu studied at the University of Ghana and at Oxford and became one of the founders of modern African philosophy. He rejected two easy options: treating traditional folk thought as an already finished philosophy, and importing Western philosophy wholesale.",
          "His alternative was conceptual decolonisation. Take a philosophical problem framed in English and try to state it in your own language, in his case Akan. Some problems survive; others dissolve, revealing that they depended on features of European languages. Descartes's 'I think, therefore I am', he argued, is hard to render in Akan, where to exist is expressed as being there, at some place, so the idea of a thinking thing that exists without being anywhere does not sit naturally.",
          "In politics he argued for consensus democracy, drawing on traditional Akan practices of deliberation: instead of winners and losers in party competition, decisions should aim at agreements every representative can accept, even if not as a first choice."
        ],
        links: [
          { to: 'phil.descartes', type: 'responds-to', why: "Wiredu used the difficulty of translating the cogito into Akan to question whether Cartesian dualism is a universal problem or a feature of European languages." },
          { to: 'phil.ubuntu', type: 'links-to', why: "Wiredu's work belongs to the same modern effort as philosophical ubuntu: to state African ideas of personhood and community with full rigour." },
          { to: 'phil.social-contract', type: 'contrasts', why: "His consensus democracy grounds legitimacy in deliberated agreement rather than in majority votes between competing parties." },
          { to: 'phil.language-games', type: 'links-to', why: "Like Wittgenstein, Wiredu suspected that some philosophical problems arise from the peculiarities of a particular language." }
        ],
        prompts: ["Is there an idea you can express easily in one language you know but not in another? What does that tell you about the idea?"],
        recall: [
          { q: "What did Wiredu mean by conceptual decolonisation?", a: "Testing philosophical problems by stating them in an African language, to see which are genuine and which depend on features of European languages." },
          { q: "What is consensus democracy?", a: "Government by deliberation aimed at decisions all representatives can accept, rather than by majority rule between competing parties." }
        ],
        further: ['Kwasi Wiredu, Philosophy and an African Culture (1980)', 'Kwasi Wiredu, Cultural Universals and Particulars (1996)']
      },
      {
        id: 'phil.nishida', kind: 'thinker', title: 'Nishida Kitaro',
        line: "Founder of the Kyoto School, who joined Zen insight with Western philosophy.",
        facets: { branch: ['metaphysics', 'religion', 'mind'], era: ['contemporary'], tradition: ['japanese'] },
        say: { text: 'Nishida Kitaro', respell: 'nee shee dah kee tah roh', ipa: 'niɕida kitaɾoː' },
        life: '1870 to 1945', place: 'Born in Ishikawa, Japan; taught at Kyoto Imperial University',
        body: [
          "Nishida Kitaro is usually called the first great modern Japanese philosopher. He practised Zen meditation intensively for years while studying Western philosophy, and his first book, <em>An Inquiry into the Good</em> (1911), set out to explain everything from the standpoint of 'pure experience', a term he took from William James: experience before it is split into a subject who knows and an object that is known, as when a musician is wholly absorbed in playing.",
          "Later he developed a logic of basho, or place: every thing exists within a field or context, and the deepest context of all is absolute nothingness, not mere absence but the open space in which all beings and selves arise. This was his attempt to say philosophically what Zen points to, in dialogue with Kant, Hegel and Husserl.",
          "Around him at Kyoto grew the Kyoto School, including Tanabe Hajime and Nishitani Keiji, which brought Buddhist ideas of emptiness into conversation with existentialism. Their record during the war, when some of their writings were used to support Japanese nationalism, is still debated."
        ],
        links: [
          { to: 'psy.william-james', type: 'links-to', why: "Nishida took the idea of pure experience from William James and gave it a Zen inflection." },
          { to: 'phil.dogen', type: 'links-to', why: "The Kyoto School drew on the Zen tradition that Dogen shaped, reading it through Western philosophy." },
          { to: 'phil.emptiness', type: 'links-to', why: "Nishida's absolute nothingness and Nishitani's work on emptiness carried Mahayana ideas into modern philosophy." },
          { to: 'phil.phenomenology', type: 'links-to', why: "Nishida read Husserl closely, and his pure experience, before subject and object split, invites comparison with phenomenology." }
        ],
        prompts: ["Recall a moment when you were so absorbed that there was no 'you' doing it. How did it end?"],
        recall: [
          { q: "What did Nishida mean by pure experience?", a: "Experience before it is divided into a knowing subject and a known object, as in complete absorption." },
          { q: "What is the Kyoto School?", a: "The group of Japanese philosophers around Nishida at Kyoto who brought Buddhist thought into dialogue with Western philosophy." }
        ],
        further: ['Nishida Kitaro, An Inquiry into the Good, translated by Masao Abe and Christopher Ives (1990)', 'James W. Heisig, Philosophers of Nothingness (2001)']
      },
      {
        id: 'phil.dogen', kind: 'thinker', title: 'Dogen',
        line: "Zen master who taught that sitting in meditation is not a means to awakening but awakening itself.",
        facets: { branch: ['religion', 'metaphysics', 'mind'], era: ['medieval'], tradition: ['japanese'] },
        say: { text: 'Dogen', respell: 'DOH gen', ipa: 'doːɡeɴ' },
        life: '1200 to 1253', place: 'Kyoto, Japan; founded Eiheiji temple in Echizen',
        body: [
          "Dogen was orphaned young, became a monk at thirteen, and was troubled by a question: if all beings already have Buddha nature, why practise at all? Unsatisfied in Japan, he travelled to China in 1223 and studied with the Chan master Rujing, under whom he experienced awakening. He returned to establish the Soto school of Zen in Japan.",
          "His answer to his early question is that practice and realisation are one. Shikantaza, 'just sitting', is not a technique for achieving something later; sitting itself, fully, is the enactment of awakening.",
          "His major work, the <em>Shobogenzo</em> (Treasury of the True Dharma Eye), is philosophically daring. In the essay 'Being Time' he argues that time is not a container that beings pass through: each being is a time, and each moment is complete in itself. Elsewhere he writes that firewood does not become ash; firewood abides in its moment as firewood, and ash in its moment as ash."
        ],
        quote: { text: 'To study the Buddha way is to study the self. To study the self is to forget the self.', source: "Dogen, Shobogenzo, 'Genjokoan' (1233), translated by Kazuaki Tanahashi and others" },
        links: [
          { to: 'psy.mindfulness', type: 'links-to', why: "Zazen, just sitting, is one of the meditative practices behind modern mindfulness, though Dogen would resist using it as a technique for self improvement." },
          { to: 'phil.emptiness', type: 'links-to', why: "Dogen's Zen inherits the Mahayana teaching of emptiness through Chinese Chan." },
          { to: 'phil.being', type: 'links-to', why: "His essay Being Time collapses the distinction between things and the time they occupy, a radical answer to what it is to be." },
          { to: 'phil.no-self', type: 'links-to', why: "To study the self is to forget the self: Dogen turns the doctrine of no self into a practice." }
        ],
        prompts: ["Choose one ordinary act today, washing a cup or walking to the door, and do it as if it were complete in itself. What changes?"],
        recall: [
          { q: "What did Dogen mean by saying practice and realisation are one?", a: "Sitting in meditation is not a means to a later awakening; fully practising is itself the enactment of awakening." },
          { q: "What is shikantaza?", a: "'Just sitting': Dogen's form of zazen, sitting without a goal or object." }
        ],
        further: ['Dogen, Moon in a Dewdrop, edited by Kazuaki Tanahashi (1985)']
      },

      /* ===== Thinkers: Greece, Rome and the Latin Middle Ages ===== */
      {
        id: 'phil.socrates', kind: 'thinker', title: 'Socrates',
        line: "The questioner of Athens, executed for teaching people to examine their lives.",
        facets: { branch: ['ethics', 'epistemology'], era: ['ancient'], tradition: ['western'] },
        say: { text: 'Socrates', respell: 'SOK ruh teez', ipa: 'ˈsɒkrətiːz' },
        life: 'About 470 to 399 BCE', place: 'Athens',
        body: [
          "Socrates wrote nothing. We know him through his student Plato, the soldier and writer Xenophon, and the comic playwright Aristophanes, who mocked him, and their portraits differ. They agree on a stonemason's son who spent his days in the streets and gymnasiums of Athens asking people what they meant by the words they used most confidently: courage, justice, piety, virtue.",
          "His method, the elenchus, was to take a definition and draw out its consequences until it contradicted something else the speaker believed. Generals turned out not to know what courage is, priests not to know piety. When the oracle at Delphi said no one was wiser than Socrates, he concluded that his wisdom lay only in not thinking he knew what he did not know. The popular saying 'I know that I know nothing' is a later simplification.",
          "In 399 BCE Athens tried him for impiety and corrupting the young. He refused to stop philosophising and was sentenced to die by drinking hemlock. Plato's accounts of the trial, in the <em>Apology</em>, and of his last day, in the <em>Phaedo</em>, made him the model of a life lived by argument."
        ],
        quote: { text: 'The unexamined life is not worth living.', source: 'Plato, Apology 38a' },
        links: [
          { to: 'phil.plato', type: 'influenced', why: "Plato's dialogues are our main window on Socrates, and his execution set the direction of Plato's whole philosophy." },
          { to: 'psy.cbt', type: 'links-to', why: "Cognitive therapists use 'Socratic questioning', helping clients examine their own beliefs through careful questions rather than telling them what to think." },
          { to: 'eng.from-ideas', type: 'links-to', why: "'Socratic' survives in English, as in the Socratic method and Socratic irony, feigning ignorance to draw others out." },
          { to: 'phil.knowledge', type: 'influenced', why: "His 'what is it?' questions launched the search for definitions that still drives the theory of knowledge." },
          { to: 'phil.good-life', type: 'links-to', why: "For Socrates, examining how to live is not a preliminary to the good life but part of it." }
        ],
        prompts: ["Which word do you use most confidently that you might struggle to define if Socrates asked you?"],
        recall: [
          { q: "What is the elenchus?", a: "Socrates's method of questioning a definition until it contradicts other beliefs the speaker holds." },
          { q: "What were the charges against Socrates?", a: "Impiety and corrupting the young of Athens." }
        ],
        further: ['Plato, Apology', 'Plato, Phaedo']
      },
      {
        id: 'phil.plato', kind: 'thinker', title: 'Plato',
        line: "Socrates's student, author of the dialogues, and founder of the Academy.",
        facets: { branch: ['metaphysics', 'epistemology', 'political', 'ethics'], era: ['ancient'], tradition: ['western'] },
        life: 'About 428 to 348 BCE', place: 'Athens, where he founded the Academy',
        body: [
          "Plato came from an aristocratic Athenian family, fell under Socrates's spell as a young man, and was shaken by his teacher's execution. Around 387 BCE he founded the Academy, often called the first university, where Aristotle studied for twenty years. He wrote dialogues rather than treatises, usually with Socrates as the main speaker, which makes it hard to know exactly where Socrates ends and Plato begins.",
          "His questions span almost all of philosophy. What is justice, and is the just person happier than the unjust? What is knowledge? What is love? Is the soul immortal? What would an ideal city look like? His most distinctive answer is the theory of Forms: beyond the changing world we perceive lies an unchanging reality of perfect patterns, known by reason. In the <em>Republic</em> he argued that only philosophers who have grasped the Good should rule.",
          "Alfred North Whitehead remarked that the European philosophical tradition consists of a series of footnotes to Plato. His influence ran through Neoplatonism into Christian, Jewish and Islamic thought, and it still shapes mathematics, where many feel that numbers are discovered, not invented."
        ],
        links: [
          { to: 'phil.forms', type: 'influenced', why: "The theory of Forms is Plato's signature doctrine." },
          { to: 'phil.cave', type: 'influenced', why: "The allegory of the cave is Plato's most famous image, from Book VII of the Republic." },
          { to: 'phil.beauty', type: 'influenced', why: "The Symposium's ladder of love made beauty a path toward the highest reality." },
          { to: 'eng.from-ideas', type: 'links-to', why: "'Platonic love' first meant love rising from bodies to beauty itself, as in the Symposium; the Renaissance scholar Marsilio Ficino coined the phrase, and it has since narrowed to mean love without romance." }
        ],
        prompts: ["Plato wrote dialogues, not lectures. Why might a philosopher choose to show an argument rather than simply state a conclusion?"],
        recall: [
          { q: "What institution did Plato found?", a: "The Academy in Athens, around 387 BCE." },
          { q: "Who did Plato think should rule the ideal city?", a: "Philosophers who have grasped the Form of the Good." }
        ],
        further: ['Plato, Republic', 'Plato, Symposium']
      },
      {
        id: 'phil.aristotle', kind: 'thinker', title: 'Aristotle',
        line: "Plato's student, Alexander's tutor, and the great systematiser of logic, biology and ethics.",
        facets: { branch: ['metaphysics', 'ethics', 'logic-language', 'science', 'political'], era: ['ancient'], tradition: ['western'] },
        life: '384 to 322 BCE', place: 'Born in Stagira, northern Greece; taught in Athens',
        body: [
          "Aristotle came to Plato's Academy at seventeen and stayed twenty years. After Plato's death he studied marine life on Lesbos, tutored the young Alexander of Macedon, and in 335 BCE founded his own school in Athens, the Lyceum. His followers were called Peripatetics, probably after a covered walkway where they met.",
          "His range is staggering. He founded formal logic with the syllogism, which dominated reasoning for two thousand years. He described hundreds of animals from close observation. He analysed explanation into four causes, change into potential becoming actual, and reality into substances with properties. In ethics he made happiness a matter of virtuous activity and practical wisdom; in politics he called the human being a political animal, completed only in community.",
          "Where Plato looked up to the Forms, Aristotle looked closely at the world. Islamic philosophers called him the First Teacher, and for Aquinas and the medieval schools he was simply 'the Philosopher'. Much of his physics was overturned in the scientific revolution, but his ethics and logic are still taught as live options."
        ],
        links: [
          { to: 'phil.virtue-ethics', type: 'influenced', why: "The Nicomachean Ethics is the founding text of Western virtue ethics." },
          { to: 'phil.being', type: 'influenced', why: "His account of substance set the terms of metaphysics for two thousand years." },
          { to: 'phil.causation', type: 'influenced', why: "His four causes were the first systematic theory of explanation." },
          { to: 'phil.plato', type: 'responds-to', why: "Aristotle rejected separate Forms, insisting that universals exist only in particular things." },
          { to: 'phys.heisenberg', type: 'links-to', why: "Heisenberg compared the quantum state to Aristotle's potentia, a tendency toward actuality, in Physics and Philosophy (1958)." }
        ],
        prompts: ["Aristotle asked what a thing is for. What is your answer for a human being, and for you?"],
        recall: [
          { q: "What are Aristotle's four causes?", a: "The material cause (what it is made of), formal cause (its form), efficient cause (what brought it about) and final cause (what it is for)." },
          { q: "What did medieval thinkers call Aristotle?", a: "Islamic philosophers called him the First Teacher; Latin scholastics called him 'the Philosopher'." }
        ],
        further: ['Aristotle, Nicomachean Ethics', 'Jonathan Barnes, Aristotle: A Very Short Introduction (2000)']
      },
      {
        id: 'phil.epicurus', kind: 'thinker', title: 'Epicurus',
        line: "Founder of the Garden, who taught that a tranquil life of friends and simple pleasures is best.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        say: { text: 'Epicurus', respell: 'ep ih KYOOR us', ipa: 'ˌɛpɪˈkjʊərəs' },
        life: '341 to 270 BCE', place: 'Born on Samos; taught in Athens',
        body: [
          "Epicurus was born to Athenian parents on the island of Samos. In about 306 BCE he bought a house and garden in Athens and founded a community there, the Garden, which welcomed women and slaves.",
          "He wrote prolifically, but little survives beyond three letters and collections of sayings preserved by Diogenes Laertius, along with charred fragments from a library at Herculaneum buried by Vesuvius. His teaching aimed at freeing people from two great fears, of the gods and of death, through an atomist physics, and at showing that the pleasures we truly need are cheap.",
          "He valued friendship above almost everything: of all the things wisdom provides for a happy life, he said, by far the greatest is friendship. Dying in great pain, he wrote on his last day that his joy in remembering past conversations outweighed it."
        ],
        links: [
          { to: 'phil.epicureanism', type: 'influenced', why: "Epicurus founded the school, and his followers revered his words for centuries." },
          { to: 'phil.death', type: 'influenced', why: "His argument that death is nothing to us remains the starting point for every discussion of whether death is bad." },
          { to: 'phil.presocratics', type: 'responds-to', why: "Epicurus built his physics on the atoms of Democritus, adding a swerve to leave room for freedom." }
        ],
        prompts: ["Epicurus put friendship above almost everything. Which friendships most contribute to your own calm?"],
        recall: [
          { q: "What two fears did Epicurus most want to remove?", a: "Fear of the gods and fear of death." }
        ],
        further: ['The Epicurus Reader, translated by Brad Inwood and L. P. Gerson (1994)']
      },
      {
        id: 'phil.epictetus', kind: 'thinker', title: 'Epictetus',
        line: "A former slave whose teaching on what is up to us became the most practical Stoicism of all.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        say: { text: 'Epictetus', respell: 'ep ik TEE tus', ipa: 'ˌɛpɪkˈtiːtəs' },
        life: 'About 50 to 135 CE', place: 'Born a slave in Hierapolis, Phrygia; taught in Rome and Nicopolis',
        body: [
          "Epictetus was born into slavery and owned for a time by Epaphroditus, a powerful freedman at Nero's court. He studied with the Stoic teacher Musonius Rufus, was eventually freed, and taught philosophy in Rome until the emperor Domitian expelled philosophers from the city around 93 CE. He then opened a school at Nicopolis in western Greece, where students came from across the empire.",
          "Like Socrates he wrote nothing. His student Arrian recorded his lectures as the <em>Discourses</em> and distilled them into the short <em>Handbook</em> (Enchiridion). Its first line sets the programme: some things are up to us and some are not. Our opinions, impulses, desires and aversions are up to us; our bodies, property, reputation and offices are not. Freedom lies in attending to the first and accepting the second.",
          "His bluntness and humour make him easy to read today. James Stockdale, a United States Navy pilot, credited the <em>Handbook</em> with helping him endure more than seven years as a prisoner of war in Vietnam."
        ],
        quote: { text: 'People are disturbed not by things, but by the views they take of them.', source: 'Epictetus, Handbook (Enchiridion), chapter 5 (translations vary)' },
        links: [
          { to: 'phil.stoicism', type: 'part-of', why: "Epictetus's Handbook is the most widely read summary of Stoic ethics." },
          { to: 'psy.cbt', type: 'influenced', why: "Albert Ellis often quoted Epictetus's line that we are disturbed not by things but by our views of them, and built rational emotive behaviour therapy on the idea." },
          { to: 'phil.marcus-aurelius', type: 'influenced', why: "Marcus Aurelius thanks his teacher Rusticus, in the first book of the Meditations, for lending him Epictetus's discourses." },
          { to: 'phil.socrates', type: 'links-to', why: "Epictetus held up Socrates as the model philosopher, free even in prison because his judgements were his own." }
        ],
        prompts: ["What upset you most recently? Separate the event from your view of it. Which one hurt?"],
        recall: [
          { q: "What is the first line of Epictetus's Handbook about?", a: "The division between what is up to us (our judgements, impulses, desires) and what is not (body, property, reputation)." },
          { q: "Who recorded Epictetus's teaching?", a: "His student Arrian, in the Discourses and the Handbook." }
        ],
        further: ['Epictetus, Discourses, Fragments, Handbook, translated by Robin Hard (2014)']
      },
      {
        id: 'phil.marcus-aurelius', kind: 'thinker', title: 'Marcus Aurelius',
        line: "The Stoic emperor whose private notebook became one of the most loved books of philosophy.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        say: { text: 'Marcus Aurelius', respell: 'MAR kus aw REE lee us', ipa: 'ˈmɑːkəs ɔːˈriːliəs' },
        life: '121 to 180 CE', place: 'Rome; emperor from 161 to 180',
        body: [
          "Marcus Aurelius ruled the Roman Empire for nearly twenty years, through plague and long wars on the Danube frontier. In the evenings, often in military camps, he wrote notes to himself in Greek. We call them the <em>Meditations</em>; their title in the manuscripts is simply 'To Himself'. They were never meant for publication.",
          "The notes are Stoic exercises: reminders that the obstacles of the day are material for virtue, that anger at other people's faults is pointless because they act from ignorance, and that everything, empires and emperors included, passes quickly. The first book is a list of what he learned from each person in his life, a practice of gratitude long before the word was fashionable.",
          "He was not a flawless ruler. Christians were persecuted in his reign, and he made his unsuitable son Commodus his successor. But the <em>Meditations</em> show a powerful man trying, every day, to be good, which may be why readers still keep them by the bed."
        ],
        links: [
          { to: 'phil.stoicism', type: 'part-of', why: "The Meditations are Stoic practice in action: a ruler applying the school's teachings to his own days." },
          { to: 'phil.death', type: 'links-to', why: "Marcus returns again and again to death and impermanence, not to frighten himself but to see what matters." }
        ],
        prompts: ["Write three lines to yourself tonight, as Marcus did. What do you need reminding of?"],
        recall: [
          { q: "What is the title of the Meditations in the manuscripts, and why does it matter?", a: "'To Himself': they were private notes, written in Greek, never meant for publication." }
        ],
        further: ['Marcus Aurelius, Meditations, translated by Gregory Hays (2002)', 'Pierre Hadot, The Inner Citadel (1998)']
      },
      {
        id: 'phil.seneca', kind: 'thinker', title: 'Seneca',
        line: "Statesman, playwright and Stoic letter writer, tutor to Nero, on the shortness of life.",
        facets: { branch: ['ethics', 'meaning'], era: ['ancient'], tradition: ['western'] },
        say: { text: 'Seneca', respell: 'SEN ih kuh', ipa: 'ˈsɛnɪkə' },
        life: 'About 4 BCE to 65 CE', place: 'Born in Córdoba, Spain; lived in Rome',
        body: [
          "Lucius Annaeus Seneca was among the most famous writers of his age: a dramatist, a senator, an immensely rich man, and the tutor and later chief adviser of the young emperor Nero. He spent eight years in exile on Corsica, returned to power, and eventually withdrew from Nero's court. In 65 CE, accused of joining a conspiracy, he was ordered to kill himself, and did so with Stoic composure.",
          "His <em>Letters to Lucilius</em>, 124 letters on how to live, are among the warmest works of ancient philosophy. They treat time as the one thing truly ours, anger as a brief madness, and friendship, reading and daily self examination as remedies. Remarkably for a Stoic, he ends many early letters with a saying from Epicurus, happy to take good ideas from the rival camp.",
          "Critics have always noticed the gap between his praise of simplicity and his vast wealth and political compromises. Seneca knew it, and wrote that he was not a wise man, only someone trying to become less bad each day."
        ],
        links: [
          { to: 'phil.stoicism', type: 'part-of', why: "Seneca's letters are the most literary and personal expression of Roman Stoicism." },
          { to: 'phil.epicureanism', type: 'links-to', why: "He freely quoted Epicurus, showing that the rival schools shared more practical wisdom than their quarrels suggest." },
          { to: 'phil.good-life', type: 'links-to', why: "His essay On the Shortness of Life argues that life is long enough if we know how to use it." }
        ],
        prompts: ["Seneca said life is long if you know how to use it. Where did your time go this week, and was it yours?"],
        recall: [
          { q: "Why did Seneca, a Stoic, quote Epicurus?", a: "He was willing to take good ideas from a rival school, ending many early letters with an Epicurean saying." }
        ],
        further: ['Seneca, Letters from a Stoic, translated by Robin Campbell (1969)', 'Seneca, On the Shortness of Life']
      },
      {
        id: 'phil.augustine', kind: 'thinker', title: 'Augustine of Hippo',
        line: "North African bishop who brought Platonism into Christianity and invented the inward autobiography.",
        facets: { branch: ['religion', 'mind', 'metaphysics'], era: ['ancient'], tradition: ['western'] },
        life: '354 to 430', place: 'Born in Thagaste, Roman North Africa (now Algeria); bishop of Hippo',
        body: [
          "Augustine was born in Roman North Africa to a pagan father and a Christian mother, Monica. A brilliant teacher of rhetoric, he spent years among the Manichaeans, who explained evil as a power rivalling good, before Neoplatonist books and the preaching of Ambrose in Milan led to his conversion in 386. He became bishop of Hippo and the most influential theologian of the Latin West.",
          "His <em>Confessions</em> invented a new kind of writing: a searching account of his own inner life, addressed to God. It includes famous meditations on memory, which he found vast and mysterious, and on time, which he understood perfectly well until someone asked him to explain it.",
          "Against the Manichaeans he argued that evil is not a substance but a privation, a lack of good, and that moral evil comes from the free will of creatures turning away from God. <em>The City of God</em>, begun after the sack of Rome in 410, contrasted the earthly city of self love with the heavenly city of the love of God."
        ],
        quote: { text: 'What then is time? Provided that no one asks me, I know. If I want to explain it to an inquirer, I do not know.', source: 'Augustine, Confessions, Book XI, 14, translated by Henry Chadwick' },
        links: [
          { to: 'phil.god-evil', type: 'influenced', why: "Augustine's account of evil as privation and his free will defence shaped Christian responses to the problem of evil for centuries." },
          { to: 'phil.free-will', type: 'influenced', why: "His book On Free Choice of the Will made freedom central to Western debates about sin and responsibility." },
          { to: 'phil.plato', type: 'responds-to', why: "Augustine read the Neoplatonists and recast Plato's eternal Forms as ideas in the mind of God." },
          { to: 'psy.memory', type: 'links-to', why: "Book X of the Confessions explores the 'vast palaces' of memory, an early first person study of how remembering works." }
        ],
        prompts: ["Augustine knew what time was until someone asked. What do you understand perfectly until you try to explain it?"],
        recall: [
          { q: "How did Augustine explain evil?", a: "As a privation, an absence of good, arising from the misuse of free will, not as a substance or rival power." }
        ],
        further: ['Augustine, Confessions, translated by Henry Chadwick (1991)', 'Peter Brown, Augustine of Hippo (1967)']
      },
      {
        id: 'phil.aquinas', kind: 'thinker', title: 'Thomas Aquinas',
        line: "The Dominican friar who wove Aristotle into Christian theology.",
        facets: { branch: ['religion', 'ethics', 'metaphysics'], era: ['medieval'], tradition: ['western'] },
        say: { text: 'Aquinas', respell: 'uh KWY nus', ipa: 'əˈkwaɪnəs' },
        life: '1225 to 1274', place: 'Born at Roccasecca, Italy; taught in Paris and Naples',
        body: [
          "Thomas Aquinas came from a noble family so opposed to his joining the new mendicant Dominican order that his brothers held him captive for about a year. He persisted, studied under Albert the Great, and became the leading theologian at the University of Paris, at a time when Aristotle's works, newly translated from Greek and Arabic, were unsettling the Christian schools.",
          "His great project, above all in the unfinished <em>Summa Theologiae</em>, was to show that faith and reason do not conflict. Reason, working from Aristotle, can prove that God exists, by his Five Ways from motion, causation, contingency, degrees of perfection and order in nature; revelation adds truths reason cannot reach. His ethics joined Aristotle's virtues with natural law, the part of God's eternal law that human reason can grasp.",
          "In discussing killing in self defence he gave an early statement of what became the doctrine of double effect. In December 1273, after an experience during Mass, he reportedly stopped writing, saying that all he had written seemed like straw. He died a few months later."
        ],
        links: [
          { to: 'phil.aristotle', type: 'links-to', why: "Aquinas called Aristotle simply 'the Philosopher' and built much of his system on Aristotelian foundations." },
          { to: 'phil.averroes', type: 'contrasts', why: "Aquinas wrote against the Latin Averroists' reading of Aristotle, arguing that each human being has an individual intellect." },
          { to: 'phil.god-evil', type: 'influenced', why: "His Five Ways are the most famous set of cosmological arguments for God." },
          { to: 'phil.trolley-problem', type: 'influenced', why: "His account of killing in self defence is the source of the doctrine of double effect, central to the trolley debate." }
        ],
        prompts: ["Aquinas thought faith and reason cannot truly conflict. When they seem to, which do you trust first?"],
        recall: [
          { q: "What are Aquinas's Five Ways?", a: "Five arguments for God's existence: from motion, efficient causation, contingency, degrees of perfection and the order of nature." },
          { q: "What is natural law, for Aquinas?", a: "The part of God's eternal law that human reason can know, directing us toward human goods." }
        ],
        further: ['Thomas Aquinas, Summa Theologiae, First Part, Question 2', "Edward Feser, Aquinas: A Beginner's Guide (2009)"]
      },

      /* ===== Thinkers: early modern ===== */
      {
        id: 'phil.descartes', kind: 'thinker', title: 'René Descartes',
        line: "The father of modern philosophy, who doubted everything and found certainty in his own thinking.",
        facets: { branch: ['epistemology', 'mind', 'metaphysics'], era: ['early-modern'], tradition: ['western'] },
        say: { text: 'Descartes', respell: 'day KART', ipa: 'deɪˈkɑːt' },
        life: '1596 to 1650', place: 'Born in La Haye, France; worked mainly in the Dutch Republic; died in Stockholm',
        body: [
          "René Descartes was a mathematician first: he created the coordinate geometry that still carries his name in 'Cartesian' graphs. Educated by the Jesuits, he served briefly as a soldier, and in 1619, by his own account, spent a day alone in a stove heated room and conceived the plan of rebuilding all knowledge on certain foundations. He lived most of his adult life in the Dutch Republic and died in Stockholm in 1650, having gone to teach Queen Christina.",
          "His <em>Meditations on First Philosophy</em> (1641) apply a method of doubt. The senses sometimes deceive; I might be dreaming; an evil demon might deceive me even about arithmetic. But I cannot doubt that I am doubting, so I exist, at least as a thinking thing. From there he argued for God's existence and, through God's goodness, for the reliability of clear and distinct ideas.",
          "The result was a sharp dualism of mind and matter, and a mechanical view of the physical world that helped make modern science possible. Almost every later philosopher, from Spinoza to the phenomenologists, began by arguing with him."
        ],
        quote: { text: 'I think, therefore I am.', source: 'René Descartes, Discourse on the Method (1637), Part IV' },
        links: [
          { to: 'phil.rationalism', type: 'influenced', why: "Descartes is the founding figure of modern rationalism, rebuilding knowledge from what reason finds certain." },
          { to: 'phil.mind-body', type: 'influenced', why: "His division of reality into thinking and extended substance created the modern mind body problem." },
          { to: 'phil.scepticism', type: 'influenced', why: "His evil demon is the ancestor of every modern sceptical scenario, from the brain in a vat to the idea that we live in a simulation." }
        ],
        prompts: ["What is the one thing you could not doubt, even if everything else turned out to be a dream?"],
        recall: [
          { q: "What is the cogito?", a: "Descartes's insight that he cannot doubt that he is thinking, so he must exist: 'I think, therefore I am'." },
          { q: "What is the evil demon?", a: "A hypothetical deceiver who might make Descartes wrong about everything, used to test which beliefs are certain." }
        ],
        further: ['René Descartes, Meditations on First Philosophy (1641)', 'Bernard Williams, Descartes: The Project of Pure Enquiry (1978)']
      },
      {
        id: 'phil.spinoza', kind: 'thinker', title: 'Baruch Spinoza',
        line: "The lens grinder who identified God with Nature and found freedom in understanding necessity.",
        facets: { branch: ['metaphysics', 'ethics', 'religion', 'political'], era: ['early-modern'], tradition: ['western'] },
        say: { text: 'Spinoza', respell: 'spin OH zuh', ipa: 'spɪˈnəʊzə' },
        life: '1632 to 1677', place: 'Amsterdam and The Hague, Dutch Republic',
        body: [
          "Baruch Spinoza grew up in Amsterdam's Portuguese Jewish community, which in 1656 issued a writ of herem against him, expelling him for 'abominable heresies' it did not specify. He earned a modest living grinding lenses, declined a professorship at Heidelberg to keep his independence, and died at forty four of a lung disease, perhaps worsened by glass dust.",
          "His <em>Ethics</em>, published after his death, is set out like geometry, with definitions, axioms and proofs. Its conclusion is that there is only one substance, which can be called God or Nature. Mind and body are two aspects of the same reality. Everything follows necessarily from God's nature; there is no free will in the usual sense, and no purpose in nature.",
          "Yet the book is called <em>Ethics</em> because its aim is human freedom and joy. We are in bondage when driven by passions we do not understand; we become free as we understand the causes of what we feel, and see things, as he put it, under a kind of eternity. His <em>Theological Political Treatise</em> argued for freedom of thought and read the Bible as a human, historical document."
        ],
        links: [
          { to: 'phil.determinism', type: 'influenced', why: "Spinoza built a thoroughgoing determinism into the foundations of his system." },
          { to: 'phil.being', type: 'influenced', why: "His claim that there is only one substance is the most radical development of the idea of substance." },
          { to: 'phil.descartes', type: 'responds-to', why: "Spinoza began from Descartes but rejected his two substances for one, making mind and body two aspects of a single reality." },
          { to: 'phys.einstein', type: 'links-to', why: "Einstein said in 1929 that he believed in Spinoza's God, who reveals himself in the lawful harmony of all that exists, not a God concerned with human fates." }
        ],
        prompts: ["Spinoza thought understanding why you feel something weakens its grip. Try it on one feeling you have today."],
        recall: [
          { q: "What did Spinoza mean by 'God or Nature'?", a: "That there is one infinite substance, which can equally be called God or Nature; everything else is a way it exists." },
          { q: "For Spinoza, how do we become free?", a: "By understanding the causes of our feelings and actions, which turns passive passions into active understanding." }
        ],
        further: ['Baruch Spinoza, Ethics (1677)', 'Steven Nadler, Spinoza: A Life (1999)']
      },
      {
        id: 'phil.leibniz', kind: 'thinker', title: 'Gottfried Wilhelm Leibniz',
        line: "Universal genius who invented calculus alongside Newton and argued this is the best of all possible worlds.",
        facets: { branch: ['metaphysics', 'logic-language', 'religion'], era: ['early-modern'], tradition: ['western'] },
        say: { text: 'Leibniz', respell: 'LIBE nits', ipa: 'ˈlaɪbnɪts' },
        life: '1646 to 1716', place: 'Born in Leipzig; worked mainly in Hanover',
        body: [
          "Gottfried Wilhelm Leibniz was a diplomat, librarian, historian, engineer and mathematician as well as a philosopher. He developed calculus independently of Newton, and his notation is the one we still use, which led to a bitter dispute over priority. He built a calculating machine, explored binary arithmetic and dreamed of a universal logical language in which disputes could be settled by calculation.",
          "His metaphysics rests on two great principles. The principle of sufficient reason: nothing is so without a reason why it is so rather than otherwise. The identity of indiscernibles: no two things are exactly alike in every respect. From these he built a picture of reality made of monads, simple, mindlike substances, each mirroring the whole universe from its own point of view, coordinated by a harmony God established in advance.",
          "Why does God permit evil? In the <em>Theodicy</em> (1710) Leibniz argued that a perfectly good and wise God would create the best of all possible worlds, and this is it; its evils are necessary parts of the best overall whole. Voltaire's <em>Candide</em> made the claim a byword for complacent optimism."
        ],
        links: [
          { to: 'phil.rationalism', type: 'influenced', why: "With Descartes and Spinoza, Leibniz is one of the three great early modern rationalists." },
          { to: 'phil.god-evil', type: 'influenced', why: "Leibniz coined the word theodicy and gave the best possible world defence its classic form." },
          { to: 'phil.spinoza', type: 'contrasts', why: "Leibniz visited Spinoza in 1676 and spent years resisting his necessitarianism, insisting God chose the best among many possible worlds." },
          { to: 'phil.locke', type: 'responds-to', why: "His New Essays on Human Understanding answer Locke chapter by chapter, defending innate ideas." },
          { to: 'phys.randomness', type: 'links-to', why: "If quantum events are genuinely random, they happen without any sufficient reason, a direct challenge to Leibniz's great principle." }
        ],
        prompts: ["Could a world with no suffering at all still be the best possible world? What might it lack?"],
        recall: [
          { q: "What is the principle of sufficient reason?", a: "Nothing is so without a reason why it is so rather than otherwise." },
          { q: "Why did Leibniz think this is the best of all possible worlds?", a: "Because a perfectly good, wise and powerful God would choose to create the best possible world." }
        ],
        further: ['G. W. Leibniz, Monadology (1714)', 'G. W. Leibniz, Theodicy (1710)']
      },
      {
        id: 'phil.locke', kind: 'thinker', title: 'John Locke',
        line: "Empiricist and founder of liberalism, who pictured the mind as white paper and government as a trust.",
        facets: { branch: ['epistemology', 'political', 'mind'], era: ['early-modern'], tradition: ['western'] },
        life: '1632 to 1704', place: 'England; in exile in the Dutch Republic from 1683 to 1689',
        body: [
          "John Locke trained as a physician and became adviser to the Earl of Shaftesbury, a leading opponent of the Stuart kings. Suspected of involvement in plots, he fled to the Dutch Republic in 1683 and returned after the Glorious Revolution of 1688, when his two great works appeared within months of each other.",
          "The <em>Essay Concerning Human Understanding</em> argues that there are no innate ideas: all our ideas come from experience, through sensation and reflection. It also contains his account of personal identity as continuity of consciousness, and his distinction between primary qualities like shape, which are in objects, and secondary qualities like colour, which are powers to produce sensations in us.",
          "The <em>Second Treatise of Government</em> argues that people have natural rights to life, liberty and property, that legitimate government rests on consent and exists to protect those rights, and that a government which violates them may be resisted. His <em>Letter Concerning Toleration</em> argued for religious toleration, though he excluded Catholics and atheists. These ideas shaped the American founding and modern liberalism."
        ],
        links: [
          { to: 'phil.empiricism', type: 'influenced', why: "Locke's Essay is the founding text of British empiricism." },
          { to: 'phil.personal-identity', type: 'influenced', why: "His memory criterion launched the modern debate about personal identity." },
          { to: 'phil.social-contract', type: 'influenced', why: "His theory of government by consent to protect natural rights is the most influential version of the social contract." },
          { to: 'phil.descartes', type: 'contrasts', why: "Locke opened the Essay by attacking the innate ideas on which Descartes relied." }
        ],
        prompts: ["Locke said government is a trust that can be forfeited. What would it take for you to think a government had forfeited it?"],
        recall: [
          { q: "What did Locke say about innate ideas?", a: "There are none: all ideas come from experience, through sensation and reflection." },
          { q: "What did Locke think legitimate government rests on?", a: "The consent of the governed; its purpose is to protect natural rights to life, liberty and property." }
        ],
        further: ['John Locke, An Essay Concerning Human Understanding (1689)', 'John Locke, Second Treatise of Government (1689)']
      },
      {
        id: 'phil.hume', kind: 'thinker', title: 'David Hume',
        line: "The genial Scot who found that causation, the self and induction rest on habit, not reason.",
        facets: { branch: ['epistemology', 'metaphysics', 'ethics', 'religion'], era: ['early-modern'], tradition: ['western'] },
        life: '1711 to 1776', place: 'Edinburgh, Scotland',
        body: [
          "David Hume wrote <em>A Treatise of Human Nature</em> in his twenties, mostly in France, and was crushed when, as he put it, it fell dead born from the press. He recast its ideas in more accessible essays and enquiries, became famous as a historian of England, and was twice refused a university chair because of his reputation for religious scepticism. Friends remembered him as kind, cheerful and sociable, and he met death calmly, to the astonishment of the pious.",
          "His project was a science of human nature built on experience. Followed rigorously, it produced shocks. We never perceive causal necessity, only regular succession plus a habit of expectation. Induction cannot be justified by reason. When we look inward we find only a bundle of perceptions, never a self. And no 'ought' follows from any set of 'is' statements without some further premise.",
          "In ethics he argued that reason alone never moves us to act; feelings do, especially sympathy. His <em>Dialogues Concerning Natural Religion</em>, published after his death, dismantled the design argument with such force that many think it never fully recovered. Kant said Hume woke him from his dogmatic slumber."
        ],
        quote: { text: 'Reason is, and ought only to be the slave of the passions, and can never pretend to any other office than to serve and obey them.', source: 'David Hume, A Treatise of Human Nature (1739 to 1740), Book 2, Part 3, Section 3' },
        links: [
          { to: 'phil.causation', type: 'influenced', why: "Hume's analysis of cause as constant conjunction plus habit is the starting point of every modern theory of causation." },
          { to: 'phil.induction', type: 'influenced', why: "Hume first posed the problem of induction in its modern form." },
          { to: 'phil.compatibilism', type: 'influenced', why: "Hume argued that liberty means acting according to the determinations of the will, a classic compatibilist account." },
          { to: 'psy.self', type: 'links-to', why: "Hume's self as a bundle of perceptions anticipates psychological views of the self as constructed rather than given." },
          { to: 'phys.einstein', type: 'links-to', why: "Einstein wrote to Moritz Schlick in 1915 that reading Hume had helped him toward relativity, by teaching him to question concepts like absolute time." }
        ],
        prompts: ["Hume said reason serves the passions. Think of a recent decision: did reason lead, or did it find reasons for what you already felt?"],
        recall: [
          { q: "What is Hume's bundle theory of the self?", a: "When we look inward we find only a bundle of perceptions, never a separate self that has them." },
          { q: "What is the is ought gap?", a: "No conclusion about what ought to be follows from premises only about what is, without a further evaluative premise." }
        ],
        further: ['David Hume, An Enquiry Concerning Human Understanding (1748)', 'James A. Harris, Hume: An Intellectual Biography (2015)']
      },
      {
        id: 'phil.kant', kind: 'thinker', title: 'Immanuel Kant',
        line: "Königsberg's quiet revolutionary, who argued the mind shapes experience and duty binds every rational being.",
        facets: { branch: ['epistemology', 'metaphysics', 'ethics', 'aesthetics'], era: ['early-modern'], tradition: ['western'] },
        life: '1724 to 1804', place: 'Königsberg, Prussia (now Kaliningrad, Russia)',
        body: [
          "Immanuel Kant spent his whole life in and around Königsberg, a Baltic port city, teaching an enormous range of subjects. The story that neighbours set their clocks by his afternoon walk may be exaggerated, but his life was famously regular. It was his thinking that was revolutionary. In his late fifties he published the <em>Critique of Pure Reason</em> (1781), and he later credited Hume with waking him from his dogmatic slumber.",
          "Kant's answer to the rationalists and empiricists was that both were half right. Knowledge begins with experience, but the mind brings its own forms, space and time, and categories such as cause, without which experience would be impossible. So we can know some things a priori about any possible experience, but only about things as they appear to us, never things as they are in themselves. He compared the shift to Copernicus: instead of the mind conforming to objects, objects conform to the mind.",
          "In ethics he grounded morality in reason and freedom: the categorical imperative and the dignity of persons as ends in themselves. In aesthetics he analysed beauty and the sublime. In politics he sketched a federation of free states for perpetual peace. Few philosophers have shaped so many fields."
        ],
        links: [
          { to: 'phil.deontology', type: 'influenced', why: "Kant's categorical imperative is the classic statement of duty based ethics." },
          { to: 'phil.hume', type: 'responds-to', why: "Kant's critical philosophy began as an answer to Hume's doubts about causation and necessary truths." },
          { to: 'phil.rationalism', type: 'responds-to', why: "Kant set out to settle the dispute between rationalism and empiricism by showing what each got right and where each overreached." },
          { to: 'phil.beauty', type: 'influenced', why: "His Critique of Judgement made beauty a disinterested pleasure that nonetheless claims universal agreement." },
          { to: 'psy.perception', type: 'links-to', why: "Kant's claim that the mind actively structures experience anticipates the psychology of perception, which finds the brain constructing what we see." }
        ],
        prompts: ["Is there anything you experience that your mind does not, in some way, help to shape?"],
        recall: [
          { q: "What did Kant mean by his Copernican revolution?", a: "Instead of assuming the mind conforms to objects, he proposed that objects as we experience them conform to the mind's forms and categories." },
          { q: "What is the difference between appearances and things in themselves?", a: "Appearances are things as they show up to us, shaped by our forms of experience; things in themselves are things as they are independently, which we cannot know." }
        ],
        further: ['Immanuel Kant, Prolegomena to Any Future Metaphysics (1783)', 'Roger Scruton, Kant: A Very Short Introduction (2001)']
      },

      /* ===== Thinkers: the nineteenth century ===== */
      {
        id: 'phil.hegel', kind: 'thinker', title: 'G. W. F. Hegel',
        line: "The philosopher of history and spirit, for whom reality unfolds through contradiction.",
        facets: { branch: ['metaphysics', 'political'], era: ['modern'], tradition: ['western'] },
        say: { text: 'Hegel', respell: 'HAY gul', ipa: 'ˈheɪɡəl' },
        life: '1770 to 1831', place: 'Born in Stuttgart; taught in Jena, Heidelberg and Berlin',
        body: [
          "Georg Wilhelm Friedrich Hegel finished <em>The Phenomenology of Spirit</em> in Jena in 1806, as Napoleon's army fought nearby; in a letter he described seeing the emperor, 'this world soul', riding through the town. He became the most famous philosopher in Germany, holding the chair at Berlin until his death in a cholera epidemic.",
          "His central thought is that reality is not a static collection of things but a process: the self development of spirit, or mind, through history. Ideas and forms of life develop by running into their own contradictions and being transformed into richer ones that preserve what was true in them. The popular formula 'thesis, antithesis, synthesis' is not his; it comes from Fichte, and makes the process sound more mechanical than Hegel intended.",
          "The best known passage of the <em>Phenomenology</em> is the struggle of lord and bondsman. Self consciousness needs recognition from another self consciousness; the master who forces recognition from a slave finds it worthless, while the slave, through work, comes to a truer understanding of himself. The idea that we become selves through recognition has influenced Marx, existentialism, feminism and theories of identity."
        ],
        quote: { text: 'The owl of Minerva spreads its wings only with the falling of the dusk.', source: 'G. W. F. Hegel, Philosophy of Right (1820), Preface' },
        links: [
          { to: 'phil.kant', type: 'responds-to', why: "Hegel rejected Kant's unknowable things in themselves, arguing that reason can grasp reality as a whole." },
          { to: 'phil.being', type: 'links-to', why: "His Science of Logic begins from pure being, which turns out to be indistinguishable from nothing, and so passes into becoming." },
          { to: 'psy.self', type: 'links-to', why: "Hegel's claim that self consciousness requires recognition by others anticipates social theories of the self in psychology." }
        ],
        prompts: ["Whose recognition has mattered most in making you who you are?"],
        recall: [
          { q: "Is 'thesis, antithesis, synthesis' Hegel's own formula?", a: "No; it comes from Fichte, and it oversimplifies Hegel's dialectic." },
          { q: "What does the lord and bondsman passage say about selfhood?", a: "That self consciousness needs recognition from another, and that forced recognition is hollow." }
        ],
        further: ['G. W. F. Hegel, The Phenomenology of Spirit (1807)', 'Peter Singer, Hegel: A Very Short Introduction (2001)']
      },
      {
        id: 'phil.mill', kind: 'thinker', title: 'John Stuart Mill',
        line: "Utilitarian, liberal and feminist, who defended individual liberty against the tyranny of the majority.",
        facets: { branch: ['ethics', 'political', 'epistemology'], era: ['modern'], tradition: ['western'] },
        life: '1806 to 1873', place: 'London; died in Avignon, France',
        body: [
          "John Stuart Mill was educated by his father, James Mill, as a utilitarian experiment: Greek at three, Latin at eight, political economy at thirteen. At twenty he fell into a deep depression, described in his <em>Autobiography</em>, and found his way out partly through Wordsworth's poetry, learning that feeling and imagination matter as much as analysis.",
          "His <em>Utilitarianism</em> (1863) defended the greatest happiness principle while arguing that some pleasures are higher than others. <em>On Liberty</em> (1859), deeply shaped by his partner and later wife Harriet Taylor Mill, set out the harm principle: society may restrict a person's liberty only to prevent harm to others, never for their own good. He feared the tyranny of the majority, the pressure of opinion that crushes individuality.",
          "<em>The Subjection of Women</em> (1869) argued for full legal and political equality for women, and as a Member of Parliament he proposed, in 1867, an amendment to give women the vote. His <em>System of Logic</em> set out methods of inductive reasoning still taught today."
        ],
        quote: { text: 'It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.', source: 'John Stuart Mill, Utilitarianism (1863), chapter 2' },
        links: [
          { to: 'phil.utilitarianism', type: 'influenced', why: "Mill's Utilitarianism is the most widely read defence of the theory." },
          { to: 'phil.justice', type: 'influenced', why: "The harm principle sets a limit on what any society may justly demand of the individual." },
          { to: 'phil.induction', type: 'links-to', why: "Mill's methods of agreement and difference are practical rules for inductive reasoning, offered as working tools after Hume's doubts." }
        ],
        prompts: ["Is there anything you do that harms no one else but that others try to stop? Should they?"],
        recall: [
          { q: "What is the harm principle?", a: "The only legitimate reason to restrict someone's liberty against their will is to prevent harm to others." },
          { q: "How did Mill distinguish higher and lower pleasures?", a: "Those who have experienced both prefer the pleasures of intellect, feeling and imagination, so these count for more." }
        ],
        further: ['John Stuart Mill, On Liberty (1859)', 'John Stuart Mill, Autobiography (1873)']
      },
      {
        id: 'phil.kierkegaard', kind: 'thinker', title: 'Søren Kierkegaard',
        line: "The Danish thinker of anxiety, faith and the single individual, forerunner of existentialism.",
        facets: { branch: ['meaning', 'religion', 'ethics'], era: ['modern'], tradition: ['western'] },
        say: { text: 'Kierkegaard', respell: 'KEER kuh gard', ipa: 'ˈkɪəkəɡɑːd' },
        life: '1813 to 1855', place: 'Copenhagen, Denmark',
        body: [
          "Søren Kierkegaard lived almost all his life in Copenhagen, financed by an inheritance, writing at furious speed. In 1841 he broke off his engagement to Regine Olsen, whom he loved, an act he spent years trying to understand in his books. Many of them appeared under pseudonyms, each voicing a different way of life, so that readers would have to decide for themselves rather than be told.",
          "<em>Either/Or</em> (1843) contrasts the aesthetic life, devoted to pleasure and the avoidance of boredom, with the ethical life of commitment and duty. <em>Fear and Trembling</em> (1843) meditates on Abraham's willingness to sacrifice Isaac, asking whether faith can require what ethics forbids. The phrase 'leap of faith' is a later summary rather than his own words, but the idea is his: faith cannot be reached by reasoning; it requires passionate commitment in the face of uncertainty.",
          "Against Hegel's grand system he championed the single individual, who must exist, choose and believe, not merely think about existence. <em>The Concept of Anxiety</em> calls anxiety the dizziness of freedom. Little read outside Denmark in his lifetime, he became a central influence on twentieth century existentialism and theology."
        ],
        quote: { text: 'It is perfectly true, as the philosophers say, that life must be understood backwards. But they forget the other proposition, that it must be lived forwards.', source: 'Søren Kierkegaard, Journals, 1843 (entry JJ:167)' },
        links: [
          { to: 'phil.existentialism', type: 'influenced', why: "Kierkegaard's focus on the anxious, choosing individual made him the first existentialist in all but name." },
          { to: 'phil.hegel', type: 'responds-to', why: "Kierkegaard mocked Hegel's system for explaining everything except what it is like for a particular person to exist and choose." },
          { to: 'phil.absurd', type: 'contrasts', why: "Camus saw Kierkegaard's leap into faith as the very 'philosophical suicide' he refused, though both start from the same confrontation." },
          { to: 'phys.bohr', type: 'links-to', why: "The young Niels Bohr read Kierkegaard with enthusiasm; some historians think this shaped his idea of complementarity, though the influence is debated." }
        ],
        prompts: ["Kierkegaard called anxiety the dizziness of freedom. When did a choice last make you dizzy, and what did you do?"],
        recall: [
          { q: "What are Kierkegaard's aesthetic and ethical ways of life?", a: "The aesthetic life seeks pleasure and avoids boredom; the ethical life is defined by commitment and duty." },
          { q: "Why did Kierkegaard write under pseudonyms?", a: "To present different ways of life from the inside, so readers would have to choose for themselves." }
        ],
        further: ['Søren Kierkegaard, Fear and Trembling (1843)', 'Clare Carlisle, Philosopher of the Heart: The Restless Life of Søren Kierkegaard (2019)']
      },
      {
        id: 'phil.nietzsche', kind: 'thinker', title: 'Friedrich Nietzsche',
        line: "The philosopher with a hammer, who announced the death of God and asked what values could replace him.",
        facets: { branch: ['meaning', 'ethics', 'religion'], era: ['modern'], tradition: ['western'] },
        say: { text: 'Nietzsche', respell: 'NEE chuh', ipa: 'ˈniːtʃə' },
        life: '1844 to 1900', place: 'Born in Röcken, Prussia; professor in Basel; collapsed in Turin in 1889',
        body: [
          "Friedrich Nietzsche became a professor of classical philology at Basel at twenty four. Ill health forced him to resign ten years later, and he spent the following decade moving between Swiss mountain villages and Italian towns, writing the books that made him famous only after his collapse into mental illness in Turin in January 1889. He never recovered, and died in 1900. His sister Elisabeth, who controlled his papers, bent his work toward German nationalism and antisemitism, both of which he had despised.",
          "In <em>The Gay Science</em> (1882) a madman announces that God is dead, and that we have killed him. Nietzsche meant that belief in the Christian God had become impossible for many educated Europeans, and that most had not grasped the consequence: the values built on that belief, such as compassion for the weak and the equal worth of souls, had lost their foundation. The danger was nihilism.",
          "His response was to ask where our values come from. <em>On the Genealogy of Morality</em> (1887) argues that Christian morality grew partly from the resentment of the powerless. He imagined the Übermensch, a human being who creates values rather than receiving them, and posed the test of eternal recurrence: could you will to live your life again, exactly as it was, infinitely many times? To say yes is amor fati, love of one's fate."
        ],
        quote: { text: 'God is dead. God remains dead. And we have killed him.', source: 'Friedrich Nietzsche, The Gay Science (1882), section 125' },
        links: [
          { to: 'phil.existentialism', type: 'influenced', why: "Nietzsche's demand that we create our own values after the death of God is a founding theme of existentialism." },
          { to: 'phil.god-evil', type: 'links-to', why: "The death of God turns the question from whether God exists to what follows for morality if belief in God collapses." },
          { to: 'phil.meaning', type: 'influenced', why: "Nietzsche made the threat of nihilism, a life without given meaning, the central problem of modern culture." },
          { to: 'phil.socrates', type: 'responds-to', why: "In Twilight of the Idols Nietzsche treats Socrates's faith in reason as a symptom of decline, which he called the problem of Socrates." },
          { to: 'psy.psychoanalysis', type: 'links-to', why: "Freud acknowledged that Nietzsche had anticipated insights of psychoanalysis about hidden drives and self deception." }
        ],
        prompts: ["Could you will to live this past year again, exactly as it was, forever? What would have to change for the answer to be yes?"],
        recall: [
          { q: "What did Nietzsche mean by 'God is dead'?", a: "That belief in the Christian God had become untenable for many, leaving the values built on it without foundation." },
          { q: "What is the test of eternal recurrence?", a: "Imagining living your life again, exactly the same, infinitely many times, and asking whether you could affirm it." }
        ],
        further: ['Friedrich Nietzsche, The Gay Science (1882)', 'Sue Prideaux, I Am Dynamite! A Life of Nietzsche (2018)']
      },
      {
        id: 'phil.marx', kind: 'thinker', title: 'Karl Marx',
        line: "Philosopher, economist and revolutionary, who argued that how we produce shapes how we think.",
        facets: { branch: ['political', 'ethics'], era: ['modern'], tradition: ['western'] },
        life: '1818 to 1883', place: 'Born in Trier, Prussia; lived in London from 1849',
        body: [
          "Karl Marx studied philosophy in Berlin when Hegel's influence was at its height. Too radical for an academic career, he became a journalist, was expelled from Prussia, France and Belgium, and settled in London in 1849, where he lived for the rest of his life, often in poverty, supported by his friend and collaborator Friedrich Engels. He spent years in the British Museum reading room writing <em>Capital</em>, whose first volume appeared in 1867.",
          "Marx kept Hegel's idea that history develops through conflict, but replaced the development of spirit with material life. How a society produces its food and goods, and who owns the means of production, shapes its laws, politics, religion and ideas. Under capitalism, he argued, workers are alienated: from what they make, from their own work, from one another and from their human potential.",
          "He predicted that capitalism's contradictions would lead to revolution and a classless society. The regimes that later claimed his name were often brutal, and many of his predictions failed. But his analysis of alienation, ideology and economic power still shapes sociology, history and political debate."
        ],
        quote: { text: 'The philosophers have only interpreted the world, in various ways; the point is to change it.', source: 'Karl Marx, Theses on Feuerbach (1845), thesis XI' },
        links: [
          { to: 'phil.hegel', type: 'responds-to', why: "Marx said he found Hegel's dialectic standing on its head and set it the right way up, grounding it in material life rather than spirit." },
          { to: 'phil.justice', type: 'links-to', why: "Marx distrusted appeals to justice within capitalism as ideology, yet his account of exploitation is driven by a powerful sense of injustice." },
          { to: 'phil.god-evil', type: 'links-to', why: "Marx called religion the opium of the people: a consolation produced by suffering that also hides its causes." },
          { to: 'phil.mill', type: 'contrasts', why: "Mill hoped to reform a market society through liberty and education; Marx argued that such reforms could not end the exploitation built into capitalism." }
        ],
        prompts: ["How much of what you believe about work and money might reflect the economy you grew up in?"],
        recall: [
          { q: "What is alienation, for Marx?", a: "Workers' estrangement under capitalism from the products of their labour, their work, each other and their human potential." },
          { q: "What did Marx do with Hegel's dialectic?", a: "He kept the idea of history moving through conflict but grounded it in material production and class rather than spirit." }
        ],
        further: ['Karl Marx and Friedrich Engels, The Communist Manifesto (1848)', 'Peter Singer, Marx: A Very Short Introduction (2000)']
      },

      /* ===== Thinkers: the twentieth century and after ===== */
      {
        id: 'phil.husserl', kind: 'thinker', title: 'Edmund Husserl',
        line: "The founder of phenomenology, who wanted philosophy to begin from careful description of experience.",
        facets: { branch: ['mind', 'epistemology'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Husserl', respell: 'HOOS url', ipa: 'ˈhʊsəl' },
        life: '1859 to 1938', place: 'Born in Prossnitz, Moravia; taught in Göttingen and Freiburg',
        body: [
          "Edmund Husserl trained as a mathematician before turning to philosophy under Franz Brentano in Vienna. His <em>Logical Investigations</em> (1900 to 1901) launched phenomenology, and he spent the rest of his life refining it, leaving tens of thousands of pages of manuscripts in shorthand.",
          "He wanted philosophy to become a rigorous science by returning to experience itself. Through the epoché, suspending belief in the world's existence, he hoped to describe the essential structures of consciousness: intentionality, the way perception anticipates the hidden sides of things, the flowing structure of our awareness of time. In his late work he introduced the lifeworld, the shared world of everyday experience that science presupposes and too often forgets.",
          "Husserl was born Jewish and had converted to Lutheranism. After 1933 the Nazi regime stripped him of his university privileges, and his former student Heidegger removed the dedication to him from later editions of <em>Being and Time</em>. After Husserl's death a Franciscan priest, Herman Van Breda, smuggled his manuscripts to Leuven in Belgium, where they are still kept."
        ],
        links: [
          { to: 'phil.phenomenology', type: 'influenced', why: "Husserl founded phenomenology as a method for describing the structures of experience." },
          { to: 'phil.descartes', type: 'responds-to', why: "His Cartesian Meditations (1931) took Descartes's turn to the thinking subject as a model while trying to avoid his dualism." }
        ],
        prompts: ["Pick an object near you. Without turning it, what do you expect its hidden side to look like? Where does that expectation come from?"],
        recall: [
          { q: "What is the lifeworld?", a: "The shared world of everyday lived experience, from which science grows and which it presupposes." }
        ],
        further: ['Edmund Husserl, Cartesian Meditations (1931)', "Dan Zahavi, Husserl's Phenomenology (2003)"]
      },
      {
        id: 'phil.heidegger', kind: 'thinker', title: 'Martin Heidegger',
        line: "The philosopher of being in the world, whose brilliance and whose Nazism both demand reckoning.",
        facets: { branch: ['metaphysics', 'meaning', 'mind'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Heidegger', respell: 'HY deg er', ipa: 'ˈhaɪdɛɡə' },
        life: '1889 to 1976', place: 'Born in Messkirch, Germany; taught at Marburg and Freiburg',
        body: [
          "Martin Heidegger's <em>Being and Time</em> (1927) raised what he called the question of the meaning of being, which he thought Western philosophy had forgotten since Plato. To approach it he analysed the one being for whom its own being is an issue: the human being, which he called Dasein, 'being there'.",
          "Dasein is not first a mind looking at objects but being in the world, absorbed in practical concerns. A hammer shows up as something to hammer with, not as an object with properties, until it breaks. We are thrown into a world we did not choose, and mostly live as 'the they', doing what one does. Facing our own death, what he called being toward death, can call us back to a life that is authentically our own. His later work turned to language, poetry and a critique of technology as a way of treating everything as raw material.",
          "In 1933 he joined the Nazi party and became rector of Freiburg University, making speeches in support of the regime. He resigned the rectorship within a year but remained a party member, never clearly repudiated Nazism, and his private notebooks, published from 2014, contain antisemitic passages. Whether and how this infects his philosophy remains one of the most argued questions in modern thought."
        ],
        links: [
          { to: 'phil.being', type: 'influenced', why: "Heidegger made the question of being central again, distinguishing being itself from the beings that are." },
          { to: 'phil.existentialism', type: 'influenced', why: "Sartre and others drew much of their vocabulary of thrownness, anxiety and authenticity from Being and Time." },
          { to: 'phil.death', type: 'links-to', why: "Being toward death is Heidegger's term for facing one's own mortality as the horizon that makes an authentic life possible." },
          { to: 'phil.husserl', type: 'responds-to', why: "Heidegger turned his teacher's phenomenology of consciousness into an analysis of practical being in the world." }
        ],
        prompts: ["How much of your day is lived as 'one does', and how much as you yourself would choose?"],
        recall: [
          { q: "What is Dasein?", a: "Heidegger's term for the human being, the entity for whom its own being is an issue; literally 'being there'." },
          { q: "What does Heidegger mean by being in the world?", a: "That we are first absorbed in practical engagement with things, not detached minds observing objects." }
        ],
        further: ['Martin Heidegger, Being and Time (1927)', 'Sarah Bakewell, At the Existentialist Café (2016)']
      },
      {
        id: 'phil.wittgenstein', kind: 'thinker', title: 'Ludwig Wittgenstein',
        line: "Twice the most influential philosopher of his age, with two very different accounts of language.",
        facets: { branch: ['logic-language', 'mind', 'epistemology'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Wittgenstein', respell: 'VIT gen shtine', ipa: 'ˈvɪtɡənʃtaɪn' },
        life: '1889 to 1951', place: 'Born in Vienna; worked mainly in Cambridge, England',
        body: [
          "Ludwig Wittgenstein was born into one of the richest families in Vienna, studied engineering, and came to Cambridge in 1911 to work with Bertrand Russell, who soon thought him a genius. He wrote much of his first book while serving in the First World War, gave away his fortune, and worked as a village schoolteacher and a gardener before returning to Cambridge in 1929.",
          "The <em>Tractatus</em> (1921) argued that language pictures the world, that meaningful propositions picture possible facts, and that ethics, aesthetics and the meaning of life lie beyond what can be said. It ends: 'Whereof one cannot speak, thereof one must be silent.' Believing he had solved the problems of philosophy, he left it.",
          "He came back convinced he had been wrong. The <em>Philosophical Investigations</em>, published in 1953, treats meaning as use within language games and philosophy as a therapy for the confusions language causes. His last notes, <em>On Certainty</em>, argue that doubt makes sense only against a background of certainties that are not themselves known by evidence."
        ],
        links: [
          { to: 'phil.language-games', type: 'influenced', why: "Language games are the central idea of Wittgenstein's later philosophy." },
          { to: 'phil.augustine', type: 'responds-to', why: "The Investigations opens by quoting Augustine's account of learning words as the picture of language it sets out to loosen." },
          { to: 'phil.scepticism', type: 'responds-to', why: "On Certainty answers sceptics by arguing that some beliefs are the hinges on which all doubting turns." }
        ],
        prompts: ["Is there something important to you that you cannot put into words? Does that make it less real?"],
        recall: [
          { q: "How did the later Wittgenstein differ from the early one about meaning?", a: "The early Tractatus held that sentences picture facts; the later Investigations held that meaning is use within language games." }
        ],
        further: ['Ludwig Wittgenstein, Philosophical Investigations (1953)', 'Ray Monk, Ludwig Wittgenstein: The Duty of Genius (1990)']
      },
      {
        id: 'phil.sartre', kind: 'thinker', title: 'Jean Paul Sartre',
        line: "Novelist, playwright and philosopher of radical freedom and bad faith.",
        facets: { branch: ['meaning', 'ethics', 'mind'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Sartre', respell: 'SAR truh', ipa: 'ˈsɑːtrə' },
        life: '1905 to 1980', place: 'Paris, France',
        body: [
          "Jean Paul Sartre was the most famous intellectual of postwar France: a novelist (<em>Nausea</em>, 1938), a playwright (<em>No Exit</em>, with its line 'hell is other people'), a philosopher and a political activist, who wrote in the cafés of Saint Germain and shared a lifelong partnership with Simone de Beauvoir. He was a prisoner of war in 1940 and 1941, and in 1964 he declined the Nobel Prize in Literature.",
          "<em>Being and Nothingness</em> (1943) argues that human consciousness is a kind of nothingness, never simply identical with what it is, always projecting beyond itself. Hence we are radically free, 'condemned to be free', and responsible for what we make of ourselves. Most of the time we flee this freedom in bad faith, like the waiter who plays at being a waiter. The gaze of another person can turn us into an object, which is part of what makes relationships so fraught.",
          "His 1945 lecture <em>Existentialism Is a Humanism</em> popularised the slogan that existence precedes essence. Later he tried, with mixed success, to combine existentialism with Marxism."
        ],
        links: [
          { to: 'phil.existentialism', type: 'influenced', why: "Sartre gave existentialism its name in public life and its best known slogans." },
          { to: 'phil.free-will', type: 'links-to', why: "Sartre held that we are radically free, so that even refusing to choose is a choice for which we are responsible." },
          { to: 'psy.cognitive-dissonance', type: 'links-to', why: "Bad faith, lying to oneself about one's own freedom, describes from the inside the self justification that dissonance theory studies from the outside." },
          { to: 'phil.heidegger', type: 'responds-to', why: "Being and Nothingness reworks Heidegger's analysis of human existence into a philosophy of consciousness and freedom." }
        ],
        prompts: ["Think of a role you play, at work or at home. Where does the role end and your choice begin?"],
        recall: [
          { q: "What does Sartre mean by 'condemned to be free'?", a: "We did not choose to be free, but we cannot escape choosing and are responsible for what we make of ourselves." }
        ],
        further: ['Jean Paul Sartre, Existentialism Is a Humanism (1946)', 'Jean Paul Sartre, Being and Nothingness (1943)']
      },
      {
        id: 'phil.beauvoir', kind: 'thinker', title: 'Simone de Beauvoir',
        line: "Existentialist and author of The Second Sex, who showed how womanhood is made, not born.",
        facets: { branch: ['ethics', 'political', 'meaning'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'de Beauvoir', respell: 'duh boh VWAR', ipa: 'də bəʊˈvwɑː' },
        life: '1908 to 1986', place: 'Paris, France',
        body: [
          "Simone de Beauvoir came second only to Sartre in France's national philosophy examination, the agrégation, in 1929, and at twenty one was among the youngest ever to pass it; their partnership lasted the rest of their lives. She was a novelist, winning the Prix Goncourt for <em>The Mandarins</em> (1954), a memoirist and a philosopher in her own right, though for decades she was wrongly treated as Sartre's follower.",
          "<em>The Ethics of Ambiguity</em> (1947) argued that freedom is always situated and that to will oneself free is also to will others free. <em>The Second Sex</em> (1949) applied existentialism to women's lives. Woman, she argued, has been constructed as the Other, defined relative to man, who is treated as the default human. Biology, myth, history and upbringing combine to make women into what they are expected to be.",
          "The book was placed on the Vatican's Index of Forbidden Books and became a founding text of modern feminism. Later works, such as <em>Old Age</em> (1970), turned the same kind of analysis on ageing."
        ],
        quote: { text: 'One is not born, but rather becomes, a woman.', source: 'Simone de Beauvoir, The Second Sex (1949), Volume II, opening, translated by H. M. Parshley' },
        links: [
          { to: 'phil.existentialism', type: 'influenced', why: "De Beauvoir developed existentialist ethics and showed how freedom is shaped by situation." },
          { to: 'phil.sartre', type: 'contrasts', why: "De Beauvoir pressed Sartre to see that freedom is limited by situation, a correction that later reshaped his own thinking." },
          { to: 'phil.phenomenology', type: 'links-to', why: "The Second Sex uses phenomenological description of lived experience, the body, girlhood, marriage, to show how meanings are imposed." },
          { to: 'phil.mill', type: 'links-to', why: "Mill's Subjection of Women argued for legal equality; de Beauvoir went further, asking how womanhood itself is constructed." }
        ],
        prompts: ["Which expectations shaped who you became, in ways you only noticed later?"],
        recall: [
          { q: "What did de Beauvoir mean by woman as the Other?", a: "That woman has been defined relative to man, who is treated as the default human, rather than as a subject in her own right." }
        ],
        further: ['Simone de Beauvoir, The Second Sex (1949)', 'Kate Kirkpatrick, Becoming Beauvoir (2019)']
      },
      {
        id: 'phil.arendt', kind: 'thinker', title: 'Hannah Arendt',
        line: "Political thinker of totalitarianism, action and the banality of evil.",
        facets: { branch: ['political', 'ethics'], era: ['contemporary'], tradition: ['western'] },
        life: '1906 to 1975', place: 'Born near Hanover; grew up in Königsberg; lived in New York from 1941',
        body: [
          "Hannah Arendt studied with Heidegger, with whom she had a youthful affair, and with Karl Jaspers. A German Jew, she was briefly arrested by the Gestapo in 1933, fled to France, escaped from an internment camp in 1940 and reached New York in 1941. She was stateless for eighteen years, an experience behind her insistence on 'the right to have rights'.",
          "<em>The Origins of Totalitarianism</em> (1951) traced how antisemitism, imperialism and the lonely, uprooted masses of modern society made Nazi and Stalinist terror possible. <em>The Human Condition</em> (1958) distinguished labour, work and action, and prized action, beginning something new together in public, as the heart of political freedom. Every birth, she wrote, brings the possibility of a new beginning; she called this natality.",
          "Reporting on the trial of Adolf Eichmann in Jerusalem in 1961, she was struck that this organiser of genocide seemed not a monster but a thoughtless careerist speaking in clichés. Her phrase 'the banality of evil' caused fury and is still debated, especially since later research suggests Eichmann was a more committed antisemite than he appeared at trial. Her deeper claim was that great evil can come from a failure to think."
        ],
        links: [
          { to: 'psy.milgram', type: 'links-to', why: "Stanley Milgram wrote that Arendt's idea of the banality of evil came close to what his obedience experiments revealed: ordinary people doing terrible things on instruction." },
          { to: 'phil.heidegger', type: 'responds-to', why: "Arendt learned from Heidegger but turned philosophy outward, from the solitary self toward plurality and shared public life." },
          { to: 'phil.kant', type: 'links-to', why: "In her last years Arendt found in Kant's account of judging beauty a model for political judgement." },
          { to: 'phil.socrates', type: 'links-to', why: "Arendt took Socrates's silent dialogue with himself as the model of thinking, the activity whose absence she saw in Eichmann." }
        ],
        prompts: ["When did you last do something mainly because it was expected, without really thinking about it?"],
        recall: [
          { q: "What did Arendt mean by the banality of evil?", a: "That great evil can be done by ordinary, thoughtless people following routines and clichés, not only by monsters." },
          { q: "What is natality?", a: "Arendt's idea that each birth brings the capacity to begin something new, the root of political action." }
        ],
        further: ['Hannah Arendt, Eichmann in Jerusalem: A Report on the Banality of Evil (1963)', 'Hannah Arendt, The Human Condition (1958)']
      },
      {
        id: 'phil.popper', kind: 'thinker', title: 'Karl Popper',
        line: "Philosopher of falsification and the open society, wary of every claim to certainty.",
        facets: { branch: ['science', 'political', 'epistemology'], era: ['contemporary'], tradition: ['western'] },
        life: '1902 to 1994', place: 'Born in Vienna; taught in Christchurch, New Zealand, and at the London School of Economics',
        body: [
          "Karl Popper grew up in Vienna, was drawn briefly to Marxism as a teenager, and was repelled when he saw how its followers explained away failed predictions. His <em>Logic of Scientific Discovery</em>, published in German in 1934, argued that science advances by conjecture and refutation, not by induction. Of Jewish descent, he left Austria in 1937 for New Zealand, then taught at the London School of Economics from 1946.",
          "During the war he wrote <em>The Open Society and Its Enemies</em> (1945), which he called his war effort. It attacks Plato, Hegel and Marx as enemies of the open society, accusing them of historicism, the belief that history follows laws we can know and should obey. Democracy's virtue, he argued, is not that the majority is always right but that bad rulers can be removed without bloodshed, and policies corrected piece by piece, as experiments.",
          "His fallibilism, the view that all our knowledge is provisional, links his science and his politics: in both, we make progress by exposing our ideas to criticism."
        ],
        links: [
          { to: 'phil.falsification', type: 'influenced', why: "Falsifiability is Popper's criterion for distinguishing science from non science." },
          { to: 'phil.plato', type: 'contrasts', why: "Popper attacked Plato's ideal city, ruled by those who claim to know the Good, as the prototype of the closed society." },
          { to: 'phil.marx', type: 'contrasts', why: "Popper argued that Marxism had turned from a testable theory into an unfalsifiable creed by explaining away its failed predictions." },
          { to: 'phys.copenhagen', type: 'responds-to', why: "Popper criticised the Copenhagen interpretation for bringing the observer's subjectivity into physics, defending a realist reading in terms of propensities." }
        ],
        prompts: ["Which of your opinions have you actually tested by looking for evidence against them?"],
        recall: [
          { q: "What did Popper see as the main virtue of democracy?", a: "That bad rulers can be removed without bloodshed and policies corrected through criticism." }
        ],
        further: ['Karl Popper, The Open Society and Its Enemies (1945)', 'Karl Popper, Unended Quest (1976)']
      },
      {
        id: 'phil.rawls', kind: 'thinker', title: 'John Rawls',
        line: "The most influential political philosopher of the twentieth century, theorist of justice as fairness.",
        facets: { branch: ['political', 'ethics'], era: ['contemporary'], tradition: ['western'] },
        life: '1921 to 2002', place: 'Born in Baltimore; taught at Harvard',
        body: [
          "John Rawls lost two younger brothers in childhood to illnesses they caught from him, served as an infantryman in the Pacific in the Second World War, and lost his Christian faith partly through what he saw and learned there. He spent most of his career at Harvard, a shy and modest man who wrote one of the most discussed books in modern philosophy.",
          "<em>A Theory of Justice</em> (1971) revived political philosophy in English. It imagined people choosing principles for their society behind a veil of ignorance and argued that they would choose equal basic liberties and fair equality of opportunity, with inequalities allowed only if they benefit the least advantaged. Against utilitarianism he insisted on the separateness of persons: one person's loss is not cancelled by another's gain.",
          "In <em>Political Liberalism</em> (1993) he asked how citizens who disagree deeply about religion and morality can still share a just society, answering with the idea of an overlapping consensus on political principles that each can endorse from within their own view."
        ],
        links: [
          { to: 'phil.veil-of-ignorance', type: 'influenced', why: "The veil of ignorance is Rawls's best known idea." },
          { to: 'phil.justice', type: 'influenced', why: "A Theory of Justice set the terms of debate about distributive justice for half a century." },
          { to: 'phil.social-contract', type: 'influenced', why: "Rawls revived the social contract tradition, recasting it as a hypothetical agreement made under fair conditions." }
        ],
        prompts: ["What principle would you want a society to follow if you did not know whether you would be born rich or poor?"],
        recall: [
          { q: "What did Rawls mean by the separateness of persons?", a: "That one person's loss cannot simply be cancelled by another's gain, a key objection to utilitarianism." },
          { q: "What is an overlapping consensus?", a: "Agreement on shared political principles that citizens with different religious and moral views can each endorse for their own reasons." }
        ],
        further: ['John Rawls, A Theory of Justice (1971)', 'Samuel Freeman, Rawls (2007)']
      },
      {
        id: 'phil.nagel', kind: 'thinker', title: 'Thomas Nagel',
        line: "Philosopher of the subjective point of view: what it is like to be a bat, and what death takes from us.",
        facets: { branch: ['mind', 'ethics', 'meaning'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Nagel', respell: 'NAY gul', ipa: 'ˈneɪɡəl' },
        life: 'Born 1937', place: 'Born in Belgrade, Yugoslavia; taught at Princeton and New York University',
        body: [
          "Thomas Nagel was born in Belgrade to a family of German Jewish refugees and grew up in the United States. Few philosophers have done more to keep the big questions in view while writing with such clarity; his short book <em>What Does It All Mean?</em> (1987) remains one of the best introductions to philosophy.",
          "His 1974 paper 'What Is It Like to Be a Bat?' argued that physical science, which describes the world from no particular point of view, may be unable in principle to capture subjective experience, which exists only from a point of view. <em>The View from Nowhere</em> (1986) generalised the theme: we can step back toward ever more objective views, but the subjective cannot simply be dissolved into the objective, whether in knowledge, in ethics or in how we see our own lives.",
          "His essays on death and the absurd, collected in <em>Mortal Questions</em> (1979), are classics. In <em>Mind and Cosmos</em> (2012) he provoked controversy by arguing that the standard materialist picture of nature is almost certainly incomplete because it cannot account for consciousness."
        ],
        links: [
          { to: 'phil.consciousness', type: 'influenced', why: "'What is it like to be a bat?' is one of the most cited papers on consciousness ever written." },
          { to: 'phil.absurd', type: 'influenced', why: "Nagel's essay 'The Absurd' explains absurdity as the clash between living seriously and seeing our lives from outside." },
          { to: 'phil.death', type: 'influenced', why: "His deprivation account is the standard reply to Epicurus's claim that death is nothing to us." }
        ],
        prompts: ["Try to imagine being a bat from the inside. Where exactly does your imagination give out?"],
        recall: [
          { q: "What was Nagel's point about the bat?", a: "That an objective physical description may never capture what an experience is like from the subject's own point of view." }
        ],
        further: ['Thomas Nagel, What Does It All Mean? (1987)', 'Thomas Nagel, Mortal Questions (1979)']
      },
      {
        id: 'phil.parfit', kind: 'thinker', title: 'Derek Parfit',
        line: "Oxford philosopher who argued that personal identity is not what matters, and found that liberating.",
        facets: { branch: ['mind', 'ethics'], era: ['contemporary'], tradition: ['western'] },
        life: '1942 to 2017', place: 'Born in Chengdu, China; worked at All Souls College, Oxford',
        body: [
          "Derek Parfit was born in China to British medical missionary parents and spent almost his entire working life at All Souls College, Oxford, famously absorbed in his work and in photographing the buildings of Venice and St Petersburg. His first book, <em>Reasons and Persons</em> (1984), is widely regarded as one of the most important works of moral philosophy of its century.",
          "Using thought experiments involving teletransporters, divided brains and gradual replacement, he argued that there need be no determinate answer to whether a future person will be me, and that this does not matter. What matters is psychological connectedness and continuity, which can hold in degrees. Accepting this, he reported, changed how he felt: his life had seemed like a glass tunnel, and now its walls disappeared; he cared less about his own death and more about the lives of others.",
          "The same book transformed population ethics, the study of our obligations to future generations. His late work, <em>On What Matters</em> (2011), argued that the best forms of Kantian, consequentialist and contractualist ethics converge, climbing the same mountain on different sides."
        ],
        links: [
          { to: 'phil.personal-identity', type: 'influenced', why: "Parfit's thought experiments reshaped the debate on personal identity and what matters in survival." },
          { to: 'phil.no-self', type: 'links-to', why: "Parfit included Buddhist texts in an appendix to Reasons and Persons, noting that the Buddha had reached a similar view of the self." },
          { to: 'phil.utilitarianism', type: 'links-to', why: "His repugnant conclusion showed that simple total utilitarianism implies a vast population of lives barely worth living could be better than a smaller, flourishing one." }
        ],
        prompts: ["If you cared a little less about whether your future self is strictly 'you', what might you care about more?"],
        recall: [
          { q: "What did Parfit mean by saying identity is not what matters?", a: "That what we should care about is psychological continuity and connectedness, which can hold in degrees, not whether a future person is strictly me." },
          { q: "What is the repugnant conclusion?", a: "The implication of simple total utilitarianism that an enormous population with lives barely worth living could be better than a smaller, flourishing one." }
        ],
        further: ['Derek Parfit, Reasons and Persons (1984)', 'David Edmonds, Parfit: A Philosopher and His Mission to Save Morality (2023)']
      },
      {
        id: 'phil.singer', kind: 'thinker', title: 'Peter Singer',
        line: "Utilitarian philosopher of animal liberation and our duties to the world's poor.",
        facets: { branch: ['ethics'], era: ['contemporary'], tradition: ['western'] },
        life: 'Born 1946', place: 'Born in Melbourne, Australia; taught at Monash and Princeton',
        body: [
          "Peter Singer is probably the most widely read living moral philosopher. His parents fled Vienna after the Nazi annexation in 1938, and three of his grandparents died in the Holocaust. He has taught in Australia, Britain and the United States, and his views have made him both admired and fiercely opposed.",
          "In 'Famine, Affluence, and Morality' (1972) he asked readers to imagine walking past a shallow pond where a child is drowning. You would wade in, even at the cost of ruining your clothes. But distance, he argued, makes no moral difference, so the affluent are obliged to give far more to prevent deaths from poverty than most of us do. The argument helped inspire the effective altruism movement.",
          "<em>Animal Liberation</em> (1975) argued that the capacity to suffer, not species membership, is what gives a being moral standing, and that factory farming inflicts suffering on a vast scale. He called the unjustified privileging of our own species speciesism. His positions on disability and the end of life have drawn sustained protest, and he has debated his critics in public at length."
        ],
        links: [
          { to: 'phil.utilitarianism', type: 'links-to', why: "Singer is the best known living utilitarian, applying the theory directly to poverty, animals and medical ethics." },
          { to: 'phil.justice', type: 'links-to', why: "The drowning child argument asks whether our duties of justice and rescue stop at national borders." },
          { to: 'phil.kant', type: 'contrasts', why: "Kant held that we have no direct duties to animals; Singer argues that their capacity to suffer gives them moral standing." },
          { to: 'phil.meaning', type: 'links-to', why: "In How Are We to Live? Singer argues that an ethical life, aimed beyond oneself, is the surest route to a meaningful one." }
        ],
        prompts: ["How much would you give up to save a stranger's life far away? Is your answer different if the stranger were in front of you?"],
        recall: [
          { q: "What is the drowning child argument?", a: "You would ruin your clothes to save a child drowning in front of you; distance makes no moral difference, so you should give much more to save lives far away." },
          { q: "What is speciesism?", a: "Singer's term for giving the interests of our own species greater weight simply because of species, without moral justification." }
        ],
        further: ['Peter Singer, The Life You Can Save (2009)', 'Peter Singer, Animal Liberation (1975)']
      },
      {
        id: 'phil.nussbaum', kind: 'thinker', title: 'Martha Nussbaum',
        line: "Philosopher of emotions, vulnerability and capabilities, bridging the ancients and public policy.",
        facets: { branch: ['ethics', 'political', 'mind'], era: ['contemporary'], tradition: ['western'] },
        life: 'Born 1947', place: 'Born in New York; teaches at the University of Chicago',
        body: [
          "Martha Nussbaum trained as a classicist and became one of the most wide ranging philosophers of her generation, writing on Greek tragedy, Hellenistic ethics, emotions, law, education, disability, animals and global justice. <em>The Fragility of Goodness</em> (1986) argued that a good human life is exposed to luck in ways philosophers have often tried to deny, and that Greek tragedy understood this better than Plato did.",
          "Her work with the economist Amartya Sen on the capabilities approach asks, of any society, what each person is actually able to do and to be. She defends a list of central capabilities, including life, health, bodily integrity, emotions, practical reason, affiliation, play and control over one's environment, as a basis for basic justice and for development policy.",
          "In <em>Upheavals of Thought</em> (2001) she argued that emotions are not blind surges but evaluative judgements about what matters to us, a view with roots in the Stoics, whom she both admires and criticises for asking us to care less."
        ],
        links: [
          { to: 'phil.justice', type: 'influenced', why: "Nussbaum's capabilities approach is one of the main contemporary theories of justice." },
          { to: 'phil.aristotle', type: 'links-to', why: "Her capabilities approach draws on Aristotle's idea that a good political order enables each person to flourish." },
          { to: 'phil.stoicism', type: 'responds-to', why: "In The Therapy of Desire she treats the Hellenistic schools as forms of therapy while questioning the Stoic aim of uprooting emotion." },
          { to: 'psy.cbt', type: 'links-to', why: "Her view of emotions as judgements about what matters sits close to cognitive therapy's premise that changing appraisals changes feelings." }
        ],
        prompts: ["Think of a recent strong emotion. What judgement about what matters to you was inside it?"],
        recall: [
          { q: "What does the capabilities approach ask?", a: "What each person is actually able to do and be, such as be healthy, educated, safe, and able to play and affiliate." },
          { q: "What is Nussbaum's view of emotions?", a: "Emotions are evaluative judgements about what matters to us, not blind surges of feeling." }
        ],
        further: ['Martha Nussbaum, Creating Capabilities (2011)', 'Martha Nussbaum, The Fragility of Goodness (1986)']
      },
      {
        id: 'phil.murdoch', kind: 'thinker', title: 'Iris Murdoch',
        line: "Novelist and moral philosopher who made attention and love the centre of the moral life.",
        facets: { branch: ['ethics', 'aesthetics'], era: ['contemporary'], tradition: ['western'] },
        life: '1919 to 1999', place: 'Born in Dublin; taught at Oxford',
        body: [
          "Iris Murdoch was an Oxford philosopher and one of the finest English novelists of the century; <em>The Sea, the Sea</em> won the Booker Prize in 1978. With Elizabeth Anscombe, Philippa Foot and Mary Midgley she belonged to a remarkable group of women who reshaped moral philosophy at Oxford after the Second World War.",
          "In <em>The Sovereignty of Good</em> (1970) she argued that philosophy had wrongly pictured morality as a series of choices made by an empty, free will, whether in Sartre's existentialism or in Oxford's linguistic ethics. Most of the moral life happens between choices, in how we see. Her example is a mother in law who, without any outward change, works to see her daughter in law justly and lovingly rather than as vulgar and tiresome.",
          "Borrowing the word from Simone Weil, she called this work attention: a patient, loving gaze directed at a reality outside oneself. Beauty helps. Looking out of a window in an anxious, resentful mood, she sees a kestrel hovering, and suddenly the brooding self has vanished. She called this 'unselfing', and saw in it a return to Plato's idea of the Good."
        ],
        quote: { text: 'Love is the extremely difficult realisation that something other than oneself is real.', source: "Iris Murdoch, 'The Sublime and the Good', Chicago Review (1959)" },
        links: [
          { to: 'phil.virtue-ethics', type: 'influenced', why: "Murdoch's emphasis on vision and inner moral work helped revive character centred ethics." },
          { to: 'phil.existentialism', type: 'contrasts', why: "Murdoch argued that Sartre's empty, choosing will left out the slow work of seeing other people truly." },
          { to: 'phil.plato', type: 'links-to', why: "Murdoch revived Plato's Good as a magnetic ideal that draws us out of selfishness." },
          { to: 'phil.beauty', type: 'links-to', why: "For Murdoch, beauty in nature and art is the easiest occasion for unselfing, training the attention that morality needs." },
          { to: 'psy.self', type: 'links-to', why: "Her idea of unselfing, attention so absorbed in something real that self preoccupation falls away, finds echoes in psychological work on awe and the quieting of the self." }
        ],
        prompts: ["Is there someone you could try, this week, to see more justly and lovingly, without anything outwardly changing?"],
        recall: [
          { q: "What did Murdoch mean by attention?", a: "A patient, just and loving gaze directed at a reality outside oneself, which she took to be the core of the moral life." },
          { q: "What is unselfing?", a: "The falling away of self preoccupation when we attend to something real and beautiful, like her hovering kestrel." }
        ],
        further: ['Iris Murdoch, The Sovereignty of Good (1970)', 'Benjamin J. B. Lipscomb, The Women Are Up to Something (2021)']
      },
      {
        id: 'phil.weil', kind: 'thinker', title: 'Simone Weil',
        line: "Philosopher, activist and mystic who wrote on attention, affliction and the need for roots.",
        facets: { branch: ['ethics', 'religion', 'political'], era: ['contemporary'], tradition: ['western'] },
        say: { text: 'Weil', respell: 'VAY', ipa: 'vɛj' },
        life: '1909 to 1943', place: 'Born in Paris; died in Ashford, Kent, England',
        body: [
          "Simone Weil was a formidable student who placed first in a Sorbonne examination in general philosophy and logic, with Simone de Beauvoir second. She taught philosophy in provincial schools and then, to understand the lives of workers, spent most of a year in 1934 and 1935 doing exhausting factory work, including at Renault. She joined anarchist volunteers briefly in the Spanish Civil War. From a secular Jewish family, she underwent profound mystical experiences that drew her toward Christianity, though she declined baptism.",
          "Her central idea is attention: a patient, receptive waiting, emptied of oneself, which she thought was the substance of prayer and of love of one's neighbour. She wrote that schoolwork is valuable less for what it teaches than for how it trains attention. She also described affliction, a suffering of body, soul and social standing at once, which crushes a person and makes them invisible to others.",
          "She died at thirty four in a sanatorium in Kent, weakened by tuberculosis and by eating too little, reportedly limiting herself to the rations of people in occupied France. Most of her writings, including <em>Gravity and Grace</em> and <em>The Need for Roots</em>, were published after her death."
        ],
        links: [
          { to: 'phil.murdoch', type: 'influenced', why: "Murdoch borrowed the word attention from Weil and built a moral philosophy around it." },
          { to: 'psy.mindfulness', type: 'links-to', why: "Weil's attention, patient and emptied of self, overlaps with mindfulness, though for her its aim was love of God and neighbour rather than calm." },
          { to: 'phil.god-evil', type: 'links-to', why: "Her account of affliction is one of the most searching modern treatments of suffering, written by someone who chose to share it." }
        ],
        prompts: ["Who in your life most needs your full attention, not your advice? What would giving it look like?"],
        recall: [
          { q: "What did Weil mean by attention?", a: "A patient, receptive waiting, emptied of self, which she saw as the substance of prayer and of love of others." },
          { q: "What is affliction, for Weil?", a: "A suffering that crushes body, soul and social standing at once, making a person invisible to others." }
        ],
        further: ['Simone Weil, Gravity and Grace (1947)', 'Simone Weil, The Need for Roots (1949)']
      }
    ],

    modules: [
      /* Construct journeys */
      { id: 'mod.phil.what-can-i-know', title: 'What can I know?', kind: 'construct',
        blurb: "From the definition of knowledge through radical doubt to Kant's settlement between reason and experience.",
        path: ['phil.knowledge', 'phil.scepticism', 'phil.descartes', 'phil.rationalism', 'phil.empiricism', 'phil.hume', 'phil.induction', 'phil.kant'] },
      { id: 'mod.phil.who-am-i', title: 'Who am I?', kind: 'construct',
        blurb: "What keeps you the same person over time, and is there a self at all? Western puzzles meet Indian answers.",
        path: ['phil.personal-identity', 'phil.ship-of-theseus', 'phil.locke', 'phil.no-self', 'phil.buddha', 'phil.brahman-atman', 'phil.parfit'] },
      { id: 'mod.phil.how-should-i-live', title: 'How should I live?', kind: 'construct',
        blurb: "Flourishing, virtue, pleasure, duty, consequences and relationships: the great answers side by side.",
        path: ['phil.good-life', 'phil.socrates', 'phil.virtue-ethics', 'phil.stoicism', 'phil.epicureanism', 'phil.utilitarianism', 'phil.deontology', 'phil.ren-li', 'phil.ubuntu'] },
      { id: 'mod.phil.is-anything-free', title: 'Is anything free?', kind: 'construct',
        blurb: "Causes, determinism and the long argument over whether a caused choice can still be yours.",
        path: ['phil.causation', 'phil.determinism', 'phil.spinoza', 'phil.free-will', 'phil.compatibilism', 'phil.sartre'] },
      { id: 'mod.phil.what-is-real', title: 'What is real?', kind: 'construct',
        blurb: "From the first Greek guesses about the stuff of the world to emptiness, Brahman and the realism debate.",
        path: ['phil.presocratics', 'phil.being', 'phil.forms', 'phil.cave', 'phil.aristotle', 'phil.emptiness', 'phil.brahman-atman', 'phil.realism'] },
      { id: 'mod.phil.good-society', title: 'What is a good society?', kind: 'construct',
        blurb: "Rule by virtue, rule by consent, liberty, class and fairness: how philosophers have imagined a just society.",
        path: ['phil.confucianism', 'phil.social-contract', 'phil.mill', 'phil.marx', 'phil.justice', 'phil.veil-of-ignorance', 'phil.nussbaum', 'phil.ubuntu'] },

      /* Thinker journey */
      { id: 'mod.phil.women-who-changed-the-question', title: 'Five women who changed the question', kind: 'thinker',
        blurb: "Freedom in a situation, the banality of evil, attention, love and capability: twentieth century women who redirected philosophy.",
        path: ['phil.beauvoir', 'phil.weil', 'phil.arendt', 'phil.murdoch', 'phil.nussbaum'] },

      /* Era journeys */
      { id: 'mod.phil.greeks', title: 'The Greeks and Romans', kind: 'era',
        blurb: "From Thales and Heraclitus through Socrates, Plato and Aristotle to the Hellenistic schools that taught people how to live.",
        path: ['phil.presocratics', 'phil.socrates', 'phil.plato', 'phil.aristotle', 'phil.cynicism', 'phil.epicureanism', 'phil.stoicism', 'phil.epictetus', 'phil.marcus-aurelius'] },
      { id: 'mod.phil.axial-china', title: 'Axial Age China', kind: 'era',
        blurb: "The Hundred Schools: Confucians, Mohists and Daoists arguing about how to restore order to a broken world.",
        path: ['phil.confucius', 'phil.ren-li', 'phil.mozi', 'phil.mencius', 'phil.laozi', 'phil.dao', 'phil.zhuangzi', 'phil.confucianism'] },
      { id: 'mod.phil.enlightenment', title: 'The Enlightenment', kind: 'era',
        blurb: "Reason against tradition: the rationalists, the empiricists, the social contract and Kant's attempt to bring it all together.",
        path: ['phil.descartes', 'phil.spinoza', 'phil.leibniz', 'phil.locke', 'phil.social-contract', 'phil.hume', 'phil.kant', 'phil.deontology'] },
      { id: 'mod.phil.after-god', title: 'After God: the nineteenth century', kind: 'era',
        blurb: "History, class, happiness, faith and the death of God: a century searching for foundations.",
        path: ['phil.hegel', 'phil.marx', 'phil.mill', 'phil.utilitarianism', 'phil.kierkegaard', 'phil.nietzsche', 'phil.meaning'] },
      { id: 'mod.phil.twentieth-century', title: 'The twentieth century', kind: 'era',
        blurb: "Phenomenology, language, science and politics after catastrophe: the century that rebuilt philosophy several times.",
        path: ['phil.husserl', 'phil.phenomenology', 'phil.heidegger', 'phil.wittgenstein', 'phil.language-games', 'phil.popper', 'phil.sartre', 'phil.arendt', 'phil.rawls'] },

      /* Tradition journeys */
      { id: 'mod.phil.indian', title: 'Indian philosophy', kind: 'tradition',
        blurb: "The self that is the whole of reality, and the teaching that there is no self at all: two great Indian answers in dialogue.",
        path: ['phil.brahman-atman', 'phil.buddha', 'phil.no-self', 'phil.nagarjuna', 'phil.emptiness', 'phil.shankara'] },
      { id: 'mod.phil.islamic', title: 'The Islamic golden age', kind: 'tradition',
        blurb: "How Aristotle travelled through Baghdad, Bukhara and Cordoba, and how faith and reason argued along the way.",
        path: ['phil.aristotle', 'phil.avicenna', 'phil.ghazali', 'phil.causation', 'phil.averroes', 'phil.aquinas', 'phil.god-evil'] },
      { id: 'mod.phil.japan-africa', title: 'Japanese and African thought', kind: 'tradition',
        blurb: "Zen practice, the Kyoto School, the beauty of passing things, and personhood through other persons.",
        path: ['phil.dogen', 'phil.nishida', 'phil.beauty', 'phil.ubuntu', 'phil.wiredu'] },

      /* Cross domain journey */
      { id: 'mod.phil.quantum', title: 'Philosophy meets quantum physics', kind: 'journey',
        blurb: "Determinism, causation and realism were old philosophical questions until quantum experiments made them urgent again.",
        path: ['phil.determinism', 'phys.randomness', 'phil.causation', 'phys.bell', 'phil.realism', 'phys.measurement-problem', 'phys.copenhagen', 'phys.many-worlds', 'phys.qbism'] }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);

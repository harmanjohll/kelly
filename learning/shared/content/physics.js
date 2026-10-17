/* learning/shared/content/physics.js
   Physics domain, quantum first. Schema: learning/docs/content-schema.md */
(function (g) {
  g.KLS_DATA = g.KLS_DATA || {};
  g.KLS_DATA.physics = {
    domain: {
      id: "physics",
      name: "Physics",
      tagline: "Quantum physics, phenomenon first: what you would see, what it means, and why it still unsettles philosophers.",
      intro: [
        "Welcome to the strangest successful theory ever written. Every card here opens with something you could actually see, a glow, a click, a pattern of dots on a screen, and only then asks what it means. The mathematics sits in a closed drawer at the foot of a card: open it if you are curious, ignore it if you are not. Nothing here depends on it. Where an idea is easier to feel than to read, a simulation lets you fire photons, tilt magnets or play Bell's game yourself.",
        "Quantum physics mixes three kinds of claim, and each card says which it is. Settled means experiment has spoken, often many times. Interpretation means a reading of what the theory says the world is like, where careful physicists still disagree. Open means a live question nobody has answered. Along the way you will meet the people, the arguments, the technology in your pocket, and dashed links into philosophy and psychology, including some honest debunking of popular myths about observers, entanglement and the mind."
      ]
    },
    kinds: [
      { id: "phenomenon", label: "Phenomenon", plural: "Phenomena" },
      { id: "idea", label: "Idea", plural: "Ideas" },
      { id: "experiment", label: "Experiment", plural: "Experiments" },
      { id: "interpretation", label: "Interpretation", plural: "Interpretations" },
      { id: "physicist", label: "Physicist", plural: "Physicists" },
      { id: "technology", label: "Technology", plural: "Technologies" }
    ],
    facets: [
      { id: "strand", label: "Strand", values: [
        { id: "foundations", label: "Foundations", blurb: "The core ideas: quantisation, superposition, measurement, entanglement." },
        { id: "phenomena", label: "Phenomena", blurb: "What you can actually see happen, before any theory." },
        { id: "experiments", label: "Experiments", blurb: "The experiments and thought experiments that forced the ideas on us." },
        { id: "interpretations", label: "Interpretations", blurb: "Competing stories about what the mathematics says the world is like." },
        { id: "people", label: "People", blurb: "The physicists, their arguments and their lives." },
        { id: "technology", label: "Technology", blurb: "Quantum physics at work in things you use every day." }
      ] },
      { id: "era", label: "Era", values: [
        { id: "old-quantum", label: "Old quantum theory, 1900 to 1924", blurb: "Planck, Einstein and Bohr patch classical physics with quanta." },
        { id: "new-quantum", label: "New quantum mechanics, 1925 to 1935", blurb: "Heisenberg, Schrödinger, Born and Dirac build the full theory, and the arguments begin." },
        { id: "long-quiet", label: "The long quiet, 1935 to 1964", blurb: "The theory triumphs in practice while questions about its meaning are set aside." },
        { id: "bell-era", label: "Bell and after, 1964 to 2000", blurb: "Bell makes the foundations testable, and the experiments begin." },
        { id: "quantum-info", label: "Quantum information, 2000 onwards", blurb: "Entanglement becomes a resource for computing, communication and sensing." }
      ] },
      { id: "philosophy", label: "Philosophical stakes", values: [
        { id: "realism", label: "Realism", blurb: "Is there a definite world when no one is measuring it?" },
        { id: "determinism", label: "Determinism", blurb: "Is the future fixed, or is chance built into nature?" },
        { id: "locality", label: "Locality", blurb: "Can what happens here depend on what is done far away?" },
        { id: "observer", label: "The observer", blurb: "What counts as a measurement, and does the observer matter?" },
        { id: "knowledge", label: "Knowledge", blurb: "Does the theory describe the world, or what we can know of it?" },
        { id: "method", label: "Method", blurb: "How science changes, gets tested and gets misused." }
      ] }
    ],
    groupBy: "strand",
    nodes: [

      /* ---------- Phenomena ---------- */

      {
        id: "phys.blackbody", kind: "phenomenon", title: "Blackbody glow", status: "settled",
        line: "Hot things glow red, then orange, then white, and the colours follow one precise curve.",
        facets: { strand: ["phenomena"], era: ["old-quantum"], philosophy: ["method"] },
        people: ["phys.planck"],
        body: [
          "Heat a poker in a fire and it glows dull red, then orange, then yellowish white. A stove ring, a light bulb filament and the Sun all follow the same rule: the hotter the object, the more its light shifts towards blue, and the total glow rises steeply. Physicists call an ideal perfect absorber and emitter a blackbody, and the amount of light it gives off at each colour depends only on its temperature.",
          "By the 1890s careful measurements in Berlin had mapped this curve, and classical physics could not reproduce it. Treating light as continuous waves in thermal balance predicted that a hot object should pour out unlimited energy at short wavelengths, a failure Paul Ehrenfest later nicknamed the ultraviolet catastrophe.",
          "In December 1900 Max Planck found a formula that fitted the data perfectly, then justified it by assuming that matter exchanges energy with light only in lumps of size h f. He was fitting new infrared measurements by Heinrich Rubens and Ferdinand Kurlbaum, not answering the ultraviolet catastrophe, which was only named a decade later. That small assumption was the first thread of quantum theory.",
          "The most perfect blackbody spectrum ever measured is the faint microwave glow left over from the early universe, mapped by the COBE satellite in 1990."
        ],
        maths: [
          "E = h f   (energy is exchanged in lumps: Planck's constant h times frequency f)",
          "h ≈ 6.626 × 10⁻³⁴ J s   (tiny, which is why the lumps go unnoticed in daily life)",
          "λ_peak × T ≈ 2.9 mm K   (Wien's law: double the temperature and the peak wavelength halves)"
        ],
        prompts: ["Planck thought his assumption was a formal trick. When does a trick that works become a description of reality?"],
        recall: [
          { q: "What did Planck assume to get the blackbody curve right?", a: "That matter and light exchange energy only in lumps of size h f." },
          { q: "What happens to a glowing object's colour as it gets hotter?", a: "Its glow shifts from red towards white and blue, and it gives off much more light overall." }
        ],
        links: [
          { to: "phys.quantisation", type: "leads-to", why: "Explaining the glow required the first quantum assumption: energy changes hands in discrete amounts." },
          { to: "phys.photoelectric", type: "leads-to", why: "Einstein took Planck's lumps more seriously than Planck did, and used them to explain how light knocks electrons out of metal." },
          { to: "phys.spectra", type: "contrasts", why: "A blackbody glows at every colour in a smooth curve, while a thin hot gas glows only at sharp lines; quantum theory had to explain both." }
        ]
      },

      {
        id: "phys.photoelectric", kind: "phenomenon", title: "Photoelectric effect", status: "settled", sim: "photoelectric",
        line: "Light knocks electrons out of metal, but only if its colour is right, however bright it is.",
        facets: { strand: ["phenomena"], era: ["old-quantum"], philosophy: ["method"] },
        people: ["phys.einstein"],
        body: [
          "Shine ultraviolet light on clean zinc and electrons fly off its surface. Shine bright red light on it, as bright as you like, and nothing happens. Make the ultraviolet very faint and electrons still emerge at once, just fewer of them. And the energy of each escaping electron depends on the colour of the light, not on its brightness.",
          "Philipp Lenard documented these puzzles in 1902. If light were only a smooth wave, a bright enough beam of any colour should eventually shake electrons loose, and a dim beam should take time to build up enough energy. Neither is what happens.",
          "In 1905 Einstein proposed that light arrives in quanta of energy h f. One quantum hands all its energy to one electron, and if that is less than the energy needed to escape the metal, no amount of brightness helps. Robert Millikan, who doubted the idea, spent years testing Einstein's equation and by 1916 had confirmed it precisely. Einstein's Nobel Prize for 1921 cited this law, not relativity.",
          "A careful footnote: the effect alone does not strictly prove that light is made of photons, because a model with quantised atoms and classical light reproduces much of it. Stronger evidence came from Compton scattering in 1923, and decisive evidence from single photon experiments in the 1970s and 1980s."
        ],
        maths: [
          "E = h f   (energy of one light quantum)",
          "KE_max = h f − φ   (the fastest electron gets the quantum's energy minus φ, the work function needed to escape)",
          "f₀ = φ / h   (below this threshold frequency, no electrons, however bright the light)"
        ],
        prompts: ["Millikan set out to doubt Einstein and ended up confirming him. What does that tell you about how evidence works?"],
        recall: [
          { q: "Why does bright red light fail to free electrons from zinc when faint ultraviolet succeeds?", a: "Each electron absorbs one quantum, and a red quantum carries too little energy, however many arrive." },
          { q: "What did Einstein's Nobel Prize actually cite?", a: "His discovery of the law of the photoelectric effect, not relativity." }
        ],
        links: [
          { to: "phys.photon", type: "leads-to", why: "Einstein's explanation treated light as arriving in quanta, the idea later named the photon." },
          { to: "phys.wave-particle", type: "leads-to", why: "Light that interferes like a wave yet delivers energy in lumps was the first sign of wave particle duality." },
          { to: "phys.semiconductors", type: "leads-to", why: "Solar panels and camera sensors turn light into current using a close cousin of the same effect inside semiconductors." },
          { to: "phil.falsification", type: "links-to", why: "A sceptic tried hard to refute Einstein's bold prediction and failed, the kind of severe test Popper later said science should seek." }
        ]
      },

      {
        id: "phys.spectra", kind: "phenomenon", title: "Atomic spectra", status: "settled", sim: "spectra",
        line: "Each element glows at its own sharp colours, a barcode that quantum theory had to explain.",
        facets: { strand: ["phenomena"], era: ["old-quantum"], philosophy: ["knowledge"] },
        people: ["phys.bohr"],
        body: [
          "Pass the light of a neon sign or a sodium street lamp through a prism and you do not see a rainbow. You see a few bright, sharp lines of colour on darkness. Every element has its own pattern: sodium's pair of yellow lines, hydrogen's red, blue green and violet. Look closely at sunlight and you find the reverse, dark lines where atoms in the Sun's outer layers absorb those same colours.",
          "In 1859 Gustav Kirchhoff and Robert Bunsen showed that these lines are fingerprints of the elements. In 1868 a new yellow line in the Sun's spectrum revealed an element nobody had found on Earth. It was named helium, after the Greek for Sun, and found on Earth only in 1895.",
          "Why lines rather than a smooth spread? In 1885 Johann Balmer found a simple number pattern in hydrogen's lines, but no one knew why it held. Niels Bohr's answer in 1913 was that an atom can only hold certain energies. When it drops from one allowed level to a lower one, it emits a single photon whose energy equals the gap. Discrete levels give discrete colours.",
          "Spectra are how we know what distant stars are made of, which makes this humble phenomenon one of the most powerful tools in science."
        ],
        maths: [
          "E_photon = E_upper − E_lower   (each line is the energy gap between two allowed levels)",
          "E_n ≈ −13.6 eV / n²   (hydrogen's allowed energies, n = 1, 2, 3 ...)",
          "f = E_photon / h   (the gap sets the frequency, and so the colour)"
        ],
        prompts: ["Helium was identified in the Sun before anyone found it on Earth. What does it take to trust knowledge gained only from light?"],
        recall: [
          { q: "Why does a hot gas glow at sharp lines rather than a smooth rainbow?", a: "Its atoms can only hold certain energies, and each line is a photon carrying the gap between two levels." },
          { q: "Which element was discovered in the Sun's spectrum first?", a: "Helium, in 1868." }
        ],
        links: [
          { to: "phys.quantisation", type: "example-of", why: "Sharp lines are the visible signature of an atom that can only hold certain energies." },
          { to: "phys.quantum-leap", type: "leads-to", why: "Bohr explained each line as an electron jumping between levels, the original quantum leap." },
          { to: "phys.laser", type: "leads-to", why: "A laser exploits one chosen transition between atomic levels, so its light has the purity of a single spectral line." }
        ]
      },

      {
        id: "phys.interference", kind: "phenomenon", title: "Interference", status: "settled",
        line: "Overlapping waves can add up or cancel out, painting stripes of bright and dark.",
        facets: { strand: ["phenomena"], era: ["old-quantum"], philosophy: ["realism"] },
        body: [
          "Look at a soap bubble or a film of oil on a wet road and you see swirling bands of colour. Drop two pebbles in a pond and where the ripples cross you find calm patches between the waves. Noise cancelling headphones do it on purpose. All of these are interference: when two waves overlap, crest meeting crest makes a bigger wave, and crest meeting trough makes nothing at all.",
          "In the first years of the nineteenth century Thomas Young passed light through two narrow openings and saw bright and dark bands on a screen, strong evidence that light is a wave. The dark bands are the startling part: adding more light to a spot can make it darker.",
          "Quantum physics keeps interference and makes it stranger. Fringes appear even when light or electrons are sent one at a time, each arriving as a single dot, the dots slowly building the striped pattern. What interferes is not a physical ripple like water but something more abstract, the amplitudes quantum theory uses to calculate probabilities.",
          "Interference is the signature that tells physicists a quantum superposition is intact. When it disappears, something somewhere has recorded which way the system went."
        ],
        maths: [
          "I ∝ |A₁ + A₂|²   (brightness is the square of the summed amplitudes, so they can cancel)",
          "d sin θ = m λ   (bright fringes where the path difference is a whole number of wavelengths)"
        ],
        prompts: ["Adding light to a place can make it darker. Which of your everyday intuitions does that break?"],
        recall: [
          { q: "What happens when the crest of one wave meets the trough of another?", a: "They cancel, giving a dark or calm spot." },
          { q: "What does the loss of interference usually tell a quantum physicist?", a: "That information about which way the system went has been recorded somewhere." }
        ],
        links: [
          { to: "phys.double-slit", type: "leads-to", why: "The double slit with single particles turns ordinary wave interference into the central quantum puzzle." },
          { to: "phys.superposition", type: "links-to", why: "Interference fringes are the experimental fingerprint of a superposition that has not been disturbed." },
          { to: "phys.decoherence", type: "contrasts", why: "Decoherence is what washes interference out when a system leaks information to its surroundings." }
        ]
      },

      {
        id: "phys.polarisation", kind: "phenomenon", title: "Polarised light and the three filter puzzle", status: "settled", sim: "polarisers",
        line: "Two crossed filters block all light; slip a third between them and light gets through again.",
        facets: { strand: ["phenomena"], era: ["new-quantum"], philosophy: ["observer", "realism"] },
        people: ["phys.dirac"],
        body: [
          "Hold two polarising filters, like the lenses of polarised sunglasses, one in front of the other. Turn one until they are at right angles and the view goes black. Now slide a third filter between them, tilted at 45 degrees. Light comes back. Adding a filter, something that can only remove light, has let more through.",
          "For bright light, ordinary wave optics explains this. Each filter passes only the part of the light's vibration that lines up with it, and the middle filter turns the light so the last one has something to pass.",
          "The quantum version is stranger. Send photons one at a time. Each photon either passes a filter or is absorbed; there is no half photon. A photon polarised at 45 degrees to a filter passes with probability one half, and if it passes, it leaves polarised along the filter, its old orientation gone. The middle filter is a measurement, and it changes the state rather than revealing one that was already there.",
          "Paul Dirac used polarised photons in his 1930 textbook to introduce superposition, and polarisation remains the workhorse of Bell tests and quantum cryptography."
        ],
        maths: [
          "I = I₀ cos² θ   (Malus's law: the fraction of light passing a filter at angle θ to its polarisation)",
          "P(pass) = cos² θ   (the same rule read for a single photon, as a probability)",
          "crossed filters with a 45° filter between: ½ × ½ = ¼ of the light leaving the first filter gets through"
        ],
        prompts: ["The middle filter does not reveal a property; it makes one. Can you think of questions in ordinary life that change the person being asked?"],
        recall: [
          { q: "Why does a third filter at 45 degrees let light through two crossed filters?", a: "It resets the polarisation to 45 degrees, so half of that light can pass the last filter." },
          { q: "What happens to a single photon's polarisation after it passes a filter?", a: "It is now polarised along the filter; its previous orientation is gone." }
        ],
        links: [
          { to: "phys.superposition", type: "example-of", why: "A photon polarised at 45 degrees is a superposition of horizontal and vertical, and a filter forces a choice." },
          { to: "phys.collapse", type: "links-to", why: "After passing a filter the photon is polarised along it: the textbook picture of a measurement updating the state." },
          { to: "phys.born-rule", type: "example-of", why: "The cos squared rule for single photons is the Born rule in its simplest form." },
          { to: "phys.quantum-cryptography", type: "leads-to", why: "Because measuring polarisation in the wrong orientation scrambles it, an eavesdropper on polarised photons leaves traces." }
        ]
      },

      {
        id: "phys.tunnelling", kind: "phenomenon", title: "Tunnelling", status: "settled", sim: "tunnelling",
        line: "Particles sometimes turn up beyond barriers they do not have the energy to climb.",
        facets: { strand: ["phenomena"], era: ["new-quantum"], philosophy: ["determinism"] },
        body: [
          "Roll a marble at a hill too high for it and it rolls back, every time. An electron aimed at an energy barrier it cannot climb usually bounces back too, but not always. Some fraction turns up on the other side, as if it had passed through a wall. The thinner and lower the barrier, the more get through, and the chance falls off very steeply as the barrier thickens.",
          "This follows from the wave nature of matter. The wavefunction does not stop dead at a barrier; it shrinks inside it, and if the barrier is thin enough a little survives on the far side. That leftover sets the probability of finding the particle there.",
          "Tunnelling explained alpha decay. In 1928 George Gamow, and independently Ronald Gurney and Edward Condon, showed that alpha particles escape nuclei by tunnelling, which is why half lives range from fractions of a second to billions of years. Tunnelling also lets hydrogen nuclei in the Sun fuse at temperatures that would otherwise be too low. Flash memory, and the scanning tunnelling microscope that images single atoms, depend on it.",
          "The 2025 Nobel Prize in Physics went to John Clarke, Michel Devoret and John Martinis for showing tunnelling in a superconducting electric circuit, a system vastly larger than an atom. How long tunnelling takes is still debated."
        ],
        maths: [
          "T ≈ e^(−2κd)   (the chance of getting through falls exponentially with barrier width d)",
          "κ = √(2m(V − E)) / ħ   (heavier particles and taller barriers make the fall steeper)"
        ],
        prompts: ["The Sun shines partly because of tunnelling. What would you lose if the world were strictly classical?"],
        recall: [
          { q: "Why can a particle appear beyond a barrier it cannot climb?", a: "Its wavefunction leaks through the barrier, leaving a small probability of finding it on the other side." },
          { q: "Which kind of radioactive decay did tunnelling explain in 1928?", a: "Alpha decay." }
        ],
        links: [
          { to: "phys.wavefunction", type: "example-of", why: "Tunnelling happens because the wavefunction leaks into and through a barrier rather than stopping at it." },
          { to: "phys.randomness", type: "links-to", why: "Exactly when a given nucleus tunnels out is unpredictable; only the half life is fixed." },
          { to: "phys.semiconductors", type: "leads-to", why: "Flash memory stores data by tunnelling electrons through thin insulating layers." },
          { to: "phys.superconductivity", type: "links-to", why: "Electron pairs tunnelling across thin junctions between superconductors are the heart of many qubits." }
        ]
      },

      {
        id: "phys.zero-point", kind: "phenomenon", title: "Zero point energy", status: "settled",
        line: "Even at absolute zero nothing is perfectly still, which is why helium refuses to freeze.",
        facets: { strand: ["phenomena"], era: ["new-quantum"], philosophy: ["method"] },
        body: [
          "Cool helium towards absolute zero at ordinary pressure and it never freezes. Every other substance turns solid; helium stays liquid unless squeezed to about 25 times atmospheric pressure. Its atoms keep a motion that no amount of cooling can remove.",
          "That leftover motion is zero point energy. In quantum theory a confined particle cannot sit perfectly still at the bottom of its trap, because a precise position together with a precisely zero momentum would break the uncertainty relation. Its lowest possible energy, the ground state, sits above zero. Helium atoms are light and attract each other only weakly, so their zero point jiggle is enough to stop them locking into a crystal.",
          "Fields have zero point energy too, which is why physicists say empty space is never quite empty. The Casimir effect, a tiny attraction between two metal plates held very close together, is often cited as evidence, though it can also be derived without invoking vacuum energy at all.",
          "Zero point energy is the lowest energy a system can have, so by definition nothing more can be extracted from it. Products promising free energy from the quantum vacuum misunderstand this."
        ],
        maths: [
          "E₀ = ½ ħ ω   (the lowest energy of a quantum oscillator: not zero)",
          "Δx Δp ≥ ħ/2   (why: perfect stillness in a precise place is forbidden)"
        ],
        prompts: ["Why might the phrase energy of the vacuum be so attractive to people selling things?"],
        recall: [
          { q: "Why does helium stay liquid near absolute zero at normal pressure?", a: "Its light, weakly bound atoms keep enough zero point motion to stop them forming a solid." },
          { q: "Can zero point energy be tapped as a power source?", a: "No. It is the lowest energy a system can have, so nothing further can be extracted." }
        ],
        links: [
          { to: "phys.uncertainty", type: "example-of", why: "Zero point energy is the uncertainty principle made visible: a trapped particle cannot be both still and in one place." },
          { to: "phys.quantum-field", type: "links-to", why: "Every quantum field has its own zero point jiggle, so even the vacuum fluctuates." },
          { to: "phys.quantisation", type: "links-to", why: "In a box or trap the lowest allowed level sits above zero, so quantised levels and zero point energy come together." },
          { to: "phys.quantum-mysticism", type: "links-to", why: "Free energy from the vacuum is a staple of quantum flavoured marketing, built on a misunderstanding of what a ground state is." }
        ]
      },

      {
        id: "phys.superconductivity", kind: "phenomenon", title: "Superconductivity", status: "settled",
        line: "Below a critical temperature some materials carry current with no resistance and push out magnetic fields.",
        facets: { strand: ["phenomena"], era: ["old-quantum", "long-quiet"] },
        body: [
          "Cool mercury to about four degrees above absolute zero and its electrical resistance does not just fall; it vanishes. A current set running in a superconducting loop has been watched flowing for years with no battery. Place a small magnet above a cooled superconductor and it can float, because the superconductor pushes magnetic fields out of itself.",
          "Heike Kamerlingh Onnes discovered the effect in Leiden in 1911, and for nearly half a century nobody could explain it. In 1957 John Bardeen, Leon Cooper and Robert Schrieffer showed that electrons pair up through tiny vibrations of the crystal, and the pairs fall together into one shared quantum state. A single wavefunction spans the whole piece of metal, so the material behaves as one coherent quantum object you can hold in your hand.",
          "Superconductivity is quantum physics at human scale. It powers the strong magnets in MRI scanners and particle accelerators, and superconducting circuits are among the leading designs for qubits. Materials that superconduct at much warmer temperatures were found from 1986 onwards. A superconductor that works at room temperature and ordinary pressure remains an open goal, and several recent claims have failed to hold up."
        ],
        maths: [
          "R = 0 below T_c   (resistance vanishes below the critical temperature)",
          "Φ = n h / 2e   (magnetic flux through a superconducting ring comes in steps; the 2e reveals electrons travelling in pairs)"
        ],
        prompts: ["A quantum state you can hold in your hand: does that change how weird quantum physics feels to you?"],
        recall: [
          { q: "What explains superconductivity in ordinary metals?", a: "Electrons form pairs that share one quantum state across the whole material (the BCS theory of 1957)." },
          { q: "Name one everyday use of superconductors.", a: "The strong magnets in MRI scanners." }
        ],
        links: [
          { to: "phys.pauli-exclusion", type: "contrasts", why: "Single electrons cannot share a state, but paired electrons behave like bosons and can all crowd into one, which makes superconductivity possible." },
          { to: "phys.mri", type: "leads-to", why: "MRI scanners use superconducting coils to make their strong, steady magnetic fields." },
          { to: "phys.quantum-computing", type: "leads-to", why: "Superconducting circuits are among the leading ways to build qubits." },
          { to: "phys.wavefunction", type: "example-of", why: "A superconductor is described by one wavefunction spread across a whole piece of metal." }
        ]
      },

      /* ---------- Ideas ---------- */

      {
        id: "phys.quantisation", kind: "idea", title: "Quantisation", status: "settled", sim: "box",
        line: "Confined systems can only take certain energies, like a guitar string that plays only certain notes.",
        facets: { strand: ["foundations"], era: ["old-quantum", "new-quantum"] },
        people: ["phys.planck", "phys.bohr"],
        body: [
          "Pluck a guitar string and it sounds a note and its overtones, never anything in between, because only waves that fit a whole number of half wavelengths between the fixed ends can last. Quantum physics finds the same rule inside atoms. A bound electron can only have certain energies, and nothing between them.",
          "This is quantisation, and it was the first quantum idea. Planck needed it to explain blackbody glow in 1900, and Bohr used it in 1913 to explain sharp spectral lines and why atoms do not collapse. Only after de Broglie and Schrödinger did the reason become clear: if matter behaves as a wave, confining it in an atom or a box allows only standing wave patterns, and each pattern has its own energy.",
          "The particle in a box simulation shows this directly. The allowed energies climb in steps of 1, 4, 9 and 16 times the lowest. Put the particle in a superposition of two levels and it sloshes back and forth in time, which is how quantum states move at all.",
          "Not everything is quantised: a free electron flying through space can have any energy. Confinement creates the steps, and they are large for small, light things and imperceptibly fine for cars and cricket balls."
        ],
        maths: [
          "E_n = n² h² / (8 m L²)   (the energies allowed in a box of width L; n = 1, 2, 3 ...)",
          "L = n λ / 2   (only whole numbers of half wavelengths fit)",
          "smaller box or lighter particle → bigger steps"
        ],
        prompts: ["Why might confinement, rather than smallness alone, be the real source of the quantum steps?"],
        recall: [
          { q: "Why can an electron in an atom have only certain energies?", a: "Because, as a confined wave, only certain standing wave patterns fit, and each has its own energy." },
          { q: "Is every quantity quantised in quantum physics?", a: "No. A free particle can have any energy; quantisation comes from confinement." }
        ],
        links: [
          { to: "phys.wavefunction", type: "links-to", why: "Quantised energies are the standing wave patterns a confined wavefunction is allowed to form." },
          { to: "phys.pauli-exclusion", type: "leads-to", why: "Discrete levels, filled one electron per state, give atoms their shells and chemistry its periodic table." },
          { to: "phys.quantum-leap", type: "leads-to", why: "If only certain energies are allowed, changing energy means jumping between them." }
        ]
      },

      {
        id: "phys.photon", kind: "idea", title: "The photon", status: "settled",
        line: "Light comes in indivisible packets, each carrying an energy set by its colour.",
        facets: { strand: ["foundations"], era: ["old-quantum", "new-quantum"], philosophy: ["realism"] },
        people: ["phys.einstein"],
        body: [
          "Turn a light down far enough and a sensitive detector stops registering a dim, smooth glow. It starts clicking: separate, indivisible arrivals, each delivering the same energy for a given colour. These clicks are photons.",
          "Einstein proposed light quanta in 1905, and most physicists, Planck and Bohr included, resisted the idea for nearly twenty years. Arthur Compton's 1923 experiment, in which X rays bounced off electrons like colliding particles and lost energy in exactly the predicted way, changed minds. The word photon was coined in 1926 by the chemist Gilbert Lewis for a theory of his own that did not survive; the word did.",
          "A photon is not a tiny glowing marble. It has no mass, travels at the speed of light, and carries energy and momentum. In modern physics it is an excitation of the electromagnetic field: it interferes like a wave as it travels and is absorbed whole, at one place.",
          "The cleanest proof came from experiments in the 1970s and 1980s showing that a single photon meeting a beam splitter is detected on one side or the other, never both. A classical wave would split."
        ],
        maths: [
          "E = h f   (energy of one photon)",
          "p = h / λ   (momentum of one photon, which is why light can push)"
        ],
        prompts: ["Einstein's light quanta took almost twenty years to be accepted. What kind of evidence finally changes a field's mind?"],
        recall: [
          { q: "What experiment of 1923 persuaded many physicists that photons are real?", a: "Compton scattering of X rays off electrons." },
          { q: "What does a single photon do at a beam splitter?", a: "It is detected on one side or the other, never both." }
        ],
        links: [
          { to: "phys.wave-particle", type: "part-of", why: "The photon is the particle face of light, which also interferes like a wave." },
          { to: "phys.quantum-field", type: "part-of", why: "In modern physics a photon is a quantum of excitation of the electromagnetic field." },
          { to: "phys.laser", type: "leads-to", why: "A laser is a vast number of photons sharing one state, possible only because photons are bosons." }
        ]
      },

      {
        id: "phys.wave-particle", kind: "idea", title: "Wave particle duality", status: "settled",
        line: "Light and matter spread like waves and arrive like particles; neither picture alone works.",
        facets: { strand: ["foundations"], era: ["old-quantum", "new-quantum"], philosophy: ["realism", "knowledge"] },
        people: ["phys.de-broglie", "phys.einstein"],
        body: [
          "Send electrons one at a time towards two slits. Each lands on the screen as a single dot, like a particle. But after thousands have arrived, the dots form bands of interference that only waves can make. The same is true of photons, of atoms and of molecules made of thousands of atoms.",
          "Einstein suggested in 1905 that light, long known as a wave, also behaves as particles. In 1924 Louis de Broglie reversed the idea: electrons, known as particles, should also have a wavelength. Electron diffraction confirmed this within three years.",
          "The phrase wave particle duality is a useful label but a misleading picture. A quantum object is not sometimes a wave and sometimes a particle, switching when you look. It is one kind of thing, described by the quantum state, whose behaviour has wave like features, spreading and interfering, and particle like features, arriving whole at one place. Our everyday words were built for marbles and ripples; electrons are neither.",
          "Bohr made this tension the centre of his principle of complementarity, and quantum field theory later offered a single framework in which both faces appear."
        ],
        maths: [
          "λ = h / p   (de Broglie: anything with momentum p has a wavelength)",
          "E = h f   (Einstein: light of frequency f comes in quanta of energy h f)",
          "a cricket ball at 40 m/s: λ ≈ 10⁻³⁴ m, far too small ever to notice"
        ],
        prompts: ["If an electron is neither a wave nor a particle, what is it? Is that a question physics can answer?"],
        recall: [
          { q: "What did de Broglie propose in 1924?", a: "That particles such as electrons have a wavelength, λ = h / p." },
          { q: "Why is wave particle duality a misleading picture?", a: "Quantum objects do not switch between being waves and particles; they are one kind of thing with both wave like and particle like behaviour." }
        ],
        links: [
          { to: "phys.complementarity", type: "leads-to", why: "Bohr turned the clash between wave and particle pictures into a general principle about mutually exclusive descriptions." },
          { to: "phys.interference", type: "links-to", why: "Interference is the wave side of the duality, seen even with particles sent one at a time." },
          { to: "phil.realism", type: "links-to", why: "If neither wave nor particle is what an electron really is, a realist owes us an account of what it is; the answer depends on the interpretation." }
        ]
      },

      {
        id: "phys.wavefunction", kind: "idea", title: "The wavefunction and quantum state", status: "settled",
        line: "The mathematical object that encodes everything quantum theory can predict about a system.",
        facets: { strand: ["foundations"], era: ["new-quantum"], philosophy: ["realism", "knowledge"] },
        people: ["phys.schrodinger", "phys.born"],
        body: [
          "You never see a wavefunction. What you see are the results it predicts: the pattern of dots on a screen, the clicks of a detector, the colours of a spectrum. The wavefunction, written ψ (psi), is the quantity physicists calculate to get those predictions, and it has been astonishingly reliable for a century.",
          "Erwin Schrödinger wrote down the equation for how it changes in 1926. Left alone, it evolves smoothly and deterministically, spreading and interfering like a wave. Max Born then proposed that its squared size at a place gives the probability of finding the particle there. More generally physicists speak of the quantum state, which also covers spin, polarisation and many particles at once.",
          "What the wavefunction actually is remains one of the deepest questions in the subject. For two particles it is not a wave in ordinary space but in a six dimensional space of possible arrangements, and for a lump of matter in a space of astronomically many dimensions. Is it a real physical thing, as many worlds and pilot wave theories hold? Or a summary of knowledge, or an agent's expectations, as QBism says? A 2012 theorem by Matthew Pusey, Jonathan Barrett and Terry Rudolph made purely knowledge based readings harder to hold, under certain assumptions, but did not settle the matter."
        ],
        maths: [
          "iħ ∂ψ/∂t = Ĥ ψ   (the Schrödinger equation: how the state changes when nobody measures)",
          "P(x) = |ψ(x)|²   (the Born rule: the chance of finding the particle near x)"
        ],
        prompts: ["Can something be real if it lives in a space of more dimensions than the one you walk around in?"],
        recall: [
          { q: "Who wrote the equation for how the wavefunction changes, and when?", a: "Erwin Schrödinger, in 1926." },
          { q: "Why is it hard to think of the wavefunction as an ordinary wave?", a: "For several particles it lives in a high dimensional space of possible arrangements, not in ordinary three dimensional space." }
        ],
        links: [
          { to: "phys.superposition", type: "links-to", why: "Because the Schrödinger equation is linear, any two allowed wavefunctions can be added, which is what a superposition is." },
          { to: "phys.born-rule", type: "leads-to", why: "The Born rule is the bridge from the wavefunction to what you actually observe." },
          { to: "phys.measurement-problem", type: "leads-to", why: "The wavefunction evolves smoothly and never picks one outcome, yet experiments always show one; that mismatch is the measurement problem." },
          { to: "phil.realism", type: "links-to", why: "Whether the wavefunction is a real thing or a bookkeeping device is the sharpest form of the realism debate in physics." }
        ]
      },

      {
        id: "phys.superposition", kind: "idea", title: "Superposition", status: "settled",
        line: "A quantum system can be in a combination of states, not secretly in one we have yet to find.",
        facets: { strand: ["foundations"], era: ["new-quantum"], philosophy: ["realism", "observer"] },
        body: [
          "Send a photon into a beam splitter with a detector on each side, and half the time one clicks, half the time the other. You might conclude that it took one path or the other. But bring the two paths back together instead and the photon shows interference, which needs both paths to have contributed. Its state was a superposition of the two.",
          "Superposition means that if A and B are possible states, so is a weighted combination of A and B. It is not the same as being in A or B without our knowing which; interference experiments tell those cases apart sharply. Nor is it quite being in A and B at once in any everyday sense. It is a third thing our language has no word for.",
          "Superposition has been shown with photons, electrons, atoms, large molecules and superconducting loops carrying currents made of billions of electrons. The weights, squared, give the odds of each result when the system is measured.",
          "Why we never see a superposed chair is largely explained by decoherence. Whether superposition is the whole story, or something breaks it, is the measurement problem."
        ],
        maths: [
          "|ψ⟩ = α|0⟩ + β|1⟩   (a state built from two basic states with weights α and β)",
          "|α|² + |β|² = 1   (the squared weights are probabilities and must add to one)"
        ],
        prompts: ["Try to say what a superposition is without using the words both or either. What do you end up reaching for?"],
        recall: [
          { q: "How do experiments show that superposition is not just ignorance of which state a system is in?", a: "Recombining the possibilities produces interference, which ignorance alone could not." },
          { q: "What do the squared weights of a superposition give?", a: "The probabilities of each outcome when measured." }
        ],
        links: [
          { to: "phys.schrodinger-cat", type: "leads-to", why: "Schrödinger asked what happens when a superposition spreads up to a cat, to show how strange the rule becomes at our scale." },
          { to: "phys.decoherence", type: "links-to", why: "Decoherence explains why superpositions of large objects become invisible almost instantly." },
          { to: "phys.quantum-computing", type: "leads-to", why: "A qubit is a two level system kept in superposition long enough to compute with." },
          { to: "phil.realism", type: "links-to", why: "If a superposed system has no single definite value, what is real before measurement is exactly what realists and their critics dispute." }
        ]
      },

      {
        id: "phys.born-rule", kind: "idea", title: "Probability and the Born rule", status: "settled", sim: "measurement",
        line: "Quantum theory predicts odds, not outcomes: square the amplitude to get the probability.",
        facets: { strand: ["foundations"], era: ["new-quantum"], philosophy: ["determinism", "knowledge"] },
        people: ["phys.born"],
        body: [
          "Prepare a thousand identical qubits in the same superposition and measure each one. You do not get the same answer each time. You get a scatter of 0s and 1s whose proportions match a prediction to within ordinary statistical wobble. The measurement simulation lets you watch this: each result is unpredictable, the pattern is not.",
          "Max Born proposed the rule in 1926, in a paper on collisions, adding a footnote at the proof stage to say that the probability goes with the square of the wavefunction. He received the Nobel Prize for it in 1954.",
          "The rule says: take the amplitude for an outcome, square its size, and that is the probability. Squaring is what lets interference into a theory of chance. Amplitudes can be negative or complex and cancel one another before squaring, which ordinary probabilities can never do.",
          "Every experiment so far obeys the Born rule. Why it holds is less clear. In standard quantum mechanics it is simply a postulate. Many worlds theorists have tried to derive it from decision theory, and pilot wave theorists from a kind of statistical equilibrium; both attempts are still debated."
        ],
        maths: [
          "P = |ψ|²   (probability is the squared size of the amplitude)",
          "P(0) = |α|², P(1) = |β|²   (for a qubit α|0⟩ + β|1⟩)",
          "amplitudes add, then square: |a + b|² can be smaller than |a|² + |b|²"
        ],
        prompts: ["A rule that predicts patterns perfectly but individual events not at all: is that a complete theory?"],
        recall: [
          { q: "State the Born rule in words.", a: "The probability of an outcome is the squared size of its amplitude." },
          { q: "Why does squaring amplitudes allow interference?", a: "Amplitudes can cancel before they are squared, which ordinary probabilities cannot." }
        ],
        links: [
          { to: "phys.randomness", type: "leads-to", why: "The Born rule gives only probabilities, which is why single quantum events look genuinely random." },
          { to: "phys.interference", type: "links-to", why: "Because amplitudes are added before squaring, they can cancel, which is how interference fits into a rule about probability." },
          { to: "phys.many-worlds", type: "links-to", why: "If every outcome happens, what does a probability of one third mean? Deriving the Born rule is a central challenge for many worlds." }
        ]
      },

      {
        id: "phys.uncertainty", kind: "idea", title: "The uncertainty principle", status: "settled", sim: "uncertainty",
        line: "Nothing has both a sharp position and a sharp momentum, and this is not about clumsy measurement.",
        facets: { strand: ["foundations"], era: ["new-quantum"], philosophy: ["determinism", "knowledge"] },
        people: ["phys.heisenberg"],
        body: [
          "Squeeze a wave into a short pulse and you need many wavelengths mixed together to build it. Make it a single pure wavelength and it stretches on and on. Musicians know a version of this: a very short click has no clear pitch. In the uncertainty simulation you can narrow a wave packet and watch its spread of momenta widen.",
          "Because a particle's momentum is tied to its wavelength, the same trade off applies to matter. Werner Heisenberg announced it in 1927, and Earle Kennard proved the precise form that same year: the spread in position times the spread in momentum can never fall below ħ/2.",
          "A common misreading is that measuring disturbs the particle, so we cannot learn both values. Heisenberg himself argued partly this way, with a thought experiment about a microscope, and Bohr corrected him. The principle is about the states themselves: no quantum state has both a sharp position and a sharp momentum, however gentle or clever the measurement. Experiments since 2012 have even shown that Heisenberg's original disturbance version can be beaten, while Kennard's form stands.",
          "Heisenberg drew a sweeping conclusion, that quantum mechanics had shown the law of causality to fail. Whether uncertainty limits reality or only prediction is still argued; pilot wave theory keeps definite positions that are simply hidden from us."
        ],
        maths: [
          "Δx Δp ≥ ħ/2   (Kennard 1927: spread in position times spread in momentum)",
          "ħ = h / 2π ≈ 1.05 × 10⁻³⁴ J s   (so the limit only bites at atomic scales)",
          "narrow packet ↔ wide range of wavelengths   (the same mathematics as a short sound having no clear pitch)"
        ],
        prompts: ["Is a limit on what can be known the same as a limit on what there is? What would settle the difference?"],
        recall: [
          { q: "Is the uncertainty principle about measurement disturbing a particle?", a: "No. It says no quantum state has both sharp position and sharp momentum, however the measurement is done." },
          { q: "What everyday wave fact mirrors the principle?", a: "A very short sound has no clear pitch: a short pulse needs many wavelengths." }
        ],
        links: [
          { to: "phys.complementarity", type: "links-to", why: "Bohr saw the uncertainty relation as a precise case of complementarity: position and momentum pictures cannot both be sharpened." },
          { to: "phys.wave-particle", type: "links-to", why: "The trade off comes straight from treating particles as waves: a wave cannot be both short and pure." },
          { to: "phil.determinism", type: "contrasts", why: "If a particle never has both a sharp position and momentum, the classical dream of predicting everything from exact starting conditions cannot even begin." },
          { to: "phil.knowledge", type: "links-to", why: "The principle forces a choice between saying some things cannot be known and saying there is nothing more there to know." }
        ]
      },

      {
        id: "phys.spin", kind: "idea", title: "Spin", status: "settled",
        line: "An intrinsic quantum angular momentum that, measured along any direction, gives only up or down.",
        facets: { strand: ["foundations"], era: ["old-quantum", "new-quantum"], philosophy: ["realism"] },
        people: ["phys.pauli", "phys.dirac"],
        body: [
          "Fire silver atoms through a lopsided magnetic field and they do not smear into a band, as little spinning tops with random orientations would. They split cleanly into two spots, up and down. Turn the magnet any way you like and you still get exactly two. That property, carried by electrons, protons and neutrons, is spin.",
          "In 1925 two young Dutch physicists, George Uhlenbeck and Samuel Goudsmit, proposed that the electron has its own built in angular momentum. Pictured literally as a spinning ball, the electron's surface would have to move faster than light, so spin is not literal rotation. It is an intrinsic quantum property with no classical twin, and Dirac's 1928 equation for the electron produced it naturally.",
          "Spin has strange features. Measuring it along one axis destroys any definite value along a perpendicular axis. Rotating an electron through a full 360 degrees flips the sign of its state, so it takes 720 degrees to return to where it started, something confirmed with neutrons in 1975.",
          "Spin is not exotic. With the exclusion principle it organises the periodic table, it is why some materials are magnetic, and it is the property MRI scanners read in the hydrogen nuclei of your body."
        ],
        maths: [
          "S_z = ±ħ/2   (an electron's spin along any axis: only two values)",
          "P(up along a new axis) = cos²(θ/2)   (θ is the angle between the old and new axes)",
          "360° rotation: ψ → −ψ; it takes 720° to return"
        ],
        prompts: ["Spin is called angular momentum but nothing is spinning. When is it fine for science to keep an old word for a new thing?"],
        recall: [
          { q: "How many results can you get measuring an electron's spin along any axis?", a: "Two: up or down." },
          { q: "Why is spin not literal rotation?", a: "A spinning electron's surface would have to move faster than light; spin is an intrinsic quantum property." }
        ],
        links: [
          { to: "phys.pauli-exclusion", type: "leads-to", why: "Two spin states per level is why electrons pair up in atomic orbitals and fill shells two at a time." },
          { to: "phys.mri", type: "leads-to", why: "MRI works by flipping and listening to the spins of hydrogen nuclei in water and fat." },
          { to: "phys.superposition", type: "example-of", why: "An electron with spin up along one axis is a superposition of up and down along a perpendicular axis." },
          { to: "phys.bell", type: "leads-to", why: "Pairs of particles with linked spins are the textbook setting for Bell's theorem." }
        ]
      },

      {
        id: "phys.collapse", kind: "idea", title: "Measurement and collapse", status: "interpretation",
        line: "The textbook rule: on measurement, the state jumps to match the result you got.",
        facets: { strand: ["foundations"], era: ["new-quantum"], philosophy: ["observer", "realism"] },
        body: [
          "Measure a qubit and get 1, then measure it again straight away the same way, and you get 1 again, every time. Whatever the state was before, it now matches the result. The Stern Gerlach and polariser simulations show this: a second measurement along the same direction always agrees with the first.",
          "Textbooks capture this with a rule: when you measure, the state collapses onto the outcome you observed. John von Neumann set out the structure in 1932. Quantum mechanics, as he presented it, has two kinds of change: smooth, deterministic evolution under the Schrödinger equation when nobody measures, and a sudden, probabilistic jump when someone does.",
          "As a recipe, this works perfectly. As a description of nature, it is troubling. Measuring devices are made of atoms that obey the smooth equation, so where exactly does the jump happen, and what triggers it? The rule does not say.",
          "Interpretations read collapse differently: as a real physical process (objective collapse theories), as an agent updating her expectations (QBism), as an appearance produced by branching (many worlds), or as unnecessary because particles always had positions (pilot wave). The rule is settled practice; what, if anything, physically happens is the open part."
        ],
        maths: [
          "before: α|0⟩ + β|1⟩   after seeing 0: |0⟩   (this happens with probability |α|²)",
          "repeat the same measurement at once: the same answer, every time"
        ],
        prompts: ["Is collapse something that happens to the world, or to your description of it? What would count as evidence either way?"],
        recall: [
          { q: "What are the two kinds of change in textbook quantum mechanics?", a: "Smooth, deterministic evolution when unmeasured, and sudden probabilistic collapse on measurement." },
          { q: "What question does the collapse rule leave unanswered?", a: "What physically counts as a measurement, and when the jump happens." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "leads-to", why: "Two incompatible rules for change, with no account of when each applies, is the measurement problem." },
          { to: "phys.born-rule", type: "links-to", why: "The Born rule says which outcome the collapse lands on, and with what probability." },
          { to: "phys.copenhagen", type: "links-to", why: "In Copenhagen style teaching, collapse is accepted as part of how measurement works, without asking what drives it." }
        ]
      },

      {
        id: "phys.measurement-problem", kind: "idea", title: "The measurement problem", status: "open",
        line: "Why does an experiment have one outcome when the theory's equations describe all of them?",
        facets: { strand: ["foundations", "interpretations"], era: ["new-quantum", "long-quiet"], philosophy: ["observer", "realism"] },
        body: [
          "Every quantum experiment ends with a definite result: this detector clicked, the dot landed here, the counter reads 7. Yet the Schrödinger equation, applied to the whole setup including the detector, does not produce one result. It produces a superposition of the detector showing every possible outcome.",
          "That is the measurement problem. Quantum theory as usually taught has two rules for change, smooth evolution and sudden collapse, and no physical account of which applies when. A measurement is supposed to trigger collapse, but measurement is never defined within the theory. John Bell, who pressed the point hardest, argued in 1990 that words like measurement and observer should have no place in the formulation of a fundamental theory.",
          "The philosopher Tim Maudlin set out the options sharply in 1995. Either the wavefunction is not the complete description, so add something, as pilot wave theory adds positions. Or it does not always obey the Schrödinger equation, so add real collapse, as GRW does. Or measurements do not have single outcomes, so accept branching, as many worlds does. Every interpretation picks one.",
          "Decoherence explains why we never see interference between big outcomes, but on its own it does not explain why one outcome is real. A century on there is no consensus. This is where physics and philosophy are most clearly the same subject."
        ],
        maths: [
          "(detector ready) ⊗ (α|0⟩ + β|1⟩) → α|detector shows 0⟩ + β|detector shows 1⟩   (the equation gives both)"
        ],
        prompts: ["Of Maudlin's three options, add something, change the equation, or accept every outcome, which costs you least? Why?"],
        recall: [
          { q: "State the measurement problem in one sentence.", a: "The Schrödinger equation predicts a superposition of all outcomes, yet every experiment shows exactly one." },
          { q: "Does decoherence solve the measurement problem by itself?", a: "No. It explains why outcomes stop interfering, not why only one occurs." }
        ],
        links: [
          { to: "phys.observer", type: "links-to", why: "The problem is often stated in terms of observers, which invites the mistaken idea that minds must be involved." },
          { to: "phil.realism", type: "links-to", why: "Whether there are definite facts before and apart from measurement is the realism question in its sharpest scientific form." },
          { to: "phil.knowledge", type: "links-to", why: "Some solutions recast the quantum state as knowledge or belief, turning a puzzle about the world into one about knowers." }
        ]
      },

      {
        id: "phys.observer", kind: "idea", title: "The observer", status: "interpretation",
        line: "In quantum physics an observer is any system that records information, not necessarily a mind.",
        facets: { strand: ["foundations"], era: ["new-quantum", "quantum-info"], philosophy: ["observer"] },
        body: [
          "Put a detector at one slit of a double slit experiment and the interference pattern disappears, whether or not anyone ever reads the detector. A stray air molecule bouncing off the particle does the same. What matters is that information about the path now exists somewhere in the physical world. That part is settled experimental fact.",
          "This is why physicists use observer and measurement in a technical sense: an interaction that leaves a record. Popular accounts that say a conscious observer changes reality by looking have taken literally a word that was never meant that way. Even Bohr, who stressed the role of the experimental arrangement, meant the apparatus, not the experimenter's mind.",
          "Still, the question of the observer is not empty, and here interpretations part company. QBism makes the agent who uses the theory central. Relational quantum mechanics says any physical system can be an observer. A small minority, following Wigner, once held that consciousness itself causes collapse. The thought experiment of Wigner's friend sharpens the question of whose description is right.",
          "The observer effect in psychology, where people behave differently when they know they are watched, shares a name and almost nothing else. It is a social effect on minds, not a physical effect on quantum states."
        ],
        prompts: ["If a stray air molecule can be an observer, what work is the word observer still doing?"],
        recall: [
          { q: "Does destroying interference require a conscious observer?", a: "No. Any physical record of which path was taken, even an unread detector or a stray molecule, is enough." },
          { q: "What does observer mean in the technical quantum sense?", a: "Any system that interacts with another and records information about it." }
        ],
        links: [
          { to: "psy.hawthorne", type: "contrasts", why: "People changing their behaviour because they know they are studied is sometimes called an observer effect, but the analogy with quantum measurement is loose and often misused." },
          { to: "psy.consciousness", type: "contrasts", why: "Experiments show that recording information, not conscious awareness, is what removes interference." },
          { to: "phys.wigners-friend", type: "leads-to", why: "Wigner's friend asks what happens when one observer is described by another as part of a quantum system." },
          { to: "phys.decoherence", type: "links-to", why: "Decoherence is the physics of how any environment, from a detector to a stray photon, acts as an observer." }
        ]
      },

      {
        id: "phys.entanglement", kind: "idea", title: "Entanglement", status: "settled",
        line: "Two particles can share one quantum state, so results on each are correlated at any distance.",
        facets: { strand: ["foundations"], era: ["new-quantum", "bell-era"], philosophy: ["locality", "realism"] },
        people: ["phys.schrodinger", "phys.einstein"],
        quote: { text: "I would not call that one but rather the characteristic trait of quantum mechanics, the one that enforces its entire departure from classical lines of thought.", source: "Erwin Schrödinger, Discussion of probability relations between separated systems, Proceedings of the Cambridge Philosophical Society 31 (1935)" },
        body: [
          "Create two photons together in a certain way and send them to opposite ends of a laboratory, or to two cities. Measure their polarisations along the same direction and they always agree, though each individual result looks like a fair coin toss. Change the angles and the agreement changes in a precise way that, as Bell showed, no shared set of instructions could produce.",
          "Schrödinger named this entanglement in 1935, the same year Einstein, Podolsky and Rosen used it to argue that quantum mechanics is incomplete. An entangled pair has a definite joint state, but neither particle has a state of its own. The whole is defined; the parts are not.",
          "Einstein later called the implication spukhafte Fernwirkung, spooky action at a distance, in a 1947 letter to Max Born. But entanglement cannot be used to send a message. Each side sees only random results; the correlation appears only when the two lists are brought together by ordinary means, no faster than light. Quantum teleportation, despite its name, also needs an ordinary signal.",
          "For decades entanglement was treated as philosophy. It is now a resource that is made, stored and distributed, the working material of quantum computing and quantum cryptography."
        ],
        maths: [
          "|Φ⁺⟩ = (|HH⟩ + |VV⟩) / √2   (a pair whose polarisations always match, though each alone is random)",
          "P(both pass at angles a and b) = ½ cos²(a − b)   (agreement depends only on the angle between the settings)"
        ],
        prompts: ["The whole has a definite state but the parts do not. Where else have you met wholes that are more than their parts?"],
        recall: [
          { q: "Can entanglement be used to send a message faster than light?", a: "No. Each side sees only random results; the correlation shows up only when the records are compared by ordinary means." },
          { q: "Who named entanglement, and when?", a: "Erwin Schrödinger, in 1935." }
        ],
        links: [
          { to: "phys.bell", type: "leads-to", why: "Bell turned the strangeness of entanglement into a testable inequality." },
          { to: "phys.quantum-cryptography", type: "leads-to", why: "Entangled pairs can share secret keys whose security is checked with a Bell test." },
          { to: "phys.decoherence", type: "leads-to", why: "Decoherence is entanglement with the environment, spreading a system's quantum information into its surroundings." },
          { to: "phil.causation", type: "links-to", why: "Correlation with no signal and no shared instructions strains the usual idea that correlations come from causes." }
        ]
      },

      {
        id: "phys.bell", kind: "idea", title: "Bell's theorem and nonlocality", status: "settled", sim: "bell-game",
        line: "No theory of local, preset answers can match quantum predictions, and experiment sides with quantum theory.",
        facets: { strand: ["foundations"], era: ["bell-era"], philosophy: ["locality", "realism", "determinism"] },
        people: ["phys.john-bell"],
        body: [
          "Imagine two players, separated and unable to talk, each handed a random question and asked to answer yes or no. They win when their answers fit a certain rule. With any strategy agreed in advance, the best they can do is win 75 percent of the time. If they share entangled particles and measure them cleverly, they can win about 85 percent of the time. The Bell game simulation lets you try both.",
          "That gap is Bell's theorem, published by John Bell in 1964. He showed that any theory in which outcomes are fixed by local properties, carried by the particles and influenced only by nearby events, must obey a limit on how strongly distant results can be correlated. Quantum mechanics predicts the limit is broken. Experiments since 1972 agree with quantum mechanics, and tests in 2015 closed the main loopholes.",
          "So one of Bell's assumptions has to give. The usual summary, that local realism is ruled out, compresses a real choice. Pilot wave theory keeps definite values and accepts nonlocal influences. Many worlds denies that measurements have single outcomes. Superdeterminism, a minority view, denies that the experimenters' settings are independent of the particles. Copenhagen and QBism decline to say what the values were.",
          "Nonlocality here does not mean faster than light signalling, which quantum theory forbids. It means the world's correlations cannot be explained by causes travelling no faster than light. The philosopher Abner Shimony called this a peaceful coexistence with relativity."
        ],
        maths: [
          "S = E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′)   (the CHSH combination of four correlations)",
          "|S| ≤ 2   (any local theory with preset answers)",
          "quantum: up to 2√2 ≈ 2.83   (Tsirelson's bound; experiments come close)",
          "CHSH game: 75% best classical win rate; quantum cos²(π/8) ≈ 85%"
        ],
        prompts: ["Bell left a menu: give up locality, single outcomes, free settings, or the idea of values at all. Which would you give up, and what does that choice say about you?"],
        recall: [
          { q: "What is the best classical win rate in the CHSH game, and the quantum one?", a: "75 percent classically; about 85 percent with entanglement." },
          { q: "Does Bell nonlocality allow faster than light messages?", a: "No. It rules out local explanations of the correlations, not the ban on signalling." }
        ],
        links: [
          { to: "phys.bell-tests", type: "leads-to", why: "The theorem turned a philosophical worry into an experiment, first done in 1972 and refined ever since." },
          { to: "phys.pilot-wave", type: "links-to", why: "Bell was inspired by pilot wave theory, which is openly nonlocal, and asked whether every hidden variable theory must be." },
          { to: "phil.realism", type: "links-to", why: "If outcomes are real before measurement, Bell shows that reality must be nonlocal; realism survives only at a price." },
          { to: "phil.causation", type: "links-to", why: "The correlations resist explanation by local causes or by common causes in the past, challenging ordinary causal reasoning." },
          { to: "phil.free-will", type: "links-to", why: "Bell assumed the settings are chosen freely; superdeterminism escapes the theorem by denying that, at a heavy philosophical cost." }
        ]
      },

      {
        id: "phys.decoherence", kind: "idea", title: "Decoherence", status: "settled",
        line: "Contact with the environment spreads quantum information outwards, hiding superpositions from view.",
        facets: { strand: ["foundations"], era: ["long-quiet", "bell-era"], philosophy: ["observer", "realism"] },
        body: [
          "Fire large molecules through a grating and you get interference fringes. Heat the molecules so that they glow, giving off infrared light as they fly, and the fringes fade. Each emitted photon carries away a little information about where the molecule was, and that is enough. An experiment in Vienna in 2004 showed exactly this with fullerene molecules.",
          "This is decoherence, worked out by Dieter Zeh from 1970 and by Wojciech Zurek in the 1980s. A quantum system almost never sits alone. Air molecules, light and heat radiation constantly strike it, and each interaction entangles it with its surroundings. The superposition does not vanish; it spreads into the environment, where its interference effects become, in practice, impossible to recover.",
          "For anything as big as a dust grain, decoherence acts in a tiny fraction of a second. That is why the everyday world looks classical, and why building a quantum computer means isolating qubits with extraordinary care.",
          "Decoherence is settled physics, measured in the laboratory. What it does not do on its own is choose one outcome: after decoherence the theory still contains every branch, now unable to interfere. Many worlds embraces that; other interpretations add something more. Decoherence is part of every modern interpretation, but it is not an interpretation by itself."
        ],
        maths: [
          "(α|here⟩ + β|there⟩)|E⟩ → α|here⟩|E_here⟩ + β|there⟩|E_there⟩   (the environment takes a record)",
          "once E_here and E_there are distinguishable, interference between here and there vanishes"
        ],
        prompts: ["If decoherence hides the other outcomes rather than removing them, does that make you more or less comfortable with many worlds?"],
        recall: [
          { q: "What is decoherence, in one sentence?", a: "The spreading of a system's quantum information into its environment through entanglement, which makes interference unobservable." },
          { q: "Why does decoherence matter for quantum computers?", a: "It destroys the superpositions they rely on, so qubits must be kept extremely isolated." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "Decoherence explains why outcomes stop interfering but not, by itself, why only one of them occurs." },
          { to: "phys.quantum-computing", type: "contrasts", why: "Decoherence is the main enemy of quantum computers, which must shield their qubits from the world." },
          { to: "phys.schrodinger-cat", type: "responds-to", why: "Decoherence explains why no one ever sees a blurred cat: its surroundings record its state almost instantly." }
        ]
      },

      {
        id: "phys.complementarity", kind: "idea", title: "Complementarity", status: "interpretation",
        line: "Bohr's idea that wave and particle descriptions exclude each other, yet both are needed.",
        facets: { strand: ["foundations", "interpretations"], era: ["new-quantum"], philosophy: ["knowledge", "observer"] },
        people: ["phys.bohr"],
        body: [
          "Set up a double slit so that you can tell which slit each electron used, and the interference pattern vanishes. Remove the which path information and the pattern returns. You can arrange an experiment to show wave behaviour or particle behaviour, never both in full at once.",
          "Niels Bohr made this the core of his outlook in a lecture at Como in September 1927. He called it complementarity: some descriptions of a quantum system are mutually exclusive, because the experimental arrangements they require exclude each other, yet each is needed for a complete account. What a phenomenon is cannot be separated from the whole setup used to reveal it.",
          "The quantitative core is settled: later work turned it into an exact trade off, so that the more which path information is available, the fainter the fringes. Bohr's wider philosophy, that physics concerns what we can say about nature rather than nature itself, is an interpretation, and his writing on it is famously hard to pin down.",
          "Bohr extended complementarity to biology, psychology and culture. When he was admitted to the Danish Order of the Elephant in 1947 he chose for his coat of arms the Chinese yin yang symbol, with the Latin motto contraria sunt complementa, opposites are complementary."
        ],
        maths: [
          "V² + D² ≤ 1   (V: visibility of the fringes; D: how well you can tell which path. More of one means less of the other)"
        ],
        prompts: ["Bohr thought some truths can only be grasped through two descriptions that cannot be held at once. Can you think of a human example?"],
        recall: [
          { q: "What does complementarity say about wave and particle descriptions?", a: "They need mutually exclusive experimental arrangements, yet both are needed for a full account." },
          { q: "What symbol did Bohr choose for his coat of arms in 1947?", a: "The yin yang symbol, with the motto contraria sunt complementa." }
        ],
        links: [
          { to: "phys.copenhagen", type: "part-of", why: "Complementarity is the philosophical heart of Bohr's version of the Copenhagen view." },
          { to: "phys.quantum-eraser", type: "leads-to", why: "Quantum eraser experiments are modern, precise tests of the trade off between which path information and interference." },
          { to: "phil.knowledge", type: "links-to", why: "Complementarity says our knowledge of a quantum object is unavoidably partial and depends on how we ask, a claim about the limits of description." },
          { to: "phil.laozi", type: "links-to", why: "Bohr himself chose the yin yang symbol to represent complementarity; it is a resonance he admired, not a source of the physics." }
        ]
      },

      {
        id: "phys.quantum-leap", kind: "idea", title: "Quantum leap", status: "settled",
        line: "A sudden jump between energy levels: in physics tiny, in English enormous.",
        facets: { strand: ["foundations"], era: ["old-quantum", "bell-era"], philosophy: ["determinism"] },
        people: ["phys.bohr"],
        body: [
          "Watch a single trapped ion under laser light and its glow switches off and on abruptly, dark for a moment, then bright again. Each switch is an electron jumping between energy levels. Experiments in 1986 showed these jumps happening one at a time, in single atoms.",
          "In Bohr's 1913 model of the atom an electron does not glide from one orbit to another; it jumps, with no path in between, emitting or absorbing a photon whose energy matches the gap. German physicists called it a Quantensprung. Schrödinger disliked the idea all his life and in 1952 published an essay asking whether there are quantum jumps at all.",
          "He was partly vindicated. In 2019 a team at Yale showed that a jump in an artificial atom, once under way, develops smoothly and can be detected early and even reversed. Jumps are abrupt at the scale we usually look, but not instantaneous miracles.",
          "Then there is the English. A quantum leap in a business plan means a huge advance. In physics it is one of the smallest changes there is: an energy shift of less than a billionth of a billionth of a joule, within a space smaller than an atom. The idiom kept the suddenness and reversed the size, a fine example of how scientific words change once they enter everyday speech."
        ],
        maths: [
          "ΔE = E_upper − E_lower = h f   (the size of the jump sets the colour of the light)",
          "hydrogen's red line: ΔE ≈ 1.9 eV ≈ 3 × 10⁻¹⁹ J"
        ],
        prompts: ["Can you think of other words that crossed from science into ordinary English and changed meaning on the way?"],
        recall: [
          { q: "In physics, is a quantum leap large or small?", a: "Tiny: an atomic energy change of less than a billionth of a billionth of a joule." },
          { q: "What did the 2019 Yale experiment show about quantum jumps?", a: "That a jump, once begun, unfolds smoothly and can be caught and even reversed." }
        ],
        links: [
          { to: "eng.from-ideas", type: "links-to", why: "Quantum leap is an English phrase born in physics whose everyday meaning, a huge advance, is almost the opposite of the original." },
          { to: "phys.photon", type: "leads-to", why: "Each jump emits or absorbs one photon carrying exactly the energy difference." },
          { to: "phys.randomness", type: "links-to", why: "When a given atom will jump is unpredictable; Einstein's 1917 analysis of such transitions first made him uneasy about chance in physics." },
          { to: "phys.laser", type: "leads-to", why: "Jumps triggered in step by passing light are how a laser amplifies." }
        ]
      },

      {
        id: "phys.pauli-exclusion", kind: "idea", title: "The exclusion principle", status: "settled",
        line: "No two electrons can share the same quantum state, which is why matter is solid and chemistry exists.",
        facets: { strand: ["foundations"], era: ["new-quantum"] },
        people: ["phys.pauli"],
        body: [
          "Press your hand on a table and it stops. Atoms are mostly empty space, so why do they not pass through each other? Part of the answer is a rule Wolfgang Pauli stated in 1925: no two electrons in the same system can occupy exactly the same quantum state.",
          "Each orbital in an atom can therefore hold at most two electrons, one spin up and one spin down. As electrons are added they must fill higher and higher levels, building the shells that give each element its chemistry. The structure of the periodic table, why sodium is reactive and neon is not, follows from this one rule together with quantised energy levels.",
          "The principle applies to all fermions, the family that includes electrons, protons and neutrons. Bosons, such as photons, do the opposite and happily crowd into one state, which is what makes lasers and superconductors possible. In 1940 Pauli showed that the link between a particle's spin and its family follows from combining quantum theory with relativity.",
          "On the largest scale, exclusion holds up dead stars. A white dwarf is kept from collapsing by electrons refusing to share states, a pressure that has nothing to do with heat."
        ],
        maths: [
          "at most 2 electrons per orbital   (spin up and spin down)",
          "shell capacities 2, 8, 18 ...   (2n² for shell n)"
        ],
        prompts: ["A single rule about sharing explains chemistry and holds up stars. What makes a principle feel deep to you?"],
        recall: [
          { q: "What does the exclusion principle say?", a: "No two electrons (or other fermions) in one system can occupy the same quantum state." },
          { q: "Name two consequences of the exclusion principle.", a: "The shell structure of atoms and the periodic table, and the pressure that holds up white dwarf stars." }
        ],
        links: [
          { to: "phys.semiconductors", type: "leads-to", why: "Electrons stacking into energy bands, one per state, is what separates conductors, insulators and semiconductors." },
          { to: "phys.quantum-field", type: "links-to", why: "In quantum field theory the difference between fermions and bosons is built in from the start, and the spin statistics theorem explains it." },
          { to: "phys.photon", type: "contrasts", why: "Photons are bosons and can pile into a single state, the opposite of electrons, which is why a laser beam can be so intense." }
        ]
      },

      {
        id: "phys.quantum-field", kind: "idea", title: "Quantum fields", status: "settled",
        line: "In modern physics the basic things are fields, and particles are their quantised ripples.",
        facets: { strand: ["foundations"], era: ["new-quantum", "long-quiet"], philosophy: ["realism"] },
        people: ["phys.dirac", "phys.feynman"],
        body: [
          "Every electron in the universe is identical to every other: same mass, same charge, same spin, with no scratches or serial numbers. Quantum field theory explains why. There is one electron field filling all of space, and each electron is a quantised ripple in it, as alike as two notes played on the same string.",
          "The idea began when Paul Dirac quantised the electromagnetic field in 1927, so that photons appear as its quanta. His 1928 equation for the electron predicted a partner with opposite charge, the positron, which Carl Anderson found in cosmic rays in 1932: antimatter, predicted before it was seen.",
          "In the late 1940s Richard Feynman, Julian Schwinger, Shinichiro Tomonaga and Freeman Dyson made quantum electrodynamics workable. Its prediction for the electron's magnetic strength agrees with measurement to better than one part in a billion, among the most precise agreements in all of science. The Standard Model of particle physics, completed with the discovery of the Higgs boson in 2012, is a quantum field theory.",
          "Fields also mean that empty space is never quite empty, and that particles can be created and destroyed. Quantum field theory has not yet been reconciled with gravity; that remains open."
        ],
        maths: [
          "particle = a quantum of excitation of a field   (one electron field, many identical electrons)",
          "E² = (pc)² + (mc²)²   (relativity allows negative energy solutions: Dirac's route to antimatter)"
        ],
        prompts: ["If particles are ripples in fields, is the field more real than the particle? Does the question even make sense?"],
        recall: [
          { q: "Why are all electrons exactly identical?", a: "Each is an excitation of the same electron field." },
          { q: "What did Dirac's 1928 equation predict that was later found?", a: "Antimatter: the positron, discovered by Carl Anderson in 1932." }
        ],
        links: [
          { to: "phys.wave-particle", type: "responds-to", why: "Field theory eases the duality puzzle: the field spreads like a wave, and its quanta are counted like particles." },
          { to: "phys.measurement-problem", type: "links-to", why: "Moving to fields does not remove the measurement problem; quantum field theory inherits it unchanged." },
          { to: "phys.uncertainty", type: "links-to", why: "Fields obey their own uncertainty relations, which is why the vacuum cannot be perfectly calm." }
        ]
      },

      {
        id: "phys.randomness", kind: "idea", title: "Quantum randomness", status: "interpretation",
        line: "Single quantum events seem genuinely unpredictable, not just hard to predict.",
        facets: { strand: ["foundations"], era: ["old-quantum", "new-quantum", "quantum-info"], philosophy: ["determinism"] },
        body: [
          "A Geiger counter near a radioactive sample clicks irregularly. The half life of the sample is precise, but when the next nucleus will decay is unknowable, and no hidden clock inside a nucleus has ever been found. The same holds for which detector a photon reaches after a beam splitter: the proportions are fixed, each event is not.",
          "In classical physics, randomness is ignorance. A coin toss is fully fixed by forces we fail to track. Standard quantum mechanics says single outcomes are not fixed by anything at all; only their probabilities are. This troubled Einstein from 1917, when he noticed that his own theory of how atoms emit light left the moment of emission to chance.",
          "Whether quantum randomness is truly fundamental depends on interpretation. Pilot wave theory is deterministic, with randomness coming from ignorance of exact starting positions. Many worlds is deterministic too: every outcome happens, and the chance concerns which branch you find yourself in. Copenhagen and objective collapse theories treat chance as real.",
          "Bell's theorem gives this practical bite. Because results that violate Bell's inequality cannot have been locally preset, they can certify randomness, and quantum random number generators now do this. In 2006 John Conway and Simon Kochen proved a provocative free will theorem: if experimenters can choose their settings freely, then particles' responses are not fixed by their past either."
        ],
        maths: [
          "P(decay within time t) = 1 − e^(−t/τ)   (the population is lawful; the single nucleus is not)",
          "half life t½ = τ ln 2"
        ],
        prompts: ["If your choices were quantum random, would that make them more yours, or less?"],
        recall: [
          { q: "How does classical randomness differ from quantum randomness in the standard view?", a: "Classical randomness is ignorance of hidden causes; standard quantum mechanics says single outcomes have no determining cause at all." },
          { q: "Name a deterministic interpretation of quantum mechanics.", a: "Pilot wave (de Broglie Bohm) theory, or many worlds." }
        ],
        links: [
          { to: "phys.pilot-wave", type: "contrasts", why: "Pilot wave theory reproduces quantum randomness from hidden, deterministic particle positions." },
          { to: "phil.determinism", type: "contrasts", why: "If single quantum outcomes are uncaused, strict determinism is false; if a deterministic interpretation is right, it survives." },
          { to: "phil.free-will", type: "links-to", why: "Randomness alone does not give free will, since a random choice is not yours either, but the free will theorem ties the two questions together." },
          { to: "phil.causation", type: "links-to", why: "An event with a probability but no sufficient cause challenges the old principle that everything happens for a reason." }
        ]
      },

      {
        id: "phys.quantum-mysticism", kind: "idea", title: "Quantum mysticism", status: "settled",
        line: "Why popular claims that quantum physics proves the mind shapes reality overreach.",
        facets: { strand: ["interpretations"], era: ["bell-era", "quantum-info"], philosophy: ["method", "observer"] },
        body: [
          "You will see quantum used to sell healing, manifesting and self help: your thoughts collapse possibilities into reality, everything is connected through entanglement, positive intention changes matter. Books such as The Tao of Physics (1975) and films such as What the Bleep Do We Know!? (2004) spread the mood. The Nobel laureate who named the quark called it quantum flapdoodle, in his 1994 book The Quark and the Jaguar.",
          "The claims fail at specific points. In physics an observer is any system that records information; detectors and stray air molecules destroy interference just as well as people, and no experiment has shown a mind doing anything a detector cannot. Entanglement produces correlations but cannot carry a message, an intention or a healing influence. And by one widely cited estimate, Max Tegmark's in 2000, any quantum superposition across neurons in the warm, wet brain would decohere far faster than a neuron can fire.",
          "Some serious scientists have speculated about quantum physics and consciousness, among them Eugene Wigner and Roger Penrose. These are minority hypotheses, argued over in journals, and none implies that wishing changes the world. Quantum physics shows that the world is stranger than common sense; it does not show that it obeys our wishes.",
          "Why does the mysticism persist? Psychology helps here. We notice the hits and forget the misses, remedies sold in quantum language still benefit from placebo effects, and prestigious words lend borrowed authority. A claim that no test could ever contradict has stopped being science."
        ],
        prompts: ["What questions would you ask the next time a product or a book invokes quantum physics?"],
        recall: [
          { q: "Why does the double slit experiment not show that minds shape reality?", a: "Interference disappears with any physical record of the path, such as an unread detector; no conscious observer is needed." },
          { q: "Can entanglement carry an intention or a healing influence?", a: "No. It cannot carry any message at all; it produces correlations visible only when records are compared." }
        ],
        links: [
          { to: "psy.consciousness", type: "contrasts", why: "No experiment shows consciousness doing anything to quantum systems that an inanimate detector cannot." },
          { to: "psy.placebo", type: "links-to", why: "Quantum healing products can seem to work because of placebo effects and natural recovery, not because of physics." },
          { to: "psy.confirmation-bias", type: "links-to", why: "Believers notice the times an intention seemed to come true and forget the rest, which keeps the story alive." },
          { to: "phil.falsification", type: "links-to", why: "A claim that no possible observation could contradict is, on Popper's test, not a scientific claim at all." },
          { to: "phil.laozi", type: "links-to", why: "The Tao of Physics drew parallels between quantum ideas and Daoist texts; the parallels are of imagery and mood, not evidence for either." },
          { to: "phys.consciousness-collapse", type: "contrasts", why: "Consciousness causes collapse was a serious, if minority, proposal by physicists; popular versions stretch it far beyond what its authors claimed." }
        ]
      },

      /* ---------- Experiments and thought experiments ---------- */

      {
        id: "phys.double-slit", kind: "experiment", title: "The double slit with electrons", status: "settled", sim: "double-slit",
        line: "Electrons sent one by one build an interference pattern, unless something records which slit they used.",
        facets: { strand: ["experiments"], era: ["long-quiet", "bell-era"], philosophy: ["observer", "realism"] },
        people: ["phys.feynman"],
        quote: { text: "We choose to examine a phenomenon which is impossible, absolutely impossible, to explain in any classical way, and which has in it the heart of quantum mechanics. In reality, it contains the only mystery.", source: "Richard Feynman, The Feynman Lectures on Physics, Volume III (1965), chapter 1" },
        body: [
          "Fire electrons, one at a time, at a barrier with two narrow openings, and record where each lands on a screen beyond. Each arrives as a single dot. At first the dots look random. After thousands, bright and dark bands emerge: interference, the mark of waves. Each electron, alone in the apparatus, somehow contributes to a pattern that depends on both openings being there.",
          "Thomas Young showed interference of light in the early nineteenth century. Claus Jönsson did it with electron beams in 1961. Single electron versions followed in Bologna in 1974 and, most famously, at Hitachi in 1989, where Akira Tonomura's team filmed the bands building up dot by dot, using an electron biprism, the equivalent of two slits. In 2002 readers of Physics World voted it the most beautiful experiment in physics.",
          "Now add a detector that tells you which slit each electron passed. The bands vanish and you get two plain stripes, as if the electrons were bullets. It is not that the detector shoves the electron; what matters is that which path information exists anywhere in the world. The double slit simulation lets you switch such a detector on and off.",
          "Feynman made this experiment the doorway to quantum mechanics in his Lectures, and every interpretation must explain it."
        ],
        maths: [
          "P(x) = |ψ₁(x) + ψ₂(x)|²   (both slits open, no record: bands)",
          "P(x) = |ψ₁(x)|² + |ψ₂(x)|²   (which path recorded: no bands)",
          "fringe spacing ≈ λ L / d   (L: distance to the screen; d: slit separation)"
        ],
        prompts: ["Each electron arrives alone, yet the pattern needs both slits. Try to describe what an electron does in the apparatus without saying something you cannot defend."],
        recall: [
          { q: "What happens to the interference bands when a detector records which slit each electron used?", a: "They vanish, leaving two plain stripes." },
          { q: "Where and when were single electron interference bands famously filmed building up dot by dot?", a: "At Hitachi, by Akira Tonomura's team, in 1989." }
        ],
        links: [
          { to: "phys.wave-particle", type: "example-of", why: "Single dots building a wave pattern is wave particle duality in its plainest form." },
          { to: "phys.observer", type: "leads-to", why: "The loss of interference when a which path record exists is where talk of the observer begins, and where it is most often misunderstood." },
          { to: "phys.complementarity", type: "example-of", why: "You can have the which path record or the bands, not both: Bohr's complementarity in one apparatus." },
          { to: "phys.quantum-eraser", type: "leads-to", why: "The quantum eraser asks what happens if the which path record is made and then destroyed." }
        ]
      },

      {
        id: "phys.davisson-germer", kind: "experiment", title: "The Davisson Germer experiment", status: "settled",
        line: "Electrons scattered off a nickel crystal diffract like waves, confirming de Broglie in 1927.",
        facets: { strand: ["experiments"], era: ["new-quantum"], philosophy: ["method"] },
        people: ["phys.de-broglie"],
        body: [
          "Aim a beam of electrons at a nickel crystal and count how many bounce off at each angle. If electrons were tiny pellets the spread would be smooth. Clinton Davisson and Lester Germer, at Bell Labs in New York, found sharp peaks at particular angles, just as X rays produce when they diffract from the regular rows of atoms in a crystal.",
          "The discovery began with an accident. In 1925 a mishap let air into their apparatus and oxidised the nickel target; heating it clean rearranged the metal into a few large crystals, and the scattering pattern changed oddly. Davisson heard about de Broglie's matter waves at a meeting in Oxford in 1926 and realised what he might be seeing. By 1927 the peaks matched de Broglie's formula for the electrons' wavelength.",
          "The same year George Paget Thomson, in Aberdeen, saw electron diffraction rings by firing electrons through thin films. Davisson and Thomson shared the 1937 Nobel Prize. There is a family irony: Thomson's father, J. J. Thomson, had won his Nobel Prize for work that established the electron as a particle.",
          "Electron diffraction is now routine, and electron microscopes exploit the short wavelength of fast electrons to show details far smaller than light can reveal."
        ],
        maths: [
          "λ = h / p   (de Broglie wavelength)",
          "54 eV electrons: λ ≈ 0.167 nm, with a peak near 50°   (matching the spacing of atoms in nickel)"
        ],
        prompts: ["A broken apparatus led to a Nobel Prize. What does it take to notice that an accident is a discovery?"],
        recall: [
          { q: "What did Davisson and Germer observe in 1927?", a: "Electrons diffracting from a nickel crystal, with peaks at angles matching de Broglie's wavelength." },
          { q: "What is the irony in the Thomson family's Nobel Prizes?", a: "The father's prize was for work establishing the electron as a particle; the son's was for showing it behaves as a wave." }
        ],
        links: [
          { to: "phys.wave-particle", type: "leads-to", why: "It turned de Broglie's bold guess that matter has a wavelength into measured fact." },
          { to: "phys.interference", type: "example-of", why: "Diffraction peaks are interference among waves scattered from many rows of atoms." },
          { to: "phys.double-slit", type: "leads-to", why: "Electron diffraction from crystals came first; the cleaner double slit version with single electrons followed decades later." }
        ]
      },

      {
        id: "phys.stern-gerlach", kind: "experiment", title: "The Stern Gerlach experiment", status: "settled", sim: "stern-gerlach",
        line: "Silver atoms passing a magnet split into exactly two beams: the first glimpse of spin, in 1922.",
        facets: { strand: ["experiments"], era: ["old-quantum"], philosophy: ["observer", "realism"] },
        body: [
          "Send a beam of silver atoms between the poles of a specially shaped magnet and catch them on a glass plate. If each atom were a tiny compass needle pointing in a random direction, you would see a smear. Otto Stern and Walther Gerlach, in Frankfurt in February 1922, saw two separate marks.",
          "The deposit was so faint that, as Stern told it decades later, it only became visible when his breath, laden with sulphur from cheap cigars, turned the silver black. Gerlach sent Bohr a postcard congratulating him on the confirmation of his theory. In fact they had seen something no one yet knew existed: the electron's spin, proposed three years later.",
          "Chain these magnets together and the strangeness sharpens. Keep the atoms that went up along the vertical. Send them through a vertical magnet again and all go up. Send them through a horizontal magnet and they split half left, half right. Keep only the right ones and measure vertically once more, and they split half and half again: the earlier up has been erased. The Stern Gerlach simulation lets you build these chains.",
          "This sequence is one of the clearest demonstrations that quantum measurement does not simply reveal a value the atom was carrying all along."
        ],
        maths: [
          "two spots, never a smear   (spin along the field: +ħ/2 or −ħ/2)",
          "up along z, then measure x: 50% left, 50% right",
          "then z again: 50% up, 50% down   (the first result has been erased)"
        ],
        prompts: ["If measuring sideways erases the vertical result, in what sense did the atom have a vertical spin at all?"],
        recall: [
          { q: "What did Stern and Gerlach see in 1922?", a: "A beam of silver atoms split into exactly two spots by a nonuniform magnetic field." },
          { q: "Up along z, then right along x, then z again: what do you get?", a: "Half up and half down; the first vertical result has been erased." }
        ],
        links: [
          { to: "phys.spin", type: "leads-to", why: "The two spots were the first experimental trace of electron spin, although nobody knew it in 1922." },
          { to: "phys.collapse", type: "example-of", why: "Repeated measurements show the state resetting to match each result, the behaviour the collapse rule describes." },
          { to: "phys.quantisation", type: "example-of", why: "Only two outcomes, never a continuous spread: quantisation of a direction, not just of an energy." },
          { to: "phil.realism", type: "links-to", why: "If measuring sideways erases the upward result, it is hard to think of spin as a value the atom simply carries all along." }
        ]
      },

      {
        id: "phys.epr", kind: "experiment", title: "The EPR argument", status: "interpretation",
        line: "In 1935 Einstein, Podolsky and Rosen argued that quantum mechanics must be incomplete.",
        facets: { strand: ["experiments"], era: ["new-quantum"], philosophy: ["realism", "locality"] },
        people: ["phys.einstein"],
        quote: { text: "If, without in any way disturbing a system, we can predict with certainty ... the value of a physical quantity, then there exists an element of physical reality corresponding to this physical quantity.", source: "Einstein, Podolsky and Rosen, Physical Review 47, 777 (1935)" },
        body: [
          "Take two particles that interact and fly apart, so that their positions and their momenta are linked. Measure the position of one and you can predict the position of the other with certainty. Measure the momentum of the first instead and you can predict the other's momentum. Either way, you never touched the distant particle.",
          "In May 1935 Albert Einstein, Boris Podolsky and Nathan Rosen used this setup to argue that the distant particle must have had both a definite position and a definite momentum all along, since either could be predicted without disturbing it. Quantum mechanics allows no state with both. So, they concluded, its description of reality is incomplete.",
          "Podolsky wrote the paper, and Einstein complained to Schrödinger that his main point had been buried. Einstein's own concern was separability: that things far apart should have their own independent real states. Bohr replied within months, arguing that the conditions defining what can be predicted depend on the whole experimental arrangement.",
          "For three decades most physicists treated the exchange as philosophy. In 1964 John Bell showed it was not: the assumptions behind EPR could be tested. When they were, quantum mechanics won."
        ],
        maths: [
          "x₁ − x₂ and p₁ + p₂ can both be sharp   (unlike x and p of a single particle)",
          "measure x₁ → know x₂; measure p₁ → know p₂"
        ],
        prompts: ["Is the EPR criterion of reality a good definition of what is real? Can you think of a case where it fails?"],
        recall: [
          { q: "What did EPR conclude in 1935?", a: "That quantum mechanics gives an incomplete description of physical reality." },
          { q: "What was Einstein's own central concern behind EPR?", a: "Separability: distant systems should have their own independent real states." }
        ],
        links: [
          { to: "phys.entanglement", type: "leads-to", why: "EPR highlighted the very correlations Schrödinger named entanglement in the same year." },
          { to: "phys.bell", type: "leads-to", why: "Bell's theorem began as an attempt to take the EPR argument seriously and see where it led." },
          { to: "phys.schrodinger-cat", type: "leads-to", why: "The EPR paper prompted the letters between Einstein and Schrödinger in which the cat was born." },
          { to: "phil.realism", type: "links-to", why: "The EPR criterion of reality is a philosopher's definition of realism set inside a physics paper." }
        ]
      },

      {
        id: "phys.schrodinger-cat", kind: "experiment", title: "Schrödinger's cat", status: "open",
        line: "A thought experiment meant to show that quantum superposition becomes absurd at the scale of a cat.",
        facets: { strand: ["experiments"], era: ["new-quantum"], philosophy: ["observer", "realism"] },
        people: ["phys.schrodinger"],
        say: { text: "Schrödinger", respell: "SHRER ding er", ipa: "ˈʃʁøːdɪŋɐ" },
        body: [
          "Picture a cat sealed in a steel box with a tiny amount of radioactive material, a Geiger counter and a flask of poison. If an atom decays within the hour, the counter triggers a hammer that breaks the flask. If not, the cat lives. Quantum mechanics, applied literally, says the atom is in a superposition of decayed and not decayed, so the whole box, cat included, should be in a superposition of dead and alive until someone looks.",
          "Erwin Schrödinger described this in a 1935 essay on the present situation in quantum mechanics, calling it a quite ridiculous case. His point was not that cats can be both dead and alive. It was a reductio: if the wavefunction is a complete description of reality, it gives an absurd answer for a cat, so something is missing. The idea grew out of his letters with Einstein after the EPR paper; Einstein had proposed a keg of gunpowder that was both exploded and not.",
          "Decoherence now explains why no one ever sees a blurred cat: the cat's countless atoms interact with their surroundings and the superposition becomes invisible almost at once. But whether one outcome becomes real, and when, is still the measurement problem.",
          "Physicists now make small cat states in the laboratory, superpositions of clearly different states of atoms, light and circuits. And the phrase has escaped into English, used for anything undecided until checked."
        ],
        maths: [
          "(|not decayed⟩|alive⟩ + |decayed⟩|dead⟩) / √2   (what the equation says, if nothing breaks it)"
        ],
        prompts: ["Schrödinger meant the cat as a joke at the theory's expense. Why do you think it became the theory's mascot instead?"],
        recall: [
          { q: "What was Schrödinger trying to show with the cat?", a: "That treating the wavefunction as a complete description gives an absurd result at everyday scale, so something is missing." },
          { q: "What explains why we never observe a superposed cat?", a: "Decoherence: the cat's environment records its state almost instantly." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "example-of", why: "The cat makes the measurement problem vivid: when does one definite outcome appear?" },
          { to: "phys.wigners-friend", type: "leads-to", why: "Wigner replaced the cat with a conscious friend, to ask whether a mind inside the box changes the story." },
          { to: "eng.from-ideas", type: "links-to", why: "Schrödinger's cat has entered English as shorthand for a situation that is undecided until someone checks." }
        ]
      },

      {
        id: "phys.bell-tests", kind: "experiment", title: "Bell tests and the 2022 Nobel Prize", status: "settled",
        line: "Experiments from 1972 to 2015 broke Bell's inequality and won Aspect, Clauser and Zeilinger the Nobel.",
        facets: { strand: ["experiments"], era: ["bell-era", "quantum-info"], philosophy: ["locality", "realism"] },
        people: ["phys.zeilinger", "phys.john-bell"],
        body: [
          "Make pairs of entangled photons and send them in opposite directions. At each end, choose at random how to set a polariser, just before the photon arrives. Record what happens thousands of times and compute Bell's quantity S. If the world were local with preset answers, S could not exceed 2. Experiments find values well above 2, often around 2.7, close to the quantum prediction.",
          "John Clauser and Stuart Freedman did the first test at Berkeley in 1972. Alain Aspect and his colleagues near Paris improved it in 1981 and 1982, switching the settings while the photons were in flight. Anton Zeilinger's group in Innsbruck in 1998 chose settings with fast random number generators, with stations 400 metres apart.",
          "Each experiment left loopholes: perhaps the detectors missed too many photons, or the settings were not truly independent of the source. In 2015 three teams, in Delft, Vienna and Boulder, closed the main loopholes together. Later tests used light from distant stars, and the choices of about 100,000 volunteers playing an online game, to pick the settings.",
          "Aspect, Clauser and Zeilinger shared the 2022 Nobel Prize in Physics for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science. A question once dismissed as metaphysics had been settled in the laboratory, though what it means is still interpreted in different ways."
        ],
        maths: [
          "classical limit: |S| ≤ 2",
          "Aspect, Grangier and Roger 1982: S ≈ 2.70",
          "quantum maximum: 2√2 ≈ 2.83"
        ],
        prompts: ["Why might it have taken from 1972 to 2015 to close every loophole? What does that say about how hard it is to test a big idea cleanly?"],
        recall: [
          { q: "Who shared the 2022 Nobel Prize in Physics for Bell tests?", a: "Alain Aspect, John Clauser and Anton Zeilinger." },
          { q: "When were the main loopholes in Bell tests closed together?", a: "In 2015, by teams in Delft, Vienna and Boulder." }
        ],
        links: [
          { to: "phys.entanglement", type: "links-to", why: "Every Bell test is, at heart, an exquisitely careful measurement of entanglement." },
          { to: "phys.quantum-cryptography", type: "leads-to", why: "The same entangled photon sources and Bell checks underpin entanglement based quantum key distribution." },
          { to: "phys.randomness", type: "leads-to", why: "Loophole free Bell tests can certify that numbers are genuinely random, an idea now used in public randomness beacons." },
          { to: "phil.falsification", type: "links-to", why: "Bell tests turned a metaphysical assumption into a risky prediction that could be, and was, refuted by experiment." }
        ]
      },

      {
        id: "phys.delayed-choice", kind: "experiment", title: "Wheeler's delayed choice", status: "settled",
        line: "Choosing how to measure a photon after it is already inside the apparatus still decides what you see.",
        facets: { strand: ["experiments"], era: ["bell-era", "quantum-info"], philosophy: ["observer", "realism"] },
        people: ["phys.wheeler"],
        body: [
          "Send a photon into an interferometer, a device where it can take two paths that later meet. If the paths are recombined at the end, it shows interference, wave like behaviour. If they are not, each detector tells you which path it took, particle like behaviour. Now make the choice of whether to recombine at random, after the photon has already entered.",
          "John Wheeler proposed this in 1978 as a thought experiment, adding a cosmic version in which the two paths are light from a distant quasar bent around an intervening galaxy. Could a choice made today decide how a photon behaved billions of years ago? In 2007 a team including Alain Aspect performed the experiment with single photons and a random choice made after entry. The results matched quantum mechanics exactly: interference when recombined, which path when not.",
          "It is tempting to say the late choice reaches back in time. Nothing in the data requires that. The photon never decided at the entrance to be a wave or a particle; those are descriptions of two different complete experiments, which only exist once the experiment is complete. Wheeler drew a moral close to Bohr's: a phenomenon is only a phenomenon once it has been registered.",
          "Standard quantum mechanics predicts every result without any influence running backwards, and no signal can be sent into the past this way."
        ],
        maths: [
          "recombined: P(detector 1) = cos²(φ/2)   (depends on the path difference φ: interference)",
          "not recombined: P = ½ each, whatever φ   (which path)"
        ],
        prompts: ["Why is backward causation such a tempting reading here, and what does resisting it require you to give up?"],
        recall: [
          { q: "Does the delayed choice experiment show the future changing the past?", a: "No. Quantum mechanics predicts every result with no backward influence, and no signal can be sent to the past." },
          { q: "Who proposed the delayed choice experiment and when was it done with single photons?", a: "John Wheeler proposed it in 1978; it was performed in 2007 by a team including Alain Aspect." }
        ],
        links: [
          { to: "phys.complementarity", type: "example-of", why: "Wave and particle behaviour belong to different complete arrangements, exactly as Bohr held." },
          { to: "phys.quantum-eraser", type: "links-to", why: "The delayed choice quantum eraser combines Wheeler's timing trick with erasing which path information." },
          { to: "phil.causation", type: "links-to", why: "The experiment tempts talk of backward causation, and shows why the temptation should be resisted." }
        ]
      },

      {
        id: "phys.quantum-eraser", kind: "experiment", title: "The quantum eraser", status: "settled",
        line: "Erase the which path record and interference returns, but only in sorted subsets of the data.",
        facets: { strand: ["experiments"], era: ["bell-era"], philosophy: ["observer"] },
        body: [
          "Mark the photons going through each slit, say by giving them different polarisations, and the interference pattern disappears. Now, beyond the slits, pass them through a polariser that scrambles the marks so the path can no longer be read. Sort the detections by what happened at that final polariser, and interference fringes reappear.",
          "Marlan Scully and Kai Drühl proposed the idea in 1982, and it has been carried out in many forms since. In the delayed choice version, reported in 2000, the decision to erase or keep the path information is made, in effect, after the photon has already hit the screen.",
          "This is often presented as the future changing the past. It does not. The screen alone never shows fringes, in any version. Fringes appear only when the screen hits are sorted into groups using results from other detectors, information that arrives by ordinary means. One group shows fringes, another shows the opposite fringes, and together they add up to the same featureless blur. Nothing can be signalled backwards.",
          "What the eraser does show is that interference depends on whether which path information exists in the world, not on whether anyone has looked at it, and that such information, while it is still contained and not spread into the environment, can be undone."
        ],
        maths: [
          "screen alone: no fringes, ever",
          "sorted by eraser result: fringes + opposite fringes = no fringes   (the sum is the blur)"
        ],
        prompts: ["Online videos often say the quantum eraser proves retrocausality. Having read this, how would you explain the trick in one sentence?"],
        recall: [
          { q: "Does the screen in a quantum eraser ever show fringes on its own?", a: "No. Fringes appear only after sorting the hits using data from other detectors." },
          { q: "What determines whether interference is lost: someone looking, or something else?", a: "Whether which path information exists in the world, not whether anyone looks at it." }
        ],
        links: [
          { to: "phys.observer", type: "links-to", why: "The eraser shows that what kills interference is the existence of information, not a conscious look at it." },
          { to: "phys.decoherence", type: "links-to", why: "Erasure works only while the which path record is still controlled; once it leaks into the environment it cannot be undone." },
          { to: "phil.causation", type: "links-to", why: "Popular accounts claim causes running backwards in time; a careful look shows the correlations need none." }
        ]
      },

      {
        id: "phys.wigners-friend", kind: "experiment", title: "Wigner's friend", status: "open",
        line: "A thought experiment, now partly testable, about observers who describe each other differently.",
        facets: { strand: ["experiments"], era: ["long-quiet", "quantum-info"], philosophy: ["observer", "realism", "knowledge"] },
        body: [
          "Imagine your friend, in a sealed laboratory, measures a qubit and sees a definite result. You, outside, treat the whole laboratory, friend included, as a quantum system that has not been measured. By your description the lab is in a superposition of friend saw 0 and friend saw 1. By your friend's there is a single fact. Who is right?",
          "Eugene Wigner posed this in 1961. He found it absurd that his friend could be in a superposition of experiences, and concluded that consciousness must collapse the wavefunction. In later years he abandoned that view.",
          "The scenario returned in 2018, when Daniela Frauchiger and Renato Renner argued that agents using quantum theory to reason about each other can reach contradictions, and Časlav Brukner and others proved related no go theorems. In 2019 and 2020 small experiments with photons, in Edinburgh and in Brisbane, tested versions of the setup. Quantum predictions held.",
          "These results suggest at least one cherished assumption must go: that observed facts are the same for everyone, that experimenters choose freely, or that influences are local. The friends in these experiments were photons, not people, so they test the logic, not consciousness. Whether a real observer could ever be put in superposition is an open question."
        ],
        prompts: ["Could a fact be true for one observer and not yet for another? What would that do to the idea of a shared world?"],
        recall: [
          { q: "What conclusion did Wigner originally draw in 1961?", a: "That consciousness collapses the wavefunction; he later abandoned this." },
          { q: "Were the friends in recent Wigner's friend experiments people?", a: "No, they were photons; the experiments test the logic, not consciousness." }
        ],
        links: [
          { to: "phys.consciousness-collapse", type: "leads-to", why: "Wigner first used the friend to argue that consciousness causes collapse." },
          { to: "phys.relational", type: "links-to", why: "Relational quantum mechanics accepts both Wigner's and the friend's accounts, each correct relative to a different observer." },
          { to: "phil.knowledge", type: "links-to", why: "If facts can hold for one observer and not another, knowledge becomes perspectival, a theme with long philosophical roots." },
          { to: "phil.realism", type: "links-to", why: "The modern theorems put pressure on observer independent facts, the core commitment of realism." }
        ]
      },

      /* ---------- Interpretations ---------- */

      {
        id: "phys.copenhagen", kind: "interpretation", title: "The Copenhagen interpretation", status: "interpretation",
        line: "The founders' pragmatic view: quantum theory predicts the results of experiments, not a picture of reality.",
        facets: { strand: ["interpretations"], era: ["new-quantum", "long-quiet"], philosophy: ["knowledge", "observer", "realism"] },
        people: ["phys.bohr", "phys.heisenberg", "phys.born"],
        body: [
          "There was never one Copenhagen interpretation. The label was popularised by Heisenberg in the 1950s for what he, Bohr, Born and Pauli had worked out around 1927, and they did not fully agree. What they shared was a way of using the theory: describe the experiment in ordinary classical language, use the wavefunction to calculate the probabilities of its results, and do not ask what the system is doing between preparation and measurement.",
          "Bohr stressed complementarity and the wholeness of the phenomenon and the apparatus. Heisenberg spoke of potentialities becoming actual on measurement. Born supplied the probabilities. Many textbooks later reduced all of this to the collapse rule.",
          "Its strength is that it never gives a wrong prediction and asks for no extra machinery. Its weakness is that it divides the world into a quantum system and a classical observer without saying where the line falls, which leaves the measurement problem unsolved. David Mermin's 1989 summary of the working attitude, shut up and calculate, is often wrongly attributed to Feynman.",
          "Philosophers read Bohr in several ways: as a positivist, as a pragmatist, and as a kind of neo Kantian for whom classical concepts are the preconditions of any experience we can describe. Bohr never called himself a Kantian; that label is a scholarly reading, not his own claim."
        ],
        prompts: ["Is refusing to say what happens between measurements a wise humility or an evasion?"],
        recall: [
          { q: "Was the Copenhagen interpretation a single agreed doctrine?", a: "No. The label was popularised by Heisenberg in the 1950s, and Bohr, Heisenberg, Born and Pauli differed." },
          { q: "Who coined shut up and calculate?", a: "David Mermin, in 1989, summarising a common attitude; it is often misattributed to Feynman." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "Copenhagen answers the measurement problem by declining it: physics describes results, not what happens in between." },
          { to: "phil.kant", type: "links-to", why: "Some scholars read Bohr as neo Kantian: classical concepts are conditions for describing any experiment, as Kant's categories are for experience. It is a reading, not Bohr's own label." },
          { to: "phil.empiricism", type: "links-to", why: "Its focus on what can be observed, and its silence about the unobservable, echoes the empiricist and positivist tradition." },
          { to: "phil.knowledge", type: "links-to", why: "On this view the wavefunction encodes what can be known and predicted, not simply what is." },
          { to: "phil.paradigm", type: "links-to", why: "For decades Copenhagen worked as what Kuhn called normal science: an unquestioned framework within which physicists solved problems." }
        ]
      },

      {
        id: "phys.many-worlds", kind: "interpretation", title: "Many worlds", status: "interpretation",
        line: "Every possible outcome happens, each in its own branch of one universal wavefunction.",
        facets: { strand: ["interpretations"], era: ["long-quiet", "bell-era"], philosophy: ["determinism", "realism", "observer"] },
        people: ["phys.everett"],
        body: [
          "Take the Schrödinger equation seriously everywhere, never interrupt it with collapse, and see what follows. When you measure a superposed qubit you become entangled with it: one version of you sees 0, another sees 1. Both are real. Each version finds a single definite result and, thanks to decoherence, can never interact with the other.",
          "Hugh Everett proposed this as a graduate student at Princeton in 1957, calling it the relative state formulation. It was largely ignored until Bryce DeWitt popularised it as the many worlds interpretation in 1970. Today it has prominent defenders, among them David Deutsch, David Wallace and Sean Carroll.",
          "Its appeal is economy: one equation, no collapse, no special role for observers, and full determinism at the level of the whole. Its costs are as stark. There is the extravagance of endlessly branching worlds; the puzzle of what probability means if every outcome occurs; and questions about personal identity, since you are continually splitting into successors.",
          "Critics also ask whether it can be tested, since it predicts the same results as standard quantum mechanics. Defenders reply that it is simply quantum mechanics read literally, and that the burden lies on rivals that add or change something."
        ],
        prompts: ["If there is a branch where you made the other choice, does your choice still matter? Why or why not?"],
        recall: [
          { q: "Who proposed what became many worlds, and when?", a: "Hugh Everett, in 1957, as the relative state formulation." },
          { q: "Name two main objections to many worlds.", a: "The extravagance of branching worlds, and the difficulty of making sense of probability when every outcome occurs." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "Many worlds solves the measurement problem by denying single outcomes: every result occurs in some branch." },
          { to: "phys.decoherence", type: "links-to", why: "Decoherence is what separates the branches and stops them interfering, which makes many worlds workable." },
          { to: "phil.determinism", type: "links-to", why: "The universal wavefunction evolves deterministically; chance becomes uncertainty about which branch you are in." },
          { to: "phil.personal-identity", type: "links-to", why: "If you branch at every measurement, which successor is you? Philosophers' puzzles about fission become physics." },
          { to: "phil.falsification", type: "links-to", why: "Critics argue that unobservable branches make the view hard to test; defenders reply that it is tested whenever quantum mechanics is." }
        ]
      },

      {
        id: "phys.pilot-wave", kind: "interpretation", title: "Pilot wave theory (de Broglie Bohm)", status: "interpretation",
        line: "Particles always have definite positions, guided by a real wave; the price is open nonlocality.",
        facets: { strand: ["interpretations"], era: ["new-quantum", "long-quiet"], philosophy: ["realism", "determinism", "locality"] },
        people: ["phys.de-broglie", "phys.bohm"],
        quote: { text: "But in 1952 I saw the impossible done.", source: "John Bell, On the impossible pilot wave (1982), in Speakable and Unspeakable in Quantum Mechanics (1987)" },
        body: [
          "In the double slit experiment, each electron goes through one slit or the other, as common sense insists. But it is accompanied by a wave that passes through both, and the wave guides the electron towards the bright bands and away from the dark ones. Average over many electrons whose exact starting points we cannot know, and you reproduce every quantum prediction.",
          "Louis de Broglie presented a version of this at the 1927 Solvay conference, met heavy criticism and dropped it. David Bohm rediscovered and completed it in 1952, including a full account of measurement. John Bell, who had been taught that such hidden variable theories were impossible, wrote that reading Bohm showed him the impossible done.",
          "Pilot wave theory is realist and deterministic: the particles are always somewhere, and their future follows from the present. It solves the measurement problem by never needing collapse. Its cost is nonlocality, written openly into its equations: the motion of one particle can depend instantly on what is done to a distant one, though never in a way that can carry a signal. Extending it to relativity and particle creation remains hard.",
          "Bouncing oil droplets guided by their own ripples, studied since 2005, give a striking visual analogy. They are only an analogy, and later experiments did not reproduce true double slit interference with them."
        ],
        maths: [
          "dx/dt = (ħ/m) Im(∇ψ / ψ)   (the guidance equation: the wave tells the particle how to move)",
          "starting positions spread as |ψ|²   (and they stay that way: the Born rule as an equilibrium)"
        ],
        prompts: ["Pilot wave theory gives you back a definite world at the price of instant connections across space. Is that a good trade?"],
        recall: [
          { q: "In pilot wave theory, does the electron go through one slit or both?", a: "One slit; its guiding wave goes through both." },
          { q: "What is the main price of pilot wave theory?", a: "Explicit nonlocality: a particle's motion depends instantly on distant events, though no signal can be sent." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "Pilot wave theory answers the measurement problem by adding definite positions, so outcomes are always settled." },
          { to: "phys.double-slit", type: "responds-to", why: "Its picture, a particle through one slit steered by a wave through both, is a direct answer to the double slit puzzle." },
          { to: "phil.realism", type: "links-to", why: "It is the most straightforwardly realist interpretation: particles really are somewhere at all times." },
          { to: "phil.determinism", type: "links-to", why: "It restores determinism; quantum randomness becomes ignorance of exact starting positions, as in classical statistical physics." }
        ]
      },

      {
        id: "phys.qbism", kind: "interpretation", title: "QBism", status: "interpretation",
        line: "The quantum state is an agent's personal degrees of belief about what her actions will bring.",
        facets: { strand: ["interpretations"], era: ["quantum-info"], philosophy: ["knowledge", "observer", "realism"] },
        say: { text: "QBism", respell: "KYOO biz um", ipa: "ˈkjuːbɪzəm" },
        body: [
          "Before you open a letter you have expectations about what it says; when you open it your expectations update, but nothing far away changes. QBism treats the quantum state like that: not a description of the system, but a tool an agent uses to set her expectations for the results of her own actions on the world. Collapse is simply updating on new experience.",
          "The view grew from work by Carlton Caves, Christopher Fuchs and Rüdiger Schack from 2002, first called quantum Bayesianism, after the Bayesian view of probability as personal degree of belief. The physicist David Mermin became a prominent convert in 2014.",
          "On this view the measurement problem and spooky action dissolve. There is no physical collapse to explain, because nothing physical collapses, and entangled correlations are expectations held by one agent, not signals between places. The Born rule becomes a consistency rule for an agent's bets, like the rules that keep a gambler from a sure loss.",
          "Fuchs draws explicitly on the American pragmatists William James and John Dewey, seeing the world as unfinished and shaped by agents' actions; he calls the stance participatory realism. Critics reply that it says too little about what the world is like, and that it edges towards solipsism. QBists answer that the world is real; it is the quantum state that is personal."
        ],
        maths: [
          "P(outcome) = your degree of belief   (not a frequency out in the world)",
          "Born rule ≈ a consistency condition on those beliefs, like the rules that avoid a sure loss in betting"
        ],
        prompts: ["If the quantum state is your belief, what is the world like when nobody is believing anything about it?"],
        recall: [
          { q: "What is the quantum state, according to QBism?", a: "An agent's personal degrees of belief about the outcomes of her actions." },
          { q: "Which philosophical tradition does Fuchs explicitly draw on?", a: "American pragmatism, especially William James and John Dewey." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "If the quantum state is belief, collapse is just updating, and the measurement problem loses its sting." },
          { to: "phys.observer", type: "links-to", why: "QBism puts the agent who uses the theory at its centre, a modern role for the observer with no mysticism attached." },
          { to: "phil.pragmatism", type: "links-to", why: "QBism's founders cite the pragmatists: meaning lies in the consequences of action, and the world is open and still being made." },
          { to: "psy.william-james", type: "links-to", why: "Fuchs draws on William James's pluralistic, unfinished universe as a philosophical home for QBism." },
          { to: "phil.knowledge", type: "links-to", why: "QBism recasts quantum states as an agent's beliefs, making quantum theory a guide to reasoning under uncertainty." }
        ]
      },

      {
        id: "phys.objective-collapse", kind: "interpretation", title: "Objective collapse (GRW, Penrose)", status: "open",
        line: "Collapse is a real physical process: vanishingly rare for one particle, swift for large objects.",
        facets: { strand: ["interpretations"], era: ["bell-era", "quantum-info"], philosophy: ["realism", "observer", "method"] },
        body: [
          "Suppose every particle, very occasionally, is spontaneously pinned to a definite place, about once every few hundred million years. For a single electron you would never notice. But a pointer on a measuring device contains around 10²³ particles, all entangled, so one being pinned pins the lot. A superposition of the pointer in two places would collapse in a tiny fraction of a second.",
          "That is the theory Giancarlo Ghirardi, Alberto Rimini and Tullio Weber published in 1986, known as GRW. Roger Penrose and Lajos Diósi proposed a related idea in which gravity triggers the collapse: superpositions of different arrangements of mass are unstable and decay.",
          "Strictly these are not interpretations but rival theories, because they change the Schrödinger equation and make slightly different predictions. That makes them testable. In 2020 an experiment deep under the Gran Sasso mountain in Italy looked for faint radiation that the simplest Diósi Penrose model predicts, found none, and ruled that version out. Other versions remain alive and are being probed with ever larger superpositions.",
          "Collapse here needs no observer and no mind. Penrose separately speculates that such collapses might play a part in producing consciousness, a minority hypothesis that should not be confused with the claim that minds cause collapse."
        ],
        maths: [
          "λ ≈ 10⁻¹⁶ per second per particle   (GRW: one hit every few hundred million years)",
          "N ≈ 10²³ particles → collapse in about 10⁻⁷ s"
        ],
        prompts: ["Would you prefer an interpretation that could be proved wrong next year, or one that never can be? Why?"],
        recall: [
          { q: "Why are collapse theories strictly rival theories rather than interpretations?", a: "They modify the Schrödinger equation and make slightly different, testable predictions." },
          { q: "What did the 2020 Gran Sasso experiment show?", a: "It ruled out the simplest version of the Diósi Penrose gravitational collapse model." }
        ],
        links: [
          { to: "phys.collapse", type: "responds-to", why: "It turns the textbook collapse rule into a definite physical law with its own rate and size." },
          { to: "phys.measurement-problem", type: "responds-to", why: "It solves the measurement problem by modifying the Schrödinger equation so that single outcomes arise naturally." },
          { to: "phys.consciousness-collapse", type: "contrasts", why: "Collapse happens whether or not anyone is aware of it; Penrose's separate speculation about consciousness runs in the opposite direction." },
          { to: "phil.falsification", type: "links-to", why: "Unlike most interpretations it sticks its neck out, and one version has already been refuted, a textbook Popperian virtue." }
        ]
      },

      {
        id: "phys.relational", kind: "interpretation", title: "Relational quantum mechanics", status: "interpretation",
        line: "Properties exist only relative to other systems; there is no view from nowhere.",
        facets: { strand: ["interpretations"], era: ["bell-era", "quantum-info"], philosophy: ["realism", "observer", "knowledge"] },
        body: [
          "Think of speed. A passenger on a train is still relative to her seat and moving fast relative to the fields outside; asking for her speed full stop is meaningless. Carlo Rovelli proposed in 1996 that all quantum properties are like this. An electron has a spin value relative to the device that interacted with it, and perhaps none relative to you, who have not.",
          "In relational quantum mechanics there are no special observers. Any physical system, a photon, a rock or a person, can serve as the reference for another's properties. Wigner and his friend can both be right: the result is a fact relative to the friend and not yet relative to Wigner. The world becomes a web of interactions rather than a collection of things with properties of their own.",
          "Critics ask how different perspectives fit together, and whether an account without absolute facts can explain why scientists agree. In 2023 Rovelli and Emily Adlam added a postulate ensuring that perspectives link up consistently when systems compare notes.",
          "In his book Helgoland (2020), Rovelli describes finding the idea that nothing has intrinsic existence in Nagarjuna, the Buddhist philosopher of around the second century. He presents this as a resonance that helped him think, not as evidence, and it is best read that way."
        ],
        prompts: ["Is a world made only of relations still a world? What would be lost if nothing had properties of its own?"],
        recall: [
          { q: "What does relational quantum mechanics say about properties?", a: "They exist only relative to other systems; there is no observer independent state." },
          { q: "Who counts as an observer in relational quantum mechanics?", a: "Any physical system at all." }
        ],
        links: [
          { to: "phys.observer", type: "responds-to", why: "Relational quantum mechanics answers the observer question by making every physical system an observer." },
          { to: "phys.measurement-problem", type: "responds-to", why: "Outcomes are real but relative, so there is no single moment of collapse to explain." },
          { to: "phil.no-self", type: "links-to", why: "Rovelli himself connects the view with Nagarjuna's teaching that nothing has intrinsic existence, a cousin of the Buddhist no self idea; a resonance, not proof." },
          { to: "phil.realism", type: "contrasts", why: "It rejects observer independent facts while staying realist about relations, a path between realism and its rivals." }
        ]
      },

      {
        id: "phys.consciousness-collapse", kind: "interpretation", title: "Consciousness causes collapse", status: "interpretation",
        line: "The minority view that a conscious mind, not a detector, makes a quantum outcome definite.",
        facets: { strand: ["interpretations"], era: ["new-quantum", "long-quiet"], philosophy: ["observer", "realism"] },
        body: [
          "Follow a measurement inwards: the particle hits a detector, the detector moves a pointer, light from the pointer enters an eye, the retina signals the brain. Each step is made of atoms, so each can be described by the Schrödinger equation, and the superposition simply passes along the chain. Where does it stop?",
          "John von Neumann showed in 1932 that the cut can be placed anywhere along this chain without changing any prediction, and noted that the chain ends, finally, with the observer's abstract ego. Fritz London and Edmond Bauer in 1939, and Eugene Wigner in 1961, drew the bold conclusion that consciousness is what collapses the wavefunction.",
          "The view faced hard questions. Did the universe wait in superposition until the first conscious creature evolved? What counts as conscious? How could a nonphysical mind act on matter without breaking physics everywhere else? Wigner himself gave the view up in later life, persuaded partly by work on decoherence. Today very few physicists hold it, and no experiment supports it.",
          "It is nevertheless the historical seed of much popular quantum mysticism, which takes a cautious minority proposal by physicists and stretches it into claims that thoughts shape reality."
        ],
        prompts: ["If minds collapse wavefunctions, what was the universe doing before there were minds?"],
        recall: [
          { q: "Who championed the idea that consciousness causes collapse?", a: "Fritz London and Edmond Bauer in 1939, and Eugene Wigner in 1961, building on von Neumann." },
          { q: "Is there experimental support for consciousness causing collapse?", a: "No; inanimate detectors suffice to destroy interference, and very few physicists hold the view." }
        ],
        links: [
          { to: "phys.measurement-problem", type: "responds-to", why: "It answers the question of where the chain of measurement ends by placing the end in the mind." },
          { to: "psy.consciousness", type: "links-to", why: "The view gives consciousness a physical job, which no psychological or neural theory of consciousness supports." },
          { to: "phil.mind-body", type: "links-to", why: "It is a form of interactionist dualism: a nonphysical mind changing physical states." },
          { to: "phil.consciousness", type: "links-to", why: "It ties the hard problem of consciousness to the measurement problem, two deep puzzles that may or may not be related." },
          { to: "phil.descartes", type: "links-to", why: "Like Descartes's mind acting on the body, it faces the old question of how something nonphysical can push physical things." }
        ]
      },

      /* ---------- Physicists ---------- */

      {
        id: "phys.planck", kind: "physicist", title: "Max Planck", status: "settled",
        life: "1858 to 1947", place: "Kiel and Berlin, Germany",
        line: "The reluctant revolutionary who introduced the quantum in 1900 to rescue a formula.",
        facets: { strand: ["people"], era: ["old-quantum"], philosophy: ["method"] },
        quote: { text: "A new scientific truth does not triumph by convincing its opponents and making them see the light, but rather because its opponents eventually die, and a new generation grows up that is familiar with it.", source: "Max Planck, Scientific Autobiography and Other Papers (1950); the popular version, science advances one funeral at a time, is a paraphrase" },
        body: [
          "Max Planck was a conservative, careful physicist who did not set out to overturn anything. In 1900, working in Berlin on how hot objects glow, he found a formula that matched new measurements perfectly. To derive it he had to assume that energy is exchanged in discrete amounts, E = h f. In a 1931 letter he described the step as an act of desperation.",
          "Historians, notably Thomas Kuhn, have argued that Planck did not at first think of the quantum as a real physical discontinuity at all; it was Einstein and others who took it literally. Planck accepted its full implications only slowly, and for years he resisted Einstein's light quanta.",
          "He received the Nobel Prize in 1918 and became the elder statesman of German science. His later years were marked by tragedy. He stayed in Germany under the Nazis, met Hitler in 1933 to speak up for Jewish colleagues without success, and lost his son Erwin, executed in 1945 for his part in the July 1944 plot against Hitler. Germany's leading research society now bears Planck's name."
        ],
        prompts: ["Planck changed physics while trying to conserve it. Do revolutions often begin with people who did not want one?"],
        recall: [
          { q: "What did Planck call his quantum assumption, looking back in 1931?", a: "An act of desperation." },
          { q: "What did Kuhn argue about Planck's quantum?", a: "That Planck did not at first see it as a real physical discontinuity; others took it literally." }
        ],
        links: [
          { to: "phys.blackbody", type: "influenced", why: "Planck's formula for blackbody glow, and the quantum assumption behind it, began quantum theory." },
          { to: "phys.einstein", type: "contrasts", why: "Planck treated the quantum as a feature of emission; Einstein insisted light itself was quantised, which Planck long resisted." },
          { to: "phil.paradigm", type: "links-to", why: "Kuhn wrote a whole book on Planck's quantum, and the quantum revolution is a model case of his idea that science changes through revolutions, not steady accumulation." }
        ]
      },

      {
        id: "phys.einstein", kind: "physicist", title: "Albert Einstein", status: "settled",
        life: "1879 to 1955", place: "Bern, Berlin and Princeton",
        line: "A founder of quantum theory who became its most searching critic.",
        facets: { strand: ["people"], era: ["old-quantum", "new-quantum"], philosophy: ["realism", "determinism", "locality"] },
        quote: { text: "Quantum mechanics is certainly imposing. But an inner voice tells me that it is not yet the real thing. The theory says a lot, but does not really bring us any closer to the secret of the 'old one'. I, at any rate, am convinced that He is not playing at dice.", source: "Letter to Max Born, 4 December 1926, in The Born Einstein Letters (1971); the popular line God does not play dice is a paraphrase" },
        body: [
          "Einstein is remembered for relativity, but his Nobel Prize was for quantum physics. In 1905 he proposed that light comes in quanta, explaining the photoelectric effect. In 1907 he applied quanta to the heat of solids, and in 1916 and 1917 he described stimulated emission, the principle behind the laser. Few people did more to create the quantum.",
          "He could not accept where it went. Einstein objected less to chance as such than to the claim that quantum mechanics was a complete description of reality. He wanted a physics in which things far apart have their own real states, whether or not anyone observes them. The 1935 EPR paper made this case, and his letters with Bohr, Born and Schrödinger record a long, warm and stubborn disagreement.",
          "The physicist Abraham Pais recalled Einstein stopping on a walk to ask whether he really believed the moon exists only when he looks at it. Bell's theorem and the experiments that followed showed that the kind of local reality Einstein hoped for cannot be had. Yet his questions, once dismissed as an old man's stubbornness, turned out to be among the deepest in the subject.",
          "Einstein credited the philosopher David Hume, and the physicist Ernst Mach, with helping him question absolute time. In religion he said he believed in Spinoza's God, revealed in the lawful order of nature."
        ],
        prompts: ["Einstein lost the argument about locality but won the argument that the questions mattered. Which matters more?"],
        recall: [
          { q: "What did Einstein's Nobel Prize recognise?", a: "His law of the photoelectric effect, not relativity." },
          { q: "What was Einstein's deepest objection to quantum mechanics?", a: "That it was incomplete: it failed to describe a reality with separate, local real states independent of observation." }
        ],
        links: [
          { to: "phys.photoelectric", type: "influenced", why: "His 1905 explanation of the photoelectric effect introduced light quanta and won him the Nobel Prize." },
          { to: "phys.epr", type: "influenced", why: "EPR was Einstein's sharpest public argument that quantum mechanics leaves something out." },
          { to: "phys.bohr", type: "contrasts", why: "The Bohr Einstein debates, from 1927 onwards, are the great dialogue over whether quantum theory is complete." },
          { to: "phil.realism", type: "links-to", why: "Einstein was a realist: physics should describe a world that exists whether or not anyone observes it." },
          { to: "phil.spinoza", type: "links-to", why: "Einstein said he believed in Spinoza's God, an impersonal lawful order of nature, which helps explain his discomfort with chance." },
          { to: "phil.hume", type: "links-to", why: "Einstein credited reading Hume with helping him doubt the absolute time that relativity overturned." }
        ]
      },

      {
        id: "phys.bohr", kind: "physicist", title: "Niels Bohr", status: "settled",
        life: "1885 to 1962", place: "Copenhagen, Denmark",
        say: { text: "Bohr", respell: "BOR", ipa: "bɔːr" },
        line: "Architect of the quantum atom and of complementarity, and convener of a generation.",
        facets: { strand: ["people"], era: ["old-quantum", "new-quantum"], philosophy: ["knowledge", "observer"] },
        body: [
          "In 1913, building on Rutherford's picture of an atom as a tiny nucleus orbited by electrons, Niels Bohr made a bold move. He declared that electrons can occupy only certain orbits and jump between them, emitting light carrying exactly the energy difference. It was half classical and half something new, but it explained the spectrum of hydrogen and won him the Nobel Prize in 1922.",
          "His institute in Copenhagen, opened in 1921, became the meeting place of a generation: Heisenberg, Pauli, Dirac and many others passed through. Bohr worked by talking and endlessly revising, and his conversations with Einstein from 1927 onwards are the great debate of twentieth century physics. His reply to the EPR paper in 1935 set the orthodox answer for decades.",
          "His philosophy centred on complementarity and on the claim that experiments must be described in classical terms. His assistant Aage Petersen later recalled him saying that physics concerns what we can say about nature, not how nature is. That is a recollection rather than something Bohr wrote, but it captures his outlook.",
          "In 1943, at risk in occupied Denmark because his mother was Jewish, he escaped by boat to Sweden and went on to Britain and the United States. He spent his later years arguing for openness about nuclear weapons. His son Aage also won a Nobel Prize."
        ],
        prompts: ["Bohr thought best out loud, in dialogue. What kinds of thinking need another person?"],
        recall: [
          { q: "What did Bohr's 1913 atom explain?", a: "The sharp spectral lines of hydrogen, as electrons jumping between allowed orbits." },
          { q: "What was Bohr's central philosophical idea about quantum physics?", a: "Complementarity." }
        ],
        links: [
          { to: "phys.spectra", type: "influenced", why: "Explaining hydrogen's spectral lines was the triumph of Bohr's atom." },
          { to: "phys.quantum-leap", type: "influenced", why: "Bohr's 1913 atom introduced the idea of electrons jumping between fixed levels." },
          { to: "phys.complementarity", type: "influenced", why: "Complementarity was Bohr's central philosophical contribution, first presented at Como in 1927." },
          { to: "phys.epr", type: "responds-to", why: "Bohr's 1935 reply to EPR, under the same title, defended the completeness of quantum mechanics." },
          { to: "psy.william-james", type: "links-to", why: "Bohr told Thomas Kuhn in 1962 that he had admired William James, and historians have traced echoes of James's stream of thought in complementarity." }
        ]
      },

      {
        id: "phys.de-broglie", kind: "physicist", title: "Louis de Broglie", status: "settled",
        life: "1892 to 1987", place: "Paris, France",
        say: { text: "de Broglie", respell: "duh BROY", ipa: "də bʁɔj" },
        line: "The aristocrat who proposed in 1924 that matter, too, has a wavelength.",
        facets: { strand: ["people"], era: ["old-quantum", "new-quantum"], philosophy: ["realism"] },
        body: [
          "Louis de Broglie came from a French ducal family and studied history before turning to physics, encouraged by his older brother Maurice, an experimental physicist who worked on X rays. In his 1924 doctoral thesis he proposed a symmetry: if light waves have particle properties, perhaps particles such as electrons have wave properties, with a wavelength set by their momentum.",
          "His examiners in Paris were unsure what to make of it, and Paul Langevin sent a copy to Einstein, who backed it warmly. Within three years electron diffraction confirmed the idea, and de Broglie received the Nobel Prize in 1929. Schrödinger built his wave equation directly on de Broglie's waves.",
          "At the 1927 Solvay conference de Broglie presented an early pilot wave theory, in which a real wave guides a real particle. Criticised, notably by Pauli, he abandoned it for the orthodox view, and returned to it only after Bohm revived it in 1952. He later inherited the family title of duke.",
          "His name is often mispronounced in English. The usual French pronunciation is close to duh BROY."
        ],
        prompts: ["De Broglie's key idea came from a sense of symmetry rather than an experiment. How far should beauty guide a scientist?"],
        recall: [
          { q: "What did de Broglie propose in his 1924 thesis?", a: "That particles such as electrons have a wavelength set by their momentum." },
          { q: "What theory did de Broglie present in 1927 and then abandon?", a: "An early pilot wave theory, later revived by Bohm." }
        ],
        links: [
          { to: "phys.wave-particle", type: "influenced", why: "De Broglie extended wave particle duality from light to all matter." },
          { to: "phys.davisson-germer", type: "leads-to", why: "His prediction of electron waves was confirmed by Davisson and Germer, and by G. P. Thomson, in 1927." },
          { to: "phys.pilot-wave", type: "influenced", why: "He proposed the first pilot wave theory in 1927, the ancestor of Bohm's version." },
          { to: "phys.schrodinger", type: "influenced", why: "Schrödinger's wave equation started from de Broglie's matter waves." }
        ]
      },

      {
        id: "phys.heisenberg", kind: "physicist", title: "Werner Heisenberg", status: "settled",
        life: "1901 to 1976", place: "Göttingen, Leipzig and Munich, Germany",
        say: { text: "Heisenberg", respell: "HY zen berk", ipa: "ˈhaɪzn̩bɛʁk" },
        line: "Created matrix mechanics at 23 and the uncertainty principle at 25; his wartime role is still debated.",
        facets: { strand: ["people"], era: ["new-quantum"], philosophy: ["knowledge", "determinism"] },
        quote: { text: "What we observe is not nature itself, but nature exposed to our method of questioning.", source: "Werner Heisenberg, Physics and Philosophy (1958), chapter 3" },
        body: [
          "In June 1925, recovering from hay fever on the bare North Sea island of Heligoland, Werner Heisenberg found a new way to do atomic physics. Drop pictures of electron orbits, which no one can observe, and work only with quantities that can be measured, such as the frequencies and brightness of spectral lines. Born recognised the strange multiplication rules he used as matrices, and with Pascual Jordan they built matrix mechanics, the first complete quantum mechanics.",
          "In 1927 he published the uncertainty principle, and he received the Nobel Prize for 1932. Heisenberg read Plato as a schoolboy and later argued that the deepest building blocks of matter resemble mathematical forms more than tiny things. In Physics and Philosophy he revived Aristotle's notion of potentiality to describe the quantum state.",
          "His record under the Nazis is contested. He stayed in Germany and was a leading figure in a wartime nuclear research programme that never came close to a bomb. Whether that was through lack of resources, mistakes or reluctance is still argued, and his 1941 visit to Bohr in occupied Copenhagen became the subject of Michael Frayn's play Copenhagen (1998)."
        ],
        prompts: ["Heisenberg built a theory from what can be observed, then argued nature is mathematical form. Are those two instincts in tension?"],
        recall: [
          { q: "What was Heisenberg's guiding rule in 1925?", a: "Build the theory only from observable quantities, not unobservable orbits." },
          { q: "Which ancient philosopher's idea of potentiality did Heisenberg revive for the quantum state?", a: "Aristotle's." }
        ],
        links: [
          { to: "phys.uncertainty", type: "influenced", why: "Heisenberg formulated the uncertainty principle in 1927." },
          { to: "phys.copenhagen", type: "influenced", why: "Heisenberg named and popularised the Copenhagen interpretation, giving it his own emphasis on potentiality." },
          { to: "phil.plato", type: "links-to", why: "Heisenberg saw in Plato's mathematical forms a better guide to elementary particles than the little atoms of Democritus." },
          { to: "phil.aristotle", type: "links-to", why: "He compared the quantum state to Aristotle's potentiality: a tendency that becomes actual when measured." },
          { to: "phil.empiricism", type: "links-to", why: "His 1925 rule, build theory only from observable quantities, owes much to the empiricist and positivist ideals of his time." }
        ]
      },

      {
        id: "phys.schrodinger", kind: "physicist", title: "Erwin Schrödinger", status: "settled",
        life: "1887 to 1961", place: "Vienna, Zurich, Berlin and Dublin",
        say: { text: "Schrödinger", respell: "SHRER ding er", ipa: "ˈʃʁøːdɪŋɐ" },
        line: "Wrote quantum theory's central equation, then spent decades doubting what it implied.",
        facets: { strand: ["people"], era: ["new-quantum", "long-quiet"], philosophy: ["realism", "observer"] },
        body: [
          "Over the winter of 1925 to 1926, during an Alpine holiday and back in Zurich, Erwin Schrödinger produced the wave equation that bears his name, in a burst of papers that gave physicists a quantum mechanics they could picture and calculate with. He soon showed it was equivalent to Heisenberg's matrix mechanics. He shared the 1933 Nobel Prize with Dirac.",
          "Schrödinger hoped his waves were real, smeared out matter. Born's probability reading disappointed him, and he became, with Einstein, a critic of the orthodox view. In 1935 he named entanglement and invented the cat to show how strange the theory became if taken as complete.",
          "He left Germany in 1933 in protest at the Nazis and eventually settled in Dublin, at an institute created with him in mind by Éamon de Valera. His 1944 book What Is Life? asked how genes could store information and inspired several founders of molecular biology. Drawn to the Vedanta tradition of Indian philosophy, he argued in Mind and Matter (1958) that consciousness is fundamentally one.",
          "His private life is now viewed critically. His own diaries record his pursuit of teenage girls, and in 2021 Trinity College Dublin renamed a lecture theatre that had borne his name."
        ],
        prompts: ["Schrödinger's equation outlived his interpretation of it. Does an author own the meaning of what he discovers?"],
        recall: [
          { q: "When did Schrödinger produce his wave equation?", a: "Over the winter of 1925 to 1926, published in 1926." },
          { q: "What two things did Schrödinger name or invent in 1935?", a: "The word entanglement, and the cat thought experiment." }
        ],
        links: [
          { to: "phys.wavefunction", type: "influenced", why: "Schrödinger's 1926 equation tells us how the wavefunction changes in time." },
          { to: "phys.schrodinger-cat", type: "influenced", why: "He invented the cat in 1935 as a reductio of taking the wavefunction as complete." },
          { to: "phys.entanglement", type: "influenced", why: "He named entanglement and called it the characteristic trait of quantum mechanics." },
          { to: "phys.quantum-leap", type: "contrasts", why: "Schrödinger disliked quantum jumps all his life and argued in 1952 that they do not exist." },
          { to: "phil.consciousness", type: "links-to", why: "In Mind and Matter he argued, drawing on Vedanta, that consciousness is singular, a view shaped by his reading of Indian philosophy." }
        ]
      },

      {
        id: "phys.born", kind: "physicist", title: "Max Born", status: "settled",
        life: "1882 to 1970", place: "Göttingen, Germany and Edinburgh, Scotland",
        line: "Gave the wavefunction its meaning as probability, and taught a generation in Göttingen.",
        facets: { strand: ["people"], era: ["new-quantum"], philosophy: ["determinism"] },
        body: [
          "Max Born ran one of the great schools of theoretical physics in Göttingen in the 1920s. It was Born who recognised that Heisenberg's strange arrays of numbers were matrices, and who, with Heisenberg and Pascual Jordan, developed matrix mechanics in 1925.",
          "In 1926, applying Schrödinger's new equation to collisions, he proposed that the wave gives the probability of finding a particle, not the spread of its matter. At the proof stage he added a footnote correcting this to the square of the wave. That reading, now the Born rule, earned him the Nobel Prize only in 1954, long after it had become standard.",
          "Being Jewish, he was forced from his post in 1933, and after time in Cambridge settled in Edinburgh, where he taught until 1953. His decades of letters with Einstein, published in 1971, record their friendship and their disagreement about chance in physics; one of them contains Einstein's remark about dice.",
          "In 1955 Born was among the eleven signatories of the manifesto drafted by Bertrand Russell and signed by Einstein, warning against nuclear war."
        ],
        prompts: ["Born's rule took nearly thirty years to win a Nobel Prize. Why are interpretive ideas often recognised late?"],
        recall: [
          { q: "What did Born propose in 1926?", a: "That the squared wavefunction gives the probability of finding a particle." },
          { q: "When did Born receive the Nobel Prize for this?", a: "1954." }
        ],
        links: [
          { to: "phys.born-rule", type: "influenced", why: "Born proposed in 1926 that the squared wavefunction gives probabilities." },
          { to: "phys.heisenberg", type: "influenced", why: "Born turned Heisenberg's insight into matrix mechanics and guided his early work." },
          { to: "phys.einstein", type: "links-to", why: "Their long friendship and correspondence preserved Einstein's objections to quantum chance." },
          { to: "phil.determinism", type: "contrasts", why: "Born accepted that quantum laws govern probabilities, not individual events, a clean break with classical determinism." }
        ]
      },

      {
        id: "phys.pauli", kind: "physicist", title: "Wolfgang Pauli", status: "settled",
        life: "1900 to 1958", place: "Vienna, Hamburg and Zurich",
        say: { text: "Pauli", respell: "POW lee", ipa: "ˈpaʊli" },
        line: "The exclusion principle, the neutrino and a famously sharp tongue; also Jung's collaborator.",
        facets: { strand: ["people"], era: ["new-quantum", "long-quiet"], philosophy: ["knowledge"] },
        body: [
          "Wolfgang Pauli wrote an authoritative survey of relativity at 21 that Einstein admired. In 1925 he stated the exclusion principle, which explains the structure of atoms and the periodic table, and for which he received the Nobel Prize in 1945. In 1930, to save the conservation of energy in radioactive decay, he proposed an unseen particle, now called the neutrino, detected only in 1956.",
          "He was the conscience of the founders, demanding rigour and dismissing loose ideas so sharply that colleagues both feared and sought his judgement. Many of his ideas appear in letters rather than papers. A running joke, the Pauli effect, held that experiments broke down when he walked into a laboratory.",
          "In 1932, after a personal crisis, Pauli consulted Carl Jung. Jung studied hundreds of Pauli's dreams, and the two corresponded for decades about the relation between mind and matter. In 1952 they published a joint book, pairing Jung's essay on synchronicity with Pauli's on the archetypal ideas behind Kepler's science. It is a curious chapter, revealing a physicist who refused to treat the psyche as irrelevant to physics."
        ],
        prompts: ["Why might one of the most rigorous physicists of his age have been drawn to Jung?"],
        recall: [
          { q: "What did Pauli propose in 1930?", a: "The neutrino, to save energy conservation in radioactive decay." },
          { q: "With which psychologist did Pauli publish a joint book in 1952?", a: "Carl Jung." }
        ],
        links: [
          { to: "phys.pauli-exclusion", type: "influenced", why: "Pauli stated the exclusion principle in 1925." },
          { to: "phys.spin", type: "influenced", why: "Pauli first doubted electron spin, then gave it its mathematical form with his spin matrices in 1927." },
          { to: "phys.pilot-wave", type: "contrasts", why: "Pauli's criticism at the 1927 Solvay conference helped persuade de Broglie to abandon his pilot wave theory." },
          { to: "psy.jung", type: "links-to", why: "Pauli and Jung corresponded for decades and published a joint book in 1952 on synchronicity and the archetypes behind science." }
        ]
      },

      {
        id: "phys.dirac", kind: "physicist", title: "Paul Dirac", status: "settled",
        life: "1902 to 1984", place: "Bristol and Cambridge, England",
        say: { text: "Dirac", respell: "dih RAK", ipa: "dɪˈræk" },
        line: "Joined quantum theory with relativity and predicted antimatter from the beauty of an equation.",
        facets: { strand: ["people"], era: ["new-quantum"], philosophy: ["method"] },
        body: [
          "Paul Dirac was famously silent, literal and precise; Cambridge colleagues joked about a unit of speech, the dirac, of one word per hour. His mathematics was anything but quiet. In 1928 he found an equation for the electron consistent with Einstein's special relativity. Spin fell out of it naturally, and so did something unexpected: solutions that seemed to describe electrons with negative energy.",
          "Dirac eventually interpreted these as a new particle with the electron's mass and the opposite charge. Carl Anderson found the positron in 1932, and Dirac shared the 1933 Nobel Prize with Schrödinger.",
          "He also quantised the electromagnetic field in 1927, starting quantum field theory, and wrote The Principles of Quantum Mechanics (1930), which set out the theory in the abstract form still taught today and used polarised photons to introduce superposition. Dirac believed that physical laws should have mathematical beauty, and that a beautiful equation was more likely to be true."
        ],
        prompts: ["Dirac trusted beauty and found antimatter. Can you think of a case where beauty misled science?"],
        recall: [
          { q: "What did Dirac's 1928 equation predict?", a: "The positron, the electron's antimatter partner, as well as explaining spin." },
          { q: "Which textbook by Dirac shaped how quantum mechanics is still taught?", a: "The Principles of Quantum Mechanics (1930)." }
        ],
        links: [
          { to: "phys.quantum-field", type: "influenced", why: "Dirac quantised the electromagnetic field and predicted antimatter, founding quantum field theory." },
          { to: "phys.spin", type: "links-to", why: "His relativistic equation explained why the electron must have spin." },
          { to: "phys.polarisation", type: "links-to", why: "He introduced quantum superposition to his readers through the behaviour of single polarised photons." }
        ]
      },

      {
        id: "phys.feynman", kind: "physicist", title: "Richard Feynman", status: "settled",
        life: "1918 to 1988", place: "New York, Cornell and Caltech",
        line: "Made quantum electrodynamics usable, and said nobody understands quantum mechanics.",
        facets: { strand: ["people"], era: ["long-quiet", "bell-era"], philosophy: ["knowledge"] },
        quote: { text: "I think I can safely say that nobody understands quantum mechanics.", source: "Richard Feynman, The Character of Physical Law (1965), lecture 6" },
        body: [
          "Richard Feynman grew up in New York, worked on the atomic bomb at Los Alamos as a young man, and in the late 1940s found a new way to calculate in quantum electrodynamics. His diagrams, simple pictures of particles exchanging photons, turned fearsome calculations into bookkeeping. He shared the 1965 Nobel Prize with Julian Schwinger and Shinichiro Tomonaga.",
          "His path integral offers a vivid recipe: to find the chance of a particle getting from A to B, give every possible path an arrow, an amplitude, and add all the arrows. Paths near the straight line reinforce one another and the rest largely cancel, which is why light seems to travel in straight lines. His short book QED (1985) explains this without equations.",
          "He was a legendary teacher. His Lectures on Physics open their quantum volume with the double slit. In 1981 he argued that only a quantum computer could efficiently simulate nature, and in 1986 he exposed the cause of the Challenger disaster with a glass of iced water and a rubber seal.",
          "Feynman was impatient with the philosophy of physics, yet his frankness about not understanding quantum mechanics has encouraged generations to keep asking."
        ],
        prompts: ["Feynman could calculate with quantum mechanics better than almost anyone, yet said nobody understands it. What is the difference between using a theory and understanding it?"],
        recall: [
          { q: "What is Feynman's path integral recipe, in words?", a: "Give every possible path an amplitude, an arrow, and add all the arrows to find the chance of getting from A to B." },
          { q: "What did Feynman propose in 1981?", a: "That simulating nature efficiently would need a quantum computer." }
        ],
        links: [
          { to: "phys.quantum-field", type: "influenced", why: "Feynman's diagrams and methods made quantum electrodynamics the most precisely tested theory in physics." },
          { to: "phys.double-slit", type: "links-to", why: "Feynman called the double slit the only mystery of quantum mechanics and built his teaching around it." },
          { to: "phys.quantum-computing", type: "influenced", why: "His 1981 talk on simulating physics with computers launched the idea of quantum computing." }
        ]
      },

      {
        id: "phys.john-bell", kind: "physicist", title: "John Stewart Bell", status: "settled",
        life: "1928 to 1990", place: "Belfast and CERN, Geneva",
        line: "The Belfast physicist who turned a philosophical quarrel into an experimental question.",
        facets: { strand: ["people"], era: ["bell-era"], philosophy: ["realism", "locality", "determinism"] },
        body: [
          "John Bell grew up in a working class family in Belfast and spent most of his career at CERN, working on particle accelerators and particle theory. He pursued the foundations of quantum mechanics largely on the side. In 1964, on leave in the United States, he published a short paper that changed the subject.",
          "He had been struck by Bohm's pilot wave theory, which showed that hidden variables were possible after all, despite a famous proof by John von Neumann that had been widely misread as ruling them out. But Bohm's theory was nonlocal. Bell asked whether every such theory had to be, and proved that any theory reproducing quantum predictions must be. His inequality made this testable.",
          "Bell was a lucid and witty enemy of vagueness. In his 1990 essay Against measurement he asked whether the wavefunction of the world had waited billions of years for a single celled creature to appear, or for an observer with a PhD. He wanted physics stated in terms of beables, things that exist, rather than observables.",
          "He died suddenly in 1990, aged 62, reportedly while nominated for a Nobel Prize. The prize went in 2022 to experimenters who had tested his idea."
        ],
        prompts: ["Bell made a question everyone called philosophy into one an experiment could answer. Can you think of a question in your own life that might be made testable?"],
        recall: [
          { q: "What did Bell prove in 1964?", a: "That no local hidden variable theory can reproduce all the predictions of quantum mechanics." },
          { q: "What did Bell want physics to talk about instead of observables?", a: "Beables: things that exist." }
        ],
        links: [
          { to: "phys.bell", type: "influenced", why: "Bell proved his theorem in 1964, showing that no local hidden variable theory can match quantum mechanics." },
          { to: "phys.bohm", type: "links-to", why: "Reading Bohm's 1952 papers set Bell on the path to his theorem." },
          { to: "phys.measurement-problem", type: "links-to", why: "Bell's essay Against measurement remains the sharpest statement of why the problem is real." },
          { to: "phil.realism", type: "links-to", why: "Bell was an unapologetic realist who wanted physics to say what exists, his beables, not only what is observed." },
          { to: "phil.free-will", type: "links-to", why: "Bell noted that his theorem assumes experimenters choose their settings freely, and said in a 1985 interview that escaping it that way means a universe without free will." }
        ]
      },

      {
        id: "phys.everett", kind: "physicist", title: "Hugh Everett", status: "settled",
        life: "1930 to 1982", place: "Princeton and Washington, United States",
        say: { text: "Everett", respell: "EV er it", ipa: "ˈɛvərɪt" },
        line: "The graduate student who proposed that the wavefunction never collapses, then left physics.",
        facets: { strand: ["people"], era: ["long-quiet"], philosophy: ["determinism", "realism"] },
        body: [
          "Hugh Everett wrote his doctoral thesis at Princeton under John Wheeler, and in 1957 published its core as the relative state formulation of quantum mechanics. His proposal was radical in its simplicity: apply the Schrödinger equation to everything, observers included, and never add collapse.",
          "Wheeler, enthusiastic but anxious about Bohr's reaction, pressed him to cut and soften the thesis. In 1959 Everett visited Copenhagen to discuss it with Bohr; the meeting went badly, and the Copenhagen circle dismissed the idea. By then Everett had already left academic physics for military operations research for the Pentagon, applying game theory and computer modelling.",
          "His idea was revived from 1970 by Bryce DeWitt, who named it many worlds, and it later gathered a growing following among cosmologists and quantum information scientists. Everett did not live to see that. He died of a heart attack at 51. His son is Mark Oliver Everett, lead singer of the band Eels, who later made a documentary about his father's physics."
        ],
        prompts: ["Everett's idea was dismissed for a decade and is now mainstream. What makes an idea arrive too early?"],
        recall: [
          { q: "What did Everett call his 1957 proposal?", a: "The relative state formulation of quantum mechanics." },
          { q: "Who popularised Everett's idea as many worlds?", a: "Bryce DeWitt, from 1970." }
        ],
        links: [
          { to: "phys.many-worlds", type: "influenced", why: "Everett's relative state formulation is the origin of the many worlds interpretation." },
          { to: "phys.wheeler", type: "links-to", why: "Wheeler supervised Everett's thesis and both championed and tempered it." },
          { to: "phys.bohr", type: "contrasts", why: "Everett's 1959 visit to Bohr marked the collision between his universal wavefunction and Copenhagen's classical observers." }
        ]
      },

      {
        id: "phys.bohm", kind: "physicist", title: "David Bohm", status: "settled",
        life: "1917 to 1992", place: "Pennsylvania, Princeton, São Paulo and London",
        line: "Revived the pilot wave and, exiled for his politics, turned to wholeness and dialogue.",
        facets: { strand: ["people"], era: ["long-quiet"], philosophy: ["realism", "determinism", "locality"] },
        body: [
          "David Bohm studied under Robert Oppenheimer at Berkeley and became a rising star at Princeton, where Einstein admired his 1951 textbook on quantum theory. That book gave the cleanest version of the EPR scenario, using the spins of two particles, the form in which Bell would later analyse it.",
          "In 1949 he refused to testify about colleagues before a congressional committee hunting communists. He was arrested and later acquitted, but Princeton did not renew his post, and in 1951 he left for Brazil, where the United States took away his passport. In 1952 he published the two papers reviving and completing de Broglie's pilot wave theory. Most physicists ignored or dismissed them.",
          "Bohm settled at Birkbeck College in London. His later work explored what he called the implicate order, a view of reality as an undivided whole, and he held long dialogues with the Indian teacher Jiddu Krishnamurti. That later philosophy is speculative and should be kept apart from his pilot wave theory, which is precise physics with the same predictions as standard quantum mechanics."
        ],
        prompts: ["Bohm's best physics was ignored partly because of politics and fashion. How much does who says something shape whether it is heard?"],
        recall: [
          { q: "What did Bohm publish in 1952?", a: "Two papers reviving and completing the pilot wave theory." },
          { q: "Why did Bohm leave the United States?", a: "After refusing to testify about colleagues to a congressional committee, he lost his Princeton post and went to Brazil in 1951." }
        ],
        links: [
          { to: "phys.pilot-wave", type: "influenced", why: "Bohm's 1952 papers turned de Broglie's sketch into a complete, deterministic alternative to standard quantum mechanics." },
          { to: "phys.epr", type: "links-to", why: "Bohm recast the EPR argument with spins, the version used in nearly every later Bell test." },
          { to: "phys.einstein", type: "links-to", why: "Einstein valued Bohm and their discussions, though he wrote to Born that the pilot wave route seemed too cheap to him." }
        ]
      },

      {
        id: "phys.wheeler", kind: "physicist", title: "John Archibald Wheeler", status: "settled",
        life: "1911 to 2008", place: "Princeton and Austin, United States",
        line: "Teacher of Feynman and Everett, populariser of black hole, and asker of the boldest quantum questions.",
        facets: { strand: ["people"], era: ["long-quiet", "bell-era"], philosophy: ["observer", "knowledge"] },
        body: [
          "John Wheeler worked with Bohr on the theory of nuclear fission in 1939 and spent most of his career at Princeton, where his doctoral students included Richard Feynman and Hugh Everett. He had a gift for names: he popularised black hole and wormhole, and gave physics many of its most memorable phrases.",
          "In the 1970s Wheeler turned to the meaning of quantum mechanics. He proposed the delayed choice experiment, and with Wojciech Zurek edited the standard anthology of foundational papers, Quantum Theory and Measurement (1983). He pictured a participatory universe, in which acts of observation help bring a definite history into being.",
          "In 1989 he summed up a programme in the slogan it from bit: that every physical thing derives its existence from yes or no answers to questions posed by measurement. These were speculative ideas, offered as questions rather than results, and they are easy to misread as mysticism. Wheeler meant registered physical records, not minds. The ideas nonetheless helped inspire quantum information science."
        ],
        prompts: ["Wheeler preferred bold questions to safe answers. When is a slogan like it from bit useful, and when does it mislead?"],
        recall: [
          { q: "Name two of Wheeler's famous doctoral students.", a: "Richard Feynman and Hugh Everett." },
          { q: "What does it from bit claim?", a: "That physical things derive their existence from yes or no answers registered by measurement." }
        ],
        links: [
          { to: "phys.delayed-choice", type: "influenced", why: "Wheeler proposed the delayed choice experiment in 1978." },
          { to: "phys.feynman", type: "influenced", why: "Wheeler supervised Feynman's doctorate and helped shape his approach to quantum mechanics." },
          { to: "phys.observer", type: "links-to", why: "His participatory universe makes observation central to what exists, an idea that is easy to misread as mysticism." }
        ]
      },

      {
        id: "phys.zeilinger", kind: "physicist", title: "Anton Zeilinger", status: "settled",
        life: "born 1945", place: "Vienna and Innsbruck, Austria",
        say: { text: "Zeilinger", respell: "TSY ling er", ipa: "ˈtsaɪlɪŋɐ" },
        line: "Pioneer of entanglement experiments, teleportation and quantum communication; Nobel laureate 2022.",
        facets: { strand: ["people"], era: ["bell-era", "quantum-info"], philosophy: ["knowledge", "locality"] },
        body: [
          "Anton Zeilinger began with neutron interference experiments in Vienna and became one of the most inventive experimenters in quantum physics. With Daniel Greenberger and Michael Horne he found in 1989 a way to show the clash between entanglement and local realism among three particles, in principle without needing statistics at all.",
          "In 1997 his group in Innsbruck performed one of the first demonstrations of quantum teleportation, transferring the quantum state of one photon to another. In 1998 they ran a Bell test with fast random settings. In 1999 in Vienna they showed interference with fullerene molecules of sixty carbon atoms, pushing quantum behaviour towards the scale of large molecules. Later his group teleported states across 143 kilometres between two of the Canary Islands.",
          "His former student Pan Jianwei led China's Micius satellite project, and in 2017 the two groups used it to share keys for a quantum secured video call between Vienna and Beijing. Zeilinger shared the 2022 Nobel Prize with Alain Aspect and John Clauser.",
          "Philosophically he has argued that information is the fundamental concept in quantum physics, close in spirit to Wheeler's it from bit."
        ],
        prompts: ["Zeilinger turned thought experiments into working technology. Which of today's thought experiments might be tomorrow's devices?"],
        recall: [
          { q: "What did Zeilinger's group demonstrate in 1997?", a: "Quantum teleportation of a photon's state." },
          { q: "What did the 2017 Vienna to Beijing video call use?", a: "Keys distributed by the Micius quantum satellite." }
        ],
        links: [
          { to: "phys.bell-tests", type: "influenced", why: "Zeilinger's experiments closed key loopholes in Bell tests and earned him a share of the 2022 Nobel Prize." },
          { to: "phys.quantum-cryptography", type: "influenced", why: "His groups helped turn entanglement into secure communication, from fibre links to satellites." },
          { to: "phys.entanglement", type: "links-to", why: "His career has been devoted to creating, distributing and testing entanglement." },
          { to: "phys.wave-particle", type: "links-to", why: "His fullerene experiments showed wave behaviour for molecules of sixty atoms." }
        ]
      },

      /* ---------- Technology ---------- */

      {
        id: "phys.laser", kind: "technology", title: "Lasers", status: "settled",
        line: "Light amplified by stimulated emission: countless photons marching in step.",
        facets: { strand: ["technology"], era: ["old-quantum", "long-quiet"] },
        body: [
          "A supermarket barcode scanner, a fibre optic internet cable, laser eye surgery and a cat's favourite red dot all depend on light of a single pure colour, travelling in a tight beam, with all its waves in step. Ordinary bulbs make light in a jumble; lasers make it in unison.",
          "The principle comes from Einstein in 1917. An atom in a higher energy level can be nudged by a passing photon of exactly the right energy to drop down and emit a second photon identical to the first: same colour, same direction, same phase. If more atoms are in the upper level than the lower, one photon becomes two, two become four, and the light amplifies itself, bouncing between two mirrors.",
          "Charles Townes and his colleagues built the microwave version, the maser, in 1954, and Theodore Maiman made the first working laser, with a ruby crystal, in 1960. It was jokingly described at the time as a solution looking for a problem.",
          "Lasers rely on photons being bosons, happy to crowd into one state, and on atoms having sharp, quantised levels. They are quantum mechanics made visible as a beam."
        ],
        maths: [
          "stimulated emission: 1 photon in → 2 identical photons out",
          "needs population inversion: more atoms in the upper level than the lower"
        ],
        prompts: ["The laser was a solution looking for a problem. What does that suggest about funding research with no obvious use?"],
        recall: [
          { q: "What quantum process makes a laser work?", a: "Stimulated emission: a photon triggers an excited atom to emit an identical photon." },
          { q: "Who described stimulated emission, and when?", a: "Einstein, in 1917." }
        ],
        links: [
          { to: "phys.einstein", type: "links-to", why: "Einstein described stimulated emission in 1917, more than forty years before anyone built a laser." },
          { to: "phys.atomic-clock", type: "links-to", why: "The best modern atomic clocks use lasers to probe atoms with extraordinary precision." },
          { to: "phys.semiconductors", type: "links-to", why: "Most lasers today are tiny semiconductor diodes, close relatives of the LED." }
        ]
      },

      {
        id: "phys.mri", kind: "technology", title: "MRI scanners", status: "settled",
        line: "Imaging the body by listening to the spins of hydrogen nuclei in a strong magnetic field.",
        facets: { strand: ["technology"], era: ["long-quiet", "bell-era"] },
        body: [
          "Lie in an MRI scanner and you hear loud knocking while a detailed image of your brain, knee or heart builds up, without X rays. The machine is reading a quantum property: the spin of the protons at the centre of hydrogen atoms in the water and fat of your body.",
          "In a strong magnetic field, proton spins line up slightly more one way than the other and wobble at a precise frequency set by the field strength. A radio pulse tips them over; as they relax back they broadcast faint radio signals. Tissues differ in water content and in how quickly their spins relax, so the signals reveal structure. Field gradients make the frequency depend on position, so the signals can be mapped into an image.",
          "Nuclear magnetic resonance was discovered by Isidor Rabi in 1938 and extended to liquids and solids by Felix Bloch and Edward Purcell in 1946. Paul Lauterbur and Peter Mansfield turned it into imaging in the 1970s and shared the 2003 Nobel Prize in Medicine. The word nuclear was dropped from the medical name partly because patients found it alarming; nothing radioactive is involved.",
          "The strong fields usually come from superconducting magnets cooled by liquid helium, so an MRI scanner combines two quantum phenomena in one machine."
        ],
        maths: [
          "f = γ B / 2π   (the wobble frequency is proportional to the field: about 42.6 MHz per tesla for protons)"
        ],
        prompts: ["A hospital scanner rests on a property, spin, that no one can picture. Does it matter that we cannot picture what we use?"],
        recall: [
          { q: "What does an MRI scanner actually detect?", a: "Radio signals from the spins of hydrogen nuclei (protons) relaxing in a strong magnetic field." },
          { q: "Is anything radioactive involved in MRI?", a: "No; nuclear refers to atomic nuclei, not radioactivity." }
        ],
        links: [
          { to: "phys.quantisation", type: "example-of", why: "A proton spin in a magnetic field has two quantised energy levels, and MRI drives transitions between them." },
          { to: "phys.stern-gerlach", type: "links-to", why: "Rabi's magnetic resonance method grew out of the molecular beam techniques pioneered by Otto Stern." },
          { to: "phys.atomic-clock", type: "links-to", why: "Both read tiny energy gaps between quantum states by tuning radio or microwave signals to resonance." }
        ]
      },

      {
        id: "phys.semiconductors", kind: "technology", title: "Transistors, chips and LEDs", status: "settled",
        line: "The quantum theory of electrons in solids underlies every computer chip and LED.",
        facets: { strand: ["technology"], era: ["long-quiet", "bell-era"] },
        body: [
          "Your phone holds billions of transistors, each a tiny switch, and its screen and torch use light emitting diodes. None of this could have been designed without quantum mechanics.",
          "In a solid, the sharp energy levels of single atoms merge into bands, and the exclusion principle fills them from the bottom up. In a metal the top band is partly full and electrons move freely. In an insulator a wide gap sits above a full band. A semiconductor such as silicon has a small gap, so its conductivity can be controlled by adding traces of other elements and by applying voltages. That control is what a transistor does.",
          "John Bardeen and Walter Brattain built the first transistor at Bell Labs in December 1947, William Shockley soon improved on it, and the three shared the 1956 Nobel Prize. Integrated circuits followed from 1958. In an LED, electrons falling across the gap emit photons whose colour is set by the width of the gap. Red and green LEDs came first; efficient blue ones, needed for white light, arrived in the early 1990s and won Isamu Akasaki, Hiroshi Amano and Shuji Nakamura the 2014 Nobel Prize.",
          "As transistors shrink to a few nanometres, quantum effects such as tunnelling stop being only the theory behind the device and become a nuisance, leaking current where it should not flow."
        ],
        maths: [
          "E_photon ≈ E_gap   (an LED's colour is set by its band gap)",
          "silicon: gap ≈ 1.1 eV; blue LEDs (gallium nitride family): about 2.7 to 3.4 eV"
        ],
        prompts: ["Quantum theory was born from puzzles about glowing metal and ended up in your pocket. What does that suggest about the value of curiosity driven science?"],
        recall: [
          { q: "What property of silicon makes it a semiconductor?", a: "A small band gap, so its conductivity can be controlled." },
          { q: "What sets the colour of an LED?", a: "The size of its band gap." }
        ],
        links: [
          { to: "phys.quantisation", type: "example-of", why: "Energy bands and gaps are quantised atomic levels, merged and reshaped by the crystal." },
          { to: "phys.photon", type: "links-to", why: "An LED turns each electron crossing its gap into a photon of a set colour." },
          { to: "phys.quantum-computing", type: "contrasts", why: "Ordinary chips use quantum physics to build classical switches; quantum computers use quantum states themselves as the information." }
        ]
      },

      {
        id: "phys.quantum-computing", kind: "technology", title: "Quantum computing and qubits", status: "open",
        line: "Computers that use superposition, entanglement and interference to solve certain problems faster.",
        facets: { strand: ["technology"], era: ["bell-era", "quantum-info"], philosophy: ["knowledge"] },
        body: [
          "A qubit is any two level quantum system, a trapped ion, a superconducting circuit or a photon, that can be prepared in a superposition of 0 and 1. Measure it and you get a plain 0 or 1. The measurement simulation shows what that means: the odds are set by the state, and each result is a surprise.",
          "Richard Feynman suggested in 1981 that simulating quantum systems might need quantum hardware, and David Deutsch described a universal quantum computer in 1985. In 1994 Peter Shor showed that a large quantum computer could factor huge numbers quickly, which would break much of today's internet encryption.",
          "A common explanation, that a quantum computer tries every answer at once, is misleading. Reading out a superposition gives only one random result. The art is to choreograph interference so that the amplitudes for wrong answers cancel and those for right answers reinforce. That works only for problems with special structure, which is why quantum computers are not faster at everything.",
          "The physics is settled; the engineering is not. Qubits lose their quantum state through decoherence, and errors must be corrected using many physical qubits for each reliable logical one. Error correction has advanced quickly since 2023, but a large, fault tolerant machine that beats classical computers on useful problems is still a goal rather than a product."
        ],
        maths: [
          "n qubits → 2ⁿ amplitudes   (300 qubits: more amplitudes than atoms in the observable universe)",
          "readout gives n bits, not 2ⁿ numbers",
          "Grover search: about √N steps instead of N"
        ],
        prompts: ["Why might try every answer at once be such a popular, and such a misleading, description?"],
        recall: [
          { q: "Why is a quantum computer not simply trying every answer at once?", a: "Reading out gives one random result; algorithms work by arranging interference so wrong answers cancel." },
          { q: "What did Shor's 1994 algorithm show?", a: "That a large quantum computer could factor large numbers quickly, threatening common encryption." }
        ],
        links: [
          { to: "phys.entanglement", type: "links-to", why: "Entangling qubits lets a quantum computer hold correlations no classical machine can store efficiently." },
          { to: "phys.interference", type: "links-to", why: "Quantum algorithms work by arranging interference so that wrong answers cancel." },
          { to: "phys.born-rule", type: "links-to", why: "Every readout of a qubit is a Born rule draw, so algorithms are designed to make the right answer overwhelmingly likely." },
          { to: "phys.quantum-cryptography", type: "links-to", why: "Shor's algorithm threatens today's public key encryption, one reason quantum and post quantum cryptography matter." }
        ]
      },

      {
        id: "phys.quantum-cryptography", kind: "technology", title: "Quantum cryptography", status: "settled",
        line: "Sharing secret keys whose security rests on the fact that measuring a quantum state disturbs it.",
        facets: { strand: ["technology"], era: ["bell-era", "quantum-info"], philosophy: ["locality"] },
        body: [
          "Alice sends Bob single photons, each polarised in one of four ways chosen at random, and Bob measures each in one of two settings, also chosen at random. Afterwards they compare, in public, only which settings they used, keep the results where the settings matched, and so share a random secret key. If an eavesdropper had measured the photons on the way, her measurements would have disturbed some of them, and checking a sample reveals the errors.",
          "This scheme, BB84, was published by Charles Bennett and Gilles Brassard in 1984. In 1991 Artur Ekert proposed a version using entangled pairs, in which a Bell test certifies that no one else can hold the key. The security rests on physics: an unknown quantum state cannot be copied, the no cloning theorem of 1982, and measuring it disturbs it.",
          "Quantum key distribution runs today over fibre networks and, since 2017, via the Micius satellite. Practical systems have been hacked through flaws in their hardware rather than in the physics, which is why device independent versions based on Bell tests are being developed.",
          "It is different from post quantum cryptography, which uses ordinary mathematics designed to resist future quantum computers, and which is now being adopted as the main defence."
        ],
        maths: [
          "no cloning: no machine can copy an unknown quantum state",
          "BB84: about half the photons are kept; an error rate above about 11% means abort"
        ],
        prompts: ["Here the strangeness of measurement becomes a guarantee of privacy. Can you think of other cases where a limitation became a feature?"],
        recall: [
          { q: "Why does an eavesdropper on BB84 get caught?", a: "Measuring the photons disturbs some of them, producing detectable errors." },
          { q: "How is quantum cryptography different from post quantum cryptography?", a: "Quantum cryptography uses quantum physics to share keys; post quantum cryptography uses ordinary mathematics designed to resist quantum computers." }
        ],
        links: [
          { to: "phys.collapse", type: "links-to", why: "An eavesdropper's measurement changes the photons' states, which is exactly what makes her presence detectable." },
          { to: "phys.bell", type: "links-to", why: "In Ekert's scheme, violating a Bell inequality proves the key is private." },
          { to: "phys.randomness", type: "links-to", why: "Secure keys need true randomness, and quantum measurement is a natural source of it." }
        ]
      },

      {
        id: "phys.atomic-clock", kind: "technology", title: "Atomic clocks", status: "settled",
        line: "Clocks that count the waves absorbed by atoms; they define the second and keep satnav accurate.",
        facets: { strand: ["technology"], era: ["long-quiet", "quantum-info"] },
        body: [
          "The satnav in your phone works out where you are by timing radio signals from satellites to within billionths of a second. Each satellite carries atomic clocks. Without them, and without corrections from Einstein's relativity, positions would drift by kilometres a day.",
          "An atomic clock relies on quantisation. Every caesium atom has exactly the same pair of energy levels, separated by a gap that matches microwaves of one precise frequency. Tune a microwave source until the atoms respond most strongly and lock it there; count its cycles and you have a clock. Since 1967 the second has been defined as 9,192,631,770 cycles of this caesium radiation. The first practical caesium clock was built by Louis Essen and Jack Parry at the National Physical Laboratory near London in 1955.",
          "Optical clocks, using laser light and single ions or atoms held in lattices of light, are now so stable that they would lose less than a second over the age of the universe. They can detect the slowing of time that general relativity predicts when a clock is raised by just a few centimetres. A redefinition of the second based on optical clocks is under discussion."
        ],
        maths: [
          "1 second = 9,192,631,770 cycles   (the caesium 133 transition: the SI definition since 1967)",
          "f = ΔE / h   (the atoms' fixed energy gap sets the frequency)"
        ],
        prompts: ["Every caesium atom is identical, so every caesium clock agrees. What does it mean that nature supplies perfect standards?"],
        recall: [
          { q: "How is the second defined?", a: "As 9,192,631,770 cycles of the radiation from a particular transition in caesium 133." },
          { q: "Why do atomic clocks agree so well?", a: "Every atom of a given kind has exactly the same quantised energy levels." }
        ],
        links: [
          { to: "phys.quantisation", type: "example-of", why: "A clock is only as good as its reference, and quantised levels make every caesium atom an identical reference." },
          { to: "phys.spectra", type: "links-to", why: "An atomic clock locks onto a single spectral line, chosen for its sharpness." },
          { to: "phys.einstein", type: "links-to", why: "Atomic clocks confirm Einstein's prediction that time runs at different rates at different heights." }
        ]
      }
    ],

    modules: [
      { id: "mod.phys.where-it-began", title: "Where it began", kind: "era",
        blurb: "From glowing pokers to Bohr's atom: how a handful of stubborn observations forced physics to accept the quantum between 1900 and 1913.",
        path: ["phys.blackbody", "phys.planck", "phys.photoelectric", "phys.einstein", "phys.photon", "phys.spectra", "phys.quantisation", "phys.bohr", "phys.quantum-leap"] },
      { id: "mod.phys.double-slit", title: "The double slit", kind: "journey",
        blurb: "One experiment that holds, as Feynman said, the only mystery. Follow it from water ripples to erasers and delayed choices.",
        path: ["phys.interference", "phys.de-broglie", "phys.davisson-germer", "phys.double-slit", "phys.wave-particle", "phys.born-rule", "phys.complementarity", "phys.quantum-eraser", "phys.delayed-choice"] },
      { id: "mod.phys.spin-measurement", title: "Spin and measurement", kind: "construct",
        blurb: "Magnets, filters and qubits show that measuring a quantum system does not simply read off a value. Why that matters, and what nobody yet agrees on.",
        path: ["phys.spin", "phys.stern-gerlach", "phys.polarisation", "phys.superposition", "phys.collapse", "phys.uncertainty", "phys.measurement-problem", "phys.decoherence"] },
      { id: "mod.phys.entanglement-bell", title: "Entanglement and Bell", kind: "construct",
        blurb: "Einstein's spooky action, Bell's inequality and the experiments that won the 2022 Nobel Prize, without the myths about faster than light messages.",
        path: ["phys.entanglement", "phys.epr", "phys.bohm", "phys.john-bell", "phys.bell", "phys.bell-tests", "phys.zeilinger", "phys.quantum-cryptography"] },
      { id: "mod.phys.interpretations", title: "What does it mean? The interpretations", kind: "school",
        blurb: "Everyone agrees on the predictions. Here are the main stories about what the world must be like for them to hold, each with its price.",
        path: ["phys.measurement-problem", "phys.schrodinger-cat", "phys.copenhagen", "phys.many-worlds", "phys.pilot-wave", "phys.objective-collapse", "phys.qbism", "phys.relational", "phys.consciousness-collapse"] },
      { id: "mod.phys.pocket", title: "Quantum in your pocket", kind: "field",
        blurb: "Chips, lasers, satnav clocks and hospital scanners: the strange theory at work in ordinary life, and the quantum machines still being built.",
        path: ["phys.semiconductors", "phys.tunnelling", "phys.laser", "phys.atomic-clock", "phys.mri", "phys.superconductivity", "phys.quantum-computing", "phys.quantum-cryptography"] },
      { id: "mod.phys.people", title: "The people", kind: "thinker",
        blurb: "The founders, from Planck's reluctant quantum to Dirac's antimatter: their ideas, their quarrels and the century they lived through.",
        path: ["phys.planck", "phys.einstein", "phys.bohr", "phys.de-broglie", "phys.heisenberg", "phys.schrodinger", "phys.born", "phys.pauli", "phys.dirac"] },
      { id: "mod.phys.reopening", title: "Reopening the questions", kind: "thinker",
        blurb: "The physicists who refused to let the meaning of quantum mechanics stay closed, and the one who calculated brilliantly while admitting nobody understands it.",
        path: ["phys.feynman", "phys.bohm", "phys.everett", "phys.wheeler", "phys.john-bell", "phys.zeilinger"] },
      { id: "mod.phys.philosophy", title: "Quantum physics meets philosophy", kind: "journey",
        blurb: "Realism, determinism, chance and the role of the observer: where the physics hands its hardest questions to philosophy, and where popular claims go too far.",
        path: ["phys.measurement-problem", "phil.realism", "phys.bell", "phys.randomness", "phil.determinism", "phys.wigners-friend", "phys.quantum-mysticism", "phil.paradigm"] }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);

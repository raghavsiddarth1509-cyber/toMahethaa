 "use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, Check, ClipboardList,
  FileHeart, Heart, HeartPulse, LockKeyhole, Mail, Microscope, Music2,
  ScanHeart, Sparkles, VolumeX, X, Archive, Star, Gift
} from "lucide-react";

type Scene = "intro" | "tests" | "quiz" | "report" | "letter" | "ending";
type TestId = "ecg" | "memory" | "smile";

const letterParagraphs = [
  "Funny how some people become special without even trying. They don't need to do anything extraordinary; somehow, even the smallest moments involving them become worth remembering. And I guess, somewhere along the way, you became that person for me. ✨",
  "I don't know exactly when it started. Maybe it was the little conversations, the random moments, or simply the way you could make an ordinary day feel a little more special. But slowly, I realised that you weren't just someone I knew — you were someone I genuinely looked forward to seeing and talking to. 🌷",
  "And honestly, having a little crush on you has been quite an experience. The random smiles, the unnecessary overthinking, and the way the smallest things can make someone happy… I suppose my heart has its own way of making life interesting. 🤭",
  "But jokes aside, there's something I really admire about you. I love seeing you chase your dreams, and I genuinely hope your journey ahead brings you success, happiness, and countless moments you'll be proud of. I hope you meet wonderful people, discover beautiful things, and never lose the little things that make you you. 🌻",
  "And there's one more thing I don't want to leave unsaid. I've always admired your dance. The way you express yourself through it, the effort behind every performance, and the happiness you bring through your content — I've genuinely been one of your biggest fans. Even before all these feelings became what they are, your talent was something I admired. 💃✨",
  "There's something I've wanted you to know for a while: you've made a little corner of my world brighter just by being part of it. And whatever happens, I'm glad I got to know you in this way. ❤️",
  "Of course, life doesn't always follow the stories we imagine in our heads. Sometimes, things are a little confusing, and sometimes, we don't know what comes next. But I think that's okay. Not everything needs to be figured out right away, and not every beautiful feeling needs a perfect storybook ending. 🌙",
  "I don't expect this letter to change anything or ask anything from you. I just wanted to be honest about something that makes me smile. No pressure, no expectations — just a little piece of my heart, wrapped in words, finding its way to you. 🫶",
];

const tests: { id: TestId; number: string; title: string; subtitle: string; icon: typeof Activity; clue: string; result: string; action: string }[] = [
  {
    id: "ecg", number: "01", title: "ECG scan", subtitle: "Observe the unusual rhythm",
    icon: Activity, clue: "A curious pattern appears whenever a certain person comes to mind.",
    result: "Rhythm appears perfectly ordinary… until a familiar thought walks into the room.",
    action: "Run ECG scan"
  },
  {
    id: "memory", number: "02", title: "Memory scan", subtitle: "Search the little details",
    icon: Microscope, clue: "Some conversations seem to have a surprisingly long shelf life.",
    result: "Scan complete: tiny moments have been carefully saved. No extra storage required.",
    action: "Run memory scan"
  },
  {
    id: "smile", number: "03", title: "Smile detector", subtitle: "Check for unexplained smiles",
    icon: ScanHeart, clue: "The subject reports smiling at absolutely random times.",
    result: "Alert: a suspicious number of smiles traced back to one particular Senior.",
    action: "Activate detector"
  },
];

const answers = [
  { label: "A little too much overthinking", response: "A reasonable theory. The patient has been advised to stop analysing every tiny detail. (No promises.)" },
  { label: "A suspicious case of smiling", response: "The evidence strongly supports this diagnosis. The smile detector has been unusually busy." },
  { label: "Something textbooks forgot to mention", response: "An excellent observation, Senior. The research team would like to publish this finding immediately." },
];

function Button({ children, onClick, secondary = false }: { children: React.ReactNode; onClick: () => void; secondary?: boolean }) {
  return <button onClick={onClick} className={secondary ? "button button-secondary" : "button"}>{children}</button>;
}

export default function Home() {
  const [scene, setScene] = useState<Scene>("intro");
  const [completed, setCompleted] = useState<TestId[]>([]);
  const [activeTest, setActiveTest] = useState<TestId | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [drawerItem, setDrawerItem] = useState<number | null>(null);
  const [confidentialOpen, setConfidentialOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const progress = useMemo(() => {
    if (scene === "intro") return 0;
    if (scene === "tests") return 25 + completed.length * 12;
    if (scene === "quiz") return 70;
    if (scene === "report") return 85;
    return 100;
  }, [scene, completed.length]);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  function runTest(id: TestId) {
    setActiveTest(id);
    setCompleted((old) => old.includes(id) ? old : [...old, id]);
  }

  function nextFromTests() {
    setActiveTest(null);
    setScene(completed.length === 3 ? "quiz" : "tests");
  }

  return (
    <main className={scene === "letter" || scene === "ending" ? "site site-letter" : "site"}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="starfield" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}
      </div>
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setScene("intro"); }}>
          <span className="brand-mark"><HeartPulse size={17} /></span>
          <span>CUPIDITY <b>CENTER</b></span>
        </a>
        <div className="topbar-right">
          <span className="case-label">CASE NO. 001</span>
          <button className="sound-toggle" onClick={() => setMusicOpen(!musicOpen)} aria-label="Music information">
            <Music2 size={16} />
            <span>Sound</span>
          </button>
        </div>
      </header>

      {musicOpen && (
        <div className="music-notice" role="status">
          <div className="music-notice-icon"><VolumeX size={18} /></div>
          <div><b>No soundtrack added yet</b><p>This button is ready for an audio track. Add your own licensed audio later to enable playback.</p></div>
          <button onClick={() => setMusicOpen(false)} aria-label="Close"><X size={16} /></button>
        </div>
      )}

      <div className="progress-wrap" aria-label={`Progress ${progress}%`}>
        <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={transition} /></div>
      </div>

      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.section key="intro" className="scene intro-scene" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={transition}>
            <div className="eyebrow"><span className="pulse-dot" /> PRIVATE RESEARCH DIVISION <span className="eyebrow-line" /></div>
            <div className="intro-grid">
              <div className="intro-copy">
                <p className="micro-label">CUPIDITY CENTER / FILE 001</p>
                <h1>An unusual<br /><em>case</em> awaits.</h1>
                <p className="intro-description">A curious collection of symptoms. A few unexplained patterns. And one very important examiner.</p>
                <div className="intro-meta">
                  <div><span>CASE STATUS</span><b><i className="status-dot" /> Awaiting examination</b></div>
                  <div><span>ASSIGNED EXAMINER</span><b>Senior</b></div>
                </div>
                <Button onClick={() => setScene("tests")}>Begin investigation <ArrowRight size={17} /></Button>
                <p className="tiny-note"><LockKeyhole size={12} /> A fictional case file. Entirely unofficial research.</p>
              </div>
              <div className="heart-visual" aria-label="Animated heartbeat illustration">
                <div className="orbit orbit-a" /><div className="orbit orbit-b" />
                <div className="heart-glow"><Heart size={94} strokeWidth={1.05} /></div>
                <svg className="ecg-line" viewBox="0 0 440 110" role="img" aria-label="Decorative heartbeat line">
                  <path d="M0 57 H90 L112 57 L130 30 L150 83 L172 12 L195 57 H250 L270 57 L290 42 L306 68 L323 57 H440" />
                </svg>
                <div className="visual-caption"><span>LIVE MONITOR</span><b>♥ &nbsp; SIGNAL DETECTED</b></div>
                <div className="floating-chip chip-one"><Activity size={13} /> PATTERN 001</div>
                <div className="floating-chip chip-two"><Sparkles size={13} /> UNEXPLAINED</div>
              </div>
            </div>
            <div className="intro-footer"><span>EST. WITH CURIOSITY</span><span>PLEASE PROCEED AT YOUR OWN PACE <ArrowDown size={12} /></span></div>
          </motion.section>
        )}

        {scene === "tests" && (
          <motion.section key="tests" className="scene" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
            <div className="section-heading">
              <div><p className="micro-label">01 / INVESTIGATION</p><h2>Let&apos;s examine<br /><em>the evidence.</em></h2></div>
              <div className="counter-card"><span>TESTS COMPLETED</span><b>{completed.length}<small> / 3</small></b><div className="mini-progress"><i style={{ width: `${completed.length / 3 * 100}%` }} /></div></div>
            </div>
            <p className="section-intro">Three small tests have been prepared for the examiner. Select each card to reveal its findings.</p>
            <div className="test-grid">
              {tests.map((test) => {
                const Icon = test.icon;
                const done = completed.includes(test.id);
                return <motion.button key={test.id} whileHover={{ y: -5 }} whileTap={{ scale: 0.985 }} className={`test-card ${done ? "test-done" : ""}`} onClick={() => runTest(test.id)}>
                  <div className="test-card-top"><span>TEST {test.number}</span>{done ? <span className="done-mark"><Check size={14} /> COMPLETE</span> : <span className="test-icon"><Icon size={18} /></span>}</div>
                  <div className="test-icon-large"><Icon size={29} strokeWidth={1.35} /></div>
                  <h3>{test.title}</h3><p>{test.subtitle}</p>
                  <span className="test-card-action">{done ? "View findings" : test.action} <ArrowRight size={14} /></span>
                </motion.button>;
              })}
            </div>

            <AnimatePresence>
              {activeTest && (
                <motion.div className="finding-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <div className="finding-icon"><FileHeart size={20} /></div>
                  <div><span className="micro-label">FINDING / {activeTest.toUpperCase()}</span><p>{tests.find(t => t.id === activeTest)?.result}</p><small>{tests.find(t => t.id === activeTest)?.clue}</small></div>
                  <button className="icon-button" onClick={() => setActiveTest(null)} aria-label="Close finding"><X size={17} /></button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="interactive-lab" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              <div className="lab-heading">
                <div><span className="micro-label">BONUS / SIGNAL CALIBRATION</span><h3>Can you catch the <em>heartbeat?</em></h3></div>
                <span className="lab-live"><i /> LIVE</span>
              </div>
              <p>Tap the monitor button three times to stabilise the fictional signal. No medical knowledge required.</p>
              <motion.div className={`signal-visual ${pulseCount >= 3 ? "signal-stable" : ""}`} animate={{ scale: pulseCount > 0 && pulseCount < 3 ? [1, 1.012, 1] : 1 }} transition={{ duration: 0.28 }}>
                <svg viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="signal-grid" d="M0 20H600 M0 50H600 M0 80H600 M50 0V100 M100 0V100 M150 0V100 M200 0V100 M250 0V100 M300 0V100 M350 0V100 M400 0V100 M450 0V100 M500 0V100 M550 0V100" />
                  <motion.path className="signal-wave" animate={{ d: [
                    "M0 52H90 L110 52 L125 32 L140 72 L158 12 L178 52 H270 L290 52 L305 39 L318 64 L333 52 H600",
                    "M0 52H75 L98 52 L116 22 L136 82 L154 8 L176 52 H260 L282 52 L300 32 L318 70 L337 52 H600",
                    "M0 52H70 L94 52 L112 28 L132 76 L151 15 L172 52 H250 L276 52 L294 35 L313 67 L332 52 H600",
                    "M0 52H82 L101 52 L119 30 L137 74 L155 13 L176 52 H265 L286 52 L303 36 L321 66 L340 52 H600"
                  ][pulseCount]}} transition={{ duration: 0.38 }} />
                </svg>
                <span>SIGNAL / 00{pulseCount} {pulseCount >= 3 ? "· STABLE" : "· CALIBRATING"}</span>
              </motion.div>
              <div className="lab-controls">
                <div className="pulse-dots">{[0,1,2].map((n) => <i key={n} className={pulseCount > n ? "filled" : ""} />)}</div>
                <motion.button whileTap={{ scale: 0.94 }} className="capture-button" onClick={() => setPulseCount((n) => n >= 3 ? 0 : n + 1)}>
                  <Activity size={16} /> {pulseCount >= 3 ? "Run it again" : "Capture heartbeat"}
                </motion.button>
                <small>{[
                  "Press capture to begin calibration.",
                  "Capture 1/3: a little signal detected. Keep going!",
                  "Capture 2/3: the pattern is getting clearer… one more.",
                  "Signal stabilised! Excellent work, Senior. Case note unlocked: some little things are worth a second look."
                ][pulseCount]}</small>
              </div>
            </motion.div>


            <motion.div className="mystery-drawer" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
              <div className="drawer-heading">
                <div><span className="micro-label">UNSORTED EVIDENCE / DESK 01</span><h3>A few things left <em>in the drawer.</em></h3></div>
                <Archive size={21} />
              </div>
              <p>Some little objects were found beside the case file. Tap each one to inspect it.</p>
              <div className="drawer-objects">
                {[
                  { icon: "✉", title: "Folded note", detail: "A tiny reminder: the smallest conversations can become the nicest memories." },
                  { icon: "✧", title: "Paper star", detail: "A wish for a future full of kind people, good surprises and reasons to smile." },
                  { icon: "♡", title: "Old ticket", detail: "No date, no destination. Just proof that ordinary moments can be worth keeping." },
                ].map((item, i) => <button key={item.title} className={`drawer-object ${drawerItem === i ? "drawer-object-active" : ""}`} onClick={() => setDrawerItem(drawerItem === i ? null : i)}>
                  <span className="drawer-object-icon">{item.icon}</span><b>{item.title}</b><small>{drawerItem === i ? "Close item" : "Tap to inspect"}</small>
                </button>)}
              </div>
              <AnimatePresence mode="wait">
                {drawerItem !== null && <motion.div key={drawerItem} className="drawer-reveal" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                  <Sparkles size={16} /><p>{[
                    "A tiny reminder: the smallest conversations can become the nicest memories.",
                    "A wish for a future full of kind people, good surprises and reasons to smile.",
                    "No date, no destination. Just proof that ordinary moments can be worth keeping."
                  ][drawerItem]}</p>
                </motion.div>}
              </AnimatePresence>
            </motion.div>

            {completed.length === 3 && (
              <motion.div className="confidential-note" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div><span className="micro-label">BONUS FILE / UNSEALED</span><h3>One confidential <em>note.</em></h3><p>All three tests are complete. A small note has been added to the file.</p></div>
                <Button secondary onClick={() => setConfidentialOpen(!confidentialOpen)}>{confidentialOpen ? "Hide note" : "Unlock note"} <LockKeyhole size={15}/></Button>
                <AnimatePresence>{confidentialOpen && <motion.p className="confidential-message" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>Psst… this whole investigation was just a creative way to say that someone has been making life a little more interesting. That&apos;s all. 💗</motion.p>}</AnimatePresence>
              </motion.div>
            )}

            <div className="scene-actions">
              <button className="text-button" onClick={() => setScene("intro")}><ArrowLeft size={15} /> Back</button>
              <Button onClick={nextFromTests} >{completed.length === 3 ? "Continue to diagnosis" : `Continue (${completed.length}/3 tests)`} <ArrowRight size={16} /></Button>
            </div>
            {completed.length < 3 && <p className="center-hint">Complete all three tests to unlock the diagnosis.</p>}
          </motion.section>
        )}

        {scene === "quiz" && (
          <motion.section key="quiz" className="scene quiz-scene" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
            <div className="quiz-top-icon"><ClipboardList size={25} /></div>
            <p className="micro-label">02 / EXAMINER&apos;S DESK</p>
            <h2>Senior, what&apos;s<br /><em>your diagnosis?</em></h2>
            <p className="section-intro">After reviewing the evidence, choose the explanation that seems most convincing.</p>
            <div className="answer-list">
              {answers.map((item, i) => <button key={item.label} className={`answer-option ${answer === i ? "answer-selected" : ""}`} onClick={() => setAnswer(i)}>
                <span className="answer-letter">{String.fromCharCode(65 + i)}</span><span>{item.label}</span>{answer === i && <Check size={17} />}
              </button>)}
            </div>
            <AnimatePresence>
              {answer !== null && <motion.div className="answer-response" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <Sparkles size={17} /><p>{answers[answer].response}</p>
              </motion.div>}
            </AnimatePresence>
            <div className="scene-actions"><button className="text-button" onClick={() => setScene("tests")}><ArrowLeft size={15} /> Review tests</button><Button onClick={() => setScene("report")} >View final report <ArrowRight size={16} /></Button></div>
            <p className="center-hint">There are no wrong answers. The examiner&apos;s opinion is final. (Mostly.)</p>
          </motion.section>
        )}

        {scene === "report" && (
          <motion.section key="report" className="scene report-scene" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
            <div className="report-header"><div className="report-seal"><Heart size={24} /></div><div><p className="micro-label">CUPIDITY CENTER / FINAL DOCUMENT</p><h2>Case <em>001</em></h2></div><span className="report-stamp">REVIEWED</span></div>
            <div className="report-paper">
              <div className="paper-top"><span>PATIENT FILE · 001</span><span>CONFIDENTIAL / JUST FOR FUN</span></div>
              <h3>Final observations</h3>
              <div className="report-row"><span>Primary finding</span><b>A rather special attachment</b></div>
              <div className="report-row"><span>Observed symptoms</span><b>Random smiles · fond memories · hopeful thoughts</b></div>
              <div className="report-row"><span>Examiner</span><b>Senior</b></div>
              <div className="report-row"><span>Overall assessment</span><b className="pink-text">Genuinely sweet. Slightly mysterious.</b></div>
              <div className="report-note"><Sparkles size={18} /><p>Some feelings don&apos;t need a complicated explanation. Sometimes, it&apos;s enough to know that someone makes your world a little brighter.</p></div>
              <div className="report-recommendation"><span>RECOMMENDATION</span><p>No medication prescribed. Continue collecting reasons to smile. Keep being wonderfully you.</p></div>
              <div className="prescription-card">
                <span>THE FINAL PRESCRIPTION</span>
                <h4>One dose of the good things.</h4>
                <ul><li>Unlimited laughter</li><li>Plenty of lovely memories</li><li>Good people around you</li><li>A little extra happiness, every day</li></ul>
                <small>Refills: always encouraged. Side effects: frequent smiling.</small>
              </div>
              <div className="report-sign"><span>CASE STATUS</span><b>Ready for one final document</b></div>
            </div>
            <div className="scene-actions"><button className="text-button" onClick={() => setScene("quiz")}><ArrowLeft size={15} /> Back</button><Button onClick={() => setScene("letter")}>Open final document <Mail size={16} /></Button></div>
          </motion.section>
        )}

        {scene === "letter" && (
          <motion.section key="letter" className="scene letter-scene" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
            {!letterOpen ? (
              <div className="envelope-stage">
                <div className="letter-kicker"><span /> A PERSONAL NOTE <span /></div>
                <motion.div className="envelope" whileHover={reduceMotion ? {} : { y: -7, rotate: -1 }}>
                  <div className="envelope-back" /><div className="envelope-paper"><Heart size={22} /></div><div className="envelope-flap" /><div className="envelope-seal"><Heart size={18} fill="currentColor" /></div>
                </motion.div>
                <p className="envelope-caption">A little something beyond the report.</p>
                <Button onClick={() => setLetterOpen(true)}>Open your letter <ArrowRight size={16} /></Button>
              </div>
            ) : (
              <motion.article className="letter-paper" initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={transition}>
                <div className="letter-decoration"><span>✳</span><span>WITH WARMTH</span><span>✳</span></div>
                <p className="letter-date">A NOTE FROM THE HEART</p>
                <h2>A little something <em>I wanted to say…</em> 💌</h2>
                <div className="letter-body">
                  {letterParagraphs.map((paragraph, i) => <motion.p key={i} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : i * 0.13, duration: 0.45 }}>{paragraph}</motion.p>)}
                </div>
                <div className="letter-signoff"><p>Keep smiling, Senior. The world looks a little brighter that way. 🌸</p><span>With a little extra affection,</span><b>Someone who&apos;s really glad they met you. ❤️ <Heart size={15} fill="currentColor" /></b></div>
                <div className="letter-postscript"><span>✦ A FINAL OBSERVATION ✦</span><p>According to the highly questionable research conducted at Cupidity Center, you may be responsible for a suspicious number of smiles. The evidence is still under investigation. 🤭🔍</p></div>
                <div className="letter-bottom"><span>CUPIDITY CENTER · CASE 001</span><span>MADE WITH A SMILE <Heart size={11} fill="currentColor" /></span></div>
                <div className="letter-actions"><Button onClick={() => setScene("ending")}>One last observation <ArrowRight size={15} /></Button></div>
              </motion.article>
            )}
          </motion.section>
        )}

        {scene === "ending" && (
          <motion.section key="ending" className="scene ending-scene" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
            <div className="ending-sparkle"><Sparkles size={28} /></div>
            <p className="letter-kicker"><span /> CASE CLOSED <span /></p>
            <h2>Some things are<br /><em>better left as smiles.</em></h2>
            <div className="ending-heart"><Heart size={40} strokeWidth={1.2} /></div>
            <p className="ending-copy">No grand conclusion. No expectations. Just a little story, a genuine feeling, and a wish that life treats you kindly.</p>
            <p className="ending-last">Keep being you, Senior. That&apos;s already pretty wonderful. 💗</p>
            <div className="ending-stamp">CASE CLOSED <Heart size={13} fill="currentColor" /></div>
            <button className="restart-button" onClick={() => { setScene("intro"); setCompleted([]); setActiveTest(null); setAnswer(null); setLetterOpen(false); setPulseCount(0); }}> <ArrowLeft size={14} /> Revisit the case</button>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <span>© CUPIDITY CENTER <i>·</i> AN UNOFFICIAL INVESTIGATION</span>
        <span>DESIGNED WITH <Heart size={11} fill="currentColor" /> &amp; CURIOSITY</span>
        <button className="secret-surprise" onClick={() => setSurpriseOpen(true)} aria-label="Open a tiny surprise"><Star size={12}/></button>
      </footer>
      <AnimatePresence>
        {surpriseOpen && <motion.div className="surprise-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSurpriseOpen(false)}>
          <motion.div className="surprise-card" initial={{ y: 18, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, scale: .97 }} onClick={(e) => e.stopPropagation()}>
            <button className="surprise-close" onClick={() => setSurpriseOpen(false)} aria-label="Close surprise"><X size={16}/></button>
            <div className="surprise-star"><Gift size={25}/></div>
            <span className="micro-label">A TINY SURPRISE</span>
            <h3>Just a little reminder…</h3>
            <p>Some people make an ordinary day feel a bit brighter. Hope today gives you a reason to smile, too. ✨</p>
            <Button onClick={() => setSurpriseOpen(false)}>Aww, close this <Heart size={14}/></Button>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}

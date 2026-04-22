import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Sparkles, ImagePlus, WandSparkles, Layers3, Gauge,
  Zap, X, ChevronRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import MoonLogo from '../components/MoonLogo'
import styles from './LandingPage.module.css'

/* ─── static data ─────────────────────────────────────────── */
const FEATURES = [
  { icon: ImagePlus,    title: 'AI Image Generation',  desc: 'Transform a sentence into polished, high-resolution visuals with striking detail.' },
  { icon: WandSparkles, title: 'Prompt Enhancement',   desc: 'Your ideas are auto-refined into richer prompts for sharper style, lighting, and depth.' },
  { icon: Layers3,      title: 'Multiple Styles',      desc: 'Jump between anime, photoreal, cinematic, digital art, and surreal outputs instantly.' },
  { icon: Gauge,        title: 'Fast & Scalable',      desc: 'Built for speed with consistent quality whether you create one concept or a full campaign.' },
]

const STEPS = [
  { n: '01', title: 'Enter Prompt',       desc: 'Describe the subject, style, lighting, or mood in natural language.' },
  { n: '02', title: 'AI Enhances Prompt', desc: 'The system expands your input into a production-ready creative direction.' },
  { n: '03', title: 'Get Your Image',     desc: 'Receive vivid visuals optimised for inspiration, design, and rapid iteration.' },
]

const GALLERY = [
  { seed: 'moon1',    tag: 'Cinematic',   title: 'Lunar Citadel'    },
  { seed: 'anime2',   tag: 'Anime',       title: 'Neon Skyline'     },
  { seed: 'art3',     tag: 'Digital Art', title: 'Synthetic Bloom'  },
  { seed: 'real4',    tag: 'Realistic',   title: 'Dream Terrain'    },
]

const STATS = [
  { value: '12M+', label: 'images generated' },
  { value: '4.9',  label: 'creator rating'   },
  { value: '120+', label: 'style presets'     },
]

const fadeUp = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.65 },
}

/* ─── Auth Modal ──────────────────────────────────────────── */
function AuthModal({ defaultMode, onClose }) {
  const { login, signup } = useAuth()
  const [mode, setMode]       = useState(defaultMode || 'login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')

  const switchMode = (m) => { setMode(m); setError(''); setPassword(''); setConfirm('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) { setError('Please fill in all fields.'); return }
    if (mode === 'signup' && password !== confirm) { setError('Passwords do not match.'); return }
    mode === 'signup' ? signup(username.trim()) : login(username.trim())
  }

  return (
    <motion.div className={styles.modalOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <motion.div className={`${styles.modalCard} glass`}
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}>

        <button className={styles.modalClose} onClick={onClose}><X size={18}/></button>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['login','signup'].map(m => (
            <button key={m} className={`${styles.tab} ${mode === m ? styles.tabActive : ''}`}
              onClick={() => switchMode(m)}>
              {m === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
          <motion.div className={styles.tabIndicator}
            animate={{ x: mode === 'login' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}/>
        </div>

        <AnimatePresence mode="wait">
          <motion.form key={mode} className={styles.form} onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className={styles.formSub}>
                {mode === 'login' ? 'Log in to start creating' : 'Join and generate today'}
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Username</label>
              <input className={styles.input} type="text" placeholder="Enter your username"
                value={username} onChange={e => setUsername(e.target.value)} autoComplete="username"/>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input className={styles.input} type="password" placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}/>
            </div>

            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div className={styles.field}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <label className={styles.label}>Confirm Password</label>
                  <input className={styles.input} type="password" placeholder="Confirm your password"
                    value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password"/>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.p className={styles.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            )}

            <motion.button type="submit" className={styles.submitBtn}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {mode === 'login' ? 'Log In' : 'Create Account'}
              <ArrowRight size={16}/>
            </motion.button>

            <p className={styles.switchText}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" className={styles.switchLink}
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Landing Page ───────────────────────────────────── */
export default function LandingPage() {
  const [authMode, setAuthMode] = useState(null) // null | 'login' | 'signup'
  const ctaRef = useRef(null)

  const scrollToCta = () => ctaRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={styles.page}>

      {/* ── Sticky Header ── */}
      <motion.header className={styles.header}
        initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className={styles.headerInner}>
          <div className={styles.logoRow}>
            <MoonLogo size={32}/>
            <span className={styles.logoText}>Lunar<span className="gradient-text">AI</span></span>
          </div>
          <nav className={styles.headerNav}>
            <a href="#features"  className={styles.navLink}>Features</a>
            <a href="#howitworks" className={styles.navLink}>How it works</a>
            <a href="#gallery"   className={styles.navLink}>Gallery</a>
            <a href="#cta"       className={styles.navLink}>Get Started</a>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.btnGhost} onClick={() => setAuthMode('login')}>Log In</button>
            <button className={styles.btnPrimary} onClick={() => setAuthMode('signup')}>
              Sign Up <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        {/* floating nodes */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span key={i} className={styles.floatNode}
            style={{ left: `${8 + (i * 9) % 84}%`, top: `${6 + (i * 11) % 88}%`,
                     width: 6 + (i * 7) % 18, height: 6 + (i * 7) % 18 }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 5 + i % 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}/>
        ))}

        <motion.div className={styles.heroBadge} {...fadeUp}>
          <Sparkles size={14}/> Premium AI image creation
        </motion.div>

        <motion.h1 className={styles.heroTitle} {...fadeUp} transition={{ duration: 0.7, delay: 0.05 }}>
          Turn Your Words Into<br/>
          <span className="gradient-text">Stunning AI Images</span>
        </motion.h1>

        <motion.p className={styles.heroDesc} {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
          Generate cinematic concepts, product scenes, artwork, and photoreal visuals
          from a simple prompt with a fast, elegant creative workflow.
        </motion.p>

        <motion.div className={styles.heroCtas} {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
          <button className={styles.btnHero} onClick={() => setAuthMode('signup')}>
            Get Started <ArrowRight size={16}/>
          </button>
          <button className={styles.btnHeroGhost} onClick={() => { scrollToCta(); }}>
            Explore Gallery
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div className={styles.statsRow} {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
          {STATS.map(s => (
            <div key={s.label} className={`${styles.statCard} glass`}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className={styles.section}>
        <motion.div className={styles.sectionHead} {...fadeUp}>
          <div className={styles.sectionChip}>Core features</div>
          <h2 className={styles.sectionTitle}>Premium tools for AI-first creators</h2>
          <p className={styles.sectionSub}>Every interaction is tuned to feel instant, intelligent, and visually refined.</p>
        </motion.div>
        <div className={styles.featureGrid}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} className={`${styles.featureCard} glass`}
              {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}>
              <div className={styles.featureIcon}><Icon size={20}/></div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="howitworks" className={styles.section}>
        <div className={styles.howGrid}>
          <motion.div {...fadeUp}>
            <div className={styles.sectionChip}>How it works</div>
            <h2 className={styles.sectionTitle}>From prompt to polished visual in three steps</h2>
            <p className={styles.sectionSub}>A clear workflow with smart refinement and stunning output previews.</p>
          </motion.div>
          <div className={styles.stepsList}>
            {STEPS.map((s, i) => (
              <motion.div key={s.n} className={`${styles.stepCard} glass`}
                {...fadeUp} transition={{ duration: 0.6, delay: i * 0.08 }}>
                <div className={styles.stepNum}>{s.n}</div>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
                <motion.div className={styles.stepOrb}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 16 - i * 2, repeat: Infinity, ease: 'linear' }}>
                  <span className={styles.stepOrbDot}/>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className={styles.section}>
        <motion.div className={styles.sectionHead} {...fadeUp}>
          <div className={styles.sectionChip}>Gallery preview</div>
          <h2 className={styles.sectionTitle}>A curated grid of vivid AI-generated inspiration</h2>
        </motion.div>
        <div className={styles.galleryGrid}>
          {GALLERY.map((item, i) => (
            <motion.div key={item.seed} className={styles.galleryCard}
              {...fadeUp} transition={{ duration: 0.6, delay: i * 0.06 }}>
              <div className={styles.galleryImgWrap}>
                <img
                  src={`https://picsum.photos/seed/${item.seed}/600/600`}
                  alt={item.title}
                  className={styles.galleryImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.galleryOverlay}>
                <div>
                  <p className={styles.galleryTag}>{item.tag}</p>
                  <h3 className={styles.galleryTitle}>{item.title}</h3>
                </div>
                <span className={styles.galleryPreviewBtn}>Open preview</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" ref={ctaRef} className={styles.ctaSection}>
        <motion.div className={styles.ctaCard} {...fadeUp}>
          <div className={styles.ctaGlow}/>
          <div className={styles.ctaContent}>
            <div>
              <p className={styles.ctaEyebrow}>Start creating</p>
              <h2 className={styles.ctaTitle}>Start Creating Now</h2>
              <p className={styles.ctaDesc}>
                Shape bold concepts, campaigns, and product visuals with a UI designed
                to make AI creativity feel premium from the first click.
              </p>
              <div className={styles.ctaBtns}>
                <button className={styles.btnHero} onClick={() => setAuthMode('signup')}>
                  Create Free Account <ArrowRight size={16}/>
                </button>
                <button className={styles.btnHeroGhost} onClick={() => setAuthMode('login')}>
                  Log In
                </button>
              </div>
            </div>
            {/* animated queue preview */}
            <div className={`${styles.ctaPreview} glass`}>
              <p className={styles.ctaPreviewLabel}>Creative queue</p>
              <div className={styles.ctaQueue}>
                {['Editorial portrait · glowing rim light','Anime skyline · rain reflections','Luxury product shot · studio bloom'].map((line, i) => (
                  <motion.div key={line} className={styles.ctaQueueItem}
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}>
                    <Zap size={12} className={styles.ctaQueueIcon}/> {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.logoRow} style={{ marginBottom: '0.25rem' }}>
              <MoonLogo size={22}/>
              <span className={styles.logoText} style={{ fontSize: '1rem' }}>
                Lunar<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className={styles.footerSub}>Futuristic text-to-image experiences, crafted for premium storytelling.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="#features"   className={styles.footerLink}>Features</a>
            <a href="#gallery"    className={styles.footerLink}>Gallery</a>
            <a href="#cta"        className={styles.footerLink}>Get started</a>
            <button className={styles.footerLink} onClick={() => setAuthMode('login')}>Log In</button>
            <button className={styles.footerLink} onClick={() => setAuthMode('signup')}>Sign Up</button>
          </div>
        </div>
      </footer>

      {/* ── Auth Modal ── */}
      <AnimatePresence>
        {authMode && <AuthModal defaultMode={authMode} onClose={() => setAuthMode(null)}/>}
      </AnimatePresence>
    </div>
  )
}

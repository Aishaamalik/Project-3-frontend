import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import MoonLogo from '../components/MoonLogo'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (mode === 'signup') {
      if (password !== confirm) {
        setError('Passwords do not match.')
        return
      }
      signup(username.trim())
    } else {
      login(username.trim())
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setError('')
    setPassword('')
    setConfirm('')
  }

  return (
    <div className={styles.page}>
      {/* Floating orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.layout}>
        {/* Left hero panel */}
        <motion.div className={styles.hero}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className={styles.logoRow}>
            <MoonLogo size={48} />
            <span className={styles.logoText}>Lunar<span className="gradient-text">AI</span></span>
          </div>
          <h1 className={styles.heroTitle}>
            Turn words into<br />
            <span className="gradient-text">stunning visuals</span>
          </h1>
          <p className={styles.heroSub}>
            Generate, curate, and collect AI-powered images with a single prompt.
          </p>
          <div className={styles.features}>
            {['🎨 Multiple art styles', '⚡ Instant generation', '🗂️ Smart collections', '📊 Usage insights'].map(f => (
              <div key={f} className={styles.featureChip}>{f}</div>
            ))}
          </div>
        </motion.div>

        {/* Right auth card */}
        <motion.div className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>

          {/* Tab switcher */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => switchMode('login')}>
              Log In
            </button>
            <button
              className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
              onClick={() => switchMode('signup')}>
              Sign Up
            </button>
            <motion.div className={styles.tabIndicator}
              animate={{ x: mode === 'login' ? 0 : '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.form key={mode} className={styles.form} onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>

              <h2 className={styles.formTitle}>
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className={styles.formSub}>
                {mode === 'login'
                  ? 'Log in to continue creating'
                  : 'Join and start generating today'}
              </p>

              <div className={styles.field}>
                <label className={styles.label}>Username</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </div>

              {mode === 'signup' && (
                <motion.div className={styles.field}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <label className={styles.label}>Confirm Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Confirm your password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                </motion.div>
              )}

              {error && (
                <motion.p className={styles.error}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}

              <motion.button type="submit" className={styles.submitBtn}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {mode === 'login' ? 'Log In' : 'Create Account'}
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
      </div>
    </div>
  )
}

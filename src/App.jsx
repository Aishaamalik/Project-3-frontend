import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import GeneratorPage   from './pages/GeneratorPage'
import HistoryPage     from './pages/HistoryPage'
import GalleryPage     from './pages/GalleryPage'
import StatsPage       from './pages/StatsPage'
import CollectionsPage from './pages/CollectionsPage'
import SettingsPage    from './pages/SettingsPage'
import ParticleBackground from './components/ParticleBackground'
import AnimatedOrbs    from './components/AnimatedOrbs'
import PageTransition  from './components/PageTransition'
import Footer          from './components/Footer'
import { AppProvider } from './context/AppContext'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<PageTransition><GeneratorPage/></PageTransition>}/>
        <Route path="/history"     element={<PageTransition><HistoryPage/></PageTransition>}/>
        <Route path="/gallery"     element={<PageTransition><GalleryPage/></PageTransition>}/>
        <Route path="/collections" element={<PageTransition><CollectionsPage/></PageTransition>}/>
        <Route path="/stats"       element={<PageTransition><StatsPage/></PageTransition>}/>
        <Route path="/settings"    element={<PageTransition><SettingsPage/></PageTransition>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ParticleBackground/>
        <AnimatedOrbs/>
        <Navbar/>
        <AnimatedRoutes/>
        <Footer/>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background:'#0E1220', color:'#EEF0FF',
              border:'1px solid rgba(196,181,253,0.12)',
              borderRadius:'12px', fontSize:'14px',
              boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
            },
            success: { iconTheme:{ primary:'#34D399', secondary:'#0E1220' } },
            error:   { iconTheme:{ primary:'#F87171', secondary:'#0E1220' } },
          }}
        />
      </BrowserRouter>
    </AppProvider>
  )
}

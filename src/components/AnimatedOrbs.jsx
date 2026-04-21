import { motion } from 'framer-motion'

export default function AnimatedOrbs() {
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      {/* Large silver-violet moon halo top-right */}
      <motion.div style={{
        position:'absolute', top:'-15%', right:'-8%',
        width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(196,181,253,0.09) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)',
        filter:'blur(60px)',
      }}
        animate={{ x:[0,-40,0], y:[0,30,0], scale:[1,1.08,1] }}
        transition={{ duration:20, repeat:Infinity, ease:'easeInOut' }}
      />
      {/* Gold crescent glow bottom-left */}
      <motion.div style={{
        position:'absolute', bottom:'-10%', left:'-5%',
        width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(240,198,116,0.07) 0%, transparent 65%)',
        filter:'blur(50px)',
      }}
        animate={{ x:[0,50,0], y:[0,-40,0], scale:[1,1.12,1] }}
        transition={{ duration:16, repeat:Infinity, ease:'easeInOut', delay:3 }}
      />
      {/* Small indigo orb center */}
      <motion.div style={{
        position:'absolute', top:'45%', left:'5%',
        width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
        filter:'blur(35px)',
      }}
        animate={{ x:[0,30,-20,0], y:[0,-25,20,0] }}
        transition={{ duration:12, repeat:Infinity, ease:'easeInOut', delay:1 }}
      />
      {/* Tiny gold sparkle top-left */}
      <motion.div style={{
        position:'absolute', top:'20%', left:'15%',
        width:150, height:150, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(240,198,116,0.1) 0%, transparent 70%)',
        filter:'blur(20px)',
      }}
        animate={{ scale:[1,1.4,1], opacity:[0.5,1,0.5] }}
        transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:2 }}
      />
    </div>
  )
}

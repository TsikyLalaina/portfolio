import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { useMobile } from '../hooks/useMobile'

function makeGlowTexture(inner: string, outer: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, inner)
  g.addColorStop(0.4, outer)
  g.addColorStop(1, 'rgba(212, 180, 131, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/* Champagne dust — slow-drifting gold particles with mouse parallax.
   Used twice: a dense field behind the subject, a sparse bolder layer in front. */
function GoldDust({ count, size = 0.09, opacity = 0.85, drift = 1 }: {
  count: number; size?: number; opacity?: number; drift?: number
}) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  const texture = useMemo(
    () => makeGlowTexture('rgba(232, 207, 163, 1)', 'rgba(212, 180, 131, 0.45)'),
    [],
  )

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.getElapsedTime()
    pts.rotation.y = t * 0.02 * drift + state.mouse.x * 0.12 * drift
    pts.rotation.x = Math.sin(t * 0.05) * 0.06 + state.mouse.y * 0.08 * drift
    pts.position.y = Math.sin(t * 0.12) * 0.25 * drift
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={size}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#d4b483"
        opacity={opacity}
      />
    </points>
  )
}

function GlowBackdrop() {
  const texture = useMemo(
    () => makeGlowTexture('rgba(212, 180, 131, 0.16)', 'rgba(212, 180, 131, 0.06)'),
    [],
  )
  return (
    <mesh position={[0, 0.5, -4]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

const lineVariants = {
  hidden: {},
  visible: (i: number) => ({
    transition: { delayChildren: 0.45 + i * 0.14 },
  }),
}
const wordVariants = {
  hidden: { y: '110%', rotate: 4 },
  visible: {
    y: '0%',
    rotate: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function KineticLine({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.span className="line" custom={index} variants={lineVariants} initial="hidden" animate="visible">
      <motion.span className="word" variants={wordVariants}>{children}</motion.span>
    </motion.span>
  )
}

export function Hero() {
  const t = useI18n()
  const isMobile = useMobile()

  return (
    <div className="hero">
      {/* Layer 0 — deep dust field */}
      <div className="hero-canvas" aria-hidden>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.8]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
          <color attach="background" args={['#0d0c0a']} />
          <fog attach="fog" args={['#0d0c0a', 9, 20]} />
          <GlowBackdrop />
          <GoldDust count={isMobile ? 600 : 1800} />
        </Canvas>
      </div>

      {/* Layer 1 — the name, behind the subject */}
      <div className="hero-name-wrap" aria-hidden>
        <h1 className="hero-name">
          <KineticLine index={0}>Tsiky</KineticLine>
          <KineticLine index={1}>Lalaina<em>.</em></KineticLine>
        </h1>
      </div>

      {/* Layer 2 — rim light + subject walking through the dust */}
      <motion.div
        className="hero-figure"
        initial={{ opacity: 0, y: 60, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Tsiky Lalaina, full-stack developer"
        role="img"
      >
        <div className="hero-figure-glow" />
        <motion.img
          src={new URL('../assets/profile-cutout.png', import.meta.url).toString()}
          alt=""
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-figure-floor" />
      </motion.div>

      {/* Layer 3 — sparse dust drifting IN FRONT of the subject */}
      <div className="hero-canvas hero-canvas-front" aria-hidden>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.8]} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>
          <GoldDust count={isMobile ? 90 : 220} size={0.34} opacity={0.5} drift={1.8} />
        </Canvas>
      </div>

      {/* Layer 4 — copy */}
      <p className="hero-scroll-hint">{t('hero_scroll')}</p>
      <div className="hero-content">
        <motion.p
          className="hero-role"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          {t('hero_role')}
        </motion.p>
        <div className="hero-bottom">
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
          >
            {t('hero_tagline')}
          </motion.p>
          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
          >
            <span>{t('hero_location')}</span>
            <span>{t('hero_available')}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

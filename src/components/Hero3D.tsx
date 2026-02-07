import { Canvas, useFrame } from '@react-three/fiber'
import { AccumulativeShadows, Center, Environment, Float, OrbitControls, RandomizedLight, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useI18n } from '../i18n'
import { useMobile } from '../hooks/useMobile'
import { motion } from 'framer-motion'
import { useUIStore } from '../store/ui'

function SpinningTorusKnot({ isLight }: { isLight: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!ref.current) return
    // Continuous rotation
    ref.current.rotation.x = t * 0.25
    ref.current.rotation.y = t * 0.35
    
    // Mouse parallax (subtle)
    const mx = state.mouse.x * 0.2
    const my = state.mouse.y * 0.2
    ref.current.rotation.x += my
    ref.current.rotation.y += mx
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <meshStandardMaterial color={isLight ? "#0ea5e9" : "#7dd3fc"} metalness={0.6} roughness={0.2} envMapIntensity={1.2} />
    </mesh>
  )
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    // Scroll parallax: move object slightly as user scrolls
    ref.current.position.y = window.scrollY * 0.003
  })
  return <group ref={ref}>{children}</group>
}

export function Hero3D() {
  const t = useI18n()
  const isMobile = useMobile()
  const theme = useUIStore((s) => s.theme)
  const isLight = theme === 'light'
  
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }} style={{ touchAction: isMobile ? 'auto' : 'none' }}>
        <color attach="background" args={[isLight ? '#f5f5f7' : '#0a0b10']} />
        <fog attach="fog" args={[new THREE.Color(isLight ? '#f5f5f7' : '#0a0b10'), 10, 30]} />

        {!isLight && <Stars radius={100} depth={50} count={isMobile ? 1000 : 4000} factor={4} saturation={0} fade speed={1} />}

        <ambientLight intensity={isLight ? 0.7 : 0.25} />
        <directionalLight position={[6, 6, 6]} intensity={isLight ? 0.8 : 1.1} castShadow={!isMobile} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <Center>
          <ParallaxGroup>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
              <SpinningTorusKnot isLight={isLight} />
            </Float>
          </ParallaxGroup>
        </Center>

        {!isMobile && (
          <AccumulativeShadows temporal frames={80} alphaTest={0.85} scale={12} position={[0, -1.5, 0]}>
            <RandomizedLight amount={6} radius={8} ambient={0.2} intensity={1} position={[5, 5, -10]} bias={0.001} />
          </AccumulativeShadows>
        )}

        <Environment preset="city" />

        {!isMobile && (
          <EffectComposer>
            <Bloom mipmapBlur intensity={isLight ? 0.5 : 1.3} luminanceThreshold={0.2} luminanceSmoothing={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={isLight ? 0.6 : 0.8} />
          </EffectComposer>
        )}

        {!isMobile && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>

      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none', padding: '24px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            textAlign: 'center',
            maxWidth: '100%',
            padding: 'clamp(24px, 5vw, 48px) clamp(16px, 6vw, 80px)',
            borderRadius: 24,
            background: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 11, 16, 0.45)',
            backdropFilter: isLight ? 'blur(24px)' : 'blur(12px)',
            WebkitBackdropFilter: isLight ? 'blur(24px)' : 'blur(12px)',
            border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isLight ? '0 12px 40px rgba(0,0,0,0.1)' : '0 20px 40px rgba(0,0,0,0.2)'
          }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(28px, 8vw, 64px)',
              lineHeight: 1.05,
              margin: 0,
              color: isLight ? '#0a0a0a' : 'var(--fg)',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              textShadow: isLight ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 24px rgba(0, 0, 0, 0.4)'
            }}
          >
            {t('hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLight ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              marginTop: 12,
              marginBottom: 0,
              color: isLight ? '#2a2a2a' : 'var(--fg)',
              textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.08)' : '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            {t('hero_tagline')}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}



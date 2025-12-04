import { Canvas, useFrame } from '@react-three/fiber'
import { AccumulativeShadows, Center, Environment, Float, Html, OrbitControls, RandomizedLight, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'
import { useI18n } from '../i18n'
import { useUIStore } from '../store/ui'

function SpinningTorusKnot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!ref.current) return
    ref.current.rotation.x = t * 0.25
    ref.current.rotation.y = t * 0.35
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <meshStandardMaterial color="#77ddff" metalness={0.6} roughness={0.2} envMapIntensity={1.2} />
    </mesh>
  )
}

export function Hero3D() {
  const t = useI18n()
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Keep the canvas transparent to show page background, so theme applies */}
        {/* Remove color background to let CSS var background through */}
        <fog attach="fog" args={[new THREE.Color('#0a0b10'), 10, 30]} />

        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 6, 6]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <Center>
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <SpinningTorusKnot />
          </Float>
        </Center>

        <AccumulativeShadows temporal frames={80} alphaTest={0.85} scale={12} position={[0, -1.5, 0]}>
          <RandomizedLight amount={6} radius={8} ambient={0.2} intensity={1} position={[5, 5, -10]} bias={0.001} />
        </AccumulativeShadows>

        <Environment preset="city" />

        <EffectComposer>
          <Bloom mipmapBlur intensity={1.3} luminanceThreshold={0.2} luminanceSmoothing={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>

        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>

      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 64, lineHeight: 1.05, margin: 0, color: 'var(--fg)' }}>{t('hero_title')}</h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginTop: 12, color: 'var(--fg)' }}>{t('hero_tagline')}</p>
        </div>
      </div>
    </div>
  )
}



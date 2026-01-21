'use client'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useTheme } from 'next-themes'

extend({ MeshLineGeometry, MeshLineMaterial })
const ASSETS = {
  model: '/models/tag.glb',
  band: '/api/lanyard-texture'
}

interface Lanyard3DProps {
  className?: string
  debugTexture?: boolean
  eventSource?: React.RefObject<HTMLElement | null>
}

export default function Lanyard3D({ className, debugTexture, eventSource }: Lanyard3DProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  // Default to dark theme until mounted to prevent flash
  const isDark = mounted ? resolvedTheme === 'dark' : true
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [-1, 0, 13], fov: 15 }}
        gl={{ alpha: true }}
        style={{ pointerEvents: 'none' }}
        eventSource={eventSource?.current ?? undefined}
        eventPrefix="offset"
      >
        <ambientLight intensity={2} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band isDark={isDark} debugTexture={debugTexture} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={4} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

interface BandProps {
  maxSpeed?: number
  minSpeed?: number
  isDark: boolean
  debugTexture?: boolean
}

function Band({ maxSpeed = 50, minSpeed = 10, isDark, debugTexture }: BandProps) {
  const band = useRef<any>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<any>(null)
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  // Visibility tracking for tab switch handling
  const [isPageVisible, setIsPageVisible] = useState(true)
  const lastVisibleTime = useRef<number>(0)
  const returningFromHidden = useRef(false)
  const returnStartTime = useRef<number>(0)

  // Responsive position - detect viewport width
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const [hasInitialized, setHasInitialized] = useState(false)

  // Responsive anchor position
  const targetX = isMobile ? 0 : -2
  const anchorXRef = useRef(targetX)

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2
  }
  const { nodes, materials } = useGLTF(ASSETS.model) as any
  const texture = useTexture(ASSETS.band)
  const badgeTextureUrl = `/api/badge-texture?theme=${isDark ? 'dark' : 'light'}`
  const badgeTexture = useTexture(badgeTextureUrl)
  const iridescenceMap = useTexture('/images/bg-pattern.webp')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ])
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible'
      setIsPageVisible(visible)
      if (visible) {
        returningFromHidden.current = true
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Handle responsive breakpoint
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Mark as initialized after first check
    checkViewport()
    setHasInitialized(true)

    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  useFrame((state, delta) => {
    // Skip all physics when page is hidden
    if (!isPageVisible) {
      lastVisibleTime.current = state.clock.elapsedTime
      return
    }

    // Handle returning from hidden state
    if (returningFromHidden.current) {
      returningFromHidden.current = false
      returnStartTime.current = state.clock.elapsedTime
        // Reset velocities to prevent wild swinging
        ;[card, j1, j2, j3].forEach((ref) => {
          ref.current?.setLinvel({ x: 0, y: 0, z: 0 }, true)
          ref.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
        })
    }

    // Calculate time since return for smooth settling
    const timeSinceReturn = state.clock.elapsedTime - returnStartTime.current
    const isSettling = timeSinceReturn < 1.0

    // Lerp anchor position (skip on first frame to avoid initial animation)
    if (hasInitialized) {
      const LERP_SPEED = 10 // ~300ms to reach target
      anchorXRef.current = THREE.MathUtils.lerp(anchorXRef.current, targetX, delta * LERP_SPEED)
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z
      })
    } else if (!isSettling) {
      // Idle swinging animation - apply gentle periodic impulse (skip during settling)
      const t = state.clock.elapsedTime
      const swingX = Math.sin(t * 1.5) * 0.3
      const swingZ = Math.cos(t * 1.2) * 0.15 // Slight depth movement
      card.current?.applyImpulse(
        { x: swingX * delta, y: 0, z: swingZ * delta },
        true // Wake up the rigid body
      )
    }
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      // Tilt it back towards the screen
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })
  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  badgeTexture.flipY = false
  return (
    <>
      <group position={[anchorXRef.current, 4.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            {/* Front side of the badge */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={badgeTexture}
                roughness={0.6}
                metalness={0.3}
                iridescence={0.4}
                iridescenceIOR={1.7}
                ior={2.3}
                iridescenceThicknessMap={iridescenceMap}
                iridescenceThicknessRange={[100, 600]}
                iridescenceMap={iridescenceMap}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
      {debugTexture && (
        <mesh position={[3, 0, 0]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={badgeTexture} />
        </mesh>
      )}
    </>
  )
}
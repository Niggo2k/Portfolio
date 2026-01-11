"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Grid, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

interface WireframeGridProps {
  className?: string
}

/**
 * Tron-style wireframe grid background
 * Uses React Three Fiber for 3D rendering
 */
export function WireframeGrid({ className }: WireframeGridProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />

      {/* Animated grid */}
      <AnimatedGrid />

      {/* Floating particles */}
      <Sparkles
        count={100}
        scale={20}
        size={1.5}
        speed={0.3}
        opacity={0.3}
        color="#00ff41"
      />

      {/* Additional cyan particles */}
      <Sparkles
        count={50}
        scale={15}
        size={1}
        speed={0.2}
        opacity={0.2}
        color="#00d4ff"
      />
    </>
  )
}

function AnimatedGrid() {
  const gridRef = React.useRef<THREE.Group>(null)

  // Subtle animation
  useFrame((state) => {
    if (gridRef.current) {
      // Very subtle wave effect
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <Grid
        args={[100, 100]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#00ff41"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00d4ff"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />
    </group>
  )
}

/**
 * Simpler CSS-based grid fallback for lower-end devices
 */
export function CSSWireframeGrid({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: `
          linear-gradient(90deg, var(--term-green-subtle) 1px, transparent 1px),
          linear-gradient(var(--term-green-subtle) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    />
  )
}

/**
 * SVG-based animated grid - lightweight alternative
 */
export function SVGWireframeGrid({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="var(--term-green)"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
          <pattern
            id="grid-pattern-large"
            width="250"
            height="250"
            patternUnits="userSpaceOnUse"
          >
            <rect width="250" height="250" fill="url(#grid-pattern)" />
            <path
              d="M 250 0 L 0 0 0 250"
              fill="none"
              stroke="var(--term-cyan)"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern-large)"
          mask="url(#grid-mask)"
        />
      </svg>
    </div>
  )
}

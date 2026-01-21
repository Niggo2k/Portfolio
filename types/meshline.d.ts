// Type declarations for meshline with @react-three/fiber
import '@react-three/fiber'

declare module 'meshline' {
  import { BufferGeometry, ShaderMaterial, Texture, Vector2, Color, ColorRepresentation, Vector3 } from 'three'

  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: Vector3[] | Float32Array): void
    points: Float32Array
    isMeshLineGeometry: boolean
  }

  export interface MeshLineMaterialParameters {
    map?: Texture | null
    useMap?: boolean
    alphaMap?: Texture | null
    useAlphaMap?: boolean
    color?: ColorRepresentation
    opacity?: number
    resolution?: Vector2 | [number, number]
    sizeAttenuation?: boolean
    lineWidth?: number
    repeat?: Vector2 | [number, number]
    dashArray?: number
    dashOffset?: number
    dashRatio?: number
    depthWrite?: boolean
    depthTest?: boolean
    transparent?: boolean
    visibility?: number
  }

  export class MeshLineMaterial extends ShaderMaterial {
    constructor(parameters?: MeshLineMaterialParameters)
    lineWidth: number
    map: Texture | null
    useMap: boolean
    alphaMap: Texture | null
    useAlphaMap: boolean
    color: Color
    opacity: number
    resolution: Vector2
    sizeAttenuation: boolean
    repeat: Vector2
    dashArray: number
    dashOffset: number
    dashRatio: number
    visibility: number
    isMeshLineMaterial: boolean
  }
}

// Extend Three.js JSX types for react-three-fiber
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: import('@react-three/fiber').Object3DNode<
      import('meshline').MeshLineGeometry,
      typeof import('meshline').MeshLineGeometry
    >
    meshLineMaterial: import('@react-three/fiber').MaterialNode<
      import('meshline').MeshLineMaterial,
      typeof import('meshline').MeshLineMaterial
    >
  }
}

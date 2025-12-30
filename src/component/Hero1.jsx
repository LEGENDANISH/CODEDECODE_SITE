import { Canvas, useFrame, useThree } from "@react-three/fiber" 
import { useRef, useState } from "react"
import StudioLight from "./StudioLight" 
import Vr from "../../public/models/source/Vr"

const MouseFollowVr = () => {
  const meshRef = useRef()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  // Smooth follow animation
  useFrame(() => {
    if (meshRef.current) {
      // Lerp (linear interpolation) for smooth movement
      meshRef.current.position.x += (mouse.x - meshRef.current.position.x) * 0.05
      meshRef.current.position.y += (mouse.y - meshRef.current.position.y) * 0.05
      
      // Subtle rotation based on mouse position
      meshRef.current.rotation.y = Math.PI + mouse.x * 0.2
      meshRef.current.rotation.x = -mouse.y * 0.1
    }
  })
  
  const handlePointerMove = (e) => {
    // Convert mouse position to 3D coordinates
    const x = (e.point.x / viewport.width) * viewport.width
    const y = (e.point.y / viewport.height) * viewport.height
    setMouse({ x: e.point.x, y: e.point.y })
  }
  
  return (
    <>
      {/* Invisible plane to capture mouse movements */}
      <mesh
        position={[0, 0, -5]}
        onPointerMove={handlePointerMove}
        visible={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      <group
        ref={meshRef}
        position={[-2, 2, 0]}
        scale={10}
      >
        <Vr />
      </group>
    </>
  )
}

const Hero1 = () => { 
  return ( 
    <div className="text-7xl font-bold text-indigo-700 h-[100vh] w-auto"> 
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}> 
          <StudioLight/> 
          <MouseFollowVr />
        </Canvas> 
    </div> 
  ) 
} 
 
export default Hero1
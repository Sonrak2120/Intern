/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 room_uv.gltf
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/room_uv.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials['Material.003']} position={[-81, 10.58, 80]} scale={[0.4, 10.57, 0.4]} />
      <mesh geometry={nodes.Plane002.geometry} material={nodes.Plane002.material} position={[-81, 0, 0]} scale={[20, 1, 81]} />
      <mesh geometry={nodes.Plane003.geometry} material={materials.Material} position={[20, 0, 0]} scale={[81, 1, 81]} />
    </group>
  )
}

useGLTF.preload('/room_uv.gltf')
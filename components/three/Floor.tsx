'use client';

import * as THREE from 'three';
import { useRef, useLayoutEffect } from 'react';
import { useSceneRefs } from '@/context/SceneContext';

export default function Floor() {
  const { circle1Ref, circle2Ref, circle3Ref } = useSceneRefs();
  const circle1 = useRef<THREE.Mesh>(null);
  const circle2 = useRef<THREE.Mesh>(null);
  const circle3 = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (circle1Ref && 'current' in circle1Ref) (circle1Ref as React.MutableRefObject<THREE.Mesh | null>).current = circle1.current;
    if (circle2Ref && 'current' in circle2Ref) (circle2Ref as React.MutableRefObject<THREE.Mesh | null>).current = circle2.current;
    if (circle3Ref && 'current' in circle3Ref) (circle3Ref as React.MutableRefObject<THREE.Mesh | null>).current = circle3.current;
    return () => {
      if (circle1Ref && 'current' in circle1Ref) (circle1Ref as React.MutableRefObject<THREE.Mesh | null>).current = null;
      if (circle2Ref && 'current' in circle2Ref) (circle2Ref as React.MutableRefObject<THREE.Mesh | null>).current = null;
      if (circle3Ref && 'current' in circle3Ref) (circle3Ref as React.MutableRefObject<THREE.Mesh | null>).current = null;
    };
  }, [circle1Ref, circle2Ref, circle3Ref]);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.4, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={0xe0cb7b} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={circle1}
        position={[0, -0.39, 0]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x435b66} />
      </mesh>
      <mesh
        ref={circle2}
        position={[3, -0.38, 0]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0xf6f4eb} />
      </mesh>
      <mesh
        ref={circle3}
        position={[-2, -0.37, 3]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x8395cd} />
      </mesh>
    </group>
  );
}

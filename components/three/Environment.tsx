'use client';

import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useTheme } from '@/context/ThemeContext';

const FRUSTUM = 5;

export default function Environment() {
  const size = useThree((s) => s.size);
  const aspect = size.width / size.height;
  const sunlightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const sunlight = sunlightRef.current;
    const ambient = ambientRef.current;
    if (!sunlight || !ambient) return;
    if (theme === 'dark') {
      gsap.to(sunlight.color, { r: 0.17254, g: 0.23137, b: 0.68627 });
      gsap.to(ambient.color, { r: 0.17254, g: 0.23137, b: 0.68627 });
      gsap.to(sunlight, { intensity: 0.78 });
      gsap.to(ambient, { intensity: 0.78 });
    } else {
      gsap.to(sunlight.color, { r: 1, g: 1, b: 1 });
      gsap.to(ambient.color, { r: 1, g: 1, b: 1 });
      gsap.to(sunlight, { intensity: 2 });
      gsap.to(ambient, { intensity: 1 });
    }
  }, [theme]);

  return (
    <>
      <directionalLight
        ref={sunlightRef}
        color="#ffffff"
        intensity={2}
        position={[3, 20, 7]}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-normalBias={0.03}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[
            (-aspect * FRUSTUM) / 0.4,
            (aspect * FRUSTUM) / 0.4,
            FRUSTUM / 0.4,
            -FRUSTUM / 0.1,
            1,
            50,
          ]}
        />
      </directionalLight>
      <ambientLight ref={ambientRef} color="#ffffff" intensity={1} />
    </>
  );
}

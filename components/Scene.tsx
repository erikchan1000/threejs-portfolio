'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import OrthoCamera from './three/OrthoCamera';
import World from './three/World';

const canvasGl: Partial<THREE.WebGLRendererParameters> = {
  antialias: true,
};

function setRendererProps(gl: THREE.WebGLRenderer) {
  const r = gl as THREE.WebGLRenderer & { useLegacyLights?: boolean };
  if ('useLegacyLights' in r) r.useLegacyLights = true;
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMapping = THREE.CineonToneMapping;
  gl.toneMappingExposure = 1.75;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;
}

export default function Scene() {
  return (
    <Canvas
      gl={canvasGl}
      onCreated={({ gl }) => setRendererProps(gl)}
      className="experience-canvas"
      style={{ width: '100%', height: '100%' }}
    >
      <OrthoCamera />
      <World />
    </Canvas>
  );
}

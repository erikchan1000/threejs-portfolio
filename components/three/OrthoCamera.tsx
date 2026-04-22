'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useSceneRefs, useScene } from '@/context/SceneContext';

const FRUSTUM = 5;

export default function OrthoCamera() {
  const set = useThree((s) => s.set);
  const size = useThree((s) => s.size);
  const { cameraRef } = useSceneRefs();
  const { setSizes } = useScene();
  const camera = useRef<THREE.OrthographicCamera | null>(null);

  useEffect(() => {
    const aspect = size.width / size.height;
    const ortho = new THREE.OrthographicCamera(
      (-aspect * FRUSTUM) / 1.2,
      (aspect * FRUSTUM) / 1.2,
      FRUSTUM / 1.2,
      -FRUSTUM / 1.2,
      -50,
      50
    );
    ortho.position.set(0, 3.3, 5.5);
    ortho.rotation.x = -Math.PI / 6;
    camera.current = ortho;
    if (cameraRef && 'current' in cameraRef) (cameraRef as React.MutableRefObject<THREE.OrthographicCamera | null>).current = ortho;
    set({ camera: ortho });

    const device = size.width < 968 ? 'mobile' : 'desktop';
    setSizes({
      width: size.width,
      height: size.height,
      aspect,
      frustum: FRUSTUM,
      device,
    });

    return () => {
      if (cameraRef && 'current' in cameraRef) (cameraRef as React.MutableRefObject<THREE.OrthographicCamera | null>).current = null;
    };
  }, [set, cameraRef, setSizes]);

  useEffect(() => {
    const ortho = camera.current;
    if (!ortho) return;
    const aspect = size.width / size.height;
    ortho.left = (-aspect * FRUSTUM) / 1.2;
    ortho.right = (aspect * FRUSTUM) / 1.2;
    ortho.top = FRUSTUM / 1.2;
    ortho.bottom = -FRUSTUM / 1.2;
    ortho.updateProjectionMatrix();

    const device = size.width < 968 ? 'mobile' : 'desktop';
    setSizes({
      width: size.width,
      height: size.height,
      aspect,
      frustum: FRUSTUM,
      device,
    });
  }, [size.width, size.height, setSizes]);

  return null;
}

'use client';

import * as THREE from 'three';
import { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap';
import { ASSETS, DRACO_PATH } from '@/lib/assets';
import { VideoTextureLoader } from '@/lib/VideoTextureLoader';
import { useSceneRefs, useScene } from '@/context/SceneContext';
import { useTheme } from '@/context/ThemeContext';
import { useFrame } from '@react-three/fiber';

function extendGLTFLoader(loader: GLTFLoader) {
  const draco = new DRACOLoader();
  draco.setDecoderPath(DRACO_PATH);
  loader.setDRACOLoader(draco);
}

/** Picture-frame textures are reused on unrelated meshes in the GLB; drop maps on these objects only. */
const NO_SHARED_PICTURE_MAP = new Set([
  'Steps',
  'Steps.001',
  'Steps.002',
  'Lantern',
  'Mail box',
]);

function stripBaseColorMapFromSubtree(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const strip = (m: THREE.Material) => {
      if (!('map' in m)) return m;
      const mat = m as THREE.MeshStandardMaterial & { map?: THREE.Texture | null };
      if (!mat.map) return m;
      const next = mat.clone() as typeof mat;
      next.map = null;
      next.needsUpdate = true;
      return next;
    };
    child.material = Array.isArray(child.material)
      ? child.material.map(strip)
      : strip(child.material);
  });
}

export default function Room() {
  const { roomRef, roomChildrenRef } = useSceneRefs();
  const { setWorldReady } = useScene();
  const { theme } = useTheme();
  const lerp = useRef({ current: 0, target: 0, ease: 0.1 });
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const standingSpotLightRef = useRef<THREE.SpotLight>(null);

  const gltf = useLoader(GLTFLoader, ASSETS.IsoRoom, extendGLTFLoader);
  const screenTexture = useLoader(VideoTextureLoader, ASSETS.Screen) as THREE.VideoTexture;

  const roomChildren = useRef<Record<string, THREE.Object3D>>({});
  const actualRoom = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useLayoutEffect(() => {
    const scene = actualRoom;

    scene.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === 'Computer') {
        const mesh = child.children[0] as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({ map: screenTexture });
        mesh.rotation.x = Math.PI;
        mesh.translateZ(0.01);
      }

      if (child.name === 'Platform') {
        child.children.forEach((platformChild) => {
          platformChild.position.x = 1;
          platformChild.position.y = 0;
          platformChild.position.z = 0;
        });
      }

      child.scale.set(0, 0, 0);

      if (child.name === 'Cube001') {
        child.position.set(0, -0.25, 0);
        child.rotation.y = Math.PI / 4;
      }

      roomChildren.current[child.name] = child;
    });

    scene.children.forEach((child) => {
      if (NO_SHARED_PICTURE_MAP.has(child.name)) stripBaseColorMapFromSubtree(child);
    });

    const spotLight = new THREE.SpotLight(0xffffff, 0, 5, 0, 0.3);
    spotLight.position.set(2.1347, 1.495, 0.05);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.normalBias = 0.05;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 40;
    spotLight.shadow.camera.fov = 1;
    scene.add(spotLight);
    const targetObject = new THREE.Object3D();
    targetObject.position.set(1.7, 1, 0);
    scene.add(targetObject);
    spotLight.target = targetObject;
    if (spotLightRef && 'current' in spotLightRef) (spotLightRef as React.MutableRefObject<THREE.SpotLight | null>).current = spotLight;
    roomChildren.current['spotLight'] = spotLight;

    const standingSpotLight = new THREE.SpotLight(0xffffff, 0, 5, 0, 0.3);
    standingSpotLight.position.set(-0.582076, 2.1, -0.142861);
    standingSpotLight.castShadow = true;
    standingSpotLight.shadow.mapSize.set(2048, 2048);
    standingSpotLight.shadow.normalBias = 0.05;
    standingSpotLight.shadow.camera.near = 10;
    standingSpotLight.shadow.camera.far = 40;
    standingSpotLight.shadow.camera.fov = 1;
    scene.add(standingSpotLight);
    const standingTarget = new THREE.Object3D();
    standingTarget.position.set(-0.582076, 0, -0.7);
    scene.add(standingTarget);
    standingSpotLight.target = standingTarget;
    if (standingSpotLightRef && 'current' in standingSpotLightRef) (standingSpotLightRef as React.MutableRefObject<THREE.SpotLight | null>).current = standingSpotLight;
    roomChildren.current['standingSpotLight'] = standingSpotLight;

    if (roomRef && 'current' in roomRef) (roomRef as React.MutableRefObject<THREE.Group | null>).current = scene;
    if (roomChildrenRef && 'current' in roomChildrenRef) (roomChildrenRef as React.MutableRefObject<Record<string, THREE.Object3D> | null>).current = roomChildren.current;
    setWorldReady(true);

    return () => {
      if (roomRef && 'current' in roomRef) (roomRef as React.MutableRefObject<THREE.Group | null>).current = null;
      if (roomChildrenRef && 'current' in roomChildrenRef) (roomChildrenRef as React.MutableRefObject<Record<string, THREE.Object3D> | null>).current = null;
      setWorldReady(false);
    };
  }, [
    actualRoom,
    screenTexture,
    roomRef,
    roomChildrenRef,
    setWorldReady,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      lerp.current.target = rotation * 0.1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const spot = spotLightRef.current;
    const standing = standingSpotLightRef.current;
    if (!spot || !standing) return;
    if (theme === 'dark') {
      gsap.to(spot, { intensity: 0.3, delay: 1 });
      gsap.to(standing, { intensity: 1, delay: 1.5 });
    } else {
      gsap.to(spot, { intensity: 0 });
      gsap.to(standing, { intensity: 0 });
    }
  }, [theme]);

  useFrame(() => {
    lerp.current.current = gsap.utils.interpolate(
      lerp.current.current,
      lerp.current.target,
      lerp.current.ease
    );
    actualRoom.rotation.y = lerp.current.current;
  });

  return <primitive object={actualRoom} />;
}

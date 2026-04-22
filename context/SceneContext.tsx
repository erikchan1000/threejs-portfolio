'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import type * as THREE from 'three';

export type SectionId = 'hero' | 'intro' | 'experience' | 'projects' | 'contact';

export type SceneRefs = {
  cameraRef: React.RefObject<THREE.OrthographicCamera | null>;
  roomRef: React.RefObject<THREE.Group | null>;
  roomChildrenRef: React.RefObject<Record<string, THREE.Object3D> | null>;
  circle1Ref: React.RefObject<THREE.Mesh | null>;
  circle2Ref: React.RefObject<THREE.Mesh | null>;
  circle3Ref: React.RefObject<THREE.Mesh | null>;
};

type SceneContextValue = SceneRefs & {
  controlsEnabled: boolean;
  setControlsEnabled: (enabled: boolean) => void;
  worldReady: boolean;
  setWorldReady: (ready: boolean) => void;
  width: number;
  height: number;
  aspect: number;
  frustum: number;
  device: 'mobile' | 'desktop';
  setSizes: (size: { width: number; height: number; aspect: number; frustum: number; device: 'mobile' | 'desktop' }) => void;
  currentSection: SectionId;
  setCurrentSection: (section: SectionId) => void;
  asscrollRef: React.RefObject<import('@ashthornton/asscroll').default | null>;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [worldReady, setWorldReady] = useState(false);
  const [sizes, setSizesState] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    aspect: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16 / 9,
    frustum: 5,
    device: (typeof window !== 'undefined' && window.innerWidth < 968 ? 'mobile' : 'desktop') as 'mobile' | 'desktop',
  });

  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const roomRef = useRef<THREE.Group | null>(null);
  const roomChildrenRef = useRef<Record<string, THREE.Object3D> | null>(null);
  const circle1Ref = useRef<THREE.Mesh | null>(null);
  const circle2Ref = useRef<THREE.Mesh | null>(null);
  const circle3Ref = useRef<THREE.Mesh | null>(null);
  const asscrollRef = useRef<import('@ashthornton/asscroll').default | null>(null);

  const [currentSection, setCurrentSection] = useState<SectionId>('hero');

  const setSizes = useCallback((size: { width: number; height: number; aspect: number; frustum: number; device: 'mobile' | 'desktop' }) => {
    setSizesState(size);
  }, []);

  const value: SceneContextValue = {
    cameraRef,
    roomRef,
    roomChildrenRef,
    circle1Ref,
    circle2Ref,
    circle3Ref,
    asscrollRef,
    controlsEnabled,
    setControlsEnabled,
    worldReady,
    setWorldReady,
    currentSection,
    setCurrentSection,
    ...sizes,
    setSizes,
  };

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be used within SceneProvider');
  return ctx;
}

export function useSceneRefs() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useSceneRefs must be used within SceneProvider');
  return {
    cameraRef: ctx.cameraRef,
    roomRef: ctx.roomRef,
    roomChildrenRef: ctx.roomChildrenRef,
    circle1Ref: ctx.circle1Ref,
    circle2Ref: ctx.circle2Ref,
    circle3Ref: ctx.circle3Ref,
  };
}

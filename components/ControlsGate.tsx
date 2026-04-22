'use client';

import { useScene } from '@/context/SceneContext';
import Controls from './Controls';

export default function ControlsGate() {
  const { controlsEnabled } = useScene();
  return controlsEnabled ? <Controls /> : null;
}

'use client';

import dynamic from 'next/dynamic';
import { SceneProvider } from '@/context/SceneContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Preloader from '@/components/Preloader';
import PageContent from '@/components/PageContent';
import ControlsGate from '@/components/ControlsGate';
import SectionNav from '@/components/SectionNav';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function ClientPage() {
  return (
    <SceneProvider>
      <ThemeProvider>
        <div className="experience">
          <Scene />
        </div>
        <Preloader />
        <PageContent />
        <SectionNav />
        <ControlsGate />
      </ThemeProvider>
    </SceneProvider>
  );
}

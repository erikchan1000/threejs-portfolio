'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useScene } from '@/context/SceneContext';
import convertDivsToSpans from '@/lib/convertDivsToSpans';

export default function Preloader() {
  const {
    worldReady,
    setControlsEnabled,
    roomRef,
    roomChildrenRef,
    cameraRef,
    width,
    height,
    device,
  } = useScene();

  const moveFlag = useRef(false);
  const scaleFlag = useRef(false);
  const rafId = useRef<number>(0);

  const playSecondIntro = useCallback(async () => {
    const room = roomRef?.current;
    const roomChildren = roomChildrenRef?.current;
    const camera = cameraRef?.current;
    if (!room || !roomChildren || !camera) return;

    moveFlag.current = false;
    scaleFlag.current = true;

    await new Promise<void>((resolve) => {
      const tl = gsap.timeline();
      tl.to('.intro-text .animate', {
        yPercent: 100,
        stagger: { each: 0.03, from: 'end' },
        ease: 'back.in(2)',
      }, 'fadeout')
        .to('.arrow-wrapper', { opacity: 0 }, 'fadeout')
        .to('.hero-main-title .animate', { yPercent: 0, stagger: 0.03, ease: 'back.out(1.7)' }, 'hero-text')
        .to('.hero-main-description .animate', { yPercent: 0, stagger: 0.01, ease: 'back.out(1.7)' }, 'hero-text')
        .to('.hero-second-subheading .animate', { yPercent: 0, stagger: 0.03, ease: 'back.out(1.7)' }, 'hero-text')
        .to('.hero-second-description .animate', { yPercent: 0, stagger: 0.03, ease: 'back.out(1.7)' }, 'hero-text')
        .to(room.position, { x: 0, y: 0, z: 0, ease: 'power1.out' }, 'hero-text')
        .to(roomChildren.Cube001.rotation, { y: 2 * Math.PI + Math.PI / 4, ease: 'power2.out', duration: 0.7 }, 'same')
        .to(roomChildren.Cube001.scale, { x: 7.5, y: 7.5, z: 7.5, ease: 'back.out(2.5)' }, 'same')
        .to(camera.position, { y: 5.3 }, 'same')
        .to(roomChildren.Cube001.position, { x: 0, y: 0, z: 0 }, 'same')
        .to(roomChildren.Walls.scale, { x: 1, y: 1, z: 1 })
        .to(roomChildren.Cube001.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, 'same2')
        .to(roomChildren.Cube001.position, { z: -2.7, x: -0.05, duration: 0.5 }, 'same2')
        .to(roomChildren.SkirtingFloor.scale, { x: 1, y: 1, z: 1, ease: 'Sine.easeOut', duration: 0.3 }, '>-0.3')
        .to(roomChildren.BedTable.scale, { x: 1, y: 1, z: 1, ease: 'back.out(1)', duration: 0.3 })
        .to(roomChildren.FloorItems.scale, { x: 1, y: 1, z: 1, ease: 'back.out(1)', duration: 0.3 })
        .to(roomChildren.Shelfs.scale, { x: 1, y: 1, z: 1, ease: 'back.out(1)', duration: 0.3 }, '>-0.3')
        .to(roomChildren.TableItems.scale, { x: 1, y: 1, z: 1, ease: 'back.out(1)', duration: 0.3 })
        .to(roomChildren.FrameBig.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, '>-0.3')
        .to(roomChildren.FrameTopLeft.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, '>-0.15')
        .to(roomChildren.FrameBottomLeft.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, '>-0.15')
        .to(roomChildren.Poster.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, '>-0.15')
        .to(roomChildren.Computer.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(1.5)',
          duration: 0.3,
          onComplete: resolve,
        }, '>-0.15')
        .to(roomChildren.spotLight as THREE.SpotLight, { angle: Math.PI / 4.9, ease: 'back.out(1.5)', duration: 0.3 }, 'light')
        .to(roomChildren.standingSpotLight as THREE.SpotLight, { angle: Math.PI / 4.9, ease: 'back.out(1.5)', duration: 0.3 }, 'light')
        .to('.arrow-wrapper', { opacity: 1, onComplete: resolve });
    });

    scaleFlag.current = false;
    setControlsEnabled(true);
  }, [roomRef, roomChildrenRef, cameraRef, setControlsEnabled]);

  useEffect(() => {
    if (!worldReady) return;

    convertDivsToSpans(document.querySelector('.intro-text'));
    convertDivsToSpans(document.querySelector('.hero-main-title'));
    convertDivsToSpans(document.querySelector('.hero-main-description'));
    convertDivsToSpans(document.querySelector('.hero-second-subheading'));
    convertDivsToSpans(document.querySelector('.hero-second-description'));

    const room = roomRef?.current;
    const roomChildren = roomChildrenRef?.current;
    if (!room || !roomChildren) return;

    const firstIntro = () =>
      new Promise<void>((resolve) => {
        const tl = gsap.timeline();
        tl.set('.animate', { y: 0, yPercent: 100 });
        tl.to('.preloader', {
          opacity: 0,
          delay: 1,
          onComplete: () => {
            document.querySelector('.preloader')?.classList.add('hidden');
          },
        });

        if (device === 'desktop') {
          tl.to(roomChildren.Cube001.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 1,
          }).to(room.position, {
            x: () => width * -0.002,
            ease: 'power1.out',
            duration: 0.7,
          });
        } else {
          tl.to(roomChildren.Cube001.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 1,
          }).to(room.position, {
            z: () => height * -0.0025,
            ease: 'power1.out',
            duration: 0.7,
          });
        }

        tl.to('.intro-text .animate', { yPercent: 0, stagger: 0.05, ease: 'back.out(1.7)' })
          .to('.arrow-wrapper', { opacity: 1 }, 'same')
          .to('.toggle-bar', { opacity: 1, onComplete: resolve }, 'same');
      });

    const onScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        window.removeEventListener('wheel', onScroll);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        playSecondIntro();
      }
    };

    let initialY = 0;
    const onTouchStart = (e: TouchEvent) => {
      initialY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (initialY - currentY > 0) {
        window.removeEventListener('wheel', onScroll);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        playSecondIntro();
      }
    };

    firstIntro().then(() => {
      moveFlag.current = true;
      window.addEventListener('wheel', onScroll);
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchmove', onTouchMove);
    });

    return () => {
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [worldReady, device, width, height, roomRef, roomChildrenRef, playSecondIntro]);

  useEffect(() => {
    const tick = () => {
      const room = roomRef?.current;
      if (!room) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }
      if (moveFlag.current) {
        if (device === 'desktop') {
          room.position.x = width * -0.002;
          room.position.y = 0;
          room.position.z = 0;
        } else {
          room.position.x = 0;
          room.position.y = 0;
          room.position.z = height * -0.0025;
        }
      }
      if (scaleFlag.current) {
        if (device === 'desktop') {
          room.scale.set(1, 1, 1);
        } else {
          room.scale.set(0.6, 0.6, 0.6);
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [roomRef, device, width, height]);

  return (
    <div className="preloader">
      <div className="preloader-wrapper">
        <div className="loading">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </div>
  );
}

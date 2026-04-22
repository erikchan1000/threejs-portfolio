'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll';
import { useScene } from '@/context/SceneContext';

gsap.registerPlugin(ScrollTrigger);

export default function Controls() {
  const {
    roomRef,
    roomChildrenRef,
    cameraRef,
    circle1Ref,
    circle2Ref,
    circle3Ref,
    width,
    height,
    asscrollRef,
    setCurrentSection,
  } = useScene();

  const localAsscrollRef = useRef<ASScroll | null>(null);

  useEffect(() => {
    const room = roomRef?.current;
    const roomChildren = roomChildrenRef?.current;
    const camera = cameraRef?.current;
    const circle1 = circle1Ref?.current;
    const circle2 = circle2Ref?.current;
    const circle3 = circle3Ref?.current;

    if (!room || !roomChildren || !camera || !circle1 || !circle2 || !circle3) return;

    const pageEl = document.querySelector('.page');
    if (pageEl instanceof HTMLElement) pageEl.style.overflow = 'visible';

    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
      customScrollbar: true,
    });
    localAsscrollRef.current = asscroll;
    if (asscrollRef && 'current' in asscrollRef) (asscrollRef as React.MutableRefObject<ASScroll | null>).current = asscroll;

    gsap.ticker.add(asscroll.update);
    ScrollTrigger.defaults({ scroller: asscroll.containerElement });
    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop: (value?: number) =>
        value !== undefined ? (asscroll.currentPos = value) : asscroll.currentPos,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      fixedMarkers: true,
    });
    asscroll.on('update', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', asscroll.resize);

    const sectionTriggersRef: ScrollTrigger[] = [];

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, [asscroll]'),
      });
      const sections: { selector: string; id: import('@/context/SceneContext').SectionId }[] = [
        { selector: '.hero', id: 'hero' },
        { selector: '.first-section', id: 'intro' },
        { selector: '.second-section', id: 'experience' },
        { selector: '.third-section', id: 'projects' },
        { selector: '.fourth-section', id: 'contact' },
      ];
      sections.forEach(({ selector, id }) => {
        const t = ScrollTrigger.create({
          trigger: selector,
          start: 'top center',
          end: 'bottom center',
          scroller: asscroll.containerElement,
          onEnter: () => setCurrentSection(id),
          onEnterBack: () => setCurrentSection(id),
        });
        sectionTriggersRef.push(t);
      });
    });

    const mm = gsap.matchMedia();
    const ctxDesktop = mm.add('(min-width: 969px)', () => {
      room.scale.set(1, 1, 1);
      gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(room.position, { x: () => width * 0.0022 });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(room.position, { x: () => width * -0.0022, z: () => height * 0.011 }, 'same')
        .to(room.scale, { x: 2.2, y: 2.2, z: 2.2 }, 'same');

      gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(camera.position, { x: -1.5, y: -5, z: -6 }, 'same')
        .to(room.scale, { x: 3.5, y: 3.5, z: 3.5 }, 'same');

      gsap.timeline({
        scrollTrigger: {
          trigger: '.fourth-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(camera.position, { x: -2.5, y: 0, z: 15 }, 'same')
        .to(room.scale, { x: 3, y: 3, z: 3 }, 'same');
    });

    const ctxMobile = mm.add('(max-width: 968px)', () => {
      room.scale.set(0.6, 0.6, 0.6);
      gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(room.scale, { x: 1, y: 1, z: 1 });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(room.scale, { x: 1.5, y: 1.5, z: 1.5 }, 'same')
        .to(room.position, { z: () => height * 0.008 }, 'same');

      gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(room.position, { x: () => width * -0.01, z: () => height * 0.003 }, 'same')
        .to(room.scale, { x: 2.5, y: 2.5, z: 2.5 }, 'same');

      gsap.timeline({
        scrollTrigger: {
          trigger: '.fourth-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(room.position, { x: () => width * 0.005, z: () => height * -0.01 }, 'same')
        .to(room.scale, { x: 2, y: 2, z: 2 }, 'same');
    });

    mm.add('all', () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        const progressWrapper = section.querySelector('.progress-wrapper');
        const progressBar = section.querySelector('.progress-bar');
        if (!progressBar) return;

        if (section.classList.contains('right')) {
          gsap.to(section, {
            borderTopLeftRadius: 50,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 0.6 },
          });
          gsap.to(section, {
            borderBottomLeftRadius: 250,
            scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.6 },
          });
        } else {
          gsap.to(section, {
            borderTopRightRadius: 50,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 0.6 },
          });
          gsap.to(section, {
            borderBottomRightRadius: 250,
            scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.6 },
          });
        }
        gsap.from(progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: progressWrapper,
            pinSpacing: false,
          },
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(circle1.scale, { x: 5, y: 5, z: 5 });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(circle2.scale, { x: 5, y: 5, z: 5 });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(circle3.scale, { x: 5, y: 5, z: 5 });

      const secondPartTl = gsap.timeline({
        scrollTrigger: { trigger: '.fourth-move', start: 'center center' },
      });

      room.children.forEach((child) => {
        if (child.name === 'Platform') {
          secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, duration: 0.3 }));
          secondPartTl.add(gsap.to(child.children[0].position, { x: 0, y: 0, z: 0, ease: 'back.out(2)', duration: 0.3 }), 'first');
          secondPartTl.add(gsap.to(child.children[1].position, { x: 0, y: 0, z: 0, ease: 'back.out(2)', duration: 0.3 }), 'first');
        }
        if (child.name === 'Mail_box') secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2)', duration: 0.3 }));
        if (child.name === 'Steps') secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2)', duration: 0.3 }));
        if (child.name === 'Steps001') secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2)', duration: 0.3 }), '-=0.2');
        if (child.name === 'Steps002') secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2)', duration: 0.3 }), '-=0.2');
        if (child.name === 'Lantern') secondPartTl.add(gsap.to(child.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2)', duration: 0.3 }));
      });
    });

    return () => {
      sectionTriggersRef.forEach((t) => t.kill());
      ctxDesktop.revert();
      ctxMobile.revert();
      mm.revert();
      gsap.ticker.remove(asscroll.update);
      ScrollTrigger.removeEventListener('refresh', asscroll.resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      asscroll.disable();
      if (asscrollRef && 'current' in asscrollRef) (asscrollRef as React.MutableRefObject<ASScroll | null>).current = null;
    };
  }, [
    roomRef,
    roomChildrenRef,
    cameraRef,
    circle1Ref,
    circle2Ref,
    circle3Ref,
    width,
    height,
  ]);

  return null;
}

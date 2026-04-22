'use client';

import { useScene } from '@/context/SceneContext';
import type { SectionId } from '@/context/SceneContext';

const SECTIONS: { id: SectionId; label: string; selector: string }[] = [
  { id: 'intro', label: 'Introduction', selector: '.first-section' },
  { id: 'experience', label: 'Experience', selector: '.second-section' },
  { id: 'projects', label: 'Projects', selector: '.third-section' },
  { id: 'contact', label: 'Contact', selector: '.fourth-section' },
];

export default function SectionNav() {
  const { controlsEnabled, currentSection, asscrollRef } = useScene();

  const scrollToSection = (selector: string) => {
    const asscroll = asscrollRef?.current;
    if (!asscroll) return;
    const wrapper = document.querySelector('.page-wrapper');
    const section = wrapper?.querySelector(selector);
    if (!section || !(section instanceof HTMLElement)) return;
    const pos = section.offsetTop;
    asscroll.scrollTo(pos);
  };

  if (!controlsEnabled) return null;

  return (
    <nav className="section-nav" aria-label="Page sections">
      <ul className="section-nav__list">
        {SECTIONS.map(({ id, label, selector }) => (
          <li key={id} className="section-nav__item">
            <button
              type="button"
              className={`section-nav__button ${currentSection === id ? 'section-nav__button--active' : ''}`}
              onClick={() => scrollToSection(selector)}
              aria-current={currentSection === id ? 'true' : undefined}
            >
              <span className="section-nav__dot" />
              <span className="section-nav__label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

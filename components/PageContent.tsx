'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Chart images from Unsplash (stock/trend and regime-style charts)
const CHART_IMAGES = {
  regimeDetection:
    'https://images.unsplash.com/photo-1643962579371-ba03eec77f87?q=80&w=800&auto=format&fit=crop',
  trendPrice:
    'https://images.unsplash.com/photo-1745270917331-787c80129680?q=80&w=800&auto=format&fit=crop',
} as const;

export default function PageContent() {
  const { theme, toggleTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) pageRef.current.setAttribute('asscroll-container', '');
    if (wrapperRef.current) wrapperRef.current.setAttribute('asscroll', '');
  }, []);

  return (
    <div className="page" ref={pageRef}>
      <div className="asscrollbar">
        <div className="asscrollbar__handle"><div /></div>
      </div>

      <div className="toggle-bar">
        <div className="sun-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path fill="currentColor" d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" />
          </svg>
        </div>
        <button type="button" className="toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
          <div className={`toggle-circle ${theme === 'dark' ? 'slide' : ''}`} />
        </button>
        <div className="moon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path fill="currentColor" d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
        </div>
      </div>

      <div className="page-wrapper" ref={wrapperRef}>
        <section className="hero">
          <div className="hero-wrapper">
            <div className="intro-text">Welcome to Erik&apos;s portfolio!</div>
            <div className="arrow-wrapper">
              <div className="chevrons">
                <div className="chevrondown" />
                <div className="chevrondown" />
              </div>
            </div>
            <div className="hero-main">
              <h1 className="hero-main-title">Erik Chan</h1>
              <p className="hero-main-description">Full Stack Software Engineer</p>
            </div>
            <div className="hero-second">
              <p className="hero-second-subheading">MY</p>
              <p className="hero-second-description">P.O.R.T.F.O.L.I.O</p>
            </div>
          </div>
        </section>

        <div className="first-move section-margin" />
        <section className="first-section section left">
          <div className="progress-wrapper progress-bar-wrapper-left">
            <div className="progress-bar" />
          </div>
          <div className="section-intro-wrapper">
            <h1 className="section-title">
              <span className="section-title-text">Introduction</span>
              <div className="section-title-decoration style1" />
              <div className="section-title-decoration style2" />
              <div className="section-title-decoration style3" />
            </h1>
            <span className="section-number">01</span>
          </div>
          <div className="section-detail-wrapper">
            <h3 className="section-heading">About Me</h3>
            <p className="section-text">
              Hello, I am Erik Chan, a Full Stack Software Engineer currently at Stackline in Seattle, WA.
              I&apos;m a lifelong learner passionate about new developments in technology and their applications!
              <br /><br />
              With expertise in React.js, Next.js, Node.js, and cloud technologies, I&apos;ve architected
              role-based authorization systems, built high-performance e-commerce solutions, and led
              machine learning initiatives. I&apos;m currently expanding my skills in Rust, Go, and advanced
              AI/ML technologies.
            </p>
            <button type="button" className="section-button">
              <a href="/others/resume.pdf" target="_blank" rel="noreferrer">My resume →</a>
            </button>
          </div>
        </section>

        <div className="second-move section-margin" />
        <section className="second-section section right">
          <div className="progress-wrapper progress-bar-wrapper-right">
            <div className="progress-bar blue-background" />
          </div>
          <div className="section-intro-wrapper blue-text blue-border">
            <h1 className="section-title blue-text blue-border">
              <span className="section-title-text blue-text">Experience</span>
              <div className="section-title-decoration style1 blue-border" />
              <div className="section-title-decoration style2 blue-border" />
              <div className="section-title-decoration style3 blue-background blue-border" />
            </h1>
            <span className="section-number blue-text">02</span>
          </div>
          <div className="section-detail-wrapper">
            <h3 className="section-heading">Breaking Hits | Los Angeles, CA</h3>
            <p className="section-text section-meta">Oct 2023 – Jul 2024</p>
            <p className="section-text">
              Built production ML pipelines processing 100,000+ audio tracks daily using Wav2Vec and BERT models,
              improving music content classification accuracy by 25% and reducing manual tagging.
            </p>
            <h3 className="section-heading">Edenspiekermann | Los Angeles, CA</h3>
            <p className="section-text section-meta">Mar 2023 – Sep 2023</p>
            <p className="section-text">
              Led development of production Next.js applications for banking and biotech enterprise clients,
              significantly improving performance metrics, system reliability, and observability monitoring over legacy systems.
            </p>
            <p className="section-text">
              Built reusable UI component library in TypeScript with comprehensive documentation used across 5+ projects,
              reducing frontend development time by 30% and ensuring design consistency.
            </p>
            <button type="button" className="section-button">
              <a href="/others/resume.pdf" target="_blank" rel="noreferrer">My resume →</a>
            </button>
          </div>
        </section>

        <div className="third-move section-margin" />
        <section className="third-section section left">
          <div className="progress-wrapper progress-bar-wrapper-left">
            <div className="progress-bar green-background" />
          </div>
          <div className="section-intro-wrapper green-text green-border">
            <h1 className="section-title green-text green-border">
              <span className="section-title-text green-text">Projects</span>
              <div className="section-title-decoration style1 green-border" />
              <div className="section-title-decoration style2 green-border" />
              <div className="section-title-decoration style3 green-background green-border" />
            </h1>
            <span className="section-number green-text">03</span>
          </div>
          <div className="section-detail-wrapper">
            <div className="project-card">
              <div className="project-card__image-wrap">
                <img src={CHART_IMAGES.regimeDetection} alt="Regime detection chart — market state visualization" className="project-card__image" />
              </div>
              <div className="project-card__body">
                <h3 className="section-heading">Real-Time Trading Infrastructure</h3>
                <p className="section-text section-meta">Python, Rust</p>
                <p className="section-text">
                  High-performance trading infrastructure with regime detection for market state analysis and real-time execution.
                </p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-card__image-wrap">
                <img src={CHART_IMAGES.trendPrice} alt="Trend chart tracking price movements" className="project-card__image" />
              </div>
              <div className="project-card__body">
                <h3 className="section-heading">AI Hedge Fund</h3>
                <p className="section-text section-meta">Flask, Next.js, LangChain, Pandas, NumPy</p>
                <p className="section-text">
                  Server core that fetches financial data and calculates metrics, with LangChain agents that
                  evaluate financial metrics to construct investment decisions, displayed through MCP frontend.
                </p>
                <button type="button" className="section-button">
                  <a href="https://github.com/erikchan1000/HEDGE-FUND" target="_blank" rel="noreferrer">Github repo →</a>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="fourth-move section-margin" />
        <section className="fourth-section section right">
          <div className="progress-wrapper progress-bar-wrapper-right">
            <div className="progress-bar blue-background" />
          </div>
          <div className="section-intro-wrapper blue-text blue-border">
            <h1 className="section-title blue-text blue-border">
              <span className="section-title-text blue-text">Contact Me</span>
              <div className="section-title-decoration style1 blue-border" />
              <div className="section-title-decoration style2 blue-border" />
              <div className="section-title-decoration style3 blue-background blue-border" />
            </h1>
            <span className="section-number blue-text">04</span>
          </div>
          <div className="section-detail-wrapper">
            <h3 className="section-heading">Contact Me</h3>
            <p className="section-text">Feel free to reach out to me for any inquiries or just to chat!</p>
            <ul className="contact-button-wrapper">
              <li className="icon github">
                <span className="tooltip">Github</span>
                <span><a href="https://github.com/erikchan1000" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" /></a></span>
              </li>
              <li className="icon linkedin">
                <span className="tooltip">Linkedin</span>
                <span><a href="https://www.linkedin.com/in/erikchan01/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin" /></a></span>
              </li>
              <li className="icon gmail">
                <span className="tooltip">Email: erikchan1010@gmail.com</span>
                <span><a href="mailto:erikchan1010@gmail.com" target="_blank"><i className="fa-regular fa-envelope" /></a></span>
              </li>
            </ul>
            <h3 className="section-heading">Acknowledgement</h3>
            <p className="section-text">Credits to <b>Bokoko33</b>&apos;s website which I drew inspiration from</p>
            <button type="button" className="section-button bot-button">
              <a href="https://bokoko33.me/" target="_blank" rel="noreferrer">Bokoko33&apos;s Website →</a>
            </button>
            <button type="button" className="section-button bot-button">
              <a href="https://twitter.com/bokoko33" target="_blank" rel="noreferrer">Bokoko33&apos;s Twitter →</a>
            </button>
            <p className="section-text">
              Also credits to <b>Andrew Woan</b>&apos;s youtube tutorial on gsap timelines and three.js
            </p>
            <button type="button" className="section-button bot-button">
              <a href="https://www.youtube.com/@andrewwoan" target="_blank" rel="noreferrer">Andrew Woan&apos;s Youtube →</a>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CHART_IMAGES = {
  regimeDetection:
    'https://images.unsplash.com/photo-1643962579371-ba03eec77f87?q=80&w=800&auto=format&fit=crop',
  trendPrice:
    'https://images.unsplash.com/photo-1745270917331-787c80129680?q=80&w=800&auto=format&fit=crop',
  aiScribe:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
  codeMinion:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
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
              Hello, I am Erik Chan, a Full Stack Software Engineer at Stackline in Seattle, WA.
              I&apos;m a lifelong learner passionate about new developments in technology and their applications!
              <br /><br />
              I work across the stack on distributed systems and large-scale e-commerce automation —
              architecting checkout-as-a-service infrastructure, building Go/TypeScript scheduling microservices,
              and designing parallel execution frameworks. Outside of work I build AI agents, trading
              infrastructure, and developer tooling in Python, Rust, and TypeScript.
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
            <h3 className="section-heading">Stackline | Seattle, WA</h3>
            <p className="section-text section-meta">Full Stack Software Engineer · Jul 2024 – Present</p>
            <p className="section-text">
              Redesigned Amazon Vendor Central and Amazon Seller Central crawlers using custom Chrome browser
              automation, migrating to a state-machine-based architecture that reduced erroneous crawls by 40%
              and improved reliability.
            </p>
            <p className="section-text">
              Architected and built a distributed server-side checkout system offering checkout-as-a-service to
              enterprise clients, processing 600,000+ orders annually with 99.9% uptime.
            </p>
            <p className="section-text">
              Designed and implemented a time-zone-aware scheduling microservice for Amazon Ads campaign
              management using Go and TypeScript, automating 100,000+ campaign operations monthly.
            </p>
            <p className="section-text">
              Built a parallel execution framework for content-generation workflows that increased system
              throughput by 400% while maintaining ACID data consistency across distributed systems.
            </p>
            <h3 className="section-heading">Breaking Hits | Los Angeles, CA</h3>
            <p className="section-text section-meta">Founding Full Stack Engineer · Oct 2023 – Jul 2024</p>
            <p className="section-text">
              Built production ML pipelines processing 100,000+ audio tracks daily using Wav2Vec and BERT models,
              improving music content classification accuracy by 25% and reducing manual tagging.
            </p>
            <h3 className="section-heading">Edenspiekermann | Los Angeles, CA</h3>
            <p className="section-text section-meta">Full Stack Software Engineer · Mar 2023 – Sep 2023</p>
            <p className="section-text">
              Led development of production Next.js applications for banking and biotech enterprise clients,
              significantly improving performance metrics, system reliability, and observability monitoring over legacy systems.
            </p>
            <p className="section-text">
              Built reusable UI component library in TypeScript with comprehensive documentation used across 5+ projects,
              reducing frontend development time by 30% and ensuring design consistency.
            </p>
            <h3 className="section-heading">Skills</h3>
            <p className="section-text">
              <b>Languages:</b> JavaScript (ES6+), Python 3, TypeScript, Rust, Kotlin, Java, C++, C# (.NET Core), SQL, Go
            </p>
            <p className="section-text">
              <b>Frameworks:</b> TensorFlow, PyTorch, React.js, Next.js, Node.js, Express, Vue.js, React Native, Flask, FastAPI
            </p>
            <p className="section-text">
              <b>Technologies:</b> Docker, Kubernetes, Google Cloud Platform (GCP), Amazon Web Services (AWS), REST APIs, GraphQL, Git, CI/CD, Redis, Kafka
            </p>
            <h3 className="section-heading">Education</h3>
            <p className="section-text section-meta">University of California, Riverside · Sep 2018 – Jun 2022</p>
            <p className="section-text">B.S. Computer Science · GPA: 3.90</p>
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
                  Engineered a low-latency market data pipeline capable of handling 10,000+ events per second
                  with sub-100 millisecond processing latency for high-frequency trading applications.
                </p>
                <p className="section-text">
                  Designed an automated risk management system using thin-book market-making strategies,
                  cross-exchange arbitrage detection, and regime-switching models to minimize downside exposure.
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
                  Built a production financial data pipeline ingesting real-time market feeds from multiple
                  cryptocurrency and equity exchanges with sub-second data freshness guarantees.
                </p>
                <p className="section-text">
                  Designed LLM-powered autonomous research agents capable of automating complex financial
                  analysis tasks, reducing manual research time by 10+ hours per week for portfolio managers.
                </p>
                <button type="button" className="section-button">
                  <a href="https://github.com/erikchan1000/HEDGE-FUND" target="_blank" rel="noreferrer">Github repo →</a>
                </button>
              </div>
            </div>
            <div className="project-card">
              <div className="project-card__image-wrap">
                <img src={CHART_IMAGES.aiScribe} alt="Clinician using a tablet — AI medical scribe" className="project-card__image" />
              </div>
              <div className="project-card__body">
                <h3 className="section-heading">AI Scribe</h3>
                <p className="section-text section-meta">Flutter, TypeScript, Fastify, Python, GCP, Vertex AI</p>
                <p className="section-text">
                  HIPAA-aligned medical scribe for home-health clinicians: captures visit conversations on-device,
                  generates OASIS and routine visit documentation with Vertex AI, and syncs finalized charting to EHR systems.
                </p>
                <p className="section-text">
                  Two-service architecture on Cloud Run — a Fastify CRUD API and a Python Pub/Sub processing
                  worker — with on-device STT, SSE event streaming, and FHIR integration via the Cloud Healthcare API.
                </p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-card__image-wrap">
                <img src={CHART_IMAGES.codeMinion} alt="Terminal with code — autonomous coding agent" className="project-card__image" />
              </div>
              <div className="project-card__body">
                <h3 className="section-heading">Code Minion</h3>
                <p className="section-text section-meta">Go, Temporal, TypeScript, MCP, Goose</p>
                <p className="section-text">
                  Agentic harness for one-shot, end-to-end software delivery — accepts scoped engineering tasks
                  and returns review-ready merge requests with traceable outputs and audit trails.
                </p>
                <p className="section-text">
                  Temporal-orchestrated workflow with isolated execution environments, a ToolShed MCP server for
                  task-scoped tool access, and deterministic quality gates (lint, tests, CI policy) before publish.
                </p>
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
          </div>
        </section>
      </div>
    </div>
  );
}

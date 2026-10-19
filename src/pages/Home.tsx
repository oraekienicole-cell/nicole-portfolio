import { useEffect, useState } from 'react';
import { BackgroundVideo } from '../components/BackgroundVideo';
import { Hero } from '../components/Hero';
import { ProjectIndex } from '../components/ProjectIndex';
import { Metrics } from '../components/Metrics';
import { CaseStudies } from '../components/CaseStudies';
import { Founder } from '../components/Founder';
import { Testimonials } from '../components/Testimonials';
import { Speaking } from '../components/Speaking';
import { Writing } from '../components/Writing';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { useScrollFrame } from '../hooks/useScrollFrame';

export function Home() {
  const [heroActive, setHeroActive] = useState(true);

  // Drive the hero → canvas transition with one CSS variable.
  useScrollFrame(() => {
    const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    const root = document.documentElement;
    root.style.setProperty('--hero-p', p.toFixed(4));
    root.toggleAttribute('data-past-hero', p >= 1);
    setHeroActive(p < 1);
  });

  useEffect(() => {
    document.title = 'Nicole Oraekie · Product marketing';
    return () => {
      const root = document.documentElement;
      root.style.removeProperty('--hero-p');
      root.removeAttribute('data-past-hero');
    };
  }, []);

  return (
    <>
      <BackgroundVideo active={heroActive} />
      <Hero />

      {/* The editorial canvas rises over the receding video */}
      <div className="relative z-[1] bg-paper">
        <ProjectIndex />
        <Metrics />
        <CaseStudies />
        <Founder />
        <Speaking />
        <Testimonials />
        <About />
        <Writing />
        <Contact />
      </div>
    </>
  );
}

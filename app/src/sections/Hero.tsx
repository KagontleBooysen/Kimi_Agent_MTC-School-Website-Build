import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Hero() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(eyebrowRef.current, { opacity: 1, duration: 0.6, delay: 0.2 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(subheadlineRef.current, { opacity: 1, duration: 0.7 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        background: '#F6F2EE',
        overflow: 'hidden',
        fontFamily: "'Cairo', sans-serif",
        direction: dir,
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.2,
        }}
      >
        <source src="/videos/vid-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(246,242,238,0.85) 0%, rgba(246,242,238,0.6) 50%, rgba(246,242,238,0.4) 100%)',
          zIndex: 1,
        }}
      />

      {/* Topographic pattern overlay */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          zIndex: 1,
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path d="M0,200 Q360,100 720,200 T1440,200" fill="none" stroke="#13322B" strokeWidth="1" />
        <path d="M0,300 Q360,200 720,300 T1440,300" fill="none" stroke="#13322B" strokeWidth="1" />
        <path d="M0,400 Q360,300 720,400 T1440,400" fill="none" stroke="#13322B" strokeWidth="1.5" />
        <path d="M0,500 Q360,400 720,500 T1440,500" fill="none" stroke="#13322B" strokeWidth="1" />
        <path d="M0,600 Q360,500 720,600 T1440,600" fill="none" stroke="#13322B" strokeWidth="0.5" />
        <path d="M200,0 Q300,450 200,900" fill="none" stroke="#13322B" strokeWidth="0.5" />
        <path d="M600,0 Q700,450 600,900" fill="none" stroke="#13322B" strokeWidth="0.5" />
        <path d="M1000,0 Q1100,450 1000,900" fill="none" stroke="#13322B" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
          paddingTop: 72,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              opacity: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              color: '#F1AD44',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ marginRight: 8 }}>✦</span>
            {t.hero.eyebrow}
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#0E0D0D',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {t.hero.headline}{' '}
            <span style={{ color: '#F1AD44' }}>{t.hero.headlineAccent}</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            style={{
              opacity: 0,
              fontSize: '1.125rem',
              fontWeight: 400,
              color: '#5E5B5A',
              maxWidth: 480,
              lineHeight: 1.7,
              marginTop: 24,
            }}
          >
            {t.hero.subheadline}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{
              opacity: 0,
              transform: 'translateY(15px)',
              display: 'flex',
              gap: 16,
              marginTop: 36,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={scrollToPrograms}
              style={{
                background: '#13322B',
                color: '#FFFFFF',
                padding: '14px 32px',
                borderRadius: 6,
                fontWeight: 500,
                fontSize: '0.9375rem',
                fontFamily: "'Cairo', sans-serif",
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F1AD44';
                e.currentTarget.style.color = '#0E0D0D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#13322B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              {t.hero.ctaPrimary} →
            </button>
            <button
              onClick={scrollToAbout}
              style={{
                border: '1.5px solid rgba(14, 13, 13, 0.2)',
                color: '#0E0D0D',
                padding: '14px 32px',
                borderRadius: 6,
                fontWeight: 500,
                fontSize: '0.9375rem',
                fontFamily: "'Cairo', sans-serif",
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F1AD44';
                e.currentTarget.style.color = '#F1AD44';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(14, 13, 13, 0.2)';
                e.currentTarget.style.color = '#0E0D0D';
              }}
            >
              ▶ {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative line on right */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: '60vh',
          background: 'rgba(19, 50, 43, 0.08)',
          borderRadius: '2px 0 0 2px',
          zIndex: 2,
        }}
      />
    </section>
  );
}

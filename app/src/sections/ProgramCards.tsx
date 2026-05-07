import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

gsap.registerPlugin(ScrollTrigger);

function BookIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12a4 4 0 014-4h24v32H12a4 4 0 01-4-4V12z" />
      <path d="M36 8v32" />
      <path d="M16 16h12" />
      <path d="M16 22h12" />
    </svg>
  );
}

function FlaskIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8v12l-10 20a4 4 0 003.5 6h21a4 4 0 003.5-6L28 20V8" />
      <path d="M16 8h16" />
      <path d="M18 28h12" />
    </svg>
  );
}

function GraduationIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8L6 18l18 10 18-10L24 8z" />
      <path d="M6 18v12" />
      <path d="M18 23.5V32c0 3.3 2.7 6 6 6s6-2.7 6-6v-8.5" />
      <path d="M42 18v12" />
    </svg>
  );
}

export default function ProgramCards() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      icon: <BookIcon color="#13322B" />,
      title: t.programCards.card1.title,
      arabic: t.programCards.card1.arabic,
      description: t.programCards.card1.description,
    },
    {
      icon: <FlaskIcon color="#F1AD44" />,
      title: t.programCards.card2.title,
      arabic: t.programCards.card2.arabic,
      description: t.programCards.card2.description,
    },
    {
      icon: <GraduationIcon color="#13322B" />,
      title: t.programCards.card3.title,
      arabic: t.programCards.card3.arabic,
      description: t.programCards.card3.description,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current?.querySelectorAll('.program-card');
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#F6F2EE',
        padding: '100px 0',
        fontFamily: "'Cairo', sans-serif",
        direction: dir,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 600,
            color: '#0E0D0D',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          {t.programCards.heading}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#5E5B5A',
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          {t.programCards.subheading}
        </p>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
          className="program-cards-grid"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="program-card"
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                padding: 40,
                border: '1px solid rgba(14, 13, 13, 0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{ marginBottom: 20 }}>{card.icon}</div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#0E0D0D',
                  marginBottom: 4,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#5E5B5A',
                  marginBottom: 12,
                }}
              >
                {card.arabic}
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: '#5E5B5A',
                  lineHeight: 1.65,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .program-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

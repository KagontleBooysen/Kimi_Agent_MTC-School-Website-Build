import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animations
      gsap.to(labelRef.current, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(bodyRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.to(statItems, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Image slide in
      gsap.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Image parallax
      gsap.to(imgInnerRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '15+', label: t.about.stat1 },
    { number: '50+', label: t.about.stat2 },
    { number: '1200+', label: t.about.stat3 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#F6F2EE',
        padding: '120px 0',
        fontFamily: "'Cairo', sans-serif",
        direction: dir,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Text Column */}
        <div>
          <div
            ref={labelRef}
            style={{
              opacity: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#F1AD44',
              textTransform: 'uppercase',
            }}
          >
            {t.about.label}
          </div>

          <h2
            ref={headingRef}
            style={{
              opacity: 0,
              transform: 'translateY(25px)',
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 600,
              color: '#0E0D0D',
              lineHeight: 1.3,
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            {t.about.heading}
          </h2>

          <p
            ref={bodyRef}
            style={{
              opacity: 0,
              fontSize: '1rem',
              color: '#5E5B5A',
              lineHeight: 1.7,
              marginTop: 24,
            }}
          >
            {t.about.body}
          </p>

          <div
            ref={statsRef}
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 48,
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-item"
                style={{
                  opacity: 0,
                  transform: 'translateY(15px)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '2rem',
                    color: '#F1AD44',
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#5E5B5A',
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Column */}
        <div
          ref={imageRef}
          style={{
            opacity: 0,
            transform: dir === 'ltr' ? 'translateX(40px)' : 'translateX(-40px)',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '16/10',
          }}
        >
          <img
            ref={imgInnerRef}
            src="/images/img-about.jpg"
            alt="MTC Classroom"
            style={{
              width: '100%',
              height: '110%',
              objectFit: 'cover',
              display: 'block',
              position: 'absolute',
              top: '-5%',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}

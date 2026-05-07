import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

gsap.registerPlugin(ScrollTrigger);

interface BranchData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  position: 'above' | 'below';
}

export default function ProgramsTimeline() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const branches: BranchData[] = [
    {
      number: '01',
      title: t.programs.branch1.title,
      subtitle: t.programs.branch1.subtitle,
      description: t.programs.branch1.description,
      image: '/images/img-timeline-1.jpg',
      position: 'below',
    },
    {
      number: '02',
      title: t.programs.branch2.title,
      subtitle: t.programs.branch2.subtitle,
      description: t.programs.branch2.description,
      image: '/images/img-timeline-2.jpg',
      position: 'above',
    },
    {
      number: '03',
      title: t.programs.branch3.title,
      subtitle: t.programs.branch3.subtitle,
      description: t.programs.branch3.description,
      image: '/images/img-timeline-3.jpg',
      position: 'below',
    },
    {
      number: '04',
      title: t.programs.branch4.title,
      subtitle: t.programs.branch4.subtitle,
      description: t.programs.branch4.description,
      image: '/images/img-timeline-4.jpg',
      position: 'above',
    },
    {
      number: '05',
      title: t.programs.branch5.title,
      subtitle: t.programs.branch5.subtitle,
      description: t.programs.branch5.description,
      image: '/images/img-gallery-6.jpg',
      position: 'below',
    },
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const ctx = gsap.context(() => {
      const branchLines = sticky.querySelectorAll<SVGLineElement>('.branch-line');
      const numberEls = sticky.querySelectorAll<HTMLDivElement>('.branch-number');
      const contentEls = sticky.querySelectorAll<HTMLDivElement>('.branch-content');
      const dotEls = sticky.querySelectorAll<HTMLDivElement>('.branch-dot');
      const smallLines = sticky.querySelectorAll<SVGLineElement>('.small-line');
      const hLine = sticky.querySelector<SVGLineElement>('.horizontal-line');

      // Set initial states
      gsap.set(branchLines, { strokeDashoffset: 40 });
      gsap.set(numberEls, { opacity: 0, rotationX: -90, transformOrigin: '50% 100%' });
      gsap.set(contentEls, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set(dotEls, { opacity: 0, scale: 0 });
      gsap.set(smallLines, { scaleX: 0, transformOrigin: 'center' });
      if (hLine) gsap.set(hLine, { strokeDashoffset: 500 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: sticky,
        },
      });

      // Horizontal line draws first
      if (hLine) {
        tl.to(hLine, { strokeDashoffset: 0, duration: 1 }, 0);
      }

      // Branch lines draw (staggered from left to right)
      tl.to(branchLines, {
        strokeDashoffset: 0,
        duration: 0.3,
        stagger: 0.15,
        ease: 'power2.out',
      }, 0.2);

      // Dots appear at branch endpoints
      tl.to(dotEls, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        stagger: 0.15,
        ease: 'back.out(2)',
      }, 0.35);

      // Small decorative lines
      tl.to(smallLines, {
        scaleX: 1,
        duration: 0.2,
        stagger: 0.05,
      }, 0.4);

      // Numbers rotate in with 3D effect
      tl.to(numberEls, {
        opacity: 1,
        rotationX: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: 'power2.out',
      }, 0.45);

      // Content blocks fade/scale in
      tl.to(contentEls, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: 'power2.out',
      }, 0.5);
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="programs"
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '1200vh',
        position: 'relative',
        fontFamily: "'Cairo', sans-serif",
        direction: dir,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          background: '#0E0D0D',
        }}
      >
        {/* Section heading - top center */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 0,
            right: 0,
            zIndex: 20,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#F1AD44',
              textTransform: 'uppercase',
            }}
          >
            {t.programs.label}
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            {t.programs.heading}
          </h2>
        </div>

        {/* Main SVG - timeline line and branches */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Horizontal main line */}
          <line
            className="horizontal-line"
            x1="0" y1="50" x2="1000" y2="50"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="500"
            strokeDashoffset="500"
          />

          {/* Branch vertical lines */}
          {[100, 300, 500, 700, 900].map((x, i) => (
            <line
              key={i}
              className="branch-line"
              x1={x}
              y1={branches[i]?.position === 'above' ? 20 : 50}
              x2={x}
              y2={branches[i]?.position === 'above' ? 50 : 80}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeDasharray="40"
              strokeDashoffset="40"
              strokeLinecap="round"
            />
          ))}

          {/* Small decorative lines at each branch */}
          {[100, 300, 500, 700, 900].map((x, i) => (
            <g key={`s-${i}`}>
              <line
                className="small-line"
                x1={x - 15} y1={50} x2={x + 15} y2={50}
                stroke="rgba(241, 173, 68, 0.3)"
                strokeWidth="0.5"
              />
            </g>
          ))}
        </svg>

        {/* Dot markers on the main line */}
        {[100, 300, 500, 700, 900].map((x, i) => (
          <div
            key={`dot-${i}`}
            className="branch-dot"
            style={{
              position: 'absolute',
              left: `${x / 10}%`,
              top: '50%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#F1AD44',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              boxShadow: '0 0 12px rgba(241, 173, 68, 0.4)',
            }}
          />
        ))}

        {/* Branch numbers and content */}
        {branches.map((branch, i) => {
          const xPos = [10, 30, 50, 70, 90][i];
          const isAbove = branch.position === 'above';

          return (
            <div key={i}>
              {/* Number */}
              <div
                className="branch-number"
                style={{
                  position: 'absolute',
                  left: `${xPos}%`,
                  top: isAbove ? '18%' : '82%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  perspective: 1000,
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 400,
                    color: '#F1AD44',
                    lineHeight: 1,
                    textAlign: 'center',
                  }}
                >
                  {branch.number}
                </div>
              </div>

              {/* Content card */}
              <div
                className="branch-content"
                style={{
                  position: 'absolute',
                  left: `${xPos}%`,
                  top: isAbove ? '2%' : '58%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  width: 180,
                  maxWidth: '18vw',
                  minWidth: 140,
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    borderRadius: 6,
                    overflow: 'hidden',
                    marginBottom: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={branch.image}
                    alt={branch.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Text */}
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {branch.title}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                      color: '#F1AD44',
                      marginBottom: 4,
                    }}
                  >
                    {branch.subtitle}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.5,
                    }}
                  >
                    {branch.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

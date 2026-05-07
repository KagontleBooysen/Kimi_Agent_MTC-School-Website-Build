import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  category: string;
  caption: string;
  tall: boolean;
}

export default function Gallery() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images: GalleryImage[] = [
    { src: '/images/img-gallery-1.jpg', category: 'Science Lab', caption: 'Discovering Science', tall: true },
    { src: '/images/img-gallery-2.jpg', category: 'Performing Arts', caption: 'Stage Performance', tall: false },
    { src: '/images/img-gallery-3.jpg', category: 'STEM', caption: 'Robotics Workshop', tall: false },
    { src: '/images/img-gallery-4.jpg', category: 'Sports Day', caption: 'Annual Sports Day', tall: true },
    { src: '/images/img-gallery-5.jpg', category: 'Library', caption: 'Reading Hour', tall: false },
    { src: '/images/img-gallery-6.jpg', category: 'Art Studio', caption: 'Creative Arts', tall: false },
    { src: '/images/img-gallery-7.jpg', category: 'Music', caption: 'School Choir', tall: true },
    { src: '/images/img-gallery-8.jpg', category: 'Graduation', caption: 'Class of 2024', tall: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
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
      id="gallery"
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
            marginBottom: 4,
          }}
        >
          {t.gallery.heading}
          {' '}
          <span style={{ color: '#5E5B5A', fontWeight: 400 }}>{t.gallery.arabic}</span>
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#5E5B5A',
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          {t.gallery.subheading}
        </p>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}
          className="gallery-grid"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(img.src)}
              style={{
                gridRow: img.tall ? 'span 2' : 'span 1',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                aspectRatio: img.tall ? '3/4' : '4/3',
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.5s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 20,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#F1AD44',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {img.category}
                </span>
                <span
                  style={{
                    fontSize: '1rem',
                    color: '#FFFFFF',
                    marginTop: 4,
                  }}
                >
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '2rem',
              cursor: 'pointer',
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        .gallery-item:hover > div:last-child {
          opacity: 1 !important;
        }
        .gallery-item:hover > img {
          transform: scale(1.04);
        }
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-grid > div {
            grid-row: span 1 !important;
            aspect-ratio: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: dir === 'ltr' ? -20 : 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) {
        gsap.fromTo(
          fields,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dir]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    padding: '14px 18px',
    color: '#FFFFFF',
    fontSize: '0.9375rem',
    fontFamily: "'Cairo', sans-serif",
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#13322B',
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
          gap: 80,
        }}
        className="contact-grid"
      >
        {/* Left column */}
        <div ref={leftRef}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: 4,
            }}
          >
            {t.contact.heading}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            {t.contact.subheading}
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 6,
                }}
              >
                Phone
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '1.125rem',
                  color: '#F1AD44',
                }}
              >
                {t.contact.phone}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 6,
                }}
              >
                Email
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {t.contact.email}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 6,
                }}
              >
                Address
              </div>
              <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                {t.contact.address}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <form ref={formRef} onSubmit={handleSubmit}>
          {submitted && (
            <div
              style={{
                background: 'rgba(241, 173, 68, 0.15)',
                border: '1px solid rgba(241, 173, 68, 0.3)',
                borderRadius: 6,
                padding: '12px 16px',
                marginBottom: 20,
                color: '#F1AD44',
                fontSize: '0.875rem',
              }}
            >
              {lang === 'en' ? 'Thank you! Your message has been sent.' : 'شكراً! تم إرسال رسالتك.'}
            </div>
          )}

          <div className="form-field" style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder={t.contact.form.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                ...inputStyle,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F1AD44')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div className="form-field" style={{ marginBottom: 16 }}>
            <input
              type="email"
              placeholder={t.contact.form.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                ...inputStyle,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F1AD44')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div className="form-field" style={{ marginBottom: 16 }}>
            <input
              type="tel"
              placeholder={t.contact.form.phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                ...inputStyle,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F1AD44')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div className="form-field" style={{ marginBottom: 24 }}>
            <textarea
              placeholder={t.contact.form.message}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F1AD44')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div className="form-field">
            <button
              type="submit"
              style={{
                background: '#F1AD44',
                color: '#0E0D0D',
                padding: '14px 36px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.9375rem',
                fontFamily: "'Cairo', sans-serif",
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#F1AD44')}
            >
              {t.contact.form.submit}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </section>
  );
}

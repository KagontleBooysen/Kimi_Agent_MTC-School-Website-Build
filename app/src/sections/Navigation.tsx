import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

const navLinks = ['home', 'about', 'programs', 'gallery', 'contact'] as const;

export default function Navigation() {
  const { lang, dir, toggleLang } = useLanguage();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 72,
        background: scrolled ? 'rgba(246, 242, 238, 0.95)' : 'rgba(246, 242, 238, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(14, 13, 13, 0.08)',
        transition: 'background 0.3s ease',
        fontFamily: "'Cairo', sans-serif",
        direction: dir,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0E0D0D',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            MTC
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#5E5B5A',
              textTransform: 'uppercase',
            }}
          >
            Modern Teaching Schools
          </span>
        </div>

        {/* Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link === 'home' ? 'home' : link)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#0E0D0D',
                fontFamily: "'Cairo', sans-serif",
                padding: '4px 0',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F1AD44')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#0E0D0D')}
            >
              {/* @ts-ignore */}
              {t.nav[link]}
            </button>
          ))}
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          style={{
            background: '#13322B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            fontFamily: "'Cairo', sans-serif",
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1a4540')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#13322B')}
        >
          {t.nav.langToggle}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

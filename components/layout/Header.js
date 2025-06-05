// components/layout/Header.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="header__logo">
        <Link href="/" className="logo-link">
          <img src="/images/logo.svg" alt="Logo" className="logo-image" />
        </Link>
      </div>
      
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className="header__nav-container">
        <nav className="header__nav">
          <ul className="nav__list">
            <li><Link href="/" className="nav-link" onClick={closeMobileMenu}>{t('nav.home')}</Link></li>
            <li><Link href="/about" className="nav-link" onClick={closeMobileMenu}>{t('nav.about')}</Link></li>
            <li><Link href="/portfolio" className="nav-link" onClick={closeMobileMenu}>{t('nav.portfolio')}</Link></li>
            <li><Link href="/contact" className="nav-link" onClick={closeMobileMenu}>{t('nav.contact')}</Link></li>
          </ul>
        </nav>
        
        <button onClick={toggleLanguage} className="language-toggle">
          {i18n.language === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </header>
  );
};

export default Header;
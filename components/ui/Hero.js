// components/ui/Hero.js
import { useTranslation } from 'next-i18next';
import Button from './Button';

const Hero = () => {
  const { t } = useTranslation('home');
  
  return (
    <section className="hero">
      <div className="hero__image-container">
        <img 
          src="/images/hero-carpentry.jpg" 
          alt="Showcase of fine carpentry work" 
          className="hero__image" 
        />
        <div className="hero__overlay"></div>
      </div>
      
      <div className="hero__content">
        <h1 className="hero__title">
          {t('hero.title')}
        </h1>
        <p className="hero__subtitle">
          {t('hero.subtitle')}
        </p>
        <div className="hero__cta">
          <Button 
            href="/portfolio" 
            variant="primary" 
            className="hero__button"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
}

export default function About() {
  const { t } = useTranslation('about');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Use React.useMemo to ensure consistent rendering between server and client
  const ourStoryContent = React.useMemo(() => {
    const content = t('ourStory.content', { returnObjects: true });
    return Array.isArray(content) ? content : [];
  }, [t]);
  
  const ourTeamContent = React.useMemo(() => {
    const content = t('ourTeam.content', { returnObjects: true });
    return Array.isArray(content) ? content : [];
  }, [t]);
  
  const ourApproachContent = React.useMemo(() => {
    const content = t('ourApproach.content', { returnObjects: true });
    return Array.isArray(content) ? content : [];
  }, [t]);
  
  return (
    <Layout>
      <section className="about-hero">
        <div className="container">
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.subtitle')}</p>
        </div>
      </section>
      
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>{t('ourStory.title')}</h2>
              {isClient && ourStoryContent.map((paragraph, index) => (
                <p key={index}>{paragraph || ''}</p>
              ))}
              
              <h2>{t('ourTeam.title')}</h2>
              {isClient && ourTeamContent.map((paragraph, index) => (
                <p key={index}>{paragraph || ''}</p>
              ))}
              
              <h2>{t('ourApproach.title')}</h2>
              {isClient && ourApproachContent.map((paragraph, index) => (
                <p key={index}>{paragraph || ''}</p>
              ))}
            </div>
            
            <div className="about-image">
              <img 
                src={t('image.src') || ''} 
                alt={t('image.alt') || ''}
                className="rounded-image" 
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
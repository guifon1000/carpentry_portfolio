import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/ui/ContactForm';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  };
}

export default function Contact() {
  const { t } = useTranslation('contact');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Use React.useMemo to ensure consistent rendering between server and client
  const contactInfoList = React.useMemo(() => {
    const contactInfo = t('contactInfo', { returnObjects: true });
    return Array.isArray(contactInfo) ? contactInfo : [];
  }, [t]);
  
  return (
    <Layout>
      <section className="contact-hero">
        <div className="container">
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.subtitle')}</p>
        </div>
      </section>
      
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('getInTouch.title')}</h2>
              <p>{t('getInTouch.description')}</p>
              
              {isClient && contactInfoList.map((item, index) => (
                <div className="contact-item" key={index}>
                  <h3>{item.title || ''}</h3>
                  <p>{(item.content || '').split('\n').map((text, i) => (
                    <React.Fragment key={i}>
                      {text}
                      {i < (item.content || '').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}</p>
                </div>
              ))}
            </div>
            
            <div className="contact-form-container">
              <h2>{t('form.title')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section">
        <div className="container">
          <h2>{t('map.title')}</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>{t('map.placeholder')}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
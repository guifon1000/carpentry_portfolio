import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

const SITE_NAME = 'Fontaine Charpente & Conception';
const SITE_URL = 'https://fontaine-charpente-conception.com';

const DEFAULT_SEO = {
  fr: {
    title: 'Fontaine Charpente & Conception — Charpente traditionnelle et ossature bois à Brest',
    description: 'Charpentier à Brest, Bretagne. Charpente traditionnelle, ossature bois et créations sur mesure. Devis gratuit.',
  },
  en: {
    title: 'Fontaine Timber Framing & Design — Traditional timber framing in Brest, Brittany',
    description: 'Timber framer in Brest, Brittany. Traditional timber framing, wood frame construction and custom designs. Free quote.',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  email: 'guillaume@fontaine-charpente-conception.com',
  telephone: '+33640482718',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brest',
    addressRegion: 'Bretagne',
    addressCountry: 'FR',
  },
  founder: { '@type': 'Person', name: 'Guillaume Fontaine' },
  description: DEFAULT_SEO.fr.description,
};

export default function Layout({ children, title, description }) {
  const { locale = 'fr', asPath = '/' } = useRouter();
  const seo = DEFAULT_SEO[locale] || DEFAULT_SEO.fr;

  const pageTitle = title ? `${title} | ${SITE_NAME}` : seo.title;
  const pageDescription = description || seo.description;
  const canonical = `${SITE_URL}${locale === 'fr' ? '' : '/en'}${asPath === '/' ? '' : asPath}`;

  return (
    <div className="layout">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_GB'} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${asPath}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en${asPath === '/' ? '' : asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

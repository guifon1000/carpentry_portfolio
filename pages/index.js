import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import ProjectCard from '../components/ui/ProjectCard';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

export default function Home() {
  const { t: homeT } = useTranslation('home');
  
  // Client-side only rendering to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  
  const projectsList = React.useMemo(() => {
    const projects = homeT('projects.items', { returnObjects: true });
    if (!Array.isArray(projects)) return [];
    return projects;
  }, [homeT]);
  
  return (
    <Layout>
      <Hero />
      
      <section className="featured-projects">
        <div className="container">
          <h2>{homeT('projects.title', 'Featured Projects')}</h2>
          <div className="projects-grid">
            {isClient && projectsList.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title || ''}
                description={project.description || ''}
                imageUrl={project.imageUrl || ''}
                slug={project.slug || ''}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
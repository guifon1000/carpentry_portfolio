import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import ProjectCard from '../components/ui/ProjectCard';
import { getFeaturedProjects } from '../utils/portfolioUtils';

export async function getServerSideProps({ locale = 'en' }) {
  // Get featured projects
  const featuredProjects = getFeaturedProjects();
  
  return {
    props: {
      featuredProjects,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

export default function Home({ featuredProjects }) {
  const { t: homeT } = useTranslation('home');
  
  // Client-side only rendering to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <Layout>
      <Hero />
      
      <section className="featured-projects">
        <div className="container">
          <h2>{homeT('projects.title', 'Featured Projects')}</h2>
          <div className="projects-grid">
            {isClient && featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id || index}
                title={project.title || ''}
                description={project.description || ''}
                imageUrl={project.imageUrl || ''}
                slug={project.slug || ''}
                category={project.category || ''}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
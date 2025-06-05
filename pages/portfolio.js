import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import ProjectCard from '../components/ui/ProjectCard';
import { getPortfolioCategories } from '../utils/portfolioUtils';

export async function getServerSideProps({ locale = 'en' }) {
  // Get all portfolio categories
  const projects = getPortfolioCategories();
  
  // Get unique categories for filter buttons
  const categories = Array.from(
    new Set(projects.map(project => project.category || 'Uncategorized'))
  );
  
  return {
    props: {
      projects,
      categories,
      ...(await serverSideTranslations(locale, ['common', 'portfolio'])),
    }
  };
}

export default function Portfolio({ projects, categories }) {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  return (
    <Layout>
      <section className="portfolio-hero">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p className="lead">Explore our past projects and craftsmanship</p>
        </div>
      </section>
      
{/*       <section className="portfolio-filter">
        <div className="container">
          <div className="filter-options">
            <button 
              className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
              onClick={() => setActiveFilter('All')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section> */}
      
      <section className="portfolio-grid">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id || project.slug}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  slug={project.slug}
                  category={project.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
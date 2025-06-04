import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { getAllProjectSlugs, getProjectData } from '../utils/portfolioUtils';

// This function gets called at build time
export async function getStaticPaths() {
  // Get all project slugs
  const paths = getAllProjectSlugs();
  
  return { 
    paths, 
    // For static export, we need to set fallback to false
    fallback: false
  };
}

// This also gets called at build time
export async function getStaticProps({ params, locale = 'en' }) {
  // Get the project data from our utility function
  const project = getProjectData(params.projectSlug);
  
  // If no project is found, return 404
  if (!project) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      project,
      ...(await serverSideTranslations(locale, ['common'])),
    }
  };
}

export default function ProjectDetails({ project }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  return (
    <Layout>
      <section className="project-hero">
        <div className="container">
          <Link href="/portfolio" className="back-link">
            ← Back to Portfolio
          </Link>
          <h1>{project.title}</h1>
          <p className="lead">{project.description}</p>
        </div>
      </section>
      
      <section className="project-gallery">
        <div className="container">
          <div className="project-images">
            {project.images && project.images.map((image, index) => (
              <div key={index} className="project-image-container">
                <img src={image} alt={`${project.title} - image ${index + 1}`} className="project-image" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="project-details">
        <div className="container">
          <div className="project-grid">
            <div className="project-description">
              <h2>Project Description</h2>
              <div className="project-description-content">
                <p>{project.fullDescription}</p>
              </div>
            </div>
            
            <div className="project-info">
              <div className="info-card">
                <h3>Project Information</h3>
                <ul>
                  <li>
                    <span className="info-label">Category:</span>
                    <span className="info-value">{project.category}</span>
                  </li>
                  <li>
                    <span className="info-label">Client:</span>
                    <span className="info-value">{project.client}</span>
                  </li>
                  <li>
                    <span className="info-label">Completed:</span>
                    <span className="info-value">{project.completionDate}</span>
                  </li>
                  <li>
                    <span className="info-label">Location:</span>
                    <span className="info-value">{project.location}</span>
                  </li>
                </ul>
              </div>
              
              <div className="cta-card">
                <h3>Interested in a similar project?</h3>
                <p>Contact us to discuss your ideas and get a free consultation.</p>
                <Button href="/contact" variant="primary">Contact Us</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="related-projects">
        <div className="container">
          <h2>Related Projects</h2>
          <p>Explore more of our work in {project.category}</p>
          <Button href="/portfolio" variant="secondary">View All Projects</Button>
        </div>
      </section>
    </Layout>
  );
}
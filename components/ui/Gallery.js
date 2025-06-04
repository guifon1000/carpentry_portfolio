// components/ui/Gallery.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  
  // Extract categories from all projects
  const categories = ['all', ...new Set(projects.flatMap(project => project.categories))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));
  
  return (
    <div className="gallery">
      <div className="gallery__filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="gallery__grid">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="project-card__image-container">
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    width={400} 
                    height={300} 
                    objectFit="cover"
                    className="project-card__image"
                  />
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__category">{project.categories.join(', ')}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;

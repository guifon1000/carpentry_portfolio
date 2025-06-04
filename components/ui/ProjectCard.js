import React from 'react';
import Link from 'next/link';

export default function ProjectCard({ 
  title, 
  description, 
  imageUrl, 
  slug,
  category
}) {
  return (
    <div className="project-card">
      <div className="project-card__image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        {category && (
          <div className="project-card__category">{category}</div>
        )}
        <p className="project-card__description">{description}</p>
        <Link href={`/${slug}`} className="project-card__link">
          View Project
        </Link>
      </div>
    </div>
  );
}
import React from 'react';
import Link from 'next/link';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  onClick,
  type = 'button'
}) {
  const buttonClasses = `button button--${variant} button--${size} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      className={buttonClasses} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
import React from 'react';
import Link from 'next/link';
//     <li><Link href="/services" className="footer-link">Services</Link></li>
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Guillaume Fontaine</h3>
            <p>Charpente, Conception Bois</p>
          </div>
          
          <div className="footer-section">
            <h3>Pages</h3>
            <ul>
              <li><Link href="/" className="footer-link">Accueil</Link></li>
              <li><Link href="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link href="/about" className="footer-link">A propos</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>guillaume@fontaine-charpente-conception.com</p>
            <p>Brest, Bretagne</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Website by Atuin Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
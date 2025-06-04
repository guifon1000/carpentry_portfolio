import React from 'react';
import Link from 'next/link';
//     <li><Link href="/services" className="footer-link">Services</Link></li>
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Carpentry Portfolio</h3>
            <p>Quality craftsmanship for your home and business.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>info@carpentryportfolio.com</p>
            <p>(123) 456-7890</p>
            <p>123 Woodworking Ave, Craftstown, CT 12345</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Carpentry Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
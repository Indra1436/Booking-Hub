import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#about">Company</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><a href="#support">Support</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#facebook" className="social-icon">Facebook</a>
              <a href="#twitter" className="social-icon">Twitter</a>
              <a href="#instagram" className="social-icon">Instagram</a>
              <a href="#youtube" className="social-icon">YouTube</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Download App</h4>
            <div className="app-links">
              <a href="#google-play">
                <img src="google-play.png" alt="Google Play" />
              </a>
              <a href="#app-store">
                <img src="app-store.png" alt="App Store" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BookMyShow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

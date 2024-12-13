import React from "react";


function Footer() {
  return (
    <footer className="footerStyle">
      <div className="containerStyle">
        {/* Section des liens */}
        <div className="sectionStyle">
          <h4>Liens utiles</h4>
          <ul className="listStyle">
            <li><a href="/about" className="linkStyle">À propos</a></li>
            <li><a href="/contact" className="linkStyle">Contact</a></li>
            <li><a href="/faq" className="linkStyle">FAQ</a></li>
            <li><a href="/terms" className="linkStyle">Conditions d'utilisation</a></li>
            <li><a href="/privacy" className="linkStyle">Politique de confidentialité</a></li>
          </ul>
        </div>

        {/* Section contact */}
        <div className="sectionStyle">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:support@example.com" className="linkStyle">support@example.com</a></p>
          <p>Téléphone: <a href="tel:+1234567890" className="linkStyle">+1 234 567 890</a></p>
        </div>

        {/* Section des réseaux sociaux */}
        <div className="sectionStyle">
          <h4>Suivez-nous</h4>
          <div className="socialIconsStyle">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="iconStyle">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="iconStyle">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="iconStyle">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="iconStyle">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyrightStyle">
        &copy; {new Date().getFullYear()} Votre Site. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;

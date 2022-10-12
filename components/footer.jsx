import React from 'react';

function Footer(props) {
  return (
    <footer>
      <section className="ft-main">
        <div className="ft-main-item">
          <h2 className="ft-title">Terms & Conditions</h2>
          <ul>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
        <div className="ft-main-item">
          <h2 className="ft-title">Contact</h2>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>
        <div className="ft-main-item">
          <h2 className="ft-title">Donate</h2>
          <ul>
            <li><a href="#">BTC Address</a></li>
            <li><a href="#">ETH Address</a></li>
            <li><a href="#">BNB Address</a></li>
          </ul>
        </div>

        <div className="ft-main-item">
          <h2 className="ft-title">Stay Updated</h2>
          <p>Subscribe to our newsletter to get our latest news.</p>
          <form>
            <input type="email" name="email" placeholder="Enter email address" />
              <input type="submit" value="Subscribe" />
          </form>
        </div>
      </section>

      <section className="ft-social">
        <ul className="ft-social-list">
          <li><a href="#"><i className="fab fa-telegram"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
        </ul>
      </section>

      <section className="ft-legal">
        <ul className="ft-legal-list">
          <li><a href="#">Terms &amp; Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li>&copy; 2022</li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
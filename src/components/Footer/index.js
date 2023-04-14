import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        className="footer-logo"
        src="https://res.cloudinary.com/dodmtflaq/image/upload/v1668068913/PROJECT-TASTY-KITCHEN/Vector_qi1krn.png"
        alt="website-footer-logo"
      />
      <h1 className="footer-logo-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-info-text">
      The only thing we are serious about is food. <br /> Contact us on
    </p>
    <div className="social-media-logo-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-media-logo"
      />
      <FaInstagram
        testid="instagram-social-icon"
        className="social-media-logo"
      />
      <FaTwitter testid="twitter-social-icon" className="social-media-logo" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="social-media-logo"
      />
    </div>
  </div>
)

export default Footer

import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dmgefrbry/image/upload/v1681235985/Tasty%20Kitchen/Layer_1_k92rox.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="home-page-link">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound

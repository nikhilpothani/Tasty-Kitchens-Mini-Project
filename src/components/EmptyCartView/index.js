import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-bg-container">
    <img
      className="empty-cart-img"
      src="https://res.cloudinary.com/dmgefrbry/image/upload/v1681284268/Tasty%20Kitchen/OBJECTS_jc2ur5.svg"
      alt="empty cart"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView

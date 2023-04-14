import {Link} from 'react-router-dom'
import CartContext from '../../CartContext'

import './index.css'

const CartCheckout = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const clearCartAfterPayment = () => {
        removeAllCartItems()
      }

      return (
        <div className="payment-bg-container">
          <img
            className="payment-completed-img"
            src="https://res.cloudinary.com/dmgefrbry/image/upload/v1681238727/Tasty%20Kitchen/Vector_ct8rga.svg"
            alt="payment successful"
          />
          <h1 className="payment-heading">Payment Successful</h1>
          <p className="payment-description">
            Thank you for ordering
            <br /> Your payment is successfully completed.
          </p>
          <Link to="/">
            <button
              type="button"
              className="go-to-home-button"
              onClick={clearCartAfterPayment}
            >
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartCheckout

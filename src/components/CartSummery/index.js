import {BsStars} from 'react-icons/bs'
import CartContext from '../../CartContext'

import './index.css'

const CartSummery = props => {
  const {orderCheckout} = props
  const deliveryFee = 39

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let discount = 0

        let orderTotal = 0
        cartList.forEach(eachItem => {
          orderTotal += eachItem.cost * eachItem.quantity
        })

        if (orderTotal > 2499) {
          discount = Math.ceil((orderTotal / 100) * 10)
        }

        const remainingAmountForDiscount = 2500 - orderTotal

        const onClickCheckout = () => {
          orderCheckout()
        }

        return (
          <div className="order-summery-container">
            <hr className="order-summery-hr-line" />
            <div className="order-details-container">
              <h1 className="order-details-heading">Order Details</h1>
              {remainingAmountForDiscount > 0 ? (
                <h1 className="discount-not-applied">
                  Add More Rs.{remainingAmountForDiscount} to get 10% Discount
                </h1>
              ) : (
                <h1 className="discount-applied">
                  Congratulation
                  <BsStars color="#ffb700" /> You Saved
                  <span className="discount"> Rs.{discount}/- </span>
                </h1>
              )}
            </div>
            <div className="order-summery-details-container">
              <p className="order-summery-item-heading">Order Total</p>
              <p className="order-summery-item-value">₹ {orderTotal}</p>
            </div>
            {discount > 0 && (
              <div className="order-summery-details-container">
                <p className="order-summery-item-heading discount-color">
                  Discount
                </p>
                <p className="order-summery-item-value discount-color">
                  -{discount}
                </p>
              </div>
            )}
            <div className="order-summery-details-container">
              <p className="order-summery-item-heading">Delivery Fee</p>
              <p className="order-summery-item-value">₹ {deliveryFee}</p>
            </div>
            <div className="order-summery-details-container">
              <hr className="order-total-hr-line" />
            </div>
            <div className="order-summery-details-container">
              <h1 className="Amount-payable-heading">Amount Payable</h1>
              <div className="order-total-container">
                <p className="order-total" data-testid="total-price">
                  ₹ {orderTotal + deliveryFee - discount}
                </p>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={onClickCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummery

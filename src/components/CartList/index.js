import {Component} from 'react'

import CartCheckout from '../CartCheckout'
import CartItem from '../CartItem'
import CartSummery from '../CartSummery'
import CartContext from '../../CartContext'

import './index.css'

class CartList extends Component {
  state = {
    isCheckedOut: false,
  }

  orderCheckout = () => {
    this.setState(prevState => ({
      isCheckedOut: !prevState.isCheckedOut,
    }))
  }

  render() {
    const {isCheckedOut} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const onClickRemoveAllItems = () => {
            removeAllCartItems()
          }

          return isCheckedOut ? (
            <CartCheckout />
          ) : (
            <div className="cart-bg-container">
              <div className="cart-items-container">
                <div className="my-orders-remove-all-section">
                  <h1 className="my-orders-heading">My Orders</h1>
                  <button
                    type="button"
                    className="remove-all-button"
                    onClick={onClickRemoveAllItems}
                  >
                    Remove all
                  </button>
                </div>
                <div className="cart-total-items-container">
                  <h2 className="cart-item-name-heading">Item</h2>
                  <div className="cart-headings-container">
                    <h2 className="cart-item-heading">Quantity</h2>
                    <h2 className="cart-item-heading">Price</h2>
                    <h2 className="cart-item-heading">Remove</h2>
                  </div>
                </div>
                <hr className="order-summery-hr-line" />
                <ul className="cart-list-container">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.id} cartItem={eachItem} />
                  ))}
                </ul>
                <CartSummery orderCheckout={this.orderCheckout} />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartList

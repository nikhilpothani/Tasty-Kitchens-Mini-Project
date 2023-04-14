import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value
      const {cartItem} = props
      const {id, name, quantity, cost, imageUrl} = cartItem

      const decreaseItemQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const increaseItemQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onClickRemoveCartItem = () => {
        removeCartItem(id)
      }

      return (
        <>
          <li className="cart-item-container" data-testid="cartItem">
            <div className="mobile-view-cart-img-name-container">
              <img src={imageUrl} alt={name} className="cart-item-img" />
            </div>
            <div className="cart-item-img-name-container">
              <img
                src={imageUrl}
                alt={name}
                className="cart-item-img-desktop"
              />
              <h1 className="desktop-view-cart-item-name">{name}</h1>
            </div>
            <div className="cart-item-details-container">
              <h1 className="mobile-view-cart-item-name">{name}</h1>
              <div className="quantity-control-buttons-container">
                <button
                  className="control-button"
                  data-testid="decrement-quantity"
                  type="button"
                  onClick={decreaseItemQuantity}
                >
                  -
                </button>
                <div data-testid="item-quantity" className="quantity-text">
                  {quantity}
                </div>
                <button
                  className="control-button"
                  data-testid="increment-quantity"
                  type="button"
                  onClick={increaseItemQuantity}
                >
                  +
                </button>
              </div>
              <p className="cart-item-cost">₹ {cost}/- </p>
              <button
                type="button"
                className="desktop-cart-remove-button"
                onClick={onClickRemoveCartItem}
              >
                <AiFillCloseCircle color="#616e7c" size={20} />
              </button>
            </div>
            <button
              type="button"
              className="mobile-cart-remove-button"
              onClick={onClickRemoveCartItem}
            >
              <AiFillCloseCircle color="#616e7c" size={20} />
            </button>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem

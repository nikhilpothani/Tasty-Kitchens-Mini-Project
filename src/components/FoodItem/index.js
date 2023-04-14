import {Component} from 'react'
import {FaStar} from 'react-icons/fa'

import CartContext from '../../CartContext'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            decrementCartItemQuantity,
            incrementCartItemQuantity,
          } = value

          const {quantity} = this.state
          const {foodItemDetails} = this.props
          const {id, name, cost, imageUrl, rating} = foodItemDetails

          const addFoodItem = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              addCartItem({...foodItemDetails, quantity: quantity + 1}),
            )
          }

          const onClickIncrementBtn = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItemQuantity(id)
          }

          const onClickDecrementBtn = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(id)
          }

          return (
            <li className="food-item-container" data-testid="foodItem">
              <img src={imageUrl} alt="food item" className="food-item-img" />
              <div className="food-item-details-container">
                <h1 className="food-item-name">{name}</h1>
                <div>
                  <p className="food-item-price">₹ {cost}</p>
                </div>
                <p className="food-item-rating">
                  <FaStar color="#FFCC00" className="star-logo" />
                  {rating}
                </p>
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={addFoodItem}
                  >
                    Add
                  </button>
                ) : (
                  <div className="quantity-control-buttons-container">
                    <button
                      className="control-button"
                      data-testid="decrement-count"
                      type="button"
                      onClick={onClickDecrementBtn}
                    >
                      -
                    </button>
                    <div data-testid="active-count" className="quantity-text">
                      {quantity}
                    </div>
                    <button
                      className="control-button"
                      data-testid="increment-count"
                      type="button"
                      onClick={onClickIncrementBtn}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItem

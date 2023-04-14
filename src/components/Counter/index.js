import './index.css'

const Counter = props => {
  const {onClickIncrementBtn, onClickDecrementBtn, quantity} = props

  const decrement = () => {
    onClickDecrementBtn()
  }

  const increment = () => {
    onClickIncrementBtn()
  }

  return (
    <div className="quantity-control-buttons-container">
      <button
        className="control-button"
        data-testid="decrement-count"
        type="button"
        onClick={decrement}
      >
        -
      </button>
      <div data-testid="active-count" className="quantity-text">
        {quantity}
      </div>
      <button
        className="control-button"
        data-testid="active-count"
        type="button"
        onClick={increment}
      >
        +
      </button>
    </div>
  )
}

export default Counter

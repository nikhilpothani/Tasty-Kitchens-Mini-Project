import {Component} from 'react'

import CartContext from '../../CartContext'
import Header from '../Header'
import Footer from '../Footer'
import EmptyCartView from '../EmptyCartView'
import CartList from '../CartList'

import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const isCartEmpty = cartList.length === 0

          return (
            <>
              <Header />
              <div className="cart-container">
                {isCartEmpty ? <EmptyCartView /> : <CartList />}
              </div>
              <Footer />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart

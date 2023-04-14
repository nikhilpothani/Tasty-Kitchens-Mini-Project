import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Popup from 'reactjs-popup'

import CartContext from '../../CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  const getActiveButtonColor = currentActive => {
    const {history} = props
    if (history.location.pathname === currentActive) {
      return '#f7931e'
    }
    return '#334155'
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <nav className="nav-header">
            <div className="nav-container">
              <div className="logo-container">
                <Link to="/">
                  <img
                    className="header-logo"
                    src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
                    alt="website logo"
                  />
                </Link>
                <h1 className="logo-heading">Tasty Kitchen</h1>
              </div>

              <ul className="desktop-nav-items-container">
                <Link to="/" className="nav-link">
                  <li
                    className="nav-link-item"
                    style={{color: getActiveButtonColor('/')}}
                  >
                    Home
                  </li>
                </Link>

                <Link to="/cart" className="nav-link">
                  <li
                    className="nav-link-item"
                    style={{color: getActiveButtonColor('/cart')}}
                  >
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="cart-items-counter">
                        {cartItemsCount}
                      </span>
                    )}
                  </li>
                </Link>

                <li>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>

              <div className="popup-container">
                <Popup
                  className="popup-container"
                  trigger={
                    <button type="button" className="hamburger-button">
                      <GiHamburgerMenu size={25} />
                    </button>
                  }
                >
                  {close => (
                    <div className="mobile-view-nav-container">
                      <div className="mobile-view-nav-items-container">
                        <Link to="/" className="nav-link">
                          <p
                            className="nav-link-item"
                            style={{color: getActiveButtonColor('/')}}
                          >
                            Home
                          </p>
                        </Link>

                        <Link to="/cart" className="nav-link">
                          <p
                            className="nav-link-item"
                            style={{color: getActiveButtonColor('/cart')}}
                          >
                            Cart
                            {cartItemsCount > 0 && (
                              <span className="cart-items-counter">
                                {cartItemsCount}
                              </span>
                            )}
                          </p>
                        </Link>

                        <button
                          className="logout-button"
                          type="button"
                          onClick={onClickLogout}
                        >
                          Logout
                        </button>
                      </div>
                      <button type="button" className="close-button">
                        <AiFillCloseCircle size={20} onClick={() => close()} />
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)

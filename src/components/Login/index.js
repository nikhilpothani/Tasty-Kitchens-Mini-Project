import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import {BsFillEyeSlashFill, BsFillEyeFill} from 'react-icons/bs'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    submitError: false,
    errMsg: '',
    passwordVisible: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({errMsg, submitError: true})
  }

  onClickVisiblePassword = () => {
    this.setState(prevState => ({passwordVisible: !prevState.passwordVisible}))
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      submitError,
      errMsg,
      passwordVisible,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const passwordVisibleType = passwordVisible ? 'text' : 'password'

    return (
      <div className="login-bg-container">
        <div className="mobile-view-login-img-container">
          <img
            className="mobile-view-login-img"
            src="https://res.cloudinary.com/dmgefrbry/image/upload/v1680332571/Tasty%20Kitchen/mobile-view-login-img_j7fsxn.jpg"
            alt="website login"
          />
        </div>
        <div className="login-input-container">
          <div className="login-form-container">
            <div className="login-desktop-logo-container">
              <img
                className="desktop-login-logo"
                src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
                alt="website logo"
              />
              <h1 className="desktop-login-logo-text">Tasty Kitchens</h1>
            </div>
            <h1 className="login-heading">Login</h1>
            <form onSubmit={this.onSubmitLoginForm} className="login-form">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                className="input"
                type="text"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <div className="input-password-container">
                <input
                  className="password-input"
                  type={passwordVisibleType}
                  id="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
                <button
                  type="button"
                  className="password-visible-function"
                  onClick={this.onClickVisiblePassword}
                >
                  {passwordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </button>
              </div>
              {submitError && <p className="error-msg-text">{errMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="desktop-view-login-img-container">
          <img
            className="desktop-view-login-img"
            src="https://res.cloudinary.com/dmgefrbry/image/upload/v1680286454/Tasty%20Kitchen/Rectangle_1456_pagbdd.png"
            alt="web"
          />
        </div>
      </div>
    )
  }
}

export default Login

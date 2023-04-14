import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'

import FoodItem from '../FoodItem'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Restaurant extends Component {
  state = {
    isLoading: true,
    restaurantData: [],
    foodDetails: [],
    onlyVeg: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const restaurantData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        name: data.name,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const foodDetails = data.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))
      this.setState({isLoading: false, foodDetails, restaurantData})
    }
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurant-details-loader"
      className="restaurant-details-loader"
    >
      <Loader type="Bars" height="40" width="40" color="#f7931e" />
    </div>
  )

  onChangeCheckbox = () => {
    this.setState(prevState => ({onlyVeg: !prevState.onlyVeg}))
  }

  renderRestaurantDetails = () => {
    const {restaurantData, foodDetails, onlyVeg} = this.state
    const {
      name,
      costForTwo,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData

    return (
      <>
        <div className="restaurant-bg-container">
          <div className="restaurant-container">
            <div className="restaurant-img-container">
              <img src={imageUrl} alt="restaurant" className="restaurant-img" />
            </div>
            <div className="restaurant-details-container">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <div className="items-container">
                <p className="restaurant-location">{location}</p>
              </div>

              <div className="rating-price-container">
                <div className="restaurant-rating-container">
                  <div className="items-container">
                    <FaStar color="white" className="logo" />
                    <p className="item-heading">{rating}</p>
                  </div>
                  <p className="item-text">{reviewsCount}+ Ratings</p>
                </div>

                <hr className="rating-hr-line" />

                <div className="restaurant-rating-container">
                  <div className="items-container">
                    <BiRupee color="white" className="logo" />
                    <p className="item-heading-price">{costForTwo}</p>
                  </div>
                  <p className="item-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="food-items-section-bg-container">
          <div className="only-veg-container">
            <input
              id="checkbox"
              type="checkbox"
              className="input-checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              VEG Only
              <img
                src="https://res.cloudinary.com/dmgefrbry/image/upload/v1681443965/Tasty%20Kitchen/kisspng-vegetarian-cuisine-nopalito-nasi-goreng-food-samba-organic-5ac5745fa1b737.4580251715228898236624_kll5fq.png"
                alt="only Veg"
                className="only-veg-logo"
              />
            </label>
          </div>
          <ul className="food-items-list-container">
            {onlyVeg ? (
              <>
                {foodDetails.map(
                  eachItem =>
                    eachItem.foodType === 'VEG' && (
                      <FoodItem key={eachItem.id} foodItemDetails={eachItem} />
                    ),
                )}
              </>
            ) : (
              <>
                {foodDetails.map(eachItem => (
                  <FoodItem key={eachItem.id} foodItemDetails={eachItem} />
                ))}
              </>
            )}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="restaurant-details-section-container">
        <Header />
        {isLoading ? this.renderLoadingView() : this.renderRestaurantDetails()}
        <Footer />
      </div>
    )
  }
}

export default Restaurant

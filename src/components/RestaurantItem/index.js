import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'

import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {
    id,
    cuisine,
    imageUrl,
    name,
    rating,
    totalReviews,
    ratingColor,
  } = restaurantDetails

  return (
    <li data-testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-link-item">
        <div className="restaurant-item-card">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-item-img"
          />
          <div className="restaurant-item-details-container">
            <h1 className="restaurant-item-name">{name}</h1>
            <p className="restaurant-item-cuisine">{cuisine}</p>
            <div className="restaurant-item-ratings-container">
              <ImStarFull
                className="restaurant-rating-logo"
                color={`#${ratingColor}`}
              />
              <p className="restaurant-item-rating">{rating}</p>
              <p className="restaurant-item-total-rating">
                ({totalReviews} ratings)
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem

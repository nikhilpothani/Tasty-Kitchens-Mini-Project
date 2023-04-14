import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import RestaurantsFilter from '../RestaurantsFilter'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsList extends Component {
  state = {
    isLoading: false,
    restaurantsList: [],
    activePage: 1,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const totalNumberOfRestaurants = data.total
    const totalPages = Math.ceil(totalNumberOfRestaurants / limit)
    const formattedData = data.restaurants.map(eachRestaurant => ({
      id: eachRestaurant.id,
      cuisine: eachRestaurant.cuisine,
      imageUrl: eachRestaurant.image_url,
      name: eachRestaurant.name,
      rating: eachRestaurant.user_rating.rating,
      totalReviews: eachRestaurant.user_rating.total_reviews,
      ratingColor: eachRestaurant.user_rating.rating_color,
    }))

    this.setState({
      restaurantsList: formattedData,
      isLoading: false,
      totalPages,
      searchInput: '',
    })
  }

  onChangeSortOption = option => {
    this.setState({sortOption: option}, this.getRestaurantsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchKey = event => {
    if (event.key === 'Enter') {
      this.getRestaurantsList()
    }
  }

  onClickIncrementPage = () => {
    const {activePage} = this.state

    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickDecrementPage = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  renderRestaurantsList = () => {
    const {
      restaurantsList,
      sortOption,
      activePage,
      totalPages,
      searchInput,
    } = this.state

    return (
      <div className="restaurants-container">
        <RestaurantsFilter
          onChangeSortOption={this.onChangeSortOption}
          sortOption={sortOption}
          searchInput={searchInput}
          sortByOptions={sortByOptions}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickSearchKey={this.onClickSearchKey}
        />
        <hr className="hr-line" />
        <ul className="restaurants-list-items-container">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantItem
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
        <div className="button-controls-container">
          <button
            className="arrow-button"
            type="button"
            onClick={this.onClickDecrementPage}
            data-testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} className="arrow-logo" />
          </button>
          <p data-testid="active-page-number" className="active-page-text">
            {activePage}
          </p>
          <span
            className="active-page-text"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="active-page-text">{totalPages}</p>
          <button
            className="arrow-button"
            type="button"
            onClick={this.onClickIncrementPage}
            data-testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} className="arrow-logo" />
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="carousel-loader" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="restaurants-list-container">
        {isLoading ? this.renderLoadingView() : this.renderRestaurantsList()}
      </div>
    )
  }
}

export default RestaurantsList

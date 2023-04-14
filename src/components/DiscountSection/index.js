import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

class DiscountSection extends Component {
  state = {
    isLoading: false,
    carouselImagesList: [],
  }

  componentDidMount() {
    this.getCarouselImagesList()
  }

  getCarouselImagesList = async () => {
    this.setState({isLoading: true})

    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = data.offers.map(eachOffer => ({
      id: eachOffer.id,
      imageUrl: eachOffer.image_url,
    }))
    this.setState({carouselImagesList: formattedData, isLoading: false})
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="offers-images-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderCarouselImages = () => {
    const {carouselImagesList} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }

    return (
      <ul className="carousel-images">
        <Slider {...settings} className="carousel-container">
          {carouselImagesList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="each-carousal-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="discount-carousel-container">
        {isLoading ? this.renderLoadingView() : this.renderCarouselImages()}
      </div>
    )
  }
}

export default DiscountSection

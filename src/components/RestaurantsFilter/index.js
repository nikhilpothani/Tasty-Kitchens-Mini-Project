import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantsFilter = props => {
  const {
    onChangeSortOption,
    sortOption,
    sortByOptions,
    onChangeSearchInput,
    searchInput,
    onClickSearchKey,
  } = props

  const onChangeUpdateSortOption = event => {
    onChangeSortOption(event.target.value)
  }

  return (
    <div className="restaurant-filter-container">
      <h1 className="restaurant-filter-heading">Popular Restaurants</h1>
      <p className="filter-description">
        Select Your favourite restaurant special dish and make your day happy...
      </p>
      <div className="filter-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="Search for a Restaurant"
          onChange={onChangeSearchInput}
          onKeyDown={onClickSearchKey}
        />
        <div className="filter-items-container">
          <BsFilterLeft size={25} className="sort-logo" />
          <p className="sort-by-text">Sort By </p>
          <div className="sort-container">
            <select
              value={sortOption}
              onChange={onChangeUpdateSortOption}
              className="sort-options-container"
            >
              {sortByOptions.map(eachOption => (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="sort-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantsFilter

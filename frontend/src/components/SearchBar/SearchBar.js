import { min } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchSpots } from "../../store/spots";
import "./SearchBar.css";

const SearchBar = ({ isActive = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showFullSearchBar, setShowFullSearchBar] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleFullSearchBar = () => {
    setShowFullSearchBar(!showFullSearchBar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm && !minPrice && !maxPrice) return;

    if (!searchTerm) {
      setSearchTerm(null);
    }

    const searchParams = new URLSearchParams();
    if (searchTerm) {
      searchParams.set("q", searchTerm);
    }
    if (minPrice) {
      searchParams.set("minPrice", minPrice);
    }
    if (maxPrice) {
      searchParams.set("maxPrice", maxPrice);
    }
    const searchUrl = `/spots/search?${searchParams.toString()}`;
    dispatch(searchSpots(searchTerm, minPrice, maxPrice));
    history.push(searchUrl);
  };

  if (!isActive) return null;

  return (
    <div
      className={
        showFullSearchBar ? "search-bar search-bar-full" : "search-bar"
      }
    >
      {!showFullSearchBar ? (
        <div className="search-wrap">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control search-input-wrap">
                <input
                  className="input is-rounded is-expanded"
                  type="text"
                  placeholder="Start your search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={toggleFullSearchBar}
                  readonly
                />
              </div>
              <div className="control search-icon-wrap">
                <button
                  className="button is-primary is-rounded is-full-mobile"
                  type="submit"
                >
                  <span className="icon is-small">
                    <i className="fa fa-search" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="search-bar__full-search-bar">
          <div className="search-bar__full-search-bar__container">
            <form onSubmit={handleSubmit}>
              <div className="field has-addons ">
                <div className="control ">
                  <input
                    className="input is-rounded is-expanded"
                    type="text"
                    placeholder="Start your search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="control has-icons-left ">
                  <input
                    className="input is-rounded"
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-solid fa-dollar-sign"></i>
                  </span>
                </div>
                <div className="control has-icons-left">
                  <input
                    className="input is-rounded "
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-solid fa-dollar-sign"></i>
                  </span>
                </div>
                <div className="control search-btn">
                  <button
                    className="button is-primary is-rounded"
                    type="submit"
                  >
                    <span className="icon-text">
                      <span className="icon is-small">
                        <i className="fa fa-search" />
                      </span>
                      <span className="is-hidden-mobile	">Search</span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

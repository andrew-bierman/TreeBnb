import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useLocation } from "react-router-dom";

import SpotCard from "../SpotCard";

const SearchResultPage = () => {

    const dispatch = useDispatch();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const query = queryParams.get('q');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');


    const searchResults = useSelector(state => state.spots.searchSpots ? Object.values(state.spots.searchSpots) : []);

    return (
        <div>
            <div className="container has-text-centered p-6">
                <h1 className="title is-3">Search Results</h1>
                <h2></h2>
                {query && <h2 className="subtitle">for "{query}"</h2>}
                {minPrice && <h2 className="subtitle">with a minimum price of ${minPrice}</h2>}
                {maxPrice && <h2 className="subtitle">with a maximum price of ${maxPrice}</h2>}
                <h2 className="subtitle">Showing {searchResults.length} results</h2>
            </div>
            <div className='columns is-flex-wrap-wrap is-3 pt-5 pl-3 pr-3'>
                {searchResults && searchResults.map(spot => (
                    <SpotCard key={spot.id} spot={spot} />
                ))}
            </div>
        </div>
    )
}

export default SearchResultPage;

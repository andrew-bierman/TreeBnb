import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom';

import { getAllSpots, getOneSpot, actionCreatorResetAllSpots } from '../../store/spots';
import './Spots.css'

const AllSpotsComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllSpots());

        return ( () => dispatch(actionCreatorResetAllSpots()) )

    }, [dispatch]);

    let allSpots = useSelector(state => {
        // console.log(state)

        // const spots = state.spots.allSpots.forEach(spot => )
        // const { spotId } =


        // return state.spots.allSpots.map(spotId => state.allSpots[spotId]);

        return state.spots.allSpots
    })

    if(!allSpots) {
        return null
    }

    allSpots = Object.values(allSpots)

    console.log('spots ----', {allSpots})

    return (

        <div className='spots-list'>

            {allSpots && allSpots.map(spot => (
                <NavLink key={spot.id} to={`/spots/${spot.id}`} className='spot-container'>
                    <div key={spot.id} className='spot-details-container'>
                        <div className='spot-image-container'>
                            <img src={spot.previewImage} alt='Preview Image'></img>
                        </div>
                        <div className='spot-details-review-price-location'>
                            <div className='review-location'>
                                <h4>{spot.city}, {spot.state}</h4>
                                { spot.avgRating && (
                                    <div className='spot-details-avg-rating'>
                                        <i className="fas fa-solid fa-star"></i>
                                        <h5>{(spot.avgRating).toFixed(2)}</h5>
                                    </div>
                                ) }
                            </div>
                            <div className='spot-details-price'>
                                { spot.price && (
                                    <div className='spot-details-price'>
                                        <p className='price-number'>{`$${(spot.price).toFixed(2)}`}</p>
                                        <p>night</p>
                                    </div>
                                ) }
                            </div>

                        </div>
                    </div>
                </NavLink>
            ))}

        </div>

    );
}

export default AllSpotsComponent

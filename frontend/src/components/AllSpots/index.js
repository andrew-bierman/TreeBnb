import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllSpots, actionCreatorResetAllSpots } from '../../store/spots';

import './Spots.css'

const AllSpotsComponent = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.allSpots ? Object.values(state.spots.allSpots) : []);

    useEffect(() => {
        dispatch(getAllSpots());
        return () => dispatch(actionCreatorResetAllSpots());
    }, [dispatch]);


    if (!allSpots || !allSpots.length) return null;

    return (
        <div className='columns is-flex-wrap-wrap is-3 pt-5 pl-3 pr-3'>
            {allSpots && allSpots.map(spot => (
                <NavLink key={spot.id} to={`/spots/${spot.id}`} className='column is-full-mobile is-half-tablet is-one-quarter-desktop'>
                    <div className='spot-details-container box p-0'>
                        <div className='image is-3by2'>
                            <img src={spot.previewImage} alt='Preview Image'/>
                        </div>
                        <div className='p-2 pt-3'>
                            <div className='is-flex is-justify-content-space-between is-align-items-center mb-3'>
                                <h6 class="title is-6 m-0">{spot.city}, {spot.state}</h6>
                                {spot.avgRating && (
                                    <div className='is-flex is-align-items-center font-14'>
                                        <i className="fas fa-star mr-1"></i>
                                        <h5>{Number(spot.avgRating).toFixed(2)}</h5>
                                    </div>
                                )}
                            </div>
                            {spot.price && <h6 class="subtitle is-6 font-14"><span className='weight-600'>${Number(spot.price).toFixed(0)}</span> night</h6>}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default AllSpotsComponent

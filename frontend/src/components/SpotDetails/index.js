import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom';

import { getOneSpot } from '../../store/spots';
// import './Spots.css'

const SpotDetailsComponent = () => {
    const dispatch = useDispatch();

    const {spotId} = useParams()

    useEffect(() => {
        // console.log("dispatching getAllShots()")
        dispatch(getOneSpot(spotId));
    }, [dispatch]);

    let spot = useSelector(state => {
        // console.log(state)

        // const spots = state.spots.allSpots.forEach(spot => )
        // const { spotId } =


        // return state.spots.allSpots.map(spotId => state.allSpots[spotId]);

        return state.spots.singleSpot
    })

    if(!spot) {
        return null
    }

    // spot = Object.values(spot)

    console.log('spot details ----', {spot})

    return (

        <div className='spot-details'>
            {spot && (
                <div className='spot-details-comp'>
                    <h4>{spot.name}</h4>
                    <br></br>
                    <div className='secondary-details'>
                        <div className='review-stats'>
                            <i className="fas fa-solid fa-star"></i>
                            <p>{spot.avgRating}</p>
                        </div>

                        <div className='location-details'>
                            <p>{spot.city}</p>
                            <p>{spot.country}</p>
                        </div>

                        <div className='images'>
                            {/* <img src={spot.SpotImages[0]} alt='preview image'></img> */}

                        </div>

                        <div className='host-details'>
                            <p>{`Hosted by ${spot.Owner.firstName}`}</p>
                        </div>

                    </div>
                </div>

            )}

            {/* {allSpots && allSpots.map(spot => (
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                    <div key={spot.id}>
                        <img src={spot.previewImage} alt='Preview Image'></img>
                        <h4>{spot.name}</h4>
                        <p>{spot.city}</p>
                        <p>{`$${spot.price}`}</p>
                    </div>
                </NavLink>
            ))} */}

        </div>

    );
}

export default SpotDetailsComponent

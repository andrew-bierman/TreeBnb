import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom';

import { getAllSpots, getOneSpot } from '../../store/spots';
import './Spots.css'

const AllSpotsComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("dispatching getAllShots()")
        dispatch(getAllSpots());
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
                    <div key={spot.id}>
                        <img src={spot.previewImage} alt='Preview Image'></img>
                        <h4>{spot.name}</h4>
                        <p>{spot.city}, {spot.state}</p>
                        <p>{`$${spot.price} night`}</p>
                    </div>
                </NavLink>
            ))}

        </div>

    );
}

export default AllSpotsComponent

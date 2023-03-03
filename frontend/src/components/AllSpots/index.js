import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllSpots, actionCreatorResetAllSpots } from '../../store/spots';

import SpotCard from '../SpotCard';

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
                <SpotCard key={spot.id} spot={spot} />
            ))}
        </div>
    );
}

export default AllSpotsComponent

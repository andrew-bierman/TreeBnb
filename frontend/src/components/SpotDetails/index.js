import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom';

import { getOneSpot } from '../../store/spots';
import './SpotDetails.css'

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

    const previewImage = spot.SpotImages.find( ({ preview }) => preview === true );
    let secondaryImages;

    if(previewImage){
        secondaryImages = spot.SpotImages.find( ({ id }) => id !== previewImage.id );
    }

    console.log('spot details ----', {spot})

    return (

        <div className='spot-details'>
            {spot && (
                <div className='spot-details-comp'>
                    <h4>{spot.name}</h4>
                    <div className='secondary-details'>
                        <div className='review-and-location'>
                            <div className='review-stats'>
                                <i className="fas fa-solid fa-star"></i>
                                <p>{spot.avgRating}</p>
                            </div>

                            <div className='location-details'>
                                <p>{spot.city}, {spot.state}</p>
                            </div>
                        </div>

                        <div className='images'>
                            {previewImage && (
                                <img src={previewImage.url} alt='preview-image'></img>

                            )}
                            {secondaryImages && (
                                secondaryImages.map(image => {
                                    <img key={image.id} src={image.url} alt='secondary-image'></img>
                                })
                            )}

                        </div>

                        <div className='host-details'>
                            {spot.Owner.firstName && (
                                <p>{`Hosted by ${spot.Owner.firstName}`}</p>
                            )}
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

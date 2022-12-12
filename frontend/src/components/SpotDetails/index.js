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


    let user = useSelector(state => {
        // console.log(state)

        return state.session.user
    })

    if(!spot) {
        return null
    }

    const previewImage = spot.SpotImages.find( ({ preview }) => preview === true );

    let secondaryImages;
    let secondaryImagesKeys;
    let secondaryImagesValues

    if(previewImage){
        secondaryImages = spot.SpotImages.filter( ({ id }) => id !== previewImage.id );

        if(Object.keys(secondaryImages).length > 1){
            // secondaryImages = Object.values(secondaryImages)
            console.log('values ---', Object.values(secondaryImages))
            // console.log('keys ---', Object.keys(secondaryImages))
            secondaryImagesValues = Object.keys(secondaryImages).map(e => secondaryImages[e])
            secondaryImagesKeys = Object.keys(secondaryImages)
            // console.log('secondaryImagesKeys[1]', secondaryImagesKeys[1])
        }

    }

    // console.log('spot details ----', {spot})
    console.log('secondary images ----', secondaryImages, typeof secondaryImages)

    console.log('secondary images values ----', secondaryImagesValues, 'isarray', Array.isArray(secondaryImagesValues))


    let isLoggedIn
    let isSpotOwner

    if(!user){

        isLoggedIn = false

    } else {

        isLoggedIn = true

        if(user.id === spot.ownerId){
            isSpotOwner = true
        } else {
            isSpotOwner = false
        }
    }

    // if(Array.isArray(secondaryImagesValues)){
    //     return (

    //     )
    // }


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
                            <div className='preview-image-container'>
                                {previewImage && (
                                    <img src={previewImage.url} alt='preview-image' className='preview-image'></img>

                                )}
                            </div>

                            <div className='secondary-images-container'>
                                {(secondaryImagesValues.length > 0) && (
                                    secondaryImagesValues.map(image => (
                                        <img key={image.id} src={image.url} alt='secondary-image' className='secondary-image'></img>
                                    ))
                                )}
                            </div>

                        </div>



                        <div className='host-details'>
                            {spot.Owner.firstName && (
                                <p>{`Hosted by ${spot.Owner.firstName}`}</p>
                            )}
                        </div>

                        {isSpotOwner && (
                            <button>Edit this spot</button>
                        )}

                    </div>
                </div>

            )}



        </div>

    );
}

export default SpotDetailsComponent

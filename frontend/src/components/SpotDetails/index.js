import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { getOneSpot } from '../../store/spots';
import { getOneSpotReviews } from '../../store/reviews';
import './SpotDetails.css'

const SpotDetailsComponent = () => {
    const dispatch = useDispatch();

    const history = useHistory()

    const { spotId } = useParams()

    useEffect(() => {
        // console.log("dispatching getAllShots()")
        dispatch(getOneSpot(spotId));
        dispatch(getOneSpotReviews(spotId))
    }, [dispatch]);

    let spot = useSelector(state => {

        return state.spots.singleSpot
    })


    let user = useSelector(state => {
        // console.log(state)

        return state.session.user
    })

    let reviews = useSelector(state => {
        // console.log(state)

        return state.reviews.spot
    })

    let reviewsValues
    if(reviews){
        reviewsValues = Object.keys(reviews).map(e => reviews[e])
    }

    if(!spot) {
        return null
    }

    const previewImage = spot.SpotImages.find( ({ preview }) => preview === true );

    let secondaryImages;
    // let secondaryImagesKeys;
    let secondaryImagesValues

    if(previewImage){
        secondaryImages = spot.SpotImages.filter( ({ id }) => id !== previewImage.id );

        if(Object.keys(secondaryImages).length > 1){
            // secondaryImages = Object.values(secondaryImages)
            // console.log('values ---', Object.values(secondaryImages))
            // console.log('keys ---', Object.keys(secondaryImages))
            secondaryImagesValues = Object.keys(secondaryImages).map(e => secondaryImages[e])
            // secondaryImagesKeys = Object.keys(secondaryImages)
            // console.log('secondaryImagesKeys[1]', secondaryImagesKeys[1])
        }

    }


    const handleEditSpotRoute = () =>{
        history.push(`/spots/${spotId}/edit`);
    }

    const handleCreateReviewRoute = () =>{
        history.push(`/spots/${spotId}/reviews/create`);
    }
    // console.log('spot details ----', {spot})
    // console.log('secondary images ----', secondaryImages, typeof secondaryImages)

    // console.log('secondary images values ----', secondaryImagesValues, 'isarray', Array.isArray(secondaryImagesValues))


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
                                {(secondaryImagesValues) && (secondaryImagesValues.length > 0) && (
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

                        <div className='edit-spot-button-container'>
                            {isSpotOwner && (
                                <button onClick={handleEditSpotRoute}>Edit this spot</button>
                                )}
                        </div>

                    </div>

                    <br></br>

                    <div className='reviews-container'>
                        <h3>Reviews</h3>

                        {reviewsValues && (
                            reviewsValues.map(review => (
                                <div className='review-container'>
                                    <div className='review-stars'>
                                        <i className="fas fa-solid fa-star"></i>
                                        <p>
                                            {
                                                review.stars
                                            }
                                        </p>
                                    </div>

                                    <p>{ review.User.firstName }</p>
                                    <p>{ review.review }</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='add-review-button-container'>
                            {!isSpotOwner && (
                                // <NavLink to={`/spots/${spotId}/reviews/create`}>
                                    <button onClick={handleCreateReviewRoute}>Review this spot</button>
                                // </NavLink>
                                )}
                        </div>

                </div>

            )}



        </div>

    );
}

export default SpotDetailsComponent

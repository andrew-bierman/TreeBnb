import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { getOneSpot, actionCreatorResetSingleSpot, deleteSpot } from '../../store/spots';
import { getOneSpotReviews, getCurrentUserReviews } from '../../store/reviews';
import './SpotDetails.css'

const SpotDetailsComponent = () => {
    const dispatch = useDispatch();

    const history = useHistory()

    const { spotId } = useParams()

    useEffect(() => {
        // console.log("dispatching getAllShots()")
        dispatch(getOneSpot(spotId));
        dispatch(getOneSpotReviews(spotId))

        return ( () => dispatch(actionCreatorResetSingleSpot()) )

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
        // console.log('clicked')
        history.push(`/spots/${spotId}/edit`);
    }

    const handleCreateReviewRoute = () =>{
        history.push(`/spots/${spotId}/reviews/create`);
    }

    const handleEditReviewRoute = (reviewId) =>{
        // console.log('clicked')
        history.push(`/reviews/${reviewId}/edit`);
    }

    const confirmDelete = async () => {
        if (window.confirm("Please confirm you would like to delete a spot, this action cannot be undone.") == true) {
          let deleteSpotResponse = await dispatch(deleteSpot(spotId))
          // console.log(deleteSpotResponse)
          history.push('/')
        }
      }

    // console.log('spot details ----', {spot})
    // console.log('secondary images ----', secondaryImages, typeof secondaryImages)

    // console.log('secondary images values ----', secondaryImagesValues, 'isarray', Array.isArray(secondaryImagesValues))


    let isLoggedIn
    let isSpotOwner
    let hasAlreadyReviewed
    let isReviewOwner

    if(!user){

        isLoggedIn = false

    } else {

        dispatch(getCurrentUserReviews())

        isLoggedIn = true

        if(user.id === spot.ownerId){
            isSpotOwner = true
        } else {
            isSpotOwner = false
        }

        const findUserReviews = reviewsValues.find(({User}) => User.id === user.id)
        // const findUserReviewsForCurrentSpot = reviewsValues.find(({User}) => (
        //     // User.id === user.id && spotId ===

        //     ))

        if(findUserReviews){
            console.log({reviewsValues}, {findUserReviews})
            hasAlreadyReviewed = true

        } else {
            hasAlreadyReviewed = false
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
                    <h2>{spot.name}</h2>
                    <div className='secondary-details'>

                        <div className='review-and-location-and-buttons'>
                            <div className='review-and-location'>
                                <div className='review-stats'>
                                    <i className="fas fa-solid fa-star"></i>
                                    { spot.avgRating && (
                                        <p>{(spot.avgRating).toFixed(2)}</p>
                                    ) }
                                </div>

                                <div className='location-details'>
                                    <p>{spot.city}, {spot.state}</p>
                                </div>
                            </div>

                            { isSpotOwner && (
                                <div className='edit-spot-delete-spot-buttons-container'>
                                    <div className='edit-spot-button-container'>
                                        {isSpotOwner && (
                                            <button onClick={handleEditSpotRoute}>Edit this spot</button>
                                            )}
                                    </div>

                                    <div className='delete-spot-button'>
                                        <button onClick={confirmDelete}>
                                            Delete Spot
                                        </button>
                                    </div>

                                </div>
                            ) }

                        </div>



                        <div className='images'>
                            <div className='preview-image-container'>
                                {previewImage && (
                                    <img src={previewImage.url} alt='preview-image' className='preview-image'></img>

                                )}
                            </div>

                            <div className='secondary-images-container'>
                                {(secondaryImagesValues) && (secondaryImagesValues.length > 0) && (
                                    secondaryImagesValues.slice(0, 4).map((image, index )=> (
                                        <div className='secondary-image-container'>
                                            <img key={image.id} src={image.url} alt='secondary-image' className={`secondary-image ${index === 1 ? 'border-top-right' : index === 3 ? 'border-bottom-right' : ''}`}></img>

                                        </div>
                                    ))
                                )}
                            </div>

                        </div>



                        <div className='host-details'>
                            {spot.Owner.firstName && (
                                <div className='host-details-'>
                                    <h2>
                                        {`Hosted by ${spot.Owner.firstName}`}
                                        &emsp;
                                        <i className="fas fa-user-circle"></i>
                                    </h2>
                                </div>
                            )}
                            <hr></hr>
                        </div>

                        <div className='spot-details-description-container'>
                            { spot.description && (
                                <p>{ spot.description }</p>
                            ) }

                            <hr></hr>

                        </div>

                    </div>

                    <br></br>

                    <div className='reviews-container'>
                        <h3>Reviews</h3>

                        {reviewsValues && (reviewsValues.length > 0) && (
                            reviewsValues.map(review => (
                                <div className='review-container'>
                                    <div className='review-stars'>
                                        <i className="fas fa-solid fa-star"></i>
                                        { review.stars && (
                                            <p>
                                                {
                                                    (review.stars).toFixed(2)
                                                }
                                            </p>
                                        ) }
                                    </div>

                                    { review.User.firstName && (
                                        <p>{ review.User.firstName }</p>
                                    )}

                                    { review.review && (
                                        <p>{ review.review }</p>

                                    )}


                                    { (user) && ( review.User.id === user.id ) && (
                                        <button onClick={() => handleEditReviewRoute(review.id)}>Edit this review</button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className='add-review-button-container'>
                            { (user) && (!isSpotOwner) && (!hasAlreadyReviewed) && (
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

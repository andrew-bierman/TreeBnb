import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

// import { getOneSpot } from '../../store/spots';
import { getCurrentUserReviews, deleteReview } from '../../store/reviews';
import './CurrentUserReviews.css'

const CurrentUserReviewsComponent = () => {
    const dispatch = useDispatch();

    const history = useHistory()

    let user = useSelector(state => {
        // console.log(state)

        return state.session.user
    })

    let reviews = useSelector(state => {
        // console.log(state)

        return state.reviews.user
    })

    useEffect(() => {
        dispatch(getCurrentUserReviews());
    }, [dispatch]);


    let reviewsValues;

    if(reviews){
        reviewsValues = Object.keys(reviews).map(e => reviews[e])
    }

    if(!reviews) {
        return null
    }

    const handleEditSpotRoute = () =>{
        // history.push(`/spots/${spotId}/edit`);
    }

    const handleCreateReviewRoute = () =>{
        // history.push(`/spots/${spotId}/reviews/create`);
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

        // if(user.id === spot.ownerId){
        //     isSpotOwner = true
        // } else {
        //     isSpotOwner = false
        // }

    }


    const confirmDelete = async (reviewId) => {
        if (window.confirm("Please confirm you would like to delete a review, this action cannot be undone.") == true) {
          let deleteReviewResponse = await dispatch(deleteReview(reviewId))
          console.log(deleteReviewResponse)
          history.push('/user/current')
        }
      }


    // let reviewId
    const handleEditReviewRoute = (reviewId) =>{
        // console.log('clicked')
        history.push(`/reviews/${reviewId}/edit`);
    }



    return (

        <div className='reviews-details'>

            {user && (
                <div className='reviews-details-comp'>
                    <h2>Your Reviews</h2>

                    <div className='reviews-container'>

                        {reviewsValues && (
                            reviewsValues.map(review => (
                                <div className='review-container' key={review.id}>
                                    <p>{review.Spot.name}</p>

                                    <p>{review.Spot.city}, {review.Spot.state}</p>

                                    <div className='review-stars'>
                                        <i className="fas fa-solid fa-star"></i>
                                        <p>
                                            {
                                                review.stars
                                            }
                                        </p>
                                    </div>


                                    <p>{review.review}</p>

                                    { (review.ReviewImages !== []) && (review.ReviewImages.map(image => (
                                        <div>
                                            {/* <img alt='review-image' src={image.url}></img> */}
                                        </div>
                                        ))
                                    )}

                                    {/* { review.User.id && (
                                        review.User.id
                                    ) } */}

                                    <button onClick={() => handleEditReviewRoute(review.id)}>Edit Review</button>

                                    <button onClick={() => confirmDelete(review.id)}>Delete Review</button>

                                    {/* { review.User.firstName && (
                                        <p>{review.User.firstName}</p>
                                    )} */}

                                    {/* <p>{ review.review }</p> */}
                                </div>
                            ))
                        )}
                    </div>

                </div>

            )}



        </div>

    );
}

export default CurrentUserReviewsComponent

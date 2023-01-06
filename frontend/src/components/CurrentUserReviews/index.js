import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Slider from "react-slick";

// import { getOneSpot } from '../../store/spots';
import { deleteReview } from '../../store/reviews';

import './CurrentUserReviews.css'


const CurrentUserReviewsComponent = ({ reviews }) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector(state => state.session.user);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: reviews.length === 1 ? 1 : 2,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                infinite: true
              }
            }
        ]
    };
    
    const handleEditSpotRoute = () =>{
        // history.push(`/spots/${spotId}/edit`);
    }

    const handleCreateReviewRoute = () =>{
        // history.push(`/spots/${spotId}/reviews/create`);
    }
    // console.log('spot details ----', {spot})
    // console.log('secondary images ----', secondaryImages, typeof secondaryImages)

    // console.log('secondary images values ----', secondaryImagesValues, 'isarray', Array.isArray(secondaryImagesValues))

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
        <div className='mb-5 w-100'>
            <h3 className="title is-3 mt-6 centered">Your Reviews</h3>
            <div className='columns'>
                <Slider {...sliderSettings} className='column is-three-fifths-desktop is-offset-one-fifth-desktop is-half-tablet is-offset-3-tablet'>
                    {reviews && (
                        reviews.map(review => (
                            <div className='p-2 pb-4' key={review.id}>
                                <div className='review-box box is-flex is-flex-direction-column is-justify-content-space-between w-100'>
                                    <div>
                                        <h5 className="subtitle is-5 mb-2">{review.Spot.name}</h5>
                                        <div className='is-flex is-justify-content-space-between is-align-items-center mb-3'>
                                        <h6 className="title is-6 m-0">{review.Spot.city}, {review.Spot.state}</h6>
                                            <div className='is-flex is-align-items-center font-14'>
                                                <i className="fas fa-star mr-1"></i>
                                                <h5>{review.stars}</h5>
                                            </div>
                                        </div>
                                        <h6 className="subtitle is-6 m-0 review-text">{review.review}</h6>
                                    </div>
                                    <div className="buttons is-justify-content-flex-end mt-5">
                                        <button className="button is-light" onClick={() => handleEditReviewRoute(review.id)}>Edit Review</button>
                                        <button className="button is-danger" onClick={() => confirmDelete(review.id)}>Delete Review</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default CurrentUserReviewsComponent

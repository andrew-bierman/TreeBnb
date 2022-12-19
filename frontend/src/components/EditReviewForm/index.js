import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { updateReview, getCurrentUserReviews, actionCreatorUpdateReview, actionCreatorResetUserReviews } from '../../store/reviews';
import './EditReviewForm.css'

import React, { useState } from 'react';

const EditReviewForm = () => {

  const dispatch = useDispatch();

  const { reviewId } = useParams()

  let user = useSelector(state => {
    // console.log(state)

    return state.session.user
  })

  let userReviews = useSelector(state => {
    // console.log(state)

    return state.reviews.user

  })

  useEffect(() => {

    dispatch(getCurrentUserReviews())

    return ( () => dispatch(actionCreatorResetUserReviews()))

  }, [dispatch, reviewId])

  // let findReview = Object.values(userReviews).find(review => review.id !== reviewId)
  let findReview = userReviews[reviewId]


  const history = useHistory();

  const [review, setReview] = useState(findReview?.review || '');
  const [stars, setStars] = useState(findReview?.stars || 5);

  const updateReviewText = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const [errors, setErrors] = useState({});

  const [shouldShowErrors, setShouldShowErrors] = useState(false);

  if(!findReview || findReview.userId !== user.id){
    history.push('/user/current')
  }


  useEffect(() => {

    if(userReviews && findReview){
      console.log('hello', findReview)
      setReview(findReview.review)
      setStars(findReview.stars)
    }

  }, [userReviews])


  const validateForm = () => {

    // setErrors({})

    const newErrors = {}

    if (!review) {
      newErrors.review = 'Review is required'

    } else if ( review.length < 5){
        newErrors.review = 'Review must be more than 5 characters'

    } else {
      newErrors.review = null
      delete newErrors.review
    }

    if(!stars){
      newErrors.lat = 'Stars input is required'

    } else if ((parseFloat(stars) < 1) || (parseFloat(stars) > 5)){
      newErrors.stars = 'Stars input is not valid'

    } else {
      newErrors.stars = null
      delete newErrors.stars
  }

    setErrors({
      // ...errors,
      ...newErrors
    })

    if(errors.length > 0) console.log(errors)


  };

  useEffect(() => {
    validateForm()
  }, [
      review,
      stars
  ])


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    setShouldShowErrors(true);
    validateForm();


    console.log(Object.keys(errors).length)
    // If there are no errors, submit the form to your API
    if (Object.keys(errors).length === 0) {
      // Submit the form to your API
        const payload = {
          reviewId,
          review,
          stars,
          User: user
        };

        console.log({payload})

        let updatedReview = await dispatch(updateReview(payload))

        if (updatedReview) {
          // history.push(`/reviews/${createdReview.id}`);
          history.push(`/user/current`);
        }
    }
  };

  let isLoggedIn

  if(!user){
    return (
      <div className='login-message'>
        <p>Please login or signup to list your home</p>
      </div>
    )
  } else {
      isLoggedIn = true
  }



  return (

    <div className='create-spot-page-component'>

      {true && (

        <div className='form-component'>

          <h2>Edit a Review</h2>

          {/* Display error messages for all fields */}
          {Object.keys(errors).map(fieldName => {
            const errorMessage = errors[fieldName];
            if (shouldShowErrors && errorMessage) {
              return <p key={errorMessage} className="error">{errorMessage}</p>;
            }
          })}

          <div className='form-container'>

            <form onSubmit={handleSubmit}>
              <label className="name">Review:</label>
              <input
                type="textarea"
                id="review"
                name="review"
                value={review}
                onChange={updateReviewText}
              />
              {errors.review && <p>{errors.review}</p>}

              <label className="stars">Stars: {stars}</label>
              <input
                type="range"
                min="1"
                max="5"
                className="slider"

                id="stars"
                name="stars"
                value={stars}
                onChange={updateStars}
              />
              {errors.stars && <p>{errors.stars}</p>}

              <input type="submit" value="Submit"></input>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};


export default EditReviewForm

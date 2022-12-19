import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { createReview } from '../../store/reviews';
import './CreateReviewForm.css'

import React, { useState } from 'react';
import { validate } from 'uuid';

const CreateReviewForm = () => {

  const dispatch = useDispatch();

  const { spotId } = useParams()

  let user = useSelector(state => {
    // console.log(state)

    return state.session.user
})

  const history = useHistory();

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const [errors, setErrors] = useState({});

  const [shouldShowErrors, setShouldShowErrors] = useState(false);


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


    // If there are no errors, submit the form to your API
    if (Object.keys(errors).length === 0) {
      // Submit the form to your API
        const payload = {
          spotId,
          review,
          stars
        };

        let createdReview = await dispatch(createReview(payload))

        if (createdReview) {
          // history.push(`/reviews/${createdReview.id}`);
          history.push(`/user/current`);
        }
    }
  };

  let isLoggedIn

  if(!user){
    isLoggedIn = false
    return (
      <div className='login-message'>
        <p>Please login or signup to continue</p>
      </div>
    )
  } else {
      isLoggedIn = true
  }



  return (

    <div className='create-spot-page-component'>

      {isLoggedIn && (

        <div className='form-component'>

          <h2>Write a Review</h2>

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
                onChange={updateReview}
                required
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
                required
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


export default CreateReviewForm

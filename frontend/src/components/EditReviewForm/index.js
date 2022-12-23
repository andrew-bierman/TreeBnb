import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { updateReview, getCurrentUserReviews, actionCreatorResetUserReviews } from '../../store/reviews';

import './EditReviewForm.css';

const initialValues = {
  review: "",
  stars: 5
};

const initialTouchedValues = {
  review: false,
  stars: false
};

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const history = useHistory();

  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouchedValues);
  const [errors, setErrors] = useState(initialValues);
  const [hoverRate, setHoverRate] = useState(0);

  const user = useSelector(state => state.session.user);
  const userReviews = useSelector(state => state.reviews.user);

  const getColor = (index) => {
    if (hoverRate >= index) return true;

    if (!hoverRate && formValues.stars >= index) return true;

    return false;
  }

  const handleRate = (idx) => {
    setFormValues(prevState => ({...prevState, stars: prevState.stars === idx ? 0 : idx}))
  };

  const starRating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <div 
          className='mr-1 cursor star-container'
          onClick={() => handleRate(idx)} 
          onMouseEnter={() => setHoverRate(idx)} 
          onMouseLeave={() => setHoverRate(0)}
        >
          <span className={`fa fa-star ${getColor(idx) ? 'checked' : ''}`} />
        </div>
      ))
  });


  const validateForm = () => {
    setErrors({
      review: !formValues.review ? 'Review is required' : formValues.review.length < 5 ? 'Review must be more than 5 characters' : '',
      stars: ((parseFloat(formValues.stars) < 1) || (parseFloat(formValues.stars) > 5)) ? 'Stars is not valid' : ''
    })
  };

  const handleSubmit = async (event) => {
    // Submit the form to your API
    const payload = {
      reviewId,
      review: formValues.review,
      stars: formValues.stars,
      User: user
    };

    console.log({payload})

    let updatedReview = await dispatch(updateReview(payload))

    if (updatedReview) {
      // history.push(`/reviews/${createdReview.id}`);
      history.push(`/user/current`);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  useEffect(() => {
    const findReview = userReviews[reviewId];

    if (!findReview || findReview.userId !== user.id) {
      history.push('/user/current')
    }

    setFormValues({
      review: findReview?.review,
      stars: findReview?.stars
    })
  }, []);

  // reset all errors to inital in the first render
  useEffect(() => {
    setErrors(initialValues);
    setTouched(initialTouchedValues);
  }, []);

  useEffect(() => validateForm(), [formValues]);

  useEffect(() => {
    dispatch(getCurrentUserReviews());
    return () => dispatch(actionCreatorResetUserReviews());
  }, [dispatch, reviewId]);

  if (!user) {
    return (
      <div className="is-flex is-justify-content-center w-100 mt-5">
        <h5 className="title is-5">Please login or signup to continue</h5>
      </div>
    )
  };

  return (
    <div className='p-2 pt-5 is-flex is-flex-direction-column is-align-items-center'>
      <h3 className="title is-3">Edit a Review</h3>
        <div className='columns is-centered w-100'>
          <form onSubmit={handleSubmit} className='is-flex is-flex-direction-column is-align-items-center column is-half'>
            <div className="control has-icons-right w-100">
              <textarea
                id="review"
                name="review"
                value={formValues.review}
                className={`textarea ${errors.review && touched.review ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.review && touched.review && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.review}</h6>
                </>
              }
            </div>

            <div className='is-flex is-flex-direction-column is-align-items-center mt-4'>
              <div className="is-flex mb-2">
                {starRating}
              </div>
              <h6 className="subtitle is-6">Stars: {formValues.stars}</h6>
              {errors.stars && <h6 className="help is-danger">{errors.stars}</h6>}
            </div>
            
            <button type="submit" className="button is-primary mt-5 w-100">Submit</button>
          </form>
        </div>
    </div>
  );
};


export default EditReviewForm

import { csrfFetch } from './csrf';

const GET_ONE_SPOT_REVIEWS = 'reviews/getOne';
const GET_CURRENT_USER_REVIEWS = 'reviews/getCurrentUserReviews'
const CREATE_REVIEW = 'reviews/createReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview'

const actionCreatorGetOneReview = (reviews) => {
  return {
    type: GET_ONE_SPOT_REVIEWS,
    payload: reviews,
  };
};

const actionCreatorGetCurrentUserReviews = (reviews) => {
  return {
    type: GET_CURRENT_USER_REVIEWS,
    payload: reviews,
  };
};

const actionCreatorCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};

const actionCreatorUpdateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review,
  };
};

const actionCreatorDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};



export const getOneSpotReviews = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(response.ok){
        const reviewsObj = await response.json();
        // console.log('reviews.Reviews', reviewsObj.Reviews, Array.isArray(reviewsObj.Reviews));
        // const reviewsArr = Object.values(reviews)

        dispatch(actionCreatorGetOneReview(reviewsObj));
    }

};

export const getCurrentUserReviews = () => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/current`);

  if(response.ok){
      const reviewsObj = await response.json();
      // console.log('reviews.Reviews', reviewsObj.Reviews, Array.isArray(reviewsObj.Reviews));
      // const reviewsArr = Object.values(reviews)
      // console.log('--------')
      // console.log({reviewsObj})
      dispatch(actionCreatorGetCurrentUserReviews(reviewsObj));
      return reviewsObj
  }

};

export const deleteReview = (reviewId) => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(response.ok){
      const deleteReviewRes = await response.json();
      // console.log('reviews.Reviews', reviewsObj.Reviews, Array.isArray(reviewsObj.Reviews));
      // const reviewsArr = Object.values(reviews)

      dispatch(actionCreatorDeleteReview(reviewId));

      return deleteReviewRes
  }

};

export const createReview = (reviewData) => async (dispatch) => {

  const { spotId } = reviewData

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });


  console.log(response);

  if(response.ok){
      const review = await response.json();
      dispatch(actionCreatorCreateReview(review));
      return review
  }

};

export const updateReview = (reviewData) => async (dispatch) => {

  const { reviewId } = reviewData

  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });


  // console.log(response);

  if(response.ok){
      const review = await response.json();
      dispatch(actionCreatorUpdateReview(review));
      return review
  }

};

const initialState = {
    spot: {},
    user: {}
 };


const reviewsReducer = (state = initialState, action) => {
    let newState;
    let reviews;


    switch (action.type) {

      case GET_ONE_SPOT_REVIEWS:{
          newState = { ...state }

          const spot = {}

          reviews = action.payload.Reviews

          // console.log('reviews', reviews)
          // console.log('reviews index 0', reviews[0])

          if(reviews && Array.isArray(reviews)){

            reviews.forEach(review => {
                if(review.id && review.stars){
                    const { id, User, ReviewImages } = review

                    spot[`${id}`] = review

                    spot[id].User = User

                    spot[id].ReviewImages = ReviewImages

                }

            })

            return {...state, spot};

          }
        }

        case GET_CURRENT_USER_REVIEWS:{
            newState = { ...state }

            let user = {}

            reviews = action.payload.Reviews

            // console.log('reviews index 0', reviews[0])

            if(reviews && Array.isArray(reviews)){
              // console.log('reviews', reviews)

              // const { Spot, ReviewImages } = reviews

              reviews.forEach(review => {
                if(review.id && review.userId){

                    const { id, User, Spot, ReviewImages } = review
                    // const id = review.id
                    // const User = review.User

                    // console.log({user}, {id}, {review}, {User})

                    user[id] = review

                    // console.log({User})

                    user[id].User = User

                    user[id].Spot = Spot

                    user[id].ReviewImages = ReviewImages

                    // console.log({user})

                  }

              })

              return {...state, user};

            }
          }

          case UPDATE_REVIEW: {
              newState = { ...state }

              let user = {}

              /*


              let review = action.payload

              console.log({review})

              if(review.id && review.userId){

                const { id, User, Spot, ReviewImages, spotId } = review

                user[id] = review

                user[id].User = User

                // user[id].Spot = newState.allSpots[spotId]

                user[id].ReviewImages = ReviewImages

                return {...newState, user}

              }

              */

              return {...newState, user};

              }

          case DELETE_REVIEW: {
              newState = { ...state }

              let user = {}

              let reviewId = action.payload

              let userReviews = Object.values(newState.user)

              // console.log(user)

              userReviews = userReviews.filter(review => review.id !== reviewId)

              if(userReviews && Array.isArray(userReviews)){
                // console.log('reviews', reviews)

                // const { Spot, ReviewImages } = reviews

                userReviews.forEach(review => {
                  if(review.id && review.userId){

                      const { id, User, Spot, ReviewImages } = review
                      // const id = review.id
                      // const User = review.User

                      // console.log({user}, {id}, {review}, {User})

                      user[id] = review

                      user[id].User = User

                      user[id].ReviewImages = ReviewImages

                      // console.log({user})

                    }

                })

                return {...state, user};
              }

              return {...state, user};

              }

      default:
        return state;
    }
  };

export default reviewsReducer

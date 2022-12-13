import { csrfFetch } from './csrf';

const GET_ONE_SPOT_REVIEWS = 'reviews/getOne';

const actionCreatorGetOneReview = (reviews) => {
  return {
    type: GET_ONE_SPOT_REVIEWS,
    payload: reviews,
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

const initialState = {
    spot: null,
    user: null
 };


const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {

      case GET_ONE_SPOT_REVIEWS:
          newState = { ...state }

          const spot = {}



          const reviews = action.payload.Reviews

          console.log('reviews', reviews)
          console.log('reviews index 0', reviews[0])

          if(reviews && Array.isArray(reviews)){

            reviews.forEach(review => {
                if(review.id && review.stars){
                    const { id, User, ReviewImages } = review

                    // console.log('reviewValues', reviewValues, Array.isArray(reviewValues))

                    // console.log('id', id)

                    spot[`${id}`] = review

                    spot[id].User = User

                    spot[id].ReviewImages = ReviewImages

                }

            })

            return {...state, spot};

          }

      default:
        return state;
    }
  };

export default reviewsReducer

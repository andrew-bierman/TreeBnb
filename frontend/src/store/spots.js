import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAll';
const GET_ALL_SEARCH_SPOTS = 'spots/getAllSearch';
const GET_ONE_SPOT = 'spots/getOne'
const GET_USER_SPOTS = 'spots/currentUser'
const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const RESET_SINGLE_SPOT = 'spots/resetSingleSpot'
const RESET_ALL_SPOTS = 'spots/resetAllSpots'

const actionCreatorAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};

const actionCreatorSearchSpots = (spots) => {
  return {
    type: GET_ALL_SEARCH_SPOTS,
    payload: spots,
  };
};

const actionCreatorOneSpot = (spot) => {
    return {
      type: GET_ONE_SPOT,
      payload: spot,
    };
  };

  const actionCreatorUserSpots = (spot) => {
    return {
      type: GET_USER_SPOTS,
      payload: spot,
    };
  };

const actionCreatorCreateSpot = (spot) => {
    return {
      type: CREATE_SPOT,
      payload: spot,
    };
  };

const actionCreatorEditSpot = (spot) => {
    return {
      type: EDIT_SPOT,
      payload: spot,
    };
  };

const actionCreatorDeleteSpot = (spot) => {
    return {
      type: DELETE_SPOT,
      payload: spot,
    };
  };


export const actionCreatorResetSingleSpot = () => {
    return {
      type: RESET_SINGLE_SPOT,
      payload: {},
    };
  };

export const actionCreatorResetAllSpots = () => {
    return {
      type: RESET_ALL_SPOTS,
      payload: {},
    };
  };


export const getAllSpots = () => async (dispatch) => {

    const response = await csrfFetch("/api/spots");
    // console.log(response);

    if(response.ok){
        const spots = await response.json();
        dispatch(actionCreatorAllSpots(spots));

        return spots
    }

  };

  export const searchSpots = (searchQuery, minPrice, maxPrice) => async (dispatch) => {
  
    const searchParams = new URLSearchParams();
    if (searchQuery) {
      searchParams.set('q', searchQuery);
    }
    if (minPrice) {
      searchParams.set('minPrice', minPrice);
    }
    if (maxPrice) {
      searchParams.set('maxPrice', maxPrice);
    }
    const searchUrl = `/api/spots?${searchParams.toString()}`;
  
    const response = await csrfFetch(searchUrl);
  
    if (response.ok) {
      const spots = await response.json();
      dispatch(actionCreatorSearchSpots(spots));
      return spots;
    }
    dispatch({
      type: 'SPOTS_FETCH_ERROR',
      payload: 'An error occurred while fetching the data.',
    });
  };
  
  
  

export const getOneSpot = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}`);
    console.log(response);

    if(response.ok){
        const spot = await response.json();
        dispatch(actionCreatorOneSpot(spot));
    }

};

export const getUserSpots = () => async (dispatch) => {

  const response = await csrfFetch("/api/spots/current");
  // console.log(response);

  if(response.ok){
      const spots = await response.json();
      dispatch(actionCreatorUserSpots(spots));

      return spots
  }

};

export const createSpot = (spotData) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotData)
  });


  console.log(response);


  if(response.ok){
      const spotRes = await response.json();

      try {

        const { previewImage } = spotData

        if(previewImage && previewImage !== {} && previewImage !== ''){
          const { id } = spotRes

          const imageRes = await csrfFetch(`/api/spots/${id}/images`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: previewImage,
              preview: true
            })
          });

        }

      } catch(e) {
          console.log({e})
      }


      dispatch(actionCreatorCreateSpot(spotRes));
      return spotRes
  }

};

export const editSpot = (spotData) => async (dispatch) => {

  const { spotId } = spotData

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotData)
  });


  console.log(response);

  if(response.ok){
      const spot = await response.json();
      dispatch(actionCreatorEditSpot(spot));
      return spot
  }

};

export const deleteSpot = (spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  console.log(response);

  if(response.ok){
      const spot = await response.json();
      dispatch(actionCreatorDeleteSpot(spot));
  }

};

const initialState = {
    allSpots: {},
    singleSpot: {},
    searchSpots: {},
 };

const spotsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case GET_ALL_SPOTS:
        newState = { ...state }

        const allSpots = {};
        // console.log(action.payload);
        action.payload["Spots"].forEach(spot => {
            allSpots[spot["id"]] = spot
        })
        // newState.spots.allSpots = allSpots;

        return {...state, allSpots};

    case GET_ALL_SEARCH_SPOTS:
        newState = { ...state }

        const searchSpots = {};

        action.payload["Spots"].forEach(spot => {
            searchSpots[spot["id"]] = spot
        })

        return {...state, searchSpots};

    case GET_ONE_SPOT:{
        newState = { ...state }

        const singleSpot = action.payload["Spots"];
        // console.log(action.payload);

        // newState.spots.allSpots = allSpots;

        return {...state, singleSpot};
    }

    case GET_USER_SPOTS:{
      newState = { ...state }

      // const singleSpot = action.payload["Spots"];
      // console.log(action.payload);

      // newState.spots.allSpots = allSpots;

      return {...newState};
  }

    case CREATE_SPOT:
        newState = { ...state }

        const newSpot = action.payload.Spots;
        // console.log(action.payload);

        // newState.spots.allSpots = allSpots;

        return {...newState, newSpot};

    case EDIT_SPOT: {
        newState = { ...state }

        const singleSpot = action.payload.Spots;
        // console.log(action.payload);

        // newState.spots.allSpots = allSpots;

        return {...newState, singleSpot};
    }

    case DELETE_SPOT:
        newState = { ...state }

        return { ...newState }

    case RESET_SINGLE_SPOT:
        newState = { ...state }

        return { ...newState, allSpots: {}, singleSpot: {} }

    case RESET_ALL_SPOTS:
        newState = { ...state }

        return { ...newState, allSpots: {}, singleSpot: {} }

    default:
      return state;
  }
};


export default spotsReducer;


const GET_ALL_SPOTS = 'spots/getAll';
const GET_ONE_SPOT = 'spots/getOne'

const actionCreatorAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};

const actionCreatorOneSpot = (spot) => {
    return {
      type: GET_ONE_SPOT,
      payload: spot,
    };
  };


export const getAllSpots = () => async (dispatch) => {

    const response = await fetch("/api/spots");
    // console.log(response);

    if(response.ok){
        const spots = await response.json();
        dispatch(actionCreatorAllSpots(spots));
    }

  };

// getAllSpots();

export const getOneSpot = (spotId) => async (dispatch) => {

    const response = await fetch(`/api/spots/${spotId}`);
    console.log(response);

    if(response.ok){
        const spot = await response.json();
        dispatch(actionCreatorOneSpot(spot));
    }

};

const initialState = {
    allSpots: null,
    singleSpot: null
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

    case GET_ONE_SPOT:
        newState = { ...state }

        const singleSpot = action.payload["Spots"];
        // console.log(action.payload);

        // newState.spots.allSpots = allSpots;

        return {...state, singleSpot};

    default:
      return state;
  }
};


export default spotsReducer;

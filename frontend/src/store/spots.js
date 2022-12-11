
const GET_ALL_SPOTS = 'spots/getall';

const actionCreatorAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};


export const getAllSpots = () => async (dispatch) => {

    const response = await fetch("/api/spots");
    console.log(response);

    if(response.ok){
        const spots = await response.json();
        dispatch(actionCreatorAllSpots(spots));
    }

  };

getAllSpots();

const initialState = {
        allSpots: null
 };

const spotsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_SPOTS:
        const newState = { ...state }

        const allSpots = {};
        console.log(action.payload);
        action.payload["Spots"].forEach(spot => {
            allSpots[spot["id"]] = spot
        })
        // newState.spots.allSpots = allSpots;

        return {...state, allSpots};

    default:
      return state;
  }
};


export default spotsReducer;

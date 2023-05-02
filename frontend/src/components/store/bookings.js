import { csrfFetch } from "./csrf";

const GET_ALL_SPOT_BOOKINGS = "bookings/getAllSpotBookings";
const GET_ALL_USER_BOOKINGS = "bookings/getAllUserBookings";
const GET_ONE_BOOKING = "bookings/getOne";
const CREATE_BOOKING = "bookings/createBooking";
const EDIT_BOOKING = "bookings/editBooking";
const DELETE_BOOKING = "bookings/deleteBooking";
const RESET_SINGLE_BOOKING = "bookings/resetSingleBooking";
const RESET_ALL_BOOKINGS = "bookings/resetAllBookings";

const actionCreatorGetAllSpotBookings = (bookings) => {
  return {
    type: GET_ALL_SPOT_BOOKINGS,
    payload: bookings,
  };
};

const actionCreatorGetAllUserBookings = (bookings) => {
  return {
    type: GET_ALL_USER_BOOKINGS,
    payload: bookings,
  };
};

const actionCreatorOneBooking = (booking) => {
  return {
    type: GET_ONE_BOOKING,
    payload: booking,
  };
};

const actionCreatorCreateBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    payload: booking,
  };
};

const actionCreatorEditBooking = (booking) => {
  return {
    type: EDIT_BOOKING,
    payload: booking,
  };
};

const actionCreatorDeleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    payload: bookingId,
  };
};

export const actionCreatorResetSingleBooking = () => {
  return {
    type: RESET_SINGLE_BOOKING,
    payload: {},
  };
};

export const actionCreatorResetAllBookings = () => {
  return {
    type: RESET_ALL_BOOKINGS,
    payload: {},
  };
};

export const getSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(actionCreatorGetAllSpotBookings(bookings));

    return bookings;
  }
};

export const getAllUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  // console.log(response);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(actionCreatorGetAllUserBookings(bookings));

    return bookings;
  }
};

export const getOneBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`);
  console.log(response);

  if (response.ok) {
    const booking = await response.json();
    dispatch(actionCreatorOneBooking(booking));
  }
};

export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  // console.log(response);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(actionCreatorGetAllUserBookings(bookings));

    return bookings;
  }
};

export const createBooking = (spotId, bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const bookingRes = await response.json();
  if (response.status !== 200) {
    return bookingRes;
  }

  // if (response.ok) {
  //   const bookingRes = await response.json();

  //   try {
  //     const { previewImage } = bookingData;

  //     if (previewImage && previewImage !== {} && previewImage !== "") {
  //       const { id } = bookingRes;

  //       const imageRes = await csrfFetch(`/api/bookings/${id}/images`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           url: previewImage,
  //           preview: true,
  //         }),
  //       });
  //     }
  //   } catch (e) {
  //     console.log({ e });
  //   }

  //   dispatch(actionCreatorCreateBooking(bookingRes));
  //   return bookingRes;
  // } else {
  //   const error = await response.json();
  //   return error;
  // }
};

export const editBooking = (bookingData) => async (dispatch) => {
  const { bookingId } = bookingData;

  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  console.log(response);

  if (response.ok) {
    const booking = await response.json();
    dispatch(actionCreatorEditBooking(booking));
    return booking;
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  if (response.ok) {
    const booking = await response.json();
    dispatch(actionCreatorDeleteBooking(bookingId));
  }

  return response;
};

const initialState = {
  user: {},
  booking: {},
  singleSpotBooking: {},
};

const bookingsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_SPOT_BOOKINGS: {
      newState = { ...state };

      const singleSpotBooking = {};

      action.payload["Bookings"].forEach((booking) => {
        singleSpotBooking[booking["spotId"]] = booking;
      });

      return { ...state, singleSpotBooking };
    }

    case GET_ALL_USER_BOOKINGS: {
      newState = { ...state };

      const user = {};
      // console.log(action.payload);
      action.payload["Bookings"].forEach((booking) => {
        user[booking["id"]] = booking;
      });
      // newState.bookings.user = user;

      return { ...state, user };
    }

    case GET_ONE_BOOKING: {
      newState = { ...state };

      const booking = action.payload["Bookings"];
      // console.log(action.payload);

      // newState.bookings.user = user;

      return { ...state, booking };
    }

    case CREATE_BOOKING:
      newState = { ...state };

      const newBooking = action.payload.Bookings;
      // console.log(action.payload);

      // newState.bookings.user = user;

      return { ...newState, newBooking };

    case EDIT_BOOKING: {
      newState = { ...state };

      const booking = action.payload.Bookings;
      // console.log(action.payload);

      // newState.bookings.user = user;

      return { ...newState, booking };
    }

    case DELETE_BOOKING:
      newState = { ...state };

      const { user } = newState;

      delete user[action.payload];

      return { ...newState, user };

    case RESET_SINGLE_BOOKING:
      newState = { ...state };

      return { ...newState, user: {}, booking: {} };

    case RESET_ALL_BOOKINGS:
      newState = { ...state };

      return { ...newState, user: {}, booking: {} };

    default:
      return state;
  }
};

export default bookingsReducer;

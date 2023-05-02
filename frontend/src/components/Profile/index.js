import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import BulmaModal from "../BulmaModal";
import CreateBookingForm from "../CreateBookingForm";
import DeleteBookingConfirmation from "../EditBookingForm/DeleteBookingConfirmation";

import CurrentUserReviewsComponent from "../CurrentUserReviews";
import { convertISODateToUTC } from "../utility";

import * as sessionActions from "../../store/session";

import {
  getUserSpots,
  getAllSpots,
  deleteSpot,
  actionCreatorResetSingleSpot,
} from "../../store/spots";
import { getCurrentUserReviews } from "../../store/reviews";
import {
  getUserBookings,
  actionCreatorResetUserBookings,
} from "../../store/bookings";

import "./Profile.css";
import EditBookingPage from "../EditBookingPage";
import DeleteSpotConfirmation from "../SpotDetails/DeleteSpotConfirmation";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const firstRenderRef = useRef(true);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector(
    (state) =>
      Object.keys(state.reviews.user).map((e) => state.reviews.user[e]) || []
  );
  const userSpots = useSelector(
    (state) =>
      Object.values(state.spots.allSpots).filter(
        (spot) => spot.ownerId === user.id
      ) || []
  );
  const userBookings = useSelector((state) => state.bookings.user || []);
  const userBookingsArr = Object.values(userBookings);

  const allSpots = useSelector((state) => state.spots.allSpots || []);

  let userBookingsSpots = [];

  if (userBookingsArr.length > 0) {
    userBookingsSpots = Object.values(allSpots).filter((spot) => {
      const hasBooking = userBookingsArr
        .map((booking) => booking.spotId)
        .includes(spot.id);
      const isNotOwnedByUser = spot.ownerId !== user.id;
      const bookingDatesExist = userBookingsArr
        .filter((booking) => booking.spotId === spot.id)
        .every(
          (booking) => booking.startDate !== null && booking.endDate !== null
        );

      return hasBooking && isNotOwnedByUser && bookingDatesExist;
    });
  }

  const handleEditSpotRoute = (spotId) => {
    // console.log('clicked')
    history.push(`/spots/${spotId}/edit`);
  };

  const handleEditBooking = (spotId, bookingId) => {
    history.push(`/spots/${spotId}/bookings/edit/${bookingId}`);
  };

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(getAllSpots());
    dispatch(getCurrentUserReviews());
    dispatch(getUserSpots());
    dispatch(getUserBookings());

    return () => dispatch(actionCreatorResetSingleSpot());
  }, [dispatch]);

  useEffect(() => {
    if (!user) history.push("/");
  }, []);

  const checkBookingEditAndDeletionValidity = (bookingId) => {
    if (!userBookings) return false;

    const booking = userBookings[bookingId];
    if (!booking) return false;

    const currentDate = new Date();
    const currentUTC = Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds(),
      currentDate.getUTCMilliseconds()
    );

    const bookingDate = new Date(booking.startDate);
    const bookingUTC = Date.UTC(
      bookingDate.getUTCFullYear(),
      bookingDate.getUTCMonth(),
      bookingDate.getUTCDate(),
      bookingDate.getUTCHours(),
      bookingDate.getUTCMinutes(),
      bookingDate.getUTCSeconds(),
      bookingDate.getUTCMilliseconds()
    );

    return bookingUTC > currentUTC;
  };

  if (!user) {
    return (
      <div className="is-flex is-justify-content-center w-100 mt-5">
        <h5 className="title is-5">Please login or signup to continue</h5>
      </div>
    );
  }

  console.log("userBookingsSpots", userBookingsSpots);

  return (
    <div className="p-3 pt-5">
      <div className="columns is-justify-content-center m-0 mb-5 mt-5">
        <div className="card profile-card column is-half-tablet if-full-mobile">
          <header
            className="card-header cursor"
            onClick={() => setIsProfileVisible((prev) => !prev)}
          >
            <p className="card-header-title">{user.username}</p>
            <button className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i
                  className={`fas ${
                    isProfileVisible ? "fa-angle-up" : "fa-angle-down"
                  }`}
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          </header>
          {isProfileVisible && (
            <div className="card-content p-3">
              <div className="content">
                <div className="control has-icons-left has-icons-right mb-3">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={`Username: ${user.username}`}
                    readOnly
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <div className="control has-icons-left has-icons-right mb-3">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={`First and Last Name: ${user.firstName} ${user.lastName}`}
                    readOnly
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <div className="control has-icons-left has-icons-right mb-3">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={`Email: ${user.email}`}
                    readOnly
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        {reviews && reviews.length > 0 && (
          <CurrentUserReviewsComponent reviews={reviews} />
        )}

        {userSpots && (
          <div className="is-flex is-flex-direction-column is-align-items-center is-flex-direction-center">
            <h3 className="title is-3 mt-5">Your spots</h3>
            <div className="columns is-flex-wrap-wrap is-3 pt-5 pl-3 pr-3 w-100">
              {userSpots.map((spot) => (
                <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop">
                  <div className="spot-details-container box p-0">
                    <NavLink
                      key={spot.id}
                      to={`/spots/${spot.id}`}
                      className="image is-3by2"
                    >
                      <img src={spot.previewImage} alt="Preview" />
                    </NavLink>

                    <div className="p-2 pt-3">
                      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
                        <h6 className="title is-6 m-0">
                          {spot.city}, {spot.state}
                        </h6>
                        {spot.avgRating && (
                          <div className="is-flex is-align-items-center font-14">
                            <i className="fas fa-star mr-1"></i>
                            <h5>{Number(spot.avgRating).toFixed(2)}</h5>
                          </div>
                        )}
                      </div>
                      {spot.price && (
                        <h6 className="subtitle is-6 font-14">
                          <span className="weight-600">
                            ${Number(spot.price).toFixed(0)}
                          </span>
                          night
                        </h6>
                      )}
                      <div className="buttons is-justify-content-flex-end mt-5">
                        <button
                          className="button is-light"
                          onClick={() => handleEditSpotRoute(spot.id)}
                        >
                          Edit Spot
                        </button>
                        <BulmaModal
                          modalTitle="Delete Spot"
                          buttonTitle="Delete Spot"
                          content={(isActive) => (
                            <DeleteSpotConfirmation
                              spotId={spot.id}
                              isActive={isActive}
                            />
                          )}
                          buttonStyle="is-danger is-fullwidth"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3">
        {userBookingsArr.length > 0 && (
          <div className="is-flex is-flex-direction-column is-align-items-center is-flex-direction-center">
            <h3 className="title is-3 mt-5">Your Bookings</h3>
            <div className="columns is-flex-wrap-wrap is-3 pt-5 pl-3 pr-3 w-100">
              <>
                {Object.values(userBookingsArr).length > 0 &&
                  userBookingsArr.map((booking) => {
                    const spot = userBookingsSpots.filter(
                      (spot) => spot.id === booking.spotId
                    )[0];

                    if (!spot) return <></>;

                    return (
                      <div
                        key={booking.id}
                        to={`/spots/${spot.id}`}
                        className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                      >
                        <div className="spot-details-container box p-0 mb-5">
                          <div className="image is-3by2">
                            <img src={spot.previewImage} alt="Preview Image" />
                          </div>
                          <div className="p-2 pt-3">
                            <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
                              <h6 className="title is-6 m-0">
                                {spot.city}, {spot.state}
                              </h6>
                              {spot.avgRating && (
                                <div className="is-flex is-align-items-center font-14">
                                  <i className="fas fa-star mr-1"></i>
                                  <h5>{Number(spot.avgRating).toFixed(2)}</h5>
                                </div>
                              )}
                            </div>
                            {spot.price && (
                              <h6 className="subtitle is-6 font-14">
                                <span className="weight-600">
                                  ${Number(spot.price).toFixed(0)}
                                </span>{" "}
                                night
                              </h6>
                            )}
                          </div>
                          <div className="is-flex-direction-column is-justify-content-flex-end mt-5 are-small">
                            {
                              // userBookingsArr.map(booking => {
                              booking.spotId === spot.id && (
                                <>
                                  {
                                    <div
                                      className="container has-text-centered"
                                      key={booking.id}
                                    >
                                      <div className="">
                                        <div class="icon-text">
                                          <span class="icon has-text-info">
                                            <i class="far fa-calendar-check"></i>
                                          </span>
                                          <span>
                                            {convertISODateToUTC(
                                              booking.startDate
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      {checkBookingEditAndDeletionValidity(
                                        booking.id
                                      ) && (
                                        <div className="buttons is-justify-content-flex-end mt-5">
                                          {/* <button
                                                                                    className="button is-light"
                                                                                    onClick={() => handleEditBooking(spot.id, booking.id)}
                                                                                >
                                                                                    Edit Booking
                                                                                </button> */}
                                          <BulmaModal
                                            modalTitle="Edit Booking"
                                            buttonTitle={"Edit Booking"}
                                            content={(isActive) => (
                                              <EditBookingPage
                                                spotId={spot.id}
                                                bookingId={booking.id}
                                                isActive={isActive}
                                              />
                                            )}
                                            save={() => console.log("saved")}
                                            buttonStyle="is-light is-fullwidth"
                                          />
                                          <BulmaModal
                                            modalTitle="Delete Booking"
                                            buttonTitle="Delete Booking"
                                            content={(isActive) => (
                                              <DeleteBookingConfirmation
                                                spotId={spot.id}
                                                bookingId={booking.id}
                                                isActive={isActive}
                                              />
                                            )}
                                            save={() => console.log("saved")}
                                            buttonStyle="is-danger is-fullwidth"
                                          />
                                          {/* <button className="button is-danger" onClick={() => confirmSpotDelete(spot.id)}>Delete Booking</button> */}
                                        </div>
                                      )}
                                    </div>
                                  }
                                </>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

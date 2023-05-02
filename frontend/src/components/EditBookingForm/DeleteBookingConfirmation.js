import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteBooking } from "../../store/bookings";

import { isBefore, isToday } from "date-fns";
import "./DeleteBookingConfirmation.css";

const DeleteBookingConfirmation = ({ spotId, bookingId, isActive }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const userBookings = useSelector((state) => state.bookings.user);

  const [showResponse, setShowResponse] = useState(false);
  const [successFullyDeleted, setSuccessFullyDeleted] = useState(false);

  if (!isActive) return null;

  const checkDeletionValidity = () => {
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

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!checkDeletionValidity()) {
      setShowResponse(true);
      setSuccessFullyDeleted(false);
      return;
    }

    let res = await dispatch(deleteBooking(bookingId));

    if (res.ok === true && res.status === 200) {
      setShowResponse(true);
      setSuccessFullyDeleted(true);
    } else {
      console.log(res);
      setShowResponse(true);
      setSuccessFullyDeleted(false);
    }
  };

  return (
    <div className="is-centered has-text-centered">
      <h1 className="title is-4">Delete Booking</h1>

      {showResponse ? (
        <div className="tags is-centered">
          {successFullyDeleted ? (
            <div className="tag is-success is-small has-text-centered">
              Your booking has been successfully deleted!
            </div>
          ) : (
            <div className="tag is-danger is-inline-block">
              There was an error deleting your booking. Please try again.
            </div>
          )}
        </div>
      ) : (
        <>
          <h4 className="has-text-black mb-5">
            Are you sure to delete this booking ?
          </h4>

          <button
            className="button is-danger"
            onClick={handleDelete}
            isActive={isActive}
          >
            Delete Booking
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteBookingConfirmation;

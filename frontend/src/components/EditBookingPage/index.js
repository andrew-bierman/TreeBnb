import React from "react";

import { useDispatch, useSelector } from "react-redux";
import EditBookingForm from "../EditBookingForm";

const EditBookingPage = ({ spotId, bookingId, isActive }) => {

    if(!isActive) return null;

    return (
        <div className="is-centered has-text-centered">
            <h1 className="title is-4">Edit Booking</h1>
            <EditBookingForm spotId={spotId} bookingId={bookingId}/>
        </div>
    )

}

export default EditBookingPage;
import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spots";

const DeleteSpotConfirmation = ({ spotId, isActive }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!isActive) return null;

  const confirmDelete = async (spotId) => {
    let deleteSpotResponse = await dispatch(deleteSpot(spotId));
    console.log(deleteSpotResponse);
    history.push("/");
  };
  return (
    <div className="is-centered has-text-centered">
      <h1 className="title is-4">Delete Spot</h1>

      <h4 className="has-text-black mb-5">
        Please confirm you would like to delete a spot, this action cannot be
        undone.
      </h4>

      <button
        className="button is-danger"
        onClick={() => confirmDelete(spotId)}
        isActive={isActive}
      >
        Delete Spot
      </button>
    </div>
  );
};

export default DeleteSpotConfirmation;

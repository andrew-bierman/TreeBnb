import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";

const DeleteReviewConfirmation = ({ reviewId, isActive }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!isActive) return null;

  const confirmDelete = async (reviewId) => {
    let deleteReviewResponse = await dispatch(deleteReview(reviewId));
    console.log(deleteReviewResponse);
    history.push("/user/current");
  };
  return (
    <div className="is-centered has-text-centered">
      <h1 className="title is-4">Delete Review</h1>

      <h4 className="has-text-black mb-5">
        Please confirm you would like to delete a review, this action cannot be
        undone.
      </h4>

      <button
        className="button is-danger"
        onClick={() => confirmDelete(reviewId)}
        isActive={isActive}
      >
        Delete Review
      </button>
    </div>
  );
};

export default DeleteReviewConfirmation;

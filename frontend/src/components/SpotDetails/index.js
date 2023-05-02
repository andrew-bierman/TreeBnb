import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";

import {
  getOneSpot,
  actionCreatorResetSingleSpot,
  deleteSpot,
} from "../../store/spots";
import { getOneSpotReviews, getCurrentUserReviews } from "../../store/reviews";
import "./SpotDetails.css";

import CreateBookingForm from "../CreateBookingForm";
import BulmaModal from "../BulmaModal";
import DeleteSpotConfirmation from "./DeleteSpotConfirmation";

const SpotDetailsComponent = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getOneSpotReviews(spotId));

    return () => dispatch(actionCreatorResetSingleSpot());
  }, [dispatch]);

  let spot = useSelector((state) => {
    return state.spots.singleSpot;
  });

  let user = useSelector((state) => {
    // console.log(state)

    return state.session.user;
  });

  let reviews = useSelector((state) => {
    // console.log(state)

    return state.reviews.spot;
  });

  let reviewsValues;
  if (reviews) {
    reviewsValues = Object.keys(reviews).map((e) => reviews[e]);
  }

  if (!spot) {
    return null;
  }

  const previewImage = spot?.SpotImages?.find(
    ({ preview }) => preview === true
  );

  let secondaryImages;
  // let secondaryImagesKeys;
  let secondaryImagesValues;

  if (previewImage) {
    secondaryImages = spot?.SpotImages?.filter(
      ({ id }) => id !== previewImage.id
    );

    if (Object.keys(secondaryImages).length > 1) {
      // secondaryImages = Object.values(secondaryImages)
      // console.log('values ---', Object.values(secondaryImages))
      // console.log('keys ---', Object.keys(secondaryImages))
      secondaryImagesValues = Object.keys(secondaryImages).map(
        (e) => secondaryImages[e]
      );
      // secondaryImagesKeys = Object.keys(secondaryImages)
      // console.log('secondaryImagesKeys[1]', secondaryImagesKeys[1])
    }
  }

  const handleEditSpotRoute = () => {
    // console.log('clicked')
    history.push(`/spots/${spotId}/edit`);
  };

  const handleCreateReviewRoute = () => {
    history.push(`/spots/${spotId}/reviews/create`);
  };

  const handleEditReviewRoute = (reviewId) => {
    // console.log('clicked')
    history.push(`/reviews/${reviewId}/edit`);
  };

  // console.log('spot details ----', {spot})
  // console.log('secondary images ----', secondaryImages, typeof secondaryImages)

  // console.log('secondary images values ----', secondaryImagesValues, 'isarray', Array.isArray(secondaryImagesValues))

  let isLoggedIn;
  let isSpotOwner;
  let hasAlreadyReviewed;
  let isReviewOwner;

  if (!user) {
    isLoggedIn = false;
  } else {
    dispatch(getCurrentUserReviews());

    isLoggedIn = true;

    if (user.id === spot.ownerId) {
      isSpotOwner = true;
    } else {
      isSpotOwner = false;
    }

    const findUserReviews = reviewsValues.find(
      ({ User }) => User.id === user.id
    );
    // const findUserReviewsForCurrentSpot = reviewsValues.find(({User}) => (
    //     // User.id === user.id && spotId ===

    //     ))

    if (findUserReviews) {
      console.log({ reviewsValues }, { findUserReviews });
      hasAlreadyReviewed = true;
    } else {
      hasAlreadyReviewed = false;
    }
  }

  if (!spot) return null;

  return (
    <div className="spot-details p-5">
      <h5 className="title is-3 mb-2">{spot.name}</h5>
      <div className="is-flex is-align-items-center">
        {spot.avgRating && (
          <div className="is-flex is-align-items-center mr-4">
            <i className="fas fa-star mr-2 checked"></i>
            <h5 className="weight-600">{Number(spot.avgRating).toFixed(2)}</h5>
          </div>
        )}
        <h6 className="subtitle is-6">
          {spot.city}, {spot.state}
        </h6>
      </div>
      {isSpotOwner && (
        <div className="buttons mt-5">
          <button className="button is-light" onClick={handleEditSpotRoute}>
            Edit Spot
          </button>

          <BulmaModal
            modalTitle="Delete Spot"
            buttonTitle="Delete Spot"
            content={(isActive) => (
              <DeleteSpotConfirmation spotId={spot.id} isActive={isActive} />
            )}
            save={() => console.log("saved")}
            buttonStyle="is-danger is-fullwidth"
          />
        </div>
      )}
      <div className="images mt-3 mb-3">
        {previewImage && !secondaryImagesValues ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={previewImage?.url}
            alt="preview-image"
            className="image is-5by4 p-0"
          />
        ) : (
          <>
            <div className="preview-image-container">
              {previewImage && (
                <img
                  src={previewImage?.url}
                  alt="preview-image"
                  className="preview-image"
                ></img>
              )}
            </div>

            <div className="secondary-images-container">
              {secondaryImagesValues &&
                secondaryImagesValues.length > 0 &&
                secondaryImagesValues.slice(0, 4).map((image, index) => (
                  <div className="secondary-image-container" key={index}>
                    <img
                      key={image.id}
                      src={image.url}
                      alt="secondary"
                      className={`secondary-image ${
                        index === 1
                          ? "border-top-right"
                          : index === 3
                          ? "border-bottom-right"
                          : ""
                      }`}
                    ></img>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="columns">
        <div className="column is-full-mobile is-half-tablet is-three-fifths-desktop">
          {spot.Owner?.firstName && (
            <div className="is-flex mt-4">
              <h5 className="subtitle is-4 m-0 weight-600">
                {`Hosted by ${spot.Owner?.firstName}`}
                <i className="fas fa-user-circle ml-3" />
              </h5>
            </div>
          )}
          <hr />
          <div className="content is-medium">
            {spot.description && <p className="mt-3">{spot.description}</p>}
          </div>
        </div>
        <div className="column calendar-container is-full-mobile is-flex is-justify-content-flex-end">
          <div className="box calendar-box">
            {spot.price && (
              <h6 className="subtitle is-6 m-0 mb-2">
                <span className="weight-600">
                  ${Number(spot.price).toFixed(0)}
                </span>{" "}
                night
              </h6>
            )}
            <div className="is-flex is-align-items-center mb-2">
              <i className="fas fa-star mr-2 checked"></i>
              <h5 className="weight-600">
                {Number(spot.avgRating).toFixed(2)}
              </h5>
            </div>
            <div className="booking-container is-inline-block">
              {isLoggedIn ? (
                !isSpotOwner ? (
                  <CreateBookingForm spotId={spot.id} />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {reviewsValues && reviewsValues?.length > 0 && (
        <div className="columns">
          <div className="column is-full-mobile  is-three-fifths-desktop">
            <h4 className="title is-4 mb-2">Reviews</h4>
            <div className="is-flex is-align-items-center mb-4">
              {spot.avgRating && (
                <div className="is-flex is-align-items-center">
                  <i className="fas fa-star mr-2 checked"></i>
                  <h5 className="weight-600">
                    {Number(spot.avgRating).toFixed(2)}
                  </h5>
                </div>
              )}
              <h6 className="subtitle is-6 m-0 mr-2 ml-2">|</h6>
              <h6 className="subtitle is-6 m-0">{`${
                reviewsValues.length
              } review${reviewsValues.length === 1 ? "" : "s"}`}</h6>
            </div>
            {reviewsValues.map((review, ind) => (
              <div key={ind} className="box">
                <div className="is-flex is-align-items-center mb-3">
                  {review.User?.firstName && (
                    <h5 className="subtitle is-5 m-0">
                      <i className="fas fa-user-circle mr-2" />
                      {review.User?.firstName}
                    </h5>
                  )}
                  <h5 className="subtitle is-5 m-0 ml-2 mr-2">·</h5>
                  {spot.avgRating && (
                    <div className="is-flex is-align-items-center mr-4">
                      <i className="fas fa-star mr-2 checked"></i>
                      <h5 className="weight-600">
                        {Number(spot.avgRating).toFixed(2)}
                      </h5>
                    </div>
                  )}
                </div>
                {review.review && <p>{review.review}</p>}

                {review?.User?.id === user?.id && (
                  <div className="buttons is-justify-content-flex-end mt-3">
                    <button
                      className="button is-primary"
                      onClick={() => handleEditReviewRoute(review?.id)}
                    >
                      Edit this review
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="buttons mt-2">
              {user && !isSpotOwner && !hasAlreadyReviewed && (
                <button
                  className="button is-primary"
                  onClick={handleCreateReviewRoute}
                >
                  Review this spot
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotDetailsComponent;

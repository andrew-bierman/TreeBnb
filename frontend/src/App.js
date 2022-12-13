import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Redirect, Route  } from "react-router-dom";


import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsComponent from "./components/AllSpots";
import SpotDetailsComponent from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import CreateReviewForm from "./components/CreateReviewForm";
import CurrentUserReviews from "./components/CurrentUserReviews";
import CurrentUserReviewsComponent from "./components/CurrentUserReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        </Switch>
      )}

      <Switch>
        <Route exact path="/">
          <AllSpotsComponent/>
        </Route>

        <Route path="/spots/create">
          <CreateSpotForm />
        </Route>

        <Route path="/spots/:spotId/edit">
          <EditSpotForm/>
        </Route>

        <Route path="/spots/:spotId/reviews/create">
          <CreateReviewForm />
        </Route>

        <Route path="/spots/:spotId">
          <SpotDetailsComponent/>
        </Route>

        <Route path="/reviews/current">
          <CurrentUserReviewsComponent/>
        </Route>



        <Route>
          <p>Page Not Found</p>
        </Route>

      </Switch>
    </>
  );
}

export default App;

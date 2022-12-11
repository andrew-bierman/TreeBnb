import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Redirect, Route  } from "react-router-dom";


import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsComponent from "./components/AllSpots";
import SpotDetailsComponent from "./components/SpotDetails";

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
          {/* <Home /> */}
        </Route>

        <Route path="/spots/:spotId">
          <SpotDetailsComponent />
        </Route>

        <Route>
          <p>Page Not Found</p>
        </Route>

      </Switch>
    </>
  );
}

export default App;

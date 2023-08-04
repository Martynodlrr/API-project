import * as sessionActions from "./redux/session.js";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import SingleSpotRender from './components/Spots/SingleSpotRender.js';
import UserSpotsRender from "./components/Spots/UserSpotsRender.js";
import SpotsRender from './components/Spots/SpotsRender.js';
import Navigation from "./components/Navagation/index.js";
import CreateSpot from "./components/Spots/CreateSpot.js";
import UpdateSpot from "./components/Spots/UpdateSpot.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/'>
          <SpotsRender />
        </Route>
        <Route exact path='/spots/current'>
          <UserSpotsRender />
        </Route>
        <Route exact path='/spots/new'>
          <CreateSpot />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <UpdateSpot />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SingleSpotRender />
        </Route>
        <Route path=''>
          404 Page Not Found
        </Route>
      </Switch>
      }
    </>
  );
};

export default App;

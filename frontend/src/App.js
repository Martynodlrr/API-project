import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./redux/session.js";
import Navigation from "./components/Navagation/index.js";

import SpotsRender from './components/Spots/SpotsRender.js';
import SingleSpotRender from './components/Spots/SingleSpotRender.js';

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
        <Route path='/spots/:id'>
          <SingleSpotRender />
        </Route>
      </Switch>}
    </>
  );
};

export default App;

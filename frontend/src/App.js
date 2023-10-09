import * as sessionActions from "./redux/session.js";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactGA from 'react-ga';

import SingleSpotRender from './components/Spots/SingleSpotRender.js';
import UserSpotsRender from "./components/Spots/UserSpotsRender.js";
import StackRender from "./components/StackAndTechnologies/index.js";
import SpotsRender from './components/Spots/SpotsRender.js';
import Navigation from "./components/Navagation/index.js";
import CreateSpot from "./components/Spots/CreateSpot.js";
import UpdateSpot from "./components/Spots/UpdateSpot.js";

ReactGA.initialize('G-EHNGTKG327');

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#ea605d',
        main: '#e53935',
        dark: '#a02725',
      },
      secondary: {
        light: '#000000',
        main: '#000000',
        dark: '#000000',
      },
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: '#000000',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottomColor: '#000000',
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor: '#000000',
            },
            "&:after": {
              borderBottomColor: '#000000',
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div id='content'>
        <Navigation isLoaded={isLoaded} />
        <div className='line-break'></div>
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
          <Route path='*'>
            <h1 id="page-not-found-heading">
              404 Page Not Found
            </h1>
          </Route>
        </Switch>
        }
      </div>
      <StackRender />
    </ThemeProvider>
  );
};

export default App;

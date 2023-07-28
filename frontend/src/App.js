import { Route, Switch } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route exact path='/login'>
      <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

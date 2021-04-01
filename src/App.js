import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Admin from "layouts/Admin";
import * as loginActions from "actions/login.action";
import Login from "components/pages/Auth/Longin";
import Register from "components/pages/Auth/Register";
import { useDispatch } from "react-redux";
import PageNotFound from "components/pages/NotFound/NotFound";
import RegisterContact from "components/pages/Auth/RegisterContact"
const SecuredRoute = ({ component: Component }) => (
  <Route
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to="/admin/research" />
      ) : (
        <Login {...props} />
      )
    }
  />
);

function App() {
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loginActions.reLogin());
  }, []);

  return (
    <Router>
      <Switch>
        <SecuredRoute path="/admin" component={Admin} />
        <Route path="/register" component={Register} />
        <Route path="/registerContact" component={RegisterContact} />
        <LoginRoute path="/login" component={Login} />
        <Route
          exact={true}
          path="/"
          component={() => <Redirect to="/login" />}
        />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";

import Signin from "../pages/Signin";
import Users from "../pages/Users";
import Profile from "../pages/Profile";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Signin} exact/>
    <Route path="/users" component={Users}/>
    <Route path="/profile" component={Profile}/>
  </Switch>
);

export default Routes;

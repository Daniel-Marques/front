import React from "react";
import { Switch, Route } from "react-router-dom";

import Signin from "../pages/Signin";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter"

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Signin} exact/>
    <PrivateRouter path="/users" component={Users}/>
    <PrivateRouter path="/profile" component={Profile}/>
  </Switch>
);

export default Routes;

import React from "react";
import { Route, Redirect, OmitNative, RouteProps } from "react-router";

const PrivateRouter = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Route<{}, string>> & Readonly<RouteProps<string, { [x: string]: string | undefined; }> & OmitNative<{}, keyof RouteProps<string, { [x: string]: string | undefined; }>>> & Readonly<{ children?: React.ReactNode; }>) => {
  const isLogged = !!localStorage.getItem("@newmission:token");

  return isLogged ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRouter;

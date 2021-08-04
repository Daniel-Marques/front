import React from "react";
import { Route, Redirect, OmitNative, RouteProps } from "react-router";
import { Cookies } from "react-cookie";

const PrivateRouter = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Route<{}, string>> &
    Readonly<
      RouteProps<string, { [x: string]: string | undefined }> &
        OmitNative<
          {},
          keyof RouteProps<string, { [x: string]: string | undefined }>
        >
    > &
    Readonly<{ children?: React.ReactNode }>
) => {
  const cookie = new Cookies();
  const isLogged = !!cookie.get("@newmission:access_token");

  return isLogged ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRouter;

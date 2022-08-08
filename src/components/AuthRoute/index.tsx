import { isTokenInfo } from "@/utils/localToken"
import { ComponentType } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

const AuthRoute = ({ path, exact, component }: RouteProps) => {
  const Component = component as ComponentType;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (isTokenInfo()) {
          return <Component />
        } else {
          return <Redirect to="/login" />
        }
      }}
    ></Route>
  );
};
export default AuthRoute

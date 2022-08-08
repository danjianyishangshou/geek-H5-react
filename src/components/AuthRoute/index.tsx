import { isTokenInfo } from "@/utils/localToken";
import { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
// 封装全限路由
const AuthRoute = ({ component, ...rest }: RouteProps) => {
  // 传入路由的组件 进行转成大写 实例化必须遵循大驼峰
  const Component = component as ComponentType;
  return (
    // 进行权限判断  接受传过来的参数 path 路径 等
    // render参数中可以接受props参数 包含着 location 访问路径 match动态访问信息等 属性
    // 判断有没有token 有就使用传过来的组件 进行实例化 没有就重定向登录页
    <Route
      {...rest}
      render={(props) => {
        if (isTokenInfo()) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  redirectUrl: props.location.pathname,
                },
              }}
            />
          );
        }
      }}
    ></Route>
  );
};
export default AuthRoute;

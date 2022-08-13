import "./App.scss"
import { Route, Redirect, Switch } from "react-router-dom"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import ProfileEdit from "@/pages/Profile/Edit"
import AuthRoute from "./components/AuthRoute"
import Chat from "./pages/Profile/Chat"
import Article from "./pages/Home/Article"
import SearchPage from "./pages/Search"
import Result from "./pages/Search/Result"
function App() {
  return (
    <div className="app">
      <Switch>
        {/* 一 简单的 没有权限要求使用*/}
        <Route path={"/"} exact>
          <Redirect to={"/home"} />
        </Route>
        {/* 二, 有鉴权的要求的时候使用 可以实现一些复杂的逻辑判断 比如权限判断加载 */}
        {/* <Route
                    path={'/'}
                    exact
                    render={() => {
                        return <Redirect to={'/home'}></Redirect>
                    }}>
                </Route> */}
        {/* 三 Redirect 官方不推荐 使用有bug */}
        {/* <Redirect path={'/'} to={'/home'}></Redirect> */}
        <Route path={"/home"} component={Layout}></Route>
        <Route path={"/login"} component={Login}></Route>
        {/* 个人详情页路由 */}
        {/* <Route path={'/profile/edit'} component={ProfileEdit} exact></Route> */}
        <AuthRoute path={"/profile/edit"} component={ProfileEdit} />
        <AuthRoute path={"/chat"} component={Chat} />
        <Route path={"/article/:id"} component={Article}></Route>
        <Route path={"/search"} component={SearchPage} exact></Route>
        <Route path={"/search/result"} component={Result}></Route>
      </Switch>
    </div>
  )
}

export default App

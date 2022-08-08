import Icon from '@/components/icon'
import { TabBar } from 'antd-mobile'
// 引入样式
import styles from './index.module.scss'
import Home from '@/pages/Home'
import Question from '../Question/index'
import Profile from '@/pages/Profile'
import Video from '@/pages/Video'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import AuthRoute from '@/components/AuthRoute'
const Layout = () => {
    // 标签页数据
    const tabs = [
        { path: '/home', icon: 'iconbtn_home', text: '首页' },
        { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
        { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
        { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
    ]
    const history = useHistory()
    const location = useLocation()
    const onTabBarChange = (key: string) => {
        // key就是 item上的key值
        history.push(key)
    }
    // location=history.location
    return (
        <div className={styles.root}>
            <TabBar className="tab-bar"
                onChange={onTabBarChange}
                activeKey={location.pathname}
            >
                {tabs.map(tab => {
                    return (
                        <TabBar.Item key={tab.path} icon={(active: boolean) => {
                            return active ? <Icon name={tab.icon + '_sel'} /> : <Icon name={tab.icon} />
                        }} title={tab.text}></TabBar.Item>
                    )
                })}
            </TabBar>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/home/question" component={Question} />
                <Route path="/home/video" component={Video} />
                {/* <Route path="/home/profile" component={Profile} /> */}
                {/* 权限控制 */}
                <AuthRoute path="/home/profile" component={Profile}/>
            </Switch>
        </div>
    )
}
export default Layout
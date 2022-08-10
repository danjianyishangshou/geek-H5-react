import { Link, useHistory } from "react-router-dom"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"
// import { useEffect } from 'react'
import { getProfileActionCreator } from "@/store/actions/profile"
// import { useDispatch, useSelector } from 'react-redux'
// import { RootStore } from '@/types/store'
// import { ProfileInfo } from '@/types/data'
import { useInitialState } from "@/hooks/use-initial-state"

const Profile = () => {
  const history = useHistory()
  // const dispatch = useDispatch()
  // 获取store中的数据
  // const profileInfo = useSelector<RootStore, ProfileInfo>((store) => {
  //   return store.profile.profile
  // })
  // useEffect(() => {
  //   dispatch(getProfileActionCreator())
  // }, [dispatch])
  const state = useInitialState(getProfileActionCreator)
  const profileInfo = state.profile.profile
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info">
          <div className="avatar">
            <img src={profileInfo.photo} alt="" />
          </div>
          <div className="user-name">{profileInfo.name}</div>
          <Link to="/profile/edit">
            个人信息 <Icon name="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon name="iconbtn_readingtime" />
          今日阅读
          <span>{profileInfo.follow_count}</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>{profileInfo.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{profileInfo.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{profileInfo.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{profileInfo.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className="user-links">
          <div className="link-item">
            <Icon name="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon name="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon name="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon name="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon name="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div className="service-item" onClick={() => history.push("/chat")}>
            <Icon name="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

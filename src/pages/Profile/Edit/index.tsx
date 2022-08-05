import { useInitialState } from '@/hooks/use-initial-state'
import { getUserInfoActionCreator } from '@/store/actions/profile'
// import { UserInfo } from '@/types/data'
// import { RootStore } from '@/types/store'
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUserInfoActionCreator())
  // }, [dispatch])

  // const userInfo = useSelector<RootStore, UserInfo>((store) => {
  //   return store.profile.userInfo
  // })
  const state = useInitialState(getUserInfoActionCreator)
  const userInfo = state.profile.userInfo
  const logOut = () => {
    //退出登录
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={userInfo.photo}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={userInfo.name}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userInfo.intro || '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userInfo.gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={userInfo.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={logOut}>退出登录</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit

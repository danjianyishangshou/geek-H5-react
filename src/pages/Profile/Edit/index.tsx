import { useInitialState } from '@/hooks/use-initial-state'
import { getUserInfoActionCreator } from '@/store/actions/profile'

// import { UserInfo } from '@/types/data'
// import { RootStore } from '@/types/store'
import { Button, List, DatePicker, NavBar, Popup } from 'antd-mobile'
import classNames from 'classnames'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import EditInput from '../EditInput'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
const Item = List.Item
type PopupStareType = {
  visible: boolean
  type: 'name' | 'intro' | ''
}

// 组件
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
  const history = useHistory()
  // 退出登录函数
  const logOut = () => {
    //退出登录
  }
  // 用于控制抽屉弹层 
  const [popupState, setPopupState] = useState<PopupStareType>({
    visible: false,
    type: ''
  })
  const changePopup = (value: 'name' | 'intro' | '') => {
    setPopupState({
      visible: true,
      type: value
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
          onBack={() => history.push('/home/profile')}
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
            <Item arrow extra={userInfo.name} onClick={() => changePopup('name')}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userInfo.intro || '未填写'}
                </span>
              }
              onClick={() => changePopup('intro')}>
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
      {/* 昵称和简介的修改表单弹窗 */}
      <Popup visible={popupState.visible} position="right">
        <div style={{ width: '100vw', height: '100vh' }}>
          <EditInput type={popupState.type} onClose={() => {
            setPopupState(
              {
                visible: false,
                type: ''
              }
            )
          }}></EditInput>
        </div>
      </Popup >
    </div >
  )
}

export default ProfileEdit

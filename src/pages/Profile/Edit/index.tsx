import { useInitialState } from '@/hooks/use-initial-state'
import { getUserInfoActionCreator, logoutInfo, updateUserInfoActionCreator, updateUserPhotoActionCreator } from '@/store/actions/profile'
import dayjs from 'dayjs'
// import { UserInfo } from '@/types/data'
// import { RootStore } from '@/types/store'
import { Button, List, DatePicker, NavBar, Popup, Dialog, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EditInput from '../EditInput'
import EditList from '../EditList'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { removeTokenInfo } from '@/utils/localToken'
const Item = List.Item
// 昵称和个人信息
type PopupStareType = {
  visible: boolean
  type: 'name' | 'intro' | ''
}
// 头像性别
type PopupStareType2 = {
  visible: boolean
  type: 'gender' | 'photo' | ''
}

// 组件
const ProfileEdit = (props: any) => {
  const dispatch = useDispatch()

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
  // const logOut = () => {
  //   //退出登录
  // }
  // 用于控制昵称 详情抽屉弹层 
  const [popupState, setPopupState] = useState<PopupStareType>({
    visible: false,
    type: ''
  })
  // 用于控制头像 性别抽屉弹层 
  const [popupState2, setPopupState2] = useState<PopupStareType2>({
    visible: false,
    type: ''
  })
  const [showDateVisible, setShowDateVisible] = useState(false)
  const changePopup = (value: 'name' | 'intro' | '') => {
    setPopupState({
      visible: true,
      type: value
    })
  }
  const fileRef = useRef<HTMLInputElement | null>(null)

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
              onClick={() => setPopupState2({
                visible: true,
                type: 'photo'
              })}
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
            <Item arrow extra={userInfo.gender === 0 ? '男' : '女'} onClick={() => setPopupState2({
              visible: true,
              type: 'gender'
            })}>
              性别
            </Item>
            <Item arrow extra={userInfo.birthday} onClick={() => {
              setShowDateVisible(true)
            }}>
              生日
            </Item>
          </List>
          <DatePicker
            visible={showDateVisible}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onClose={() => {
              setShowDateVisible(false)
            }}
            onConfirm={(date) => {
              const birthday = dayjs(date).format("YYYY-MM-DD")
              dispatch(updateUserInfoActionCreator({
                birthday
              }))
            }}
          />
        </div>

        <div className="logout">
          <Button
            className="btn"
            onClick={() =>
              Dialog.confirm({
                title: '退出提醒',
                content: '亲 您确认要退出吗?',
                onConfirm: async () => {
                  await Toast.show({
                    icon: 'success',
                    content: '退出成功',

                    afterClose: async () => {
                      //  清除个人信息
                      await dispatch(logoutInfo())
                      history.replace('/login')
                    }
                  })
                }
              })
            }
          >退出登录</Button>
        </div>
      </div>
      {/* 昵称和简介的修改表单弹窗 */}
      <Popup visible={popupState.visible} position="right" destroyOnClose>
        <div style={{ width: '100vw', height: '100vh' }}>
          <EditInput type={popupState.type} onClose={() => {
            setPopupState(
              {
                visible: false,
                type: ''
              }
            )
          }}
            onSubmit={async (value, type) => {
              // 发送请求更改名字
              await dispatch(updateUserInfoActionCreator(
                { [type]: value }
              ))
              // 关闭弹窗
              setPopupState({
                visible: false,
                type: ''
              })
            }}
          ></EditInput>
        </div>
      </Popup >
      {/* 这是头像与性别的弹窗 */}
      <Popup visible={popupState2.visible} position='bottom' destroyOnClose>
        <div>

          <EditList
            onSubmit={async (value, type) => {
              if (type === 'gender') {
                // 如果是性别直接修改
                await dispatch(updateUserInfoActionCreator(
                  { gender: +value }
                ))
              } else {
                // 如果是头像需要特殊处理
                // H5网页版本不支持拍照
                if (value === '2') {
                  // 模拟点击事件 隔山打牛
                  fileRef.current?.click()
                }
              }
            }}
            type={popupState2.type}
            onClose={() => {
              setPopupState2({
                visible: false,
                type: ''
              })
            }} />
        </div>
      </Popup>
      {/* 隐藏input 按钮 */}
      <input type="file" hidden ref={fileRef} onChange={(e) => {
        const file = e.target.files?.[0]
        const fromData = new FormData()
        fromData.append('photo', file!)
        // 调用更新图片的接口
        dispatch(updateUserPhotoActionCreator(fromData))
      }} />
    </div >
  )
}

export default ProfileEdit

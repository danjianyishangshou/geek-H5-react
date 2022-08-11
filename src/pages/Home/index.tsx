import Icon from "@/components/icon/index"
import { getUserChannel, updateChannels } from "@/store/actions/channel"
import { Channel } from "@/types/data"
import { RootAction, RootStore } from "@/types/store"
import { Popup, Tabs } from "antd-mobile"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./index.module.scss"
import Channels from "./Channels/index"
import { useInitialState } from "@/hooks/use-initial-state"
import { getArticlesData } from "@/store/actions/article"

import ArticleList from "./ArticleList"

const Tab = Tabs.Tab
const Home = () => {
  const dispatch = useDispatch()
  // // 获取用户列表
  // useEffect(() => {
  //   dispatch(getUserChannel())
  // }, [dispatch])
  // // 获取仓库中的用户信息
  // const channels = useSelector<RootStore, Channel[]>((state) => {
  //   return state.channels.channels
  // })
  const state = useInitialState(getUserChannel)
  const channels = state.channels.channels
  // 控制弹窗显示与隐藏
  const [visibleChannels, setVisibleChannels] = useState(false)
  const closeVisible = () => {
    setVisibleChannels(false)
  }
  // 获取选中的列表的ID
  const actionId = useSelector<RootStore, number>((state) => {
    return state.channels.selectedActive
  })
  //进入页面第一次触发获取文章列表
  useEffect(() => {
    if (actionId === undefined) return
    dispatch(getArticlesData(actionId, Date.now().toString()))
  }, [dispatch, actionId])
  useEffect(() => {
    const defaultActive = channels[0]?.id
    dispatch({
      type: "channels/set_selectedActive",
      payload: defaultActive,
    } as RootAction)
  }, [channels, dispatch])
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs
        defaultActiveKey={"" + actionId}
        activeKey={"" + actionId}
        activeLineMode={"fixed"}
        onChange={(key) => {
          dispatch({
            type: "channels/set_selectedActive",
            payload: +key,
          } as RootAction)
        }}
      >
        {channels.map((channel: Channel) => {
          return (
            <Tab title={channel.name} key={"" + channel.id}>
              <ArticleList channelId={channel.id} />
            </Tab>
          )
        })}
      </Tabs>
      <Popup
        position="left"
        visible={visibleChannels}
        onMaskClick={() => {
          setVisibleChannels(false)
        }}
        bodyStyle={{ height: "100vh", width: "100vw" }}
      >
        <Channels
          onCloseVisible={closeVisible}
          onSelected={(id: number) => {
            dispatch({
              type: "channels/set_selectedActive",
              payload: id,
            } as RootAction)

            closeVisible()
          }}
          omRecommendSelect={(channel) => {
            dispatch(updateChannels(channel))
          }}
        ></Channels>
      </Popup>
      <div className="tabs-opration">
        <Icon name="iconbtn_search" />
        <Icon
          name="iconbtn_channel"
          onClick={() => {
            setVisibleChannels(true)
          }}
        />
      </div>
    </div>
  )
}

export default Home

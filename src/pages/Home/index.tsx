import Icon from "@/components/icon/index"
import { getUserChannel } from "@/store/actions/channel"
import { Channel } from "@/types/data"
import { RootStore } from "@/types/store"
import { Popup, Tabs } from "antd-mobile"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./index.module.scss"
import Channels from "./Channels/index"
const Tab = Tabs.Tab
const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannel())
  }, [dispatch])
  const channels = useSelector<RootStore, Channel[]>((state) => {
    return state.channels.channels
  })
  const [visibleChannels, setVisibleChannels] = useState(false)
  const closeVisible = () => {
    setVisibleChannels(false)
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs activeKey={"html"} activeLineMode={"fixed"}>
        {channels.map((channel: Channel) => {
          return (
            <Tab title={channel.name} key={"" + channel.id}>
              {channel.name}
            </Tab>
          )
        })}
      </Tabs>
      <Popup
        visible={visibleChannels}
        onMaskClick={() => {
          setVisibleChannels(false)
        }}
        bodyStyle={{ height: "100vh", width: "100vw" }}
      >
        <Channels onCloseVisible={closeVisible}></Channels>
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

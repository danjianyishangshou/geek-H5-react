import classnames from "classnames"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "@/types/store"
import { Channel } from "@/types/data"
import { useEffect, useState } from "react"
import { getAllChannel } from "@/store/actions/channel"
//    求差集
import { differenceBy } from "lodash"
const Channels = (props: any) => {
  const channels = useSelector<RootStore, Channel[]>((state) => {
    return state.channels.channels
  })
  const allChannels = useSelector<RootStore, Channel[]>((state) => {
    return state.channels.allChannels
  })
  const [newChannels, setNewChannels] = useState<Channel[]>([])

  useEffect(() => {
    // const newList = allChannels.filter((item) => {
    //   const channel = channels.find((sub) => sub.id === item.id)
    //   return !channel
    // })
    // 使用lodash优化代码 求差集
    const newList = differenceBy(allChannels, channels, "id")
    setNewChannels(newList)
  }, [channels, allChannels])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllChannel())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon
          name="iconbtn_channel_close"
          onClick={() => props.onCloseVisible()}
        />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item")}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit">编辑</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((channel) => {
              return (
                <span
                  className={classnames("channel-list-item")}
                  key={channel.id}
                >
                  {channel.name}
                  <Icon name="iconbtn_tag_close" />
                </span>
              )
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {newChannels.map((item) => (
              <span className="channel-list-item" key={item.id}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels

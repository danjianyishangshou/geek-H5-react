import classnames from "classnames"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "@/types/store"
import { Channel } from "@/types/data"
import { useEffect, useState } from "react"
import { getAllChannel, removeUserChannel } from "@/store/actions/channel"
//    求差集
import { differenceBy } from "lodash"
import { useInitialState } from "@/hooks/use-initial-state"
type TypeProp = {
  onCloseVisible: () => void
  onSelected: (id: number) => void
  omRecommendSelect: (channel: Channel) => void
}
const Channels = ({
  onCloseVisible,
  onSelected,
  omRecommendSelect,
}: TypeProp) => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getAllChannel())
  // }, [dispatch])
  // const channels = useSelector<RootStore, Channel[]>((state) => {
  //   return state.channels.channels
  // })
  // const allChannels = useSelector<RootStore, Channel[]>((state) => {
  //   return state.channels.allChannels
  // })
  // 获取列表信息
  const state = useInitialState(getAllChannel)
  const channels = state.channels.channels
  const allChannels = state.channels.allChannels
  // 获取差集 计算得出频道推荐列表
  const [newChannels, setNewChannels] = useState<Channel[]>([])
  const actionId = useSelector<RootStore, number>((state) => {
    return state.channels.selectedActive
  })
  useEffect(() => {
    // const newList = allChannels.filter((item) => {
    //   const channel = channels.find((sub) => sub.id === item.id)
    //   return !channel
    // })
    // 使用lodash优化代码 求差集
    const newList = differenceBy(allChannels, channels, "id")
    setNewChannels(newList)
  }, [channels, allChannels])
  // 控制频道删除图标的显示
  const [isEdit, setIsEdit] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon
          name="iconbtn_channel_close"
          onClick={() => {
            onCloseVisible()
            setIsEdit(false)
          }}
        />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item", { edit: isEdit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? "点击删除频道" : "点击进入频道"}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setIsEdit(!isEdit)
              }}
            >
              {isEdit ? "完成" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((channel) => {
              return (
                <span
                  className={classnames("channel-list-item", {
                    selected: channel.id === actionId,
                  })}
                  key={channel.id}
                  onClick={() => {
                    !isEdit && onSelected(channel.id)
                  }}
                >
                  {channel.name}
                  <Icon
                    name="iconbtn_tag_close"
                    onClick={() => {
                      dispatch(removeUserChannel(channel.id))
                    }}
                  />
                </span>
              )
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">
              {isEdit && "点击添加频道"}
            </span>
          </div>
          <div className="channel-list">
            {newChannels.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => {
                  omRecommendSelect(item)
                }}
              >
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

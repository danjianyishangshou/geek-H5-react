import { ApiResponse, Channel } from "@/types/data"
import {
  ChannelsAction,
  ChannelsAllAction,
  RootAction,
  RootThunkAction,
} from "@/types/store"
import { getChannels, isChannels, setChannels } from "@/utils/localChannels"
import { isTokenInfo } from "@/utils/localToken"
import http from "@/utils/request"
/**
 * 获取用户频道列表
 * @returns
 */
export const getUserChannel = (): RootThunkAction => {
  return async (dispatch) => {
    // 判断没有登录 登录发请求
    if (isTokenInfo()) {
      // 用户有token
      const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
        "/user/channels"
      )
      const { channels } = res.data.data
      dispatch({
        type: "channels/set_channels",
        payload: channels,
      } as ChannelsAction)
    } else {
      // 没有登录首先从本地取数据
      //   判断本地有没有数据有就直接取
      if (isChannels() > 0) {
        const channels = getChannels()
        dispatch({
          type: "channels/set_channels",
          payload: channels,
        } as ChannelsAction)
      } else {
        // 本地没有数据 重新请求数据
        const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
          "/user/channels"
        )
        const { channels } = res.data.data
        setChannels(channels as Channel[])
        dispatch({
          type: "channels/set_channels",
          payload: channels,
        } as ChannelsAction)
      }
    }
  }
}
/**
 * 获取全部列表信息
 * @returns
 */
export const getAllChannel = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
      "/channels"
    )
    const { channels: allChannels } = res.data.data
    dispatch({
      type: "channels/set_all_channels",
      payload: allChannels,
    } as ChannelsAllAction)
  }
}
/**
 * 更新用户列表
 * @param channel
 * @returns
 */
export const updateChannels = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const newList = [...getState().channels.channels, channel]
    // 判断有没有token
    //有token 发请求给后端 同时更新store数据
    if (isTokenInfo()) {
      await http.put("/user/channels", newList)
      dispatch({
        type: "channels/set_channels",
        payload: newList,
      } as RootAction)
    } else {
      //没有token数据存在仓库 与本地存储
      setChannels(newList)
      dispatch({
        type: "channels/set_channels",
        payload: newList,
      } as RootAction)
    }
  }
}

export const removeUserChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    if (isTokenInfo()) {
      // 用户登录的情况发起后台请求更新频道
      await http.delete(`/user/channels/${id}`)
      getUserChannel()
    } else {
      const newList = getState().channels.channels.filter(
        (item) => item.id !== id
      )
      // 更新仓库
      dispatch({
        type: "channels/set_channels",
        payload: newList,
      } as RootAction)
      // dispatch({

      // })
      // 更新本地存储
      setChannels(newList)
      // 解决bug
    }
  }
}

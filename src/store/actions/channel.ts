import { ApiResponse, Channel } from "@/types/data"
import {
  ChannelsAction,
  ChannelsAllAction,
  RootThunkAction,
} from "@/types/store"
import { getChannels, isChannels, setChannels } from "@/utils/localChannels"
import { isTokenInfo } from "@/utils/localToken"
import http from "@/utils/request"
/**
 * 获取tabs列表
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

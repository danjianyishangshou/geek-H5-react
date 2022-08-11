import { Channel } from "@/types/data"
import { RootAction } from "@/types/store"
export type ChannelsState = {
  // 用户频道
  channels: Channel[]
  // 全部频道
  allChannels: Channel[]
  // 选中状态
  selectedActive: number
}
const initState: ChannelsState = {
  channels: [],
  allChannels: [],
  selectedActive: 0,
}

export const channelsReducer = (
  state: ChannelsState = initState,
  action: RootAction
): ChannelsState => {
  if (action.type === "channels/set_channels") {
    return {
      ...state,
      channels: action.payload,
    }
  }
  if (action.type === "channels/set_all_channels") {
    return {
      ...state,
      allChannels: action.payload,
    }
  }
  if (action.type === "channels/set_selectedActive") {
    return {
      ...state,
      selectedActive: action.payload,
    }
  }
  return state
}

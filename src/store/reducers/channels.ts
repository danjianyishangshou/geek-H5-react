import { Channel } from "@/types/data"
import { RootAction } from "@/types/store"
export type ChannelsState = {
  channels: Channel[]
  allChannels: Channel[]
}
const initState: ChannelsState = {
  channels: [],
  allChannels: [],
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
  return state
}

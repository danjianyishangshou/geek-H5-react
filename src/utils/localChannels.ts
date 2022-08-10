import { setLocalStore, removeLocalStore } from "./localStore"
import { Channel } from "@/types/data"
const CHANNELS_LIST = "geek_channels"
/**
 * 获取用户列表信息
 * @returns
 */
export const getChannels = () =>
  JSON.parse(localStorage.getItem(CHANNELS_LIST) || "[]")
/**
 * 设置用户列表信息
 * @param value  存入的数据
 * @returns
 */
export const setChannels = (value: Channel[]) =>
  setLocalStore(CHANNELS_LIST, value)
/**
 * 移除用户列表信息
 * @returns
 */
export const removeChannels = () => removeLocalStore(CHANNELS_LIST)

/**
 * 判断有没有用户列表信息
 * @returns
 */
export const isChannels = () => getChannels().length

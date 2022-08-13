import { setLocalStore, removeLocalStore } from "./localStore"
const KEY_WORDS = "geek_keywords"
/**
 * 获取搜索关键字列表信息
 * @returns
 */
export const getKeyWords = () =>
  JSON.parse(localStorage.getItem(KEY_WORDS) || "[]")
/**
 * 设置用户搜索关键字列表信息
 * @param value  存入的数据
 * @returns
 */
export const setKeyWords = (value: string[]) => setLocalStore(KEY_WORDS, value)
/**
 * 移除用户搜索关键字列表信息
 * @returns
 */
export const removeKeyWords = () => removeLocalStore(KEY_WORDS)

/**
 * 判断有没有用户搜索关键字信息
 * @returns
 */
export const isKeyWords = () => getKeyWords().length

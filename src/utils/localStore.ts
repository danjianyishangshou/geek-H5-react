/**
 * 数据存入本地
 * @param name 
 * @param value 
 * @returns 
 */
export const setLocalStore = (name: string, value: any) => localStorage.setItem(name, JSON.stringify(value))

/**
 * 获取本地数据
 * @param name 
 * @returns 
 */
export const getLocalStore = (name: string) => JSON.parse(localStorage.getItem(name) || '{}')

/**
 * 移除本地数据
 * @param name 
 * @returns 
 */
export const removeLocalStore = (name: string) => localStorage.removeItem(name)
import { RootStore, RootThunkAction } from "@/types/store" //
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
/**
 * 封装的进入页面就进行的发请求加获取仓库数据的函数
 * @param getStore
 * @returns
 */
export function useInitialState(sponsorRequest: () => RootThunkAction) {
  // 参数 action: () => RootThunkAction
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sponsorRequest())
  }, [dispatch, sponsorRequest])
  const state = useSelector((state: RootStore) => state)
  return state
}

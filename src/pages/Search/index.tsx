import classnames from "classnames"
import { useHistory } from "react-router"
import { NavBar, SearchBar } from "antd-mobile"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"
import { useState } from "react"
import { useDebounceFn } from "ahooks"
import { useDispatch, useSelector } from "react-redux"
import { getSearchSuggestion, setSearchKeyWords } from "@/store/actions/search"
import { RootAction, RootStore } from "@/types/store"
import { removeKeyWords } from "@/utils/localKeyWords"
const SearchPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [keyWord, setKeyWord] = useState("")
  // let timerId = useRef<number>(-1)
  // 自己封装防抖
  // const changeKeyWord = (val: string) => {
  //   if (val.trim() === "") return
  //   clearTimeout(timerId.current)
  //   timerId.current = window.setTimeout(() => {
  //     console.log(val)
  //   }, 300)
  // }
  // ahooks方法实现防抖
  const { run } = useDebounceFn(
    () => {
      if (keyWord === "") return

      dispatch(getSearchSuggestion(keyWord))
    },
    { wait: 1000 }
  )

  const suggestion = useSelector<RootStore, string[]>((state) => {
    return state.search.suggestion
  })
  // const setKeyWordsHandler = (keyWord: string) => {
  //   dispatch(setSearchKeyWords(keyWord))
  // }
  const keyWords = useSelector<RootStore, string[]>((state) => {
    return state.search.keyWords
  })
  const removeKeyWordHandler = () => {
    dispatch({
      type: "search/set_keyWords_article",
      payload: [],
    } as RootAction)
    removeKeyWords()
  }
  return (
    <div className={styles.root}>
      {/* 顶部状态栏 */}
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span
            className="search-text"
            onClick={() => {
              dispatch(setSearchKeyWords(keyWord))
              history.push(`/search/result?keyword=${keyWord}`)
            }}
          >
            搜索
          </span>
        }
      >
        {/* antd自带的组件 */}
        <SearchBar
          placeholder="请输入关键字搜索"
          value={keyWord}
          onChange={async (val) => {
            setKeyWord(val.trim())
            // 自己实现防抖
            // changeKeyWord(val)
            // 使用ahooks实现防抖
            if (val.trim().length > 0) {
              run()
            } else {
              // 搜索框没有数据 就清除后台的数据
              dispatch({
                type: "search/set_suggestion_article",
                payload: [],
              } as RootAction)
            }
          }}
        />
      </NavBar>

      {
        <div
          className="history"
          style={{
            display: !!keyWord ? "none" : "block",
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={removeKeyWordHandler}>
              <Icon name="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {keyWords.map((k, index) => {
              return (
                <span
                  className="history-item"
                  key={index}
                  onClick={() => history.push(`/search/result?keyword=${k}`)}
                >
                  <span className="text-overflow">{k}</span>
                  <Icon name="iconbtn_essay_close" />
                </span>
              )
            })}
          </div>
        </div>
      }
      {/* 搜索建议列表区域 */}
      <div className={classnames("search-result", { show: suggestion.length })}>
        {suggestion?.map((item, index) => {
          return (
            <div className="result-item" key={index}>
              <Icon className="icon-search" name="iconbtn_search" />
              {/* 在react中插入html标签的方式 在vue中使用 v-html */}
              <div
                className="result-value text-overflow"
                onClick={() => {
                  dispatch(setSearchKeyWords(item))
                  history.push(`/search/result?keyword=${item}`)
                }}
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    new RegExp(`(${keyWord})`, "ig"),
                    `<span>${keyWord}</span>`
                  ),
                }}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchPage

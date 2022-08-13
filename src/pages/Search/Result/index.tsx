import { useHistory, useLocation } from "react-router-dom"
import { InfiniteScroll, NavBar } from "antd-mobile"

import styles from "./index.module.scss"
import { useEffect } from "react"
import { getSearchResult } from "@/store/actions/search"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "@/types/store"
import { ArticleDataPage } from "@/types/data"
import ArticleItem from "@/pages/Home/ArticleItem"

const Result = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  // 通过原生的方式获取路径中的key
  const params = new URLSearchParams(location.search)
  const keyword = params.get("keyword")
  useEffect(() => {
    dispatch(getSearchResult(1, keyword || ""))
  }, [dispatch, keyword])
  const searchPage = useSelector<RootStore, ArticleDataPage>((state) => {
    return state.search.searchPage
  })
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>

      <div className="article-list">
        <div className="article-item">
          {searchPage.results.map((item) => {
            return (
              <ArticleItem
                key={item.art_id}
                article={item}
                type={item.cover.type}
                onClick={() => {
                  history.push(`/article/${item.art_id}`)
                }}
              />
            )
          })}
          <InfiniteScroll
            hasMore={searchPage.results.length !== searchPage.total_count}
            loadMore={async () => {
              dispatch(getSearchResult(searchPage.page + 1, keyword || ""))
            }}
          ></InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export default Result

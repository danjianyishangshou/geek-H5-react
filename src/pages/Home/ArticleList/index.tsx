import { getArticlesData, getNewArticlesData } from "@/store/actions/article"
import { ArticleItemDataPage } from "@/types/data"
import { RootStore } from "@/types/store"
import { InfiniteScroll, PullToRefresh } from "antd-mobile"
import { useDispatch, useSelector } from "react-redux"
import ArticleItem from "../ArticleItem"

import styles from "./index.module.scss"
type PropsType = {
  channelId: number
}
const ArticleList = (props: PropsType) => {
  const dispatch = useDispatch()
  const id = props.channelId
  const articlesList = useSelector<RootStore, ArticleItemDataPage>((state) => {
    return state.articles.channelArticles[id]
  })
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh
        onRefresh={async () => {
          // 获取下拉刷新文章列表
          await dispatch(getNewArticlesData(id))
        }}
      >
        <div className="article-item">
          {articlesList?.results?.map((article, index) => {
            return (
              <ArticleItem
                key={index}
                article={article}
                type={article.cover.type}
              />
            )
          })}
        </div>
        {/* 滚动刷新组件 */}
        <InfiniteScroll
          // 为true持续触发事件
          hasMore={!!articlesList?.pre_timestamp}
          //  触底就会触发 回调函数且是异步
          loadMore={async () => {
            await dispatch(getArticlesData(id, articlesList?.pre_timestamp))
          }}
        />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList

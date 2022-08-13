import { NavBar, InfiniteScroll } from "antd-mobile"
import { useHistory, useParams } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"
import Icon from "@/components/icon/index"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import { useEffect } from "react"
import { getArticleDetail } from "@/store/actions/article"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "@/types/store"
import { ArticleDetailInfo } from "@/types/data"
import DOMpurify from "dompurify"
const Article = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const id = params.id

  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])

  const articleInfo = useSelector<RootStore, ArticleDetailInfo>((state) => {
    return state.articles.articleInfo
  })
  //  文章结构
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{articleInfo.pubdate}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count}评论</span>
            </div>

            <div className="author">
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames("follow", {
                  followed: articleInfo.is_followed,
                })}
              >
                {articleInfo.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>

          <div className="content">
            {/* 正文 */}
            {/*  DOMpurify.sanitize用来清理危险标签防止XSS攻击*/}
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(articleInfo.content),
              }}
            ></div>
            <div className="date">发布文章时间：{articleInfo.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论{articleInfo.comm_count}</span>
            <span>{articleInfo.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={async () => {}} />
          </div>
        </div>
      </div>
    )
  }
  // 顶部状态栏 上拉之后
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 吸顶状态栏 */}
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon name="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames("follow", true ? "followed" : "")}>
                {true ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article

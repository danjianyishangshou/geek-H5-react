import { NavBar, InfiniteScroll, Popup } from "antd-mobile"
import { useHistory, useParams } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"
import Icon from "@/components/icon/index"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import { useEffect, useRef, useState } from "react"
import { followUser, getArticleDetail } from "@/store/actions/article"
import { useDispatch, useSelector } from "react-redux"
import { RootAction, RootStore } from "@/types/store"
import { ArticleDetailInfo, Comment, CommentRes } from "@/types/data"
// 导入处理防止xss攻击的功能包
import DOMpurify from "dompurify"
//代码高亮包
import highlight from "highlight.js"
// 引入样式 可以选择样式
import "highlight.js/styles/vs2015.css"
import { addComment, getCommentPage } from "@/store/actions/comment"
import NoComment from "./components/NoComment"
import CommentInput from "./components/CommentInput"
import CommentReply from "./components/CommentReply"
const Article = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const id = params.id
  const [isTopInfoShow, setTopInfoShow] = useState(false)
  const [showInput, setShowInput] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const authorRef = useRef<HTMLDivElement | null>(null)
  const [showReply, setShowReply] = useState<boolean>(false)
  const [currentReplyComment, setCurrentReplyComment] = useState<Comment>(
    {} as Comment
  )
  useEffect(() => {
    dispatch(getCommentPage(id, ""))
    dispatch(getArticleDetail(id))
  }, [dispatch, id, showInput])
  // useEffect(() => {
  //   dispatch(getCommentPage(id, ""))
  // }, [showInput, id])
  const articleInfo = useSelector<RootStore, ArticleDetailInfo>((state) => {
    return state.articles.articleInfo
  })
  // 处理代码高亮
  useEffect(() => {
    // 配置 highlight.js
    highlight.configure({ ignoreUnescapedHTML: true })
    // 获取文章内容中所有的 code 标签，并执l行高亮
    document.querySelectorAll(".dg-html pre ").forEach((el) => {
      highlight.highlightElement(el as HTMLElement)
    })
  }, [articleInfo])

  useEffect(() => {
    // const scrollHandler = () => {
    //   if (wrapperRef.current!.scrollTop >= authorRef.current!.offsetTop) {
    //     setTopInfoShow(true)
    //   } else {
    //     setTopInfoShow(false)
    //   }
    // }
    // 顶部吸顶效果
    const scrollHandler = () => {
      // getBoundingClientRect H5新增的属性方法
      const rectInfo = authorRef.current!.getBoundingClientRect()
      if (rectInfo.top <= 0) {
        setTopInfoShow(true)
      } else {
        setTopInfoShow(false)
      }
    }
    wrapperRef.current?.addEventListener("scroll", scrollHandler)
    return () => {
      // eslint-disable-next-line
      wrapperRef.current?.removeEventListener("scroll", scrollHandler)
    }
  }, [])
  // 获取文章评论信息
  useEffect(() => {
    dispatch(getCommentPage(id, ""))
  }, [dispatch, id])
  const comments = useSelector<RootStore, CommentRes>((state) => {
    return state.comment.comments
  })
  useEffect(() => {
    return () => {
      dispatch({
        type: "article/set_Comments_action",
        payload: {},
      } as RootAction)
    }
  }, [dispatch, id])
  const commentRef = useRef<HTMLDivElement | null>(null)
  // 使用兼容写法
  // const setPosition = () => {
  //   const value = commentRef.current?.offsetTop
  //   if (value) {
  //     if (wrapperRef.current!.scrollTop === 0) {
  //       wrapperRef.current!.scrollTop = value + 60
  //     } else {
  //       wrapperRef.current!.scrollTop = 0
  //     }
  //   }
  // }
  // H5的写法
  const setPosition = () => {
    if (wrapperRef.current!.scrollTop === 0) {
      const value = commentRef.current!.getBoundingClientRect().top - 60
      wrapperRef.current!.scrollTop = value
    } else {
      wrapperRef.current!.scrollTop = 0
    }
  }

  const showInputHandler = () => {
    setShowInput(true)
  }
  //  文章结构
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{articleInfo.pubdate}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count}评论</span>
            </div>

            <div className="author" ref={authorRef}>
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames("follow", {
                  followed: articleInfo.is_followed,
                })}
                onClick={() => {
                  dispatch(
                    followUser(articleInfo.aut_id, articleInfo.is_followed, id)
                  )
                }}
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
          {/* 评论列表 */}
          <div className="comment-list" ref={commentRef}>
            {comments.results?.length <= 0 && <NoComment />}
            {comments.results?.map((comment) => (
              <CommentItem
                comment={comment}
                key={comment.com_id}
                onShowReply={() => {
                  setShowReply(true)
                  setCurrentReplyComment(comment)
                }}
              />
            ))}

            <InfiniteScroll
              hasMore={comments.last_id !== comments.end_id}
              loadMore={async () => {
                await dispatch(getCommentPage(id, comments.last_id))
              }}
            />
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
          {isTopInfoShow && (
            <div className="nav-author">
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames("follow", {
                  followed: articleInfo.is_followed,
                })}
                onClick={() => {
                  dispatch(
                    followUser(articleInfo.aut_id, articleInfo.is_followed, id)
                  )
                }}
              >
                {articleInfo.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter
          article={articleInfo}
          onSetPosition={setPosition}
          onshowInputHandler={showInputHandler}
        />
      </div>
      <Popup visible={showInput} bodyStyle={{ height: "100vh" }} destroyOnClose>
        <CommentInput
          onClose={() => {
            setShowInput(false)
          }}
          publicComment={(context) => {
            dispatch(addComment(params.id, context))
            // dispatch(getCommentPage(params.id, ""))
            setShowInput(false)
          }}
        />
      </Popup>

      <Popup
        visible={showReply}
        bodyStyle={{ width: "100vw" }}
        destroyOnClose
        position="right"
      >
        <CommentReply
          comment={currentReplyComment}
          onClose={() => {
            setShowReply(false)
          }}
        />
      </Popup>
    </div>
  )
}

export default Article

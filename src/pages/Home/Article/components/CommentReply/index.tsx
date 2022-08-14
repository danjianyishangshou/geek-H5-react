import { getReplyList } from "@/store/actions/comment"
import { ArticleDetailInfo, Comment, CommentRes } from "@/types/data"
import { RootStore } from "@/types/store"
import { NavBar } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CommentFooter from "../CommentFooter"
import CommentItem from "../CommentItem"
import NoComment from "../NoComment"
import styles from "./index.module.scss"
type Props = {
  onClose: () => void
  comment: Comment
}
export default function CommentReply({ onClose, comment }: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReplyList(comment.com_id, ""))
  }, [comment, dispatch])
  const replyList = useSelector<RootStore, CommentRes>((state) => {
    return state.comment.replyList
  })
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onBack={onClose}>
          <div>{comment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}

        <CommentItem type="origin" comment={comment} />

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {replyList?.results?.length > 0 ? (
            replyList?.results.map((reply) => {
              return (
                <CommentItem type="reply" comment={reply} key={reply.aut_id} />
              )
            })
          ) : (
            <NoComment />
          )}
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter article={{} as ArticleDetailInfo} type="reply" />
      </div>
    </div>
  )
}

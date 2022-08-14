import Icon from "@/components/icon/index"
import { collectArticle, likeArticle } from "@/store/actions/article"
import { ArticleDetailInfo } from "@/types/data"
import { isTokenInfo } from "@/utils/localToken"
import { useDispatch } from "react-redux"
import styles from "./index.module.scss"

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply"
  article: ArticleDetailInfo
  onSetPosition: () => void
}

const CommentFooter = ({ type = "normal", article, onSetPosition }: Props) => {
  const dispatch = useDispatch()
  const changePosition = () => {
    onSetPosition()
  }
  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon name="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item" onClick={changePosition}>
            <Icon name="iconbtn_comment" />
            <p>评论</p>
            {article?.comm_count && (
              <span className="bage">{article.comm_count}</span>
            )}
          </div>
          <div
            className="action-item"
            onClick={() => {
              if (!isTokenInfo) return
              dispatch(likeArticle(article.art_id, article.attitude))
            }}
          >
            <Icon
              name={
                article?.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"
              }
            />
            <p> 点赞</p>
          </div>
          <div
            className="action-item"
            onClick={() => {
              dispatch(collectArticle(article.art_id, article.is_collected))
            }}
          >
            <Icon
              name={
                article?.is_collected
                  ? "iconbtn_collect_sel"
                  : "iconbtn_collect"
              }
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon
            name={
              article?.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"
            }
          />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon name="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter

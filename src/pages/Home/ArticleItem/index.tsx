import classnames from "classnames"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"
import { ArticleItemData } from "@/types/data"
import dayjs from "dayjs"

type ArticleItemProps = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3
  article: ArticleItemData
}

const ArticleItem = ({ type = 0, article }: ArticleItemProps) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          "article-content",
          type === 3 && "t3",
          type === 0 && "none-mt"
        )}
      >
        <h3>{article.title}</h3>
        {/* 有图片 */}
        {type !== 0 && (
          <div className="article-imgs">
            {article.cover.images.map((img, index) => {
              return (
                <div className="article-img-wrapper" key={index}>
                  <img src={img} alt="" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      {/* 没有图片 */}
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count} 评论</span>

        <span> {dayjs(article.pubdate).fromNow()}</span>
        <span className="close">
          <Icon name="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem

import styles from "./index.module.scss"
import { NavBar, TextArea } from "antd-mobile"
import { useEffect, useRef, useState } from "react"
import { TextAreaRef } from "antd-mobile/es/components/text-area"
type Props = {
  // 评论的作者的名字
  name?: string
  onClose?: () => void
  publicComment?: (val: string) => void
}
export default function CommentInput({ name, onClose, publicComment }: Props) {
  const [comment, setComment] = useState("")
  const textRef = useRef<TextAreaRef>(null)
  useEffect(() => {
    textRef.current?.focus()
  }, [])
  return (
    <div className={styles.root}>
      <NavBar
        right={
          <span
            className="publish"
            onClick={() => {
              publicComment?.(comment)
            }}
          >
            发表
          </span>
        }
        onBack={onClose}
      >
        {name ? "回复评论" : "评论文章"}
      </NavBar>
      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea
          placeholder="说点什么~"
          rows={10}
          value={comment}
          onChange={(val: string) => {
            setComment(val)
          }}
          ref={textRef}
        />
      </div>
    </div>
  )
}

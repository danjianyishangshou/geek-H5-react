import classnames from "classnames"
import { useEffect, useRef, useState } from "react"
import Icon from "@/components/icon/index"
import styles from "./index.module.scss"

type Props = {
  src: string
  className?: string
}
/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }: Props) => {
  // 记录图片加载是否出错的状态
  const [isError, setIsError] = useState<boolean>(false)

  // 记录图片是否正在加载的状态
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 对图片元素的引用
  const imgRef = useRef(null)
  useEffect(() => {
    // 创建视图实例
    const obServer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // isIntersecting
        // 进入可视区进行赋值
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          // 进行赋值操作 获取自定属性data-xx 赋值给src
          // 防止出现空的情况
          img.src = img.dataset.src || ""
          // 防止出现二次刷新加载图片
          // if(img.src){
          //   img.src = img.dataset.src || ""
          // }
        }
      }
    })
    // 启动事件监听 挂载到指定的元素
    obServer.observe(imgRef.current!)
    // 防止二次刷新 就行清楚事件
    return () => {
      obServer.disconnect()
    }
  }, [])
  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {isLoading && (
        <div className="image-icon">
          <Icon name="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {isError && (
        <div className="image-icon">
          <Icon name="iconphoto-fail" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}
      {!isError && (
        <img
          alt=""
          data-src={src}
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}

export default Image

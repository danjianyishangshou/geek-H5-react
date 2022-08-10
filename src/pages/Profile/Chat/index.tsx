import Icon from "@/components/icon/index"
import { useInitialState } from "@/hooks/use-initial-state"
import { getProfileActionCreator } from "@/store/actions/profile"
import { Message, ProfileInfo } from "@/types/data"
import { RootStore } from "@/types/store"
import { NavBar, Input } from "antd-mobile"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styles from "./index.module.scss"
// 引入通讯的库
import io, { Socket } from "socket.io-client"
import { getTokenInfo } from "@/utils/localToken"
const Chat = () => {
  // 进入页面发起请求 获取信息
  useInitialState(getProfileActionCreator)
  // 创建一个ref值进行接受数据
  const socketRef = useRef<Socket | null>(null)
  // 创建消息值 与修改值
  const [newMessage, setNewMessage] = useState("")
  // 进入页面就创建连接
  useEffect(() => {
    // 创建websocket实例 并配置基础路径,连接方式 请求要携带的信息字段
    const socket = io("http://toutiao.itheima.net", {
      transports: ["websocket"],
      query: {
        token: getTokenInfo().token,
      },
    })

    socketRef.current = socket
    // 与服务器创建连接
    socket.on("connect", () => {
      console.log("与服务器创建连接")
    })
    // 接受websocket后台返回的数据
    socket.on("message", (e) => {
      // 需要写成箭头函数的形式 此处形成了闭包 因为没有设置useEffect依赖项
      // 这里不能设置依赖项 设置了依赖项 会导致重新与websocket进行连接
      setMessages((m) => {
        return [
          ...m,
          {
            type: "robot",
            text: e.msg,
          },
        ]
      })
    })
  }, [])
  const [messages, setMessages] = useState<Message[]>([
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ])

  const history = useHistory()
  const profile = useSelector<RootStore, ProfileInfo>((state) => {
    return state.profile.profile
  })
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [messages])
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      {/* <div className="chat-list" ref={divRef}> */}
      {/* 机器人的消息 */}
      {/* <div className="chat-item">
          <Icon name="iconbtn_xiaozhitongxue" />
          <div className="message">你好！</div>
        </div> */}
      {/* 用户的消息 */}
      {/* <div className="chat-item user">
          <img src={"http://toutiao.itheima.net/images/user_head.jpg"} alt="" />
          <div className="message">你好？</div>
        </div>
      </div> */}
      <div className="chat-list" ref={divRef}>
        {messages.map((item, index) => {
          return (
            <div
              className={classNames("chat-item", {
                user: item.type === "user",
              })}
              key={index}
            >
              {item.type === "robot" && <Icon name="iconbtn_xiaozhitongxue" />}
              {item.type === "user" && <img src={profile.photo} alt="" />}
              <div className="message">{item.text}</div>
            </div>
          )
        })}
        {/* 底部消息输入框 */}
        <div className="input-footer">
          <Input
            className="no-border"
            placeholder="请描述您的问题"
            value={newMessage}
            onChange={(e) => {
              // 去除首位空格
              setNewMessage(e.trim())
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                socketRef.current?.emit("message", {
                  msg: newMessage,
                  timestamp: Date.now(),
                })
                setMessages([
                  ...messages,
                  {
                    type: "user",
                    text: newMessage,
                  },
                ])
                setNewMessage("")
                if (divRef.current) {
                  divRef.current.scrollTop = 100000
                }
              }
            }}
          />
          <Icon name="iconbianji" />
        </div>
      </div>
    </div>
  )
}

export default Chat

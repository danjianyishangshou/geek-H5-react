import { UserInfo } from '@/types/data'
import { RootStore } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'

type EditInputType = {
  type: 'name' | 'intro' | ''
  onClose?: () => void
  onSubmit?: (value: string, type: 'name' | 'intro' | '') => void
}
const EditInput = ({ type, onClose, onSubmit }: EditInputType) => {
  const userInfo = useSelector<RootStore, UserInfo>((state) => state.profile.userInfo)
  const [value, setValue] = useState(() => {
    return type === 'name' ? userInfo.name : userInfo.intro
  })
  const onInputChange = (val: string) => {
    setValue(val)
  }
  const inputRef = useRef<InputRef | null>(null)
  const textAreaRef = useRef<TextAreaRef | null>(null)
  useEffect(() => {
    inputRef.current?.focus()
    textAreaRef.current?.focus()
    // 获取原生的DOM 使用setSelectionRange方法选中元素
    const _textarea = document.querySelector('.adm-text-area-element') as HTMLTextAreaElement

    if (_textarea) {
      // const end = _textarea.value.length
      const end = _textarea.textLength
      // setSelectionRange(end, end)选中的文字 第一个参数 开始的位置 第二个参数 结束的位置 
      // 如果要实现光标定位就要实现起始位置相同
      _textarea.setSelectionRange(end, end)
    }
  }, [])
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={<span className="commit-btn" onClick={() => {
          onSubmit?.(value, type)
        }}>提交</span>}
        onBack={onClose}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>


        {type === 'name' ? (
          <div className="input-wrap">
            <Input placeholder="请输入" value={value} maxLength={11} onChange={onInputChange} ref={inputRef} />
          </div>) :
          (<TextArea
            className="textarea _textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
            value={value}
            onChange={onInputChange}
            ref={textAreaRef}
          />)
        }


      </div>
    </div>
  )
}

export default EditInput

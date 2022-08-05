import { Input, NavBar, TextArea } from 'antd-mobile'

import styles from './index.module.scss'
type EditInputType = {
  type: 'name' | 'intro' | ''
  onClose?: () => void
}
const EditInput = ({ type, onClose }: EditInputType) => {

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={<span className="commit-btn">提交</span>}
        onBack={onClose}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>


        {type === 'name' ? (
          <div className="input-wrap">
            <Input placeholder="请输入" />
          </div>) :
          (<TextArea
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
          />)
        }


      </div>
    </div>
  )
}

export default EditInput

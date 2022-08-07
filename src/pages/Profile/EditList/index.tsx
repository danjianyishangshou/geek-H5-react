import styles from './index.module.scss'
type EditType = {
  onClose?: () => void
  type: 'gender' | 'photo' | ''
  onSubmit: (value: string, type: 'gender' | 'photo' | '') => void
}
const genderList = [
  { title: '男', value: '0' },
  { title: '女', value: '1' }
]

const photoList = [
  { title: '拍照', value: '1' },
  { title: '本地选择', value: '2' }
]
const EditList = ({ onClose, type, onSubmit }: EditType) => {
  return (
    <div className={styles.root}>
      {(type === 'gender' ? genderList : photoList).map(item => (
        <div className="list-item" key={item.title} onClick={() => {
          onSubmit?.(item.value, type)
          onClose?.()
        }}>{item.title}</div>
      ))}
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList

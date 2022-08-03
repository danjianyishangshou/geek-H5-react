import classnames from 'classnames'
interface IconProps {
    // 传入需要的字体的字体图标
    name: string
    // 传入点击事件
    onClick?: () => void
    // 传入的定制的类名
    className?: string
}

const Icon = ({ name, onClick, className }: IconProps) => {
    return (
        // svg 支持原生的点击事件 但是Icon不支持 需要父传子
        <svg className={classnames('icon', className)} aria-hidden="true" onClick={onClick}>
            <use xlinkHref={`#${name}`} ></use>
        </svg>
    )
}

export default Icon
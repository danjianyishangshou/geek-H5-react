import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button } from 'antd-mobile'
import { useHistory } from 'react-router'
import { LoginFrom } from '@/types/data'
// 校验规则
const rules = {
    mobile: [
        { required: true, message: '手机号不能为空!' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
    ],
    code: [
        { required: true, message: '验证码不能为空!' },
        { pattern: /^\d{6}$/, message: '输入6位验证码' }
    ]
}
// 校验触发规则
const regulation = ['onChange', 'onBlur']
// 登录组件
const Login = () => {
    const history = useHistory()
    // 触发表单提交事件 需要给form 添加onFinish事件 注意给提交按钮添加type='submit'属性
    const onLoginForm = (values: LoginFrom): void => {
        console.log(values)
    }
    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar onBack={() => history.go(-1)}></NavBar>
            {/* 表单区域 */}
            <div className="login-form">
                <h2 className="title">账号登录</h2>

                <Form onFinish={onLoginForm}>
                    <Form.Item className="login-item"
                        name="mobile"
                        rules={rules.mobile}
                        validateTrigger={regulation}
                    >
                        <Input placeholder="请输入手机号"></Input>
                    </Form.Item>
                    {/* 就是一个布局相当于flex布局 extra靠右侧*/}
                    <List.Item
                        className="login-code-extra"
                        extra={<span className="code-extra">发送验证码</span>}
                    >
                        <Form.Item className="login-item"
                            name='code'
                            rules={rules.code}
                            validateTrigger={regulation}
                        >
                            <Input placeholder="请输入验证码"></Input>
                        </Form.Item>
                    </List.Item>

                    <Form.Item>
                        {/* 设置type='submit'可以提交验证 */}
                        <Button color="primary" className="login-submit" block type='submit'>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

export default Login
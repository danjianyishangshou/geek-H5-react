import styles from "./index.module.scss";
import { NavBar, Form, Input, List, Button, Toast } from "antd-mobile";
import { useHistory } from "react-router";
import { LoginFrom } from "@/types/data";
import { useDispatch } from "react-redux";
import {
  doLoginActionCreator,
  sendCodeActionCreator,
} from "@/store/actions/login";
import { useEffect, useRef, useState } from "react";
import { InputRef } from "antd-mobile/es/components/input";
import { useLocation } from "react-router-dom";
type LocationType = {
  state: {
    redirectUrl: string;
  };
};
// 校验规则
const rules = {
  mobile: [
    { required: true, message: "手机号不能为空!" },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误" },
  ],
  code: [
    { required: true, message: "验证码不能为空!" },
    { pattern: /^\d{6}$/, message: "输入6位验证码" },
  ],
};
// 校验触发规则
const regulation = ["onChange", "onBlur"];
// 登录组件
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef<number>(-1);
  // 清理定时器
  // 1,在定时器时间为0的时候清楚定时器
  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timerId.current);
    }
  }, [seconds]);
  // 在页面销毁的同时销毁定时器
  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);
  const location: LocationType = useLocation();

  // 用来操作mobile的相关操作
  const mobileRef = useRef<InputRef | null>(null);
  // 获取整个表单的信息 antd的方法 需要挂载到Form标签上
  const [form] = Form.useForm();

  // 触发表单提交事件 需要给form 添加onFinish事件 注意给提交按钮添加type='submit'属性
  const onLoginForm = async (values: LoginFrom): Promise<void> => {
    await dispatch(doLoginActionCreator(values));
    // 提示登录成功的信息
    Toast.show({
      icon: "success",
      content: "登录成功",
      // 对话框关闭后的回调函数
      afterClose: () => {
        // 重定向路径 在location中的state中获取路径信息
        const url = location.state?.redirectUrl;
        if (url) {
          history.replace(url);
        } else {
          history.push("/");
        }
      },
    });
  };
  // 获取验证码
  const onSendCode = () => {
    if (seconds > 0) return;
    // 获取mobile的值
    const mobileValue = form.getFieldValue("mobile");
    // 获取验证结果
    // form.getFieldError('mobile')
    const errors = form.getFieldError("mobile");
    if (!mobileValue || errors.length > 0) {
      // 通过非受控的方式获取光标 也可以获取值 mobileRef.current?.nativeElement?.value
      mobileRef.current?.focus();
      return;
    } else {
      // 发送验证码
      dispatch(sendCodeActionCreator(mobileValue));
      setSeconds(60);
      timerId.current = window.setInterval(() => {
        // 下面写法错误会引起闭包
        // setSeconds(seconds - 1)
        // 写成完整写法
        setSeconds((s) => s - 1);
      }, 1000);
    }
  };
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onBack={() => history.go(-1)}></NavBar>
      {/* 表单区域 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form form={form} onFinish={onLoginForm}>
          <Form.Item
            className="login-item"
            name="mobile"
            rules={rules.mobile}
            validateTrigger={regulation}
          >
            <Input placeholder="请输入手机号" ref={mobileRef}></Input>
          </Form.Item>
          {/* 就是一个布局相当于flex布局 extra靠右侧*/}
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={onSendCode}>
                {seconds > 0 ? seconds + "秒内发送" : "发送验证码"}
              </span>
            }
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={rules.code}
              validateTrigger={regulation}
            >
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>

          <Form.Item>
            {/* 设置type='submit'可以提交验证 */}
            <Button
              color="primary"
              className="login-submit"
              block
              type="submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import md5 from 'blueimp-md5';
import styles from './index.module.less';

import { setToken } from '@/services/token';
import { login } from '../../api/demo';

import store from '@/store';

function Login(props) {

  const asideMenuConfig = [
    {
      name: 'login',
      path: '/login',
    },
    {
      name: 'home',
      path: '/home',
    },
    {
      name: 'Dashboard',
      path: '/hp',
      // 二级菜单配置
      children: [
        {
          name: 'Analysis', // 二级菜单名称
          path: '/hp/dashboard', // 二级菜单路径
        },
        {
          name: 'second', // 二级菜单名称
          path: '/hp/second', // 二级菜单路径
        },
      ],
    },
  ];

  const { update } = store.useModelDispatchers('user');
  const loginHandle = ({ username, password }) => {
    const ajaxjson = {
      username,
      password: md5(password),
    };
    login(ajaxjson).then((res) => {
      // console.log('login_res--', res);
      setToken(res.token);
      update({ userInfo: res });
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('routes', JSON.stringify(asideMenuConfig));
      props.history.replace('/home');
    });
  };
  const onFinish = (values) => {
    loginHandle(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const initialValues = {
    username: 'admin',
    password: '123456',
  };
  return (
    <div className={styles.login_con}>
      <div className={styles.center_wrap}>
        <div className={styles.img_wrap}>
          <img className={styles.img} src="../static/images/back.jpg" alt="" />
        </div>
        <div className={styles.form_wrap}>
          <img className={styles.logo} src="../static/images/logo.png" alt="" />
          <div className={styles.title}>民爆数智监管平台</div>
          <Form
            name="basic"
            labelAlign="right"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ width: 300 }}
            className={styles.form_in}
          >
            <Form.Item label="用户" name="username" rules={[{ required: true }]}>
              <Input size="large" placeholder="用户名" />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={[{ required: true }]}>
              <Input.Password
                size="large"
                placeholder="密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

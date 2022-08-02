import { createElement } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link, useHistory, useAuth, getInitialData } from 'ice';
import { asideMenuConfig } from './menuConfig';
import { removeToken } from '@/services/token';
import store from '@/store';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const loopMenuItem = (menus, auth) => {

  return menus
    .filter((item) => item.path !== '/login')
    .map(({ icon, children, ...item }) => {
      let roleAuth = true;
      if (item.auth && item.auth.length) {
        // 获取当前用户是否有该菜单的权限
        roleAuth = item.auth.some((key) => auth[key]);
      }
      if (!item.auth || roleAuth) {
        return {
          ...item,
          icon: icon && createElement(icon),
          children: children && loopMenuItem(children, auth),
        };
      }
      return null;
    });
};

export default function BasicLayout({ children, location }) {
  const [auth] = useAuth();
  // console.log(auth);
  // const initialData = getInitialData();
  // console.log(initialData);

  const history = useHistory();
  const [userState] = store.useModel('user');
  const menuList = JSON.parse(localStorage.getItem('routes')!);
  const logout = () => {
    removeToken();
    localStorage.removeItem('user');
    history.replace('/login');
  };
  const headerContent = (
    <div style={{ float: 'right', marginRight: '20px' }}>
      <span style={{ color: '#fff', cursor: 'pointer', margin: '0 10px' }}>{userState.userInfo.name}</span>
      <Button onClick={logout} type="primary" icon={<PoweroffOutlined />} size="small" />
    </div>
  );
  return (
    <ProLayout
      title="icejs & antd"
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      headerRender={() => headerContent}
      menuDataRender={() => loopMenuItem(menuList, auth)}
      menuItemRender={(item, defaultDom: any) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
      footerRender={() => (
        <DefaultFooter
          links={[
            {
              key: 'icejs',
              title: 'icejs',
              href: 'https://github.com/ice-lab/icejs',
            },
            {
              key: 'antd',
              title: 'antd',
              href: 'https://github.com/ant-design/ant-design',
            },
          ]}
          copyright="by icejs & antd"
        />
      )}
    >
      <div style={{ minHeight: '60vh' }}>{children}</div>
    </ProLayout>
  );
}

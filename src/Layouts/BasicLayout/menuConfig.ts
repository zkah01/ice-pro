import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

const asideMenuConfig = [
  {
    name: 'home',
    path: '/home',
    icon: SmileOutlined,
  },
  {
    name: 'Dashboard',
    path: '/hp',
    icon: HeartOutlined,
    // 二级菜单配置
    children: [
      {
        name: 'Analysis', // 二级菜单名称
        path: '/hp/dashboard', // 二级菜单路径
        auth: ['admin'],
      },
      {
        name: 'second', // 二级菜单名称
        path: '/hp/second', // 二级菜单路径
        icon: HeartOutlined,
      },
      {
        name: 'third', // 二级菜单名称
        path: '/hp/third', // 二级菜单路径
        auth: ['guest'],
        icon: HeartOutlined,
      },
    ],
  },
];

export { asideMenuConfig };

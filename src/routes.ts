import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
// import WrapperPage from '@/components/LoginWrapper';

const NotFound = lazy(() => import('@/components/NotFound'));
const Login = lazy(() => import('@/pages/Login'));

const menuList = JSON.parse(localStorage.getItem('routes')!);

const getmenu = () => {
  const routerLists: any = [];
  menuList.map((item) => {
    if (!item.children) {
      routerLists.push(item);
    } else if (item.children && item.children.length >= 1) {
      item.children.map((child) => {
        routerLists.push(child);
      });
    } else {
      console.error(item, 'ERROR');
    }
  });
  const List: any = [];
  routerLists.map((item) => {
    if (item.path != '/login') {
      const pagePath = item.path.split('/')[item.path.split('/').length - 1];
      List.push({ path: item.path, component: lazy(() => import(`./pages/${pagePath}`)) });
    }
  });
  return List;
};
console.log(getmenu());

const routerConfig: IRouterConfig[] = [
  {
    path: '/login',
    component: Login,
  },

  {
    path: '/',
    component: Layout,
    children: [
      ...getmenu(),
      {
        component: NotFound,
      },
    ],
  },
];
// const routerConfig: IRouterConfig[] = [
//   {
//     path: '/login',
//     component: Login,
//   },

//   {
//     path: '/',
//     component: Layout,
//     children: [
//       {
//         path: '/hp/dashboard',
//         component: Dashboard,
//       },
//       {
//         path: '/hp/second',
//         component: Second,
//         pageConfig: {
//           auth: ['guest'],
//         },
//       },
//       {
//         path: '/home',
//         component: Home,
//       },
//       {
//         component: NotFound,
//       },
//       {
//         path: '/',
//         // 重定向
//         redirect: '/home',
//       },
//     ],
//   },
// ];

export default routerConfig;

import { message } from 'antd';
import { runApp, IAppConfig } from 'ice';
import { getToken } from './utils/token';
function getRole(): any {
  return new Promise((res, rej) => {
    res(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!));
  });
}
const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    getInitialData: async (ctx) => {
      if (localStorage.getItem('user')) {
        const { roleId } = await getRole();
        return {
          auth: {
            admin: roleId === 3,
            guest: roleId === 4,
          },
          initialStates: {
            user: { userInfo: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!) },
          },
        };
      }
    },
  },
  request: [
    {
      baseURL: '/regulatory-system/api',
      // 拦截器
      interceptors: {
        request: {
          onConfig: (config: any) => {
            // 发送请求前：可以对 RequestConfig 做一些统一处理
            const accessToken = getToken();
            if (accessToken) {
              config.headers['token'] = getToken();
            } else if (location.pathname !== '/login') {
              location.href = '/login';
            }
            return config;
          },
          onError: (error) => {
            return Promise.reject(error);
          },
        },
        response: {
          onConfig: (response: any) => {
            const res = response.data;
            // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
            if ([50003, 50004, 50005].includes(res.code)) {
              message.error({
                content: 'token无效，请联系后台管理员！',
                duration: 5,
              });
              // removeToken();
              setTimeout(() => {
                location.href = '/login';
              }, 1000);
              return Promise.reject();
            } else if (res.code !== 20000) {
              message.error({
                content: res.message || 'Error',
                duration: 5,
              });
              return Promise.reject(new Error(res.message || 'Error'));
            } else {
              return res;
            }
          },
          onError: (error) => {
            // 请求出错：服务端返回错误状态码
            message.error({
              content: error.message,
              duration: 5,
            });
            return Promise.reject(error);
          },
        },
      },
    },
    {
      // 配置 request 实例名称，如果不配默认使用内置的 request 实例
      instanceName: 'request2',
      baseURL: '/api',
      // ...RequestConfig 其他参数
    },
  ],
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    NoAuthFallback: <div>没有权限...</div>,
    // 或者传递一个函数组件
    // NoAuthFallback: () => <div>没有权限..</div>
  },
  router: {
    type: 'browser',
    basename: '/',
    fallback: <div>loading...</div>,
    modifyRoutes: (routes) => {
      return routes;
    },
  },
};

runApp(appConfig);

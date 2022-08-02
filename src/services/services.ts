import axios from 'axios';
import { message as Message } from 'antd';
import history from './history';
// import store from '@/store';
import { getToken } from './token';

const service = axios.create({
  baseURL: '/regulatory-system/api',
  timeout: 50000,
});

service.interceptors.request.use(
  (config: any) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers['token'] = getToken();
    } else if (location.pathname !== '/login') {
      history.push('/login');
    }
    return config;
  },
  (error) => {
    console.error(error); // for debug
    return Promise.reject(error);
  },
);

// 直接返回原始数据的接口
const backInitialDataList = ['companymark/exportCompanyMarkTotal'];

// 不需要返回拦截的接口--完全匹配
const noInterceptorsList = [
  '/checktemplatedetails/exportCheckTempExcel',
  '/reportcheck/download',
  '/reportfile/downloadZip',
  'companymark/exportCompanyMarkDetail',
  '/companyemployee/exportReport',
  '/companytrain/exportReport',
  '/companysale/exportReport',
  '/companyemployee/downloadTemplate',
];

service.interceptors.response.use(
  (response) => {
    // console.log('response--', response);
    // SUCCESS(20000, "操作成功"),
    // SYS_ERROR(50000, "系统异常"),
    // NO_PERMISSION(50001, "没有权限"),
    // PARAM_ERROR(50002, "参数错误"),
    // NO_TOKEN(50003, "TOKEN为空"),
    // TOKEN_CHECK_FAILURE(50004, "TOKEN验证失败"),
    // TOKEN_EXPIRE(50004, "TOKEN过期");
    // USER_NOT_EXISTS(50005,"帐号不存在")
    // if (backInitialDataList.includes(response.config.url)) {
    //   return response;
    // }
    const res = response.data;
    // console.log('response.config.url: ', response.config.url);
    // if (noInterceptorsList.includes(response.config.url)) {
    //   return res;
    // }
    // console.log('eeer--res.code', res);
    if ([50003, 50004, 50005].includes(res.code)) {
      Message.error({
        content: 'token无效，请联系后台管理员！',
        duration: 5,
      });
      // removeToken();
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return Promise.reject();
    } else if (res.code !== 20000) {
      Message.error({
        content: res.message || 'Error',
        duration: 5,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log(`err${error}`); // for debug
    Message.error({
      content: error.message,
      duration: 5,
    });
    return Promise.reject(error);
  },
);

export default service;

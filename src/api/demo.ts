// import request from '@/services/services';
import { request } from 'ice';

export const login = async (data) => {
  return await request({
    url: '/login',
    method: 'post',
    data,
  });
};

// 获取账号列表
export function systemUserSearch(data) {
  return request({
    url: `/systemuser/search/${data.page}/${data.size}`,
    method: 'post',
    data,
  });
}

/**
 * 获取企业列表
 * @param {*} data
 * @returns
 */
export function companyList(data) {
  return request({
    url: '/company/queryCompany',
    method: 'post',
    data,
  });
}

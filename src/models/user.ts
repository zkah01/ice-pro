// src/models/user.ts
import { IRootState, IRootDispatch } from '@/store';

export const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default {
  // 定义 model 的初始 state
  state: {
    userInfo: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!),
  },

  // 定义改变该模型状态的纯函数
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  // 定义处理该模型副作用的函数
  effects: (dispatch: IRootDispatch) => ({
    async getUserInfo(payload, rootState: IRootState) {
      await delay(1000);
      await dispatch.user.update();
    },
  }),
};

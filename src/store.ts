// src/store.ts
// import { createStore } from 'ice';
// import user from './models/user';

// const store = createStore(
//   {
//     user,
//   },
//   {
//     // options
//   },
// );

// export default store;

// src/store.ts
import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import user from './models/user';

interface IAppStoreModels extends IStoreModels {
  user: typeof user;
};

const appModels: IAppStoreModels = {
  user,
};

export default createStore(appModels);

export type IRootDispatch = IStoreDispatch<typeof appModels>;
export type IRootState = IStoreRootState<typeof appModels>;
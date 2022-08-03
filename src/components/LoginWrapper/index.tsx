// 路由高阶组件
import { getToken } from '@/utils/token';
import { Redirect, useHistory } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const history = useHistory();

  const Wrapped = (props) => {
    let isAuthenticated = Boolean(getToken());
    if (!isAuthenticated) {
      history && history.replace('/login');
    } 
    return <>{isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/login" />}</>;
  };

  return Wrapped;
};

export default LoginWrapper;

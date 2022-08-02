// 路由高阶组件
import { useAuth, Redirect } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const Wrapped = (props) => {
    const [auth] = useAuth();
    console.log(auth, '取到的页面配置auth');
    return <>{auth.isLogin ? <WrappedComponent {...props} /> : <Redirect to="/login" />}</>;
  };

  return Wrapped;
};

export default LoginWrapper;

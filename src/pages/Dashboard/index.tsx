import { useEffect } from 'react';
import { useRequest } from 'ice';
import { Table } from 'antd';
import styles from './index.module.css';
import store from '@/store';

export default function Dashboard(props) {
  const { data, error, loading, request: fetchRepos } = useRequest({ url: '/getRepos', instanceName: 'request2' });
  const { dataSource = [] } = data || {};

  const [userState] = store.useModel('user');
  // const { update } = store.useModelDispatchers('user');
  useEffect(() => {
    (async function () {
      await fetchRepos();
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Home page</h2>
      <h5>{userState.userInfo.roleId}</h5>
      {error ? (
        <div>request error: {error.message}</div>
      ) : (
        <Table loading={loading} dataSource={dataSource} rowKey="id">
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="名称" dataIndex="name" key="name" />
          <Table.Column title="描述" dataIndex="description" key="description" />
        </Table>
      )}
    </div>
  );
}

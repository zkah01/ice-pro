import { useEffect, useState } from 'react';
import { useAuth } from 'ice';
import { Table } from 'antd';
import styles from './index.module.scss';
import { systemUserSearch } from '../../api/demo';

export default function Home() {
  const [dataSource, setdataSource] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const [auth] = useAuth();
  console.log(auth);

  useEffect(() => {
    systemUserSearch({
      page: 1,
      size: 20,
      companyCode: '01',
    }).then((res) => {
      setdataSource(res.records);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2>Home page</h2>
      <div x-if={isAdmin}>admin</div>
      <div x-else>guest</div>
      <div>
        <Table dataSource={dataSource} rowKey="id">
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="名称" dataIndex="name" key="name" />
          <Table.Column title="描述" dataIndex="roleName" key="roleName" />
        </Table>
      </div>
    </div>
  );
}

import React from 'react';
import { Card } from 'antd';
import UsersList from './components/tables/UsersList';

const UserListPage = () => {
  return (
    <Card style={{ width: '100%' }}>
      <UsersList />
    </Card>
  );
};

export default UserListPage;

import React from 'react';
import AdminForm from '../AdminForm';

const ManageScreens = () => {
  const fields = [
    { name: 'cinema_id', label: 'Cinema ID', type: 'number' },
    { name: 'name', label: 'Name' },
  ];

  return <AdminForm entityName="Screen" fields={fields} apiUrl="http://localhost:3001/api/admin/screens" />;
};

export default ManageScreens;


import React from 'react';
import AdminForm from '../AdminForm';

const ManageCinemas = () => {
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'location', label: 'Location' },
  ];

  return <AdminForm entityName="Cinema" fields={fields} apiUrl="http://localhost:3001/api/admin/cinemas" />;
};

export default ManageCinemas;

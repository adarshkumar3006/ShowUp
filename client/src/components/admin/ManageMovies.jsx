
import React from 'react';
import AdminForm from '../AdminForm';

const ManageMovies = () => {
  const fields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'duration', label: 'Duration', type: 'number' },
  ];

  return <AdminForm entityName="Movie" fields={fields} apiUrl="http://localhost:3001/api/admin/movies" />;
};

export default ManageMovies;

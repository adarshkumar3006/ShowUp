
import React from 'react';
import AdminForm from '../AdminForm';

const ManageShows = () => {
  const fields = [
    { name: 'movie_id', label: 'Movie ID', type: 'number' },
    { name: 'screen_id', label: 'Screen ID', type: 'number' },
    { name: 'start_time', label: 'Start Time', type: 'datetime-local' },
  ];

  return <AdminForm entityName="Show" fields={fields} apiUrl="http://localhost:3001/api/admin/shows" />;
};

export default ManageShows;

import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { MunicipiosPage } from '../../components/Municipios/MunicipiosPage';

const AdminMunicipios: React.FC = () => {
  return (
    <AdminLayout>
      <MunicipiosPage />
    </AdminLayout>
  );
};

export default AdminMunicipios; 
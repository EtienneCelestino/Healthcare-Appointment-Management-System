import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { ProvinciasPage } from '../../components/Provincias/ProvinciasPage';

const AdminProvincias: React.FC = () => {
  return (
    <AdminLayout>
      <ProvinciasPage />
    </AdminLayout>
  );
};

export default AdminProvincias; 
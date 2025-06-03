import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { ServicosPage } from '../../components/Servicos/ServicosPage';

const AdminServices: React.FC = () => {
  return (
    <AdminLayout>
      <ServicosPage />
    </AdminLayout>
  );
};

export default AdminServices; 
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { UsuariosPage } from '../../components/Usuarios/UsuariosPage';

const AdminUsers: React.FC = () => {
  return (
    <AdminLayout>
      <UsuariosPage />
    </AdminLayout>
  );
};

export default AdminUsers; 
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { PacientesPage } from '../../components/Pacientes/PacientesPage';

const AdminPatients: React.FC = () => {
  return (
    <AdminLayout>
      <PacientesPage />
    </AdminLayout>
  );
};

export default AdminPatients;
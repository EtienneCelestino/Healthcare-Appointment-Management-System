import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { ProfissionaisPage } from '../../components/Profissionais/ProfissionaisPage';

const AdminProfessionals: React.FC = () => {
  return (
    <AdminLayout>
      <ProfissionaisPage />
    </AdminLayout>
  );
};

export default AdminProfessionals; 
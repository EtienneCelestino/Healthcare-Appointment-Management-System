import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { AgendamentosPage } from '../../components/Agendamentos/AgendamentosPage';

const AdminAppointments: React.FC = () => {
    return (
        <AdminLayout>
            <AgendamentosPage />
        </AdminLayout>
    );
};

export default AdminAppointments; 
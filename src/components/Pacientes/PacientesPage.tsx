import React, { useState } from 'react';
import { PacienteList } from './PacienteList';
import { PacienteForm } from './PacienteForm';

export const PacientesPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedPacienteId, setSelectedPacienteId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedPacienteId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedPacienteId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Pacientes</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Paciente
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedPacienteId ? 'Editar Paciente' : 'Novo Paciente'}
                    </h2>
                    <PacienteForm
                        pacienteId={selectedPacienteId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <PacienteList />
            )}
        </div>
    );
}; 
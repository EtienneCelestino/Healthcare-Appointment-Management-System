import React, { useState } from 'react';
import { ProfissionalList } from './ProfissionalList';
import { ProfissionalForm } from './ProfissionalForm';

export const ProfissionaisPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedProfissionalId, setSelectedProfissionalId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedProfissionalId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProfissionalId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Profissionais</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Profissional
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedProfissionalId ? 'Editar Profissional' : 'Novo Profissional'}
                    </h2>
                    <ProfissionalForm
                        profissionalId={selectedProfissionalId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <ProfissionalList />
            )}
        </div>
    );
}; 
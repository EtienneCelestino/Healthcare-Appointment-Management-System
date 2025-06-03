import React, { useState } from 'react';
import { CentroSaudeList } from './CentroSaudeList';
import { CentroSaudeForm } from './CentroSaudeForm';

export const CentrosSaudePage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedCentroId, setSelectedCentroId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedCentroId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedCentroId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Centros de Saúde</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Centro de Saúde
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedCentroId ? 'Editar Centro de Saúde' : 'Novo Centro de Saúde'}
                    </h2>
                    <CentroSaudeForm
                        centroId={selectedCentroId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <CentroSaudeList />
            )}
        </div>
    );
}; 
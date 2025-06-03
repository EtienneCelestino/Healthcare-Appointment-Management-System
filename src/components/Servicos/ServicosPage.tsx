import React, { useState } from 'react';
import { ServicoList } from './ServicoList';
import { ServicoForm } from './ServicoForm';

export const ServicosPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedServicoId, setSelectedServicoId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedServicoId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedServicoId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Serviços</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Serviço
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedServicoId ? 'Editar Serviço' : 'Novo Serviço'}
                    </h2>
                    <ServicoForm
                        servicoId={selectedServicoId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <ServicoList />
            )}
        </div>
    );
}; 
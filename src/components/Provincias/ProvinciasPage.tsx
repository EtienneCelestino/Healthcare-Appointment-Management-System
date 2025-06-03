import React, { useState } from 'react';
import { ProvinciaList } from './ProvinciaList';
import { ProvinciaForm } from './ProvinciaForm';

export const ProvinciasPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedProvinciaId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProvinciaId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Províncias</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Nova Província
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedProvinciaId ? 'Editar Província' : 'Nova Província'}
                    </h2>
                    <ProvinciaForm
                        provinciaId={selectedProvinciaId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <ProvinciaList />
            )}
        </div>
    );
}; 
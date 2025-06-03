import React, { useState } from 'react';
import { UsuarioList } from './UsuarioList';
import { UsuarioForm } from './UsuarioForm';

export const UsuariosPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedUsuarioId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedUsuarioId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Usuários</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Usuário
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedUsuarioId ? 'Editar Usuário' : 'Novo Usuário'}
                    </h2>
                    <UsuarioForm
                        usuarioId={selectedUsuarioId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <UsuarioList />
            )}
        </div>
    );
}; 
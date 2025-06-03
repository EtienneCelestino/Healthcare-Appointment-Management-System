import React, { useState } from 'react';
import { AgendamentoList } from './AgendamentoList';
import { AgendamentoForm } from './AgendamentoForm';

export const AgendamentosPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedAgendamentoId, setSelectedAgendamentoId] = useState<number | undefined>();

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedAgendamentoId(undefined);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedAgendamentoId(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Novo Agendamento
                    </button>
                )}
            </div>

            {showForm ? (
                <AgendamentoForm
                    agendamentoId={selectedAgendamentoId}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                />
            ) : (
                <AgendamentoList
                    onEdit={(id) => {
                        setSelectedAgendamentoId(id);
                        setShowForm(true);
                    }}
                />
            )}
        </div>
    );
}; 
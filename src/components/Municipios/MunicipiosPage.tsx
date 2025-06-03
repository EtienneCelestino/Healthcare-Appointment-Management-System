import React, { useState, useEffect } from 'react';
import { municipiosApi } from '../../lib/api';
import type { Municipio } from '../../types/database';
import { MunicipioForm } from './MunicipioForm';

export const MunicipiosPage: React.FC = () => {
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedMunicipioId, setSelectedMunicipioId] = useState<number | undefined>();

    useEffect(() => {
        carregarMunicipios();
    }, []);

    const carregarMunicipios = async () => {
        try {
            setLoading(true);
            const response = await municipiosApi.listar();
            setMunicipios(response.data);
        } catch (err) {
            setError('Erro ao carregar municípios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este município?')) return;

        try {
            setLoading(true);
            await municipiosApi.excluir(id);
            await carregarMunicipios();
        } catch (err) {
            setError('Erro ao excluir município');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        setSelectedMunicipioId(id);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedMunicipioId(undefined);
        carregarMunicipios();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedMunicipioId(undefined);
    };

    if (loading && !municipios.length) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Municípios</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Novo Município
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedMunicipioId ? 'Editar Município' : 'Novo Município'}
                    </h2>
                    <MunicipioForm
                        municipioId={selectedMunicipioId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Província
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {municipios.map((municipio) => (
                                <tr key={municipio.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {municipio.nome}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {municipio.provincia?.nome}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(municipio.id)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(municipio.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}; 
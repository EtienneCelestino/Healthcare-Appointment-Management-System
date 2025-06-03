import React, { useEffect, useState } from 'react';
import { centrosSaudeApi } from '../../lib/api';
import type { CentroSaude } from '../../types/database';

export const CentroSaudeList: React.FC = () => {
    const [centros, setCentros] = useState<CentroSaude[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarCentros();
    }, []);

    const carregarCentros = async () => {
        try {
            setLoading(true);
            const response = await centrosSaudeApi.listar();
            setCentros(response.data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar centros de saúde');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExcluir = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este centro de saúde?')) {
            try {
                await centrosSaudeApi.excluir(id);
                await carregarCentros();
            } catch (err) {
                setError('Erro ao excluir centro de saúde');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Endereço
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {centros.map((centro) => (
                        <tr key={centro.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {centro.nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {centro.endereco}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {centro.tipo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => {/* Implementar edição */}}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleExcluir(centro.id)}
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
    );
}; 
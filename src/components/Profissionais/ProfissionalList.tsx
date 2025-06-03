import React, { useEffect, useState } from 'react';
import { profissionaisApi } from '../../lib/api';
import type { Profissional } from '../../types/database';

export const ProfissionalList: React.FC = () => {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarProfissionais();
    }, []);

    const carregarProfissionais = async () => {
        try {
            setLoading(true);
            const response = await profissionaisApi.listar();
            setProfissionais(response.data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar profissionais');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExcluir = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
            try {
                await profissionaisApi.excluir(id);
                await carregarProfissionais();
            } catch (err) {
                setError('Erro ao excluir profissional');
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
                            Especialidade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Centro de Saúde
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {profissionais.map((profissional) => (
                        <tr key={profissional.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {profissional.nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {profissional.especialidade}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {profissional.centro_saude_nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => {/* Implementar edição */}}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleExcluir(profissional.id)}
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
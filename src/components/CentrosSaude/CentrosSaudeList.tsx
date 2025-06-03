import React, { useEffect, useState } from 'react';
import { centrosSaudeApi } from '../../lib/api';
import type { CentroSaude } from '../../types/database';

export const CentrosSaudeList: React.FC = () => {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Centros de Saúde</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {centros.map((centro) => (
                    <div key={centro.id} className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">{centro.nome}</h2>
                        <p className="text-gray-600 mb-2">{centro.endereco}</p>
                        <p className="text-gray-600 mb-2">Tipo: {centro.tipo}</p>
                        {centro.telefone && (
                            <p className="text-gray-600 mb-2">Telefone: {centro.telefone}</p>
                        )}
                        {centro.email && (
                            <p className="text-gray-600 mb-2">Email: {centro.email}</p>
                        )}
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleExcluir(centro.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Excluir
                            </button>
                            <button
                                onClick={() => {/* Implementar edição */}}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 
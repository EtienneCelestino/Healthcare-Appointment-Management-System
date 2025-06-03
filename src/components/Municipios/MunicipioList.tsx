import React, { useEffect, useState } from 'react';
import { municipiosApi } from '../../lib/api';
import type { Municipio } from '../../types/database';

export const MunicipioList: React.FC = () => {
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarMunicipios();
    }, []);

    const carregarMunicipios = async () => {
        try {
            setLoading(true);
            const response = await municipiosApi.listar();
            setMunicipios(response.data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar municípios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExcluir = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este município?')) {
            try {
                await municipiosApi.excluir(id);
                await carregarMunicipios();
            } catch (err) {
                setError('Erro ao excluir município');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Municípios</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {municipios.map((municipio) => (
                    <div key={municipio.id} className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">{municipio.nome}</h2>
                        <p className="text-gray-600 mb-2">
                            Província: {municipio.provincia?.nome}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleExcluir(municipio.id)}
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
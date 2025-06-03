import React, { useState, useEffect } from 'react';
import { servicosApi } from '../../lib/api';
import type { Servico } from '../../types/database';

interface ServicoFormProps {
    servicoId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ServicoForm: React.FC<ServicoFormProps> = ({
    servicoId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Servico>>({
        nome: '',
        descricao: '',
        duracao: 30
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (servicoId) {
            carregarServico();
        }
    }, [servicoId]);

    const carregarServico = async () => {
        try {
            setLoading(true);
            const response = await servicosApi.obter(servicoId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do serviço');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (servicoId) {
                await servicosApi.atualizar(servicoId, formData);
            } else {
                await servicosApi.criar(formData as Omit<Servico, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar serviço');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                <input
                    type="number"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                    required
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
}; 
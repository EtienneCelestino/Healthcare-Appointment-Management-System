import React, { useState, useEffect } from 'react';
import { provinciasApi } from '../../lib/api';
import type { Provincia } from '../../types/database';

interface ProvinciaFormProps {
    provinciaId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ProvinciaForm: React.FC<ProvinciaFormProps> = ({
    provinciaId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Provincia>>({
        nome: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (provinciaId) {
            carregarProvincia();
        }
    }, [provinciaId]);

    const carregarProvincia = async () => {
        try {
            setLoading(true);
            const response = await provinciasApi.obter(provinciaId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados da província');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (provinciaId) {
                await provinciasApi.atualizar(provinciaId, formData);
            } else {
                await provinciasApi.criar(formData as Omit<Provincia, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar província');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
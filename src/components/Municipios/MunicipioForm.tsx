import React, { useState, useEffect } from 'react';
import { municipiosApi, provinciasApi } from '../../lib/api';
import type { Municipio, Provincia } from '../../types/database';

interface MunicipioFormProps {
    municipioId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const MunicipioForm: React.FC<MunicipioFormProps> = ({
    municipioId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Municipio>>({
        nome: '',
        provincia_id: 0
    });

    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarProvincias();
        if (municipioId) {
            carregarMunicipio();
        }
    }, [municipioId]);

    const carregarProvincias = async () => {
        try {
            const response = await provinciasApi.listar();
            setProvincias(response.data);
        } catch (err) {
            setError('Erro ao carregar províncias');
            console.error(err);
        }
    };

    const carregarMunicipio = async () => {
        try {
            setLoading(true);
            const response = await municipiosApi.obter(municipioId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do município');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (municipioId) {
                await municipiosApi.atualizar(municipioId, formData);
            } else {
                await municipiosApi.criar(formData as Omit<Municipio, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar município');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <label className="block text-sm font-medium text-gray-700">Província</label>
                <select
                    name="provincia_id"
                    value={formData.provincia_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione uma província</option>
                    {provincias.map((provincia) => (
                        <option key={provincia.id} value={provincia.id}>
                            {provincia.nome}
                        </option>
                    ))}
                </select>
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
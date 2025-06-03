import React, { useState, useEffect } from 'react';
import { centrosSaudeApi, municipiosApi } from '../../lib/api';
import type { CentroSaude, Municipio } from '../../types/database';

interface CentroSaudeFormProps {
    centroId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const CentroSaudeForm: React.FC<CentroSaudeFormProps> = ({
    centroId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<CentroSaude>>({
        nome: '',
        endereco: '',
        municipio_id: 0,
        telefone: '',
        email: '',
        site_web: '',
        capacidade: '',
        tipo: ''
    });

    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarMunicipios();
        if (centroId) {
            carregarCentro();
        }
    }, [centroId]);

    const carregarMunicipios = async () => {
        try {
            const response = await municipiosApi.listar();
            setMunicipios(response.data);
        } catch (err) {
            setError('Erro ao carregar municípios');
            console.error(err);
        }
    };

    const carregarCentro = async () => {
        try {
            setLoading(true);
            const response = await centrosSaudeApi.obter(centroId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do centro de saúde');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (centroId) {
                await centrosSaudeApi.atualizar(centroId, formData);
            } else {
                await centrosSaudeApi.criar(formData as Omit<CentroSaude, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar centro de saúde');
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
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Município</label>
                <select
                    name="municipio_id"
                    value={formData.municipio_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione um município</option>
                    {municipios.map((municipio) => (
                        <option key={municipio.id} value={municipio.id}>
                            {municipio.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Site Web</label>
                <input
                    type="url"
                    name="site_web"
                    value={formData.site_web}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Capacidade</label>
                <input
                    type="text"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <input
                    type="text"
                    name="tipo"
                    value={formData.tipo}
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
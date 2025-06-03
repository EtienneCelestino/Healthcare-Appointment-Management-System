import React, { useState, useEffect } from 'react';
import { profissionaisApi, centrosSaudeApi } from '../../lib/api';
import type { Profissional, CentroSaude } from '../../types/database';

interface ProfissionalFormProps {
    profissionalId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ProfissionalForm: React.FC<ProfissionalFormProps> = ({
    profissionalId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Profissional>>({
        nome: '',
        especialidade: '',
        centro_saude_id: 0,
        telefone: '',
        email: '',
        horario_inicio: '',
        horario_fim: ''
    });

    const [centrosSaude, setCentrosSaude] = useState<CentroSaude[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarCentrosSaude();
        if (profissionalId) {
            carregarProfissional();
        }
    }, [profissionalId]);

    const carregarCentrosSaude = async () => {
        try {
            const response = await centrosSaudeApi.listar();
            setCentrosSaude(response.data);
        } catch (err) {
            setError('Erro ao carregar centros de saúde');
            console.error(err);
        }
    };

    const carregarProfissional = async () => {
        try {
            setLoading(true);
            const response = await profissionaisApi.obter(profissionalId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do profissional');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (profissionalId) {
                await profissionaisApi.atualizar(profissionalId, formData);
            } else {
                await profissionaisApi.criar(formData as Omit<Profissional, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar profissional');
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
                <label className="block text-sm font-medium text-gray-700">Especialidade</label>
                <input
                    type="text"
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Centro de Saúde</label>
                <select
                    name="centro_saude_id"
                    value={formData.centro_saude_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione um centro de saúde</option>
                    {centrosSaude.map((centro) => (
                        <option key={centro.id} value={centro.id}>
                            {centro.nome}
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
                <label className="block text-sm font-medium text-gray-700">Horário de Início</label>
                <input
                    type="time"
                    name="horario_inicio"
                    value={formData.horario_inicio}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Horário de Fim</label>
                <input
                    type="time"
                    name="horario_fim"
                    value={formData.horario_fim}
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
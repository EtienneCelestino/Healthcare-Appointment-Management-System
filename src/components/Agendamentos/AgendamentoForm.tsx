import React, { useState, useEffect } from 'react';
import { agendamentosApi, pacientesApi, profissionaisApi, servicosApi } from '../../lib/api';
import type { Agendamento, Paciente, Profissional, Servico } from '../../types/database';

interface AgendamentoFormProps {
    agendamentoId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const AgendamentoForm: React.FC<AgendamentoFormProps> = ({
    agendamentoId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Agendamento>>({
        data: '',
        hora: '',
        paciente_id: 0,
        profissional_id: 0,
        servico_id: 0,
        status: 'pendente',
        observacoes: ''
    });

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
        if (agendamentoId) {
            carregarAgendamento();
        }
    }, [agendamentoId]);

    const carregarDados = async () => {
        try {
            const [pacientesRes, profissionaisRes, servicosRes] = await Promise.all([
                pacientesApi.listar(),
                profissionaisApi.listar(),
                servicosApi.listar()
            ]);
            setPacientes(pacientesRes.data);
            setProfissionais(profissionaisRes.data);
            setServicos(servicosRes.data);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        }
    };

    const carregarAgendamento = async () => {
        try {
            setLoading(true);
            const response = await agendamentosApi.obter(agendamentoId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do agendamento');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (agendamentoId) {
                await agendamentosApi.atualizar(agendamentoId, formData);
            } else {
                await agendamentosApi.criar(formData as Omit<Agendamento, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar agendamento');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Paciente</label>
                <select
                    name="paciente_id"
                    value={formData.paciente_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione um paciente</option>
                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Profissional</label>
                <select
                    name="profissional_id"
                    value={formData.profissional_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione um profissional</option>
                    {profissionais.map((profissional) => (
                        <option key={profissional.id} value={profissional.id}>
                            {profissional.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                    name="servico_id"
                    value={formData.servico_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Selecione um serviço</option>
                    {servicos.map((servico) => (
                        <option key={servico.id} value={servico.id}>
                            {servico.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="pendente">Pendente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    rows={3}
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
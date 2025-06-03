import React, { useState, useEffect } from 'react';
import { usuariosApi } from '../../lib/api';
import type { Usuario } from '../../types/database';

interface UsuarioFormProps {
    usuarioId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({
    usuarioId,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<Partial<Usuario>>({
        nome: '',
        email: '',
        senha: '',
        tipo: 'paciente'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (usuarioId) {
            carregarUsuario();
        }
    }, [usuarioId]);

    const carregarUsuario = async () => {
        try {
            setLoading(true);
            const response = await usuariosApi.obter(usuarioId!);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar dados do usuário');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (usuarioId) {
                await usuariosApi.atualizar(usuarioId, formData);
            } else {
                await usuariosApi.criar(formData as Omit<Usuario, 'id'>);
            }
            onSuccess?.();
        } catch (err) {
            setError('Erro ao salvar usuário');
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
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required={!usuarioId}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="admin">Administrador</option>
                    <option value="medico">Médico</option>
                    <option value="paciente">Paciente</option>
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
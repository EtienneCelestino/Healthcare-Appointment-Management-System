import axios from 'axios';
import type {
    Usuario,
    Provincia,
    Municipio,
    CentroSaude,
    Servico,
    Profissional,
    Paciente,
    Agendamento
} from '../types/database';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Usuários
export const usuariosApi = {
    listar: () => api.get<Usuario[]>('/usuarios'),
    obter: (id: number) => api.get<Usuario>(`/usuarios/${id}`),
    criar: (usuario: Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao'>) => 
        api.post<Usuario>('/usuarios', usuario),
    atualizar: (id: number, usuario: Partial<Usuario>) => 
        api.put<Usuario>(`/usuarios/${id}`, usuario),
    excluir: (id: number) => api.delete(`/usuarios/${id}`)
};

// Províncias
export const provinciasApi = {
    listar: () => api.get<Provincia[]>('/provincias'),
    obter: (id: number) => api.get<Provincia>(`/provincias/${id}`),
    criar: (provincia: Omit<Provincia, 'id'>) => 
        api.post<Provincia>('/provincias', provincia),
    atualizar: (id: number, provincia: Partial<Provincia>) => 
        api.put<Provincia>(`/provincias/${id}`, provincia),
    excluir: (id: number) => api.delete(`/provincias/${id}`)
};

// Municípios
export const municipiosApi = {
    listar: () => api.get<Municipio[]>('/municipios'),
    obter: (id: number) => api.get<Municipio>(`/municipios/${id}`),
    criar: (municipio: Omit<Municipio, 'id'>) => 
        api.post<Municipio>('/municipios', municipio),
    atualizar: (id: number, municipio: Partial<Municipio>) => 
        api.put<Municipio>(`/municipios/${id}`, municipio),
    excluir: (id: number) => api.delete(`/municipios/${id}`)
};

// Centros de Saúde
export const centrosSaudeApi = {
    listar: () => api.get<CentroSaude[]>('/centros-saude'),
    obter: (id: number) => api.get<CentroSaude>(`/centros-saude/${id}`),
    criar: (centro: Omit<CentroSaude, 'id'>) => 
        api.post<CentroSaude>('/centros-saude', centro),
    atualizar: (id: number, centro: Partial<CentroSaude>) => 
        api.put<CentroSaude>(`/centros-saude/${id}`, centro),
    excluir: (id: number) => api.delete(`/centros-saude/${id}`)
};

// Serviços
export const servicosApi = {
    listar: () => api.get<Servico[]>('/servicos'),
    obter: (id: number) => api.get<Servico>(`/servicos/${id}`),
    criar: (servico: Omit<Servico, 'id'>) => 
        api.post<Servico>('/servicos', servico),
    atualizar: (id: number, servico: Partial<Servico>) => 
        api.put<Servico>(`/servicos/${id}`, servico),
    excluir: (id: number) => api.delete(`/servicos/${id}`)
};

// Profissionais
export const profissionaisApi = {
    listar: () => api.get<Profissional[]>('/profissionais'),
    obter: (id: number) => api.get<Profissional>(`/profissionais/${id}`),
    criar: (profissional: Omit<Profissional, 'id'>) => 
        api.post<Profissional>('/profissionais', profissional),
    atualizar: (id: number, profissional: Partial<Profissional>) => 
        api.put<Profissional>(`/profissionais/${id}`, profissional),
    excluir: (id: number) => api.delete(`/profissionais/${id}`)
};

// Pacientes
export const pacientesApi = {
    listar: () => api.get<Paciente[]>('/pacientes'),
    obter: (id: number) => api.get<Paciente>(`/pacientes/${id}`),
    criar: (paciente: Omit<Paciente, 'id'>) => 
        api.post<Paciente>('/pacientes', paciente),
    atualizar: (id: number, paciente: Partial<Paciente>) => 
        api.put<Paciente>(`/pacientes/${id}`, paciente),
    excluir: (id: number) => api.delete(`/pacientes/${id}`)
};

// Agendamentos
export const agendamentosApi = {
    listar: () => api.get<Agendamento[]>('/agendamentos'),
    obter: (id: number) => api.get<Agendamento>(`/agendamentos/${id}`),
    criar: (agendamento: Omit<Agendamento, 'id'>) => 
        api.post<Agendamento>('/agendamentos', agendamento),
    atualizar: (id: number, agendamento: Partial<Agendamento>) => 
        api.put<Agendamento>(`/agendamentos/${id}`, agendamento),
    excluir: (id: number) => api.delete(`/agendamentos/${id}`)
}; 
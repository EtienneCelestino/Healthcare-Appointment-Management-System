export type TipoUsuario = 'Administrador' | 'Visitante' | 'Profissional';
export type Genero = 'Masculino' | 'Feminino' | 'Outro';
export type StatusAgendamento = 'pendente' | 'confirmado' | 'cancelado';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    tipo_usuario: TipoUsuario;
    data_criacao: Date;
    data_atualizacao: Date;
}

export interface Provincia {
    id: number;
    nome: string;
}

export interface Municipio {
    id: number;
    nome: string;
    provincia_id: number;
    provincia?: Provincia;
}

export interface CentroSaude {
    id: number;
    nome: string;
    endereco: string;
    municipio_id: number;
    telefone?: string;
    email?: string;
    site_web?: string;
    capacidade?: string;
    tipo: string;
}

export interface Servico {
    id: number;
    nome_servico: string;
    descricao: string;
}

export interface Profissional {
    id: number;
    nome: string;
    especialidade: string;
    contato?: string;
    centro_id: number;
}

export interface Paciente {
    id: number;
    nome: string;
    data_nascimento: Date;
    genero: Genero;
    telefone?: string;
    email: string;
    endereco?: string;
    municipio_id: number;
}

export interface Agendamento {
    id: number;
    paciente_id: number;
    profissional_id: number;
    centro_id: number;
    data_hora: Date;
    status: StatusAgendamento;
} 
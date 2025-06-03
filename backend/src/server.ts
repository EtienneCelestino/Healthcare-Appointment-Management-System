import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Importando rotas
import authRoutes from './routes/auth.routes';
import provinciaRoutes from './routes/provincia.routes';
import municipioRoutes from './routes/municipio.routes';
import centroSaudeRoutes from './routes/centroSaude.routes';
import servicoRoutes from './routes/servico.routes';
import profissionalRoutes from './routes/profissional.routes';
import pacienteRoutes from './routes/paciente.routes';
import agendamentoRoutes from './routes/agendamento.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/provincias', provinciaRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/centros', centroSaudeRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
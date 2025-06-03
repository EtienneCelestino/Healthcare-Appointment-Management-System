import React from 'react';
import { Calendar, Clock, UserCog, Home, FileText } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Define sidebar items for patient
const patientSidebarItems = [
  {
    title: 'Dashboard',
    path: '/patient/dashboard',
    icon: <Home size={20} />
  },
  {
    title: 'Agendar Consulta',
    path: '/patient/schedule',
    icon: <Calendar size={20} />
  },
  {
    title: 'Minhas Consultas',
    path: '/patient/appointments',
    icon: <Clock size={20} />
  },
  {
    title: 'Histórico Médico',
    path: '/patient/history',
    icon: <FileText size={20} />
  },
  {
    title: 'Perfil',
    path: '/patient/profile',
    icon: <UserCog size={20} />
  }
];

// Mock data for medical history
const mockMedicalHistory = [
  {
    id: '1',
    date: '2024-03-15',
    doctor: 'Dr. João Silva',
    specialty: 'Clínico Geral',
    diagnosis: 'Hipertensão Arterial',
    prescription: 'Losartana 50mg - 1 comprimido ao dia',
    notes: 'Paciente apresentou pressão arterial elevada. Recomendado controle alimentar e exercícios físicos.'
  },
  {
    id: '2',
    date: '2024-02-28',
    doctor: 'Dra. Maria Santos',
    specialty: 'Cardiologista',
    diagnosis: 'Arritmia Cardíaca',
    prescription: 'Propranolol 40mg - 1 comprimido 2x ao dia',
    notes: 'Eletrocardiograma apresentou alterações. Agendado retorno em 3 meses.'
  },
  {
    id: '3',
    date: '2024-01-10',
    doctor: 'Dr. Pedro Oliveira',
    specialty: 'Dermatologista',
    diagnosis: 'Dermatite Atópica',
    prescription: 'Hidratante específico e pomada de corticoide',
    notes: 'Paciente com histórico de alergias. Recomendado evitar produtos com fragrância.'
  }
];

const PatientHistory: React.FC = () => {
  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Portal do Paciente"
      logo={<FileText size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Histórico Médico</h1>
          <p className="text-gray-500 mt-1">
            Acompanhe seu histórico de consultas e tratamentos
          </p>
        </div>

        {/* Histórico de Consultas */}
        <div className="space-y-4">
          {mockMedicalHistory.map(record => (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {record.doctor} - {record.specialty}
                  </CardTitle>
                  <span className="text-sm text-gray-500">
                    {format(new Date(record.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnóstico</h4>
                  <p className="text-gray-600">{record.diagnosis}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Prescrição</h4>
                  <p className="text-gray-600">{record.prescription}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Observações</h4>
                  <p className="text-gray-600">{record.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Alergias</h4>
              <p className="text-gray-600">Penicilina, Dipirona</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Medicações em Uso</h4>
              <p className="text-gray-600">Losartana 50mg, Propranolol 40mg</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Doenças Crônicas</h4>
              <p className="text-gray-600">Hipertensão Arterial</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Cirurgias</h4>
              <p className="text-gray-600">Apendicectomia (2018)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default PatientHistory; 
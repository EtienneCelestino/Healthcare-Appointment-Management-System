import React from 'react';
import { Calendar, Clock, UserCog, Home } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';

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
    icon: <Clock size={20} />
  },
  {
    title: 'Perfil',
    path: '/patient/profile',
    icon: <UserCog size={20} />
  }
];

const PatientSchedule: React.FC = () => {
  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Portal do Paciente"
      logo={<Calendar size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendar Consulta</h1>
          <p className="text-gray-500 mt-1">
            Escolha o médico e horário para sua consulta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filtros */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Especialidade
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinico">Clínico Geral</SelectItem>
                    <SelectItem value="cardiologista">Cardiologista</SelectItem>
                    <SelectItem value="dermatologista">Dermatologista</SelectItem>
                    <SelectItem value="pediatra">Pediatra</SelectItem>
                    <SelectItem value="oftalmologista">Oftalmologista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Data
                </label>
                <Input type="date" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Centro Médico
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um centro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro1">Centro Médico Central</SelectItem>
                    <SelectItem value="centro2">Clínica Saúde Total</SelectItem>
                    <SelectItem value="centro3">Hospital Municipal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Aplicar Filtros</Button>
            </CardContent>
          </Card>

          {/* Lista de Médicos */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://i.pravatar.cc/150?u=doctor1"
                    alt="Dr. João Silva"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Dr. João Silva</h3>
                    <p className="text-gray-600">Clínico Geral</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Centro Médico Central
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>Segunda a Sexta, 8h às 18h</span>
                    </div>
                  </div>
                  <Button>Agendar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://i.pravatar.cc/150?u=doctor2"
                    alt="Dra. Maria Santos"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Dra. Maria Santos</h3>
                    <p className="text-gray-600">Cardiologista</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Clínica Saúde Total
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>Terça a Sábado, 9h às 17h</span>
                    </div>
                  </div>
                  <Button>Agendar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://i.pravatar.cc/150?u=doctor3"
                    alt="Dr. Pedro Oliveira"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Dr. Pedro Oliveira</h3>
                    <p className="text-gray-600">Dermatologista</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Hospital Municipal
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>Segunda a Sexta, 10h às 19h</span>
                    </div>
                  </div>
                  <Button>Agendar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PatientSchedule; 
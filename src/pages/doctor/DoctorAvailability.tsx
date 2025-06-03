import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Switch } from '../../components/ui/Switch';
import { TimePicker } from '../../components/ui/TimePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Home, Clock, Calendar, FileText, UserCog, Activity } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';

// Define sidebar items for doctor
const doctorSidebarItems = [
  {
    title: 'Dashboard',
    path: '/doctor/dashboard',
    icon: <Home size={20} />
  },
  {
    title: 'Consultas',
    path: '/doctor/appointments',
    icon: <Clock size={20} />
  },
  {
    title: 'Disponibilidade',
    path: '/doctor/availability',
    icon: <Calendar size={20} />
  },
  {
    title: 'Histórico',
    path: '/doctor/history',
    icon: <FileText size={20} />
  },
  {
    title: 'Perfil',
    path: '/doctor/profile',
    icon: <UserCog size={20} />
  }
];

const DoctorAvailability = () => {
  return (
    <SidebarLayout 
      items={doctorSidebarItems} 
      title="Portal do Médico"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disponibilidade</h1>
          <p className="text-gray-500 mt-1">
            Configure seus horários de atendimento
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Horários de Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Segunda-feira */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Segunda-feira</Label>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário Inicial</Label>
                    <TimePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário Final</Label>
                    <TimePicker />
                  </div>
                </div>
              </div>

              {/* Terça-feira */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Terça-feira</Label>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário Inicial</Label>
                    <TimePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário Final</Label>
                    <TimePicker />
                  </div>
                </div>
              </div>

              {/* Quarta-feira */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Quarta-feira</Label>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário Inicial</Label>
                    <TimePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário Final</Label>
                    <TimePicker />
                  </div>
                </div>
              </div>

              {/* Quinta-feira */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Quinta-feira</Label>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário Inicial</Label>
                    <TimePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário Final</Label>
                    <TimePicker />
                  </div>
                </div>
              </div>

              {/* Sexta-feira */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Sexta-feira</Label>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário Inicial</Label>
                    <TimePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário Final</Label>
                    <TimePicker />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Duração da Consulta</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Salvar Horários</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default DoctorAvailability; 
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
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

const DoctorHistory = () => {
  return (
    <SidebarLayout 
      items={doctorSidebarItems} 
      title="Portal do Médico"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Histórico de Consultas</h1>
          <p className="text-gray-500 mt-1">
            Acompanhe o histórico de suas consultas
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input placeholder="Pesquisar paciente..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                  <SelectItem value="all">Todo período</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>15/03/2024</TableCell>
                  <TableCell>Maria Oliveira</TableCell>
                  <TableCell>Dor de cabeça</TableCell>
                  <TableCell>Enxaqueca</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Concluída
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>14/03/2024</TableCell>
                  <TableCell>João Pereira</TableCell>
                  <TableCell>Febre</TableCell>
                  <TableCell>Gripe</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Concluída
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default DoctorHistory; 
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Search, Download, Home, Building2, UserCog, Users, Calendar, Settings, Activity } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';

// Define sidebar items for admin
const adminSidebarItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <Home size={20} />
  },
  {
    title: 'Centros de Saúde',
    path: '/admin/centers',
    icon: <Building2 size={20} />
  },
  {
    title: 'Médicos',
    path: '/admin/doctors',
    icon: <UserCog size={20} />
  },
  {
    title: 'Pacientes',
    path: '/admin/patients',
    icon: <Users size={20} />
  },
  {
    title: 'Consultas',
    path: '/admin/appointments',
    icon: <Calendar size={20} />
  },
  {
    title: 'Configurações',
    path: '/admin/settings',
    icon: <Settings size={20} />
  }
];

const AdminAppointments = () => {
  return (
    <SidebarLayout 
      items={adminSidebarItems} 
      title="Portal do Administrador"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Consultas</h1>
          <p className="text-gray-500 mt-1">
            Gerencie todas as consultas do sistema
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Consultas</CardTitle>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar consulta..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Centro</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>João Silva</TableCell>
                  <TableCell>Dra. Maria Santos</TableCell>
                  <TableCell>Centro Médico Central</TableCell>
                  <TableCell>15/03/2024 14:30</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Pendente
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                      <Button variant="destructive" size="sm">Cancelar</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maria Oliveira</TableCell>
                  <TableCell>Dr. Pedro Costa</TableCell>
                  <TableCell>Clínica Saúde Total</TableCell>
                  <TableCell>15/03/2024 15:00</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Confirmada
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                      <Button variant="destructive" size="sm">Cancelar</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pedro Santos</TableCell>
                  <TableCell>Dra. Ana Lima</TableCell>
                  <TableCell>Hospital Municipal</TableCell>
                  <TableCell>15/03/2024 16:00</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Concluída
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </div>
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

export default AdminAppointments; 
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Calendar } from '../../components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Home, Clock, Calendar as CalendarIcon2, FileText, UserCog, Activity } from 'lucide-react';
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
    icon: <CalendarIcon2 size={20} />
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

const DoctorAppointments = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <SidebarLayout 
      items={doctorSidebarItems} 
      title="Portal do Médico"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Consultas</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas consultas e agenda
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultas do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>09:00</TableCell>
                    <TableCell>Maria Oliveira</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Confirmada
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10:30</TableCell>
                    <TableCell>João Pereira</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pendente
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Aceitar</Button>
                        <Button variant="destructive" size="sm">Recusar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default DoctorAppointments; 
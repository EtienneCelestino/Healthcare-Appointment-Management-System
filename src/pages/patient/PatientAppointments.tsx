import React from 'react';
import { Calendar, Clock, UserCog, Home, Clock as ClockIcon } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockAppointments } from '../../data/mockData';
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
    icon: <Clock size={20} />
  },
  {
    title: 'Perfil',
    path: '/patient/profile',
    icon: <UserCog size={20} />
  }
];

const PatientAppointments: React.FC = () => {
  // Filter appointments for this patient
  const patientAppointments = mockAppointments.filter(
    appointment => appointment.patientId === '1'
  );

  // Group appointments by status
  const upcomingAppointments = patientAppointments.filter(
    appointment => appointment.status === 'confirmed' || appointment.status === 'pending'
  ).sort((a, b) => a.date.localeCompare(b.date));

  const pastAppointments = patientAppointments.filter(
    appointment => appointment.status === 'completed' || appointment.status === 'cancelled'
  ).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Portal do Paciente"
      logo={<Calendar size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Consultas</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas consultas agendadas e histórico
          </p>
        </div>

        {/* Próximas Consultas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClockIcon size={18} className="mr-2 text-sky-500" />
              Próximas Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          Dr. João Silva
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(appointment.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-500">
                        Horário: {appointment.time}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Motivo: {appointment.reason}
                      </p>
                    </div>
                    <div className="ml-4 space-x-2">
                      {appointment.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Cancelar
                        </Button>
                      )}
                      <Button size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Nenhuma consulta agendada
              </div>
            )}
          </CardContent>
        </Card>

        {/* Histórico de Consultas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClockIcon size={18} className="mr-2 text-sky-500" />
              Histórico de Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastAppointments.length > 0 ? (
              <div className="space-y-4">
                {pastAppointments.map(appointment => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          Dr. João Silva
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status === 'completed' ? 'Realizada' : 'Cancelada'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(appointment.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-500">
                        Horário: {appointment.time}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Motivo: {appointment.reason}
                      </p>
                    </div>
                    <div className="ml-4">
                      <Button size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Nenhuma consulta no histórico
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default PatientAppointments; 
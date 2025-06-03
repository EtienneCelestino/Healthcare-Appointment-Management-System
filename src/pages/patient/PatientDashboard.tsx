import React from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  UserCog,
  Home,
  ClipboardList,
  Activity
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import StatsCard from '../../components/dashboard/StatsCard';
import { mockAppointments } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

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

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Filter appointments for this patient
  const patientAppointments = mockAppointments.filter(
    appointment => appointment.patientId === '1'
  );
  
  // Get today's appointments
  const todayAppointments = patientAppointments.filter(
    appointment => appointment.date === today
  );
  
  // Get upcoming appointments (excluding today)
  const upcomingAppointments = patientAppointments.filter(
    appointment => appointment.date > today && appointment.status !== 'cancelled'
  ).sort((a, b) => a.date.localeCompare(b.date));
  
  // Get past appointments
  const pastAppointments = patientAppointments.filter(
    appointment => appointment.date < today
  );

  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Portal do Paciente"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {user?.name}</h1>
          <p className="text-gray-500 mt-1">
            {format(new Date(), 'EEEE, d MMMM yyyy')}
          </p>
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatsCard 
            title="Consultas Hoje" 
            value={todayAppointments.length} 
            icon={<Calendar size={24} />} 
          />
          <StatsCard 
            title="Próximas Consultas" 
            value={upcomingAppointments.length} 
            icon={<Clock size={24} />} 
          />
          <StatsCard 
            title="Consultas Anteriores" 
            value={pastAppointments.length} 
            icon={<ClipboardList size={24} />}
          />
        </div>
        
        {/* Next Appointment Card */}
        <Card className="bg-gradient-to-r from-sky-500 to-sky-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Próxima Consulta</CardTitle>
          </CardHeader>
          
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>
                      {format(new Date(upcomingAppointments[0].date), 'EEEE, d MMMM')} às {upcomingAppointments[0].time}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-sky-700 rounded-full text-sm">
                    {upcomingAppointments[0].status}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm opacity-80 mb-1">Médico</h4>
                  <p className="font-medium">Dr. João Silva</p>
                </div>
                
                <div>
                  <h4 className="text-sm opacity-80 mb-1">Motivo</h4>
                  <p>{upcomingAppointments[0].reason}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar size={40} className="mx-auto mb-3 opacity-80" />
                <h3 className="text-xl font-medium">Nenhuma consulta agendada</h3>
                <p className="mt-1 opacity-80">Agende sua próxima consulta!</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2 text-sky-500" />
              Agenda de Hoje
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map(appointment => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="mr-3 text-lg font-medium text-gray-800">
                      {appointment.time}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">Dr. João Silva</h4>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                    
                    <div className={`ml-4 px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status === 'confirmed' 
                        ? 'Confirmada'
                        : appointment.status === 'pending'
                        ? 'Pendente'
                        : 'Cancelada'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Nenhuma consulta agendada para hoje
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default PatientDashboard; 
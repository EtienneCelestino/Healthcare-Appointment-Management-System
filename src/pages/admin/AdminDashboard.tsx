import React from 'react';
import { 
  Building2, 
  Users, 
  UserCog, 
  Calendar, 
  Home, 
  Activity,
  Settings
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import StatsCard from '../../components/dashboard/StatsCard';
import AppointmentChart from '../../components/dashboard/AppointmentChart';
import ServiceChart from '../../components/dashboard/ServiceChart';
import { 
  mockStatistics, 
  mockAppointmentAnalytics, 
  mockServiceAnalytics,
  mockDoctors,
  mockAppointments,
  mockCenters
} from '../../data/mockData';

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

const AdminDashboard: React.FC = () => {
  // Get recent doctors (last 3 who registered)
  const recentDoctors = [...mockDoctors]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 3);
  
  // Get recently cancelled appointments (last 3)
  const cancelledAppointments = mockAppointments
    .filter(appointment => appointment.status === 'cancelled')
    .slice(0, 3);
  
  // Get centers with low activity (less than 2 appointments)
  const centersWithLowActivity = mockCenters
    .filter(center => {
      const centerAppointments = mockAppointments.filter(
        appointment => appointment.centerId === center.id
      );
      return centerAppointments.length < 2;
    })
    .slice(0, 3);

  return (
    <SidebarLayout 
      items={adminSidebarItems} 
      title="Admin Portal"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor your healthcare system's performance</p>
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard 
            title="Health Centers" 
            value={mockStatistics.totalCenters} 
            icon={<Building2 size={24} />} 
            change={8}
            trend="up"
          />
          <StatsCard 
            title="Active Doctors" 
            value={mockStatistics.totalDoctors} 
            icon={<UserCog size={24} />} 
            change={12}
            trend="up"
          />
          <StatsCard 
            title="Registered Patients" 
            value={mockStatistics.totalPatients} 
            icon={<Users size={24} />} 
            change={15}
            trend="up"
          />
          <StatsCard 
            title="Total Appointments" 
            value={mockStatistics.totalAppointments} 
            icon={<Calendar size={24} />}
            description={`${mockStatistics.appointmentsToday} today, ${mockStatistics.appointmentsThisWeek} this week`}
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AppointmentChart 
            data={mockAppointmentAnalytics} 
            title="Appointment Trends (Monthly)"
          />
          <ServiceChart 
            data={mockServiceAnalytics} 
            title="Most Popular Services"
          />
        </div>
        
        {/* Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Doctors Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <UserCog size={18} className="mr-2 text-sky-500" />
                Recent Doctor Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDoctors.map(doctor => (
                  <div key={doctor.id} className="flex items-center space-x-3">
                    <img 
                      src={doctor.profileImage} 
                      alt={doctor.name} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                    <div className={`ml-auto text-xs px-2 py-1 rounded-full ${doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {doctor.isActive ? 'Active' : 'Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Cancelled Appointments Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar size={18} className="mr-2 text-sky-500" />
                Recently Cancelled Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cancelledAppointments.map(appointment => (
                  <div key={appointment.id} className="space-y-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">
                        {appointment.reason}
                      </p>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Cancelled
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                    {appointment.notes && (
                      <p className="text-xs text-gray-500 italic">
                        Note: {appointment.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Low Activity Centers Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building2 size={18} className="mr-2 text-sky-500" />
                Centers with Low Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centersWithLowActivity.map(center => (
                  <div key={center.id} className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md bg-sky-100 flex items-center justify-center text-sky-500">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{center.name}</p>
                      <p className="text-sm text-gray-500">{center.city}</p>
                    </div>
                    <div className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                      Low Activity
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminDashboard;
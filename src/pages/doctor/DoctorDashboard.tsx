import React from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  UserCog,
  Home,
  ClipboardList,
  CheckCircle,
  XCircle,
  ChevronRight,
  Activity
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';
import { mockAppointments, getDoctorById } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

// Define sidebar items for doctor
const doctorSidebarItems = [
  {
    title: 'Dashboard',
    path: '/doctor/dashboard',
    icon: <Home size={20} />
  },
  {
    title: 'Appointments',
    path: '/doctor/appointments',
    icon: <Calendar size={20} />
  },
  {
    title: 'Availability',
    path: '/doctor/availability',
    icon: <Clock size={20} />
  },
  {
    title: 'Patient History',
    path: '/doctor/history',
    icon: <FileText size={20} />
  },
  {
    title: 'Profile',
    path: '/doctor/profile',
    icon: <UserCog size={20} />
  }
];

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // In a real app, you would fetch the doctor's data based on the user ID
  // For now, we're using the mock data
  const doctor = getDoctorById('1'); // Mock doctor data
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Filter appointments for this doctor
  const doctorAppointments = mockAppointments.filter(
    appointment => appointment.doctorId === '1'
  );
  
  // Get today's appointments
  const todayAppointments = doctorAppointments.filter(
    appointment => appointment.date === today
  );
  
  // Get upcoming appointments (excluding today)
  const upcomingAppointments = doctorAppointments.filter(
    appointment => appointment.date > today && appointment.status !== 'cancelled'
  ).sort((a, b) => a.date.localeCompare(b.date));
  
  // Get pending appointments
  const pendingAppointments = doctorAppointments.filter(
    appointment => appointment.status === 'pending'
  );
  
  // Get next appointment
  const nextAppointment = [...todayAppointments, ...upcomingAppointments]
    .filter(appointment => appointment.status === 'confirmed')
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    })[0];

  return (
    <SidebarLayout 
      items={doctorSidebarItems} 
      title="Doctor Portal"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Dr. {user?.name.split(' ')[1]}</h1>
          <p className="text-gray-500 mt-1">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatsCard 
            title="Today's Appointments" 
            value={todayAppointments.length} 
            icon={<Calendar size={24} />} 
          />
          <StatsCard 
            title="Pending Requests" 
            value={pendingAppointments.length} 
            icon={<ClipboardList size={24} />} 
          />
          <StatsCard 
            title="Upcoming Appointments" 
            value={upcomingAppointments.length} 
            icon={<Clock size={24} />}
          />
        </div>
        
        {/* Next Appointment Card */}
        <Card className="bg-gradient-to-r from-sky-500 to-sky-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Next Appointment</CardTitle>
          </CardHeader>
          
          <CardContent>
            {nextAppointment ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>
                      {format(new Date(nextAppointment.date), 'EEEE, MMMM d')} at {nextAppointment.time}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-sky-700 rounded-full text-sm">
                    {nextAppointment.status}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm opacity-80 mb-1">Patient Name</h4>
                  <p className="font-medium">John Doe</p>
                </div>
                
                <div>
                  <h4 className="text-sm opacity-80 mb-1">Reason</h4>
                  <p>{nextAppointment.reason}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar size={40} className="mx-auto mb-3 opacity-80" />
                <h3 className="text-xl font-medium">No upcoming appointments</h3>
                <p className="mt-1 opacity-80">You're all caught up for now!</p>
              </div>
            )}
          </CardContent>
          
          {nextAppointment && (
            <CardFooter className="border-t border-sky-400 bg-sky-600">
              <Button 
                variant="outline" 
                className="w-full border-white text-white hover:bg-sky-700"
              >
                View Details
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2 text-sky-500" />
              Today's Schedule
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
                      <h4 className="font-medium text-gray-800">John Doe</h4>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                      <button className="ml-3 text-gray-400 hover:text-gray-700">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock size={40} className="mx-auto mb-3 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-700">No appointments today</h3>
                <p className="text-gray-500 mt-1">Enjoy your day off!</p>
              </div>
            )}
          </CardContent>
          
          {todayAppointments.length > 0 && (
            <CardFooter className="border-t">
              <Button 
                variant="outline" 
                fullWidth
                rightIcon={<ChevronRight size={16} />}
              >
                View All Appointments
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Pending Approvals */}
        {pendingAppointments.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ClipboardList size={18} className="mr-2 text-sky-500" />
                Pending Appointment Requests
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {pendingAppointments.slice(0, 3).map(appointment => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        JD
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-800">John Doe</h4>
                        <p className="text-sm text-gray-500">
                          {format(new Date(appointment.date), 'MMM d')} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{appointment.reason}</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          leftIcon={<XCircle size={16} />}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                        <Button 
                          size="sm" 
                          variant="primary" 
                          leftIcon={<CheckCircle size={16} />}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            {pendingAppointments.length > 3 && (
              <CardFooter className="border-t">
                <Button 
                  variant="outline" 
                  fullWidth
                  rightIcon={<ChevronRight size={16} />}
                >
                  View All Requests ({pendingAppointments.length})
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
      </div>
    </SidebarLayout>
  );
};

export default DoctorDashboard;
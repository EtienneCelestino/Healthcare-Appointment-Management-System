import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  ClipboardList, 
  FileText, 
  User,
  MapPin,
  Phone,
  Mail,
  Building2,
  UserCheck,
  ChevronLeft,
  Activity,
  Clock,
  Star
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { 
  getCenterById, 
  getDoctorsByCenterId,
  getAppointmentsByCenterId
} from '../../data/mockData';

// Define sidebar items for patient
const patientSidebarItems = [
  {
    title: 'Home',
    path: '/patient/home',
    icon: <Home size={20} />
  },
  {
    title: 'My Bookings',
    path: '/patient/bookings',
    icon: <Calendar size={20} />
  },
  {
    title: 'Appointment History',
    path: '/patient/history',
    icon: <ClipboardList size={20} />
  },
  {
    title: 'Medical Records',
    path: '/patient/history',
    icon: <FileText size={20} />
  },
  {
    title: 'Profile',
    path: '/patient/profile',
    icon: <User size={20} />
  }
];

const PatientCenter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  
  // Get center details
  const center = getCenterById(id || '');
  
  // Get doctors for this center
  const doctors = getDoctorsByCenterId(id || '');
  
  // Get appointments for this center
  const appointments = getAppointmentsByCenterId(id || '');
  
  // If center not found, show error
  if (!center) {
    return (
      <SidebarLayout 
        items={patientSidebarItems} 
        title="Patient Portal"
        logo={<Activity size={24} className="text-sky-500" />}
      >
        <div className="text-center py-12">
          <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-700">Healthcare Center Not Found</h2>
          <p className="text-gray-500 mt-2 mb-6">The center you're looking for doesn't exist or has been removed.</p>
          <Link to="/patient/home">
            <Button variant="primary" leftIcon={<ChevronLeft size={16} />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Patient Portal"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <div>
          <Link to="/patient/home">
            <Button 
              variant="ghost" 
              leftIcon={<ChevronLeft size={16} />}
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Center Header */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="h-48 overflow-hidden">
            <img 
              src={center.image} 
              alt={center.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{center.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Location</h3>
                  <p className="text-gray-600">{center.address}, {center.city}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={20} className="mr-2 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Phone</h3>
                  <p className="text-gray-600">{center.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={20} className="mr-2 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Email</h3>
                  <p className="text-gray-600">{center.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {center.services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 bg-sky-50 rounded-lg border border-sky-100"
                >
                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mr-3">
                    <Activity size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Doctors Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Doctors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map(doctor => (
              <Card 
                key={doctor.id} 
                className={`transition-shadow hover:shadow-md cursor-pointer ${
                  selectedDoctorId === doctor.id ? 'ring-2 ring-sky-500' : ''
                }`}
                onClick={() => setSelectedDoctorId(doctor.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <img 
                      src={doctor.profileImage} 
                      alt={doctor.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-sky-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">Availability</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.availability.map(slot => {
                        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        return (
                          <span 
                            key={slot.id} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {days[slot.dayOfWeek]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Empty State */}
            {doctors.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <UserCheck size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No Doctors Available</h3>
                <p className="text-gray-500 mt-1">This center currently has no active doctors.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Book Appointment Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Ready to Book an Appointment?</h2>
          <p className="text-gray-600 mb-5">
            Select a doctor above and book your appointment now.
          </p>
          
          <Button 
            variant="primary" 
            size="lg"
            leftIcon={<Calendar size={18} />}
            disabled={!selectedDoctorId}
          >
            Book Appointment
          </Button>
          
          {!selectedDoctorId && (
            <p className="text-sm text-amber-600 mt-3">
              Please select a doctor to continue
            </p>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PatientCenter;
import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  UserCog, 
  Calendar, 
  Activity,
  Search,
  Mail,
  Phone,
  X,
  Plus,
  Edit,
  MapPin,
  Settings
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { mockPatients, mockAppointments } from '../../data/mockData';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';

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

const AdminPatients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  
  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.phone.toLowerCase().includes(searchLower)
    );
  });
  
  // Get appointments for a patient
  const getPatientAppointments = (patientId: string) => {
    return mockAppointments.filter(appointment => appointment.patientId === patientId);
  };
  
  // Handle view patient details
  const handleViewDetails = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  return (
    <SidebarLayout 
      items={adminSidebarItems} 
      title="Admin Portal"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pacientes</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar paciente..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Última Consulta</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map(patient => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{format(new Date(patient.dateOfBirth), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Ativo
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(patient)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          <X className="mr-2 h-4 w-4" />
                          Desativar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between sticky top-0 bg-white z-10">
              <CardTitle>Patient Details</CardTitle>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Fechar"
              >
                <X size={20} />
              </button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedPatient.profileImage} 
                  alt={selectedPatient.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedPatient.name}</h3>
                  <p className="text-gray-500 capitalize">{selectedPatient.gender}</p>
                  <p className="text-gray-500">
                    Born {format(new Date(selectedPatient.dateOfBirth), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin size={16} className="mr-2 mt-1 text-gray-400" />
                    <span>{selectedPatient.address}</span>
                  </div>
                </div>
              </div>
              
              {/* Medical History */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Medical History</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">{selectedPatient.medicalHistory}</p>
                </div>
              </div>
              
              {/* Appointments */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Appointments</h4>
                <div className="space-y-3">
                  {getPatientAppointments(selectedPatient.id)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="bg-gray-50 p-4 rounded-md"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              {format(new Date(appointment.date), 'MMMM d, yyyy')} at {appointment.time}
                            </p>
                            <p className="text-gray-600 mt-1">{appointment.reason}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : appointment.status === 'confirmed'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            Note: {appointment.notes}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminPatients;
import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  UserCog, 
  Calendar, 
  Activity,
  Search,
  Check,
  X,
  Plus,
  Phone,
  Mail,
  Edit,
  Settings
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { mockDoctors, mockCenters } from '../../data/mockData';
import { Doctor } from '../../types';
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

const AdminDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [centerFilter, setCenterFilter] = useState<string>('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Filter doctors based on search term and filters
  const filteredDoctors = mockDoctors.filter(doctor => {
    // Search filter
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && doctor.isActive) ||
      (statusFilter === 'pending' && !doctor.isActive);
    
    // Center filter
    const matchesCenter = 
      centerFilter === 'all' ||
      doctor.centerId === centerFilter;
    
    return matchesSearch && matchesStatus && matchesCenter;
  });
  
  // Handle view doctor
  const handleViewDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowViewModal(true);
  };
  
  // Get center name by ID
  const getCenterName = (centerId: string) => {
    const center = mockCenters.find(c => c.id === centerId);
    return center ? center.name : 'Unknown Center';
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
              <CardTitle>Médicos</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Médico
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar médico..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="cardiology">Cardiologia</SelectItem>
                  <SelectItem value="dermatology">Dermatologia</SelectItem>
                  <SelectItem value="neurology">Neurologia</SelectItem>
                  <SelectItem value="pediatrics">Pediatria</SelectItem>
                  <SelectItem value="psychiatry">Psiquiatria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>CRM</TableHead>
                  <TableHead>Centro</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map(doctor => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.crm}</TableCell>
                    <TableCell>{getCenterName(doctor.centerId)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {doctor.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDoctor(doctor)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        {!doctor.isActive && (
                          <Button variant="outline" size="sm">
                            <Check className="mr-2 h-4 w-4" />
                            Ativar
                          </Button>
                        )}
                        {doctor.isActive && (
                          <Button variant="destructive" size="sm">
                            <X className="mr-2 h-4 w-4" />
                            Desativar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* View Doctor Modal */}
      {showViewModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Doctor Details</CardTitle>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
                <div className="sm:mr-8">
                  <img 
                    src={selectedDoctor.profileImage} 
                    alt={selectedDoctor.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{selectedDoctor.name}</h3>
                  <p className="text-gray-600">{selectedDoctor.specialty}</p>
                  <div className={`inline-block px-3 py-1 text-sm rounded-full ${
                    selectedDoctor.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedDoctor.isActive ? 'Active' : 'Pending Approval'}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <span>{selectedDoctor.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <span>{selectedDoctor.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Healthcare Center</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">{getCenterName(selectedDoctor.centerId)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">{selectedDoctor.bio}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Availability</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="space-y-1">
                    {selectedDoctor.availability.map(slot => {
                      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                      return (
                        <li key={slot.id} className="text-gray-700">
                          {days[slot.dayOfWeek]}: {slot.startTime} - {slot.endTime}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </CardContent>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              {!selectedDoctor.isActive && (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowViewModal(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Rejeitar Aplicação
                  </Button>
                  <Button 
                    variant="default" 
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar Médico
                  </Button>
                </>
              )}
              {selectedDoctor.isActive && (
                <Button onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminDoctors;
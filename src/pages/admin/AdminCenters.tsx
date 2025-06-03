import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  UserCog, 
  Calendar, 
  Activity,
  Search,
  Plus,
  Settings
} from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { mockCenters, getDoctorsByCenterId } from '../../data/mockData';
import { HealthcareCenter } from '../../types';
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
const AdminCenters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Filter centers based on search term
  const filteredCenters = mockCenters.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle edit center
  const handleEditCenter = (center: HealthcareCenter) => {
    setShowEditModal(true);
  };
  
  // Handle add new center
  const handleAddCenter = () => {
    setShowAddModal(true);
  };
  
  return (
    <SidebarLayout 
      items={adminSidebarItems} 
      title="Admin Portal"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Centers</h1>
            <p className="text-gray-500 mt-1">Manage medical centers and facilities</p>
          </div>
          
          <div className="flex space-x-3">
            <Input
              placeholder="Search centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-w-[250px]"
            />
            <Button 
              variant="default" 
              onClick={handleAddCenter}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Center
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 min-w-[250px]"
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
              <TableHead>Endereço</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Médicos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCenters.map(center => {
              const doctorsCount = getDoctorsByCenterId(center.id).length;
              
              return (
                <TableRow key={center.id}>
                  <TableCell>{center.name}</TableCell>
                  <TableCell>{center.address}, {center.city}</TableCell>
                  <TableCell>{center.phone}</TableCell>
                  <TableCell>{doctorsCount} {doctorsCount === 1 ? 'Doctor' : 'Doctors'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Ativo
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCenter(center)}>Editar</Button>
                      <Button variant="destructive" size="sm">Desativar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* Empty State */}
        {filteredCenters.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <Building2 size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No Centers Found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or add a new center</p>
            <Button 
              variant="default" 
              onClick={handleAddCenter}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Center
            </Button>
          </div>
        )}
      </div>
      
      {/* Add/Edit Modal would be implemented here */}
      {/* This is a placeholder for the actual implementation */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {showAddModal ? 'Add New Center' : 'Edit Center'}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">
                Form would be implemented here with fields for name, address, services, etc.
              </p>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
              >
                Cancel
              </Button>
              <Button>
                {showAddModal ? 'Add Center' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminCenters;
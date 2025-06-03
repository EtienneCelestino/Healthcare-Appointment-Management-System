import React from 'react';
import { 
  Home, 
  Building2, 
  UserCog, 
  Users, 
  Calendar, 
  Settings,
  Map,
  MapPin,
  Stethoscope,
  Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <Home size={20} />
    },
    {
      title: 'Usuários',
      path: '/admin/usuarios',
      icon: <Users size={20} />
    },
    {
      title: 'Províncias',
      path: '/admin/provincias',
      icon: <Map size={20} />
    },
    {
      title: 'Municípios',
      path: '/admin/municipios',
      icon: <MapPin size={20} />
    },
    {
      title: 'Centros de Saúde',
      path: '/admin/centers',
      icon: <Building2 size={20} />
    },
    {
      title: 'Serviços',
      path: '/admin/servicos',
      icon: <Stethoscope size={20} />
    },
    {
      title: 'Profissionais',
      path: '/admin/profissionais',
      icon: <UserCog size={20} />
    },
    {
      title: 'Pacientes',
      path: '/admin/pacientes',
      icon: <Users size={20} />
    },
    {
      title: 'Agendamentos',
      path: '/admin/agendamentos',
      icon: <Calendar size={20} />
    },
    {
      title: 'Configurações',
      path: '/admin/configuracoes',
      icon: <Settings size={20} />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Activity size={24} className="text-sky-500" />
            <span className="text-xl font-semibold">Sistema de Saúde</span>
          </div>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100 border-l-4 border-sky-500' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 
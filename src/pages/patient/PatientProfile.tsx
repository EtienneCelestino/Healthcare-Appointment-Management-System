import React from 'react';
import { Calendar, Clock, UserCog, Home, FileText } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';

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

const PatientProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <SidebarLayout 
      items={patientSidebarItems} 
      title="Portal do Paciente"
      logo={<UserCog size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profileImage || 'https://i.pravatar.cc/150?u=default'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Alterar Foto
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" defaultValue="(11) 99999-9999" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" defaultValue="123.456.789-00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" defaultValue="1990-01-01" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Input id="gender" defaultValue="Masculino" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rua Exemplo, 123 - Centro" />
              </div>

              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferências e Segurança */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notifications">Notificações</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sms-notifications"
                        className="rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Input id="language" defaultValue="Português" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    title="Digite sua senha atual"
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    title="Digite sua nova senha"
                    placeholder="Digite sua nova senha"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    title="Confirme sua nova senha"
                    placeholder="Confirme sua nova senha"
                  />
                </div>

                <Button className="w-full">Alterar Senha</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PatientProfile; 
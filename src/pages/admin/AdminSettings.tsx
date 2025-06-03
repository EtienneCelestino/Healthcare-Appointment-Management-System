import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Switch } from '../../components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { Textarea } from '../../components/ui/Textarea';
import SidebarLayout from '../../components/layout/SidebarLayout';
import { 
  Home, 
  Building2, 
  UserCog, 
  Users, 
  Calendar, 
  Settings,
  Activity
} from 'lucide-react';

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

const AdminSettings = () => {
  return (
    <SidebarLayout 
      items={adminSidebarItems} 
      title="Portal do Administrador"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-500 mt-1">
            Gerencie as configurações do sistema
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Nome da Plataforma</Label>
                    <Input id="platformName" defaultValue="Sistema de Agendamento" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <Input id="logo" type="file" accept="image/*" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">
                        Ative para realizar manutenção no sistema
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenanceMessage">Mensagem de Manutenção</Label>
                    <Textarea 
                      id="maintenanceMessage" 
                      placeholder="Digite a mensagem que será exibida durante a manutenção..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">E-mail para Notificações</Label>
                    <Input id="notificationEmail" type="email" defaultValue="admin@email.com" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Envie notificações por e-mail para usuários
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Envie notificações por SMS para usuários
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailTemplate">Template de E-mail</Label>
                    <Textarea 
                      id="emailTemplate" 
                      placeholder="Digite o template padrão para e-mails..."
                      className="h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="googleMapsKey">Chave da API do Google Maps</Label>
                    <Input id="googleMapsKey" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailService">Serviço de E-mail</Label>
                    <Input id="emailService" defaultValue="smtp.gmail.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailPort">Porta do Servidor de E-mail</Label>
                    <Input id="emailPort" type="number" defaultValue="587" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailUsername">Usuário do E-mail</Label>
                    <Input id="emailUsername" type="email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailPassword">Senha do E-mail</Label>
                    <Input id="emailPassword" type="password" />
                  </div>

                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default AdminSettings; 
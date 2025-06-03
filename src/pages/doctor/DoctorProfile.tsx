import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Home, Clock, Calendar, FileText, UserCog, Activity } from 'lucide-react';
import SidebarLayout from '../../components/layout/SidebarLayout';

// Define sidebar items for doctor
const doctorSidebarItems = [
  {
    title: 'Dashboard',
    path: '/doctor/dashboard',
    icon: <Home size={20} />
  },
  {
    title: 'Consultas',
    path: '/doctor/appointments',
    icon: <Clock size={20} />
  },
  {
    title: 'Disponibilidade',
    path: '/doctor/availability',
    icon: <Calendar size={20} />
  },
  {
    title: 'Histórico',
    path: '/doctor/history',
    icon: <FileText size={20} />
  },
  {
    title: 'Perfil',
    path: '/doctor/profile',
    icon: <UserCog size={20} />
  }
];

const DoctorProfile = () => {
  return (
    <SidebarLayout 
      items={doctorSidebarItems} 
      title="Portal do Médico"
      logo={<Activity size={24} className="text-sky-500" />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas informações pessoais e profissionais
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Digite seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="Digite seu telefone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiologia</SelectItem>
                    <SelectItem value="dermatology">Dermatologia</SelectItem>
                    <SelectItem value="neurology">Neurologia</SelectItem>
                    <SelectItem value="pediatrics">Pediatria</SelectItem>
                    <SelectItem value="psychiatry">Psiquiatria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                <Input id="crm" placeholder="Digite seu número de registro" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biografia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Sobre</Label>
                <Textarea
                  id="bio"
                  placeholder="Descreva sua experiência profissional e formação"
                  className="min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Formação</Label>
                <Textarea
                  id="education"
                  placeholder="Liste sua formação acadêmica"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experiência</Label>
                <Textarea
                  id="experience"
                  placeholder="Descreva sua experiência profissional"
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">Salvar Alterações</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default DoctorProfile; 
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';

const PatientHome = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Encontre o Melhor Cuidado para Sua Saúde</h1>
        <p className="text-lg text-gray-600 mb-8">
          Agende consultas com os melhores profissionais de saúde da sua região
        </p>
        <div className="relative">
          <Input
            placeholder="Pesquise por especialidade, médico ou centro de saúde..."
            className="w-full pl-12 pr-4 py-6 text-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Centros de Saúde</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Encontre os melhores centros de saúde próximos a você
            </p>
            <Button className="w-full">Ver Centros</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Consulte as diversas especialidades médicas disponíveis
            </p>
            <Button className="w-full">Ver Especialidades</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minhas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Acompanhe suas consultas agendadas e histórico
            </p>
            <Button className="w-full">Ver Consultas</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Centros em Destaque</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Centro Médico Central</h3>
              <p className="text-gray-600 mb-4">
                Rua Principal, 123 - Centro
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">4.8 ★</span>
                <Button variant="outline" size="sm">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Clínica Saúde Total</h3>
              <p className="text-gray-600 mb-4">
                Av. Saúde, 456 - Jardim
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">4.7 ★</span>
                <Button variant="outline" size="sm">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Hospital Municipal</h3>
              <p className="text-gray-600 mb-4">
                Rua Hospital, 789 - Centro
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">4.6 ★</span>
                <Button variant="outline" size="sm">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
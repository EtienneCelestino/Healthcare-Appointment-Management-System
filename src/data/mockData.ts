import { 
  HealthcareCenter, 
  Doctor, 
  Patient, 
  Appointment, 
  Service,
  Statistics,
  AppointmentAnalytics,
  ServiceAnalytics
} from '../types';

// Mock Healthcare Centers
export const mockCenters: HealthcareCenter[] = [
  {
    id: '1',
    name: 'City Medical Center',
    address: '123 Main Street',
    city: 'New York',
    phone: '(212) 555-1234',
    email: 'contact@citymedical.com',
    services: ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics'],
    image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Valley Health Clinic',
    address: '456 Park Avenue',
    city: 'Los Angeles',
    phone: '(310) 555-5678',
    email: 'info@valleyhealth.com',
    services: ['General Medicine', 'Neurology', 'Dermatology', 'Psychiatry'],
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Riverside Hospital',
    address: '789 River Road',
    city: 'Chicago',
    phone: '(773) 555-9012',
    email: 'support@riverside.com',
    services: ['Emergency Care', 'Surgery', 'Oncology', 'Obstetrics'],
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Metro Dental Clinic',
    address: '321 Broadway',
    city: 'San Francisco',
    phone: '(415) 555-3456',
    email: 'appointments@metrodental.com',
    services: ['General Dentistry', 'Orthodontics', 'Oral Surgery', 'Periodontics'],
    image: 'https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    name: 'Wellness Family Practice',
    address: '654 Oak Street',
    city: 'Boston',
    phone: '(617) 555-7890',
    email: 'care@wellnessfamily.com',
    services: ['Family Medicine', 'Pediatrics', 'Vaccination', 'Preventive Care'],
    image: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    userId: '2', // Matches the doctor user in AuthContext
    name: 'Dr. Jane Smith',
    email: 'doctor@healthcare.com',
    phone: '(212) 555-2345',
    specialty: 'Cardiology',
    bio: 'Experienced cardiologist with over 10 years of practice.',
    centerId: '1',
    isActive: true,
    profileImage: 'https://i.pravatar.cc/150?u=doctor',
    availability: [
      { id: '1', doctorId: '1', dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { id: '2', doctorId: '1', dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { id: '3', doctorId: '1', dayOfWeek: 5, startTime: '09:00', endTime: '13:00' }
    ]
  },
  {
    id: '2',
    userId: '4',
    name: 'Dr. Michael Johnson',
    email: 'michael.johnson@healthcare.com',
    phone: '(310) 555-6789',
    specialty: 'Neurology',
    bio: 'Specializes in neurological disorders and stroke treatment.',
    centerId: '2',
    isActive: true,
    profileImage: 'https://i.pravatar.cc/150?u=michael',
    availability: [
      { id: '4', doctorId: '2', dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
      { id: '5', doctorId: '2', dayOfWeek: 4, startTime: '10:00', endTime: '18:00' }
    ]
  },
  {
    id: '3',
    userId: '5',
    name: 'Dr. Emily Wilson',
    email: 'emily.wilson@healthcare.com',
    phone: '(773) 555-0123',
    specialty: 'Pediatrics',
    bio: 'Dedicated to providing compassionate care for children of all ages.',
    centerId: '3',
    isActive: true,
    profileImage: 'https://i.pravatar.cc/150?u=emily',
    availability: [
      { id: '6', doctorId: '3', dayOfWeek: 1, startTime: '08:00', endTime: '16:00' },
      { id: '7', doctorId: '3', dayOfWeek: 2, startTime: '08:00', endTime: '16:00' },
      { id: '8', doctorId: '3', dayOfWeek: 3, startTime: '08:00', endTime: '16:00' }
    ]
  },
  {
    id: '4',
    userId: '6',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@healthcare.com',
    phone: '(415) 555-4567',
    specialty: 'Dentistry',
    bio: 'Expert in cosmetic and restorative dental procedures.',
    centerId: '4',
    isActive: true,
    profileImage: 'https://i.pravatar.cc/150?u=robert',
    availability: [
      { id: '9', doctorId: '4', dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { id: '10', doctorId: '4', dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { id: '11', doctorId: '4', dayOfWeek: 5, startTime: '09:00', endTime: '17:00' }
    ]
  },
  {
    id: '5',
    userId: '7',
    name: 'Dr. Sarah Martinez',
    email: 'sarah.martinez@healthcare.com',
    phone: '(617) 555-8901',
    specialty: 'Family Medicine',
    bio: 'Provides comprehensive care for patients of all ages.',
    centerId: '5',
    isActive: false, // Pending approval
    profileImage: 'https://i.pravatar.cc/150?u=sarah',
    availability: [
      { id: '12', doctorId: '5', dayOfWeek: 2, startTime: '08:00', endTime: '16:00' },
      { id: '13', doctorId: '5', dayOfWeek: 4, startTime: '08:00', endTime: '16:00' }
    ]
  }
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: '1',
    userId: '3', // Matches the patient user in AuthContext
    name: 'John Doe',
    email: 'patient@healthcare.com',
    phone: '(212) 555-3456',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: '123 Elm Street, New York, NY 10001',
    medicalHistory: 'No significant medical history.',
    profileImage: 'https://i.pravatar.cc/150?u=patient'
  },
  {
    id: '2',
    userId: '8',
    name: 'Lisa Brown',
    email: 'lisa.brown@example.com',
    phone: '(310) 555-7890',
    dateOfBirth: '1992-09-23',
    gender: 'female',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
    medicalHistory: 'Asthma, allergic to penicillin.',
    profileImage: 'https://i.pravatar.cc/150?u=lisa'
  },
  {
    id: '3',
    userId: '9',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '(773) 555-1234',
    dateOfBirth: '1978-03-10',
    gender: 'male',
    address: '789 Pine Street, Chicago, IL 60601',
    medicalHistory: 'Hypertension, on medication.',
    profileImage: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '4',
    userId: '10',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(415) 555-5678',
    dateOfBirth: '1989-12-05',
    gender: 'female',
    address: '321 Cedar Road, San Francisco, CA 94101',
    medicalHistory: 'No known medical conditions.',
    profileImage: 'https://i.pravatar.cc/150?u=maria'
  },
  {
    id: '5',
    userId: '11',
    name: 'James Johnson',
    email: 'james.johnson@example.com',
    phone: '(617) 555-9012',
    dateOfBirth: '1965-07-30',
    gender: 'male',
    address: '654 Maple Drive, Boston, MA 02101',
    medicalHistory: 'Type 2 diabetes, cholesterol issues.',
    profileImage: 'https://i.pravatar.cc/150?u=james'
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    centerId: '1',
    date: '2025-04-15',
    time: '10:00',
    status: 'confirmed',
    reason: 'Annual check-up',
    notes: 'Patient has been experiencing mild chest pain.',
    createdAt: '2025-04-01T10:30:00Z',
    updatedAt: '2025-04-02T14:15:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    centerId: '2',
    date: '2025-04-16',
    time: '14:30',
    status: 'pending',
    reason: 'Headache consultation',
    createdAt: '2025-04-03T09:45:00Z',
    updatedAt: '2025-04-03T09:45:00Z'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    centerId: '3',
    date: '2025-04-20',
    time: '11:15',
    status: 'completed',
    reason: 'Flu symptoms',
    notes: 'Prescribed antibiotics and rest.',
    createdAt: '2025-04-05T13:20:00Z',
    updatedAt: '2025-04-20T12:00:00Z'
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '4',
    centerId: '4',
    date: '2025-04-22',
    time: '09:30',
    status: 'cancelled',
    reason: 'Dental cleaning',
    notes: 'Patient cancelled due to personal reasons.',
    createdAt: '2025-04-10T16:40:00Z',
    updatedAt: '2025-04-18T08:50:00Z'
  },
  {
    id: '5',
    patientId: '5',
    doctorId: '5',
    centerId: '5',
    date: '2025-04-25',
    time: '15:45',
    status: 'confirmed',
    reason: 'Blood pressure check',
    createdAt: '2025-04-12T11:10:00Z',
    updatedAt: '2025-04-13T09:30:00Z'
  },
  {
    id: '6',
    patientId: '1',
    doctorId: '2',
    centerId: '2',
    date: '2025-04-28',
    time: '13:00',
    status: 'confirmed',
    reason: 'Neurological assessment',
    createdAt: '2025-04-14T10:15:00Z',
    updatedAt: '2025-04-15T14:20:00Z'
  },
  {
    id: '7',
    patientId: '2',
    doctorId: '1',
    centerId: '1',
    date: '2025-05-02',
    time: '11:30',
    status: 'pending',
    reason: 'Heart palpitations',
    createdAt: '2025-04-20T09:45:00Z',
    updatedAt: '2025-04-20T09:45:00Z'
  },
  {
    id: '8',
    patientId: '3',
    doctorId: '4',
    centerId: '4',
    date: '2025-05-05',
    time: '14:15',
    status: 'confirmed',
    reason: 'Tooth extraction',
    createdAt: '2025-04-22T13:30:00Z',
    updatedAt: '2025-04-23T10:20:00Z'
  }
];

// Mock Services
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'General Check-up',
    description: 'Comprehensive physical examination.',
    category: 'Primary Care',
    duration: 30
  },
  {
    id: '2',
    name: 'Cardiology Consultation',
    description: 'Consultation with a heart specialist.',
    category: 'Specialty Care',
    duration: 45
  },
  {
    id: '3',
    name: 'Pediatric Wellness Visit',
    description: 'Regular check-up for children.',
    category: 'Primary Care',
    duration: 30
  },
  {
    id: '4',
    name: 'Dental Cleaning',
    description: 'Professional teeth cleaning.',
    category: 'Dental Care',
    duration: 60
  },
  {
    id: '5',
    name: 'Neurological Assessment',
    description: 'Evaluation of neurological functions.',
    category: 'Specialty Care',
    duration: 60
  },
  {
    id: '6',
    name: 'Family Medicine Consultation',
    description: 'Consultation for general health concerns.',
    category: 'Primary Care',
    duration: 30
  }
];

// Mock Statistics for Admin Dashboard
export const mockStatistics: Statistics = {
  totalCenters: 5,
  totalDoctors: 5,
  totalPatients: 5,
  totalAppointments: 8,
  appointmentsToday: 2,
  appointmentsThisWeek: 5,
  appointmentsThisMonth: 8
};

// Mock Appointment Analytics Data for Charts
export const mockAppointmentAnalytics: AppointmentAnalytics[] = [
  { period: 'Jan', count: 24 },
  { period: 'Feb', count: 18 },
  { period: 'Mar', count: 30 },
  { period: 'Apr', count: 35 },
  { period: 'May', count: 22 },
  { period: 'Jun', count: 28 },
  { period: 'Jul', count: 32 },
  { period: 'Aug', count: 26 },
  { period: 'Sep', count: 30 },
  { period: 'Oct', count: 28 },
  { period: 'Nov', count: 32 },
  { period: 'Dec', count: 24 }
];

// Mock Service Analytics Data for Charts
export const mockServiceAnalytics: ServiceAnalytics[] = [
  { service: 'General Check-up', count: 45 },
  { service: 'Cardiology', count: 25 },
  { service: 'Pediatrics', count: 30 },
  { service: 'Dental Care', count: 35 },
  { service: 'Neurology', count: 20 },
  { service: 'Family Medicine', count: 40 }
];

// Helper function to get doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => {
  return mockDoctors.find(doctor => doctor.id === id);
};

// Helper function to get patient by ID
export const getPatientById = (id: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === id);
};

// Helper function to get center by ID
export const getCenterById = (id: string): HealthcareCenter | undefined => {
  return mockCenters.find(center => center.id === id);
};

// Helper function to get appointments by doctor ID
export const getAppointmentsByDoctorId = (doctorId: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.doctorId === doctorId);
};

// Helper function to get appointments by patient ID
export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.patientId === patientId);
};

// Helper function to get appointments by center ID
export const getAppointmentsByCenterId = (centerId: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.centerId === centerId);
};

// Helper function to get appointments by date
export const getAppointmentsByDate = (date: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.date === date);
};

// Helper function to get doctors by center ID
export const getDoctorsByCenterId = (centerId: string): Doctor[] => {
  return mockDoctors.filter(doctor => doctor.centerId === centerId);
};
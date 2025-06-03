// User types
export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

// Healthcare center types
export interface HealthcareCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  services: string[];
  image: string;
}

// Doctor types
export interface Doctor {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  bio: string;
  centerId: string;
  isActive: boolean;
  profileImage: string;
  availability: Availability[];
}

export interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

// Patient types
export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  medicalHistory: string;
  profileImage: string;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  centerId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
}

// Statistics types for dashboard
export interface Statistics {
  totalCenters: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
  appointmentsThisMonth: number;
}

// Appointment analytics
export interface AppointmentAnalytics {
  period: string; // e.g., "Jan", "Feb", etc.
  count: number;
}

// Service analytics
export interface ServiceAnalytics {
  service: string;
  count: number;
}
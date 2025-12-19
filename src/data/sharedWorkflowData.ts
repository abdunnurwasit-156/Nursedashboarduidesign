// Shared workflow data across all roles
// This file contains data that flows between different medical staff roles

// Meal intake submissions from nurses (used by nutritionists)
export const nurseMealIntakeSubmissions: Array<{
  patientId: string;
  date: Date;
  breakfast: number;
  lunch: number;
  dinner: number;
  documentedBy: string;
  notes?: string;
}> = [];

// Ward statistics (used by Ward In-Charge)
export const wardStatistics = {
  totalBeds: 48,
  occupiedBeds: 42,
  availableBeds: 6,
  criticalPatients: 8,
  admissionsToday: 5,
  dischargesPlanned: 3
};

// Current staff on duty (used by Ward In-Charge)
export const currentStaff = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'Attending Physician', status: 'On Duty', shift: '7AM - 7PM' },
  { id: '2', name: 'Dr. Michael Chen', role: 'Resident', status: 'On Duty', shift: '7AM - 7PM' },
  { id: '3', name: 'Nurse Jennifer Adams', role: 'RN - ICU', status: 'On Duty', shift: '7AM - 7PM' },
  { id: '4', name: 'Nurse Robert Miller', role: 'RN - CCU', status: 'On Duty', shift: '7AM - 7PM' },
  { id: '5', name: 'Emily Davis', role: 'Pharmacist', status: 'On Duty', shift: '8AM - 6PM' },
  { id: '6', name: 'Thomas Wilson', role: 'Pathologist', status: 'On Duty', shift: '6AM - 6PM' }
];
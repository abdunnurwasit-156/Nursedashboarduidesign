export type SeverityLevel = 'stable' | 'warning' | 'moderate' | 'critical';

export interface Patient {
  id: string;
  bedNumber: string;
  name: string;
  age: number;
  diagnosis: string;
  severity: SeverityLevel;
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    rr: number;
    temp: number;
  };
  hrTrend: number[];
  alerts: string[];
  medicationDue: boolean;
  testPending: boolean;
  newAlert: boolean;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  trigger: string;
  time: Date;
  severity: SeverityLevel;
  acknowledged: boolean;
}

export interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  name: string;
  dose: string;
  frequency: string;
  scheduledTime: string;
  status: 'due' | 'upcoming' | 'missed' | 'completed';
}

export interface Test {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  testName: string;
  type: 'lab' | 'radiology';
  status: 'pending' | 'sample-needed' | 'in-progress' | 'completed';
  orderedTime: Date;
  appointmentTime?: Date;
  sampleCollected?: boolean;
  reportAvailable?: boolean;
}

export interface Event {
  id: string;
  time: Date;
  type: string;
  patientName: string;
  bedNumber: string;
  patientId: string;
  nurseAction: string;
  doctorNotified: boolean;
  status: 'open' | 'resolved' | 'escalated';
  severity: SeverityLevel;
  details?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  checked: boolean;
  timestamp?: Date;
}

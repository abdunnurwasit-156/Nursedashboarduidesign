export interface ClinicalReview {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
  requestedBy: string;
  requestedAt: Date;
  status: 'pending' | 'in-progress' | 'completed';
  nurseNotes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  medication: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  indication: string;
  prescribedBy: string;
  prescribedAt: Date;
  status: 'active' | 'completed' | 'discontinued';
  urgency?: 'urgent' | 'high' | 'standard';
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface TestOrder {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  testName: string;
  type: 'lab' | 'radiology' | 'other';
  urgency: 'stat' | 'urgent' | 'routine';
  clinicalIndication: string;
  orderedBy: string;
  orderedAt: Date;
  status: 'ordered' | 'scheduled' | 'collected' | 'in-progress' | 'completed';
  scheduledTime?: Date;
  collectedAt?: Date;
  collectedBy?: string;
}

export interface TestResult {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  testName: string;
  type: 'lab' | 'radiology';
  result: string;
  normalRange?: string;
  isCritical: boolean;
  isAbnormal: boolean;
  completedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  interpretation?: string;
}

export interface ProgressNote {
  id: string;
  patientId: string;
  author: string;
  role: 'doctor' | 'nurse';
  timestamp: Date;
  noteType: 'progress' | 'admission' | 'discharge' | 'consultation';
  content: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'medication-refill' | 'procedure' | 'transfer' | 'discharge';
  patientId: string;
  patientName: string;
  bedNumber: string;
  requestedBy: string;
  requestedAt: Date;
  details: string;
  status: 'pending' | 'approved' | 'denied';
  priority: 'normal' | 'urgent';
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  diagnosis: string;
  goals: string[];
  interventions: string[];
  monitoring: string[];
  expectedOutcome: string;
  updatedBy: string;
  updatedAt: Date;
}
import { Patient, Alert, Medication, Test, Event } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    bedNumber: 'ICU-201',
    name: 'Sarah Johnson',
    age: 67,
    diagnosis: 'Post-cardiac surgery',
    severity: 'stable',
    vitals: {
      hr: 78,
      bp: '120/80',
      spo2: 98,
      rr: 16,
      temp: 37.2
    },
    hrTrend: [75, 76, 78, 77, 79, 78, 78],
    alerts: [],
    medicationDue: true,
    testPending: false,
    newAlert: false
  },
  {
    id: 'p2',
    bedNumber: 'ICU-202',
    name: 'Michael Chen',
    age: 45,
    diagnosis: 'Respiratory failure',
    severity: 'critical',
    vitals: {
      hr: 132,
      bp: '95/60',
      spo2: 89,
      rr: 28,
      temp: 38.5
    },
    hrTrend: [110, 115, 120, 128, 130, 132, 135],
    alerts: ['HR > 130', 'SpO₂ < 90%'],
    medicationDue: true,
    testPending: true,
    newAlert: true
  },
  {
    id: 'p3',
    bedNumber: 'CCU-105',
    name: 'Emma Davis',
    age: 72,
    diagnosis: 'Myocardial infarction',
    severity: 'moderate',
    vitals: {
      hr: 95,
      bp: '140/90',
      spo2: 94,
      rr: 20,
      temp: 37.8
    },
    hrTrend: [88, 90, 92, 95, 94, 95, 95],
    alerts: ['BP elevated'],
    medicationDue: false,
    testPending: true,
    newAlert: false
  },
  {
    id: 'p4',
    bedNumber: 'ICU-203',
    name: 'Robert Martinez',
    age: 58,
    diagnosis: 'Septic shock',
    severity: 'critical',
    vitals: {
      hr: 145,
      bp: '85/55',
      spo2: 91,
      rr: 26,
      temp: 39.1
    },
    hrTrend: [130, 135, 140, 142, 145, 146, 145],
    alerts: ['Tachycardia', 'Hypotension'],
    medicationDue: true,
    testPending: true,
    newAlert: true
  },
  {
    id: 'p5',
    bedNumber: 'NICU-12',
    name: 'Baby Williams',
    age: 0,
    diagnosis: 'Premature birth (28 wks)',
    severity: 'warning',
    vitals: {
      hr: 165,
      bp: '60/35',
      spo2: 93,
      rr: 45,
      temp: 36.8
    },
    hrTrend: [160, 162, 165, 163, 165, 166, 165],
    alerts: ['Bradycardia episode'],
    medicationDue: false,
    testPending: true,
    newAlert: false
  },
  {
    id: 'p6',
    bedNumber: 'ICU-204',
    name: 'Linda Anderson',
    age: 81,
    diagnosis: 'Stroke',
    severity: 'stable',
    vitals: {
      hr: 72,
      bp: '125/75',
      spo2: 97,
      rr: 14,
      temp: 36.9
    },
    hrTrend: [70, 71, 72, 73, 72, 72, 72],
    alerts: [],
    medicationDue: false,
    testPending: false,
    newAlert: false
  },
  {
    id: 'p7',
    bedNumber: 'CCU-106',
    name: 'James Thompson',
    age: 63,
    diagnosis: 'Heart failure',
    severity: 'warning',
    vitals: {
      hr: 105,
      bp: '110/70',
      spo2: 92,
      rr: 22,
      temp: 37.4
    },
    hrTrend: [98, 100, 102, 105, 104, 105, 105],
    alerts: ['Fluid overload'],
    medicationDue: true,
    testPending: false,
    newAlert: false
  },
  {
    id: 'p8',
    bedNumber: 'ICU-205',
    name: 'Patricia Brown',
    age: 55,
    diagnosis: 'Pneumonia',
    severity: 'moderate',
    vitals: {
      hr: 98,
      bp: '130/85',
      spo2: 93,
      rr: 24,
      temp: 38.2
    },
    hrTrend: [92, 94, 96, 98, 97, 98, 98],
    alerts: ['Fever'],
    medicationDue: false,
    testPending: true,
    newAlert: false
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    trigger: 'Heart Rate > 130 bpm',
    time: new Date(Date.now() - 5 * 60000),
    severity: 'critical',
    acknowledged: false
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    trigger: 'SpO₂ < 90%',
    time: new Date(Date.now() - 3 * 60000),
    severity: 'critical',
    acknowledged: false
  },
  {
    id: 'a3',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    trigger: 'Blood Pressure < 90/60 mmHg',
    time: new Date(Date.now() - 8 * 60000),
    severity: 'critical',
    acknowledged: false
  },
  {
    id: 'a4',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    trigger: 'Blood Pressure > 140/90 mmHg',
    time: new Date(Date.now() - 15 * 60000),
    severity: 'moderate',
    acknowledged: false
  },
  {
    id: 'a5',
    patientId: 'p5',
    patientName: 'Baby Williams',
    bedNumber: 'NICU-12',
    trigger: 'Bradycardia episode detected',
    time: new Date(Date.now() - 25 * 60000),
    severity: 'warning',
    acknowledged: true
  },
  {
    id: 'a6',
    patientId: 'p7',
    patientName: 'James Thompson',
    bedNumber: 'CCU-106',
    trigger: 'Heart Rate > 100 bpm',
    time: new Date(Date.now() - 35 * 60000),
    severity: 'warning',
    acknowledged: true
  }
];

export const mockMedications: Medication[] = [
  {
    id: 'm1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    name: 'Metoprolol',
    dose: '50mg',
    frequency: 'BID',
    scheduledTime: '14:00',
    status: 'due'
  },
  {
    id: 'm2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    name: 'Norepinephrine',
    dose: '0.1 mcg/kg/min',
    frequency: 'Continuous',
    scheduledTime: 'Ongoing',
    status: 'due'
  },
  {
    id: 'm3',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    name: 'Propofol',
    dose: '50mg/hr',
    frequency: 'Continuous',
    scheduledTime: 'Ongoing',
    status: 'completed'
  },
  {
    id: 'm4',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    name: 'Aspirin',
    dose: '325mg',
    frequency: 'Daily',
    scheduledTime: '08:00',
    status: 'completed'
  },
  {
    id: 'm5',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    name: 'Vancomycin',
    dose: '1g',
    frequency: 'Q12H',
    scheduledTime: '14:00',
    status: 'due'
  },
  {
    id: 'm6',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    name: 'Ceftriaxone',
    dose: '2g',
    frequency: 'Daily',
    scheduledTime: '10:00',
    status: 'missed'
  },
  {
    id: 'm7',
    patientId: 'p7',
    patientName: 'James Thompson',
    bedNumber: 'CCU-106',
    name: 'Furosemide',
    dose: '40mg',
    frequency: 'BID',
    scheduledTime: '14:00',
    status: 'due'
  },
  {
    id: 'm8',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    name: 'Atorvastatin',
    dose: '80mg',
    frequency: 'Daily',
    scheduledTime: '20:00',
    status: 'upcoming'
  }
];

export const mockTests: Test[] = [
  {
    id: 't1',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    testName: 'Arterial Blood Gas',
    type: 'lab',
    status: 'sample-needed',
    orderedTime: new Date(Date.now() - 30 * 60000),
    sampleCollected: false
  },
  {
    id: 't2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    testName: 'Chest X-Ray',
    type: 'radiology',
    status: 'pending',
    orderedTime: new Date(Date.now() - 45 * 60000),
    appointmentTime: new Date(Date.now() + 30 * 60000)
  },
  {
    id: 't3',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    testName: 'Troponin I',
    type: 'lab',
    status: 'in-progress',
    orderedTime: new Date(Date.now() - 2 * 60 * 60000),
    sampleCollected: true
  },
  {
    id: 't4',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    testName: 'Blood Culture',
    type: 'lab',
    status: 'in-progress',
    orderedTime: new Date(Date.now() - 4 * 60 * 60000),
    sampleCollected: true
  },
  {
    id: 't5',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    testName: 'Complete Blood Count',
    type: 'lab',
    status: 'completed',
    orderedTime: new Date(Date.now() - 6 * 60 * 60000),
    sampleCollected: true,
    reportAvailable: true
  },
  {
    id: 't6',
    patientId: 'p5',
    patientName: 'Baby Williams',
    bedNumber: 'NICU-12',
    testName: 'Head Ultrasound',
    type: 'radiology',
    status: 'pending',
    orderedTime: new Date(Date.now() - 60 * 60000),
    appointmentTime: new Date(Date.now() + 2 * 60 * 60000)
  },
  {
    id: 't7',
    patientId: 'p8',
    patientName: 'Patricia Brown',
    bedNumber: 'ICU-205',
    testName: 'Sputum Culture',
    type: 'lab',
    status: 'sample-needed',
    orderedTime: new Date(Date.now() - 20 * 60000),
    sampleCollected: false
  },
  {
    id: 't8',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    testName: 'Lipid Panel',
    type: 'lab',
    status: 'pending',
    orderedTime: new Date(Date.now() - 3 * 60 * 60000),
    appointmentTime: new Date(Date.now() + 90 * 60000),
    sampleCollected: false
  }
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    time: new Date(Date.now() - 10 * 60000),
    type: 'Critical Alert',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    patientId: 'p2',
    nurseAction: 'Oxygen therapy increased, repositioned patient',
    doctorNotified: true,
    status: 'open',
    severity: 'critical',
    details: 'SpO₂ dropped to 89%. Increased O₂ to 6L/min via NC. Dr. Adams notified.'
  },
  {
    id: 'e2',
    time: new Date(Date.now() - 45 * 60000),
    type: 'Medication Delay',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    patientId: 'p4',
    nurseAction: 'Pharmacy contacted for medication',
    doctorNotified: false,
    status: 'resolved',
    severity: 'moderate',
    details: 'Ceftriaxone delayed due to pharmacy stock. Administered 30 mins late.'
  },
  {
    id: 'e3',
    time: new Date(Date.now() - 90 * 60000),
    type: 'Vital Alert',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    patientId: 'p3',
    nurseAction: 'Verified BP reading, patient stable',
    doctorNotified: false,
    status: 'resolved',
    severity: 'warning',
    details: 'BP spike to 150/95. Repeated measurement after 10 mins: 140/88.'
  },
  {
    id: 'e4',
    time: new Date(Date.now() - 120 * 60000),
    type: 'Device Malfunction',
    patientName: 'Baby Williams',
    bedNumber: 'NICU-12',
    patientId: 'p5',
    nurseAction: 'Lead repositioned, false alarm',
    doctorNotified: false,
    status: 'resolved',
    severity: 'warning',
    details: 'ECG lead disconnected. Reattached and verified signal quality.'
  },
  {
    id: 'e5',
    time: new Date(Date.now() - 3 * 60 * 60000),
    type: 'Patient Deterioration',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    patientId: 'p4',
    nurseAction: 'Code Blue called, resuscitation successful',
    doctorNotified: true,
    status: 'resolved',
    severity: 'critical',
    details: 'Patient became unresponsive. Code Blue activated. ROSC achieved after 4 mins.'
  },
  {
    id: 'e6',
    time: new Date(Date.now() - 5 * 60 * 60000),
    type: 'Nurse Intervention',
    patientName: 'James Thompson',
    bedNumber: 'CCU-106',
    patientId: 'p7',
    nurseAction: 'Administered PRN diuretic',
    doctorNotified: false,
    status: 'resolved',
    severity: 'stable',
    details: 'Patient showing signs of fluid retention. Administered Furosemide 20mg IV as ordered.'
  }
];
import { ClinicalReview, Prescription, TestOrder, TestResult, ProgressNote, ApprovalRequest, TreatmentPlan } from '../types/doctor';

export const mockClinicalReviews: ClinicalReview[] = [
  {
    id: 'cr1',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    priority: 'critical',
    reason: 'Respiratory failure worsening - SpO₂ declining despite O₂ increase',
    requestedBy: 'Nurse Jennifer Williams',
    requestedAt: new Date(Date.now() - 10 * 60000),
    status: 'pending',
    nurseNotes: 'SpO₂ dropped to 89% despite increasing O₂ to 6L/min. Patient appears more dyspneic. HR increasing.'
  },
  {
    id: 'cr2',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    priority: 'critical',
    reason: 'Hypotension not responding to fluids',
    requestedBy: 'Nurse Jennifer Williams',
    requestedAt: new Date(Date.now() - 25 * 60000),
    status: 'in-progress',
    nurseNotes: 'BP 85/55 after 500ml bolus. Patient remains tachycardic. Considering vasopressor initiation.'
  },
  {
    id: 'cr3',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    priority: 'high',
    reason: 'Chest pain episode',
    requestedBy: 'Nurse Sarah Mitchell',
    requestedAt: new Date(Date.now() - 45 * 60000),
    status: 'pending',
    nurseNotes: 'Patient reported substernal chest discomfort 7/10. ECG obtained. Nitroglycerin given.'
  },
  {
    id: 'cr4',
    patientId: 'p7',
    patientName: 'James Thompson',
    bedNumber: 'CCU-106',
    priority: 'medium',
    reason: 'Medication adjustment consultation',
    requestedBy: 'Nurse Jennifer Williams',
    requestedAt: new Date(Date.now() - 2 * 60 * 60000),
    status: 'pending',
    nurseNotes: 'Patient still showing signs of fluid overload despite current diuretic dose.'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx1',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    medication: 'Norepinephrine',
    dose: '0.1 mcg/kg/min',
    route: 'IV',
    frequency: 'Continuous infusion',
    duration: 'Until hemodynamically stable',
    indication: 'Septic shock - maintain MAP > 65',
    prescribedBy: 'Dr. Lee',
    prescribedAt: new Date(Date.now() - 6 * 60 * 60000),
    status: 'active',
    urgency: 'urgent',
    availability: 'in-stock'
  },
  {
    id: 'rx2',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    medication: 'Metoprolol',
    dose: '50mg',
    route: 'PO',
    frequency: 'BID',
    duration: '30 days',
    indication: 'Post-cardiac surgery - rate control',
    prescribedBy: 'Dr. Adams',
    prescribedAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
    status: 'active',
    urgency: 'standard',
    availability: 'in-stock'
  },
  {
    id: 'rx3',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    medication: 'Vancomycin',
    dose: '1g',
    route: 'IV',
    frequency: 'Q12H',
    duration: '14 days',
    indication: 'Sepsis - MRSA coverage',
    prescribedBy: 'Dr. Patel',
    prescribedAt: new Date(Date.now() - 24 * 60 * 60000),
    status: 'active',
    urgency: 'high',
    availability: 'low-stock'
  },
  {
    id: 'rx4',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    medication: 'Fentanyl',
    dose: '50mcg',
    route: 'IV',
    frequency: 'Q1H PRN',
    duration: 'While intubated',
    indication: 'Pain/Sedation',
    prescribedBy: 'Dr. Lee',
    prescribedAt: new Date(Date.now() - 30 * 60000),
    status: 'active',
    urgency: 'urgent',
    availability: 'in-stock'
  },
  {
    id: 'rx5',
    patientId: 'p5',
    patientName: 'Lisa Anderson',
    bedNumber: 'CCU-107',
    medication: 'Atorvastatin',
    dose: '80mg',
    route: 'PO',
    frequency: 'Daily',
    duration: 'Indefinite',
    indication: 'ACS',
    prescribedBy: 'Dr. Patel',
    prescribedAt: new Date(Date.now() - 60 * 60000),
    status: 'active',
    urgency: 'standard',
    availability: 'out-of-stock'
  }
];

export const mockTestOrders: TestOrder[] = [
  {
    id: 'to1',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    testName: 'Arterial Blood Gas',
    type: 'lab',
    urgency: 'stat',
    clinicalIndication: 'Worsening respiratory failure - assess oxygenation and acid-base status',
    orderedBy: 'Dr. Lee',
    orderedAt: new Date(Date.now() - 30 * 60000),
    status: 'ordered'
  },
  {
    id: 'to2',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    testName: 'Troponin I',
    type: 'lab',
    urgency: 'stat',
    clinicalIndication: 'Chest pain - rule out acute MI',
    orderedBy: 'Dr. Adams',
    orderedAt: new Date(Date.now() - 60 * 60000),
    status: 'in-progress',
    collectedAt: new Date(Date.now() - 45 * 60000),
    collectedBy: 'Pathologist Sarah Kim'
  },
  {
    id: 'to3',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    testName: 'Complete Metabolic Panel',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Routine monitoring post-surgery',
    orderedBy: 'Dr. Adams',
    orderedAt: new Date(Date.now() - 2 * 60 * 60000),
    status: 'in-progress',
    collectedAt: new Date(Date.now() - 90 * 60000),
    collectedBy: 'Pathologist Sarah Kim'
  },
  {
    id: 'to4',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    testName: 'Chest CT Scan',
    type: 'radiology',
    urgency: 'urgent',
    clinicalIndication: 'Suspected pulmonary embolism',
    orderedBy: 'Dr. Lee',
    orderedAt: new Date(Date.now() - 90 * 60000),
    status: 'ordered'
  },
  {
    id: 'to5',
    patientId: 'p5',
    patientName: 'Lisa Anderson',
    bedNumber: 'CCU-107',
    testName: 'Lipid Panel',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Cardiovascular risk assessment',
    orderedBy: 'Dr. Patel',
    orderedAt: new Date(Date.now() - 4 * 60 * 60000),
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60000)
  },
  {
    id: 'to6',
    patientId: 'p6',
    patientName: 'David Kim',
    bedNumber: 'ICU-204',
    testName: 'Blood Culture',
    type: 'lab',
    urgency: 'urgent',
    clinicalIndication: 'Fever of unknown origin - sepsis workup',
    orderedBy: 'Dr. Lee',
    orderedAt: new Date(Date.now() - 45 * 60000),
    status: 'in-progress',
    collectedAt: new Date(Date.now() - 30 * 60000),
    collectedBy: 'Pathologist Sarah Kim'
  },
  {
    id: 'to7',
    patientId: 'p7',
    patientName: 'James Thompson',
    bedNumber: 'CCU-106',
    testName: 'Hemoglobin A1C',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Diabetes monitoring',
    orderedBy: 'Dr. Patel',
    orderedAt: new Date(Date.now() - 5 * 60 * 60000),
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 4 * 60 * 60000)
  },
  {
    id: 'to8',
    patientId: 'p8',
    patientName: 'Patricia Brown',
    bedNumber: 'ICU-205',
    testName: 'Thyroid Function Panel',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Suspected hypothyroidism',
    orderedBy: 'Dr. Adams',
    orderedAt: new Date(Date.now() - 6 * 60 * 60000),
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 90 * 60 * 60000)
  },
  {
    id: 'to9',
    patientId: 'p9',
    patientName: 'Jennifer Taylor',
    bedNumber: 'CCU-108',
    testName: 'Abdominal Ultrasound',
    type: 'radiology',
    urgency: 'routine',
    clinicalIndication: 'Elevated liver enzymes - assess liver and gallbladder',
    orderedBy: 'Dr. Patel',
    orderedAt: new Date(Date.now() - 3 * 60 * 60000),
    status: 'ordered'
  },
  {
    id: 'to10',
    patientId: 'p10',
    patientName: 'Christopher White',
    bedNumber: 'ICU-206',
    testName: 'Chest X-Ray',
    type: 'radiology',
    urgency: 'routine',
    clinicalIndication: 'Post-central line placement - verify position',
    orderedBy: 'Dr. Lee',
    orderedAt: new Date(Date.now() - 5 * 60 * 60000),
    status: 'ordered'
  },
  {
    id: 'to11',
    patientId: 'p11',
    patientName: 'Amanda Harris',
    bedNumber: 'CCU-109',
    testName: 'Head Ultrasound',
    type: 'radiology',
    urgency: 'routine',
    clinicalIndication: 'Routine neonatal screening',
    orderedBy: 'Dr. Adams',
    orderedAt: new Date(Date.now() - 7 * 60 * 60000),
    status: 'ordered'
  },
  {
    id: 'to12',
    patientId: 'p12',
    patientName: 'Steven Garcia',
    bedNumber: 'ICU-207',
    testName: 'Complete Blood Count',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Routine post-operative monitoring',
    orderedBy: 'Dr. Patel',
    orderedAt: new Date(Date.now() - 8 * 60 * 60000),
    status: 'ordered'
  },
  {
    id: 'to13',
    patientId: 'p13',
    patientName: 'Michelle Lewis',
    bedNumber: 'CCU-110',
    testName: 'Coagulation Panel',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Monitor warfarin therapy',
    orderedBy: 'Dr. Adams',
    orderedAt: new Date(Date.now() - 10 * 60 * 60000),
    status: 'ordered'
  },
  {
    id: 'to14',
    patientId: 'p14',
    patientName: 'Daniel Robinson',
    bedNumber: 'ICU-208',
    testName: 'Liver Function Panel',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: 'Medication hepatotoxicity screening',
    orderedBy: 'Dr. Lee',
    orderedAt: new Date(Date.now() - 12 * 60 * 60000),
    status: 'ordered'
  }
];

export const mockTestResults: TestResult[] = [
  {
    id: 'tr1',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    testName: 'Complete Blood Count',
    type: 'lab',
    result: 'WBC: 18.5 (H), Hgb: 9.2 (L), Plt: 145',
    normalRange: 'WBC: 4-11, Hgb: 13-17, Plt: 150-400',
    isCritical: false,
    isAbnormal: true,
    completedAt: new Date(Date.now() - 2 * 60 * 60000),
    reviewedBy: undefined,
    interpretation: undefined
  },
  {
    id: 'tr2',
    patientId: 'p3',
    patientName: 'Emma Davis',
    bedNumber: 'CCU-105',
    testName: 'Troponin I (Initial)',
    type: 'lab',
    result: '2.8 ng/mL',
    normalRange: '< 0.04 ng/mL',
    isCritical: true,
    isAbnormal: true,
    completedAt: new Date(Date.now() - 3 * 60 * 60000),
    reviewedBy: undefined,
    interpretation: undefined
  },
  {
    id: 'tr3',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    testName: 'Chest X-Ray',
    type: 'radiology',
    result: 'Bilateral infiltrates consistent with ARDS. No pneumothorax.',
    normalRange: undefined,
    isCritical: true,
    isAbnormal: true,
    completedAt: new Date(Date.now() - 90 * 60000),
    reviewedBy: undefined,
    interpretation: undefined
  },
  {
    id: 'tr4',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    testName: 'Basic Metabolic Panel',
    type: 'lab',
    result: 'Na: 138, K: 4.2, Cl: 102, CO2: 24, BUN: 18, Cr: 0.9, Glucose: 105',
    normalRange: 'All within normal limits',
    isCritical: false,
    isAbnormal: false,
    completedAt: new Date(Date.now() - 5 * 60 * 60000),
    reviewedBy: 'Dr. Adams',
    reviewedAt: new Date(Date.now() - 4 * 60 * 60000),
    interpretation: 'Normal renal function and electrolytes. Continue current management.'
  }
];

export const mockProgressNotes: ProgressNote[] = [
  {
    id: 'pn1',
    patientId: 'p2',
    author: 'Dr. Lee',
    role: 'doctor',
    timestamp: new Date(Date.now() - 8 * 60 * 60000),
    noteType: 'progress',
    content: 'Patient remains critically ill with respiratory failure secondary to severe pneumonia/sepsis. Currently on high-flow O₂. Hemodynamics stabilizing on norepinephrine. Will monitor closely for need for intubation. Continue broad-spectrum antibiotics pending culture results.'
  },
  {
    id: 'pn2',
    patientId: 'p2',
    author: 'Nurse Jennifer Williams',
    role: 'nurse',
    timestamp: new Date(Date.now() - 4 * 60 * 60000),
    noteType: 'progress',
    content: 'Patient appears more dyspneic. Work of breathing increased. SpO₂ ranging 88-92% on 6L NC. Lung sounds with bilateral crackles. Suctioned moderate amount thick secretions. Dr. Lee notified of status change.'
  },
  {
    id: 'pn3',
    patientId: 'p3',
    author: 'Dr. Adams',
    role: 'doctor',
    timestamp: new Date(Date.now() - 12 * 60 * 60000),
    noteType: 'progress',
    content: 'Day 2 post-MI. Patient hemodynamically stable. Chest pain resolved. Troponin trending down. Echo shows EF 45% with anterior wall hypokinesis. Continue dual antiplatelet therapy, statin, ACE-I, beta-blocker. Plan for cardiac rehab consult.'
  }
];

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'ar1',
    type: 'medication-refill',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    bedNumber: 'ICU-201',
    requestedBy: 'Nurse Jennifer Williams',
    requestedAt: new Date(Date.now() - 30 * 60000),
    details: 'Request refill: Metoprolol 50mg - Current ward stock: 8 units. Request 20 additional units.',
    status: 'pending',
    priority: 'normal'
  },
  {
    id: 'ar2',
    type: 'medication-refill',
    patientId: 'p4',
    patientName: 'Robert Martinez',
    bedNumber: 'ICU-203',
    requestedBy: 'Nurse Sarah Mitchell',
    requestedAt: new Date(Date.now() - 60 * 60000),
    details: 'Request refill: Vancomycin 1g - Low stock. Patient requires 14-day course.',
    status: 'pending',
    priority: 'urgent'
  },
  {
    id: 'ar3',
    type: 'procedure',
    patientId: 'p2',
    patientName: 'Michael Chen',
    bedNumber: 'ICU-202',
    requestedBy: 'Nurse Jennifer Williams',
    requestedAt: new Date(Date.now() - 20 * 60000),
    details: 'Request approval for central line placement - peripheral access difficult, requiring vasopressor support.',
    status: 'pending',
    priority: 'urgent'
  }
];

export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: 'tp1',
    patientId: 'p2',
    diagnosis: 'Severe pneumonia with septic shock, acute respiratory failure',
    goals: [
      'Achieve hemodynamic stability (MAP > 65 mmHg)',
      'Improve oxygenation (SpO₂ > 92%)',
      'Source control of infection',
      'Prevent multi-organ failure'
    ],
    interventions: [
      'Broad-spectrum antibiotics (Vancomycin + Ceftriaxone)',
      'Vasopressor support with Norepinephrine',
      'High-flow oxygen therapy, monitor for intubation criteria',
      'Fluid resuscitation guided by hemodynamics',
      'Daily labs and cultures'
    ],
    monitoring: [
      'Continuous vital signs monitoring',
      'Hourly urine output',
      'Q4H ABG if intubated',
      'Daily chest X-ray',
      'Serial lactate levels'
    ],
    expectedOutcome: 'Stabilization within 48-72 hours, extubation within 5-7 days if responds to therapy',
    updatedBy: 'Dr. Lee',
    updatedAt: new Date(Date.now() - 12 * 60 * 60000)
  },
  {
    id: 'tp2',
    patientId: 'p3',
    diagnosis: 'Acute myocardial infarction (anterior STEMI), post-PCI',
    goals: [
      'Prevent recurrent ischemia',
      'Optimize cardiac function',
      'Prevent complications (arrhythmia, heart failure)',
      'Secondary prevention'
    ],
    interventions: [
      'Dual antiplatelet therapy (Aspirin + Ticagrelor)',
      'High-intensity statin therapy',
      'ACE inhibitor for LV dysfunction',
      'Beta-blocker for rate control',
      'Cardiac rehabilitation referral'
    ],
    monitoring: [
      'Continuous telemetry',
      'Serial troponins',
      'Daily ECG',
      'Echocardiogram on day 3',
      'Lipid panel'
    ],
    expectedOutcome: 'Transfer to step-down unit in 48 hours if stable, discharge in 5-7 days',
    updatedBy: 'Dr. Adams',
    updatedAt: new Date(Date.now() - 24 * 60 * 60000)
  }
];
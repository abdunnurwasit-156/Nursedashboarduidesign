import { X, User, Calendar, MapPin, Phone, Mail, AlertCircle, Heart, Activity, Droplet, Wind, Thermometer, Pill, FileText, Users, Stethoscope, Utensils, Dumbbell, Camera, ClipboardList, Clock, AlertTriangle, Edit2, Save, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { LiveMonitors } from './LiveMonitors';
import { MedicationEditor } from './MedicationEditor';

interface PatientFullDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  userRole?: 'nurse' | 'doctor' | 'ward-incharge' | 'lab-tech' | 'pharmacist' | 'radiologist' | 'nutritionist' | 'physical-therapist';
}

type TabType = 'overview' | 'clinical' | 'medications' | 'labs' | 'nutrition' | 'notes' | 'monitors';

export function PatientFullDetails({ isOpen, onClose, patient, userRole = 'nurse' }: PatientFullDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  if (!isOpen || !patient) return null;

  const severityColors = {
    stable: 'border-green-500 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50',
    moderate: 'border-orange-500 bg-orange-50',
    critical: 'border-red-500 bg-red-50'
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: User },
    { id: 'clinical' as TabType, label: 'Clinical', icon: Activity },
    { id: 'medications' as TabType, label: 'Medications', icon: Pill },
    { id: 'labs' as TabType, label: 'Lab Results', icon: FileText },
    { id: 'nutrition' as TabType, label: 'Nutrition', icon: Utensils },
    { id: 'notes' as TabType, label: 'Notes', icon: ClipboardList },
    { id: 'monitors' as TabType, label: 'Monitors', icon: Camera }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className={`sticky top-0 bg-white border-b-4 ${severityColors[patient.severity].split(' ')[0]} shadow-md z-10`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="bg-blue-600 text-white px-4 py-2 rounded text-xl">
                {patient.bedNumber}
              </span>
              <div>
                <h1 className="text-gray-900">{patient.name}</h1>
                <p className="text-sm text-gray-600">{patient.age} years • {patient.diagnosis}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg border-2 ${severityColors[patient.severity]} text-sm`}>
                {patient.severity.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Demographics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Demographics</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Date of Birth</div>
                  <div className="text-gray-900">Jan 15, 1965 (58 yrs)</div>
                </div>
                <div>
                  <div className="text-gray-500">Gender</div>
                  <div className="text-gray-900">Male</div>
                </div>
                <div>
                  <div className="text-gray-500">Address</div>
                  <div className="text-gray-900">123 Main St, City, State 12345</div>
                </div>
                <div>
                  <div className="text-gray-500">Phone</div>
                  <div className="text-gray-900">+1 (555) 123-4567</div>
                </div>
                <div>
                  <div className="text-gray-500">Email</div>
                  <div className="text-gray-900">patient@email.com</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h2 className="text-gray-900">Emergency Contact</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-gray-900">Jane Smith</div>
                <div className="text-gray-600">Spouse</div>
                <div className="text-gray-600">+1 (555) 987-6543</div>
                <div className="text-gray-600">jane.smith@email.com</div>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-gray-900">Insurance</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-gray-500">Provider</div>
                  <div className="text-gray-900">Blue Cross Blue Shield</div>
                </div>
                <div>
                  <div className="text-gray-500">Policy Number</div>
                  <div className="text-gray-900">BCBS-123456789</div>
                </div>
                <div>
                  <div className="text-gray-500">Group Number</div>
                  <div className="text-gray-900">GRP-98765</div>
                </div>
              </div>
            </div>

            {/* Admission Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Admission Details</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Admission Date</div>
                  <div className="text-gray-900">Dec 5, 2025 - 02:30 AM</div>
                </div>
                <div>
                  <div className="text-gray-500">Length of Stay</div>
                  <div className="text-gray-900">3 days</div>
                </div>
                <div>
                  <div className="text-gray-500">Admission Type</div>
                  <div className="text-gray-900">Emergency</div>
                </div>
                <div>
                  <div className="text-gray-500">Chief Complaint</div>
                  <div className="text-gray-900">Acute chest pain, shortness of breath</div>
                </div>
              </div>
            </div>

            {/* Care Team */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Care Team</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <div className="text-gray-900">Dr. Sarah Johnson</div>
                    <div className="text-gray-500">Attending Physician</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <div className="text-gray-900">Nurse Emily Rodriguez</div>
                    <div className="text-gray-500">Primary Nurse</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-orange-600 mt-1" />
                  <div>
                    <div className="text-gray-900">Emily Martinez, RD</div>
                    <div className="text-gray-500">Nutritionist</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Dumbbell className="w-4 h-4 text-purple-600 mt-1" />
                  <div>
                    <div className="text-gray-900">Sarah Johnson, PT</div>
                    <div className="text-gray-500">Physical Therapist</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Allergies - Full Width */}
            <div className="col-span-3 bg-red-50 rounded-lg border-2 border-red-300 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-red-900">Allergies & Sensitivities</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded p-3 border border-red-200">
                  <div className="text-red-900">Penicillin</div>
                  <div className="text-red-700 text-xs">Severe - Anaphylaxis</div>
                </div>
                <div className="bg-white rounded p-3 border border-red-200">
                  <div className="text-red-900">Latex</div>
                  <div className="text-red-700 text-xs">Moderate - Skin rash</div>
                </div>
                <div className="bg-white rounded p-3 border border-red-200">
                  <div className="text-red-900">Sulfa drugs</div>
                  <div className="text-red-700 text-xs">Mild - Hives</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Tab */}
        {activeTab === 'clinical' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Current Vitals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Current Vitals</h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-red-900">Heart Rate</span>
                    </div>
                    <div className="text-2xl text-red-900">{patient.vitals.hr} <span className="text-sm text-red-700">bpm</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-900">Blood Pressure</span>
                    </div>
                    <div className="text-2xl text-blue-900">{patient.vitals.bp} <span className="text-sm text-blue-700">mmHg</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-cyan-600" />
                      <span className="text-sm text-cyan-900">Oxygen Saturation</span>
                    </div>
                    <div className="text-2xl text-cyan-900">{patient.vitals.spo2} <span className="text-sm text-cyan-700">%</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-900">Respiratory Rate</span>
                    </div>
                    <div className="text-2xl text-green-900">{patient.vitals.rr} <span className="text-sm text-green-700">/min</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-orange-900">Temperature</span>
                    </div>
                    <div className="text-2xl text-orange-900">{patient.vitals.temp} <span className="text-sm text-orange-700">°C</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Medical History</h2>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-gray-900">Type 2 Diabetes Mellitus</div>
                  <div className="text-sm text-gray-500">Diagnosed 2015 • Well-controlled</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-gray-900">Hypertension</div>
                  <div className="text-sm text-gray-500">Diagnosed 2012 • On medication</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-gray-900">COPD (Chronic Obstructive Pulmonary Disease)</div>
                  <div className="text-sm text-gray-500">Diagnosed 2018 • Stage 2</div>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <div className="text-gray-900">Appendectomy</div>
                  <div className="text-sm text-gray-500">Surgery performed 2005</div>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <div className="text-gray-900">Cholecystectomy</div>
                  <div className="text-sm text-gray-500">Surgery performed 2010</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Active Medications</h2>
                {userRole === 'doctor' && (
                  <span className="ml-auto text-xs text-gray-500">(You can edit, add, or discontinue medications)</span>
                )}
              </div>
              <MedicationEditor userRole={userRole} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-green-600" />
                <h2 className="text-gray-900">Current Treatment Orders</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-green-900">Oxygen Therapy</div>
                    <span className="px-2 py-1 bg-green-200 text-green-900 text-xs rounded">Active</span>
                  </div>
                  <div className="text-sm text-green-700">2L/min via nasal cannula • Continuous</div>
                  <div className="text-xs text-green-600 mt-2">Target SpO2: &gt;92% • Ordered: Dec 5, 2025</div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-green-900">IV Fluids</div>
                  <div className="text-sm text-green-700">Normal Saline 0.9% • 75 mL/hr</div>
                  <div className="text-xs text-green-600 mt-2">Started: Dec 5, 2025 - 03:00 AM</div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-green-900">Glucose Monitoring</div>
                  <div className="text-sm text-green-700">Fingerstick glucose every 6 hours</div>
                  <div className="text-xs text-green-600 mt-2">Target: 80-180 mg/dL</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'labs' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Recent Lab Results</h2>
                <span className="text-xs text-gray-500">(Dec 7, 2025 - 06:00 AM)</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Hemoglobin</span>
                  <span className="text-gray-900">12.5 g/dL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Hematocrit</span>
                  <span className="text-gray-900">38.5%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">WBC Count</span>
                  <span className="text-gray-900">8,500 /μL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Platelet Count</span>
                  <span className="text-gray-900">245,000 /μL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 bg-red-50">
                  <span className="text-gray-700">Glucose (Fasting)</span>
                  <span className="text-red-600">145 mg/dL ↑</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">BUN</span>
                  <span className="text-gray-900">18 mg/dL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Creatinine</span>
                  <span className="text-gray-900">1.1 mg/dL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Sodium</span>
                  <span className="text-gray-900">140 mEq/L</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">Potassium</span>
                  <span className="text-gray-900">4.2 mEq/L</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50">
                  <span className="text-gray-700">Troponin</span>
                  <span className="text-green-600">0.03 ng/mL ✓</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Pending Tests</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-yellow-900">Lipid Panel</div>
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs rounded">Scheduled</span>
                  </div>
                  <div className="text-sm text-yellow-700">Fasting required • Scheduled: Dec 9, 2025 - 06:00 AM</div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-blue-900">Chest X-Ray</div>
                    <span className="px-2 py-1 bg-blue-200 text-blue-900 text-xs rounded">Ordered</span>
                  </div>
                  <div className="text-sm text-blue-700">Follow-up to assess lung function • Portable</div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-blue-900">ECG</div>
                    <span className="px-2 py-1 bg-blue-200 text-blue-900 text-xs rounded">Ordered</span>
                  </div>
                  <div className="text-sm text-blue-700">Routine monitoring • 12-lead</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg border-2 border-green-300 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-green-600" />
                  <h2 className="text-green-900">Active Meal Plan</h2>
                  <span className="ml-auto px-2 py-1 bg-green-200 text-green-800 text-xs rounded">Current</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-green-700">Diet Type</div>
                    <div className="text-lg text-green-900">Diabetic, Cardiac</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-green-700">Daily Calories</div>
                      <div className="text-xl text-green-900">1800 kcal</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-green-700">Protein Target</div>
                      <div className="text-xl text-green-900">75g</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-green-700">Texture</div>
                    <div className="text-green-900">Regular</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-700">Feeding Route</div>
                    <div className="text-green-900">Oral</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-700">Restrictions</div>
                    <div className="text-green-900">
                      • Low sodium (&lt;2000mg/day)<br />
                      • Controlled carbohydrates<br />
                      • Low saturated fat
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-green-700">Created By</div>
                    <div className="text-green-900">Emily Martinez, RD • Dec 6, 2025</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <h2 className="text-gray-900">Recent Intake</h2>
                  <span className="text-xs text-gray-500">(Last 3 days)</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-700 mb-2">Dec 8, 2025</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-100 rounded p-2 border border-green-300">
                        <div className="text-xs text-green-700">Breakfast</div>
                        <div className="text-green-900">75%</div>
                      </div>
                      <div className="bg-yellow-100 rounded p-2 border border-yellow-300">
                        <div className="text-xs text-yellow-700">Lunch</div>
                        <div className="text-yellow-900">50%</div>
                      </div>
                      <div className="bg-gray-100 rounded p-2 border border-gray-300">
                        <div className="text-xs text-gray-700">Dinner</div>
                        <div className="text-gray-900">Pending</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-700 mb-2">Dec 7, 2025</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-100 rounded p-2 border border-green-300">
                        <div className="text-xs text-green-700">Breakfast</div>
                        <div className="text-green-900">100%</div>
                      </div>
                      <div className="bg-green-100 rounded p-2 border border-green-300">
                        <div className="text-xs text-green-700">Lunch</div>
                        <div className="text-green-900">85%</div>
                      </div>
                      <div className="bg-yellow-100 rounded p-2 border border-yellow-300">
                        <div className="text-xs text-yellow-700">Dinner</div>
                        <div className="text-yellow-900">60%</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-700 mb-2">Dec 6, 2025</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-red-100 rounded p-2 border border-red-300">
                        <div className="text-xs text-red-700">Breakfast</div>
                        <div className="text-red-900">25%</div>
                      </div>
                      <div className="bg-yellow-100 rounded p-2 border border-yellow-300">
                        <div className="text-xs text-yellow-700">Lunch</div>
                        <div className="text-yellow-900">50%</div>
                      </div>
                      <div className="bg-yellow-100 rounded p-2 border border-yellow-300">
                        <div className="text-xs text-yellow-700">Dinner</div>
                        <div className="text-yellow-900">65%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Plan Modification History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Meal Plan Modification History</h2>
              </div>
              
              <div className="space-y-4">
                {/* Most Recent Modification */}
                <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded font-medium">Modified</span>
                      <span className="text-sm text-gray-600">Dec 6, 2025 - 2:30 PM</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Emily Martinez, RD</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-3">
                    Meal plan updated to address cardiac concerns and diabetic management
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Previous Plan */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs font-medium text-gray-500 mb-3 uppercase">Previous Plan</div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-xs text-gray-500">Diet Type</div>
                          <div className="text-gray-700">Diabetic</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Calories</div>
                            <div className="text-gray-700 line-through">2000 kcal</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Protein</div>
                            <div className="text-gray-700 line-through">80g</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Restrictions</div>
                          <div className="text-gray-700">
                            • Controlled carbohydrates<br />
                            • Low sugar
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Plan */}
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                      <div className="text-xs font-medium text-green-700 mb-3 uppercase">Current Plan</div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-xs text-green-700">Diet Type</div>
                          <div className="text-green-900 font-medium bg-yellow-100 px-1 rounded">Diabetic, Cardiac</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-green-700">Calories</div>
                            <div className="text-green-900 font-medium bg-yellow-100 px-1 rounded">1800 kcal</div>
                          </div>
                          <div>
                            <div className="text-xs text-green-700">Protein</div>
                            <div className="text-green-900 font-medium bg-yellow-100 px-1 rounded">75g</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-green-700">Restrictions</div>
                          <div className="text-green-900">
                            • Low sodium (&lt;2000mg)<br />
                            • Controlled carbohydrates<br />
                            • Low saturated fat
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-blue-800">
                      <span className="font-medium">Changes made:</span> Reduced caloric intake from 2000 to 1800 kcal, 
                      reduced protein from 80g to 75g, added cardiac dietary restrictions (low sodium, low saturated fat)
                    </div>
                  </div>
                </div>

                {/* Previous Modification */}
                <div className="border-l-4 border-gray-300 pl-4 py-3 bg-gray-50 rounded-r">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded font-medium">Created</span>
                      <span className="text-sm text-gray-600">Dec 1, 2025 - 9:15 AM</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Dr. Wilson</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-3">
                    Initial meal plan created upon patient admission
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Initial Plan */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs font-medium text-gray-500 mb-3 uppercase">Initial Plan</div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-xs text-gray-500">Diet Type</div>
                          <div className="text-gray-700">Diabetic</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Calories</div>
                            <div className="text-gray-700">2000 kcal</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Protein</div>
                            <div className="text-gray-700">80g</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Texture</div>
                          <div className="text-gray-700">Regular</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Feeding Route</div>
                          <div className="text-gray-700">Oral</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500 text-sm">
                        <div className="mb-2">Initial creation</div>
                        <div className="text-xs">No previous plan to compare</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-5 h-5 text-gray-600" />
              <h2 className="text-gray-900">Clinical Notes</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Dec 8, 2025 - 08:30 AM</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Dr. Johnson</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Progress Note</span>
                </div>
                <p className="text-gray-700">
                  Patient showing improvement in respiratory function. SpO2 stable at 95-97% on 2L O2. 
                  Continue current treatment plan. Plan to wean oxygen if stable over next 24 hours.
                  Chest clear to auscultation bilaterally. No signs of respiratory distress.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Dec 8, 2025 - 06:00 AM</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Nurse Rodriguez</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Nursing Note</span>
                </div>
                <p className="text-gray-700">
                  Vital signs stable overnight. Patient rested well with minimal interruptions. 
                  Breakfast intake 75%. No complaints of pain or discomfort. Ambulated to chair with minimal assistance. 
                  IV site clean and dry, no signs of infiltration or infection.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Dec 7, 2025 - 02:00 PM</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Emily Martinez, RD</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Nutrition Note</span>
                </div>
                <p className="text-gray-700">
                  Nutrition assessment completed. Patient requires diabetic cardiac diet with controlled portions. 
                  Target 1800 kcal/day with emphasis on complex carbs and lean protein. Low sodium restriction important 
                  for cardiac health. Education provided regarding food choices and portion control. Patient verbalized understanding.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Dec 7, 2025 - 10:00 AM</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Sarah Johnson, PT</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Therapy Note</span>
                </div>
                <p className="text-gray-700">
                  Initial evaluation completed. Patient demonstrates decreased endurance and mild deconditioning. 
                  Able to ambulate 50 feet with rolling walker and minimal assistance. Recommend continued mobility exercises 
                  and progressive ambulation program. Patient motivated and cooperative with treatment.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4 py-3 bg-cyan-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Dec 6, 2025 - 04:00 PM</span>
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded">Dr. Thompson</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Radiology Report</span>
                </div>
                <p className="text-gray-700">
                  Chest X-ray shows improvement from previous study. No acute cardiopulmonary process identified. 
                  Lungs are clear. Heart size is normal. No pleural effusion or pneumothorax. 
                  Comparison with prior study dated Dec 5 shows resolving infiltrate in right lower lobe.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Monitors Tab */}
        {activeTab === 'monitors' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-gray-600" />
              <h2 className="text-gray-900">Live Monitors</h2>
            </div>
            <div className="space-y-4">
              <LiveMonitors patientId={patient.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
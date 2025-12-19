import { X, TrendingUp, TrendingDown, Activity, Utensils, AlertTriangle, Apple, Scale, Droplet } from 'lucide-react';
import { useState } from 'react';
import { mockPatients } from '../../data/mockData';
import { nurseMealIntakeSubmissions } from '../../data/sharedWorkflowData';

interface NutritionistPatientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | null;
}

type TabType = 'overview' | 'meal-plans' | 'intake-history' | 'restrictions' | 'assessments' | 'orders';

export function NutritionistPatientDrawer({ isOpen, onClose, patientId }: NutritionistPatientDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  const patient = patientId ? mockPatients.find(p => p.id === patientId) : null;
  
  if (!isOpen || !patient) return null;

  // Get patient's meal intake submissions
  const patientIntakeSubmissions = nurseMealIntakeSubmissions.filter(s => s.patientId === patient.id);
  
  // Mock nutritional data
  const nutritionalStatus = {
    caloriesTarget: 2000,
    caloriesActual: 1650,
    proteinTarget: 80,
    proteinActual: 68,
    fluidTarget: 2000,
    fluidActual: 1800,
    bmi: 24.5,
    weight: 72,
    heightCm: 170,
    intakePercentage: 83
  };

  const dietaryRestrictions = [
    { type: 'Allergy', item: 'Peanuts', severity: 'Critical' },
    { type: 'Intolerance', item: 'Lactose', severity: 'Moderate' },
    { type: 'Religious', item: 'No Pork', severity: 'Required' }
  ];

  const activeMealPlan = {
    name: 'Heart Healthy - Low Sodium',
    startDate: '2025-12-01',
    texture: 'Regular',
    consistency: 'Normal',
    calories: 2000,
    protein: 80,
    sodium: 2000,
    fluid: 2000,
    frequency: '3 meals + 2 snacks'
  };

  const recentAssessments = [
    { date: '2025-12-07', type: 'Full Nutritional Assessment', score: 'Moderate Risk', assessor: 'Dietitian Sarah' },
    { date: '2025-12-05', type: 'Swallow Assessment', score: 'Normal', assessor: 'SLP Jennifer' },
    { date: '2025-12-03', type: 'Weight Check', score: '72kg (↓2kg)', assessor: 'Nurse Robert' }
  ];

  const mealOrders = [
    { meal: 'Breakfast', time: '8:00 AM', status: 'Delivered', intake: '100%' },
    { meal: 'Morning Snack', time: '10:00 AM', status: 'Delivered', intake: '75%' },
    { meal: 'Lunch', time: '12:30 PM', status: 'Delivered', intake: '90%' },
    { meal: 'Afternoon Snack', time: '3:00 PM', status: 'Pending', intake: '-' },
    { meal: 'Dinner', time: '6:00 PM', status: 'Pending', intake: '-' }
  ];

  const intakeHistory = [
    { date: '2025-12-07', avgIntake: 88, calories: 1760, protein: 70, status: 'Good' },
    { date: '2025-12-06', avgIntake: 75, calories: 1500, protein: 60, status: 'Fair' },
    { date: '2025-12-05', avgIntake: 92, calories: 1840, protein: 74, status: 'Good' },
    { date: '2025-12-04', avgIntake: 68, calories: 1360, protein: 54, status: 'Poor' },
    { date: '2025-12-03', avgIntake: 85, calories: 1700, protein: 68, status: 'Good' }
  ];

  const getIntakeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-900 bg-green-50';
    if (percentage >= 60) return 'text-yellow-900 bg-yellow-50';
    return 'text-red-900 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Good') return 'text-green-700 bg-green-50';
    if (status === 'Fair') return 'text-yellow-700 bg-yellow-50';
    return 'text-red-700 bg-red-50';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'meal-plans', label: 'Meal Plans', icon: Utensils },
    { id: 'intake-history', label: 'Intake History', icon: TrendingUp },
    { id: 'restrictions', label: 'Restrictions', icon: AlertTriangle },
    { id: 'assessments', label: 'Assessments', icon: Apple },
    { id: 'orders', label: 'Meal Orders', icon: Utensils }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-3xl h-full overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-gray-900">{patient.name}</h2>
              <span className="text-sm text-gray-600">{patient.bedNumber}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                patient.severity === 'critical' ? 'bg-red-100 text-red-800' :
                patient.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                patient.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {patient.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{patient.age}y | {patient.diagnosis}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 bg-white sticky top-[88px] z-10">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Current Nutritional Status */}
              <div>
                <h3 className="text-gray-900 mb-4">Current Nutritional Status</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Calories */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xs text-blue-600 mb-2">Calories (24h)</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl text-blue-900">{nutritionalStatus.caloriesActual}</span>
                      <span className="text-sm text-blue-700">/ {nutritionalStatus.caloriesTarget} kcal</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((nutritionalStatus.caloriesActual / nutritionalStatus.caloriesTarget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      {Math.round((nutritionalStatus.caloriesActual / nutritionalStatus.caloriesTarget) * 100)}% of target
                    </div>
                  </div>

                  {/* Protein */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xs text-purple-600 mb-2">Protein (24h)</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl text-purple-900">{nutritionalStatus.proteinActual}g</span>
                      <span className="text-sm text-purple-700">/ {nutritionalStatus.proteinTarget}g</span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${Math.min((nutritionalStatus.proteinActual / nutritionalStatus.proteinTarget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-purple-700 mt-1">
                      {Math.round((nutritionalStatus.proteinActual / nutritionalStatus.proteinTarget) * 100)}% of target
                    </div>
                  </div>

                  {/* Fluids */}
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="text-xs text-cyan-600 mb-2">Fluids (24h)</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl text-cyan-900">{nutritionalStatus.fluidActual}ml</span>
                      <span className="text-sm text-cyan-700">/ {nutritionalStatus.fluidTarget}ml</span>
                    </div>
                    <div className="w-full bg-cyan-200 rounded-full h-2">
                      <div 
                        className="bg-cyan-600 h-2 rounded-full"
                        style={{ width: `${Math.min((nutritionalStatus.fluidActual / nutritionalStatus.fluidTarget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-cyan-700 mt-1">
                      {Math.round((nutritionalStatus.fluidActual / nutritionalStatus.fluidTarget) * 100)}% of target
                    </div>
                  </div>
                </div>
              </div>

              {/* Anthropometric Data */}
              <div>
                <h3 className="text-gray-900 mb-4">Anthropometric Data</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Weight</div>
                    <div className="text-2xl text-gray-900">{nutritionalStatus.weight}kg</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Height</div>
                    <div className="text-2xl text-gray-900">{nutritionalStatus.heightCm}cm</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">BMI</div>
                    <div className="text-2xl text-gray-900">{nutritionalStatus.bmi}</div>
                    <div className="text-xs text-green-600 mt-1">Normal</div>
                  </div>
                </div>
              </div>

              {/* Overall Intake Status */}
              <div>
                <h3 className="text-gray-900 mb-4">Overall Intake Status</h3>
                <div className={`rounded-lg p-4 ${getIntakeColor(nutritionalStatus.intakePercentage)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Average Meal Intake (24h)</div>
                      <div className="text-xs mt-1">Based on documented meals</div>
                    </div>
                    <div className="text-3xl font-bold">{nutritionalStatus.intakePercentage}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meal-plans' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Active Meal Plan</h3>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-gray-900">{activeMealPlan.name}</h4>
                      <p className="text-sm text-gray-600">Started {activeMealPlan.startDate}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm font-medium">Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-2">Diet Specifications</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Texture:</span>
                          <span className="text-gray-900">{activeMealPlan.texture}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Consistency:</span>
                          <span className="text-gray-900">{activeMealPlan.consistency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Frequency:</span>
                          <span className="text-gray-900">{activeMealPlan.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-2">Daily Targets</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Calories:</span>
                          <span className="text-gray-900">{activeMealPlan.calories} kcal</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Protein:</span>
                          <span className="text-gray-900">{activeMealPlan.protein}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sodium:</span>
                          <span className="text-gray-900">{activeMealPlan.sodium}mg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fluid:</span>
                          <span className="text-gray-900">{activeMealPlan.fluid}ml</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intake-history' && (
            <div className="space-y-4">
              <h3 className="text-gray-900">7-Day Intake History</h3>
              {intakeHistory.map((day, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-gray-900">{day.date}</div>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(day.status)}`}>
                      {day.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Avg Intake</div>
                      <div className="text-xl text-gray-900">{day.avgIntake}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Calories</div>
                      <div className="text-xl text-gray-900">{day.calories}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Protein</div>
                      <div className="text-xl text-gray-900">{day.protein}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'restrictions' && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Dietary Restrictions & Allergies</h3>
              {dietaryRestrictions.map((restriction, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        restriction.severity === 'Critical' ? 'text-red-600' :
                        restriction.severity === 'Moderate' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                      <div>
                        <h4 className="text-gray-900">{restriction.item}</h4>
                        <p className="text-sm text-gray-600 mt-1">{restriction.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-medium ${
                      restriction.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      restriction.severity === 'Moderate' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {restriction.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Recent Nutritional Assessments</h3>
              {recentAssessments.map((assessment, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-gray-900">{assessment.type}</h4>
                    <span className="text-sm text-gray-600">{assessment.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Result: <span className="text-gray-900 font-medium">{assessment.score}</span></span>
                    <span className="text-gray-600">By {assessment.assessor}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Today&apos;s Meal Orders</h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-gray-600">Meal</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-600">Time</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-600">Intake</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mealOrders.map((order, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900">{order.meal}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.time}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{order.intake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

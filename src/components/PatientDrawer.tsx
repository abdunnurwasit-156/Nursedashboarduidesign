import { X, Heart, Droplet, Activity, Wind, Thermometer, User, AlertTriangle, FileText, TrendingUp, Pill, CheckSquare, Utensils, Clock } from 'lucide-react';
import { PatientFullDetails } from './PatientFullDetails';
import { useState } from 'react';
import { mockPatients, mockMedications, mockTests } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface QuickAction {
  id: string;
  label: string;
  checked: boolean;
  timestamp?: Date;
}

interface PatientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | null;
  userRole?: string;
}

export function PatientDrawer({ isOpen, onClose, patientId, userRole }: PatientDrawerProps) {
  const [timeRange, setTimeRange] = useState<'1h' | '3h' | '12h'>('1h');
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    { id: 'checked', label: 'Checked patient', checked: false },
    { id: 'repositioned', label: 'Repositioned patient', checked: false },
    { id: 'oxygen', label: 'Gave oxygen', checked: false },
    { id: 'suction', label: 'Performed suction', checked: false },
    { id: 'probe', label: 'Verified probes', checked: false }
  ]);
  const [actionNotes, setActionNotes] = useState('');
  
  // Meal intake tracking state
  const [mealIntake, setMealIntake] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });
  const [intakeSaved, setIntakeSaved] = useState(false);

  // Find the patient from mockPatients
  const patient = patientId ? mockPatients.find(p => p.id === patientId) : null;
  
  if (!isOpen || !patient) return null;

  const patientMedications = mockMedications.filter(m => m.patientId === patient.id);
  const patientTests = mockTests.filter(t => t.patientId === patient.id);

  const handleToggleAction = (id: string) => {
    setQuickActions(quickActions.map(action =>
      action.id === id
        ? { ...action, checked: !action.checked, timestamp: !action.checked ? new Date() : undefined }
        : action
    ));
  };

  const handleSaveActions = () => {
    console.log('Saving actions:', quickActions.filter(a => a.checked), actionNotes);
    alert('Actions logged successfully');
    setQuickActions(quickActions.map(a => ({ ...a, checked: false, timestamp: undefined })));
    setActionNotes('');
  };

  const handleSaveMealIntake = () => {
    console.log('Saving meal intake:', mealIntake);
    setIntakeSaved(true);
    setTimeout(() => setIntakeSaved(false), 3000);
  };

  const getIntakeColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-emerald-100 border-emerald-200 text-emerald-800';
    if (percentage >= 50) return 'bg-amber-100 border-amber-200 text-amber-800';
    if (percentage > 0) return 'bg-red-100 border-red-200 text-red-800';
    return 'bg-slate-100 border-slate-200 text-slate-600';
  };

  // Generate vitals trend data based on time range
  const generateVitalsData = () => {
    const points = timeRange === '1h' ? 12 : timeRange === '3h' ? 18 : 24;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      hr: patient.vitals.hr + (Math.random() - 0.5) * 10,
      spo2: patient.vitals.spo2 + (Math.random() - 0.5) * 3,
      bp: parseInt(patient.vitals.bp.split('/')[0]) + (Math.random() - 0.5) * 15
    }));
  };

  const vitalsData = generateVitalsData();

  const severityColors = {
    stable: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-500 bg-amber-50 text-amber-700',
    moderate: 'border-orange-500 bg-orange-50 text-orange-700',
    critical: 'border-red-500 bg-red-50 text-red-700'
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200">
        {/* Header */}
        <div className={`sticky top-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b z-10 px-6 py-5`}>
          <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-mono text-lg font-bold shadow-sm">
                 {patient.bedNumber}
               </div>
               <div>
                 <h2 className="text-xl font-bold text-slate-900 leading-tight">{patient.name}</h2>
                 <p className="text-sm text-slate-500">{patient.age} yrs • {patient.gender} • {patient.diagnosis}</p>
               </div>
             </div>
             <Button
               variant="ghost"
               size="icon"
               onClick={onClose}
               className="text-slate-400 hover:text-slate-700 hover:bg-slate-100"
             >
               <X className="w-5 h-5" />
             </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${severityColors[patient.severity]} capitalize font-semibold px-3 py-1`}>
              {patient.severity} Condition
            </Badge>
            {patient.alerts.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {patient.alerts.length} Active Alerts
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Current Vitals */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Current Vitals
              </h3>
              <span className="text-xs text-slate-400 font-mono">Last updated: 2m ago</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-l-4 border-l-red-500 shadow-sm bg-white">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1 text-slate-500">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Heart Rate</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{patient.vitals.hr}</span>
                    <span className="text-xs text-slate-500 font-medium">bpm</span>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-l-blue-500 shadow-sm bg-white">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1 text-slate-500">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">BP</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{patient.vitals.bp}</span>
                    <span className="text-xs text-slate-500 font-medium">mmHg</span>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-l-cyan-500 shadow-sm bg-white">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1 text-slate-500">
                    <Droplet className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">SpO₂</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{patient.vitals.spo2}</span>
                    <span className="text-xs text-slate-500 font-medium">%</span>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-white">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1 text-slate-500">
                    <Wind className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Resp Rate</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{patient.vitals.rr}</span>
                    <span className="text-xs text-slate-500 font-medium">/min</span>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-l-orange-500 shadow-sm bg-white col-span-2">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-slate-500">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-medium uppercase tracking-wider">Temperature</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{patient.vitals.temp}</span>
                      <span className="text-xs text-slate-500 font-medium">°C</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    Fever Threshold: 37.5°C
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <Button
            onClick={() => setShowFullDetails(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            size="lg"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Complete Patient Record
          </Button>

          {/* Vitals Trends */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-500" />
                Vitals Trends
              </h3>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {['1h', '3h', '12h'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      timeRange === range 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <Card className="shadow-sm border-slate-200">
              <div className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="hr" stroke="#ef4444" name="HR (bpm)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="spo2" stroke="#06b6d4" name="SpO₂ (%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </section>

          <Separator className="bg-slate-200" />

          {/* Medications */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-slate-500" />
                Medications
              </h3>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                {patientMedications.length} Active
              </Badge>
            </div>
            
            {patientMedications.length > 0 ? (
              <div className="space-y-3">
                {patientMedications.map((med) => (
                  <Card key={med.id} className="shadow-sm border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-slate-900">{med.name}</div>
                          <div className="text-xs text-slate-500">{med.dose} • {med.route}</div>
                        </div>
                        <Badge variant={med.status === 'due' ? 'destructive' : 'secondary'} className={
                          med.status === 'due' ? '' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }>
                          {med.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {med.scheduledTime}
                        </div>
                        {med.status === 'due' && (
                          <Button size="sm" variant="outline" className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                            Mark Administered
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <p className="text-sm text-slate-500">No medications scheduled</p>
              </div>
            )}
          </section>

          {/* Tests */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Tests & Reports
              </h3>
            </div>
            {patientTests.length > 0 ? (
              <div className="space-y-3">
                {patientTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        test.status === 'sample-needed' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{test.testName}</div>
                        <div className="text-xs text-slate-500">{test.type}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`
                      ${test.status === 'sample-needed' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                        test.status === 'completed' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                        'text-slate-700 border-slate-200 bg-slate-50'}
                    `}>
                      {test.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
               <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <p className="text-sm text-slate-500">No tests ordered</p>
              </div>
            )}
          </section>

          <Separator className="bg-slate-200" />

          {/* Quick Actions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-4 h-4 text-slate-500" />
              <h3 className="text-base font-semibold text-slate-900">Nurse Quick Actions</h3>
            </div>
            <Card className="bg-slate-50/50 border-slate-200 shadow-sm">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                    >
                      <Checkbox 
                        id={action.id} 
                        checked={action.checked}
                        onCheckedChange={() => handleToggleAction(action.id)}
                      />
                      <label 
                        htmlFor={action.id}
                        className="flex-1 text-sm font-medium text-slate-700 cursor-pointer select-none"
                      >
                        {action.label}
                      </label>
                      {action.timestamp && (
                        <span className="text-xs text-slate-400 font-mono">
                          {action.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <Textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder="Add optional notes about care provided..."
                  className="bg-white resize-none"
                  rows={2}
                />
                
                <Button
                  onClick={handleSaveActions}
                  disabled={!quickActions.some(a => a.checked) && !actionNotes}
                  className="w-full"
                >
                  Log Actions
                </Button>
              </div>
            </Card>
          </section>

          {/* Meal Intake Tracking */}
          <section className="pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-4 h-4 text-slate-500" />
              <h3 className="text-base font-semibold text-slate-900">Meal Intake Tracking</h3>
            </div>
            <Card className="border-slate-200 shadow-sm overflow-hidden">
               <div className="bg-slate-50/50 p-3 border-b border-slate-100">
                 <p className="text-xs text-slate-500">
                   Document percentage of meal consumed for Nutritionist review.
                 </p>
               </div>
               <div className="p-4 space-y-6">
                  {/* Breakfast */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Breakfast</span>
                      <Badge variant="outline" className={getIntakeColor(mealIntake.breakfast)}>
                        {mealIntake.breakfast}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 25, 50, 75, 100].map(percent => (
                        <button
                          key={`breakfast-${percent}`}
                          onClick={() => setMealIntake({ ...mealIntake, breakfast: percent })}
                          className={`py-2 rounded-md text-xs font-semibold transition-all ${
                            mealIntake.breakfast === percent
                              ? 'bg-blue-600 text-white shadow-md transform scale-105'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lunch */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Lunch</span>
                      <Badge variant="outline" className={getIntakeColor(mealIntake.lunch)}>
                        {mealIntake.lunch}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 25, 50, 75, 100].map(percent => (
                        <button
                          key={`lunch-${percent}`}
                          onClick={() => setMealIntake({ ...mealIntake, lunch: percent })}
                          className={`py-2 rounded-md text-xs font-semibold transition-all ${
                            mealIntake.lunch === percent
                              ? 'bg-blue-600 text-white shadow-md transform scale-105'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dinner */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Dinner</span>
                      <Badge variant="outline" className={getIntakeColor(mealIntake.dinner)}>
                        {mealIntake.dinner}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 25, 50, 75, 100].map(percent => (
                        <button
                          key={`dinner-${percent}`}
                          onClick={() => setMealIntake({ ...mealIntake, dinner: percent })}
                          className={`py-2 rounded-md text-xs font-semibold transition-all ${
                            mealIntake.dinner === percent
                              ? 'bg-blue-600 text-white shadow-md transform scale-105'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveMealIntake}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Save Intake Record
                  </Button>

                  {intakeSaved && (
                    <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg flex items-center justify-center animate-in fade-in duration-300">
                       Record saved successfully
                    </div>
                  )}
               </div>
            </Card>
          </section>
        </div>
      </div>

      {/* Full Details Screen */}
      <PatientFullDetails
        isOpen={showFullDetails}
        onClose={() => setShowFullDetails(false)}
        patient={patient}
        userRole={userRole as any}
      />
    </>
  );
}
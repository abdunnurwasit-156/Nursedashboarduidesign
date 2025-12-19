import { useState } from 'react';
import { X, Heart, Activity, FileText, Pill, ClipboardList, TrendingUp, Calendar, Clock, AlertCircle, Plus, Search } from 'lucide-react';
import { mockPatients, mockMedications, mockTests } from '../../data/mockData';
import { mockProgressNotes, mockTreatmentPlans } from '../../data/doctorMockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { PatientFullDetails } from '../PatientFullDetails';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '../ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface PatientChartProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | null;
}

export function PatientChart({ isOpen, onClose, patientId }: PatientChartProps) {
  const [activeTab, setActiveTab] = useState('vitals');
  const [timeRange, setTimeRange] = useState<'24h' | '3d' | '7d' | '30d'>('24h');
  const [newNote, setNewNote] = useState('');
  const [showFullDetails, setShowFullDetails] = useState(false);

  if (!isOpen || !patientId) return null;

  const patient = mockPatients.find(p => p.id === patientId);
  if (!patient) return null;

  const patientMedications = mockMedications.filter(m => m.patientId === patientId);
  const patientTests = mockTests.filter(t => t.patientId === patientId);
  const patientNotes = mockProgressNotes.filter(n => n.patientId === patientId);
  const treatmentPlan = mockTreatmentPlans.find(tp => tp.patientId === patientId);

  // Generate extended vitals data
  const generateVitalsData = () => {
    const points = timeRange === '24h' ? 24 : timeRange === '3d' ? 36 : timeRange === '7d' ? 42 : 60;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      hr: patient.vitals.hr + (Math.random() - 0.5) * 15,
      spo2: patient.vitals.spo2 + (Math.random() - 0.5) * 5,
      bp_sys: parseInt(patient.vitals.bp.split('/')[0]) + (Math.random() - 0.5) * 20,
      bp_dia: parseInt(patient.vitals.bp.split('/')[1]) + (Math.random() - 0.5) * 10,
      temp: patient.vitals.temp + (Math.random() - 0.5) * 1
    }));
  };

  const vitalsData = generateVitalsData();

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Adding progress note:', newNote);
      // In a real app, this would make an API call
      setNewNote('');
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-4xl p-0 flex flex-col gap-0 overflow-hidden bg-slate-50">
          <SheetHeader className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <SheetTitle className="text-xl font-bold text-slate-900">{patient.name}</SheetTitle>
                    <Badge variant="outline" className="text-slate-500 font-mono">
                      {patient.bedNumber}
                    </Badge>
                    <Badge className={
                      patient.severity === 'critical' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                      patient.severity === 'moderate' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                      'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                    }>
                      {patient.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <SheetDescription className="mt-1 flex items-center gap-3 text-slate-500">
                    <span>{patient.age} years old</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{patient.diagnosis}</span>
                  </SheetDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFullDetails(true)}>
                <FileText className="w-4 h-4 mr-2" />
                Full Details
              </Button>
            </div>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <div className="px-6 bg-white border-b border-slate-200">
              <TabsList className="bg-transparent h-12 w-full justify-start gap-6 p-0">
                <TabsTrigger value="vitals" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-0">
                  <Activity className="w-4 h-4 mr-2" />
                  Vitals
                </TabsTrigger>
                <TabsTrigger value="medications" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-0">
                  <Pill className="w-4 h-4 mr-2" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="tests" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-0">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Tests & Results
                </TabsTrigger>
                <TabsTrigger value="treatment" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-0">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Care Plan
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-0">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 bg-slate-50">
              <div className="p-6">
                <TabsContent value="vitals" className="mt-0 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Trends & Vitals</h3>
                    <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                      {(['24h', '3d', '7d', '30d'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            timeRange === range ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500" /> Heart Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-slate-900">{patient.vitals.hr} <span className="text-sm font-normal text-slate-500">bpm</span></div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" /> +2% from avg
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-500" /> Blood Pressure
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-slate-900">{patient.vitals.bp} <span className="text-sm font-normal text-slate-500">mmHg</span></div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                          Stable
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-500" /> SpO2
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-slate-900">{patient.vitals.spo2}%</div>
                        <p className="text-xs text-red-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> -1% from avg
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-orange-500" /> Temp
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-slate-900">{patient.vitals.temp}°C</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                          Stable
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Heart Rate & SpO₂</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={vitalsData}>
                              <defs>
                                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="time" hide />
                              <YAxis />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                              />
                              <Legend />
                              <Area type="monotone" dataKey="hr" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorHr)" name="Heart Rate" />
                              <Area type="monotone" dataKey="spo2" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSpo2)" name="SpO2" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Blood Pressure</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={vitalsData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="time" hide />
                              <YAxis domain={['auto', 'auto']} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                              />
                              <Legend />
                              <Line type="monotone" dataKey="bp_sys" stroke="#3b82f6" strokeWidth={2} dot={false} name="Systolic" />
                              <Line type="monotone" dataKey="bp_dia" stroke="#60a5fa" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Diastolic" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="medications" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-900">Active Medications</h3>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Prescribe New
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {patientMedications.map(med => (
                      <Card key={med.id} className="overflow-hidden">
                        <div className="flex items-center">
                          <div className={`w-2 self-stretch ${
                            med.status === 'completed' ? 'bg-emerald-500' : 
                            med.status === 'missed' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          <div className="p-4 flex-1 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-slate-900">{med.name}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {med.dose}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {med.frequency}
                                </span>
                                <span>Next: {med.scheduledTime}</span>
                              </div>
                            </div>
                            <Badge variant={med.status === 'completed' ? 'default' : 'outline'} className={
                              med.status === 'completed' ? 'bg-emerald-600 hover:bg-emerald-700' : 
                              med.status === 'missed' ? 'text-red-600 border-red-200 bg-red-50' :
                              'text-blue-600 border-blue-200 bg-blue-50'
                            }>
                              {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {patientMedications.length === 0 && (
                      <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200 border-dashed">
                        No active medications
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-900">Lab & Radiology Results</h3>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Order Test
                    </Button>
                  </div>
                  <div className="space-y-4">
                     {patientTests.map(test => (
                      <Card key={test.id}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                             <div>
                               <CardTitle className="text-base text-slate-900">{test.testName}</CardTitle>
                               <CardDescription className="text-xs">
                                 Ordered on {new Date(test.orderedTime).toLocaleDateString()}
                               </CardDescription>
                             </div>
                             <Badge variant="outline" className={
                               test.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                               test.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                               'bg-amber-50 text-amber-700 border-amber-200'
                             }>
                               {test.status === 'sample-needed' ? 'Sample Needed' : 
                                test.status === 'in-progress' ? 'In Progress' : 
                                test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                             </Badge>
                          </div>
                        </CardHeader>
                        <CardFooter className="p-4 pt-2">
                          <div className="w-full flex justify-end gap-2">
                             {test.status === 'completed' && (
                               <Button variant="outline" size="sm" className="h-8">View Report</Button>
                             )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Progress Notes</h3>
                      {patientNotes.map(note => (
                        <Card key={note.id}>
                          <CardHeader className="p-4 pb-2 bg-slate-50/50 border-b border-slate-100">
                             <div className="flex justify-between items-center">
                               <div className="flex items-center gap-2">
                                 <Avatar className="h-6 w-6">
                                   <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${note.author}`} />
                                   <AvatarFallback>{note.author.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                 <span className="text-sm font-semibold text-slate-900">{note.author}</span>
                                 <Badge variant="secondary" className="text-[10px] h-5">{note.role}</Badge>
                               </div>
                               <span className="text-xs text-slate-500">{note.timestamp.toLocaleString()}</span>
                             </div>
                          </CardHeader>
                          <CardContent className="p-4 text-sm text-slate-700 leading-relaxed">
                            {note.content}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <Card className="sticky top-6">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-sm font-semibold">New Note</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <Textarea 
                            placeholder="Enter clinical observations..." 
                            className="min-h-[150px] mb-4"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                          />
                          <Button className="w-full" onClick={handleAddNote} disabled={!newNote.trim()}>
                            Add Note
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="mt-0">
                   {treatmentPlan ? (
                     <div className="space-y-6">
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader className="p-4">
                            <CardTitle className="text-blue-900 text-lg">Primary Goal</CardTitle>
                            <CardDescription className="text-blue-700">
                              {treatmentPlan.expectedOutcome}
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                             <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-indigo-500" />
                               Clinical Goals
                             </h4>
                             <ul className="space-y-2">
                               {treatmentPlan.goals.map((goal, i) => (
                                 <li key={i} className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                   {goal}
                                 </li>
                               ))}
                             </ul>
                          </div>

                          <div className="space-y-4">
                             <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500" />
                               Interventions
                             </h4>
                             <ul className="space-y-2">
                               {treatmentPlan.interventions.map((item, i) => (
                                 <li key={i} className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                   {item}
                                 </li>
                               ))}
                             </ul>
                          </div>

                          <div className="space-y-4">
                             <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-orange-500" />
                               Monitoring
                             </h4>
                             <ul className="space-y-2">
                               {treatmentPlan.monitoring.map((item, i) => (
                                 <li key={i} className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                   {item}
                                 </li>
                               ))}
                             </ul>
                          </div>
                        </div>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                       <TrendingUp className="w-12 h-12 mb-3 opacity-20" />
                       <p>No active treatment plan found</p>
                       <Button variant="link">Create Plan</Button>
                     </div>
                   )}
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </SheetContent>
      </Sheet>

      <PatientFullDetails
        isOpen={showFullDetails}
        onClose={() => setShowFullDetails(false)}
        patient={patient}
        userRole="doctor"
      />
    </>
  );
}
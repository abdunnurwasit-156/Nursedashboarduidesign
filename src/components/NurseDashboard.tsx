import { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity, 
  Droplet, 
  ClipboardList,
  ArrowRight,
  Filter,
  MoreVertical
} from 'lucide-react';
import { mockPatients, mockAlerts, mockMedications, mockTests } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function NurseDashboard() {
  const [timeRange, setTimeRange] = useState('shift');

  const criticalPatients = mockPatients.filter(p => p.severity === 'critical');
  const warningPatients = mockPatients.filter(p => p.severity === 'warning');
  const activeAlerts = mockAlerts.filter(a => !a.acknowledged);
  const medicationsDue = mockMedications.filter(m => m.status === 'due');
  const pendingTests = mockTests.filter(t => t.status === 'sample-needed');

  const getShiftProgress = () => {
    return 65; 
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">My Patients</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{mockPatients.length}</h3>
              <p className="text-xs font-medium text-red-600 mt-1 bg-red-50 inline-block px-1.5 py-0.5 rounded">
                {criticalPatients.length} Critical
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Alerts</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{activeAlerts.length}</h3>
              <p className="text-xs font-medium text-amber-600 mt-1 bg-amber-50 inline-block px-1.5 py-0.5 rounded">
                {activeAlerts.filter(a => a.severity === 'critical').length} Urgent
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tasks Due</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {medicationsDue.length + pendingTests.length}
              </h3>
              <p className="text-xs font-medium text-orange-600 mt-1 bg-orange-50 inline-block px-1.5 py-0.5 rounded">
                {medicationsDue.length} Meds Pending
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
              <ClipboardList className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Shift Progress</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{getShiftProgress()}%</h3>
              <Progress value={getShiftProgress()} className="h-1.5 mt-2 w-24 bg-slate-100" />
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Patients & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">Priority Attention</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500 hover:text-slate-900">
                View All
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {activeAlerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                    <div className="mt-1 bg-red-100 p-1.5 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-900">{alert.patientName}</h4>
                        <Badge variant="outline" className="bg-white border-red-200 text-red-700 font-mono">
                          {alert.bedNumber}
                        </Badge>
                      </div>
                      <p className="text-sm text-red-800 font-medium">{alert.trigger}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor((Date.now() - alert.time.getTime()) / 60000)} mins ago
                      </p>
                    </div>
                    <Button size="sm" variant="destructive" className="h-8 shadow-sm">Acknowledge</Button>
                  </div>
                ))}
                
                {criticalPatients.map(patient => (
                  <div key={patient.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-12 bg-red-500 rounded-full" />
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {patient.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">{patient.bedNumber}</span>
                          <span className="text-slate-300">•</span>
                          <span className="truncate max-w-[200px]">{patient.diagnosis}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">HR</div>
                        <div className={`font-mono font-semibold ${patient.vitals.hr > 120 ? 'text-red-600' : 'text-slate-700'}`}>
                          {patient.vitals.hr}
                        </div>
                      </div>
                      <div className="text-center hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">BP</div>
                        <div className="font-mono font-semibold text-slate-700">{patient.vitals.bp}</div>
                      </div>
                      <div className="text-center hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">SpO₂</div>
                        <div className={`font-mono font-semibold ${patient.vitals.spo2 < 92 ? 'text-red-600' : 'text-slate-700'}`}>
                          {patient.vitals.spo2}%
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-blue-600">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {medicationsDue.slice(0, 3).map(med => (
                  <div key={med.id} className="flex items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg mr-4 border border-blue-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{med.patientName}</h4>
                      <p className="text-sm text-slate-500">{med.name} • {med.dose}</p>
                    </div>
                    <Badge variant={med.status === 'overdue' ? 'destructive' : 'secondary'} className="shadow-none">
                      {med.status === 'due' ? 'Due Now' : 'Overdue'}
                    </Badge>
                  </div>
                ))}
                {pendingTests.slice(0, 2).map(test => (
                  <div key={test.id} className="flex items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg mr-4 border border-purple-100">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{test.patientName}</h4>
                      <p className="text-sm text-slate-500">{test.testName}</p>
                    </div>
                    <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                      Sample Needed
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Tools */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Department Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Bed Occupancy</span>
                    <span className="font-bold text-slate-900">85%</span>
                  </div>
                  <Progress value={85} className="h-2.5 bg-slate-100" />
                  <p className="text-xs text-slate-400 mt-2 text-right">17/20 Beds Full</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Staff on Duty</span>
                    <span className="font-bold text-slate-900">12 / 15</span>
                  </div>
                  <Progress value={80} className="h-2.5 bg-slate-100" />
                </div>
                
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200">
                      <Activity className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-xs font-medium">Record Vitals</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200">
                      <ClipboardList className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-xs font-medium">Add Note</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200">
                      <Droplet className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-xs font-medium">Request Labs</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200">
                      <Clock className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-xs font-medium">Handover</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-900/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                 <h3 className="font-bold text-lg">Shift Handover</h3>
                 <p className="text-blue-100 text-sm mt-1">Next shift starts in 2 hours</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="bg-black/10 rounded-lg p-3 mb-4 backdrop-blur-sm">
               <div className="flex items-center gap-2 text-sm text-blue-50">
                 <AlertTriangle className="w-4 h-4 text-amber-300" />
                 <span>3 Pending critical notes</span>
               </div>
            </div>

            <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-none border-0">
              Prepare Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
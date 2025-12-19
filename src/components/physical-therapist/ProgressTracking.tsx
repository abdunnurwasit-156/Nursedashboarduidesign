import { TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function ProgressTracking() {
  const patients = [
    {
      id: 'prog1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      admissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      initialMobility: 0,
      currentMobility: 2,
      sessionsCompleted: 5,
      nextMilestone: 'Transfer to chair'
    },
    {
      id: 'prog2',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      admissionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      initialMobility: 1,
      currentMobility: 4,
      sessionsCompleted: 12,
      nextMilestone: 'Independent ambulation'
    }
  ];

  const mobilityLevels = [
    'Bed-bound',
    'Passive ROM',
    'Sit edge of bed',
    'Transfer to chair',
    'Stand with assist',
    'Ambulate with assist',
    'Independent'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Progress Tracking</h1>
        <p className="text-slate-500">{patients.length} patients with active PT</p>
      </div>

      <div className="space-y-4">
        {patients.map(patient => (
          <Card key={patient.id} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{patient.patientName}</h3>
                  <div className="text-sm text-slate-500 font-medium">{patient.bedNumber}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <Badge variant="outline" className="border-slate-200 text-slate-600">
                    Admitted {patient.admissionDate.toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Initial Status</span>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium text-slate-700">
                    Level {patient.initialMobility}: {mobilityLevels[patient.initialMobility]}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Current Status</span>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-sm font-medium text-emerald-800">
                    Level {patient.currentMobility}: {mobilityLevels[patient.currentMobility]}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Rehabilitation Progress</span>
                  <span>{Math.round((patient.currentMobility / 6) * 100)}%</span>
                </div>
                <Progress 
                  value={(patient.currentMobility / 6) * 100} 
                  className="h-2.5 bg-slate-100 [&>div]:bg-emerald-500" 
                />
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  <span>Bed Bound</span>
                  <span>Independent</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-slate-400" />
                  {patient.sessionsCompleted} sessions completed
                </span>
                <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs">
                  Next Goal: {patient.nextMilestone}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
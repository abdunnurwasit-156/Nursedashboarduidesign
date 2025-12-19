import { Droplet, Activity, Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function TPNManagement() {
  const tpnPatients = [
    {
      id: 'tpn1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      tpnFormula: 'Standard TPN with lipids',
      rate: '83 mL/hr',
      caloriesPerDay: 2000,
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastLabReview: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: 'tpn2',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      tpnFormula: 'High protein TPN',
      rate: '75 mL/hr',
      caloriesPerDay: 1800,
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastLabReview: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">TPN Management</h1>
        <p className="text-slate-500">{tpnPatients.length} patients on parenteral nutrition</p>
      </div>

      <div className="space-y-4">
        {tpnPatients.map(patient => (
          <Card key={patient.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{patient.patientName}</h3>
                      <div className="text-sm text-slate-500 font-medium">{patient.bedNumber}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">
                    Active TPN
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 rounded-lg p-4 border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium block mb-1">Formula</span>
                    <span className="text-sm font-medium text-slate-900">{patient.tpnFormula}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium block mb-1">Rate</span>
                    <span className="text-sm font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      {patient.rate}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium block mb-1">Calories</span>
                    <span className="text-sm font-medium text-slate-900">{patient.caloriesPerDay} kcal/day</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium block mb-1">Duration</span>
                    <span className="text-sm font-medium text-slate-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {Math.floor((Date.now() - patient.startDate.getTime()) / (24 * 60 * 60 * 1000))} days
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Activity className="w-3 h-3 text-blue-500" />
                  <span>Last lab review: <span className="font-medium text-slate-700">{Math.floor((Date.now() - patient.lastLabReview.getTime()) / (60 * 60 * 1000))}h ago</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
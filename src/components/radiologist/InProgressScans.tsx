import { Camera, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function InProgressScans() {
  const scans = [
    {
      id: 'scan1',
      examType: 'CT Chest with Contrast',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      startedAt: new Date(Date.now() - 15 * 60000),
      estimatedCompletion: new Date(Date.now() + 10 * 60000),
      progress: 60,
      technician: 'Alex Thompson'
    },
    {
      id: 'scan2',
      examType: 'CT Head without Contrast',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      startedAt: new Date(Date.now() - 8 * 60000),
      estimatedCompletion: new Date(Date.now() + 7 * 60000),
      progress: 45,
      technician: 'Maria Garcia'
    }
  ];

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const getTimeUntil = (date: Date) => {
    const minutes = Math.floor((date.getTime() - Date.now()) / 60000);
    if (minutes < 0) return 'Completing...';
    if (minutes < 60) return `~${minutes} min`;
    return `~${Math.floor(minutes / 60)}h`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scans In Progress</h1>
        <p className="text-slate-500">{scans.length} exam{scans.length !== 1 ? 's' : ''} currently being performed</p>
      </div>

      <div className="space-y-4">
        {scans.map(scan => (
          <Card key={scan.id} className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{scan.examType}</h3>
                      <div className="text-sm text-slate-600">
                        {scan.bedNumber} • {scan.patientName}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                    In Progress
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Started</div>
                      <div className="text-slate-900 font-medium">{getTimeAgo(scan.startedAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Est. Completion</div>
                      <div className="text-slate-900 font-medium">{getTimeUntil(scan.estimatedCompletion)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Technician</div>
                    <div className="text-slate-900 font-medium">{scan.technician}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Scan Progress</span>
                    <span>{scan.progress}%</span>
                  </div>
                  <Progress value={scan.progress} className="h-2 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scans.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Scans in Progress</h3>
          <p className="text-slate-500">No exams currently being performed.</p>
        </Card>
      )}
    </div>
  );
}
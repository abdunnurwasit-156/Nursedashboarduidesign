import { Calendar, Clock, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function TreatmentSessions() {
  const sessions = [
    {
      id: 'sess1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      scheduledTime: new Date(Date.now() + 30 * 60000),
      sessionType: 'Early Mobility',
      duration: '30 min',
      goals: 'Sit at edge of bed x 5 min',
      status: 'scheduled'
    },
    {
      id: 'sess2',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      scheduledTime: new Date(Date.now() + 90 * 60000),
      sessionType: 'Gait Training',
      duration: '45 min',
      goals: 'Ambulate 20 feet with walker',
      status: 'scheduled'
    },
    {
      id: 'sess3',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      scheduledTime: new Date(Date.now() - 60 * 60000),
      sessionType: 'Transfer Training',
      duration: '30 min',
      goals: 'Bed to chair transfer',
      status: 'completed'
    }
  ];

  const getTimeDisplay = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Treatment Sessions</h1>
        <p className="text-slate-500">{sessions.filter(s => s.status === 'scheduled').length} scheduled today</p>
      </div>

      <div className="space-y-4">
        {sessions.map(session => (
          <Card 
            key={session.id} 
            className={`transition-all ${
              session.status === 'completed' ? 'border-l-4 border-l-emerald-500 bg-emerald-50/10' : 'border-l-4 border-l-blue-500'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{session.sessionType}</h3>
                    {session.status === 'completed' ? (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                        Scheduled
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="font-medium text-slate-900">{session.bedNumber}</span>
                    <span className="text-slate-300">|</span>
                    <span>{session.patientName}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm bg-slate-50/50 p-2 rounded-md border border-slate-100 w-fit">
                    <div className="flex items-center gap-1.5 font-medium text-slate-900">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {getTimeDisplay(session.scheduledTime)}
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600">{session.duration}</span>
                  </div>

                  <div className="text-sm">
                    <span className="text-slate-500 font-medium mr-2 text-xs uppercase tracking-wider">Goal:</span>
                    <span className="text-slate-700 bg-blue-50 px-2 py-0.5 rounded text-blue-900">{session.goals}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  {session.status === 'scheduled' ? (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                      <Play className="w-4 h-4 mr-2" /> Start Session
                    </Button>
                  ) : (
                    <Button variant="ghost" disabled className="w-full md:w-auto">
                      Session Logged
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
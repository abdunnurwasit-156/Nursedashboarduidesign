import { Activity, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function MobilityAssessments() {
  const assessments = [
    {
      id: 'assess1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      assessmentDate: new Date(),
      mobilityLevel: 2,
      strength: 'Poor - 2/5 upper extremities',
      balance: 'Unable to assess',
      goals: ['Sit at edge of bed', 'Transfer to chair with assist'],
      barriers: ['Sedation', 'Multiple lines/tubes']
    },
    {
      id: 'assess2',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      assessmentDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      mobilityLevel: 3,
      strength: 'Fair - 3/5 lower extremities',
      balance: 'Poor sitting balance',
      goals: ['Stand with walker', 'Ambulate 10 feet'],
      barriers: ['Deconditioning', 'Fear of falling']
    }
  ];

  const mobilityLevels = [
    'Bed-bound',
    'Passive ROM only',
    'Sit edge of bed',
    'Transfer to chair',
    'Stand with assist',
    'Ambulate with assist'
  ];

  const getMobilityColor = (level: number) => {
    if (level <= 1) return 'bg-red-100 text-red-800 hover:bg-red-100';
    if (level <= 3) return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
    return 'bg-green-100 text-green-800 hover:bg-green-100';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mobility Assessments</h1>
        <p className="text-slate-500">{assessments.length} recent assessments</p>
      </div>

      <div className="space-y-4">
        {assessments.map(assessment => (
          <Card key={assessment.id} className="hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{assessment.patientName}</h3>
                      <div className="text-sm text-slate-500 font-medium">{assessment.bedNumber}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Assessed: {assessment.assessmentDate.toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                    <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">Functional Status</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Mobility Level</span>
                      <Badge variant="secondary" className={getMobilityColor(assessment.mobilityLevel)}>
                        Level {assessment.mobilityLevel}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-3">{mobilityLevels[assessment.mobilityLevel]}</p>
                    
                    <div className="space-y-2 pt-2 border-t border-blue-200/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Strength</span>
                        <span className="text-slate-900 text-right">{assessment.strength}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Balance</span>
                        <span className="text-slate-900 text-right">{assessment.balance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100 flex-1">
                      <div className="flex items-center gap-2 mb-2 text-emerald-800">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Goals</span>
                      </div>
                      <ul className="space-y-2">
                        {assessment.goals.map((goal, idx) => (
                          <li key={idx} className="text-sm text-emerald-900 flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                      <div className="flex items-center gap-2 mb-2 text-amber-800">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Barriers</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {assessment.barriers.map((barrier, idx) => (
                          <Badge key={idx} variant="outline" className="bg-white text-amber-900 border-amber-200">
                            {barrier}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
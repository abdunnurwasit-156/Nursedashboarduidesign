import { BarChart3, Download, TrendingUp, Users, Bed, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function Reports() {
  const thisWeek = {
    admissions: 8,
    discharges: 5,
    transfers: 2,
    avgLengthOfStay: 4.2,
    occupancyRate: 75
  };

  const reports = [
    { id: '1', name: 'Daily Census Report', description: 'Current patient count and bed status', icon: Bed, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: '2', name: 'Admissions & Discharges', description: 'Patient flow summary', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: '3', name: 'Incident Summary', description: 'Safety incidents and near misses', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: '4', name: 'Staff Utilization', description: 'Staff-to-patient ratios', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: '5', name: 'Quality Metrics', description: 'Clinical quality indicators', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
        <p className="text-slate-500">Performance metrics and operational reports.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Admissions</div>
            <div className="text-3xl font-bold text-slate-900">{thisWeek.admissions}</div>
            <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> This week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Discharges</div>
            <div className="text-3xl font-bold text-slate-900">{thisWeek.discharges}</div>
            <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> This week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Transfers</div>
            <div className="text-3xl font-bold text-slate-900">{thisWeek.transfers}</div>
            <div className="text-xs text-slate-500 mt-1">This week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Avg LOS</div>
            <div className="text-3xl font-bold text-slate-900">{thisWeek.avgLengthOfStay}d</div>
            <div className="text-xs text-slate-500 mt-1">Length of stay</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Occupancy</div>
            <div className="text-3xl font-bold text-slate-900">{thisWeek.occupancyRate}%</div>
            <div className="text-xs text-slate-500 mt-1">Current rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download standard reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map(report => {
                const Icon = report.icon;
                return (
                  <div key={report.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all bg-white group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.bg} ${report.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{report.name}</h4>
                        <p className="text-sm text-slate-500 mb-4 h-10">{report.description}</p>
                        <Button size="sm" variant="outline" className="w-full group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200">
                          <Download className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Widgets */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Acuity</CardTitle>
              <CardDescription>Severity distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { severity: 'Critical', count: mockPatients.filter(p => p.severity === 'critical').length, color: 'bg-red-500', bg: 'bg-red-100' },
                { severity: 'Moderate', count: mockPatients.filter(p => p.severity === 'moderate').length, color: 'bg-orange-500', bg: 'bg-orange-100' },
                { severity: 'Stable', count: mockPatients.filter(p => p.severity === 'stable').length, color: 'bg-emerald-500', bg: 'bg-emerald-100' },
              ].map(item => {
                const percentage = (item.count / mockPatients.length) * 100;
                return (
                  <div key={item.severity} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.severity}</span>
                      <span className="text-slate-900">{item.count} ({Math.round(percentage)}%)</span>
                    </div>
                    <Progress value={percentage} className={`h-2 ${item.bg} [&>div]:${item.color}`} />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Admissions</div>
                    <div className="text-xs text-slate-500">vs last week</div>
                  </div>
                </div>
                <div className="flex items-center text-emerald-600 font-medium text-sm">
                  <ArrowUp className="w-3 h-3 mr-1" /> 12%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-md text-emerald-600">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Discharges</div>
                    <div className="text-xs text-slate-500">vs last week</div>
                  </div>
                </div>
                <div className="flex items-center text-emerald-600 font-medium text-sm">
                  <ArrowUp className="w-3 h-3 mr-1" /> 8%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-md text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Incidents</div>
                    <div className="text-xs text-slate-500">vs last week</div>
                  </div>
                </div>
                <div className="flex items-center text-emerald-600 font-medium text-sm">
                  <ArrowDown className="w-3 h-3 mr-1" /> 15%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
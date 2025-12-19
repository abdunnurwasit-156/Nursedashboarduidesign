import { Users, Bed, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { wardStatistics, currentStaff } from '../../data/sharedWorkflowData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function WardOverview() {
  const totalBeds = wardStatistics.totalBeds;
  const occupiedBeds = wardStatistics.occupiedBeds;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const criticalPatients = wardStatistics.criticalPatients;
  const moderatePatients = mockPatients.filter(p => p.severity === 'moderate').length;
  const stablePatients = mockPatients.filter(p => p.severity === 'stable').length;

  const staffOnDuty = {
    nurses: currentStaff.filter(s => s.role === 'nurse' && s.status === 'active').length,
    doctors: currentStaff.filter(s => s.role === 'doctor' && s.status === 'active').length,
    support: currentStaff.filter(s => ['lab-tech', 'pharmacist', 'radiologist', 'nutritionist', 'physical-therapist'].includes(s.role) && s.status === 'active').length,
  };

  const totalStaff = Object.values(staffOnDuty).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ward Overview</h1>
        <p className="text-slate-500">Real-time monitoring and operational metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Bed Occupancy</span>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bed className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{occupancyRate}%</span>
              <span className="text-sm text-slate-500">{occupiedBeds}/{totalBeds} beds</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Critical Patients</span>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{criticalPatients}</span>
              <span className="text-sm text-slate-500">Immediate attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Staff on Duty</span>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{totalStaff}</span>
              <span className="text-sm text-slate-500">Active personnel</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Active Alerts</span>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">12</span>
              <span className="text-sm text-slate-500">Requiring action</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Acuity Distribution</CardTitle>
            <CardDescription>Current patient breakdown by severity level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Critical</span>
                <span className="text-slate-500">{criticalPatients} patients</span>
              </div>
              <Progress value={(criticalPatients / occupiedBeds) * 100} className="bg-red-100 [&>div]:bg-red-500 h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Moderate Risk</span>
                <span className="text-slate-500">{moderatePatients} patients</span>
              </div>
              <Progress value={(moderatePatients / occupiedBeds) * 100} className="bg-orange-100 [&>div]:bg-orange-500 h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Stable</span>
                <span className="text-slate-500">{stablePatients} patients</span>
              </div>
              <Progress value={(stablePatients / occupiedBeds) * 100} className="bg-emerald-100 [&>div]:bg-emerald-500 h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Staff Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Allocation</CardTitle>
            <CardDescription>Active staff distribution by role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Nurses</div>
                  <div className="text-xs text-slate-500">Floor & Triage</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3">{staffOnDuty.nurses}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Doctors</div>
                  <div className="text-xs text-slate-500">On Call & Rounds</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3">{staffOnDuty.doctors}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Support Staff</div>
                  <div className="text-xs text-slate-500">Lab, Pharmacy, Radiology</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3">{staffOnDuty.support}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
            <div>
              <h4 className="font-semibold text-red-900">Critical Alert - ICU-202</h4>
              <p className="text-sm text-red-700 mt-1">SpO₂ dropping below threshold</p>
              <span className="text-xs text-red-600 mt-2 block">5 min ago</span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900">New Patient Admission - ICU-204</h4>
              <p className="text-sm text-blue-700 mt-1">Post-operative monitoring</p>
              <span className="text-xs text-blue-600 mt-2 block">15 min ago</span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
            <div>
              <h4 className="font-semibold text-emerald-900">Patient Discharge - ICU-201</h4>
              <p className="text-sm text-emerald-700 mt-1">Transferred to general ward</p>
              <span className="text-xs text-emerald-600 mt-2 block">30 min ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
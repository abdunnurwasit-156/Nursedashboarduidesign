import { Activity, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function EquipmentStatus() {
  const equipment = [
    {
      id: 'eq1',
      name: 'CT Scanner #1',
      location: 'Radiology Suite A',
      status: 'operational',
      utilization: 75,
      lastMaintenance: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      scansToday: 12,
      avgScanTime: '18 min'
    },
    {
      id: 'eq2',
      name: 'CT Scanner #2',
      location: 'Radiology Suite B',
      status: 'maintenance',
      utilization: 0,
      lastMaintenance: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      scansToday: 0,
      avgScanTime: '—'
    },
    {
      id: 'eq3',
      name: 'Portable X-Ray Unit #1',
      location: 'ICU',
      status: 'operational',
      utilization: 85,
      lastMaintenance: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      scansToday: 18,
      avgScanTime: '8 min'
    },
    {
      id: 'eq4',
      name: 'Portable X-Ray Unit #2',
      location: 'CCU',
      status: 'operational',
      utilization: 60,
      lastMaintenance: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
      scansToday: 14,
      avgScanTime: '9 min'
    },
    {
      id: 'eq5',
      name: 'Ultrasound Machine #1',
      location: 'Portable',
      status: 'operational',
      utilization: 45,
      lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      scansToday: 6,
      avgScanTime: '12 min'
    },
    {
      id: 'eq6',
      name: 'MRI Scanner',
      location: 'Radiology Suite C',
      status: 'warning',
      utilization: 90,
      lastMaintenance: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      scansToday: 8,
      avgScanTime: '35 min'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'operational': return 'outline'; // Custom style usually
      case 'maintenance': return 'destructive'; // Or secondary
      case 'warning': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const getUtilizationColorClass = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-orange-500';
    if (utilization >= 50) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getDaysUntil = (date: Date) => {
    const days = Math.floor((date.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    if (days < 0) return `${Math.abs(days)}d overdue`;
    if (days === 0) return 'Today';
    return `${days}d`;
  };

  const operationalEquipment = equipment.filter(e => e.status === 'operational');
  const maintenanceEquipment = equipment.filter(e => e.status === 'maintenance' || e.status === 'warning');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Equipment Status</h1>
        <p className="text-slate-500">
          {operationalEquipment.length} operational • {maintenanceEquipment.length} require attention
        </p>
      </div>

      {maintenanceEquipment.length > 0 && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50/20">
          <CardContent className="p-4 flex items-center gap-3">
             <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
               <AlertTriangle className="w-5 h-5" />
             </div>
             <div>
               <h4 className="font-semibold text-orange-900">Maintenance Alert</h4>
               <p className="text-sm text-orange-800">
                 {maintenanceEquipment.length} equipment item{maintenanceEquipment.length !== 1 ? 's' : ''} require maintenance or attention.
               </p>
             </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Equipment</div>
            <div className="text-3xl font-bold text-slate-900">{equipment.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Operational</div>
            <div className="text-3xl font-bold text-slate-900">{operationalEquipment.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Scans Today</div>
            <div className="text-3xl font-bold text-slate-900">
              {equipment.reduce((sum, e) => sum + e.scansToday, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Avg Utilization</div>
            <div className="text-3xl font-bold text-slate-900">
              {Math.round(equipment.reduce((sum, e) => sum + e.utilization, 0) / equipment.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment List */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Registry</CardTitle>
          <CardDescription>Real-time status and maintenance schedule</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead>Equipment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Utilization</TableHead>
                <TableHead>Scans Today</TableHead>
                <TableHead>Avg Time</TableHead>
                <TableHead>Next Maintenance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3 font-medium text-slate-900">
                      <div className="p-2 bg-slate-100 rounded-md text-slate-500">
                        <Activity className="w-4 h-4" />
                      </div>
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{item.location}</span>
                  </TableCell>
                  <TableCell>
                    {item.status === 'operational' && (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none shadow-none">
                        <CheckCircle className="w-3 h-3 mr-1" /> Operational
                      </Badge>
                    )}
                    {item.status === 'maintenance' && (
                      <Badge variant="destructive" className="shadow-none">
                        <Wrench className="w-3 h-3 mr-1" /> Maintenance
                      </Badge>
                    )}
                    {item.status === 'warning' && (
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-none shadow-none">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Warning
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs text-slate-500">
                         <span>Load</span>
                         <span>{item.utilization}%</span>
                       </div>
                       <Progress 
                         value={item.utilization} 
                         className={`h-2 [&>div]:${getUtilizationColorClass(item.utilization)}`} 
                       />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-slate-900">{item.scansToday}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600 font-mono text-xs">{item.avgScanTime}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {getDaysUntil(item.nextMaintenance)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
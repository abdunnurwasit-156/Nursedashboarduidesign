import { Bed, User, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';

export function BedOccupancy() {
  const totalBeds = 20;
  
  // Create bed data
  const beds = Array.from({ length: totalBeds }, (_, i) => {
    const bedNumber = i + 1;
    const bedId = `ICU-${(200 + bedNumber).toString()}`;
    const patient = mockPatients.find(p => p.bedNumber === bedId);
    
    return {
      id: bedId,
      number: bedNumber,
      status: patient ? 'occupied' : 'available',
      patient: patient ? {
        name: patient.name,
        admittedAt: patient.admittedAt,
        severity: patient.severity,
        diagnosis: patient.diagnosis
      } : null
    };
  });

  const occupiedBeds = beds.filter(b => b.status === 'occupied');
  const availableBeds = beds.filter(b => b.status === 'available');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'available': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      default: return 'bg-slate-50 border-slate-200 text-slate-900';
    }
  };

  const getSeverityBadgeVariant = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'moderate': return 'secondary'; // Orange isn't default, handle manually or use secondary
      case 'stable': return 'outline'; // Or custom emerald
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity?: string) => {
     switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'moderate': return 'bg-orange-500';
      case 'stable': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getTimeInBed = (admittedAt?: Date) => {
    if (!admittedAt) return '';
    const hours = Math.floor((Date.now() - admittedAt.getTime()) / (60 * 60 * 1000));
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bed Occupancy</h1>
        <p className="text-slate-500">
          {occupiedBeds.length} occupied • {availableBeds.length} available
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Beds</div>
            <div className="text-3xl font-bold text-slate-900">{totalBeds}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Available</div>
            <div className="text-3xl font-bold text-slate-900">{availableBeds.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Occupied</div>
            <div className="text-3xl font-bold text-slate-900">{occupiedBeds.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Occupancy Rate</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">{Math.round((occupiedBeds.length / totalBeds) * 100)}%</span>
              <Progress value={(occupiedBeds.length / totalBeds) * 100} className="w-20 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bed Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Ward Layout</CardTitle>
          <CardDescription>Visual representation of current bed status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {beds.map(bed => (
              <div
                key={bed.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-sm cursor-pointer ${getStatusColor(bed.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 opacity-70" />
                    <span className="font-semibold">{bed.id}</span>
                  </div>
                  {bed.patient && (
                    <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white ${getSeverityColor(bed.patient.severity)}`} />
                  )}
                </div>

                {bed.patient ? (
                  <div className="space-y-1.5">
                    <div className="font-medium text-sm truncate">{bed.patient.name}</div>
                    <div className="text-xs text-slate-600 truncate">{bed.patient.diagnosis}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 pt-1">
                      <Clock className="w-3 h-3" />
                      {getTimeInBed(bed.patient.admittedAt)}
                    </div>
                  </div>
                ) : (
                  <div className="h-[60px] flex items-center justify-center text-xs text-emerald-700 font-medium">
                    <div className="flex items-center gap-1.5 bg-emerald-100/50 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed List */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Bed Status</CardTitle>
          <CardDescription>Comprehensive list of all beds and patient details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Time in Bed</TableHead>
                <TableHead>Diagnosis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beds.map(bed => (
                <TableRow key={bed.id}>
                  <TableCell className="font-medium">{bed.id}</TableCell>
                  <TableCell>
                    {bed.status === 'occupied' ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Occupied</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Available</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {bed.patient ? (
                      <div className="flex flex-col">
                         <span className="font-medium">{bed.patient.name}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {bed.patient ? (
                      <Badge variant={getSeverityBadgeVariant(bed.patient.severity) as any} className={
                        bed.patient.severity === 'moderate' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : 
                        bed.patient.severity === 'stable' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none' : ''
                      }>
                        {bed.patient.severity.charAt(0).toUpperCase() + bed.patient.severity.slice(1)}
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {bed.patient ? (
                      <span className="text-sm text-slate-600">{getTimeInBed(bed.patient.admittedAt)}</span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {bed.patient ? (
                      <span className="text-sm text-slate-600 truncate max-w-[200px] block" title={bed.patient.diagnosis}>
                        {bed.patient.diagnosis}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
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
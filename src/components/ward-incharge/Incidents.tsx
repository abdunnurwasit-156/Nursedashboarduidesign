import { AlertTriangle, Clock, User, FileText, CheckCircle, Pill, Settings, UserX, ShieldAlert, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function Incidents() {
  const incidents = [
    {
      id: 'inc1',
      type: 'Medication Error',
      severity: 'high',
      description: 'Wrong dosage administered - caught before harm',
      location: 'ICU-203',
      reportedBy: 'Nurse Jennifer Williams',
      reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'investigating',
      actionTaken: 'Doctor notified, patient monitored, incident review scheduled'
    },
    {
      id: 'inc2',
      type: 'Equipment Malfunction',
      severity: 'medium',
      description: 'Infusion pump alarm malfunction',
      location: 'ICU-205',
      reportedBy: 'Nurse Sarah Mitchell',
      reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'resolved',
      actionTaken: 'Equipment replaced, biomedical engineering notified for inspection'
    },
    {
      id: 'inc3',
      type: 'Patient Fall Risk',
      severity: 'medium',
      description: 'Patient attempted to get out of bed unassisted',
      location: 'ICU-201',
      reportedBy: 'Nurse Emily Rodriguez',
      reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'resolved',
      actionTaken: 'Bed alarm activated, family counseled, frequent monitoring'
    },
    {
      id: 'inc4',
      type: 'Near Miss',
      severity: 'low',
      description: 'IV line almost disconnected during patient transfer',
      location: 'ICU-204',
      reportedBy: 'Dr. Michael Lee',
      reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'closed',
      actionTaken: 'Staff reminded of transfer protocols, additional training scheduled'
    },
  ];

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary'; // using secondary (often gray) but we can style manually if needed
      case 'low': return 'outline';
      default: return 'outline';
    }
  };
  
  const getSeverityColorClass = (severity: string) => {
     switch (severity) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-yellow-500';
      default: return 'border-l-slate-200';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'investigating': return 'secondary'; // Blue-ish usually
      case 'resolved': return 'default'; // Green usually
      case 'closed': return 'outline';
      default: return 'outline';
    }
  };

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (60 * 60 * 1000));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Medication Error': return Pill;
      case 'Equipment Malfunction': return Settings;
      case 'Patient Fall Risk': return UserX;
      case 'Near Miss': return ShieldAlert;
      default: return AlertTriangle;
    }
  };

  const activeIncidents = incidents.filter(i => i.status === 'investigating');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Incident Reports</h1>
        <p className="text-slate-500">{activeIncidents.length} active investigation{activeIncidents.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Incidents</div>
            <div className="text-3xl font-bold text-slate-900">{incidents.length}</div>
            <div className="text-xs text-slate-500 mt-1">Last 24 hours</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-blue-600 mb-1">Investigating</div>
            <div className="text-3xl font-bold text-blue-900">{incidents.filter(i => i.status === 'investigating').length}</div>
            <div className="text-xs text-blue-600 mt-1">Requires action</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-emerald-600 mb-1">Resolved</div>
            <div className="text-3xl font-bold text-emerald-900">{incidents.filter(i => i.status === 'resolved').length}</div>
            <div className="text-xs text-emerald-600 mt-1">Action completed</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Closed</div>
            <div className="text-3xl font-bold text-slate-700">{incidents.filter(i => i.status === 'closed').length}</div>
            <div className="text-xs text-slate-500 mt-1">No further action</div>
          </CardContent>
        </Card>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {incidents.map(incident => {
          const IncidentIcon = getIncidentIcon(incident.type);
          return (
            <Card key={incident.id} className={`border-l-4 ${getSeverityColorClass(incident.severity)}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                           incident.severity === 'high' ? 'bg-red-100 text-red-600' :
                           incident.severity === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          <IncidentIcon className="w-5 h-5" />
                        </div>
                        <div>
                           <h3 className="font-semibold text-slate-900">{incident.type}</h3>
                           <div className="flex items-center gap-2 mt-1">
                             <Badge variant={getSeverityBadgeVariant(incident.severity) as any} className={
                               incident.severity === 'medium' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : 
                               incident.severity === 'low' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none' : ''
                             }>
                               {incident.severity.toUpperCase()}
                             </Badge>
                             <Badge variant={getStatusBadgeVariant(incident.status) as any} className={
                               incident.status === 'investigating' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 
                               incident.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : ''
                             }>
                               {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                             </Badge>
                           </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                        {getTimeAgo(incident.reportedAt)}
                      </span>
                    </div>

                    <div className="pl-[52px]">
                      <p className="text-slate-800 font-medium">{incident.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                           <span className="text-slate-400">Location:</span> 
                           <span className="font-medium text-slate-900">{incident.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <User className="w-4 h-4 text-slate-400" />
                           <span>{incident.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                     <div className="space-y-2">
                       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                         <FileText className="w-3 h-3" /> Action Taken
                       </span>
                       <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                         {incident.actionTaken}
                       </p>
                     </div>
                     
                     {incident.status === 'investigating' && (
                       <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                         Update Status <ArrowRight className="w-4 h-4 ml-2" />
                       </Button>
                     )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {incidents.length === 0 && (
        <Card className="p-8 text-center bg-slate-50 border-dashed">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">No Incidents Reported</h3>
          <p className="text-slate-500">There are no active incidents recorded in the last 24 hours.</p>
        </Card>
      )}
    </div>
  );
}
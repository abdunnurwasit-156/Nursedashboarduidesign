import { AlertTriangle, Phone, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface CriticalFinding {
  id: string;
  examType: string;
  patientName: string;
  bedNumber: string;
  finding: string;
  severity: 'critical' | 'urgent';
  discoveredAt: Date;
  physicianNotified: boolean;
  notifiedAt?: Date;
  notifiedPhysician?: string;
}

export function CriticalFindings() {
  const [findings, setFindings] = useState<CriticalFinding[]>([
    {
      id: 'crit1',
      examType: 'Chest X-Ray',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      finding: 'Large right-sided pneumothorax - immediate intervention required',
      severity: 'critical',
      discoveredAt: new Date(Date.now() - 5 * 60000),
      physicianNotified: false
    },
    {
      id: 'crit2',
      examType: 'CT Head',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      finding: 'Acute ischemic stroke in left MCA territory',
      severity: 'critical',
      discoveredAt: new Date(Date.now() - 12 * 60000),
      physicianNotified: false
    },
    {
      id: 'crit3',
      examType: 'CT Chest',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      finding: 'Bilateral pulmonary embolism with RV strain',
      severity: 'critical',
      discoveredAt: new Date(Date.now() - 8 * 60000),
      physicianNotified: false
    }
  ]);

  const handleNotifyPhysician = (id: string) => {
    setFindings(findings.map(f => 
      f.id === id ? { 
        ...f, 
        physicianNotified: true,
        notifiedAt: new Date(),
        notifiedPhysician: 'Dr. Sarah Adams'
      } : f
    ));
  };

  const pendingNotifications = findings.filter(f => !f.physicianNotified);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Critical Findings</h1>
        <p className="text-slate-500">
          {pendingNotifications.length} requiring immediate physician notification
        </p>
      </div>

      {pendingNotifications.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 animate-in fade-in zoom-in-95 duration-300">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-bold text-lg">Immediate Action Required</AlertTitle>
          <AlertDescription className="text-red-800 text-base mt-1">
            <span className="font-bold">{pendingNotifications.length}</span> critical finding{pendingNotifications.length !== 1 ? 's' : ''} require verbal communication with the attending physician immediately!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {findings.map(finding => (
          <Card 
            key={finding.id}
            className={`border-l-8 shadow-sm transition-all ${
              finding.physicianNotified ? 'border-l-emerald-500 bg-emerald-50/20' : 'border-l-red-500 bg-red-50/20'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`p-2 rounded-lg ${finding.physicianNotified ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                       <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{finding.examType}</h3>
                    {!finding.physicianNotified ? (
                      <Badge variant="destructive" className="animate-pulse">CRITICAL</Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                        <CheckCircle className="w-3 h-3 mr-1" /> Physician Notified
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <span>{finding.bedNumber}</span>
                    <span className="text-slate-300">•</span>
                    <span>{finding.patientName}</span>
                  </div>

                  <div className={`p-4 rounded-lg border text-sm font-medium ${
                    finding.physicianNotified ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-red-100 border-red-200 text-red-900'
                  }`}>
                    <span className="block text-xs uppercase tracking-wider opacity-70 mb-1">Finding</span>
                    {finding.finding}
                  </div>

                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Discovered {getTimeAgo(finding.discoveredAt)}
                  </div>

                  {finding.physicianNotified && finding.notifiedAt && (
                    <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-100 w-fit">
                      <CheckCircle className="w-4 h-4" />
                      Notified <span className="font-semibold">{finding.notifiedPhysician}</span> at {finding.notifiedAt.toLocaleTimeString()}
                    </div>
                  )}
                </div>

                {!finding.physicianNotified && (
                  <div className="md:self-center shrink-0">
                    <Button 
                      size="lg" 
                      variant="destructive" 
                      className="w-full md:w-auto shadow-md hover:shadow-lg transition-all"
                      onClick={() => handleNotifyPhysician(finding.id)}
                    >
                      <Phone className="w-4 h-4 mr-2" /> Notify Physician
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {findings.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Critical Findings</h3>
          <p className="text-slate-500">There are no critical findings requiring notification at this time.</p>
        </Card>
      )}
    </div>
  );
}
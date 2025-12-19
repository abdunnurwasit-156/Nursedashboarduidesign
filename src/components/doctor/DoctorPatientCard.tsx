import { Heart, Activity, Droplet, FileText, AlertCircle, Clock, Thermometer, User } from 'lucide-react';
import { Patient } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface DoctorPatientCardProps {
  patient: Patient;
  onOpenChart: () => void;
}

export function DoctorPatientCard({ patient, onOpenChart }: DoctorPatientCardProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-50 border-red-200 text-red-700', badge: 'bg-red-100 text-red-800 border-red-200', label: 'Critical' };
      case 'moderate':
        return { color: 'bg-orange-50 border-orange-200 text-orange-700', badge: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Moderate' };
      case 'warning':
        return { color: 'bg-amber-50 border-amber-200 text-amber-700', badge: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Warning' };
      default:
        return { color: 'bg-emerald-50 border-emerald-200 text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Stable' };
    }
  };

  const severityConfig = getSeverityConfig(patient.severity);

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md border-l-4 ${
      patient.severity === 'critical' ? 'border-l-red-500' : 
      patient.severity === 'moderate' ? 'border-l-orange-500' : 
      patient.severity === 'warning' ? 'border-l-amber-500' : 'border-l-emerald-500'
    }`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
               <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">{patient.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                <span className="font-mono font-medium bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-700">
                  {patient.bedNumber}
                </span>
                <span>•</span>
                <span>{patient.age}y</span>
                <span>•</span>
                <span className="truncate max-w-[120px]">{patient.diagnosis}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`${severityConfig.badge} border uppercase text-[10px] tracking-wide`}>
            {severityConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        {patient.alerts.length > 0 && (
          <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 font-medium">
              {patient.alerts.join(', ')}
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <Heart className="w-4 h-4 text-rose-500 mb-1" />
            <span className="text-lg font-bold text-slate-900">{patient.vitals.hr}</span>
            <span className="text-[10px] text-slate-500 uppercase">BPM</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <Activity className="w-4 h-4 text-blue-500 mb-1" />
            <span className="text-lg font-bold text-slate-900">{patient.vitals.bp}</span>
            <span className="text-[10px] text-slate-500 uppercase">BP</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <Droplet className="w-4 h-4 text-cyan-500 mb-1" />
            <span className="text-lg font-bold text-slate-900">{patient.vitals.spo2}%</span>
            <span className="text-[10px] text-slate-500 uppercase">SpO2</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <Thermometer className="w-4 h-4 text-orange-500 mb-1" />
            <span className="text-lg font-bold text-slate-900">{patient.vitals.temp}</span>
            <span className="text-[10px] text-slate-500 uppercase">°C</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {patient.newAlert && (
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 border gap-1">
              <Clock className="w-3 h-3" />
              Review Needed
            </Badge>
          )}
          {patient.testPending && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 border gap-1">
              <FileText className="w-3 h-3" />
              Results Ready
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={onOpenChart} 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        >
          View Patient Chart
        </Button>
      </CardFooter>
    </Card>
  );
}
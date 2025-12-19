import { Heart, Activity, Droplet, Wind, Thermometer, AlertCircle, TrendingUp, Clock, MoreVertical } from 'lucide-react';
import { Patient } from '../types';
import { VitalsMiniChart } from './VitalsMiniChart';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
}

export function PatientCard({ patient, onClick }: PatientCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'moderate': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'stable': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIndicator = (severity: string) => {
     switch (severity) {
      case 'critical': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]';
      case 'moderate': return 'bg-orange-500';
      case 'warning': return 'bg-amber-500';
      case 'stable': return 'bg-emerald-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-200 cursor-pointer bg-white"
    >
      {/* Top Status Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${getStatusIndicator(patient.severity)}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 font-bold group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors">
              <span className="text-xs text-slate-400 font-medium group-hover:text-blue-400 uppercase">Bed</span>
              <span className="text-lg leading-none">{patient.bedNumber.split('-')[1] || patient.bedNumber}</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors text-lg">
                {patient.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>{patient.age}y</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="truncate max-w-[150px]">{patient.diagnosis}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Badge variant="outline" className={`${getSeverityColor(patient.severity)} capitalize border shadow-none`}>
              {patient.severity}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Discharge</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Alerts Section */}
        {patient.alerts.length > 0 && (
          <div className="mb-4 flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">Active Alert</p>
              <p className="text-sm text-red-700 leading-snug">{patient.alerts.join(', ')}</p>
            </div>
          </div>
        )}

        {/* Vitals Grid */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Heart className="w-3.5 h-3.5" /> HR
            </div>
            <p className="text-lg font-bold text-slate-900 tabular-nums">{patient.vitals.hr}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Activity className="w-3.5 h-3.5" /> BP
            </div>
            <p className="text-lg font-bold text-slate-900 tabular-nums">{patient.vitals.bp}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Droplet className="w-3.5 h-3.5" /> SpO₂
            </div>
            <p className={`text-lg font-bold tabular-nums ${patient.vitals.spo2 < 95 ? 'text-red-600' : 'text-slate-900'}`}>
              {patient.vitals.spo2}<span className="text-sm font-normal text-slate-400">%</span>
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Thermometer className="w-3.5 h-3.5" /> Temp
            </div>
            <p className="text-lg font-bold text-slate-900 tabular-nums">{patient.vitals.temp}</p>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <TrendingUp className="w-3.5 h-3.5" /> HR Trend
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">1 Hour</span>
          </div>
          <VitalsMiniChart data={patient.hrTrend} severity={patient.severity} />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          {patient.medicationDue && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
              Medication Due
            </Badge>
          )}
          {patient.testPending && (
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
              Labs Pending
            </Badge>
          )}
          {!patient.medicationDue && !patient.testPending && (
             <span className="text-xs text-slate-400 flex items-center gap-1">
               <Clock className="w-3 h-3" /> Last checked 15m ago
             </span>
          )}
        </div>
      </div>
    </Card>
  );
}
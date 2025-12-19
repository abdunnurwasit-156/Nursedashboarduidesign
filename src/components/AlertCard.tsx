import { AlertCircle, Clock, Check, Bell } from 'lucide-react';
import { Alert } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onOpenActions: (alert: Alert) => void;
}

export function AlertCard({ alert, onAcknowledge, onOpenActions }: AlertCardProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-50 border-red-200 text-red-700', iconColor: 'text-red-600', label: 'Critical' };
      case 'moderate':
        return { color: 'bg-orange-50 border-orange-200 text-orange-700', iconColor: 'text-orange-600', label: 'Moderate' };
      case 'warning':
        return { color: 'bg-amber-50 border-amber-200 text-amber-700', iconColor: 'text-amber-600', label: 'Warning' };
      default:
        return { color: 'bg-emerald-50 border-emerald-200 text-emerald-700', iconColor: 'text-emerald-600', label: 'Stable' };
    }
  };

  const severityConfig = getSeverityConfig(alert.severity);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  };

  return (
    <Card className={`p-4 transition-all border-slate-200 ${alert.acknowledged ? 'opacity-60 bg-slate-50' : 'hover:shadow-md bg-white border-l-4 ' + (alert.severity === 'critical' ? 'border-l-red-500' : alert.severity === 'moderate' ? 'border-l-orange-500' : alert.severity === 'warning' ? 'border-l-amber-500' : 'border-l-emerald-500')}`}>
      <div className="flex flex-col h-full justify-between gap-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${severityConfig.color} border gap-1 font-medium`}>
                <AlertCircle className="w-3 h-3" />
                {severityConfig.label}
              </Badge>
              <span className="text-xs text-slate-400">•</span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{getTimeAgo(alert.time)}</span>
              </div>
            </div>
            {alert.acknowledged && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 gap-1">
                <Check className="w-3 h-3" />
                Acknowledged
              </Badge>
            )}
          </div>
          
          <div className="space-y-1">
             <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{alert.patientName}</h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{alert.bedNumber}</span>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">{alert.trigger}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          {!alert.acknowledged ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenActions(alert)}
                className="w-full text-slate-700 border-slate-200 hover:bg-slate-50"
              >
                Actions
              </Button>
              <Button
                size="sm"
                onClick={() => onAcknowledge(alert.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Acknowledge
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenActions(alert)}
              className="w-full col-span-2 text-slate-600"
            >
              View Actions Taken
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
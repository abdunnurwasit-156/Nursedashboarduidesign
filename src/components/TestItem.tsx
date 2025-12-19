import { FileText, Clock, Check, AlertCircle, TestTube, ScanLine, Printer } from 'lucide-react';
import { Test } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TestItemProps {
  test: Test;
  onMarkSampleCollected: (id: string) => void;
  onPrintBarcode: (id: string) => void;
}

export function TestItem({ test, onMarkSampleCollected, onPrintBarcode }: TestItemProps) {
  const getStatusConfig = (status: string, reportAvailable: boolean, appointmentTime?: Date) => {
    if (reportAvailable) {
      return { label: 'Report Ready', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Check };
    }
    if (appointmentTime) {
      return { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock };
    }
    
    switch (status) {
      case 'sample-needed':
        return { label: 'Sample Needed', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock };
      case 'completed':
        return { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Check };
      default:
        return { label: 'Pending', color: 'bg-slate-50 text-slate-700 border-slate-200', icon: Clock };
    }
  };

  const statusConfig = getStatusConfig(test.status, test.reportAvailable, test.appointmentTime);
  const StatusIcon = statusConfig.icon;

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-slate-200">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            {test.type === 'lab' ? (
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <TestTube className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <ScanLine className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-slate-900">{test.testName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`${statusConfig.color} border gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </Badge>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">Ordered {getTimeAgo(test.orderedTime)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm pl-[3.25rem]">
            <div>
              <span className="text-slate-500">Patient: </span>
              <span className="font-medium text-slate-900">{test.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500">Bed: </span>
              <span className="font-medium text-slate-900">{test.bedNumber}</span>
            </div>
            {test.appointmentTime && (
              <div className="col-span-2 mt-2 flex items-center gap-2 text-teal-700 bg-teal-50 px-2 py-1.5 rounded text-xs border border-teal-100 w-fit">
                <Clock className="w-3 h-3" />
                Scheduled: {test.appointmentTime.toLocaleString('en-US', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pl-[3.25rem] sm:pl-0">
          {test.status === 'sample-needed' && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onPrintBarcode(test.id)}
                className="flex-1 sm:flex-none"
              >
                <Printer className="w-4 h-4 mr-2" />
                Barcode
              </Button>
              <Button 
                size="sm"
                onClick={() => onMarkSampleCollected(test.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
              >
                <Check className="w-4 h-4 mr-2" />
                Collect
              </Button>
            </>
          )}
          {test.reportAvailable && (
            <Button 
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Report
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
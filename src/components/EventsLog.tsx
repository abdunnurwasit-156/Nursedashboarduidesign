import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Event } from '../types';
import { Clock, AlertCircle, User, CheckCircle, AlertTriangle, Filter, X, ChevronRight, Activity, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function EventsLog() {
  const [events] = useState(mockEvents);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  let filteredEvents = events;
  if (filterType === 'critical') {
    filteredEvents = filteredEvents.filter(e => e.severity === 'critical');
  }
  if (filterStatus !== 'all') {
    filteredEvents = filteredEvents.filter(e => e.status === filterStatus);
  }

  const getTimeDisplay = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'moderate': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-slate-100 text-slate-800';
      case 'escalated': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Clinical Event Log
            <Badge variant="outline" className="font-mono text-slate-500 font-normal">
              {filteredEvents.length} Total
            </Badge>
          </h1>
          <p className="text-slate-500 mt-1">Audit trail of critical patient events, alerts, and interventions.</p>
        </div>

        <div className="flex items-center gap-3">
           <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="flex-1 border-slate-200 shadow-sm overflow-hidden flex flex-col bg-white">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="divide-y divide-slate-100">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 cursor-pointer transition-colors group"
              >
                <div className="col-span-2 text-sm text-slate-500 font-mono">
                  {getTimeDisplay(event.time)}
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className={`${getSeverityColor(event.severity)} truncate max-w-full`}>
                    {event.type}
                  </Badge>
                </div>
                <div className="col-span-3">
                  <div className="font-medium text-slate-900">{event.patientName}</div>
                  <div className="text-xs text-slate-500">{event.bedNumber}</div>
                </div>
                <div className="col-span-3 text-sm text-slate-600 truncate">
                  {event.nurseAction}
                </div>
                <div className="col-span-2 flex justify-end items-center gap-2">
                  <Badge className={`${getStatusColor(event.status)} hover:${getStatusColor(event.status)} capitalize shadow-none border-0`}>
                    {event.status}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No events found matching current filters.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <Sheet open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedEvent && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={`${getSeverityColor(selectedEvent.severity)} px-3 py-1 text-sm`}>
                    {selectedEvent.severity.toUpperCase()}
                  </Badge>
                  <span className="text-slate-400 text-sm font-mono">
                     ID: {selectedEvent.id.toUpperCase()}
                  </span>
                </div>
                <SheetTitle className="text-2xl font-bold text-slate-900">{selectedEvent.type}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4" /> {getTimeDisplay(selectedEvent.time)}
                </SheetDescription>
              </SheetHeader>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
                 <div className="flex items-start gap-3">
                   <div className="bg-white p-2 rounded-full border border-slate-200">
                     <User className="w-5 h-5 text-slate-500" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-slate-900">Patient Details</p>
                     <p className="text-lg font-bold text-slate-800">{selectedEvent.patientName}</p>
                     <p className="text-sm text-slate-500">{selectedEvent.bedNumber}</p>
                   </div>
                 </div>
                 
                 <div className="h-px bg-slate-200" />
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                     <Badge className={getStatusColor(selectedEvent.status)}>{selectedEvent.status.toUpperCase()}</Badge>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Doctor Notified</p>
                     <p className={`text-sm font-medium ${selectedEvent.doctorNotified ? 'text-emerald-700' : 'text-slate-500'}`}>
                       {selectedEvent.doctorNotified ? 'Yes, Notified' : 'Not Required'}
                     </p>
                   </div>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-2">Nurse Actions</h3>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                    {selectedEvent.nurseAction}
                  </div>
                </div>

                {selectedEvent.details && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Clinical Details</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                      {selectedEvent.details}
                    </div>
                  </div>
                )}
              </div>

              <SheetFooter className="flex-col gap-3 sm:flex-col mt-8">
                {selectedEvent.status === 'open' && (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Resolved
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Add Follow-up Note
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
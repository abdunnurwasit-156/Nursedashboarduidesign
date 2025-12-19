import { useState } from 'react';
import { mockAlerts } from '../data/mockData';
import { AlertCard } from './AlertCard';
import { QuickActionPanel } from './QuickActionPanel';
import { Alert, QuickAction } from '../types';
import { AlertCircle, Filter, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert as UIAlert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';

export function LiveAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleOpenActions = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseActions = () => {
    setSelectedAlert(null);
  };

  const handleSubmitActions = (actions: QuickAction[], notifyDoctor: boolean, notes: string) => {
    console.log('Actions submitted:', { actions, notifyDoctor, notes });
    if (selectedAlert) {
      handleAcknowledge(selectedAlert.id);
    }
  };

  const filteredAlerts = filterSeverity === 'all'
    ? alerts
    : alerts.filter(a => a.severity === filterSeverity);

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col space-y-6">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Live Alerts
            {unacknowledgedCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-sm px-2 py-0.5 animate-pulse">
                {unacknowledgedCount} Active
              </Badge>
            )}
          </h1>
          <p className="text-slate-500 mt-1">Monitor and respond to patient alarms in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter:</span>
          </div>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {unacknowledgedCount > 0 && (
        <UIAlert variant="destructive" className="bg-red-50 border-red-200 text-red-900 flex-shrink-0">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Attention Required</AlertTitle>
          <AlertDescription className="text-red-800">
            You have {unacknowledgedCount} unacknowledged alert{unacknowledgedCount !== 1 ? 's' : ''} requiring immediate attention.
          </AlertDescription>
        </UIAlert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-6">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={handleAcknowledge}
              onOpenActions={handleOpenActions}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-64 text-slate-400">
            <Bell className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No alerts found</p>
            <p className="text-sm">Current filter criteria returned no results.</p>
          </div>
        )}
      </div>

      <QuickActionPanel
        alert={selectedAlert}
        onClose={handleCloseActions}
        onSubmit={handleSubmitActions}
      />
    </div>
  );
}
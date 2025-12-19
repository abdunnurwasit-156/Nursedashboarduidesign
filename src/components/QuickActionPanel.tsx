import { useState, useEffect } from 'react';
import { X, Check, User, Activity, AlertTriangle, FileText } from 'lucide-react';
import { Alert, QuickAction } from '../types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface QuickActionPanelProps {
  alert: Alert | null;
  onClose: () => void;
  onSubmit: (actions: QuickAction[], notifyDoctor: boolean, notes: string) => void;
}

export function QuickActionPanel({ alert, onClose, onSubmit }: QuickActionPanelProps) {
  const [actions, setActions] = useState<QuickAction[]>([
    { id: 'checked', label: 'Checked patient status', checked: false },
    { id: 'repositioned', label: 'Repositioned patient', checked: false },
    { id: 'oxygen', label: 'Administered/Adjusted Oxygen', checked: false },
    { id: 'suction', label: 'Performed suctioning', checked: false },
    { id: 'ventilator', label: 'Adjusted ventilator settings', checked: false },
    { id: 'probe', label: 'Verified probe/lead placement', checked: false }
  ]);
  
  const [notifyDoctor, setNotifyDoctor] = useState(false);
  const [otherNotes, setOtherNotes] = useState('');

  // Reset state when alert changes
  useEffect(() => {
    if (alert) {
      setActions(prev => prev.map(a => ({ ...a, checked: false })));
      setNotifyDoctor(false);
      setOtherNotes('');
    }
  }, [alert]);

  if (!alert) return null;

  const handleToggleAction = (id: string) => {
    setActions(actions.map(action => 
      action.id === id 
        ? { ...action, checked: !action.checked, timestamp: !action.checked ? new Date() : undefined }
        : action
    ));
  };

  const handleSubmit = () => {
    onSubmit(actions.filter(a => a.checked), notifyDoctor, otherNotes);
    onClose();
  };

  return (
    <Dialog open={!!alert} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between mr-8">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl">Quick Actions</DialogTitle>
              <Badge variant="outline" className="text-slate-500 bg-slate-50 border-slate-200">
                {alert.bedNumber}
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Record actions taken for {alert.patientName} regarding the alert.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Alert Trigger</p>
              <p className="text-sm text-amber-800">{alert.trigger}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              Interventions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    action.checked 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'hover:bg-slate-50 border-slate-200'
                  }`}
                  onClick={() => handleToggleAction(action.id)}
                >
                  <Checkbox 
                    id={action.id} 
                    checked={action.checked}
                    className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={action.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-700"
                    >
                      {action.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              Additional Notes
            </h3>
            <Textarea
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
              placeholder="Record any specific observations, readings, or other actions..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <Checkbox 
              id="notify-doctor" 
              checked={notifyDoctor}
              onCheckedChange={(checked) => setNotifyDoctor(checked as boolean)}
              className="data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="notify-doctor" className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <User className="w-4 h-4 text-blue-600" />
              Notify Duty Doctor immediately
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Check className="w-4 h-4 mr-2" />
            Submit Actions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
import { AlertTriangle, TrendingDown, Save, FileText, CheckSquare, Calendar, Activity } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface InterventionPlan {
  patientName: string;
  bedNumber: string;
  issue: string;
}

function CreateInterventionPlan({ patient, onClose, onSave }: { patient: InterventionPlan; onClose: () => void; onSave: () => void }) {
  const [plan, setPlan] = useState({
    actions: [] as string[],
    calorieAdjustment: '',
    proteinAdjustment: '',
    supplements: '',
    feedingRoute: '',
    consultPhysician: false,
    consultSpeech: false,
    targetIntake: '',
    followUpDate: '',
    notes: ''
  });

  const commonActions = [
    'Increase meal frequency to 5-6 small meals',
    'Add high-calorie protein shakes between meals',
    'Fortify foods with protein powder/butter',
    'Encourage family to bring preferred foods',
    'Consider appetite stimulant medication',
    'Assess for swallowing difficulties',
    'Consider tube feeding if intake remains poor',
    'Monitor daily weights',
    'Liberalize diet restrictions if appropriate'
  ];

  const handleToggleAction = (action: string) => {
    if (plan.actions.includes(action)) {
      setPlan({ ...plan, actions: plan.actions.filter(a => a !== action) });
    } else {
      setPlan({ ...plan, actions: [...plan.actions, action] });
    }
  };

  const handleSubmit = () => {
    // This would save the intervention plan and notify the care team
    console.log('Intervention plan created:', plan);
    onSave();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <FileText className="w-5 h-5" />
             </div>
             <div>
               <DialogTitle>Nutrition Intervention Plan</DialogTitle>
               <DialogDescription>{patient.bedNumber} • {patient.patientName}</DialogDescription>
             </div>
          </div>
          <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-md text-sm text-orange-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span><strong>Triggering Issue:</strong> {patient.issue}</span>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-8">
            {/* Action Items */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4" /> Intervention Actions
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonActions.map((action, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${plan.actions.includes(action) ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`} onClick={() => handleToggleAction(action)}>
                    <Checkbox
                      checked={plan.actions.includes(action)}
                      onCheckedChange={() => handleToggleAction(action)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-slate-700">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutritional Adjustments */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Target Adjustments
              </Label>
              <Card className="bg-slate-50 border-slate-200 shadow-none">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">New Calorie Target</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={plan.calorieAdjustment}
                        onChange={(e) => setPlan({ ...plan, calorieAdjustment: e.target.value })}
                        placeholder="e.g., 2400"
                        className="bg-white pr-12"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">kcal</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">New Protein Target</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={plan.proteinAdjustment}
                        onChange={(e) => setPlan({ ...plan, proteinAdjustment: e.target.value })}
                        placeholder="e.g., 100"
                        className="bg-white pr-12"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">g/day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supplements */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Supplements</Label>
              <Input
                value={plan.supplements}
                onChange={(e) => setPlan({ ...plan, supplements: e.target.value })}
                placeholder="e.g., Ensure Plus TID with meals, Protein powder BID"
              />
            </div>

            {/* Consults */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Consultation Requests</Label>
              <div className="flex flex-col gap-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${plan.consultPhysician ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'}`}>
                  <Checkbox
                    id="physician"
                    checked={plan.consultPhysician}
                    onCheckedChange={(checked) => setPlan({ ...plan, consultPhysician: checked as boolean })}
                  />
                  <Label htmlFor="physician" className="text-sm font-medium cursor-pointer">
                    Request Physician Consult <span className="font-normal text-slate-500 ml-1">(Appetite stimulants, feeding tube)</span>
                  </Label>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${plan.consultSpeech ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'}`}>
                  <Checkbox
                    id="speech"
                    checked={plan.consultSpeech}
                    onCheckedChange={(checked) => setPlan({ ...plan, consultSpeech: checked as boolean })}
                  />
                  <Label htmlFor="speech" className="text-sm font-medium cursor-pointer">
                    Request Speech Therapy Consult <span className="font-normal text-slate-500 ml-1">(Swallow evaluation)</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Target and Follow-up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Goal Intake %</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={plan.targetIntake}
                    onChange={(e) => setPlan({ ...plan, targetIntake: e.target.value })}
                    placeholder="e.g., 85"
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400">%</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Follow-up Date
                </Label>
                <Input
                  type="date"
                  value={plan.followUpDate}
                  onChange={(e) => setPlan({ ...plan, followUpDate: e.target.value })}
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Clinical Notes</Label>
              <Textarea
                value={plan.notes}
                onChange={(e) => setPlan({ ...plan, notes: e.target.value })}
                rows={3}
                placeholder="Additional clinical context or instructions..."
                className="resize-none"
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
           <Button variant="outline" onClick={onClose}>Cancel</Button>
           <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
             <Save className="w-4 h-4 mr-2" /> Create Plan
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function NutritionAlerts() {
  const [showInterventionPlan, setShowInterventionPlan] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<InterventionPlan | null>(null);

  const alerts = [
    {
      id: 'alert1',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      alertType: 'Poor Intake',
      severity: 'high',
      description: 'Only 67% of calorie goal for 3 consecutive days',
      recommendation: 'Consider supplementation or alternative feeding route'
    },
    {
      id: 'alert2',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      alertType: 'Low Albumin',
      severity: 'high',
      description: 'Albumin 2.1 g/dL - severe malnutrition risk',
      recommendation: 'Urgent nutritional intervention needed'
    },
    {
      id: 'alert3',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      alertType: 'Weight Loss',
      severity: 'medium',
      description: '5% weight loss in past week',
      recommendation: 'Monitor closely and increase caloric intake'
    }
  ];

  const handleCreatePlan = (alert: typeof alerts[0]) => {
    setSelectedPatient({
      patientName: alert.patientName,
      bedNumber: alert.bedNumber,
      issue: alert.description
    });
    setShowInterventionPlan(true);
  };

  const handleSavePlan = () => {
    setShowInterventionPlan(false);
    setSelectedPatient(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nutrition Alerts</h1>
        <p className="text-slate-500">{alerts.length} patients requiring intervention</p>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <Card key={alert.id} className={`border-l-4 ${alert.severity === 'high' ? 'border-l-red-500' : 'border-l-orange-500'} shadow-sm`}>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{alert.alertType}</h3>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className={
                      alert.severity === 'medium' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                    }>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-3 font-medium">
                    {alert.bedNumber} • {alert.patientName}
                  </div>

                  <Alert className={`mb-3 ${alert.severity === 'high' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                    <AlertDescription className="text-slate-800">
                      <strong>Issue:</strong> {alert.description}
                    </AlertDescription>
                  </Alert>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-blue-900">
                    <span className="font-semibold text-blue-700 block mb-1">Recommendation:</span>
                    {alert.recommendation}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <Button 
                    onClick={() => handleCreatePlan(alert)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Create Intervention Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showInterventionPlan && selectedPatient && (
        <CreateInterventionPlan
          patient={selectedPatient}
          onClose={() => setShowInterventionPlan(false)}
          onSave={handleSavePlan}
        />
      )}
    </div>
  );
}
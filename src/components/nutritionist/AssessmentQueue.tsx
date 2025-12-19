import { Clipboard, Clock, AlertCircle, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { CreateMealPlan } from './CreateMealPlan';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Assessment {
  id: string;
  patientName: string;
  bedNumber: string;
  requestedBy: string;
  requestedAt: Date;
  urgency: 'urgent' | 'routine';
  reason: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export function AssessmentQueue() {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; bed: string } | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: 'assess1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      requestedBy: 'Dr. Sarah Adams',
      requestedAt: new Date(Date.now() - 30 * 60000),
      urgency: 'urgent',
      reason: 'Ventilated patient - need enteral nutrition plan',
      status: 'pending'
    },
    {
      id: 'assess2',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      requestedBy: 'Dr. Michael Lee',
      requestedAt: new Date(Date.now() - 60 * 60000),
      urgency: 'urgent',
      reason: 'Critically low albumin - malnutrition risk',
      status: 'pending'
    },
    {
      id: 'assess3',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      requestedBy: 'Dr. Michael Lee',
      requestedAt: new Date(Date.now() - 90 * 60000),
      urgency: 'routine',
      reason: 'Post-op day 3 - advance diet as tolerated',
      status: 'pending'
    },
    {
      id: 'assess4',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      requestedBy: 'Dr. Sarah Adams',
      requestedAt: new Date(Date.now() - 45 * 60000),
      urgency: 'routine',
      reason: 'Diabetic diet optimization',
      status: 'pending'
    }
  ]);

  const handleStartAssessment = (id: string) => {
    setAssessments(assessments.map(a => 
      a.id === id ? { ...a, status: 'in-progress' as const } : a
    ));
  };

  const handleCompleteAssessment = (assessment: Assessment) => {
    setAssessments(assessments.map(a => 
      a.id === assessment.id ? { ...a, status: 'completed' as const } : a
    ));
    setSelectedPatient({ name: assessment.patientName, bed: assessment.bedNumber });
    setShowCreatePlan(true);
  };

  const handleSaveMealPlan = () => {
    setShowCreatePlan(false);
    setSelectedPatient(null);
    // The meal plan is now sent to kitchen and nursing staff
  };

  const pendingAssessments = assessments.filter(a => a.status === 'pending');
  const urgentAssessments = pendingAssessments.filter(a => a.urgency === 'urgent');

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nutrition Assessments</h1>
        <p className="text-slate-500">
          {pendingAssessments.length} pending • {urgentAssessments.length} urgent
        </p>
      </div>

      {urgentAssessments.length > 0 && (
        <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-900">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900 font-semibold">Priority Action Required</AlertTitle>
          <AlertDescription className="text-orange-800">
            {urgentAssessments.length} urgent assessment{urgentAssessments.length !== 1 ? 's' : ''} require immediate clinical attention.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {assessments.map(assessment => (
          <Card 
            key={assessment.id} 
            className={`transition-all ${
              assessment.status === 'in-progress' ? 'border-l-4 border-l-blue-500 bg-blue-50/10' : 
              assessment.urgency === 'urgent' ? 'border-l-4 border-l-orange-500' : 'border-l-4 border-l-blue-500'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                       <Clipboard className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Nutrition Assessment</h3>
                    {assessment.status === 'pending' && (
                      <Badge variant={assessment.urgency === 'urgent' ? 'secondary' : 'outline'} className={
                        assessment.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                      }>
                        {assessment.urgency.toUpperCase()}
                      </Badge>
                    )}
                    {assessment.status === 'in-progress' && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        In Progress
                      </Badge>
                    )}
                    {assessment.status === 'completed' && (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{assessment.bedNumber}</span>
                    <span className="text-slate-300">|</span>
                    <span>{assessment.patientName}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-md border border-slate-100 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">Requested By</span>
                      <span className="text-slate-900">{assessment.requestedBy}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">Time</span>
                      <div className="flex items-center gap-1 text-slate-900">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {getTimeAgo(assessment.requestedAt)}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm border-t border-slate-100 pt-2">
                     <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold mr-2">Reason:</span>
                     <span className="text-blue-700 font-medium">{assessment.reason}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  {assessment.status === 'pending' && (
                    <Button 
                      onClick={() => handleStartAssessment(assessment.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                    >
                      Start Assessment
                    </Button>
                  )}

                  {assessment.status === 'in-progress' && (
                    <Button 
                      onClick={() => handleCompleteAssessment(assessment)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-auto"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Complete Assessment
                    </Button>
                  )}
                  
                  {assessment.status === 'completed' && (
                     <Button variant="outline" disabled className="w-full md:w-auto">
                        Assessment Done
                     </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingAssessments.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <Clipboard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Pending Assessments</h3>
          <p className="text-slate-500">All nutrition assessments are currently up to date.</p>
        </Card>
      )}

      {showCreatePlan && selectedPatient && (
        <CreateMealPlan
          patientName={selectedPatient.name}
          bedNumber={selectedPatient.bed}
          onClose={() => setShowCreatePlan(false)}
          onSave={handleSaveMealPlan}
        />
      )}
    </div>
  );
}
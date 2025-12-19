import { ScanLine, Clock, MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { mockTestOrders } from '../../data/doctorMockData';
import { TestOrder } from '../../types/doctor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function ImagingQueue() {
  const [tests, setTests] = useState(mockTestOrders);
  const [schedulingTest, setSchedulingTest] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  // Filter for radiology tests only
  const radiologyTests = tests.filter(t => t.type === 'radiology');
  
  const handleSchedule = (testId: string) => {
    if (!scheduledDate || !scheduledTime) return;
    
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    setTests(tests.map(t => 
      t.id === testId ? { ...t, status: 'scheduled' as const, scheduledTime: scheduledDateTime } : t
    ));
    setSchedulingTest(null);
    setScheduledDate('');
    setScheduledTime('');
  };

  const handleMarkCompleted = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { 
        ...t, 
        status: 'collected' as const,
        collectedAt: new Date(),
        collectedBy: 'Radiologist Dr. Martinez'
      } : t
    ));
  };

  const handleStartExam = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { ...t, status: 'in-progress' as const } : t
    ));
  };

  // Filter tests by status and urgency
  const orderedTests = radiologyTests.filter(t => t.status === 'ordered');
  const scheduledTests = radiologyTests.filter(t => t.status === 'scheduled');
  const collectedTests = radiologyTests.filter(t => t.status === 'collected');
  const inProgressTests = radiologyTests.filter(t => t.status === 'in-progress');

  const statTests = orderedTests.filter(t => t.urgency === 'stat');
  const urgentTests = orderedTests.filter(t => t.urgency === 'urgent');
  const routineTests = orderedTests.filter(t => t.urgency === 'routine');

  const urgencyColors = {
    stat: 'border-l-red-500',
    urgent: 'border-l-orange-500',
    routine: 'border-l-blue-500'
  };

  const urgencyBadgeVariant = (urgency: string) => {
    switch (urgency) {
      case 'stat': return 'destructive';
      case 'urgent': return 'secondary';
      case 'routine': return 'outline';
      default: return 'outline';
    }
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatScheduledTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getExamPrep = (testName: string) => {
    const prep: { [key: string]: string } = {
      'Chest CT Scan': 'IV contrast required. Verify kidney function. Patient NPO 4 hours.',
      'Chest X-Ray': 'Portable exam available. No preparation required.',
      'Head Ultrasound': 'No preparation required. Portable bedside exam.',
      'CT Head': 'No preparation required for non-contrast study.',
    };
    
    return prep[testName] || 'Verify patient preparation and contraindications before exam.';
  };

  const renderTestCard = (test: TestOrder, showScheduleButton = false, showStartButton = false, showCompleteButton = false) => {
    return (
      <Card
        key={test.id}
        className={`border-l-4 ${
          test.status === 'in-progress' ? 'border-l-purple-500 bg-purple-50/10' :
          test.status === 'collected' ? 'border-l-emerald-500 bg-emerald-50/10 opacity-70' :
          urgencyColors[test.urgency]
        } shadow-sm hover:shadow-md transition-all`}
      >
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
                  <ScanLine className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{test.testName}</h3>
                {test.status === 'ordered' && (
                   <Badge variant={urgencyBadgeVariant(test.urgency) as any} className={
                     test.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                   }>
                     {test.urgency.toUpperCase()}
                   </Badge>
                )}
                {test.status === 'scheduled' && (
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                    Scheduled
                  </Badge>
                )}
                {test.status === 'in-progress' && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                    In Progress
                  </Badge>
                )}
                {test.status === 'collected' && (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                    <CheckCircle className="w-3 h-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">{test.bedNumber}</span>
                <span className="text-slate-300">|</span>
                <span>{test.patientName}</span>
              </div>

              {test.scheduledTime && test.status === 'scheduled' && (
                <div className="inline-flex items-center gap-2 text-sm bg-blue-50 border border-blue-100 rounded px-3 py-1.5 text-blue-700">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    Scheduled: {formatScheduledTime(test.scheduledTime)}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-md border border-slate-100 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">Ordered</span>
                  <div className="flex items-center gap-1 text-slate-900">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {getTimeAgo(test.orderedAt)} <span className="text-slate-400">by</span> {test.orderedBy}
                  </div>
                </div>
                <div>
                   <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">Preparation</span>
                   <span className="text-teal-700">{getExamPrep(test.testName)}</span>
                </div>
              </div>

              <div className="text-sm border-t border-slate-100 pt-2">
                 <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold mr-2">Indication:</span>
                 <span className="text-slate-700">{test.clinicalIndication}</span>
              </div>

              {test.collectedAt && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium pt-1">
                  <CheckCircle className="w-4 h-4" />
                  Completed {getTimeAgo(test.collectedAt)} by {test.collectedBy}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 shrink-0 md:w-40 pt-2 md:pt-0">
               {showScheduleButton && test.urgency === 'routine' && schedulingTest !== test.id && (
                 <Popover open={schedulingTest === test.id} onOpenChange={(open) => !open && setSchedulingTest(null)}>
                   <PopoverTrigger asChild>
                     <Button 
                       variant="outline" 
                       onClick={(e) => { e.stopPropagation(); setSchedulingTest(test.id); }}
                     >
                       <Calendar className="w-4 h-4 mr-2" /> Schedule
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-80" align="end">
                     <div className="grid gap-4">
                       <div className="space-y-2">
                         <h4 className="font-medium leading-none">Schedule Exam</h4>
                         <p className="text-sm text-slate-500">Set a time for this imaging procedure.</p>
                       </div>
                       <div className="grid gap-2">
                         <div className="grid grid-cols-3 items-center gap-4">
                           <Label htmlFor="date">Date</Label>
                           <Input
                             id="date"
                             type="date"
                             className="col-span-2 h-8"
                             value={scheduledDate}
                             onChange={(e) => setScheduledDate(e.target.value)}
                             min={new Date().toISOString().split('T')[0]}
                           />
                         </div>
                         <div className="grid grid-cols-3 items-center gap-4">
                           <Label htmlFor="time">Time</Label>
                           <Input
                             id="time"
                             type="time"
                             className="col-span-2 h-8"
                             value={scheduledTime}
                             onChange={(e) => setScheduledTime(e.target.value)}
                           />
                         </div>
                       </div>
                       <Button onClick={() => handleSchedule(test.id)} disabled={!scheduledDate || !scheduledTime}>
                         Confirm Schedule
                       </Button>
                     </div>
                   </PopoverContent>
                 </Popover>
               )}

               {showScheduleButton && test.urgency !== 'routine' && (
                 <Button 
                   className="bg-purple-600 hover:bg-purple-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleStartExam(test.id); }}
                 >
                   <ScanLine className="w-4 h-4 mr-2" /> Start Now
                 </Button>
               )}

               {showStartButton && (
                 <Button 
                   className="bg-purple-600 hover:bg-purple-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleStartExam(test.id); }}
                 >
                   <ScanLine className="w-4 h-4 mr-2" /> Start Exam
                 </Button>
               )}

               {showCompleteButton && (
                 <Button 
                   className="bg-emerald-600 hover:bg-emerald-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleMarkCompleted(test.id); }}
                 >
                   <CheckCircle className="w-4 h-4 mr-2" /> Complete
                 </Button>
               )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Imaging Queue</h1>
        <p className="text-slate-500">
          {statTests.length} STAT • {urgentTests.length} urgent • {routineTests.length} routine • {scheduledTests.length} scheduled • {inProgressTests.length} in progress
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">STAT Orders</div>
            <div className="text-3xl font-bold text-slate-900">{statTests.length}</div>
            <div className="text-xs font-medium text-red-600 mt-1">Immediate imaging</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Urgent</div>
            <div className="text-3xl font-bold text-slate-900">{urgentTests.length}</div>
            <div className="text-xs font-medium text-orange-600 mt-1">Within hours</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Scheduled</div>
            <div className="text-3xl font-bold text-slate-900">{scheduledTests.length}</div>
            <div className="text-xs font-medium text-blue-600 mt-1">Appointments set</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-slate-900">{inProgressTests.length}</div>
            <div className="text-xs font-medium text-purple-600 mt-1">Currently scanning</div>
          </CardContent>
        </Card>
      </div>

      {statTests.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Priority Action Required</AlertTitle>
          <AlertDescription className="text-red-800">
            {statTests.length} STAT imaging order{statTests.length !== 1 ? 's' : ''} require immediate attention!
          </AlertDescription>
        </Alert>
      )}

      {/* New Orders - Need Action */}
      {orderedTests.length > 0 && (
        <div className="space-y-8">
          {statTests.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500" /> STAT - Perform Immediately
              </h3>
              {statTests.map(test => renderTestCard(test, true))}
            </div>
          )}
          {urgentTests.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-orange-500" /> Urgent - Perform Within Hours
              </h3>
              {urgentTests.map(test => renderTestCard(test, true))}
            </div>
          )}
          {routineTests.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-blue-500" /> Routine - Schedule Exam
              </h3>
              {routineTests.map(test => renderTestCard(test, true))}
            </div>
          )}
        </div>
      )}

      {/* Scheduled Exams */}
      {scheduledTests.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-blue-600" /> Scheduled Exams
          </h3>
          {scheduledTests.map(test => renderTestCard(test, false, true))}
        </div>
      )}

      {/* In Progress */}
      {inProgressTests.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <ScanLine className="w-5 h-5 text-purple-600" /> Exams in Progress
          </h3>
          {inProgressTests.map(test => renderTestCard(test, false, false, true))}
        </div>
      )}

      {/* Recently Completed */}
      {collectedTests.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <CheckCircle className="w-5 h-5 text-emerald-600" /> Recently Completed
          </h3>
          {collectedTests.map(test => renderTestCard(test))}
        </div>
      )}

      {radiologyTests.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <ScanLine className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Imaging Orders</h3>
          <p className="text-slate-500">There are no radiology orders pending at this time.</p>
        </Card>
      )}
    </div>
  );
}
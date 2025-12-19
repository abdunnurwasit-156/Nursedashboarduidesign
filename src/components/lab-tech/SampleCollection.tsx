import { Syringe, MapPin, Clock, CheckCircle, AlertCircle, Calendar, TestTube, ScanLine, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { mockTestOrders } from '../../data/doctorMockData';
import { TestOrder } from '../../types/doctor';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function SampleCollection() {
  const [tests, setTests] = useState(mockTestOrders);
  const [schedulingTest, setSchedulingTest] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

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

  const handleMarkCollected = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { 
        ...t, 
        status: 'collected' as const,
        collectedAt: new Date(),
        collectedBy: 'Pathologist Sarah Kim'
      } : t
    ));
  };

  // Filter for lab tests only
  const labTests = tests.filter(t => t.type === 'lab');

  // Only show tests that are ordered or scheduled (ready for collection)
  const orderedTests = labTests.filter(t => t.status === 'ordered');
  const scheduledTests = labTests.filter(t => t.status === 'scheduled');
  const collectedTests = labTests.filter(t => t.status === 'collected');
  
  const collectibleTests = [...orderedTests, ...scheduledTests];
  
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

  const getTestIcon = (type: string) => {
    return type === 'radiology' ? ScanLine : TestTube;
  };

  const getSampleType = (testName: string, type: string) => {
    if (type === 'radiology') return 'Imaging Study';
    
    const sampleTypes: { [key: string]: string } = {
      'Arterial Blood Gas': 'Arterial Blood (heparinized)',
      'Complete Blood Count': 'Venous Blood (EDTA tube)',
      'Blood Culture': 'Venous Blood (2 sets)',
      'Troponin I': 'Venous Blood (Serum)',
      'Complete Metabolic Panel': 'Venous Blood (Serum)',
      'Lipid Panel': 'Venous Blood (Fasting)',
      'Hemoglobin A1C': 'Venous Blood (EDTA tube)',
      'Thyroid Function Panel': 'Venous Blood (Serum)',
      'Coagulation Panel': 'Venous Blood (Citrate tube)',
      'Liver Function Panel': 'Venous Blood (Serum)',
    };
    
    return sampleTypes[testName] || 'Blood Sample';
  };

  const getCollectionInstructions = (testName: string, type: string) => {
    if (type === 'radiology') return 'Schedule imaging appointment, ensure patient preparation complete';
    
    const instructions: { [key: string]: string } = {
      'Arterial Blood Gas': 'Draw from radial artery, heparinized syringe, transport on ice immediately',
      'Complete Blood Count': 'Purple top (EDTA) tube, 3-5 mL, mix gently by inversion',
      'Blood Culture': 'Sterile technique required, collect 2 sets from different sites, aerobic/anaerobic bottles',
      'Troponin I': 'Red or gold top tube, 3-5 mL, allow to clot before centrifuge',
      'Complete Metabolic Panel': 'Red or gold top tube, 5-7 mL, patient fasting preferred',
      'Lipid Panel': 'Red or gold top tube, fasting required (9-12 hours)',
      'Hemoglobin A1C': 'Purple or lavender top (EDTA) tube, 3 mL, no special preparation',
      'Thyroid Function Panel': 'Red or gold top tube, 5 mL, morning collection preferred',
      'Coagulation Panel': 'Light blue top (citrate) tube, 2.7 mL, fill to proper level',
      'Liver Function Panel': 'Red or gold top tube, 5 mL, fasting not required',
    };
    
    return instructions[testName] || 'Follow standard phlebotomy protocol';
  };

  const renderTestCard = (test: TestOrder, isCollected = false, showScheduleButton = false) => {
    const TestIcon = getTestIcon(test.type);
    
    return (
      <Card
        key={test.id}
        className={`transition-all border-l-4 ${isCollected ? 'border-l-slate-300 opacity-70 bg-slate-50' : urgencyColors[test.urgency]} shadow-sm hover:shadow-md`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`p-2 rounded-lg ${
                  isCollected ? 'bg-slate-200 text-slate-500' :
                  test.urgency === 'stat' ? 'bg-red-100 text-red-600' :
                  test.urgency === 'urgent' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <TestIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{test.testName}</h3>
                {!isCollected && (
                  <Badge variant={urgencyBadgeVariant(test.urgency) as any} className={
                     test.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                  }>
                    {test.urgency.toUpperCase()}
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  {test.type}
                </Badge>
                {isCollected && (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                    <CheckCircle className="w-3 h-3 mr-1" /> Collected
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">{test.bedNumber}</span>
                <span className="text-slate-300">|</span>
                <span>{test.patientName}</span>
              </div>

              {test.scheduledTime && !isCollected && (
                <div className="inline-flex items-center gap-2 text-sm bg-blue-50 border border-blue-100 rounded px-3 py-1.5 text-blue-700">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    Scheduled: {formatScheduledTime(test.scheduledTime)}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-md border border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Sample Type</div>
                  <div className="text-sm font-medium text-slate-900">{getSampleType(test.testName, test.type)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Ordered</div>
                  <div className="text-sm text-slate-900 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {getTimeAgo(test.orderedAt)}
                  </div>
                </div>
              </div>

              <div className="text-sm">
                 <span className="text-slate-500 block mb-1 text-xs uppercase tracking-wider font-semibold">Instructions</span>
                 <p className="text-slate-700">{getCollectionInstructions(test.testName, test.type)}</p>
              </div>

              <div className="text-sm border-t border-slate-100 pt-2 mt-2">
                 <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold mr-2">Clinical Indication:</span>
                 <span className="text-slate-600">{test.clinicalIndication}</span>
              </div>

              {isCollected && test.collectedAt && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium pt-2">
                  <CheckCircle className="w-4 h-4" />
                  Collected {getTimeAgo(test.collectedAt)} by {test.collectedBy}
                </div>
              )}

              {!isCollected && test.status === 'scheduled' && (
                <div className="text-xs text-blue-600 italic flex items-center gap-1 pt-2">
                  <AlertCircle className="w-3 h-3" />
                  This test is scheduled. Collect sample at the appointed time.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
               {showScheduleButton && schedulingTest !== test.id && (
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
                         <h4 className="font-medium leading-none">Schedule Collection</h4>
                         <p className="text-sm text-slate-500">Set a time for sample collection.</p>
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

               {!isCollected && !showScheduleButton && (
                 <Button 
                   className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                   onClick={() => handleMarkCollected(test.id)}
                 >
                   <Syringe className="w-4 h-4 mr-2" /> Mark Collected
                 </Button>
               )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sample Collection</h1>
        <p className="text-slate-500">
          {collectibleTests.length} pending collection • {statTests.length} STAT • {urgentTests.length} urgent • {routineTests.length} routine • {scheduledTests.length} scheduled
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">STAT Priority</div>
            <div className="text-3xl font-bold text-slate-900">{statTests.length}</div>
            <div className="text-xs font-medium text-red-600 mt-1">Collect immediately</div>
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
            <div className="text-sm font-medium text-slate-500 mb-1">Routine</div>
            <div className="text-3xl font-bold text-slate-900">{routineTests.length}</div>
            <div className="text-xs font-medium text-blue-600 mt-1">Need scheduling</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Collected Today</div>
            <div className="text-3xl font-bold text-slate-900">{collectedTests.length}</div>
            <div className="text-xs font-medium text-emerald-600 mt-1">Ready to process</div>
          </CardContent>
        </Card>
      </div>

      {statTests.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Priority Action Required</AlertTitle>
          <AlertDescription className="text-red-800">
            {statTests.length} STAT sample{statTests.length !== 1 ? 's' : ''} require immediate collection!
          </AlertDescription>
        </Alert>
      )}

      {/* STAT Tests */}
      {statTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-500" /> STAT - Collect Immediately
          </h3>
          {statTests.map(test => renderTestCard(test))}
        </div>
      )}

      {/* Urgent Tests */}
      {urgentTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-orange-500" /> Urgent - Collect Within Hours
          </h3>
          {urgentTests.map(test => renderTestCard(test))}
        </div>
      )}

      {/* Routine Tests - Need Scheduling */}
      {routineTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-500" /> Routine - Schedule Collection
          </h3>
          {routineTests.map(test => renderTestCard(test, false, true))}
        </div>
      )}

      {/* Scheduled Tests */}
      {scheduledTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-blue-600" /> Scheduled Collections
          </h3>
          {scheduledTests.map(test => renderTestCard(test))}
        </div>
      )}

      {/* Recently Collected */}
      {collectedTests.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
             <CheckCircle className="w-5 h-5 text-emerald-600" /> Recently Collected
          </h3>
          {collectedTests.map(test => renderTestCard(test, true))}
        </div>
      )}

      {collectibleTests.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">All Samples Collected</h3>
          <p className="text-slate-500">No pending sample collections at the moment.</p>
        </Card>
      )}
    </div>
  );
}
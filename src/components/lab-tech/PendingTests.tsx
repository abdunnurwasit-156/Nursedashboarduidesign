import { useState } from 'react';
import { Beaker, Syringe, Clock, AlertCircle, CheckCircle, FileText, Calendar, TestTube, ScanLine, ArrowRight } from 'lucide-react';
import { mockTestOrders, mockTestResults } from '../../data/doctorMockData';
import { TestDetailsSidebar } from './TestDetailsSidebar';
import { TestOrder, TestResult } from '../../types/doctor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

export function PendingTests() {
  const [tests, setTests] = useState(mockTestOrders);
  const [selectedTest, setSelectedTest] = useState<TestOrder | TestResult | null>(null);
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

  const handleCollectSample = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { 
        ...t, 
        status: 'collected' as const,
        collectedAt: new Date(),
        collectedBy: 'Pathologist Sarah Kim'
      } : t
    ));
  };

  const handleStartProcessing = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { ...t, status: 'in-progress' as const } : t
    ));
  };

  // Filter tests by status and urgency
  const orderedTests = tests.filter(t => t.status === 'ordered');
  const scheduledTests = tests.filter(t => t.status === 'scheduled');
  const collectedTests = tests.filter(t => t.status === 'collected');

  const statTests = orderedTests.filter(t => t.urgency === 'stat');
  const urgentTests = orderedTests.filter(t => t.urgency === 'urgent');
  const routineTests = orderedTests.filter(t => t.urgency === 'routine');

  // Filter for lab tests only - Pending Tests should only show collected samples ready for processing
  const labTests = tests.filter(t => t.type === 'lab' && t.status === 'collected');
  
  const statCollected = labTests.filter(t => t.urgency === 'stat');
  const urgentCollected = labTests.filter(t => t.urgency === 'urgent');
  const routineCollected = labTests.filter(t => t.urgency === 'routine');

  const urgencyBadgeVariant = (urgency: string) => {
    switch (urgency) {
      case 'stat': return 'destructive';
      case 'urgent': return 'secondary'; // Orange-ish usually handled via class or custom variant
      case 'routine': return 'outline';
      default: return 'outline';
    }
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
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

  const renderTestCard = (test: TestOrder, showScheduleButton = false, showCollectButton = false, showProcessButton = false) => {
    const TestIcon = getTestIcon(test.type);
    
    return (
      <Card
        key={test.id}
        className={`hover:shadow-md transition-all cursor-pointer border-l-4 ${
          test.urgency === 'stat' ? 'border-l-red-500' : 
          test.urgency === 'urgent' ? 'border-l-orange-500' : 'border-l-blue-500'
        }`}
        onClick={() => setSelectedTest(test)}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`p-2 rounded-lg ${
                  test.urgency === 'stat' ? 'bg-red-100 text-red-600' :
                  test.urgency === 'urgent' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <TestIcon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-slate-900">{test.testName}</h4>
                <Badge variant={urgencyBadgeVariant(test.urgency) as any} className={
                   test.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                }>
                  {test.urgency.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  {test.type}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                   <span className="font-medium text-slate-900">{test.bedNumber}</span>
                   <span className="text-slate-300">|</span>
                   <span>{test.patientName}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-slate-400">Ordered by:</span>
                   <span>{test.orderedBy}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm">
                <span className="font-medium text-slate-700 block mb-1">Clinical Indication:</span>
                <span className="text-slate-600">{test.clinicalIndication}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getTimeAgo(test.orderedAt)}
                </span>
                
                {test.scheduledTime && (
                  <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    <Calendar className="w-3 h-3" />
                    Scheduled: {formatScheduledTime(test.scheduledTime)}
                  </span>
                )}
                {test.collectedAt && (
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <CheckCircle className="w-3 h-3" />
                    Collected {getTimeAgo(test.collectedAt)} by {test.collectedBy}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
               {showScheduleButton && test.urgency === 'routine' && (
                 <Popover open={schedulingTest === test.id} onOpenChange={(open) => !open && setSchedulingTest(null)}>
                   <PopoverTrigger asChild>
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={(e) => { e.stopPropagation(); setSchedulingTest(test.id); }}
                     >
                       <Calendar className="w-4 h-4 mr-2" /> Schedule
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-80" align="end" onClick={(e) => e.stopPropagation()}>
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

               {showScheduleButton && test.urgency !== 'routine' && (
                 <Button 
                   size="sm" 
                   className="bg-emerald-600 hover:bg-emerald-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleCollectSample(test.id); }}
                 >
                   <Syringe className="w-4 h-4 mr-2" /> Collect Now
                 </Button>
               )}

               {showCollectButton && (
                 <Button 
                   size="sm"
                   className="bg-emerald-600 hover:bg-emerald-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleCollectSample(test.id); }}
                 >
                   <Syringe className="w-4 h-4 mr-2" /> Collect Sample
                 </Button>
               )}

               {showProcessButton && (
                 <Button 
                   size="sm"
                   className="bg-purple-600 hover:bg-purple-700 text-white"
                   onClick={(e) => { e.stopPropagation(); handleStartProcessing(test.id); }}
                 >
                   <Beaker className="w-4 h-4 mr-2" /> Start Processing
                 </Button>
               )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPreviousTests = () => {
    if (mockTestResults.length === 0) return null;

    return (
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-semibold text-slate-900">Previous Tests</h3>
          <Badge variant="secondary">{mockTestResults.length}</Badge>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {mockTestResults.map(result => {
            const resultColors = result.isCritical
              ? 'border-l-red-500 bg-red-50/50'
              : result.isAbnormal
              ? 'border-l-orange-500 bg-orange-50/50'
              : 'border-l-emerald-500 bg-emerald-50/50';

            const TestIcon = getTestIcon(result.type);

            return (
              <Card
                key={result.id}
                className={`cursor-pointer hover:shadow-md transition-all border-l-4 ${resultColors}`}
                onClick={() => setSelectedTest(result)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TestIcon className="w-4 h-4 text-slate-500" />
                        <h4 className="font-medium text-slate-900">{result.testName}</h4>
                        {result.isCritical && (
                          <Badge variant="destructive" className="h-5 text-[10px]">CRITICAL</Badge>
                        )}
                        {!result.isCritical && result.isAbnormal && (
                          <Badge variant="secondary" className="h-5 text-[10px] bg-orange-100 text-orange-800 hover:bg-orange-100">ABNORMAL</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <span className="font-medium">{result.bedNumber}</span>
                        <span>•</span>
                        <span>{result.patientName}</span>
                      </div>
                      <div className="bg-white/50 rounded p-2 mb-2 border border-slate-100">
                        <div className="text-sm font-medium text-slate-900">{result.result}</div>
                        {result.normalRange && (
                          <div className="text-xs text-slate-500">Normal: {result.normalRange}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(result.completedAt)}
                        </span>
                        {result.reviewedBy && (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle className="w-3 h-3" />
                            Reviewed by {result.reviewedBy}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pending Tests</h1>
        <p className="text-slate-500">
          {labTests.length} samples collected • {statCollected.length} STAT • {urgentCollected.length} urgent • {routineCollected.length} routine
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">STAT Priority</div>
            <div className="text-3xl font-bold text-slate-900">{statCollected.length}</div>
            <div className="text-xs font-medium text-red-600 mt-1">Process immediately</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Urgent</div>
            <div className="text-3xl font-bold text-slate-900">{urgentCollected.length}</div>
            <div className="text-xs font-medium text-orange-600 mt-1">Process within hours</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Routine</div>
            <div className="text-3xl font-bold text-slate-900">{routineCollected.length}</div>
            <div className="text-xs font-medium text-blue-600 mt-1">Standard processing</div>
          </CardContent>
        </Card>
      </div>

      {statCollected.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Immediate Action Required</AlertTitle>
          <AlertDescription className="text-red-800">
            {statCollected.length} STAT sample{statCollected.length !== 1 ? 's' : ''} collected and waiting. Begin processing immediately!
          </AlertDescription>
        </Alert>
      )}

      {/* Collected Samples - Ready to Process */}
      <div className="space-y-6">
        {statCollected.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" /> STAT - Process Immediately
            </h3>
            {statCollected.map(test => renderTestCard(test, false, false, true))}
          </div>
        )}

        {urgentCollected.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Urgent - Process Within Hours
            </h3>
            {urgentCollected.map(test => renderTestCard(test, false, false, true))}
          </div>
        )}

        {routineCollected.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Routine - Standard Processing
            </h3>
            {routineCollected.map(test => renderTestCard(test, false, false, true))}
          </div>
        )}
      </div>

      {labTests.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Samples Ready</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            No collected samples are currently awaiting processing. Check the Sample Collection tab for pending collections.
          </p>
        </Card>
      )}

      <Separator />

      {renderPreviousTests()}

      <TestDetailsSidebar 
        test={selectedTest}
        onClose={() => setSelectedTest(null)}
      />
    </div>
  );
}
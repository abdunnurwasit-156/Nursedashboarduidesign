import { TrendingUp, Clock, Beaker, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { mockTestOrders } from '../../data/doctorMockData';
import { TestOrder } from '../../types/doctor';
import { ResultsEntryPage } from './ResultsEntryPage';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function InProgress() {
  const [tests, setTests] = useState(mockTestOrders);
  const [selectedTest, setSelectedTest] = useState<TestOrder | null>(null);

  const handleEnterResults = (test: TestOrder) => {
    setSelectedTest(test);
  };

  const handleCompleteTest = (testId: string, results: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { 
        ...t, 
        status: 'completed' as const,
        completedAt: new Date(),
        result: results
      } : t
    ));
    setSelectedTest(null);
  };

  const handleBackToList = () => {
    setSelectedTest(null);
  };

  // If a test is selected for results entry, show the full-page form
  if (selectedTest) {
    return (
      <ResultsEntryPage
        test={selectedTest}
        onComplete={(results) => handleCompleteTest(selectedTest.id, results)}
        onBack={handleBackToList}
      />
    );
  }

  // Filter for lab tests that are in-progress
  const inProgressTests = tests.filter(t => t.type === 'lab' && t.status === 'in-progress');
  
  const statTests = inProgressTests.filter(t => t.urgency === 'stat');
  const urgentTests = inProgressTests.filter(t => t.urgency === 'urgent');
  const routineTests = inProgressTests.filter(t => t.urgency === 'routine');

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
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const renderTestCard = (test: TestOrder) => {
    return (
      <Card
        key={test.id}
        className={`border-l-4 ${urgencyColors[test.urgency]} shadow-sm`}
      >
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Beaker className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{test.testName}</h3>
                <Badge variant={urgencyBadgeVariant(test.urgency) as any} className={
                   test.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                }>
                  {test.urgency.toUpperCase()}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                  Processing
                </Badge>
              </div>

              <div className="text-sm text-slate-600 font-medium">
                {test.bedNumber} - {test.patientName}
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-md p-3 text-sm">
                <span className="text-slate-500 font-semibold block mb-1 text-xs uppercase tracking-wider">Clinical Indication</span>
                <span className="text-slate-800">{test.clinicalIndication}</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Ordered By</div>
                  <div className="font-medium text-slate-900">{test.orderedBy}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Ordered</div>
                  <div className="flex items-center gap-1 font-medium text-slate-900">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {getTimeAgo(test.orderedAt)}
                  </div>
                </div>
                {test.collectedAt && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Collected</div>
                    <div className="flex items-center gap-1 font-medium text-slate-900">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      {getTimeAgo(test.collectedAt)}
                    </div>
                  </div>
                )}
              </div>

              {test.collectedBy && (
                <div className="text-xs text-slate-500">
                  Sample collected by <span className="font-medium text-slate-700">{test.collectedBy}</span>
                </div>
              )}
            </div>

            <div className="md:w-48 shrink-0">
              <Button
                onClick={() => handleEnterResults(test)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm h-12"
              >
                <FileText className="w-4 h-4 mr-2" /> Enter Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tests In Progress</h1>
        <p className="text-slate-500">
          {inProgressTests.length} tests currently being processed • {statTests.length} STAT • {urgentTests.length} urgent • {routineTests.length} routine
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">STAT Priority</div>
            <div className="text-3xl font-bold text-slate-900">{statTests.length}</div>
            <div className="text-xs font-medium text-red-600 mt-1">Results needed urgently</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Urgent</div>
            <div className="text-3xl font-bold text-slate-900">{urgentTests.length}</div>
            <div className="text-xs font-medium text-orange-600 mt-1">Complete within hours</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-white">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Routine</div>
            <div className="text-3xl font-bold text-slate-900">{routineTests.length}</div>
            <div className="text-xs font-medium text-blue-600 mt-1">Standard timeline</div>
          </CardContent>
        </Card>
      </div>

      {statTests.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Priority Action Required</AlertTitle>
          <AlertDescription className="text-red-800">
            {statTests.length} STAT test{statTests.length !== 1 ? 's' : ''} in progress - results needed urgently!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* STAT Tests */}
        {statTests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500" /> STAT - Results Needed Urgently
            </h3>
            {statTests.map(test => renderTestCard(test))}
          </div>
        )}

        {/* Urgent Tests */}
        {urgentTests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-orange-500" /> Urgent - Complete Within Hours
            </h3>
            {urgentTests.map(test => renderTestCard(test))}
          </div>
        )}

        {/* Routine Tests */}
        {routineTests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500" /> Routine - Standard Processing
            </h3>
            {routineTests.map(test => renderTestCard(test))}
          </div>
        )}
      </div>

      {inProgressTests.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <Beaker className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Tests in Progress</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            All tests have been completed or are pending collection. Check Pending Tests to start processing.
          </p>
        </Card>
      )}
    </div>
  );
}
import { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface TestResult {
  id: string;
  testName: string;
  patientName: string;
  bedNumber: string;
  result: string;
  isCritical: boolean;
}

export function EnterResults() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isCritical, setIsCritical] = useState(false);

  const testsToEnter = [
    {
      id: 't1',
      testName: 'Arterial Blood Gas',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      collectedAt: new Date(Date.now() - 30 * 60000)
    },
    {
      id: 't2',
      testName: 'Complete Blood Count',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      collectedAt: new Date(Date.now() - 90 * 60000)
    }
  ];

  const handleSubmitResult = () => {
    console.log('Submitting result:', { selectedTest, result, isCritical });
    alert(isCritical ? 'Critical result submitted! Doctor will be notified immediately.' : 'Result submitted successfully');
    setSelectedTest(null);
    setResult('');
    setIsCritical(false);
  };

  const selectedTestData = testsToEnter.find(t => t.id === selectedTest);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enter Results</h1>
        <p className="text-slate-500">Enter and submit test results for processing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tests Awaiting Results List */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Awaiting Results</CardTitle>
              <CardDescription>Select a test to enter data</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                {testsToEnter.map(test => (
                  <button
                    key={test.id}
                    onClick={() => setSelectedTest(test.id)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start gap-3 group ${
                      selectedTest === test.id ? 'bg-blue-50/50 hover:bg-blue-50/50' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                       selectedTest === test.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all'
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${selectedTest === test.id ? 'text-blue-900' : 'text-slate-900'}`}>
                        {test.testName}
                      </h4>
                      <div className="text-sm text-slate-500 truncate mt-0.5">
                        {test.bedNumber} • {test.patientName}
                      </div>
                      <div className="text-xs text-slate-400 mt-2">
                        Collected {Math.floor((Date.now() - test.collectedAt.getTime()) / 60000)} min ago
                      </div>
                    </div>
                    {selectedTest === test.id && <ArrowRight className="w-4 h-4 text-blue-400 mt-2" />}
                  </button>
                ))}
               </div>
               {testsToEnter.length === 0 && (
                 <div className="p-8 text-center text-slate-500">
                   No pending tests found.
                 </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Result Entry Form */}
        <div className="lg:col-span-8">
          {selectedTestData ? (
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enter Result: {selectedTestData.testName}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedTestData.patientName} ({selectedTestData.bedNumber})
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Processing
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="results" className="text-base">Test Findings / Measurements</Label>
                  <Textarea
                    id="results"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="Enter detailed test results..."
                    className="min-h-[200px] resize-y font-mono text-sm"
                  />
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="critical"
                      checked={isCritical}
                      onCheckedChange={(checked) => setIsCritical(checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="critical"
                        className="text-sm font-semibold text-slate-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Mark as Critical Value
                      </Label>
                      <p className="text-sm text-slate-500">
                        Check this if the results indicate a life-threatening condition requiring immediate physician notification.
                      </p>
                    </div>
                  </div>
                </div>

                {isCritical && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-900 font-semibold">Critical Value Alert</AlertTitle>
                    <AlertDescription className="text-red-800">
                      The attending physician will be automatically notified via SMS and pager upon submission.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleSubmitResult}
                    disabled={!result.trim()}
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-600">No Test Selected</p>
              <p className="text-sm">Select a test from the list to begin entering results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
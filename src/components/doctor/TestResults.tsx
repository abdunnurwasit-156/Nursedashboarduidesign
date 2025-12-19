import { useState } from 'react';
import { mockTestResults } from '../../data/doctorMockData';
import { TestResult } from '../../types/doctor';
import { AlertCircle, CheckCircle, FileText, X, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export function TestResults() {
  const [results, setResults] = useState(mockTestResults);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [interpretation, setInterpretation] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleMarkReviewed = (id: string, interp: string) => {
    setResults(results.map(r =>
      r.id === id ? {
        ...r,
        reviewedBy: 'Dr. Adams',
        reviewedAt: new Date(),
        interpretation: interp
      } : r
    ));
    setSelectedResult(null);
    setInterpretation('');
  };

  const filteredResults = filterStatus === 'all'
    ? results
    : filterStatus === 'pending'
    ? results.filter(r => !r.reviewedBy)
    : results.filter(r => r.reviewedBy);

  const pendingCount = results.filter(r => !r.reviewedBy).length;
  const criticalCount = results.filter(r => r.isCritical && !r.reviewedBy).length;

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (60 * 60000));
    if (hours < 1) return 'Just completed';
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Test Results</h1>
          <p className="text-slate-500">
            {pendingCount} pending review • {criticalCount} critical
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {criticalCount > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-900 font-medium">
              {criticalCount} critical result{criticalCount !== 1 ? 's' : ''} require immediate review.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredResults.map((result) => (
          <Card 
            key={result.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              result.isCritical ? 'border-l-4 border-l-red-500' : 
              !result.reviewedBy ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-slate-200'
            }`}
            onClick={() => setSelectedResult(result)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{result.testName}</h3>
                    {result.isCritical && (
                      <Badge variant="destructive">CRITICAL</Badge>
                    )}
                    {result.isAbnormal && !result.isCritical && (
                      <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">ABNORMAL</Badge>
                    )}
                    {result.reviewedBy && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" /> Reviewed
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{result.bedNumber}</span> - {result.patientName}
                  </div>

                  <div className="mt-2 p-3 bg-slate-50 rounded-md border border-slate-100 font-mono text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900">{result.result}</span>
                      {result.normalRange && (
                        <span className="text-slate-500 text-xs">Ref: {result.normalRange}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[150px]">
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {getTimeAgo(result.completedAt)}
                  </span>
                  {!result.reviewedBy ? (
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Review</Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full">View Details</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedResult} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Test Result</DialogTitle>
            <DialogDescription>
              {selectedResult?.bedNumber} - {selectedResult?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedResult && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{selectedResult.testName}</h3>
                  {selectedResult.isCritical && <Badge variant="destructive">CRITICAL VALUE</Badge>}
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-2xl font-bold text-slate-900">{selectedResult.result}</span>
                    <span className="text-sm text-slate-500">Ref Range: {selectedResult.normalRange}</span>
                  </div>
                </div>
              </div>

              {selectedResult.isCritical && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-red-900">Critical Value Alert</h4>
                    <p className="text-sm text-red-800 leading-relaxed">
                      This result requires immediate clinical action. Patient should be assessed and appropriate interventions initiated.
                    </p>
                  </div>
                </div>
              )}

              {!selectedResult.reviewedBy ? (
                <div className="space-y-3">
                  <Label>Clinical Interpretation</Label>
                  <Textarea
                    value={interpretation}
                    onChange={(e) => setInterpretation(e.target.value)}
                    placeholder="Enter your clinical interpretation and planned actions..."
                    className="min-h-[120px]"
                  />
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800">
                    <p className="font-medium mb-1">Suggested Actions:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-1">
                      {selectedResult.isCritical && <li>Review patient immediately</li>}
                      <li>Update treatment plan if needed</li>
                      <li>Document in progress notes</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Review Note</Label>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700">
                    {selectedResult.interpretation}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Reviewed by {selectedResult.reviewedBy} on {selectedResult.reviewedAt?.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedResult(null)}>Close</Button>
            {selectedResult && !selectedResult.reviewedBy && (
              <Button 
                onClick={() => handleMarkReviewed(selectedResult.id, interpretation)}
                disabled={!interpretation.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Reviewed
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
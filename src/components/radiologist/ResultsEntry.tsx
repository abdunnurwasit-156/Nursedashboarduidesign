import { FileText, Upload, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface CompletedScan {
  id: string;
  examType: string;
  patientName: string;
  bedNumber: string;
  completedAt: Date;
  hasFindings: boolean;
  resultEntered: boolean;
}

export function ResultsEntry() {
  const [scans, setScans] = useState<CompletedScan[]>([
    {
      id: 'res1',
      examType: 'Chest X-Ray (Portable)',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      completedAt: new Date(Date.now() - 5 * 60000),
      hasFindings: true,
      resultEntered: false
    },
    {
      id: 'res2',
      examType: 'Chest X-Ray (Portable)',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      completedAt: new Date(Date.now() - 15 * 60000),
      hasFindings: false,
      resultEntered: false
    },
    {
      id: 'res3',
      examType: 'Abdominal Ultrasound',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      completedAt: new Date(Date.now() - 25 * 60000),
      hasFindings: false,
      resultEntered: false
    }
  ]);

  const [activeResultId, setActiveResultId] = useState<string | null>(null);

  const handleEnterResults = (id: string) => {
    setScans(scans.map(s => s.id === id ? { ...s, resultEntered: true } : s));
    setActiveResultId(null);
  };

  const toggleEntry = (id: string) => {
    setActiveResultId(activeResultId === id ? null : id);
  };

  const pendingResults = scans.filter(s => !s.resultEntered);
  const criticalFindings = pendingResults.filter(s => s.hasFindings);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Results Entry</h1>
        <p className="text-slate-500">
          {pendingResults.length} pending interpretation • {criticalFindings.length} with preliminary findings
        </p>
      </div>

      {criticalFindings.length > 0 && (
        <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-900">
          <FileText className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900 font-semibold">Priority Interpretations</AlertTitle>
          <AlertDescription className="text-orange-800">
            {criticalFindings.length} scan{criticalFindings.length !== 1 ? 's' : ''} have been flagged with significant findings requiring immediate interpretation.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {scans.map(scan => {
          const isActive = activeResultId === scan.id;
          return (
            <Card 
              key={scan.id}
              className={`transition-all ${
                scan.resultEntered ? 'border-l-4 border-l-emerald-500 bg-emerald-50/20' :
                scan.hasFindings ? 'border-l-4 border-l-orange-500 bg-orange-50/10' : 
                'border-l-4 border-l-blue-500 hover:shadow-md'
              }`}
            >
              <CardContent className="p-0">
                {/* Header / Summary Section */}
                <div 
                  className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer ${isActive ? 'border-b border-slate-100 bg-slate-50/30' : ''}`}
                  onClick={() => !scan.resultEntered && toggleEntry(scan.id)}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`p-2 rounded-lg ${scan.resultEntered ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-slate-900">{scan.examType}</h3>
                      {scan.hasFindings && !scan.resultEntered && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-none">
                          Preliminary Findings
                        </Badge>
                      )}
                      {scan.resultEntered && (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                          <CheckCircle className="w-3 h-3 mr-1" /> Report Sent
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="font-medium text-slate-700">{scan.bedNumber}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{scan.patientName}</span>
                      <span className="text-slate-300">|</span>
                      <span>Completed {getTimeAgo(scan.completedAt)}</span>
                    </div>
                  </div>

                  {!scan.resultEntered && (
                    <div className="text-slate-400">
                      {isActive ? (
                         <Button size="sm" variant="ghost" disabled>Entering Results...</Button>
                      ) : (
                         <Button size="sm" variant="outline" className="gap-2">
                           Interpret <ArrowRight className="w-4 h-4" />
                         </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded Entry Form */}
                {isActive && !scan.resultEntered && (
                  <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-3">
                      <Label htmlFor={`interpretation-${scan.id}`} className="text-base font-medium">Radiological Interpretation</Label>
                      <Textarea 
                        id={`interpretation-${scan.id}`}
                        className="min-h-[150px] font-mono text-sm resize-y"
                        placeholder="Enter detailed findings, impressions, and recommendations..."
                        autoFocus
                      />
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-start space-x-3">
                        <Checkbox id={`critical-${scan.id}`} className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={`critical-${scan.id}`}
                            className="text-sm font-semibold text-slate-900"
                          >
                            Critical / Urgent Findings
                          </Label>
                          <p className="text-sm text-slate-500">
                            Check this to trigger an immediate high-priority notification to the attending physician.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="w-4 h-4" /> Attach Key Images
                      </Button>
                      <div className="flex gap-3">
                         <Button variant="ghost" onClick={() => toggleEntry(scan.id)}>Cancel</Button>
                         <Button 
                           onClick={() => handleEnterResults(scan.id)}
                           className="bg-emerald-600 hover:bg-emerald-700 text-white"
                         >
                           <CheckCircle className="w-4 h-4 mr-2" /> Sign & Submit Report
                         </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {pendingResults.length === 0 && (
        <Card className="p-12 text-center border-dashed bg-slate-50">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">All Reports Complete</h3>
          <p className="text-slate-500">No pending interpretations at this time.</p>
        </Card>
      )}
    </div>
  );
}
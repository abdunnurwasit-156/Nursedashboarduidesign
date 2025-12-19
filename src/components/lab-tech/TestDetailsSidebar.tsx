import { X, Beaker, User, Clock, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { TestOrder, TestResult } from '../../types/doctor';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

interface TestDetailsSidebarProps {
  test: TestOrder | TestResult | null;
  onClose: () => void;
}

export function TestDetailsSidebar({ test, onClose }: TestDetailsSidebarProps) {
  if (!test) return null;

  const isTestResult = 'result' in test;

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency) {
      case 'stat': return 'destructive';
      case 'urgent': return 'secondary'; // Orange handled via class usually or secondary
      case 'routine': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Sheet open={!!test} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 bg-white">
        <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="bg-white text-slate-500 border-slate-200">
               {test.type}
             </Badge>
             {isTestResult ? (
                (test as TestResult).isCritical ? (
                  <Badge variant="destructive">CRITICAL</Badge>
                ) : (test as TestResult).isAbnormal ? (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">ABNORMAL</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">NORMAL</Badge>
                )
             ) : (
                <Badge variant={getUrgencyBadgeVariant((test as TestOrder).urgency) as any} className={
                   (test as TestOrder).urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                }>
                  {(test as TestOrder).urgency.toUpperCase()}
                </Badge>
             )}
          </div>
          <SheetTitle className="text-xl font-bold text-slate-900">{test.testName}</SheetTitle>
          <SheetDescription>
            Test details and patient information.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {/* Patient Info */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Patient Information
              </h4>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 grid grid-cols-2 gap-4">
                <div>
                   <span className="text-xs text-slate-500 block">Name</span>
                   <span className="font-medium text-slate-900">{test.patientName}</span>
                </div>
                <div>
                   <span className="text-xs text-slate-500 block">Bed Number</span>
                   <span className="font-medium text-slate-900">{test.bedNumber}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Timeline */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> Timeline
              </h4>
              <div className="space-y-4">
                {!isTestResult ? (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Ordered by</span>
                      <span className="font-medium text-slate-900">{(test as TestOrder).orderedBy}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Ordered time</span>
                      <span className="font-medium text-slate-900">{getTimeAgo((test as TestOrder).orderedAt)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Current Status</span>
                      <Badge variant="outline" className="capitalize">{(test as TestOrder).status}</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Completed</span>
                      <span className="font-medium text-slate-900">{getTimeAgo((test as TestResult).completedAt)}</span>
                    </div>
                    {(test as TestResult).reviewedBy && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Reviewed by</span>
                        <span className="font-medium text-slate-900">{(test as TestResult).reviewedBy}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            <Separator />

            {/* Clinical Info */}
            {!isTestResult && (test as TestOrder).clinicalIndication && (
              <section className="space-y-3">
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Clinical Indication
                </h4>
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 text-sm text-slate-700 leading-relaxed">
                  {(test as TestOrder).clinicalIndication}
                </div>
              </section>
            )}

            {/* Test Results */}
            {isTestResult && (
              <section className="space-y-4">
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Beaker className="w-4 h-4" /> Results
                </h4>
                
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                   <div className={`p-3 border-b border-slate-100 flex items-center gap-2 font-medium ${
                      (test as TestResult).isCritical ? 'bg-red-50 text-red-900' : 
                      (test as TestResult).isAbnormal ? 'bg-orange-50 text-orange-900' : 'bg-emerald-50 text-emerald-900'
                   }`}>
                      {(test as TestResult).isCritical ? (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      ) : (test as TestResult).isAbnormal ? (
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      )}
                      <span>
                        {(test as TestResult).isCritical ? 'Critical Result' : 
                         (test as TestResult).isAbnormal ? 'Abnormal Result' : 'Normal Result'}
                      </span>
                   </div>
                   <div className="p-4 bg-slate-50/30">
                     <pre className="text-sm font-mono whitespace-pre-wrap text-slate-800">{(test as TestResult).result}</pre>
                     {(test as TestResult).normalRange && (
                       <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                         <span className="font-medium text-slate-700">Reference Range:</span> {(test as TestResult).normalRange}
                       </div>
                     )}
                   </div>
                </div>

                {(test as TestResult).interpretation && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Interpretation</span>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                      {(test as TestResult).interpretation}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
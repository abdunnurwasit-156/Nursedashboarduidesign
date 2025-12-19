import { useState } from 'react';
import { mockClinicalReviews } from '../../data/doctorMockData';
import { ClinicalReview as ClinicalReviewType } from '../../types/doctor';
import { AlertCircle, Clock, User, CheckCircle, X, ArrowRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '../ui/sheet';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export function ClinicalReview() {
  const [reviews, setReviews] = useState(mockClinicalReviews);
  const [selectedReview, setSelectedReview] = useState<ClinicalReviewType | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [assessment, setAssessment] = useState('');

  const handleStartReview = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'in-progress' as const } : r
    ));
  };

  const handleCompleteReview = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'completed' as const } : r
    ));
    setSelectedReview(null);
    setAssessment('');
  };

  const filteredReviews = filterPriority === 'all'
    ? reviews
    : reviews.filter(r => r.priority === filterPriority);

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const criticalCount = reviews.filter(r => r.priority === 'critical').length;

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Review</h1>
          <p className="text-slate-500">
            {pendingCount} pending reviews • {criticalCount} critical priority
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {criticalCount > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-900 font-medium">
              {criticalCount} critical patient{criticalCount !== 1 ? 's' : ''} require{criticalCount === 1 ? 's' : ''} immediate clinical review.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <Card 
            key={review.id}
            className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
              review.priority === 'critical' ? 'border-l-red-500' :
              review.priority === 'high' ? 'border-l-orange-500' :
              review.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            }`}
            onClick={() => setSelectedReview(review)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900">{review.bedNumber}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-medium text-slate-900">{review.patientName}</span>
                    <Badge variant={
                      review.priority === 'critical' ? 'destructive' : 
                      review.priority === 'high' ? 'secondary' : 'outline'
                    } className={
                      review.priority === 'high' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' : ''
                    }>
                      {review.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50">
                      {review.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-700 font-medium">{review.reason}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{review.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(review.requestedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center min-w-[140px]">
                   {review.status === 'pending' ? (
                     <Button 
                       size="sm" 
                       className="w-full bg-blue-600 hover:bg-blue-700"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleStartReview(review.id);
                         setSelectedReview(review);
                       }}
                     >
                       Start Review
                     </Button>
                   ) : (
                     <Button size="sm" variant="outline" className="w-full">View Details</Button>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="space-y-4 pb-4 border-b border-slate-200">
            <SheetTitle>Clinical Review</SheetTitle>
            <SheetDescription>
              {selectedReview?.bedNumber} - {selectedReview?.patientName}
            </SheetDescription>
          </SheetHeader>

          {selectedReview && (
            <div className="py-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-500 uppercase">Priority</span>
                  <div className={`font-semibold capitalize ${
                    selectedReview.priority === 'critical' ? 'text-red-600' :
                    selectedReview.priority === 'high' ? 'text-orange-600' : 'text-slate-900'
                  }`}>
                    {selectedReview.priority}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-500 uppercase">Requested</span>
                  <div className="font-medium text-slate-900">
                    {getTimeAgo(selectedReview.requestedAt)}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <span className="text-xs font-medium text-slate-500 uppercase">Reason for Review</span>
                <p className="text-slate-900 font-medium">{selectedReview.reason}</p>
              </div>

              {selectedReview.nurseNotes && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-blue-900">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-semibold">{selectedReview.requestedBy}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedReview.nurseNotes}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Clinical Assessment & Plan</Label>
                <Textarea
                  placeholder="Document your findings and plan..."
                  className="min-h-[150px] resize-y"
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                />
              </div>
            </div>
          )}

          <SheetFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={() => setSelectedReview(null)}>Cancel</Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => selectedReview && handleCompleteReview(selectedReview.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Review
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
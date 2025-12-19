import { useState } from 'react';
import { mockApprovalRequests } from '../../data/doctorMockData';
import { ApprovalRequest } from '../../types/doctor';
import { CheckCircle, XCircle, Clock, AlertCircle, X, Filter, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export function ApprovalsRequests() {
  const [requests, setRequests] = useState(mockApprovalRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleApprove = (id: string, notes: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
    setSelectedRequest(null);
    setApprovalNotes('');
  };

  const handleDeny = (id: string, notes: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'denied' as const } : r
    ));
    setSelectedRequest(null);
    setApprovalNotes('');
  };

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(r => r.status === filterStatus);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const urgentCount = requests.filter(r => r.priority === 'urgent' && r.status === 'pending').length;

  const typeLabels = {
    'medication-refill': 'Medication Refill',
    'procedure': 'Procedure Approval',
    'transfer': 'Transfer Request',
    'discharge': 'Discharge Request'
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Approvals & Requests</h1>
          <p className="text-slate-500">
            {pendingCount} pending • {urgentCount} urgent
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {urgentCount > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-orange-900 font-medium">
              {urgentCount} urgent request{urgentCount !== 1 ? 's' : ''} require immediate attention.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card 
            key={request.id}
            className={`border-l-4 ${
              request.priority === 'urgent' ? 'border-l-orange-500' : 'border-l-blue-500'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{typeLabels[request.type]}</h3>
                    <Badge variant={
                      request.status === 'pending' ? 'outline' : 
                      request.status === 'approved' ? 'default' : 'destructive'
                    } className={
                      request.status === 'approved' ? 'bg-green-600' : 
                      request.status === 'pending' ? 'bg-amber-50 text-amber-900 border-amber-200' : ''
                    }>
                      {request.status.toUpperCase()}
                    </Badge>
                    {request.priority === 'urgent' && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">URGENT</Badge>
                    )}
                  </div>
                  
                  <div className="text-sm font-medium text-slate-900">
                    {request.bedNumber} - {request.patientName}
                  </div>
                  
                  <p className="text-slate-600 text-sm">{request.details}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {request.requestedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {getTimeAgo(request.requestedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                   {request.status === 'pending' ? (
                     <>
                       <Button 
                         variant="outline" 
                         className="text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                         onClick={() => setSelectedRequest(request)}
                       >
                         Review
                       </Button>
                       <Button 
                         className="bg-blue-600 hover:bg-blue-700"
                         onClick={() => setSelectedRequest(request)}
                       >
                         Review
                       </Button>
                     </>
                   ) : (
                      <Button variant="ghost" size="sm" disabled>
                        {request.status === 'approved' ? 'Approved' : 'Denied'}
                      </Button>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Request</DialogTitle>
            <DialogDescription>
              {selectedRequest && typeLabels[selectedRequest.type]}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs uppercase mb-1">Patient</span>
                    <span className="font-medium text-slate-900">{selectedRequest.bedNumber} - {selectedRequest.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs uppercase mb-1">Requested By</span>
                    <span className="font-medium text-slate-900">{selectedRequest.requestedBy}</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                   <span className="text-slate-500 block text-xs uppercase mb-1">Details</span>
                   <p className="text-slate-800">{selectedRequest.details}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes / Reason</Label>
                <Textarea 
                  placeholder="Enter notes for approval or denial..." 
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>Cancel</Button>
            {selectedRequest && (
              <div className="flex gap-2 w-full sm:w-auto">
                 <Button 
                   variant="destructive" 
                   onClick={() => handleDeny(selectedRequest.id, approvalNotes)}
                   className="flex-1 sm:flex-none"
                 >
                   <XCircle className="w-4 h-4 mr-2" />
                   Deny
                 </Button>
                 <Button 
                   className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none" 
                   onClick={() => handleApprove(selectedRequest.id, approvalNotes)}
                 >
                   <CheckCircle className="w-4 h-4 mr-2" />
                   Approve
                 </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
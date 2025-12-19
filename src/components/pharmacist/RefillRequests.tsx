import { AlertTriangle, CheckCircle, Clock, Package } from 'lucide-react';
import { useState } from 'react';

interface RefillRequest {
  id: string;
  medication: string;
  patientName: string;
  bedNumber: string;
  currentSupply: string;
  requestedBy: string;
  requestedAt: Date;
  urgency: 'urgent' | 'routine';
  status: 'pending' | 'approved' | 'rejected';
}

export function RefillRequests() {
  const [requests, setRequests] = useState<RefillRequest[]>([
    {
      id: 'ref1',
      medication: 'Metoprolol 50mg',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      currentSupply: '2 doses remaining',
      requestedBy: 'Nurse Jennifer Williams',
      requestedAt: new Date(Date.now() - 30 * 60000),
      urgency: 'urgent',
      status: 'pending'
    },
    {
      id: 'ref2',
      medication: 'Insulin Regular 100U/mL',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      currentSupply: '1 vial remaining',
      requestedBy: 'Nurse Sarah Mitchell',
      requestedAt: new Date(Date.now() - 45 * 60000),
      urgency: 'urgent',
      status: 'pending'
    },
    {
      id: 'ref3',
      medication: 'Aspirin 81mg',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      currentSupply: '5 doses remaining',
      requestedBy: 'Nurse Jennifer Williams',
      requestedAt: new Date(Date.now() - 90 * 60000),
      urgency: 'routine',
      status: 'pending'
    }
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const urgentRequests = pendingRequests.filter(r => r.urgency === 'urgent');

  const urgencyColors = {
    urgent: 'border-l-orange-500 bg-orange-50',
    routine: 'border-l-blue-500 bg-blue-50'
  };

  const urgencyBadgeColors = {
    urgent: 'bg-orange-100 text-orange-800 border-orange-300',
    routine: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Refill Requests</h1>
        <p className="text-gray-600">
          {pendingRequests.length} pending • {urgentRequests.length} urgent
        </p>
      </div>

      {urgentRequests.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-orange-900">
              {urgentRequests.length} urgent refill request{urgentRequests.length !== 1 ? 's' : ''} require immediate attention!
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {requests.map(request => (
          <div
            key={request.id}
            className={`bg-white border-l-4 ${
              request.status === 'pending' ? urgencyColors[request.urgency] : 
              request.status === 'approved' ? 'border-l-green-500 bg-green-50' :
              'border-l-gray-500 bg-gray-50 opacity-60'
            } rounded-lg p-4 shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h4 className="text-gray-900">{request.medication}</h4>
                  {request.status === 'pending' && (
                    <span className={`px-2 py-0.5 rounded border text-xs uppercase ${urgencyBadgeColors[request.urgency]}`}>
                      {request.urgency}
                    </span>
                  )}
                  {request.status === 'approved' && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  )}
                  {request.status === 'rejected' && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                      Rejected
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  {request.bedNumber} - {request.patientName}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Current Supply:</span>
                    <div className="text-gray-900 mt-1">{request.currentSupply}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Requested By:</span>
                    <div className="text-gray-900 mt-1">{request.requestedBy}</div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <div className="text-gray-900">{getTimeAgo(request.requestedAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {request.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve & Prepare
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">No Refill Requests</h3>
          <p className="text-gray-600">No medication refill requests at the moment.</p>
        </div>
      )}
    </div>
  );
}

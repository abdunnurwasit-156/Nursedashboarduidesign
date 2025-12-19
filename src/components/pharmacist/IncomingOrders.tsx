import { useState } from 'react';
import { Pill, Clock, User, CheckCircle, AlertTriangle, ArrowRight, Package, MapPin } from 'lucide-react';
import { mockPrescriptions } from '../../data/doctorMockData';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function IncomingOrders() {
  const [orders, setOrders] = useState(mockPrescriptions);

  const handleStartPreparing = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: 'active' as const } : o
    ));
  };

  const pendingOrders = orders.filter(o => o.status === 'active');
  
  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (60 * 60000));
    if (hours < 1) return 'Just now';
    return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  };

  const getUrgencyStyles = (urgency?: string) => {
    switch(urgency) {
      case 'urgent': return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
    }
  };

  const getStockStyles = (availability?: string) => {
    switch(availability) {
      case 'out-of-stock': return 'text-red-600 bg-red-50 border-red-100';
      case 'low-stock': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Incoming Orders</h1>
          <p className="text-slate-500 mt-1">Manage and process new medication requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 h-8 text-sm font-medium bg-white border shadow-sm">
            {pendingOrders.length} Pending
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map(order => (
          <Card key={order.id} className="group overflow-hidden transition-all hover:shadow-md hover:border-blue-200 border-slate-200">
            <div className="flex flex-col md:flex-row">
              {/* Left Status Strip */}
              <div className={`w-full md:w-1.5 h-1 md:h-auto ${
                order.urgency === 'urgent' ? 'bg-red-500' : 
                order.urgency === 'high' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              
              <div className="flex-1 p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{order.medication}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{order.dose}</span>
                          <span>•</span>
                          <span>{order.route}</span>
                          <span>•</span>
                          <span>{order.frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <Badge variant="outline" className={`capitalize ${getUrgencyStyles(order.urgency)}`}>
                       {order.urgency || 'Standard'} Priority
                     </Badge>
                     <Badge variant="outline" className={`${getStockStyles(order.availability)} border`}>
                       {order.availability === 'in-stock' ? 'In Stock' : 
                        order.availability === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                     </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <User className="w-3.5 h-3.5" /> Patient
                    </div>
                    <p className="font-medium text-slate-900">{order.patientName}</p>
                    <p className="text-xs text-slate-500">{order.bedNumber}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <User className="w-3.5 h-3.5" /> Prescriber
                    </div>
                    <p className="font-medium text-slate-900">{order.prescribedBy}</p>
                    <p className="text-xs text-slate-500">Doctor</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <MapPin className="w-3.5 h-3.5" /> Location
                    </div>
                    <p className="font-medium text-slate-900">ICU Block A</p>
                    <p className="text-xs text-slate-500">Floor 3</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> Ordered
                    </div>
                    <p className="font-medium text-slate-900">{getTimeAgo(order.prescribedAt)}</p>
                    <p className="text-xs text-slate-500">{order.prescribedAt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="p-5 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center items-end gap-3 min-w-[200px] bg-slate-50/50">
                {order.status === 'active' ? (
                  <>
                    <Button onClick={() => handleStartPreparing(order.id)} className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm">
                      <Package className="w-4 h-4 mr-2" /> Start Preparing
                    </Button>
                    <Button variant="outline" className="w-full bg-white">
                      View Protocol
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" className="w-full bg-green-100 text-green-700 hover:bg-green-200 border-green-200 cursor-default">
                    <CheckCircle className="w-4 h-4 mr-2" /> Completed
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">All caught up</h3>
          <p className="text-slate-500">No pending medication orders at this time.</p>
        </div>
      )}
    </div>
  );
}
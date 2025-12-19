import { useState } from 'react';
import { Pill, Clock, User, CheckCircle, Package, MapPin, Truck } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function DeliveredOrders() {
  const [deliveredOrders] = useState([
    {
      id: 'del1',
      medication: 'Vancomycin 1g',
      dose: '1g in 250mL NS',
      route: 'IV',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      prescribedBy: 'Dr. Sarah Adams',
      deliveredAt: new Date(Date.now() - 45 * 60000), // 45 mins ago
      deliveredBy: 'Pharm. David Kim',
      receivedBy: 'Nurse Jessica'
    },
    {
      id: 'del2',
      medication: 'Insulin Regular',
      dose: '10 units',
      route: 'SC',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      prescribedBy: 'Dr. Michael Lee',
      deliveredAt: new Date(Date.now() - 120 * 60000), // 2 hours ago
      deliveredBy: 'Pharm. David Kim',
      receivedBy: 'Nurse Emily'
    },
    {
      id: 'del3',
      medication: 'Heparin Infusion',
      dose: '1000 units/hour',
      route: 'IV Continuous',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      prescribedBy: 'Dr. Sarah Adams',
      deliveredAt: new Date(Date.now() - 240 * 60000), // 4 hours ago
      deliveredBy: 'Pharm. Jennifer Wu',
      receivedBy: 'Nurse Mark'
    },
    {
      id: 'del4',
      medication: 'Acetaminophen',
      dose: '650mg',
      route: 'PO',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      prescribedBy: 'Dr. Michael Lee',
      deliveredAt: new Date(Date.now() - 300 * 60000), // 5 hours ago
      deliveredBy: 'Pharm. Jennifer Wu',
      receivedBy: 'Nurse Sarah'
    }
  ]);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Delivered Orders</h1>
          <p className="text-slate-500 mt-1">Track medication deliveries to wards</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 h-8 text-sm font-medium bg-white border shadow-sm">
            {deliveredOrders.length} Delivered Today
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {deliveredOrders.map(order => (
          <Card key={order.id} className="group overflow-hidden transition-all hover:shadow-md border-slate-200">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1.5 h-1 md:h-auto bg-emerald-500" />
              
              <div className="flex-1 p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{order.medication}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{order.dose}</span>
                          <span>•</span>
                          <span>{order.route}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                       <Truck className="w-3 h-3 mr-1" /> Delivered
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
                      <Clock className="w-3.5 h-3.5" /> Delivered Time
                    </div>
                    <p className="font-medium text-slate-900">{getTimeAgo(order.deliveredAt)}</p>
                    <p className="text-xs text-slate-500">{order.deliveredAt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Package className="w-3.5 h-3.5" /> Delivered By
                    </div>
                    <p className="font-medium text-slate-900">{order.deliveredBy}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <MapPin className="w-3.5 h-3.5" /> Received By
                    </div>
                    <p className="font-medium text-slate-900">{order.receivedBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {deliveredOrders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No deliveries yet</h3>
          <p className="text-slate-500">Delivered medications will appear here.</p>
        </div>
      )}
    </div>
  );
}
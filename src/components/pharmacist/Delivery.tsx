import { Truck, CheckCircle, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface DeliveryItem {
  id: string;
  medication: string;
  dose: string;
  patientName: string;
  bedNumber: string;
  preparedAt: Date;
  deliveredAt?: Date;
  deliveredBy?: string;
}

export function Delivery() {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([
    {
      id: 'del1',
      medication: 'Vancomycin 1g in 250mL NS',
      dose: '1g IV',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      preparedAt: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 'del2',
      medication: 'Insulin Regular',
      dose: '10 units SC',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      preparedAt: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 'del3',
      medication: 'Heparin Infusion',
      dose: '1000 units/hour IV',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      preparedAt: new Date(Date.now() - 8 * 60000)
    },
    {
      id: 'del4',
      medication: 'Furosemide',
      dose: '40mg IV Push',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      preparedAt: new Date(Date.now() - 12 * 60000)
    }
  ]);

  const handleMarkDelivered = (id: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { 
        ...d, 
        deliveredAt: new Date(), 
        deliveredBy: 'Robert Chen' 
      } : d
    ));
  };

  const pendingDeliveries = deliveries.filter(d => !d.deliveredAt);
  const completedDeliveries = deliveries.filter(d => d.deliveredAt);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Medication Delivery</h1>
        <p className="text-gray-600">
          {pendingDeliveries.length} ready for delivery • {completedDeliveries.length} delivered
        </p>
      </div>

      {/* Pending Deliveries */}
      {pendingDeliveries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Ready for Delivery</h3>
          <div className="space-y-3">
            {pendingDeliveries.map(item => (
              <div
                key={item.id}
                className="bg-white border-l-4 border-l-blue-500 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <h4 className="text-gray-900">{item.medication}</h4>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        Ready
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{item.bedNumber}</span>
                      <span>—</span>
                      <span>{item.patientName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Prepared {getTimeAgo(item.preparedAt)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleMarkDelivered(item.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm Delivery
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">Delivered Today</h3>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Medication</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Bed</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Prepared</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Delivered</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Delivered By</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {completedDeliveries.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{item.medication}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{item.patientName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{item.bedNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{getTimeAgo(item.preparedAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {item.deliveredAt ? getTimeAgo(item.deliveredAt) : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{item.deliveredBy || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        Delivered
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deliveries.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">No Deliveries</h3>
          <p className="text-gray-600">No medications ready for delivery at the moment.</p>
        </div>
      )}
    </div>
  );
}

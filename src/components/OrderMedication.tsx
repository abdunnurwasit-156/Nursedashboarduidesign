import { useState } from 'react';
import { ShoppingCart, Check, AlertCircle, Package, Search, Filter, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PrescribedMedication {
  id: string;
  patientName: string;
  bedNumber: string;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  stockAvailable: number;
  prescribedBy: string;
}

export function OrderMedication() {
  const [prescribedMeds] = useState<PrescribedMedication[]>([
    {
      id: 'pm1',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      name: 'Metoprolol',
      dose: '50mg',
      frequency: 'BID',
      duration: '7 days',
      stockAvailable: 8,
      prescribedBy: 'Dr. Adams'
    },
    {
      id: 'pm2',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      name: 'Norepinephrine',
      dose: '0.1 mcg/kg/min',
      frequency: 'Continuous',
      duration: 'Ongoing',
      stockAvailable: 3,
      prescribedBy: 'Dr. Lee'
    },
    {
      id: 'pm3',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      name: 'Vancomycin',
      dose: '1g',
      frequency: 'Q12H',
      duration: '14 days',
      stockAvailable: 2,
      prescribedBy: 'Dr. Patel'
    },
    {
      id: 'pm4',
      patientName: 'James Thompson',
      bedNumber: 'CCU-106',
      name: 'Furosemide',
      dose: '40mg',
      frequency: 'BID',
      duration: '5 days',
      stockAvailable: 15,
      prescribedBy: 'Dr. Adams'
    }
  ]);

  const [requestQuantities, setRequestQuantities] = useState<Record<string, number>>({});
  const [submittedRequests, setSubmittedRequests] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuantityChange = (id: string, quantity: string) => {
    const num = parseInt(quantity) || 0;
    setRequestQuantities({ ...requestQuantities, [id]: num });
  };

  const handleSubmitRequest = (id: string) => {
    if (requestQuantities[id] && requestQuantities[id] > 0) {
      setSubmittedRequests(new Set([...submittedRequests, id]));
      // In a real app, this would send data to the backend
    }
  };

  const filteredMeds = prescribedMeds.filter(med => 
    med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy Requests</h1>
          <p className="text-slate-500 mt-1">Request refills for doctor-prescribed medications.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search patient or drug..." 
              className="pl-9 bg-white" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-blue-50/50 border-blue-200 p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-900">
          <span className="font-semibold block mb-1">Pharmacy Protocol</span>
          Only request refills for active prescriptions. For new medications, please contact the attending physician. 
          Emergency overrides must be logged separately.
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredMeds.map((med) => {
          const isSubmitted = submittedRequests.has(med.id);
          const isLowStock = med.stockAvailable < 5;

          return (
            <Card key={med.id} className={`overflow-hidden transition-all hover:shadow-md ${
              isLowStock ? 'border-orange-200 bg-orange-50/10' : 'border-slate-200'
            }`}>
              <div className="flex flex-col md:flex-row">
                {/* Left: Info */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{med.name}</h3>
                        {isLowStock && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Low Ward Stock
                          </Badge>
                        )}
                        {isSubmitted && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                            <Check className="w-3 h-3" />
                            Request Sent
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">
                        Prescribed by <span className="text-slate-700 font-medium">{med.prescribedBy}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">{med.bedNumber}</div>
                      <div className="text-xs text-slate-500">{med.patientName}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Dose</span>
                      <span className="font-medium text-slate-700">{med.dose}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Frequency</span>
                      <span className="font-medium text-slate-700">{med.frequency}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Duration</span>
                      <span className="font-medium text-slate-700">{med.duration}</span>
                    </div>
                    <div className={`p-2 rounded border ${isLowStock ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
                      <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                        <Package className="w-3 h-3" /> Stock
                      </span>
                      <span className={`font-medium ${isLowStock ? 'text-orange-700' : 'text-slate-700'}`}>
                        {med.stockAvailable} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action */}
                <div className="p-5 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 md:w-64 flex flex-col justify-center">
                  {!isSubmitted ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-slate-700 mb-1.5 block">
                          Refill Quantity
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={requestQuantities[med.id] || ''}
                            onChange={(e) => handleQuantityChange(med.id, e.target.value)}
                            placeholder="Qty"
                            className="bg-white"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => handleSubmitRequest(med.id)}
                        disabled={!requestQuantities[med.id] || requestQuantities[med.id] <= 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Send Request
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center h-full flex flex-col items-center justify-center text-emerald-600">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium">Order Placed</span>
                      <span className="text-xs text-emerald-500 mt-1">Pharmacy notified</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
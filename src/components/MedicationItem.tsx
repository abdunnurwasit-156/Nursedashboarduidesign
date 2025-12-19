import { Pill, Check, Clock, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Medication } from '../types';

interface MedicationItemProps {
  medication: Medication;
  onMarkAdministered: (id: string) => void;
  onRequestRefill: (id: string) => void;
}

export function MedicationItem({ medication, onMarkAdministered, onRequestRefill }: MedicationItemProps) {
  const statusColors = {
    due: 'bg-red-50 border-red-200 text-red-800',
    upcoming: 'bg-blue-50 border-blue-200 text-blue-800',
    missed: 'bg-orange-50 border-orange-200 text-orange-800',
    completed: 'bg-green-50 border-green-200 text-green-800'
  };

  const statusIcons = {
    due: <Clock className="w-4 h-4" />,
    upcoming: <Clock className="w-4 h-4" />,
    missed: <AlertTriangle className="w-4 h-4" />,
    completed: <Check className="w-4 h-4" />
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">{medication.name}</h3>
            <span className={`flex items-center gap-1 px-2 py-1 rounded border text-xs ${statusColors[medication.status]}`}>
              {statusIcons[medication.status]}
              {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Patient: </span>
              <span className="text-gray-900">{medication.bedNumber} - {medication.patientName}</span>
            </div>
            <div>
              <span className="text-gray-600">Dose: </span>
              <span className="text-gray-900">{medication.dose}</span>
            </div>
            <div>
              <span className="text-gray-600">Frequency: </span>
              <span className="text-gray-900">{medication.frequency}</span>
            </div>
            <div>
              <span className="text-gray-600">Scheduled: </span>
              <span className="text-gray-900">{medication.scheduledTime}</span>
            </div>
          </div>
        </div>
      </div>

      {medication.status !== 'completed' && (
        <div className="flex gap-2">
          <button
            onClick={() => onMarkAdministered(medication.id)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark as Administered
          </button>
          <button
            onClick={() => onRequestRefill(medication.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Request Refill
          </button>
        </div>
      )}
    </div>
  );
}

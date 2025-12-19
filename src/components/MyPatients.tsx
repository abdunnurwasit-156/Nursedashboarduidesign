import { useState } from 'react';
import { mockPatients } from '../data/mockData';
import { PatientCard } from './PatientCard';
import { Filter, Grid, List } from 'lucide-react';

interface MyPatientsProps {
  onPatientClick: (patientId: string) => void;
}

export function MyPatients({ onPatientClick }: MyPatientsProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPatients = filterSeverity === 'all' 
    ? mockPatients 
    : mockPatients.filter(p => p.severity === filterSeverity);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">My Patients</h1>
          <p className="text-gray-600">Currently managing {mockPatients.length} patients</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Patients</option>
              <option value="critical">Critical</option>
              <option value="moderate">Moderate</option>
              <option value="warning">Warning</option>
              <option value="stable">Stable</option>
            </select>
          </div>

          <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-4'}>
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => onPatientClick(patient.id)}
          />
        ))}
      </div>
    </div>
  );
}
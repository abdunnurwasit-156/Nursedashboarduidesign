import { useState } from 'react';
import { mockPatients } from '../../data/mockData';
import { DoctorPatientCard } from './DoctorPatientCard';
import { Filter, Grid, List, Search, AlertCircle, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface DoctorMyPatientsProps {
  onOpenChart: (patientId: string) => void;
}

export function DoctorMyPatients({ onOpenChart }: DoctorMyPatientsProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSeverity = filterSeverity === 'all' || patient.severity === filterSeverity;
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          patient.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const criticalCount = mockPatients.filter(p => p.severity === 'critical').length;
  const moderateCount = mockPatients.filter(p => p.severity === 'moderate').length;

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Patients</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <Users className="w-4 h-4" />
            <span>{mockPatients.length} Total</span>
            <span className="text-slate-300">•</span>
            <span className="text-red-600 font-medium">{criticalCount} Critical</span>
            <span className="text-slate-300">•</span>
            <span className="text-orange-600 font-medium">{moderateCount} Moderate</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
           <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-[250px] bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[160px] bg-white">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <SelectValue placeholder="All Severities" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="hidden sm:flex items-center border border-slate-200 rounded-md bg-white p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={`h-8 w-8 rounded-sm ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={`h-8 w-8 rounded-sm ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {criticalCount > 0 && filterSeverity === 'all' && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-3 flex-shrink-0 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
             <h3 className="text-sm font-semibold text-red-900">Critical Attention Required</h3>
             <p className="text-sm text-red-700 mt-0.5">
               You have {criticalCount} patient{criticalCount !== 1 ? 's' : ''} in critical condition. Please review their charts immediately.
             </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-6">
        {filteredPatients.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex flex-col gap-4'}>
            {filteredPatients.map((patient) => (
              <DoctorPatientCard
                key={patient.id}
                patient={patient}
                onOpenChart={() => onOpenChart(patient.id)}
              />
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Users className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-lg font-medium">No patients found</p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
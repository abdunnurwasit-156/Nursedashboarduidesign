import { useState } from 'react';
import { mockMedications } from '../data/mockData';
import { Pill, Check, Clock, AlertTriangle, ShoppingCart, Search, Filter, AlertCircle, ArrowRight, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function Medications() {
  const [medications, setMedications] = useState(mockMedications);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarkAdministered = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, status: 'completed' as const } : med
    ));
  };

  const handleRequestRefill = (id: string) => {
    console.log('Refill requested for medication:', id);
    // In a real app, this would make an API call
  };

  // Filter logic
  const filteredMedications = medications.filter(med => 
    med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.bedNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by status
  const missedMeds = filteredMedications.filter(m => m.status === 'missed');
  const dueMeds = filteredMedications.filter(m => m.status === 'due');
  const upcomingMeds = filteredMedications.filter(m => m.status === 'upcoming');
  const completedMeds = filteredMedications.filter(m => m.status === 'completed');

  const priorityMeds = [...missedMeds, ...dueMeds];

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Medication Schedule
            <Badge variant="outline" className="ml-2 font-mono text-slate-500">
              {new Date().toLocaleDateString()}
            </Badge>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage administration, refills, and compliance tracking.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient or drug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="gap-2 text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      {/* Main Board Layout */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Column 1: Priority Attention (Missed & Due) */}
        <div className="flex flex-col bg-slate-50/50 rounded-xl border border-slate-200 h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="font-semibold text-slate-900">Priority Attention</h2>
            </div>
            <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
              {priorityMeds.length}
            </Badge>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
            {priorityMeds.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Check className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>All clear! No immediate medications due.</p>
              </div>
            ) : (
              priorityMeds.map(med => (
                <Card key={med.id} className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                  med.status === 'missed' ? 'border-l-red-500 border-red-100' : 'border-l-orange-500 border-orange-100'
                }`}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`capitalize ${
                          med.status === 'missed' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {med.status === 'missed' ? 'Missed' : 'Due Now'}
                        </Badge>
                        <span className="text-xs font-mono text-slate-500">{med.scheduledTime}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRequestRefill(med.id)}>
                            <ShoppingCart className="w-4 h-4 mr-2" /> Request Refill
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <AlertCircle className="w-4 h-4 mr-2" /> Report Issue
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{med.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900 font-medium">{med.dose}</span>
                        <span>•</span>
                        <span>{med.frequency}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 p-2 bg-slate-50 rounded-lg border border-slate-100">
                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold border border-blue-200">
                         {med.bedNumber.split('-')[1] || '01'}
                       </div>
                       <div className="overflow-hidden">
                         <p className="text-sm font-medium text-slate-900 truncate">{med.patientName}</p>
                         <p className="text-xs text-slate-500">{med.bedNumber}</p>
                       </div>
                    </div>

                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm group"
                      onClick={() => handleMarkAdministered(med.id)}
                    >
                      <Check className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Mark Administered
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Upcoming Schedule */}
        <div className="flex flex-col bg-slate-50/50 rounded-xl border border-slate-200 h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <h2 className="font-semibold text-slate-900">Upcoming</h2>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {upcomingMeds.length}
            </Badge>
          </div>
          
          <div className="p-4 space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
             {upcomingMeds.map(med => (
               <Card key={med.id} className="shadow-sm border-slate-200 hover:border-blue-300 transition-colors group">
                 <div className="p-3">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                       {med.scheduledTime}
                     </span>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                       <MoreVertical className="w-4 h-4" />
                     </Button>
                   </div>
                   
                   <h3 className="font-semibold text-slate-900">{med.name}</h3>
                   <p className="text-xs text-slate-500 mb-2">{med.dose} • {med.frequency}</p>
                   
                   <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                     <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-medium">{med.bedNumber}</span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate max-w-[100px]">{med.patientName}</span>
                     </div>
                     <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                       Details <ArrowRight className="w-3 h-3 ml-1" />
                     </Button>
                   </div>
                 </div>
               </Card>
             ))}
             {upcomingMeds.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No upcoming medications scheduled.</p>
                </div>
             )}
          </div>
        </div>

        {/* Column 3: Completed Log */}
        <div className="flex flex-col bg-slate-50/50 rounded-xl border border-slate-200 h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="font-semibold text-slate-900">Completed</h2>
            </div>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {completedMeds.length}
            </Badge>
          </div>
          
          <div className="p-4 space-y-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
            {completedMeds.map(med => (
              <div key={med.id} className="flex items-center p-3 bg-white border border-slate-200 rounded-lg opacity-75 hover:opacity-100 transition-opacity">
                <div className="mr-3 bg-emerald-100 text-emerald-600 p-1.5 rounded-full">
                  <Check className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{med.name}</p>
                  <p className="text-xs text-slate-500 truncate">{med.patientName} • {med.bedNumber}</p>
                </div>
                <span className="text-xs text-slate-400 font-mono whitespace-nowrap ml-2">
                  {med.scheduledTime}
                </span>
              </div>
            ))}
             {completedMeds.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No medications administered yet.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
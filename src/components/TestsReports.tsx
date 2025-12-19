import { useState } from 'react';
import { mockTests } from '../data/mockData';
import { TestItem } from './TestItem';
import { Filter, TestTube, ScanLine, AlertCircle, Clock, CheckCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function TestsReports() {
  const [tests, setTests] = useState(mockTests);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarkSampleCollected = (id: string) => {
    setTests(tests.map(test => 
      test.id === id ? { ...test, status: 'in-progress' as const, sampleCollected: true } : test
    ));
  };

  const handlePrintBarcode = (id: string) => {
    // Mock print
    console.log('Printing barcode for test:', id);
  };

  const filteredTests = tests.filter(t => 
    t.testName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sampleNeeded = filteredTests.filter(t => t.status === 'sample-needed');
  const pending = filteredTests.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const completed = filteredTests.filter(t => t.status === 'completed');

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnostics Center</h1>
          <p className="text-slate-500 mt-1">Manage lab orders, sample collection, and radiology schedules.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search test, patient..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
        <Card className="md:col-span-1 bg-amber-50 border-amber-200">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">Samples Required</p>
              <h3 className="text-2xl font-bold text-amber-900">{sampleNeeded.length}</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <TestTube className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="md:col-span-1 bg-blue-50 border-blue-200">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">In Progress</p>
              <h3 className="text-2xl font-bold text-blue-900">{pending.length}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="md:col-span-1 bg-emerald-50 border-emerald-200">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-1">Results Ready</p>
              <h3 className="text-2xl font-bold text-emerald-900">{completed.length}</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="md:col-span-1 bg-purple-50 border-purple-200">
           <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800 mb-1">Radiology</p>
              <h3 className="text-2xl font-bold text-purple-900">{filteredTests.filter(t => t.type === 'radiology').length}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <ScanLine className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="needed" className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="needed" className="gap-2">
              Sample Needed <Badge variant="secondary" className="ml-1 bg-amber-100 text-amber-800">{sampleNeeded.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">{pending.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed <Badge variant="secondary" className="ml-1 bg-emerald-100 text-emerald-800">{completed.length}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          <TabsContent value="needed" className="mt-0 space-y-3">
            {sampleNeeded.length > 0 ? (
              sampleNeeded.map(test => (
                <TestItem 
                  key={test.id} 
                  test={test} 
                  onMarkSampleCollected={handleMarkSampleCollected}
                  onPrintBarcode={handlePrintBarcode}
                />
              ))
            ) : (
              <EmptyState message="No samples needed at this time." />
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0 space-y-3">
             {pending.length > 0 ? (
              pending.map(test => (
                <TestItem 
                  key={test.id} 
                  test={test} 
                  onMarkSampleCollected={handleMarkSampleCollected}
                  onPrintBarcode={handlePrintBarcode}
                />
              ))
            ) : (
              <EmptyState message="No pending tests." />
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0 space-y-3">
             {completed.length > 0 ? (
              completed.map(test => (
                <TestItem 
                  key={test.id} 
                  test={test} 
                  onMarkSampleCollected={handleMarkSampleCollected}
                  onPrintBarcode={handlePrintBarcode}
                />
              ))
            ) : (
              <EmptyState message="No completed tests." />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-slate-200">
      <div className="p-3 bg-slate-100 rounded-full mb-3">
        <TestTube className="w-6 h-6 text-slate-400" />
      </div>
      <p className="text-slate-500 font-medium">{message}</p>
    </div>
  );
}
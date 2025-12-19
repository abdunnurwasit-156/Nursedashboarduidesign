import { CheckCircle, Clock, FileText, Download, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function Completed() {
  const completedTests = [
    {
      id: 'comp1',
      testName: 'Arterial Blood Gas',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      completedAt: new Date(Date.now() - 30 * 60000),
      resultSentAt: new Date(Date.now() - 28 * 60000),
      criticalValue: true,
      technician: 'David Kim'
    },
    {
      id: 'comp2',
      testName: 'Basic Metabolic Panel',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      completedAt: new Date(Date.now() - 90 * 60000),
      resultSentAt: new Date(Date.now() - 85 * 60000),
      criticalValue: false,
      technician: 'David Kim'
    },
    {
      id: 'comp3',
      testName: 'Liver Function Tests',
      patientName: 'Sarah Johnson',
      bedNumber: 'ICU-201',
      completedAt: new Date(Date.now() - 120 * 60000),
      resultSentAt: new Date(Date.now() - 115 * 60000),
      criticalValue: false,
      technician: 'David Kim'
    },
    {
      id: 'comp4',
      testName: 'D-Dimer',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      completedAt: new Date(Date.now() - 60 * 60000),
      resultSentAt: new Date(Date.now() - 58 * 60000),
      criticalValue: true,
      technician: 'David Kim'
    }
  ];

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Completed Tests</h1>
        <p className="text-slate-500">{completedTests.length} tests completed today</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Today&apos;s Completed</div>
            <div className="text-3xl font-bold text-slate-900">{completedTests.length}</div>
            <div className="text-xs font-medium text-emerald-600 mt-1">Tests processed</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Critical Values</div>
            <div className="text-3xl font-bold text-slate-900">
              {completedTests.filter(t => t.criticalValue).length}
            </div>
            <div className="text-xs font-medium text-red-600 mt-1">Physician notified</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-slate-500 mb-1">Avg Turnaround</div>
            <div className="text-3xl font-bold text-slate-900">42 min</div>
            <div className="text-xs font-medium text-blue-600 mt-1">Sample to result</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>Recent completed laboratory tests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Bed</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Result Sent</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTests.map(test => (
                <TableRow key={test.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {test.testName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-700">{test.patientName}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-slate-600">{test.bedNumber}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(test.completedAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(test.resultSentAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{test.technician}</span>
                  </TableCell>
                  <TableCell>
                    {test.criticalValue ? (
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Critical
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                        <CheckCircle className="w-3 h-3 mr-1" /> Sent
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="w-3.5 h-3.5 mr-1" /> Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
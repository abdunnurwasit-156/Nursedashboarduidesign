import { Clock, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function StaffManagement() {
  const staff = [
    { id: '1', name: 'Jennifer Williams', role: 'Nurse', shift: 'Day (07:00-19:00)', status: 'active', patients: 4 },
    { id: '2', name: 'Sarah Mitchell', role: 'Nurse', shift: 'Day (07:00-19:00)', status: 'active', patients: 4 },
    { id: '3', name: 'Dr. Sarah Adams', role: 'Doctor', shift: 'On Call (24h)', status: 'active', patients: 12 },
    { id: '4', name: 'Dr. Michael Lee', role: 'Doctor', shift: 'Day (08:00-20:00)', status: 'active', patients: 8 },
    { id: '5', name: 'David Kim', role: 'Pathologist', shift: 'Day (06:00-14:00)', status: 'active', patients: 0 },
    { id: '6', name: 'Robert Chen', role: 'Pharmacist', shift: 'Day (08:00-18:00)', status: 'active', patients: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
        <p className="text-slate-500">Manage shift assignments and view staff availability.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Current Staff Roster</CardTitle>
              <CardDescription>Real-time view of staff on duty</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input placeholder="Search staff..." className="pl-9 w-[200px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <SelectValue placeholder="Role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="nurse">Nurses</SelectItem>
                  <SelectItem value="doctor">Doctors</SelectItem>
                  <SelectItem value="support">Support Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Current Shift</TableHead>
                <TableHead>Assigned Patients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-slate-100 text-slate-600">
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-slate-600">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {member.shift}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-900">
                      {member.patients > 0 ? member.patients : '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      member.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                    }>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Schedule</Button>
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
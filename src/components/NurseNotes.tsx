import { StickyNote, Plus, User, Clock, CheckSquare, MessageSquare, ClipboardList, Send } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function NurseNotes() {
  const [notes, setNotes] = useState([
    {
      id: '1',
      patientName: 'John Martinez',
      bedNumber: 'ICU-101',
      note: 'Patient vitals stable. Responded well to medication adjustment. Continue monitoring BP every 2 hours.',
      timestamp: 'Today, 08:45 AM',
      nurse: 'Nurse Emily Rodriguez',
      initials: 'ER',
      type: 'Routine'
    },
    {
      id: '2',
      patientName: 'Sarah Williams',
      bedNumber: 'ICU-102',
      note: 'Patient showing signs of improvement. Oxygen saturation stable at 96%. Family visited and patient in good spirits.',
      timestamp: 'Today, 07:30 AM',
      nurse: 'Nurse Michael Chen',
      initials: 'MC',
      type: 'Observation'
    },
    {
      id: '3',
      patientName: 'Robert Johnson',
      bedNumber: 'ICU-104',
      note: 'Patient experienced mild discomfort overnight. Pain medication administered as prescribed. Resting comfortably now.',
      timestamp: 'Today, 06:15 AM',
      nurse: 'Nurse Emily Rodriguez',
      initials: 'ER',
      type: 'Intervention'
    },
    {
      id: '4',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-105',
      note: 'Successful extubation this morning. Patient breathing independently on room air. Vitals stable.',
      timestamp: 'Today, 05:00 AM',
      nurse: 'Nurse David Kim',
      initials: 'DK',
      type: 'Critical'
    }
  ]);

  const [newNote, setNewNote] = useState({
    patientName: '',
    bedNumber: '',
    note: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNote = () => {
    if (newNote.patientName && newNote.bedNumber && newNote.note) {
      setNotes([
        {
          id: Date.now().toString(),
          patientName: newNote.patientName,
          bedNumber: newNote.bedNumber,
          note: newNote.note,
          timestamp: 'Just now',
          nurse: 'Nurse Emily Rodriguez',
          initials: 'ER',
          type: 'Routine'
        },
        ...notes
      ]);
      setNewNote({ patientName: '', bedNumber: '', note: '' });
      setShowAddForm(false);
    }
  };

  const getNoteTypeColor = (type: string) => {
    switch(type) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'Intervention': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Observation': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col space-y-6">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shift Notes & Handover</h1>
          <p className="text-slate-500 mt-1">Collaborative log for patient care coordination.</p>
        </div>
        
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Clinical Note</DialogTitle>
              <DialogDescription>
                Enter patient observations or handover details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient</label>
                  <Input 
                    placeholder="Name" 
                    value={newNote.patientName}
                    onChange={(e) => setNewNote({ ...newNote, patientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bed</label>
                  <Input 
                    placeholder="e.g. ICU-101" 
                    value={newNote.bedNumber}
                    onChange={(e) => setNewNote({ ...newNote, bedNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Observation</label>
                <Textarea 
                  placeholder="Type your note here..." 
                  className="min-h-[100px]"
                  value={newNote.note}
                  onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 flex-1">
        {/* Left: Notes Feed */}
        <Card className="lg:col-span-2 border-slate-200 flex flex-col overflow-hidden bg-slate-50/50">
          <CardHeader className="bg-white border-b border-slate-200 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                Live Feed
              </CardTitle>
              <div className="flex gap-2">
                 <Badge variant="secondary" className="bg-slate-100 text-slate-600">All Shift</Badge>
                 <Badge variant="outline" className="text-slate-400">My Notes</Badge>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${note.nurse}`} />
                      <AvatarFallback className="bg-blue-50 text-blue-600">{note.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{note.nurse}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500">{note.timestamp}</span>
                        </div>
                        <Badge variant="outline" className={`${getNoteTypeColor(note.type)} text-[10px] px-2 h-5`}>
                          {note.type}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed text-sm mb-3">
                        {note.note}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs text-slate-600 font-medium">
                          <User className="w-3 h-3" /> {note.patientName}
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs text-slate-600 font-medium">
                          <span className="text-slate-400">Bed:</span> {note.bedNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Right: Handover Checklist */}
        <Card className="border-slate-200 flex flex-col overflow-hidden h-full">
          <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 py-4">
            <CardTitle className="text-base font-semibold text-emerald-900 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              Shift Handover Protocol
            </CardTitle>
            <CardDescription className="text-emerald-700/80 text-xs">
              Complete before shift end.
            </CardDescription>
          </CardHeader>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {[
                "Review critical labs & alerts",
                "Update medication records",
                "Check IV lines & drips",
                "Document output/intake",
                "Brief incoming nurse",
                "Sign off narcotics",
                "Clear pending alarms"
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <Checkbox id={`task-${i}`} className="mt-0.5" />
                  <label
                    htmlFor={`task-${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="h-px bg-slate-200 my-6" />
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Shift Stats</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Admissions</span>
                  <span className="font-mono font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Discharges</span>
                  <span className="font-mono font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Critical Events</span>
                  <span className="font-mono font-medium text-red-600">3</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6" variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Submit Handover Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
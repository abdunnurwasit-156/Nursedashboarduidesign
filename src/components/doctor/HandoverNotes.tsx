import { useState } from 'react';
import { FileText, Plus, AlertCircle, User, Clock, CheckSquare, Send, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface HandoverNote {
  id: string;
  type: 'outgoing' | 'incoming';
  date: Date;
  author: string;
  recipient?: string;
  content: string;
  criticalPoints: string[];
  pendingTasks: string[];
}

export function HandoverNotes() {
  const [handoverNotes] = useState<HandoverNote[]>([
    {
      id: 'h1',
      type: 'incoming',
      date: new Date(Date.now() - 8 * 60 * 60000),
      author: 'Dr. Michael Chen',
      recipient: 'Dr. Sarah Adams',
      content: 'Day shift handover. Overall stable night with 2 critical patients requiring close monitoring.',
      criticalPoints: [
        'ICU-202 (Michael Chen) - Respiratory failure, may need intubation if SpO₂ continues to decline',
        'ICU-203 (Robert Martinez) - Septic shock, on norepinephrine, BP unstable',
        'CCU-105 (Emma Davis) - Post-MI, troponin trending down but had chest pain episode at 0300'
      ],
      pendingTasks: [
        'Review ABG results for ICU-202 when available',
        'Consider central line placement for ICU-203',
        'Follow-up troponin for CCU-105 at 1200',
        'Family meeting scheduled for ICU-201 at 1400'
      ]
    }
  ]);

  const [newHandover, setNewHandover] = useState({
    content: '',
    criticalPoints: [''],
    pendingTasks: ['']
  });

  const handleAddCriticalPoint = () => {
    setNewHandover({
      ...newHandover,
      criticalPoints: [...newHandover.criticalPoints, '']
    });
  };

  const handleAddPendingTask = () => {
    setNewHandover({
      ...newHandover,
      pendingTasks: [...newHandover.pendingTasks, '']
    });
  };

  const handleCriticalPointChange = (index: number, value: string) => {
    const updated = [...newHandover.criticalPoints];
    updated[index] = value;
    setNewHandover({ ...newHandover, criticalPoints: updated });
  };

  const handlePendingTaskChange = (index: number, value: string) => {
    const updated = [...newHandover.pendingTasks];
    updated[index] = value;
    setNewHandover({ ...newHandover, pendingTasks: updated });
  };

  const handleSubmit = () => {
    console.log('Submitting handover:', newHandover);
    // Reset form
    setNewHandover({
      content: '',
      criticalPoints: [''],
      pendingTasks: ['']
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Handover Notes</h1>
        <p className="text-slate-500">Shift transition and continuity of care documentation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Handover */}
        <Card className="h-fit">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Create Handover Note</CardTitle>
                <CardDescription>Document current status for the next shift</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>General Summary</Label>
              <Textarea
                value={newHandover.content}
                onChange={(e) => setNewHandover({ ...newHandover, content: e.target.value })}
                placeholder="Overall shift summary and stable patients..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-red-900 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Critical Points
                </Label>
                <Button variant="ghost" size="sm" onClick={handleAddCriticalPoint} className="h-8 text-blue-600 hover:text-blue-700">
                  <Plus className="w-3 h-3 mr-1" /> Add Point
                </Button>
              </div>
              <div className="space-y-2">
                {newHandover.criticalPoints.map((point, index) => (
                  <Input
                    key={index}
                    value={point}
                    onChange={(e) => handleCriticalPointChange(index, e.target.value)}
                    placeholder="e.g. Bed 101 respiratory distress..."
                    className="border-red-100 focus-visible:ring-red-500"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Pending Tasks
                </Label>
                <Button variant="ghost" size="sm" onClick={handleAddPendingTask} className="h-8 text-blue-600 hover:text-blue-700">
                  <Plus className="w-3 h-3 mr-1" /> Add Task
                </Button>
              </div>
              <div className="space-y-2">
                {newHandover.pendingTasks.map((task, index) => (
                  <Input
                    key={index}
                    value={task}
                    onChange={(e) => handlePendingTaskChange(index, e.target.value)}
                    placeholder="e.g. Check labs at 14:00..."
                    className="border-blue-100 focus-visible:ring-blue-500"
                  />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-slate-50 border-t border-slate-100">
            <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Handover
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Handovers */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Recent History
          </h3>
          
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4 pr-4">
              {handoverNotes.map((note) => (
                <Card key={note.id} className="overflow-hidden">
                  <div className={`h-1 w-full ${note.type === 'incoming' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={note.type === 'incoming' ? 'default' : 'secondary'} className={note.type === 'incoming' ? 'bg-green-600 hover:bg-green-700' : ''}>
                            {note.type === 'incoming' ? 'RECEIVED' : 'SENT'}
                          </Badge>
                          <span className="text-xs text-slate-500 font-mono">
                            {note.date.toLocaleDateString()} • {note.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="font-medium text-slate-900">{note.author}</span>
                          <ArrowRight className="w-3 h-3 mx-1 text-slate-400" />
                          <span>{note.recipient || 'Team'}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4 text-sm">
                    <div className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                      {note.content}
                    </div>

                    {note.criticalPoints.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-700 text-xs uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Critical Points
                        </h4>
                        <ul className="space-y-1">
                          {note.criticalPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                              <span className="text-red-500 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {note.pendingTasks.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                         <h4 className="font-semibold text-blue-700 text-xs uppercase tracking-wider flex items-center gap-1">
                          <CheckSquare className="w-3 h-3" /> Pending Tasks
                        </h4>
                        <ul className="space-y-1">
                          {note.pendingTasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                              <span className="text-blue-400">□</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
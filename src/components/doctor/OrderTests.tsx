import { useState } from 'react';
import { Plus, TestTube, Stethoscope, Check, Search, AlertCircle } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';

interface TestOrderForm {
  patientId: string;
  testName: string;
  type: 'lab' | 'radiology';
  urgency: 'stat' | 'urgent' | 'routine';
  clinicalIndication: string;
}

const labTests = [
  'Complete Blood Count (CBC)',
  'Basic Metabolic Panel (BMP)',
  'Arterial Blood Gas (ABG)',
  'Troponin I',
  'BNP',
  'Blood Culture',
  'Urinalysis',
  'Coagulation Panel (PT/INR/PTT)',
  'Liver Function Tests',
  'Lipid Panel'
];

const radiologyTests = [
  'Chest X-Ray',
  'CT Head',
  'CT Chest',
  'CT Abdomen/Pelvis',
  'Echocardiogram',
  'Ultrasound Abdomen',
  'MRI Brain',
  'Doppler Ultrasound'
];

export function OrderTests() {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [openPatient, setOpenPatient] = useState(false);
  const [testType, setTestType] = useState<'lab' | 'radiology'>('lab');
  
  const [form, setForm] = useState<TestOrderForm>({
    patientId: '',
    testName: '',
    type: 'lab',
    urgency: 'routine',
    clinicalIndication: ''
  });

  const availableTests = testType === 'lab' ? labTests : radiologyTests;
  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Test order submitted:', { ...form, patientId: selectedPatientId, type: testType });
    
    // Reset form
    setForm({
      patientId: '',
      testName: '',
      type: 'lab',
      urgency: 'routine',
      clinicalIndication: ''
    });
    setSelectedPatientId('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order Tests</h1>
        <p className="text-slate-500">Request laboratory and radiology diagnostics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all border-2 ${testType === 'lab' ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200 hover:border-purple-200'}`}
          onClick={() => {
            setTestType('lab');
            setForm({ ...form, testName: '' });
          }}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${testType === 'lab' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
              <TestTube className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-semibold ${testType === 'lab' ? 'text-purple-900' : 'text-slate-900'}`}>Laboratory</h3>
              <p className="text-sm text-slate-500">Blood work, cultures, panels</p>
            </div>
            {testType === 'lab' && <Check className="w-5 h-5 text-purple-600 ml-auto" />}
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all border-2 ${testType === 'radiology' ? 'border-teal-500 bg-teal-50/50' : 'border-slate-200 hover:border-teal-200'}`}
          onClick={() => {
            setTestType('radiology');
            setForm({ ...form, testName: '' });
          }}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${testType === 'radiology' ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-semibold ${testType === 'radiology' ? 'text-teal-900' : 'text-slate-900'}`}>Radiology</h3>
              <p className="text-sm text-slate-500">X-rays, CT, MRI, ultrasound</p>
            </div>
            {testType === 'radiology' && <Check className="w-5 h-5 text-teal-600 ml-auto" />}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Specify urgency and indication for the selected test.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Patient <span className="text-red-500">*</span></Label>
              <Popover open={openPatient} onOpenChange={setOpenPatient}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPatient}
                    className="w-full justify-between"
                  >
                    {selectedPatientId
                      ? `${selectedPatient?.bedNumber} - ${selectedPatient?.name}`
                      : "Select patient..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search patient..." />
                    <CommandList>
                      <CommandEmpty>No patient found.</CommandEmpty>
                      <CommandGroup>
                        {mockPatients.map((patient) => (
                          <CommandItem
                            key={patient.id}
                            value={patient.name}
                            onSelect={() => {
                              setSelectedPatientId(patient.id);
                              setOpenPatient(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedPatientId === patient.id ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{patient.bedNumber} - {patient.name}</span>
                              <span className="text-xs text-muted-foreground">{patient.diagnosis}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Test Name <span className="text-red-500">*</span></Label>
                <Select 
                  value={form.testName} 
                  onValueChange={(val) => setForm({ ...form, testName: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${testType} test...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTests.map(test => (
                      <SelectItem key={test} value={test}>{test}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Urgency <span className="text-red-500">*</span></Label>
                <RadioGroup 
                  value={form.urgency} 
                  onValueChange={(val) => setForm({ ...form, urgency: val as any })}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="stat" id="stat" className="peer sr-only" />
                    <Label
                      htmlFor="stat"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 peer-data-[state=checked]:text-red-900 cursor-pointer text-center"
                    >
                      <span className="text-sm font-semibold">STAT</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Immediate</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="urgent" id="urgent" className="peer sr-only" />
                    <Label
                      htmlFor="urgent"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 peer-data-[state=checked]:text-orange-900 cursor-pointer text-center"
                    >
                      <span className="text-sm font-semibold">Urgent</span>
                      <span className="text-[10px] text-muted-foreground mt-1">&lt; 4 hours</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="routine" id="routine" className="peer sr-only" />
                    <Label
                      htmlFor="routine"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-900 cursor-pointer text-center"
                    >
                      <span className="text-sm font-semibold">Routine</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Next round</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Clinical Indication <span className="text-red-500">*</span></Label>
              <Textarea 
                placeholder="Describe relevant symptoms or diagnostic purpose..." 
                value={form.clinicalIndication}
                onChange={(e) => setForm({ ...form, clinicalIndication: e.target.value })}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => {
                setForm({
                  patientId: '',
                  testName: '',
                  type: 'lab',
                  urgency: 'routine',
                  clinicalIndication: ''
                });
                setSelectedPatientId('');
              }}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Submit Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
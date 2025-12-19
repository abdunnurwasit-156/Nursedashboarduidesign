import { useState } from 'react';
import { Search, AlertTriangle, Plus, X, Pill, Stethoscope, Check } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';

interface MedicationForm {
  patientId: string;
  medication: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  indication: string;
}

const commonMedications = [
  'Metoprolol', 'Furosemide', 'Aspirin', 'Atorvastatin', 'Lisinopril',
  'Vancomycin', 'Ceftriaxone', 'Norepinephrine', 'Propofol', 'Fentanyl',
  'Heparin', 'Insulin', 'Morphine', 'Nitroglycerin', 'Amiodarone'
];

const routes = ['PO', 'IV', 'IM', 'SC', 'Topical', 'Inhalation'];
const frequencies = ['Once', 'BID', 'TID', 'QID', 'Q4H', 'Q6H', 'Q8H', 'Q12H', 'Daily', 'Continuous'];

export function PrescribeMedication() {
  const [openPatient, setOpenPatient] = useState(false);
  const [openMed, setOpenMed] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  
  const [form, setForm] = useState<MedicationForm>({
    patientId: '',
    medication: '',
    dose: '',
    route: 'PO',
    frequency: 'BID',
    duration: '',
    indication: ''
  });
  const [showInteractionWarning, setShowInteractionWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Prescription submitted:', { ...form, patientId: selectedPatientId });
    // Reset form
    setForm({
      patientId: '',
      medication: '',
      dose: '',
      route: 'PO',
      frequency: 'BID',
      duration: '',
      indication: ''
    });
    setSelectedPatientId('');
    setShowInteractionWarning(false);
  };

  const handleMedicationSelect = (med: string) => {
    setForm({ ...form, medication: med });
    setOpenMed(false);
    // Simulate drug interaction check
    if (med === 'Vancomycin' || med === 'Warfarin') {
      setShowInteractionWarning(true);
    } else {
      setShowInteractionWarning(false);
    }
  };

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Prescribe Medication</h1>
        <p className="text-slate-500">Create and sign new medication orders.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Prescription</CardTitle>
          <CardDescription>
            Enter medication details below. All fields marked with * are required.
          </CardDescription>
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
                    <CommandInput placeholder="Search patient name or bed..." />
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

            <div className="space-y-2">
              <Label>Medication <span className="text-red-500">*</span></Label>
              <Popover open={openMed} onOpenChange={setOpenMed}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openMed}
                    className="w-full justify-between"
                  >
                    {form.medication ? form.medication : "Select medication..."}
                    <Pill className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search medications..." />
                    <CommandList>
                      <CommandEmpty>No medication found.</CommandEmpty>
                      <CommandGroup>
                        {commonMedications.map((med) => (
                          <CommandItem
                            key={med}
                            value={med}
                            onSelect={() => handleMedicationSelect(med)}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                form.medication === med ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {med}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {showInteractionWarning && (
              <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-900 font-semibold">Potential Drug Interaction</AlertTitle>
                <AlertDescription className="text-amber-800">
                  This medication may interact with other drugs on the patient's active list. Please review renal function and current medications.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Dose <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="e.g. 50mg" 
                  value={form.dose}
                  onChange={(e) => setForm({ ...form, dose: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Route <span className="text-red-500">*</span></Label>
                <Select value={form.route} onValueChange={(val) => setForm({ ...form, route: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Frequency <span className="text-red-500">*</span></Label>
                <Select value={form.frequency} onValueChange={(val) => setForm({ ...form, frequency: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="e.g. 7 days" 
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Clinical Indication <span className="text-red-500">*</span></Label>
              <Textarea 
                placeholder="Reason for prescription..." 
                value={form.indication}
                onChange={(e) => setForm({ ...form, indication: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => {
                setForm({
                  patientId: '',
                  medication: '',
                  dose: '',
                  route: 'PO',
                  frequency: 'BID',
                  duration: '',
                  indication: ''
                });
                setSelectedPatientId('');
                setShowInteractionWarning(false);
              }}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Sign & Prescribe
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
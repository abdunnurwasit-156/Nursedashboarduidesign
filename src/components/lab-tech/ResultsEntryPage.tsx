import { ArrowLeft, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { useState } from 'react';
import { TestOrder } from '../../types/doctor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ResultsEntryPageProps {
  test: TestOrder;
  onComplete: (results: string) => void;
  onBack: () => void;
}

export function ResultsEntryPage({ test, onComplete, onBack }: ResultsEntryPageProps) {
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [isCritical, setIsCritical] = useState(false);
  const [isAbnormal, setIsAbnormal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [notes, setNotes] = useState('');

  const getTestFields = (testName: string) => {
    const testTemplates: { 
      [key: string]: { 
        fields: { name: string; unit: string; normalRange: string; type?: string; options?: string[] }[] 
      } 
    } = {
      'Complete Blood Count': {
        fields: [
          { name: 'WBC', unit: 'K/μL', normalRange: '4.5-11.0', type: 'number' },
          { name: 'RBC', unit: 'M/μL', normalRange: '4.5-5.9 (M), 4.1-5.1 (F)', type: 'number' },
          { name: 'Hemoglobin', unit: 'g/dL', normalRange: '13.5-17.5 (M), 12.0-15.5 (F)', type: 'number' },
          { name: 'Hematocrit', unit: '%', normalRange: '38.8-50.0 (M), 34.9-44.5 (F)', type: 'number' },
          { name: 'MCV', unit: 'fL', normalRange: '80-100', type: 'number' },
          { name: 'Platelets', unit: 'K/μL', normalRange: '150-400', type: 'number' },
          { name: 'Neutrophils', unit: '%', normalRange: '40-70', type: 'number' },
          { name: 'Lymphocytes', unit: '%', normalRange: '20-40', type: 'number' },
        ]
      },
      'Complete Metabolic Panel': {
        fields: [
          { name: 'Glucose', unit: 'mg/dL', normalRange: '70-100', type: 'number' },
          { name: 'BUN', unit: 'mg/dL', normalRange: '7-20', type: 'number' },
          { name: 'Creatinine', unit: 'mg/dL', normalRange: '0.7-1.3', type: 'number' },
          { name: 'Sodium', unit: 'mEq/L', normalRange: '136-145', type: 'number' },
          { name: 'Potassium', unit: 'mEq/L', normalRange: '3.5-5.0', type: 'number' },
          { name: 'Chloride', unit: 'mEq/L', normalRange: '96-106', type: 'number' },
          { name: 'CO2', unit: 'mEq/L', normalRange: '23-29', type: 'number' },
          { name: 'Calcium', unit: 'mg/dL', normalRange: '8.5-10.5', type: 'number' },
          { name: 'ALT', unit: 'U/L', normalRange: '7-56', type: 'number' },
          { name: 'AST', unit: 'U/L', normalRange: '10-40', type: 'number' },
          { name: 'Bilirubin Total', unit: 'mg/dL', normalRange: '0.1-1.2', type: 'number' },
        ]
      },
      // ... Add more templates as needed, keeping it concise for this refactor
    };

    return testTemplates[testName] || {
      fields: [
        { name: 'Result Value', unit: '', normalRange: 'See reference range', type: 'text' }
      ]
    };
  };

  const template = getTestFields(test.testName);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSaveDraft = () => {
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const handleSubmit = () => {
    const resultLines = template.fields
      .filter(field => fieldValues[field.name])
      .map(field => {
        const value = fieldValues[field.name];
        const unit = field.unit ? ` ${field.unit}` : '';
        return `${field.name}: ${value}${unit}`;
      });

    if (resultLines.length === 0) {
      alert('Please enter at least one result value.');
      return;
    }

    let fullResults = resultLines.join('\n');
    
    if (notes.trim()) {
      fullResults += '\n\nPathologist Notes:\n' + notes.trim();
    }
    
    if (isCritical) {
      fullResults += '\n\n⚠️ CRITICAL VALUES DETECTED';
    }
    if (isAbnormal) {
      fullResults += '\n⚠️ ABNORMAL VALUES DETECTED';
    }
    
    onComplete(fullResults);
  };

  const urgencyBadgeVariant = (urgency: string) => {
    switch (urgency) {
      case 'stat': return 'destructive';
      case 'urgent': return 'secondary';
      case 'routine': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to In Progress
          </Button>
          <div className="flex items-center gap-3">
            {showSaveConfirm && (
              <span className="text-sm text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <CheckCircle className="w-4 h-4" />
                Draft saved
              </span>
            )}
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" /> Complete & Submit
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Enter Test Results</h1>
          <Badge variant={urgencyBadgeVariant(test.urgency) as any}>
            {test.urgency.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* Patient & Test Info */}
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wider">Patient</div>
                <div className="text-purple-900 font-medium">{test.patientName}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wider">Bed Number</div>
                <div className="text-purple-900 font-medium">{test.bedNumber}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wider">Test Type</div>
                <div className="text-purple-900 font-medium">{test.testName}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wider">Clinical Indication</div>
                <div className="text-purple-900 text-sm">{test.clinicalIndication}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Entry Table */}
        <Card>
          <CardHeader>
             <CardTitle>Result Data</CardTitle>
             <CardDescription>Enter values for each parameter.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[30%]">Parameter</TableHead>
                  <TableHead className="w-[25%]">Value</TableHead>
                  <TableHead className="w-[15%]">Unit</TableHead>
                  <TableHead className="w-[30%]">Normal Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {template.fields.map((field, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-slate-900">{field.name}</TableCell>
                    <TableCell>
                      {field.type === 'select' && field.options ? (
                        <Select
                          value={fieldValues[field.name] || ''}
                          onValueChange={(value) => handleFieldChange(field.name, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                             {field.options.map((option, optIdx) => (
                               <SelectItem key={optIdx} value={option}>{option}</SelectItem>
                             ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={field.type || 'text'}
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          placeholder={field.type === 'number' ? '0.00' : 'Enter result'}
                          className="w-full font-medium"
                        />
                      )}
                    </TableCell>
                    <TableCell className="text-slate-500">{field.unit || '-'}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{field.normalRange || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Flags Section */}
        <Card>
          <CardHeader>
             <CardTitle>Observations & Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Pathologist Notes</Label>
              <Textarea 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional observations or comments..."
                className="resize-none h-24"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`border rounded-lg p-4 transition-colors ${isCritical ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                <div className="flex items-start space-x-3">
                   <Checkbox 
                      id="critical" 
                      checked={isCritical}
                      onCheckedChange={(c) => setIsCritical(c as boolean)}
                      className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                   />
                   <div className="grid gap-1.5 leading-none">
                     <Label htmlFor="critical" className={`text-base font-semibold ${isCritical ? 'text-red-900' : 'text-slate-900'}`}>
                        Critical Values Detected
                     </Label>
                     <p className={`text-sm ${isCritical ? 'text-red-700' : 'text-slate-500'}`}>
                        Check if results indicate immediate life-threatening condition.
                     </p>
                   </div>
                </div>
              </div>

              <div className={`border rounded-lg p-4 transition-colors ${isAbnormal ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                <div className="flex items-start space-x-3">
                   <Checkbox 
                      id="abnormal" 
                      checked={isAbnormal}
                      onCheckedChange={(c) => setIsAbnormal(c as boolean)}
                      className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                   />
                   <div className="grid gap-1.5 leading-none">
                     <Label htmlFor="abnormal" className={`text-base font-semibold ${isAbnormal ? 'text-orange-900' : 'text-slate-900'}`}>
                        Abnormal Values Detected
                     </Label>
                     <p className={`text-sm ${isAbnormal ? 'text-orange-700' : 'text-slate-500'}`}>
                        Check if results are outside normal range but not critical.
                     </p>
                   </div>
                </div>
              </div>
            </div>

            {isCritical && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-900 font-semibold">Critical Value Alert</AlertTitle>
                <AlertDescription className="text-red-800">
                  Submitting this will immediately notify the attending physician via high-priority alert.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
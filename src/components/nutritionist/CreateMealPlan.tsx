import { Utensils, Save, X, Plus, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface CreateMealPlanProps {
  patientName: string;
  bedNumber: string;
  onClose: () => void;
  onSave: () => void;
}

export function CreateMealPlan({ patientName, bedNumber, onClose, onSave }: CreateMealPlanProps) {
  const [formData, setFormData] = useState({
    dietType: '',
    caloriesTarget: '',
    proteinTarget: '',
    carbTarget: '',
    fatTarget: '',
    fluidRestriction: '',
    texture: 'regular',
    restrictions: [] as string[],
    allergies: '',
    supplements: '',
    feedingRoute: 'oral',
    frequency: '3-meals',
    specialInstructions: ''
  });

  const [customRestriction, setCustomRestriction] = useState('');

  const commonDietTypes = [
    'Regular Diet',
    'Cardiac Diet - Low Sodium',
    'Diabetic Diet - Carb Controlled',
    'Renal Diet - Low Potassium',
    'Clear Liquid Diet',
    'Full Liquid Diet',
    'Mechanical Soft Diet',
    'Puree Diet',
    'NPO (Nothing by Mouth)',
    'High Protein Diet',
    'Low Residue Diet'
  ];

  const textureOptions = [
    { value: 'regular', label: 'Regular' },
    { value: 'soft', label: 'Soft/Tender' },
    { value: 'mechanical-soft', label: 'Mechanical Soft' },
    { value: 'puree', label: 'Puree' },
    { value: 'liquid', label: 'Liquid' },
    { value: 'thick-liquid', label: 'Thick Liquid' }
  ];

  const feedingRoutes = [
    { value: 'oral', label: 'Oral' },
    { value: 'ng-tube', label: 'NG Tube' },
    { value: 'peg-tube', label: 'PEG Tube' },
    { value: 'tpn', label: 'TPN (IV)' }
  ];

  const commonRestrictions = [
    'Low sodium (<2g/day)',
    'Low saturated fat',
    'No concentrated sweets',
    'Low potassium',
    'Low phosphorus',
    'Fluid restriction',
    'No raw fruits/vegetables',
    'Gluten-free',
    'Lactose-free'
  ];

  const handleAddRestriction = (restriction: string) => {
    if (!formData.restrictions.includes(restriction)) {
      setFormData({ ...formData, restrictions: [...formData.restrictions, restriction] });
    }
  };

  const handleRemoveRestriction = (restriction: string) => {
    setFormData({
      ...formData,
      restrictions: formData.restrictions.filter(r => r !== restriction)
    });
  };

  const handleAddCustomRestriction = () => {
    if (customRestriction.trim() && !formData.restrictions.includes(customRestriction.trim())) {
      setFormData({
        ...formData,
        restrictions: [...formData.restrictions, customRestriction.trim()]
      });
      setCustomRestriction('');
    }
  };

  const handleSubmit = () => {
    // This would normally save to database and notify kitchen/food services
    console.log('Meal plan created:', formData);
    onSave();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Utensils className="w-5 h-5" />
             </div>
             <div>
               <DialogTitle>Create Meal Plan</DialogTitle>
               <DialogDescription>{bedNumber} • {patientName}</DialogDescription>
             </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Diet Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Diet Type</Label>
              <Select 
                value={formData.dietType} 
                onValueChange={(value) => setFormData({ ...formData, dietType: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select primary diet type..." />
                </SelectTrigger>
                <SelectContent>
                  {commonDietTypes.map(diet => (
                    <SelectItem key={diet} value={diet}>{diet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nutritional Targets */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Daily Nutritional Targets</Label>
              <Card className="bg-slate-50 border-slate-200 shadow-none">
                <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">Calories (kcal)</Label>
                    <Input
                      type="number"
                      value={formData.caloriesTarget}
                      onChange={(e) => setFormData({ ...formData, caloriesTarget: e.target.value })}
                      placeholder="2000"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">Protein (g)</Label>
                    <Input
                      type="number"
                      value={formData.proteinTarget}
                      onChange={(e) => setFormData({ ...formData, proteinTarget: e.target.value })}
                      placeholder="80"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">Carbs (g)</Label>
                    <Input
                      type="number"
                      value={formData.carbTarget}
                      onChange={(e) => setFormData({ ...formData, carbTarget: e.target.value })}
                      placeholder="250"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-500 uppercase tracking-wide">Fat (g)</Label>
                    <Input
                      type="number"
                      value={formData.fatTarget}
                      onChange={(e) => setFormData({ ...formData, fatTarget: e.target.value })}
                      placeholder="70"
                      className="bg-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Texture and Feeding Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Food Texture</Label>
                <Select
                  value={formData.texture}
                  onValueChange={(value) => setFormData({ ...formData, texture: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select texture" />
                  </SelectTrigger>
                  <SelectContent>
                    {textureOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Feeding Route</Label>
                <Select
                  value={formData.feedingRoute}
                  onValueChange={(value) => setFormData({ ...formData, feedingRoute: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedingRoutes.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Dietary Restrictions</Label>
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {commonRestrictions.map(restriction => (
                      <Badge 
                        key={restriction}
                        variant={formData.restrictions.includes(restriction) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.restrictions.includes(restriction) 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                        onClick={() => formData.restrictions.includes(restriction) 
                          ? handleRemoveRestriction(restriction) 
                          : handleAddRestriction(restriction)
                        }
                      >
                        {restriction}
                      </Badge>
                    ))}
                 </div>
                 
                 <div className="flex gap-2">
                   <Input
                     value={customRestriction}
                     onChange={(e) => setCustomRestriction(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomRestriction())}
                     placeholder="Add custom restriction..."
                     className="h-9"
                   />
                   <Button size="sm" variant="secondary" onClick={handleAddCustomRestriction}>
                     <Plus className="w-4 h-4 mr-1" /> Add
                   </Button>
                 </div>

                 {formData.restrictions.length > 0 && (
                   <div className="pt-2 border-t border-slate-100">
                     <span className="text-xs text-slate-500 font-medium uppercase mb-2 block">Selected Restrictions</span>
                     <div className="flex flex-wrap gap-2">
                       {formData.restrictions.map(restriction => (
                         <Badge key={restriction} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none gap-1 pl-2 pr-1">
                           {restriction}
                           <button onClick={() => handleRemoveRestriction(restriction)} className="ml-1 hover:text-amber-900 p-0.5 rounded-full">
                             <X className="w-3 h-3" />
                           </button>
                         </Badge>
                       ))}
                     </div>
                   </div>
                 )}
              </div>
            </div>

            {/* Allergies & Supplements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Allergies / Intolerances</Label>
                <Input
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g., Peanuts, Shellfish, Dairy"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Supplements</Label>
                <Input
                  value={formData.supplements}
                  onChange={(e) => setFormData({ ...formData, supplements: e.target.value })}
                  placeholder="e.g., Ensure Plus TID"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Kitchen & Nursing Instructions</Label>
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                rows={3}
                placeholder="e.g., NPO after midnight, encourage oral intake..."
                className="resize-none"
              />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-900">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-medium mb-1">Workflow Notification</p>
                <p className="text-blue-800/80">Saving will automatically notify Food Services for preparation and Nursing Staff for documentation.</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
           <Button variant="outline" onClick={onClose}>Cancel</Button>
           <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
             <Save className="w-4 h-4 mr-2" /> Save & Distribute Plan
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
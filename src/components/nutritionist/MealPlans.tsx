import { Utensils, Edit, Eye, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { CreateMealPlan } from './CreateMealPlan';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function MealPlans() {
  const [showModifyPlan, setShowModifyPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; bed: string } | null>(null);

  const mealPlans = [
    {
      id: 'mp1',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      dietType: 'Cardiac Diet - Low Sodium',
      caloriesTarget: 2000,
      proteinTarget: 80,
      restrictions: ['Low sodium (<2g/day)', 'Low saturated fat'],
      texture: 'Regular',
      status: 'active'
    },
    {
      id: 'mp2',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      dietType: 'Clear Liquid Diet',
      caloriesTarget: 800,
      proteinTarget: 20,
      restrictions: ['NPO until 6am', 'Advance as tolerated'],
      texture: 'Liquid',
      status: 'active'
    },
    {
      id: 'mp3',
      patientName: 'James Wilson',
      bedNumber: 'CCU-101',
      dietType: 'Diabetic Diet - Carb Controlled',
      caloriesTarget: 1800,
      proteinTarget: 75,
      restrictions: ['45-60g carbs per meal', 'No concentrated sweets'],
      texture: 'Regular',
      status: 'active'
    }
  ];

  const handleModifyPlan = (plan: typeof mealPlans[0]) => {
    setSelectedPlan({ name: plan.patientName, bed: plan.bedNumber });
    setShowModifyPlan(true);
  };

  const handleSaveModifiedPlan = () => {
    setShowModifyPlan(false);
    setSelectedPlan(null);
    // Updated meal plan sent to kitchen and nursing staff
  };

  const handleViewDetails = (plan: typeof mealPlans[0]) => {
    // Logic to handle viewing full details of the meal plan
    console.log('Viewing details for:', plan);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Meal Plans</h1>
        <p className="text-slate-500">{mealPlans.length} patients with active nutrition plans</p>
      </div>

      <div className="space-y-4">
        {mealPlans.map(plan => (
          <Card key={plan.id} className="hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{plan.dietType}</h3>
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="font-medium text-slate-900">{plan.bedNumber}</span>
                        <span>•</span>
                        <span>{plan.patientName}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-auto md:ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                      Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Calories</span>
                      <p className="text-lg font-semibold text-slate-900">{plan.caloriesTarget} <span className="text-sm font-normal text-slate-500">kcal</span></p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Protein</span>
                      <p className="text-lg font-semibold text-slate-900">{plan.proteinTarget}<span className="text-sm font-normal text-slate-500">g</span></p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Texture</span>
                      <p className="text-lg font-semibold text-slate-900">{plan.texture}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2 text-amber-800">
                      <ShieldAlert className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Restrictions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.restrictions.map((restriction, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white text-amber-900 border-amber-200">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 shrink-0 justify-end md:justify-start pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                  <Button 
                    variant="outline"
                    onClick={() => handleViewDetails(plan)}
                    className="w-full justify-start"
                  >
                    <Eye className="w-4 h-4 mr-2 text-slate-500" />
                    Details
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => handleModifyPlan(plan)}
                    className="bg-blue-600 hover:bg-blue-700 w-full justify-start"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showModifyPlan && selectedPlan && (
        <CreateMealPlan
          patientName={selectedPlan.name}
          bedNumber={selectedPlan.bed}
          onClose={() => setShowModifyPlan(false)}
          onSave={handleSaveModifiedPlan}
        />
      )}
    </div>
  );
}
import { TrendingUp, TrendingDown, Activity, Users } from 'lucide-react';
import { nurseMealIntakeSubmissions } from '../../data/sharedWorkflowData';
import { mockPatients } from '../../data/mockData';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function IntakeTracking() {
  // Group meal intake submissions by patient
  const patientIntakeMap = new Map();
  
  nurseMealIntakeSubmissions.forEach(submission => {
    if (!patientIntakeMap.has(submission.patientId)) {
      patientIntakeMap.set(submission.patientId, []);
    }
    patientIntakeMap.get(submission.patientId).push(submission);
  });

  // Calculate intake data for each patient
  const patients = Array.from(patientIntakeMap.entries()).map(([patientId, submissions]) => {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return null;

    // Get most recent submission
    const latestSubmission = submissions.sort((a: any, b: any) => b.date.getTime() - a.date.getTime())[0];
    
    // Calculate average intake
    const avgIntake = Math.round((latestSubmission.breakfast + latestSubmission.lunch + latestSubmission.dinner) / 3);
    
    // Estimate calories based on intake percentage (assuming 2000 cal target)
    const caloriesTarget = 2000;
    const caloriesActual = Math.round(caloriesTarget * avgIntake / 100);
    const proteinTarget = 80;
    const proteinActual = Math.round(proteinTarget * avgIntake / 100);

    return {
      id: patientId,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      caloriesTarget,
      caloriesActual,
      proteinTarget,
      proteinActual,
      intakePercentage: avgIntake,
      lastMeal: {
        meal: 'Latest Entry',
        time: latestSubmission.date.toLocaleTimeString(),
        percentEaten: avgIntake,
        documentedBy: latestSubmission.documentedBy
      },
      meals: [
        { meal: 'Breakfast', percentEaten: latestSubmission.breakfast, time: latestSubmission.date.toLocaleString() },
        { meal: 'Lunch', percentEaten: latestSubmission.lunch, time: latestSubmission.date.toLocaleString() },
        { meal: 'Dinner', percentEaten: latestSubmission.dinner, time: latestSubmission.date.toLocaleString() }
      ],
      notes: latestSubmission.notes
    };
  }).filter(p => p !== null);

  // Add some hardcoded patients for demo if nurse submissions are empty
  if (patients.length === 0) {
    patients.push(
      {
        id: 'int1',
        patientName: 'Robert Martinez',
        bedNumber: 'ICU-203',
        caloriesTarget: 2000,
        caloriesActual: 1850,
        proteinTarget: 80,
        proteinActual: 72,
        intakePercentage: 93,
        lastMeal: {
          meal: 'Lunch',
          time: '12:30 PM',
          percentEaten: 90,
          documentedBy: 'Nurse Jennifer'
        },
        meals: [
          { meal: 'Breakfast', percentEaten: 100, time: '8:00 AM' },
          { meal: 'Lunch', percentEaten: 90, time: '12:30 PM' },
          { meal: 'Dinner', percentEaten: 0, time: 'Pending' }
        ],
        notes: ''
      }
    );
  }

  const getIntakeBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'outline'; // Or success-like custom style
    if (percentage >= 60) return 'secondary'; // Warning
    return 'destructive';
  };

  const getIntakeColorClass = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (percentage >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getMealBgColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-emerald-100 text-emerald-800';
    if (percentage >= 50) return 'bg-amber-100 text-amber-800';
    if (percentage > 0) return 'bg-red-100 text-red-800';
    return 'bg-slate-100 text-slate-500';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intake Tracking</h1>
        <p className="text-slate-500">Daily calorie and protein monitoring based on nursing documentation</p>
      </div>

      <Card className="bg-blue-50/50 border-blue-100">
        <CardContent className="p-4">
          <div className="flex gap-3">
             <div className="p-2 bg-blue-100 rounded-full h-fit text-blue-600">
               <Activity className="w-4 h-4" />
             </div>
             <div className="space-y-1">
               <h3 className="text-sm font-semibold text-blue-900">How Intake Is Measured</h3>
               <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                 <li>Nurses document meal intake percentage (0-100%) in the Nursing Dashboard</li>
                 <li>Calories & protein are automatically calculated based on the active meal plan</li>
                 <li>Alerts are generated for intake &lt;75% for 2+ consecutive days</li>
               </ul>
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {patients.map(patient => {
          const caloriesPercentage = Math.round((patient.caloriesActual / patient.caloriesTarget) * 100);
          const proteinPercentage = Math.round((patient.proteinActual / patient.proteinTarget) * 100);

          return (
            <Card key={patient.id} className="shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{patient.patientName}</h3>
                      <p className="text-xs text-slate-500 font-medium">{patient.bedNumber}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`px-3 py-1 text-sm font-medium border ${getIntakeColorClass(patient.intakePercentage)}`}>
                    {patient.intakePercentage}% Intake
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Calories */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Calories (24h)</span>
                      <span className="text-slate-900 font-semibold">{patient.caloriesActual} <span className="text-slate-400 font-normal">/ {patient.caloriesTarget} kcal</span></span>
                    </div>
                    <Progress value={Math.min(caloriesPercentage, 100)} className="h-2.5" />
                    <p className="text-xs text-slate-500 text-right">{caloriesPercentage}% of target</p>
                  </div>

                  {/* Protein */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Protein (24h)</span>
                      <span className="text-slate-900 font-semibold">{patient.proteinActual}g <span className="text-slate-400 font-normal">/ {patient.proteinTarget}g</span></span>
                    </div>
                    <Progress value={Math.min(proteinPercentage, 100)} className="h-2.5 [&>div]:bg-purple-600" />
                    <p className="text-xs text-slate-500 text-right">{proteinPercentage}% of target</p>
                  </div>
                </div>

                {/* Meal Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Today's Meal Record</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {patient.meals.map((meal, idx) => (
                      <div key={idx} className={`rounded-lg p-3 text-center transition-all ${getMealBgColor(meal.percentEaten)}`}>
                        <div className="text-xs font-medium opacity-80 mb-1">{meal.meal}</div>
                        <div className="text-xl font-bold">{meal.percentEaten}%</div>
                        <div className="text-[10px] opacity-70 mt-1 truncate">{meal.time !== 'Pending' ? meal.time.split(',')[1]?.trim() || meal.time : 'Pending'}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/50 flex justify-between items-center text-xs text-slate-500">
                    <span>Last entry by <span className="font-medium text-slate-700">{patient.lastMeal.documentedBy}</span></span>
                    <span>{patient.lastMeal.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
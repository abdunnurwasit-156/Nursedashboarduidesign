# Complete Nutritionist Workflow Documentation

## 🎯 Full Workflow Overview

### 1. **Assessment Queue** → Create Meal Plan
**Who:** Nutritionist receives referrals from doctors/nurses
**Process:**
1. Doctor/Nurse requests nutrition assessment (e.g., "ventilated patient needs feeding plan")
2. Nutritionist sees request in Assessment Queue
3. Clicks "Start Assessment" → status changes to "In Progress"
4. After bedside assessment, clicks "Complete Assessment"
5. **Automatically opens "Create Meal Plan" modal**

### 2. **Create Meal Plan** (Modal Form)
**Who:** Nutritionist creates the plan
**What's included:**
- **Diet Type:** Regular, Cardiac, Diabetic, Renal, Liquid, NPO, etc.
- **Nutritional Targets:** Calories, protein, carbs, fat (daily goals)
- **Food Texture:** Regular, soft, mechanical soft, puree, liquid
- **Feeding Route:** Oral, NG tube, PEG tube, TPN
- **Restrictions:** Low sodium, no sweets, food allergies, etc.
- **Supplements:** Ensure, protein powder, vitamins
- **Special Instructions:** Aspiration precautions, family preferences

**What happens when saved:**
- Plan sent to **Kitchen/Food Services** → They prepare the meals
- Plan sent to **Nursing Staff** → They see diet orders and monitor intake
- Plan sent to **Physician** → For review/approval
- Plan documented in patient chart

### 3. **Meal Plans** (Active Plans Screen)
**Who:** Nutritionist monitors active plans
**Features:**
- View all patients with active meal plans
- See calorie/protein targets and current intake
- **Click "Modify Plan"** → Opens same "Create Meal Plan" form pre-filled with current data
- Make adjustments (increase calories, change texture, add supplements)
- Updated plan sent to Kitchen and Nursing staff

### 4. **Intake Tracking** (Monitoring Screen)
**Who inputs data:** NURSES document intake after each meal
**How it works:**
- **Nurses** see meal orders in their patient dashboard
- After each meal, nurse documents: "Patient ate 75% of breakfast"
- System calculates actual calories/protein based on: `Meal Plan × Intake %`
- Data appears in real-time on nutritionist's Intake Tracking screen

**What nutritionist sees:**
- 24h calorie/protein totals with progress bars
- Meal-by-meal breakdown (Breakfast 100%, Lunch 50%, Dinner pending)
- Color coding: Green ≥75%, Yellow 50-75%, Red <50%
- Who documented and when (e.g., "Documented by Nurse Jennifer at 12:30 PM")

**Automatic Alerts:** If intake <75% for 2+ consecutive days → generates nutrition alert

### 5. **Nutrition Alerts** (Intervention Needed)
**Who:** Nutritionist responds to poor intake/malnutrition warnings
**Triggers:**
- Poor oral intake (<67% for 3 days)
- Low albumin levels (severe malnutrition)
- Significant weight loss (>5% in 1 week)

**Action:** Click "Create Intervention Plan"

### 6. **Create Intervention Plan** (Modal Form)
**Who:** Nutritionist creates action plan
**Components:**
- **Action Items** (checkboxes):
  - Increase meal frequency to 5-6 small meals
  - Add high-calorie shakes between meals
  - Fortify foods with protein powder
  - Consider appetite stimulant medication
  - Assess for swallowing issues
  - Consider tube feeding
  - Monitor daily weights

- **Nutritional Adjustments:**
  - New calorie target (increase from 1800 to 2400)
  - New protein target (increase from 75g to 100g)

- **Supplements to Add:**
  - "Ensure Plus TID with meals, Protein powder BID"

- **Consultation Requests:**
  - ☑ Request physician consult for appetite stimulant
  - ☑ Request speech therapy for swallow evaluation

- **Follow-up:** Target intake goal (85%), Follow-up date

**What happens when saved:**
- Sent to **Nursing staff** for implementation
- Sent to **Physician** for approval
- Sent to **Kitchen** for meal adjustments
- Documented in patient chart

### 7. **TPN Management** (Special Feeding)
**Who:** Nutritionist manages IV nutrition for patients who can't eat
**Features:**
- Monitor TPN formula, infusion rate, calories delivered
- Track lab results (electrolytes, glucose)
- Adjust TPN composition based on labs

---

## 🔄 Complete Interconnected Workflow

### Scenario: Poor Intake Patient

1. **Day 1-3:** Nurse documents meals
   - Breakfast: 50%
   - Lunch: 60%
   - Dinner: 40%

2. **Day 3:** System generates alert
   - "Only 67% of calorie goal for 3 consecutive days"
   - Alert appears in **Nutrition Alerts** screen

3. **Nutritionist creates intervention plan:**
   - Increase calories from 1800 to 2200
   - Add Ensure Plus TID
   - Request physician consult for appetite stimulant
   - Request speech therapy swallow eval

4. **Plan is distributed:**
   - **Nurse:** Sees updated meal plan + supplement orders
   - **Kitchen:** Prepares higher-calorie meals
   - **Physician:** Reviews and approves appetite stimulant
   - **Speech Therapist:** Receives consult for swallow eval

5. **Follow-up:** Nutritionist monitors intake tracking
   - If improved → Continue plan
   - If no improvement → Consider tube feeding

---

## 👥 Role Responsibilities

| Role | Responsibility |
|------|---------------|
| **Nutritionist** | Assess, create meal plans, monitor intake, create interventions |
| **Doctor** | Request nutrition consults, approve appetite stimulants, approve tube feeding |
| **Nurse** | Document meal intake %, administer supplements, report concerns |
| **Kitchen/Food Services** | Prepare meals according to diet orders and restrictions |
| **Speech Therapist** | Evaluate swallowing safety (if consulted) |

---

## 🎨 UI Features

- **Color-coded urgency:** Red = critical malnutrition, Orange = urgent, Blue = routine
- **Auto-timestamping:** All actions automatically logged with user and time
- **Minimal clicks:** Most workflows 2-3 clicks from assessment to implementation
- **Modal forms:** Full-featured forms without leaving the page
- **Real-time updates:** Intake data updates automatically as nurses document
- **Badge counters:** Shows pending assessments and alerts in sidebar

---

## ✅ Workflow Now Complete

All nutritionist questions answered:
1. ✅ **Who prepares meal plan?** → Nutritionist after completing assessment
2. ✅ **Where to create meal plan?** → Auto-opens after "Complete Assessment" or from "Modify Plan"
3. ✅ **How nurses receive plan?** → Automatically sent to nursing dashboard as diet orders
4. ✅ **What happens when modify plan clicked?** → Opens same form pre-filled with current data
5. ✅ **How is intake tracking measured?** → Nurses document % eaten after each meal
6. ✅ **Who inputs tracking?** → Nurses in their patient dashboard
7. ✅ **What happens when create intervention plan?** → Opens comprehensive form, sends to care team

The nutritionist workflow is now fully functional and interconnected with all other roles!

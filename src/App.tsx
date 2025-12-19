import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MyPatients } from './components/MyPatients';
import { LiveAlerts } from './components/LiveAlerts';
import { Medications } from './components/Medications';
import { PatientDrawer } from './components/PatientDrawer';
import { OrderMedication } from './components/OrderMedication';
import { TestsReports } from './components/TestsReports';
import { EventsLog } from './components/EventsLog';
import { NurseNotes } from './components/NurseNotes';
import { NurseDashboard } from './components/NurseDashboard';
import { DoctorMyPatients } from './components/doctor/DoctorMyPatients';
import { ClinicalReview } from './components/doctor/ClinicalReview';
import { PrescribeMedication } from './components/doctor/PrescribeMedication';
import { OrderTests } from './components/doctor/OrderTests';
import { TestResults } from './components/doctor/TestResults';
import { PatientChart } from './components/doctor/PatientChart';
import { ApprovalsRequests } from './components/doctor/ApprovalsRequests';
import { HandoverNotes } from './components/doctor/HandoverNotes';
import { WardOverview } from './components/ward-incharge/WardOverview';
import { StaffManagement } from './components/ward-incharge/StaffManagement';
import { BedOccupancy } from './components/ward-incharge/BedOccupancy';
import { Resources } from './components/ward-incharge/Resources';
import { Incidents } from './components/ward-incharge/Incidents';
import { Reports } from './components/ward-incharge/Reports';
import { PendingTests } from './components/lab-tech/PendingTests';
import { SampleCollection } from './components/lab-tech/SampleCollection';
import { InProgress } from './components/lab-tech/InProgress';
import { Completed } from './components/lab-tech/Completed';
import { IncomingOrders } from './components/pharmacist/IncomingOrders';
import { DeliveredOrders } from './components/pharmacist/DeliveredOrders';
import { Inventory } from './components/pharmacist/Inventory';
import { Delivery } from './components/pharmacist/Delivery';
import { RefillRequests } from './components/pharmacist/RefillRequests';
import { ImagingQueue } from './components/radiologist/ImagingQueue';
import { InProgressScans } from './components/radiologist/InProgressScans';
import { ResultsEntry } from './components/radiologist/ResultsEntry';
import { CriticalFindings } from './components/radiologist/CriticalFindings';
import { EquipmentStatus } from './components/radiologist/EquipmentStatus';
import { AssessmentQueue } from './components/nutritionist/AssessmentQueue';
import { MealPlans } from './components/nutritionist/MealPlans';
import { TPNManagement } from './components/nutritionist/TPNManagement';
import { IntakeTracking } from './components/nutritionist/IntakeTracking';
import { NutritionAlerts } from './components/nutritionist/NutritionAlerts';
import { NutritionistPatientDrawer } from './components/nutritionist/NutritionistPatientDrawer';
import { PatientReferrals } from './components/physical-therapist/PatientReferrals';
import { MobilityAssessments } from './components/physical-therapist/MobilityAssessments';
import { TreatmentSessions } from './components/physical-therapist/TreatmentSessions';
import { ProgressTracking } from './components/physical-therapist/ProgressTracking';

export type TabType = 'dashboard' | 'patients' | 'alerts' | 'medications' | 'order' | 'tests' | 'events' | 'notes';
export type DoctorTabType = 'doctor-patients' | 'clinical-review' | 'prescribe' | 'order-tests' | 'results' | 'chart' | 'approvals' | 'handover';
export type WardInchargeTabType = 'overview' | 'staff' | 'beds' | 'resources' | 'incidents' | 'reports';
export type LabTechTabType = 'pending-tests' | 'sample-collection' | 'in-progress' | 'completed';
export type PharmacistTabType = 'incoming-orders' | 'delivered-orders' | 'inventory' | 'delivery' | 'refill-requests';
export type RadiologistTabType = 'imaging-queue' | 'in-progress-scans' | 'results-entry' | 'critical-findings' | 'equipment-status';
export type NutritionistTabType = 'assessment-queue' | 'meal-plans' | 'tpn-management' | 'intake-tracking' | 'nutrition-alerts';
export type PhysicalTherapistTabType = 'referrals' | 'mobility-assessments' | 'treatment-sessions' | 'progress-tracking';
export type UserRole = 'nurse' | 'doctor' | 'ward-incharge' | 'lab-tech' | 'pharmacist' | 'radiologist' | 'nutritionist' | 'physical-therapist';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('nurse');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeDoctorTab, setActiveDoctorTab] = useState<DoctorTabType>('doctor-patients');
  const [activeWardInchargeTab, setActiveWardInchargeTab] = useState<WardInchargeTabType>('overview');
  const [activeLabTechTab, setActiveLabTechTab] = useState<LabTechTabType>('pending-tests');
  const [activePharmacistTab, setActivePharmacistTab] = useState<PharmacistTabType>('incoming-orders');
  const [activeRadiologistTab, setActiveRadiologistTab] = useState<RadiologistTabType>('imaging-queue');
  const [activeNutritionistTab, setActiveNutritionistTab] = useState<NutritionistTabType>('assessment-queue');
  const [activePhysicalTherapistTab, setActivePhysicalTherapistTab] = useState<PhysicalTherapistTabType>('referrals');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chartPatientId, setChartPatientId] = useState<string | null>(null);
  const [chartOpen, setChartOpen] = useState(false);

  const handlePatientClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenChart = (patientId: string) => {
    setChartPatientId(patientId);
    setChartOpen(true);
  };

  const handleCloseChart = () => {
    setChartOpen(false);
  };

  const handleNutritionistPatientClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setDrawerOpen(true);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        userRole={userRole} 
        onRoleChange={setUserRole}
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        activeDoctorTab={activeDoctorTab}
        onDoctorTabChange={setActiveDoctorTab}
        activeWardInchargeTab={activeWardInchargeTab}
        onWardInchargeTabChange={setActiveWardInchargeTab}
        activeLabTechTab={activeLabTechTab}
        onLabTechTabChange={setActiveLabTechTab}
        activePharmacistTab={activePharmacistTab}
        onPharmacistTabChange={setActivePharmacistTab}
        activeRadiologistTab={activeRadiologistTab}
        onRadiologistTabChange={setActiveRadiologistTab}
        activeNutritionistTab={activeNutritionistTab}
        onNutritionistTabChange={setActiveNutritionistTab}
        activePhysicalTherapistTab={activePhysicalTherapistTab}
        onPhysicalTherapistTabChange={setActivePhysicalTherapistTab}
        onNutritionistPatientClick={handleNutritionistPatientClick}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userRole={userRole} />
        
        <main className="flex-1 overflow-auto p-6">
          {userRole === 'nurse' && (
            <>
              {activeTab === 'dashboard' && <NurseDashboard />}
              {activeTab === 'patients' && (
                <MyPatients onPatientClick={handlePatientClick} />
              )}
              {activeTab === 'alerts' && <LiveAlerts />}
              {activeTab === 'medications' && <Medications />}
              {activeTab === 'order' && <OrderMedication />}
              {activeTab === 'tests' && <TestsReports />}
              {activeTab === 'events' && <EventsLog />}
              {activeTab === 'notes' && (
                <NurseNotes />
              )}
            </>
          )}

          {userRole === 'doctor' && (
            <>
              {activeDoctorTab === 'doctor-patients' && (
                <DoctorMyPatients onOpenChart={handleOpenChart} />
              )}
              {activeDoctorTab === 'clinical-review' && <ClinicalReview />}
              {activeDoctorTab === 'prescribe' && <PrescribeMedication />}
              {activeDoctorTab === 'order-tests' && <OrderTests />}
              {activeDoctorTab === 'results' && <TestResults />}
              {activeDoctorTab === 'chart' && (
                <DoctorMyPatients onOpenChart={handleOpenChart} />
              )}
              {activeDoctorTab === 'approvals' && <ApprovalsRequests />}
              {activeDoctorTab === 'handover' && <HandoverNotes />}
            </>
          )}

          {userRole === 'ward-incharge' && (
            <>
              {activeWardInchargeTab === 'overview' && <WardOverview />}
              {activeWardInchargeTab === 'staff' && <StaffManagement />}
              {activeWardInchargeTab === 'beds' && <BedOccupancy />}
              {activeWardInchargeTab === 'resources' && <Resources />}
              {activeWardInchargeTab === 'incidents' && <Incidents />}
              {activeWardInchargeTab === 'reports' && <Reports />}
            </>
          )}

          {userRole === 'lab-tech' && (
            <>
              {activeLabTechTab === 'pending-tests' && <PendingTests />}
              {activeLabTechTab === 'sample-collection' && <SampleCollection />}
              {activeLabTechTab === 'in-progress' && <InProgress />}
              {activeLabTechTab === 'completed' && <Completed />}
            </>
          )}

          {userRole === 'pharmacist' && (
            <>
              {activePharmacistTab === 'incoming-orders' && <IncomingOrders />}
              {activePharmacistTab === 'delivered-orders' && <DeliveredOrders />}
              {activePharmacistTab === 'inventory' && <Inventory />}
              {activePharmacistTab === 'delivery' && <Delivery />}
              {activePharmacistTab === 'refill-requests' && <RefillRequests />}
            </>
          )}

          {userRole === 'radiologist' && (
            <>
              {activeRadiologistTab === 'imaging-queue' && <ImagingQueue />}
              {activeRadiologistTab === 'in-progress-scans' && <InProgressScans />}
              {activeRadiologistTab === 'results-entry' && <ResultsEntry />}
              {activeRadiologistTab === 'critical-findings' && <CriticalFindings />}
              {activeRadiologistTab === 'equipment-status' && <EquipmentStatus />}
            </>
          )}

          {userRole === 'nutritionist' && (
            <>
              {activeNutritionistTab === 'assessment-queue' && <AssessmentQueue />}
              {activeNutritionistTab === 'meal-plans' && <MealPlans />}
              {activeNutritionistTab === 'tpn-management' && <TPNManagement />}
              {activeNutritionistTab === 'intake-tracking' && <IntakeTracking />}
              {activeNutritionistTab === 'nutrition-alerts' && <NutritionAlerts />}
            </>
          )}

          {userRole === 'physical-therapist' && (
            <>
              {activePhysicalTherapistTab === 'referrals' && <PatientReferrals />}
              {activePhysicalTherapistTab === 'mobility-assessments' && <MobilityAssessments />}
              {activePhysicalTherapistTab === 'treatment-sessions' && <TreatmentSessions />}
              {activePhysicalTherapistTab === 'progress-tracking' && <ProgressTracking />}
            </>
          )}
        </main>
      </div>

      {userRole === 'nurse' && (
        <PatientDrawer
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
          patientId={selectedPatientId}
        />
      )}

      {userRole === 'doctor' && (
        <PatientChart
          isOpen={chartOpen}
          onClose={handleCloseChart}
          patientId={chartPatientId}
        />
      )}

      {userRole === 'nutritionist' && (
        <NutritionistPatientDrawer
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
          patientId={selectedPatientId}
        />
      )}
    </div>
  );
}

export default App;
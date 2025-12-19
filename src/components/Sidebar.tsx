import { 
  Users, Bell, Pill, ShoppingCart, FileText, ClipboardList, StickyNote, Stethoscope, 
  ClipboardCheck, FileSignature, TestTube, Activity, CheckSquare, BookOpen, 
  LayoutDashboard, UserCog, Bed, Package, AlertTriangle, BarChart3, Beaker, 
  Syringe, TrendingUp, Truck, Archive, ChevronDown, Camera, Utensils, Dumbbell,
  Command, CheckCircle
} from 'lucide-react';
import { TabType, DoctorTabType, WardInchargeTabType, LabTechTabType, PharmacistTabType, RadiologistTabType, NutritionistTabType, PhysicalTherapistTabType, UserRole } from '../App';
import { useState } from 'react';
import { mockPatients } from '../data/mockData';

interface SidebarProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeDoctorTab: DoctorTabType;
  onDoctorTabChange: (tab: DoctorTabType) => void;
  activeWardInchargeTab: WardInchargeTabType;
  onWardInchargeTabChange: (tab: WardInchargeTabType) => void;
  activeLabTechTab: LabTechTabType;
  onLabTechTabChange: (tab: LabTechTabType) => void;
  activePharmacistTab: PharmacistTabType;
  onPharmacistTabChange: (tab: PharmacistTabType) => void;
  activeRadiologistTab: RadiologistTabType;
  onRadiologistTabChange: (tab: RadiologistTabType) => void;
  activeNutritionistTab: NutritionistTabType;
  onNutritionistTabChange: (tab: NutritionistTabType) => void;
  activePhysicalTherapistTab: PhysicalTherapistTabType;
  onPhysicalTherapistTabChange: (tab: PhysicalTherapistTabType) => void;
  onNutritionistPatientClick?: (patientId: string) => void;
}

export function Sidebar({ 
  userRole, 
  onRoleChange, 
  activeTab, 
  onTabChange,
  activeDoctorTab,
  onDoctorTabChange,
  activeWardInchargeTab,
  onWardInchargeTabChange,
  activeLabTechTab,
  onLabTechTabChange,
  activePharmacistTab,
  onPharmacistTabChange,
  activeRadiologistTab,
  onRadiologistTabChange,
  activeNutritionistTab,
  onNutritionistTabChange,
  activePhysicalTherapistTab,
  onPhysicalTherapistTabChange,
  onNutritionistPatientClick
}: SidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const nurseTabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients' as TabType, label: 'My Patients', icon: Users },
    { id: 'alerts' as TabType, label: 'Live Alerts', icon: Bell, badge: 4 },
    { id: 'medications' as TabType, label: 'Medications', icon: Pill },
    { id: 'order' as TabType, label: 'Order Medication', icon: ShoppingCart },
    { id: 'tests' as TabType, label: 'Tests & Reports', icon: FileText },
    { id: 'events' as TabType, label: 'Events Log', icon: ClipboardList },
    { id: 'notes' as TabType, label: 'Notes & Handover', icon: StickyNote }
  ];

  const doctorTabs = [
    { id: 'doctor-patients' as DoctorTabType, label: 'My Patients', icon: Users },
    { id: 'clinical-review' as DoctorTabType, label: 'Clinical Review', icon: ClipboardCheck, badge: 4 },
    { id: 'prescribe' as DoctorTabType, label: 'Prescribe Medication', icon: FileSignature },
    { id: 'order-tests' as DoctorTabType, label: 'Order Tests', icon: TestTube },
    { id: 'results' as DoctorTabType, label: 'Test Results', icon: Activity, badge: 3 },
    { id: 'chart' as DoctorTabType, label: 'Patient Chart', icon: ClipboardList },
    { id: 'approvals' as DoctorTabType, label: 'Approvals', icon: CheckSquare, badge: 3 },
    { id: 'handover' as DoctorTabType, label: 'Handover Notes', icon: BookOpen }
  ];

  const wardInchargeTabs = [
    { id: 'overview' as WardInchargeTabType, label: 'Ward Overview', icon: LayoutDashboard, badge: 12 },
    { id: 'staff' as WardInchargeTabType, label: 'Staff Management', icon: UserCog },
    { id: 'beds' as WardInchargeTabType, label: 'Bed Occupancy', icon: Bed },
    { id: 'resources' as WardInchargeTabType, label: 'Resources', icon: Package },
    { id: 'incidents' as WardInchargeTabType, label: 'Incidents', icon: AlertTriangle, badge: 2 },
    { id: 'reports' as WardInchargeTabType, label: 'Reports', icon: BarChart3 }
  ];

  const labTechTabs = [
    { id: 'pending-tests' as LabTechTabType, label: 'Pending Tests', icon: Beaker, badge: 8 },
    { id: 'sample-collection' as LabTechTabType, label: 'Sample Collection', icon: Syringe, badge: 5 },
    { id: 'in-progress' as LabTechTabType, label: 'In Progress', icon: TrendingUp, badge: 3 },
    { id: 'completed' as LabTechTabType, label: 'Completed', icon: CheckSquare }
  ];

  const pharmacistTabs = [
    { id: 'incoming-orders' as PharmacistTabType, label: 'Incoming Orders', icon: FileText, badge: 12 },
    { id: 'delivered-orders' as PharmacistTabType, label: 'Delivered Orders', icon: CheckCircle, badge: 4 },
    { id: 'inventory' as PharmacistTabType, label: 'Inventory', icon: Archive },
    { id: 'delivery' as PharmacistTabType, label: 'Delivery', icon: Truck, badge: 4 },
    { id: 'refill-requests' as PharmacistTabType, label: 'Refill Requests', icon: AlertTriangle, badge: 3 }
  ];

  const radiologistTabs = [
    { id: 'imaging-queue' as RadiologistTabType, label: 'Imaging Queue', icon: Camera, badge: 5 },
    { id: 'in-progress-scans' as RadiologistTabType, label: 'In Progress', icon: Activity, badge: 2 },
    { id: 'results-entry' as RadiologistTabType, label: 'Results Entry', icon: FileText, badge: 3 },
    { id: 'critical-findings' as RadiologistTabType, label: 'Critical Findings', icon: AlertTriangle, badge: 3 },
    { id: 'equipment-status' as RadiologistTabType, label: 'Equipment', icon: Package }
  ];

  const nutritionistTabs = [
    { id: 'assessment-queue' as NutritionistTabType, label: 'Assessments', icon: ClipboardList, badge: 4 },
    { id: 'meal-plans' as NutritionistTabType, label: 'Meal Plans', icon: Utensils },
    { id: 'tpn-management' as NutritionistTabType, label: 'TPN', icon: Activity },
    { id: 'intake-tracking' as NutritionistTabType, label: 'Intake', icon: TrendingUp },
    { id: 'nutrition-alerts' as NutritionistTabType, label: 'Alerts', icon: AlertTriangle, badge: 3 }
  ];

  const physicalTherapistTabs = [
    { id: 'referrals' as PhysicalTherapistTabType, label: 'Referrals', icon: ClipboardList, badge: 3 },
    { id: 'mobility-assessments' as PhysicalTherapistTabType, label: 'Assessments', icon: Activity },
    { id: 'treatment-sessions' as PhysicalTherapistTabType, label: 'Treatments', icon: Dumbbell },
    { id: 'progress-tracking' as PhysicalTherapistTabType, label: 'Progress', icon: TrendingUp }
  ];

  const getCurrentTabs = () => {
    switch (userRole) {
      case 'nurse': return nurseTabs;
      case 'doctor': return doctorTabs;
      case 'ward-incharge': return wardInchargeTabs;
      case 'lab-tech': return labTechTabs;
      case 'pharmacist': return pharmacistTabs;
      case 'radiologist': return radiologistTabs;
      case 'nutritionist': return nutritionistTabs;
      case 'physical-therapist': return physicalTherapistTabs;
      default: return nurseTabs;
    }
  };

  const tabs = getCurrentTabs();

  const handleTabClick = (tabId: string) => {
    switch (userRole) {
      case 'nurse': onTabChange(tabId as TabType); break;
      case 'doctor': onDoctorTabChange(tabId as DoctorTabType); break;
      case 'ward-incharge': onWardInchargeTabChange(tabId as WardInchargeTabType); break;
      case 'lab-tech': onLabTechTabChange(tabId as LabTechTabType); break;
      case 'pharmacist': onPharmacistTabChange(tabId as PharmacistTabType); break;
      case 'radiologist': onRadiologistTabChange(tabId as RadiologistTabType); break;
      case 'nutritionist': onNutritionistTabChange(tabId as NutritionistTabType); break;
      case 'physical-therapist': onPhysicalTherapistTabChange(tabId as PhysicalTherapistTabType); break;
    }
  };

  const isTabActive = (tabId: string) => {
    switch (userRole) {
      case 'nurse': return activeTab === tabId;
      case 'doctor': return activeDoctorTab === tabId;
      case 'ward-incharge': return activeWardInchargeTab === tabId;
      case 'lab-tech': return activeLabTechTab === tabId;
      case 'pharmacist': return activePharmacistTab === tabId;
      case 'radiologist': return activeRadiologistTab === tabId;
      case 'nutritionist': return activeNutritionistTab === tabId;
      case 'physical-therapist': return activePhysicalTherapistTab === tabId;
      default: return false;
    }
  };

  const roleLabels = {
    'nurse': 'Nurse Station',
    'doctor': 'Doctor Portal',
    'ward-incharge': 'Ward Management',
    'lab-tech': 'Laboratory',
    'pharmacist': 'Pharmacy',
    'radiologist': 'Radiology',
    'nutritionist': 'Nutrition',
    'physical-therapist': 'Physical Therapy'
  };

  const roleIcons = {
    'nurse': Users,
    'doctor': Stethoscope,
    'ward-incharge': LayoutDashboard,
    'lab-tech': Beaker,
    'pharmacist': Pill,
    'radiologist': Camera,
    'nutritionist': Utensils,
    'physical-therapist': Dumbbell
  };

  const CurrentRoleIcon = roleIcons[userRole];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col text-slate-300">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
            <Command className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight">MediFlow</h1>
            <p className="text-xs text-slate-500 font-medium">ICU Management</p>
          </div>
        </div>

        {/* Role Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-3 py-2.5 bg-slate-800 rounded-lg flex items-center justify-between hover:bg-slate-700 transition-all border border-slate-700/50"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <CurrentRoleIcon className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm font-medium text-slate-100 truncate">{roleLabels[userRole]}</span>
            </div>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden max-h-[300px] overflow-y-auto">
                {Object.entries(roleLabels).map(([role, label]) => {
                  const Icon = roleIcons[role as UserRole];
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role as UserRole);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-slate-700 transition-colors ${
                        userRole === role ? 'bg-blue-600/10 text-blue-400' : 'text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-0.5">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(tab.id);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 font-medium'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full" />
              )}
              <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="flex-1 text-left text-sm">{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Patient List for Nutritionist */}
        {userRole === 'nutritionist' && onNutritionistPatientClick && (
          <div className="mt-8">
            <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assigned Patients
            </div>
            <div className="space-y-0.5">
              {mockPatients.slice(0, 5).map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => onNutritionistPatientClick(patient.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-slate-800/50 transition-colors group"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    patient.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                    patient.severity === 'moderate' ? 'bg-orange-500' :
                    patient.severity === 'warning' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-300 truncate group-hover:text-white transition-colors">
                      {patient.name.split(' ')[1]}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {patient.bedNumber}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">System Online</span>
          </div>
          <p className="text-[10px] text-slate-500">
            v2.4.0 • Updated 2m ago
          </p>
        </div>
      </div>
    </aside>
  );
}
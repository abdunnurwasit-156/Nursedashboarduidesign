import { useState } from 'react';
import { Edit2, Save, Trash2, Plus, X } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  route: string;
  prescribedDate: string;
  prescribedBy: string;
  status: string;
}

interface MedicationEditorProps {
  userRole: string;
}

export function MedicationEditor({ userRole }: MedicationEditorProps) {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 'med-1',
      name: 'Aspirin',
      dose: '81mg',
      frequency: 'Once daily',
      route: 'Oral',
      prescribedDate: 'Nov 20, 2025',
      prescribedBy: 'Dr. Johnson',
      status: 'Active'
    },
    {
      id: 'med-2',
      name: 'Metformin',
      dose: '500mg',
      frequency: 'Twice daily (with meals)',
      route: 'Oral',
      prescribedDate: 'Jan 10, 2020',
      prescribedBy: 'Dr. Anderson',
      status: 'Active'
    },
    {
      id: 'med-3',
      name: 'Lisinopril',
      dose: '10mg',
      frequency: 'Once daily (morning)',
      route: 'Oral',
      prescribedDate: 'Mar 5, 2019',
      prescribedBy: 'Dr. Johnson',
      status: 'Active'
    },
    {
      id: 'med-4',
      name: 'Albuterol Inhaler',
      dose: '2 puffs',
      frequency: 'Every 4-6 hours as needed',
      route: 'Inhalation',
      prescribedDate: 'Jul 15, 2023',
      prescribedBy: 'Dr. Patel',
      status: 'Active'
    }
  ]);

  const [editingMedId, setEditingMedId] = useState<string | null>(null);
  const [editedMed, setEditedMed] = useState<Medication | null>(null);
  const [showNewMedForm, setShowNewMedForm] = useState(false);

  const isDoctor = userRole === 'doctor';

  const handleEditMed = (med: Medication) => {
    setEditingMedId(med.id);
    setEditedMed({ ...med });
  };

  const handleSaveMed = () => {
    if (editedMed) {
      setMedications(medications.map(med => 
        med.id === editingMedId ? editedMed : med
      ));
      setEditingMedId(null);
      setEditedMed(null);
      alert('Medication updated successfully!');
    }
  };

  const handleDeleteMed = (medId: string) => {
    if (confirm('Are you sure you want to discontinue this medication?')) {
      setMedications(medications.filter(med => med.id !== medId));
      alert('Medication discontinued successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingMedId(null);
    setEditedMed(null);
    setShowNewMedForm(false);
  };

  const handleAddNewMed = () => {
    if (editedMed && editedMed.name && editedMed.dose && editedMed.frequency) {
      const newMed: Medication = {
        id: `med-${Date.now()}`,
        name: editedMed.name,
        dose: editedMed.dose,
        frequency: editedMed.frequency,
        route: editedMed.route,
        prescribedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        prescribedBy: 'Dr. Johnson',
        status: 'Active'
      };
      setMedications([...medications, newMed]);
      setShowNewMedForm(false);
      setEditedMed(null);
      alert('New medication prescribed successfully!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleStartNewMed = () => {
    setShowNewMedForm(true);
    setEditedMed({
      id: '',
      name: '',
      dose: '',
      frequency: '',
      route: 'Oral',
      prescribedDate: '',
      prescribedBy: '',
      status: 'Active'
    });
  };

  return (
    <div className="space-y-3">
      {medications.map(med => (
        editingMedId === med.id ? (
          // Edit Mode
          <div key={med.id} className="bg-blue-100 rounded-lg p-4 border-2 border-blue-400">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-blue-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  value={editedMed?.name || ''}
                  onChange={(e) => setEditedMed({ ...editedMed!, name: e.target.value })}
                  className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-blue-700 mb-1">Dose</label>
                  <input
                    type="text"
                    value={editedMed?.dose || ''}
                    onChange={(e) => setEditedMed({ ...editedMed!, dose: e.target.value })}
                    className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-blue-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={editedMed?.frequency || ''}
                    onChange={(e) => setEditedMed({ ...editedMed!, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-blue-700 mb-1">Route</label>
                  <select
                    value={editedMed?.route || 'Oral'}
                    onChange={(e) => setEditedMed({ ...editedMed!, route: e.target.value })}
                    className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Oral</option>
                    <option>IV</option>
                    <option>IM</option>
                    <option>SubQ</option>
                    <option>Topical</option>
                    <option>Inhalation</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleSaveMed}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <div key={med.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start justify-between mb-2">
              <div className="text-blue-900">{med.name}</div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{med.status}</span>
                {isDoctor && (
                  <>
                    <button
                      onClick={() => handleEditMed(med)}
                      className="p-1 hover:bg-blue-200 rounded transition-colors"
                      title="Edit medication"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteMed(med.id)}
                      className="p-1 hover:bg-red-200 rounded transition-colors"
                      title="Discontinue medication"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm text-blue-700">{med.dose} • {med.frequency} • {med.route}</div>
            <div className="text-xs text-blue-600 mt-2">Prescribed: {med.prescribedDate} • {med.prescribedBy}</div>
          </div>
        )
      ))}

      {/* New Medication Form */}
      {showNewMedForm && (
        <div className="bg-green-100 rounded-lg p-4 border-2 border-green-400">
          <h4 className="text-green-900 mb-3">Prescribe New Medication</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-green-700 mb-1">Medication Name *</label>
              <input
                type="text"
                value={editedMed?.name || ''}
                onChange={(e) => setEditedMed({ ...editedMed!, name: e.target.value })}
                placeholder="e.g., Lisinopril"
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-green-700 mb-1">Dose *</label>
                <input
                  type="text"
                  value={editedMed?.dose || ''}
                  onChange={(e) => setEditedMed({ ...editedMed!, dose: e.target.value })}
                  placeholder="e.g., 10mg"
                  className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-green-700 mb-1">Frequency *</label>
                <input
                  type="text"
                  value={editedMed?.frequency || ''}
                  onChange={(e) => setEditedMed({ ...editedMed!, frequency: e.target.value })}
                  placeholder="e.g., Twice daily"
                  className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-green-700 mb-1">Route *</label>
                <select
                  value={editedMed?.route || 'Oral'}
                  onChange={(e) => setEditedMed({ ...editedMed!, route: e.target.value })}
                  className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Oral</option>
                  <option>IV</option>
                  <option>IM</option>
                  <option>SubQ</option>
                  <option>Topical</option>
                  <option>Inhalation</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleAddNewMed}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Prescribe Medication
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Medication Button (Only for Doctors) */}
      {isDoctor && !showNewMedForm && !editingMedId && (
        <button
          onClick={handleStartNewMed}
          className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg p-4 flex items-center justify-center gap-2 text-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Prescribe New Medication</span>
        </button>
      )}
    </div>
  );
}

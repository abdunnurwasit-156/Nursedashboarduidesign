import { Package, AlertTriangle, TrendingDown, Search } from 'lucide-react';
import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  location: string;
}

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const inventory: InventoryItem[] = [
    { id: '1', name: 'Metoprolol 50mg', category: 'Cardiac', currentStock: 45, minStock: 20, unit: 'tablets', location: 'Shelf A-12' },
    { id: '2', name: 'Vancomycin 1g', category: 'Antibiotic', currentStock: 8, minStock: 10, unit: 'vials', location: 'Fridge B-3' },
    { id: '3', name: 'Norepinephrine 4mg/4mL', category: 'Vasopressor', currentStock: 12, minStock: 15, unit: 'ampules', location: 'Emergency Cart' },
    { id: '4', name: 'Insulin Regular 100U/mL', category: 'Endocrine', currentStock: 25, minStock: 10, unit: 'vials', location: 'Fridge A-1' },
    { id: '5', name: 'Morphine 10mg/mL', category: 'Analgesic', currentStock: 18, minStock: 12, unit: 'ampules', location: 'Controlled Substance Vault' },
    { id: '6', name: 'Furosemide 40mg', category: 'Diuretic', currentStock: 5, minStock: 15, unit: 'tablets', location: 'Shelf B-8' },
    { id: '7', name: 'Aspirin 81mg', category: 'Antiplatelet', currentStock: 120, minStock: 50, unit: 'tablets', location: 'Shelf C-4' },
    { id: '8', name: 'Heparin 5000U/mL', category: 'Anticoagulant', currentStock: 30, minStock: 20, unit: 'vials', location: 'Fridge B-5' },
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.currentStock < item.minStock);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Medication Inventory</h1>
        <p className="text-gray-600">{lowStockItems.length} items below minimum stock</p>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-orange-900">
              {lowStockItems.length} medication{lowStockItems.length !== 1 ? 's' : ''} below minimum stock level. Reorder recommended.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by medication name or category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Medication</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Min Stock</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.map(item => {
              const isLowStock = item.currentStock < item.minStock;
              const stockPercentage = (item.currentStock / item.minStock) * 100;

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package className={`w-4 h-4 ${isLowStock ? 'text-orange-600' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isLowStock ? 'text-orange-900' : 'text-gray-900'}`}>
                      {item.currentStock} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{item.minStock} {item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-600">{item.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    {isLowStock ? (
                      <span className="flex items-center gap-1 text-xs text-orange-800">
                        <TrendingDown className="w-3 h-3" />
                        Low Stock
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              stockPercentage > 100 ? 'bg-green-500' : 
                              stockPercentage > 50 ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-green-800">OK</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

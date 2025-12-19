import { Package, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function Resources() {
  const equipment = [
    { id: '1', name: 'Ventilators', total: 8, inUse: 6, available: 2, maintenance: 0, category: 'Critical' },
    { id: '2', name: 'Infusion Pumps', total: 24, inUse: 18, available: 5, maintenance: 1, category: 'Essential' },
    { id: '3', name: 'Patient Monitors', total: 20, inUse: 12, available: 8, maintenance: 0, category: 'Critical' },
    { id: '4', name: 'Defibrillators', total: 4, inUse: 1, available: 3, maintenance: 0, category: 'Emergency' },
    { id: '5', name: 'Oxygen Concentrators', total: 12, inUse: 9, available: 3, maintenance: 0, category: 'Critical' },
    { id: '6', name: 'Suction Machines', total: 15, inUse: 10, available: 4, maintenance: 1, category: 'Essential' },
    { id: '7', name: 'IV Stands', total: 30, inUse: 18, available: 12, maintenance: 0, category: 'Basic' },
    { id: '8', name: 'Wheelchairs', total: 6, inUse: 2, available: 4, maintenance: 0, category: 'Basic' },
  ];

  const supplies = [
    { id: 's1', name: 'Sterile Gloves (boxes)', current: 45, minimum: 30, status: 'good' },
    { id: 's2', name: 'N95 Masks', current: 120, minimum: 100, status: 'good' },
    { id: 's3', name: 'IV Catheters', current: 18, minimum: 25, status: 'low' },
    { id: 's4', name: 'Syringes (50ml)', current: 65, minimum: 40, status: 'good' },
    { id: 's5', name: 'Gauze Pads', current: 25, minimum: 30, status: 'low' },
    { id: 's6', name: 'Alcohol Swabs', current: 200, minimum: 150, status: 'good' },
  ];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'Critical': return 'destructive';
      case 'Emergency': return 'default'; // Or custom orange if possible, but default is usually ok or secondary
      case 'Essential': return 'secondary';
      case 'Basic': return 'outline';
      default: return 'outline';
    }
  };

  const getUtilizationColorClass = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const lowStockSupplies = supplies.filter(s => s.status === 'low');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resources & Equipment</h1>
        <p className="text-slate-500">Track medical equipment usage and supply inventory.</p>
      </div>

      {lowStockSupplies.length > 0 && (
        <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-900">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900 font-semibold">Low Stock Alert</AlertTitle>
          <AlertDescription className="text-orange-800">
            {lowStockSupplies.length} supply item{lowStockSupplies.length !== 1 ? 's' : ''} are below minimum stock level. Please restock immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Equipment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Equipment</CardTitle>
          <CardDescription>Status and utilization of ward devices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">In Use</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead className="text-center">Maintenance</TableHead>
                <TableHead className="w-[200px]">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map(item => {
                const utilization = Math.round((item.inUse / item.total) * 100);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Activity className="w-4 h-4 text-slate-400" />
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryBadgeVariant(item.category) as any} className={
                        item.category === 'Emergency' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                      }>
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-slate-700">{item.total}</TableCell>
                    <TableCell className="text-center font-medium text-blue-700">{item.inUse}</TableCell>
                    <TableCell className="text-center font-medium text-emerald-700">{item.available}</TableCell>
                    <TableCell className="text-center">
                      {item.maintenance > 0 ? (
                        <span className="text-orange-600 font-medium">{item.maintenance}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress 
                          value={utilization} 
                          className={`h-2 [&>div]:${getUtilizationColorClass(utilization)}`} 
                        />
                        <span className="text-xs w-8 text-right font-medium text-slate-600">{utilization}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplies Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Supplies</CardTitle>
          <CardDescription>Current inventory levels vs minimum requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplies.map(supply => {
              const percentage = (supply.current / supply.minimum) * 100;
              const isLow = supply.status === 'low';

              return (
                <div 
                  key={supply.id}
                  className={`border rounded-lg p-4 transition-all ${isLow ? 'border-orange-200 bg-orange-50/50' : 'border-slate-200 hover:shadow-sm'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isLow ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-semibold text-slate-900 text-sm">{supply.name}</h4>
                         <span className="text-xs text-slate-500">Min: {supply.minimum} units</span>
                      </div>
                    </div>
                    {isLow && (
                      <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-100">Low Stock</Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Current Stock</span>
                      <span className={`font-bold ${isLow ? 'text-orange-700' : 'text-slate-900'}`}>
                        {supply.current}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isLow ? '[&>div]:bg-orange-500 bg-orange-100' : '[&>div]:bg-emerald-500 bg-emerald-100'}`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
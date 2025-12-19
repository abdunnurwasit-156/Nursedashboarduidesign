import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { SeverityLevel } from '../types';

interface VitalsMiniChartProps {
  data: number[];
  severity: SeverityLevel;
}

export function VitalsMiniChart({ data, severity }: VitalsMiniChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  const severityColors = {
    stable: '#10b981',
    warning: '#f59e0b',
    moderate: '#f97316',
    critical: '#ef4444'
  };

  return (
    <div className="h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={severityColors[severity]}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

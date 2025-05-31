
import React from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const Analytics = () => {
  const { dailyStats, getWeeklyStats, getMonthlyStats } = useAnalyticsStore();
  const weeklyData = getWeeklyStats();
  const monthlyData = getMonthlyStats();

  const totalPomodoros = Object.values(dailyStats).reduce((sum, count) => sum + count, 0);
  const weeklyTotal = weeklyData.reduce((sum, day) => sum + day.count, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const exportToPDF = () => {
    // Simple PDF export implementation
    const content = `
Pomodoro Analytics Report
Generated: ${new Date().toLocaleDateString()}

Weekly Summary:
Total Pomodoros: ${weeklyTotal}

Daily Breakdown:
${weeklyData.map(day => `${formatDate(day.date)}: ${day.count} Pomodoros`).join('\n')}

All-time Total: ${totalPomodoros} Pomodoros
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pomodoro-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <Button onClick={exportToPDF} className="bg-blue-500 hover:bg-blue-600">
          <Download size={20} className="mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{weeklyTotal}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pomodoros completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{totalPomodoros}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Pomodoros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {weeklyTotal > 0 ? Math.round(weeklyTotal / 7 * 10) / 10 : 0}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  className="text-sm"
                />
                <YAxis className="text-sm" />
                <Tooltip 
                  labelFormatter={formatDate}
                  formatter={(value) => [value, 'Pomodoros']}
                />
                <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

import { useQuery } from 'react-query';
import api from '../api/axiosConfig';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { data: teamAnalytics = [] } = useQuery('teamAnalytics', () =>
    api.get('/analytics/team').then(res => res.data)
  );

  const { data: pipelineAnalytics = [] } = useQuery('pipelineAnalytics', () =>
    api.get('/analytics/pipeline').then(res => res.data)
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pipeline by Stage</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pipelineAnalytics}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ stage, count }) => `${stage}: ${count}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {pipelineAnalytics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pipeline Value by Stage</h2>
          <BarChart width={400} height={300} data={pipelineAnalytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">BDA</th>
                <th className="text-left py-3 px-4">Total Leads</th>
                <th className="text-left py-3 px-4">Won</th>
                <th className="text-left py-3 px-4">Lost</th>
                <th className="text-left py-3 px-4">Conversion Rate</th>
                <th className="text-left py-3 px-4">Pipeline Value</th>
              </tr>
            </thead>
            <tbody>
              {teamAnalytics.map(stat => (
                <tr key={stat.bda._id} className="border-b">
                  <td className="py-3 px-4">{stat.bda.name}</td>
                  <td className="py-3 px-4">{stat.totalLeads}</td>
                  <td className="py-3 px-4 text-green-600">{stat.wonLeads}</td>
                  <td className="py-3 px-4 text-red-600">{stat.lostLeads}</td>
                  <td className="py-3 px-4">{stat.conversionRate}</td>
                  <td className="py-3 px-4">${stat.pipelineValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

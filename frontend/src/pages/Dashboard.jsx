import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: leads = [] } = useQuery('leads', () =>
    api.get('/leads').then(res => res.data)
  );

  const myLeads = user.role === 'bda' 
    ? leads.filter(lead => lead.assignedTo?._id === user._id || lead.createdBy?._id === user._id)
    : leads;

  const totalLeads = myLeads.length;
  const wonLeads = myLeads.filter(l => l.stage === 'won').length;
  const pipelineValue = myLeads
    .filter(l => !['won', 'lost'].includes(l.stage))
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Leads</h3>
          <p className="text-3xl font-bold">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Won Leads</h3>
          <p className="text-3xl font-bold text-green-600">{wonLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pipeline Value</h3>
          <p className="text-3xl font-bold text-blue-600">${pipelineValue.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Leads</h2>
          <Link to="/leads/pipeline" className="text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {myLeads.slice(0, 5).map(lead => (
            <div key={lead._id} className="border-b pb-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{lead.title}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lead.stage === 'won' ? 'bg-green-100 text-green-800' :
                lead.stage === 'lost' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {lead.stage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

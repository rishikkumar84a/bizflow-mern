import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../api/axiosConfig';
import { useAuth } from '../contexts/AuthContext';

const stages = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const Pipeline = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: leads = [] } = useQuery('leads', () =>
    api.get('/leads').then(res => res.data)
  );

  const updateStageMutation = useMutation(
    ({ leadId, stage }) => api.patch(`/leads/${leadId}/stage`, { stage }),
    {
      onSuccess: () => queryClient.invalidateQueries('leads')
    }
  );

  const getLeadsByStage = (stage) => {
    return leads.filter(lead => {
      if (user.role === 'bda') {
        return lead.stage === stage && 
          (lead.assignedTo?._id === user._id || lead.createdBy?._id === user._id);
      }
      return lead.stage === stage;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lead Pipeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map(stage => (
          <div key={stage} className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold mb-3 capitalize">{stage} ({getLeadsByStage(stage).length})</h2>
            <div className="space-y-3">
              {getLeadsByStage(stage).map(lead => (
                <div key={lead._id} className="bg-white p-3 rounded shadow text-sm">
                  <p className="font-medium">{lead.title}</p>
                  <p className="text-gray-500">{lead.company}</p>
                  <p className="text-blue-600 font-semibold">${lead.dealValue?.toLocaleString()}</p>
                  <select
                    value={lead.stage}
                    onChange={(e) => updateStageMutation.mutate({ leadId: lead._id, stage: e.target.value })}
                    className="w-full mt-2 border rounded px-2 py-1"
                  >
                    {stages.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;

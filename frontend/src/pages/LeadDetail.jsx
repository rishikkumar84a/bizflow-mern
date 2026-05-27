import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../api/axiosConfig';

const LeadDetail = () => {
  const { id } = useParams();
  const { data: lead } = useQuery(['lead', id], () =>
    api.get(`/leads/${id}`).then(res => res.data)
  );

  if (!lead) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-2">{lead.title}</h1>
        <p className="text-gray-600 mb-4">{lead.company}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-medium">{lead.contactName}</p>
            <p className="text-sm">{lead.contactEmail}</p>
            <p className="text-sm">{lead.contactPhone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Deal Value</p>
            <p className="text-2xl font-bold text-blue-600">${lead.dealValue?.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Stage: <span className="font-medium capitalize">{lead.stage}</span></p>
          </div>
        </div>
        {lead.notes && (
          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="mt-1">{lead.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Activities</h2>
        <div className="space-y-4">
          {lead.activities?.map(activity => (
            <div key={activity._id} className="border-b pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    activity.type === 'call' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'email' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'meeting' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type}
                  </span>
                  <p className="mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {activity.createdBy?.name} • {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;

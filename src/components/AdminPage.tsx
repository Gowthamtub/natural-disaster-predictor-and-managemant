import React, { useState } from 'react';
import { AlertTriangle, Plus, Trash2, Save, X } from 'lucide-react';

interface AdminPageProps {
  onAddWarning: (warning: {
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }) => void;
  activeWarnings: Array<{
    id: number;
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }>;
  onRemoveWarning: (id: number) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ 
  onAddWarning, 
  activeWarnings, 
  onRemoveWarning 
}) => {
  const [isAddingWarning, setIsAddingWarning] = useState(false);
  const [newWarning, setNewWarning] = useState({
    message: '',
    type: 'Flood',
    severity: 'medium' as 'high' | 'medium' | 'low',
    location: ''
  });
  const [error, setError] = useState('');

  const handleAddWarning = () => {
    setError('');
    
    // Validate inputs
    if (!newWarning.message.trim()) {
      setError('Warning message is required');
      return;
    }
    
    if (!newWarning.location.trim()) {
      setError('Location is required');
      return;
    }
    
    // Add the warning
    onAddWarning(newWarning);
    
    // Reset form
    setNewWarning({
      message: '',
      type: 'Flood',
      severity: 'medium',
      location: ''
    });
    
    setIsAddingWarning(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gray-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="mt-1">Manage disaster warnings and alerts</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Active Warnings</h3>
            <button 
              onClick={() => setIsAddingWarning(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
              disabled={isAddingWarning}
            >
              <Plus size={18} className="mr-1" />
              Add Warning
            </button>
          </div>
          
          {/* Add warning form */}
          {isAddingWarning && (
            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg">New Warning</h4>
                <button 
                  onClick={() => setIsAddingWarning(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                  <div className="flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    <p>{error}</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="warningType">
                    Warning Type
                  </label>
                  <select
                    id="warningType"
                    value={newWarning.type}
                    onChange={(e) => setNewWarning({...newWarning, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Flood">Flood</option>
                    <option value="Earthquake">Earthquake</option>
                    <option value="Storm">Storm</option>
                    <option value="Tsunami">Tsunami</option>
                    <option value="Wildfire">Wildfire</option>
                    <option value="Tornado">Tornado</option>
                    <option value="Hurricane">Hurricane</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="severity">
                    Severity
                  </label>
                  <select
                    id="severity"
                    value={newWarning.severity}
                    onChange={(e) => setNewWarning({...newWarning, severity: e.target.value as 'high' | 'medium' | 'low'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={newWarning.location}
                  onChange={(e) => setNewWarning({...newWarning, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter affected location"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Warning Message
                </label>
                <textarea
                  id="message"
                  value={newWarning.message}
                  onChange={(e) => setNewWarning({...newWarning, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter warning details"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAddingWarning(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWarning}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
                >
                  <Save size={18} className="mr-1" />
                  Save Warning
                </button>
              </div>
            </div>
          )}
          
          {/* Warnings list */}
          {activeWarnings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No active warnings</p>
              <p className="mt-2">Add a warning to alert users about potential disasters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeWarnings.map(warning => (
                <div 
                  key={warning.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    warning.severity === 'high' ? 'border-red-600 bg-red-50' : 
                    warning.severity === 'medium' ? 'border-orange-500 bg-orange-50' : 
                    'border-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-lg">{warning.type} Warning</h3>
                        <span className={`ml-3 text-xs font-semibold px-2 py-1 rounded ${
                          warning.severity === 'high' ? 'bg-red-600 text-white' : 
                          warning.severity === 'medium' ? 'bg-orange-500 text-white' : 
                          'bg-yellow-500 text-white'
                        }`}>
                          {warning.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2">{warning.message}</p>
                      <p className="text-sm text-gray-500 mt-2">Location: {warning.location}</p>
                    </div>
                    <button 
                      onClick={() => onRemoveWarning(warning.id)}
                      className="text-gray-500 hover:text-red-600 p-1"
                      title="Remove warning"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Admin statistics */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-800 p-6 text-white">
          <h2 className="text-2xl font-bold">System Statistics</h2>
          <p className="mt-1">Overview of system activity</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Active Warnings</h3>
              <p className="text-3xl font-bold text-blue-600">{activeWarnings.length}</p>
              <p className="text-sm text-blue-700 mt-1">Current warnings in the system</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Predictions Made</h3>
              <p className="text-3xl font-bold text-green-600">24</p>
              <p className="text-sm text-green-700 mt-1">Last 24 hours</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">System Status</h3>
              <p className="text-xl font-bold text-purple-600">All Systems Operational</p>
              <p className="text-sm text-purple-700 mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Warning Added</td>
                    <td className="px-6 py-4 whitespace-nowrap">Flood</td>
                    <td className="px-6 py-4 whitespace-nowrap">Riverside County</td>
                    <td className="px-6 py-4 whitespace-nowrap">10:23 AM</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Prediction Made</td>
                    <td className="px-6 py-4 whitespace-nowrap">Earthquake</td>
                    <td className="px-6 py-4 whitespace-nowrap">San Andreas</td>
                    <td className="px-6 py-4 whitespace-nowrap">09:45 AM</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Warning Removed</td>
                    <td className="px-6 py-4 whitespace-nowrap">Storm</td>
                    <td className="px-6 py-4 whitespace-nowrap">Coastal Region</td>
                    <td className="px-6 py-4 whitespace-nowrap">08:12 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
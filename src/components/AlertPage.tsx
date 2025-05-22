import React from 'react';
import { AlertTriangle, CheckCircle, Info, Shield, Home, MapPin } from 'lucide-react';

interface AlertPageProps {
  predictionResult: {
    risk: 'high' | 'medium' | 'low' | 'none';
    disasterType: string;
    message: string;
  } | null;
  activeWarnings: Array<{
    id: number;
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }>;
}

export const AlertPage: React.FC<AlertPageProps> = ({ predictionResult, activeWarnings }) => {
  // Safety tips based on disaster type
  const getSafetyTips = (disasterType: string) => {
    switch (disasterType) {
      case 'flood':
        return [
          'Move to higher ground immediately',
          'Do not walk, swim, or drive through flood waters',
          'Stay off bridges over fast-moving water',
          'Evacuate if told to do so',
          'Prepare an emergency kit with food, water, and medications'
        ];
      case 'earthquake':
        return [
          'Drop, cover, and hold on',
          'If indoors, stay away from windows and exterior walls',
          'If outdoors, stay in open areas away from buildings and power lines',
          'After shaking stops, check for injuries and damage',
          'Be prepared for aftershocks'
        ];
      case 'storm':
        return [
          'Stay indoors and away from windows',
          'Secure outdoor objects that could blow away',
          'Have emergency supplies ready',
          'Monitor weather updates',
          'Avoid using electrical appliances during lightning'
        ];
      case 'tsunami':
        return [
          'Move immediately to higher ground',
          'Follow evacuation routes',
          'Stay away from the coast',
          'Wait for official all-clear before returning',
          'Be alert for aftershocks which can trigger additional tsunamis'
        ];
      default:
        return [
          'Stay informed through local news and weather services',
          'Have an emergency plan ready',
          'Prepare an emergency kit with essentials',
          'Know evacuation routes in your area',
          'Follow instructions from local authorities'
        ];
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Prediction result alert */}
      {predictionResult && (
        <div className={`mb-8 rounded-lg shadow-md overflow-hidden ${
          predictionResult.risk === 'high' ? 'border-red-500' :
          predictionResult.risk === 'medium' ? 'border-orange-500' :
          predictionResult.risk === 'low' ? 'border-yellow-500' :
          'border-green-500'
        } border`}>
          <div className={`p-6 ${
            predictionResult.risk === 'high' ? 'bg-red-600 text-white' :
            predictionResult.risk === 'medium' ? 'bg-orange-500 text-white' :
            predictionResult.risk === 'low' ? 'bg-yellow-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            <div className="flex items-center">
              {predictionResult.risk === 'high' || predictionResult.risk === 'medium' ? (
                <AlertTriangle size={28} className="mr-3" />
              ) : (
                <CheckCircle size={28} className="mr-3" />
              )}
              <h2 className="text-2xl font-bold">
                {predictionResult.risk === 'high' ? 'High Risk Alert' :
                 predictionResult.risk === 'medium' ? 'Medium Risk Alert' :
                 predictionResult.risk === 'low' ? 'Low Risk Alert' :
                 'No Risk Detected'}
              </h2>
            </div>
            <p className="mt-2 text-lg">{predictionResult.message}</p>
          </div>
          
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-blue-600" />
              Safety Recommendations
            </h3>
            <ul className="space-y-3">
              {getSafetyTips(predictionResult.disasterType).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full h-6 w-6 mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <Info size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800">
                  These recommendations are based on general safety guidelines. Always follow instructions from local authorities and emergency services.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active warnings section */}
      {activeWarnings.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-red-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <AlertTriangle size={24} className="mr-2" />
              Active Warnings ({activeWarnings.length})
            </h2>
            <p className="mt-1">Official warnings issued by authorities</p>
          </div>
          
          <div className="p-6">
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
                    <h3 className="font-bold text-lg">{warning.type} Warning</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      warning.severity === 'high' ? 'bg-red-600 text-white' : 
                      warning.severity === 'medium' ? 'bg-orange-500 text-white' : 
                      'bg-yellow-500 text-white'
                    }`}>
                      {warning.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{warning.message}</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{warning.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emergency resources section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Emergency Resources</h2>
          <p className="mt-1">Important contacts and information for emergencies</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Emergency Contacts</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">Emergency Services:</span>
                  <span className="font-medium">911</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Flood Control:</span>
                  <span className="font-medium">555-0123</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Weather Service:</span>
                  <span className="font-medium">555-0145</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Disaster Relief:</span>
                  <span className="font-medium">555-0167</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Evacuation Centers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Home size={18} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Central High School</p>
                    <p className="text-sm text-gray-600">123 Main St, Downtown</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Home size={18} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Community Center</p>
                    <p className="text-sm text-gray-600">456 Oak Ave, Westside</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Home size={18} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Memorial Stadium</p>
                    <p className="text-sm text-gray-600">789 Park Rd, Northside</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start">
              <Info size={20} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">
                Always have an emergency kit ready with water, non-perishable food, medications, flashlight, batteries, and important documents. Create a family emergency plan and practice it regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
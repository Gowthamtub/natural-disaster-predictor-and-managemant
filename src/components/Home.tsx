import React from 'react';
import { CloudLightning, Droplets, Wind, Waves, AlertTriangle } from 'lucide-react';

interface HomeProps {
  navigateToPrediction: () => void;
  activeWarnings: Array<{
    id: number;
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }>;
}

export const Home: React.FC<HomeProps> = ({ navigateToPrediction, activeWarnings }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Predict and Prepare for Natural Disasters</h1>
            <p className="text-lg mb-6">
              Our advanced prediction system helps you stay ahead of potential natural disasters in your area.
              Get timely alerts and safety recommendations.
            </p>
            <button 
              onClick={navigateToPrediction}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-md"
            >
              Get Prediction Now
            </button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <CloudLightning size={120} className="text-white opacity-90" />
          </div>
        </div>
      </section>

      {/* Active warnings section */}
      {activeWarnings.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertTriangle size={24} className="text-red-600 mr-2" />
            Active Warnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeWarnings.slice(0, 2).map(warning => (
              <div 
                key={warning.id} 
                className={`p-4 rounded-lg shadow-md border-l-4 ${
                  warning.severity === 'high' ? 'border-red-600 bg-red-50' : 
                  warning.severity === 'medium' ? 'border-orange-500 bg-orange-50' : 
                  'border-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{warning.type} Warning</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
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
            ))}
          </div>
          {activeWarnings.length > 2 && (
            <button 
              onClick={navigateToPrediction}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View all {activeWarnings.length} warnings
            </button>
          )}
        </section>
      )}

      {/* Disaster types section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Disaster Types We Predict</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Droplets size={28} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Floods</h3>
            <p className="text-gray-600">Predict flooding based on rainfall data, river levels, and terrain information.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Wind size={28} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earthquakes</h3>
            <p className="text-gray-600">Analyze seismic activity patterns to predict potential earthquake risks.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Waves size={28} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tsunamis</h3>
            <p className="text-gray-600">Predict tsunami risks based on seismic activity and ocean conditions.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <CloudLightning size={28} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Storms</h3>
            <p className="text-gray-600">Forecast severe storms using atmospheric pressure and temperature data.</p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Enter Your Data</h3>
            <p className="text-gray-600">Provide location, weather conditions, and other relevant information.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Predictions</h3>
            <p className="text-gray-600">Our system analyzes the data and provides risk assessments for various disasters.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Stay Prepared</h3>
            <p className="text-gray-600">Receive safety tips and preparation guidelines based on the prediction results.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={navigateToPrediction}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
          >
            Try It Now
          </button>
        </div>
      </section>
    </div>
  );
};
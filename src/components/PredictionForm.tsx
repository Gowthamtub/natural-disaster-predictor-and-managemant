import React, { useState } from 'react';
import { Droplets, Wind, CloudLightning, Waves, AlertTriangle } from 'lucide-react';

interface PredictionFormProps {
  onPredictionResult: (result: {
    risk: 'high' | 'medium' | 'low' | 'none';
    disasterType: string;
    message: string;
  }) => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPredictionResult }) => {
  const [location, setLocation] = useState('');
  const [disasterType, setDisasterType] = useState('flood');
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [seismicActivity, setSeismicActivity] = useState('');
  const [riverLevel, setRiverLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!location) {
      setError('Please enter a location');
      return;
    }

    // Additional validation based on disaster type
    if (disasterType === 'flood' && !rainfall) {
      setError('Rainfall data is required for flood prediction');
      return;
    }

    if (disasterType === 'earthquake' && !seismicActivity) {
      setError('Seismic activity data is required for earthquake prediction');
      return;
    }

    if (disasterType === 'storm' && (!windSpeed || !temperature)) {
      setError('Wind speed and temperature are required for storm prediction');
      return;
    }

    if (disasterType === 'tsunami' && !seismicActivity) {
      setError('Seismic activity data is required for tsunami prediction');
      return;
    }

    // Simulate API call with loading state
    setIsLoading(true);
    setTimeout(() => {
      // Simple prediction logic (in a real app, this would be a more sophisticated model)
      let risk: 'high' | 'medium' | 'low' | 'none' = 'none';
      let message = '';

      if (disasterType === 'flood') {
        const rainfallNum = parseFloat(rainfall);
        if (rainfallNum > 100) {
          risk = 'high';
          message = 'Heavy rainfall detected. High risk of flooding in low-lying areas.';
        } else if (rainfallNum > 50) {
          risk = 'medium';
          message = 'Moderate rainfall detected. Some risk of localized flooding.';
        } else if (rainfallNum > 20) {
          risk = 'low';
          message = 'Light rainfall detected. Low risk of flooding.';
        } else {
          risk = 'none';
          message = 'Minimal rainfall detected. No significant flood risk.';
        }
      } else if (disasterType === 'earthquake') {
        const seismicNum = parseFloat(seismicActivity);
        if (seismicNum > 6) {
          risk = 'high';
          message = 'High seismic activity detected. Significant earthquake risk.';
        } else if (seismicNum > 4) {
          risk = 'medium';
          message = 'Moderate seismic activity detected. Be prepared for possible earthquakes.';
        } else if (seismicNum > 2) {
          risk = 'low';
          message = 'Low seismic activity detected. Minor earthquake risk.';
        } else {
          risk = 'none';
          message = 'Minimal seismic activity. No significant earthquake risk.';
        }
      } else if (disasterType === 'storm') {
        const windSpeedNum = parseFloat(windSpeed);
        if (windSpeedNum > 100) {
          risk = 'high';
          message = 'Extremely high wind speeds detected. Severe storm risk.';
        } else if (windSpeedNum > 60) {
          risk = 'medium';
          message = 'High wind speeds detected. Moderate storm risk.';
        } else if (windSpeedNum > 30) {
          risk = 'low';
          message = 'Moderate wind speeds detected. Low storm risk.';
        } else {
          risk = 'none';
          message = 'Low wind speeds. No significant storm risk.';
        }
      } else if (disasterType === 'tsunami') {
        const seismicNum = parseFloat(seismicActivity);
        if (seismicNum > 7) {
          risk = 'high';
          message = 'Major seismic activity detected in ocean region. High tsunami risk for coastal areas.';
        } else if (seismicNum > 5) {
          risk = 'medium';
          message = 'Moderate seismic activity detected in ocean region. Some tsunami risk for coastal areas.';
        } else if (seismicNum > 3) {
          risk = 'low';
          message = 'Low seismic activity detected. Minor tsunami risk.';
        } else {
          risk = 'none';
          message = 'Minimal seismic activity. No significant tsunami risk.';
        }
      }

      onPredictionResult({
        risk,
        disasterType,
        message
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Disaster Prediction Tool</h2>
          <p>Enter data to get a prediction for potential natural disasters in your area</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <div className="flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter city or region"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Disaster Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setDisasterType('flood')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                  disasterType === 'flood' 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Droplets size={24} className={disasterType === 'flood' ? 'text-blue-600' : 'text-gray-600'} />
                <span className="mt-2">Flood</span>
              </button>
              
              <button
                type="button"
                onClick={() => setDisasterType('earthquake')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                  disasterType === 'earthquake' 
                    ? 'bg-orange-100 border-orange-500 text-orange-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Wind size={24} className={disasterType === 'earthquake' ? 'text-orange-600' : 'text-gray-600'} />
                <span className="mt-2">Earthquake</span>
              </button>
              
              <button
                type="button"
                onClick={() => setDisasterType('storm')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                  disasterType === 'storm' 
                    ? 'bg-purple-100 border-purple-500 text-purple-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CloudLightning size={24} className={disasterType === 'storm' ? 'text-purple-600' : 'text-gray-600'} />
                <span className="mt-2">Storm</span>
              </button>
              
              <button
                type="button"
                onClick={() => setDisasterType('tsunami')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                  disasterType === 'tsunami' 
                    ? 'bg-teal-100 border-teal-500 text-teal-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Waves size={24} className={disasterType === 'tsunami' ? 'text-teal-600' : 'text-gray-600'} />
                <span className="mt-2">Tsunami</span>
              </button>
            </div>
          </div>
          
          {/* Dynamic form fields based on disaster type */}
          {disasterType === 'flood' && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="rainfall">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  id="rainfall"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter rainfall in millimeters"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="riverLevel">
                  River Level (m) - Optional
                </label>
                <input
                  type="number"
                  id="riverLevel"
                  value={riverLevel}
                  onChange={(e) => setRiverLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter river level in meters"
                />
              </div>
            </>
          )}
          
          {disasterType === 'earthquake' && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="seismicActivity">
                Seismic Activity (Richter scale)
              </label>
              <input
                type="number"
                id="seismicActivity"
                value={seismicActivity}
                onChange={(e) => setSeismicActivity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter seismic activity level"
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          )}
          
          {disasterType === 'storm' && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="windSpeed">
                  Wind Speed (km/h)
                </label>
                <input
                  type="number"
                  id="windSpeed"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter wind speed in km/h"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="temperature">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter temperature in °C"
                />
              </div>
            </>
          )}
          
          {disasterType === 'tsunami' && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="seismicActivity">
                Seismic Activity (Richter scale)
              </label>
              <input
                type="number"
                id="seismicActivity"
                value={seismicActivity}
                onChange={(e) => setSeismicActivity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter seismic activity level"
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          )}
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition shadow-md`}
            >
              {isLoading ? 'Analyzing Data...' : 'Get Prediction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
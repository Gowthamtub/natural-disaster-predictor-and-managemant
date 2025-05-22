import React, { useState } from 'react';
import { Home } from './components/Home';
import { PredictionForm } from './components/PredictionForm';
import { AlertPage } from './components/AlertPage';
import { AdminPage } from './components/AdminPage';
import { CloudLightning, Menu, X } from 'lucide-react';

type Page = 'home' | 'predict' | 'alert' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [predictionResult, setPredictionResult] = useState<{
    risk: 'high' | 'medium' | 'low' | 'none';
    disasterType: string;
    message: string;
  } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWarnings, setActiveWarnings] = useState<Array<{
    id: number;
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }>>([]);

  const handlePrediction = (result: {
    risk: 'high' | 'medium' | 'low' | 'none';
    disasterType: string;
    message: string;
  }) => {
    setPredictionResult(result);
    if (result.risk === 'high' || result.risk === 'medium') {
      setCurrentPage('alert');
    }
  };

  const handleAddWarning = (warning: {
    message: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
  }) => {
    setActiveWarnings([
      ...activeWarnings,
      { ...warning, id: Date.now() }
    ]);
  };

  const handleRemoveWarning = (id: number) => {
    setActiveWarnings(activeWarnings.filter(warning => warning.id !== id));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <CloudLightning size={28} />
            <h1 className="text-xl font-bold">DisasterPredict</h1>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => navigateTo('home')}
              className={`py-1 px-2 rounded transition ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('predict')}
              className={`py-1 px-2 rounded transition ${currentPage === 'predict' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
            >
              Predict
            </button>
            <button 
              onClick={() => navigateTo('admin')}
              className={`py-1 px-2 rounded transition ${currentPage === 'admin' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
            >
              Admin
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <button 
                onClick={() => navigateTo('home')}
                className={`py-2 px-4 rounded text-left ${currentPage === 'home' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('predict')}
                className={`py-2 px-4 rounded text-left ${currentPage === 'predict' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
              >
                Predict
              </button>
              <button 
                onClick={() => navigateTo('admin')}
                className={`py-2 px-4 rounded text-left ${currentPage === 'admin' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Active warnings banner */}
      {activeWarnings.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <p className="font-bold">Active Warnings: {activeWarnings.length}</p>
              <button 
                onClick={() => navigateTo('alert')}
                className="bg-white text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'home' && <Home navigateToPrediction={() => navigateTo('predict')} activeWarnings={activeWarnings} />}
        {currentPage === 'predict' && <PredictionForm onPredictionResult={handlePrediction} />}
        {currentPage === 'alert' && <AlertPage predictionResult={predictionResult} activeWarnings={activeWarnings} />}
        {currentPage === 'admin' && (
          <AdminPage 
            onAddWarning={handleAddWarning} 
            activeWarnings={activeWarnings} 
            onRemoveWarning={handleRemoveWarning} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <CloudLightning size={20} />
                <span className="font-bold">DisasterPredict</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Predict and prepare for natural disasters</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Privacy</a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DisasterPredict. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
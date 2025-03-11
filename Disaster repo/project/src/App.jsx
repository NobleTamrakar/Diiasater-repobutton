import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ReportForm from './components/ReportForm';
import './App.css';

function App() {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="min-h-screen bg-rich-black text-anti-flash-white p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-caribbean-green mb-8">Emergency Response System</h1>
        
        <button
          onClick={() => setShowReportForm(true)}
          className="btn-primary text-lg flex items-center justify-center w-full md:w-auto"
        >
          🚨 Report Missing Person / Disaster
        </button>

        {showReportForm && (
          <ReportForm onClose={() => setShowReportForm(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
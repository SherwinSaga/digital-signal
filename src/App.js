import React, { useState } from 'react';
import { motion } from 'framer-motion';

import LandingPage from './components/landingpage';
import {
   EncodingScheme, 
   encodeNRZI, 
   encodeNRZL, 
   encodeBipolarAMI, 
   encodePseudoternary, 
   encodeManchester, 
   encodeDifferentialManchester 
  } from './components/utility';

import './App.css';




const App = () => {
  const [showApp, setShowApp] = useState(false);
  const [data, setData] = useState('');
  const [signals, setSignals] = useState({});

  const handleVisualize = () => {
    const binaryPattern = /^[01]+$/;
    if (!binaryPattern.test(data)) {
      alert('Please enter valid binary data (0s and 1s only)');
      return;
    }

    setSignals({
      NRZL: encodeNRZL(data),
      NRZI: encodeNRZI(data),
      BipolarAMI: encodeBipolarAMI(data),
      Pseudoternary: encodePseudoternary(data),
      Manchester: encodeManchester(data),
      DifferentialManchester: encodeDifferentialManchester(data),
    });
  };

  if (!showApp) {
    return <LandingPage onStartClick={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Binary Data</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter binary data (e.g., 11010)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={handleVisualize}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Visualize
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <EncodingScheme title="NRZ-L " signal={signals.NRZL} />
          <EncodingScheme title="NRZ-I " signal={signals.NRZI} />
          <EncodingScheme title="Bipolar AMI" signal={signals.BipolarAMI} />
          <EncodingScheme title="Pseudoternary" signal={signals.Pseudoternary} />
          <EncodingScheme title="Manchester" signal={signals.Manchester} />
          <EncodingScheme title="Differential Manchester" signal={signals.DifferentialManchester} />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default App;
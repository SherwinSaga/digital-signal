import '../App.css';
import { ChevronRight, Waves} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStartClick }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <div className="mb-8 relative">
            <Waves className="w-20 h-20 text-indigo-600 mx-auto" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 bg-indigo-100 rounded-full -z-10 blur-lg opacity-60"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Digital Signal Visualizer
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Explore and understand digital encoding schemes through interactive visualizations
          </p>
          <button
            onClick={onStartClick}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    );
  };

export default LandingPage;
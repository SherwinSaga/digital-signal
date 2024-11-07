import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const EncodingScheme = ({ title, signal, width = 200, height = 50 }) => {
    const [pathLength, setPathLength] = useState(0);
  
    useEffect(() => {
      setPathLength(0);
      const timer = setTimeout(() => setPathLength(1), 100);
      return () => clearTimeout(timer);
    }, [signal]);
  
    if (!signal?.length) return null;
  
    const signalPath = signal.reduce((path, segment, i) => {
      const { x1, y1, x2, y2 } = segment;
      const command = i === 0 ? `M ${x1} ${y1}` : `L ${x1} ${y1}`;
      return `${path} ${command} L ${x2} ${y2}`;
    }, '');
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between mb-4 relative">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            {title}
            <button
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
            </button>
          </h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <svg width={width} height={height} className="mx-auto">
            <motion.path
              d={signalPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-indigo-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    );
};

export const encodeNRZL = (data) => {
    const signal = [];
    let x = 0;
    const high = 10;
    const low = 40;

    data.split('').forEach((bit) => {
      const y = bit === '1' ? high : low;
      signal.push({ x1: x, y1: y, x2: x + 20, y2: y });
      x += 20;
    });

    return signal;
};

export const encodeNRZI = (data) => {
    const signal = [];
    let x = 0;
    const high = 10;
    const low = 40;
    let previousLevel = low;

    data.split('').forEach((bit) => {
      if (bit === '1') {
        previousLevel = previousLevel === low ? high : low;
      }
      signal.push({ x1: x, y1: previousLevel, x2: x + 20, y2: previousLevel });
      x += 20;
    });

    return signal;
};

export const encodeBipolarAMI = (data) => {
    const signal = [];
    let x = 0;
    const positive = 10;
    const zero = 25;
    const negative = 40;
    let lastMark = negative;

    data.split('').forEach((bit) => {
      if (bit === '1') {
        lastMark = lastMark === positive ? negative : positive;
        signal.push({ x1: x, y1: lastMark, x2: x + 20, y2: lastMark });
      } else {
        signal.push({ x1: x, y1: zero, x2: x + 20, y2: zero });
      }
      x += 20;
    });

    return signal;
};

export const encodePseudoternary = (data) => {
    const signal = [];
    let x = 0;
    const positive = 10;
    const zero = 25;
    const negative = 40;
    let lastMark = negative;
  
    data.split('').forEach((bit) => {
      if (bit === '0') {
        lastMark = (lastMark === positive) ? negative : positive;
        signal.push({ x1: x, y1: lastMark, x2: x + 20, y2: lastMark });
      } else {
        signal.push({ x1: x, y1: zero, x2: x + 20, y2: zero });
      }
      x += 20;
    });
  
    return signal;
};

export const encodeManchester = (data) => {
    const signal = [];
    let x = 0;
    const low = 10;
    const high = 40;
  
    data.split('').forEach((bit) => {
      if (bit === '1') {
        signal.push({ x1: x, y1: high, x2: x + 10, y2: high }); // High half
        signal.push({ x1: x + 10, y1: high, x2: x + 10, y2: low }); // Transition
        signal.push({ x1: x + 10, y1: low, x2: x + 20, y2: low }); // Low half
      } else {
        signal.push({ x1: x, y1: low, x2: x + 10, y2: low }); // Low half
        signal.push({ x1: x + 10, y1: low, x2: x + 10, y2: high }); // Transition
        signal.push({ x1: x + 10, y1: high, x2: x + 20, y2: high }); // High half
      }
      x += 20;
    });
  
    return signal;
};

export const encodeDifferentialManchester = (data) => {
    const signal = [];
    let x = 0;
    const low = 10;
    const high = 40;
    let previousLevel = low;
  
    data.split('').forEach((bit) => {
      if (bit === '0') {
        previousLevel = previousLevel === low ? high : low; // Start transition for '0'
        signal.push({ x1: x, y1: previousLevel, x2: x + 10, y2: previousLevel });
        previousLevel = previousLevel === low ? high : low; // Mid transition
        signal.push({ x1: x + 10, y1: previousLevel, x2: x + 20, y2: previousLevel });
      } else {
        signal.push({ x1: x, y1: previousLevel, x2: x + 10, y2: previousLevel }); // No start transition for '1'
        previousLevel = previousLevel === low ? high : low; // Mid transition
        signal.push({ x1: x + 10, y1: previousLevel, x2: x + 20, y2: previousLevel });
      }
      x += 20;
    });
  
    return signal;
};
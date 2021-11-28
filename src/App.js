import { useState, useEffect } from 'react';
import ColorPie from './components/ColorPie';
import ScatterPlot from './components/ScatterPlot';
import BarChart from './components/BarChart';
import './App.css';

function App() {
  
  return (
    <div>
      <BarChart/>
      <ColorPie/>
      <ScatterPlot/>
    </div>
  );
}

export default App;

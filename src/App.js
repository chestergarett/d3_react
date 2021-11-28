import { useState, useEffect } from 'react';
import ColorPie from './components/ColorPie';
import ScatterPlot from './components/ScatterPlot';
import BarChart from './components/BarChart';
import Divider from './components/extras/Divider';
import './App.css';

function App() {
  
  return (
    <div>
      <BarChart style={{zIndex: 2}}/>
        <Divider />
      <ColorPie/>
        <Divider />
      <ScatterPlot/>
    </div>
  );
}

export default App;

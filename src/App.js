import { useState, useEffect } from 'react';
import { csv, arc, pie } from 'd3';
import ColorPie from './components/ColorPie';
import ScatterPlot from './components/ScatterPlot';
import './App.css';

function App() {
  
  return (
    <div>
      <ColorPie/>
      <ScatterPlot/>
    </div>
  );
}

export default App;

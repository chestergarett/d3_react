import { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import ColorPie from './components/ColorPie';
import ScatterPlotVega from './components/ScatterPlotVega';
import BarChart from './components/BarChart';
import ScatterPlot from './components/ScatterPlot';
import LineChart from './components/LineChart';
import MigrantsMap from './components/MigrantsMap';
import Divider from './components/extras/Divider';
import './App.css';

function App() {
  
  return (
    <>
      <MigrantsMap/>
        <Divider/>
      <WorldMap/>
        <Divider/>
      <LineChart/>
        <Divider/>
      <BarChart />
        <Divider />
      <ColorPie/>
        <Divider />
      <ScatterPlot />
        <Divider />
      <ScatterPlotVega/>
    </>
  );
}

export default App;

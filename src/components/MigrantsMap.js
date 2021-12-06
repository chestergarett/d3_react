import { useState, useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import Histogram from './Histogram';
import useData from '../helpers/useData';
import Marks from './chartParts/Marks';


const width = 960;
const height = 500;
const dateHistogramSize = 0.2;
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';


const MigrantsMap = () => {
    const worldAtlas = useData(jsonUrl, 'json')
    const migrants = useData('https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv', 'migrants');
    const [brushExtent, setBrushExtent] = useState();

    if(!migrants || !worldAtlas){
        return <pre>Loading...</pre>;
    }

    const xValue = d => d['Reported Date'];
    
    const filteredData = brushExtent ? migrants.filter( d=> {
        const date = xValue(d)
        return date > brushExtent[0] && date < brushExtent[1]
    }) : migrants;  

    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 15;
    const sizeScale = scaleSqrt()
                    .domain([0, max(migrants, sizeValue)])
                    .range([0,maxRadius])
    
    return(
        <svg width={width} height={height}>
            <Marks
                worldAtlas={worldAtlas}
                cities={filteredData}
                sizeScale={sizeScale}
                sizeValue={sizeValue}
                type="migrantsMap"
            />
            <g transform={`translate(0,${height - dateHistogramSize * height})`}>
                <Histogram 
                    height={dateHistogramSize * height}
                    width={width} 
                    data={migrants}   
                    xValue={xValue}
                    setBrushExtent={setBrushExtent}
                />
            </g>
        </svg>
    )
}

export default MigrantsMap;
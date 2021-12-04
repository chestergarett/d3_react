import { useState, useEffect } from 'react';
import { scaleSqrt, max } from 'd3';
import useData from '../helpers/useData';
import useCities from '../helpers/useCities';
import Marks from './chartParts/Marks';

const width = 960;
const height = 500;
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const WorldMap = () => {
    const worldAtlas = useData(jsonUrl, 'json')
    const cities = useCities();

    if(!cities || !worldAtlas){
        return <pre>Loading...</pre>;
    }

    const sizeValue = d => d.population;
    const maxRadius = 15;
    const sizeScale = scaleSqrt()
                    .domain([0, max(cities, sizeValue)])
                    .range([0,maxRadius])
    return(
        <svg width={width} height={height}>
            <Marks
                worldAtlas={worldAtlas}
                cities={cities}
                sizeScale={sizeScale}
                sizeValue={sizeValue}
                type="map"
            />
        </svg>
    )
}

export default WorldMap;
import { useState, useEffect } from 'react';
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

    return(
        <svg width={width} height={height}>
            <Marks
                worldAtlas={worldAtlas}
                cities={cities}
                type="map"
            />
        </svg>
    )
}

export default WorldMap;
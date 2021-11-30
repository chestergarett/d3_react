import { useState, useEffect } from 'react';
import useData from '../helpers/useData';
import Marks from './chartParts/Marks';

const width = 960;
const height = 500;
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const WorldMap = () => {
    const data = useData(jsonUrl, 'json')
    console.log(data)

    if(!data){
        return <pre>Loading...</pre>;
    }

    return(
        <svg width={width} height={height}>
            <Marks
                data={data}
                type="map"
            />
        </svg>
    )
}

export default WorldMap;
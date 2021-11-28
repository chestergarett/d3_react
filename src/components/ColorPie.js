import { useState, useEffect } from 'react';
import { csv, arc, pie, } from 'd3';

const width = 960;
const height = 500;
const centerX = width /2;
const centerY = height/2;

const pieArc = 
  arc()
  .innerRadius(0)
  .outerRadius(width);

const ColorPie = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null)
    const [messageF , setMessageF] = useState('')
    const csvUrl = "https://gist.githubusercontent.com/chestergarett/64724193886ead96355e5dc32ba93d87/raw/c1e16728bbeedaf817fc0308de52c5dfefffbd50/cssColors.csv"
  
  useEffect( ()=> {
    csv(csvUrl).then(d => {
      setData(d);
      setIsLoading(false);
  })
  }, [])

  const colorPie = pie().value(1);
    return (
        <>
        {!isLoading ? 
        <pre id='message-container'>
          <svg width={width} height={height}>
            <g transform={`translate(${centerX},${centerY})`}>
            {colorPie(data).map((d,index) => {
              return(
                <path 
                  fill={d.data['RGB_hex_value']} 
                  key={index}
                  d={pieArc(d)}
                />
                )
            })}
            </g>
          </svg>
        </pre> 
        //'test'
      : <p>Unable to Load data</p>}
        </>
    )
}

export default ColorPie;
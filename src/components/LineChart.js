import { extent, scaleLinear, scaleTime, timeFormat } from 'd3';
import  useData  from '../helpers/useData';
import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';
import classes from './chartParts/Axis.module.css';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 55, left: 250 }
const xAxisLabelOffset = 35;
const yAxisLabelOffset = 35;

const LineChart = () => {
    const data = useData('https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv', 'line')
    
    if(!data){
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top -margin.bottom;
    const innerWidth = width - margin.left -margin.right;
    
    const yValue = d => d.temperature;
    const yAxisLabel = 'Temperature';
    
    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';

    const xScale = scaleTime()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice();

    const yScale = scaleLinear()
                .domain(extent(data, yValue))
                .range([innerHeight, 0]);

    const xAxisTickFormat  = timeFormat('%a')

    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.right})`}>
                <AxisBottom 
                    xScale={xScale} 
                    innerHeight={innerHeight} 
                    tickFormat={xAxisTickFormat}
                    tickOffset={5}
                />
                <text 
                    className={classes['axis-label']}
                    textAnchor="middle"
                    transform={`translate(${-yAxisLabelOffset},${innerHeight /2}) rotate(-90)`}
                >
                    {yAxisLabel}
                </text>
                <AxisLeft 
                    yScale={yScale} 
                    innerWidth={innerWidth} 
                    type='scatterplot'
                    tickOffset={5}
                />
                <text 
                    className={classes['axis-label']}
                    x={innerWidth/2} 
                    y={innerHeight+xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <Marks 
                    data={data} 
                    xScale={xScale} 
                    yScale={yScale} 
                    xValue={xValue} 
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                    type='scatterplot'
                />
            </g>
        </svg>
    )
}

export default LineChart;
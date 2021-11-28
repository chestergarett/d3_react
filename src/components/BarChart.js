import { max, scaleBand, scaleLinear, format } from 'd3';
import  useData  from '../helpers/useData';
import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';
import classes from './chartParts/Axis.module.css';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 55, left: 250 }
const xAxisLabelOffset = 35;

const BarChart = () => {
    const data = useData()

    if(!data){
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top -margin.bottom;
    const innerWidth = width - margin.left -margin.right;
    const yValue = d => d.Country;
    const xValue = d => d.Population;

    const yScale = scaleBand()
                .domain(data.map( yValue ))
                .range([0, innerHeight])
                .paddingInner(0.1);

    const xScale = scaleLinear()
                .domain([0, max(data, xValue)])
                .range([0, innerWidth]);

    const siFormat = format('.2s')
    const xAxisTickFormat  = tickValue => siFormat(tickValue).replace('G', 'B')
    
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.right})`}>
                <AxisBottom 
                    xScale={xScale} 
                    innerHeight={innerHeight} 
                    tickFormat={xAxisTickFormat}
                />
                <AxisLeft yScale={yScale} />
                <text 
                    className={classes['axis-label']}
                    x={innerWidth/2} 
                    y={innerHeight+xAxisLabelOffset}
                    textAnchor="middle"
                >
                    Population
                </text>
                <Marks 
                    data={data} 
                    xScale={xScale} 
                    yScale={yScale} 
                    xValue={xValue} 
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                />
            </g>
        </svg>
    )
}

export default BarChart;
import { timeFormat,scaleTime, extent, scaleLinear, max, bin, timeMonths, sum } from 'd3';
import classes from './chartParts/Axis.module.css';
import useData from '../helpers/useData';

import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 55, left: 250 }
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

const Migrants = () => {
    const data = useData('https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv', 'migrants')
    
    if(!data){
        return <pre>Loading...</pre>
    }

    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'Time';
    
    const yValue = d => d['Total Dead and Missing']
    const yAxisLabel = 'Total Dead & Missing'

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    

    const xAxisTickFormat = timeFormat('%m/%d/%Y')

    const xScale = scaleTime()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice()

    const [start, stop] = xScale.domain();

    const binnedData = bin()
                .value(xValue)
                .domain(xScale.domain())
                .thresholds(timeMonths(start, stop))
                (data)
                .map(array => ({
                    y: sum(array, yValue),
                    x0: array.x0,
                    x1: array.x1,
                }));

    const yScale = scaleLinear()
            .domain([0, max(binnedData, d =>d.y)])
            .range([innerHeight, 0])

    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                    tickOffset={5}
                    type='scatterplot'
                />
                <text
                    className={classes['axis-label']}
                    textAnchor='middle'
                    transform={`translate(${-yAxisLabelOffset},${innerHeight/2}) rotate(-90)`}
                >{yAxisLabel}
                </text>
                <AxisLeft 
                    yScale={yScale} 
                    innerWidth={innerWidth} 
                    tickOffset={5} 
                    type='scatterplot'
                />
                <text
                    className={classes['axis-label']}
                    x={innerWidth /2 }
                    y={innerHeight+xAxisLabelOffset}
                    textAnchor='middle'
                >{xAxisLabel}
                </text>
                <Marks
                    data={binnedData}
                    xScale={xScale}
                    yScale={yScale}
                    tooltipFormat={d=>d}
                    innerHeight={innerHeight}
                    type='migrants'
                />
            </g>
        </svg>
    )
}

export default Migrants;
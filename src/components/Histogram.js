import { useRef, useEffect, useMemo } from 'react';
import { timeFormat,
        scaleTime, 
        extent, 
        scaleLinear, 
        max, 
        bin, 
        timeMonths, 
        sum,
        brushX,
        select } from 'd3';
import classes from './chartParts/Axis.module.css';

import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';

const margin = { top: 0, right: 30, bottom: 20, left: 90 }
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat('%m/%d/%Y');
const xAxisLabel = 'Time';

const yValue = d => d['Total Dead and Missing']
const yAxisLabel = 'Total Dead & Missing';

const Migrants = ({data, height, width, setBrushExtent,xValue}) => {
    const brushRef = useRef();
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = useMemo( ()=>
                        scaleTime()
                        .domain(extent(data, xValue))
                        .range([0, innerWidth])
                        .nice(),
                    [data, xValue, innerWidth])

    

    const binnedData = useMemo(() => {
                const [start, stop] = xScale.domain();
                return bin()
                    .value(xValue)
                    .domain(xScale.domain())
                    .thresholds(timeMonths(start, stop))
                    (data)
                    .map(array => ({
                        y: sum(array, yValue),
                        x0: array.x0,
                        x1: array.x1,
                    })) 
                }, [xValue, yValue, xScale, data]);

    const yScale = useMemo( ()=> 
                            scaleLinear()
                            .domain([0, max(binnedData, d =>d.y)])
                            .range([innerHeight, 0])
                        , [binnedData, innerHeight])
    
    useEffect( ()=> {
        const brush = brushX()
                    .extent([[0,0], [innerWidth, innerHeight]]);
        brush(select(brushRef.current));
        brush.on('brush end', (event)=>{
            setBrushExtent(event.selection && event.selection.map(xScale.invert))
        })
    },[innerWidth, innerHeight])

    return(
        <>
        <rect width={width} height={height} fill='white'/>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={xAxisTickFormat}
                tickOffset={5}
                type='histogram'
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
                type='histogram'
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
            <g ref={brushRef} />
        </g>
        </>
    )
}

export default Migrants;
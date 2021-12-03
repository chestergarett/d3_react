import React, { useState } from 'react';
import useData from '../helpers/useData';
import{ format, scaleLinear, extent, scaleOrdinal } from 'd3';
import ReactDropdown from 'react-dropdown';
import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';
import ColorLegend from './chartParts/ColorLegend';
import classes from './chartParts/Axis.module.css';

const width = 960;
const height = 500;
const margin = { top: 20, right: 200, bottom: 65, left: 90 }
const xAxisLabelOffset = 35;
const yAxisLabelOffset = 35;

const attributes = [
    {value: 'sepal_length', label: 'Sepal Length'},
    {value: 'sepal_width', label: 'Sepal Width'},
    {value: 'petal_length', label: 'Petal Length'},
    {value: 'petal_width', label: 'Petal Width'},
    {value: 'species', label: 'Species'},
]

const getLabel = value => {
    for(let i=0; i < attributes.length; i++){
        if(attributes[i].value === value){
            return attributes[i].label;
        }
    }
}

const ScatterPlot = () => {
    const data = useData('https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv', 'scatterplot')

    const initialXAttribute = 'petal_length';
    const [xAttribute, setXAttribute] = useState(initialXAttribute);
    const initialYAttribute = 'sepal_width';
    const [yAttribute, setYAttribute] = useState(initialYAttribute);

    const xValue = d => d[xAttribute];
    const yValue =  d => d[yAttribute];
    const colorValue = d => d.species;
    const colorLegendLabel = 'Species';
    const xAxisLabel = getLabel(xAttribute);
    const yAxisLabel = getLabel(yAttribute);
    const circleRadius = 7
    if (!data){
        return <div>Loading...</div>
    }

    const innerHeight = height - margin.top -margin.bottom;
    const innerWidth = width - margin.left -margin.right;

    const xScale = scaleLinear()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice();

    const yScale = scaleLinear()
                .domain(extent(data, yValue))
                .range([0, innerHeight]);

    const colorScale = scaleOrdinal()
                    .domain(data.map(colorValue))
                    .range(['#E6842A', '#137B80', '#8E6C8A']);

    const siFormat = format('.2s')
    const xAxisTickFormat  = tickValue => siFormat(tickValue).replace('G', 'B')

    return(
        <>
        <div className='menu-container'>
            <span className='dropdown-label'>X</span>
            <ReactDropdown 
                options={attributes}
                value={xAttribute}
                onChange={({ value }) => setXAttribute(value)}
            />
            <span className='dropdown-label'>Y</span>
            <ReactDropdown 
                options={attributes}
                value={yAttribute}
                onChange={({ value }) => setYAttribute(value)}
            />
        </div>
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
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
                <g transform={`translate(${innerWidth +60}, 60)`}>
                    <text
                        x={35}
                        y={-25}
                        className={classes['axis-label']}
                        textAnchor="middle"
                    >
                        {colorLegendLabel}
                    </text>
                    <ColorLegend 
                        colorScale={colorScale}
                        tickSpacing={22}
                        tickSize={circleRadius}
                        tickTextOffset={12}
                        colorScale={colorScale}
                    />
                </g>
                <Marks 
                    data={data} 
                    xScale={xScale} 
                    yScale={yScale}
                    colorScale={colorScale} 
                    xValue={xValue} 
                    yValue={yValue}
                    colorValue={colorValue}
                    tooltipFormat={xAxisTickFormat}
                    type='scatterplot'
                />
            </g>
        </svg>
        </>
    )
}

export default ScatterPlot;
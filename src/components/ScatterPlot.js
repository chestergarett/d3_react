import { useState } from 'react';
import useData from '../helpers/useData';
import{ format, scaleLinear, extent} from 'd3';
import Dropdown from './Dropdown';
import AxisBottom from './chartParts/AxisBottom';
import AxisLeft from './chartParts/AxisLeft';
import Marks from './chartParts/Marks';
import classes from './chartParts/Axis.module.css';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 55, left: 250 }
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
    const xAxisLabel = getLabel(xAttribute);
    const yAxisLabel = getLabel(yAttribute);

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

    const siFormat = format('.2s')
    const xAxisTickFormat  = tickValue => siFormat(tickValue).replace('G', 'B')

    return(
        <>
        <label for="x-select">X</label>
        <Dropdown 
            options={attributes}
            id='x-select'
            selectedValue={xAttribute}
            onSelectedValueChange={setXAttribute}
        />
        <label for="y-select">Y</label>
        <Dropdown 
            options={attributes}
            id='y-select'
            selectedValue={yAttribute}
            onSelectedValueChange={setYAttribute}
        />
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
        </>
    )
}

export default ScatterPlot;
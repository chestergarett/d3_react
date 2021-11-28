import classes from './Axis.module.css';

const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) => {
    return(
        <>
        {xScale.ticks().map(tickValue => {
            return(
                <g 
                    className={classes.tick} 
                    key={tickValue} 
                    transform={`translate(${xScale(tickValue)},0)`}
                >
                    <line 
                        y2={innerHeight} 
                    />
                    <text 
                        style={{ textAnchor: 'middle' }}
                        y={innerHeight+tickOffset}
                        dy=".71em"
                    >
                            {tickFormat(tickValue)}
                    </text>
                </g>
            )
        })}
        </>
    )
}

export default AxisBottom;
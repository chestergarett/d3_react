import classes from './Axis.module.css';

const AxisBottom = ({xScale, innerHeight, tickFormat}) => {
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
                        y={innerHeight+3}
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
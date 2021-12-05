import classes from './Axis.module.css'

const AxisLeft = ({yScale,type, innerWidth, tickOffset=3}) => {
    switch(type){
        case 'bar':
            return(
                <>
                {yScale.domain().map(tickValue => {
                    return (
                        <g 
                            className={classes.tick} 
                            key={tickValue} 
                            transform={`translate(0,${yScale(tickValue)+yScale.bandwidth() /2})`}
                        >
                            <text 
                                style={{textAnchor: 'end'}}
                                x={-tickOffset}
                                dy=".32em"
                            >
                                    {tickValue}
                            </text>
                        </g>
                    )
                })}
                </>
            )
        case 'scatterplot':
            return(
                <>
                {yScale.ticks().map(tickValue => {
                    return (
                        <g 
                            className={classes.tick} 
                            key={tickValue} 
                            transform={`translate(0,${yScale(tickValue)})`}
                        >
                            <line x2={innerWidth} />
                            <text 
                                style={{textAnchor: 'end'}}
                                x={-tickOffset}
                                dy=".32em"
                            >
                                    {tickValue}
                            </text>
                        </g>
                    )
                })}
                </>
            )
        case 'histogram':
            return(
                <>
                {yScale.ticks().map(tickValue => {
                    return (
                        <g 
                            className={classes.tick} 
                            key={tickValue} 
                            transform={`translate(0,${yScale(tickValue)})`}
                        >
                            <line x2={innerWidth} />
                            <text 
                                style={{textAnchor: 'end'}}
                                x={-tickOffset}
                                dy=".32em"
                            >
                                    {tickValue}
                            </text>
                        </g>
                    )
                })}
                </>
            )
    }
}

export default AxisLeft;
import classes from './Axis.module.css'

const AxisLeft = ({yScale}) => {
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
                        x={-3}
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

export default AxisLeft;
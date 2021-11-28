const AxisLeft = ({yScale}) => {
    return(
        <>
        {yScale.domain().map(tickValue => {
            return (
                <g key={tickValue} transform={`translate(0,${yScale(tickValue)+yScale.bandwidth() /2})`}>
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
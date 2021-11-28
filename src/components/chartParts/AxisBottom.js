const AxisBottom = ({xScale, innerHeight}) => {
    return(
        <>
        {xScale.ticks().map(tickValue => {
            <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
                <line y2={innerHeight} stroke="black"/>
                <text 
                    style={{ textAnchor: 'middle' }}
                    y={innerHeight+3}
                    dy=".71em"
                >
                        {tickValue}
                </text>
            </g>
        })}
        </>
    )
}

export default AxisBottom;
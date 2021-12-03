

const ColorLegend = ({
    colorScale, 
    tickSpacing=20, 
    tickSize=10, 
    tickTextOffset=20, 
    onHover,
    hoveredValue
}) => {

    return (
        <>
        {colorScale.domain().map( (domainValue,index) => {
            return(
                <g 
                    transform={`translate(0,${index*tickSpacing})`} 
                    key={index}
                    onMouseEnter={()=>{onHover(domainValue)}}
                    onMouseOut={()=>{onHover(null)}}
                    opacity={hoveredValue && domainValue !== hoveredValue ? 0.2: 1}
                >
                    <circle 
                        fill={colorScale(domainValue)}
                        r={tickSize}
                    />
                    <text dy=".32em" x={tickTextOffset}>{domainValue}</text>
                </g>
            )
        })
        }
        </>
    )
}

export default ColorLegend;
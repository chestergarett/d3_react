

const ColorLegend = ({colorScale, tickSpacing=20, tickSize=10, tickTextOffset=20 }) => {

    return (
        <>
        {colorScale.domain().map( (domainValue,index) => {
            return(
                <g transform={`translate(0,${index*tickSpacing})`} key={index}>
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
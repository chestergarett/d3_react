const Marks = ({data, xScale, yScale, xValue, yValue }) => {
    return (
        <>
        {data.map(d => {
                    return (
                        <rect 
                            key={yValue(d)}
                            x={0} 
                            y={yScale(yValue(d))} 
                            width={xScale(xValue(d))} 
                            height={yScale.bandwidth()}
                        />
                    )
                }
        )}
        </>
    )
}

export default Marks;
import classes from './Axis.module.css';

const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, type }) => {
    {
        switch(type){
            case 'bar':
                return (
                    <>
                    {data.map(d => {
                                return (
                                    <rect 
                                        className={classes.mark}
                                        key={yValue(d)}
                                        x={0} 
                                        y={yScale(yValue(d))} 
                                        width={xScale(xValue(d))} 
                                        height={yScale.bandwidth()}
                                    >
                                        <title>{tooltipFormat(xValue(d))}</title>
                                    </rect>
                                )
                            }
                    )}
                    </>
                )
            case 'scatterplot':
                return (
                    <>
                    {data.map((d,i) => {
                                return (
                                    <circle 
                                        className={classes.mark}
                                        cx={xScale(xValue(d))} 
                                        cy={yScale(yValue(d))} 
                                        r={10}
                                        key={i}
                                    >
                                        <title>{tooltipFormat(xValue(d))}</title>
                                    </circle>
                                )
                            }
                    )}
                    </>
                )
        }
    }
}

export default Marks;
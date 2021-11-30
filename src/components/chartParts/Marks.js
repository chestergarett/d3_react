import classes from './Axis.module.css';
import { line, curveNatural, geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

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
            case 'line':
                return (
                    <g className={classes.marks}>
                    <path 
                        fill="none"
                        d={line()
                        .x(d => xScale(xValue(d)))
                        .y(d => yScale(yValue(d)))
                        .curve(curveNatural)
                        (data)
                        }
                    />
                    {/* {data.map((d,i) => {
                                return (
                                    <circle 
                                        cx={xScale(xValue(d))} 
                                        cy={yScale(yValue(d))} 
                                        r={4}
                                        key={i}
                                    >
                                        <title>{tooltipFormat(xValue(d))}</title>
                                    </circle>
                                )
                            }
                    )} */}
                    </g>
                )
            case 'map':
                const projection = geoNaturalEarth1();
                const path = geoPath(projection);
                const graticule = geoGraticule();

                return(
                    <g className={classes.marksMap}>
                        <path className={classes.sphere} d={path({ type: 'Sphere' })} />
                        <path className={classes.graticules} d={path(graticule())} />
                        {
                            data.land.features.map((feature,i)=>{
                                return(
                                    <path
                                        d={path(feature)}
                                        key={i}
                                        className={classes.land}
                                    />
                                )
                            })
                        }
                        <path className={classes.interiors} d={path(data.interiors)} />
                    </g>
                )
        }
    }
}

export default Marks;
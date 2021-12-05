import classes from './Axis.module.css';
import { line, curveNatural, geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const Marks = ({
        data, 
        xScale, 
        yScale, 
        xValue, 
        yValue, 
        tooltipFormat, 
        innerHeight,
        colorScale, 
        colorValue, 
        type, 
        worldAtlas, 
        cities,
        sizeScale,
        sizeValue }) => {
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
                console.log(data)
                return (
                    <>
                    {data.map((d,i) => {
                                return (
                                    <circle 
                                        cx={xScale(xValue(d))} 
                                        cy={yScale(yValue(d))} 
                                        r={10}
                                        key={i}
                                        fill={colorScale(colorValue(d))}
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
                            worldAtlas.land.features.map((feature,i)=>{
                                return(
                                    <path
                                        d={path(feature)}
                                        key={i}
                                        className={classes.land}
                                    />
                                )
                            })
                        }
                        <path className={classes.interiors} d={path(worldAtlas.interiors)} />
                        {
                            cities.map(d=>{
                                const [x,y] = projection([d.lng, d.lat]);
                                return(
                                    <circle 
                                        cx={x} 
                                        cy={y} 
                                        r={sizeScale(sizeValue(d))} 
                                        className={classes.cities}/>
                                )
                            })
                        }
                    </g>
                )
            case 'migrants':
                return (
                    <>
                    {data.map((d,i) => {
                                return (
                                    <rect 
                                        x={xScale(d.x0)} 
                                        y={yScale(d.y)} 
                                        width={xScale(d.x1) - xScale(d.x0)}
                                        height={innerHeight - yScale(d.y)}
                                        className={classes.mark}
                                    >
                                        <title>{tooltipFormat(d.y)}</title>
                                    </rect>
                                )
                            }
                    )}
                    </>
                )
            case 'migrantsMap':
                const projection1 = geoNaturalEarth1();
                const path1 = geoPath(projection1);
                const graticule1 = geoGraticule();

                return(
                    <g className={classes.marksMap}>
                        <path className={classes.sphere} d={path1({ type: 'Sphere' })} />
                        <path className={classes.graticules} d={path1(graticule1())} />
                        {
                            worldAtlas.land.features.map((feature,i)=>{
                                return(
                                    <path
                                        d={path1(feature)}
                                        key={i}
                                        className={classes.land}
                                    />
                                )
                            })
                        }
                        <path className={classes.interiors} d={path1(worldAtlas.interiors)} />
                        {
                            cities.map(d=>{
                                const [x,y] = projection1(d.coords);
                                return(
                                    <circle 
                                        cx={x} 
                                        cy={y} 
                                        r={sizeScale(sizeValue(d))} 
                                        className={classes.cities}/>
                                )
                            })
                        }
                    </g>
                )
        }
    }
}

export default Marks;
import classes from './Choropleth.module.css';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const missingDataColor = 'gray';

const Marks = ({
    worldAtlas: { countries, interiors },
    data,
    rowByNumericCode,
    colorScale,
    colorValue
}) => {
    return(
        <g className={classes.marks}>
            <path className={classes.sphere} d={path({ type: 'Sphere'})} />
            <path className={classes.graticules} d={path(graticule())} />
            {countries.features.map(feature =>{
                const d = rowByNumericCode.get(feature.id);
                
                return(
                    <path 
                        fill={d ? colorScale(colorValue(d)): missingDataColor} 
                        d={path(feature)} />
                )
            })}
            <path className={classes.interiors} d={path(interiors)} />
        </g>
    )
}

export default Marks;
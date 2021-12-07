import { interpolateYlOrRd, scaleSequential, max } from 'd3';
import useWorldAtlas from './useWorldAtlas';
import useData from './useData';
import useCodes from './useCodes';
import Marks from './Marks';

const width = 960;
const height = 500;
const selectedYear = '2017';

const Choropleth = () => {
    const worldAtlas = useWorldAtlas();
    const data = useData();
    const codes = useCodes();

    if(!worldAtlas || !data || !codes){
        return <pre>Loading...</pre>;
    }
    const numericCodeByAlphaCode = new Map();
    
    codes.forEach(code=>{
        const alpha3Code = code["alpha-3"];
        const numericCode = code['country-code'];
        numericCodeByAlphaCode.set(alpha3Code, numericCode)
    })

    const filteredData = data.filter( d => d.Year === selectedYear)

    const rowByNumericCode = new Map();

    filteredData.forEach(d => {
        const alpha3Code = d.Code;
        const numericCode = numericCodeByAlphaCode.get(alpha3Code);
        rowByNumericCode.set(numericCode, d);
    })

    const colorValue = d => d.aids;

    const colorScale = scaleSequential(interpolateYlOrRd)
                    .domain([0, max(data, colorValue)]);

    return (
        <svg width={width} height={height}>
            <Marks
                worldAtlas={worldAtlas}
                data={filteredData}
                colorScale={colorScale}
                colorValue={colorValue}
                rowByNumericCode={rowByNumericCode}
            />
        </svg>
    )
}

export default Choropleth;
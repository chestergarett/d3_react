import { useEffect } from 'react';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import { Handler } from 'vega-tooltip';
import config from '../helpers/config';
import getData from '../helpers/getData';
import viz from '../helpers/viz';

vl.register(vega, vegaLite,{
    view: {renderer: 'svg'},
    init: view => { view.tooltip(new Handler().call); }
})

const run = async () => { 
    const marks = viz
                .data(await getData())
                .width(window.innerWidth)
                .height(window.innerHeight)
                .autosize({ type: 'fit', contains: 'padding' })
                .config(config)

    document.body.appendChild(await marks.render());
};

const ScatterPlotVega  = () => {
    
    useEffect( ()=>{
        run()
    },[])

    return (
        <></>
    )
}

export default ScatterPlotVega;
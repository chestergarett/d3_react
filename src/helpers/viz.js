import * as vl from 'vega-lite-api';

const viz = vl
            .markCircle({ 
                size: 600, 
                opacity: .5 
            })
            .encode(
                vl.x().fieldQ('weight').scale({ zero: false }),
                vl.y().fieldQ('horsepower').scale({ zero: false }),
                vl.color().fieldN('origin'),
                vl.tooltip().fieldN('name'),
                vl.size().fieldQ('mpg')
            )

export default viz;
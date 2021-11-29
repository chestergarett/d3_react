import { useState, useEffect } from 'react';
import { csv } from 'd3';

const useData = (csvUrl,chart) => {
    const [data, setData] = useState(null);

    useEffect( ()=> {
        switch(chart){
            case 'bar':
                const row = (d) => {
                    d.Population = +d['2020'] * 1000;
                    return d;
                };

                csv(csvUrl, row)
                    .then((data) => {
                    setData(data?.slice(0,10))
                });
                break;
            case 'scatterplot':
                const row2 = d => {
                    d.sepal_length = +d.sepal_length;
                    d.sepal_width = +d.sepal_width;
                    d.petal_length = +d.petal_length;
                    d.petal_width = +d.petal_width;
                    return d;
                }
                csv(csvUrl, row2).then(setData);
                break;
            case 'line':
                const row3 = d => {
                    d.temperature = +d.temperature;
                    d.timestamp = new Date(d.timestamp)
                    return d;
                }
                csv(csvUrl, row3).then(setData)
                break;
        }
    },[])

    return data;
}

export default useData;
import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { json } from "d3-request";
import { feature } from "topojson";

export function PieChart(props) {
    const {year, datapie} = props;
    const text = "working";
    const number = datapie[0].homeless_population/datapie[0].total_population * 10000;

    console.log(datapie[0].homeless_population/datapie[0].total_population);

    return <g transform="translate(1150,150) scale(12)">
      <circle r="10" fill="green" />
      <circle r="5" fill="transparent"
          stroke="tomato"
          strokeWidth="10"
          strokeDasharray= {`calc(${datapie[0].homeless_population/((datapie[0].total_population)*0.01) *100 } * 31.4 / 100) 31.4`}
          transform="rotate(-90)" />
            <g key={"pie title"} >
            <text x={-15} y={13} style={{textAnchor: 'start' , fontSize:'2px'}}> {"Distribution of homeless in " + year }</text>
            <text x={-9} y={14.5} style={{textAnchor: 'start' , fontSize:'1px'}}>{"Note that is this percent over .1%"}</text>
            </g>
        </g>
}
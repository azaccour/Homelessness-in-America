import React from "react";
import { max } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
  const {height,width,datahomeless, state} = props;
    const datahomeless_state = datahomeless.filter ( d => {
        return d.states === state;
      });

    console.log("datahomeless_states", datahomeless);
    const xScale = Scales.band(datahomeless_state.map(d => d.name), 0, width);
    const ymax = Math.max(...datahomeless_state.map(d => d.population))
    const yScale = Scales.linear(ymax,0,-10,height);
    return <g>
            <Bars datahomeless_state={datahomeless_state} xScale={xScale} yScale={yScale} height={height} />
             
            <YAxis yScale={yScale} height={height} axisLable={"Population"}/>
            <XAxis chartType={'bar'} height={height} width={width} xScale={xScale} axisLable={""}/>
        </g>
}
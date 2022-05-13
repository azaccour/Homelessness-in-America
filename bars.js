import React from "react";

export function Bars(props){
    const {datahomeless_state, xScale, yScale, height} = props;
        
    return <g>
        { datahomeless_state.map( d =>
        <rect key={d.name} x={xScale(d.name)} y={yScale(d.population)}
        width={xScale.bandwidth()} height={height-yScale(d.population)} stroke="black" 
        fill='#aca'/>
        )}
    </g>
}
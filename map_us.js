import React from "react";
import { geoPath, geoMercator, geoAlbersUsa } from "d3-geo";


export function MapUSA(props) {
    const {map, year, datapop, datahomeless, selectedState, setSelectedState, selectedPop, setSelectedPop} = props;
    let path = geoPath(geoAlbersUsa());
    const w = 100;
    const h = 20;
    // use effect hook -- inside input the svg element
    //select("svg").remove()
    const filterData_pop = datapop.filter ( d => d.id === selectedState);
    console.log("Data", datapop);
    console.log("map features", map.features[0]);
    console.log("Geometry", map.features[0].geometry.coordinates)

    const color = (d) => selectedState && d === selectedState ? "#2c6bd8":"#aca";

    return <g>
            {map.features.map( feature => {
                const state = datapop.filter( d => d.id === feature.id);
                { /*console.log(country); */}
                if (state[0]){
                    return <path key={feature.id+"boundary"} className={"boundary"} 
                    d={path(feature)}
                    color ={selectedState && "" !== selectedState ? "#2c6bd8":"#aca"} 
                    style={{fill:color(state[0].states), stroke:"black" /* need to change to adjust */ }} 
                    onMouseEnter={() => (setSelectedState(state[0].states), setSelectedPop(state[0].population))} onMouseOut={() => (setSelectedState(null), setSelectedPop(null))}/>}
                else {
                    if (selectedState==="unknown") {
                        const state = datapop.filter( d => d.id === feature.id);
                        if (!state[0]) {
                            return <path key={feature.id+"boundary"} className={"boundary"} 
                            d={path(feature)} style={{fill:"black" /* need to change to adjust */}}/>
                        }
                    }
                       return <g key={feature.id+"boundary"}></g> 
                    }
            })}
            <g key={"unknow_rect"} >
                <rect x={540} y={450} width={w} height={h} 
                color ={selectedState && "unknown" !== selectedState ? "#2c6bd8":"#aca"}
                style={{fill:"white"}} />
                <text x={540} y={470}>
                        State: {selectedState}
                </text>
                <text x={540} y={490}>
                        Population: {selectedPop}
                </text>
            </g>


      </g>
}
    

import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import { select } from "d3-selection";
import "./styles.css";
import { MapUSA } from "./map_us";
import { BarChart } from './barchart';
import { PieChart } from "./piechart.js";
import { geoPath, geoMercator, geoAlbersUsa } from "d3-geo";
import { feature } from "topojson";


const csvUrl_homeless = 'https://raw.githubusercontent.com/azaccour/Homelessness-in-America/main/Homeless_Cleaned_Final.csv';
const csvURL_total_population = 'https://raw.githubusercontent.com/azaccour/Homelessness-in-America/main/Population-by-state_FinalCleaned.csv';
const csvURL_pie = 'https://raw.githubusercontent.com/azaccour/Homelessness-in-America/main/Total_Homeless_Total_Population.csv';
const mapURL = 'https://raw.githubusercontent.com/azaccour/Homelessness-in-America/main/us.json'

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then( topojsonData => {
            setData(feature(topojsonData, topojsonData.objects.states))});
    }, []);
    return data;
}


// population data
function useData_population(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.id = +d.id;
                d.states = d.states;
                d.year = d.year;
                d.population = d.population;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

// homeless data
function useData_homeless(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.year = +d.year;
                d.states = d.state;
                d.id = +d.id;
                d.name = d.name;
                d.type  = d.type;
                d.population = +d.population;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

// pie chart data
function useData_pie(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.year = +d.year;
                d.total_population = +d.total_population;
                d.homeless_population = +d.homeless_population;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function Homeless(){
    const [year, setYear] = React.useState('4');

    const [selectedState, setSelectedState] = React.useState(null);
    const [selectedPop, setSelectedPop] = React.useState(null);

    const WIDTH = 1800;
    const HEIGHT = 800;
    const offsetX = 910;
    const offsetY = 24.73;
    const margin = { top: 20, right: 40, bottom: 160, left: 40, gap: 40 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    //const dataAll = useData(csvUrl);
    const YEAR = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

    // data map
    const map = useMap(mapURL);
    console.log("data map", map);
    // data homeless
    const dataAll_homeless = useData_homeless(csvUrl_homeless);
    console.log("data homeless", dataAll_homeless);
    // data for the state population
    const dataAll_population = useData_population(csvURL_total_population);
    console.log("data state population", dataAll_population);
    // data pie
    const dataAll_pie =  useData_pie(csvURL_pie);
    console.log("data pie", dataAll_population);

    if (!dataAll_population || !dataAll_homeless || !dataAll_pie || !map) {
        return <pre>Loading...</pre>;
    };

    const data_year_homeless = dataAll_homeless.filter ( d => {
        return d.year === parseInt(YEAR[year]);
    });
    const data_year_pop = dataAll_population.filter ( d => {
        return d.year === YEAR[year];
    });
    const data_year_pie = dataAll_pie.filter ( d => {
        return d.year === parseInt(YEAR[year]);
    });

    //console.log("homeless:", data_year_homeless);
    //console.log("population:", data_year_pop);

    const changeHandler = (event) => {
        setYear(event.target.value);
    }

    console.log("EXPORT", selectedState);
    return  <div>
        <div height={100}>
            <input key="slider" type='range' min='0' max='6' value={year} step='1' onChange={changeHandler} />
            <input key="yearText" type="text" value={YEAR[year]} readOnly/>
        </div>
            <svg height={1000} width={1500}>
                <g>
                <MapUSA map={map} year={YEAR[year]}
                datapop = {data_year_pop} datahomeless = {data_year_homeless} selectedState={selectedState} setSelectedState={setSelectedState}
                selectedPop={selectedPop} setSelectedPop={setSelectedPop}/>
                </g>
                <PieChart year={YEAR[year]} datapie= {data_year_pie} />
                <g transform="translate(900, 400)">
                    <BarChart height={200} width={500} datahomeless={data_year_homeless} state={selectedState}/>
                </g>

            </svg>
        <div style={{position: "absolute", textAlign: "middle", width: "400px",left:WIDTH/3, top:"10px"}}>
            <h3>Homelessness in America: 2010-2016</h3>
        </div> 
    </div>
}

ReactDOM.render(<Homeless/ >, document.getElementById("root"));
import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import TextField from '@material-ui/core/TextField'
import { Animation } from '@devexpress/dx-react-chart';

export default function ChartsDemo() {
    const [data,setData] = useState([
        { aihealue: 'ATK:n perusteet', Points: 5, MaxPoints: 10, Percentage: 50 },
        { aihealue: 'Biologian alkeet', Points: 2, MaxPoints: 10, Percentage: 20 },
        { aihealue: 'Matikan lopputentti', Points: 10, MaxPoints: 10, Percentage: 100 },
        { aihealue: 'Kemian pääsykoe', Points: 8, MaxPoints: 10,Percentage: 80 },
        { aihealue: 'Biologian jatkoa ', Points: 5, MaxPoints: 10,Percentage: 50 },
        { aihealue: 'Terveystiedon alkeet', Points: 9, MaxPoints: 10,Percentage: 90},
      ]);
    
      const numberChange = (event, index) => {
        console.log(event.target.value)
        console.log(index)
      
        var newNumber = event.target.value;
        var dataCopy = [...data]
        dataCopy[index].Points = newNumber;
        dataCopy[index].Percentage = newNumber/dataCopy[index].MaxPoints*100
        setData(dataCopy)
      }
      
      const maxPointChange = (event, index) => {
        console.log(event.target.value)
        console.log(index)
      
        var newNumber = event.target.value;
        var dataCopy = [...data]
        dataCopy[index].MaxPoints = newNumber;
        dataCopy[index].Percentage = dataCopy[index].Points/newNumber*100
        setData(dataCopy)
      }
    return (
        <div>
            {data.map((value, index) => {
                return (
                    <div>
                        <TextField
                            id="Points"
                            label={value.aihealue}
                            type="number"
                            value={value.Points}
                            onChange={(event) => numberChange(event, index)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="MaxPoints"
                            label="maksimipisteet"
                            type="number"
                            value={value.MaxPoints}
                            onChange={(event) => maxPointChange(event, index)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>)
            })}
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis max={3} />
                <BarSeries
                    valueField="Percentage"
                    argumentField="aihealue"
                />
                <Title text="Aihealueiden pisteprosentit" />
                <Animation />
            </Chart>
        </div>
    )
}



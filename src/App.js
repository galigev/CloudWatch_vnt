import React, { useState } from "react";

import Chart from './Chart.js';

import './App.css';

const App = (props) => {

  const axios = require('axios');
  const validate = require('ip-validator');

  const [ipAddress, setIpAddress] = useState();
  const [date, setDate] = useState('last_day');
  const [period, setPeriod] = useState(60);
  const [chartData, setChartData] = useState([]);

  const MAX_PERIOD = 6000;
  const periods = [];

  for (let i = 60; i <= MAX_PERIOD; i += 60) {
    periods.push(<option key={i} value={i}>{i}</option>);
  }

  const onLoad = async () => {

    if (validate.ipv4(ipAddress)) {

      let res = await axios.get("http://127.0.0.1:3000/getCpuUtilization", {
        params: {
          ipAddress: ipAddress,
          date: date,
          period: period
        }

      })

      if (res.data["error"] !== undefined) {
        setChartData();
        alert(res.data.error);
      }
      else
        setChartData(res.data.Datapoints);


    }
    else {
      alert("Please insert valid IP");
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <title>AWS Instance CPU usage</title>
      </header>
      <h1>AWS Instance CPU usage</h1>
      <div className="aws_input">
        <label>
          Time Period:
          <select id='input_date' value={date} onChange={event => setDate(event.target.value)}>
            <option value="last_day">Last Day</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last 30 Days</option>
          </select>
        </label>
        <label>
          Period:
           <select id='input_period' value={period} onChange={event => setPeriod(event.target.value)}>
            {periods}
          </select>
        </label>
        <label>
          IP Address:
        <input type='text' id='input_ipAddress' value={ipAddress} onChange={event => setIpAddress(event.target.value)} />
          <input className="submit" type="submit" value='Load' onClick={onLoad} />
        </label>
      </div>
      <div className="chart">
        <Chart data={chartData} period={period} date={date} />
      </div>
    </div>
  );
};

export default App;

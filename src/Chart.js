import React from "react";
import { LineChart, Line, XAxis, YAxis, Label } from "recharts";
import "d3-time";
import "d3-scale";
import { timeHour } from "d3-time";

const Chart = (props) => {

    const daysOptions = {
        'last_day': new Date(new Date() - 1),
        'last_week': new Date(new Date() - 7),
        'last_month': new Date(new Date() - 30)
    }

    const chartLines = [];
    const xTimeStamp = [];
    let minAverage, maxAverage;

    const dateDomain = [daysOptions[props.date].toISOString(), new Date().toISOString()];
    console.log(props.data);

    if (props.data.length > 0) {

        props.data.forEach(point => {
            if (minAverage > point.Average || minAverage == null)
                minAverage = point.Average;
            if (maxAverage < point.Average || maxAverage == null)
                maxAverage = point.Average;

            console.log(new Date(point.Timestamp).toISOString().substr(11, 5));
            xTimeStamp.push(point.Timestamp);
            chartLines.push();
        });

        console.log("today " + new Date().toISOString().substr(11,5));
        return <div>
            <LineChart
                width={1000}
                height={500}
                data={props.data}>

                <XAxis dataKey="Timestamp"
                    type="category"
                    // scale="time"
                    // tick={ticks}
                    tickFormat={(d) => new Date(d).toISOString().substr(11, 5)}
                    domain={dateDomain}
                >
                </XAxis>
                <YAxis dataKey="Average" type="number" domain={dateDomain}>
                    <Label value="Percentage" angle={-90}></Label>
                </YAxis>

                <Line type="monotone" dataKey="Average" stroke='#000000'></Line>
            </LineChart>
        </div>
    }
    else
        return <div></div>;
};

export default Chart;
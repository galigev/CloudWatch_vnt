import React from "react";
import { LineChart, Line, XAxis, YAxis, Label } from "recharts";
import "d3-time";
import "d3-scale";

const Chart = (props) => {

    const daysOptions = {
        'last_day': new Date(new Date() - 1),
        'last_week': new Date(new Date() - 7),
        'last_month': new Date(new Date() - 30)
    };

    const chartLines = [];
    const xTimeStamp = [];
    let minAverage, maxAverage;

    const dateDomain = [daysOptions[props.date].toISOString(), new Date().toISOString()];

    if (props.data !== undefined && props.data.length > 0) {

        props.data.forEach(point => {
            if (minAverage > point.Average || minAverage == null)
                minAverage = point.Average;
            if (maxAverage < point.Average || maxAverage == null)
                maxAverage = point.Average;

            xTimeStamp.push(point.Timestamp);
            chartLines.push();
        });

        return <div>
            <LineChart
                width={1000}
                height={500}
                data={props.data}>

                <XAxis dataKey="Timestamp"
                    type="category"
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
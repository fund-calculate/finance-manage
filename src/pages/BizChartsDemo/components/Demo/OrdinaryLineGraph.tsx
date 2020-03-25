import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";

class Curved extends React.Component {
  render() {
    const data = [
      {
        month: "2019-01-01",
        city: "天天基金",
        temperature: 7
      },
      {
        month: "2019-01-01",
        city: "蚂蚁财富",
        temperature: 3.9
      },
      {
        month: "2019-02-01",
        city: "天天基金",
        temperature: -10
      },
      {
        month: "2019-02-01",
        city: "蚂蚁财富",
        temperature: 4.2
      },
      {
        month: "2019-03-01",
        city: "天天基金",
        temperature: 9.5
      },
      {
        month: "2019-03-01",
        city: "蚂蚁财富",
        temperature: 5.7
      },
      {
        month: "2019-04-01",
        city: "天天基金",
        temperature: 14.5
      },
      {
        month: "2019-04-01",
        city: "蚂蚁财富",
        temperature: 8.5
      }
    ];
    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Legend/>
          <Axis name="month"/>
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}元`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Curved;

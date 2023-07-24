import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  Label,
  ResponsiveContainer,
  Dot,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload) {
    return (
      <div
        style={{
          backgroundColor: "#f1c40fa1",
          padding: 10,
        }}
      >
        <span>{`${label}: ${payload[0].value}`}</span>
      </div>
    );
  }

  return null;
}

export default function ReactGraph({ data }) {
  const [showXAxisLabel, setShowXAxisLabel] = useState(true);

  useEffect(() => {
    if (data && data.length > 29) {
      setShowXAxisLabel(false);
    }
  }, [data]);
  //https://recharts.org/en-US/examples/SynchronizedLineChart

  return (
    <ResponsiveContainer width="100%" height={430}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
      >
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient> */}
          <linearGradient id="colorvalue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <XAxis dataKey="name" domain={[0, 1000]} textAnchor="end" angle={-290} interval={0}></XAxis> */}

        <XAxis
          dataKey="name"
          angle={60}
          textAnchor="start"
          tick={{
            fontSize: 14,
            display: showXAxisLabel ? "inline-block" : "none",
          }}
          interval={0}
          // domain={[0, "auto"]}
        />

        <YAxis />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip content={CustomTooltip} wrapperStyle={{ outline: "none" }} />
        {/* <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        /> */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorvalue)"
          dot={<Dot fill="#ffa500" />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

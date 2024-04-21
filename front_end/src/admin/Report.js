import * as React from "react";
import { BarChart, BarElement } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";

export default function ReportNumberPacketPerMonth() {
  const [data, setData] = useState([]);
  const authContext = useAuth();
  const chartSetting = {
    xAxis: [
      {
        label: "packets",
      },
    ],
    width: 800,
    height: 600,
  };
  const valueFormatter = (value) => `${value} packets`;

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/reportNumberPacketPerMonth`,
          {
            headers: {
              Authorization: `Bearer ${authContext.accessToken}`,
            },
          }
        );
        let dataSet = await response.data;
        setData(dataSet);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <BarChart
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "time" }]}
          series={[
            {
              dataKey: "number",
              label: "Report for number packet per month",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
          onItemClick={(event, barItemIdentifier) =>
            console.log(barItemIdentifier)
          }
          disableAxisListener="true"
        />
      )}
    </div>
  );
}

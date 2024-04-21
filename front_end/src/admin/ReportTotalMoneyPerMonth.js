import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";

export default function ReportTotalMoneyPerMonth() {
  const [data, setData] = useState([]);
  const authContext = useAuth();
  const chartSetting = {
    xAxis: [
      {
        label: "ron",
      },
    ],
    width: 800,
    height: 600,
  };
  const valueFormatter = (value) => `${value} ron`;

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/reportTotalMoneyPerMonth`,
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

  function handleClick(data) {
    console.log(data);
  }

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
              label: "Report for money per month",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
          onItemClick={(event, barItemIdentifier) =>
            console.log(barItemIdentifier)
          }
        />
      )}
    </div>
  );
}

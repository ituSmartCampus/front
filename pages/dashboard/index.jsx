import React from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import styles from "../dashboard/Dashboard.module.scss";
import { getCookie, setCookies } from "cookies-next";

import { Bar, Line, Scatter, Bubble, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({ err, moisture, air, temperature, listData }) => {
  const router = useRouter();
  if (err) {
    return <ErrorPage statusCode={err} />;
  }
  const generateChartData = (dataList, label, backgroundColor, borderColor) => {
    return {
      labels: dataList.map((item) => item.time),
      datasets: [
        {
          label: "Moisture",
          data: dataList
            .filter((item) => item.sensorType === "moisture")
            .map((item) => parseFloat(item.measuredValue)),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Air",
          data: dataList
            .filter((item) => item.sensorType === "air")
            .map((item) => parseFloat(item.measuredValue)),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Temperature",
          data: dataList
            .filter((item) => item.sensorType === "temperature")
            .map((item) => parseFloat(item.measuredValue)),
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
      ],
    };
  };
  const humidityData = generateChartData(
    moisture.datas,
    "Humidity",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 1)"
  );

  const temperatureData = generateChartData(
    temperature.datas,
    "Temperature",
    "rgba(54, 162, 235, 0.2)",
    "rgba(54, 162, 235, 1)"
  );

  const airQualityData = generateChartData(
    air.datas,
    "Air Quality",
    "rgba(75, 192, 192, 0.2)",
    "rgba(75, 192, 192, 1)"
  );

  const listDatas = generateChartData(
    listData.datas,
    "Air Quality",
    "rgba(75, 192, 192, 0.2)",
    "rgba(75, 192, 192, 1)"
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.genelChart}>
          <div className={styles.textBig}>
            <p>Genel Panel</p>
          </div>
          <Line
            data={listDatas}
            options={{
              title: {
                display: true,
                text: "List Data",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div className={styles.chart}>
          <div className={styles.text}>
            <p>Humidity</p>
          </div>
          <Bar
            data={humidityData}
            options={{
              title: {
                display: true,
                text: "Humidity Data",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>

        <div className={styles.chart}>
          <div className={styles.text}>
            <p>Temperature</p>
          </div>
          <Bar
            data={temperatureData}
            options={{
              title: {
                display: true,
                text: "Temperature Data",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>

        <div className={styles.chart}>
          <div className={styles.text}>
            <p>Air Quality</p>
          </div>
          <Bar
            data={airQualityData}
            options={{
              title: {
                display: true,
                text: "Air Quality Data",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookie = getCookie("jwt", { req, res });
  const moisture = await fetch(`http://127.0.0.1:3131/api/data/list/moisture`, {
    headers: { Authorization: `Bearer ${cookie}` },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  const air = await fetch(`http://127.0.0.1:3131/api/data/list/air`, {
    headers: { Authorization: `Bearer ${cookie}` },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  const temperature = await fetch(
    `http://127.0.0.1:3131/api/data/list/temperature`,
    {
      headers: { Authorization: `Bearer ${cookie}` },
    }
  ).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  const list = await fetch(`http://127.0.0.1:3131/api/data/list`, {
    headers: { Authorization: `Bearer ${cookie}` },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  if (moisture && temperature && air && list) {
    console.log(list, "listss");
    // console.log(moisture, "moisture");
    // console.log(temperature, "temperature");
    // console.log(air, "air");
    return {
      props: {
        err: false,
        moisture: moisture || [],
        temperature: temperature || [],
        air: air || [],
        listData: list || [],
      },
    };
  } else {
    return {
      props: {
        err: 401,
      },
    };
  }
}

export default Dashboard;

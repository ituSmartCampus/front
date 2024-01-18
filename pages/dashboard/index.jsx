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

const Dashboard = ({ err, moisture, air, temperature }) => {
  const router = useRouter();
  if (err) {
    return <ErrorPage statusCode={err} />;
  }
  const dataFake = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Humidity",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(255, 123, 42, 0.2)",
        backgroundColor: "rgba(255, 123, 42, 0.2)",
      },
      {
        label: "Temperature",
        data: [28, 30, 35, 32, 28, 31, 29],
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Air Condition",
        data: [40, 42, 38, 45, 39, 41, 37],
        borderColor: "rgba(75, 192, 192, 0.2)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const humidityData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Humidity",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const temperatureData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: [28, 30, 35, 32, 28, 31, 29],
      },
    ],
  };

  const airQualityData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Air Quality",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [40, 42, 38, 45, 39, 41, 37],
      },
    ],
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Kontrol Panel</h1>
      <div className={styles.container}>
        <div className={styles.chart}>
          <Line data={dataFake}></Line>
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
  const moisture = await fetch(`http://0.0.0.0:3131/api/data/list/moisture`, {
    headers: { Authorization: `Bearer ${cookie}` },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  const air = await fetch(`http://0.0.0.0:3131/api/data/list/air`, {
    headers: { Authorization: `Bearer ${cookie}` },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  const temperature = await fetch(
    `http://0.0.0.0:3131/api/data/list/temperature`,
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
  if (moisture && temperature && air) {
    console.log(moisture, "moisture");
    console.log(temperature, "temperature");
    console.log(air, "air");
    return {
      props: {
        err: false,
        moisture: moisture || [],
        temperature: temperature || [],
        air: air || [],
        cookie,
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

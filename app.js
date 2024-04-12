import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.8/axios.min.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const temp = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const sound = document.getElementById("light");
const switchBtn = document.getElementById("switch");
console.log("🚀 ~ switchBtn:", switchBtn);

const ctx = document.getElementById("myChart").getContext("2d");
const circularProgress = document.querySelectorAll(".circular-progress");

Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 600;
Chart.defaults.color = "#000";

const firebaseConfig = {
  apiKey: "AIzaSyCXucNeRTSLENJ4cRyjtNHmwiYy93KVpew",
  authDomain: "test-9fdaf.firebaseapp.com",
  databaseURL: "https://test-9fdaf-default-rtdb.firebaseio.com", 
  projectId: "test-9fdaf",
  storageBucket: "test-9fdaf.appspot.com",
  messagingSenderId: "2889081671",
  appId: "1:2889081671:web:f4fd6c57d840157ae3a262",
  measurementId: "G-BS2NVF0JY9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const dbRef = ref(db);
var values = [];
const getData = () => {
  get(child(dbRef, "infomation"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        temp.innerHTML = `${snapshot.val().temp} °C`;
        humidity.innerHTML = `${snapshot.val().humidity}%`;
        sound.innerHTML = `${snapshot.val().sound} DB`;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const getTime = () => {
  // Gửi yêu cầu GET đến một API và xử lý phản hồi
  // fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json(); // Trích xuất dữ liệu JSON từ phản hồi
  //   })
  //   .then((data) => {
  //     console.log(data); // In dữ liệu nhận được từ API
  //   })
  //   .catch((error) => {
  //     console.error("There was a problem with the fetch operation:", error);
  //   });
  axios
    .get("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh")
    .then((response) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
getTime();

getData();

// const myChart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Nhiệt độ", "độ ẩm", "cường độ ánh sáng"],
//     datasets: [
//       {
//         label: "Biểu đồ",
//         data: [30, 100, 100],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//         borderWidth: 10,
//         borderRadius: 4,
//         hoverBackgroundColor: "#eee",
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     layout: {
//       padding: 20,
//     },
//     Plugins: {
//       tooltip: {
//         enabled: true,
//         Align: "top",
//         titleAlign: "center",
//         callbacks: {
//           label: (tooltipItem, value) => {
//             var label = myChart.data.labels[tooltipItem.dataIndex];
//             var value =
//               myChart.data.datasets[tooltipItem.dataIndex].data[
//                 tooltipItem.dataIndex
//               ];
//             return "Giá trị:" + value;
//           },
//         },
//       },
//       legend: {
//         display: true,
//       },
//       colors: {
//         forceOverride: true,
//       },
//     },
//   },
// });

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Độ ẩm",
        data: [10, 10, 30, 40, 50, 10, 20, 30, 20, 30, 40],
        // this dataset is drawn below
        type: "bar",
        order: 2,
      },
      {
        label: "Nhiệt độ",
        data: [10, 40, 10, 10, 20, 30, 90, 80, 20, 10, 11],
        type: "line",
        // this dataset is drawn on top
        order: 1,
      },
    ],
    labels: ["0H", "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H","11H","12H","13H","14H","15H","16H","17H","18H","19H","20H","21H","22H","23H"],
  },
  // options: options,
});

Array.from(circularProgress).forEach((progressBar) => {
  const progressValue = progressBar.querySelector(".percentage");
  const innerCircle = progressBar.querySelector(".inner-circle");
  let startValue = 0,
    endValue = getData(),
    speed = 30,
    progressColor = progressBar.getAttribute("data-progress-color");

  console.log("🚀 ~ Array.from ~ startValue:", startValue);
  console.log("🚀 ~ Array.from ~ endValue:", endValue);

  const progress = setInterval(() => {
    startValue++;
    progressValue.textContent = `${startValue}%`;
    // progressValue.style.color = `${progressColor}`;

    innerCircle.style.backgroundColor = `${progressBar.getAttribute(
      "data-inner-circle-color"
    )}`;

    progressBar.style.background = `conic-gradient(${progressColor} ${
      startValue * 3.6
    }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    if (startValue === endValue) {
      clearInterval(progress);
    }
  }, speed);
});

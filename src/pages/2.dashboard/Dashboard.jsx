import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import dashboardIcon from "../../assets/dashboardIcon.svg";
import transactionIcon from "../../assets/transactionIcon.svg";
import scheduleIcon from "../../assets/scheduleIcon.svg";
import userIcon from "../../assets/userIcon.svg";
import settingIcon from "../../assets/settingIcon.svg";
import Notification from "../../assets/Notification.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import total_transactions_icon from "../../assets/total_transactions_icon.svg";
import TotalRevenues from "../../assets/TotalRevenues.svg";
import TotalUsers from "../../assets/TotalUsers.svg";
import like from "../../assets/like.svg";
import down from "../../assets/down.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null); // Add a ref for the pie chart instance
  const location = useLocation();
  const user = location.state && location.state.user;

  useEffect(() => {
    axios
      .get("https://api.npoint.io/e7268b28c20d13b52e97")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const chartLabels = Object.keys(data.chartData.User);
      const chartDataUser = Object.values(data.chartData.User);
      const chartDataGuest = Object.values(data.chartData.Guest);

      // Clear the existing chart and canvas
      if (chartRef.current) {
        chartRef.current.remove();
      }

      const ctx = document.createElement("canvas");
      chartRef.current = ctx;
      document.getElementById("lineChartContainer").appendChild(ctx);

      // Clear the existing pie chart and canvas
      if (pieChartRef.current) {
        pieChartRef.current.remove();
      }

      const pieCtx = document.createElement("canvas");
      pieChartRef.current = pieCtx;
      document.getElementById("pieChartContainer").appendChild(pieCtx);

      // Create the line chart instance
      new Chart(ctx, {
        type: "line",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "User",
              data: chartDataUser,
              borderColor: "#9BDD7C",
              fill: false,
              tension: 0.4,
            },
            {
              label: "Guest",
              data: chartDataGuest,
              borderColor: "#E9A0A0",
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create the pie chart instance
      new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: Object.keys(data.pieChartData),
          datasets: [
            {
              data: Object.values(data.pieChartData),
              backgroundColor: [
                "#98D89E",
                "#EE8484",
                "#F6DC7D",
                // Add more colors as needed
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "right",
            },
          },
          height: 10,
        },
      });
    }
  }, [data]);

  return (
    <div className="bg-[#F5F5F5] w-screen h-screen flex">
      {/* left */}
      <div className="bg-black w-[38%] md:[26%] flex flex-col items-center m-3 rounded-3xl p-2 lg:w-1/4">
        <h1 className="text-white text-4xl font-bold lg:text-4xl mt-4">
          Target.
        </h1>
        <span className="text-white  text-sm font-bold mt-6">
          Welcome,<span>{user.name}</span>
        </span>
        <div className="flex flex-col mt-6 cursor-pointer">
          <ul className="space-y-4">
            <li className="text-white flex items-center">
              <img src={dashboardIcon} alt="Dashboard Icon" className="mr-2" />
              Dashboard
            </li>
            <li className="text-white flex items-center">
              <img
                src={transactionIcon}
                alt="Transaction Icon"
                className="mr-2"
              />
              Transactions
            </li>
            <li className="text-white flex items-center">
              <img src={scheduleIcon} alt="Schedule Icon" className="mr-2" />
              Schedules
            </li>
            <li className="text-white flex items-center">
              <img src={userIcon} alt="User Icon" className="mr-2" />
              Users
            </li>
            <li className="text-white flex items-center">
              <img src={settingIcon} alt="Setting Icon" className="mr-2" />
              Settings
            </li>
          </ul>
        </div>
        <div className="flex-grow"></div>{" "}
        <div className="flex flex-col mb-4 cursor-pointer">
          <div className="text-white">Help</div>
          <div className="text-white">Contact Us</div>
        </div>
      </div>

      {/* right */}
      <div className=" w-3/6 md:w-full flex flex-col m-3 rounded-3xl p-2">
        <div className="md:flex md:justify-between">
          <div className="text-lg font-bold">Dashboard</div>

          <div className="flex items-center space-x-2">
            <div className="relative flex items-center justify-between w-full">
              <input
                type="search"
                placeholder="Search..."
                className="text-[#B0B0B0] rounded-lg w-full pl-2 pr-10 text-xs lg:p-3"
              />
              <img
                src={SearchIcon}
                alt="Search Icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[10px] h-4 cursor-pointer"
              />
            </div>
            <img src={Notification} alt="Notification Icon" className="w-4" />
            <img
              src={user.picture}
              alt="Profile Picture"
              className="w-7 rounded-xl"
            />
          </div>
        </div>

        {data && (
          <div className="flex flex-col space-y-1 mt-[5px]">
            <div className="flex flex-col gap-2 md:flex-row lg:justify-between">
              <h2 className="text-sm bg-[#DDEFE0] p-1 rounded-md flex items-center justify-between md:p-5 md:text-xs">
                <span>
                  Total Revenues:{" "}
                  <span className="font-semibold md:font-bold">
                    ${data.data[0].value}
                  </span>
                </span>
                <img
                  src={TotalRevenues}
                  alt="Total Revenues Icon"
                  className="ml-2 w-[14px]"
                />
              </h2>
              <h2 className="text-sm bg-[#F4ECDD] p-1 rounded-md flex items-center justify-between md:p-5 md:text-xs">
                <span>
                  Total Transactions:{" "}
                  <span className="font-semibold md:font-bold">
                    {data.data[1].value}
                  </span>
                </span>
                <img
                  src={total_transactions_icon}
                  alt="Total Transactions Icon"
                  className="ml-2 w-[14px] "
                />
              </h2>
              <h2 className="text-sm bg-[#EFDADA] p-1 rounded-md flex items-center justify-between md:p-5 md:text-xs">
                <span>
                  Total Likes:{" "}
                  <span className="font-semibold md:font-bold">
                    {data.data[2].value}
                  </span>
                </span>
                <img src={like} alt="Like Icon" className="ml-2 w-[14px]" />
              </h2>
              <h2 className="text-sm bg-[#DEE0EF] p-1 rounded-md flex items-center justify-between md:p-5 md:text-xs">
                <span>
                  Total Users:{" "}
                  <span className="font-semibold md:font-bold">
                    {data.data[3].value}
                  </span>
                </span>
                <img
                  src={TotalUsers}
                  alt="Total Users Icon"
                  className="ml-2 w-[14px]"
                />
              </h2>
            </div>

            {/* Line Chart */}
            <div className="bg-white mt-5 flex flex-col rounded-2xl p-1 overflow-x-auto  md:mt-3 md:h-[33vh]">
              <h2 className="text-sm font-bold">Activities</h2>
              <span className="text-xs text-[#858585] flex items-center">
                May - June 2021
                <img src={down} alt="Down icon" className="ml-1" />
              </span>
              <div
                id="lineChartContainer"
                className="h-[87px] w-[174px]
                md:w-[50vw] md:h-[182px] lg:w-[600px] lg:h-[300px] xl:w-[800px] xl:h-[184px]"
              ></div>
            </div>

            {/* Pie Chart */}
            <div className="md:flex md:flex-row md:space-x-3 h-9 md:h-[42vh] md:justify-between md:mt-3 lg:h-[46vh]">
              <div className="bg-white  flex flex-col rounded-2xl md:w-[46%] md:p-4 lg:mt-[14px]">
                <h2 className="text-sm font-bold lg:text-2xl ">Top Products</h2>
                <span className="text-xs text-[#858585] flex items-center">
                  May - June 2021
                  <img src={down} alt="Down icon" className="ml-1" />
                </span>

                <div
                  id="pieChartContainer"
                  className="h-[72px] w-[72px]
                  md:w-[50vw] md:h-[182px] lg:w-[332px] lg:h-[283px] xl:w-[328px] xl:h-[400px]"
                ></div>
              </div>

              <div className="bg-white  flex flex-col rounded-2xl pl-2 text-sm mt-3 md:p-2 md:w-[51%]">
                <h2 className="text-sm font-bold lg:text-2xl">
                  Today's Schedule:
                </h2>
                <ul>
                  {data.todaysSchedule.map((item, index) => (
                    <li
                      key={index}
                      className={`mt-2 relative ${
                        index % 2 === 0
                          ? "border-l-4 border-green-500"
                          : "border-l-4 border-blue-500"
                      }`}
                    >
                      <div className="pl-4 ">
                        <strong className="text-sm text-gray-600 lg:text-xl">
                          {item.meetingTitle}
                        </strong>{" "}
                        <br />
                        <p className="text-sm text-gray-600 lg:text-lg">
                          {item.time}
                        </p>{" "}
                        
                        <p className="text-sm text-gray-600 lg:text-lg">
                          {item.location}
                        </p>{" "}
                        
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

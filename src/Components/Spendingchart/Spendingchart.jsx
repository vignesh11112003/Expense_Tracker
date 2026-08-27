import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { useExpenses } from "../../Context/ExpenseContext";

import "./Spendingchart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Spendingchart() {

  const { expenses } = useExpenses();

  const currentDate = new Date();

  const currentYear =
    currentDate.getFullYear();

  // --------------------------------
  // MONTHS
  // --------------------------------
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // --------------------------------
  // MONTHLY SPENDING
  // --------------------------------
  const monthlySpending = months.map(
    (_, monthIndex) => {

      return expenses
        .filter((expense) => {

          const expenseDate =
            new Date(expense.date);

          return (
            expenseDate.getMonth() === monthIndex &&
            expenseDate.getFullYear() === currentYear
          );
        })
        .reduce(
          (total, expense) =>
            total + Number(expense.amount),
          0
        );
    }
  );

  // --------------------------------
  // CHART DATA
  // --------------------------------
  const data = {

    labels: months,

    datasets: [
      {
        label: "Monthly Spending",

        data: monthlySpending,

        backgroundColor: "#2f8f68",

        borderRadius: 6,

        barThickness: 28,
      },
    ],
  };

  // --------------------------------
  // CHART OPTIONS
  // --------------------------------
  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false,
      },

      tooltip: {

        callbacks: {

          label: function (context) {

            return `₹${Number(
              context.raw
            ).toLocaleString("en-IN")}`;

          },

        },

      },

    },

    scales: {

      x: {

        grid: {
          display: false,
        },

        ticks: {

          color: "#71847c",

          font: {
            size: 12,
          },

        },

      },

      y: {

        beginAtZero: true,

        grid: {

          color: "#edf1ef",

        },

        ticks: {

          color: "#71847c",

          callback: function (value) {

            if (value >= 1000) {
              return (
                "₹" +
                value / 1000 +
                "k"
              );
            }

            return "₹" + value;
          },

        },

      },

    },

  };

  return (

    <div className="spending-chart-card">

      {/* Header */}
      <div className="spending-chart-header">

        <div>

          <h3>
            Monthly Spending
          </h3>

          <p>
            Your spending over the year
          </p>

        </div>

        <button
          type="button"
          className="spending-filter"
        >

          {currentYear}

          <span>
            ⌄
          </span>

        </button>

      </div>

      {/* Chart */}
      <div className="spending-chart">

        <Bar
          data={data}
          options={options}
        />

      </div>

    </div>

  );
}

export default Spendingchart;
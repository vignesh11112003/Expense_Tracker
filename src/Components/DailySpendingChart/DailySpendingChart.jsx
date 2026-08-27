import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { useExpenses } from "../../Context/ExpenseContext";

import "./DailySpendingChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function DailySpendingChart() {
  const { expenses } = useExpenses();

  const currentDate = new Date();

  const currentMonth =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();

  // --------------------------------
  // CURRENT MONTH EXPENSES
  // --------------------------------
  const monthlyExpenses = expenses.filter(
    (expense) => {
      const expenseDate =
        new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    }
  );

  // --------------------------------
  // DAYS IN CURRENT MONTH
  // --------------------------------
  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // --------------------------------
  // DAY LABELS
  // --------------------------------
  const labels = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  // --------------------------------
  // DAILY SPENDING
  // --------------------------------
  const dailyAmounts = labels.map(
    (day) => {
      return monthlyExpenses
        .filter((expense) => {
          const expenseDate =
            new Date(expense.date);

          return (
            expenseDate.getDate() === day
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
    labels,

    datasets: [
      {
        label: "Daily Spending",

        data: dailyAmounts,

        borderColor: "#2f8f68",

        backgroundColor:
          "rgba(47, 143, 104, 0.08)",

        borderWidth: 2,

        pointRadius: 3,

        pointHoverRadius: 6,

        tension: 0.4,

        fill: true,
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
            size: 11,
          },

          maxTicksLimit: 10,
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#edf1ef",
        },

        ticks: {
          color: "#71847c",

          font: {
            size: 11,
          },

          callback: function (value) {
            return (
              "₹" +
              Number(value).toLocaleString(
                "en-IN"
              )
            );
          },
        },
      },
    },
  };

  // --------------------------------
  // MONTH NAME
  // --------------------------------
  const monthName =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  const hasExpenses =
    monthlyExpenses.length > 0;

  return (
    <div className="daily-chart-card">

      {/* Header */}
      <div className="daily-chart-header">

        <div>
          <h3>
            Daily Spending
          </h3>

          <p>
            Your spending activity this month
          </p>
        </div>

        <button
          type="button"
          className="daily-filter"
        >
          {monthName}

          <span>
            ⌄
          </span>
        </button>

      </div>

      {/* Chart */}
      <div className="daily-chart">

        {hasExpenses ? (
          <Line
            data={data}
            options={options}
          />
        ) : (
          <div className="empty-chart">
            No expenses this month
          </div>
        )}

      </div>

    </div>
  );
}

export default DailySpendingChart;
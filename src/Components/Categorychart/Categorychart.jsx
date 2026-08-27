import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { useExpenses } from "../../Context/ExpenseContext";

import "./Categorychart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Categorychart() {
  const { expenses } = useExpenses();

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
  ];

  // --------------------------------
  // CURRENT MONTH
  // --------------------------------
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // --------------------------------
  // CURRENT MONTH EXPENSES
  // --------------------------------
  const monthlyExpenses = expenses.filter(
    (expense) => {
      const expenseDate = new Date(
        expense.date
      );

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    }
  );

  // --------------------------------
  // TOTAL SPENT
  // --------------------------------
  const totalSpent = monthlyExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  // --------------------------------
  // CATEGORY AMOUNTS
  // --------------------------------
  const categoryAmounts = categories.map(
    (category) => {
      return monthlyExpenses
        .filter(
          (expense) =>
            expense.category === category
        )
        .reduce(
          (total, expense) =>
            total + Number(expense.amount),
          0
        );
    }
  );

  // --------------------------------
  // CATEGORY PERCENTAGES
  // --------------------------------
  const categoryPercentages =
    categoryAmounts.map((amount) => {
      if (totalSpent === 0) {
        return 0;
      }

      return Math.round(
        (amount / totalSpent) * 100
      );
    });

  // --------------------------------
  // CHART DATA
  // --------------------------------
  const data = {
    labels: categories,

    datasets: [
      {
        data: categoryAmounts,

        backgroundColor: [
          "#2f8f68",
          "#4d91b8",
          "#e09a3e",
          "#8a6bb8",
          "#d76b6b",
        ],

        borderWidth: 0,

        hoverOffset: 5,
      },
    ],
  };

  // --------------------------------
  // CHART OPTIONS
  // --------------------------------
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const amount = Number(
              context.raw
            );

            const percentage =
              totalSpent > 0
                ? Math.round(
                    (amount / totalSpent) * 100
                  )
                : 0;

            return `${context.label}: ₹${amount.toLocaleString(
              "en-IN"
            )} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="category-chart-card">

      {/* Header */}
      <div className="category-chart-header">

        <div>
          <h3>
            Spending by Category
          </h3>

          <p>
            Where your money goes
          </p>
        </div>

        <button
          type="button"
          className="category-filter"
        >
          This Month
          <span>⌄</span>
        </button>

      </div>

      {/* Donut */}
      <div className="donut-container">

        {totalSpent > 0 ? (
          <Doughnut
            data={data}
            options={options}
          />
        ) : (
          <div className="empty-chart">
            No expenses this month
          </div>
        )}

        {totalSpent > 0 && (
          <div className="donut-center">

            <strong>
              ₹{totalSpent.toLocaleString("en-IN")}
            </strong>

            <span>
              Total Spent
            </span>

          </div>
        )}

      </div>

      {/* Legend */}
      <div className="category-list">

        {categories.map(
          (category, index) => (
            <div
              className="category-item"
              key={category}
            >

              <div className="category-name">

                <span
                  className={`category-dot ${category.toLowerCase()}`}
                ></span>

                {category}

              </div>

              <strong>
                {categoryPercentages[index]}%
              </strong>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Categorychart;
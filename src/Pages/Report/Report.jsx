import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

import { useExpenses } from "../../Context/ExpenseContext";

import "./Report.css";


// ---------------------------------------------
// Chart.js Registration
// ---------------------------------------------

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);


// ---------------------------------------------
// Categories
// ---------------------------------------------

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
];


function Report() {

  const { expenses } = useExpenses();


  // ---------------------------------------------
  // Current Date
  // ---------------------------------------------

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();


  // ---------------------------------------------
  // Current Month Expenses
  // ---------------------------------------------

  const monthlyExpenses = expenses.filter((expense) => {

    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );

  });


  // ---------------------------------------------
  // Total Spent
  // ---------------------------------------------

  const totalSpent = monthlyExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );


  // ---------------------------------------------
  // Unique Spending Days
  // ---------------------------------------------

  const uniqueDates = new Set(
    monthlyExpenses.map(
      (expense) => expense.date
    )
  );


  // ---------------------------------------------
  // Average Daily Spending
  // ---------------------------------------------

  const averageDaily =
    uniqueDates.size > 0
      ? totalSpent / uniqueDates.size
      : 0;


  // ---------------------------------------------
  // Highest Expense
  // ---------------------------------------------

  const highestExpense =
    monthlyExpenses.length > 0
      ? Math.max(
          ...monthlyExpenses.map(
            (expense) =>
              Number(expense.amount)
          )
        )
      : 0;


  const highestExpenseData =
    monthlyExpenses.find(
      (expense) =>
        Number(expense.amount) ===
        highestExpense
    );


  // ---------------------------------------------
  // Transaction Count
  // ---------------------------------------------

  const transactionCount =
    monthlyExpenses.length;


  // ---------------------------------------------
  // Month Name
  // ---------------------------------------------

  const monthName =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );


  // ---------------------------------------------
  // Monthly Spending Chart
  // ---------------------------------------------

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


  const monthlySpending =
    months.map((_, index) => {

      return expenses
        .filter((expense) => {

          const expenseDate =
            new Date(expense.date);

          return (
            expenseDate.getMonth() === index &&
            expenseDate.getFullYear() ===
              currentYear
          );

        })
        .reduce(
          (total, expense) =>
            total +
            Number(expense.amount),
          0
        );

    });


  // ---------------------------------------------
  // Chart Data
  // ---------------------------------------------

  const chartData = {

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


  // ---------------------------------------------
  // Chart Options
  // ---------------------------------------------

  const chartOptions = {

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


  // ---------------------------------------------
  // Top 3 Expenses
  // ---------------------------------------------

  const topExpenses = [
    ...monthlyExpenses,
  ]
    .sort(
      (a, b) =>
        Number(b.amount) -
        Number(a.amount)
    )
    .slice(0, 3);


  // ---------------------------------------------
  // JSX
  // ---------------------------------------------

  return (

    <div className="reports-page">

      {/* Sidebar */}

      <Sidebar />


      <main className="reports-main">

        {/* Topbar */}

        <Topbar />


        {/* -------------------------------------
            Header
        ------------------------------------- */}

        <section className="reports-header">

          <div>

            <h1>
              Reports
            </h1>

            <p>
              Analyze your spending and
              understand your financial habits.
            </p>

          </div>


          <div className="reports-month">

            {monthName}

          </div>

        </section>


        {/* -------------------------------------
            Summary Cards
        ------------------------------------- */}

        <section className="report-summary">


          {/* Total Spent */}

          <div className="report-card">

            <span className="report-label">
              Total Spent
            </span>

            <strong>
              ₹
              {totalSpent.toLocaleString(
                "en-IN"
              )}
            </strong>

            <small className="positive">
              {monthName}
            </small>

          </div>


          {/* Average Daily */}

          <div className="report-card">

            <span className="report-label">
              Average Daily
            </span>

            <strong>
              ₹
              {Math.round(
                averageDaily
              ).toLocaleString(
                "en-IN"
              )}
            </strong>

            <small>
              Based on{" "}
              {uniqueDates.size} days
            </small>

          </div>


          {/* Highest Spending */}

          <div className="report-card">

            <span className="report-label">
              Highest Spending
            </span>

            <strong>
              ₹
              {highestExpense.toLocaleString(
                "en-IN"
              )}
            </strong>

            <small>

              {highestExpenseData
                ? new Date(
                    highestExpenseData.date
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "No expenses"}

            </small>

          </div>


          {/* Transactions */}

          <div className="report-card">

            <span className="report-label">
              Transactions
            </span>

            <strong>
              {transactionCount}
            </strong>

            <small>
              {monthName}
            </small>

          </div>

        </section>


        {/* -------------------------------------
            Charts
        ------------------------------------- */}

        <section className="report-charts">


          {/* Monthly Spending */}

          <div className="report-chart-card">

            <div className="report-card-header">

              <div>

                <h3>
                  Monthly Spending
                </h3>

                <p>
                  Spending comparison for{" "}
                  {currentYear}
                </p>

              </div>

            </div>


            <div className="report-chart">

              <Bar
                data={chartData}
                options={chartOptions}
              />

            </div>

          </div>


          {/* Category Breakdown */}

          <div className="report-chart-card">

            <div className="report-card-header">

              <div>

                <h3>
                  Category Breakdown
                </h3>

                <p>
                  Where your money goes
                </p>

              </div>

            </div>


            <div className="report-category-list">

              {categories.map(
                (category) => (

                  <CategoryItem
                    key={category}
                    category={category}
                    expenses={
                      monthlyExpenses
                    }
                    total={
                      totalSpent
                    }
                  />

                )
              )}

            </div>

          </div>

        </section>


        {/* -------------------------------------
            Top Expenses
        ------------------------------------- */}

        <section className="top-expenses-card">

          <div className="report-card-header">

            <div>

              <h3>
                Top Expenses
              </h3>

              <p>
                Your highest expenses this month
              </p>

            </div>

          </div>


          <div className="top-expenses-list">

            {topExpenses.length > 0 ? (

              topExpenses.map(
                (expense) => (

                  <div
                    className="top-expense-item"
                    key={expense.id}
                  >


                    <div className="top-expense-left">


                      <div className="top-expense-icon">

                        {getCategoryIcon(
                          expense.category
                        )}

                      </div>


                      <div>

                        <strong>
                          {expense.title}
                        </strong>

                        <span>

                          {expense.category}

                          {" · "}

                          {new Date(
                            expense.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}

                        </span>

                      </div>

                    </div>


                    <strong>

                      ₹
                      {Number(
                        expense.amount
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </strong>

                  </div>

                )
              )

            ) : (

              <div className="report-empty">

                <span>
                  💸
                </span>

                <p>
                  No expenses this month
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>

  );
}


// ---------------------------------------------
// Category Item
// ---------------------------------------------

function CategoryItem({
  category,
  expenses,
  total,
}) {

  const categoryTotal =
    expenses
      .filter(
        (expense) =>
          expense.category ===
          category
      )
      .reduce(
        (sum, expense) =>
          sum +
          Number(expense.amount),
        0
      );


  const percentage =
    total > 0
      ? Math.round(
          (categoryTotal / total) *
            100
        )
      : 0;


  return (

    <div className="report-category">

      <div>

        <span
          className={`report-dot ${category.toLowerCase()}`}
        ></span>

        <span>
          {category}
        </span>

      </div>


      <div className="report-category-right">

        <span>
          ₹
          {categoryTotal.toLocaleString(
            "en-IN"
          )}
        </span>

        <strong>
          {percentage}%
        </strong>

      </div>

    </div>

  );
}


// ---------------------------------------------
// Category Icons
// ---------------------------------------------

function getCategoryIcon(category) {

  switch (category) {

    case "Food":
      return "🍔";

    case "Transport":
      return "🚕";

    case "Shopping":
      return "🛍️";

    case "Bills":
      return "💡";

    case "Entertainment":
      return "🎬";

    default:
      return "💰";

  }

}


export default Report;
import { useExpenses } from "../../Context/ExpenseContext";

import "./Summarycard.css";

function SummaryCards() {

  const { expenses } = useExpenses();

  // --------------------------------
  // CURRENT DATE
  // --------------------------------
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
  // TOTAL SPENT
  // --------------------------------
  const totalSpent = monthlyExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  // --------------------------------
  // MONTHLY BUDGET
  // --------------------------------
  const monthlyBudget = 40000;

  // --------------------------------
  // REMAINING
  // --------------------------------
  const remainingBudget =
    monthlyBudget - totalSpent;

  // --------------------------------
  // REMAINING PERCENTAGE
  // --------------------------------
  const remainingPercentage =
    monthlyBudget > 0
      ? (remainingBudget / monthlyBudget) * 100
      : 0;

  // --------------------------------
  // TRANSACTION COUNT
  // --------------------------------
  const transactionCount =
    monthlyExpenses.length;

  // --------------------------------
  // CURRENT MONTH NAME
  // --------------------------------
  const monthName =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  return (

    <section className="summary-cards">

      {/* Total Spent */}
      <div className="summary-card">

        <div className="card-top">

          <div>

            <p className="card-label">
              Total Spent
            </p>

            <h2>
              ₹{totalSpent.toLocaleString("en-IN")}
            </h2>

          </div>

          <div className="card-icon green-icon">
            ₹
          </div>

        </div>

        <div className="card-footer">

          <span className="positive">
            {monthName}
          </span>

          <span>
            spending
          </span>

        </div>

      </div>

      {/* Monthly Budget */}
      <div className="summary-card">

        <div className="card-top">

          <div>

            <p className="card-label">
              Monthly Budget
            </p>

            <h2>
              ₹{monthlyBudget.toLocaleString("en-IN")}
            </h2>

          </div>

          <div className="card-icon blue-icon">
            ◉
          </div>

        </div>

        <div className="card-footer">

          <span>
            {monthName}
          </span>

        </div>

      </div>

      {/* Remaining Budget */}
      <div className="summary-card">

        <div className="card-top">

          <div>

            <p className="card-label">
              Remaining
            </p>

            <h2>
              ₹
              {Math.max(
                remainingBudget,
                0
              ).toLocaleString("en-IN")}
            </h2>

          </div>

          <div className="card-icon orange-icon">
            ↗
          </div>

        </div>

        <div className="card-footer">

          <span className="remaining">

            {Math.max(
              remainingPercentage,
              0
            ).toFixed(1)}%

          </span>

          <span>
            remaining
          </span>

        </div>

      </div>

      {/* Transactions */}
      <div className="summary-card">

        <div className="card-top">

          <div>

            <p className="card-label">
              Transactions
            </p>

            <h2>
              {transactionCount}
            </h2>

          </div>

          <div className="card-icon purple-icon">
            ≡
          </div>

        </div>

        <div className="card-footer">

          <span>
            This month
          </span>

        </div>

      </div>

    </section>
  );
}

export default SummaryCards;
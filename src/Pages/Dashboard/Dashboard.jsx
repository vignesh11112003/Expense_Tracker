import { useState } from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import SummaryCards from "../../Components/Summarycard/Summarycard";
import Categorychart from "../../Components/Categorychart/Categorychart";
import DailySpendingChart from "../../Components/DailySpendingChart/DailySpendingChart";
import Spendingchart from "../../Components/Spendingchart/Spendingchart";
import AddExpense from "../../Components/AddExpense/AddExpense";

import "./Dashboard.css";


function Dashboard() {

  const [showAddExpense, setShowAddExpense] = useState(false);


  // --------------------------------
  // Get Logged-in User
  // --------------------------------

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;


  const userName = user?.name || "User";


  return (

    <div className="dashboard">


      {/* Sidebar */}

      <Sidebar />


      <main className="dashboard-main">


        {/* Topbar */}

        <Topbar />


        {/* Dashboard Header */}

        <section className="dashboard-header">

          <div className="header-content">

            <h1>

              Good morning, {userName}! <span>👋</span>

            </h1>


            <p>

              Here's your expense overview for August 2026.

            </p>

          </div>


          {/* Add Expense Button */}

          <button
            className="add-expense-btn"
            onClick={() => setShowAddExpense(true)}
          >

            <span>
              +
            </span>

            Add Expense

          </button>

        </section>


        {/* Summary Cards */}

        <SummaryCards />


        {/* Spending + Category Charts */}

        <div className="charts-section">

          <Spendingchart />

          <Categorychart />

        </div>


        {/* Daily Spending */}

        <div className="daily-chart-section">

          <DailySpendingChart />

        </div>


      </main>


      {/* Add Expense Modal */}

      {showAddExpense && (

        <AddExpense
          onClose={() => setShowAddExpense(false)}
        />

      )}


    </div>

  );

}


export default Dashboard;
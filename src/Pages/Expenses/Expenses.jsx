import { useMemo, useState } from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import AddExpense from "../../Components/AddExpense/AddExpense";

import { useExpenses } from "../../Context/ExpenseContext";

import "./Expenses.css";


function Expenses() {

  const {
    expenses,
    deleteExpense,
  } = useExpenses();


  // ---------------------------------------------
  // States
  // ---------------------------------------------

  const [showAddExpense, setShowAddExpense] =
    useState(false);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [dateFilter, setDateFilter] =
    useState("All Dates");

  const [sortOrder, setSortOrder] =
    useState("Latest");

  const [openMenu, setOpenMenu] =
    useState(null);


  // ---------------------------------------------
  // Filter + Sort
  // ---------------------------------------------

  const filteredExpenses = useMemo(() => {

    let result = [...expenses];


    // Search

    if (search.trim() !== "") {

      const searchValue =
        search.toLowerCase();

      result = result.filter(
        (expense) => {

          return (

            expense.title
              .toLowerCase()
              .includes(searchValue)

            ||

            expense.category
              .toLowerCase()
              .includes(searchValue)

            ||

            expense.paymentMethod
              .toLowerCase()
              .includes(searchValue)

            ||

            (
              expense.description || ""
            )
              .toLowerCase()
              .includes(searchValue)

          );

        }
      );

    }


    // Category

    if (
      category !== "All Categories"
    ) {

      result = result.filter(
        (expense) =>
          expense.category ===
          category
      );

    }


    // Date

    const today = new Date();


    if (
      dateFilter !== "All Dates"
    ) {

      result = result.filter(
        (expense) => {

          const expenseDate =
            new Date(expense.date);


          // Today

          if (
            dateFilter === "Today"
          ) {

            return (
              expenseDate.toDateString() ===
              today.toDateString()
            );

          }


          // This Week

          if (
            dateFilter === "This Week"
          ) {

            const startOfWeek =
              new Date(today);

            startOfWeek.setDate(
              today.getDate() -
              today.getDay()
            );

            startOfWeek.setHours(
              0,
              0,
              0,
              0
            );


            const endOfWeek =
              new Date(startOfWeek);

            endOfWeek.setDate(
              startOfWeek.getDate() + 6
            );

            endOfWeek.setHours(
              23,
              59,
              59,
              999
            );


            return (
              expenseDate >=
                startOfWeek &&
              expenseDate <=
                endOfWeek
            );

          }


          // This Month

          if (
            dateFilter ===
            "This Month"
          ) {

            return (

              expenseDate.getMonth() ===
                today.getMonth()

              &&

              expenseDate.getFullYear() ===
                today.getFullYear()

            );

          }


          return true;

        }
      );

    }


    // -----------------------------------------
    // Sorting
    // -----------------------------------------

    result.sort((a, b) => {

      if (
        sortOrder === "Latest"
      ) {

        return (
          new Date(b.date) -
          new Date(a.date)
        );

      }


      if (
        sortOrder === "Oldest"
      ) {

        return (
          new Date(a.date) -
          new Date(b.date)
        );

      }


      if (
        sortOrder === "Highest"
      ) {

        return (
          Number(b.amount) -
          Number(a.amount)
        );

      }


      if (
        sortOrder === "Lowest"
      ) {

        return (
          Number(a.amount) -
          Number(b.amount)
        );

      }


      return 0;

    });


    return result;

  }, [
    expenses,
    search,
    category,
    dateFilter,
    sortOrder,
  ]);


  // ---------------------------------------------
  // Add Expense
  // ---------------------------------------------

  function handleAddExpense() {

    setEditingExpense(null);

    setShowAddExpense(true);

  }


  // ---------------------------------------------
  // Edit Expense
  // ---------------------------------------------

  function handleEdit(expense) {

    setEditingExpense(expense);

    setShowAddExpense(true);

    setOpenMenu(null);

  }


  // ---------------------------------------------
  // Delete Expense
  // ---------------------------------------------

  function handleDelete(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this expense?"
      );


    if (!confirmed) {
      return;
    }


    deleteExpense(id);

    setOpenMenu(null);

  }


  // ---------------------------------------------
  // Category Icon
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


  // ---------------------------------------------
  // JSX
  // ---------------------------------------------

  return (

    <div className="expenses-page">


      {/* Sidebar */}

      <Sidebar />


      <main className="expenses-main">


        {/* Topbar */}

        <Topbar />


        {/* ---------------------------------------
            Header
        --------------------------------------- */}

        <section className="expenses-header">

          <div>

            <h1>
              Expenses
            </h1>

            <p>
              Track and manage your daily expenses.
            </p>

          </div>


          <button
            className="add-expense-btn"
            onClick={handleAddExpense}
          >

            <span>
              +
            </span>

            Add Expense

          </button>

        </section>


        {/* ---------------------------------------
            Filters
        --------------------------------------- */}

        <section className="expense-filters">


          {/* Search */}

          <div className="expense-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Category */}

          <select
            className="expense-filter"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option>
              All Categories
            </option>

            <option>
              Food
            </option>

            <option>
              Transport
            </option>

            <option>
              Shopping
            </option>

            <option>
              Bills
            </option>

            <option>
              Entertainment
            </option>

          </select>


          {/* Date */}

          <select
            className="expense-filter"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
          >

            <option>
              All Dates
            </option>

            <option>
              Today
            </option>

            <option>
              This Week
            </option>

            <option>
              This Month
            </option>

          </select>

        </section>


        {/* ---------------------------------------
            Table Card
        --------------------------------------- */}

        <section className="expense-table-card">


          {/* Table Header */}

          <div className="table-header">

            <div>

              <h3>
                Recent Expenses
              </h3>

              <p>

                {filteredExpenses.length}{" "}

                {filteredExpenses.length === 1
                  ? "transaction"
                  : "transactions"}

                {" "}found

              </p>

            </div>


            {/* Sort */}

            <select
              className="sort-btn"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
            >

              <option value="Latest">
                Latest
              </option>

              <option value="Oldest">
                Oldest
              </option>

              <option value="Highest">
                Highest Amount
              </option>

              <option value="Lowest">
                Lowest Amount
              </option>

            </select>

          </div>


          {/* ---------------------------------------
              Table
          --------------------------------------- */}

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Date
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredExpenses.length > 0 ? (

                  filteredExpenses.map(
                    (expense) => (

                      <tr
                        key={expense.id}
                      >


                        {/* Date */}

                        <td>

                          {new Date(
                            expense.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </td>


                        {/* Description */}

                        <td>

                          <div className="expense-description">


                            <div
                              className={`expense-icon ${expense.category.toLowerCase()}-icon`}
                            >

                              {getCategoryIcon(
                                expense.category
                              )}

                            </div>


                            <div>

                              <strong>
                                {expense.title}
                              </strong>

                              <span>

                                {expense.description ||
                                  "No description"}

                              </span>

                            </div>

                          </div>

                        </td>


                        {/* Category */}

                        <td>

                          <span
                            className={`category-badge ${expense.category.toLowerCase()}-badge`}
                          >

                            {expense.category}

                          </span>

                        </td>


                        {/* Amount */}

                        <td className="expense-amount">

                          ₹
                          {Number(
                            expense.amount
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </td>


                        {/* Payment */}

                        <td>

                          {expense.paymentMethod}

                        </td>


                        {/* Action */}

                        <td className="action-cell">

                          <button
                            type="button"
                            className="action-btn"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  expense.id
                                  ? null
                                  : expense.id
                              )
                            }
                          >

                            ⋮

                          </button>


                          {openMenu ===
                            expense.id && (

                            <div className="action-menu">

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    expense
                                  )
                                }
                              >

                                ✏️ Edit

                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    expense.id
                                  )
                                }
                              >

                                🗑 Delete

                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-expenses"
                    >

                      <div>

                        <span>
                          💸
                        </span>

                        <h3>
                          No expenses found
                        </h3>

                        <p>
                          Try changing your
                          search or filters.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* ---------------------------------------
              Footer
          --------------------------------------- */}

          <div className="table-footer">

            <span>

              Showing{" "}
              {filteredExpenses.length}
              {" "}of{" "}
              {expenses.length}
              {" "}expenses

            </span>


            <div className="pagination">

              <button
                type="button"
                disabled
              >
                ‹
              </button>

              <button
                type="button"
                className="active-page"
              >
                1
              </button>

              <button
                type="button"
                disabled
              >
                ›
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* ---------------------------------------
          Add / Edit Modal
      --------------------------------------- */}

      {showAddExpense && (

        <AddExpense

          editExpense={
            editingExpense
          }

          onClose={() => {

            setShowAddExpense(false);

            setEditingExpense(null);

          }}

        />

      )}

    </div>

  );

}


export default Expenses;
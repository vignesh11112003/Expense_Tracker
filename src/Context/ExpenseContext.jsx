import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ExpenseContext = createContext();

const API_URL = "http://localhost:6500/expenses";

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // GET EXPENSES
  // --------------------------------

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();

      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // LOAD DATA
  // --------------------------------

  useEffect(() => {
    fetchExpenses();
  }, []);

  // --------------------------------
  // ADD EXPENSE
  // --------------------------------

  const addExpense = async (newExpense) => {
    try {
      const expense = {
        title: newExpense.title,
        amount: Number(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        paymentMethod: newExpense.paymentMethod,
        description:
          newExpense.description || "No description",
      };

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const createdExpense = await response.json();

      setExpenses((previousExpenses) => [
        createdExpense,
        ...previousExpenses,
      ]);

      return createdExpense;
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  };

  // --------------------------------
  // UPDATE EXPENSE
  // --------------------------------

  const updateExpense = async (id, updatedExpense) => {
    try {
      const expense = {
        ...updatedExpense,
        amount: Number(updatedExpense.amount),
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      const updatedData = await response.json();

      setExpenses((previousExpenses) =>
        previousExpenses.map((item) =>
          item.id === id ? updatedData : item
        )
      );

      return updatedData;
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  };

  // --------------------------------
  // DELETE EXPENSE
  // --------------------------------

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((previousExpenses) =>
        previousExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        loading,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
}
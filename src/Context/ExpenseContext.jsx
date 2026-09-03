import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // LOAD EXPENSES FROM LOCAL STORAGE
  // --------------------------------

  const fetchExpenses = () => {
    try {
      setLoading(true);

      const savedExpenses =
        localStorage.getItem("expenses");

      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error(
        "Error loading expenses:",
        error
      );

      setExpenses([]);
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
  // SAVE EXPENSES TO LOCAL STORAGE
  // --------------------------------

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
      );
    }
  }, [expenses, loading]);

  // --------------------------------
  // ADD EXPENSE
  // --------------------------------

  const addExpense = async (newExpense) => {
    try {
      const expense = {
        id: Date.now(),

        title: newExpense.title,

        amount: Number(newExpense.amount),

        category: newExpense.category,

        date: newExpense.date,

        paymentMethod:
          newExpense.paymentMethod,

        description:
          newExpense.description ||
          "No description",
      };

      setExpenses((previousExpenses) => [
        expense,
        ...previousExpenses,
      ]);

      return expense;
    } catch (error) {
      console.error(
        "Error adding expense:",
        error
      );

      throw error;
    }
  };

  // --------------------------------
  // UPDATE EXPENSE
  // --------------------------------

  const updateExpense = async (
    id,
    updatedExpense
  ) => {
    try {
      const expense = {
        ...updatedExpense,

        id,

        amount: Number(
          updatedExpense.amount
        ),
      };

      setExpenses((previousExpenses) =>
        previousExpenses.map((item) =>
          item.id === id
            ? expense
            : item
        )
      );

      return expense;
    } catch (error) {
      console.error(
        "Error updating expense:",
        error
      );

      throw error;
    }
  };

  // --------------------------------
  // DELETE EXPENSE
  // --------------------------------

  const deleteExpense = async (id) => {
    try {
      setExpenses((previousExpenses) =>
        previousExpenses.filter(
          (expense) =>
            expense.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error
      );

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
  const context =
    useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
}
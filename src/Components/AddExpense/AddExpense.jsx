import { useState } from "react";

import { useExpenses } from "../../Context/ExpenseContext";

import "./AddExpense.css";

function AddExpense({ onClose }) {
  const { addExpense } = useExpenses();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // --------------------------------
  // HANDLE INPUT
  // --------------------------------

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // --------------------------------
  // SUBMIT
  // --------------------------------

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date ||
      !formData.paymentMethod
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    try {
      setSaving(true);

      await addExpense(formData);

      onClose();
    } catch (error) {
      setError("Unable to save expense. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="expense-modal-overlay">
      <div className="expense-modal">

        {/* Header */}

        <div className="modal-header">

          <div>
            <h2>Add Expense</h2>

            <p>
              Record a new expense
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {/* Form */}

        <form
          className="expense-form"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Title */}

          <div className="form-group">

            <label>
              Expense Name *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
            />

          </div>

          {/* Amount */}

          <div className="form-group">

            <label>
              Amount *
            </label>

            <div className="amount-input">

              <span>₹</span>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="1"
              />

            </div>

          </div>

          {/* Category + Date */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option value="">
                  Select category
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Date *
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Payment */}

          <div className="form-group">

            <label>
              Payment Method *
            </label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >

              <option value="">
                Select payment method
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Credit / Debit Card
              </option>

              <option value="Cash">
                Cash
              </option>

              <option value="Net Banking">
                Net Banking
              </option>

            </select>

          </div>

          {/* Description */}

          <div className="form-group">

            <label>
              Notes
              <span>Optional</span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add a note about this expense..."
            />

          </div>

          {/* Buttons */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-expense-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add Expense"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddExpense;
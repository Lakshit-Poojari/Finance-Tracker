import React, { useContext, useState } from "react";
import SummaryCard from "../SummaryCard/SummaryCard";
import { TransactionContext } from "../../Context/TransactionContext";
import BalanceLineChart from "../Charts/BalanceLineCharts/BalanceLineCharts";
import ExpensePieChart from "../Charts/ExpensesPieCharts/ExpensesPieCharts";
import Insights from "../../Utils/Insight/Insight";
import "../Dashboard/Dashboard.css"

function Dashboard() {
  const { income, expense, balance, transactions, role, addTransaction, updateTransaction} = useContext(TransactionContext);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0], //  default date
  });

  //  Open Add Form
  const handleAdd = () => {
    setShowForm(true);
    setEditId(null);
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  //  Submit (Add / Update)
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.title.trim()) {
    alert("Title cannot be empty");
    return;
  }

  const updatedTransaction = {
    ...formData,
    title: formData.title.trim(),
    category: formData.category.trim(),
    amount: Number(formData.amount),
  };

  if (editId) {
    //  Update
    updateTransaction(editId, updatedTransaction);
  } else {
    //  Add
    addTransaction(updatedTransaction);
  }

  handleCancel();
};

  return (
    <div className="dashboard container">
      <h1 className="my-3">Dashboard</h1>

      <div className="add-section">

        {role === "admin" && (
          <button onClick={handleAdd} className="add-btn">
            + Add Transaction
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="form">

            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange}
             required/>

            <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange}
              required />

            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input  type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange}
              required />

            <input type="date" name="date" value={formData.date} onChange={handleChange}
              required />

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editId ? "Update" : "Save"}
              </button>

              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>

      {/*  Summary Cards */}
      <div className="cards container">
        <SummaryCard title="Total Balance" amount={balance} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expenses" amount={expense} />
      </div>

      {/*  Charts */}
      <div className="charts">
        <BalanceLineChart transactions={transactions} />
        <ExpensePieChart transactions={transactions} />
      </div>

      {/*  Insights */}
      <div>
        <Insights />
      </div>
    </div>
  );
}

export default Dashboard;
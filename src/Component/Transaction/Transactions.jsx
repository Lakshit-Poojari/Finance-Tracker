import React, { useContext, useState } from "react";
import { TransactionContext } from "../../Context/TransactionContext";
import "../Transaction/Transactions.css"

function Transactions() {
  const {
    transactions,
    filters,
    setFilters,
    role,
    deleteTransaction,
    updateTransaction, 
  } = useContext(TransactionContext);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
  });

  const categories = [...new Set(transactions.map((t) => t.category))];

  const searchTerm = search.toLowerCase();

  const filteredTransactions = transactions
    .filter((t) => {
      return (
        (filters.type === "all" || t.type === filters.type) &&
        (filters.category === "all" || t.category === filters.category) &&
        t.title.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  //  EDIT CLICK
  const handleEdit = (transaction) => {
    if (role !== "admin") return;

    setEditingId(transaction.id);
    setEditData({
      title: transaction.title,
      amount: transaction.amount,
    });
  };

  //  SAVE EDIT
  const handleSave = () => {
    updateTransaction(editingId, editData);
    setEditingId(null);
  };

  //  DELETE
  const handleDelete = (id) => {
    if (role !== "admin") return;

    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="container p-3">
      <h2 className="mb-3">Transactions</h2>

      {/*  Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/*  Table  */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                {editingId === t.id ? (
                  <>
                    {/* EDIT MODE */}
                    <td>
                      <input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                      />
                    </td>

                    <td>{t.type}</td>
                    <td>{t.category}</td>
                    <td>{t.date}</td>

                    <td>
                      <button className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* NORMAL MODE */}
                    <td>{t.title}</td>

                    <td
                      className={
                        t.type === "income" ? "text-success" : "text-danger"
                      }
                    >
                      ₹{Number(t.amount).toLocaleString()}
                    </td>

                    <td>{t.type}</td>
                    <td>{t.category}</td>
                    <td>{t.date}</td>

                    {role === "admin" && (
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(t)}
                        >
                           Edit
                        </button>

                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && <p>No data</p>}
    </div>
  );
}

export default Transactions;
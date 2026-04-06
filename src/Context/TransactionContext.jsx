import { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
  });

  const [role, setRole] = useState("viewer");

  //  LOAD + MERGE (localStorage + mock data)
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData =
          JSON.parse(localStorage.getItem("transactions")) || [];

        const res = await fetch("/data.json");
        const mockData = await res.json();

        //  Merge both
        const mergedData = [...mockData, ...storedData];

        //  Remove duplicates using id
        const uniqueData = mergedData.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setTransactions(uniqueData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  //  SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  //  FILTERED DATA
  const filteredTransactions = transactions.filter((t) => {
    if (filters.type !== "all" && t.type !== filters.type) return false;
    if (filters.category !== "all" && t.category !== filters.category)
      return false;
    return true;
  });

  //  CALCULATIONS
  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  //  CATEGORIES
  const categories = [...new Set(transactions.map((t) => t.category))];

  //  ADD TRANSACTION (🔥 IMPORTANT)
  const addTransaction = (newTransaction) => {
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;

    setTransactions((prev) => [
      ...prev,
      { ...newTransaction, id: newId },
    ]);
  };

  //  DELETE
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  //  UPDATE
  const updateTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      )
    );
  };

  return (
    <TransactionContext.Provider
      value={{transactions, filteredTransactions, filters, setFilters, categories, role, setRole, income, expense,
            balance, addTransaction, deleteTransaction, updateTransaction}}>
      {children}
    </TransactionContext.Provider>
  );
};
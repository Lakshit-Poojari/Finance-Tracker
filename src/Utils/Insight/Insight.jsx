import React, { useContext } from "react";
import { TransactionContext } from "../../Context/TransactionContext";
import "../Insight/Insight.css"

function Insights() {
  const { transactions } = useContext(TransactionContext);

  const getHighestSpendingCategory = () => {
    const expenseTransactions = transactions.filter(t => t.type === "expense");

    const categoryTotals = {};

    expenseTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    let maxCategory = "";
    let maxAmount = 0;

    for (let category in categoryTotals) {
      if (categoryTotals[category] > maxAmount) {
        maxAmount = categoryTotals[category];
        maxCategory = category;
      }
    }

    return { maxCategory, maxAmount };
  };

  const getMonthlyComparison = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth - 1;

    let currentTotal = 0;
    let lastTotal = 0;

    transactions.forEach(t => {
      if (t.type !== "expense") return;

      const tDate = new Date(t.date);
      const tMonth = tDate.getMonth();

      if (tMonth === currentMonth) currentTotal += t.amount;
      else if (tMonth === lastMonth) lastTotal += t.amount;
    });

    return { currentTotal, lastTotal };
  };

  const { maxCategory, maxAmount } = getHighestSpendingCategory();
  const { currentTotal, lastTotal } = getMonthlyComparison();

  const insights = [];

  if (maxCategory) {
    insights.push(`You spend the most on ${maxCategory} (₹${maxAmount})`);
  }

  if (currentTotal > lastTotal) {
    insights.push("Your spending increased compared to last month 📈");
  } else if (currentTotal < lastTotal) {
    insights.push("Good job! Your spending decreased 📉");
  } else {
    insights.push("Your spending is stable");
  }

  return (
    <div className="insights my-5">
      <h2 className="mb-4">Insights</h2>

      <div className="insight-list">
        {insights.map((insight, index) => (
          <div className="insight-card" key={index}>
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insights;
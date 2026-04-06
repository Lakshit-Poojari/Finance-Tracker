import {PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend} from "recharts";
import "../ExpensesPieCharts/ExpensesPieCharts.css"

const COLORS = [
  "#4f46e5", 
  "#22c55e", 
  "#f59e0b", 
  "#ef4444", 
  "#06b6d4", 
  "#d406b8", 
  "#9789e7", 
  "#d4bf06", 
];

const ExpensePieChart = ({ transactions }) => {

  const expenses = transactions.filter(
    (txn) => txn.type === "expense"
  );
  
  const categoryMap = {};

  expenses.forEach((txn) => {
    if (!categoryMap[txn.category]) {
      categoryMap[txn.category] = 0;
    }
    categoryMap[txn.category] += txn.amount;
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  return (
    <div className="chart-box">
      <h3>Spending Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            isAnimationActive={true}
            animationDuration={800}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
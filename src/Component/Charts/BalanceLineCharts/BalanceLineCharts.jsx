import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import "../BalanceLineCharts/BalanceLineCharts.css"

const BalanceLineChart = ({ transactions }) => {

  //  Convert transactions → running balance
  const chartData = [];
  let balance = 0;

  transactions.forEach((txn) => {
    if (txn.type === "income") {
      balance += txn.amount;
    } else {
      balance -= txn.amount;
    }

    chartData.push({
      date: txn.date,
      balance: balance
    });
  });

  return (
    <div className="chart-box my-3">
      <h3 className="my-5">Balance Over Time</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#4CAF50"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceLineChart;
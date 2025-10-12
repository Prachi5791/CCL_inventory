import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMonthlySaleQuery } from "../../redux/features/management/saleApi";
import { months } from "../../utils/generateDate";
import { Flex } from "antd";
import Loader from "../Loader";

const MonthlyChart = () => {
  const { data: monthlyData, isLoading } = useMonthlySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = monthlyData?.data.map(
    (item: { month: number; year: number; totalRevenue: number }) => ({
      name: `${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          stroke="#6b7280"
          style={{ fontSize: "0.85rem" }}
        />
        <YAxis stroke="#6b7280" style={{ fontSize: "0.85rem" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "0.9rem",
          }}
        />
        <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;

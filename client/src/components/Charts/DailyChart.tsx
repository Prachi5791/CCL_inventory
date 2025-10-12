import { Flex } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDailySaleQuery } from "../../redux/features/management/saleApi";
import Loader from "../Loader";
import { months } from "../../utils/generateDate";

export default function DailyChart() {
  const { data: dailyData, isLoading } = useDailySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = dailyData?.data.map(
    (item: {
      day: number;
      month: number;
      year: number;
      totalRevenue: number;
      totalQuantity: number;
    }) => ({
      name: `${item.day} ${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
      quantity: item.totalQuantity,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
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
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#16a34a"
          fill="#86efac"
          fillOpacity={0.6}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="quantity"
          stroke="#ea580c"
          fill="#fdba74"
          fillOpacity={0.6}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

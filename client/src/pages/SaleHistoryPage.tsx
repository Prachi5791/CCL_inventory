import { Col, Row } from "antd";
import HistoryTable from "../components/tables/HistoryTable";
import {
  useDailySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useYearlySaleQuery,
} from "../redux/features/management/saleApi";

const SaleHistoryPage = () => {
  const { data: yearlyData, isFetching: isYearlyDataFetching } =
    useYearlySaleQuery(undefined);
  const { data: monthlyData, isFetching: isMonthlyDataFetching } =
    useMonthlySaleQuery(undefined);
  const { data: dailySale, isFetching: isDailySaleFetching } =
    useDailySaleQuery(undefined);
  const { data: weeklySale, isFetching: isWeeklySaleFetching } =
    useWeeklySaleQuery(undefined);

  return (
    <Row
      style={{
        maxHeight: "calc(100vh - 5rem)",
        overflow: "auto",
        paddingRight: ".5rem",
        gap: "1rem",
      }}
    >
      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: ".5rem" }}>
        <div
          className="sales"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e0e0e0",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#2d3748",
              fontWeight: "600",
            }}
          >
            Yearly Sale
          </h1>
          <HistoryTable data={yearlyData} isFetching={isYearlyDataFetching} />
        </div>
      </Col>

      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: ".5rem" }}>
        <div
          className="sales"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e0e0e0",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#2d3748",
              fontWeight: "600",
            }}
          >
            Monthly Sale
          </h1>
          <HistoryTable data={monthlyData} isFetching={isMonthlyDataFetching} />
        </div>
      </Col>

      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: ".5rem" }}>
        <div
          className="sales"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e0e0e0",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#2d3748",
              fontWeight: "600",
            }}
          >
            Weekly Sale
          </h1>
          <HistoryTable data={weeklySale} isFetching={isWeeklySaleFetching} />
        </div>
      </Col>

      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: ".5rem" }}>
        <div
          className="sales"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e0e0e0",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#2d3748",
              fontWeight: "600",
            }}
          >
            Daily Sale
          </h1>
          <HistoryTable data={dailySale} isFetching={isDailySaleFetching} />
        </div>
      </Col>
    </Row>
  );
};

export default SaleHistoryPage;

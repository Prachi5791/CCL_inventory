import { Col, Flex, Row, Slider } from "antd";
import React from "react";
import { useGetAllCategoriesQuery } from "../../redux/features/management/categoryApi";
import { useGetAllBrandsQuery } from "../../redux/features/management/brandApi";

interface ProductManagementFilterProps {
  query: { name: string; category: string; brand: string; limit: number };
  setQuery: React.Dispatch<
    React.SetStateAction<{
      name: string;
      category: string;
      brand: string;
      limit: number;
    }>
  >;
}

const ProductManagementFilter = ({
  query,
  setQuery,
}: ProductManagementFilterProps) => {
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  return (
    <Flex
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        padding: "1.5rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Row gutter={16} style={{ width: "100%" }}>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label
            style={{
              fontWeight: "600",
              color: "#4b5563",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Price Range
          </label>
          <Slider
            range
            step={100}
            max={20000}
            defaultValue={[1000, 5000]}
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
            styles={{
              track: { backgroundColor: "#1890ff" },
              rail: { backgroundColor: "#e5e7eb" },
            }}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label
            style={{
              fontWeight: "600",
              color: "#4b5563",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Search by Product Name
          </label>
          <input
            type="text"
            value={query.name}
            className="input-field"
            placeholder="Search by Product Name"
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, name: e.target.value }))
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              backgroundColor: "#ffffff",
            }}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 4 }}>
          <label
            style={{
              fontWeight: "600",
              color: "#4b5563",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Category
          </label>
          <select
            name="category"
            className="input-field"
            defaultValue={query.category}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, category: e.target.value }))
            }
            onBlur={(e) =>
              setQuery((prev) => ({ ...prev, category: e.target.value }))
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Filter by Category</option>
            {categories?.data?.map(
              (category: { _id: string; name: string }) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              )
            )}
          </select>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 4 }}>
          <label
            style={{
              fontWeight: "600",
              color: "#4b5563",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Brand
          </label>
          <select
            name="brand"
            className="input-field"
            defaultValue={query.brand}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, brand: e.target.value }))
            }
            onBlur={(e) =>
              setQuery((prev) => ({ ...prev, brand: e.target.value }))
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Filter by Brand</option>
            {brands?.data?.map((brand: { _id: string; name: string }) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </Flex>
  );
};

export default ProductManagementFilter;

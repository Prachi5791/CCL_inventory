import { Input } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  setQuery: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
      search: string;
    }>
  >;
  placeholder?: string;
}

const SearchInput = ({
  setQuery,
  placeholder = "Search…",
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => {
      clearTimeout(debounceId);
    };
  }, [searchTerm]);

  return (
    <div>
      <Input
        size="large"
        style={{
          minWidth: "300px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          padding: "0.5rem",
        }}
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={
          <SearchOutlined style={{ color: "#6b7280", fontSize: "1rem" }} />
        }
      />
    </div>
  );
};

export default SearchInput;

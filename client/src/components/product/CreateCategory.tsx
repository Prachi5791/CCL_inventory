import { Button, Flex } from "antd";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../redux/features/management/categoryApi";
import toastMessage from "../../lib/toastMessage";
import { SpinnerIcon } from "@phosphor-icons/react";

const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [category, setCategory] = useState("");

  const handleClick = async () => {
    try {
      const res = await createCategory({ name: category }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: "success", text: res.message });
        setCategory("");
      }
    } catch (error: any) {
      toastMessage({ icon: "error", text: error.data.message });
    }
  };

  return (
    <Flex
      vertical
      style={{
        padding: "1.5rem",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        gap: "1rem",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "#2d3748",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Create New Category
      </h3>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field"
        placeholder="Category Name"
        style={{
          width: "100%",
          padding: "0.6rem",
          borderRadius: "4px",
          border: "1px solid #d1d5db",
          fontSize: "0.95rem",
          backgroundColor: "#ffffff",
        }}
      />
      <Button
        htmlType="button"
        onClick={handleClick}
        type="primary"
        disabled={isLoading}
        style={{
          textTransform: "uppercase",
          fontWeight: "600",
          height: "40px",
          borderRadius: "6px",
        }}
      >
        {isLoading && <SpinnerIcon className="spin" weight="bold" />}
        Create Category
      </Button>
    </Flex>
  );
};

export default CreateCategory;

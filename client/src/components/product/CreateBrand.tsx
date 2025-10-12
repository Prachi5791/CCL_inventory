import { Button, Flex } from "antd";
import { useState } from "react";
import { useCreateBrandMutation } from "../../redux/features/management/brandApi";
import toastMessage from "../../lib/toastMessage";
import { SpinnerIcon } from "@phosphor-icons/react";

const CreateBrand = () => {
  const [createCategory, { isLoading }] = useCreateBrandMutation();
  const [brand, setBrand] = useState("");

  const handleClick = async () => {
    try {
      const res = await createCategory({ name: brand }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: "success", text: res.message });
        setBrand("");
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
        Create New Brand
      </h3>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="input-field"
        placeholder="Brand Name"
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
        Create Brand
      </Button>
    </Flex>
  );
};

export default CreateBrand;

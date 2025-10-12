import { Button, Flex } from "antd";
import CreateSellerModal from "../modal/CreateSellerModal";
import { useState } from "react";

const CreateSeller = () => {
  const [createSellerModalOpen, setCreateSellerModalOpen] = useState(false);

  return (
    <>
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
          Create New Seller
        </h3>

        <Button
          htmlType="button"
          type="primary"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            height: "40px",
            borderRadius: "6px",
          }}
          onClick={() => setCreateSellerModalOpen(true)}
        >
          Create Seller
        </Button>
      </Flex>

      <CreateSellerModal
        openModal={createSellerModalOpen}
        setOpenModal={setCreateSellerModalOpen}
      />
    </>
  );
};

export default CreateSeller;

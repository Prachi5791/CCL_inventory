import { Button, Flex, Modal } from "antd";
import { ChangeEvent, useState } from "react";
import toastMessage from "../../lib/toastMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getSaleModal,
  getSaleModalData,
  toggleSaleModel,
} from "../../redux/services/modal.Slice";
import ModalInput from "./ModalInput";
import { useCreateSaleMutation } from "../../redux/features/management/saleApi";

const SaleModal = () => {
  const modalOpen = useAppSelector(getSaleModal);
  const data = useAppSelector(getSaleModalData);
  const [createNewSale] = useCreateSaleMutation();
  const dispatch = useAppDispatch();
  const [updateDate, setUpdateDate] = useState({
    buyerName: "",
    quantity: "",
    date: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const payload = {
      ...updateDate,
      product: data?._id as string,
      price: data?.price as number,
      productName: data?.name,
      productPrice: data?.price,
      quantity: Number(updateDate?.quantity),
    };

    try {
      const res = await createNewSale(payload).unwrap();

      if (res.statusCode === 201) {
        toastMessage({ icon: "success", text: res.message });
        dispatch(toggleSaleModel({ open: false, data: null }));
        setUpdateDate({ buyerName: "", quantity: "", date: "" });
      }
    } catch (error: any) {
      toastMessage({ icon: "error", text: error.data.message });
    }
  };

  return (
    <>
      <Modal
        title={
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#2d3748",
            }}
          >
            New Product Sale
          </span>
        }
        centered
        open={modalOpen}
        onOk={() => dispatch(toggleSaleModel({ open: false, data: null }))}
        onCancel={() => dispatch(toggleSaleModel({ open: false, data: null }))}
        footer={[
          <Button
            key="back"
            onClick={() =>
              dispatch(toggleSaleModel({ open: false, data: null }))
            }
            style={{
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Close
          </Button>,
        ]}
        bodyStyle={{
          padding: "1.5rem",
        }}
      >
        <form>
          <ModalInput
            handleChange={handleChange}
            name="buyerName"
            defaultValue={updateDate?.buyerName}
            label="Buyer Name"
          />
          <ModalInput
            handleChange={handleChange}
            label="Quantity"
            type="number"
            name="quantity"
            defaultValue={updateDate?.quantity}
          />
          <ModalInput
            handleChange={handleChange}
            label="Selling Date"
            type="date"
            name="date"
            defaultValue={updateDate?.date}
          />

          <Flex justify="center" style={{ marginTop: "1.5rem" }}>
            <Button
              key="submit"
              type="primary"
              onClick={onSubmit}
              style={{
                fontWeight: "600",
                padding: "0.5rem 2rem",
                height: "auto",
                borderRadius: "6px",
                backgroundColor: "#16a34a",
                borderColor: "#16a34a",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
            >
              Sell
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default SaleModal;

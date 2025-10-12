import { Button, Col, Flex, Modal, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import toastMessage from "../../lib/toastMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCreateVariantModel,
  getCreateVariantModelData,
  toggleCreateVariantModel,
} from "../../redux/services/modal.Slice";
import { IProduct } from "../../types/product.types";
import ModalInput from "./ModalInput";
import { useCreateNewProductMutation } from "../../redux/features/management/productApi";

const AddStockModal = () => {
  const modalOpen = useAppSelector(getCreateVariantModel);
  const data = useAppSelector(getCreateVariantModelData);
  const [createVariant] = useCreateNewProductMutation();
  const dispatch = useAppDispatch();
  const [updateDate, setUpdateDate] = useState<Partial<IProduct>>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const payload: any = { ...updateDate };
    payload.price = Number(updateDate?.price);
    payload.stock = Number(updateDate?.stock);
    delete payload?._id;
    delete payload.createdAt;
    delete payload?.updatedAt;
    delete payload?.__v;
    delete payload?.user;

    try {
      const res = await createVariant(payload).unwrap();
      console.log(res);

      if (res.statusCode === 201) {
        toastMessage({ icon: "success", text: res.message });
        dispatch(toggleCreateVariantModel({ open: false, data: null }));
      }
    } catch (error: any) {
      toastMessage({
        icon: "error",
        title: error.data.message,
        text: error.data.errors[0],
      });
    }
  };

  useEffect(() => {
    setUpdateDate(data!);
  }, [data]);

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
            Add Stock
          </span>
        }
        centered
        open={modalOpen}
        onOk={() =>
          dispatch(toggleCreateVariantModel({ open: false, data: null }))
        }
        onCancel={() =>
          dispatch(toggleCreateVariantModel({ open: false, data: null }))
        }
        footer={[
          <Button
            key="back"
            onClick={() =>
              dispatch(toggleCreateVariantModel({ open: false, data: null }))
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
            name="name"
            defaultValue={updateDate?.name}
            label="Name"
          />
          <ModalInput
            handleChange={handleChange}
            label="Price"
            type="number"
            defaultValue={updateDate?.price}
            name="price"
          />
          <ModalInput
            handleChange={handleChange}
            label="Quantity"
            type="number"
            name="quantity"
            defaultValue={updateDate?.stock}
          />
          <Row style={{ marginBottom: "1rem" }}>
            <Col span={6}>
              <label
                htmlFor="Size"
                className="label"
                style={{
                  color: "#4b5563",
                  fontWeight: "500",
                  fontSize: "0.9rem",
                }}
              >
                Size
              </label>
            </Col>
            <Col span={18}>
              <select
                defaultValue={updateDate?.size}
                value={updateDate?.size}
                onChange={handleChange}
                name="size"
                className="input-field"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="">Select Product Size*</option>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
              </select>
            </Col>
          </Row>
          <Flex justify="center" style={{ marginTop: "1.5rem" }}>
            <Button
              key="submit"
              type="primary"
              onClick={onSubmit}
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                padding: "0.5rem 2rem",
                height: "auto",
                borderRadius: "6px",
              }}
            >
              Create New Variant
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default AddStockModal;

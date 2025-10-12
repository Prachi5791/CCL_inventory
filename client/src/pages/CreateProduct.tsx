import { Button, Col, Flex, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import toastMessage from "../lib/toastMessage";
import { useGetAllBrandsQuery } from "../redux/features/management/brandApi";
import { useGetAllCategoriesQuery } from "../redux/features/management/categoryApi";
import { useCreateNewProductMutation } from "../redux/features/management/productApi";
import { useGetAllSellerQuery } from "../redux/features/management/sellerApi";
import { ICategory } from "../types/product.types";
import CreateSeller from "../components/product/CreateSeller";
import CreateCategory from "../components/product/CreateCategory";
import CreateBrand from "../components/product/CreateBrand";
import { SpinnerIcon } from "@phosphor-icons/react";

const CreateProduct = () => {
  const [createNewProduct, { isLoading: isCreatingProduct }] =
    useCreateNewProductMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: sellers } = useGetAllSellerQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data };
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

    if (payload.size === "") {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: "success", text: res.message });
        reset();
      }
    } catch (error: any) {
      toastMessage({ icon: "error", text: error.data.message });
    }
  };

  return (
    <>
      <Row
        gutter={30}
        style={{
          height: "calc(100vh - 6rem)",
          overflow: "auto",
        }}
      >
        <Col
          xs={{ span: 24 }}
          lg={{ span: 14 }}
          style={{
            display: "flex",
          }}
        >
          <Flex
            vertical
            style={{
              width: "100%",
              padding: "2rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h1
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
                color: "#2d3748",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Add New Product
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                name="name"
                errors={errors}
                label="Name"
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label="Price"
                type="number"
                name="price"
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label="Stock"
                type="number"
                name="stock"
                register={register}
                required={true}
              />

              <Row style={{ marginBottom: "1rem" }}>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label
                    htmlFor="seller"
                    className="label"
                    style={{
                      color: "#4b5563",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                    }}
                  >
                    Seller
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    {...register("seller", { required: true })}
                    className={`input-field ${
                      errors["seller"] ? "input-field-error" : ""
                    }`}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: errors["seller"]
                        ? "1px solid #ef4444"
                        : "1px solid #d1d5db",
                      fontSize: "0.95rem",
                    }}
                  >
                    <option value="">Select Seller*</option>
                    {sellers?.data.map((item: ICategory) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row style={{ marginBottom: "1rem" }}>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label
                    htmlFor="category"
                    className="label"
                    style={{
                      color: "#4b5563",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                    }}
                  >
                    Category
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    {...register("category", { required: true })}
                    className={`input-field ${
                      errors["category"] ? "input-field-error" : ""
                    }`}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: errors["category"]
                        ? "1px solid #ef4444"
                        : "1px solid #d1d5db",
                      fontSize: "0.95rem",
                    }}
                  >
                    <option value="">Select Category*</option>
                    {categories?.data.map((item: ICategory) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row style={{ marginBottom: "1rem" }}>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label
                    htmlFor="brand"
                    className="label"
                    style={{
                      color: "#4b5563",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                    }}
                  >
                    Brand
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    {...register("brand")}
                    className={`input-field ${
                      errors["brand"] ? "input-field-error" : ""
                    }`}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.95rem",
                    }}
                  >
                    <option value="">Select brand</option>
                    {brands?.data.map((item: ICategory) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <CustomInput
                label="Description"
                name="description"
                register={register}
              />

              <Row style={{ marginBottom: "1.5rem" }}>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label
                    htmlFor="size"
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
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    className="input-field"
                    {...register("size")}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.95rem",
                    }}
                  >
                    <option value="">Select Product Size</option>
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </select>
                </Col>
              </Row>

              <Flex justify="center">
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={isCreatingProduct}
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "600",
                    padding: "0.5rem 2rem",
                    height: "auto",
                    borderRadius: "6px",
                  }}
                >
                  {isCreatingProduct && (
                    <SpinnerIcon className="spin" weight="bold" />
                  )}
                  Add Product
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <Flex
            vertical
            style={{
              width: "100%",
              height: "100%",
              padding: "2rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              justifyContent: "space-around",
              gap: "1.5rem",
            }}
          >
            <CreateSeller />
            <CreateCategory />
            <CreateBrand />
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;

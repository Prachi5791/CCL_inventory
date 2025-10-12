import { Col, Row } from "antd";

interface Props {
  name: string;
  errors?: any;
  label: string;
  type?: string;
  register: any;
  required?: boolean;
  defaultValue?: any;
}

const CustomInput = ({
  name,
  errors = {},
  required = false,
  label,
  register,
  type = "text",
}: Props) => {
  return (
    <Row style={{ marginBottom: "1rem" }}>
      <Col xs={{ span: 23 }} lg={{ span: 6 }}>
        <label
          htmlFor={name}
          className="label"
          style={{
            color: "#4b5563",
            fontWeight: "500",
            fontSize: "0.9rem",
            display: "block",
            paddingTop: "0.5rem",
          }}
        >
          {label}
        </label>
      </Col>
      <Col xs={{ span: 23 }} lg={{ span: 18 }}>
        <input
          id={name}
          type={type}
          placeholder={label}
          {...register(name, { required: required })}
          className={`input-field ${errors[name] ? "input-field-error" : ""}`}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: errors[name] ? "1px solid #ef4444" : "1px solid #d1d5db",
            fontSize: "0.95rem",
            backgroundColor: "#ffffff",
            transition: "border-color 0.2s",
          }}
        />
        {errors[name] && (
          <span
            style={{
              color: "#ef4444",
              fontSize: "0.8rem",
              display: "block",
              marginTop: "0.25rem",
            }}
          >
            {label} is required
          </span>
        )}
      </Col>
    </Row>
  );
};

export default CustomInput;

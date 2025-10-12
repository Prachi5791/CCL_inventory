import { Col, Row } from "antd";

interface Props {
  name: string;
  label: string;
  type?: string;
  handleChange: any;
  defaultValue?: any;
}

const ModalInput = ({
  name,
  label,
  handleChange,
  defaultValue = "",
  type = "text",
}: Props) => {
  return (
    <Row style={{ marginBottom: "1rem" }}>
      <Col span={6}>
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
      <Col span={18}>
        <input
          id={name}
          type={type}
          name={name}
          value={defaultValue}
          placeholder={label}
          onChange={handleChange}
          className="input-field"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            fontSize: "0.95rem",
            backgroundColor: "#ffffff",
            transition: "border-color 0.2s",
          }}
        />
      </Col>
    </Row>
  );
};

export default ModalInput;

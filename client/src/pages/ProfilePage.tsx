import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import userProPic from "../assets/User.png";
import Loader from "../components/Loader";
import { useGetSelfProfileQuery } from "../redux/features/authApi";
import { profileKeys } from "../constant/profile";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <>
      <Flex vertical style={{ minHeight: "calc(100vh - 10rem)" }}>
        <Flex justify="center" style={{ width: "100%" }}>
          <Flex
            justify="center"
            style={{
              width: "180px",
              height: "180px",
              border: "3px solid #e5e7eb",
              padding: ".5rem",
              borderRadius: "50%",
              backgroundColor: "#f9fafb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              margin: "2rem 0",
            }}
          >
            <img
              src={data?.data?.avatar || userProPic}
              alt="user"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Flex>
        </Flex>

        <Flex justify="center" style={{ marginBottom: "2rem" }}>
          <Flex gap={16} wrap="wrap" justify="center">
            <Link to="/edit-profile">
              <Button
                type="primary"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                  borderRadius: "6px",
                  padding: "0.5rem 1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                <EditOutlined />
                Edit Profile
              </Button>
            </Link>
            <Link to="/change-password">
              <Button
                type="primary"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                  borderRadius: "6px",
                  padding: "0.5rem 1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                <EditFilled />
                Change Password
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}></Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 16 }}
            style={{
              maxWidth: "700px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              padding: "2rem 3rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              margin: "0 auto",
            }}
          >
            {profileKeys.map((key) => (
              <ProfileInfoItems
                keyName={key.keyName}
                value={data?.data[key.keyName]}
              />
            ))}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}></Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProfilePage;

const ProfileInfoItems = ({
  keyName,
  value,
}: {
  keyName: string;
  value: string;
}) => {
  return (
    <Flex
      style={{
        width: "100%",
        borderBottom: "1px solid #f0f0f0",
        padding: "1rem 0",
        alignItems: "center",
      }}
      gap={24}
    >
      <h2
        style={{
          flex: 1,
          fontWeight: "700",
          textTransform: "capitalize",
          color: "#374151",
          fontSize: "1rem",
          margin: 0,
          letterSpacing: "0.5px",
        }}
      >
        {keyName}
      </h2>
      <h3
        style={{
          flex: 3,
          fontWeight: "500",
          color: "#2d3748",
          fontSize: "1rem",
          margin: 0,
          textWrap: "wrap",
        }}
      >
        {value}
      </h3>
    </Flex>
  );
};

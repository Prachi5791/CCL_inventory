import { SpinnerIcon } from "@phosphor-icons/react";
import { Button, Flex } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toastMessage from "../../lib/toastMessage";
import { useLoginMutation } from "../../redux/features/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/services/authSlice";
import decodeToken from "../../utils/decodeToken";

const LoginPage = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "test-visitor@gmail.com",
      password: "pass123",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate("/");
        toastMessage({ icon: "success", text: "Successfully Login!" });
      }
    } catch (error: any) {
      toastMessage({ icon: "error", text: error.data.message });
    }
  };

  // if (isLoading) <Loader />;
  // else
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Flex
        vertical
        style={{
          width: "400px",
          padding: "3rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1
          style={{
            marginBottom: "2rem",
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#2d3748",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Your Email*"
              className={`input-field ${
                errors["email"] ? "input-field-error" : ""
              }`}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: errors["email"]
                  ? "2px solid #ef4444"
                  : "1px solid #d1d5db",
                fontSize: "1rem",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s",
              }}
            />
            {errors["email"] && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                Email is required
              </span>
            )}
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="password"
              placeholder="Your Password*"
              className={`input-field ${
                errors["password"] ? "input-field-error" : ""
              }`}
              {...register("password", { required: true })}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: errors["password"]
                  ? "2px solid #ef4444"
                  : "1px solid #d1d5db",
                fontSize: "1rem",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s",
              }}
            />
            {errors["password"] && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                Password is required
              </span>
            )}
          </div>
          <Flex justify="center">
            <Button
              htmlType="submit"
              type="primary"
              disabled={isLoading}
              style={{
                textTransform: "uppercase",
                fontWeight: "600",
                width: "100%",
                height: "48px",
                fontSize: "1rem",
                borderRadius: "6px",
                marginTop: "0.5rem",
              }}
            >
              {isLoading && <SpinnerIcon className="spin" weight="bold" />}
              Login
            </Button>
          </Flex>
        </form>
        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.95rem",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1890ff",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Register Here
          </Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default LoginPage;

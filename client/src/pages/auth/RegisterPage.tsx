import { SpinnerIcon } from "@phosphor-icons/react";
import { Button, Flex } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toastMessage from "../../lib/toastMessage";
import { useRegisterMutation } from "../../redux/features/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/services/authSlice";
import decodeToken from "../../utils/decodeToken";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration, { isLoading }] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({
          icon: "error",
          text: "Password and confirm password must be same!",
        });
        return;
      }
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate("/");
        console.log(res);
        toastMessage({ icon: "success", text: res.message });
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.errors?.[Object.keys(error?.data?.errors)[0]] ||
        error.data.message;
      toastMessage({ icon: "error", text: errMsg });
    }
  };

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
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name*"
              className={`input-field ${
                errors["name"] ? "input-field-error" : ""
              }`}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: errors["name"]
                  ? "2px solid #ef4444"
                  : "1px solid #d1d5db",
                fontSize: "1rem",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s",
              }}
            />
            {errors["name"] && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                Name is required
              </span>
            )}
          </div>
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
              {...register("password", { required: true })}
              className={`input-field ${
                errors["password"] ? "input-field-error" : ""
              }`}
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
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="password"
              placeholder="Confirm Password*"
              {...register("confirmPassword", { required: true })}
              className={`input-field ${
                errors["confirmPassword"] ? "input-field-error" : ""
              }`}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: errors["confirmPassword"]
                  ? "2px solid #ef4444"
                  : "1px solid #d1d5db",
                fontSize: "1rem",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s",
              }}
            />
            {errors["confirmPassword"] && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                Please confirm your password
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
              Register
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1890ff",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login Here
          </Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;

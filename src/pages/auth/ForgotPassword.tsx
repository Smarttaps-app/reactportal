import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { IForgotPasswordRequest } from "../../utils/type";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isPending } = useForgotPassword();
  const onFinish = (data: IForgotPasswordRequest) => {
    console.log(data);
    forgotPassword(data, {
      onSuccess: (response) => {
        console.log(response);
        navigate("/auth/reset-password");
      },
    });
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ minWidth: 320 }}
    >
      <Form.Item<IForgotPasswordRequest>
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Phone Number/Email Address!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Phone Number/Email Address"
          className="!rounded-md !py-3"
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={isPending}
          disabled={isPending}
          className="!rounded-md !shadow-md !py-5"
        >
          Forgot Password
        </Button>
      </Form.Item>{" "}
      <p className="">
        Already have an account?{" "}
        <Link className="m-2 text-center" to="/auth/login">
          Login
        </Link>
      </p>
    </Form>
  );
};

export default ForgotPassword;

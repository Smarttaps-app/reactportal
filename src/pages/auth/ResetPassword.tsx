import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, OneToOneOutlined } from "@ant-design/icons";
import { useResetPassword } from "../../hooks/useResetPassword";
import { Common } from "../../utils/Common";
import { IResetPasswordRequest } from "../../utils/type";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, isPending } = useResetPassword();
  const onFinish = (data: IResetPasswordRequest) => {
    resetPassword(data, {
      onSuccess: (response) => {
        console.log(response);
        message.success(response.statusDescription);
        navigate("/auth/login");
      },
      onError: (error) => {
        console.error(error);
        message.error(Common.formatError(error));
      },
    });
  };
  return (
    <Form
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ minWidth: 320 }}
    >
      <Form.Item<IResetPasswordRequest>
        name="otp"
        rules={[
          {
            required: true,
            message: "Please input OTP sent to you",
          },
        ]}
      >
        <Input
          prefix={<OneToOneOutlined />}
          placeholder="Enter OTP"
          className="!rounded-md !py-3"
        />
      </Form.Item>
      <Form.Item<IResetPasswordRequest>
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          className="!rounded-md !py-3"
        />
      </Form.Item>
      <Form.Item<IResetPasswordRequest>
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your Password",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
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
          Reset Password
        </Button>
      </Form.Item>{" "}
      <Button className="m-2 text-center" onClick={() => navigate(-1)}>
        Back
      </Button>
    </Form>
  );
};

export default ResetPassword;

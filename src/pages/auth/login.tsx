import { ILogin } from "../../utils/type";
import { Flex, Form, Input, Checkbox, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "../../context/useUser";

export default function Login() {
  const { login, isloading: loading } = useUser();
  const [form] = Form.useForm();

  const onFinish = async (data: ILogin) => {
    await login(data);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ minWidth: 320 }}
    >
      <Form.Item<ILogin>
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Email Address!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email Address"
          className="!rounded-md !py-3"
        />
      </Form.Item>

      <Form.Item<ILogin>
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            min: 5,
            message: "Password needs a minimum of 6 characters",
          },
        ]}
        className="lg"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          className="!rounded-md !py-3"
        />
      </Form.Item>
      <Flex className="space-between">
        <Form.Item>
          <Space>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </Space>
        </Form.Item>
      </Flex>
      <Form.Item>
        <Button
          block
          type="primary"
          loading={loading}
          disabled={loading}
          htmlType="submit"
          //style={{ backgroundColor: "transparent" }}
          className="!rounded-md !shadow-md !py-5"
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}

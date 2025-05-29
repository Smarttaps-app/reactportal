import { Flex, Form, Input, Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useChangePassword } from "../../../hooks/useLogin";
import { IChangePassword } from "../../../utils/type";

export default function Changepassword() {
  const { changePassword, loading } = useChangePassword();
  const [form] = Form.useForm();

  const onFinish = async (data: IChangePassword) => {
    await changePassword(data);
  };
  return (
    <Card style={{ width: "100%" }} title="Change Password">
      <Flex justify="center">
        <Form
          title="Change Password"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<IChangePassword>
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your Old Password!",
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
          <Form.Item<IChangePassword>
            name="password"
            label="New Password"
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
          <Form.Item<IChangePassword>
            name="confirmPassword"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
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
          <Form.Item>
            <Button
              block
              type="primary"
              loading={loading}
              disabled={loading}
              htmlType="submit"
              className="!rounded-md !shadow-md !py-5"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}

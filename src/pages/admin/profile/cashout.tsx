import { Flex, Form, Input, Button, Card, InputNumber } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { IChangePassword } from "../../../utils/type";
import { useCashOut } from "./useProfile";

export default function CashOutScreen() {
  const { cashout, loading } = useCashOut();
  const [form] = Form.useForm();

  const onFinish = async (data: IChangePassword) => cashout(data);
  return (
    <Card style={{ width: "100%" }} title="Cash Out Withdrawal">
      <Flex justify="center">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<IChangePassword>
            name="oldPassword"
            label="Amount"
            rules={[
              {
                required: true,
                message: "Please input cash out amount!",
              },
            ]}
            className="lg"
          >
            <InputNumber
              // addonBefore={<LockOutlined />}
              prefix="N"
              size="small"
              style={{ width: "100%" }}
              placeholder="Amount"
              className="!rounded-md !py-3"
            />
          </Form.Item>
          <Form.Item<IChangePassword>
            name="confirmPassword"
            label="Account Number"
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

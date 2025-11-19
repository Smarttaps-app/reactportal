import { Flex, Form, Input, Button, Card, App } from "antd";
import { ICashoutLimit } from "../../../utils/type";
import {
  useCashoutConfirmation,
  useCashoutLimitIncrease,
} from "../cashout/useCashout";
import { useState } from "react";
import { Common } from "../../../utils/Common";

export default function CashoutLimitIncrease() {
  const { notification } = App.useApp();
  const { limiting, cashoutLimitIncrease } = useCashoutLimitIncrease();
  const { confirming, cashoutRequestConfirmation } = useCashoutConfirmation();
  const [otp, setOtp] = useState(false);
  const [form] = Form.useForm();
  const onVerified = async (data: ICashoutLimit) =>
    cashoutLimitIncrease(data, {
      onSuccess: (data) => {
        setOtp(data.data.otpRequired);
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Cashout Limit Change",
          description: Common.formatError(error),
        });
      },
    });
  const onFinish = async (data: ICashoutLimit) =>
    cashoutRequestConfirmation(data, {
      onSuccess: (data) => {
        notification.success({
          message: "Cashout Limit Change",
          description: data.statusDescription,
        });
      },
      onError: (error) => {
        notification.error({
          message: "Cashout Limit Change",
          description: Common.formatError(error),
        });
      },
    });
  return (
    <Card style={{ width: "100%" }} title="Cashout Limit Change">
      <Flex justify="center">
        <Form
          title="Cashout Limit Change"
          form={form}
          layout="vertical"
          onFinish={otp ? onFinish : onVerified}
          initialValues={{
            requestType: "LIMIT_CHANGE",
            amount: "",
            password: "",
            otp: "",
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<ICashoutLimit> name="requestType" hidden>
            <Input readOnly hidden />
          </Form.Item>
          <Form.Item<ICashoutLimit>
            name="amount"
            label="Enter Amount"
            rules={[
              {
                required: true,
                message: "Please input amount!",
              },
            ]}
            className="lg"
          >
            <Input placeholder="Enter amount" className="!rounded-md !py-2" />
          </Form.Item>
          <Form.Item<ICashoutLimit>
            name="password"
            label="Enter Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          {otp && (
            <Form.Item<ICashoutLimit>
              name="otp"
              label="Enter OTP"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
                },
                {
                  len: 6,
                  message: "OTP must be 6 characters",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter OTP"
                className="!rounded-md !py-2"
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              block
              type="primary"
              loading={limiting && confirming}
              disabled={limiting && confirming}
              htmlType="submit"
              className="!rounded-md !shadow-sm !py-5"
            >
              {otp ? "Increase Limit" : "Send Verification"}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}

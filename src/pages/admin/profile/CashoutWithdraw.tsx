import { Flex, Form, Input, Button, Card, App } from "antd";
import { ICashoutWithdraw } from "../../../utils/type";
import {
  useCashoutConfirmation,
  useCashoutWithdrawal,
} from "../cashout/useCashout";
import { useState } from "react";
import { Common } from "../../../utils/Common";
import { useNavigate } from "react-router-dom";

export default function CashoutWithdraw() {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const { withdrawing, cashoutWithdrawal } = useCashoutWithdrawal();
  const { confirming, cashoutRequestConfirmation } = useCashoutConfirmation();
  const [form] = Form.useForm();
  const onVerified = async (data: ICashoutWithdraw) =>
    cashoutWithdrawal(data, {
      onSuccess: (data) => {
        setOtp(data.data.otpRequired);
        notification.success({
          message: "Cashout Withdrawal",
          description: data.statusDescription,
        });
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Cashout Withdrawal",
          description: Common.formatError(error),
        });
      },
    });
  const onFinish = async (data: ICashoutWithdraw) =>
    cashoutRequestConfirmation(data, {
      onSuccess: (data) => {
        notification.success({
          message: "Cashout Withdrawal",
          description: data.statusDescription,
        });
        navigate(-1);
      },
      onError: (error) => {
        notification.error({
          message: "Cashout Withdrawal",
          description: Common.formatError(error),
        });
        setOtp(false);
      },
    });
  return (
    <Card style={{ width: "100%" }} title="New Cashout">
      <Flex justify="center">
        <Form
          title="New Cashout"
          form={form}
          layout="vertical"
          onFinish={otp ? onFinish : onVerified}
          initialValues={{
            requestType: "WITHDRAWAL",
            amount: "",
            password: "",
            otp: "",
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<ICashoutWithdraw> name="requestType" hidden>
            <Input readOnly hidden />
          </Form.Item>
          <Form.Item<ICashoutWithdraw>
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
          <Form.Item<ICashoutWithdraw>
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
          <Form.Item<ICashoutWithdraw>
            name="desc"
            label="Enter Reason"
            rules={[
              {
                required: true,
                message: "Please input withdrawal reason!",
              },
            ]}
            className="lg"
          >
            <Input.TextArea
              placeholder="Enter reason"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          {otp && (
            <Form.Item<ICashoutWithdraw>
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
              loading={withdrawing && confirming}
              disabled={withdrawing && confirming}
              htmlType="submit"
              className="!rounded-md !shadow-sm !py-5"
            >
              {otp ? "Cashout " : "Send Verification"}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}

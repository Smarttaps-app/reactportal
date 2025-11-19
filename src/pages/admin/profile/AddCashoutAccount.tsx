import { Flex, Form, Input, Button, Card, Select, App, Typography } from "antd";
import { AddCashoutBank, IBank } from "../../../utils/type";
import { useBanks } from "./useProfile";
import { Common } from "../../../utils/Common";
import { useState } from "react";
import {
  useAddCashoutAccount,
  useCashoutBankVerification,
} from "../cashout/useCashout";

export default function AddCashoutAccunt() {
  const { notification } = App.useApp();
  const [accountname, setAccountName] = useState("");
  const { verifyCashoutAccount, verifying } = useCashoutBankVerification();
  const { addCashoutAccount, isAdding } = useAddCashoutAccount();
  const { banks, loading: banking } = useBanks();
  const [form] = Form.useForm();

  const onVerified = async (data: AddCashoutBank) =>
    verifyCashoutAccount(data, {
      onSuccess: (data) => {
        form.setFieldValue("accountName", data.data.account_name);
        setAccountName(data.data.account_name);
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Cashout Account",
          description: Common.formatError(error),
        });
      },
    });
  const onFinish = async (data: AddCashoutBank) =>
    addCashoutAccount(data, {
      onSuccess: (data) => {
        notification.success({
          message: "Cashout Account",
          description: data.statusDescription,
        });
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Cashout Account",
          description: Common.formatError(error),
        });
      },
    });
  return (
    <Card style={{ width: "100%" }} title="Cashout Account">
      <Flex justify="center">
        <Form
          title="Cashout Account"
          form={form}
          layout="vertical"
          onFinish={accountname ? onFinish : onVerified}
          initialValues={{
            accountNumber: "",
            bankCode: "",
            password: "",
            accountName: "",
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<AddCashoutBank>
            name="accountNumber"
            label="BanK Account Number"
            rules={[
              {
                required: true,
                message: "Please input your Bank Account Number!",
              },
              {
                min: 10,
                message: "Bank Account Number needs a minimum of 10 characters",
              },
            ]}
          >
            <Input
              placeholder="Enter your bank account number"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          {accountname && (
            <Typography.Text type="secondary">{accountname}</Typography.Text>
          )}
          <Form.Item<AddCashoutBank>
            label="Bank"
            name="bankCode"
            rules={[{ required: true, message: "Please select a bank" }]}
          >
            <Select
              showSearch
              loading={banking}
              optionLabelProp="label"
              className="!rounded-md"
              options={banks.map((item: IBank) => ({
                label: `${item.name}`,
                value: item.code,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            ></Select>
          </Form.Item>
          <Form.Item<AddCashoutBank>
            name="password"
            label="Enter Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter Password"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          {accountname && (
            <Form.Item<AddCashoutBank>
              name="accountName"
              label="Confirm Account Name"
            >
              <Input
                readOnly
                value={accountname}
                placeholder="Enter Account Name"
                className="!rounded-md !py-2"
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              block
              type="primary"
              loading={verifying && isAdding}
              disabled={verifying && isAdding}
              htmlType="submit"
              className="!rounded-md !shadow-sm !py-5"
            >
              {accountname ? "Add Cashout Account" : "Verify Account"}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}

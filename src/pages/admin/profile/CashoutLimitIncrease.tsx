import { Flex, Form, Input, Button, Card, Select } from "antd";
import { AddCashoutBank, IBank } from "../../../utils/type";
import { useBanks, useCashoutBank } from "./useProfile";

export default function CashoutLimitIncrease() {
  const { addBank, loading } = useCashoutBank();
  const { banks, loading: banking } = useBanks();
  const [form] = Form.useForm();

  const onFinish = async (data: AddCashoutBank) => addBank(data);
  return (
    <Card style={{ width: "100%" }} title="Cashout Account">
      <Flex justify="center">
        <Form
          title="Cashout Account"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
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
            className="lg"
          >
            <Input
              placeholder="Enter your bank account number"
              className="!rounded-md !py-2"
            />
          </Form.Item>
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
            name="pin"
            label="Enter PIN"
            rules={[
              {
                required: true,
                message: "Please input your PIN!",
              },
              {
                len: 4,
                message: "PIN must be 4 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter PIN"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              loading={loading}
              disabled={loading}
              htmlType="submit"
              className="!rounded-md !shadow-sm !py-5"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}

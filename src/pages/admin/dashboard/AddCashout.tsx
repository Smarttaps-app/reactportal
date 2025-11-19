import { App, Button, Card, Form, Grid, Input, Modal } from "antd";
import { ICashoutWithdraw } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
import { useCashoutWithdrawal } from "../cashout/useCashout";
const { useBreakpoint } = Grid;
export interface IAddProps {
  product?: ICashoutWithdraw;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const AddCashout: React.FC<IAddProps> = ({
  product,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const client = useQueryClient();
  const { cashoutWithdrawal, withdrawing } = useCashoutWithdrawal();
  const onFinish = async (values: ICashoutWithdraw) => {
    cashoutWithdrawal(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        //onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
    });
  };
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      // confirmLoading={updating}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={screens.xs ? "100%" : 450}
    >
      <Card title={product ? "Update Cashout" : "Request Cashout"}>
        <Form
          //form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            billerName: product?.amount,
            password: product?.password,
            desc: product?.desc,
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<ICashoutWithdraw> name="amount" hidden>
            <Input />
          </Form.Item>
          <Form.Item<ICashoutWithdraw>
            name="amount"
            label="Cashout Amount"
            rules={[
              {
                required: true,
                message: "Please Enter Cashout Amount!",
              },
            ]}
          >
            <Input placeholder="Enter Cashout Amount" />
          </Form.Item>
          <Form.Item<ICashoutWithdraw>
            name="password"
            label="Enter Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input placeholder="Enter your password" />
          </Form.Item>
          <Form.Item<ICashoutWithdraw>
            name="desc"
            label="Enter Reason"
            rules={[
              {
                required: true,
                message: "Please Enter Reason!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter reason" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              loading={withdrawing}
              disabled={withdrawing}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
export default AddCashout;

import { App, Button, Card, Form, Grid, Input, Modal } from "antd";
import { ICashout } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
import { useAddCashout } from "../cashout/useCashout";
const { useBreakpoint } = Grid;
export interface IAddProps {
  product?: ICashout;
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
  const { addCashout, isAdding } = useAddCashout();
  const onFinish = async (values: ICashout) => {
    addCashout(values, {
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
            id: product?.id,
            billerName: product?.amount,
            billerId: product?.recipient,
            customerField: product?.walletCashout,
            hasAddons: product?.reference,
            hasLookup: product?.source,
            hasPackages: product?.reason,
            maxAmountLimit: product?.withdrawalStatus,
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<ICashout> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<ICashout> name="amount" hidden>
            <Input />
          </Form.Item>
          <Form.Item<ICashout>
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
          <Form.Item<ICashout>
            name="pin"
            label="Enter PIN"
            rules={[
              {
                required: true,
                message: "Please input your 4 digit PIN!",
              },
              {
                len: 4,
                message: "Enter your 4 digit PIN",
              },
            ]}
          >
            <Input placeholder="Enter your 4 digit PIN" />
          </Form.Item>
          <Form.Item<ICashout>
            name="reason"
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
              loading={isAdding}
              disabled={isAdding}
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

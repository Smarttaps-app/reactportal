import {
  App,
  Button,
  Card,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Switch,
} from "antd";
import { IPackage } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPackage } from "./useService";
import { Common } from "../../../utils/Common";
const { useBreakpoint } = Grid;
export interface IAddProps {
  product?: IPackage;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const AddPackage: React.FC<IAddProps> = ({
  product,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const client = useQueryClient();
  const { addPackage, isAdding } = useAddPackage();
  const onFinish = async (values: IPackage) => {
    addPackage(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["billers"] }),
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
      <Card title={product ? "Update Package" : "Add New Package"}>
        <Form
          //form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            id: product?.id,
            amount: product?.amount,
            billerId: product?.billerId,
            packageCode: product?.packageCode,
            hasValidity: product?.hasValidity,
            validity: product?.validity,
            status: product?.status,
            description: product?.description,
            product_type_id: product?.product_type_id,
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<IPackage> name="product_type_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<IPackage> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<IPackage>
            name="description"
            label="Package Description"
            rules={[
              {
                required: true,
                message: "Please Enter Package Description!",
              },
            ]}
          >
            <Input placeholder="Enter Package Description" />
          </Form.Item>
          <Form.Item<IPackage>
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: "Please enter amount",
              },
            ]}
          >
            <Input placeholder="Enter amount in kobo" />
          </Form.Item>
          <Form.Item<IPackage>
            label="Package Code"
            name="packageCode"
            rules={[{ required: true, message: "Please enter package code" }]}
          >
            <Input placeholder="Enter package code" />
          </Form.Item>
          <Form.Item<IPackage> name="validity" label="Package Validity">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter validity period"
            />
          </Form.Item>
          <Form.Item
            name="hasValidity"
            label="Package Validity"
            valuePropName="checked"
          >
            <Switch
              style={{ width: "100%" }}
              unCheckedChildren="No Validity"
              checkedChildren="Has Validity"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Package Status"
            valuePropName="checked"
          >
            <Switch
              style={{ width: "100%" }}
              unCheckedChildren="Inactive Package"
              checkedChildren="Active Package"
            />
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
export default AddPackage;

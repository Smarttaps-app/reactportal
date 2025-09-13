import { App, Button, Card, Form, Input, Modal, Select, Switch } from "antd";
import { Grid } from "antd";
import { IProduct } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { useAddProduct } from "./useService";
import { Common } from "../../../utils/Common";
const { useBreakpoint } = Grid;
export interface IProductProps {
  product?: IProduct;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const AddProduct: React.FC<IProductProps> = ({
  product,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const client = useQueryClient();
  const { addProduct, isAdding } = useAddProduct();
  const onFinish = async (values: IProduct) => {
    addProduct(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["products"] }),
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
      <Card title={product ? "Update Product" : "Add New Product"}>
        <Form
          //form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            id: product?.id,
            name: product?.name,
            customerField: product?.customerField,
            vasType: product?.vasType,
            description: product?.description,
            status: product?.status,
          }}
          style={{ minWidth: 320 }}
        >
          <Form.Item<IProduct> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<IProduct>
            name="name"
            label="Product Name"
            rules={[
              {
                required: true,
                message: "Please Enter Product Name!",
              },
            ]}
          >
            <Input placeholder="Enter Product Name" />
          </Form.Item>
          <Form.Item<IProduct>
            name="customerField"
            label="customer Field"
            rules={[
              {
                required: true,
                message: "Please enter customer Field",
              },
            ]}
          >
            <Input placeholder="Enter customer Field" />
          </Form.Item>
          <Form.Item<IProduct>
            label="Product Type"
            name="vasType"
            rules={[{ required: true, message: "Please select product!" }]}
          >
            <Select
              size="large"
              options={[
                { value: "airtime", label: "Airtime" },
                { value: "bill", label: "Bill" },
                { value: "data", label: "Data" },
                { value: "cable", label: "Cable" },
                { value: "education", label: "Education" },
                { value: "payment", label: "Payment" },
                { value: "transport", label: "Transport" },
                { value: "utility", label: "Utility" },
              ]}
            />
          </Form.Item>
          <Form.Item<IProduct> name="description" label="Product Description">
            <Input.TextArea placeholder="Enter product description" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Product Status"
            valuePropName="checked"
          >
            <Switch
              style={{ width: "100%" }}
              unCheckedChildren="Not Active"
              checkedChildren="Active"
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
export default AddProduct;

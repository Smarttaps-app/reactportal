import { Button, Card, Form, Input, Modal, Select, Switch } from "antd";
import { Grid } from "antd";
import { IProduct, IProductProps } from "../../../utils/type";
const { useBreakpoint } = Grid;

const Product: React.FC<IProductProps> = ({ isOpen = false, onCancel }) => {
  const screens = useBreakpoint();
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
      <Card title="Add New Product">
        <Form
          //form={form}
          layout="vertical"
          //onFinish={onFinish}
          initialValues={{ remember: true }}
          style={{ minWidth: 320 }}
        >
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
            <Input placeholder="Password" className="!rounded-md !py-2" />
          </Form.Item>
          <Form.Item<IProduct>
            name="customerField"
            label="customer Field"
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
            <Input placeholder="Password" className="!rounded-md !py-2" />
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
                { value: "data", label: "Data" },
                { value: "cable", label: "Data" },
                { value: "utility", label: "Utility" },
                { value: "payment", label: "Payment" },
                { value: "transport", label: "Transport" },
              ]}
            />
          </Form.Item>
          <Form.Item<IProduct>
            name="name"
            label="Product Description"
            className="lg"
          >
            <Input.TextArea
              placeholder="Password"
              className="!rounded-md !py-2"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Product Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              //loading={loading}
              //disabled={loading}
              htmlType="submit"
              className="!rounded-md !shadow-md !py-5"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
export default Product;

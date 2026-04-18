import { App, Button, Form, Grid, Input, Modal, Select, Switch } from "antd";
import { IBiller } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
import { useAddBiller } from "./useService";
const { useBreakpoint } = Grid;
export interface IAddProps {
  product?: IBiller;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const AddBiller: React.FC<IAddProps> = ({
  product,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const client = useQueryClient();
  const { addBiller, isAdding } = useAddBiller();
  const onFinish = async (values: IBiller) => {
    addBiller(values, {
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
      title={product ? "Update Biller" : "Add New Biller"}
    >
      <Form
        //form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          id: product?.id,
          billerName: product?.billerName,
          billerId: product?.billerId,
          customerField: product?.customerField,
          hasAddons: product?.hasAddons,
          hasLookup: product?.hasLookup,
          hasPackages: product?.hasPackages,
          logo: product?.logo,
          maxAmountLimit: product?.maxAmountLimit,
          minAmountLimit: product?.minAmountLimit,
          billerType: product?.billerType,
          product_id: product?.product_id,
          status: product?.status,
        }}
        style={{ minWidth: 320 }}
      >
        <Form.Item<IBiller> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<IBiller> name="product_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<IBiller>
          name="billerName"
          label="Biller Name"
          rules={[
            {
              required: true,
              message: "Please Enter Biller Name!",
            },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item<IBiller>
          name="billerId"
          label="Biller Unique ID"
          rules={[
            {
              required: true,
              message: "Please input your unique biller Id",
            },
          ]}
        >
          <Input placeholder="Enter your unique biller Id" />
        </Form.Item>
        <Form.Item<IBiller>
          name="customerField"
          label="customer Field"
          rules={[
            {
              required: true,
              message: "Please input customer Field",
            },
          ]}
          className="lg"
        >
          <Input placeholder="customer Field" />
        </Form.Item>
        <Form.Item<IBiller>
          name="logo"
          label="Provider logo"
          rules={[
            {
              required: true,
              message: "Please input provider logo url",
            },
          ]}
          className="lg"
        >
          <Input placeholder="Provider Logo" />
        </Form.Item>
        <Form.Item<IBiller>
          label="Biller Type"
          name="billerType"
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
        <Form.Item<IBiller>
          name="hasLookup"
          label="Lookup Status"
          valuePropName="checked"
        >
          <Switch
            style={{ width: "100%" }}
            unCheckedChildren="No validation"
            checkedChildren="Has validation"
          />
        </Form.Item>
        <Form.Item<IBiller>
          name="hasPackages"
          label="Biller Package"
          valuePropName="checked"
        >
          <Switch
            style={{ width: "100%" }}
            unCheckedChildren="No Packages"
            checkedChildren="Has Packages"
          />
        </Form.Item>
        <Form.Item<IBiller>
          name="status"
          label="Biller Status"
          valuePropName="checked"
        >
          <Switch
            style={{ width: "100%" }}
            unCheckedChildren="Inactive Biller"
            checkedChildren="Active Biller"
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
    </Modal>
  );
};
export default AddBiller;

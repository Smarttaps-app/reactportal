import { App, Button, Form, Input, Modal, Select } from "antd";
import { Grid } from "antd";
import { type IBiller, type IUser } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
import { useSwitchBiller } from "./useService";
import { useAdmins } from "../../../hooks/useAdmin";
const { useBreakpoint } = Grid;
export interface IProductProps {
  biller?: IBiller;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const SwitchProvider: React.FC<IProductProps> = ({
  biller,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const client = useQueryClient();
  const { isPending, data, error } = useAdmins("provider");
  const { switchProvider, isAdding } = useSwitchBiller();
  const onFinish = async (values: IBiller) => {
    switchProvider(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () =>
        client.invalidateQueries({ queryKey: ["product", biller?.product_id] }),
    });
  };
  return (
    <Modal
      style={{ top: 30 }}
      open={isOpen}
      maskClosable={false}
      // confirmLoading={updating}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={screens.xs ? "100%" : 450}
      title={
        biller?.provider_id ? "Switch Service Provider" : "Add Service provider"
      }
    >
      <Form
        //form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          id: biller?.id,
          provider_id: biller?.provider_id,
          billerName: biller?.billerName,
        }}
        style={{ minWidth: 320 }}
      >
        <Form.Item<IBiller> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<IBiller>
          name="billerName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please Enter Product Name!",
            },
          ]}
        >
          <Input disabled readOnly placeholder="Enter Product Name" />
        </Form.Item>
        <Form.Item<IBiller>
          label="Provider"
          name="provider_id"
          rules={[
            {
              required: true,
              message: "Please select a provider!",
            },
          ]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            loading={isPending}
            optionLabelProp="label"
            options={data.map((item: IUser) => ({
              label: `${item.lastname} ${item.firstname}`,
              value: item?.id,
            }))}
            notFoundContent={
              error ? (
                <span style={{ color: "red" }}>
                  {Common.formatError(error)}
                </span>
              ) : null
            }
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
export default SwitchProvider;

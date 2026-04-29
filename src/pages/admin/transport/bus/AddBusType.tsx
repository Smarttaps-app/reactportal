import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { IAddProps, IBusType, IUser } from "../../../../utils/type";
import { useAddBusType, useBusProviders } from "./useBus";
const { Option } = Select;

const AddBusType: React.FC<IAddProps<IBusType>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { isPending, busProviders: providers } = useBusProviders();
  const { addBusType, isAdding } = useAddBusType();
  const onFinish: FormProps<IBusType>["onFinish"] = (values) =>
    addBusType(values);
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={isAdding}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      title="Add Bus Type"
    >
      <Form
        layout="vertical"
        initialValues={{
          id: payload?.id,
          admin_id: payload?.admin_id,
          name: payload?.name,
          total_seats: payload?.total_seats,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Form.Item<IBusType> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<IBusType>
          name="name"
          label="Bus Name"
          initialValue={payload?.name}
          rules={[{ required: true, message: "Please enter bus name!" }]}
        >
          <Input placeholder="Enter bus name" className="!rounded-md !py-2" />
        </Form.Item>
        <Form.Item<IBusType> name="total_seats" label="Total Seats">
          <Input
            placeholder="Enter total seats"
            className="!rounded-md !py-2"
          />
        </Form.Item>
        <Form.Item<IBusType>
          label="Select a provider"
          name="admin_id"
          rules={[{ required: true, message: "Please select a provider!" }]}
        >
          <Select loading={isPending}>
            {providers?.map((item: IUser) => (
              <Option key={item.id} value={item.id}>
                {item.companyName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isAdding}
            loading={isAdding}
            className="!rounded-md !shadow-md !py-5"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddBusType;

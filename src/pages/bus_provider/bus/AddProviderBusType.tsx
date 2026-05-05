import { Button, Form, FormProps, Input, Modal } from "antd";
import { IAddProps, IBusType } from "../../../utils/type";
import { useAddBusType } from "./useBus";
import { useUser } from "../../../context/useUser";

const AddProviderBusType: React.FC<IAddProps<IBusType>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { addBusType, isAdding } = useAddBusType();
  const { user } = useUser();
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
          admin_id: user?.id,
          name: payload?.name,
          total_seats: payload?.total_seats,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Form.Item<IBusType> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="admin_id" hidden>
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
export default AddProviderBusType;

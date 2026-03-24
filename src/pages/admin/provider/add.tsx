import {
  App,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  Switch,
} from "antd";
import { IAddProps, IUser, IRole } from "../../../utils/type";
import { useRoles } from "../../../hooks/useRole";
import { useAddAdmin } from "../../../hooks/useAdmin";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
const { Option } = Select;

const AddProvider: React.FC<IAddProps<IUser>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const client = useQueryClient();
  const { isShowing, roles } = useRoles();
  const { addAdmin, isAdding } = useAddAdmin();
  const onFinish: FormProps<IUser>["onFinish"] = (values) => {
    console.log("Success:", values);
    addAdmin(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["admins"] }),
    });
  };
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={isAdding}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={450}
    >
      <Card className="px-16" title="Add New Admin">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<IUser> name="id" hidden initialValue={payload?.id}>
            <Input hidden />
          </Form.Item>
          <Form.Item<IUser>
            label="First Name"
            name="firstname"
            initialValue={payload?.firstname}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="LastName"
            name="lastname"
            initialValue={payload?.lastname}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Phone Number"
            name="phonenumber"
            initialValue={payload?.phonenumber}
            rules={[{ required: true, message: "Please input length!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IUser>
            label="Email Address"
            name="email"
            initialValue={payload?.email}
            rules={[{ required: true, message: "Please input email address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Role"
            name="tag"
            initialValue={payload?.tag}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              //onChange={handleChange}
              loading={isShowing}
            >
              {roles?.map((item: IRole) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<IUser>
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch
              defaultValue={payload?.status}
              unCheckedChildren="Inactive"
              checkedChildren="Active"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={isAdding}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
export default AddProvider;

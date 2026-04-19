import {
  App,
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import { IAddProps, IUser } from "../../../utils/type";
import { useAddAdmin } from "../../../hooks/useAdmin";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";
const { Option } = Select;

const AddProvider: React.FC<IAddProps<IUser>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { addAdmin, isAdding } = useAddAdmin();
  const onFinish: FormProps<IUser>["onFinish"] = (values) => {
    console.log("Success:", values);
    addAdmin(values, {
      onSuccess: (data) => {
        notification.success({
          message: payload ? "Edit Business Provider" : "Add Business Provider",
          description: data.statusDescription,
        });
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: payload ? "Edit Business Provider" : "Add Business Provider",
          description: Common.formatError(error),
        });
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
      width={650}
      title={payload ? "Edit Business Provider" : "Add Business Provider"}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          id: payload?.id,
          firstname: payload?.firstname,
          lastname: payload?.lastname,
          companyName: payload?.companyName,
          companyAddress: payload?.companyAddress,
          provider_auth: payload?.provider_auth,
          provider_url: payload?.provider_url,
          email: payload?.email,
          identifier: payload?.identifier,
          phonenumber: payload?.phonenumber,
          status: payload?.status,
          tag: payload?.tag,
        }}
        onFinish={onFinish}
      >
        <Row gutter={[8, 8]}>
          <Form.Item<IUser> name="id" hidden>
            <Input hidden />
          </Form.Item>

          <Col xs={24} sm={24} md={12}>
            <Form.Item<IUser>
              label="Contact First Name"
              name="firstname"
              rules={[{ required: true, message: "Please input word!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IUser>
              label="company Name"
              name="companyName"
              rules={[{ required: true, message: "Please input length!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IUser>
              label="Company Phone Number"
              name="phonenumber"
              rules={[{ required: true, message: "Please input length!" }]}
            >
              <Input />
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
                className="!w-full"
              />
            </Form.Item>
            <Form.Item<IUser>
              label="Base URL"
              name="provider_url"
              initialValue={payload?.provider_url}
              rules={[
                {
                  required: true,
                  message: "Please input provider base url!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item<IUser>
              label="Contact LastName"
              name="lastname"
              initialValue={payload?.lastname}
              rules={[{ required: true, message: "Please input word!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IUser>
              label="Company Address"
              name="companyAddress"
              rules={[
                {
                  required: true,
                  message: "Please input provider company address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IUser>
              label="Company Email Address"
              name="email"
              initialValue={payload?.email}
              rules={[
                { required: true, message: "Please input email address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IUser>
              label="Role"
              name="tag"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Select>
                <Option key="provider" value="provider">
                  Service Provider
                </Option>
                <Option key="busprovider" value="busprovider">
                  Bus Provider
                </Option>
                <Option key="trainprovider" value="trainprovider">
                  Train Provider
                </Option>
              </Select>
            </Form.Item>
            <Form.Item<IUser>
              label="Provider Identifier"
              name="identifier"
              initialValue={payload?.identifier}
              rules={[
                {
                  required: true,
                  message: "Please input provider identifier",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<IUser>
          label="Provider Token"
          name="provider_auth"
          initialValue={payload?.tag}
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isAdding}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddProvider;

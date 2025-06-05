import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { IAddProps, IRole } from "../../../utils/type";
import { useAddRole } from "../../../hooks/useRole";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../utils/Common";

const Add: React.FC<IAddProps<IRole>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const { addRole, isAdding } = useAddRole();
  const onFinish: FormProps<IRole>["onFinish"] = (values) => {
    console.log("Success:", values);
    addRole(values, {
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
      width={500}
    >
      <Card className="px-16" title="Add New Role">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<IRole> name="id" hidden initialValue={payload?.id}>
            <Input hidden size="large" />
          </Form.Item>
          <Form.Item<IRole>
            label="Role Name"
            name="name"
            initialValue={payload?.name}
            rules={[{ required: true, message: "Please input Role name!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<IRole>
            label="Role Tag"
            name="tag"
            initialValue={payload?.tag}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              size="large"
              options={[
                { value: "admin", label: "Admin" },
                { value: "business", label: "Business" },
                { value: "accountant", label: "Accountant" },
                { value: "audit", label: "Audit" },
                { value: "support", label: "Support" },
              ]}
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
export default Add;

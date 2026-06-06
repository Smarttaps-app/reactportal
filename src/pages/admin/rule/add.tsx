import {
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { IAddProps, IRule } from "../../../utils/type";
import { useAddRule } from "./useAddRule";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { TextArea } = Input;

const AddRule: React.FC<IAddProps<IRule>> = ({ isOpen = false, onCancel }) => {
  const navigate = useNavigate();
  const { isAdding, addRule } = useAddRule();
  const onFinish: FormProps<IRule>["onFinish"] = (values) => {
    console.log("Success:", values);
    addRule(values, {
      onSuccess: (data: any) => {
        toast.success(data.statusDescription);
      },
      onSettled: () => navigate(-1),
    });
  };
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      // confirmLoading={updating}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
      width={800}
    >
      <Row>
        <Col span={12} offset={6}>
          <Card className="px-16" title="Add new Rule">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<IRule>
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<IRule>
                label="Code"
                name="code"
                rules={[{ required: true, message: "Please input code!" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<IRule>
                label="Mode"
                name="mode"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "arranged", label: "arranged" },
                    { value: "matched", label: "matched" },
                  ]}
                />
              </Form.Item>
              <Form.Item<IRule>
                label="Description"
                name="message"
                rules={[{ required: true, message: "Please input message!" }]}
              >
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 1 }}>
                <Button type="primary" htmlType="submit" loading={isAdding}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};
export default AddRule;

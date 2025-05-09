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
import { IAddProps, IInstruction } from "../../../utils/type";
import { useAddInstruction } from "./useAddInstruction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { TextArea } = Input;

const AddInstruction: React.FC<IAddProps> = ({ isOpen = false, onCancel }) => {
  const navigate = useNavigate();
  const { isAdding, addInstruction } = useAddInstruction();
  const onFinish: FormProps<IInstruction>["onFinish"] = (values) => {
    console.log("Success:", values);
    addInstruction(values, {
      onSuccess: (data) => {
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
          <Card className="px-16" title="Add new Instruction">
            <Form
              name="basic"
              layout="vertical"
              //{...formItemLayout}
              //style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<IInstruction>
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<IInstruction>
                label="Code"
                name="code"
                rules={[{ required: true, message: "Please input code!" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<IInstruction>
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
              <Form.Item<IInstruction>
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
export default AddInstruction;

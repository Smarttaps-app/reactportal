import { Button, Card, Col, Form, FormProps, Input, Modal, Row } from "antd";
import { IAddProps, INotification } from "../../../utils/type";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddNotification } from "../../../hooks/useNotification";

const { TextArea } = Input;

const AddNotification: React.FC<IAddProps<INotification>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const navigate = useNavigate();
  const { isAdding, addNotification } = useAddNotification();
  const onFinish: FormProps<INotification>["onFinish"] = (values) => {
    console.log("Success:", values);
    addNotification(values, {
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
          <Card className="px-16" title="Add new Notification">
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
              <Form.Item<INotification>
                label="Title"
                name="title"
                initialValue={payload?.title}
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<INotification>
                label="Description"
                name="message"
                initialValue={payload?.message}
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
export default AddNotification;

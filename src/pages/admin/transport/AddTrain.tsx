import {
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import { Grid } from "antd";
import { IAddProps, ITrain } from "../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTrain } from "../../../hooks/useTransport";
import { Common } from "../../../utils/Common";
const { useBreakpoint } = Grid;

const AddTrain: React.FC<IAddProps<ITrain>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addTrain, isAdding } = useAddTrain();
  const onFinish: FormProps<ITrain>["onFinish"] = (values) => {
    console.log("Success:", values);
    addTrain(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["stations"] }),
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
      width={screens.xs ? "100%" : 450}
    >
      <Card title="Add Train">
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                name="name"
                label="Package Name"
                initialValue={payload?.name}
                rules={[
                  { required: true, message: "Please enter package name!" },
                ]}
              >
                <Input
                  placeholder="Enter package name"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                name="customerField"
                label="Customer Field"
                rules={[
                  { required: true, message: "Please enter customer field!" },
                  { min: 5, message: "Minimum 5 characters" },
                ]}
              >
                <Input
                  placeholder="Enter customer field"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                label="Package Type"
                name="vasType"
                rules={[
                  { required: true, message: "Please select package type!" },
                ]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "airtime", label: "Airtime" },
                    { value: "data", label: "Data" },
                    { value: "cable", label: "Cable" },
                    { value: "utility", label: "Utility" },
                    { value: "payment", label: "Payment" },
                    { value: "transport", label: "Transport" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item<ITrain> name="description" label="Package Description">
                <Input.TextArea
                  placeholder="Enter description"
                  className="!rounded-md !py-2"
                  rows={4}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Package Status"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={24}>
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
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
};
export default AddTrain;

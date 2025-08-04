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
} from "antd";
import { Grid } from "antd";
import { IAddProps, ILedger } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useAddLedger } from "../../../../hooks/useAccounting";
const { useBreakpoint } = Grid;

const AddLedger: React.FC<IAddProps<ILedger>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addLedger, isAdding } = useAddLedger();
  const onFinish: FormProps<ILedger>["onFinish"] = (values) => {
    console.log("Success:", values);
    addLedger(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        // onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["ledgers"] }),
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
      <Card title="Add Ledger">
        <Form
          layout="vertical"
          preserve={false}
          initialValues={{
            id: payload?.id,
            name: payload?.name,
            code: payload?.code,
            gl_type: payload?.gl_type,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ILedger> name="id" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item<ILedger> name="code" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item<ILedger>
                name="name"
                label="Ledger Name"
                rules={[
                  { required: true, message: "Please enter ledger name!" },
                ]}
              >
                <Input
                  placeholder="Enter ledger name"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ILedger>
                label="Ledger Type"
                name="gl_type"
                rules={[
                  { required: true, message: "Please select ledger type!" },
                ]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "asset", label: "Asset" },
                    { value: "expenses", label: "Expenses" },
                    { value: "equity", label: "Equity" },
                    { value: "liability", label: "Liability" },
                    { value: "revenue", label: "Revenue" },
                  ]}
                />
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
export default AddLedger;

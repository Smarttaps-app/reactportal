import {
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
import { Grid } from "antd";
import {
  IAddProps,
  ILedger,
  IPostingRule,
  IProduct,
} from "../../../../utils/type";
import { useProducts } from "../../product/useService";
import { useAddPostingRule, useLedgers } from "../useAccounting";
const { useBreakpoint } = Grid;
const { Option } = Select;

const Add: React.FC<IAddProps<IPostingRule>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const screens = useBreakpoint();
  const { loading, products, error } = useProducts();
  const { loading: pending, ledgers, error: err } = useLedgers();
  const { add, isAdding } = useAddPostingRule();
  const onFinish: FormProps<IPostingRule>["onFinish"] = (values) =>
    add(values, {
      onSettled: onCancel,
    });
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
      title="Add Posting Rule"
    >
      <Form
        layout="vertical"
        preserve={false}
        initialValues={{
          id: payload?.id,
          account_code: payload?.account_code,
          account_role: payload?.account_role,
          transaction_type: payload?.transaction_type,
          entry_type: payload?.entry_type,
          is_active: payload?.is_active,
          priority: payload?.priority,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item<IPostingRule> name="id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item<IPostingRule>
              label="Select transaction type"
              name="transaction_type"
              rules={[{ required: true, message: "Please transaction type!" }]}
            >
              <Select loading={loading}>
                {products?.map((item: IProduct) => (
                  <Option key={item.vasType} value={item.vasType}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<IPostingRule>
              label="Entry Type"
              name="entry_type"
              rules={[{ required: true, message: "Please select entry type!" }]}
            >
              <Select
                options={[
                  { value: "CREDIT", label: "CREDIT" },
                  { value: "DEBIT", label: "DEBIT" },
                ]}
              />
            </Form.Item>
            <Form.Item<IPostingRule>
              name="account_role"
              label="Account Role"
              rules={[
                { required: true, message: "Please enter account role!" },
              ]}
            >
              <Input placeholder="Enter account role" />
            </Form.Item>
            <Form.Item<IPostingRule>
              label="Select GL Account"
              name="account_code"
              rules={[{ required: true, message: "Please GL Account!" }]}
            >
              <Select loading={pending}>
                {ledgers?.map((item: ILedger) => (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<IPostingRule>
              label="Priority"
              name="priority"
              rules={[{ required: true, message: "Please select priority" }]}
            >
              <Select
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
              />
            </Form.Item>
            <Form.Item<IPostingRule>
              name="is_active"
              label="Activate "
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Activate"
                unCheckedChildren="Deactivate"
                className="!w-full"
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
    </Modal>
  );
};
export default Add;

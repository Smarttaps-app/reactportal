import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  App,
  Switch,
  Input,
} from "antd";
import { Grid } from "antd";
import {
  IAddProps,
  IBiller,
  IDiscount,
  ILedger,
  IUser,
} from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import {
  useAddDiscount,
  useLedgers,
  useProductServices,
  useProviders,
} from "../useAccounting";
const { useBreakpoint } = Grid;

const AddDiscount: React.FC<IAddProps<IDiscount>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { loading: isPending, providers } = useProviders();
  const { loading, services } = useProductServices();
  const { loading: waiting, ledgers } = useLedgers();
  const { addDiscount, isAdding } = useAddDiscount();
  const onFinish = async (values: IDiscount) => {
    addDiscount(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        // onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["discounts"] }),
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
      <Card title="Add Provider Discount">
        <Form
          layout="vertical"
          preserve={false}
          initialValues={{
            id: payload?.id,
            product_type_id: payload?.product_type_id,
            provider_discount_rate: payload?.provider_discount_rate,
            provider_discount_type: payload?.provider_discount_type,
            admin_id: payload?.admin_id,
            active: payload?.active,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item<IBiller> name="id" hidden>
              <Input />
            </Form.Item>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                label="Provider"
                name="admin_id"
                rules={[
                  {
                    required: true,
                    message: "Please select a provider!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isPending}
                  optionLabelProp="label"
                  options={providers.map((item: IUser) => ({
                    label: `${item.firstname} → ${item.lastname}`,
                    value: item.id,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                label="Biller"
                name="product_type_id"
                rules={[
                  {
                    required: true,
                    message: "Please select a biller!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={loading}
                  optionLabelProp="label"
                  options={services.map((item: IBiller) => ({
                    label: `${item.billerName}`,
                    value: item.id,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                label="Provider Discount Rate"
                name="provider_discount_rate"
                rules={[
                  {
                    required: true,
                    message: "Please provider discount rate is required!",
                  },
                ]}
              >
                <InputNumber
                  suffix="Rate"
                  style={{ width: "100%" }}
                  min={1}
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                label="Discount Type"
                name="provider_discount_type"
                rules={[
                  { required: true, message: "Please select discount type!" },
                ]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "percentage", label: "Percentage" },
                    { value: "calculated", label: "Calculated" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                label="Account GL"
                name="gl_to_provider"
                rules={[
                  {
                    required: true,
                    message: "Please select a GL Account!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={waiting}
                  optionLabelProp="label"
                  options={ledgers.map((item: ILedger) => ({
                    label: `${item.name}`,
                    value: item.code,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IDiscount>
                name="active"
                label="Discount Status"
                valuePropName="checked"
              >
                <Switch
                  style={{ width: "100%" }}
                  unCheckedChildren="Not Active"
                  checkedChildren="Active"
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
export default AddDiscount;

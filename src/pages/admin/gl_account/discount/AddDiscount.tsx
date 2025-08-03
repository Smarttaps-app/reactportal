import {
  Button,
  Card,
  Col,
  Form,
  FormProps,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { Grid } from "antd";
import { IAddProps, IBiller, IDiscount, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useAddDiscount } from "../../../../hooks/useAccounting";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useProductServices } from "../../../../hooks/useProduct";
const { useBreakpoint } = Grid;

const AddDiscount: React.FC<IAddProps<IDiscount>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { isPending, data } = useAdmins();
  const { loading, services } = useProductServices();
  const { addDiscount, isAdding } = useAddDiscount();
  const onFinish: FormProps<IDiscount>["onFinish"] = (values) => {
    console.log("Success:", values);
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
            name: payload?.product_type_id,
            code: payload?.provider_discount_rate,
            gl_type: payload?.provider_discount_type,
            admin_id: payload?.admin_id,
            active: payload?.active,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
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
                label="Merchants"
                name="admin_id"
                rules={[
                  {
                    required: true,
                    message: "Please select a merchant!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isPending}
                  optionLabelProp="label"
                  options={data.map((item: IUser) => ({
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
                  className="!rounded-md "
                  style={{ width: "100%" }}
                  min={5}
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

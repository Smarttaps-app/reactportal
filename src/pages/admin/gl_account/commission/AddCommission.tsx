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
import {
  IAddProps,
  IBiller,
  ICommission,
  ILedger,
  IUser,
} from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useAddCommission } from "../../../../hooks/useAccounting";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useProductServices } from "../../../../hooks/useProduct";
import { useLedgers } from "../useAccounting";
const { useBreakpoint } = Grid;

const AddCommission: React.FC<IAddProps<ICommission>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { isPending, data } = useAdmins("external");
  const { loading, services } = useProductServices();
  const { loading: waiting, ledgers } = useLedgers();
  const { addCommission, isAdding } = useAddCommission();
  const onFinish: FormProps<ICommission>["onFinish"] = (values) => {
    console.log("Success:", values);
    addCommission(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        // onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["commissions"] }),
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
      title="Add Commission"
    >
      <Form
        layout="vertical"
        preserve={false}
        initialValues={{
          id: payload?.id,
          commission_rate: payload?.commission_rate,
          commission_type: payload?.commission_type,
          product_type_id: payload?.product_type_id,
          admin_id: payload?.admin_id,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item<ICommission>
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
            <Form.Item<ICommission>
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
            <Form.Item<ICommission>
              label="Commission Rate"
              name="commission_rate"
              rules={[
                {
                  required: true,
                  message: "Please provider commission rate is required!",
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
            <Form.Item<ICommission>
              label="Commission Type"
              name="commission_type"
              rules={[
                { required: true, message: "Please select commission type!" },
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
            <Form.Item<ICommission>
              label="Account GL"
              name="glcode"
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
export default AddCommission;

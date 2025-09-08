import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import { Grid } from "antd";
import { IAddProps, IBus, IRoute, ISchedule } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddBus,
  useTRoutes,
  useTSchedules,
} from "../../../../hooks/useTransport";
import { Common } from "../../../../utils/Common";
const { useBreakpoint } = Grid;

const AddBus: React.FC<IAddProps<IBus>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { loading, routes } = useTRoutes();
  const { loading: waiting, schedules } = useTSchedules();
  const { addBus, isAdding } = useAddBus();
  const onFinish = async (values: IBus) => {
    addBus(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["buses"] }),
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
      width={screens.xs ? "100%" : 650}
    >
      <Card title="Add Bus">
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item<IBus> name="id" hidden initialValue={payload?.id}>
              <Input hidden />
            </Form.Item>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                name="name"
                label="Bus Name"
                initialValue={payload?.name}
                rules={[{ required: true, message: "Please enter bus name!" }]}
              >
                <Input placeholder="Enter bus name" className="!rounded-md " />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                name="bus_number"
                label="bus number"
                initialValue={payload?.bus_number}
                rules={[
                  { required: true, message: "Please enter bus Number!" },
                ]}
              >
                <Input
                  placeholder="Enter bus number"
                  className="!rounded-md "
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                name="base_price"
                label="base price"
                initialValue={payload?.base_price}
                rules={[
                  { required: true, message: "Please enter base price!" },
                ]}
              >
                <Input
                  placeholder="Enter base price"
                  className="!rounded-md "
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                label="Seat Count"
                name="seatCount"
                initialValue={payload?.seatCount}
                rules={[
                  { required: true, message: "Please seat count is required!" },
                ]}
              >
                <InputNumber
                  suffix="Seat"
                  className="!rounded-md "
                  style={{ width: "100%" }}
                  min={5}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                label="Bus Route"
                name="busroutes"
                initialValue={payload?.busroutes}
                rules={[{ required: true, message: "Please bus routes!" }]}
              >
                <Select
                  showSearch
                  loading={loading}
                  mode="multiple"
                  // onChange={onPricingChange}
                  optionLabelProp="label"
                  options={routes.map((item: IRoute) => ({
                    label: `${item.routeName}`,
                    value: item.id,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<IBus>
                label="Bus Schedule"
                name="busschedules"
                rules={[{ required: true, message: "Please bus schedules" }]}
              >
                <Select
                  showSearch
                  loading={waiting}
                  mode="multiple"
                  // onChange={onPricingChange}
                  optionLabelProp="label"
                  options={schedules.map((item: ISchedule) => ({
                    label: `${item.timeOfOperation}  ${item.departureTime}`,
                    value: item.id,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="airCondition"
                label="Air condiction"
                valuePropName="checked"
                initialValue={payload?.airCondition}
              >
                <Switch
                  defaultValue={payload?.airCondition}
                  unCheckedChildren="No Air condiction"
                  checkedChildren="Air condiction"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="tv"
                label="Television"
                valuePropName="checked"
                initialValue={payload?.tv}
              >
                <Switch
                  defaultValue={payload?.tv}
                  unCheckedChildren="No Television"
                  checkedChildren="Television"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="camera"
                label="Camera"
                valuePropName="checked"
                initialValue={payload?.camera}
              >
                <Switch
                  defaultValue={payload?.camera}
                  unCheckedChildren="No Camera"
                  checkedChildren="Camera"
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item<IBus>
                name="description"
                label="Bus Description"
                initialValue={payload?.description}
              >
                <Input.TextArea
                  placeholder="Enter description"
                  className="!rounded-md "
                  rows={4}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
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
export default AddBus;

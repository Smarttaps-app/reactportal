import {
  Button,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  TimePicker,
} from "antd";
import {
  IAddProps,
  IBus,
  IBusRoute,
  ISchedule,
  IUser,
} from "../../../../utils/type";
import {
  useAddBusSchedule,
  useBusesViaAdmin,
  useBusProviders,
  useRoutesViaAdmin,
} from "./useBus";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { CheckboxGroupProps } from "antd/es/checkbox";

const options: CheckboxGroupProps<string>["options"] = [
  { label: "Daily", value: "1" },
  { label: "Weekly", value: "2" },
  { label: "Monthly", value: "3" },
];
dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const { Option } = Select;
const { useBreakpoint } = Grid;

const AddSchedule: React.FC<IAddProps<ISchedule>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [providerId, setProviderId] = useState(null);
  const { addSchedule, isAdding } = useAddBusSchedule();
  const { isPending, busProviders: providers } = useBusProviders();
  const { loadingRoutes, routes } = useRoutesViaAdmin(providerId!);
  const { loadingBuses, buses } = useBusesViaAdmin(providerId!);

  const onFinish = async (values: ISchedule) => {
    values.arrivalTime = values.arrivalTime?.format("HH:mm a").toUpperCase();
    values.departureTime = values.departureTime
      ?.format("HH:mm a")
      .toUpperCase();
    addSchedule(values, {
      onSuccess: () => onCancel(),
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
      title="Add Schedule"
      width={screens.xs ? "100%" : 650}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          mode: "bus",
          timeOfOperation: payload?.timeOfOperation,
          arrivalTime: payload?.arrivalTime,
          departureTime: payload?.departureTime,
          identifier: payload?.identifier,
          admin_id: payload?.admin_id,
        }}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Form.Item<ISchedule> name="mode" hidden>
            <Input />
          </Form.Item>
          <Col xs={24} sm={24} md={12}>
            <Form.Item<ISchedule>
              label="Select a provider"
              name="admin_id"
              rules={[{ required: true, message: "Please select a provider!" }]}
            >
              <Select
                onChange={(value) => setProviderId(value)}
                loading={isPending}
              >
                {providers?.map((item: IUser) => (
                  <Option key={item.id} value={item.id}>
                    {item.companyName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<ISchedule>
              name="bus_id"
              label="Trip Bus"
              rules={[
                {
                  required: true,
                  message: "Please select a bus for the trip",
                },
              ]}
            >
              <Select
                loading={loadingBuses}
                disabled={!providerId}
                placeholder="Select trip bus"
                showSearch
                optionFilterProp="children"
              >
                {buses?.map((bus: IBus) => (
                  <Option key={bus.id} value={bus.id}>
                    {bus.name} {bus.bus_number}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<ISchedule>
              name="timeOfOperation"
              label="Select Operation Period"
              rules={[
                {
                  required: true,
                  message: "Please choose Operation Period",
                },
              ]}
            >
              <Select
                showSearch
                loading={isAdding}
                disabled={isAdding}
                placeholder="Choose Operation Period"
                options={[
                  { value: "Morning", label: "Morning" },
                  { value: "Afternoon", label: "Afternoon" },
                  { value: "Evening", label: "Evening" },
                  { value: "Night", label: "Night" },
                ]}
              />
            </Form.Item>
            <Form.Item<ISchedule>
              name="arrivalTime"
              label="Arrival time "
              rules={[
                { required: true, message: "Please enter arrival time!" },
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                use12Hours
                format="h:mm a"
              />
            </Form.Item>
            <Form.Item name="auto" label="Auto Run" valuePropName="checked">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                className="!w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item<ISchedule>
              name="bus_route_id"
              label="Trip Route"
              rules={[
                {
                  required: true,
                  message: "Please select a route for the trip",
                },
              ]}
            >
              <Select
                loading={loadingRoutes}
                disabled={!providerId}
                placeholder="Select trip route"
                showSearch
                optionFilterProp="children"
              >
                {routes?.map((route: IBusRoute) => (
                  <Option key={route.id} value={route.id}>
                    {route.routeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<ISchedule>
              name="status"
              label="Select trip status"
              rules={[
                {
                  required: true,
                  message: "Please choose a trip status",
                },
              ]}
            >
              <Select
                showSearch
                loading={isAdding}
                disabled={isAdding}
                placeholder="Choose trip status"
                options={[
                  { value: "BOARDING", label: "BOARDING" },
                  { value: "CANCELLED", label: "CANCELLED" },
                  { value: "COMPLETED", label: "COMPLETED" },
                  { value: "FULL", label: "FULL" },
                  { value: "IN_PROGRESS", label: "IN PROGRESS" },
                  { value: "SCHEDULED", label: "SCHEDULED" },
                ]}
              />
            </Form.Item>
            <Form.Item<ISchedule>
              name="trip_Date"
              label="Trip Date "
              rules={[{ required: true, message: "Please enter trip date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs()}
                minDate={dayjs()}
                //maxDate={dayjs("2020-10-31", dateFormat)}
                maxDate={dayjs().add(5, "day")}
              />
            </Form.Item>
            <Form.Item<ISchedule>
              name="departureTime"
              label="Departure time"
              rules={[
                { required: true, message: "Please enter departure time!" },
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                use12Hours
                format="h:mm a"
              />
            </Form.Item>
            <Form.Item
              name="returned"
              label="Return Trip"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="recuring" label="Recuring">
              <Radio.Group
                block
                options={options}
                defaultValue="1"
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
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
export default AddSchedule;

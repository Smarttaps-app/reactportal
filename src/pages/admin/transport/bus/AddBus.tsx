import {
  App,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  TimePicker,
} from "antd";
import { Grid } from "antd";
import dayjs from "dayjs";
import { IAddProps, IBus, IStation } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "../../../../context/useUser";
import { useAddBus, useStations } from "./useBus";
const { useBreakpoint } = Grid;

const AddBus: React.FC<IAddProps<IBus>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { notification } = App.useApp();
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { loading: pending, stations } = useStations();
  const { addBus, isAdding } = useAddBus();
  const onFinish = async (values: IBus) => {
    const formattedSchedules = values.schedules?.map((schedule) => ({
      ...schedule,
      departureTime: dayjs(schedule.departureTime).format("HH:mm A"),
      arrivalTime: dayjs(schedule.arrivalTime).format("HH:mm A"),
    }));
    const payload = {
      ...values,
      schedules: formattedSchedules,
    };
    addBus(payload as any, {
      onSuccess: (data) => {
        notification.success({
          description: data.statusDescription,
          message: "Add Bus",
        });
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Add Bus",
          description: Common.formatError(error),
        });
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["buses"] }),
    });
  };
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={isAdding}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={screens.xs ? "100%" : 850}
      title={payload ? "Edit Bus" : "Add Bus"}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          id: payload?.id,
          identifier: payload?.identifier,
          bus_capacity: payload?.bus_capacity,
          availabilityStatus: payload?.availabilityStatus,
          admin_id: user?.identifier,
          airCondition: payload?.airCondition || false,
          tv: payload?.tv || false,
          camera: payload?.camera || false,
          name: payload?.name,
          bus_number: payload?.bus_number,
          base_price: payload?.base_price,
          description: payload?.description,
          routes: payload?.routes?.map((r) => ({
            ...r,
            departure: r.sourceStation.identifier,
            arrival: r.destinationStation.identifier,
            price: r.baseprice,
          })),
          schedules: payload?.schedules?.map((s) => ({
            ...s,
            timeOfOperation: s.timeOfOperation,
            departureTime: dayjs(s.departureTime, "HH:mm"),
            arrivalTime: dayjs(s.arrivalTime, "HH:mm"),
            price: s.price,
          })),
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[8, 8]}>
          <Form.Item<IBus> name="id" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item<IBus> name="identifier" hidden>
            <Input hidden />
          </Form.Item>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus>
              name="name"
              label="Bus Name"
              rules={[{ required: true, message: "Please enter bus name!" }]}
            >
              <Input placeholder="Enter bus name" className="!rounded-md " />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus>
              name="bus_number"
              label="bus number"
              rules={[{ required: true, message: "Please enter bus Number!" }]}
            >
              <Input placeholder="Enter bus number" className="!rounded-md " />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus>
              name="bus_capacity"
              label="Available Seat"
              rules={[{ required: true, message: "Please enter total seat!" }]}
            >
              <Input placeholder="Enter seat counts" className="!rounded-md " />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus>
              name="availabilityStatus"
              label="Bus Availablity"
              rules={[
                { required: true, message: "Please select bus availablity!" },
              ]}
            >
              <Select
                showSearch
                loading={pending}
                options={[
                  { value: "ACTIVE", label: "Active" },
                  { value: "BOARDING", label: "Boarding" },
                  { value: "TRANSIT", label: "In-transit" },
                  { value: "OPEN", label: "Open" },
                  { value: "CLOSED", label: "Closed" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus>
              name="base_price"
              label="Addon price"
              rules={[{ required: true, message: "Please enter Addon price!" }]}
            >
              <Input placeholder="Enter Addon price" className="!rounded-md " />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item<IBus> name="description" label="Bus Description">
              <Input.TextArea
                placeholder="Enter description"
                className="!rounded-md "
                rows={1}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="airCondition" label="AC" valuePropName="checked">
              <Switch
                unCheckedChildren="No AC"
                checkedChildren="AC"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="tv" label="TV" valuePropName="checked">
              <Switch
                unCheckedChildren="No Television"
                checkedChildren="Television"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="camera" label="Camera" valuePropName="checked">
              <Switch
                unCheckedChildren="No Camera"
                checkedChildren="Camera"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.List name="routes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center mb-2"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "departure"]}
                        label="Select Source Station"
                        rules={[
                          {
                            required: true,
                            message: "Please choose a station",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          loading={pending}
                          optionLabelProp="label"
                          options={stations.map((item: IStation) => ({
                            label: item.stationName,
                            value: item.identifier,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "arrival"]}
                        label="Select Destination Station"
                        rules={[
                          {
                            required: true,
                            message: "Please choose destination!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          loading={pending}
                          optionLabelProp="label"
                          options={stations.map((item: IStation) => ({
                            label: item.stationName,
                            value: item.identifier,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Price"
                        rules={[
                          { required: true, message: "Price is missing" },
                        ]}
                      >
                        <Input
                          placeholder="Please input Price"
                          suffix={
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          }
                        />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Bus Route
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.List name="schedules">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-3 items-justify mb-2"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "timeOfOperation"]}
                        label="Select Period"
                        rules={[
                          {
                            required: true,
                            message: "Please choose a period",
                          },
                        ]}
                        className="col-span-2"
                      >
                        <Select
                          showSearch
                          loading={isAdding}
                          disabled={isAdding}
                          placeholder="Choose Period"
                          options={[
                            { value: "Morning", label: "Morning" },
                            { value: "Afternoon", label: "Afternoon" },
                            { value: "Evening", label: "Evening" },
                            { value: "Night", label: "Night" },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "departureTime"]}
                        label="Departure"
                        rules={[
                          {
                            required: true,
                            message: "Please enter departure time!",
                          },
                        ]}
                        className="col-span-2"
                      >
                        <TimePicker className="w-full" format="HH:mm" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "arrivalTime"]}
                        label="Arrival"
                        rules={[
                          {
                            required: true,
                            message: "Please enter arrival time!",
                          },
                        ]}
                        className="col-span-2"
                      >
                        <TimePicker className="w-full" format="HH:mm" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Price"
                        rules={[
                          {
                            required: true,
                            message: "Price is missing",
                          },
                        ]}
                        className="col-span-2"
                      >
                        <Input placeholder="Please input Price" />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          icon={<MinusCircleOutlined />}
                          type="primary"
                          className="!mt-6"
                          onClick={() => remove(name)}
                        ></Button>
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Bus Schedule
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item<IBus> name="admin_id" hidden>
              <Input />
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
    </Modal>
  );
};
export default AddBus;

import {
  App,
  Button,
  Card,
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
import { IAddProps, IBus, IRoute, IStation } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
//import { useAddBus, useTRoutes } from "../../../../hooks/useTransport";
import { Common } from "../../../../utils/Common";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "../../../../context/useUser";
import { useAddBus, useStations, useTRoutes } from "./useBus";
import { useEffect } from "react";
const { useBreakpoint } = Grid;

const AddBus: React.FC<IAddProps<IBus>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { message } = App.useApp();
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { loading, routes } = useTRoutes();
  const { loading: pending, stations } = useStations();
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
  const [form] = Form.useForm();
  useEffect(() => {
    if (isOpen) {
      handleOpenModal(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, payload]);
  //const [form] = Form.useForm();
  //const isEditMode = Boolean(payload);
  //const title = isEditMode ? "Edit Bus" : "Add Bus";
  //const actionText = isEditMode ? "Update" : "Submit";
  const handleOpenModal = (busData?: IBus) => {
    if (busData) {
      // Editing existing bus
      form.setFieldsValue({
        ...busData,
        routes: busData.routes?.length
          ? busData.routes
          : [{ departure: undefined, arrival: undefined, price: "" }],
        schedules: busData.schedules?.length
          ? busData.schedules
          : [
              {
                timeOfOperation: "",
                departureTime: "",
                arrivalTime: "",
                price: "",
              },
            ],
      });
    } else {
      // Adding new bus
      form.resetFields();
      form.setFieldsValue({
        routes: [{ departure: undefined, arrival: undefined, price: "" }],
        schedules: [
          {
            timeOfOperation: "",
            departureTime: undefined,
            arrivalTime: undefined,
            price: "",
          },
        ],
      });
    }
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
      width={screens.xs ? "100%" : 850}
    >
      <Card title="Add Bus">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            identifier: payload?.identifier,
            admin_id: user?.identifier,
            airCondition: false,
            tv: false,
            camera: false,
            name: payload?.name,
            bus_number: payload?.bus_number,
            base_price: payload?.base_price,
            description: payload?.description,
            routes: [{ departure: undefined, arrival: undefined, price: "" }],
            schedules: [
              {
                timeOfOperation: "",
                departureTime: undefined,
                arrivalTime: undefined,
                price: "",
              },
            ],
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[8, 8]}>
            <Form.Item<IBus>
              name="identifier"
              hidden
              initialValue={payload?.identifier}
            >
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
                label="Addon price"
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
                name="description"
                label="Bus Description"
                initialValue={payload?.description}
              >
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
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
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
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center mb-2"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "timeOfOperation"]}
                          label="Select Period"
                          //initialValue={payload?.seatCount}
                          rules={[
                            {
                              required: true,
                              message: "Please choose a period",
                            },
                          ]}
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
                        >
                          <TimePicker
                            className="w-full"
                            use12Hours
                            format="h:mm a"
                          />
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
                        >
                          <TimePicker
                            className="w-full"
                            use12Hours
                            format="h:mm a"
                          />
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
                        >
                          <Input
                            placeholder="Please input Price"
                            suffix={
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
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
                        Add Bus Schedule
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IRoute>
                name="admin_id"
                initialValue={user?.identifier}
                hidden
              >
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
      </Card>
    </Modal>
  );
};
export default AddBus;

import {
  App,
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
} from "antd";
import { Grid } from "antd";
import dayjs from "dayjs";
import { IAddProps, ITrain, ITrainRoute } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTrain, useTRoutes } from "../../../../hooks/useTransport";
import { Common } from "../../../../utils/Common";
import { useUser } from "../../../../context/useUser";
//import { useAdmins } from "../../../../hooks/useAdmin";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;
//const { Option } = Select;

const AddTrain: React.FC<IAddProps<ITrain>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  //const { isPending, data: providers } = useAdmins("trainprovider");
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { notification } = App.useApp();
  const { addTrain, isAdding } = useAddTrain();
  const { loading, routes } = useTRoutes();
  const onFinish: FormProps<ITrain>["onFinish"] = (values) => {
    const formattedSchedules = values.schedules?.map((schedule) => ({
      ...schedule,
      departureTime: dayjs(schedule.departureTime).format("HH:mm A"),
      arrivalTime: dayjs(schedule.arrivalTime).format("HH:mm A"),
      //departureTime: schedule.departureTime?.format("HH:mm a").toUpperCase(),
      //arrivalTime: schedule.arrivalTime?.format("HH:mm a").toUpperCase(),
    }));
    const payloadToSend = {
      ...values,
      schedules: formattedSchedules,
    };
    addTrain(payloadToSend, {
      onSuccess: (data) => {
        notification.success({
          description: data.statusDescription,
          message: "Add Train",
        });
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Add Train",
          description: Common.formatError(error),
        });
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["trains"] }),
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
      <Card title={payload ? "Edit Train" : "Add Train"}>
        <Form
          layout="vertical"
          initialValues={{
            id: payload?.id,
            identifier: payload?.identifier,
            trainName: payload?.trainName,
            trainNumber: payload?.trainNumber,
            routes: payload?.routes?.map((r) => r.identifier),
            schedules: payload?.schedules?.map((s) => ({
              ...s,
              departureTime: dayjs(s.departureTime, "HH:mm"),
              arrivalTime: dayjs(s.arrivalTime, "HH:mm"),
            })),
            description: payload?.description,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item<ITrain> name="id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item<ITrain> name="identifier" hidden>
              <Input hidden />
            </Form.Item>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                name="trainName"
                label="Train Name"
                rules={[
                  { required: true, message: "Please enter train name!" },
                ]}
              >
                <Input
                  placeholder="Enter train name"
                  className="!rounded-md "
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                name="trainNumber"
                label="Train number"
                initialValue={payload?.trainNumber}
                rules={[
                  { required: true, message: "Please enter train Number!" },
                ]}
              >
                <Input
                  placeholder="Enter train number"
                  className="!rounded-md "
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ITrain>
                label="Train Route"
                name="routes"
                rules={[{ required: true, message: "Please bus routes!" }]}
              >
                <Select
                  showSearch
                  loading={loading}
                  mode="multiple"
                  // onChange={onPricingChange}
                  optionLabelProp="label"
                  options={routes.map((item: ITrainRoute) => ({
                    label: `${item.sourceStation.stationName} → ${item.destinationStation.stationName}`,
                    value: item.identifier,
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
            <Col xs={24} sm={24} md={24}>
              <Form.List name="schedules">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 items-center mb-2"
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
                        Add Train Schedule
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ITrain>
                name="admin_id"
                initialValue={user?.identifier}
                hidden
              >
                <Input />
              </Form.Item>
              {/*user?.tag == "trainprovider" ? (
                <Form.Item<ITrain>
                  name="admin_id"
                  initialValue={user.identifier}
                  hidden
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item<ITrain>
                  label="Select a provider"
                  name="admin_id"
                  rules={[
                    { required: true, message: "Please select a provider!" },
                  ]}
                >
                  <Select loading={isPending}>
                    {providers?.map((item: IUser) => (
                      <Option key={item.identifier} value={item.identifier}>
                        {item.lastname} {item.firstname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )*/}
            </Col>
            <Col xs={24}>
              <Form.Item<ITrain> name="description" label="Description">
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
export default AddTrain;

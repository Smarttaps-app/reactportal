import {
  Button,
  Card,
  Col,
  Form,
  Input,
  App,
  Modal,
  Row,
  Select,
  TimePicker,
} from "antd";
import { Grid } from "antd";
import { IAddProps, ISchedule, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useUser } from "../../../../context/useUser";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useAddSchedule } from "./useBus";
const { useBreakpoint } = Grid;
const { Option } = Select;

const AddSchedule: React.FC<IAddProps<ISchedule>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { isPending, data: providers } = useAdmins("external");
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { notification } = App.useApp();
  const { addSchedule, isAdding } = useAddSchedule();
  const onFinish = async (values: ISchedule) => {
    values.arrivalTime = values.arrivalTime?.format("HH:mm a").toUpperCase();
    values.departureTime = values.departureTime
      ?.format("HH:mm a")
      .toUpperCase();
    console.log(values);
    addSchedule(values, {
      onSuccess: (data) => {
        notification.success({
          description: data.statusDescription,
          message: "Add Schedule",
        });
        onCancel();
      },
      onError: (error) => {
        notification.error({
          message: "Add Schedule",
          description: Common.formatError(error),
        });
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["schedules"] }),
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
      <Card title="Add Schedule">
        <Form
          layout="vertical"
          initialValues={{
            mode: "bus",
            timeOfOperation: payload?.timeOfOperation,
            arrivalTime: payload?.arrivalTime,
            departureTime: payload?.departureTime,
            identifier: payload?.identifier,
            admin_id: payload?.admin_id,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item<ISchedule> name="mode" hidden>
              <Input />
            </Form.Item>
            <Form.Item<ISchedule>
              name="admin_id"
              initialValue={user?.identifier}
              hidden
            >
              <Input />
            </Form.Item>
            <Col xs={24} sm={24} md={24}>
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
                  size="large"
                  placeholder="Choose Operation Period"
                  options={[
                    { value: "Morning", label: "Morning" },
                    { value: "Afternoon", label: "Afternoon" },
                    { value: "Evening", label: "Evening" },
                    { value: "Night", label: "Night" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item<ISchedule>
                name="departureTime"
                label="Departure time"
                rules={[
                  { required: true, message: "Please enter departure time!" },
                ]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  size="large"
                  use12Hours
                  format="h:mm a"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ISchedule>
                name="arrivalTime"
                label="Arrival time "
                rules={[
                  { required: true, message: "Please enter arrival time!" },
                ]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  size="large"
                  use12Hours
                  format="h:mm a"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              {user?.tag == "busprovider" ? (
                <Form.Item<ISchedule>
                  name="admin_id"
                  initialValue={user.identifier}
                  hidden
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item<ISchedule>
                  label="Select a provider"
                  name="admin_id"
                  rules={[
                    { required: true, message: "Please select a provider!" },
                  ]}
                >
                  <Select
                    //onChange={handleChange}
                    loading={isPending}
                  >
                    {providers?.map((item: IUser) => (
                      <Option key={item.identifier} value={item.identifier}>
                        {item.lastname} {item.firstname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
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
export default AddSchedule;

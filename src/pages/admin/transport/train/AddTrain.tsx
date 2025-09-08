import {
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { Grid } from "antd";
import {
  IAddProps,
  ITrain,
  IRoute,
  ISchedule,
  ISeat,
} from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddTrain,
  useTRoutes,
  useTSchedules,
} from "../../../../hooks/useTransport";
import { Common } from "../../../../utils/Common";
import { useSeats } from "./useTrain";
const { useBreakpoint } = Grid;

const AddTrain: React.FC<IAddProps<ITrain>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addTrain, isAdding } = useAddTrain();
  const { loading, routes } = useTRoutes();
  const { loading: showing, seats } = useSeats();
  const { loading: waiting, schedules } = useTSchedules();
  const onFinish: FormProps<ITrain>["onFinish"] = (values) => {
    addTrain(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
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
      <Card title="Add Train">
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item<ITrain> name="id" hidden initialValue={payload?.id}>
              <Input hidden />
            </Form.Item>
            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                name="trainName"
                label="Train Name"
                initialValue={payload?.trainName}
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
            <Col xs={24} sm={24} md={12}>
              <Form.Item<ITrain>
                label="Train Seat"
                name="seats"
                initialValue={payload?.seats}
                rules={[{ required: true, message: "Please bus seats!" }]}
              >
                <Select
                  showSearch
                  loading={showing}
                  mode="multiple"
                  // onChange={onPricingChange}
                  optionLabelProp="label"
                  options={seats.map((item: ISeat) => ({
                    label: `${item.classType} ${item.classType}`,
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
              <Form.Item<ITrain>
                label="Train Route"
                name="routes"
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
              <Form.Item<ITrain>
                label="Schedule"
                name="schedules"
                rules={[{ required: true, message: "Please schedules" }]}
              >
                <Select
                  showSearch
                  loading={waiting}
                  mode="multiple"
                  // onChange={onPricingChange}
                  optionLabelProp="label"
                  options={schedules.map((item: ISchedule) => ({
                    label: `${item.timeOfOperation} ${item.departureTime}`,
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
            <Col xs={24}>
              <Form.Item<ITrain>
                name="description"
                label="Description"
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
export default AddTrain;

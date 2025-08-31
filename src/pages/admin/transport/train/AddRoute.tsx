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
import { IAddProps, IBus, IRoute, IStation } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import {
  useAddTRoute,
  useBuses,
  useStations,
} from "../../../../hooks/useTransport";
import { useEffect, useMemo } from "react";
const { useBreakpoint } = Grid;

const AddRoute: React.FC<IAddProps<IRoute>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addRoute, isAdding } = useAddTRoute();
  const { loading, stations } = useStations();
  const { pending, buses, error } = useBuses();
  const [form] = Form.useForm();
  const selectedStartId = Form.useWatch("startId", form);
  useEffect(() => {
    form.setFieldsValue({ stopId: undefined });
  }, [selectedStartId, form]);
  const filteredStopStations = useMemo(() => {
    if (!stations || !selectedStartId) return [];
    const selectedStart = stations.find(
      (station: IStation) => station.id === selectedStartId
    );
    return stations.filter(
      (station: IStation) =>
        station.mode === selectedStart?.mode && station.id !== selectedStartId
    );
  }, [stations, selectedStartId]);
  console.log("selectedStartId", selectedStartId);
  console.log("filteredStopStations", filteredStopStations);
  const onFinish: FormProps<IRoute>["onFinish"] = (values) => {
    console.log("Success:", values);
    addRoute(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        // onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["routes"] }),
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
      <Card title="Add Route">
        <Form
          layout="vertical"
          form={form}
          preserve={false}
          initialValues={{
            routeName: payload?.routeName,
            startId: payload?.sourceStation?.id,
            stopId: payload?.destinationStation?.id,
            buses: payload?.buses,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IRoute>
                name="routeName"
                label="Route Name"
                rules={[
                  { required: true, message: "Please enter route name!" },
                ]}
              >
                <Input
                  placeholder="Enter route name"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                shouldUpdate={(prev, curr) => prev.startId !== curr.startId}
                noStyle
              >
                {() => (
                  <Form.Item<IRoute>
                    label="Starting Park"
                    name="startId"
                    rules={[
                      {
                        required: true,
                        message: "Please select a starting park!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && value === getFieldValue("stopId")) {
                            return Promise.reject(
                              new Error(
                                "Starting park can't be the same as starting park!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Select
                      showSearch
                      loading={loading}
                      optionLabelProp="label"
                      options={stations.map((item: IStation) => ({
                        label: `${
                          item.stationName
                        } → ${item.mode.toUpperCase()}`,
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
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IRoute>
                label="Destination Park"
                name="stopId"
                rules={[
                  {
                    required: true,
                    message: "Please select a destionation park!",
                  },
                ]}
              >
                <Select
                  showSearch
                  disabled={!selectedStartId}
                  loading={loading}
                  optionLabelProp="label"
                  options={filteredStopStations.map((item: IStation) => ({
                    label: `${item.stationName} → ${item.mode.toUpperCase()}`,
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
              <Form.Item<IRoute>
                label="Choose Buses"
                name="buses"
                rules={[
                  {
                    required: true,
                    message: "Please choose buses for the route!",
                  },
                ]}
              >
                <Select
                  showSearch
                  disabled={error ? true : false}
                  loading={pending}
                  mode="multiple"
                  optionLabelProp="label"
                  options={buses.map((item: IBus) => ({
                    label: `${item.name} → ${item.bus_number?.toUpperCase()}`,
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
export default AddRoute;

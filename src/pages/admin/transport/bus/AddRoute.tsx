import { App, Button, Card, Col, Form, Input, Modal, Row, Select } from "antd";
import { Grid } from "antd";
import { IAddProps, IBusRoute, IStation, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useAddTRoute, useStations } from "./useBus";
import { useEffect, useMemo } from "react";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useUser } from "../../../../context/useUser";
const { useBreakpoint } = Grid;
const { Option } = Select;

const AddRoute: React.FC<IAddProps<IBusRoute>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { notification } = App.useApp();
  const { user } = useUser();
  const { isPending, data: providers } = useAdmins("external");
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addRoute, isAdding } = useAddTRoute();
  const { loading, stations } = useStations();
  //const { pending, buses, error } = useBuses();
  const [form] = Form.useForm();
  const selectedStartId = Form.useWatch("startId", form);
  useEffect(() => {
    form.setFieldsValue({ stopId: undefined });
  }, [selectedStartId, form]);
  const filteredStopStations = useMemo(() => {
    if (!stations || !selectedStartId) return [];
    const selectedStart = stations.find(
      (station: IStation) => station.identifier === selectedStartId,
    );
    return stations.filter(
      (station: IStation) =>
        station.mode === selectedStart?.mode &&
        station.identifier !== selectedStartId,
    );
  }, [stations, selectedStartId]);
  const onFinish = async (values: IBusRoute) => {
    console.log("Success:", values);
    addRoute(values, {
      onSuccess: (data) => {
        notification.success({
          description: data.statusDescription,
          message: "Add Route",
        });
        onCancel();
      },
      onError: (error) => {
        notification.error({
          message: "Add Route",
          description: Common.formatError(error),
        });
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["busroutes"] }),
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
            id: payload?.identifier,
            startId: payload?.sourceStation?.identifier,
            stopId: payload?.destinationStation?.identifier,
            admin_id: payload?.admin_id,
            baseprice: payload?.baseprice,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IBusRoute>
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
                  <Form.Item<IBusRoute>
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
                                "Starting park can't be the same as starting park!",
                              ),
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
                        value: item.identifier,
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
              <Form.Item<IBusRoute>
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
                    value: item.identifier,
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
              {user?.tag == "busprovider" ? (
                <Form.Item<IBusRoute>
                  name="admin_id"
                  initialValue={user.identifier}
                  hidden
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item<IBusRoute>
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
              <Form.Item<IBusRoute>
                name="baseprice"
                label="Route Price"
                rules={[
                  { required: true, message: "Please enter route price!" },
                ]}
              >
                <Input
                  placeholder="Enter route price"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
              <Form.Item<IBusRoute>
                name="identifier"
                hidden
                initialValue={payload?.identifier}
              >
                <Input />
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

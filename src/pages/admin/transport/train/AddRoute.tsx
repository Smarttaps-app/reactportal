import { App, Button, Card, Col, Form, Input, Modal, Row, Select } from "antd";
import { Grid } from "antd";
import { IAddProps, ITrainRoute, IStation } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Common } from "../../../../utils/Common";
import { useAddTRoute, useStations } from "../../../../hooks/useTransport";
import { useEffect, useMemo } from "react";
import { useUser } from "../../../../context/useUser";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;

const AddRoute: React.FC<IAddProps<ITrainRoute>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const { user } = useUser();
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addRoute, isAdding } = useAddTRoute();
  const { loading, stations } = useStations();
  const [form] = Form.useForm();
  const selectedStartId = Form.useWatch("startId", form);
  useEffect(() => {
    form.setFieldsValue({ stopId: payload?.destinationStation?.identifier });
  }, [payload?.destinationStation?.identifier, selectedStartId, form]);
  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      if (payload) {
        form.setFieldsValue({
          startId: payload.sourceStation?.identifier,
          stopId: payload.destinationStation?.identifier,
          prices: payload.prices ?? [],
        });
      }
    }
  }, [isOpen, payload, form]);
  const filteredStopStations = useMemo(() => {
    if (!stations || !selectedStartId) return [];
    const selectedStart = stations.find(
      (station: IStation) => station.identifier === selectedStartId
    );
    return stations.filter(
      (station: IStation) =>
        station.mode === selectedStart?.mode &&
        station.identifier !== selectedStartId
    );
  }, [stations, selectedStartId]);
  console.log("selectedStartId", selectedStartId);
  console.log("filteredStopStations", filteredStopStations);
  const onFinish = async (values: ITrainRoute) => {
    console.log("Success:", values);
    addRoute(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
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
      <Card title={payload ? "Edit Route" : "Add Route"}>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            id: payload?.id,
            identifier: payload?.identifier,
            startId: payload?.sourceStation?.identifier,
            stopId: payload?.destinationStation?.identifier,
            prices:
              payload?.prices?.map((s) => ({
                ...s,
                key: s.identifier,
                classType: s.classType,
                price: s.price,
              })) ?? [],
            admin_id: payload?.admin_id ?? user?.identifier,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ITrainRoute> name="id" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item<ITrainRoute> name="identifier" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item
                shouldUpdate={(prev, curr) => prev.startId !== curr.startId}
                noStyle
              >
                {() => (
                  <Form.Item<ITrainRoute>
                    label="Starting Station"
                    name="startId"
                    rules={[
                      {
                        required: true,
                        message: "Please select a starting Station!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && value === getFieldValue("stopId")) {
                            return Promise.reject(
                              new Error(
                                "Starting Station can't be the same as starting Station!"
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
              <Form.Item<ITrainRoute>
                label="Destination Park"
                name="stopId"
                rules={[
                  {
                    required: true,
                    message:
                      "Starting Station can't be the same as destination Station!",
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
              {" "}
              <Form.Item<ITrainRoute>
                name="admin_id"
                initialValue={user?.identifier}
                hidden
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.List name="prices">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 items-center mb-2"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "classType"]}
                          rules={[
                            {
                              required: true,
                              message: "Seat class is missing",
                            },
                          ]}
                          className="col-span-3"
                        >
                          <Select
                            showSearch
                            loading={isAdding}
                            disabled={isAdding}
                            placeholder="Choose seat class"
                            options={[
                              { value: "FIRST", label: "first class" },
                              { value: "BUSINESS", label: "Business class" },
                              { value: "ADULT", label: "Standard Adult" },
                              { value: "MINOR", label: "Standard Minor" },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Seat Price is missing",
                            },
                          ]}
                          className="col-span-3"
                        >
                          <Input placeholder="Seat Price" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            icon={<MinusCircleOutlined />}
                            type="primary"
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
                        Add Price
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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

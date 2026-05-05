import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { IAddProps, IBusRoute, IStation } from "../../../utils/type";
import { useAddTRoute, useStations } from "./useBus";
import { useEffect, useMemo } from "react";
import { useUser } from "../../../context/useUser";

const AddProviderRoute: React.FC<IAddProps<IBusRoute>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { addRoute, isAdding } = useAddTRoute();
  const { loading, stations } = useStations();
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
      title="Add Route"
    >
      <Form
        layout="vertical"
        form={form}
        preserve={false}
        initialValues={{
          routeName: payload?.routeName,
          id: payload?.identifier,
          startId: payload?.sourceStation?.identifier,
          stopId: payload?.destinationStation?.identifier,
          admin_id: user?.identifier,
          baseprice: payload?.baseprice,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item<IBusRoute> name="admin_id" hidden>
              <Input />
            </Form.Item>
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
                      label: `${item.stationName} → ${item.location.toUpperCase()}`,
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
                  label: `${item.stationName} → ${item.location.toUpperCase()}`,
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
            <Form.Item<IBusRoute>
              name="baseprice"
              label="Route Price"
              rules={[{ required: true, message: "Please enter route price!" }]}
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
    </Modal>
  );
};
export default AddProviderRoute;

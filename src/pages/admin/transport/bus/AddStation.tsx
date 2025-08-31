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
import { useQueryClient } from "@tanstack/react-query";
import { IAddProps, IStation } from "../../../../utils/type";
import { useAddStation } from "./useBus";
import { Common } from "../../../../utils/Common";
import states from "../../../../utils/states";
const { useBreakpoint } = Grid;

const AddStation: React.FC<IAddProps<IStation>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addStation, isAdding } = useAddStation();
  const onFinish = async (values: IStation) => {
    console.log("Success:", values);
    addStation(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        console.log(error);
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["stations"] }),
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
      <Card title="Add Park">
        <Form
          layout="vertical"
          initialValues={{
            mode: "bus",
            stationName: payload?.stationName,
            location: payload?.location,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IStation>
                name="stationName"
                label="Park Name"
                initialValue={payload?.stationName}
                rules={[
                  { required: true, message: "Please enter station name!" },
                ]}
              >
                <Input
                  placeholder="Enter station name"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item<IStation>
                name="location"
                label="Select Location"
                initialValue={payload?.location}
                rules={[
                  {
                    required: true,
                    message: "Please choose station location!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isAdding}
                  disabled={isAdding}
                  size="large"
                  placeholder="Choose station location"
                  optionLabelProp="label"
                  options={states.map((item) => ({
                    label: item.state,
                    value: item.state,
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
              <Form.Item<IStation>
                name="mode"
                hidden
                initialValue={payload?.mode}
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
export default AddStation;

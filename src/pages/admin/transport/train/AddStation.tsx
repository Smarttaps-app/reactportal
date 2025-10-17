import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { Grid } from "antd";
import { IAddProps, IStation, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import states from "../../../../utils/states";
import { Common } from "../../../../utils/Common";
import { useUser } from "../../../../context/useUser";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useAddStation } from "./useTrain";
const { useBreakpoint } = Grid;
const { Option } = Select;

const AddStation: React.FC<IAddProps<IStation>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { isPending, data: providers } = useAdmins("trainprovider");
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addStation, isAdding } = useAddStation();
  const onFinish = async (values: IStation) => {
    addStation(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () =>
        client.invalidateQueries({ queryKey: ["trainstations"] }),
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
      <Card title="Add Station">
        <Form
          layout="vertical"
          initialValues={{
            mode: "train",
            stationName: payload?.stationName,
            location: payload?.location,
            admin_id: payload?.admin_id,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<IStation>
                name="stationName"
                label="Station Name"
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
              {user?.tag == "trainprovider" ? (
                <Form.Item<IStation>
                  name="admin_id"
                  initialValue={user.identifier}
                  hidden
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item<IStation>
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

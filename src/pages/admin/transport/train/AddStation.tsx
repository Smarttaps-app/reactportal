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
import { IAddProps, IStation, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { useAddStation } from "../../../../hooks/useTransport";
import { Common } from "../../../../utils/Common";
import { useUser } from "../../../../context/useUser";
import { useAdmins } from "../../../../hooks/useAdmin";
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
  const onFinish: FormProps<IStation>["onFinish"] = (values) => {
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
                label="Location "
                initialValue={payload?.location}
                rules={[
                  { required: true, message: "Please enter station location!" },
                ]}
              >
                <Input
                  placeholder="Enter station location"
                  className="!rounded-md !py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              {user?.tag == "trainprovider" ? (
                <Form.Item<IStation>
                  name="admin_id"
                  initialValue={user.id}
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
                      <Option key={item.id} value={item.id}>
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
export default AddStation;

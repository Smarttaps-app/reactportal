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
import { IAddProps, ISeat, IUser } from "../../../../utils/type";
import { useQueryClient } from "@tanstack/react-query";
import states from "../../../../utils/states";
import { Common } from "../../../../utils/Common";
import { useUser } from "../../../../context/useUser";
import { useAdmins } from "../../../../hooks/useAdmin";
import { useAddSeat } from "./useTrain";
const { useBreakpoint } = Grid;
const { Option } = Select;

const AddSeat: React.FC<IAddProps<ISeat>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { user } = useUser();
  const { isPending, data: providers } = useAdmins("trainprovider");
  const client = useQueryClient();
  const screens = useBreakpoint();
  const { addSeat, isAdding } = useAddSeat();
  const onFinish = async (values: ISeat) => {
    addSeat(values, {
      onSuccess: (data) => {
        message.success(data.statusDescription);
        onCancel();
      },
      onError: (error) => {
        message.error(Common.formatError(error));
        onCancel();
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["seats"] }),
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
      <Card title="Add Seat">
        <Form
          layout="vertical"
          initialValues={{
            mode: "train",
            stationName: payload?.classType,
            location: payload?.price,
            admin_id: payload?.admin_id,
          }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item<ISeat>
                name="classType"
                label="Seat Class"
                initialValue={payload?.classType}
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
              <Form.Item<ISeat>
                name="classType"
                label="Select seat class"
                rules={[
                  {
                    required: true,
                    message: "Please choose seat class!",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isAdding}
                  disabled={isAdding}
                  size="large"
                  placeholder="Choose seat class"
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
                <Form.Item<ISeat> name="admin_id" initialValue={user.id} hidden>
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item<ISeat>
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
export default AddSeat;

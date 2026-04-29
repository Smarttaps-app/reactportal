import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { IAddProps, IStation, IUser } from "../../../../utils/type";
import { useAddStation, useBusProviders } from "./useBus";
import states from "../../../../utils/states";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddStation: React.FC<IAddProps<IStation>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { addStation, isAdding } = useAddStation();
  const { isPending, busProviders: providers } = useBusProviders();

  const onFinish = async (values: IStation) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "parkImage" && value?.fileList?.[0]?.originFileObj) {
          formData.append("parkImage", value.fileList[0].originFileObj);
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    addStation(formData, {
      onSuccess: () => onCancel(),
    });
  };

  // Upload configuration
  const uploadProps: UploadProps = {
    name: "parkImage",
    maxCount: 1,
    accept: "image/*",
    beforeUpload: () => false, // Prevent auto upload
    listType: "picture",
  };

  const isEditMode = !!payload;

  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={isAdding}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
    >
      <Form
        title={isEditMode ? "Edit Park" : "Add New Park"}
        layout="vertical"
        initialValues={{
          mode: "bus",
          id: payload?.identifier,
          stationName: payload?.stationName,
          location: payload?.location,
          admin_id: payload?.admin_id,
          contact: payload?.contact,
          address: payload?.address,
          description: payload?.description,
          status: payload?.status,
        }}
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item<IStation>
              name="stationName"
              label="Park Name"
              rules={[
                { required: true, message: "Please enter station name!" },
              ]}
            >
              <Input
                placeholder="Enter station name"
                className="!rounded-md !py-2"
              />
            </Form.Item>
            <Form.Item<IStation>
              name="contact"
              label="Park Contact"
              rules={[
                {
                  required: true,
                  message: "Please enter park contact address!",
                },
              ]}
            >
              <Input
                placeholder="Enter park contact address"
                className="!rounded-md !py-2"
              />
            </Form.Item>
            <Form.Item
              name="admin_id"
              label="Provider"
              rules={[{ required: true, message: "Please select a provider" }]}
            >
              <Select
                loading={isPending}
                placeholder="Select bus provider"
                showSearch
                optionFilterProp="children"
              >
                {providers?.map((provider: IUser) => (
                  <Option key={provider.id} value={provider.id}>
                    {provider.companyName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
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
            <Form.Item<IStation>
              name="address"
              label="Park Address"
              rules={[
                { required: true, message: "Please enter park address!" },
              ]}
            >
              <Input
                placeholder="Enter park address"
                className="!rounded-md !py-2"
              />
            </Form.Item>
            <Form.Item
              name="status"
              label="Park Status"
              rules={[
                { required: true, message: "Please select a park status" },
              ]}
            >
              <Select
                loading={isPending}
                placeholder="Select park status"
                showSearch
                optionFilterProp="children"
              >
                <Option key="active" value={1}>
                  Active
                </Option>
                <Option key="Inactive" value={0}>
                  Inactive
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item<IStation>
              name="mode"
              hidden
              initialValue={payload?.mode}
            >
              <Input />
            </Form.Item>
            <Form.Item<IStation>
              name="identifier"
              hidden
              initialValue={payload?.identifier}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              name="parkImage"
              label="Park Image"
              className="!w-full"
              rules={[
                {
                  required: !isEditMode,
                  message: "Please upload a bus image",
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} block>
                  Click to Upload Bus Image
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={3}
                placeholder="Enter bus description (optional)"
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
    </Modal>
  );
};
export default AddStation;

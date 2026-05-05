import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IAddProps, IBus, IBusType } from "../../../utils/type";
import { useAddBus, useBusTypes } from "./useBus";
import { useEffect } from "react";
import { useUser } from "../../../context/useUser";

const { Option } = Select;

const AddNewProviderBus: React.FC<IAddProps<IBus>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { addBus, isAdding } = useAddBus();
  const { loading, busTypes } = useBusTypes();
  const { user } = useUser();

  const [form] = Form.useForm<IBus>();

  // Reset form when modal opens/closes or payload changes
  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        id: payload?.id,
        identifier: payload?.identifier,
        name: payload?.name,
        bus_number: payload?.bus_number,
        description: payload?.description,
        base_price: payload?.base_price,
        bus_type_id: payload?.bus_type_id,
        availabilityStatus: payload?.availabilityStatus || "ACTIVE",
        admin_id: user?.id,
        airCondition: payload?.airCondition ?? false,
        tv: payload?.tv ?? false,
        camera: payload?.camera ?? false,
      });
    } else {
      form.resetFields();
    }
  }, [isOpen, payload, form]);

  const onFinish = async (values: IBus) => {
    // Convert FormData properly for file upload
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "busImage" && value?.fileList?.[0]?.originFileObj) {
          formData.append("busImage", value.fileList[0].originFileObj);
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    addBus(formData, {
      onSuccess: () => onCancel(),
    });
  };

  // Upload configuration
  const uploadProps: UploadProps = {
    name: "busImage",
    maxCount: 1,
    accept: "image/*",
    beforeUpload: () => false, // Prevent auto upload
    listType: "picture",
  };

  const isEditMode = !!payload;

  return (
    <Modal
      title={isEditMode ? "Edit Bus" : "Add New Bus"}
      open={isOpen}
      onCancel={onCancel}
      maskClosable={false}
      footer={null}
      destroyOnHidden
      style={{ top: 20 }}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ minWidth: 320 }}
      >
        <Row gutter={[16, 16]}>
          {/* Hidden Fields */}
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="identifier" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="admin_id" hidden>
            <Input />
          </Form.Item>

          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Bus Name"
              rules={[{ required: true, message: "Bus name is required" }]}
            >
              <Input placeholder="Enter bus name" />
            </Form.Item>

            <Form.Item
              name="bus_number"
              label="Bus Number"
              rules={[{ required: true, message: "Bus number is required" }]}
            >
              <Input placeholder="e.g. KA-01-AB-1234" />
            </Form.Item>

            <Form.Item
              name="availabilityStatus"
              label="Availability Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select availability">
                <Option value="ACTIVE">Active</Option>
                <Option value="BOARDING">Boarding</Option>
                <Option value="TRANSIT">In Transit</Option>
                <Option value="OPEN">Open</Option>
                <Option value="CLOSED">Closed</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Select a Bus Type"
              name="bus_type_id"
              rules={[{ required: true, message: "Please select a bus type!" }]}
            >
              <Select loading={loading}>
                {busTypes?.map((item: IBusType) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="base_price"
              label="Base Price"
              rules={[{ required: true, message: "Base price is required" }]}
            >
              <Input type="number" placeholder="Enter base price" />
            </Form.Item>

            <Form.Item
              name="airCondition"
              label="Air Condition"
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>

            <Form.Item name="tv" label="Television" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>

            <Form.Item name="camera" label="Camera" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="busImage"
              label="Bus Image"
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

          <Col xs={24}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isAdding}
              disabled={isAdding}
              block
              size="large"
            >
              {isEditMode ? "Update Bus" : "Add Bus"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddNewProviderBus;

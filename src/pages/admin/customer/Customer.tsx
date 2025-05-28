import {
  Avatar,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Modal,
  Space,
} from "antd";
import { ICustomerProps } from "../../../utils/type";
import {
  CloseOutlined,
  EditOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Common } from "../../../utils/Common";
import Meta from "antd/es/card/Meta";

const CustomerScreen: React.FC<ICustomerProps> = ({
  customer,
  isOpen = false,
  onCancel,
}) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Full Name",
      children:
        customer?.firstname && customer?.lastname
          ? `${customer.firstname} ${customer.lastname}`
          : "No name provided",
    },
    {
      label: "Email",
      span: "filled",
      children: customer?.email || "No email provided",
    },
    {
      label: "Account Type",
      children: customer?.account_type || "No remarks provided",
    },
    {
      label: "Joined Date",
      children: Common.formatDate(customer?.created_at),
    },
    {
      label: "DOB",
      children: customer?.date_of_birth || "No remarks provided",
    },
    {
      label: "Wallet Number",
      children: customer?.wallet?.walletAccount || "No remarks provided",
    },
  ];
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={850}
    >
      <Space direction="vertical" className="w-full">
        <Card
          style={{ width: "100%" }}
          title="Customer Details"
          actions={[
            <Button type="primary" icon={<LockOutlined />}>
              Change Password
            </Button>,
            <Button danger icon={<CloseOutlined />}>
              Disable Account
            </Button>,
            <SettingOutlined key="setting" />,
            <Button variant="solid" color="cyan" icon={<EditOutlined />}>
              Edit Record
            </Button>,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={customer?.avatar || "https://via.placeholder.com/150"}
                size={72}
              />
            }
            title={
              customer?.firstname && customer?.lastname
                ? `${customer.firstname} ${customer.lastname}`
                : "No name provided"
            }
            description={customer?.email || "No email provided"}
            style={{ marginBottom: 16 }}
          />
          <Descriptions size="small" bordered items={items} />
        </Card>
      </Space>
    </Modal>
  );
};
export default CustomerScreen;

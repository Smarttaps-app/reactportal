import {
  BankOutlined,
  EditOutlined,
  EllipsisOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Tag,
} from "antd";
import { useUser } from "../../../context/useUser";
import { Common } from "../../../utils/Common";
const { Meta } = Card;

export default function Profile() {
  const { user } = useUser();
  const items: DescriptionsProps["items"] = [
    {
      label: "Full Name",
      children:
        user?.firstname && user?.lastname
          ? `${user.firstname} ${user.lastname}`
          : "No name provided",
    },
    {
      label: "Email Address",
      children: user?.email || "No email provided",
      span: "filled",
    },
    {
      label: "Phone Number",
      children: user?.phonenumber || "No phone number provided",
    },
    {
      label: "Status",
      children: (
        <Tag color={user?.status ? "green" : "red"}>
          {user?.status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      label: "Role",
      children: <Tag color={user?.tag ? "green" : "red"}>{user?.tag}</Tag>,
    },
    {
      label: "Joined Date",
      span: "filled",
      children: Common.formatDate(user?.created_at),
    },
  ];
  return (
    <Card
      style={{ width: "100%" }}
      title="User Details"
      actions={[
        <Button type="primary" icon={<LockOutlined />}>
          Change Password
        </Button>,
        <Button variant="solid" color="cyan" icon={<BankOutlined />}>
          Cash Out
        </Button>,
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            src={user?.avatar || "https://via.placeholder.com/150"}
            size={72}
          />
        }
        title={
          user?.firstname && user?.lastname
            ? `${user.firstname} ${user.lastname}`
            : "No name provided"
        }
        description={user?.email || "No email provided"}
        style={{ marginBottom: 16 }}
      />
      <Descriptions size="small" bordered items={items} />
    </Card>
  );
}

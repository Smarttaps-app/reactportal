import { Avatar, Card, Descriptions, DescriptionsProps, Tag } from "antd";
import { useUser } from "../../../context/useUser";
import { Common } from "../../../utils/Common";
const { Meta } = Card;

export default function Profile() {
  const { user } = useUser();
  const items: DescriptionsProps["items"] = [
    {
      label: "Full Name",
      span: "filled",
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
      span: "filled",
    },
    {
      label: "Status",
      span: "filled",
      children: (
        <Tag color={user?.status ? "green" : "red"}>
          {user?.status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      label: "Role",
      span: "filled",
      children: <Tag color={user?.tag ? "green" : "red"}>{user?.tag}</Tag>,
    },
    {
      label: "Joined Date",
      span: "filled",
      children: Common.formatDate(user?.created_at),
    },
    {
      label: "Available Balance",
      span: "filled",
      children: Common.formatAsCurrency(
        Number(user?.wallet?.availableBalance ?? 0)
      ),
    },
    {
      label: "Cashout Enabled",
      span: "filled",
      children: user?.cashout_enabled ? "Yes" : "No",
    },
    {
      label: "Cashout Account",
      span: "filled",
      children: user?.cashout_account || "Not set",
    },
    {
      label: "Cashout Bank",
      span: "filled",
      children: user?.cashout_bank || "Not set",
    },
    {
      label: "Cashout Limit",
      span: "filled",
      children: user?.cashout_limit
        ? Common.formatAsCurrency(Number(user.cashout_limit))
        : "Not set",
    },
  ];
  return (
    <Card style={{ width: "100%" }} title="User Details">
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

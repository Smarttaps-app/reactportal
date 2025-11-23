import {
  App,
  Avatar,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Empty,
  Modal,
  Row,
  Space,
} from "antd";
import { ICustomerProps } from "../../../utils/type";
import { Common } from "../../../utils/Common";
import Meta from "antd/es/card/Meta";
import {
  useCustomer,
  useDisableCustomerAccount,
  useResetCustomerPassword,
} from "./useCustomers";
import { useQueryClient } from "@tanstack/react-query";

const CustomerScreen: React.FC<ICustomerProps> = ({
  customer,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const { loading, data, error } = useCustomer(
    customer?.id ?? customer?.identifier ?? ""
  );
  const { disabling, disableCustomer } = useDisableCustomerAccount();
  const { resetting, resetCustomerPassword } = useResetCustomerPassword();
  const { message } = App.useApp();
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );
  const user: DescriptionsProps["items"] = [
    {
      label: "Full Name",
      span: 1,
      children:
        data?.firstname && data?.lastname
          ? `${data.firstname} ${data.lastname}`
          : "No name provided",
    },
    {
      label: "Email",
      span: "filled",
      children: data?.email || "No email provided",
    },
    {
      label: "Phone Number",
      span: 1,
      children: Common.formatPhoneNumber(data?.phonenumber || "") || "",
    },
    {
      label: "Account Status",
      span: "filled",
      children: data?.account_status || "",
    },
    {
      label: "Account Type",
      span: 1,
      children: data?.account_type || "",
    },
    {
      label: "Account Type",
      span: 1,
      children: data?.account_ratings || "",
    },
    {
      label: "DOB",
      span: 1,
      children: data?.date_of_birth || "",
    },
    {
      label: "BVN",
      span: 1,
      children: data?.bvn || "",
    },
    {
      label: "NIN",
      span: 1,
      children: data?.nin || "",
    },
    {
      label: "BVN Verified",
      span: 1,
      children: data?.bvn_verified ? "YES" : "NO",
    },
    {
      label: "NIN Verified",
      span: 1,
      children: data?.nin_verified ? "YES" : "NO",
    },
    {
      label: "Email Verified",
      span: 1,
      children: data?.email_verified ? "YES" : "NO",
    },
    {
      label: "Address submitted",
      span: 1,
      children: data?.address_submitted ? "YES" : "NO",
    },
    {
      label: "Next Of Kin",
      span: 1,
      children: data?.is_next_of_kin ? "YES" : "NO",
    },
    {
      label: "Joined Date",
      span: 1,
      children: Common.formatDate(data?.created_at),
    },
  ];
  const wallet: DescriptionsProps["items"] = [
    {
      label: "Purse Number",
      span: 1,
      children: data?.wallet?.walletAccount || "",
    },
    {
      label: "Balance",
      span: 1,
      children: Common.formatAsCurrency(data?.wallet?.availableBalance || "0"),
    },
    {
      label: "Cashout Enabled",
      span: 1,
      children: data?.wallet?.cashout_enabled ? "YES" : "NO",
    },
    {
      label: "Cashout Account",
      span: 1,
      children: data?.wallet?.cashout_account,
    },
    {
      label: "Cashout Limit",
      span: "filled",
      children: Common.formatAsCurrency(data?.wallet?.cashout_limit || "0"),
    },
  ];
  const device: DescriptionsProps["items"] = [
    {
      label: "Manufacturer",
      span: 1,
      children: data?.device.manufacturer || "",
    },
    {
      label: "Name",
      span: 1,
      children: data?.device.deviceName || "",
    },
    {
      label: "Model",
      span: 1,
      children: data?.device.modelName || "",
    },
    {
      label: "Real Device",
      span: 1,
      children: data?.device.isPhysicalDevice ? "YES" : "NO",
    },
    {
      label: "uuid",
      span: "filled",
      children: data?.device.imeiNo || "",
    },
    {
      label: "Date Added",
      span: "filled",
      children: Common.formatDate(data?.device.created_at),
    },
  ];
  return (
    <Modal
      style={{ top: 10 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      loading={loading}
      destroyOnHidden
      footer={null}
      width={950}
    >
      <Space direction="vertical" className="w-full">
        <Card
          title="Customer Details"
          actions={[
            <Button
              type="primary"
              size="small"
              variant="filled"
              disabled={resetting}
              loading={resetting}
              onClick={() =>
                resetCustomerPassword(data.id.toString(), {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) =>
                    message.success(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["customer"] }),
                })
              }
            >
              Reset Password
            </Button>,
            <Button
              type="primary"
              color="red"
              size="small"
              variant="filled"
              disabled={disabling}
              loading={disabling}
              onClick={() =>
                disableCustomer(data.id.toString(), {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) =>
                    message.success(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["customer"] }),
                })
              }
            >
              Disable Account
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
          <Descriptions title="Customer" size="small" bordered items={user} />
          <Descriptions title="Purse" size="small" bordered items={wallet} />
          <Descriptions title="Device" size="small" bordered items={device} />
        </Card>
      </Space>
    </Modal>
  );
};
export default CustomerScreen;

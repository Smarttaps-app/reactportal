import { Avatar, Button, Card, Flex, Result, Spin, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { useAdmins, useDeleteAdmin } from "../../../hooks/useAdmin";
import { IRole, IUser } from "../../../utils/type";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Add from "./add";
export default function Index() {
  const { isPending, data: admins, error } = useAdmins("internal");
  const { deleteAdmin, isdeleting } = useDeleteAdmin();
  const [user, setUser] = useState<IUser>();
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Image",
        dataIndex: "avatar",
        key: "avatar",
        render: (avatar: string) => (
          <Avatar src={avatar} size="small" icon={<UserOutlined />} />
        ),
      },
      {
        title: "Lastname",
        dataIndex: "lastname",
        key: "lastname",
      },
      {
        title: "Firstname",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Phone",
        dataIndex: "phonenumber",
        key: "phonenumber",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Code",
        dataIndex: "billerId",
        key: "billerId",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (keyValue: boolean) => (keyValue ? "Active" : "Inactive"),
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role: IRole) => role?.name,
      },
      {
        title: "Date Joined",
        dataIndex: "created_at",
        key: "created_at",
        render: (keyValue: string) => Common.formatDate(keyValue),
      },
      {
        title: "Actions",
        dataIndex: "",
        width: "10%",
        render: (_key: string, data: IUser) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => (setUser(data), setAdd(true))}
            />
            <Button
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => deleteAdmin(data.id)}
              danger
              loading={isdeleting}
            />
          </Flex>
        ),
      },
    ],
    [],
  );

  const [add, setAdd] = useState(false);

  const data: IUser[] = admins || [];

  return (
    <div className="small-spacer">
      {isPending && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <Card
        title="Admin"
        extra={
          <Button
            icon={<PlusOutlined />}
            title="Add Admin"
            type="primary"
            onClick={() => (setUser(undefined), setAdd(true))}
          >
            Add Admin
          </Button>
        }
        className="shadow-sm rounded"
      >
        <Table
          rowKey="id"
          size="small"
          loading={isPending}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: error ? (
              <Result status="error" subTitle={Common.formatError(error)} />
            ) : (
              "No data available"
            ),
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <Add payload={user} isOpen={add} onCancel={() => setAdd(false)} />
    </div>
  );
}

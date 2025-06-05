import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  message,
  Row,
  Spin,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { useAdmins, useDeleteAdmin } from "../../../hooks/useAdmin";
import { IRole, IUser } from "../../../utils/type";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Add from "./add";
export default function Index() {
  const { isPending, data, error } = useAdmins();
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
        key: "moemailde",
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
        width: "12%",
        render: (key: string, data: IUser) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => (setUser(data), setAdd(true))}
            />
            <Button
              type="primary"
              icon={<RedoOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deleted(data.id)}
              danger
              loading={isdeleting}
            />
          </Flex>
        ),
      },
    ],
    []
  );
  const deleted = (id: number) => {
    deleteAdmin(id, {
      onSuccess: (response) => {
        console.log(response);
        message.success(response.statusDescription);
      },
    });
  };
  const [add, setAdd] = useState(false);
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const players: IUser[] = data || [];

  return (
    <div className="small-spacer">
      {isPending && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <Row>
        <Col span={24}>
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
              dataSource={players}
            />
          </Card>
        </Col>
      </Row>
      <Add payload={user} isOpen={add} onCancel={() => setAdd(false)} />
    </div>
  );
}

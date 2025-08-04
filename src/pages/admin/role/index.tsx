import {
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
import { useRoles, useDeleteRole } from "../../../hooks/useRole";
import { IRole } from "../../../utils/type";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./add";
export default function RoleIndex() {
  const { isShowing, roles, error } = useRoles();
  const { deleteRole, isdeleting } = useDeleteRole();
  const [role, setRole] = useState<IRole>();
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Role Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Tag",
        dataIndex: "tag",
        key: "tag",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (keyValue: boolean) => (keyValue ? "Active" : "Inactive"),
      },
      {
        title: "Created Joined",
        dataIndex: "created_at",
        key: "created_at",
        render: (keyValue: string) => Common.formatDate(keyValue),
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (key: string, data: IRole) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => (setRole(data), setAdd(true))}
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
    deleteRole(id, {
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

  const players: IRole[] = roles || [];

  return (
    <div className="small-spacer">
      {isShowing && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <Row>
        <Col span={24}>
          <Card
            title="Role"
            extra={
              <Button
                icon={<PlusOutlined />}
                title="Add Role"
                type="primary"
                onClick={() => (setRole(undefined), setAdd(true))}
              >
                Add Role
              </Button>
            }
            className="shadow-sm rounded"
          >
            <Table
              rowKey="id"
              size="small"
              loading={isShowing}
              columns={columns}
              dataSource={players}
            />
          </Card>
        </Col>
      </Row>
      <Add payload={role} isOpen={add} onCancel={() => setAdd(false)} />
    </div>
  );
}

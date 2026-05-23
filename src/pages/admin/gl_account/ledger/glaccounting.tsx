import { Button, Card, Flex, Result, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ILedger } from "../../../../utils/type";
import { useLedgers } from "../../../../hooks/useAccounting";
import AddLedger from "./AddGL";
import ListJournal from "./journal_entries";

export default function GlAccountScreen() {
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<ILedger>();
  const { loading, ledgers, error } = useLedgers();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "GL Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "GL code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Party Type",
        dataIndex: "party_type",
        key: "party_type",
      },
      {
        title: "GL Type",
        dataIndex: "gl_type",
        key: "gl_type",
      },
      {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        render: (is_active: boolean) => (
          <Tag color={`${is_active ? "green" : "red"}`}>
            {is_active ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Updated",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (updated: string) => Common.formatDate(updated),
        ellipsis: true,
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (key: string, ledger: ILedger) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setItem(ledger);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setItem(ledger);
                setShow(true);
              }}
            />
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
          </Flex>
        ),
      },
    ],
    [],
  );
  const data: ILedger[] = ledgers || [];

  return (
    <>
      <Card
        title="General Ledger Accounts"
        className="!rounded-sm"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Ledger"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Ledger
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          loading={loading}
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

      <AddLedger payload={item} isOpen={add} onCancel={() => setAdd(false)} />
      <ListJournal
        payload={item}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

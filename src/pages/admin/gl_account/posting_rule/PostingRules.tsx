import { Button, Card, Result, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { IPostingRule } from "../../../../utils/type";
import Add from "./Add";
import { usePostingRules } from "../useAccounting";

export default function PostingRulesScreen() {
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IPostingRule>();
  const { loading, postingRules, error } = usePostingRules();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Transaction type",
        dataIndex: "transaction_type",
        key: "transaction_type",
      },
      {
        title: "GL Entry",
        dataIndex: "entry_type",
        key: "entry_type",
      },
      {
        title: "GL Account Code",
        dataIndex: "account_code",
        key: "account_code",
      },
      {
        title: "GL Account Role",
        dataIndex: "account_role",
        key: "account_role",
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
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
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
        render: (ledger: IPostingRule) => (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setItem(ledger);
              setAdd(true);
            }}
          />
        ),
      },
    ],
    [],
  );
  const data: IPostingRule[] = postingRules || [];

  return (
    <>
      <Card
        title="GL Posting Ruels"
        className="!rounded-sm"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Posting Rule"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Posting Rule
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          size="small"
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

      <Add payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

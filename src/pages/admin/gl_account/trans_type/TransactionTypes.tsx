import { Button, Card, Result, Space, Table } from "antd";
import { useMemo, useState } from "react";
import Add from "./Add";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Common } from "../../../../utils/Common";
import { ILedger } from "../../../../utils/type";
import { useLedgers } from "../useAccounting";

export default function TransactionTypes() {
  const [add, setAdd] = useState(false);
  const [_show, setShow] = useState(false);
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
        title: "GL Type",
        dataIndex: "gl_type",
        key: "gl_type",
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
        render: (_key: string, ledger: ILedger) => (
          <div className="flex gap-5">
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
          </div>
        ),
      },
    ],
    [],
  );
  const data: ILedger[] = ledgers || [];

  return (
    <>
      <Card
        title="Ledgers"
        className="!shadow-sm !rounded-lg"
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

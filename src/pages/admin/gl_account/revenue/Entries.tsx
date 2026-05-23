import { Modal, Result, Table, Tag } from "antd";
import { Grid } from "antd";
import { IAddProps, IGLEntry, IGLTransaction } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import { useMemo } from "react";
import { useGlTransactionDetails } from "../useAccounting";
const { useBreakpoint } = Grid;

const JournalEntries: React.FC<IAddProps<IGLTransaction>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { loading, entries, error } = useGlTransactionDetails(payload?.id ?? 0);
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "GL Code",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Payment",
        dataIndex: "is_debit",
        key: "is_debit",
        render: (is_debit: boolean) => (
          <Tag color={`${is_debit ? "red" : "green"}`}>
            {is_debit ? "debit" : "credit"}
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
    ],
    [],
  );
  const screens = useBreakpoint();
  const data: IGLEntry[] = entries || [];
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      loading={loading}
      width={screens.xs ? "100%" : 850}
      title="Journal Listing"
    >
      <Table
        rowKey="id"
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
    </Modal>
  );
};
export default JournalEntries;

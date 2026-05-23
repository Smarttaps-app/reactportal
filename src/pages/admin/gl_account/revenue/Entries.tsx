import { Modal, Result, Table } from "antd";
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
      },
      {
        title: "TransactionRef",
        dataIndex: "transaction_ref",
        key: "transaction_ref",
      },
      {
        title: "Account Code",
        dataIndex: "account_code",
        key: "account_code",
      },
      {
        title: "Party type",
        dataIndex: "party_type",
        key: "party_type",
      },
      {
        title: "Entry Type",
        dataIndex: "entry_type",
        key: "entry_type",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Posted",
        dataIndex: "posted_at",
        key: "posted_at",
        render: (posted_at: string) => Common.formatDate(posted_at),
        ellipsis: true,
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

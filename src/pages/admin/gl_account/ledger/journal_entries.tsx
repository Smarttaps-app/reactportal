import { Modal, Table, Tag } from "antd";
import { Grid } from "antd";
import { IAddProps, ILedger } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import { useMemo } from "react";
const { useBreakpoint } = Grid;

const ListJournal: React.FC<IAddProps<ILedger>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
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
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={screens.xs ? "100%" : 850}
      title="Journal Listing"
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={payload?.journal_entries}
        scroll={{ x: "max-content" }}
      />
    </Modal>
  );
};
export default ListJournal;

import { Button, Modal, Result, Space, DatePicker, Table } from "antd";
import { Grid } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { IAddProps, IGLEntry, ILedger } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import { useMemo, useState } from "react";
import { useGlEntries } from "../useAccounting";
import { SearchOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

const ListJournal: React.FC<IAddProps<ILedger>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const [selectedDates, setSelectedDates] =
    useState<[dayjs.Dayjs, dayjs.Dayjs]>();
  const {
    loading,
    entries,
    error,
    refetch: refetchPayments,
  } = useGlEntries(payload?.code, selectedDates);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };
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
      <div className="my-5 flex justify-between">
        <h5>Total Entries {data.length}</h5>
        <Space>
          <RangePicker onChange={handleDateChange} />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => refetchPayments()}
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Search
          </Button>
        </Space>
      </div>
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
export default ListJournal;

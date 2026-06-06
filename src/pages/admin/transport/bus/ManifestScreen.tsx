import { Modal, Result, Table } from "antd";
import { Grid } from "antd";
import { type ISchedule } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import { useManifest } from "./useBus";
import { useMemo, useState } from "react";
const { useBreakpoint } = Grid;
export interface IProductProps {
  trip?: ISchedule;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const ManifestScreen: React.FC<IProductProps> = ({
  trip,
  isOpen = false,
  onCancel,
}) => {
  const [searchTerm] = useState("");
  const screens = useBreakpoint();
  const { manifest, loading, error } = useManifest(trip?.id ?? 0);
  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "identifier",
        key: "identifier",
      },
      {
        title: "Company",
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "Route",
        dataIndex: "routeName",
        key: "routeName",
      },
      {
        title: "Bus",
        dataIndex: "busName",
        key: "busName",
      },
      {
        title: "Trip Date",
        dataIndex: "trip_Date",
        key: "trip_Date",
      },
      {
        title: "Arrival",
        dataIndex: "arrivalTime",
        key: "arrivalTime",
      },
      {
        title: "Departure",
        dataIndex: "departureTime",
        key: "departureTime",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Seat",
        dataIndex: "total_seats",
        key: "total_seats",
      },
      {
        title: "Booked",
        dataIndex: "booked_seats",
        key: "booked_seats",
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string) => Common.formatDate(created),
        ellipsis: true,
      },
    ],
    [],
  );

  const data =
    manifest.filter(
      (schedule: ISchedule) =>
        schedule?.daysOfOperation
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        schedule.arrivalTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.departureTime.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];
  return (
    <Modal
      style={{ top: 30 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={loading}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={screens.xs ? "100%" : 850}
      title={"Bus Manifest"}
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
    </Modal>
  );
};
export default ManifestScreen;

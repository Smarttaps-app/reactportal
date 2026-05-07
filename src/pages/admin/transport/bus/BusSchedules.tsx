import {
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Result,
  Row,
  Space,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { ISchedule } from "../../../../utils/type";
import { useBusSchedules, useDeleteBusSchedule } from "./useBus";
import AddSchedule from "./AddSchedule";
import { Search } from "lucide-react";
import ManifestScreen from "./ManifestScreen";

export default function BusSchedulesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<ISchedule>();
  const { loading, schedules, error } = useBusSchedules();
  const { isdeleting, deleteSchedule } = useDeleteBusSchedule();
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
      {
        title: "Actions",
        dataIndex: "",
        render: (schedule: ISchedule) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="primary"
              size="small"
              icon={<SwitcherOutlined />}
              variant="solid"
              onClick={() => {
                setItem(undefined);
                setItem(schedule);
                setOpen(true);
              }}
            />
            <Button
              color="cyan"
              size="small"
              icon={<EyeOutlined />}
              variant="solid"
              onClick={() => {
                setItem(schedule);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              size="small"
              danger
              icon={<DeleteOutlined />}
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() => deleteSchedule(schedule.identifier)}
            />
          </Flex>
        ),
      },
    ],
    [],
  );

  const data =
    schedules.filter(
      (schedule: ISchedule) =>
        schedule?.daysOfOperation
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        schedule.arrivalTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.departureTime.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];
  return (
    <>
      <Card
        title="Available Trip"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Trip"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Trip
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
      <ManifestScreen
        trip={item}
        isOpen={open}
        onCancel={() => setOpen(false)}
      />
      <AddSchedule payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

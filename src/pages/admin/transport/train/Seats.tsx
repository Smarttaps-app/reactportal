import {
  App,
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Row,
  Space,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { BarsOutlined, PlusOutlined } from "@ant-design/icons";
import { ISeat } from "../../../../utils/type";
import { useSeats, useDeleteSeat } from "./useTrain";
import { useQueryClient } from "@tanstack/react-query";
import AddSeat from "./AddSeat";
import { Search } from "lucide-react";

export default function SeatsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { message } = App.useApp();
  const client = useQueryClient();
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ISeat>();
  const { loading, seats, error } = useSeats();
  const { isdeleting, deleteSeat } = useDeleteSeat();

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "image",
        key: "image",
        width: "5%",
        render: (avatar: string) => (
          <Avatar src={avatar} size="small" icon={<BarsOutlined />} />
        ),
      },
      {
        title: "Seat Name",
        dataIndex: "classType",
        key: "classType",
        width: "25%",
      },
      {
        title: "Seat price",
        dataIndex: "price",
        key: "price",
        render: (price: string) => Common.formatAsCurrency(Number(price)),
        width: "15%",
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
        width: "25%",
        render: (seat: ISeat) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              size="small"
              variant="solid"
              onClick={() => {
                setItem(seat);
                setAdd(true);
              }}
            >
              View
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteSeat(seat.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["seats"] }),
                })
              }
            >
              Delete
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const data =
    seats.filter(
      (seat: ISeat) =>
        seat.classType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seat.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seat.availabilityStatus.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  return (
    <>
      <Card
        title="Seats"
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
              title="New Seat"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Seat
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
          scroll={{ x: "max-content" }}
        />
      </Card>
      <AddSeat payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

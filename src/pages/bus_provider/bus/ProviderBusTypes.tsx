import { Button, Flex, Input, Result, Table } from "antd";
import { useMemo, useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useBusTypes, useDeleteBusType } from "./useBus";
import { IBusType } from "../../../utils/type";
import { Common } from "../../../utils/Common";
import ProviderLayoutEditor from "./ProviderLayoutEditor";

export default function ProviderBusTypesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IBusType>();
  const { loading, busTypes, error } = useBusTypes();
  const { isdeleting, deleteBusType } = useDeleteBusType();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Bus Type",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Total Seats",
        dataIndex: "total_seats",
        key: "total_seats",
      },
      {
        title: "Seat Layout",
        dataIndex: "",
        render: (record: IBusType) => (
          <span className="text-xs text-gray-500">
            {record?.companyName || "No Provider"}
          </span>
        ),
      },
      {
        title: "Owner",
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (item: IBusType) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              variant="solid"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setItem(undefined);
                setItem(item);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              danger
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() => deleteBusType(item.id)}
            />
          </Flex>
        ),
      },
    ],
    [],
  );

  const data =
    busTypes.filter(
      (payment: IBusType) =>
        payment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.companyName?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <div className="!shadow-sm !rounded-lg">
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div className="place-self-start flex gap-4">
          <h4>Bus Types</h4>
          <Input
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
          />
        </div>
        <div className="place-self-end flex gap-4">
          <span className="text-sm text-gray-500">Total: {data.length}</span>
          <Button
            icon={<PlusOutlined />}
            title="New Bus Type"
            type="primary"
            onClick={() => {
              setItem(undefined);
              setAdd(true);
            }}
          >
            New Bus Type
          </Button>
        </div>
      </div>
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
      <ProviderLayoutEditor
        payload={item}
        isOpen={add}
        onCancel={() => setAdd(false)}
      />
    </div>
  );
}

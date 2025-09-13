import { App, Button, Card, Flex, Input, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { IBiller } from "../../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";
import AddBiller from "./AddBiller";
import { useDeleteBiller } from "./useService";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

export default function ProductDetailScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState<IBiller>();
  const { message } = App.useApp();
  const client = useQueryClient();
  const { isdeleting, deleteBiller } = useDeleteBiller();
  const location = useLocation();
  const { sproduct } = location.state || {};
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "3%",
      },
      {
        title: "Biller",
        dataIndex: "billerName",
        key: "billerName",
        width: "15%",
      },
      {
        title: "BillerID",
        dataIndex: "billerId",
        key: "billerId",
      },
      {
        title: "Customer Field",
        dataIndex: "customerField",
        key: "customerField",
        width: "15%",
      },
      {
        title: "Lookup",
        dataIndex: "hasLookup",
        key: "hasLookup",
        width: "10%",
        render: (hasLookup: boolean) => (
          <Tag color={`${hasLookup ? "green" : "red"}`}>
            {hasLookup ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Addon",
        dataIndex: "hasAddons",
        key: "hasAddons",
        width: "5%",
        render: (hasAddons: boolean) => (
          <Tag color={`${hasAddons ? "green" : "red"}`}>
            {hasAddons ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Package",
        dataIndex: "hasPackages",
        key: "hasPackages",
        width: "5%",
        render: (hasPackages: boolean) => (
          <Tag color={`${hasPackages ? "green" : "red"}`}>
            {hasPackages ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "8%",
        render: (status: boolean) => (
          <Tag color={`${status ? "green" : "red"}`}>
            {status ? "Active" : "Inactive"}
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
      {
        title: "Actions",
        dataIndex: "",
        width: "20%",
        render: (record: IBiller) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              variant="solid"
              size="small"
              onClick={() =>
                record.hasPackages
                  ? navigate(`/admin/biller/${record.billerId}`, {
                      state: {
                        payload: record,
                      },
                    })
                  : message.info("Biller has not package")
              }
            >
              View
            </Button>
            <Button
              color="default"
              size="small"
              variant="solid"
              onClick={() => {
                setItem(record);
                setShow(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteBiller(record.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["packages"] }),
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
  const data =
    sproduct.billers.filter(
      (biller: IBiller) =>
        biller.billerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        biller.customerField.toLowerCase().includes(searchTerm.toLowerCase()) ||
        biller.billerType?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              type="link"
              onClick={() => navigate(-1)}
            />
            {`${sproduct?.name} billers`}
          </Space>
        }
        className="!shadow-sm !rounded-lg"
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <Button
              icon={<PlusOutlined />}
              title="New Product"
              type="primary"
              onClick={() => {
                setItem({ product_id: sproduct.id } as IBiller);
                setShow(true);
              }}
            >
              New Biller
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          size="small"
          //loading={loading}
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <AddBiller product={item} isOpen={show} onCancel={() => setShow(false)} />
    </>
  );
}

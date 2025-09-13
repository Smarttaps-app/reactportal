import { App, Button, Card, Flex, Input, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { IPackage } from "../../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";

import AddPackage from "./AddPackage";
import { useQueryClient } from "@tanstack/react-query";
import { useDeletePackage } from "./useService";
import { Search } from "lucide-react";

export default function BillerDetailScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState<IPackage>();
  const { message } = App.useApp();
  const client = useQueryClient();
  const { isdeleting, deletePackage } = useDeletePackage();
  const location = useLocation();
  const { payload } = location.state || {};
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "6%",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "20%",
      },
      {
        title: "Code",
        dataIndex: "packageCode",
        key: "packageCode",
        width: "5%",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        width: "10%",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Validity",
        dataIndex: "hasValidity",
        key: "hasValidity",
        width: "5%",
        render: (hasValidity: boolean) => (
          <Tag color={`${hasValidity ? "green" : "red"}`}>
            {hasValidity ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Period",
        dataIndex: "validity",
        key: "validity",
        width: "5%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "5%",
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
        width: "15%",
        render: (record: IPackage) => (
          <Flex gap="small" align="center" wrap>
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
                deletePackage(record.id, {
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
    payload.packages.filter(
      (pack: IPackage) =>
        pack.packageCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
            {`Biller ${payload?.billerName}`}
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
              title="New Package"
              type="primary"
              onClick={() => {
                setItem({ product_type_id: payload.id } as IPackage);
                setShow(true);
              }}
            >
              New Package
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
        <AddPackage
          product={item}
          isOpen={show}
          onCancel={() => setShow(false)}
        />
      </Card>
    </>
  );
}

import { Button, Card, Col, Empty, Row, Spin, Table } from "antd";
import { useMemo } from "react";
import { Common } from "../../../utils/Common";
import { useSubscriptions } from "./useSubscriptions";
import { ISubscription } from "../../../utils/type";
import { useRenewSubscription } from "./useRenewSubscription";
import { RedoOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
  const navigate = useNavigate();
  const { isPending, data, error } = useSubscriptions();
  const { renew, isRenewing } = useRenewSubscription();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Phone",
        dataIndex: "msisdn",
        key: "msisdn",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (keyValue: boolean) => (keyValue ? "Active" : "Inactive"),
      },
      {
        title: "Package",
        dataIndex: "frequency",
        key: "frequency",
        render: (frequency: string) => Common.getPackage(frequency),
      },
      {
        title: "Exipre Date",
        dataIndex: "expired_at",
        key: "expired_at",
        render: (expire: string) => Common.formatDate(expire),
      },
      {
        title: "Date Joined",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string) => Common.formatDate(created),
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (_key: string, data: ISubscription) => (
          <Button
            type="primary"
            icon={<RedoOutlined />}
            onClick={() =>
              renew(data.id, {
                onSettled: () => navigate(1),
              })
            }
            danger
            loading={isRenewing}
          >
            Renew
          </Button>
        ),
      },
    ],
    []
  );
  if (error)
    //  console.log(error);
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const subscriptions: ISubscription[] = data || [];

  return (
    <div className="small-spacer">
      {isPending && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Row>
              <Col span={24}>
                <Card
                  title="Players"
                  className="shadow-sm rounded"
                  loading={isPending}
                >
                  <Table
                    rowKey="id"
                    loading={isPending}
                    columns={columns}
                    dataSource={subscriptions}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

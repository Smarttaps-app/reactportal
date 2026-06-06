import { Button, Card, Col, Empty, Row, Spin, Table } from "antd";
import { useMemo } from "react";
import { usePlayers } from "./usePlayers";
import { Link } from "react-router-dom";
import { Common } from "../../../utils/Common";
import { IPlayer } from "../../../utils/type";
export default function Player() {
  const { isPending, data, error } = usePlayers();

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
        title: "Date Joined",
        dataIndex: "created_at",
        key: "created_at",
        render: (keyValue: string) => Common.formatDate(keyValue),
      },
      {
        title: "View",
        dataIndex: "",
        render: (_key: string, data: IPlayer) => (
          <Link to={`${data.id}/player`}>
            <Button className="atn-btn atn-btn-primary">View</Button>
          </Link>
        ),
      },
    ],
    []
  );
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty />
      </Row>
    );

  const players: IPlayer[] = data || [];

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
                <Card title="Players" className="shadow-sm rounded">
                  <Table
                    rowKey="id"
                    loading={isPending}
                    columns={columns}
                    dataSource={players}
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

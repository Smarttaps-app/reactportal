import { Card, Col, Empty, Row, Spin, Table } from "antd";
import { useMemo } from "react";
import { Common } from "../../../utils/Common";
import { useSinglePlayer } from "./usePSinglelayer";
export default function SinglePlayer() {
  const { isPending, player, error } = useSinglePlayer();
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
        title: "Score",
        dataIndex: "score",
        key: "score",
      },
      {
        title: "Duration",
        dataIndex: "scrabble",
        key: "scrabble",
        render: (keyValue: any) => `${keyValue.duration}sec`,
      },
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
        //render: (keyValue: any) => `${keyValue.word}`,
      },
      {
        title: "Answer",
        dataIndex: "scrabble",
        key: "scrabble",
        render: (keyValue: any) => `${keyValue.answers}`,
      },
      {
        title: "Mode",
        dataIndex: "scrabble",
        key: "scrabble",
        render: (keyValue: any) => `${keyValue.mode}`,
      },
      {
        title: "Date Started",
        dataIndex: "created_at",
        key: "created_at",
        render: (keyValue: string) => Common.formatDate(keyValue),
      },
    ],
    []
  );
  if (isPending) return <Spin />;
  if (error)
    return (
      <Row>
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  console.log(player);

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
                  title={`User : ${player?.data.msisdn} Subscription Status : ${
                    player?.data.status ? "Active" : "Inactive"
                  }`}
                  className="shadow-sm rounded"
                >
                  <Table
                    rowKey="id"
                    loading={isPending}
                    columns={columns}
                    dataSource={player?.data?.playings || []}
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

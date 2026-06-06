import { Card, List, Spin, Typography } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useLeaderBoard } from "../hooks/useLeaderboard";

export function Leaderboard() {
  const { loading, leaders, isError, error } = useLeaderBoard();
  return (
    <Card title="Leader Board" className="float-right top-0 end-0 w-72 overflow-y-auto">
      {loading ? (
        <Spin className="mx-auto" />
      ) : isError ? (
        <Typography.Text className="mx-auto">{error?.message}</Typography.Text>
      ) : (
        <List
          dataSource={(leaders as any[]) || []}
          renderItem={(
            { msisdn, score, id }: { msisdn: string; score: string; id: number },
            index: number
          ) => (
            <List.Item key={id}>
              <List.Item.Meta
                avatar={<TrophyOutlined />}
                title={<span className="text-sm">{index + 1}. {msisdn}</span>}
              />
              <Typography.Text strong>{score}</Typography.Text>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

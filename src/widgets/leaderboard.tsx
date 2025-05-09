import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { useLeaderBoard } from "../hooks/useLeaderboard";

export function Leaderboard() {
  const { loading, leaders, isError, error } = useLeaderBoard();
  return (
    <Card className="float-right top-0 end-0 w-72 overflow-y-auto">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h6" color="blue-gray" className="">
            Leader Board
          </Typography>
        </div>
        <div className="divide-y divide-gray-200 justify-center">
          {loading ? (
            <Spinner className="mx-auto" />
          ) : isError ? (
            <Typography className=" mx-auto">{error?.message}</Typography>
          ) : (
            leaders &&
            leaders.map(
              (
                {
                  msisdn,
                  score,
                  id,
                }: { msisdn: string; score: string; id: number },
                index: number
              ) => (
                <div
                  key={id}
                  className="flex items-center justify-between pb-1 pt-1 last:pb-0"
                >
                  <div className="flex items-center gap-x-2">
                    <Badge className="min-w-3 min-h-3" content={index + 1}>
                      <IconButton size="sm" className="rounded-full">
                        <TrophyIcon className="h-4 w-4" />
                      </IconButton>
                    </Badge>
                    <div>
                      <Typography
                        className="text-sm"
                        color="blue-gray"
                        variant="lead"
                      >
                        {msisdn}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Typography
                      className="text-sm font-bold"
                      color="blue-gray"
                      variant="lead"
                    >
                      {score}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm"
                    >
                      10sec
                    </Typography>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </CardBody>
    </Card>
  );
}

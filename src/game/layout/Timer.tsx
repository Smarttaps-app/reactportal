import { Typography } from "antd";
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <Typography.Text className="text-white font-bold">
      {seconds}s
    </Typography.Text>
  );
}

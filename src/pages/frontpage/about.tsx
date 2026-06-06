import { Card, Typography } from "antd";
import word from "../../assets/word.png";
export default function About() {
  return (
    <div id="about" className="grid text-center">
      <Typography.Title level={1} className="text-blue-600">
        About {import.meta.env.VITE_APP_NAME}
      </Typography.Title>

      <div className="flex gap-5 p-10">
        <div className="px-10">
          <Card className="mx-auto px-5">
            {import.meta.env.VITE_APP_NAME} is an online game where users answer
            simple questions and stand a chance to win big. Users can win over 1
            million monthly. This novel initiative is intended to empower the
            masses economically with the much-needed funds in the face of an
            ailing economy and rising inflation and unemployment rates.
          </Card>
        </div>
        <img className="rounded size-96" src={word} />
      </div>
    </div>
  );
}

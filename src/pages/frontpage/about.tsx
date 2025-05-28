import { Card, CardBody, Typography } from "@material-tailwind/react";
import word from "../../assets/word.png";
export default function About() {
  return (
    <div id="about" className="grid text-center">
      <Typography className="text-blue-600" variant="h1">
        About {import.meta.env.VITE_APP_NAME}
      </Typography>

      <div className="flex gap-5 p-10">
        <div className="px-10">
          <Card className="mx-auto px-5">
            <CardBody>
              {import.meta.env.VITE_APP_NAME} is a an online game where users
              answer simple questions and stand a chance to win big. Users can
              win over 1 million monthly. This novel initiative is intended to
              empower the masses economically with the much-needed funds in the
              face of an ailing economy and rising inflation and unemployment
              rates. The rationale is to make funds available through various
              {import.meta.env.VITE_APP_NAME} cash rewards which could serve as
              start up capital for artisans, school fees for students, medical
              bills for patients, house rent for the homeless, and that extra
              cash required to purchase very vital items that could boost the
              quality of daily living for the less privileged in the society.
            </CardBody>
          </Card>
        </div>
        <img className="rounded size-96" src={word} />
      </div>
    </div>
  );
}

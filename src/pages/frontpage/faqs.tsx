import { Col, Collapse, Row, theme } from "antd";
import type { CSSProperties } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: <h2 className=" !text-3xl"> Getting Started</h2>,
    children: <p className="">{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: <h2 className=" !text-3xl"> Making Payment</h2>,
    children: <p className="">{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: <h1 className=" !text-3xl"> Redeem Ticket</h1>,
    children: <p className="">{text}</p>,
    style: panelStyle,
  },
];
export default function FAQs() {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    //color: "#fff",
    border: "none",
  };
  return (
    <div id="faq" className="grid text-center px-10 py-5">
      <h4 className="text-3xl">FREQUENCE ASKED QUESTIONS</h4>
      <Row>
        <Col span={24}>
          <Collapse
            className="bg-white"
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                className="!text-orange-500"
                rotate={isActive ? 90 : 0}
              />
            )}
            items={getItems(panelStyle)}
          />
        </Col>
      </Row>
    </div>
  );
}

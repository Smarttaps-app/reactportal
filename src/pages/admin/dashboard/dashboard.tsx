import { Card, Col, Row, Statistic, Typography, Tag } from "antd";
import { useAnalytics } from "./useAnalytics";
import { Common } from "../../../utils/Common";
export default function Dashboard() {
  const { isPending, data, error } = useAnalytics();
  console.log(data);
  return (
    <>
      {data?.customer && (
        <>
          <Typography.Title level={4}>Customer Report</Typography.Title>
          <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="All Customers"
                  loading={isPending}
                  value={error ? 0 : data?.customer?.total_customers}
                  valueStyle={{ color: Common.getcolorcode("all") }}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Active"
                  value={error ? 0 : data?.customer?.active_customers}
                  valueStyle={{ color: Common.getcolorcode("active") }}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Pending"
                  value={error ? 0 : data?.customer?.reg_customers}
                  valueStyle={{ color: Common.getcolorcode("pending") }}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Inactive"
                  value={error ? 0 : data?.customer?.inactive_customers}
                  valueStyle={{ color: Common.getcolorcode("booked") }}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Locked"
                  value={error ? 0 : data?.customer?.locked_customers}
                  valueStyle={{ color: Common.getcolorcode("used") }}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Blocked"
                  value={error ? 0 : data?.customer?.blocked_customers}
                  valueStyle={{ color: Common.getcolorcode("failed") }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
      {data?.credit && (
        <>
          <Typography.Title level={4}>Credit Report</Typography.Title>
          <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Total Credit"
                  loading={isPending}
                  value={error ? 0 : data?.credit?.total_amount}
                  valueStyle={{ color: Common.getcolorcode("all") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("all")}>
                  {`${
                    (data?.credit?.total_amount / data?.credit?.total_amount) *
                    100
                  }%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Successful"
                  value={error ? 0 : data?.credit?.successful_amount}
                  valueStyle={{ color: Common.getcolorcode("active") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("active")}>
                  {`${(
                    (data?.credit?.successful_amount /
                      data?.credit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Pending"
                  value={error ? 0 : data?.credit?.pending_amount}
                  valueStyle={{ color: Common.getcolorcode("pending") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("pending")}>
                  {`${(
                    (data?.credit?.pending_amount /
                      data?.credit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Failed"
                  value={error ? 0 : data?.credit?.failed_amount}
                  valueStyle={{ color: Common.getcolorcode("failed") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("failed")}>
                  {`${(
                    (data?.credit?.failed_amount / data?.credit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {data?.debit && (
        <>
          <Typography.Title level={4}>Debit Report</Typography.Title>
          <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Total Debit"
                  loading={isPending}
                  value={error ? 0 : data?.debit?.total_amount}
                  valueStyle={{ color: Common.getcolorcode("all") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("all")}>
                  {`${(
                    (data?.debit?.total_amount / data?.debit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Successful"
                  value={error ? 0 : data?.debit?.successful_amount}
                  valueStyle={{ color: Common.getcolorcode("active") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("active")}>
                  {`${(
                    (data?.debit?.successful_amount /
                      data?.debit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Pending"
                  value={error ? 0 : data?.debit?.pending_amount}
                  valueStyle={{ color: Common.getcolorcode("pending") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("pending")}>
                  {`${(
                    (data?.debit?.pending_amount / data?.debit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Failed"
                  value={error ? 0 : data?.debit?.failed_amount}
                  valueStyle={{ color: Common.getcolorcode("failed") }}
                />
                <Tag bordered={false} color={Common.getcolorcode("failed")}>
                  {`${(
                    (data?.debit?.failed_amount / data?.debit?.total_amount) *
                    100
                  ).toFixed(2)}%`}
                </Tag>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

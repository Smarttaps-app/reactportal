import { App, Button, Card, Form, Input, Tag, Typography } from "antd";
import { IAddProps, ISupportTicket, IComment } from "../../../utils/type";
import { useCloseTicket, useReplyTicket } from "./useSupports";
import { Common } from "../../../utils/Common";

const { TextArea } = Input;

const SupportTicketResponse: React.FC<IAddProps<ISupportTicket>> = ({
  payload,
}) => {
  const { message } = App.useApp();
  const { replyTicket, replying } = useReplyTicket();
  const { closingTicket, closing } = useCloseTicket();

  const closed = (id: number) => {
    closingTicket(
      { id, action: "close" },
      {
        onSuccess: (response) => {
          message.success(response.statusDescription);
        },
        onError: (error) => message.error(Common.formatError(error)),
      },
    );
  };

  const onFinish = async (values: { comment: string }) => {
    if (!payload?.id) return;

    replyTicket(
      { id: payload.id, action: values.comment },
      {
        onSuccess: (data) => {
          message.success(data.statusDescription);
        },
        onError: (error) => message.error(Common.formatError(error)),
      },
    );
  };

  return (
    <Card
      className="px-16"
      title={
        <div className="grid items-center gap-4 py-2">
          <div className="flex justify-between gap-4">
            <span className="text-sm font-semibold">{payload?.subject}</span>
            <Button
              type="primary"
              size="small"
              loading={closing}
              disabled={closing || payload?.status === "closed"}
              onClick={() => payload?.id && closed(payload.id)}
            >
              Close
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Tag color={Common.colorCode(payload?.status ?? "")}>
              {payload?.status}
            </Tag>
            <Tag color={Common.colorCode(payload?.priority ?? "")}>
              {payload?.priority}
            </Tag>
          </div>
        </div>
      }
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="my-4 p-4 bg-gray-50 rounded-lg">
          <Typography.Text className="text-sm">
            {payload?.description}
          </Typography.Text>
        </div>
        {payload?.comments.length === 0 ? (
          <Typography.Text>No notifications found</Typography.Text>
        ) : (
          <div className="space-y-4">
            {payload?.comments.map((notification: IComment) => (
              <div
                key={notification.id}
                className={`p-2 bg-gray-50 shadow cursor-pointer hover:bg-gray-50 rounded-lg`}
              >
                <div className="flex justify-between p-2">
                  <div className="flex gap-2">
                    <Typography.Text className="text-sm p-1">
                      {payload.user?.firstname} {payload.user?.lastname}
                    </Typography.Text>
                  </div>
                  <div>
                    <Typography.Text className="text-xs text-gray-500 p-1">
                      {Common.formatDate(notification.created_at)}
                    </Typography.Text>
                  </div>
                </div>
                <div className=" p-4">
                  <Typography.Text className="text-sm">
                    {notification.comment}
                  </Typography.Text>
                </div>
              </div>
            ))}
          </div>
        )}
        <Form.Item<IComment>
          label="Reply Comment"
          name="comment"
          rules={[{ required: true, message: "Please input message!" }]}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 1 }}>
          <Button type="primary" htmlType="submit" loading={replying}>
            Reply
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default SupportTicketResponse;

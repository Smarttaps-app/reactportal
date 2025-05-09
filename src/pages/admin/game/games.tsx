import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Common } from "../../../utils/Common";
import { useGames } from "./useGames";
import { IGame } from "../../../utils/type";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useDeleteGame } from "./useDeleteGame";
import { toast } from "react-toastify";
import AddGame from "./add";
export default function Games() {
  const { isPending, data, error } = useGames();
  const { deleteGame, isdeleting } = useDeleteGame();

  const { confirm } = Modal;
  const [form] = Form.useForm();
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: "Answer",
        dataIndex: "answer",
        key: "answer",
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
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
        title: "Actions",
        dataIndex: "",
        render: (key: string, data: IGame) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deleted(data.id)}
              danger
              loading={isdeleting}
            />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => showDeleteConfirm(data)}
            />
            <Button
              type="primary"
              icon={<RedoOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
          </Flex>
        ),
      },
    ],
    []
  );

  const deleted = (id: number) => {
    deleteGame(id, {
      onSuccess: (response) => {
        console.log(response);
        toast.success(response.statusDescription);
      },
    });
  };

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish: FormProps<IGame>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const showDeleteConfirm = (data: IGame) => {
    confirm({
      title: "Edit",
      icon: <EditOutlined />,
      content: (
        <Form
          name="basic"
          layout="vertical"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<IGame>
            label="Word"
            name="word"
            initialValue={data.word}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IGame>
            label="Answer"
            name="answers"
            initialValue={data.answers}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IGame>
            label="Duration"
            name="duration"
            initialValue={data.duration}
            rules={[{ required: true, message: "Please input duration!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IGame>
            label="Mode"
            name="mode"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              defaultValue={data.mode}
              options={[
                { value: "arranged", label: "Arranged" },
                { value: "matched", label: "Matched" },
              ]}
            />
          </Form.Item>
        </Form>
      ),
      okText: "Update",
      okType: "danger",
      cancelText: "Cancle",
      onOk() {
        form.submit();
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const players: IGame[] = data || [];

  return (
    <div className="small-spacer">
      {isPending && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <Row>
        <Col span={24}>
          <Card
            title="Game"
            extra={
              <Button
                icon={<PlusOutlined />}
                title="Add Game"
                type="primary"
                onClick={() => setAdd(true)}
              >
                Add Game
              </Button>
            }
            className="shadow-sm rounded"
          >
            <Table
              rowKey="id"
              loading={isPending}
              columns={columns}
              dataSource={players}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <AddGame isOpen={add} onCancel={() => setAdd(false)} />
    </div>
  );
}

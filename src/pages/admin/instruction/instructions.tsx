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
import { useInstructions } from "./useInstruction";
import { IInstruction } from "../../../utils/type";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useDeleteInstruction } from "./useDeleteInstruction";
import { toast } from "react-toastify";
import AddInstruction from "./add";
export default function Instructions() {
  const [add, setAdd] = useState(false);
  const { isLoadingInstructions, instructions, error } = useInstructions();
  const { deleteInstruction, isdeleting } = useDeleteInstruction();

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
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Description",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
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
        render: (key: string, data: IInstruction) => (
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
    deleteInstruction(id, {
      onSuccess: (response) => {
        console.log(response);
        toast.success(response.statusDescription);
      },
    });
  };

  const [open, setOpen] = useState(false);
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
  const onFinish: FormProps<IInstruction>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const showDeleteConfirm = (data: IInstruction) => {
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
          <Form.Item<IInstruction>
            label="Title"
            name="title"
            initialValue={data.title}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IInstruction>
            label="Description"
            name="message"
            initialValue={data.message}
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IInstruction>
            label="Code"
            name="code"
            initialValue={data.code}
            rules={[{ required: true, message: "Please input Code!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IInstruction>
            label="Mode"
            name="mode"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              defaultValue={data.mode}
              //onChange={handleChange}
              options={[
                { value: "arranged", label: "arranged" },
                { value: "matched", label: "matched" },
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

  const players: IInstruction[] = instructions || [];

  return (
    <div className="small-spacer">
      {isLoadingInstructions && (
        <div className="overlay">
          <Spin />
        </div>
      )}
      <Row>
        <Col span={24}>
          <Card
            title="Instruction"
            extra={
              <Button
                icon={<PlusOutlined />}
                title="Add Instruction"
                type="primary"
                onClick={() => setAdd(true)}
              >
                Add Instruction
              </Button>
            }
            className="shadow-sm rounded"
          >
            <Table
              rowKey="id"
              loading={isLoadingInstructions}
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
      <AddInstruction isOpen={add} onCancel={() => setAdd(false)} />
    </div>
  );
}

import {
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { IAddProps, IGame, IInstruction } from "../../../utils/type";
import { useAddGame } from "./useAddGame";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useInstructions } from "../instruction/useInstruction";
import { useRules } from "../rule/useRule";
const { Option } = Select;

const AddGame: React.FC<IAddProps> = ({ isOpen = false, onCancel }) => {
  const navigate = useNavigate();
  const { isLoadingInstructions, instructions } = useInstructions();
  const { isLoadingRules, rules } = useRules();
  const { addGame, isAdding } = useAddGame();
  const onFinish: FormProps<IGame>["onFinish"] = (values) => {
    console.log("Success:", values);
    addGame(values, {
      onSuccess: (data) => {
        toast.success(data.statusDescription);
      },
      onSettled: () => navigate(-1),
    });
  };
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      // confirmLoading={updating}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
      width={800}
    >
      <Card className="px-16" title="Add New Word Game">
        <Form
          name="basic"
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<IGame>
            label="Word"
            name="word"
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<IGame>
            label="Answer"
            name="answers"
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<IGame>
            label="Answer Length"
            name="length"
            rules={[{ required: true, message: "Please input length!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<IGame>
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please input duration!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<IGame>
            label="Mode"
            name="mode"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              size="large"
              //onChange={handleChange}
              options={[
                { value: "arranged", label: "Arranged" },
                { value: "matched", label: "Matched" },
              ]}
            />
          </Form.Item>
          <Form.Item<IGame>
            label="Game Instruction"
            name="instructions"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              size="large"
              //onChange={handleChange}
              loading={isLoadingInstructions}
            >
              {instructions?.map((item: IInstruction) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<IGame>
            label="Applied Rule"
            name="rule"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              size="large"
              //onChange={handleChange}
              loading={isLoadingRules}
            >
              {rules?.map((item: IInstruction) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1 }}>
            <Button type="primary" htmlType="submit" loading={isAdding}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
export default AddGame;

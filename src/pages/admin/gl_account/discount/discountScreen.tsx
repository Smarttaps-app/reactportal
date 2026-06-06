import React, { useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { IDiscount } from "../../../../utils/type";

const originData: IDiscount[] = Array.from({ length: 10 }).map<IDiscount>(
  (_, i) => ({
    id: i,
    provider_discount_rate: `Rate ${i}`,
    provider_discount_type: "percentage",
    product_type_id: `PT${i}`,
    gl_to_provider: `GL${i}`,
    admin_id: `A${i}`,
    active: true,
    created_at: "",
    updated_at: "",
  }),
);

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IDiscount;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record: _record,
  index: _index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DiscountScreen: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IDiscount[]>(originData);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const isEditing = (record: IDiscount) => record.id === editingKey;

  const edit = (record: IDiscount) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => setEditingKey(null);

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as Partial<IDiscount>;
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setData(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Rate",
      dataIndex: "provider_discount_rate",
      width: "25%",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "provider_discount_type",
      width: "25%",
      editable: true,
    },
    {
      title: "GL",
      dataIndex: "gl_to_provider",
      width: "30%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: IDiscount) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== null}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<IDiscount>["columns"] = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: IDiscount) => ({
        record,
        inputType: col.dataIndex === "provider_discount_rate" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table<IDiscount>
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
      />
    </Form>
  );
};

export default DiscountScreen;

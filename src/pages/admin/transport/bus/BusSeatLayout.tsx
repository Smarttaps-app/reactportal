import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { useState } from "react";
import { IAddProps, IBusSeat, IBusType, IUser } from "../../../../utils/type";
import { useAddBusType, useBusProviders } from "./useBus";

const { Option } = Select;
const MODES = ["PASSENGER", "AISLE", "DRIVER"] as const;
type Mode = (typeof MODES)[number];

const MODE_COLORS: Record<string, string> = {
  PASSENGER: "bg-green-500 text-white",
  AISLE: "bg-gray-400",
  DRIVER: "bg-yellow-400",
};

const LayoutEditor: React.FC<IAddProps<IBusType>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { isPending, busProviders: providers } = useBusProviders();
  const { addBusType, isAdding } = useAddBusType();

  const [mode, setMode] = useState<Mode>("PASSENGER");
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(4);
  const [grid, setGrid] = useState<IBusSeat[]>([]);

  const getCell = (r: number, c: number) =>
    grid.find((x) => x.seatrow === r && x.seatcolumn === c);

  // label uses passenger count at time of click — sequential numbering
  const nextSeatNumber = () =>
    grid.filter((x) => x.seattype === "PASSENGER").length + 1;

  const generateLabel = (seatNum: number, c: number) =>
    `${seatNum}${String.fromCharCode(64 + c)}`; // 1A, 1B, 2A...

  const handleClick = (r: number, c: number) => {
    setGrid((prev) => {
      const existing = prev.find((x) => x.seatrow === r && x.seatcolumn === c);
      const filtered = prev.filter(
        (x) => !(x.seatrow === r && x.seatcolumn === c),
      );

      // toggle off if clicking same type again
      if (existing?.seattype === mode) return filtered;

      if (mode === "AISLE" || mode === "DRIVER") {
        return [
          ...filtered,
          { seatrow: r, seatcolumn: c, seattype: mode } as IBusSeat,
        ];
      }

      // passenger — assign sequential seat number
      const seatNum = nextSeatNumber();
      return [
        ...filtered,
        {
          seatrow: r,
          seatcolumn: c,
          seattype: "PASSENGER",
          seat_label: generateLabel(seatNum, c),
        } as IBusSeat,
      ];
    });
  };

  const passengerCount = grid.filter((x) => x.seattype === "PASSENGER").length;

  const onFinish: FormProps<IBusType>["onFinish"] = (values) => {
    if (grid.length === 0) {
      return form.setFields([
        {
          name: "seats",
          errors: ["Please design the bus layout before submitting."],
        },
      ]);
    }
    // build payload directly from current grid — do not rely on form fields for seats
    const payload: IBusType = {
      ...values,
      seats: grid.map((cell) => ({
        seatrow: cell.seatrow,
        seatcolumn: cell.seatcolumn,
        is_bookable: cell.seattype === "PASSENGER",
        admin_id: values.admin_id,
        seattype: cell.seattype,
        seat_label: cell.seattype === "PASSENGER" ? cell.seat_label : null,
      })) as IBusSeat[],
      total_seats: passengerCount, // ← correct count, no - 1
    };

    addBusType(payload);
  };

  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      confirmLoading={isAdding}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      title="Add Bus Type"
    >
      <div className="mb-4 flex gap-4 text-sm text-gray-600">
        <Legend color="bg-green-500" label="Passenger" />
        <Legend color="bg-gray-400" label="Aisle" />
        <Legend color="bg-yellow-400" label="Driver" />
        <Legend color="bg-gray-100" label="Empty" />
      </div>
      {/* Dimensions */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm text-gray-600">
          Columns
          <input
            type="number"
            min={1}
            max={6}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="ml-2 w-16 border rounded px-2 py-1 text-sm"
          />
        </label>
        <label className="text-sm text-gray-600">
          Rows
          <input
            type="number"
            min={1}
            max={40}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="ml-2 w-16 border rounded px-2 py-1 text-sm"
          />
        </label>
        <span className="ml-auto text-sm text-gray-500">
          {passengerCount} passenger seats
        </span>
      </div>

      {/* Mode selector */}
      <div className="flex gap-3 mb-6">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              mode === m
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <Form
        layout="vertical"
        form={form}
        initialValues={{
          id: payload?.id,
          admin_id: payload?.admin_id,
          name: payload?.name,
          total_seats: payload?.total_seats,
        }}
        onFinish={onFinish}
      >
        <div className="flex gap-4 mb-4 flex-wrap">
          <Form.Item<IBusType> name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item<IBusType>
            name="name"
            label="Bus name"
            rules={[{ required: true, message: "Enter bus name" }]}
          >
            <Input placeholder="e.g. Toyota Coaster 30-seater" />
          </Form.Item>

          <Form.Item<IBusType>
            name="admin_id"
            label="Provider"
            rules={[{ required: true, message: "Select a provider" }]}
          >
            <Select
              loading={isPending}
              placeholder="Select provider"
              style={{ minWidth: 180 }}
            >
              {providers?.map((item: IUser) => (
                <Option key={item.id} value={item.id}>
                  {item.companyName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Seat grid */}
        <div
          className="grid gap-2 mb-6 overflow-x-auto pb-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 56px)` }}
        >
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              const row = r + 1;
              const col = c + 1;
              const cell = getCell(row, col);
              const bg = cell
                ? MODE_COLORS[cell.seattype]
                : "bg-gray-100 hover:bg-gray-200";

              return (
                <div
                  key={`${row}-${col}`}
                  onClick={() => handleClick(row, col)}
                  title={`Row ${row}, Col ${col}`}
                  className={`h-14 w-14 flex items-center justify-center cursor-pointer rounded text-xs font-semibold border border-gray-200 transition-colors select-none ${bg}`}
                >
                  {cell?.seattype === "PASSENGER" && cell.seat_label}
                  {cell?.seattype === "DRIVER" && "D"}
                  {cell?.seattype === "AISLE" && "—"}
                </div>
              );
            }),
          )}
        </div>

        {/* Grid validation error */}
        <Form.Item name="seats" noStyle>
          <input type="hidden" />
        </Form.Item>

        <div className="flex gap-3">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isAdding}
              disabled={isAdding || passengerCount === 0}
              className="bg-blue-600"
            >
              Save bus type
            </Button>
          </Form.Item>
          <Button type="default" danger onClick={() => setGrid([])}>
            Clear layout
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default LayoutEditor;
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded border border-gray-200 ${color}`} />
      <span>{label}</span>
    </div>
  );
}

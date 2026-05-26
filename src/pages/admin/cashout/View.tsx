import {
  Descriptions,
  DescriptionsProps,
  Empty,
  Modal,
  Row,
  Space,
  Tag,
} from "antd";
import { ICashout } from "../../../utils/type";
import { Common } from "../../../utils/Common";
import { useCashout } from "./useCashout";

export interface ICashoutProps {
  payload?: ICashout;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const ViewScreen: React.FC<ICashoutProps> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { loading, cashout, error } = useCashout(payload?.id);
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );
  if (!isOpen) return null;
  const statusColor = Common.paymentStatusColor(
    cashout?.withdrawalStatus ?? "",
  ).toLowerCase();

  const bgStyles: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const iconStyles: Record<string, string> = {
    emerald: "text-emerald-600",
    green: "text-green-600",
    red: "text-red-600",
    rose: "text-rose-600",
    yellow: "text-yellow-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
  };

  // Fallback defaults if status color is not mapped above
  const badgeColorClass =
    bgStyles[statusColor] || "bg-gray-50 text-gray-700 border-gray-200";
  const iconColorClass = iconStyles[statusColor] || "text-gray-600";

  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: cashout?.cashout?.recipient,
    },
    {
      label: "Type",
      children: cashout?.cashout?.withdrawalStatus || "No remarks provided",
    },
    {
      label: "Status",
      span: "filled",
      children: cashout?.cashout?.statusCode || "No remarks provided",
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        cashout?.cashout?.amount ? Number(cashout.cashout?.amount) : 0,
      ),
    },
    {
      label: "Remark",
      span: "filled",
      children: cashout?.cashout?.reason || "No remarks provided",
    },
    {
      label: "Date",
      span: "filled",
      children: Common.formatDate(cashout?.cashout?.created_at),
    },
  ];
  const payment: DescriptionsProps["items"] = [
    {
      label: "Product",
      span: 1,
      children: cashout?.payment?.product || "",
    },
    {
      label: "Service",
      span: 1,
      children: cashout?.payment?.service || "",
    },
    {
      label: "Channel",
      span: 1,
      children: cashout?.payment?.channel || "",
    },
    {
      label: "Recipient",
      span: 1,
      children: cashout?.payment?.recipient || "",
    },
    {
      label: "Status",
      span: 1,
      children: cashout?.payment?.status || "",
    },
    {
      label: "Reference",
      span: "filled",
      children: cashout?.payment?.reference || "",
    },
    {
      label: "Payment type",
      span: 1,
      children: (
        <Tag
          color={`${
            cashout?.payment?.payment_type == "CREDIT" ? "green" : "red"
          }`}
        >
          {cashout?.payment?.payment_type || ""}
        </Tag>
      ),
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        cashout?.payment?.amount ? Number(cashout.payment?.amount) : 0,
      ),
    },
    {
      label: "Message",
      span: "filled",
      children: cashout?.payment?.statusMessage,
    },
    {
      label: "Date Added",
      span: "filled",
      children: Common.formatDate(cashout?.payment?.created_at),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Card Wrapper */}
      <div className="relative top-6 w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all my-8">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Top Action Utility Bar */}
        <div className="px-6 py-2 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Cashout Details
          </h3>
          <div className="flex space-x-1 pr-8">
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              title="Print Receipt"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </button>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              title="Download PDF"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-6 text-center border-b border-gray-100">
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 ${badgeColorClass.split(" ")[0]}`}
          >
            <svg
              className={`w-7 h-7 ${iconColorClass}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {Common.formatAsCurrency(Number(cashout?.amount))}
          </h2>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            {cashout?.statusDescription || "Processed Successfully"}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 mt-3 text-xs font-semibold border rounded-full ${badgeColorClass}`}
          >
            {cashout?.withdrawalStatus?.toUpperCase() || "Unknown"}
          </span>
        </div>

        {/* Info Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 bg-gray-50/30">
          <div>
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Transaction ID
            </label>
            <div className="mt-0.5 flex items-center space-x-1.5">
              <span className="text-xs font-mono text-gray-700">
                {cashout?.reference || "N/A"}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(cashout?.reference ?? "")
                }
                className="text-gray-400 hover:text-gray-600 transition"
                title="Copy Reference"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Payment Method
            </label>
            <div className="mt-0.5 flex items-center text-xs font-medium text-gray-700">
              <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest mr-1.5">
                {cashout?.payment_type?.toUpperCase() || "CARD"}
              </span>
              <span className="text-gray-500">
                ••••{" "}
                {cashout?.recipient?.substring(cashout?.recipient.length - 4) ||
                  "****"}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Date & Time
            </label>
            <p className="mt-0.5 text-xs font-medium text-gray-700">
              {Common.formatDate(cashout?.created_at)}
            </p>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Reference Number
            </label>
            <p className="mt-0.5 text-xs font-mono text-gray-700">
              {cashout?.reference || "N/A"}
            </p>
          </div>
        </div>

        {/* Itemized Section */}
        <div className="p-6 max-h-60 overflow-y-auto">
          <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Itemized Breakdown
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-start text-xs">
              <div>
                <p className="font-medium text-gray-800">
                  {cashout?.product || "Payment"}
                </p>
                <p className="text-[11px] text-gray-400">
                  {cashout?.service || "Cashout Service"}
                </p>
              </div>
              <span className="font-semibold text-gray-800">
                {Common.formatAsCurrency(Number(cashout?.amount))}
              </span>
            </div>

            <div className="border-t border-gray-100 my-3 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{Common.formatAsCurrency(Number(cashout?.amount))}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax / VAT (0%)</span>
                <span>{Common.formatAsCurrency(0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200">
                <span>Total Amount Paid</span>
                <span>{Common.formatAsCurrency(Number(cashout?.amount))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button className="w-full sm:w-auto text-xs font-semibold text-red-600 hover:text-red-700 bg-white sm:bg-transparent border sm:border-0 border-red-200 py-2 sm:py-0 px-3 sm:px-0 rounded-lg transition order-2 sm:order-1 text-center">
            Dispute Transaction
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl shadow-sm transition order-1 sm:order-2"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      style={{ top: 10 }}
      open={isOpen}
      maskClosable={false}
      loading={loading}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={900}
    >
      <Space direction="vertical" className="w-full">
        <Descriptions
          bordered
          title="Cashout Details"
          size="small"
          items={items}
        />
        <Descriptions
          title="Payment Details"
          size="small"
          bordered
          items={payment}
        />
      </Space>
    </Modal>
  );
};
export default ViewScreen;

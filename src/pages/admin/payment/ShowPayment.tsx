import { Descriptions, DescriptionsProps, Modal, Tag } from "antd";
import { IShowPaymentProps } from "../../../utils/type";
import { Common } from "../../../utils/Common";

const ShowPayment: React.FC<IShowPaymentProps> = ({
  payment,
  isOpen = false,
  onCancel,
}) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: payment?.recipient,
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        payment?.amount ? Number(payment.amount) : 0,
      ),
    },
    {
      label: "Transaction Type",
      children: payment?.payment_type || "Not provided",
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: (
        <Tag color={Common.paymentStatusColor(payment?.status ?? "")}>
          {payment?.status}
        </Tag>
      ),
    },
    {
      label: "Product",
      span: "filled",
      children: payment?.product || "Not provided",
    },
    {
      label: "Service",
      span: "filled",
      children: payment?.service || "Not provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(payment?.created_at),
    },
    {
      label: "Remark",
      span: "filled",
      children: payment?.statusMessage || "Not provided",
    },
  ];
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={750}
    >
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Transactions
            </button>
            <div className="flex space-x-2">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-8 text-center border-b border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">$1,249.00</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Payment to Acme Corporation
            </p>
            <span className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
              Successful
            </span>
          </div>

          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-100 bg-gray-50/30">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Transaction ID
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-sm font-mono text-gray-700">
                  TXN-98472-8391
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  title="Copy"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Payment Method
              </label>
              <div className="mt-1 flex items-center text-sm font-medium text-gray-700">
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest mr-2">
                  VISA
                </span>
                •••• 4242
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date & Time
              </label>
              <p className="mt-1 text-sm font-medium text-gray-700">
                May 23, 2026 at 12:42 PM
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Reference Number
              </label>
              <p className="mt-1 text-sm font-mono text-gray-700">REF-009124</p>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Itemized Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Premium Pro Subscription
                  </p>
                  <p className="text-xs text-gray-400">
                    Annual License (1 Seat)
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  $1,199.00
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Add-on: Advanced Security Pack
                  </p>
                  <p className="text-xs text-gray-400">
                    Monthly Managed Service
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  $50.00
                </span>
              </div>

              <div className="border-t border-gray-100 my-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>$1,249.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax / VAT (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200">
                  <span>Total Amount Paid</span>
                  <span>$1,249.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0 hidden sm:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-gray-500">
                Something not right? If you suspect an unauthorized charge, open
                a dispute immediately.
              </p>
            </div>
            <button className="w-full sm:w-auto text-xs font-semibold text-red-600 hover:text-red-700 whitespace-nowrap bg-white sm:bg-transparent border sm:border-0 border-red-200 py-2 sm:py-0 rounded-lg shadow-sm sm:shadow-none transition">
              Dispute Transaction
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ShowPayment;

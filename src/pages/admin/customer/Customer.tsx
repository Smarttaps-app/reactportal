import React, { useState } from "react";
import { App, Empty } from "antd";
import { ICustomerProps } from "../../../utils/type";
import { Common } from "../../../utils/Common";
import {
  useCustomer,
  useDisableCustomerAccount,
  useResetCustomerPassword,
} from "./useCustomers";
import { useQueryClient } from "@tanstack/react-query";

const CustomerScreen: React.FC<ICustomerProps> = ({
  customer,
  isOpen = false,
  onCancel,
}) => {
  const client = useQueryClient();
  const [activeTab, setActiveTab] = useState<"ledger" | "security">("ledger");

  const { loading, data, error } = useCustomer(
    customer?.id ?? customer?.identifier ?? "",
  );
  const { disabling, disableCustomer } = useDisableCustomerAccount();
  const { resetting, resetCustomerPassword } = useResetCustomerPassword();
  const { message } = App.useApp();

  if (!isOpen) return null;

  if (error) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl relative text-center">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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
          <Empty description={Common.formatError(error)} />
        </div>
      </div>
    );
  }

  const statusColorClass =
    data?.account_status?.toLowerCase() === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  // Mock structures matching standard financial payloads for rendering the history sheets
  const mockLedgerItems = [
    {
      id: "TXN-9018",
      description: "Wallet Funding via Bank Transfer",
      amount: 25000,
      type: "credit",
      status: "Successful",
      date: "May 24, 2026 at 2:15 PM",
    },
    {
      id: "TXN-8341",
      description: "Utility Bill Settlement (Electricity)",
      amount: -4200,
      type: "debit",
      status: "Successful",
      date: "May 22, 2026 at 9:04 AM",
    },
    {
      id: "TXN-7110",
      description: "Peer-to-Peer Transfer Withdrawal",
      amount: -15000,
      type: "debit",
      status: "Successful",
      date: "May 19, 2026 at 6:42 PM",
    },
    {
      id: "TXN-6092",
      description: "Merchant Payment - Supermarket POS",
      amount: -8350,
      type: "debit",
      status: "Failed",
      date: "May 15, 2026 at 11:20 AM",
    },
  ];

  const mockSecurityLogs = [
    {
      event: "Account Security Password Reset requested",
      location: "Lagos, NG",
      platform: "Android SDK 33",
      status: "Dispatched",
      date: "May 25, 2026 at 4:10 PM",
    },
    {
      event: "Authorized Hardware Session Registered",
      location: "Abuja, NG",
      platform: "Samsung A54",
      status: "Verified",
      date: "May 12, 2026 at 1:04 PM",
    },
    {
      event: "System Profile BVN Verification Handshake",
      location: "System Core",
      platform: "NIMC Engine Gateway",
      status: "Passed",
      date: "May 12, 2026 at 12:55 PM",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-10">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all my-4 flex flex-col max-h-[92vh]">
        {/* Sticky Utility Header Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <h3 className="text-base font-bold text-gray-900">
              Customer Workspace Profile
            </h3>
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
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
        </div>

        {/* Dynamic Scroll View */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1 bg-gray-50/30">
          {/* Identity Info Panel Block */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <img
                src={customer?.avatar || "https://placeholder.com"}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 ring-2 ring-gray-50"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {customer?.firstname && customer?.lastname
                    ? `${customer.firstname} ${customer.lastname}`
                    : "No name provided"}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-0.5">
                  {customer?.email || "No email provided"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                type="button"
                disabled={resetting || loading}
                onClick={() =>
                  resetCustomerPassword(data?.id?.toString() ?? "", {
                    onSuccess: (res) => message.success(res.statusDescription),
                    onError: (err) => message.error(Common.formatError(err)),
                    onSettled: () =>
                      client.invalidateQueries({ queryKey: ["customer"] }),
                  })
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-xl transition shadow-sm inline-flex items-center"
              >
                {resetting && (
                  <span className="animate-ping h-1.5 w-1.5 rounded-full bg-white mr-1.5" />
                )}
                Reset Password
              </button>
              <button
                type="button"
                disabled={disabling || loading}
                onClick={() =>
                  disableCustomer(data?.id?.toString() ?? "", {
                    onSuccess: (res) => message.success(res.statusDescription),
                    onError: (err) => message.error(Common.formatError(err)),
                    onSettled: () =>
                      client.invalidateQueries({ queryKey: ["customer"] }),
                  })
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 rounded-xl transition shadow-sm inline-flex items-center"
              >
                {disabling && (
                  <span className="animate-ping h-1.5 w-1.5 rounded-full bg-white mr-1.5" />
                )}
                Disable Account
              </button>
            </div>
          </div>

          {/* Card Module Grid Displays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Core Identity Profile */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="px-5 py-3 bg-gray-50/70 border-b border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Customer Registry
                </h4>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4 text-xs flex-1">
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Account Status
                  </p>
                  <span
                    className={`inline-block px-2 py-0.5 mt-0.5 font-bold border rounded-full ${statusColorClass}`}
                  >
                    {data?.account_status || "UNKNOWN"}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Account Classification
                  </p>
                  <p className="font-medium text-gray-800 mt-0.5">
                    {data?.account_type || "N/A"} (
                    {data?.account_ratings || "0.0"} Rating)
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Phone Contact
                  </p>
                  <p className="font-medium text-gray-800 mt-0.5">
                    {Common.formatPhoneNumber(data?.phonenumber || "") || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Birthdate (DOB)
                  </p>
                  <p className="font-medium text-gray-800 mt-0.5">
                    {data?.date_of_birth || "N/A"}
                  </p>
                </div>
                <div className="col-span-2 border-t border-gray-50 pt-2">
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Verification Matrices
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-1 text-[11px] font-bold text-gray-600">
                    <p>
                      BVN:{" "}
                      <span
                        className={
                          data?.bvn_verified
                            ? "text-emerald-600"
                            : "text-gray-300"
                        }
                      >
                        {data?.bvn_verified ? "✓" : "✕"}
                      </span>
                    </p>
                    <p>
                      NIN:{" "}
                      <span
                        className={
                          data?.nin_verified
                            ? "text-emerald-600"
                            : "text-gray-300"
                        }
                      >
                        {data?.nin_verified ? "✓" : "✕"}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span
                        className={
                          data?.email_verified
                            ? "text-emerald-600"
                            : "text-gray-300"
                        }
                      >
                        {data?.email_verified ? "✓" : "✕"}
                      </span>
                    </p>
                    Wallet Reference
                    {data?.wallet?.walletAccount || "N/A"}
                    Liquid Cash Balance
                    {Common.formatAsCurrency(
                      data?.wallet?.availableBalance || "0",
                    )}
                    Cashout Permission{" "}
                    <p
                      className={`font - bold mt-0.5 ${data?.wallet?.cashout_enabled ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {data?.wallet?.cashout_enabled ? "Active" : "Locked"}
                    </p>
                    Pacing Velocity Limit
                    {Common.formatAsCurrency(
                      data?.wallet?.cashout_limit || "0",
                    )}
                    Linked Settlement Account
                    {data?.wallet?.cashout_account ||
                      "No linked disbursement route"}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column: Activity History Tabs */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-3 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Activity History
                </h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab("ledger")}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition ${activeTab === "ledger" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                  >
                    Ledger
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition ${activeTab === "security" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                  >
                    Security
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                {activeTab === "ledger" ? (
                  <div className="space-y-4">
                    {mockLedgerItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.date}
                          </p>
                        </div>
                        <div
                          className={`text-sm font-bold ${item.type === "credit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.type === "credit" ? "+" : "-"}
                          {Common.formatAsCurrency(item.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockSecurityLogs.map((log, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {log.event}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {log.date} - {log.location} via {log.platform}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs font-bold rounded-full ${log.status === "Verified" ? "bg-green-100 text-green-600" : log.status === "Dispatched" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}
                        >
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerScreen;

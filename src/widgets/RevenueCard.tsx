import { Common } from "../utils/Common";
import { IGLTransaction } from "../utils/type";
import { ReactNode } from "react";
export interface RevenueCardProps {
  title: string;
  sessionKey: keyof IGLTransaction;
  loading: boolean;
  data: IGLTransaction[];
  color: string;
  children?: ReactNode;
}
const RevenueCard: React.FC<RevenueCardProps> = ({
  title,
  sessionKey,
  loading,
  data,
  color,
}) => {
  const totalSum = Common.sumTotalByKey(data, sessionKey);
  if (loading) {
    return (
      <div className="w-full max-w-sm animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
        </div>
        <div className="mt-4">
          <div className="h-8 w-36 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${color}-50 text-${color}-600 dark:bg-${color}-950/50 dark:text-${color}-400`}
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {Common.formatAsCurrency(totalSum)}
        </h3>
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-0.5 rounded-md bg-${color}-50 px-1.5 py-0.5 text-xs font-medium text-${color}-700 dark:bg-${color}-950/60 dark:text-${color}-400`}
          >
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            {data.length > 0 ? data.length : 0}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            from last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;

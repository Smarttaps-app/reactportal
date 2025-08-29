import type { ReactNode } from "react";

function SummaryCard({
  title,
  value,
  color,
  children,
}: {
  title: string;
  value: string;
  color: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`text-black border-l-12 p-3 rounded-xl text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl shadow hover:-translate-y-0.5 ease-linear transition-transform duration-300 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className={`mb-2 text-xl font-medium text-black`}>{value}</p>

          <p
            className={`text-xs font-semibold text-black uppercase tracking-wide`}
          >
            {title}
          </p>

          <div className="space-y-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;

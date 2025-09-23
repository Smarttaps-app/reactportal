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
      className={`text-black border-l-10 px-3 py-1 rounded-lg text-card-foreground shadow-sm transition-all duration-300 hover:shadow-sm shadow hover:-translate-y-0.5 ease-linear transition-transform duration-300 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <p className={`mb-1 text-lg font-medium text-black`}>{value}</p>

          <p
            className={`text-xs font-medium text-black uppercase tracking-wide`}
          >
            {title}
          </p>

          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;

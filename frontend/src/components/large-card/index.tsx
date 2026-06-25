import { ReactNode } from "react";

interface LargeCardProps {
  title: string;
  children: ReactNode;
}

export default function LargeCard({ title, children }: LargeCardProps) {
  return (
    <div className="flex-1 bg-white border-2 border-[#322A6A] rounded-xl p-6 min-h-104 flex flex-col shadow-sm">
      <h3 className="text-[#322A6A] text-lg font-bold mb-4">{title}</h3>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        {children}
      </div>
    </div>
  );
}

"use client";
import { ReactNode, useState } from "react";

interface Props {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function SectionCard({ title, icon, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="font-semibold text-slate-900 text-sm">{title}</span>
        </div>
        <span className={`text-slate-400 transition-transform text-xs ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

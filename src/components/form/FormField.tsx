"use client";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function InputField({ label, hint, error, className, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 ${error ? "border-red-300" : "border-slate-200"} ${className ?? ""}`}
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function TextareaField({ label, hint, className, ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <textarea
        className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none ${className ?? ""}`}
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

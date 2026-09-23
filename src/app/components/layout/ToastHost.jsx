"use client";

import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useToastStore } from "../../store/toastStore";

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export default function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" role="region" aria-label="Notifications">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`toast toast-${t.type}`} role="status">
            <Icon size={17} className="toast-icon" />
            <span className="toast-message">{t.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

// "Are you sure you want to log out?" — shown before every logout.
export default function LogoutConfirm({ open, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  // Rendered on <body> so a transformed / animated parent can't trap the overlay.
  return createPortal(
    <div className="login-modal-overlay logout-confirm-overlay" onMouseDown={onCancel}>
      <div
        className="login-modal-panel logout-confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        aria-describedby="logout-confirm-text"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="logout-confirm-icon">
          <LogOut size={20} />
        </span>
        <h2 id="logout-confirm-title">Log out?</h2>
        <p id="logout-confirm-text">Are you sure you want to log out of your account?</p>
        <div className="logout-confirm-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel} ref={cancelRef}>
            Cancel
          </button>
          <button type="button" className="btn btn-orange" onClick={onConfirm}>
            Yes, log out
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLoginModal } from "./LoginModalContext";
import LoginForm from "../../login/LoginForm";

export default function LoginModal() {
  const { isOpen, close } = useLoginModal();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onMouseDown={close}>
      <div
        className="login-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Log in"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="login-modal-close"
          onClick={close}
          ref={closeBtnRef}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <LoginForm />
      </div>
    </div>
  );
}

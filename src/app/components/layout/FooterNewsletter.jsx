"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  const [done, setDone] = useState(false);

  return (
    <div className="footer-news">
      <div>
        <h3>Stay in touch</h3>
        <p>
          Occasional notes on new products, exhibitions and Ishwari festival
          drops. No spam.
        </p>
      </div>

      {done ? (
        <p className="footer-news-done">
          Thanks — we&apos;ll be in touch. For orders right now, email{" "}
          <a href="mailto:selfesteem.disabled@gmail.com">
            selfesteem.disabled@gmail.com
          </a>
          .
        </p>
      ) : (
        <form
          className="footer-news-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input
            type="email"
            name="email"
            required
            aria-label="Email address"
            placeholder="you@example.com"
          />
          <button type="submit" aria-label="Subscribe">
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
}

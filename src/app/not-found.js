import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ paddingTop: "clamp(120px, 11vw, 160px)", textAlign: "center" }}
    >
      <div className="wrap" style={{ maxWidth: 540 }}>
        <p className="eyebrow center" style={{ justifyContent: "center" }}>
          404
        </p>
        <h1 className="display-3" style={{ marginTop: 18 }}>
          This page wandered off.
        </h1>
        <p className="lead" style={{ margin: "18px auto 30px" }}>
          The link may be old or mistyped. Let&apos;s get you back to the good
          stuff.
        </p>
        <Link href="/" className="btn btn-orange">
          Back home <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

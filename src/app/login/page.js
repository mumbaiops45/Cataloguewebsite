import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log in",
  description: "Sign in to your Blessings by SEFD account.",
};

export default function LoginPage() {
  return (
    <div className="auth">
      <aside className="auth-aside">
        <div className="auth-aside-inner">
          <span className="brand-mark">✦</span>
          <h2>
            Welcome back to <em>Blessings.</em>
          </h2>
          <p>
            Track orders, save favourites and reorder corporate gifting — while
            every purchase keeps a differently-abled artisan gainfully at work.
          </p>
          <ul>
            <li>Faster checkout &amp; saved addresses</li>
            <li>Order history and reorders</li>
            <li>Early access to Ishwari festival drops</li>
          </ul>
        </div>
      </aside>

      <section className="auth-main">
        <LoginForm />
      </section>
    </div>
  );
}

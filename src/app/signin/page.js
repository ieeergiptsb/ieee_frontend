"use client"

import { useState } from "react";
import Link from "next/link";
import PillNav from "@/components/ui/PillNav";

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Authenticating…");
    setTimeout(() => {
      setStatus("Portal unlocked. Proceed to the ₹2,200 payment dashboard.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PillNav items={navItems} />
      <main className="px-4 sm:px-6 lg:px-8 py-16 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.65em] text-white/60">Member login</p>
          <h1 className="text-4xl font-semibold">Access your IEEE portal</h1>
          <p className="text-white/70">
            Sign in to review membership status, download invoices, and resume the payment flow once Razorpay is
            connected.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6 shadow-[0_30px_120px_rgba(15,23,42,0.4)]"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm uppercase tracking-[0.35em] text-white/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl bg-black/60 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm uppercase tracking-[0.35em] text-white/60">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl bg-black/60 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white text-black font-semibold py-3 hover:bg-white/90 transition"
          >
            Sign in
          </button>

          {status && <p className="text-sm text-white/70">{status}</p>}
        </form>

        <p className="text-center text-white/60 text-sm">
          Need an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}


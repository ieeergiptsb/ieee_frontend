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

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", chapter: "ras" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PillNav items={navItems} />
      <main className="px-4 sm:px-6 lg:px-8 py-16 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.65em] text-white/60">Join IEEE RGIPT</p>
          <h1 className="text-4xl font-semibold">Create your membership profile</h1>
          <p className="text-white/70">
            Fill the quick form below and continue to the portal where you can review the ₹2,200 annual fee and
            complete payment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6 shadow-[0_30px_120px_rgba(15,23,42,0.4)]"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm uppercase tracking-[0.35em] text-white/60">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl bg-black/60 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm uppercase tracking-[0.35em] text-white/60">
              College email
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

          <div className="space-y-2">
            <label htmlFor="chapter" className="text-sm uppercase tracking-[0.35em] text-white/60">
              Primary chapter
            </label>
          </div>
          <select
            id="chapter"
            name="chapter"
            value={form.chapter}
            onChange={handleChange}
            className="w-full rounded-2xl bg-black/60 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
          >
            <option value="ras">IEEE RAS</option>
            <option value="cs">Computer Society</option>
            <option value="wie">IEEE Women in Engineering</option>
            <option value="comsic">IEEE COMSIC</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-full bg-white text-black font-semibold py-3 hover:bg-white/90 transition"
          >
            Continue to payment portal
          </button>

          {submitted && (
            <p className="text-sm text-white/70">
              Thanks! The membership portal will unlock the ₹2,200 payment screen and Razorpay checkout once connected.
            </p>
          )}
        </form>

        <p className="text-center text-white/60 text-sm">
          Already registered?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}


"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, {});
  return (
    <main className="theme-editorial min-h-screen flex items-center justify-center px-5">
      <form action={formAction} className="w-full max-w-sm">
        <p className="fg-kicker mb-3">Field Guide</p>
        <h1 className="font-display t-ink text-[2rem] mb-7">Admin sign in</h1>
        <label className="fg-label block mb-2">Username</label>
        <input name="username" autoComplete="username" className="fg-field w-full px-4 py-3 mb-5" required />
        <label className="fg-label block mb-2">Password</label>
        <input name="password" type="password" autoComplete="current-password" className="fg-field w-full px-4 py-3 mb-6" required />
        {state.error && <div className="fg-alert px-4 py-3 mb-5">{state.error}</div>}
        <button disabled={pending} className="fg-btn w-full py-3">{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}

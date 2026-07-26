import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">
        IncidentIQ
      </h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>

        <Link href="/dashboard">Dashboard</Link>

        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}